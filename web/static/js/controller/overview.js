/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("OverviewController",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
    $scope.select=function(sel,event){
        $scope.over_select=!$scope.over_select;
        $scope.select_change=!$scope.select_change;
        event.stopPropagation();
        var ele=angular.element("#selected");
        if(ele.html()==sel){
            return
        }
        if(sel!=null){
            ele.html(sel);
            $scope.$broadcast('sendParent',sel);
        }

    }
    angular.element("html").on("click", function () {
        if($scope.over_select==false||$scope.select_change==false){
            return
        }
        $scope.$apply(function(){
            $scope.over_select=false;
            $scope.select_change=false;
        })
    })
    $scope.order=[
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
}])