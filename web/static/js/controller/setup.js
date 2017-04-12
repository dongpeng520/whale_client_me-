/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("SetupController",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
        /*//配置
        $scope.count = 0;
        $scope.p_pernum = 10;
        //变量
        $scope.p_current = 1;
        $scope.p_all_page =0;
        $scope.pages = [];
        //初始化第一页
        _get($scope.p_current,$scope.p_pernum);
        //获取数据
        var _get = function(page,size){
            $http.get("xxx.html?status=0&page="+page+"&size="+size).success(function(res){
                if(res&&res.status==1){
                    $scope.count=res.count;
                    $scope.list=res.list;
                    $scope.p_current = page;
                    $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
                    reloadPno();
                }else{
                    alert("加载失败");
                }
            });
        }

        //首页
        $scope.p_index = function(){
            $scope.load_page(1);
        }
        //尾页
        $scope.p_last = function(){
            $scope.load_page($scope.p_all_page);
        }
        //加载某一页
        $scope.load_page = function(page){
            _get(page,$scope.p_pernum);
        };
        //初始化页码
        var reloadPno = function(){
            $scope.pages=calculateIndexes($scope.p_current,$scope.p_all_page,8);
        };
       //分页算法
        var calculateIndexes = function (current, length, displayLength) {
            var indexes = [];
            var start = Math.round(current - displayLength / 2);
            var end = Math.round(current + displayLength / 2);
            if (start <= 1) {
                start = 1;
                end = start + displayLength - 1;
                if (end >= length - 1) {
                    end = length - 1;
                }
            }
            if (end >= length - 1) {
                end = length;
                start = end - displayLength + 1;
                if (start <= 1) {
                    start = 1;
                }
            }
            for (var i = start; i <= end; i++) {
                indexes.push(i);
            }
            return indexes;
        };*/

}])