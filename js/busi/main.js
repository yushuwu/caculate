/*
 *页面缓存 
 * ztKey:返回状态 0保存缓存 1清空缓存
 * ztjaxDataParam :存储缓存变量 例：ztjaxDataParam['page']
 * tabKeyValue : tab标签value
 */
var ztKey=1;
var ztajaxDataParam={};
var tabKeyValue=0;

window.onload=function(){
	$("#index-fs").show();
	$("#panel").load("business/main.html");
};
/*
 *密码修改确认
 */
function passwordConfirm(){
	var oldpassword=$("#oldpassword").val();
	if(oldpassword==null || oldpassword==''){
		$("#load_info_msg").html('<font color=\'red\'>请输入旧密码！</font>');
		$("#oldpassword").val('');
		return false;
	}
	Cddd.getAjaxWithAsync("sysoperator/judgePassword.cddd?password="+hex_md5(oldpassword)+ "&ran="+ new Date().getTime(),function(dt){
		if(dt.flag=='0'){
			$("#load_info_msg").html('<font color=\'red\'>旧密码输入错误！</font>');
			$("#oldpassword").val('');
			return false;
		}else{
			var newpassword=$("#newpassword").val();
			if(newpassword==null || newpassword==''){
				$("#load_info_msg").html('<font color=\'red\'>请输入新密码！</font>');
				return false;
			}
			var newpasswordCon=$("#newpasswordCon").val();
			if(newpasswordCon==null || newpasswordCon==''){
				$("#load_info_msg").html('<font color=\'red\'>请输入新密码确认！</font>');
				return false;
			}
			if(newpasswordCon!=newpassword){
				$("#load_info_msg").html('<font color=\'red\'>输入新密码确认和新密码不一致！</font>');
				return false;
			}
			 Cddd.getAjaxWithAsync("sysoperator/updatePassword.cddd",function(dt){
				 $("#load_info_msg").html('<font color=\'red\'>'+dt.returnMsg+'</font>');
				 if(dt.returnCode=='000000'){
					 setTimeout("Cddd.topOrderClose()",2000);//2000为2秒钟
				 }
			 },Cddd.encode({passWord:hex_md5($("#newpassword").val())}),function(dt){},'json','POST');
		}
	},null,function(dt){},'json','GET');
	
};
/*
*密码弹出窗口
*/
function passwordMsg (){
	 var adjustDiv = "<div class='pop-bg' id='orderPop'>                                                                        "+
	 "  <div class='pop-main col-sm-3 pop-padding'>   " +
	 "    <div class='clearfix'>                                                                             "+
	 "		<div class='col-lg-11'>                                                                                     "+
	 "			<div class='input-group'>                                                                                       "+
	 "				<label class='input-group-addon'>旧密码</label><input type='password' class='form-control' id='oldpassword' />    "+
	 "			</div>                                                                                                          "+
	 "		</div>                                                                                                              "+
	 "		<div class='col-lg-11'>                                                                                     "+
	 "			<div class='input-group'>                                                                                       "+
	 "				<label class='input-group-addon'>新密码</label><input type='password' class='form-control' id='newpassword'/>     "+
	 "			</div>                                                                                                          "+
	 "		</div>                                                                                                              "+
	 "		<div class='col-lg-11'>                                                                                     "+
	 "			<div class='input-group'>                                                                                       "+
	 "				<label class='input-group-addon'>新密码确认</label><input type='password' class='form-control' id='newpasswordCon'/>"+
	 "			</div>                                                                                                          "+
	 "		</div></div>                                                                                                              "+
	 "		<div class='btn-ul tc clearfix'>                                                                                    "+
	 "		  <button type='button' class='btn btn-red mr40' onclick='passwordConfirm()'>确定</button>"+
	 "		  <button type='reset' class='btn btn-gray' onclick='Cddd.topOrderClose()'>取消</button>                    "+
	 "		</div>"+
	 "      <span id='load_info_msg'></span>                                              "+
	 "  </div>"+
	 "</div>";
	
	 $("body").append(adjustDiv);
	// Cddd.topShow(2);
};
$(function(){
	$("#oldpassword").live("blur",function(){
		$("#load_info_msg").html('');
		var oldpassword=$("#oldpassword").val();
		if(oldpassword==null || oldpassword==''){
			$("#load_info_msg").html('<font color=\'red\'>请输入旧密码！</font>');
			$("#oldpassword").val('');
		}else{
			Cddd.getAjaxWithAsync("sysoperator/judgePassword.cddd?password="+hex_md5(oldpassword)+ "&ran="+ new Date().getTime(),function(dt){
				if(dt.flag=='0'){
					$("#load_info_msg").html('<font color=\'red\'>旧密码输入错误！</font>');
				}
			},null,function(dt){},'json','GET');
		}		
	});
	$("#newpassword").live("blur",function(){
		$("#load_info_msg").html('');
		var newpassword=$("#newpassword").val();
		if(newpassword==null || newpassword==''){
			$("#load_info_msg").html('<font color=\'red\'>请输入新密码！</font>');
		}
	});
	$("#newpasswordCon").live("blur",function(){
		$("#load_info_msg").html('');
		var newpasswordCon=$("#newpasswordCon").val();
		var newpassword=$("#newpassword").val();
		if(newpasswordCon==null || newpasswordCon==''){
			$("#load_info_msg").html('<font color=\'red\'>请输入新密码确认！</font>');
		}else if(newpasswordCon!=newpassword){
			$("#load_info_msg").html('<font color=\'red\'>二次新密码输入不正确！</font>');
			$("#newpassword,#newpasswordCon").val('');
		}
	});
	Cddd.getAjaxWithAsync("sysmenu/findTreedataMy.cddd",function(dt){
		var menuHtml='';
		$.each(dt, function(index, ob ) {
			menuHtml=menuHtml+'<li><a href="javascript:;"><i class="glyphicon '+ROLE_MENU[ob.id]+'"></i><span>'+ob.name+'</span><em class="fa arrow"></em></a>';
		    menuHtml=menuHtml+'<ul>';
    		$.each(ob.children, function(index1, ob1 ) {
    			menuHtml=menuHtml+'<li><a href="javascript:;" name="'+ob1.murl+'"><span>'+ob1.name+'</span></a></li>';
       		});
    		menuHtml=menuHtml+'</ul>';
    		menuHtml=menuHtml+'</li>';
   		});
		$("#menuRoleId").html(menuHtml);
	},null,function(dt){},'json','GET');
	$("#updatePassword").click(function(){
		passwordMsg();
	});
	//左侧菜单栏
	var navtop = $(".link-url>li>a");
	var navul = $(".nav-tabs>li>ul>li>a");
	var menuli;
	navtop.click(function(){
		if($("body").hasClass("menu-show")){
			$("body").removeClass("menu-show");
		}else{
			//$(this).parent().addClass("showList").siblings().removeClass("showList");
			menuli = $(this).next();
			if(menuli.is(":hidden")){
				if(!menuli.is(":animated")){
					menuli.animate({height:"show"},50).end();
				}
			}else{
				if(!menuli.is(":animated")){
					menuli.animate({height:"hide"},50).end();
					$(this).parent().removeClass("showList");
				}
			}
			//$(this).parent().addClass("showList").siblings().find("ul").css("display","none");
			$(this).parent().siblings().find("ul").css("display","none");
		}
	});
	
	navul.click(function(){
		ztKey=1;
		tabKeyValue=0;
		ztajaxDataParam={};
		Cddd.loadPopShow();
		$(".nav-tabs ul li").removeClass("active");
		$(this).parent().addClass("active").siblings().removeClass("active");
		var ulnext = $(".showList").siblings().find("ul");
		ulnext.animate({height:"hide"},50).end();
		var topName;
		var arrName = new Array();
		var topNavList = $("#panel-nav li");
		var navName = $(this).html();
		var flagName = $(this).attr("name");
		var liDiv = "<li style='display:none;' name='"+flagName+"'><span>"+navName+"</span><i class='glyphicon glyphicon-remove'></i></li>";
		if(topNavList.length>0){
			for(var i=0;i<topNavList.length;i++){
				topName = topNavList.attr("name");
				arrName.push(topName);
			}
			if($.inArray(flagName,arrName)<0){
				$("#panel-nav").append(liDiv);
			}
		}else{
			$("#panel-nav").append(liDiv);
		}
		removeTab();
		//加载body内容
		var indexMain = $(this).attr("name");
		$.ajaxSetup({cache:false});
		$("#panel").load("business/"+indexMain+".html");
	});
	
	//顶部菜单栏
	var linkhtml = $(".link-url li a");
	var topName = $("#panel-nav li");
	$("#panel-nav li").click(function() {
		var topMain = $(this).attr("name");
		$.ajaxSetup({cache:false});
		$("#panel").load("business/"+topMain+".html");
	});
	//创建订单
	$(".pop-bg .pop-main .btn-reset").click(function(){
		$(".pop-bg").css("display","none");
	});
	//退出
	$("#logout").click(function() {
		$.post("sysoperator/logout",function(result,status){
			Cookie.delcookie("operName");
    		Cookie.delcookie("loginName");
    		window.location.href="login.html"; 
		});
	});
	$("#close-menu").live('click',function(){
		$("body").toggleClass("menu-show");
		$(".menu-show .showList ul").css("display","none");
		SmoothlyMenu();
		
	});
});
function SmoothlyMenu() {
    if (!$('body').hasClass('menu-show')) {
        $('.navbar').hide();
        setTimeout(
            function () {
                $('.navbar').fadeIn(100);
            }, 100);
        $("body .showList ul").css("display","block");
    }
}
/*--城市选择--*/
/*--城市选择--*/
var city = new Array();
city= 
[["北京市"],
["广州市","深圳市", "珠海市","汕头市","韶关市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市",
"东莞市","中山市","潮州市","揭阳市","云浮市","其他"],
["上海市"],
["天津市"],
["重庆市"],
["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市","其他"],
["南京市","苏州市","无锡市","常州市","镇江市","南通市","泰州市","扬州市","盐城市","连云港市","徐州市","淮安市","宿迁市","其他"],
["武汉市","黄石市","十堰市","荆州市","宜昌市","襄樊市","鄂州市","荆门市","孝感市","黄冈市","咸宁市","随州市","省直管县级行政区","恩施土家族苗族自治州","其他"],
["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州","其他"],
["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","其他"],
["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市","其他"],
["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市","其他"],
["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","焦作市","其他"],
["吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜自治州","其他"],
["哈尔滨市","齐齐哈尔市","鹤岗市","双鸭山市","鸡西市","大庆市","伊春市","牡丹江市","佳木斯市","七台河市","黑河市","绥远市","大兴安岭地区","其他"],
["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","锡林郭勒盟","兴安盟","阿拉善盟"],
["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市","其他"],
["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","巢湖市","六安市","亳州市","池州市","宣城市"],
["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市","其他"],
["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市","其他"],
["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","滨州市","永州市","怀化市","娄底市","湘西土家族苗族自治州","其他"],
["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市","其他"],
["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市","其他"],
["贵阳市","六盘水市","遵义市","安顺市","铜仁地区","毕节地区","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州","其他"],
["昆明市","曲靖市","玉溪市","保山市","邵通市","丽江市","思茅市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州","其他"],
["拉萨市","昌都地区","山南地区","日喀则地区","那曲地区","阿里地区","林芝地区"],
["海口市","三亚市","省直辖县级行政单位","其他"],
["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","酒泉市","张掖市","庆阳市","平凉市","定西市","陇南市","临夏回族自治州","甘南藏族自治州","其他"],
["银川市","石嘴山市","吴忠市","固原市","中卫市","其他"],
["西宁市","海东地区","海北藏族自治州","海南藏族自治州","黄南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州","其他"],
["乌鲁木齐市","克拉玛依市","吐鲁番地区","哈密地区","和田地区","阿克苏地区","喀什地区","克孜勒苏柯尔克孜自治州","巴音郭楞蒙古自治州",
"昌吉回族自治州","博尔塔拉蒙古自治州","塔城地区","阿勒泰地区","省直辖行政单位","伊犁哈萨克自治州","其他"],
["香港","其他"],
["澳门","其他"],
["台湾省","其他"],
["海外","其他"],
["其他"]];
function getcity(){
	 //获得省份下拉框的对象    
	var provinceCity;
	 var sltProvince = document.msform.province;
//获得城市下拉框的对象    
var sltCity=document.msform.city;    
//得到对应省份的城市数组    
if(sltProvince.selectedIndex>0){
	provinceCity=city[sltProvince.selectedIndex-1]; 
}else{
	provinceCity = city[0];
}

//清空城市下拉框，仅留提示选项    
sltCity.length=1;    
//将城市数组中的值填充到城市下拉框中    
for(var i=0;i<provinceCity.length;i++){    
    sltCity[i+1]=new Option(provinceCity[i],provinceCity[i]);    
    }    
}