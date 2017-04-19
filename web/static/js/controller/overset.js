/**
 * Created by Administrator on 2017/4/11.
 */
whaleModule.controller("overSetcontroller",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
    $scope.Crawler_close=function(){
        //$scope.crawler_close=true;
        $rootScope.crawler_close=true;
        $("body").css("overflow","hidden");
        $http.get("/task/taskcontroller/queryApplicationHead",{
            params: {
                orgId: whale.store("orgId")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $rootScope.CrawlerApply=data.data;
            }
        })
    }
    $scope.shuaxin=function(){
        window.history.go(0);
        location.reload()
    }
}])