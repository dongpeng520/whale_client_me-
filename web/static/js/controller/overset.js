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
                orgId: whale.store("orgId"),
                accessToken:whale.store("accessToken")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $rootScope.CrawlerApply=data.data;
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
    }
    $scope.shuaxin=function(){
        window.history.go(0);
        location.reload()
    }
    $scope.gotohome=function(){
        $location.path('/');
    }
    $http.get("/task/taskcontroller/queryHistTask"+"?accessToken="+whale.store("accessToken"),{
        params: {
            orgId: whale.store("orgId"),
            appid: whale.store("appid")
        }
    }).success(function (data) {
        if (data.code == 10200) {
            //$scope.Crawlerresult=data.data[0].totalCount;
            //总计
            if(data.data.length==0){
                $scope.Crawlerresult = 0;
                $rootScope.Crawlerresult = 0;
                return
            }
            if(!data.data[0].totalCount&&data.data[0].totalCount!=0){
                return
            }
            var oldP = 0,
                newP = data.data[0].totalCount;
            var int = setInterval(function() {
                oldP += (newP - oldP) * 0.3;
                $scope.Crawlerresult = parseInt(oldP);
                if (Math.abs(newP - oldP) < 1) {
                    $scope.Crawlerresult = data.data[0].totalCount;
                    $rootScope.Crawlerresult = data.data[0].totalCount;
                    clearInterval(int);
                }
                $scope.$apply();
            }, 50);
        }
    }).error(function(data) {
        if (data.code == 41400) {
            $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
            $timeout(function () {
                $rootScope.errormsg = null;
                whale.removestore("orgId");
                whale.removestore("appid");
                $location.path('/');
            }, 1500);
            return
        }
    });
    $scope.timer2=$interval(function(){
        $http.get("/task/taskcontroller/queryHistTask"+"?accessToken="+whale.store("accessToken"),{
            params: {
                orgId: whale.store("orgId"),
                appid: whale.store("appid")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                //$scope.Crawlerresult=data.data[0].totalCount;
                //总计
                if(data.data.length==0){
                    $scope.Crawlerresult = 0;
                    $rootScope.Crawlerresult = 0;
                    return
                }
                if(!data.data[0].totalCount&&data.data[0].totalCount!=0||$scope.Crawlerresult==data.data[0].totalCount){
                    return
                }
                var oldP = 0,
                    newP = data.data[0].totalCount;
                var int = setInterval(function() {
                    oldP += (newP - oldP) * 0.3;
                    $scope.Crawlerresult = parseInt(oldP);
                    if (Math.abs(newP - oldP) < 1) {
                        $scope.Crawlerresult = data.data[0].totalCount;
                        $rootScope.Crawlerresult = data.data[0].totalCount;
                        clearInterval(int);
                    }
                    $scope.$apply();
                }, 50);
            }
        }).error(function(data) {
            if (data.code == 41400) {
                $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                $timeout(function () {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
                return
            }
        });
    },10000)
    if(window.location.href.indexOf("/overview") !== -1){
        $scope.change_blue="overview";
    }else if(window.location.href.indexOf("/setup") !== -1){
        $scope.change_blue="setup";
    }else if(window.location.href.indexOf("/history") !== -1){
        $scope.change_blue="history";
    }else if(window.location.href.indexOf("/result") !== -1){
        $scope.change_blue="result";
    }
    $scope.$on('$locationChangeStart', function(){
        $interval.cancel($scope.timer2);
    });
}])