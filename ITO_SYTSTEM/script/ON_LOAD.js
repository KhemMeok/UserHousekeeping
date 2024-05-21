/// <reference path="ito_variable.js" />
/// <reference path="ito_core.js" />
/// <reference path="ito_notifications_handle.js" />

$(document).ready(function () { 
    $('[data-toggle="tooltip"]').tooltip();
    userfullname = localStorage.getItem("ito_username");
    $("#lbl_user_name").html(userfullname);
    STAFF_ID = localStorage.getItem("ito_userid");
    SYSTEM_NOW = localStorage.getItem("ito_currenct_system");
    document.title = SYSTEM_NOW;
    // Change style menu color
    $(".main-sidebar").addClass("sidebar-light-info");
    // Company name
    $("#campany_name").html("Hattha Bank Plc");
    // Tap icon
    $("link[rel='icon']").attr("href", "Images/HKL.png");
    // User profile image
    $("#imgUser1").attr("src", "users/profile/image/user_icon.png");
    //if (UrlExists("users/profile/image/" + STAFF_ID + ".jpg") == true) {
    //    $("#imgUser1").attr("src", "users/profile/image/" + STAFF_ID + ".jpg");
    //}
    //else {
    //    $("#imgUser1").attr("src", "users/profile/image/user_icon.png");
    //}
    // Logo left size
    $("#imgLogo").attr("src", "Images/HKL.png")
    // Get User Roles
    myRequest.Execute(v_userInfo, { user_id: STAFF_ID }, fnInitailize, "Initializing...");
    // Get DE Batch Types
    myRequest.Execute(v_dePostingBatchTypesUrl, { user_id: STAFF_ID }, onLoadGetBatchType, "Initializing...")
    // active sidebar
    $(".nav .nav-link").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    // Get FUCB Data Datetime
    //myRequest.Execute(v_systemdatetime, undefined, fnSystemDatetimeHandler);
    //setInterval(function () { myRequest.Execute(v_systemdatetime, undefined, fnSystemDatetimeHandler); }, 60000)
    // notification
    //myRequest.Execute(v_Notifications, { staff_id: STAFF_ID }, fnNotificationsCallBack);
    //setInterval(function () {
    //    myRequest.Execute(v_Notifications, { staff_id: STAFF_ID }, fnNotificationsCallBack);
    //}, 5000);

    
    if (localStorage.getItem("ito_token") == "") {
        $("#ito_api_server").attr("title", "API Service is no connected");
        $("#icon_api_service").css({ "color": "red" });
        
    }
    else {
        $("#ito_api_server").attr('title', "API Service is connected");
        $("#icon_api_service").css({ "color": "green" });
    }
    //console.log(localStorage.getItem("ito_token"));
});
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}
// System Datetime
function fnSystemDatetimeHandler(rd) {
    var date_time = jqueryXml.Find("datetime", rd);
    element.inputValue("ito_system_date", date_time);
};