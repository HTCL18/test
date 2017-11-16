(function($) {
    //2010-11-26
    $.fn.extend({
        //Tab插件名称
        XQHTab: function(options) {
            //默认值
            var defaults = {
                tabSelected: "tab_selected",
                tabWidth: "100%",
                autoHeight: "true"
            };

            var options = $.extend(defaults, options);

            $(this).css("width", options.tabWidth);

            //选项卡 this指通过当前选择器获取的JQuery对象
            var tab = $(".tab_menu ul li", this);
            //选项内容
            var tabContent = $(".tab_box > div", this);

            if (options.autoHeight != "true") {
                tabContent.css("height", options.autoHeight);
            }

            //单击选项卡
            tab.click(function() {
                $(this).addClass(options.tabSelected).siblings().removeClass(options.tabSelected);
                var curIndex = tab.index(this);
                tabContent.eq(curIndex).show().siblings().hide();
            });

            //return this使JQuery方法可链
            return this;
        }
    });
})(jQuery);