/**
 * Created by peter.dong on 16/11/26.
 */
pictureModule.controller("PrivacyController",["$scope","$http","$interval","$window","$location",  function($scope,$http,$interval,$window,$location){

    if(pictureAir.store("token")){
        if(pictureAir.store("token_date")&&new Date().getTime()-pictureAir.store("token_date")>604800000){
            alert($scope.languagePack.home_againaccount);
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
    $scope.page_home=function(){
        $location.path('/home');
    }


    if(pictureAir.store("access_token")){

    }else{
        $http.post(pictureAir.host + "auth/getAccessToken", {
            appid:pictureAir.appId,
            t : '0',
            lg : 'en-US'
        }).success(function (data) {
            if(data.status === 200){
                var access_token=data.result.access_token;
                pictureAir.store("access_token",access_token);
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
    if(window.location.href.indexOf("?lan=") !== -1){
        var about_lan=window.location.href.split("?lan=")[1];
        $scope.about_lan=about_lan;
        $scope.swapLanlogin(about_lan);
    }else if(pictureAir.store("enzh")){
        var enzh=pictureAir.store("enzh");
        $scope.about_lan=enzh;
        $scope.swapLanlogin(enzh);
    }else{
        $scope.about_lan="en";
        $scope.swapLanguagelogin("en");
        pictureAir.store("enzh","en");
    }
    pictureAir.removestore("sendtimes");
    pictureAir.removestore("sendtimes2");
    function login_contact() {
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
    }
    login_contact()
}])