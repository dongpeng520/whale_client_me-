/**
 * Created by peter.dong on 17/3/28.
 */
whaleModule.controller("HomeController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout", function($scope,$rootScope,$window,$http,$interval,$location,$timeout){
    if(whale.store("orgId")){
        $scope.username_flag=true;
        task1();
    }

    $(".homerightX1").smoove({
        offset  : '10%',
    });
    $(".homerightX2").smoove({
        offset  : '20%',
    });
    $(".homerightX3").smoove({
        offset  : '40%',
    });
    $(".homerightX4").smoove({
        offset  : '50%',
    });
    $(".homerightX5").smoove({
        offset  : '10%',
    });


    $scope.closedlogin=function(){
        $scope.loginInfo={
            name1:"",
            password1:""
        }
        $scope.error=false;
        $scope.openflag=false;
        $("body").css({
            "margin-top" : '0px',
            "margin-right" : '0px',
            "overflow" : 'visible'
        })
    }
    $scope.loginInfo={
        name1:"",
        password1:""
    }
    $scope.submit=function(){
        if ($scope.loginInfo.name1&&$scope.loginInfo.name1.length>0) {
            if(!(whale.email_pat).test($scope.loginInfo.name1)){
                $scope.error_wenzi="你输入的账号不正确，请重新输入";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入账号";
            $scope.error=true;
            return
        }
        if ($scope.loginInfo.password1&&$scope.loginInfo.password1.length>0) {
            if(!(whale.password_bat).test($scope.loginInfo.password1)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入密码";
            $scope.error=true;
            return
        }
        //submit  hex_md5(hex_md5($scope.loginInfo.password1))
        var datt={
            username: whale.Trim($scope.loginInfo.name1),
            password: hex_md5(hex_md5($scope.loginInfo.password1))
        }
        $http.post("/account/usercontroller/login",datt).success(function (data) {
            console.log(data);
            if (data.code == 10200) {
                $rootScope.errormsg = '登录成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                }, 1500);
                whale.store("username",data.name);
                whale.store("creattime",data.data.createTime);
                whale.store("orgId",data.orgId);
                whale.store("user_id",data.data.user_id);
                whale.store("accessToken",data.data.accessToken);
                $scope.closedlogin();
                $scope.username_flag=true;
                task1()
            }else if (data.code == 42104||data.code == 42100||data.code == 42103||data.code == 42101||data.code == 42117) {
                $scope.error_wenzi=data.note;
                $scope.error=true;
                return
            }else {
                $scope.error_wenzi="网络异常，请稍后重试";
                $scope.error=true;
                return
            }
        });
    }
    $scope.usernameenter=function(flag){
        $scope.user_change=flag;
    }
    $scope.openlogin=function(){
        $scope.openflag=true;
        $("body").css("overflow","hidden");
    }
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
                $scope.CrawlerApply=data.data;
            }
        })
    }
    function task1(){
        $http.get("/task/appcontroller/queryFirstCrawCount",{
            params: {
                orgId: whale.store("orgId")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.usercount={};
                var count={};
                count.costTime=data.data.costTime;
                count.appcount=data.data.appcount;
                count.totalCount=data.data.totalCount;
                count.crawlNum=data.data.crawlNum;
                count.username=whale.store("username");
                count.time=whale.store("creattime");
                $scope.usercount=count;
            }
        })
    }
    $scope.loginout=function(){
        $http.post("/account/usercontroller/loginout"+"?accessToken="+whale.store("accessToken")).success(function (data) {
            if (data.code == 10200) {
                $rootScope.errormsg = '退出成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    window.history.go(0);
                    location.reload()
                }, 1500);
            }else {
                $rootScope.errormsg = '网络异常，请稍后重试';
                $timeout(function() {
                    $rootScope.errormsg = null;
                }, 1500);
                return
            }
        });
    }
}])