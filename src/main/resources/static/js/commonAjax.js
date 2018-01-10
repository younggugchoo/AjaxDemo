if (!commonAjax) var commonAjax = {};

commonAjax.ajax = function (url, method) {
    this.url = url;
    this.method = method ? method : commonAjax.ajax.options.method;
    this.async = commonAjax.ajax.options.async;
    this.dataType = commonAjax.ajax.options.dataType;
    this.timeout = commonAjax.ajax.options.timeout;
    this.query = "";
}

commonAjax.ajax.prototype.addQuery = function(name, value) {
    if (this.query) this.query += "&";
    this.query += encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

commonAjax.ajax.prototype.result = function(name, value) {
    if (this.query) this.query += "&";
    this.query += encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

commonAjax.ajax.prototype.send = function(callback) {

    callback = callback ? callback : "fnCallback()";
    $.ajax({
        type: this.method
        , dataType: this.dataType
        , url: this.url
        , data: this.query
        , async: this.async
        , success: function( json ) {
            data = eval(json);

            if (data.error=='true') {
                commonAjax.ajax.alert(data);
            }
            return eval('(' + callback + ')');
        }
        , beforeSend: function () {
            var width = 0;
            var height = 0;
            var left = 0;
            var top = 0;

            width = 0;
            height = 0;
            top = ( $(window).height() - height ) / 2 + $(window).scrollTop();
            left = ( $(window).width() - width ) / 2 + $(window).scrollLeft();

            if($("#div_ajax_load_image").length != 0) {
                $("#div_ajax_load_image").css({
                    "top": top+"px",
                    "left": left+"px"
                });
                $("#div_ajax_load_image").show();
            }
            else {
                $('body').append('<div id="div_ajax_load_image" style="position:absolute; top:' + top + 'px; left:' + left + 'px; width:' + width + 'px; height:' + height + 'px; z-index:9999; background:#f0f0f0; filter:alpha(opacity=0); opacity:alpha*0.0; margin:auto; padding:0; "><img src="/images/loading6.gif" style="background-color:transparent;width:32px; height:32px;"></div>');
            }
        }

        , complete: function () {
            $("#div_ajax_load_image").hide();
        }
        , error: this.onError
    });
}



commonAjax.ajax.prototype.bind = function(comboId) {
    if ( comboId == undefined || comboId == null ) alert(comboId + " 객체가없습니다.");

    $.ajax({
        type: this.method
        , dataType: this.dataType
        , url: this.url
        , data: this.query
        , async: this.async
        , success: function( json ) {
            data = eval(json);

            if (data.error=='true') {
                commonAjax.ajax.alert(data);
            } else {
                $("#"+comboId).empty().append("<option value=''>" +"선택하세요" + "</option>" );
                for(inx = 0; inx < data.resultList.length; inx++) {
                    $("#"+comboId).append("<option value='"+ data.resultList[inx].code+ "'>" +data.resultList[inx].value + "</option>" );
                }
            }
        }
        , error: this.onError
    });
}

commonAjax.ajax.prototype.addUrl = function(url) {
    this.query = url;
}

commonAjax.ajax.options = {
    method       : "POST",
    async        : true,
    progressbar  : false,
    mute         : false,
    timeout      : 3 * 60 * 1000,
    dataType     : "json"
}

commonAjax.ajax.messages = {
    "ERROR0"      : "서버와 연결하지 못하였습니다.\n\nPlease Check Your Network ",
    "ERROR404"    : "요청하신 주소를 찾지 못하였습니다.\n\nRequst URL not found ",
    "ERROR200"    : "응답유형이 다릅니다.\n\nParsing JSON Request failed ",
    "ERROR500"    : "서버에서 오류가 발생하였습니다. \n\nInternel Server Error ",
    "timeout"     : "통신 중 오류가 발생하였습니다.\n\nRequest Time out ",
    "parsererror" : "통신 중 오류가 발생하였습니다.\n\nParsing JSON Request failed ",
    "error"       : "Unknow Error "
}

commonAjax.ajax.data = new Object();


commonAjax.ajax.prototype.onError = function( xhr, errorType, exception ) {
//      alert("[onError] \n" +
//    		 "xhr := " + xhr + "\n" +
//    		 "errorType := " + errorType + "\n" +
//    		 "exception := " + exception + "\n" +
//    		 "xhr.status := " + xhr.status + "\n" +
//    		 "xhr.readyState := " + xhr.readyState + "\n" +
//     		 "xhr.statusText := " + xhr.statusText + "\n" +
//    		 "xhr.responseText := " + xhr.responseText + "\n" +
//    		 "[onError] \n");

    var errorCode = "ERROR" + xhr.status;
    if(errorCode != 'ERROR0'){
        commonAjax.ajax.alert( errorCode, xhr );
    }
}

commonAjax.ajax.prototype.onSuccess = function( json ) {
    data = eval(json);
    return eval('(' + callback + ')');
}

commonAjax.ajax.getMessage = function (code) {
    var message =  commonAjax.ajax.messages[code];
    return commonAjax.ajax.messages[code] ? commonAjax.ajax.messages[code] : code;
}

commonAjax.ajax.alert = function(data, xhr) {
    if (commonAjax.ajax.options.mute == true) return;

    var code = "";
    var message = "";
    var resultMessage = "";

    if (typeof(xhr) == "undefined") {
        message = data.message;
        code = data.code;
        if (typeof(code) == "undefined") {
            resultMessage = message;
        }
        else if(code == "sessionTimeout") {
            alert(message);
            location.href = "/";
            return;
        }
        else if(code == "lpsSessionTimeout") {
            alert(message);
            location.href = "/lps";
            return;
        } else {
            resultMessage = message;
        }
    } else {
        if (typeof(data) == "string") {
            message = commonAjax.ajax.getMessage(data);
            code = (message == data) ? "errors" : data;
            if (!message) message = data;
            resultMessage = message;
        } else {
            alert("not message");
        }
    }
    alert(resultMessage);
}


