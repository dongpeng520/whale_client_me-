/**
 * Created by Administrator on 2017/4/11.
 */
whaleModule.controller("overHeadcontroller",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
    $scope.openlogin=function(){
        $scope.openflag=true;
        $("body").css("overflow","hidden");
    }
    $scope.closedlogin=function(){
        $scope.loginInfo={
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
    $scope.loginInfo={
        name1:"",
        password1:"",
        password2:""
    }
    $scope.submit=function(){
        if ($scope.loginInfo.name1&&$scope.loginInfo.name1.length>0) {
            if(!(whale.password_bat).test($scope.loginInfo.name1)){
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
        if ($scope.loginInfo.password2&&$scope.loginInfo.password2.length>0) {
            if(!(whale.password_bat).test($scope.loginInfo.password2)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                if($scope.loginInfo.password2!=$scope.loginInfo.password1){
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
            username: whale.Trim($scope.loginInfo.name1),
            password: hex_md5(hex_md5($scope.loginInfo.password1))
        }
        $http.post("/account/usercontroller/editPwd",datt).success(function (data) {
            console.log(data);
            if (data.status === 200) {
            } else if (data.status == 407) {
            } else if (data.status == 408) {
            }else if (data.status == 406) {
            } else {
                console.log(data);
            }
        });
    }
}])