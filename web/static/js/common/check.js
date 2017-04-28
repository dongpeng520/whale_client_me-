/**
 * Created by Administrator on 2017/4/5.
 */
//姓名检查
var checkrRealName = function(){
    var realName = $('#realName').val().replace("\s","");
    var realNameInput = $('#realName');
    var nameSpan = $('#realNameSpan');
    var parent = realNameInput.parent();
    //非空检查
    if(realName == '' || realName == null){
        //获得父级元素div
        parent.removeClass('has-success');
        parent.addClass('has-error');
        nameSpan.removeClass('glyphicon-ok');
        nameSpan.addClass('glyphicon-remove');
        return false;
    }
    //是否为中文检查
    if(!(/^[\u4e00-\u9fa5]+$/.test(realName) && realName.length > 1)){
        //获得父级元素div
        parent.removeClass('has-success');
        parent.addClass('has-error');
        nameSpan.removeClass('');
        nameSpan.addClass('glyphicon-remove');
        return false;
    }
    parent.removeClass('has-error');
    parent.addClass('has-success');
    nameSpan.removeClass('glyphicon-remove');
    nameSpan.addClass('glyphicon-ok');
    return true;
}

var checkPhone = function(){
    var phone = $('#phone').val().replace("\s" , "");
    var phoneInput = $('#phone');
    var phoneSpan = $('#phoneSpan');
    var parent = phoneInput.parent();
    //非空检查
    if(phone == '' || phone == null){
        parent.removeClass('has-success');
        parent.addClass('has-error');
        phoneSpan.removeClass('glyphicon-ok');
        phoneSpan.addClass('glyphicon-remove');
        return false;
    }
    //是否为电话检查
    if(!(/^(1[0-9]{10}$)/.test(phone))){
        parent.removeClass('has-success');
        parent.addClass('has-error');
        phoneSpan.removeClass('glyphicon-ok');
        phoneSpan.addClass('glyphicon-remove');
        return false;
    }
    parent.removeClass('has-error');
    parent.addClass('has-success');
    phoneSpan.removeClass('glyphicon-remove');
    phoneSpan.addClass('glyphicon-ok');
    return true;
}
var send=function(){
    if (whale.store("sendtimes")) {
        return false;
    }
    if(checkPhone()){
        var nat=$('#phone').val();
        var resend=$("#SEND");
        var datas = {
            Phone:nat//8615655566161
        };
        $.ajax({
            type : 'GET',
            url : '/account/applycontroller/sendMsgCode',
            data : datas,
            dataType : 'json',
            success : function(data){
                if (data.code === 10200) {
                    whale.store("sendtimes", "no");
                    var showDiv = $('#showDiv');
                    showDiv.text('发送成功，请注意查收');
                    showDiv.removeClass('alert-danger');
                    showDiv.addClass('alert-success');
                    showDiv.css('display' , '');
                    setTimeout(function(){
                        showDiv.css('display' , 'none');
                    },2000)
                    var count = 60;
                    var inter=setInterval(thst,1000)
                    function thst() {
                        if (count > 0) {
                            count--;
                            resend.html(count + "s")
                        } else {
                            resend.html("重新发送");
                            clearInterval(inter);
                            whale.removestore("sendtimes");
                        }
                    }
                }else if(data.code === 10010){
                    var showDiv = $('#showDiv');
                    showDiv.text('发送验证码失败');
                    showDiv.removeClass('alert-success');
                    showDiv.addClass('alert-danger');
                    showDiv.css('display' , '');
                }else{
                    var showDiv = $('#showDiv');
                    showDiv.text('网络错误，请稍后重试');
                    showDiv.removeClass('alert-success');
                    showDiv.addClass('alert-danger');
                    showDiv.css('display' , '');
                }
            },
            error : function(data){
                var showDiv = $('#showDiv');
                showDiv.text('网络错误，请稍后重试');
                showDiv.removeClass('alert-success');
                showDiv.addClass('alert-danger');
                showDiv.css('display' , '');
            }

        })
    }
}
var checkYZM=function(){
    var accout = $('#YZM').val();
    var accoutInput = $('#YZM');
    var accoutSpan = $('#yzmSpan');
    var parent = accoutInput.parent();
    if(accout == "" || accout == null){
        parent.removeClass('has-success');
        parent.addClass('has-error');
        accoutSpan.removeClass('glyphicon-ok');
        accoutSpan.addClass('glyphicon-remove');
        return false;
    }
    if(!(/^([0-9]{6}$)/.test(accout) && accout.length > 1)){
        parent.removeClass('has-success');
        parent.addClass('has-error');
        accoutSpan.removeClass('glyphicon-ok');
        accoutSpan.addClass('glyphicon-remove');
        return false;
    }
    parent.removeClass('has-error');
    parent.addClass('has-success');
    accoutSpan.removeClass('glyphicon-remove');
    accoutSpan.addClass('glyphicon-ok');
    return true;
}
var checkAccout = function(){
    var accout = $('#accout').val().replace("\s" , "");
    var accoutInput = $('#accout');
    var accoutSpan = $('#accoutSpan');
    var parent = accoutInput.parent();
    //非空检查
    if(accout == "" || accout == null){
        parent.removeClass('has-success');
        parent.addClass('has-error');
        accoutSpan.removeClass('glyphicon-ok');
        accoutSpan.addClass('glyphicon-remove');
        return false;
    }
    if(!(/^[\u4e00-\u9fa5]+$/.test(accout) && accout.length > 1)){
        parent.removeClass('has-success');
        parent.addClass('has-error');
        accoutSpan.removeClass('glyphicon-ok');
        accoutSpan.addClass('glyphicon-remove');
        return false;
    }
    parent.removeClass('has-error');
    parent.addClass('has-success');
    accoutSpan.removeClass('glyphicon-remove');
    accoutSpan.addClass('glyphicon-ok');
    return true;
}

var checkForm = function(){
    var flag = 0;
    if(!(checkrRealName())){
        flag = 1;
    }
    if(!checkPhone()){
        flag = 1;
    }
    if(!checkAccout()){
        flag =1;
    }
    if(!checkYZM()){
        flag = 1;
    }
    if(flag == 0){
        return true;
    }else{
        var showDiv = $('#showDiv');
        showDiv.css('display' , '');
        return false;
    }

}

var ajaxForm = function(){
    var url = "/account/applycontroller/addApply";
    var realName = $('#realName').val();
    var phone = $('#phone').val();
    var accout = $('#accout').val();
    var city = $('#citySelect').val();
    var note = $('#notenote').val();
    var YZM = $('#YZM').val();
    var setData={
        name : realName,
        phone : phone,
        company : accout,
        address : city,
        note:note,
        code:YZM
    }
    $.ajax({
        type : 'POST',
        url : url,
        contentType: "application/json",
        data :JSON.stringify(setData),
        dataType : 'json',
        success : function(data){
            console.log(data);
            if(data.code ==10200){
                var showDiv = $('#showDiv');
                showDiv.text('申请成功，聚信立小秘书稍后会与您联系')
                showDiv.removeClass('alert-danger');
                showDiv.addClass('alert-success');
                showDiv.css('display' , '');
            }else if(data.code ==50500||data.code ==20104||data.code ==430100||data.code ==20102){
                var showDiv = $('#showDiv');
                showDiv.text(data.note);
                showDiv.removeClass('alert-success');
                showDiv.addClass('alert-danger');
                showDiv.css('display' , '');
            }

        },
        error : function(data){
            var showDiv = $('#showDiv');
            showDiv.text('申请失败，系统异常，请稍后重试');
            showDiv.removeClass('alert-success');
            showDiv.addClass('alert-danger');
            showDiv.css('display' , '');
        }

    })
}


$(document).ready(function(){
    whale.removestore("sendtimes");
    $("#SEND").on("click", send);
    $('#button_home').click(function () {
        if(checkForm()){
            ajaxForm();
        }else{
            return;
        }
    });
})

