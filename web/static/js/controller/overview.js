/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("OverviewController",["$scope","$rootScope","$window","$http","$interval","$location", function($scope,$rootScope,$window,$http,$interval,$location){
    // 基于准备好的dom，初始化echarts实例
    var myChart_zhe = echarts.init(document.getElementById('echarts_zhe'));
    var myChart_zhu = echarts.init(document.getElementById('echarts_zhu'));
    // 绘制图表
    myChart_zhe.setOption({
        tooltip: {
            trigger: 'axis'
        },
        itemStyle: {
            normal: {
                color: '#60b027'
            }
        },
        textStyle: {
            color: '#464646',
            fontSize:14
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0','2','4','6','8','10','12','14','16','18','20','22','24']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            }
        ]
    });
    myChart_zhu.setOption({
        tooltip: {
            trigger: 'axis',
        },
        itemStyle: {
            normal: {
                color: '#f6b797'
            }
        },
        textStyle: {
            color: '#464646',
            fontSize:14
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
        ]
    });


    $scope.select=function(sel,event){
        $scope.over_select=!$scope.over_select;
        $scope.select_change=!$scope.select_change;
        event.stopPropagation();
        var ele=angular.element("#selected");
        if(ele.html()==sel){
            return
        }
        if(sel!=null){
            ele.html(sel);
            $scope.$broadcast('sendParent',sel);

        }

    }
    angular.element("html").on("click", function () {
        if($scope.over_select==false||$scope.select_change==false){
            return
        }
        $scope.$apply(function(){
            $scope.over_select=false;
            $scope.select_change=false;
        })
    })
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