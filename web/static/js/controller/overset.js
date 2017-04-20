/**
 * Created by Administrator on 2017/4/11.
 */
whaleModule.controller("overSetcontroller",["$scope","$rootScope","$window","$http","$interval","$location","$timeout", function($scope,$rootScope,$window,$http,$interval,$location,$timeout){
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
    $scope.gotohome=function(){
        $location.path('/');
    }
    $http.get("/task/taskcontroller/queryHistTask",{
        params: {
            orgId: whale.store("orgId"),
            appid: whale.store("appid")
        }
    }).success(function (data) {
        if (data.code == 10200) {
            $scope.Crawlerresult=data.data[0].totalCount;
        }
    })
}])