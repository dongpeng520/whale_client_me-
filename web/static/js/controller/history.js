/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("HistoryController",["$scope","$rootScope","$window","$http","$interval","$location","$filter", function($scope,$rootScope,$window,$http,$interval,$location,$filter){
    if(whale.store("orgId")==null&&whale.store("appid")==null){
        $location.path('/');
        return
    }
    $http.get("/task/taskcontroller/getHistDetailData",{
        params: {
            orgId: whale.store("orgId"),
            appId: whale.store("appid"),
            PageIndex:1,
            PageSize:5,
        }
    }).success(function (data) {
        if (data.code == 10200) {
            $scope.historyCenter=data;
            $scope.count=data.total;
        }
    })
    $scope.$on('pagetopartent', function (e, req) { //监听在子控制器中定义的 分页点击 事件
        $scope.historyCenter=req;
        /*<div class="co1">爬虫任务#{{$eval('historyNum-$index')}}</div>
        $scope.historyNum=req2-5*req3+5;*/
    });
    //$scope.historyCenter=[1,2,3,4,5];
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
    angular.element("html").on("click", function () {//解决点击关闭任务栏
        if($scope.over_selecttaskName==false||$scope.selecttaskName_change==false){
            return
        }
        $scope.$apply(function(){
            $scope.over_selecttaskName=false;
            $scope.selecttaskName_change=false;
        })
    })

    $scope.closeDown=function(flag,dd){
        if(flag){
            $scope.down_flag=flag;//打开下载页面
            $("body").css("overflow","hidden");
            //获取task列表
            $scope.taskName="#"+dd.taskName+" "+$filter('date')(dd.endTime,'yyyy-MM-dd HH:mm:ss');
            $http.get("/task/taskcontroller/queryHisttaskid",{
                params: {
                    orgId: whale.store("orgId"),
                    appId: whale.store("appid")
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    $scope.taskname=data.data;
                    $scope.$broadcast('sendParent_history',dd.id);//监听在子控制器中定义的 最初加载页码 事件
                }
            })

        }else{
            $scope.down_flag=flag;//关闭下载页面
            $("body").css({
                "margin-top" : '0px',
                "margin-right" : '0px',
                "overflow" : 'initial'
            })
        }

    }
}])