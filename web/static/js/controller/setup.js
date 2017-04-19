/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("SetupController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout", function($scope,$rootScope,$window,$http,$interval,$location,$timeout){
    if(whale.store("orgId")==null&&whale.store("appid")==null){
        $location.path('/');
        return
    }
    $scope.setup={
        appname:"",
        appdesc:""
    }
    $scope.sumbit=function(){
        if($scope.setup.appname == "" || $scope.setup.appname == null||$scope.setup.appdesc==""||$scope.setup.appdesc == null){
            $scope.error_wenzi1="请填写完整";
            $scope.error1=true;
            return
        }else{
            $scope.error1=false;
        }
        $http.post("/task/appcontroller/updateApp",{
            appName:$scope.setup.appname,
            appDesc:$scope.setup.appdesc,
            appid:whale.store("appid")
        }).success(function (data) {
            if (data.code == 10200) {
                $rootScope.errormsg = '保存成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                }, 1500);
            }else {
                $rootScope.errormsg = '网络错误，请重试';
                $timeout(function() {
                    $rootScope.errormsg = null;
                }, 1500);
            }
        });
    }
}])