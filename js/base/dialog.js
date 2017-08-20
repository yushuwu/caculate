!(function ($, window, document, undefined) {

  var Plugin = function (elem, options) {
  	this.$options=options;
    this.$elem = elem;
    this.$oMask = $('#mask_shadow');
    this.$close = this.$elem.find('.closeDia');
    this.$cont = this.$elem.find('.cont');
    

    this.b_stop = true; // 防止重复点击
    this.page_w = $(window).width();
    this.page_h = $(window).height();

    this.$cont.text(this.$options);
  };

  Plugin.prototype = {
    inital: function () { // 初始化
      var self = this;

      
      this.$elem.css({left: (this.page_w - this.$elem.width()) / 2});


      this.$close.on('click', function () {
        self.closePopbox();

        return false;
      });

      this.$oMask.on('click', function () {
        self.closePopbox();
      });

    },
    popShow:function() {
    	var self=this;
  		self.popbox();
        self.b_stop = false;
        return false;
    },
    popHide:function() {
    	var self=this;
    	self.closePopbox();
        return false;
    },
    popbox: function () { // 显示弹窗
      var self = this;

      this.$oMask.show().animate({opacity: 1});;
      this.$elem.show().animate({opacity: 1, top: 100}, function () {
        self.b_stop = true;
      });
    },

    closePopbox: function () { // 关闭弹窗
      var self = this;

      if (this.b_stop) {
        this.$oMask.animate({opacity: 0}, function () {
          $(this).hide();
        });;
        this.$elem.animate({opacity: 0, top: 100}, function () {
          $(this).hide();
        });
      }
    },
  };

  $.fn.popup = function (options) {
    var plugin = new Plugin(this, options);

    return plugin.inital();
  };
  $.fn.popupShow = function (options) {
    
  	var thisOptions=options
    var plugin = new Plugin(this, thisOptions);
    plugin.popShow();
  };

})(window.jQuery, window, document);

addPopuHtml = function(key){
	var diaHtml="";
	if(key==1){
		diaHtml='<div id="popup"><div class="check">'+
        '<div class="cont"></div>'+
        '<div class="">'+
            '<canvas style="width:100%;height:200px;" id="canvasEdit"></canvas>'+
        '</div>'+
        '<div class="btnBar">'+
            '<span id="sign_show" hidden="hidden"></span>'+
            '<div id="sign_clear" class="btn">重写</div>'+
            '<div id="sign_ok" class="closeDia btn btn-blue">保存</div>'+
            '<div class="closeDia btn btn-gray">取消</div>'+
        '</div>'+
      '</div></div>';
	}
	$("body").append(diaHtml);
};

popupShows = function(message,key){
	var diaHtml="";
	if(key==1){
      diaHtml='<div id="popup">'+
                '<div class="cont"></div>'+
                '<div class="">'+
                    '<canvas width="500" height="200" id="canvasEdit"></canvas>'+
                '</div>'+
                '<div class="btnBar">'+
                    '<span id="sign_show" hidden="hidden"></span>'+
                    '<div id="sign_clear" class="btn">重写</div>'+
                    '<div id="sign_ok" class="closeDia btn btn-blue">保存</div>'+
                    '<div class="closeDia btn btn-gray">取消</div>'+
                '</div>'+
              '</div>';
    }
  $("body").append(diaHtml);
  $('#popup').popup({ifDrag: true, dragLimit: true});
  $('#popup').popupShow(message);
};