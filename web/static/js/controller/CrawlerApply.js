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
    $scope.guanli=function(data){
        whale.store("appid",data);
        $rootScope.crawler_close=false;
        if(window.location.href.indexOf("/overview") !== -1){
            window.history.go(0);
            location.reload()
        }else{
            $location.path('/overview');
        }
    }
}])