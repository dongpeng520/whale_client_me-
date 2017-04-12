/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("ResultController",["$scope","$rootScope","$window","$http","$interval","$location","DateCenter", function($scope,$rootScope,$window,$http,$interval,$location,DateCenter){
    $scope.allcenter=DateCenter;
    $scope.selectCategory=function(index){
        $scope.current=DateCenter[index];
        $scope.$broadcast('sendParent',index);
    }
    $.datetimepicker.setLocale('ch');
    $('#starttime').datetimepicker({
        onShow: function(ct) {
            this.setOptions({
                maxDate: $('#endtime').val() ? $('#endtime').val() : false
            })
        },
        step:1,
        timepicker: true
    });
    $('#endtime').datetimepicker({
        onShow: function(ct) {
            this.setOptions({
                minDate: $('#starttime').val() ? $('#starttime').val() : false
            })
        },
        step:1,
        timepicker: true
    });
    $scope.order=[
        {
            "time":"2017-03-01 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-02 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-03 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-06 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-11 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-21 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-01 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-02 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-03 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-06 12:09:09",
            "aa":"在线电商品牌",
            "url":"https://www.hao123.com/"
        },
        {
            "time":"2017-03-11 12:09:09",
            "aa":"舆情监控",
            "url":"https://www.hao123.com/"
        }
    ]

}])