/**
 * Created by Administrator on 2017/4/10.
 */
whaleModule.controller("OverviewController",["$scope","$rootScope","$window","$http","$interval","$location","$filter","$timeout", function($scope,$rootScope,$window,$http,$interval,$location,$filter,$timeout){
    // 基于准备好的dom，初始化echarts实例
    if(whale.store("orgId")&&whale.store("appid")){
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
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'爬取数量',
                    type:'line',
                    stack: '总量',
                    data:[]
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
                data: []
            },
            series: [
                {
                    name: '爬取历史',
                    type: 'bar',
                    data: []
                }
            ]
        });
        //查询机构当前任务信息
        $http.get("/task/taskcontroller/queryCurrentTask",{
            params: {
                orgId: whale.store("orgId"),
                appid: whale.store("appid")
            }
        }).success(function (data) {
            if (data.code == 10200) {

                var a=angular.element("#overContain").height()+180;
                $(".over_set").css("height",a+"px");

                $scope.overCurrentTask=data.data[0];
                whale.store("taskid",data.data[0].taskid);
                //通过orgId,appId,taskid今日爬取概况
                $http.get("/task/taskcontroller/queryCurretnTaskByHour",{
                    params: {
                        orgId: whale.store("orgId"),
                        appId: whale.store("appid"),
                        taskId: whale.store("taskid")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        $scope.overTaskByHour1=[];
                        $scope.overTaskByHour2=[];
                        for(var s in data.data){
                            $scope.overTaskByHour1.push(s);
                            $scope.overTaskByHour2.push(data.data[s]);
                        }
                        myChart_zhe.setOption({
                            xAxis: {
                                data: $scope.overTaskByHour1
                            },
                            series: [{
                                // 根据名字对应到相应的系列
                                name: '销量',
                                data: $scope.overTaskByHour2
                            }]
                        });
                    }
                })
                //根据orgId,appid,taskid查询品类
                $http.get("/task/taskcontroller/queryDataCategory",{
                    params: {
                        orgId: whale.store("orgId"),
                        appid: whale.store("appid"),
                        taskid: whale.store("taskid")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        if(data.data[0]==null){
                            return
                        }
                        var obj=data.data[0].category;
                        /*obj=JSON.stringify(obj);
                        var category=JSON.parse(obj);*/
                        var category = eval('(' + obj + ')');
                        $scope.DataCategory=[];
                        for(var s in category){
                            $scope.DataCategory.push(category[s])
                        }
                    }
                })
                //根据orgId,appId,taskId,品类,.查询mongo数据信息
                $http.get("/task/taskcontroller/querybycategory",{
                    params: {
                        orgId: whale.store("orgId"),
                        appId: whale.store("appid"),
                        taskId: whale.store("taskid"),
                        category:"",
                        PageIndex:1,
                        PageSize:15,
                        startTime:"",
                        endTime:""
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        $scope.querybycategory=data.data;
                    }
                })
            }
        })
        //通过orgId,appId查询应用信息(累计数据量,占用内存，爬虫数等)
        $http.get("/task/taskcontroller/queryApplicationDetail",{
            params: {
                orgId: whale.store("orgId"),
                appid: whale.store("appid")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                function shuju1(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.overApplyDetail.totalCount = parseInt(oldP);
                        if (Math.abs(newP - oldP) < 1) {
                            $scope.overApplyDetail.totalCount = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                function shuju2(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.overApplyDetail.speed = $filter('number')(oldP, 2);
                        if (Math.abs(newP - oldP) < 0.05) {
                            $scope.overApplyDetail.speed = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                function shuju3(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.overApplyDetail.crawlNum = parseInt(oldP);
                        if (Math.abs(newP - oldP) < 1) {
                            $scope.overApplyDetail.crawlNum = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                $scope.overApplyDetail=data.data;
                shuju1(data.data.totalCount)
                shuju2(data.data.speed)
                shuju3(data.data.crawlNum)
            }
        })

        //通过orgId,appId 爬取历史
        $http.get("/task/taskcontroller/queryHistTask",{
            params: {
                orgId: whale.store("orgId"),
                appid: whale.store("appid")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.overHistTask1=[];
                $scope.overHistTask2=[];
                if(data.data.length==0){
                    return
                }
                angular.forEach(data.data,function(d,index,array){
                    $scope.overHistTask1.push("#"+d.taskName);
                    $scope.overHistTask2.push(d.totalCount);
                })
                myChart_zhu.setOption({
                    yAxis: {
                        type: 'category',
                        data: $scope.overHistTask1
                    },
                    series: [
                        {
                            name: '爬取历史',
                            type: 'bar',
                            data: $scope.overHistTask2
                        }
                    ]
                });
            }
        })

    }else{
       $location.path('/');
    }

    /*var objs =[{a:1},{a:2}];
    angular.forEach(objs, function(data,index,array){
//data等价于array[index]
        console.log(data.a+'='+array[index].a);
    })
     objs：需要遍历的集合
     data:遍历时当前的数据
     index:遍历时当前索引
    ;*/

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
            $scope.$broadcast('sendParent_over',sel);
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
    $scope.timer1=$interval(function() {
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
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'爬取数量',
                    type:'line',
                    stack: '总量',
                    data:[]
                }
            ]
        });
        myChart_zhu.setOption({
            tooltip: {
                trigger: 'axis',
            },
            animation:false,
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
                data: []
            },
            series: [
                {
                    name: '爬取历史',
                    type: 'bar',
                    data: []
                }
            ]
        });
        $http.get("/task/taskcontroller/queryCurrentTask",{
            params: {
                orgId: whale.store("orgId"),
                appid: whale.store("appid")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.overCurrentTask=data.data[0];
                whale.store("taskid",data.data[0].taskid);
                //通过orgId,appId,taskid今日爬取概况
                $http.get("/task/taskcontroller/queryCurretnTaskByHour",{
                    params: {
                        orgId: whale.store("orgId"),
                        appId: whale.store("appid"),
                        taskId: whale.store("taskid")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        $scope.overTaskByHour1=[];
                        $scope.overTaskByHour2=[];
                        for(var s in data.data){
                            $scope.overTaskByHour1.push(s);
                            $scope.overTaskByHour2.push(data.data[s]);
                        }
                        myChart_zhe.setOption({
                            xAxis: {
                                data: $scope.overTaskByHour1
                            },
                            series: [{
                                // 根据名字对应到相应的系列
                                name: '销量',
                                data: $scope.overTaskByHour2
                            }]
                        });
                    }
                })
            }
        })
        $scope.overApplyDetail=false;
        //通过orgId,appId查询应用信息(累计数据量,占用内存，爬虫数等)
        $http.get("/task/taskcontroller/queryApplicationDetail",{
            params: {
                orgId: whale.store("orgId"),
                appid: whale.store("appid")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                function shuju1(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.overApplyDetail.totalCount = parseInt(oldP);
                        if (Math.abs(newP - oldP) < 1) {
                            $scope.overApplyDetail.totalCount = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                function shuju2(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.overApplyDetail.speed = $filter('number')(oldP, 2);
                        if (Math.abs(newP - oldP) < 0.05) {
                            $scope.overApplyDetail.speed = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                function shuju3(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.overApplyDetail.crawlNum = parseInt(oldP);
                        if (Math.abs(newP - oldP) < 1) {
                            $scope.overApplyDetail.crawlNum = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                $scope.overApplyDetail=data.data;
                shuju1(data.data.totalCount)
                shuju2(data.data.speed)
                shuju3(data.data.crawlNum)
            }
        })

        //通过orgId,appId 爬取历史
        $http.get("/task/taskcontroller/queryHistTask",{
            params: {
                orgId: whale.store("orgId"),
                appid: whale.store("appid")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.overHistTask1=[];
                $scope.overHistTask2=[];
                if(data.data.length==0){
                    return
                }
                angular.forEach(data.data,function(d,index,array){
                    $scope.overHistTask1.push("#"+d.taskName);
                    $scope.overHistTask2.push(d.totalCount);
                })
                myChart_zhu.setOption({
                    yAxis: {
                        type: 'category',
                        data: $scope.overHistTask1
                    },
                    series: [
                        {
                            name: '爬取历史',
                            type: 'bar',
                            data: $scope.overHistTask2
                        }
                    ]
                });
            }
        })

    }, 10000);
    $scope.$on('$locationChangeStart', function(){
        $interval.cancel($scope.timer1);
    });
}])