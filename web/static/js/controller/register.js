/**
 * Created by shdr-gs07 on 16/11/2.
 */
pictureModule.controller("RegisterController", function($scope,$location, $window){

    if(store("loginInfo")){
        $scope.loginInfo=store("loginInfo");
    }else{
        $scope.loginInfo = {
            email: '',
            password: '',
            password1: '',
            birthday:''
        };
    }
    var nnnnn;
    $scope.valu={
        "v":nnnnn
    };
    function store(namespace,data){
        if(arguments.length>1){
            $window.localStorage.setItem(namespace,JSON.stringify(data));
        }else{
            var obj = $window.localStorage.getItem(namespace);
            return obj = JSON.parse(obj);
        }
    }
    var r1=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
    $scope.register=function () {
        $scope.error="";
        if (/^\s+$/.test($scope.loginInfo.email) || $scope.loginInfo.email === "" ) {
            $scope.error="邮箱不可为空","The email can not be empty";
            return false;
        }
        if (!(r1.test($scope.loginInfo.email))) {
            $scope.error="您的邮箱格式不正确", "Your E-mail format is not correct";
            return false;
        }
        if ($scope.loginInfo.password === "") {
            $scope.error="密码是必须的", "Password is required";
            return false;
        }
        if ($scope.loginInfo.password1 === "") {
            $scope.error="请再次输入密码","Please confirm your password";
            return false;
        }

        if ($scope.loginInfo.password !== $scope.loginInfo.password1) {
            $scope.error="两次输入密码不一致","Passwords does not match";
            return false;
        }
        if ($scope.loginInfo.password.length < 6 || $scope.loginInfo.password1.length < 6) {
            $scope.error="密码长度不可少于6位","Password length be less than six";
            return false;
        }
        if ($scope.loginInfo.password.length > 30 || $scope.loginInfo.password1.length > 30) {
            $scope.error="密码长度不可大于30位","Password length can not be greater than 30";
            return false;
        };
        store("loginInfo",$scope.loginInfo);
        $location.path("/");
    }
})