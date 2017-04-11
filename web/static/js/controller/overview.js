/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("OverviewController",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
    $scope.Crawler_close=function(){
        //$scope.crawler_close=true;
        $rootScope.crawler_close=true;
        $("body").css("overflow","hidden");
    }
    $scope.select=function(sel){
        $scope.over_select=!$scope.over_select;
        $scope.select_change=!$scope.select_change;
        var ele=angular.element("#selected");
        if(ele.html()==sel){
            return
        }
        ele.html(sel);
        if(sel!=null){
            $scope.$broadcast('sendParent',sel);
        }

    }
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