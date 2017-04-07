/**
 * Created by peter.dong on 16/11/2.
 */
/*function showuser(event) {
    event = event || window.event;
    event.stopPropagation();//解决body click事件
    if ($("#En div").is(":visible")){
        $("#En div").css('display', "none");
    }else{
        $("#En div").css('display', "block");
    }
}
$("html,body").on("click", function () {
    $("#En div").hide();
});*/
var data_clear=13;
if (!whale.store("data_clear")) {
    whale.store("data_clear",data_clear)
}else{
    if(data_clear!=whale.store("data_clear")){
        localStorage.clear();
        whale.store("data_clear",data_clear);
        window.history.go(0);
        location.reload()
    }
}


$("#En").on("click", function (e) {
    if($(window).width()>680){
        if ($("#En_list").is(":visible")){
            $("#En_list").css('display', "none");
        }else{
            $("#En_list").css('display', "block");
        }
        e.stopPropagation();
    }else{
        $(".header").addClass("En_secle");
    }
})

$("#down_country1").on("click", function (event) {
    event = event || window.event;
    event.stopPropagation();//解决body click事件

})
$("#down_country2").on("click", function (event) {
    event = event || window.event;
    event.stopPropagation();//解决body click事件

})
$("#down_country3").on("click", function (event) {
    event = event || window.event;
    event.stopPropagation();//解决body click事件

})
$("#En_list").on("click", function (e) {
    $("#En_list").hide();
    e.stopPropagation();
})
$("html,body").on("click", function () {
    $("#En_list").hide();
})
function stopBubble(e){
    if(e&&e.stopPropagation){//非IE
        e.stopPropagation();
    }
    else{//IE
        window.event.cancelBubble=true;
    }
}
$(".profile .save_error").on("click", stopBubble);//错误信息提示阻止冒泡
$(".contact .error").on("click", stopBubble);//错误信息提示阻止冒泡
$("#error").on("click", stopBubble);//错误信息提示阻止冒泡
$("#error2").on("click", stopBubble);//错误信息提示阻止冒泡
$("input").on("focus", function() {
    $(".profile .save_error").hide();
    $(".contact .error").hide();
})
$("#sign").on("click", function (e) {
    $(".login").show()
})

function downloadFile(fileName,content) {
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
    aLink.download = fileName;
    aLink.href = content;
    aLink.dispatchEvent(evt);
}
//照片的鼠标悬停及移除事件(当前div的id，显示or隐藏,是否为照片点击时调用)
function showSuspensionBox(id, operation,isClick) {
    // if ($("#En div").is(":visible")){
    //
    // }

    var a=document.getElementById(id);
    if(!$(a.parentNode.parentNode).find(".fun1").is(":visible")){
        return;
    }

    if (operation) {
        $("#" + id + " .fx_down").show();
        $("#" + id+"down").on("click", function (e) {
            if(!pictureAir.store("token")){
                $(".login").show();
                e.preventDefault();
                return
            }
        })
    }else {
        $("#" + id + " .fx_down").hide();
    }

}
if($(window).width()<=680){
    var h_navbar=$(window).height();
    var w_navber=$(window).width();
    $(".navbar").css("height",h_navbar-40+"px");
    $(".navbar").css("width",w_navber+"px");
    $("#header .phone_list").on("click", function (e) {
        if ($("#header .phone_list").is(":visible")){
            $("#header .phone_list").hide();
            $("#header .phone_list2").show();
            $("#header .navbar").show();
            $(".picture").hide();
            $(".main_visual").hide();
            $(".mobileApp").hide();
            $(".contact").hide();
            $("#privacy").hide();
            $("#about_us").hide();
            $(".service").hide();
            $("#FAQ").hide();
            $("#share").hide();
        }
    })
    $("#header .phone_list2").on("click", function (e) {
        if ($("#header .phone_list2").is(":visible")){
            $("#header .phone_list").show();
            $("#header .phone_list2").hide();
            $("#header .navbar").hide();
            $(".profile").hide();
            $(".login").hide();
            $(".picture").show();
            $(".main_visual").show();
            $(".mobileApp").show();
            $(".contact").show();
            $("#privacy").show();
            $("#about_us").show();
            $(".service").show();
            $("#FAQ").show();
            $("#share").show();
            if($(".header").hasClass('En_secle')){
                $(".header").removeClass("En_secle");
            }
        }
    })

    $(".header .logo").on("click", function (e) {
        if($(".header").hasClass('En_secle')){
            $(".header").removeClass("En_secle");
        }
    })

}

//照片加载中及加载失败事件 小图片
function imgOnLoad(img){
    //获取当前存储的照片路径
    setTimeout(function () {
        var src=$(img.parentNode).find("input").eq(0).val();
//         var id = "#" + img.name + "ImgSrc";
//         var src = $(id).val();
        //设置图片路径
        img.src = src;
        $(img).css({'background-color':'#fff'});
        img.onload = function () {
            imgOnloadPhotoBar(img.name);
        }
    },50)
}
function imgError(img) {
    img.src="static/img/no-picture1.png";
    img.onerror=null;
}
function imgOnloadPhotoBar(id){
    var path = ".photo" + " #" + id;
    //图片加载成功之后的页码及收藏标示的位置
    var imgObj=document.getElementsByName(id)[0];
    var imgHeight = imgObj.naturalHeight;
    var imgWidth = imgObj.naturalWidth;
    var www=$(".photo div.img").width();
    if(imgHeight<www && imgWidth<www){
        /*$(path+"img")[0].src= $(path+"ImgSrc")[0].value;*/
    }else {
        var sourceWidth;
        var sourceHeight;

        if (imgWidth > imgHeight) {
            sourceHeight = (www / imgWidth * imgHeight).toFixed(0);
            sourceWidth = www;
        }
        else {
            sourceWidth = (www / imgHeight * imgWidth).toFixed(0);
            sourceHeight = www;
        }
        $(path + " img.small_img").css({
            'width': sourceWidth + 'px',
            'height': sourceHeight + 'px',
            "opacity": "1"
        });
        /*$(path + " .fx_down").css({
         'width': sourceWidth + 'px',
         'height': sourceHeight + 'px',
         'opacity': '1'
         });*/
    }
}

//照片加载中及加载失败事件 大图片
function imgLoadBig(img){
    //获取当前存储的照片路径
    if(img.src==""){
        return;
    }
    imgOnloadPhotoBarBig(img);
    img.onload = function () {
        imgOnloadPhotoBarBig(img);
    }
}
function imgOnloadPhotoBarBig(id){
    var imgHeight = id.naturalHeight;
    var imgWidth = id.naturalWidth;
    var wwwh=$(".preview .photo2").height();
    var wwww=$(".preview .photo2").width();
    var img_li=imgWidth/imgHeight;
    var div_li=wwww/wwwh;
    if(imgHeight<wwwh && imgWidth<wwww){
        /*$(path+"img")[0].src= $(path+"ImgSrc")[0].value;*/
    }else {
        var sourceWidth;
        var sourceHeight;

        if (imgWidth > imgHeight) {
            if(img_li>=div_li){
                sourceHeight = (wwww / imgWidth * imgHeight).toFixed(0);
                sourceWidth = wwww;
            }else {
                sourceHeight = (wwww*0.8 / imgWidth * imgHeight).toFixed(0);
                sourceWidth = wwww*0.8;
            }

        }
        else {
            sourceWidth = (wwwh / imgHeight * imgWidth).toFixed(0);
            sourceHeight = wwwh;
        }
        $(id).css({
            'width': sourceWidth + 'px',
            'height': sourceHeight + 'px',
            "opacity": "1"
        });
    }
}
