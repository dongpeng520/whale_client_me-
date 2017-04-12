/**
 * Created by Peter on 17/11/2.
 */
window.whaleModule = angular.module('whaleModule', ['ngRoute']);
whaleModule.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
    $routeProvider.
    when('/', {
        controller: "HomeController",
        templateUrl: 'static/template/home.html'
    }).
    when('/picture',{
        controller: "PictureController",
        templateUrl: 'static/template/picture.html'
    }).
    when('/overview',{
        controller: "OverviewController",
        templateUrl: 'static/template/overview.html'
    }).
    when('/setup',{
        controller: "SetupController",
        templateUrl: 'static/template/setup.html'
    }).
    when('/history',{
        controller: "HistoryController",
        templateUrl: 'static/template/history.html'
    }).
    when('/result',{
        controller: "ResultController",
        templateUrl: 'static/template/result.html'
    }).
    when('/h5/contact',{
        controller: "ContactController",
        templateUrl: 'static/template/contact.html'
    }).
    otherwise({
        redirectTo: '/'
    });
    //$locationProvider.html5Mode(true);
}]);
whaleModule.run(['$rootScope',function($rootScope){

}])

whaleModule.factory('DateCenter', function() {
    var factory = ["所有","舆情监控","在线电商品牌"];
    return factory;
});

whaleModule.directive('repeatFinish',function(){
    return {
        link: function(scope,element,attr){
            console.log(scope.$index)
            if(scope.$last == true){
                console.log('ng-repeat执行完毕');
                scope.$eval( attr.repeatFinish )
            }
        }
    }
})

whaleModule.directive('todayMm', ['$rootScope',
    function($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime',
                lan: '=lan'
            },
            template: "{{timeshow}}",
            link: function(scope, element, attrs) {

                //格式化日期
                function datetype1(date,lan){
                    if(lan=="zh"){
                        return "今天";
                    }else if(lan=="en"){
                        return "Today";
                    }else if(lan=="ri"){
                        return "今日";
                    }

                }
                function datetype2(date,lan){
                    if(lan=="zh"){
                        return "昨天";
                    }else if(lan=="en"){
                        return "Yesterday";
                    }else if(lan=="ri"){
                        return "昨日";
                    }
                }
                function datetype3(date,lan){
                    /*if (date) {
                        var Day = date.getDate();
                        month = date.getMonth() + 1;
                        hours=date.getHours();
                        minutes=date.getMinutes();
                        return month + '月' + Day + '日' +' '+ hours + ':' + minutes;
                    }*/

                    if(date){
                        if(lan=="en"){
                            var a=new Date(date).toDateString();
                            a=a.substring(4,10)+","+a.substring(11);
                            return a;
                        }else if(lan=="zh"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]
                            }
                            return a;
                        }else if(lan=="ri"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]
                            }
                            return a;
                        }


                    }

                }
                var ctime = new Date(scope.date);
                scope.$on('sendParent',function(event,data){//监听在子控制器中定义的 sendParent 事件
                    nowtime = new Date().getTime();
                    bettime = (nowtime - ctime.getTime());
                    if (bettime <= 86400000) {
                        scope.timeshow = datetype1(ctime,data);
                    } else if (bettime >= 86400000 && bettime <= 172800000) {
                        scope.timeshow = datetype2(ctime,data);
                    } else if (bettime > 172800000) {
                        scope.timeshow = datetype3(scope.date,data);
                    }
                });
                nowtime = new Date().getTime();
                bettime = (nowtime - ctime.getTime());
                if (bettime <= 86400000) {
                    scope.timeshow = datetype1(ctime,scope.lan);
                } else if (bettime >= 86400000 && bettime <= 172800000) {
                    scope.timeshow = datetype2(ctime,scope.lan);
                } else if (bettime > 172800000) {
                    scope.timeshow = datetype3(scope.date,scope.lan);
                }
            }
        };
    }
]);
whaleModule.directive('timeMm', ['$rootScope',
    function($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime',
                lan: '=lan'
            },
            template: "{{timeshow}}",
            link: function(scope, element, attrs) {

                //格式化日期
                function timechange(date,lan){
                    if(date){
                        if(lan=="en"){
                            var a=new Date(date).toDateString();
                            a=a.substring(4,10)+","+a.substring(11)+" ";
                            return a;
                        }else if(lan=="zh"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]+" "
                            }
                            return a;
                        }else if(lan=="ri"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]+" "
                            }
                            return a;
                        }

                    }

                }
                scope.timeshow=timechange(scope.date,scope.lan);
                scope.$on('sendParent2',function(event,data){//监听在子控制器中定义的 sendParent 事件
                    scope.timeshow=timechange(scope.date,data);
                });
            }
        };
    }
]);
whaleModule.directive('nameLan', ['$rootScope',
    function($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime',
                lan: '=lan'
            },
            template: "{{timeshow}}",
            link: function(scope, element, attrs) {

                //格式化日期
                function timechange(date,lan){
                    if(date){
                        if(lan=="en"){
                            var a;
                            a=date.substring(0,date.indexOf("("))
                            return a;
                        }else if(lan=="zh"){
                            var a;
                            a=date.substring(date.indexOf("(")+1,date.indexOf(")"));
                            return a;
                        }

                    }

                }
                scope.timeshow=timechange(scope.date,scope.lan);
                scope.$on('sendParent3',function(event,data){//监听在子控制器中定义的 sendParent 事件
                    scope.timeshow=timechange(scope.date,data);
                });
            }
        };
    }
]);