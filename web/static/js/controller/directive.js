/**
 * Created by Administrator on 2017/4/12.
 */

whaleModule.directive('homeHours', ['$rootScope',"$filter",
    function($rootScope,$filter) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime'
            },
            template: "<span class='span1'>{{timeshow1}}<span class='span2'>{{timeshow2}}</span></span>",
            replace:true,
            link: function(scope, element, attrs) {
                if(scope.date===0){
                    scope.timeshow1=0;
                    scope.timeshow2="秒";
                    return
                }
                scope.timeshow1 = parseInt(scope.date) ;
                scope.timeshow2="秒";
                if( parseInt(scope.date )> 60){
                    scope.timeshow1=$filter('number')(scope.date / 60, 1) ;
                    scope.timeshow2="分钟";
                    var min = parseInt(scope.date / 60);
                    if( min > 60 ||min == 60){
                        scope.timeshow1=$filter('number')((scope.date / 60) /60, 1);
                        scope.timeshow2="小时";
                    }
                }
            }
        };
    }
]);
whaleModule.directive('homeKmg', ['$rootScope',"$filter",
    function($rootScope,$filter) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime'
            },
            template: "<span class='span1'>{{timeshow1}}<span class='span2'>{{timeshow2}}</span></span>",
            replace:true,
            link: function(scope, element, attrs) {
                //在link函数中进行操作scope时要注意dom和父级scope的加载顺序，解决办法是ng-if
                if(scope.date===0){
                    scope.timeshow1=0;
                    scope.timeshow2="K";
                    return
                }
                var k = 1024,
                    sizes = ['K', 'M', 'G'],
                    i = Math.floor(Math.log(scope.date) / Math.log(k));
                scope.timeshow1=(scope.date / Math.pow(k, i)).toPrecision(3);
                scope.timeshow2=sizes[i];
            }
        };
    }
]);
whaleModule.directive('orderList',["$rootScope","$http",function($rootScope,$http){
    var linkFunction=function(scope,element,attr){
        function httpquery(data){
            $http.get("/task/taskcontroller/querybycategory",{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid"),
                    taskId: whale.store("taskid"),
                    category:data,
                    startTime:"",
                    endTime:""
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.order=data.data;
                }
            })
        }
        scope.$on('sendParent_over',function(event,data){//监听在子控制器中定义的 sendParent 事件

            if(data=="所有"){
                httpquery("");
            }else{
                httpquery(data);
            }

        });


    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            $scope.details_change=function(index){
                $rootScope.$broadcast('delivery.request', index);
            }
        }],
        scope: {
            order:'=orderlist'
        },
        replace:true,
        templateUrl: "static/template/orderlist.html",
        link: linkFunction
    }
}])
whaleModule.directive('detailList',["$http",function($http){
    var linkFunction=function(scope,element,attr){
        scope.$on('delivery.request', function (e, req) {
            scope.details_seceld=true;
            $("body").css("overflow","hidden");
            //根据orgId,appId,taskId,dataid品类,.查询具体数据信息
            $http.get("/task/taskcontroller/getCrawlData",{
                params: {
                    dataid: req
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.details=data;
                }
            })

        });
        scope.$on('page.request', function (e, req) {
            alert(req+"11");
        });
    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            $scope.details_close=function(){
                $scope.details_seceld=false;
                $("body").css({
                    "margin-top" : '0px',
                    "margin-right" : '0px',
                    "overflow" : 'initial'
                })
            }
        }],
        replace:true,
        templateUrl: "static/template/details.html",
        link: linkFunction
    }
}])
whaleModule.directive('pageMiddle',["$rootScope",function($rootScope){
    var linkFunction=function(scope,element,attr){
        scope.$on('sendParent',function(event,data){//监听在子控制器中定义的 sendParent 事件
            console.log(data);
        });
    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            var res={
                "count":240,
            }
            //配置
            $scope.count = 0;
            $scope.p_pernum = 10;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page =0;
            $scope.pages = [];

            //分页算法
            var calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.floor(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };
            //初始化页码
            var reloadPnofun = function(){
                $scope.pages=calculateIndexes($scope.p_current,$scope.p_all_page,5);
            };
            //获取数据
            var _get = function(page,size){
                $scope.count=res.count;
                $scope.p_current = page;
                $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
                reloadPnofun();
            }
            //初始化第一页
            _get($scope.p_current,$scope.p_pernum);
            //首页
            $scope.p_index = function(){
                $scope.load_page(1);
            }
            //尾页
            $scope.p_last = function(){
                $scope.load_page($scope.p_all_page);
            }
            //加载某一页
            $scope.load_page = function(page){
                _get(page,$scope.p_pernum);
                $rootScope.$broadcast('page.request', page);
            };
        }],
        replace:true,
        templateUrl: "static/template/pagemiddle.html",
        link: linkFunction
    }
}])
whaleModule.directive('taskList',["$rootScope",function($rootScope){
    var linkFunction=function(scope,element,attr){
        scope.order=scope.orderlist;
        scope.$on('sendParent',function(event,data){//监听在子控制器中定义的 sendParent 事件

            if(data=="舆情监控"){
                scope.order=[
                    {
                        "time":"2017-03-01 12:09:09",
                        "aa":"在线电商品牌",
                        "url":"https://www.hao123.com/"
                    },
                    {
                        "time":"2017-03-02 12:09:09",
                        "aa":"舆情监控",
                        "url":"https://www.hao123.com/"
                    },
                    {
                        "time":"2017-03-03 12:09:09",
                        "aa":"舆情监控",
                        "url":"https://www.hao123.com/"
                    }
                ]
            }
        });


    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            $scope.details_change=function(index){
                $rootScope.$broadcast('delivery.request', index);
            }
        }],
        scope: {
            orderlist:'=orderlist'
        },
        replace:true,
        templateUrl: "static/template/tasklist.html",
        link: linkFunction
    }
}])
whaleModule.directive('taskpageMiddle',["$rootScope",function($rootScope){
    var linkFunction=function(scope,element,attr){
        scope.$on('sendParent',function(event,data){//监听在子控制器中定义的 sendParent 事件
            console.log(data);
        });
    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            var res={
                "count":240,
            }

            //配置
            $scope.count = 0;
            $scope.p_pernum = 10;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page =0;
            $scope.pages = [];

            //分页算法
            var calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.floor(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };
            //初始化页码
            var reloadPnofun = function(){
                $scope.pages=calculateIndexes($scope.p_current,$scope.p_all_page,5);
            };
            //获取数据
            var _get = function(page,size){
                $scope.count=res.count;
                $scope.p_current = page;
                $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
                reloadPnofun();
            }
            //初始化第一页
            _get($scope.p_current,$scope.p_pernum);
            //首页
            $scope.p_index = function(){
                $scope.load_page(1);
            }
            //尾页
            $scope.p_last = function(){
                $scope.load_page($scope.p_all_page);
            }
            //加载某一页
            $scope.load_page = function(page){
                _get(page,$scope.p_pernum);
                $rootScope.$broadcast('page.request', page);
            };
        }],
        replace:true,
        scope:{

        },
        templateUrl: "static/template/taskpage.html",
        link: linkFunction
    }
}])