/**
 * Created by Administrator on 2017/4/16.
 */



//用于  筛选status
whaleModule.filter('usercount_wan', ['$filter',  function($filter) {
    return function(data) {
        if(data>10000){
            data=data/10000;
            data=$filter('number')(data, 2)+"万";
        }
        return data;
    };
}]);
//用于  筛选status
whaleModule.filter('crawlerstatus', ['$filter',  function($filter) {
    return function(date) {
        var apply;
        if(date=="0"){
            apply="待命中"
        }
        if(date=="1"){
            apply="爬取中"
        }
        if(date=="2"){
            apply="已结束"
        }
        return apply;
    };
}]);

//用于  天数
whaleModule.filter('timeout', ['$filter',  function($filter) {
    return function(date) {
            var now = new Date(),
            timeout = (Math.abs((date - now.getTime()) / 1000)) / 60 / 60 / 24;
        return Math.floor(timeout);
    };
}]);
//用于  小时
whaleModule.filter('timeouthour', ['$filter', function($filter) {
    return function(date) {
        var now = new Date(),
            timeouthour = (Math.abs((date - now.getTime()) / 1000)) / 60 / 60;
        return Math.floor(timeouthour);
    };
}]);
//用于  分钟
whaleModule.filter('timeoutmins', ['$filter', function($filter) {
    return function(date) {
        var now = new Date(),
            timeoutmins = (Math.abs((date - now.getTime()) / 1000)) / 60 ;
        return Math.floor(timeoutmins);
    };
}]);
//用于计算秒数
whaleModule.filter('timeoutsec', ['$filter', function($filter) {
    return function(date) {
        var now = new Date(),
            timeoutsec = (date - now.getTime()) / 1000;
        return Math.floor(timeoutsec);
    };
}]);
//用于计算时间
whaleModule.filter('changeKMG', ['$filter', function($filter) {
    return function(second_time) {
        var time = parseInt(second_time) + "秒";
        if( parseInt(second_time )> 60){
            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + "分"
            if( min > 60||min == 60 ){
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt( parseInt(second_time / 60) /60 );
                time = hour + "小时"
            }
        }

        return time;
    };
}]);
//用于计算时间
whaleModule.filter('changeKMG1', ['$filter', function($filter) {
    return function(second_time) {
        var time = parseInt(second_time) + "秒";
        if( parseInt(second_time )> 60){
            time=$filter('number')(second_time / 60, 1)+ "分钟";
            var min = parseInt(second_time / 60);
            if( min > 60||min == 60 ){
                time=$filter('number')((second_time / 60) /60, 1)+ "小时";
            }
        }

        return time;
    };
}]);

//用于计算时间
whaleModule.filter('changetime', ['$filter', function($filter) {
    return function(second_time) {
        var time = parseInt(second_time) + "秒";
        if( parseInt(second_time )> 60){
            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + "分";
            if( min > 60 ){
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt( parseInt(second_time / 60) /60 );
                time = hour + "小时";
                if( hour > 24 ){
                    hour = parseInt( parseInt(second_time / 60) /60 ) % 24;
                    var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );
                    time = day + "天" + hour + "小时" + min + "分" + second + "秒";
                }
            }


        }

        return time;
    };
}]);

//用于计算时间history
whaleModule.filter('historyTime', ['$filter', function($filter) {
    return function(second_time) {
        var time = parseInt(second_time) + "秒";
        if( parseInt(second_time )> 60){

            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + "分" + second + "秒";

            if( min > 60 ){
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt( parseInt(second_time / 60) /60 );
                time = hour + "小时" + min + "分";
            }
        }
        return time;
    };
}]);
//用于计算时间taskname
whaleModule.filter('fitertaskname', ['$filter', function($filter) {
    return function(data) {
        return "#"+data.taskName+" "+$filter('date')(data.endTime,'yyyy-MM-dd HH:mm:ss');
    };
}]);
//用于计算下载页面K--M
whaleModule.filter('fiterKM', ['$filter', function($filter) {
    return function(data) {
        data = data*1000;
        var dd;
        if(data===0){
            dd="0K"
            return dd
        }
        var k = 1000,
            sizes = ['K','M', 'G'],
            i = Math.floor(Math.log(data) / Math.log(k));
        dd=$filter('number')((data / Math.pow(k, i)),"1")+sizes[i];
        return dd
    };
}]);

//用于计算下载页面文件名字截取
whaleModule.filter('fiterflie', ['$filter', function($filter) {
    return function(data) {
        var a=data.split(")")[0].split("_");
        var b = $filter('date')(a[1], "yyyy-MM-dd");
        a[1]=b;
        var c= a.join("_")+").zip";
        return c
    };
}]);


//用于计算间隔时间
whaleModule.filter('changeinterval', ['$filter', function($filter) {
    return function(second_time) {
        var time = parseInt(second_time) + "秒";
        if( parseInt(second_time )> 60){
            var min = parseInt(second_time / 60);
            time = min + "分";

            if( min > 60 ){
                var hour = parseInt( parseInt(second_time / 60) /60 );
                time = hour + "小时";
                if( hour > 24 ){
                    var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );
                    time = day + "天";
                }
            }
        }
        return time;
    };
}]);