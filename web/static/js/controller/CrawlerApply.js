/**
 * Created by Administrator on 2017/4/6.
 */
whaleModule.controller("CrawlerApplycontroller",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
    $scope.Crawler_close=function(){
        //$scope.$parent.$parent.crawler_close=false;
        $rootScope.crawler_close=false;
        $("body").css({
            "margin-top" : '0px',
            "margin-right" : '0px',
            "overflow" : 'initial'
        })
    }
    $scope.data=[
        {
           "a1":"a",
            "state":"爬取中"
        },
        {
            "a1":"b",
            "state":"待命中"
        },
        {
            "a1":"c",
            "state":"已结束"
        },
        {
            "a1":"a",
            "state":"爬取中"
        }

    ]

}])