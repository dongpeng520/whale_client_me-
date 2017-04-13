/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("ResultController",["$scope","$rootScope","$window","$http","$interval","$location","DateCenter", function($scope,$rootScope,$window,$http,$interval,$location,DateCenter){
    $scope.allcenter=DateCenter;
    $scope.selectCategory=function(index){//选择爬虫类型结果
        $scope.current=DateCenter[index];
        $scope.$broadcast('sendParent',index);
    }
    $.datetimepicker.setLocale('ch');
    $('#starttime').datetimepicker({
        onShow: function(ct) {
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
    });
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
    $scope.order1=[
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
        },
        {
            "time":"2017-03-06 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-11 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-21 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
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
        },
        {
            "time":"2017-03-06 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-11 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
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