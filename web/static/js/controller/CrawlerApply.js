/**
 * Created by Administrator on 2017/4/6.
 */
whaleModule.controller("CrawlerApplycontroller",["$scope","$window","$http","$interval","$location", function($scope,$window,$http,$interval,$location){
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