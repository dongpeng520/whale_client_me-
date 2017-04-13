/**
 * Created by Administrator on 2017/4/12.
 */
whaleModule.directive('orderList',["$rootScope",function($rootScope){
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
        controller : function($scope){
            $scope.details_change=function(index){
                $rootScope.$broadcast('delivery.request', index);
            }
        },
        scope: {
            orderlist:'=orderlist'
        },
        replace:true,
        templateUrl: "static/template/orderlist.html",
        link: linkFunction
    }
}])
whaleModule.directive('detailList',function(){
    var linkFunction=function(scope,element,attr){
        scope.$on('delivery.request', function (e, req) {
            scope.details_seceld=true;
            $("body").css("overflow","hidden");
            scope.index=req;
            scope.details=[
                {
                    "time":"2017-03-01 12:09:09",
                    "aa":"在线电商品牌",
                    "url":"https://www.hao123.com/"
                },
                {
                    "time":"2017-03-02 12:09:09",
                    "aa":"舆情监控",
                    "url":"https://www.hao123.com/"
                }
            ]
        });
        scope.$on('page.request', function (e, req) {
            alert(req);
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
})
whaleModule.directive('pageMiddle',["$rootScope",function($rootScope){
    var linkFunction=function(scope,element,attr){
        scope.$on('sendParent',function(event,data){//监听在子控制器中定义的 sendParent 事件
            console.log(data);
        });
    }
    return {
        restrict: "E",
        controller : function($scope){
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
        },
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
        controller : function($scope){
            $scope.details_change=function(index){
                $rootScope.$broadcast('delivery.request', index);
            }
        },
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
        controller : function($scope){
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
        },
        replace:true,
        scope:{

        },
        templateUrl: "static/template/taskpage.html",
        link: linkFunction
    }
}])