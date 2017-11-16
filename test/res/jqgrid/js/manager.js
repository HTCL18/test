function MyPartialButton() {
        var JsonData = "";
        var toolbar_html = "";
        var toolbar_Children_Count = 0;
        AjaxJson("/system/admin/js/buttonData.json", {}, function (Data) {
            JsonData = Data;
            $.each(Data, function (i) {
                if (Data[i].ParentId == '0' && Data[i].Category == '1') {
                    var toolbar_Children_List = Toolbar_Children(Data[i].ButtonId, Data)
                    if (toolbar_Children_Count > 0) {
                        toolbar_html += "<a id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" class=\"tools_btn dropdown\">";
                        toolbar_html += "<div style=\"float: left;\"><div class=\"icon\"><img src=\"/res/image/gridui/" + Data[i].Icon + "\" /></div><div class=\"text\">" + Data[i].FullName + "</div></div>";
                        toolbar_html += "<div class=\"dropdown-icon\"><img src=\"/res/image/gridui/download.png\" /></div>";
                        toolbar_html += "<div class=\"dropdown-data\"><i></i><span></span>";
                        toolbar_html += "    <ul>";
                        toolbar_html += toolbar_Children_List;
                        toolbar_html += "    </ul>";
                        toolbar_html += "</div>";
                        toolbar_html += "</a>";
                    } else {
                        var title = "title=\"" + Data[i].Remark + "\"";
                        if (Data[i].Remark == "") { title = ""; }
                        toolbar_html += "<a id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" " + title + " onclick=\"" + Data[i].JsEvent + "\" class=\"tools_btn\"><span><b style=\"background: url('/res/image/gridui/" + Data[i].Icon + "') 50% 4px no-repeat;\">" + Data[i].FullName + "</b></span></a>";
                    }
                    if (Data[i].Split == '1') {
                        toolbar_html += "<div class=\"tools_separator\"></div>";
                    }
                }
            });
        });
        $('.tools_bar .PartialButton').html(toolbar_html);
        function Toolbar_Children(ButtonId, Data) {
            var _toolbar_Children = "";
            toolbar_Children_Count = 0;
            $.each(Data, function (i) {
                if (Data[i].ParentId == ButtonId) {
                    var title = "title=\"" + Data[i].Remark + "\"";
                    if (Data[i].Remark == "") { title = ""; }
                    _toolbar_Children += "<li id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" " + title + " onclick=\"" + Data[i].JsEvent + "\"><img src=\"/res/image/gridui/" + Data[i].Icon + "\" />" + Data[i].FullName + "</li>";
                    toolbar_Children_Count++;
                }
            });
            return _toolbar_Children;
        }
        $(".tools_btn").hover(function () {
            $(this).addClass("tools_btn_hover");
        }, function () {
            $(this).removeClass("tools_btn_hover");
        });
        $(".tools_bar .dropdown").hover(function () {
            var left = $(this).offset().left - ($(this).find('.dropdown-data').width() / 2) + ($(this).width() / 2 + 9);
            $(this).find('.dropdown-data').show().css('top', ($(this).offset().top + 50)).css('left', left);
            $(this).find('.dropdown-icon').addClass('dropdown-icon-hover');
            $(this).addClass('dropdown-selected');
        }, function () {
            if (!$(this).hasClass("_click")) {
                $(this).removeClass('dropdown-selected');
                $(this).find('.dropdown-data').hide();
                $(this).find('.dropdown-icon').removeClass('dropdown-icon-hover');
            }
        });
        $('.tools_bar .dropdown').toggle(function () {
            $(this).addClass('_click');
            var left = $(this).offset().left - ($(this).find('.dropdown-data').width() / 2) + ($(this).width() / 2 + 9);
            $(this).find('.dropdown-data').show().css('top', ($(this).offset().top + 50)).css('left', left);
            $(this).find('.dropdown-icon').addClass('dropdown-icon-hover');
            $(this).addClass('dropdown-selected');
        }, function () {
            $(this).removeClass('dropdown-selected');
            $(this).find('.dropdown-data').hide();
            $(this).find('.dropdown-icon').removeClass('dropdown-icon-hover');
            $('.dropdown').removeClass('_click');
        });
        $(".dropdown-data li").click(function () {
            $('.dropdown').removeClass('dropdown-selected');
            $('.dropdown').find('.dropdown-data').hide();
            $('.dropdown').find('.dropdown-icon').removeClass('dropdown-icon-hover');
            $('.dropdown').removeClass('_click');
        });
        //右击菜单
        var right_toolbar_Count = 0;
        var right_toolbar_html = "";
        right_toolbar_html += '<div class="rightMenu"><ul>';
        $.each(JsonData, function (i) {
            if (JsonData[i].ParentId == '0' && JsonData[i].Category == '2') {
                var title = "title=\"" + JsonData[i].Remark + "\"";
                if (JsonData[i].Remark == "") { title = ""; }
                var righttoolbar_Children_List = right_toolbar_Children(JsonData[i].ButtonId, JsonData)
                if (right_toolbar_Count > 0) {
                    right_toolbar_html += "<li id=\"right_" + JsonData[i].Code + "\" ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"/res/image/gridui/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + righttoolbar_Children_List + "</li>";
                } else {
                    right_toolbar_html += "<li id=\"right_" + JsonData[i].Code + "\"  ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"/res/image/gridui/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + "</li>";
                }
                if (JsonData[i].Split == '1') {
                    right_toolbar_html += "<div class=\"m-split\"></div>";
                }
            }
        });
        right_toolbar_html += '</ul></div>';
        function right_toolbar_Children(ButtonId, JsonData) {
            var _right_toolbar = "<ul>";
            right_toolbar_Count = 0;
            $.each(JsonData, function (i) {
                if (JsonData[i].ParentId == ButtonId) {
                    var title = "title=\"" + JsonData[i].Remark + "\"";
                    if (JsonData[i].Remark == "") { title = ""; }
                    _right_toolbar += "<li id=\"right_" + JsonData[i].Code + "\"  ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"/res/image/gridui/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + "</li>";
                    if (JsonData[i].Split == '1') {
                        _right_toolbar += "<div class=\"m-split\"></div>";
                    }
                    right_toolbar_Count++;
                }
            });
            return _right_toolbar + "</ul>";
        }
        $("body").append(right_toolbar_html);
        if ($('.rightMenu').find('li').length > 0) {
            LoadrightMenu("#grid_List");
        } else {
            $('.rightMenu').remove();
        }
    }