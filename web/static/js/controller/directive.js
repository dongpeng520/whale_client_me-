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
                function shuju(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int1 = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        scope.timeshow1 = $filter('number')(oldP, 0);
                        if (Math.abs(newP - oldP) < 0.1) {
                            scope.timeshow1 = total;
                            clearInterval(int1);
                        }
                        scope.$apply();
                    }, 50);
                }
                if(scope.date===0){
                    scope.timeshow1=0;
                    scope.timeshow2="秒";
                    return
                }
                scope.timeshow1 = parseInt(scope.date) ;
                scope.timeshow2="秒";
                if( parseInt(scope.date )> 60){
                    var min = parseInt(scope.date / 60);
                    if( min > 60 ||min == 60){
                        //scope.timeshow1=$filter('number')((scope.date / 60) /60, 1);
                        var d=$filter('number')((scope.date / 60) /60, 1);
                        shuju(d);
                        scope.timeshow2="小时";
                    }else{
                        //scope.timeshow1=$filter('number')(scope.date / 60, 1);
                        shuju($filter('number')(scope.date / 60, 1));
                        scope.timeshow2="分钟";
                    }
                }else{
                    shuju($filter('number')(scope.date));
                    scope.timeshow2="秒";
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
                //如果是改变scope.name的话，可以直接实现，如果有一些操作如下，则需要用到ng-if 先传值在加载指令
                function shuju(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        scope.timeshow1 = $filter('number')(oldP, 0);
                        if (Math.abs(newP - oldP) < 0.1) {
                            scope.timeshow1 = total;
                            clearInterval(int);
                        }
                        scope.$apply();
                    }, 50);
                }
                if(scope.date===0){
                    scope.timeshow1=0;
                    scope.timeshow2="K";
                    return
                }
                var k = 1024,
                    sizes = ['K', 'M', 'G'],
                    i = Math.floor(Math.log(scope.date) / Math.log(k));
                //scope.timeshow1=(scope.date / Math.pow(k, i)).toPrecision(3);
                shuju((scope.date / Math.pow(k, i)).toPrecision(3));
                scope.timeshow2=sizes[i];
            }
        };
    }
]);
whaleModule.directive('orderList',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        function httpquery(pin,index,flag){
            $http.get("/task/taskcontroller/querybycategory"+"?accessToken="+whale.store("accessToken"),{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid"),
                    taskId: whale.store("taskid"),
                    category:pin,
                    PageIndex:index,
                    PageSize:15,
                    startTime:"",
                    endTime:""
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.picloading=false;
                    scope.order=data.data;
                    $rootScope.$broadcast('delivery.page', data.total,flag);  //发送给pagemiddle  页码长度
                }
            }).error(function(data) {
                if (data.code == 41400) {
                    $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                    $timeout(function () {
                        $rootScope.errormsg = null;
                        whale.removestore("orgId");
                        whale.removestore("appid");
                        window.history.go(0);
                        location.reload()
                    }, 1500);
                    return
                }
            })
        }
        scope.$on('sendParent_over',function(event,data){//监听在子控制器中定义的 点击切换品类 事件
            if(data=="所有"){
                httpquery("",1);
                scope.picloading=true;
            }else{
                httpquery(data,1);
                scope.picloading=true;
            }
        });
        scope.$on('pageMiddle.request', function (e, req,flag) { //监听在子控制器中定义的 分页点击 事件
            if(whale.store("category")=="所有"){
                httpquery("",req,flag);
                scope.picloading=true;
            }else{
                httpquery(whale.store("category"),req,flag);
                scope.picloading=true;
            }
        });
        scope.$on('sendParent_time', function (e, req1,req2) { //监听在子控制器中定义的 时间查询 事件
            if(whale.store("category")=="所有"){
                var category="";
            }else{
                var category=whale.store("category");
            }
            scope.picloading=true;
            $http.get("/task/taskcontroller/querybycategory"+"?accessToken="+whale.store("accessToken"),{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid"),
                    taskId: whale.store("taskid"),
                    category:category,
                    PageIndex:1,
                    PageSize:15,
                    startTime:req1,
                    endTime:req2
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.picloading=false;
                    scope.order=data.data;
                    $rootScope.$broadcast('delivery.page', data.total);  //发送给pagemiddle  页码长度
                }
            }).error(function(data) {
                if (data.code == 41400) {
                    $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                    $timeout(function () {
                        $rootScope.errormsg = null;
                        whale.removestore("orgId");
                        whale.removestore("appid");
                        window.history.go(0);
                        location.reload()
                    }, 1500);
                    return
                }
            })
        });
    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            $scope.details_change=function(index){
                $rootScope.$broadcast('delivery.request', index);
            }
            $scope.renderFinish = function(){
                var a=angular.element("#overContain").height()+80;
                $(".over_set").css("height",a+"px");
            }
        }],
        scope: {
            order:'=orderlist',
            picloading:'=picloading'
        },
        replace:true,
        templateUrl: "static/template/orderlist.html",
        link: linkFunction
    }
}])//在父级contro中改变scope.picloading（不管指令加载顺序）,模板里的{{picloading}}不能加载（父级里的{{}}可以加载），必须采用这个方法
whaleModule.directive('detailList',["$http","$rootScope","$timeout",function($http,$rootScope,$timeout){
    var linkFunction=function(scope,element,attr){
        scope.$on('delivery.request', function (e, req) {
            scope.details_seceld=true;
            scope.picloading=true;
            $("body").css("overflow","hidden");
            //根据orgId,appId,taskId,dataid品类,.查询具体数据信息
            $http.get("/task/taskcontroller/getCrawlData"+"?accessToken="+whale.store("accessToken"),{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid"),
                    dataid: req
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    //scope.details=data.data;
                    scope.picloading=false;
                    delete data.data._id;
                    delete data.data.processStatus;
                    $("#custom-spacing").JSONView(data.data, { collapsed: true, nl2br: true, recursive_collapser: true });
                }
            }).error(function(data) {
                if (data.code == 41400) {
                    $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                    $timeout(function () {
                        $rootScope.errormsg = null;
                        whale.removestore("orgId");
                        whale.removestore("appid");
                        window.history.go(0);
                        location.reload()
                    }, 1500);
                    return
                }
            })

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
                    "overflow" : 'visible'
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
        scope.$on('sendParent_pagemiddle',function(event,data){//监听在子控制器中定义的 最初加载页码 事件
            scope.count=data;
            //初始化第一页
            scope.p_current = 1;
            scope._get(scope.p_current,scope.p_pernum);
        });
        scope.$on('delivery.page', function (e, req,flag) { //监听在不同品类变化页码
            if(flag){
                scope.count=req;
                scope._get(scope.p_current,scope.p_pernum);
            }else{
                scope.count=req;
                //初始化第一页
                scope.p_current = 1;
                scope._get(scope.p_current,scope.p_pernum);
            }
        });
    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            /*var res={
                "count":240,
            }*/


            //配置
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page =0;
            $scope.pages = [];

            //分页算法
            $scope.calculateIndexes = function (current, length, displayLength) {
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
            $scope.reloadPnofun = function(){
                $scope.pages=$scope.calculateIndexes($scope.p_current,$scope.p_all_page,5);
            };
            //获取数据
            $scope._get = function(page,size){
                //$scope.count=res.count;
                $scope.p_current = page;
                $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
                $scope.reloadPnofun();
            }
            //首页
            $scope.p_index = function(){
                if($scope.p_current==1){
                    return
                }
                $scope.load_page(1);
            }
            //尾页
            $scope.p_last = function(){
                if($scope.p_current==$scope.p_all_page||$scope.p_all_page==0){
                    return
                }
                $scope.load_page($scope.p_all_page);
            }
            //加载某一页
            $scope.load_page = function(page){
                if(page==$scope.p_current){
                    return
                }
                $scope._get(page,$scope.p_pernum);
                $rootScope.$broadcast('pageMiddle.request', page,true);//true 表示点击页面换数据的时候，不需要重载页面
            };
        }],
        replace:true,
        templateUrl: "static/template/pagemiddle.html",
        link: linkFunction
    }
}])
whaleModule.directive('taskpageMiddle',["$rootScope","$timeout",function($rootScope,$timeout){
    var linkFunction=function(scope,element,attr){

    }
    return {
        restrict: "E",
        controller : ["$scope","$http",function($scope,$http){
            //配置
            $scope.p_pernum = 5;
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
                $http.get("/task/taskcontroller/getHistDetailData"+"?accessToken="+whale.store("accessToken"),{
                    params: {
                        orgId: whale.store("orgId"),
                        appId: whale.store("appid"),
                        PageIndex:page,
                        PageSize:size
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        $scope.historyCenter=data;
                        $scope.$emit("pagetopartent",data);
                        $scope.count=data.total;
                        $scope.p_current = page;
                        $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
                        reloadPnofun();
                    }
                }).error(function(data) {
                    if (data.code == 41400) {
                        $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                        $timeout(function () {
                            $rootScope.errormsg = null;
                            whale.removestore("orgId");
                            whale.removestore("appid");
                            window.history.go(0);
                            location.reload()
                        }, 1500);
                        return
                    }
                })

            }
            //初始化第一页
            $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
            reloadPnofun();
            //首页
            $scope.p_index = function(){
                if($scope.p_current==1){
                    return
                }
                $scope.load_page(1);
            }
            //尾页
            $scope.p_last = function(){
                if($scope.p_current==$scope.p_all_page||$scope.p_all_page==0){
                    return
                }
                $scope.load_page($scope.p_all_page);
            }
            //加载某一页
            $scope.load_page = function(page){
                if(page==$scope.p_current){
                    return
                }
                _get(page,$scope.p_pernum);
            };
        }],
        replace:true,
        templateUrl: "static/template/taskpage.html",
        link: linkFunction
    }
}])
whaleModule.directive('taskList',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        function httpquery(pin,index,flag){
            $http.get("/task/taskFileStorageconroller/queryFileStorage"+"?accessToken="+whale.store("accessToken"),{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid"),
                    taskId: pin,
                    PageIndex:index,
                    PageSize:5
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.order=data.data;
                    $rootScope.$broadcast('history.page', data.total,flag);  //发送给pagemiddle  页码长度
                }
            }).error(function(data) {
                if (data.code == 41400) {
                    $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                    $timeout(function () {
                        $rootScope.errormsg = null;
                        whale.removestore("orgId");
                        whale.removestore("appid");
                        window.history.go(0);
                        location.reload()
                    }, 1500);
                    return
                }
            });
        }
        scope.$on('sendParent_history',function(event,data){//监听在子控制器中定义的 点击切换品类 事件
            if(data=="所有"){
                httpquery("",1);
                whale.store("taskidHistory","所有")
            }else{
                httpquery(data,1);
                whale.store("taskidHistory",data)
            }
        });
        scope.$on('pagehistory.request', function (e, req,flag) { //监听在子控制器中定义的 分页点击 事件
            if(whale.store("taskidHistory")=="所有"){
                httpquery("",req,flag);
            }else{
                httpquery(whale.store("taskidHistory"),req,flag);
            }
        });
    }
    return {
        restrict: "E",
        controller : ["$scope","$timeout",function($scope,$timeout){
            $scope.download=function(taskid,id){
                $http.get("/downloadHistTaskData",{
                    params: {
                        taskid: taskid,
                        fileid:id
                    }
                }).success(function (data) {
                    if(data.code==50500){
                        $rootScope.errormsg = '系统异常';
                        $timeout(function() {
                            $rootScope.errormsg = null;
                            return
                        }, 1500);
                    }else if(data.code==80404){
                        $rootScope.errormsg = '请求地址未找到';
                        $timeout(function() {
                            $rootScope.errormsg = null;
                            return
                        }, 1500);
                    }else{
                        //$('#OpenPhotos').attr('src',"http://192.168.100.143:10000/downloadHistTaskData?taskid="+taskid+"&fileid="+id);
                        $('#OpenPhotos').attr('src',"/downloadHistTaskData?taskid="+taskid+"&fileid="+id);
                        //window.location.href="http://192.168.100.143:10081/downloadHistTaskData?taskid="+taskid+"&fileid="+id;
                        $rootScope.errormsg = '下载成功';
                        $timeout(function() {
                            $rootScope.errormsg = null;
                        }, 1500);
                    }

                }).error(function(){
                    $rootScope.errormsg = '系统繁忙，请稍后重试';
                    $timeout(function() {
                        $rootScope.errormsg = null;
                    }, 1500);
                })
            }
        }],
        replace:true,
        templateUrl: "static/template/tasklist.html",
        link: linkFunction
    }
}])
whaleModule.directive('historytaskpageMiddle',["$rootScope",function($rootScope){
    var linkFunction=function(scope,element,attr){
        scope.$on('history.page', function (e, req,flag) { //监听在不同品类变化页码
            if(flag){
                scope.count=req;
                scope._get(scope.p_current,scope.p_pernum);
            }else{
                scope.count=req;
                //初始化第一页
                scope.p_current = 1;
                scope._get(scope.p_current,scope.p_pernum);
            }
        });
    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            /*var res={
             "count":240,
             }*/


            //配置
            $scope.count = 0;
            $scope.p_pernum = 5;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page =0;
            $scope.pages = [];

            //分页算法
            $scope.calculateIndexes = function (current, length, displayLength) {
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
            $scope.reloadPnofun = function(){
                $scope.pages=$scope.calculateIndexes($scope.p_current,$scope.p_all_page,5);
            };
            //获取数据
            $scope._get = function(page,size){
                //$scope.count=res.count;
                $scope.p_current = page;
                $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
                $scope.reloadPnofun();
            }
            //首页
            $scope.p_index = function(){
                if($scope.p_current==1){
                    return
                }
                $scope.load_page(1);
            }
            //尾页
            $scope.p_last = function(){
                if($scope.p_current==$scope.p_all_page||$scope.p_all_page==0){
                    return
                }
                $scope.load_page($scope.p_all_page);
            }
            //加载某一页
            $scope.load_page = function(page){
                if(page==$scope.p_current){
                    return
                }
                $scope._get(page,$scope.p_pernum);
                $rootScope.$broadcast('pagehistory.request', page,true);//true 表示点击页面换数据的时候，不需要重载页面
            };
        }],
        replace:true,
        templateUrl: "static/template/taskpage.html",
        link: linkFunction
    }
}])