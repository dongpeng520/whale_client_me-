/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("HistoryController",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
    $scope.historyCenter=[1,2,3,4,5];
    $scope.order2=[
        {
            "time":"2017-03-01_001.zip",
            "modifytime":"2017-03-01 12:09:09",
            "size":"100M",
            "num":"100"
        },
        {
            "time":"2017-03-01_001.zip",
            "modifytime":"2017-03-01 12:09:09",
            "size":"100M",
            "num":"200"
        },
        {
            "time":"2017-03-01_001.zip",
            "modifytime":"2017-03-01 12:09:09",
            "size":"100M",
            "num":"400"
        },
        {
            "time":"2017-03-01_001.zip",
            "modifytime":"2017-03-01 12:09:09",
            "size":"100M",
            "num":"500"
        },
        {
            "time":"2017-03-01_001.zip",
            "modifytime":"2017-03-01 12:09:09",
            "size":"100M",
            "num":"100"
        }
    ]

    $scope.selecttaskName=function(sel,event){//选择下载任务名
        $scope.over_selecttaskName=!$scope.over_selecttaskName;
        $scope.selecttaskName_change=!$scope.selecttaskName_change;
        event.stopPropagation();
        var ele=angular.element("#selectedtaskName");
        if(ele.html()==sel){
            return
        }
        if(sel!=null){
            ele.html(sel);
            //$scope.$broadcast('sendParent',sel);

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

    $scope.closeDown=function(flag){
        if(flag){
            $scope.down_flag=flag;//打开下载页面
            $("body").css("overflow","hidden");
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