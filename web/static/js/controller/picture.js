/**
 * Created by peter.dong on 16/11/21.
 */
pictureModule.controller("PictureController",["$scope","$location","$interval","$http", "$window","$location", function($scope,$location,$interval,$http, $window,$location){
    var a;
    var ppp;
    function shujusent(aaa) {
        // for(var hh=0;hh<aaa.length;hh++){
        //     if(aaa[hh].thumbnail.x128.url.indexOf("http") !== -1){
        //         // if(aaa[hh].isPaid==true){
        //         //     aaa[hh].originalInfo.url=aaa[hh].originalInfo.url;
        //         // }else{
        //         //     aaa[hh].originalInfo.url=aaa[hh].thumbnail.x1024.url;
        //         // }
        //     }else{
        //         aaa[hh].thumbnail.x128.url=pictureAir.http+aaa[hh].thumbnail.x128.url;
        //         aaa[hh].thumbnail.x512.url=pictureAir.http+aaa[hh].thumbnail.x512.url;
        //         aaa[hh].thumbnail.x1024.url=pictureAir.http+aaa[hh].thumbnail.x1024.url;
        //         if(aaa[hh].isPaid==true){
        //             aaa[hh].originalInfo.url=pictureAir.http+aaa[hh].originalInfo.url;
        //         }
        //         // else{
        //         //     aaa[hh].originalInfo.url=aaa[hh].thumbnail.x1024.url;
        //         // }
        //     }
        //     aaa[hh].coverHeaderImage.lg=pictureAir.http+aaa[hh].coverHeaderImage.lg;
        //     aaa[hh].coverHeaderImage.xs=pictureAir.http+aaa[hh].coverHeaderImage.xs;
        //     aaa[hh].logoUrl=pictureAir.http+aaa[hh].logoUrl;
        // }
        var p=[];
        var n=0;
        p[0]={};
        p[0].img=[];
        for(var i=0;i<aaa.length;i++){

            if(aaa[i].thumbnail.x128.url.indexOf("http") !== -1){

            }else{
                aaa[i].thumbnail.x128.url=pictureAir.http+aaa[i].thumbnail.x128.url;
                aaa[i].thumbnail.x512.url=pictureAir.http+aaa[i].thumbnail.x512.url;
                aaa[i].thumbnail.x1024.url=pictureAir.http+aaa[i].thumbnail.x1024.url;
                if(aaa[i].isPaid==true){
                    aaa[i].originalInfo.url=pictureAir.http+aaa[i].originalInfo.url;
                }
            }
            aaa[i].coverHeaderImage.lg=pictureAir.http+aaa[i].coverHeaderImage.lg;
            aaa[i].coverHeaderImage.xs=pictureAir.http+aaa[i].coverHeaderImage.xs;
            aaa[i].logoUrl=pictureAir.http+aaa[i].logoUrl;
            if(aaa[i].pageUrl.indexOf("http") !== -1){

            }else{
                aaa[i].pageUrl="http://"+aaa[i].pageUrl;
            }


            p[n].time=aaa[i].shootOn.substring(0,10);
            p[n].img.push(aaa[i]);
            for(var j=i+1;j<aaa.length;j++){

                if(aaa[j].thumbnail.x128.url.indexOf("http") !== -1){

                }else{
                    aaa[j].thumbnail.x128.url=pictureAir.http+aaa[j].thumbnail.x128.url;
                    aaa[j].thumbnail.x512.url=pictureAir.http+aaa[j].thumbnail.x512.url;
                    aaa[j].thumbnail.x1024.url=pictureAir.http+aaa[j].thumbnail.x1024.url;
                    if(aaa[j].isPaid==true){
                        aaa[j].originalInfo.url=pictureAir.http+aaa[j].originalInfo.url;
                    }
                }


                if(aaa[i].siteId==aaa[j].siteId&&aaa[i].shootOn.substring(0,10)==aaa[j].shootOn.substring(0,10)){
                    p[n].img.push(aaa[j]);
                    aaa.splice(j,1);
                    j--;
                }
            }
            if(i<aaa.length-1){
                n++;
                p[n]={};
                p[n].img=[];
            }


        }
        console.log(p);
        ppp=[];
        var m=0;
        ppp[0]={};
        ppp[0].photo=[];
        for(var k=0;k<p.length;k++){
            ppp[m].photo.push(p[k]);
            ppp[m].num=p[k].img.length;
            ppp[m].begintime=p[k].time;
            ppp[m].overtime=p[k].time;
            ppp[m].name=p[k].img[0].parkName;
            ppp[m].siteId=p[k].img[0].siteId;
            ppp[m].sitelink=p[k].img[0].pageUrl;
            ppp[m].logoimg=p[k].img[0].logoUrl;
            ppp[m].lawUrl=p[k].img[0].lawUrl;
            if($(window).width()>$(window).height()){
                ppp[m].siteimg=p[k].img[0].coverHeaderImage.xs;
            }else{
                ppp[m].siteimg=p[k].img[0].coverHeaderImage.lg;
            }
            for(var l=k+1;l<p.length;l++){
                if(p[k].img[0].siteId==p[l].img[0].siteId){
                    ppp[m].photo.push(p[l]);
                    ppp[m].num+=p[l].img.length;
                    ppp[m].overtime=p[l].time;
                    p.splice(l,1);
                    l--;
                }
            }
            if(k<p.length-1){
                m++;
                ppp[m]={};
                ppp[m].photo=[];
            }
        }
        console.log(ppp);
    }
    if(pictureAir.store("access_token")){
        if(pictureAir.store("customerId")){
            $http.post(pictureAir.host + "g/photo/getPhotosByConditions", {
                    access_token: pictureAir.store("access_token"),
                    condition: "customerId",
                    customerId:pictureAir.Trim(pictureAir.store("customerId"))
            }).success(function (data) {
                if (data.status === 200) {
                    console.log(data);
                    pictureAir.removestore("addcode");
                    pictureAir.removestore("addphotoCode");
                    pictureAir.store("addcode",pictureAir.store("customerId"));
                    pictureAir.removestore("customerId");
                    a=data.result.photos;
                    shujusent(a);
                    $scope.d1=ppp;
                    $scope.pic_loading=true;
                    angular.forEach($scope.d1,function (data,index) {
                        data.ss=true;
                    })
                    angular.forEach($scope.d1,function (data,index) {
                        angular.forEach(data.photo,function (data1,index){
                            data1.showhide=true;
                            data1.flag_showhide=false;
                            data1.h_showhide=0;
                        })
                    })
                }
            })
        }else if(pictureAir.store("photoCodeId")){
            $http.post(pictureAir.host + "g/photo/getPhotoByOldSys", {
                access_token: pictureAir.store("access_token"),
                photoCode: pictureAir.Trim(pictureAir.store("photoCodeId"))
            }).success(function (data) {
                if (data.status === 200) {
                    console.log(data);
                    pictureAir.removestore("addcode");
                    pictureAir.removestore("addphotoCode");
                    pictureAir.store("addphotoCode",pictureAir.store("photoCodeId"));
                    pictureAir.removestore("photoCodeId");
                    a=data.result.photos;
                    shujusent(a);
                    $scope.d1=ppp;
                    $scope.pic_loading=true;
                    angular.forEach($scope.d1,function (data,index) {
                        data.ss=true;
                    })
                    angular.forEach($scope.d1,function (data,index) {
                        angular.forEach(data.photo,function (data1,index){
                            data1.showhide=true;
                            data1.flag_showhide=false;
                            data1.h_showhide=0;
                        })
                    })
                }
            })
        }else{
            if(pictureAir.store("token")){
                $("#header .navbar_input").css("display","inline-block");
                $("#header #sign").css("display","none");
                $("#header #about").css("display","none");
                $("#header #profile").css("display","inline-block");
                $("#header #out").css("display","inline-block");
                $http.post(pictureAir.host + "p/photo/getPhotosForWeb", {
                        condition: "userId",
                        token: pictureAir.store("token")
                }).success(function (data) {
                    if (data.status === 200) {
                        console.log(data);
                        a=data.result.photos;
                        // for(var nn=0;nn<a.length;nn++){
                        //     if(a[nn].isPaid=== false){
                        //         a.splice(nn,1);
                        //         nn--;
                        //     }
                        // }
                        if(a.length==0){
                            $scope.pic_loading=true;
                            $(".picture").css({'padding-top':'400px'});
                            return
                        }
                        shujusent(a);
                        $scope.d1=ppp;
                        $scope.pic_loading=true;
                        angular.forEach($scope.d1,function (data,index) {
                            data.ss=true;
                        })
                        angular.forEach($scope.d1,function (data,index) {
                            angular.forEach(data.photo,function (data1,index){
                                data1.showhide=true;
                                data1.flag_showhide=false;
                                data1.h_showhide=0;
                            })
                        })
                        // setTimeout(function () {
                        //     alert($scope.languagePack.error_eraxin10);
                        // },3000)
                    }
                })
            }else{
                $location.path('/home');
            }

        }
    }else{
        $location.path('/home');
    }

    // $scope.renderFinishs=function (dd) {
    //    var img;
    //     setTimeout(function () {
    //         img=$("#"+dd).find(".small_img");
    //         debugger;
    //         img=img.get(0);
    //         imgOnLoad(img);
    //     },50)
    //
    // }








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
                console.log(data)
            }else {
                console.log(data)
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
            $scope.$broadcast('sendParent',lan);
            $scope.$broadcast('sendParent2',lan);
            if(lan=="ri"){
                lan="en"
            }
            $scope.lanbb=lan;
            //$scope.$broadcast('sendParent3',lan); //parkname
        }else{

            //$scope.$broadcast('sendParent3',lan); //parkname
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
            $scope.$broadcast('sendParent',lan);
            $scope.$broadcast('sendParent2',lan);
            if(lan=="ri"){
                lan="en"
            }
            $scope.lanbb=lan;
        }
    };


    if(pictureAir.store("enzh")){
        var enzh=pictureAir.store("enzh");
        $scope.swapLanlogin(enzh);
        $scope.enzh1=enzh;
    }else{
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
                        if(pictureAir.store("addcode")){
                            $http.post(pictureAir.host + "p/user/addCodeToUser", {
                                token: pictureAir.store("token"),
                                customerId: pictureAir.store("addcode")
                            }).success(function (data) {
                                if (data.status === 200||data.status === 4042||data.status === 4047) {
                                    pictureAir.removestore("addcode");
                                    window.history.go(0);
                                    location.reload()
                                }else {
                                    alert($scope.languagePack.error_eraxin13);
                                }
                            })
                        }
                        if(pictureAir.store("addphotoCode")){
                            $http.post(pictureAir.host + "p/photo/addPhotoFromOldSys", {
                                token: pictureAir.store("token"),
                                photoCode: pictureAir.store("addphotoCode")
                            }).success(function (data) {
                                if (data.status === 200||data.status === 4042||data.status === 4047) {
                                    pictureAir.removestore("addphotoCode");
                                    window.history.go(0);
                                    location.reload()
                                }else {
                                    alert($scope.languagePack.error_eraxin13);
                                }
                            })
                        }

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
    /*
     newDate.toLocaleDateString()
     "2016/12/2"

     var a="2016-05-05"
     new Date(a)
     Thu May 05 2016 08:00:00 GMT+0800 (CST)
     a=new Date(a).toDateString()
     "Thu May 05 2016"
     a.substring(4,10)+","+a.substring(11)
     "Dec 02,2016"

     var a="2016-05-05"
     new Date(a)
     Thu May 05 2016 08:00:00 GMT+0800 (CST)
    newDate.toLocaleDateString();
    2014年6月18日
    */
    $scope.d1s=[
        {
            "bigphoto":"static/img/text2.jpg",
            "begintime":"2016-12-01",
            "overtime":"2016-12-02",
            "num":"100",
            "siteimg":"hgh",
            "sitelink":"hfjhdjfhjd",
            "logoimg":"jh",
            "id":"1",
            'photo':[
                {
                    "time":"2016-12-02",
                    "img":[
                        {
                            "_id":131,
                            "img":"static/img/text1.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":141,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        }
                    ]
                },
                {
                    "time":"2016-11-02",
                    "img":[
                        {
                            "_id":113,
                            "img":"static/img/text1.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":114,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        }
                    ]
                }

            ]
        },
        {
            "bigphoto":"static/img/text2.jpg",
            "begintime":"2016-11-01",
            "overtime":"2016-12-02",
            "num":"100",
            "id":"2",
            'photo':[
                {
                    "time":"2016-12-02",
                    "img":[
                        {
                            "_id":123,
                            "img":"static/img/text1.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":124,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":134,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":164,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":174,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        }
                    ]
                },
                {
                    "time":"2016-12-01",
                    "img":[
                        {
                            "_id":137,
                            "img":"static/img/text1.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":144,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        }
                    ]
                },
                {
                    "time":"2016-12-01",
                    "img":[
                        {
                            "_id":1371,
                            "img":"static/img/text1.jpg",
                            "width":820,
                            "height":547
                        },
                        {
                            "_id":1441,
                            "img":"static/img/text2.jpg",
                            "width":820,
                            "height":547
                        }
                    ]
                }

            ]
        }
    ]

    $("#loginclosed").on("click", function (e) {
        $(".picture").show();
    })
    //选择图片
    var flag=false;
    $scope.select_fu=function (operation,dataq) {
        if(!pictureAir.store("token")){
            $(".login").show();
            if (device.androidPhone() || device.iphone()) {
                $(".picture").hide();
            }
            return
        }
        dataq.photo_num=0;
        if (operation) {
            if(flag){
                dataq.photo_num=0;
                angular.forEach(dataq,function (data,index) {
                    data.selecting=true;
                    dataq.photo_num++;
                })
            }
        }
        else {
            angular.forEach(dataq,function (data,index) {
                data.selecting=false;
            })
            dataq.photo_num=0;
            flag=true;
            dataq.selected=!dataq.selected;
        }
    }
    //选中状态 选择和取消
    $scope.select_photos=function (dd,index,dataq) {
        if((device.androidPhone() || device.iphone())&&(dataq.selected===undefined||!dataq.selected)){
            $scope.chosenPhoto(dd,index,dataq);
        }
        if(!pictureAir.store("token")){
            return
        }
        var a=document.getElementById(dd._id);
        if($(a.parentNode.parentNode).find(".fun1").is(":visible")){//双重父集查找
            return;
        }
        dd.selecting=!dd.selecting;
        if(dd.selecting){
            console.log("选中");
            dataq.photo_num++;
        }else{
            console.log("未选中")
            dataq.photo_num--;
        }

    }
    //一键下载
    $scope.download=function (down) {
        var pplist="";
        var num=0;
        angular.forEach(down,function (data,index) {
            if(data.selecting){
                pplist+=data._id+",";
                num++;
            }
        })
        var len=pplist.length-1;
        pplist=pplist.substring(0,len);
        if(num==0){
            alert($scope.languagePack.error_eraxin11);
            return;
        }
        // if(num>50){
        //     alert($scope.languagePack.error_eraxin12);
        //     return;
        // }
        var downdata={
            photoIds:pplist,
            userName:pictureAir.store("username"),
            token:pictureAir.store("token")
        };
        $http.post(pictureAir.host + "p/photo/quickDownloadPhotosParam",downdata).success(function (data) {
            if(data.status === 200){
                var data1={};
                data1.key=data.result.key;
                data1.token=pictureAir.store("token");
                $('#OpenPhotos').attr('src',pictureAir.host+'p/photo/quickDownloadPhotos?'+$.param(data1));
            }else if(data.status === 4045){
                alert($scope.languagePack.error_eraxin133);
            }
        });
    }
    //园区大图展开
    // angular.forEach($scope.d1,function (data,index) {
    //     data.ss=true;
    // })

    $scope.showbig=function (operation,d11,index) {
        var h=$(window).height();
            h=h-90;
        if (operation) {
            d11.ss=!d11.ss;
            $(".team_img").eq(index).css("height",h+"px");
            var scrooltop=$(".team").eq(index).position().top;
                $('body,html').animate({
                    scrollTop: scrooltop-40
                }, 1000);
        }
        else {
            d11.ss=!d11.ss;
            $(".team_img").eq(index).css("height","210px");
        }
    }
    // angular.forEach($scope.d1,function (data,index) {
    //     angular.forEach(data.photo,function (data1,index){
    //         data1.showhide=true;
    //         data1.flag_showhide=false;
    //         data1.h_showhide=0;
    //     })
    // })
    $scope.show_hide=function (operation,da,index1,index2) {
        if(!pictureAir.store("token")){
            $(".login").show();
            if (device.androidPhone() || device.iphone()) {
                $(".picture").hide();
            }
            return
        }
        var obj=$(".team").eq(index1).find(".main_quan_all").eq(index2);
        if (operation) {
            if(!da.flag_showhide){
                da.h_showhide=obj.height();
            }
            da.showhide=!da.showhide;
            obj.animate({
                "height": "53px"
            }, 1000);
            da.flag_showhide=true;
        }
        else if(!operation&&da.flag_showhide){
            da.showhide=!da.showhide;
            obj.animate({
                "height": da.h_showhide+40
            }, 1000);
        }
    }
    //双击大图
    $scope.chosenPhoto=function (dd,index,data) {
        if(!pictureAir.store("token")){
            $(".login").show();
            if (device.androidPhone() || device.iphone()) {
                $(".picture").hide();
            }
            return
        }
        $(".preview").show();
        $("html").css("overflow","hidden");
        if(device.androidPhone() || device.iphone()){

        }else{
            $("#btnPreviewNext").show();
            $("#btnPreviewPrevious").show();
        }
        $(".preview .preview_model .photo1 img").show();
        $(".preview .preview_model .photo3 img").show();
        if(index>0){
            var img1=$(".preview .preview_model .photo1 img");
            var path1 = ".photo" + " #" + data[index-1]._id;
            var src1= $(path1+"ImgSrc1024").val();
            //var src1=data[index-1].img;
            img1.attr("src",src1);
            img1.attr("name",data[index-1]._id);
        }else{
            var img1=$(".preview .preview_model .photo1 img");
            var src1="";
            img1.attr("src",src1);
        }

        if(index<data.length-1){
            var img3=$(".preview .preview_model .photo3 img");
            var path3 = ".photo" + " #" + data[index+1]._id;
            var src3= $(path3+"ImgSrc1024").val();
            // var src3=data[index+1].img;
            img3.attr("src",src3);
            img3.attr("name",data[index+1]._id);
        }else{
            var img3=$(".preview .preview_model .photo3 img");
            var src3="";
            img3.attr("src",src3);
        }
        if(index==0&&data.length>1){
            $(".preview .preview_model .photo1 img").hide();
            $("#btnPreviewPrevious").hide();
        }
        if(index==data.length-1&&data.length>1){
            $(".preview .preview_model .photo3 img").hide();
            $("#btnPreviewNext").hide();
        }
        if(index==0&&index==data.length-1){
            $(".preview .preview_model .photo1 img").hide();
            $("#btnPreviewPrevious").hide();
            $(".preview .preview_model .photo3 img").hide();
            $("#btnPreviewNext").hide();
        }
        if(index<0||index>data.length-1){
            return;
        }
        var img2=$(".preview .preview_model .photo2 img");
        var path2 = ".photo" + " #" + data[index]._id;
        var src2= $(path2+"ImgSrc1024").val();
        // var src2=data[index].img;
        img2.attr("src",src2);
        $("#down_big_url").attr("href",dd.originalInfo.url);
        img2.attr("name",data[index]._id);//dd有问题  没变化
        qqfriends();
        qqzone();
    }
    //大图前后切换
    $scope.changePreviewImage = function (operation) {
        if(device.androidPhone() || device.iphone()){

        }else{
            $("#btnPreviewNext").show();
            $("#btnPreviewPrevious").show();
        }
        $(".preview .preview_model .photo1 img").show();
        $(".preview .preview_model .photo3 img").show();
        var id = $(".preview .preview_model .photo2 img").prop("name"); //id= preview.eq(0).prop("id"),
        var id1 = "#" + id + "photoObj";
        var id2 = "#" + id + "Obj";
        var id3 = "#" + id + "index";
        var dd1=JSON.parse($(id1).val());
        var dd2=JSON.parse($(id2).val());
        var index=parseInt($(id3).val());
        index = operation == "btn_next" ? index + 1 : index - 1;
        if(index==0){
            $(".preview .preview_model .photo1 img").hide();
            $("#btnPreviewPrevious").hide();
            if (index < 0) {
                return;
            }
        }
        if(index == dd2.length-1){
            $(".preview .preview_model .photo3 img").hide();
            $("#btnPreviewNext").hide();
            if (index > dd2.length-1) {
                return ;
            }
        }

        $scope.chosenPhoto(dd1,index,dd2);

    }
    //大图后退关闭
    $scope.hide_close=function () {
        $(".preview").hide();
        $("html").css({
            "margin-top" : '0px',
            "margin-right" : '0px',
            "overflow" : 'initial'
        })
    }

    //分享展开
    $scope.fx_changed=false;
    $scope.fx_down=function () {
        $scope.fx_changed=!$scope.fx_changed
    }


    function qqfriends() {
        var id = $(".preview .preview_model .photo2 img").prop("name");
        $http.post(pictureAir.host + "p/user/getShareUrl", {
            token: pictureAir.store("token"),
            shareContent: {
                ids:id,
                mode:"photo"
            },
            isUseShortUrl:true
        }).success(function (data) {
            if (data.status === 200) {
                var url=data.result.shareUrl;
                var shareImg;
                shareImg = $(".preview .preview_model .photo2 img").attr("src");
                var p = {
                    url: url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
                    desc: '', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
                    title: $scope.languagePack.sharing_Title, /*分享标题(可选)*/
                    summary: $scope.languagePack.sharing_Summary, /*分享摘要(可选)*/
                    pics: shareImg, /*分享图片(可选)*/
                    flash: '', /*视频地址(可选)*/
                    site: $scope.languagePack.sharing_Site, /*分享来源(可选) 如：QQ分享*/
                    style: '201',
                    width: 32,
                    height: 32
                };
                var s = [];
                for (var i in p) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
                document.getElementById("link_qqfriends").innerHTML = ['<a class="qcShareQQDiv" href="http://connect.qq.com/widget/shareqq/index.html?', s.join('&'), '" target="_blank">分享到QQ</a>'].join('');
                document.getElementById('link_qqfriends').innerHTML += ' <script src="http://connect.qq.com/widget/loader/loader.js" widget="shareqq" charset="utf-8"></script>'

            }
        }).error(function (data) {
            console.log(data);
        })

    }
    function qqzone() {
        var id = $(".preview .preview_model .photo2 img").prop("name");
        $http.post(pictureAir.host + "p/user/getShareUrl", {
            token: pictureAir.store("token"),
            shareContent: {
                ids:id,
                mode:"photo"
            },
            isUseShortUrl:true
        }).success(function (data) {
            if (data.status === 200) {
                var url=data.result.shareUrl;
                var shareImg;
                shareImg = $(".preview .preview_model .photo2 img").attr("src");
                var p = {
                    url: url,
                    showcount: '1', /*是否显示分享总数,显示：'1'，不显示：'0' */
                    desc: $scope.languagePack.sharing_Summary, /*默认分享理由(可选)*/
                    summary: $scope.languagePack.sharing_Summary, /*分享摘要(可选)*/
                    title: $scope.languagePack.sharing_Title, /*分享标题(可选)*/
                    site: $scope.languagePack.sharing_Site, /*分享来源 如：腾讯网(可选)*/
                    pics: shareImg, /*分享图片的路径(可选)*/
                    style: '201',
                    width: 113,
                    height: 39
                };
                var s = [];
                for (var i in p) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
                document.getElementById("link_qqzone").innerHTML = ['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?', s.join('&'), '" target="_blank">分享</a>'].join('');
                document.getElementById("link_qqzone").innerHTML += '<script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>'

            }
        }).error(function (data) {
            console.log(data);
        })

    }
    $("#link_tsina").on("click", function () {
        var id = $(".preview .preview_model .photo2 img").prop("name");
        $http.post(pictureAir.host + "p/user/getShareUrl", {
            token: pictureAir.store("token"),
            shareContent: {
                ids:id,
                mode:"photo"
            },
            isUseShortUrl:true
        }).success(function (data) {
            if (data.status === 200) {
                var url=data.result.shareUrl;
                var shareImg;
                shareImg = $(".preview .preview_model .photo2 img").attr("src");
                var host1 = 'http://service.weibo.com/share/share.php?',
                    pic = shareImg,
                    title = $scope.languagePack.sharing_Title,
                    appkey = "932683602"
                var res = host1 + "url=" + encodeURIComponent(url) + "&appkey=" + appkey + "&title=" + encodeURIComponent(title) + "&pic=" + encodeURIComponent(shareImg) + "&ralateUid=&language="
                window.open(res);

            }
        }).error(function (data) {
            console.log(data);
        })

    })
    function postToWb() {
        var id = $(".preview .preview_model .photo2 img").prop("name");
        $http.post(pictureAir.host + "p/user/getShareUrl", {
            token: pictureAir.store("token"),
            shareContent: {
                ids:id,
                mode:"photo"
            },
            isUseShortUrl:true
        }).success(function (data) {
            if (data.status === 200) {
                var _url=data.result.shareUrl;
                var _title,_source,_sourceUrl,_pic,_showcount,_desc,_summary,_site,
                    _width = 600,
                    _height = 600,
                    _top = (screen.height-_height)/2,
                    _left = (screen.width-_width)/2;
                _pic = $(".preview .preview_model .photo2 img").attr("src");
                event.preventDefault();
                var _shareUrl = 'http://v.t.qq.com/share/share.php?';
                _shareUrl += 'title=' + encodeURIComponent($scope.languagePack.sharing_Title+_url);    //分享的标题
                _shareUrl += '&url=' + encodeURIComponent("");    //分享的链接
                _shareUrl += '&appkey=5bd32d6f1dff4725ba40338b233ff155';    //在腾迅微博平台创建应用获取微博AppKey
                _shareUrl += '&site=' + encodeURIComponent(_site);   //分享来源
                _shareUrl += '&pic=' + encodeURIComponent(_pic||'');    //分享的图片，如果是多张图片，则定义var _pic='图片url1|图片url2|图片url3....'
                window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',left='+_left+',top='+_top+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
            }
        }).error(function (data) {
            console.log(data);
        })

    }
    $("#link_tcweb").on("click", postToWb);
    function shareToFacebook(event){
        var id = $(".preview .preview_model .photo2 img").prop("name");
        $http.post(pictureAir.host + "p/user/getShareUrl", {
            token: pictureAir.store("token"),
            shareContent: {
                ids:id,
                mode:"photo"
            },
            isUseShortUrl:true
        }).success(function (data) {
            if (data.status === 200) {
                var _url=data.result.shareUrl;
                var _pic;
                _pic = $(".preview .preview_model .photo2 img").attr("src");
                var _title,_source,_sourceUrl,_showcount,_desc,_summary,_site,
                    _width = 600,
                    _height = 600,
                    _top = (screen.height-_height)/2,
                    _left = (screen.width-_width)/2;
                event.preventDefault();
                var _shareUrl = 'http://www.facebook.com/sharer/sharer.php?';
                _shareUrl += 'u=' + encodeURIComponent(_url||location.href);    //分享的链接
                _shareUrl += '&t=' + encodeURIComponent($scope.languagePack.sharing_Title);    //分享的标题
                window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',left='+_left+',top='+_top+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');

            }
        }).error(function (data) {
            console.log(data);
        })

    }
    $("#link_tface").on("click", shareToFacebook);

    function shareToTwitter(event){
        var id = $(".preview .preview_model .photo2 img").prop("name");
        $http.post(pictureAir.host + "p/user/getShareUrl", {
            token: pictureAir.store("token"),
            shareContent: {
                ids:id,
                mode:"photo"
            },
            isUseShortUrl:true
        }).success(function (data) {
            if (data.status === 200) {
                var _url=data.result.shareUrl;
                var _pic;
                _pic = $(".preview .preview_model .photo2 img").attr("src");
                var _title,_source,_sourceUrl,_showcount,_desc,_summary,_site,
                    _width = 600,
                    _height = 600,
                    _top = (screen.height-_height)/2,
                    _left = (screen.width-_width)/2;
                event.preventDefault();
                var _shareUrl = 'http://twitter.com/intent/tweet?';
                _shareUrl += 'url=' + encodeURIComponent(_url||location.href);    //分享的链接
                _shareUrl += '&text=' + encodeURIComponent($scope.languagePack.sharing_Title);    //分享的标题
                window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',left='+_left+',top='+_top+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');

            }
        }).error(function (data) {
            console.log(data);
        })

    }
    $("#link_twitter").on("click", shareToTwitter);


    //profile功能
    $.extend({
        pwlist: function (ele) {
            var selector = ele,
                list = selector + "_list",
                list_item = list.replace("#", ".") + "_item";
            $(selector).on("click", function (e) {
                $(list).show();
                $(selector).blur()
                e.stopPropagation();
            })
            $(list).on("click", function (e) {
                e.stopPropagation();
            })
            $("html,body").on("click", function () {
                $(list).hide()
            })
            $(list_item).on("click", function () {
                $(selector).val($(this).text())
                $(list).hide()
            })
        }
    })
    $.pwlist("#pro_gender");


    //个人profile展开
    $scope.showProfile=function (operation) {
        if(operation){
            $(".profile").show();
            $http.post(pictureAir.host + "p/user/getuser", {
                token: pictureAir.store("token")
            }).success(function (data) {
                if (data.status === 200) {
                    console.log(data);
                    var data=data.result;
                    if(/^\d+$/.test(data.userName)==true){
                        $("#pro_phone").val(data.userName);
                        $('#pro_phone').attr("disabled",true);
                        $("#pro_email").val(data.email);
                        pictureAir.store("username",data.userName)
                    }else{
                        $("#pro_email").val(data.userName);
                        $('#pro_email').attr("disabled",true);
                        $("#pro_phone").val(data.mobile);
                        pictureAir.store("username",data.userName)
                    }
                    if(data.gender==-1){
                        $("#pro_gender").val("");
                    }
                    if(data.gender==0){
                        $("#pro_gender").val($scope.languagePack.picture_female);
                    }
                    if(data.gender==1){
                        $("#pro_gender").val($scope.languagePack.picture_male);
                    }
                    $("#pro_name").val(data.name);
                    $("#pro_dob").val(data.birthday);
                    $("#pro_country").val(data.country);
                }
            })
        }else{
            $(".profile").hide();
        }

    }

    $(".profile .save").on("click", function (e) {
        e.preventDefault();
        var _birthreg = /\d{4}-\d{2}-\d{2}/;
        if ($("#pro_phone").val() == "" &&$("#pro_name").val() == "" && $("#pro_email").val() == "" && $("#pro_dob").val() == "" && $("#pro_country").val() == ""
            && $("#pro_gender").val() == "" ) {
            $(".profile .save_error").text($scope.languagePack.error_er1191).show()
        } else {
            if ($("#pro_name").val() !== "" && $("#pro_name").val().length > 50) {
                $(".profile .save_error").text($scope.languagePack.error_er1192)
                return false;
            } else if ($("#pro_email").val() !== "" && !(pictureAir.email_pat.test($("#pro_email").val()))) {
                $(".profile .save_error").text($scope.languagePack.error_er121).show();
                return false;
            }else if ($("#pro_phone").val() !== "" && !(pictureAir.phone_bat.test($("#pro_phone").val()))) {
                $(".profile .save_error").text($scope.languagePack.error_er122).show();
                return false;
            }
            /*
             if ($("#country").val() !== "" && _nationlist.indexOf(($("#country").val())) == -1) {
             $(".updateerr").text($p.tl("国家名称无效", "unvalid nation name")).show()
             return false;
             }
             */
            if ($("#pro_dob").val() !== "" && !_birthreg.test($("#pro_dob").val())) {
                $(".profile .save_error").text($scope.languagePack.error_er123).show()
                return false;
            }
            var defaultdata = {
                token: pictureAir.store("token"),
                userName:pictureAir.store("username")
            }
            var optiondata = {};
            if ($("#pro_name").val() !== "") {
                optiondata.name = $("#pro_name").val()
            }
            if ($("#pro_email").val() !== "") {
                if($('#pro_email').attr("disabled")=="disabled"){
                }else{
                    optiondata.email = $("#pro_email").val()
                }

            }
            if ($("#pro_phone").val() !== "") {
                if($('#pro_phone').attr("disabled")=="disabled"){
                }else{
                    optiondata.mobile = $("#pro_phone").val()
                }

            }
            if ($("#pro_dob").val() !== "") {
                optiondata.birthday = $("#pro_dob").val()+" 00:00:00"
            }
            if ($("#country").val() !== "") {
                optiondata.country = $("#pro_country").val()
            }
            if ($("#pro_gender").val() !== "") {
                if($("#pro_gender").val()==$scope.languagePack.picture_male){
                    optiondata.gender = 1
                }
                if($("#pro_gender").val()==$scope.languagePack.picture_female){
                    optiondata.gender = 0
                }

            }
            $.extend(optiondata, defaultdata);
            console.log(optiondata);
            $http.post(pictureAir.host + "p/user/updateUser", optiondata).success(function (data) {
                if (data.status === 200) {
                    alert($scope.languagePack.error_er124)
                }
                else if (data.status === 4019) {
                    $(".profile .save_error").text($scope.languagePack.error_er125).show();
                }else if (data.status === 4020) {
                    $(".profile .save_error").text($scope.languagePack.error_er126).show();
                }else if (data.status === 4018) {
                    $(".profile .save_error").text($scope.languagePack.error_er127).show();
                }else if (data.status === 4014) {
                    $(".profile .save_error").text($scope.languagePack.error_eraxin8).show();
                }else {
                    console.log(data)
                }
            });
        }

    })

    //绑定多个pp
    $("#addppcard").on("click", function () {
        var codes;
        codes=$("#addppcard_value").val();
        if ($("#addppcard_value").val() == "" || /^\s*$/.test($("#addppcard_value").val())) {
            alert($scope.languagePack.error_er19);
            return false;
        }
        if (codes.length < 10) {
            return false;
        }
        if (codes.length > 0) {
            // if(codes.length==17||codes.length==18){ //老图片
            //     $http.post(pictureAir.host + "p/photo/addPhotoFromOldSys", {
            //         token: pictureAir.store("token"),
            //         photoCode: codes
            //     }).success(function (data) {
            //         if (data.status === 200) {
            //             if(data.result.bindedCode.length>0){
            //                 alert($scope.languagePack.error_eradd4)
            //             }else{
            //                 alert($scope.languagePack.error_eradd3);
            //                 window.history.go(0);
            //                 location.reload()
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
                    window.history.go(0);
                    location.reload()
                } else if (data.status === 4012) {
                    alert($scope.languagePack.error_eradd4)
                } else if (data.status === 4041) {
                    alert($scope.languagePack.error_eradd5)
                } else if (data.status === 4042) {
                    alert($scope.languagePack.error_eraxin7)
                }else {
                    console.log(data)
                }
            })
        } else {
            alert($scope.languagePack.error_eradd5)
        }
    })
    //退出
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



    /*//触摸开始位置  **********************************************
    var startX = 0, startY = 0;

    //touchstart事件
    function touchSatrtFunc(e) {
        try {
            e = e || window.event;
            e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = e.touches[0], //获取第一个触点
                x = Number(touch.pageX), //页面触点X坐标
                y = Number(touch.pageY); //页面触点Y坐标
            //记录触点初始位置
            startX = x;
            startY = y;
        }
        catch (e) {
            // console.log('touchSatrtFunc：' + e.message);
        }
    }

    //touchmove事件，这个事件无法获取坐标
    function touchMoveFunc(e) {
        try {
            e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        }
        catch (e) {
            // console.log('touchMoveFunc：' + e.message);
        }
    }

    //touchend事件
    function touchEndFunc(e) {
        try {
            e = e || window.event;
            e.preventDefault();
            var touch = e.touches[0], //获取第一个触点
                x = Number(touch.pageX), //页面触点X坐标
                y = Number(touch.pageY); //页面触点Y坐标
            if (x - startX >= 20) {
                //右滑
                $scope.changePreviewImage("btn_next")
            }
            if (x - startX <= -20) {
                $scope.changePreviewImage("btn_pre")
            }
        }
        catch (e) {
            // console.log('touchEndFunc：' + e.message);
        }
    }

    //绑定事件
    function bindEvent() {
        $('.photo2 img').on('touchstart', touchSatrtFunc)
            .on('touchmove', touchMoveFunc)
            .on('touchend', touchEndFunc);
    }

    bindEvent();*/
    //触摸结束  *************************************************
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
        var touching = false;
        var d=document;
        var x;
        var xx;
        var oo=document.getElementById("preview_img");
        oo.addEventListener("touchstart", function(e){
            e.preventDefault();
            x=e.targetTouches[0].clientX;
            touching = true;
        });

        //接着，我们要在touchmove事件里面计算相对位置变化，并且更新element坐标：

        oo.addEventListener("touchmove", function(e){
            e.preventDefault();
            if (!touching) return;
            xx=e.targetTouches[0].clientX;
        });

        /*updateTransform做了什么？现在先不讨论，我们只要把事件相关数据正确地更新到transform的四个属性即可，如何把这些属性反映到界面上稍后再说。

         最后，我们还要在touchend事件里面处理一下标志位：*/

        oo.addEventListener("touchend", function(e){
            e.preventDefault();
            if (xx - x >= 20) {
                //右滑
                $scope.changePreviewImage("btn_pre");
            }
            if (xx - x <= -20) {
                $scope.changePreviewImage("btn_next");
            }
            touching = false;
        });

    }
}])