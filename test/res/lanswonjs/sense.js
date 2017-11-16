function w_GetWebControls(element) {
    var reVal = "";
    $(element).find('input,select,textarea').each(function (r) {
        var id = $(this).attr('name');
        var value = $(this).val();
        value = value.replace(/\"/g,"’");
        value = value.replace(/\'/g,"’");
        value = value.replace(/\\/g,"＼");
        value = value.replace(/\n/g," ");
        var type = $(this).attr('type');
        switch (type) {
            case "checkbox":
                if ($(this).attr("checked")) {
                    reVal += '"' + id + '"' + ':' + '"1",'
                } else {
                    reVal += '"' + id + '"' + ':' + '"0",'
                }
                break;
            case "radio":
            	
                if ($(this).prop("checked")) {
                    reVal += '"' + id + '"' + ':"' + value +'",';
                } else {
                    
                }
                break;
            default:
                if (value == "") {
                    value = "";
                }
                reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                break;
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    return jQuery.parseJSON('{' + reVal + '}');
}