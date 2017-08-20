$.ajaxSettings.dataType = 'json';
$.ajaxSettings.contentType = "application/json;charset=UTF-8";
$.ajaxSetup();
MSG_INFO_ALERT = {
    'load_data_fail': '数据加载失败,请稍后重试!',
    'delete_data_no_select': '请选择需要删除的数据!',
    'delete_confirm_yes': '您确定要删除这些数据吗?',
    'add_data_title': '新增数据',
    'edit_data_title': '编辑数据',
    'is_not_null': '带*号的数据不能为空',
    'ing_save_data': '正在保存数据...',
    'opration_data_fail': '操作失败,请稍后再试!',
    'update_data_no_select': '请选择需要删修改的数据!',
    'update_data_one_select': '请选择一条数据!',
    'input_text_red': '请输入必填项！',
    'check_tel_no': '请输入正确的手机号码！',
    'check_phone_no': '请输入正确的手机号码或座机号码！',
    'check_id_no': '请输入正确的身份证号码！',
    'check_amount': '请输入最多保留两位小数的数字！',
    'check_chinese': '只能输入汉字！',
    'check_number': '只能输入数字！',
    'textTL': '输入内容不能超过25个字',
    'check_posInt': '请输入大于0的数字！'
};
ROLE_MENU = {
    '2001': 'glyphicon-cloud',
    '3001': 'glyphicon-tags',
    '4001': 'glyphicon-leaf',
    '5001': 'glyphicon-usd',
    '6001': 'glyphicon-credit-card',
    '7001': 'glyphicon-book',
    '8001': 'glyphicon-link',
    '9001': 'glyphicon-tasks'
};
MSG_OUT = ['请输入数字,不可带小数点', '请输入数字,可带小数点', '请输入11位的手机号码', '请正确输入邮箱号,eg:xxx@163.com'];
REG_CON = [/^\d+$/, /^(-?\d+)(\.\d+)?$/, /^[\d]{11}$/gi, /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/];
//下拉框
$(document).ready(function () {
    $(".sel-option>input[type='text'].form-control").live({
        click: function () {
            $(this).siblings("ul.sel-ul").css("display", "block");
        },
        blur: function () {
            $(this).siblings("ul.sel-ul").css("display", "none");
        }
    });
    $(".sel-ul li").live("mousedown", function (event) {
        var num = $(this).attr("valip");
        var optionval = $(this).text();
        $(".sel-ul li").removeClass("checked_li");
        $(".sel-ul > li > .glyphicon").remove();
        $(this).prepend('<span class="glyphicon glyphicon-ok"></span>');
        $(this).addClass("checked_li");
        $(this).parent().siblings("input[type='text'].form-control").val(optionval);
        $(this).parent().siblings("input[type='hidden']").val(num).change();
        $(this).parent().css("display", "none");
        $(this).parent().siblings("input.reb-bg").css("background-color", "#fff");
        $(this).parent().siblings("div.red-tip").remove();
        event.preventDefault();
    });
    Cddd.resetTime = function () {
        $("#singleTime").jeDate({
            format: "YYYY-MM-DD",
            initAddVal: {DD: "-1"},
            isinitVal: true,
            isTime: false,
            minDate: "2014-09-19"
        });
    };
    $("#reset").live("click", function () {
        $("input[type='text']").val("");
        $("input[type='hidden']").val("");
        $("input[type='checkbox']").removeAttr("checked");
        Cddd.resetTime();
    });
    $("#panel-nav li").live("click", function () {
        var topMain = $(this).attr("name");
        $.ajaxSetup({cache: false});
        $("#panel").load("business/" + topMain + ".html");
    });
    $(".panel-title span").live('click', function () {
        ztKey = 0;
        var titleName = $(this).attr("name");
        if (titleName != "" && titleName != null && titleName != "undefined") {
            $.ajaxSetup({cache: false});
            Cddd.loadPopShow();
            $("#panel").load("business/" + titleName + ".html");
        }
    });
    /*--复选框样式修改--*/
    $("input[type='checkbox']").die().live('click', function () {
        var radioImg = $(this).siblings("i.radioStyle");
        if ($(this).prop("checked")) {
            radioImg.removeClass("checkboxBefore").addClass("checkboxAfter");
        } else {
            radioImg.removeClass("checkboxAfter").addClass("checkboxBefore");
        }
        tabChkbtn();
    });
    Cddd.checkCard = function () {
        var flag = true;
        $(".pop-tip-main .reb-bg").each(function () {
            if ($(this).val() == "" || $(this).val() == null) {
                Cddd.showInfoTop('请输入必填项！');
                flag = false;
                return false;
            }
        });
        var card = document.getElementById('identityCodeId').value;
        //是否为空
        if (flag == true) {
            if (card === '') {
                Cddd.showInfoTop('请输入必填项身份证号，身份证号不能为空');
                document.getElementById('identityCodeId').focus;
                return false;
            }
            //校验长度，类型
            if (isCardNo(card) === false) {
                Cddd.showInfoTop('您输入的身份证号码不正确，请重新输入');
                document.getElementById('identityCodeId').focus;
                return false;
            }
            //校验生日
            if (checkBirthday(card) === false) {
                Cddd.showInfoTop('您输入的身份证号码生日不正确,请重新输入');
                document.getElementById('identityCodeId').focus();
                return false;
            }
        }
        return true;
    };

    Cddd.checkIdCard = function () {
        var flag = true;
        $(".pop-tip-main .reb-bg").each(function () {
            if ($(this).val() == "" || $(this).val() == null) {
                Cddd.showInfoTop('请输入必填项！');
                flag = false;
                return false;
            }
        });
        var card = document.getElementById('financeIdCard').value;
        //是否为空
        if (flag == true) {
            if (card === '') {
                Cddd.showInfoTop('请输入必填项身份证号，身份证号不能为空');
                document.getElementById('financeIdCard').focus;
                return false;
            }
            //校验长度，类型
            if (isCardNo(card) === false) {
                Cddd.showInfoTop('您输入的身份证号码不正确，请重新输入');
                document.getElementById('financeIdCard').focus;
                return false;
            }
            //校验生日
            if (checkBirthday(card) === false) {
                Cddd.showInfoTop('您输入的身份证号码生日不正确,请重新输入');
                document.getElementById('financeIdCard').focus();
                return false;
            }
        }
        return true;
    };

    //检查号码是否符合规范，包括长度，类型
    isCardNo = function (card) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(card) === false) {
            return false;
        }
        return true;
    };

    //检查生日是否正确
    checkBirthday = function (card) {
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data = card.match(re_fifteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date('19' + year + '/' + month + '/' + day);
            return verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = card.match(re_eighteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date(year + '/' + month + '/' + day);
            return verifyBirthday(year, month, day, birthday);
        }
        return false;
    };

    //校验日期
    verifyBirthday = function (year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
            //判断年份的范围（3岁到100岁之间)
            var time = now_year - year;
            if (time >= 3 && time <= 100) {
                return true;
            }
            return false;
        }
        return false;
    };

    //15位转18位身份证号
    changeFivteenToEighteen = function (card) {
        if (card.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i;
            card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            card += arrCh[cardTemp % 11];
            return card;
        }
        return card;
    };


    var telnoChk = /^1[34578]\d{9}$/;
    var chinesChk = /^[\u4E00-\u9FA5]+$/;
    var noChk = /[^\d]+$/;
    var idNoChk = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var letterNum = /[^\0-9\a-z\A-Z]*$/g;
    var number = /^[\d]+$/g;
    var addTes = /[^A-Za-z0-9\u4e00-\u9fa5]+$/;
    //验证必填项
    $("input.reb-bg").live('blur', function () {
        if ($(this).val() != "") {
            $(this).css("background-color", "#fff");
        } else {
            $(this).css("background-color", "rgba(233,203,213,.6)");

        }
    });
    //验证手机号，类名：checkTelNo
    $(".checkTelNo").live({
        keyup: function () {
            $(this).val($(this).val().replace(noChk, ''));
        }, blur: function () {
            $(this).siblings("div.red-tip").remove();
            var telNoVal = $(this).val();
            var warnInfo = MSG_INFO_ALERT['check_tel_no'];
            if (!telnoChk.test(telNoVal) && telNoVal != "") {
                $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
                Cddd.createRedTop();
            } else {
                $(this).siblings("div.red-tip").remove();
            }
        }
    });

    //验证身份证号，类名：checkIdNo
    $(".checkIdNo").live({
        keyup: function () {
            $(this).val($(this).val().replace(letterNum, '').replace(/\s/g, ''));
        }, blur: function () {
            $(this).siblings("div.red-tip").remove();
            var idNoVal = $(this).val();
            var warnInfo = MSG_INFO_ALERT['check_id_no'];
            if (!idNoChk.test(idNoVal) && idNoVal != "") {
                $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
                Cddd.createRedTop();
            } else {
                $(this).siblings("div.red-tip").remove();
            }
        }
    });
    //验证输入项必须为汉字， 类名：checkChines
    $(".checkChines").live('blur', function () {
            var warnInfo = MSG_INFO_ALERT['check_chinese'];
            var chineseVal = $(this).val();
            $(this).siblings("div.red-tip").remove();
            if ($(this).val() != "" && !chinesChk.test(chineseVal)) {
                $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
                Cddd.createRedTop();
            } else {
                $(this).siblings("div.red-tip").remove();
            }
        }
    );
    //验证金额 ，类名：chekAmount
    $(".chekAmount").live('blur', function () {
        var checkAmount = /^[0-9]+(\.[0-9]{1,2})?$/;
        var amountVal = $(this).val();
        var warnInfo = MSG_INFO_ALERT['check_amount'];
        $(this).siblings("div.red-tip").remove();
        if (!checkAmount.test(amountVal) && amountVal != "") {
            $(this).val("");
            $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
            Cddd.createRedTop();
        } else if ($(this).hasClass("posInt") && $(this).val() <= 0) {
            warnInfo = MSG_INFO_ALERT['check_posInt'];
            $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
            Cddd.createRedTop();
        } else {
            $(this).siblings("div.red-tip").remove();
        }
    });
    //验证只能输入汉字、字母、数字，长度小于25
    $(".chletnum").live({
        keyup: function () {
            $(this).val($(this).val().replace(addTes, ''));
            $(".chletnum").attr("maxlength", "25");
        },
        blur: function () {
            var idNoVal = $(this).val();
            var warnInfo = MSG_INFO_ALERT['textTL'];
            $(this).siblings("div.red-tip").remove();
            if (idNoVal.length > 25) {
                $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
                Cddd.createRedTop();
            } else {
                $(this).siblings("div.red-tip").remove();
            }
        }
    });
});
//限制字符长度
var textL = $(".form-control[type='text']");
$(textL).live("blur", function () {
    if ($(this).attr("textl") != undefined) {
        var idNoVal = $(this).val();
        var cac = $(this).attr("textl");
        var warnInfo = MSG_INFO_ALERT['textTL'];
        $(this).siblings("div.red-tip").remove();
        if (idNoVal.length > cac) {
            $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>");
            Cddd.createRedTop();
        } else {
            $(this).siblings("div.red-tip").remove();
        }
    }
});


/*-- 输入框的提示显示 --*/
Cddd.createRedTop = function (info) {
    $(".red-tip-pop").hover(function () {
        $(this).siblings(".red-pop-txt").css("display", "block");
    }, function () {
        $(this).siblings(".red-pop-txt").css("display", "none");
    });
}
Cddd.checkInputVal = function () {
    var telnoChk = /^1[34578]\d{9}$/;
    var phoneCheck = /^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/;
    var chinesChk = /[^\u4E00-\u9FA5]+$/;
    var noChk = /[^\d]+$/;
    var idNoChk = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    var letterNum = /[^\0-9\a-z\A-Z]*$/g;
    //验证手机号，类名：checkTelNo
    $(".checkTelNo").live({
        keyup: function () {
            $(this).val($(this).val().replace(noChk, ''));
        }, blur: function () {
            var telNoVal = $(this).val();
            var warnInfo = MSG_INFO_ALERT['check_tel_no'];
            $(this).siblings("div.red-tip").remove();
            if (!telnoChk.test(telNoVal) && telNoVal != "") {
                if ($(this).siblings(".red-tip").length == 0) {
                    $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
                }
                Cddd.createRedTop();
            } else {
                $(this).siblings("div.red-tip").remove();
            }
        }
    });
    //验证座机号和手机号，类名：checkPhoneNo
    $(".checkPhoneNo").live({
        keyup: function () {
            $(this).val($(this).val().replace(noChk, ''));
        }, blur: function () {
            var telNoVal = $(this).val();
            var warnInfo = MSG_INFO_ALERT['check_phone_no'];
            $(this).siblings("div.red-tip").remove();
            if (!phoneCheck.test(telNoVal)) {
                if ($(this).siblings(".red-tip").length == 0) {
                    $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
                }
                Cddd.createRedTop();
            } else {
                $(this).siblings("div.red-tip").remove();
            }
        }
    });
    //验证必填项
    $("input.reb-bg").live('blur', function () {
        if ($(this).val() != "") {
            $(this).css("background-color", "#fff");
        } else {
            $(this).css("background-color", "rgba(233,203,213,.6)");
        }
    });
    $("input.reb-bg").each(function () {
        if ($(this).val() != "") {
            $(this).css("background-color", "#fff");
        } else {
            $(this).css("background-color", "rgba(233,203,213,.6)");
        }
    });
    //验证身份证号，类名：checkIdNo
    $(".checkIdNo").live({
        keyup: function () {
            $(this).val($(this).val().replace(letterNum, '').replace(/\s/g, ''));
        }, blur: function () {
            var idNoVal = $(this).val();
            var warnInfo = MSG_INFO_ALERT['check_id_no'];
            $(this).siblings("div.red-tip").remove();
            if (!idNoChk.test(idNoVal) && idNoVal != "") {
                $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
                Cddd.createRedTop();
            } else {
                $(this).siblings("div.red-tip").remove();
            }
        }
    });
    //验证输入项必须为汉字， 类名：checkChines
    $(".checkChines").live('keyup', function () {
        var warnInfo = MSG_INFO_ALERT['check_chinese'];
        var chineseVal = $(this).val();
        $(this).siblings("div.red-tip").remove();
        if ($(this).val() != "" && !chinesChk.test(chineseVal)) {
            $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>")
            Cddd.createRedTop();
        } else {
            $(this).siblings("div.red-tip").remove();
        }
    });
    //验证金额 ，类名：chekAmount
    $(".chekAmount").live('blur', function () {
        var checkAmount = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        //var checkAmount = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        var amountVal = $(this).val();
        var warnInfo = MSG_INFO_ALERT['check_amount'];
        $(this).siblings("div.red-tip").remove();
        if (!checkAmount.test(amountVal) && amountVal != "") {
            $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>");
            Cddd.createRedTop();
        } else if ($(this).hasClass("posInt") && $(this).val() <= 0) {
            warnInfo = MSG_INFO_ALERT['check_posInt'];
            $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>");
            Cddd.createRedTop();
        } else {
            $(this).siblings("div.red-tip").remove();
        }
    });
}
Cddd.delfile = function (uli, filej) {
    $("#file-box" + uli + " #file" + filej).parent().remove();
    if ($("#file-box" + uli + ">li").length == 0) {
        $("#file-box" + uli).siblings(".file-btnli").find(".upLoadbtn").remove();
    }
}
Cddd.dataId = '';//某列Id值
Cddd.flag = ''; //标志位
Cddd.nodeStatusArray = '';
Cddd.busiloan_OrderCarId = '';
//按钮
function moreLink(e) {
    Cddd.loadPopShow();
    Cddd.dataId = e.parentNode.parentNode.id;
    var valName = e.name;
    var val = e.innerText;
    var topUl = $("#panel-nav li");
    var linkhtml = $(".link-url li a");
    var liDiv = "<li style='display:none;' name='" + valName + "'><span>" + val + "</span><i class='glyphicon glyphicon-remove'></i></li>";
    var addStaffFlag = true;
    for (var i = 0; i < topUl.length; i++) {
        topVal = topUl.eq(i).attr("name");
        if (valName == topVal) {
            addStaffFlag = false;
            break;
        }
    }
    if (addStaffFlag == true) {
        $("#panel-nav").append(liDiv);
    }
    $.ajaxSetup({cache: false});
    $("#panel").load("business/" + valName + ".html");
    for (var i = 0; i < linkhtml.length; i++) {
        if (linkhtml.eq(i).attr("name") == valName) {
            linkhtml.eq(i).attr("flag", true);
            break;
        }
    }
    removeTab();

}
//按钮超链接
Cddd.linkHtml = function (name) {
    var topVal;
    var topUl = $("#panel-nav li");
    var liDiv = "<li style='display:none;' name='" + name + "'><span></span><i class='glyphicon glyphicon-remove'></i></li>";
    var addStaffFlag = true;
    for (var i = 0; i < topUl.length; i++) {
        topVal = topUl.eq(i).attr("name");
        if (name == topVal) {
            addStaffFlag = false;
            break;
        }
    }
    if (addStaffFlag == true) {
        $("#panel-nav").append(liDiv);
    }
    $.ajaxSetup({cache: false});
    $("#panel").load("business/" + name + ".html");
}
//删除
function removeTab() {
    var topUl = $("#panel-nav li");
    var arr = new Array();
    for (var i = 0; i < topUl.length; i++) {
        var topName = topUl.eq(i).attr("name");
        arr.push(topName);
    }

    $(".glyphicon-remove").click(function () {
        var linkhtml = $(".link-url li a");
        var liName = $(this).parent().attr("name");
        var index = arr.indexOf(liName);
        var name;
        if (index > 0) {
            name = arr[index - 1];
        }
        $.ajaxSetup({cache: false});
        $("#panel").load("business/" + name + ".html");
        arr.splice(name);
        $(this).parent().remove();
        if (liName == topName) {
            $(this).removeAttr("flag");
        }
        for (var j = 0; j < linkhtml.length; j++) {
            if (liName == linkhtml.eq(j).attr("name")) {
                linkhtml.eq(j).removeAttr("flag");
            }
        }
    });
}
function goBackTab(nametop) {
    var topUl = $("#panel-nav li");
    var arr = new Array();
    var topName;
    var name;
    for (var i = 0; i < topUl.length; i++) {
        topName = topUl.eq(i).attr("name");
        arr.push(topName);
        if (topName == nametop) {
            topUl.eq(i).remove();
        }
    }
    var liName = nametop;
    var index = arr.indexOf(liName);
    if (index > 0) {
        name = arr[index - 1];
    }
    Cddd.loadPopShow();
    $.ajaxSetup({cache: false});
    $("#panel").load("business/" + name + ".html");
    arr.splice(name);
}
//@param name:前一个页面的路径
function gohistory(name) {
    ztKey = 0;
    if (name == "") return false;
    $.ajaxSetup({cache: false});
    $("#panel").load("business/" + name + ".html");
    Cddd.loadPopShow();
}
Cddd.ajaxDataPageParam = '{}';//eg:'{"ptype":1,"prompt":"中国"}'
Cddd.ajaxDataParam = {};
/*
 * ajax请求
 */
Cddd.getAjaxWithAsync = function (url, successMethod, data, beforeSendMethod, dataType, methodType) {
    $.ajax({
        url: url,
        cache: false,
        dataType: dataType,
        type: methodType,
        async: false,
        data: data,
        contentType: "application/json;charset=utf-8",
        timeout: 600000,
        beforeSend: beforeSendMethod,
        success: successMethod,
        error: Cddd.error
    });
};
/*
 * 表单数据加载
 * @param page:当前页; url:请求链接 ; param:post参数
 */
Cddd.ajaxDataPage = function (page, url, prow) {
    var rows = 10;//每页显示多少条记录
    var isSize = false;
    if (prow) {
        isSize = true;
        rows = prow;
    }
    Cddd.ajaxDataParam["page"] = page;
    Cddd.ajaxDataParam["rows"] = rows;
    Cddd.ajaxDataPageParam = Cddd.encode(Cddd.ajaxDataParam);
    var url_ = url + '?ran=' + new Date().getTime();
    $.ajax({
        type: 'POST',
        data: Cddd.ajaxDataPageParam,
        dataType: 'json',
        url: url_,
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            var obj = data;
            $('.table dl:gt(0)').remove();
            $("#item_data").tmpl(obj).appendTo('.table');
            var checkInpOne = $(".table dl dt input[type='checkbox']");
            if (checkInpOne.prop("checked")) {
                checkInpOne.removeProp("checked", "checked");
                checkInpOne.siblings("i.radioStyle").removeClass("checkboxAfter").addClass("checkboxBefore");
            }
            Cddd.loadPopHide();
            Cddd.goPage(page, rows, obj.total, url, isSize);
            if (data.rows.length == 0) {
                $(".page-group").html("<div class='noDataWarn'><img src='resources/images/data_warn.jpg'/></div>");
                if ($(".noDataWarn").parent().siblings().hasClass("x-scroll")) {
                    $(".noDataWarn").css("margin-top", "-30px");
                    $(".table-md").addClass("table-width100");
                }
            } else {
                $(".table-md").removeClass("table-width100");
            }
        },
        error: Cddd.error
    });
}
/*
 * @parm pno:当前页数,psize:每页显示行数,num:总数
 *
 */
Cddd.goPage = function (pno, psize, num, url, issize) {
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    if ((num) / pageSize > parseInt((num) / pageSize)) {
        totalPage = parseInt((num) / pageSize) + 1;
    } else {
        totalPage = parseInt((num) / pageSize);
    }
    ztajaxDataParam["page"] = pno;
    var currentPage = pno;//当前页数
    var pview = ' class="mr5" onClick=';
    var pnoview = ' class="mr5 noGary"  test=';
    var pmiddle1 = '';
    var pmiddle2 = '';
    var tempStr = '<div class="page-left">';
    tempStr += '<ul class="pagination">';
    tempStr += '<li><a href="javascript:;">共<em>' + (num) + '</em>条记录<i>/</i><em>' + totalPage + '</em>页</a></li>';
    tempStr += '<li><a href="#">当前第<em>' + currentPage + '</em>页</a></li>';
    if (issize) {
        tempStr += '<div class="page-size"><label class="control-label">每页</label>';
        tempStr += '<select class="form-control input-sm" id="pageSize">';
        tempStr += (psize == 5) ? '<option value="5" selected>5</option>' : '<option value="5">5</option>';
        tempStr += (psize == 10) ? '<option value="10" selected>10</option>' : '<option value="10">10</option>';
        tempStr += (psize == 20) ? '<option value="20" selected>20</option>' : '<option value="20">20</option>';
        tempStr += (psize == 30) ? '<option value="30" selected>30</option>' : '<option value="30">30</option>';
        tempStr += '</select><label class="control-label">条</label></div>';
    }
    tempStr += '</ul>';
    tempStr += '</div>';
    tempStr += '<div class="page-right">';
    tempStr += '<ul class="pagination">';

    if (totalPage > 1) {
        if (currentPage > 1 && currentPage < totalPage) {
            pmiddle1 = pview;
            pmiddle2 = pview;
        } else if (currentPage >= totalPage) {
            pmiddle1 = pview;
            pmiddle2 = pnoview;
        } else {
            pmiddle1 = pnoview;
            pmiddle2 = pview;
        }
    } else {
        pmiddle1 = pnoview;
        pmiddle2 = pnoview;
    }
    if (issize) {
        tempStr += '<li><a page="1" href="#" ' + pmiddle1 + ' "Cddd.ajaxDataPage(' + (1) + ',\'' + url + '\',' + psize + ')">首页</a></li>';
        tempStr += '<li><a page="' + (currentPage - 1) + '" href="#" ' + pmiddle1 + ' "Cddd.ajaxDataPage(' + (currentPage - 1) + ',\'' + url + '\',' + psize + ')">上一页</a></li>';
        tempStr += '<li><a page="' + (currentPage + 1) + '" href="#" ' + pmiddle2 + ' "Cddd.ajaxDataPage(' + (currentPage + 1) + ',\'' + url + '\',' + psize + ')">下一页</a></li>';
        tempStr += '<li><a page="' + totalPage + '" href="#" ' + pmiddle2 + ' "Cddd.ajaxDataPage(' + (totalPage) + ',\'' + url + '\',' + psize + ')">尾页</a></li>';
    } else {
        tempStr += '<li><a page="1" href="#" ' + pmiddle1 + ' "Cddd.ajaxDataPage(' + (1) + ',\'' + url + '\')">首页</a></li>';
        tempStr += '<li><a page="' + (currentPage - 1) + '" href="#" ' + pmiddle1 + ' "Cddd.ajaxDataPage(' + (currentPage - 1) + ',\'' + url + '\')">上一页</a></li>';
        tempStr += '<li><a page="' + (currentPage + 1) + '" href="#" ' + pmiddle2 + ' "Cddd.ajaxDataPage(' + (currentPage + 1) + ',\'' + url + '\')">下一页</a></li>';
        tempStr += '<li><a page="' + totalPage + '" href="#" ' + pmiddle2 + ' "Cddd.ajaxDataPage(' + (totalPage) + ',\'' + url + '\')">尾页</a></li>';
    }
    tempStr += '</ul>';
    tempStr += '</div>';

    $(".page-group").html(tempStr);
}

/*
 * @parm :确定提交弹框
 * info:提示信息  	1:确定提交？
 */
Cddd.showSubTop = function (info) {
    if (info == 1) {
        info = "确定提交？";
    }
    var TipDiv = "<div class='pop-bg'><div class='pop-tip-main col-lg-4 col-xs-6 submit-tip'><div><img src='resources/images/warn_small.jpg'/><span>" +
        info + "</span></div><div class='btn-ul tc'><button type='button' id='subTop' class='btn btn-red mr30' >确定</button>" +
        "<button type='button' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()' isami='y'>取消</button></div></div></div>";
    $("body").append(TipDiv);
    $(".pop-tip-main").addClass("ptmAniShow");
}
/*
 * @parm :stat 提交状态 ，1：成功，0:失败，默认:提示
 *  成功结果返回弹框
 *
 */
Cddd.showInfoTop = function (stat, i) {
    var TipDiv;
    if (i == 1) {
        TipDiv = "<div class='pop-bg'><div class='pop-tip-main col-lg-4 col-xs-6 submit-tip'><div><img src='resources/images/sucess.jpg'/><span>" +
            stat + "</span></div><div class='btn-ul tc'><button type='button' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()' isami='n'>关闭</button></div></div></div>";
    } else if (i == 0) {
        TipDiv = "<div class='pop-bg'><div class='pop-tip-main col-lg-4 col-xs-6 submit-tip'><div><img src='resources/images/wrong.jpg'/><span>" +
            stat + "</span></div><div class='btn-ul tc'><button type='button' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()' isami='n'>关闭</button></div></div></div>";
    } else {
        TipDiv = "<div class='pop-bg'><div class='pop-tip-main col-lg-4 col-xs-6 submit-tip'><div><img src='resources/images/warn_small.jpg'/><span>" +
            stat + "</span></div><div class='btn-ul tc'><button type='button' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()' isami='n'>关闭</button></div></div></div>";
    }
    $("body").append(TipDiv);
    return true;
}
/*
 * @parm :创建订单弹框
 *
 */
Cddd.showOrderTop = function () {
    var orderDiv = "<div class='pop-bg'><div class='pop-main col-lg-5 pop-tip-main'><div class='col-mr10 clearfix' style='padding:0 20px 0 0;'><div class='col-lg-6 col-xs-6'><div class='input-group'>" +
        "<label class='input-group-addon'>姓名</label><input type='text' class='form-control checkChines reb-bg' id='custnameId' /></div></div>" +
        "<div class='col-lg-6 col-xs-6'><div class='input-group'><label class='input-group-addon'>性别</label><div class='sel-option'>" +
        "<input type='text' class='form-control reb-bg' readonly /><input type='hidden' class='form-control' id='sexId' /><ul class='sel-ul'><li valip='0'>男</li><li valip='1'>女</li></ul></div>" +
        "<i class='glyphicon glyphicon-chevron-down sel-opt'></i></div></div>" +
        "<div class='col-lg-6 col-xs-6'><div class='input-group'><label class='input-group-addon'>身份证号</label>" +
        "<input type='text' class='form-control checkIdNo reb-bg' id='identityCodeId' /></div></div><div class='col-lg-6 col-xs-6'>" +
        "<div class='input-group'><label class='input-group-addon'>手机号</label>" +
        "<input type='text' class='form-control checkTelNo reb-bg' id='telNoId' /></div></div></div>" +
        "<div class='btn-ul tc clearfix'><button type='button' class='btn btn-red mr40' onclick='Cddd.orderNew()' id='orderCzreate'>创建订单</button>" +
        "<button type='reset' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()' isAmi='y'>取消</button></div></div></div>";
    $("body").append(orderDiv);
    $(".pop-tip-main").addClass("ptmAniShow");
}
/*
 * 业务转移弹框
 * 
 */
Cddd.showTransferTop = function (id, name, loginName) {
    var defaultVal = "";
    var adjustDiv2 = "";
    $(".pop-tip-main").addClass("ptmAniShow");
    Cddd.getAjaxWithAsync("sysoperator/getUserlist.cddd?storeId=" + id + "&id=" + name, function (dt) {
        $.each(dt, function (i, n) {
            if (i == 0) {
                defaultVal = n.operName;
                adjustDiv2 += "<li valip='" + n.loginName + "'class='checked_li'><span class='glyphicon glyphicon-ok'></span>" + n.operName + "</li>";
            } else {
                adjustDiv2 += "<li valip='" + n.loginName + "'>" + n.operName + "</li>";
            }
        });
    }, null, function (dt) {
    }, 'json', 'get');
    var adjustDiv1 = "<div class='pop-bg' id='orderPop'>                                                                       " +
        "  <div class='pop-main  col-sm-3 pop-tip-main'>                                                                           " +
        "		<div class='clearfix'><div class='col-lg-11'>                                                                      " +
        "			<div class='input-group'>                                                                                      " +
        "				<label class='input-group-addon'>人员</label>                                                               " +
        "				<div class='sel-option'>                                                                                   " +
        "					<input type='text' class='form-control' id='transferName' value='" + defaultVal + "'/>                                            " +
        "					<input type='hidden' id='transferId'/>                                                                  " +
        "					<ul class='sel-ul' id='select_option_id3'>                                                             ";
    var adjustDiv3 =
        "					</ul>                                                                                                   " +
        "				</div>                                                                                                      " +
        "				<i class='glyphicon glyphicon-chevron-down sel-opt'></i></div>                                              " +
        "			</div>                                                                                                          " +
        "		</div>                                                                                                              " +
        "		                                                                                                                    " +
        "		<div class='btn-ul pd0-10 tc clearfix'>                                                                             " +
        "		  <button type='button' class='btn btn-red mr40' onclick=\"Cddd.transfer('" + id + "','" + loginName + "')\">确定</button>                " +
        "		  <button type='reset' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()'>取消</button>         " +
        "		</div>                                                                                                              " +
        "  </div>                                                                                                                   " +
        "</div>";
    $("body").append(adjustDiv1 + adjustDiv2 + adjustDiv3);
};
/*
 * @parm :修改信息弹框
 *
 */
Cddd.modifyCustomerInfo = function (orderNo, history) {
    var customer = {};
    var bankInfo = '';
    $.ajax({
        url: 'financeloan/view.cddd?financeOrderNo=' + orderNo,
        async: false,
        type: 'post',
        dataType: 'json',
        success: function (data) {
            if (data) {
                customer = data;
            }
        }
    });
    var bankName = '';
    $.ajax({
        url: 'sysdictionary/getInfo/7.cddd?ran=' + new Date().getTime(),
        async: false,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data) {
                for (var i in data) {
                    if (data[i].id == customer['financeBank']) {
                        bankName = data[i].name;
                    }
                    bankInfo += '<li valip="' + data[i].id + '">' + data[i].name + '</li>';
                }
            }
        }
    });
    var orderDiv = "<div class='pop-bg'>" +
        "	<div class='pop-main col-lg-5 pop-tip-main'>" +
        "		<div class='col-mr10 clearfix' style='padding:0 20px 0 0;'>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>姓名</label>" +
        "					<input type='text' class='form-control checkChines reb-bg' id='financeName' value='" + Cddd.clearNull(customer['financeName']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>手机号</label>" +
        "					<input type='text' class='form-control checkTelNo reb-bg' id='financeCell' value='" + Cddd.clearNull(customer['financeCell']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>身份证号</label>" +
        "					<input type='text' class='form-control checkIdNo reb-bg' id='financeIdCard' value='" + Cddd.clearNull(customer['financeIdCard']) + "' maxlength='18'/>" +
        "				</div>" +
        "			</div>" +
        "		</div>" +
        "		<div class='col-mr10 clearfix' style='padding:0 20px 0 0;'>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>银行</label>" +
        "					<div class='sel-option'>" +
        "						<input type='text' class='form-control reb-bg' readonly value='" + Cddd.clearNull(bankName) + "'/>" +
        "						<input type='hidden' class='form-control' id='financeBank' value='" + Cddd.clearNull(customer['financeBank']) + "'/>" +
        "						<ul class='sel-ul'>" + bankInfo + "</ul>" +
        "					</div>" +
        "					<i class='glyphicon glyphicon-chevron-down sel-opt'></i>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>卡号</label>" +
        "					<input type='text' class='form-control reb-bg' id='financeCard' value='" + Cddd.clearNull(customer['financeCard']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "		</div>" +
        "        <div class='btn-ul tc clearfix'>" +
        "			<button type='button' class='btn btn-red mr40' onclick='Cddd.modifyCustomer(\"" + orderNo + "\", \"" + history + "\")' id='orderCzreate'>保存</button>" +
        "			<button type='reset' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()'>取消</button>" +
        "		</div>" +
        "	</div>" +
        "</div>";
    $("body").append(orderDiv);
    $(".pop-tip-main").addClass("ptmAniShow");
};
Cddd.modifyCustomer = function (orderNo, history) {
    Cddd.checkInputVal();
    if (!Cddd.checkIdCard() || $(".red-tip").length > 0) {
        return false;
    }
    var info = {
        financeOrderNo: orderNo,
        financeName: $('#financeName').val(),
        financeIdCard: $('#financeIdCard').val(),
        financeCell: $('#financeCell').val(),
        financeBank: $('#financeBank').val(),
        financeCard: $('#financeCard').val()
    };
    var flag = true;
    for (var i in info) {
        if (null == info[i] || '' === info[i]) {
            flag = false;
            break;
        }
    }
    if (!flag) {
        return false;
    }
    var params = Cddd.encode(info);
    $.ajax({
        type: "post",
        url: 'financeloan/modify.cddd',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: params,
        success: function () {
            Cddd.topOrderClose();
            $("#panel").load("business/" + history + ".html");
        },
        error: Cddd.error
    });
};
/*
 * @parm :修改信息弹框
 *
 */
Cddd.modifyDebtInfo = function (orderNos, history, prouType, loanMode) {
    var capitals = '';
    var params = {};
    params['prouType'] = prouType > 1 ? 1 : prouType;
    params['loaNMode'] = loanMode;
	$.ajax({
        url: 'debt/capital.cddd',
        async: false,
        type: 'post',
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        data: Cddd.encode(params),
        success: function (data) {
            if (data) {
                for (var i in data) {
                	capitals += '<li valip="' + data[i].id + '">' + data[i].debtType + '</li>';
                }
            }
        	var orderDiv = "<div class='pop-bg'>" +
            "	<div class='pop-main col-lg-4 col-xs-4 pop-tip-main'>" +
            "		<div class='col-mr10 clearfix' style='padding:0 20px 0 0;'>" +
            "			<div class='col-lg-8 col-xs-8' style='margin-left:12%'>" +
            "				<div class='input-group'>" +
            "					<label class='input-group-addon'>资方</label>" +
            "					<div class='sel-option'>" +
            "						<input type='text' class='form-control reb-bg' readonly value=''/>" +
            "						<input type='hidden' class='form-control' id='templateId' value=''/>" +
            "						<ul class='sel-ul'>" + capitals + "</ul>" +
            "					</div>" +
            "					<i class='glyphicon glyphicon-chevron-down sel-opt'></i>" +
            "				</div>" +
            "			</div>" +
            "		</div>" +
            "        <div class='btn-ul tc clearfix'>" +
            "			<button type='button' class='btn btn-red mr40' onclick='Cddd.chooseCapital(\"" + orderNos + "\", \"" + history + "\")'>保存</button>" +
            "			<button type='reset' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()'>取消</button>" +
            "		</div>" +
            "	</div>" +
            "</div>";
            $("body").append(orderDiv);
            $(".pop-tip-main").addClass("ptmAniShow");
        }
    });
};
Cddd.showChangeDebtInfo = function () {
    var orderDiv = "<div class='pop-bg'>" +
        "	<div class='pop-main col-lg-4 col-xs-4 pop-tip-main'><form id='uploadForm' target='uploadFrame' method='post' enctype='multipart/form-data' action='debt/upload.cddd'>" +
        "		<div class='col-mr10 clearfix'>" +
        "				<div id='upload' class='mt15 pl30'> " +
        "				  <div class='file-btnli clearfix'>" +
        "					  <input type='text' class='form-control dialog_file' style='float:left;width:65%;margin-right:10px;height:27px'>" +
        "					  <div class='file-bd fl mr20'>" +
        "						  <input type='file' name='file' id='upfile0' multiple onchange ='Cddd.showScrollDiv(\"0\",\"dialog\",\"dialog\")' />" +
        "						  <span class='btn btn-white'>选择文件</span>" +
        "					 </div>" +
        "				 </div> " +
        "				<a href='javascript:void(0)' onclick='Cddd.downloads();' style='font-size:15px;padding:10px 0;display:inline-block'>点此下载模板文件</a>" +
        "			   </div>" +
        "		</div>" +
        "        <div class='btn-ul tc clearfix'>" +
        "			<button type='button' class='btn btn-red mr40' onclick='Cddd.uploadCapital(\"" + history + "\")'>保存</button>" +
        "			<button type='reset' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()'>取消</button>" +
        "		</div>" +
        "	</div>" +
        "</form></div>";
    $("body").append(orderDiv);
};
Cddd.downloads = function () {
    document.getElementById('uploadFrame').src = '/attachment/template.xlsx';
};
Cddd.uploadCapital = function (history) {
    var options = {
        url: 'debt/upload.cddd',   //同action
        type: 'post',
        beforeSend: function (xhr) {//请求之前

        },
        success: function (data) {
            Cddd.topOrderClose();
            Cddd.showInfoTop(data.returnMsg);
            /*console.log(data); */
        },
        complete: function (xhr) {//请求完成

        },
        error: function (xhr, status, msg) {
            /*console.log("状态码"+status+"; "+msg);*/
        }
    };
    $("#uploadForm").ajaxSubmit(options);
    /*$('#uploadForm')[0].submit();*/
};
Cddd.chooseCapital = function (orderNos, history) {
    Cddd.checkInputVal();
    if ($(".red-tip").length > 0) {
        return false;
    }
    var info = {
        orderNo: orderNos,
        templateId: $('#templateId').val()
    };
    var flag = true;
    for (var i in info) {
        if (null == info[i] || '' === info[i]) {
            flag = false;
            break;
        }
    }
    if (!flag) {
        return false;
    }
    var params = Cddd.encode(info);
    $.ajax({
        type: "post",
        url: 'debt/choose.cddd',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: params,
        success: function () {
            Cddd.topOrderClose();
            $("#panel").load("business/" + history + ".html");
        },
        error: Cddd.error
    });
};
Cddd.clearNull = function (obj) {
    if (null == obj || '' === obj) {
        return '';
    }
    return obj;
};
Cddd.modifyThpaymentInfo = function (orderNo, history) {
    var customer = {};
    var bankInfo = '';
    $.ajax({
        url: 'financethpayment/view.cddd?financeOrderNo=' + orderNo,
        async: false,
        type: 'post',
        dataType: 'json',
        success: function (data) {
            if (data) {
                customer = data;
            }
        }
    });
    var bankName = '';
    $.ajax({
        url: 'sysdictionary/getInfo/7.cddd?ran=' + new Date().getTime(),
        async: false,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data) {
                for (var i in data) {
                    if (data[i].id == customer['financeBank']) {
                        bankName = data[i].name;
                    }
                    bankInfo += '<li valip="' + data[i].id + '">' + data[i].name + '</li>';
                }
            }
        }
    });
    var orderDiv = "<div class='pop-bg'>" +
        "	<div class='pop-main col-lg-5 pop-tip-main'>" +
        "		<div class='col-mr10 clearfix' style='padding:0 20px 0 0;'>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>姓名</label>" +
        "					<input type='text' class='form-control checkChines reb-bg' id='financeName' value='" + Cddd.clearNull(customer['financeName']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>手机号</label>" +
        "					<input type='text' class='form-control checkTelNo reb-bg' id='financeCell' value='" + Cddd.clearNull(customer['financeCell']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>身份证号</label>" +
        "					<input type='text' class='form-control checkIdNo reb-bg' id='financeIdCard' value='" + Cddd.clearNull(customer['financeIdCard']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "		</div>" +
        "		<div class='col-mr10 clearfix' style='padding:0 20px 0 0;'>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>银行</label>" +
        "					<div class='sel-option'>" +
        "						<input type='text' class='form-control reb-bg' readonly value='" + Cddd.clearNull(bankName) + "'/>" +
        "						<input type='hidden' class='form-control' id='financeBank' value='" + Cddd.clearNull(customer['financeBank']) + "'/>" +
        "						<ul class='sel-ul'>" + bankInfo + "</ul>" +
        "					</div>" +
        "					<i class='glyphicon glyphicon-chevron-down sel-opt'></i>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>卡号</label>" +
        "					<input type='text' class='form-control reb-bg' id='financeCard' value='" + Cddd.clearNull(customer['financeCard']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "		</div>" +
        "        <div class='btn-ul tc clearfix'>" +
        "			<button type='button' class='btn btn-red mr40' onclick='Cddd.modifyThpayment(\"" + orderNo + "\", \"" + history + "\")'>保存</button>" +
        "			<button type='reset' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()' isAmi='y'>取消</button>" +
        "		</div>" +
        "	</div>" +
        "</div>";
    $("body").append(orderDiv);
    $(".pop-tip-main").addClass("ptmAniShow");
}
Cddd.modifyThpayment = function (orderNo, history) {
    Cddd.checkInputVal();
    if (!Cddd.checkIdCard() || $(".red-tip").length > 0) {
        return false;
    }
    var info = {
        financeOrderNo: orderNo,
        financeName: $('#financeName').val(),
        financeIdCard: $('#financeIdCard').val(),
        financeCell: $('#financeCell').val(),
        financeBank: $('#financeBank').val(),
        financeCard: $('#financeCard').val()
    };
    var flag = true;
    for (var i in info) {
        if (null == info[i] || '' === info[i]) {
            flag = false;
            break;
        }
    }
    if (!flag) {
        return false;
    }
    var params = Cddd.encode(info);
    $.ajax({
        type: "post",
        url: 'financethpayment/modify.cddd',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: params,
        success: function () {
            Cddd.topOrderClose();
            $("#panel").load("business/" + history + ".html");
        },
        error: Cddd.error
    });
}
Cddd.modifyCapitalInfo = function (orderNo, history) {
    var capital = {};
    var info = {};
    info['orderNo'] = orderNo;
    var params = Cddd.encode(info);
    $.ajax({
        url: 'debt/load.cddd',
        async: false,
        type: 'post',
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        data: params,
        success: function (data) {
            if (data) {
                capital = data;
            }
        }
    });
    if ('0' == capital['isTransit']) {
        capital['isTransitName'] = '否';
    } else if ('1' == capital['isTransit']) {
        capital['isTransitName'] = '是';
    }
    var orderDiv = "<div class='pop-bg'>" +
        "	<div class='pop-main col-lg-5 pop-tip-main'>" +
        "		<div class='col-mr10 clearfix' style='padding:0 20px 0 0;'>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>是否通过</label>" +
        "					<div class='sel-option'>" +
        "						<input type='text' class='form-control' readonly value='" + Cddd.clearNull(capital['isTransitName']) + "'/>" +
        "						<input type='hidden' class='form-control' id='isTransit' value='" + Cddd.clearNull(capital['isTransit']) + "'/>" +
        "						<ul class='sel-ul'><li valip='0'>否</li><li valip='1'>是</li></ul>" +
        "					</div>" +
        "					<i class='glyphicon glyphicon-chevron-down sel-opt'></i>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>通过时间</label>" +
        "					<input type='text' class='form-control rendertime' id='transitTime' value='" + getLocalDate(capital['transitTime']) + "' readonly='readonly'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>上标时间</label>" +
        "					<input type='text' class='form-control rendertime' id='superscriptTime' value='" + getLocalDate(capital['superscriptTime']) + "' readonly='readonly'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>上标金额</label>" +
        "					<input type='text' class='form-control chekAmt' id='superscriptAmt' value='" + showMoney(capital['superscriptAmt']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>车证邮寄时间</label>" +
        "					<input type='text' class='form-control rendertime' id='deliveryTime' value='" + getLocalDate(capital['deliveryTime']) + "' readonly='readonly'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>计息时间</label>" +
        "					<input type='text' class='form-control rendertime' id='interestTime' value='" + getLocalDate(capital['interestTime']) + "' readonly='readonly'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-6 col-xs-6'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>合同周期</label>" +
        "					<input type='text' class='form-control' id='contractCycle' value='" + Cddd.clearNull(capital['contractCycle']) + "'/>" +
        "				</div>" +
        "			</div>" +
        "			<div class='col-lg-10 col-xs-10 width10' style='padding:0;font-size:15px;'>" +
        "				<div class='input-group'>" +
        "					<label class='input-group-addon'>拒绝原因</label>" +
        "					<textarea class='textArea' placeholder='输入内容不能超过200字…' id='remark'>"+Cddd.clearNull(capital['remark'])+"</textarea>" +
        "				</div>" +
        "			</div>" +
        "		</div>" +
        "        <div class='btn-ul tc clearfix'>" +
        "			<button type='button' class='btn btn-red mr40' onclick='Cddd.modifyCapital(\"" + orderNo + "\", \"" + history + "\");'>保存</button>" +
        "			<button type='reset' class='btn btn-gray ami-close' onclick='Cddd.topOrderClose()'>取消</button>" +
        "		</div>" +
        "	</div>" +
        "</div>";
    $("body").append(orderDiv);
    $('.rendertime').jeDate({format: 'YYYY-MM-DD'});
    $(".pop-tip-main").addClass("ptmAniShow");
};
Cddd.modifyCapital = function (orderNo, history) {
    Cddd.checkInputVal();
    if ($(".red-tip").length > 0) {
        return false;
    }
    var info = {
        orderNo: orderNo,
        isTransit: $('#isTransit').val(),
        transitTime: $('#transitTime').val(),
        superscriptTime: $('#superscriptTime').val(),
        superscriptAmt: $('#superscriptAmt').val(),
        deliveryTime: $('#deliveryTime').val(),
        interestTime: $('#interestTime').val(),
        contractCycle: $('#contractCycle').val(),
        remark: $('#remark').val()
    };
    if (null != info['contracCycle'] && '' !== info['contractCycle']) {
        if (isNaN(parseFloat(info['contractCycle']))) {
            return false;
        }
    }
    if (null != info['superscriptAmt'] && '' !== info['superscriptAmt']) {
        if (isNaN(parseFloat(info['superscriptAmt']))) {
            return false;
        }
    }
    info['superscriptAmt'] = parseFloat(info['superscriptAmt']) * 100;
    var infos = [];
    infos.push(info);
    var params = Cddd.encode(infos);
    $.ajax({
        type: "post",
        url: 'debt/supplement.cddd',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: params,
        success: function () {
            Cddd.topOrderClose();
            $("#panel").load("business/" + history + ".html");
        },
        error: Cddd.error
    });
};
Cddd.showDebtInfo = function (orderNo, history) {
    Cddd.orderNo = orderNo;
    Cddd.history = history;
    Cddd.loadPopShow();
    $('#panel').load('business/debt/debt_info.html');
};
/*
 *transferId :转移到对象的ID
 *id：被转移者ID
 *name：被转移者登录名
 */
Cddd.transfer = function (id, loginName) {
    var transferLoginName = $("#transferId").val();
    var data = {"loginName": name, "transferLoginName": transferLoginName};
    Cddd.getAjaxWithAsync("busitaskpool/updateOperatorList.cddd?transferLoginName=" + transferLoginName + "&loginName=" + loginName, function (dt) {
    }, null, function (dt) {
    }, 'json', 'get');
    Cddd.topOrderClose();
    Cddd.showInfoTop("提交成功", 1);
};
Cddd.orderNew = function () {
    Cddd.checkInputVal();
    if (!Cddd.checkCard() || $(".red-tip").length > 0) {
        return false;
    }
    var nodeStatusArray = new Array();
    var url = "busiorder/createOrder.cddd";
    var custname = $("#custnameId").val();
    var sex = $("#sexId").val();
    var identityCode = $("#identityCodeId").val();
    var telNo = $("#telNoId").val();
    if (custname == "" || sex == "" || identityCode == "" || telNo == "") {
        return false;
    }
    $("#orderCzreate").attr("disabled", true);
    var params = Cddd.encode({custName: custname, sex: sex, identityCode: identityCode, telNo: telNo});
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: params,
        success: function (data) {
            Cddd.topOrderClose();
            url = "publicList/initPublicList.cddd";
            nodeStatusArray.push("1");
            Cddd.ajaxDataParam["nodeId"] = '4001';
            Cddd.ajaxDataParam["nodeStatusArray"] = nodeStatusArray;
            Cddd.ajaxDataPage(page, url);
        },
        error: Cddd.error
    });
};
/*
 *@param:加载中
 */
Cddd.loadPopShow = function () {
    var loadDiv = "<div class='pop-bg pop-bg-white'>" +
        "<div class='loader'>" +
        "</div></div>";
    if ($("body .pop-bg-white").length == 0) {
        $("body").append(loadDiv);
    }

};
Cddd.loadPopHide = function () {
    $("body .pop-bg-white").remove();
};
/*
 * @parm :关闭提示弹框
 *
 */
Cddd.topOrderClose = function () {
    //$("body>.pop-bg:last").remove();
    var isAmi = $(".ami-close:last").attr("isami");
    if (isAmi == "y") {
        $(".pop-tip-main:last").removeClass("ptmAniShow").addClass("ptmAniHide");
        var ts = setTimeout('$("body>.pop-bg:last").remove();$(".pop-tip-main").removeClass("ptmAniHide")', 300);
    } else {
        $("body>.pop-bg:last").remove();
    }

    return true;
};
/*
 * @parm :获取导航的data-value
 * navLiUrl 当前页面的名称
 */
Cddd.getDataVal = function (navLiUrl) {
    var valNo;
    var fromLi = $(".link-url li a");
    for (var i = 0; i < fromLi.length; i++) {
        if (fromLi.eq(i).attr("name") == navLiUrl) {
            valNo = fromLi.eq(i).attr("data-value");
            break;
        }
    }
    $("#nodeId").val(valNo);
}
//表单的删除按钮
function del(del) {
    var div = document.getElementById("listEach");
    div.removeChild(del);
}
/*--全选勾选框--*/
0
function plbtn() {
    var arrOrder = new Array();
    var checkli = $(".table input[type='checkbox']");
    if (checkli.eq(0).prop("checked")) {
        checkli.each(function () {
            checkli.prop("checked", "checked");
            checkli.siblings("i.radioStyle").removeClass("checkboxBefore").addClass("checkboxAfter");
        });
    } else {
        checkli.removeProp("checked", "checked");
        checkli.siblings("i.radioStyle").addClass("checkboxBefore").removeClass("checkboxAfter");
    }
}
/*--table中的勾选框--*/
function tabChkbtn() {
    var checkFirst = $(".table dl dt input[type='checkbox']").eq(0);
    var checklist = $(".table dl dd input[type='checkbox']");
    var checkImg = checkFirst.siblings("i.radioStyle");
    var checkStatus = true;
    checklist.each(function () {
        if (!$(this).prop("checked")) {
            checkStatus = false;
        }
    });
    if (checkStatus == false && checkFirst.prop("checked")) {
        checkFirst.removeProp("checked", "checked");
        checkImg.removeClass("checkboxAfter").addClass("checkboxBefore");
    } else if (checkStatus == true && !checkFirst.prop("checked")) {
        checkFirst.prop("checked", "checked");
        checkImg.removeClass("checkboxBefore").addClass("checkboxAfter");
    }
}

function checkOrder() {
    var ids = new Array();
    var nodeids = new Array();
    var arrays = new Array();
    var checkli = $(".table input[type='checkbox']");
    for (var i = 1; i < checkli.length; i++) {
        if (checkli.eq(i).prop("checked")) {
            var id = checkli.eq(i).parent().nextAll().eq(1).text();
            var nodeid = checkli.eq(i).parent().nextAll().eq(10).val();
            ids.push(id);
            nodeids.push(nodeid);
        }
    }
    arrays.push(ids);
    arrays.push(nodeids);
    return arrays;
}
/*--接件--*/
Cddd.receiveOrder = function (url, key) {
    var arrOrder = checkOrder();
    if (arrOrder[0].length == 0) {
        Cddd.showInfoTop("请选择订单");
        return false;
    }
    var params = Cddd.encode(arrOrder);
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: params,
        success: function (data) {
            $('.table dl:gt(0)').remove();
            $("li[name='face_noSubmit']").addClass('show');
            $("li[name='face_order']").removeClass();
            $("#connector").hide();
            $("#changeOrder").show();
            $("#item_data").tmpl(data).appendTo('#listEach');
            Cddd.stillReturn(key);
            Cddd.loadPopHide();
        },
        error: Cddd.error
    });
}

/*
 * 创建or修改
 */
Cddd.createOrUpdate = function (url, params, name) {
    ztKey = 0;
    var flag = true;
    var warnInfo = MSG_INFO_ALERT['input_text_red'];
    $("input.reb-bg").each(function (index) {
        var p = $(this).val();
        if (p == null || p == '') {
            flag = false;
            $(this).css("background-color", "rgba(233,203,213,.6)");
            if ($(this).siblings(".red-tip").length == 0) {
                $(this).after("<div class='red-tip'><span class='red-tip-pop'>!</span><p class='red-pop-txt'>" + warnInfo + "</p></div>");
            }
            Cddd.createRedTop();
            // return false;
        } else {
            $(this).css("background-color", "#fff");
            $(this).siblings("div.red-tip").remove();
        }


    });
    var redTipList = $("body .red-tip");
    if (flag == false || redTipList.length > 0) {
        Cddd.loadPopHide();
        Cddd.showInfoTop(warnInfo);
    }
    var url_ = url;// "sysdictionary/create.cddd" + "?ran="+ new Date().getTime();
    var str = Cddd.encode(params);
    if (flag == true && redTipList.length == 0) {
        $.ajax({
            type: 'POST',
            data: str,
            dataType: 'json',
            url: url_,
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                var obj = data;
                if (obj.returnCode == '000000') {
                    gohistory(name);
                    Cddd.showInfoTop(obj.returnMsg, 1);
                } else {
                    Cddd.showInfoTop(obj.returnMsg);
                }
                Cddd.loadPopHide();
            },
            error: Cddd.error
        });
    }
};

/*
 * 表单暂存
 *
 */
Cddd.saveForm = function (url, params, name) {
    var url_ = url;// "sysdictionary/create.cddd" + "?ran="+ new Date().getTime();
    var str = Cddd.encode(params);
    $.ajax({
        type: 'POST',
        data: str,
        dataType: 'json',
        url: url_,
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            var obj = data;
            if (obj.returnCode == '000000') {
                Cddd.showInfoTop(obj.returnMsg, 1);
            }
        },
        error: Cddd.error
    });
}
Cddd.saveForms = function (url, params, name) {
    var url_ = url;// "sysdictionary/create.cddd" + "?ran="+ new Date().getTime();
    var str = Cddd.encode(params);
    $.ajax({
        type: 'POST',
        data: str,
        dataType: 'json',
        url: url_,
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            var obj = data;
            if (obj.returnCode == '000000') {
                gohistory(name);
                Cddd.showInfoTop(obj.returnMsg, 1);
            }
        },
        error: Cddd.error
    });
}
/*
 *form 表单赋值,只针对文本赋值，以后添加下拉框和radio等
 */
Cddd.fillForm = function ($form, json) {
    var jsonObj = json;
    if (typeof json === 'string') {
        jsonObj = $.parseJSON(json);
    }
    for (var key in jsonObj) {  //遍历json字符串
        if ($("[name=" + key + "]").hasClass("chekAmount") && jsonObj[key] != null) {
            $("[name=" + key + "]", $form).val(parseInt(jsonObj[key]) / 100);
        } else {
            $("[name=" + key + "]", $form).val(jsonObj[key] == null ? '' : jsonObj[key]);
        }
    }
}
/*
 * 获取地址栏参数
 *
 */
Cddd.getUrlParam = function GetQueryString(paramName) {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数
    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            if (name == paramName) {
                value = arr[i].substr(num + 1);
                break;
            }
        }
    }
    return value;
}
/*
 * 下拉框返显数据值
 */
Cddd.selfromShow = function () {
    var fxHideVal;
    $(".sel-ul").each(function () {
        fxHideVal = $(this).siblings("input[type='hidden']").val();
        selLi = $(this).children("li");
        for (var i = 0; i < selLi.length; i++) {
            if (fxHideVal != "" && fxHideVal != null && selLi.eq(i).attr("valip") == fxHideVal) {
                $(this).siblings(".form-control").val(selLi.eq(i).text());
                break;
            }
        }

    });
};
/*--上传文件增加、删除--
 * @param i:拼接上传按钮id;id:按钮id
 * */
var loadUlNum;
Cddd.showScrollDiv = function (i, type, info) {
    var fileliDiv;
    var temp;
    var obj = document.getElementById("upfile" + i);
    var length = obj.files.length;
    var btnlist = $("#upfile" + i);
    var scfilebtn;
    if (info == "wordOrExcel") {
        scfilebtn = "<a href='javascript:;' class='btn btn-white fl upLoadbtn' id='uploadImg" + i + "' onclick=Cddd.uploadFileWord('" + i + "')>上传</a>";
    } else if (info == "any") {
        scfilebtn = "<a href='javascript:;' class='btn btn-white fl upLoadbtn' id='uploadImg0' onclick=uploadFile('0')>上传</a>";
    } else if (info == "dialog") {
        scfilebtn = "";
    } else {
        scfilebtn = "<a href='javascript:;' class='btn btn-white fl upLoadbtn' id='uploadImg" + i + "' onclick=Cddd.uploadFile('" + i + "')>上传</a>";
    }
    if (btnlist.parent().siblings(".btn-white").length < 1) {
        btnlist.parent().after(scfilebtn);
    }
    if (type == "debtScroll") {
        fileliDiv = "<li ><div class='tbox'><div class='tiao'></div></div>";
        btnlist.parent().parent().siblings(".file-box").append(fileliDiv);
    } else if (type == "dialog") {
        var fileName = "";
        var newFileName = "";
        var fileTypeFlag = 0;
        for (var j = 0; j < length; j++) {
            newFileName = obj.files[j].name.split('.');
            newFileName = newFileName[newFileName.length - 1];
            if (newFileName == "xls" || newFileName == "xlsx") {
                fileTypeFlag = 1;
            }
            temp = obj.files[j].name;
            fileName += (temp + " ");
        }
        if (fileTypeFlag == 0) {
            btnlist.parent().siblings(".dialog_file").val("仅限excel文件,请重新选择！");
            $("#uploadForm").find(".btn-red").attr("disabled", "disabled");
        } else {
            btnlist.parent().siblings(".dialog_file").val(fileName);
            $("#uploadForm").find(".btn-red").attr("disabled", false);
        }
    } else {
        for (var j = 0; j < length; j++) {
            temp = obj.files[j].name;
            fileliDiv = "<li ><div class='tbox'><div class='tiao'></div></div><span class='img-name' >" + temp + "</span>" +
                "<a id='file" + j + "' href='javascript:;' class='btn btn-white delbtn' onclick='Cddd.delfile(" + i + "," + j + ")'>删除</a></li>";
            btnlist.parent().parent().siblings(".file-box").append(fileliDiv);
            ;
        }
    }
}
/*
 * 上传图片
 */
Cddd.uploadFile = function (i) {
    console.log(i);
    loadUlNum = i;
    showSroll();
    var url = Cddd.uploadFileUrl;
    var flag = Cddd.checkImg();
    if (flag == false) {
        return false;
    }
    $.ajaxFileUpload({
        //处理文件上传操作的服务器端地址(可以传参数,已亲测可用)	（二级hkjt/还款详情id/还款期数）,
        url: url,
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: 'upfile' + i,           //文件选择框的id属性
        dataType: 'json',                       //服务器返回的格式,可以是json或xml等
        success: function (data, status) {
            var flagParam = Cddd.ajaxDataParam["debt_liId"];
            if (flagParam == null) {
                var phtml = '';
                for (var ind = 0; ind < data.list.length; ind++) {
                    var name = data.list[ind].substring(Cddd.linuxWindowsIndex(data.list[ind]) + 1);
                    name = name.replace('thum', '');
                    phtml = phtml + "<li><a href='#" + data.list2[ind] + "'><img src='" + data.list[ind] + "'/></a><p>" + name + "</p></li>";
                }
                $('#ul' + i).html(phtml);
                $("#file-box" + i).html("");
                $("#uploadImg" + i).remove();
            } else {
                var index = flagParam.substring(flagParam.indexOf("_"));
                $('#hrefDebt' + index).attr('href', '#' + data.list2[0]);
                $('#' + flagParam).attr('src', data.list[0]);
                $('#' + flagParam).css("display", "block");
                Cddd.topOrderClose();
            }
            Cddd.imgShow();
            Cddd.deleteImg();

        },
        error: function (data, status, e) {
            var msg = status;
            if (msg === 1010) {
                window.location.href = "login.html";
            } else {
                $('#result').html('图片上传失败，请重试！！');
            }
            $("#file-box" + loadUlNum).html("");
            $("#uploadImg" + loadUlNum).remove();
        }
    })
};
/*
 * 上传文件
 */
Cddd.uploadFileWord = function (i) {
    loadUlNum = i;
    showSroll();
    var fileSize = 0;
    var target = document.getElementById("upfile" + i);
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    var size = fileSize / 1024;
    if (size > 50000) {
        Cddd.showInfoTop("附件不能大于50M");
        target.value = "";
        return
    }
    var name = target.value;
    var fileName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
    if (fileName != "docx" && fileName != "xlsx" && fileName != "doc" && fileName != "xls" && fileName != "txt") {
        Cddd.showInfoTop("请选择正确格式文件上传！");
        $("#file-box" + loadUlNum).html("");
        $("#uploadImg" + loadUlNum).remove();
        target.value = "";
        return
    }
    debtName = Cddd.debtName;
    orderNo = Cddd.orderNo;
    var url = 'debt/uploadFile.cddd?orderNo=' + orderNo + '&getFileInfo=' + debtName;
    $.ajaxFileUpload({
        //处理文件上传操作的服务器端地址(可以传参数,已亲测可用)	（二级hkjt/还款详情id/还款期数）,
        url: url,
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: 'upfile' + i,           //文件选择框的id属性
        dataType: 'json',
        //服务器返回的格式,可以是json或xml等
        success: function (data, status) {
            var phtml = '';
            var logourl;
            for (var ind = 0; ind < data.list.length; ind++) {
                var name = data.list[ind].substring(Cddd.linuxWindowsIndex(data.list[ind]) + 1);
                var imgName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
                var biglogoUrl = encodeURI(encodeURI("busiorder/previewWord.cddd?targetPath=" + data.list[ind] + ""));
                var filep = data.list[ind];
                if (imgName == "docx" || imgName == "doc") {
                    logourl = "resources/images/word-logo.jpg";
                } else if (imgName == "xlsx" || imgName == "xls") {
                    logourl = "resources/images/excel-logo.jpg";
                } else if (imgName == "txt") {
                    logourl = "resources/images/txt-logo.jpg";
                }
                phtml = phtml + "<li><a href='" + biglogoUrl + "' filename='" + filep + "'><img src='" + logourl + "'/></a><p>" + name + "</p></li>";
            }
            $('#ul' + i).html(phtml);
            $("#file-box" + i).html("");
            $("#uploadImg" + i).remove();
            //图片删除
            Cddd.deleteImg();
        },
        error: function (data, status, e) {
            var msg = status;
            if (msg === 1010) {
                window.location.href = "login.html";
            } else {
                $('#result').html('文件上传失败，请重试！！');
            }
            $("#file-box" + loadUlNum).html("");
            $("#uploadImg" + loadUlNum).remove();
        }
    });
};
//默认根据什么获取上传的文本框值,对于多个上传不同类型的文件，需要赋值
Cddd.requireUpoladInput = "";
/*
 * 图片类型验证
 *
 */
Cddd.checkImg = function () {
    var file = $("input[name=file]");
    if (Cddd.requireUpoladInput != '') {
        file = $("input[" + Cddd.requireUpoladInput + "]");
    }
    var filePre;
    var filePre1;
    var files;
    var allowtype = ["JPG", "PNG", "BMP", "JPEG"];
    if (file.length > 0) {
        for (var i = 0; i < file.length; i++) {
            filePre = file[i];
            files = filePre.files;
            for (var j = 0; j < files.length; j++) {
                filePre1 = files[j];
                if (filePre1.name != "") {
                    var extStart = filePre1.name.lastIndexOf(".") + 1;
                    var fileType = filePre1.name.substring(extStart, filePre1.name.length).toUpperCase();
                    if ($.inArray(fileType, allowtype) == -1) {
                        Cddd.showInfoTop("图片类型不正确");
                        $("#file-box" + loadUlNum).html("");
                        $("#uploadImg" + loadUlNum).remove();
                        return false;
                    }
                }
            }
        }
    } else {
        Cddd.showInfoTop("请选择图片!");
        $("#file-box" + loadUlNum).html("");
        $("#uploadImg" + loadUlNum).remove();
        return false;
    }
}
/*
 * linux或windows取得下标值
 */
Cddd.linuxWindowsIndex = function (name) {
    var win = name.lastIndexOf('\\');
    var linuxp = name.lastIndexOf('/');
    var ind = (win == -1 ? linuxp : win);
    return ind;
}
/**
 * 滚动条
 */
var k = 0;
function showSroll() {
    var fileDiv;
    if ($("#file-box" + loadUlNum + ">li").length == 0) {
        k = 0;
    } else {
        if (k <= 98) {
            if (k <= 98) {
                setTimeout("showSroll()", 500);
                add(k);
                k = k + 2;
            }
        }
    }
    /*else{
     fileDiv = $("#file-box"+loadUlNum);
     fileDiv.find("li").remove();
     k=0;
     if($("#file-box"+loadUlNum+">li").length == 0){
     $("#file-box"+loadUlNum).parent().find(".upLoadbtn").remove();
     }
     }*/
}
function add(k) {
    var tiao = $("#file-box" + loadUlNum).find(".tiao");
    tiao.css("width", k + "%").html(k + "%");
}

/*
 *点击确认
 */
Cddd.adjustableConfirm = function (relationId, nodeId, url) {
    var jiejianId = $('#jiejianId').val();
    if (jiejianId == null || jiejianId == '') {
        Cddd.showInfoTop("调件人员必须选择");
        return false;
    }
    var data = {"nodeOperName": jiejianId, "orderNo": relationId, "nodeId": nodeId};
    Cddd.getAjaxWithAsync("busitaskpool/adjustableConfirm.cddd", function (dt) {
        gohistoryp(url);
    }, JSON.stringify(data), function (dt) {
    }, 'json', 'POST');
}
function gohistoryp(name) {
    if (name == "") return false;
    $.ajaxSetup({cache: false});
    $("#panel").load("business/" + name + ".html");
    Cddd.topOrderClose();
}
/*
 *调件
 *relationId:关联id,nodeId:节点id
 */
Cddd.adjustableParts = function (relationId, nodeId, url) {
    var adjustDiv1 = "<div class='pop-bg' id='orderPop'>                                                                       " +
        "  <div class='pop-main  col-sm-3 pop-tip-main'>                                                                               " +
        "		<div class='clearfix'><div class='col-lg-11'>                                                                                    " +
        "			<div class='input-group'>                                                                                      " +
        "				<label class='input-group-addon'>人员</label>                                                                " +
        "				<div class='sel-option'>                                                                                   " +
        "					<input type='text' class='form-control' id='jiejianName' />                                            " +
        "					<input type='hidden' id='jiejianId'/>                                                                    " +
        "					<ul class='sel-ul' id='select_option_id3'>                                                             ";
    var adjustDiv2 = "";
    var adjustDiv3 =
        "					</ul>                                                                                                   " +
        "				</div>                                                                                                      " +
        "				<i class='glyphicon glyphicon-chevron-down sel-opt'></i></div>                                                    " +
        "			</div>                                                                                                          " +
        "		</div>                                                                                                              " +
        "		                                                                                                                    " +
        "		<div class='btn-ul pd0-10 tc clearfix'>                                                                                    " +
        "		  <button type='button' class='btn btn-red mr40' onclick=\"Cddd.adjustableConfirm('" + relationId + "','" + nodeId + "','" + url + "')\">确定</button>" +
        "		  <button type='reset' class='btn btn-gray' onclick=\"gohistoryp('" + url + "')\">取消</button>                    " +
        "		</div>                                                                                                              " +
        "  </div>                                                                                                                  " +
        "</div>";

    Cddd.getAjaxWithAsync("sysoperator/adjustableParts.cddd", function (dt) {
        $.each(dt, function (i, n) {
            adjustDiv2 = adjustDiv2 + "<li valip='" + n.loginName + "'>" + n.operName + "</li>";
        });
        $("body").append(adjustDiv1 + adjustDiv2 + adjustDiv3);
        $(".pop-tip-main").addClass("ptmAniShow");
        //Cddd.topShow(2);
    }, null, function (dt) {
    }, 'json', 'GET');
};
/*
 *图片放大
 */
Cddd.viewImage = function (a) {
    //图片显示
    var img = new Image();
    var w;
    var h;
    var widwid = $(window).width();
    var widheit = $(window).height();
    r = parseInt($(".content").css("borderLeftWidth"));
    img.onload = function () {
        img.onload = null;
        w = img.width;
        h = img.height;
        if (w > widwid || h > widheit) {
            w = widwid - widwid * 2 / 5;
            h = widheit - widheit / 6;
        }
        $(".content").stop().animate({
            width: w,
            height: h,
            marginTop: -(h / 2) - r,
            marginLeft: -(w / 2) - r
        }, 200);
        $("#zoom").css("display", "block");
        $(".content").append('<img style="display: block;" src="' + a + '">');
    }
    img.src = a;
}
Cddd.imgShow = function () {
    var arrImg = new Array();
    var aList;
    var a;
    var index;

    //点击图片的事件
    $(".gallery li a").on('click', function () {
        a = $(this).attr("href").split("#")[1];
        //图片数组
        $(".gallery li a").each(function () {
            aList = $(this).attr("href").split("#")[1];
            arrImg.push(aList);
        });
        Cddd.viewImage(a);
    });
    //上一页
    $(".previous").on('click', function () {
        $("#zoom>.content").html("");
        index = arrImg.indexOf(a);
        if (index <= 0) {
            a = arrImg[arrImg.length - 1];
        } else {
            index = index - 1;
            a = arrImg[index];
        }
        Cddd.viewImage(a);
    });
    //下一页
    $("#zoom a.next").on('click', function () {
        $("#zoom>.content").html("");
        index = arrImg.indexOf(a);
        if (index >= arrImg.length - 1) {
            a = arrImg[0];
        } else {
            index = index + 1;
            a = arrImg[index];
        }
        Cddd.viewImage(a);
    });
    //关闭
    $(".close").on('click', function () {
        $("body #zoom").css("display", "none");
        $(".content img").remove();
        arrImg = [];
    });

}

/*
 * param:删除图片
 */
Cddd.deleteImg = function () {
    var delIcon;
    var arrys;
    var params;
    var delTip = "<span class='delImgIcon'><i class='glyphicon glyphicon-trash'></i></span>";
    $(".gallery li").hover(function () {
        $(this).append(delTip);
        delIcon = $(".gallery li span.delImgIcon");
        delIcon.hover(function () {
            $(this).css("opacity", "1");
            $(this).css("color", "#fff");
        }, function () {
            $(this).css("opacity", "0.5");
        });
        delIcon.click(function () {
            arrays = new Array();
            var href = $(this).siblings("a").attr("href");
            var bigImg;
            //图片名称
            var name = href.substring(Cddd.linuxWindowsIndex(href) + 1);
            //图片类型
            var imgName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
            if (imgName == 'docx' || imgName == 'doc' || imgName == 'xlsx' || imgName == 'xls' || imgName == 'txt' || imgName == 'pdf') {
                bigImg = decodeURI(decodeURI(href.split("=")[1]));
            } else {
                bigImg = href.split("#")[1];
            }
            var fileNamep = '';
            if (bigImg == undefined) {
                fileNamep = $(this).siblings("a").attr("filename");
            }
            var smallImg = $(this).siblings("a").find("img").attr("src");
            if (fileNamep == '') {
                arrays.push(bigImg);
                arrays.push(smallImg);
            } else {
                arrays.push(fileNamep);
            }

            //路径集合
            params = Cddd.encode(arrays);
            //获取展示图片ul
            var ul = $(this).parent().parent();
            var url = "busiorder/deleteImg.cddd";
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                data: params,
                success: function (data) {
                    var listLength = 0;
                    ul.html("");
                    var phtml = '';
                    var logourl;
                    var biglogoUrl;
                    if (data.list.legnth > 0) {
                        listLength = data.list;
                    } else {
                        listLength = data.list2;
                    }
                    for (var i = 0; i < listLength.length; i++) {
                        var name = listLength[i].substring(Cddd.linuxWindowsIndex(listLength[i]) + 1);
                        var imgName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
                        var tan = "";
                        var filep = data.list2[i];
                        biglogoUrl = encodeURI(encodeURI("busiorder/previewWord.cddd?targetPath=" + data.list2[i] + ""));
                        if (imgName == "docx" || imgName == "doc") {
                            logourl = "resources/images/word-logo.jpg";
                        } else if (imgName == "xlsx" || imgName == "xls") {
                            logourl = "resources/images/excel-logo.jpg";
                        } else if (imgName == "txt") {
                            logourl = "resources/images/txt-logo.jpg";
                        } else if (imgName == "pdf") {
                                logourl = "resources/images/pdf-logo.png";
                        } else {
                            name = name.replace('thum', '');
                            tan = "#";
                            filep = "";
                            logourl = data.list[i];
                            biglogoUrl = data.list2[i];
                        }
                        phtml = phtml + "<li><a href='" + tan + biglogoUrl + "' filename='" + filep + "'><img src='" + logourl + "'/></a><p>" + name + "</p></li>";
                    }
                    ul.html(phtml);
                    Cddd.imgShow();
                    Cddd.deleteImg();
                }
            })
        });
    }, function () {
        $(this).find(".delImgIcon").remove();
    });

}
function delIconf() {
    delIcon.hover(function () {
        delIcon.css("opacity", "1");
    });
    delIcon.click(function () {
        var bigImg = $(this).siblings("a").attr("href").split("#")[1];
        var smallImg = $(this).siblings("a").find("img").attr("src");
    });
}
//数组去重复
Cddd.arrayUnique = function (array) {
    var n = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < array.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}
/*
 * param:文件夹预览,显示弹出框
 * */
Cddd.folderShow = function () {
    var folderList = $(".folder-list>li>a");
    $("#folder").removeClass("displayno");
    $("#folder>div>ul:first").addClass("disblock");
}
/*
 * 给文件夹加点击事件
 */
Cddd.folderShowClick = function () {
    var arrBackName = new Array();
    var folderHreflist = $(".folder-list>li>a");
    for (var i = 0; i < folderHreflist.length; i++) {
        folderHreflist.eq(i).attr("id", "folder" + i);
        folderHreflist.eq(i).siblings("ul.folder-list").attr("flag", "folder" + i);
    }
    //显示文件夹层
    folderHreflist.click(function () {
        var div;
        var flag = $(this).attr("id");
        var nextUlDiv = $(this).siblings("ul.folder-list");
        var folderImgSrc = $(this).find("img").attr("src");
        var folderImgName = folderImgSrc.substring(folderImgSrc.lastIndexOf("/") + 1).split(".")[0];
        if (nextUlDiv.length > 0) {
            div = "<div flag='" + flag + "'></div>";
            $("#folderDiv").append(div);
            $("#folderDiv div:last").append(nextUlDiv).siblings("div").find(".folder-list").removeClass("disblock");
            $("#folderDiv>ul").removeClass("disblock");
            nextUlDiv.addClass("disblock");
        } else if (nextUlDiv.length == 0 && $("#folderDiv").find("#folder-list-wrap").length == 0 && folderImgName == "folder_img") {
            $("#folderDiv .folder-list").removeClass("disblock");
            $("#folderDiv").append("<ul class='folder-list disblock clearfix' id='folder-list-wrap'></ul>");
        }

    });
    //关闭
    $(".folder-close .glyphicon-remove").click(function () {
        $("#folder").addClass("displayno");
        if ($("#folderDiv #folder-list-wrap").length > 0) {
            $("#folder-list-wrap").remove();
        }
        $("#folderDiv>div>ul.folder-list").each(function () {
            Cddd.backFolder();
        });
        $("#folderDiv>#previewTree").removeClass("disblock");
        $("#previewTree").html("");
    });
}
//文件夹返回
Cddd.backFolder = function () {
    var ulDivList = $("#folderDiv>div:last");
    var backUl = $("#folderDiv>div:last").children();
    var id = ulDivList.attr("flag");
    var folderWrap = $("#folderDiv #folder-list-wrap");
    if (folderWrap.length > 0 && $("#folderDiv>div").length == 0) {
        folderWrap.siblings("#previewTree").addClass("disblock");
        folderWrap.remove();
    } else if (folderWrap.length > 0 && $("#folderDiv>div").length > 0) {
        folderWrap.remove();
        backUl.addClass("disblock");
    } else {
        backUl.removeClass("disblock");
        $("#" + id).after(backUl);
        ulDivList.remove();
        $("#" + id).parent().parent().addClass("disblock").siblings().find(".folder-list").removeClass("disblock");
    }

}
//列表排序 加idOrder是防止分页错乱，在第一页的数据跑到第二页
function listOrderBy(obj,sortName,idOrder){
	var self=obj;
	var thisArr=$(self).children("span").attr("class");
	$(".paixu > span").hide();
	$(self).children("span").show();
	var orderRuler = '';
	if(thisArr=="glyphicon glyphicon-arrow-up"){
		orderRuler = ' desc';
		$(self).children("span").attr("class","glyphicon glyphicon-arrow-down");
	}else{
		orderRuler = ' asc';
		$(self).children("span").attr("class","glyphicon glyphicon-arrow-up");
	}
	Cddd.ajaxDataParam["orderbyText"]=sortName + orderRuler + ',' + idOrder + orderRuler;
	Cddd.ajaxDataPage(page,url);
}
/*
 * js遍历树形
 */
Cddd.getViewTree = function (data, phtml) {
    for (var i in data) {
        var folder = data[i];
        if ((/\.jpg$|\.bmp$|\.jpeg$|\.png$|\.gif$/i).test(folder.fileName) && folder.fileName.indexOf('thum') < 0) {
            var win = folder.filePath.lastIndexOf('\\');
            var linuxp = folder.filePath.lastIndexOf('/');
            var ind = (win == -1 ? linuxp : win);
            var path = folder.filePath.substr(0, ind + 1);
            phtml.push('<li><a href="#' + folder.filePath + '"><img src="' + path + 'thum' + folder.fileName + '" path="' + folder.filePath + '"/></a><p>' + folder.fileName + '</p></li>');
            continue;
        } else if ((/\.jpg$|\.bmp$|\.jpeg$|\.png$|\.gif$/i).test(folder.fileName) && folder.fileName.indexOf('thum') >= 0) {
            continue;
        } else if (folder.fileType == 'docx' || folder.fileType == 'doc') {
            var url = encodeURI(encodeURI("busiorder/previewWord.cddd?targetPath=" + folder.filePath + ""));
            phtml.push('<li><a href=' + url + '><img src="resources/images/word-logo.png"/></a><p>' + folder.fileName + '</p></li>');
            continue;
        } else if (folder.fileType == 'xlsx' || folder.fileType == 'xls') {
            var url1 = encodeURI(encodeURI("busiorder/previewWord.cddd?targetPath=" + folder.filePath + ""));
            phtml.push('<li><a href=' + url1 + '><img src="resources/images/excel-logo.png"/></a><p>' + folder.fileName + '</p></li>');
            continue;
        } else if (folder.fileType == 'txt') {
            var urlTxt = encodeURI(encodeURI("busiorder/previewWord.cddd?targetPath=" + folder.filePath + ""));
            phtml.push('<li><a href=' + urlTxt + '><img src="resources/images/txt-logo.jpg"/></a><p>' + folder.fileName + '</p></li>');
            continue;
        } else if (folder.fileType == 'pdf') {
            var urlPdf = encodeURI(encodeURI("busiorder/previewWord.cddd?targetPath=" + folder.filePath + ""));
            phtml.push('<li><a href=' + urlPdf + '><img src="resources/images/pdf-logo.png"/></a><p>' + folder.fileName + '</p></li>');
            continue;
        } else {
            phtml.push('<li><a href="#"><img src="resources/images/folder_img.png"/></a><p>' + folder.fileName + '</p>');
            if (data[i].children.length > 0) {
                phtml.push('<ul class="folder-list clearfix">');
                Cddd.getViewTree(data[i].children, phtml);
                phtml.push('</ul>');
                phtml.push('</li>');
            }
        }
    }
}
/*
 *文件预览的图片放大
 */
Cddd.folderImgShow = function () {
    var imgList = $(".folder-list li a img");
    var img;
    var b;
    var m;
    var src;
    var a;
    var folderChild;
    var bigImgSrc;
    var arrayImgList = new Array();
    imgList.click(function () {
        arrayImgList = [];
        if ($(this).attr("path") != "undefined" && $(this).attr("path") != "" && $(this).attr("path") != null) {
            $("#zoom").addClass("folderImg");
            folderChild = $(this).parents(".folder-list").children("li");
            b = folderChild.children("a");
            m = b.children("img");
            m.each(function () {
                if ($(this).attr("path") != "undefined" && $(this).attr("path") != "" && $(this).attr("path") != null) {
                    arrayImgList.push($(this).attr("path"));
                }
            });
            src = $(this).attr("path");
            Cddd.viewImage(src);
        }
    });
    //上一页
    $(".previous").off("click").on("click", function () {
        $("#zoom>.content").html("");
        index = arrayImgList.indexOf(src);

        if (index <= 0) {
            src = arrayImgList[arrayImgList.length - 1];
        } else {
            index = index - 1;
            src = arrayImgList[index];
        }
        Cddd.viewImage(src);
    });
    //下一页
    $("#zoom a.next").off("click").on("click", function () {
        $("#zoom>.content").html("");
        index = arrayImgList.indexOf(src);
        if (index >= arrayImgList.length - 1) {
            src = arrayImgList[0];
        } else {
            index = index + 1;
            src = arrayImgList[index];
        }
        Cddd.viewImage(src);
    });
    $("#zoom .close").click(function () {
        $("#zoom .content img").remove();
        $("#zoom").removeClass("folderImg");
        $("#zoom").css("display", "none");
    });
}

function selectProvince(provinceStr) {
    if (provinceStr != null && provinceStr != "" && provinceStr != "null") {
        var province = document.getElementById("province");
        for (var i = 0; i < province.options.length; i++) {
            if (province.options[i].value == provinceStr) {
                province.options[i].selected = true;
                break;
            }
        }
    }
}
function selectCity(cityStr) {
    if (cityStr != null && cityStr != "" && cityStr != "null") {
        var city = document.getElementById("city");
        for (var i = 0; i < city.options.length; i++) {
            if (city.options[i].value == cityStr) {
                city.options[i].selected = true;
                break;


            }
        }
    }
}
/*--限制textare输入框的字数为200字--*/
function areaLimit() {
    var areaText;
    $("textarea").attr("placeholder", "输入内容不能超过200字…")
    $(".textArea").die().live('keyup', function () {
        areaText = $(this).val().length;
        if (areaText > 200) {
            var subtxt = $(this).val().substring(0, 200);
            $(this).val(subtxt);
        }
    });
}
//文件夹排序生成
function creatFile(){
	var tupian='<li class="col-lg-3 col-xs-12"><img src="resources/images/folder_img.png" />';
	var divstart='<ul class="imgshow-List file_style pl0 mb15 clearfix" >';
	var divend='</ul>';
	var forder;
	var htmlTempl="";
	htmlTempl=htmlTempl+divstart;
	var forderFileName=['车辆照片','车辆资料和身份证','验车单','抵押登记','查档照片','银行卡','银行回单','合同','客户申请表','其它'];
	if(forderFileName.length>1){
		for (var i in forderFileName) {
			forder = forderFileName[i];
			htmlTempl=htmlTempl+tupian+'<span>'+forder+'</span></li>';
		}
	}
	htmlTempl=htmlTempl+divend;
	$("#jcmzq").html(htmlTempl);
}
Cddd.getCusttype = {
    '0': '销售',
    '1': '渠道',
    '2': '经纪人',
    '3': '个人',
    '4': '其它'
}
Cddd.prouType = {
    '0': '抵押',
    '1': '质押',
    '2': '双押'
}
Cddd.jkType = {
    '0': '先息后本',
    '1': '等额本息'
}
Cddd.acc = {
    '0': '违章',
    '1': '商业险',
    '2': '交强险',
    '3': '年检押金',
    '4': '保证金',
    '5': '身份证押金',
    '6': '户口本押金',
    '7': '驾驶证押金',
    '8': 'GPS到期返',
    '9': '特批押金'
}
Cddd.overdueStatus = {
    '0': '未还',
    '1': '已还',
    '2': '逾期',
    '3': '逾期已还',
    '4': '提前还款'
}
Cddd.depositSatate = {
    '1': '可退',
    '2': '不可退'
}
Cddd.feeType = {
    '1': '一次返',
    '0': '月月返'
}
Cddd.debtTmpl = ["聚财猫直投", "聚财猫先息后本", "聚财猫质押", "聚财猫续贷", "聚财猫结清再贷 ", "满兜", "满兜续贷", "麦子", "小赢"];