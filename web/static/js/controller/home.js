/**
 * Created by peter.dong on 16/11/2.
 */
pictureModule.controller("HomeController",["$scope","$window","$http","$interval","$location", function($scope,$window,$http,$interval,$location){
    /*if(window.location.href.indexOf("home") !== -1){
        $("#header .navbar_input").css("display","none");
        $("#header #sign").css("display","inline-block");
        $("#header #about").css("display","inline-block");
        $("#header #profile").css("display","none");
        $("#header #out").css("display","none");
    }*/
    if(window.location.href.indexOf("&vid=") !== -1){//微信扫码进网页
        var codes=window.location.href.split("&vid=")[1].split("#/")[0];
        $http.post(pictureAir.host + "auth/getAccessToken", {
            appid:pictureAir.appId,
            t : '0',
            lg : 'en-US'
        }).success(function (data) {
            if(data.status === 200){
                var access_token=data.result.access_token;
                pictureAir.store("access_token",access_token);
                $http.post(pictureAir.host + "g/photo/getPhotosByConditions", {
                    access_token: pictureAir.store("access_token"),
                    condition: "customerId",
                    customerId:codes
                }).success(function (data) {
                    // BPSG632UDD39HD78
                    if (data.status === 200) {
                        if(data.result.photos.length==0){
                            alert($scope.languagePack.error_er112);
                            window.location.href="http://web.pictureair.com";
                        }else{
                            pictureAir.store("customerId",codes);
                            $location.path('/picture');
                        }
                    }else if (data.status === 4034) {
                        alert($scope.languagePack.error_er112)
                    }else {
                        alert($scope.languagePack.error_er111)
                    }
                })
            }
        })
    }

    if(pictureAir.store("token")){
        if(pictureAir.store("token_date")&&new Date().getTime()-pictureAir.store("token_date")>604800000){
            alert("账户已过期,请重新登录");
            localStorage.removeItem("token_date");
        }else{
            $("#header #sign").css("display","none");
            $("#header #about").css("display","none");
            $("#header #out").css("display","inline-block");
            $("#header #Photos").css("display","inline-block");
        }
    }
    $("#out").on("click", function () {
        if (pictureAir.store("token")) {
            localStorage.removeItem("token");
            localStorage.removeItem("token_date");
            window.history.go(0);
            location.reload()
        }
    })




    var index_lun=0;
    function access_token_test() {
        // $(window).width()>$(window).height()
        if(!(device.androidPhone() || device.iphone())){
            $http.get(pictureAir.host + "g/cache/carousel",{
                params: {
                    access_token: pictureAir.store("access_token")
                }
            }).success(function (data) {
                if(data.status === 200){
                    $scope.datas = data.result.home.webslide
                    angular.forEach($scope.datas,function (data,index){
                        index_lun++;
                    })
                }
            })
        }else if((device.androidPhone() || device.iphone())){
            $http.get(pictureAir.host + "g/cache/carousel",{
                params: {
                    access_token: pictureAir.store("access_token")
                }
            }).success(function (data) {
                if(data.status === 200){
                    $scope.datas = data.result.home.slide
                    angular.forEach($scope.datas,function (data,index){
                        index_lun++;
                    })
                }
            })
        }
    }

    if(pictureAir.store("access_token")){
        access_token_test();
    }else{
        $http.post(pictureAir.host + "auth/getAccessToken", {
            appid:pictureAir.appId,
            t : '0',
            lg : 'en-US'
        }).success(function (data) {
            if(data.status === 200){
                var access_token=data.result.access_token;
                pictureAir.store("access_token",access_token);
                access_token_test();
            }else {

            }
        })
    }

    $scope.swapLanguagelogin=function(lan){
        jQuery.i18n.properties({// 加载资浏览器语言对应的资源文件
            name: 'messageResources', // 资源文件名称
            language: lan, //默认为英文当改为zh时页面显示中文语言
            path: 'static/js/libs/messageResources/', // 资源文件路径
            mode: 'map', // 用 Map 的方式使用资源文件中的值
            cache: true,//  指定浏览器是否对资源文件进行缓存
            callback: function () {// 加载成功后设置显示内容
                var mm=$.i18n.map;
                pictureAir.store("languagePack",mm);
                $scope.languagePack=$.i18n.map;
            }
        });
    }
    function change_access(lan_access) {
        $http.post(pictureAir.host + "auth/getAccessToken", {
            appid:pictureAir.appId,
            t : '0',
            lg : lan_access
        }).success(function (data) {
            if(data.status === 200){
                var access_token=data.result.access_token;
                pictureAir.store("access_token",access_token);
            }else {

            }
        })
    }
    function change_token(lan_access) {
        $http.post(pictureAir.host + "p/user/switchlg", {
            token: pictureAir.store("token"),
            lg : lan_access
        }).success(function (data) {
            if(data.status === 200){
                pictureAir.store("token",data.result.access_token);
            }else {

            }
        })
    }
    $scope.swapLanlogin = function (lan) {
        if($window.localStorage.languagePack &&JSON.parse($window.localStorage.languagePack).language&&JSON.parse($window.localStorage.languagePack).language==lan){
            $scope.languagePack=JSON.parse($window.localStorage.languagePack);
            $scope.lanbb2=lan;//首页手机app图片
            if(lan=="en"){
                $("#En .span1").text("EN");
                if(pictureAir.store("token")){
                    if(pictureAir.store("enzh")=="en"){
                        return
                    }
                    change_token("en-US")
                }else{
                    if(pictureAir.store("enzh")=="en"){
                        return
                    }
                    change_access("en-US");
                }
            }
            if(lan=="zh"){
                $("#En .span1").text("中文");
                if(pictureAir.store("token")){
                    if(pictureAir.store("enzh")=="zh"){
                        return
                    }
                    change_token("zh-CN")
                }else{
                    if(pictureAir.store("enzh")=="zh"){
                        return
                    }
                    change_access("zh-CN");
                }
            }
            if(lan=="ri"){
                $("#En .span1").text("日本語");
                if(pictureAir.store("token")){
                    if(pictureAir.store("enzh")=="ri"){
                        return
                    }
                    change_token("ja-JP")
                }else{
                    if(pictureAir.store("enzh")=="ri"){
                        return
                    }
                    change_access("ja-JP");
                }
            }
            pictureAir.store("enzh",lan);
            if(lan=="ri"){
                lan="en"
            }
            $scope.lanbb=lan;
        }else{
            $scope.lanbb2=lan;//首页手机app图片
            if(lan=="en"){
                $("#En .span1").text("EN");
                if(pictureAir.store("token")){
                    if(pictureAir.store("enzh")=="en"){
                        return
                    }
                    change_token("en-US")
                }else{
                    if(pictureAir.store("enzh")=="en"){
                        return
                    }
                    change_access("en-US");
                }
            }
            if(lan=="zh"){
                $("#En .span1").text("中文");
                if(pictureAir.store("token")){
                    if(pictureAir.store("enzh")=="zh"){
                        return
                    }
                    change_token("zh-CN")
                }else{
                    if(pictureAir.store("enzh")=="zh"){
                        return
                    }
                    change_access("zh-CN");
                }
            }
            if(lan=="ri"){
                $("#En .span1").text("日本語");
                if(pictureAir.store("token")){
                    if(pictureAir.store("enzh")=="ri"){
                        return
                    }
                    change_token("ja-JP")
                }else{
                    if(pictureAir.store("enzh")=="ri"){
                        return
                    }
                    change_access("ja-JP");
                }
            }
            $scope.swapLanguagelogin(lan);
            pictureAir.store("enzh",lan);
            if(lan=="ri"){
                lan="en"
            }
            $scope.lanbb=lan;
        }
    };
    if(pictureAir.store("enzh")){
        var enzh=pictureAir.store("enzh");
        $scope.swapLanlogin(enzh);
    }else{
        $scope.swapLanguagelogin("en");
        pictureAir.store("enzh","en");
        $scope.lanbb2="en";
        $scope.lanbb="en";
    }

    $scope.renderFinish = function(){
        $(".flicking_con").css({
            'width' : 46*index_lun+"px",
            'margin-left' : -23*index_lun+"px"
        });
        // if((!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
        if(!(device.androidPhone() || device.iphone())){
            $(".main_visual").hover(function(){
                $("#btn_prev,#btn_next").fadeIn()
            },function(){
                $("#btn_prev,#btn_next").fadeOut()
            });
        }

        $dragBln = false;
        $(".main_image").touchSlider({
            flexible : true,
            speed : 500,
            btn_prev : $("#btn_prev"),
            btn_next : $("#btn_next"),
            paging : $(".flicking_con a"),
            counter : function (e){
                $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
            }
        });
        $(".main_image").bind("mousedown", function(e) {
            $dragBln = false;
        });
        $(".main_image").bind("dragstart", function(e) {
            $dragBln = true;
        });
        $(".main_image #btn_prev").click(function(){
            if($dragBln) {
                return false;
            }
        });
        $(".main_image #btn_next").click(function(){
            if($dragBln) {
                return false;
            }
        });
        $interval.cancel(window.timerimg);
        window.timerimg=$interval(function () {
            $("#btn_next").click();
        }, 5000);
        $(".main_visual").hover(function(){
            $interval.cancel(window.timerimg);
        },function(){
            window.timerimg  = $interval(function(){
                $("#btn_next").click();
            },5000);
        });
        // var timerimg = $interval(function () {
        //     $("#btn_next").click();
        // }, 5000);
        // $(".main_visual").hover(function(){
        //     $interval.cancel(timerimg);
        // },function(){
        //     timerimg  = $interval(function(){
        //         $("#btn_next").click();
        //     },5000);
        // });
        $(".main_image").bind("touchstart",function(){
            $interval.cancel(window.timerimg);
        }).bind("touchend", function(e){
            window.timerimg  = $interval(function(){
                $("#btn_next").click();
            }, 5000);
        });
        // if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        if(device.androidPhone() || device.iphone()){
            $(".downapp").show();
            $(".main_visual").hide();
            $(".mobileApp").hide();
            $("#downappclosed").on("click", function (e) {
                $(".downapp").hide();
                $(".main_visual").show();
                $(".mobileApp").show();
            })
        }
    }





    pictureAir.removestore("sendtimes");
    pictureAir.removestore("sendtimes2");


    if(pictureAir.store("loginInfo")){

    }else{
        $scope.loginInfo = {
            phone:'',
            email: '',
            password: '',
            compassword:'',
            password2:'',
            ID:'',
            code:''
        };
    }
    function loginonloading() {
        $scope.changed3=false;
        $scope.relo1=false;
        $scope.changed=false;
        $scope.changed2=false;
        $scope.relo=false;
    }
    loginonloading();
    $scope.closedlogin=function () {
        $(".titie_flag3").hide();//解决close刷新
        $(".titie_flag4").hide();
        $(".titie_flag5").hide();
        $(".phone_email3 .email").hide();
        loginonloading();
        $(".login").hide();
        $scope.loginInfo = {
            phone:'',
            email: '',
            password: '',
            compassword:'',
            password2:'',
            ID:'',
            code:''
        };
        $scope.textChange();
    }
    if(pictureAir.store("enzh")){
        $scope.lanbb=pictureAir.store("enzh");
        if(pictureAir.store("enzh")=="ri"){
            $scope.lanbb="en";
        }
    }else{
        $scope.lanbb="en";
    }
    $scope.nationCodes=nationCodes;
    $scope.change_code=function (index) {
        var cd=$(".input_codenum").eq(index).html();
        var na=$(".item_nname").eq(index).html();
        $(".country .COUNTRY").text(na);
        $(".phone .code").text(cd);
    }
    $scope.relo1ing=function () {
        $scope.relo1=true;
        $(".titie_flag3").show();// 解决close刷新关键部分
        $(".phone_email3 .country").show();// 解决close刷新关键部分
        $(".phone_email3 .phone").show();// 解决close刷新关键部分
        $(".phone_email3 .yzm").show();// 解决close刷新关键部分
        $scope.newpw=false;// 解决close刷新关键部分
        $scope.loginInfo = {
            phone:'',
            email: '',
            password: '',
            compassword:'',
            password2:'',
            ID:'',
            code:''
        };
        $scope.textChange();
    }
    $scope.changing=function () {
        $scope.changed=!$scope.changed;
        $scope.loginInfo = {
            phone:'',
            email: '',
            password: '',
            compassword:'',
            password2:'',
            ID:'',
            code:''
        };
        $scope.textChange();
    }
    $scope.changing2=function () {
        $scope.changed2=!$scope.changed2;
    }
    $scope.changing3=function () {
        $scope.changed3=!$scope.changed3;
        if($(".titie_flag3").is(':visible')){
            $(".titie_flag4").show();
            $(".titie_flag3").hide();
        }else {
            $(".titie_flag4").hide();
            $(".titie_flag3").show();
        }
    }
    $scope.reloing=function () {
        $scope.relo=!$scope.relo;
        if (!$(".phone_email").is(":visible")) {
            $scope.loginInfo = {
                phone:'',
                email: '',
                password: '',
                compassword:'',
                password2:'',
                ID:'',
                code:''
            };
        }else{
            $scope.loginInfo=pictureAir.store("loginInfo");
        }
        $scope.textChange();
    }
    $scope.showCN=function () {
        if($(".showcontry").is(':visible')){
            $(".showcontry").hide();
        }else {
            $(".showcontry").show();
        }
    }
    $("html,body").on("click", function () {
        $(".showcontry").hide();
    });
    $("input").on("focus", function() {
        $("#error").hide();
    })
    $("input").on("focus", function() {
        $("#error2").hide();
    })
    $scope.textChange=function () {
        if ($scope.loginInfo.phone&&$scope.loginInfo.phone.length>0) {
            if((!pictureAir.phone_bat.test($scope.loginInfo.phone))){
                $scope.text_phone=true;
                $scope.text_phone2=false;
            }else{
                $scope.text_phone=false;
                $scope.text_phone2=true;
            }
        }else{
            $scope.text_phone=false;
        }
        if ($scope.loginInfo.email&&$scope.loginInfo.email.length>0) {
            if(!(pictureAir.email_pat).test($scope.loginInfo.email)){
                $scope.text_email=true;
                $scope.text_email2=false;
            }else{
                $scope.text_email=false;
                $scope.text_email2=true;
            }
        }else{
            $scope.text_email=false;
        }

        if ($scope.loginInfo.password&&$scope.loginInfo.password.length>0) {
            if(!(pictureAir.password_bat).test($scope.loginInfo.password)){
                $scope.text_pass=true;
                $scope.text_pp=false;
            }else{
                $scope.text_pass=false;
                $scope.text_pp=true;
            }
        }else{
            $scope.text_pass = false;
        }
        if ($scope.loginInfo.compassword&&$scope.loginInfo.compassword.length>0) {
            if($scope.loginInfo.password!==$scope.loginInfo.compassword){
                $scope.text_pass1=true;
                $scope.text_pass12=false;
            }else{
                $scope.text_pass1=false;
                $scope.text_pass12=true;
            }
        }else{
            $scope.text_pass1 = false;
        }

    }
    //手机注册验证码发送
    $scope.checkcode=function () {
        if (pictureAir.store("sendtimes")) {
            return false;
        }
        if ($scope.loginInfo.phone.length>0&&!pictureAir.phone_bat.test($scope.loginInfo.phone)) {
            $("#error").text($scope.languagePack.error_mobile).show();
            return false;
        }else if($scope.loginInfo.phone.length==0){
            $("#error").text($scope.languagePack.error_er1).show();
            return false;
        }
        var nat = $(".phone_email .phone .code").text();
        var datas = {
            access_token:pictureAir.store("access_token"),
            phone:nat+$scope.loginInfo.phone,//8615655566161
            type:0
        };
        console.log(datas);
        $http.post(pictureAir.host + "g/user/sendsms", datas).success(function (data) {
            console.log(data);
            if (data.status === 200) {
                alert($scope.languagePack.error_er2);
                //30s重新发送
                pictureAir.store("sendtimes", "no");
                var count = 60;
                $scope.fn = $interval(function () {
                    thst();
                }, 1000);

                function thst() {
                    if (count > 0) {
                        count--;
                        document.getElementById("sendcode").innerHTML = +count + "s";
                    } else {
                        document.getElementById("sendcode").innerHTML = $scope.languagePack.error_er3;
                        $interval.cancel($scope.fn);
                        pictureAir.removestore("sendtimes");
                    }
                }
            }else if(data.status === 425){
                alert($scope.languagePack.error_eraxin6);
            }else if(data.status === 426){
                alert($scope.languagePack.error_eraxin1);
            }else if(data.status === 407){
                alert($scope.languagePack.error_eraxin4);
            } else {
                alert($scope.languagePack.error_er4);
            }
        })
    }
    $scope.submit=function () {
        if ($(".phone_email .phone").is(":visible")) {
            // alert("手机注册")
            if($scope.text_phone2==true&&$scope.text_pass12==true&&$scope.loginInfo.code!==""){
                if(!$("#privacy_check").is(':checked')){
                    $("#error").text($scope.languagePack.error_er113).show();
                    return
                }
                var username = $(".phone_email .phone .code").text() + $scope.loginInfo.phone;
                var datt1={
                    access_token: pictureAir.store("access_token"),
                    username: pictureAir.Trim(username),
                    password: hex_md5($scope.loginInfo.password),
                    vcode:$scope.loginInfo.code
                }
                $http.post(pictureAir.host + "g/user/register",datt1).success(function (data) {
                    if (data.status === 200) {
                        alert($scope.languagePack.error_er5);
                        document.getElementById("sendcode").innerHTML = $scope.languagePack.error_er3;
                        $interval.cancel($scope.fn);
                        pictureAir.removestore("sendtimes");
                        $scope.relo=true;
                    } else if (data.status == 407) {
                        $("#error").text($scope.languagePack.error_er6).show();
                    } else if (data.status == 408) {
                        $("#error").text($scope.languagePack.error_eraxin1).show();
                    }else if (data.status == 406) {
                        $("#error").text($scope.languagePack.error_eraxin2).show();
                    } else {
                        console.log(data);
                    }
                });
            }else{
                $("#error").text($scope.languagePack.error_er7).show();
            }

        }
        if ($(".phone_email .email").is(":visible")) {
            // alert("邮箱注册")
            if($scope.text_email2==true&&$scope.text_pass12==true){
                if(!$("#privacy_check").is(':checked')){
                    $("#error").text($scope.languagePack.error_er113q).show();
                    return
                }
                var datas={
                    access_token: pictureAir.store("access_token"),
                    username: pictureAir.Trim($scope.loginInfo.email),
                    password: hex_md5($scope.loginInfo.password)
                };
                console.log(datas);
                $http.post(pictureAir.host + "g/user/register",datas).success(function (data) {
                    if (data.status === 200) {
                        console.log(data);
                        $scope.relo=true;
                        $scope.changed2=true;
                    } else if (data.status == 407) {
                        $("#error").text($scope.languagePack.error_er6).show();
                    } else if (data.status == 408) {
                        $("#error").text($scope.languagePack.error_eraxin1).show();
                    }else {
                        console.log(data);
                    }
                });
            }else{
                $("#error").text($scope.languagePack.error_er7).show();
            }
        }
        function login(username) {
            $http.post(pictureAir.host + "g/user/login", {
                access_token: pictureAir.store("access_token"),
                username: username,
                password: hex_md5($scope.loginInfo.password)
            }).success(function (data) {
                if (data.status === 200) {
                    console.log(data);
                    if($("#checkedreb").is(':checked')){
                        pictureAir.store("loginInfo",$scope.loginInfo);
                    }
                    if(!pictureAir.store("token_date")){
                        pictureAir.store("token_date",new Date().getTime());
                    }
                    pictureAir.store("token",data.result.access_token);
                    pictureAir.store("username",data.result.user.userName);
                    $location.path('/picture');
                } else if (data.status == 433) {
                    $("#error").text($scope.languagePack.error_er8).show();
                } else if(data.status == 6031){
                    $("#error").text($scope.languagePack.error_er9).show();
                }else if(data.status == 407){
                    $("#error").text($scope.languagePack.error_eraxin4).show();
                }else if(data.status == 408){
                    $("#error").text($scope.languagePack.error_eraxin1).show();
                }else if(data.status == 430){
                    $("#error").text($scope.languagePack.error_eraxin5).show();
                }else if(data.status == 429){
                    $("#error").text($scope.languagePack.error_eraxin14).show();
                }
            });
        }
        if ($(".phone_email2 .phone").is(":visible")) {
            // alert("手机登陆")$scope.text_pp=true;
            if($scope.text_phone2==true&&$scope.text_pp==true){
                var username=$(".phone_email2 .phone .code").text() + $scope.loginInfo.phone;
                if(pictureAir.store("token_date")&&new Date().getTime()-pictureAir.store("token_date")>604800000){
                    $scope.loginInfo = {
                        phone:'',
                        email: '',
                        password: '',
                        compassword:'',
                        password2:'',
                        ID:'',
                        code:''
                    };
                    alert($scope.languagePack.home_againaccount);
                }else{
                    login(username);
                }

            }else{
                $("#error").text($scope.languagePack.error_er7).show();
            }

        }
        if ($(".phone_email2 .email").is(":visible")) {
            // alert("邮箱登陆")
            if($scope.text_email2==true&&$scope.text_pp==true){
                if(pictureAir.store("token_date")&&new Date().getTime()-pictureAir.store("token_date")>604800000){
                    $scope.loginInfo = {
                        phone:'',
                        email: '',
                        password: '',
                        compassword:'',
                        password2:'',
                        ID:'',
                        code:''
                    };
                    alert($scope.languagePack.home_againaccount);
                }else{
                    login($scope.loginInfo.email);
                }
            }else{
                $("#error").text($scope.languagePack.error_er7).show();
            }
        }
    }

    $scope.checkcode2=function () {
        if (pictureAir.store("sendtimes2")) {
            return false;
        }
        if ($scope.loginInfo.phone.length>0&&!pictureAir.phone_bat.test($scope.loginInfo.phone)) {
            $("#error2").text($scope.languagePack.error_mobile).show();
            return false;
        }
        var nat = $(".phone_email3 .phone .code").text();
        var datas = {
            access_token:pictureAir.store("access_token"),
            phone:nat+$scope.loginInfo.phone,//8615655566161
            type:1
        };
        console.log(datas);
        $http.post(pictureAir.host + "g/user/sendsms", datas).success(function (data) {
            console.log(data);
            if (data.status === 200) {
                alert($scope.languagePack.error_er2);
                //60s重新发送
                pictureAir.store("sendtimes2", "no");
                var count = 60;
                $scope.fn2 = $interval(function () {
                    thst();
                }, 1000);

                function thst() {
                    if (count > 0) {
                        count--;
                        document.getElementById("sendcode2").innerHTML = +count + "s";
                    } else {
                        document.getElementById("sendcode2").innerHTML = $scope.languagePack.error_er3;
                        $interval.cancel($scope.fn2);
                        pictureAir.removestore("sendtimes2");
                    }
                }
            } else if(data.status === 425){
                alert($scope.languagePack.error_eraxin6);
            }else if(data.status === 426){
                alert($scope.languagePack.error_eraxin1);
            }else if(data.status == 429){
                alert($scope.languagePack.error_eraxin14);
            } else {
                alert($scope.languagePack.error_er4);
            }
        })
    }
    if(window.location.href.indexOf("?v=") !== -1){
        var code=window.location.href.split("?v=")[1];
        console.log(code);
        $http.post(pictureAir.host + "g/user/verifyemailcode", {
            access_token:pictureAir.store("access_token"),
            vcode:code
        }).success(function (data) {
            if(data.status === 200){
                $(".login").show();
                $scope.relo=true;
                $scope.relo1=true;
                $(".titie_flag3").hide();
                $(".titie_flag4").hide();
                $(".titie_flag5").show();
                $(".phone_email3 .email").css("margin-bottom","16px");
                $(".phone_email3 .email").show();
                $scope.newpw=true;
            }else{
                alert($scope.languagePack.error_er11);
                $(".login").show();
                $scope.relo=true;
                $scope.relo1=true;
                $scope.changed3=true;
            }
        }).error(function () {
            alert($scope.languagePack.error_eraxin13);
            // $(".login").show();
            // $scope.relo=true;
            // $scope.relo1=true;
            // $scope.changed3=true;
        })
    }
    $scope.submit2=function () {
        if ($(".phone_email3 .phone").is(":visible")) {
            //alert("手机修改密码")
            if($scope.text_phone2==true&&$scope.loginInfo.code!==""){
                var username = $(".phone_email3 .phone .code").text() + $scope.loginInfo.phone;
                var datt1={
                    access_token: pictureAir.store("access_token"),
                    username: pictureAir.Trim(username),
                    vcode:$scope.loginInfo.code,
                    type:1
                }
                console.log(datt1);
                $http.post(pictureAir.host + "g/user/verifymobilecode",datt1).success(function (data) {
                    if (data.status === 200) {
                        alert($scope.languagePack.error_er1333);
                        pictureAir.store("phone_name",username);
                        pictureAir.store("phone_code",$scope.loginInfo.code);
                        document.getElementById("sendcode2").innerHTML = $scope.languagePack.error_er3;
                        $interval.cancel($scope.fn2);
                        pictureAir.removestore("sendtimes2");
                        $(".titie_flag3").hide();
                        $(".titie_flag4").hide();
                        $(".titie_flag5").show();
                        $scope.newpw=true;
                    }else if(data.status === 426){
                        alert($scope.languagePack.error_eraxin1)
                    }else if(data.status === 440){
                        alert($scope.languagePack.error_eraxin2)
                    }else{
                        console.log(data);
                    }
                });
            }else{
                $("#error2").text($scope.languagePack.error_er7).show();
            }

        }
        if ($(".phone_email3 .email").is(":visible")&&!$(".phone_email3 .password").is(":visible")) {
            //alert("邮箱修改密码")
            if($scope.text_email2==true){
                $http.post(pictureAir.host + "g/user/sendemailpwd", {
                    access_token: pictureAir.store("access_token"),
                    username:$scope.loginInfo.email
                }).success(function (data) {
                    console.log(data);
                    if (data.status === 200) {
                        alert($scope.languagePack.error_er12);
                        $scope.closedlogin();
                    }else if(data.status === 437){
                        alert($scope.languagePack.error_er12222);
                    }else if(data.status === 429){
                        alert($scope.languagePack.error_er15);
                    }else if(data.status === 430){
                        alert($scope.languagePack.error_eraxin5);
                    }else {
                        alert($scope.languagePack.error_er13)
                    }

                });

            }else{
                $("#error2").text($scope.languagePack.error_er7).show();
            }
        }
        if ($(".phone_email3 .password").is(":visible")) {
            //alert("重置密码")
            if($(".phone_email3 .email").is(":visible")){
                if($scope.text_pass12==true){
                    $http.post(pictureAir.host + "g/user/forgotpwd", {
                        access_token: pictureAir.store("access_token"),
                        username: pictureAir.Trim($scope.loginInfo.email),
                        password:hex_md5($scope.loginInfo.password),
                        vcode:code
                    }).success(function (data) {
                        if(data.status === 200){
                            alert($scope.languagePack.error_er14);
                            $location.path('/home');
                        }else if (data.status===430){
                            alert($scope.languagePack.error_er15);
                        }else if(data.status===436){
                            alert($scope.languagePack.error_er16);
                        }
                    })
                }else{
                    $("#error2").text( $scope.languagePack.error_er7).show();
                }
            }else{
                if($scope.text_pass12==true){
                    $http.post(pictureAir.host + "g/user/forgotpwd", {
                        access_token: pictureAir.store("access_token"),
                        username: pictureAir.Trim(pictureAir.store("phone_name")),
                        password:hex_md5($scope.loginInfo.password),
                        vcode:pictureAir.store("phone_code")
                    }).success(function (data) {
                        if(data.status === 200){
                            alert($scope.languagePack.error_er17);
                            pictureAir.removestore("phone_name");
                            pictureAir.removestore("phone_code");
                            $window.location.reload();
                        }else if (data.status===430){
                            alert($scope.languagePack.error_er15);
                        }else if(data.status===436){
                            alert($scope.languagePack.error_er16);
                        }
                    })
                }else{
                    $("#error2").text($scope.languagePack.error_er7).show();
                }
            }

        }
    }





    //首页添加pp卡号的交互
    function addppfun() {
        /*$http.post(pictureAir.host + "g/park/getAllParks",{
         token: pictureAir.store("token")
         }).success(function (data) {
         if(data.status === 200){
         console.log(data);
         }
         })*/
        var codes;
        codes= $("#ppc").val();
        if ($("#ppc").val() == "" || /^\s*$/.test($("#ppc").val())) {
            alert($scope.languagePack.error_er19);
            return false;
        }
        if (!(codes.length < 32&&codes.length>8)) {
            alert($scope.languagePack.error_eradd5);
            return false;
        }
        // if ((codes.length== 17||codes.length == 18)) {
        //     var openurl="http://pictureair.com/index.php?newcode="+codes;
        //     window.open(openurl,'_blank');
        //     return
        // }
        //检查pp卡号是否是可以的
        if(pictureAir.store("token")){
            if(window.confirm($scope.languagePack.error_eradd2)){
                // if(codes.length==17||codes.length==18){  //老图片
                //     $http.post(pictureAir.host + "p/photo/addPhotoFromOldSys", {
                //         token: pictureAir.store("token"),
                //         photoCode: codes
                //     }).success(function (data) {
                //         if (data.status === 200) {
                //             if(data.result.bindedCode.length>0){
                //                 alert($scope.languagePack.error_eradd4)
                //             }else{
                //                 alert($scope.languagePack.error_eradd3);
                //                 $location.path('/picture');
                //             }
                //
                //         }else {
                //             alert($scope.languagePack.error_er111);
                //         }
                //     })
                //     return
                // }
                $http.post(pictureAir.host + "p/user/addCodeToUser", {
                    token: pictureAir.store("token"),
                    customerId: codes
                }).success(function (data) {
                    if (data.status === 200) {
                        alert($scope.languagePack.error_eradd3);
                        $location.path('/picture');
                    } else if (data.status === 4012) {
                        alert($scope.languagePack.error_eradd4)
                    } else if (data.status === 4041) {
                        alert($scope.languagePack.error_eradd5)
                    } else if (data.status === 4042) {
                        alert($scope.languagePack.error_eraxin7)
                    }else {

                    }
                })
                return true;
            }else{
                //alert("取消");
                return false;
            }
        }else{
            // if ((codes.length== 17||codes.length == 18)) { //老图片
            //     $http.post(pictureAir.host + "g/photo/getPhotoByOldSys", {
            //         access_token: pictureAir.store("access_token"),
            //         photoCode: codes
            //     }).success(function (data) {
            //         if (data.status === 200) {
            //             if(data.result.photos.length==0){
            //                 alert($scope.languagePack.error_er112)
            //             }else {
            //                 console.log(data);
            //                 pictureAir.removestore("customerId");
            //                 pictureAir.removestore("photoCodeId");
            //                 pictureAir.store("photoCodeId", codes);
            //                 pictureAir.removestore("sendtimes");
            //                 pictureAir.removestore("sendtimes2");
            //                 $location.path('/picture');
            //             }
            //         }else{
            //             alert($scope.languagePack.error_er111)
            //         }
            //     })
            //     return
            // }
            $http.post(pictureAir.host + "g/photo/getPhotosByConditions", {
                access_token: pictureAir.store("access_token"),
                condition: "customerId",
                customerId:codes
            }).success(function (data) {
                // BPSG632UDD39HD78
                if (data.status === 200) {
                    if(data.result.photos.length==0){
                        alert($scope.languagePack.error_er112)
                    }else{
                        console.log(data);
                        pictureAir.removestore("customerId");
                        pictureAir.removestore("photoCodeId");
                        pictureAir.store("customerId",codes);
                        pictureAir.removestore("sendtimes");
                        pictureAir.removestore("sendtimes2");
                        $location.path('/picture');
                    }
                }
                else if (data.status === 4007) {
                    alert($scope.languagePack.error_er111)
                }
                else if (data.status === 4034) {
                    alert($scope.languagePack.error_er112)
                } else {
                    alert($scope.languagePack.error_er111)
                }
            })
        }
    }
    $("#addpp").on("click",addppfun)
    $("#ppc").bind('keydown',function(event){
        if(event.keyCode == "13")
        {
            addppfun();
        }
    });
// appdown 下载跳转
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    function openclient() {
        // alert($scope.languagePack.error_eraxin9);
        // return;
        var ua = navigator.userAgent.toLowerCase();
        var t;
        var config = {
            scheme_IOS: 'PictureAir://',
            scheme_Adr: 'PictureAir://com.PictureAir',
            download_url: '',
            timeout: 200
        };
        var startTime = new Date();
        var ifr = document.createElement('iframe');
        if (ua.indexOf('os') > 0) {
            // window.location.href = "PictureAir://";
            // window.setTimeout(function(){
                window.location.href = "https://itunes.apple.com/us/app/xiang-ji./id1193434294?l=zh&ls=1&mt=8";//打开app下载地址，有app同事提供
            // },2000)

            // var browser_agent = navigator.userAgent;
            // //非ie
            // if(browser_agent.indexOf("MSIE")!=-1){
            //     var a=navigator.browserlanguage;
            //     if((a=="zh-CN")||a=="zh-cn"){
            //         alert("国内ip")
            //     } else{
            //         alert("国外ip")
            //     }
            // }
            // //ie
            // else{
            //     var b=navigator.language;
            //     if((b=="zh-CN")||b=="zh-cn"){
            //         alert("国内ip")
            //     } else{
            //         alert("国外ip")
            //     }
            // }
        } else {
            window.location.href = "https://play.google.com/store/apps/details?id=com.pictureAir";
        }
    }
    function openclient1() {
        window.location.href = "https://itunes.apple.com/us/app/xiang-ji./id1193434294?l=zh&ls=1&mt=8";//打开app下载地址，有app同事提供
    }
    function openclient2() {
        if (isWeiXin()) {
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.pictureAir";//腾讯应用宝
            return
        }
        var browser_agent = navigator.userAgent;
        //非ie
        if(browser_agent.indexOf("MSIE")!=-1){
            var a=navigator.browserlanguage;
            if((a=="zh-CN")||a=="zh-cn"){
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.pictureAir";//国内IP
            } else{
                window.location.href = "https://play.google.com/store/apps/details?id=com.pictureAir";//国外IP
            }
        }
        //ie
        else{
            var b=navigator.language;
            if((b=="zh-CN")||b=="zh-cn"){
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.pictureAir";//国内IP
            } else{
                window.location.href = "https://play.google.com/store/apps/details?id=com.pictureAir";//国外IP
            }
        }
    }
    if (device.androidPhone() || device.iphone()) {
        // openclient()
        $("#down_ios").on("click", openclient1)
        $("#down_and").on("click", openclient2)
        $("#down_ios2").on("click", openclient1)
        $("#down_and2").on("click", openclient2)
    } else {
        $("#down_ios").on("click", function () {
            $window.location = "https://itunes.apple.com/us/app/xiang-ji./id1193434294?l=zh&ls=1&mt=8";
        })
        $("#down_and").on("click", function () {
            openclient2();
        })
        $("#down_ios2").on("click", function () {
            $window.location = "https://itunes.apple.com/us/app/xiang-ji./id1193434294?l=zh&ls=1&mt=8";
        })
        $("#down_and2").on("click", function () {
            openclient2();
        })
    }
}])