/// <reference path="ito_system.js" />
var v_main_content = "MAIT_CONTENT_TABS";
var tmp_layout = [];
var page_title;
function fn_fetch_layout(main_ul, title, layout_name) {

    if (searchData.SearchNode(layout_name, userTabs) == "N") {
        goAlert.alertError("Error", "You have no authorization to access this module!");
        return false;
    };
    page_title = title;
    System.Event("Access Menu", title);
    $("#page_title").html(title);
    $("#page_title_right").html(main_ul);
    $("#page_title_right_active").html(title);
    var tmp_len = tmp_layout.length;
    var check = 0;
    for (I = 0; I < tmp_len; I++) {
        if (layout_name == tmp_layout[I]) {
            check = 1;
        };
    };
    if (check == 0) {
        $.ajax({
            type: "POST",
            url: "PAGES/" + layout_name + ".vbhtml",
            timeout: 3600000,
            beforeSend: function () {
                processIndicator.Start();
            },
            success: function (content) {
                $("#MAIT_CONTENT_TABS").append(content);
                tmp_layout[tmp_len + 1] = layout_name;
                //call funcation validate layout from ito_content_validate.js
                layoutValidate.Layout(layout_name);
            },
            complete: function (data) {
                processIndicator.Stop();
                fn_active_layout(layout_name)
            },
            error:function()
            {
                processIndicator.Stop();
            }
        });
    };
    if (check == 1)
    {
        fn_active_layout(layout_name);
    }
};
function fn_active_layout(layout_id) {
    for (I = 0; I < userTabs.length; I++) {
        if (layout_id == userTabs[I]) {
            $("#" + layout_id).addClass("show active");
        }
        else {
            $("#" + userTabs[I]).removeClass("show active");
        };
    };
};
