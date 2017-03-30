/**
 * Created by shdr-gs07 on 16/11/2.
 */
pictureModule.controller("LoginController", function($scope,$http,$interval,$window){
    if(pictureAir.store("enzh")){
        $scope.lanbb=pictureAir.store("enzh");
        if(pictureAir.store("enzh")=="ri"){
            $scope.lanbb="en";
        }
    }
    $scope.nationCodes=nationCodes;
    $scope.change_code=function (index) {
        var cd=$(".input_codenum").eq(index).html();
        var na=$(".item_nname").eq(index).html();
        $(".country .COUNTRY").text(na);
        $(".phone .code").text(cd);
    }
    $scope.changed=false;
    $scope.changed2=false;
    $scope.relo=false;
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
    }
    $scope.changing2=function () {
        $scope.changed2=!$scope.changed2;
    }
    $scope.reloing=function () {
        $scope.relo=!$scope.relo;
        if ($(".phone_email").is(":visible")) {
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
    }
    $scope.showCN=function (event) {
        event = event || window.event;
        event.stopPropagation();//解决body click事件
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
    /*$window.onload = function() {
        if(pictureAir.store("loginInfo")){
            $scope.loginInfo=store("loginInfo");
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
    }
*/
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
            $scope.text_pass12 = false;
        }

    }
    $scope.checkcode=function () {
        if (pictureAir.store("sendtimes")) {
            return false;
        }
        if ($scope.loginInfo.phone.length>0&&!pictureAir.phone_bat.test($scope.loginInfo.phone)) {
            $("#error").text( "号码有误").show();
            return false;
        }
        var nat = $(".phone .code").text();
        var datas = {
            appID: pictureAir.fstrr(pictureAir.appId),
            phone: nat + $scope.loginInfo.phone,//8615655566161
            msgType: "register"
        };
        $http.post(pictureAir.host + "userMsg/sendSMSValidateCode", datas).success(function (data) {
            if (data.status === 200) {
                alert("验证码发送成功");
                //30s重新发送
                pictureAir.store("sendtimes", "no");
                var count = 60;
                var fn = $interval(function () {
                    thst();
                }, 1000);

                function thst() {
                    if (count > 0) {
                        count--;
                        document.getElementById("sendcode").innerHTML = +count + "s";
                    } else {
                        document.getElementById("sendcode").innerHTML = "重新发送";
                        $interval.cancel(fn);
                        pictureAir.removestore("sendtimes");
                    }
                }
            } else {
                alert("验证码发送失败");
            }
        })
    }
    $scope.submit=function () {
        if ($(".phone_email .phone").is(":visible")) {
            // alert("手机注册")
            if($scope.text_phone2==true&&$scope.text_pass12==true&&$scope.loginInfo.code!==""){
                var username = $(".phone .code").text() + $scope.loginInfo.phone;
                var count = 0;
                reg();
                function reg(){
                    if(count === 0){
                        var nat = $(".phone .code").text();
                        var datas = {
                            appID: pictureAir.fstrr(pictureAir.appId),
                            validateCode: $scope.loginInfo.code,
                            sendTo: '+'+nat + $scope.loginInfo.phone,
                            msgType: "register"
                        };
                        $http.post(pictureAir.host + "userMsg/validateCode", datas).success(function (data) {
                            console.log(data);
                            if (data.status === 200) {
                                count ++;
                                reg();
                            } else {
                                alert("验证失败,请重新验证");
                            }
                        });
                    }
                    if(count === 1){
                        $http.get(pictureAir.host + "auth/getTokenId", {
                            params: {
                                terminal: "web",
                                appID: pictureAir.fstrr(pictureAir.appId)
                            }
                        }).success(function (data) {
                            if(data.status === 200){
                                var tkid = data.result.tokenId;
                                pictureAir.store("tokenId", tkid);
                                count++;
                                reg();
                            }else {
                                console.log(data);
                            }
                        });

                    }
                    if(count === 2){
                        $http.post(pictureAir.host + "user/register", {
                            userName: pictureAir.Trim(username),
                            password: hex_md5($scope.loginInfo.password),
                            tokenId:  JSON.stringify(pictureAir.store("tokenId"))
                        }).success(function (data) {
                            if (data.status === 200) {

                            } else if (data.status == 6030 || data.status == 6029) {
                                $("#error").text( "用户名已经存在").show();
                            } else {
                                console.log(data);
                            }
                        });

                    }
                }
            }else{
                $("#error").text( "请填写完整").show();
            }

        }
        if ($(".phone_email .email").is(":visible")) {
            // alert("邮箱注册")
            if($scope.text_email2==true&&$scope.text_pass12==true){
                $http.get(pictureAir.host + "auth/getTokenId", {
                    params: {
                        terminal: "web",
                        appID: pictureAir.fstrr(pictureAir.appId)
                    }
                }).success(function (data) {
                    if(data.status === 200){
                        var tkid = data.result.tokenId;
                        pictureAir.store("tokenId", tkid);
                        $http.post(pictureAir.host + "user/register", {
                            userName: pictureAir.Trim($scope.loginInfo.email),
                            password: hex_md5($scope.loginInfo.password),
                            tokenId: JSON.stringify(pictureAir.store("tokenId"))
                        }).success(function (data) {
                            if (data.status === 200) {


                            } else if (data.status == 6030 || data.status == 6029) {
                                $("#error").text( "用户名已经存在").show();
                            } else {
                                console.log(data);
                            }
                        });
                    }else {
                        console.log(data);
                    }
                });
            }
        }
        function login(username) {
            $http.post(pictureAir.host + "user/login", {
                userName: pictureAir.Trim(username),
                password: hex_md5($scope.loginInfo.password),
                tokenId:  JSON.stringify(pictureAir.store("tokenId"))
            }).success(function (data) {
                if (data.status === 200) {

                } else if (data.status == 6033) {
                    $("#error").text( "密码错误").show();
                } else if(data.status == 6031){
                    $("#error").text( "用户名不存在").show();
                }
            });
        }
        if ($(".phone_email2 .phone").is(":visible")) {
            pictureAir.store("loginInfo",$scope.loginInfo);
            // alert("手机登陆")$scope.text_pp=true;
            if($scope.text_phone2==true&&$scope.text_pp==true){
                var username=$(".phone .code").text() + $scope.loginInfo.phone;
                if(pictureAir.store("tokenId")){
                    login(username)
                }else{
                    $http.get(pictureAir.host + "auth/getTokenId", {
                        params: {
                            terminal: "web",
                            appID: pictureAir.fstrr(pictureAir.appId)
                        }
                    }).success(function (data) {
                        if(data.status === 200){
                            var tkid = data.result.tokenId;
                            pictureAir.store("tokenId", tkid);
                            login(username);
                            if($("#checkedreb").is(':checked')){
                                pictureAir.store("loginInfo",$scope.loginInfo);
                            }
                        }else {
                            console.log(data);
                        }
                    });
                }
            }else{
                $("#error").text( "请填写完整").show();
            }

        }
        if ($(".phone_email2 .email").is(":visible")) {
            // alert("邮箱登陆")
            if($scope.text_email2==true&&$scope.text_pp==true){
                if(pictureAir.store("tokenId")){
                    login($scope.loginInfo.email)
                }else{
                    $http.get(pictureAir.host + "auth/getTokenId", {
                        params: {
                            terminal: "web",
                            appID: pictureAir.fstrr(pictureAir.appId)
                        }
                    }).success(function (data) {
                        if(data.status === 200){
                            var tkid = data.result.tokenId;
                            pictureAir.store("tokenId", tkid);
                            login($scope.loginInfo.email);
                            if($("#checkedreb").is(':checked')){
                                pictureAir.store("loginInfo",$scope.loginInfo);
                            }
                        }else {
                            console.log(data);
                        }
                    });
                }
            }else{
                $("#error").text( "请填写完整").show();
            }
        }
    }
})