/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("ResultController",["$scope","$rootScope","$window","$http","$interval","$location","DateCenter","$timeout" ,"$filter",function($scope,$rootScope,$window,$http,$interval,$location,DateCenter,$timeout,$filter){
    if(whale.store("orgId")==null&&whale.store("appid")==null){
        $location.path('/');
        return
    }
    //查询机构当前任务信息
    $http.get("/task/taskcontroller/queryCurrentTask"+"?accessToken="+whale.store("accessToken"),{
        params: {
            orgId: whale.store("orgId"),
            appid: whale.store("appid")
        }
    }).success(function (data) {
        if (data.code == 10200) {

            laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
            laydate({
                elem: '#starttime',
                format: 'YYYY-MM-DD hh:mm:ss', // 分隔符可以任意定义，该例子表示只显示年月
                festival: true, //显示节日
                istime: true
            });
            laydate({
                elem: '#endtime',
                format: 'YYYY-MM-DD hh:mm:ss', // 分隔符可以任意定义，该例子表示只显示年月
                festival: true, //显示节日
                istime: true
            });

            $scope.overCurrentTask=data.data[0];
            $scope.result.starttime=$filter('date')($scope.overCurrentTask.startTime,'yyyy-MM-dd HH:mm:ss');
            if($scope.overCurrentTask.endTime==null){
                $scope.result.endtime=$filter('date')(new Date().getTime(),'yyyy-MM-dd HH:mm:ss');
            }else{
                $scope.result.endtime=$filter('date')($scope.overCurrentTask.endTime,'yyyy-MM-dd HH:mm:ss');
            }
            whale.store("taskid",data.data[0].taskid);
            //根据orgId,appid,taskid查询品类
            $http.get("/task/taskcontroller/queryDataCategory"+"?accessToken="+whale.store("accessToken"),{
                params: {
                    orgId: whale.store("orgId"),
                    appid: whale.store("appid"),
                    taskid: whale.store("taskid")
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    $scope.DataCategory=["所有"];
                    $scope.current=$scope.DataCategory[0];
                    if(data.data==null){
                        return
                    }
                    var obj=data.data;
                    for(var s in obj){
                        $scope.DataCategory.push(obj[s])
                    }
                }
            })
            $scope.picloading=true;
            //根据orgId,appId,taskId,品类,.查询mongo数据信息
            $http.get("/task/taskcontroller/querybycategory"+"?accessToken="+whale.store("accessToken"),{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid"),
                    taskId: whale.store("taskid"),
                    category:"",
                    PageIndex:1,
                    PageSize:15,
                    startTime:"",
                    endTime:""
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    $scope.picloading=false;
                    $scope.querybycategory=data.data;//这样传，直接改变scope，没有进行一些函数操作，不需要ng-if
                    whale.store("category","所有");
                    $scope.$broadcast('sendParent_pagemiddle',data.total);//监听在子控制器中定义的 最初加载页码 事件
                    //上面这样传改变scope，on监听事件里面有进行一些函数操作。如果用scope{name:"=name"}方式，则需要ng-if
                }
            });
        }
    });

    $scope.selectCategory=function(index){//选择爬虫类型结果
        if($scope.current==index){
            return
        }
        $scope.current=index;
        whale.store("category",index);
        if(whale.store("starttime")&&whale.store("endtime")){
            var starttime=whale.store("starttime");
            var endtime=whale.store("endtime");
            $scope.$broadcast('sendParent_time',starttime,endtime);//监听在子控制器中定义的 点击切换品类 事件
        }else{
            $scope.$broadcast('sendParent_over',index);//监听在子控制器中定义的 点击切换品类 事件
        }
    }
    /*$.datetimepicker.setLocale('ch');
    $('#starttime').datetimepicker({
        onShow: function(ct) {//控件里的开始时间应该小于结束时间
            this.setOptions({
                maxDate: $('#endtime').val() ? $('#endtime').val() : false
            })
        },
        step:1,
        timepicker: true
    });
    $('#endtime').datetimepicker({
        onShow: function(ct) {
            this.setOptions({
                minDate: $('#starttime').val() ? $('#starttime').val() : false
            })
        },
        step:1,
        timepicker: true
    });*/
    $scope.result={
        starttime:"",
        endtime:""
    }
    whale.removestore("starttime");
    whale.removestore("endtime");
    $scope.timeChangeResult=function(){
        $scope.result.starttime=$("#starttime").val();
        $scope.result.endtime=$("#endtime").val();
        var starttime=new Date($scope.result.starttime).getTime();
        var endtime=new Date($scope.result.endtime).getTime();
        if($scope.result.starttime == ''&&$scope.result.endtime == ''){
            starttime="";
            endtime="";
        }
        if($scope.result.starttime == ''&&$scope.result.endtime !== ''||$scope.result.starttime !== ''&&$scope.result.endtime == ''){
            $rootScope.errormsg = '请选择开始时间或结束时间';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        if(endtime-starttime<0){
            $rootScope.errormsg = '结束时间应该大于开始时间';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        if(endtime-$scope.overCurrentTask.startTime<0){
            $rootScope.errormsg = '本任务还未开始爬取';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        whale.store("starttime",starttime);
        whale.store("endtime",endtime);
        $scope.$broadcast('sendParent_time',starttime,endtime);//监听在子控制器中定义的 时间查询 事件
    }

    angular.element("html").on("click", function () {//解决点击关闭任务栏
        if($scope.over_selecttaskName==false||$scope.selecttaskName_change==false){
            return
        }
        $scope.$apply(function(){
            $scope.over_selecttaskName=false;
            $scope.selecttaskName_change=false;
        })
    })

    $scope.closeDown=function(flag){
        if(flag){
            $scope.down_flag=flag;//打开下载页面
            $("body").css("overflow","hidden");
            //获取task列表
            $scope.taskName="所有";
            $http.get("/task/taskcontroller/queryHisttaskid"+"?accessToken="+whale.store("accessToken"),{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid")
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    $scope.taskname=data.data;
                    $scope.$broadcast('sendParent_history',"所有");//监听在子控制器中定义的 最初加载页码 事件
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

        }else{
            $scope.down_flag=flag;//关闭下载页面
            $("body").css({
                "margin-top" : '0px',
                "margin-right" : '0px',
                "overflow" : 'visible'
            })
        }
    }

    $scope.selecttaskName=function(sel,event){//选择下载任务名
        $scope.over_selecttaskName=!$scope.over_selecttaskName;
        $scope.selecttaskName_change=!$scope.selecttaskName_change;
        event.stopPropagation();
        var ele=angular.element("#selectedtaskName");
        if(sel==null){
            return
        }
        if(ele.html()==sel){
            return
        }
        if(sel!=null&&sel=="所有"&&(ele.html())!=sel){
            ele.html(sel);
            $scope.$broadcast('sendParent_history',sel);//监听在子控制器中定义的 切换品类最初加载页码 事件
            return
        }
        var taskName="#"+sel.taskName+" "+$filter('date')(sel.endTime,'yyyy-MM-dd HH:mm:ss');
        if(ele.html()==taskName){
            return
        }
        if(sel!=null){
            ele.html(taskName);
            $scope.$broadcast('sendParent_history',sel.taskid);//监听在子控制器中定义的 切换品类 最初加载页码 事件

        }
    }
    $scope.exportResults=function(){
        $scope.result.starttime=$("#starttime").val();
        $scope.result.endtime=$("#endtime").val();
        var starttime=new Date($scope.result.starttime).getTime();
        var endtime=new Date($scope.result.endtime).getTime();
        if($scope.result.starttime == ''&&$scope.result.endtime != ''){
            $rootScope.errormsg = '请选择开始时间';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        if($scope.result.starttime != ''&&$scope.result.endtime == ''){
            $rootScope.errormsg = '请选择结束时间';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        if(endtime-starttime<0){
            $rootScope.errormsg = '结束时间应该大于开始时间';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        if($scope.result.starttime==""){
            starttime=""
        }
        if($scope.result.endtime==""){
            endtime=""
        }
        if(whale.store("category")=="所有"){
            var category1=""
        }else{
            var category1=whale.store("category");
        }
        $http.get("/downloadCurrentTaskData",{
            params: {
                orgId: whale.store("orgId"),
                appId: whale.store("appid"),
                taskid: whale.store("taskid"),
                category:category1,
                startTime:starttime,
                endTime:endtime
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
                //$('#OpenPhotos').attr('src',"http://192.168.100.143:10000/downloadCurrentTaskData?taskid="+whale.store("taskid")+"&orgId="+whale.store("orgId")+"&appId="+whale.store("appid")+"&category="+category1+"&startTime="+starttime+"&endTime="+endtime);
                $('#OpenPhotos').attr('src',"/downloadCurrentTaskData?taskid="+whale.store("taskid")+"&orgId="+whale.store("orgId")+"&appId="+whale.store("appid")+"&category="+category1+"&startTime="+starttime+"&endTime="+endtime);
                $rootScope.errormsg = '导出成功';
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
}])