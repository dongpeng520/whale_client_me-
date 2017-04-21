/**
 * Created by peter.dong on 17/4/5.
 */
(function (window, document, jQuery) {
    if (typeof window !== "undefined" && typeof document !== "undefined" && typeof jQuery !== "undefined") {
        var whale = {};
        whale.host = "http://106.39.181.188:8081/account";//api
        whale.appId = "6c8c8dc48280ed2163136ad416e1dbfe";
        whale.email_pat = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        // pictureAir.phone_bat= /(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/;
        whale.phone_bat= /[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/;
        whale.password_bat=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
        whale.store=function(namespace,data){
            /*if(!!window.localStorage){
                try {
                    if(arguments.length>1){
                        localStorage.setItem(namespace,JSON.stringify(data));
                    }else{
                        var obj = localStorage.getItem(namespace);
                        return obj = JSON.parse(obj);
                    }
                    return true;
                } catch(e){
                    alert("Please turn off private browsing to proceed")
                    return false;
                }
            }else{
                return false;
            }*/
            if(arguments.length>1){
                localStorage.setItem(namespace,JSON.stringify(data));
            }else{
                var obj = localStorage.getItem(namespace);
                return obj = JSON.parse(obj);
            }
        }
        /*pictureAir.store_sting=function(namespace,data){
            if(arguments.length>1){
                localStorage.setItem(namespace,data);
            }else{
                var obj = localStorage.getItem(namespace);
                return obj;
            }
        }*/
        whale.removestore = function (arr) {
            if(!!window.localStorage){
                try {
                    localStorage.removeItem(arr);
                    return true;
                } catch(e){
                    return false;
                }
            }else{
                return false;
            }
            // localStorage.removeItem(arr);
        };
        whale.removestoreall = function (arr) {
            if (arr && arr.length > 0) {
                for (i = 0; i < arr.length; i++) {
                    localStorage.removeItem(arr[i]);
                }
            }
        };
        whale.checkBrowser = function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                return "Opera";
            }
            //判断是否Opera浏览器
            if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            } //判断是否Firefox浏览器
            if (userAgent.indexOf("Chrome") > -1) {
                return "Chrome";
            }
            if (userAgent.indexOf("Safari") > -1) {
                return "Safari";
            } //判断是否Safari浏览器
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            }
            //判断是否IE浏览器
        };
        whale.Trim= function (str) {
            return $.trim(str);
        };
        whale.fstrr = function (str) {
            if (str !== null) {
                if (str.indexOf("%") == -1) {
                    return str;
                } else {
                    var _this = "";
                    if (str && str.length > 0) {
                        var _arr = str.split("%");
                        for (i = 0; i < _arr.length; i++) {
                            if (_arr[i] !== "") {
                                if (parseInt(_arr[i]) < 10) {
                                    _this += parseInt(_arr[i]);
                                } else {
                                    _this += String.fromCharCode(parseInt(_arr[i]));
                                }
                            }
                        }
                    }
                    return _this;
                }

            }
        };
        window.whale = whale;
    }


})(window, document, jQuery);

