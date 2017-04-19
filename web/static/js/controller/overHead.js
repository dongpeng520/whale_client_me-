/**
 * Created by Administrator on 2017/4/11.
 */
whaleModule.controller("overHeadcontroller",["$scope","$rootScope","$window","$http","$interval","$location","$timeout", function($scope,$rootScope,$window,$http,$interval,$location,$timeout){
    $scope.openlogin=function(){
        $scope.openflag=true;
        $("body").css("overflow","hidden");
    }
    $scope.closedlogin=function(){
        $scope.loginInf={
            name1:"",
            password1:"",
            password2:""
        }
        $scope.error=false;
        $scope.openflag=false;
        $("body").css({
            "margin-top" : '0px',
            "margin-right" : '0px',
            "overflow" : 'initial'
        })
    }
    $scope.loginInf={
        name1:"",
        password1:"",
        password2:""
    }
    $scope.submit=function(){
        if ($scope.loginInf.name1&&$scope.loginInf.name1.length>0) {
            if(!(whale.password_bat).test($scope.loginInf.name1)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入旧密码";
            $scope.error=true;
            return
        }
        if ($scope.loginInf.password1&&$scope.loginInf.password1.length>0) {
            if(!(whale.password_bat).test($scope.loginInf.password1)){
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
        if ($scope.loginInf.password2&&$scope.loginInf.password2.length>0) {
            if(!(whale.password_bat).test($scope.loginInf.password2)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                if($scope.loginInf.password2!=$scope.loginInf.password1){
                    $scope.error_wenzi="密码不一致";
                    $scope.error=true;
                    return
                }
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入确认密码";
            $scope.error=true;
            return
        }
        //submit
        var datt={
            id:whale.store("user_id"),
            oldpwd: hex_md5(hex_md5($scope.loginInf.name1)),
            newpwd: hex_md5(hex_md5($scope.loginInf.password1))
        }
        $http.post("/account/usercontroller/editPwd"+"?accessToken="+whale.store("accessToken"),datt).success(function (data) {
            console.log(data);
            if (data.code == 10200) {
                $rootScope.errormsg = '修改成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
                $scope.closedlogin();
            }else if (data.code == 42122||data.code == 42123||data.code == 42124) {
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
    $scope.loginout=function(){
        $http.post("/account/usercontroller/loginout"+"?accessToken="+whale.store("accessToken")).success(function (data) {
            if (data.code == 10200) {
                $rootScope.errormsg = '退出成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
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