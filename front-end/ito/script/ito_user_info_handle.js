/// <reference path="ito_variable.js" />
/// <reference path="ito_core.js" />



function fnInitailize(respond_data) {
    var userInfo = jqueryXml.Find("userInfo", respond_data);
    //UserDeRoles = readFiles.Xml("Function_DE", dataRole).split(',').filter(i => i);
    userModule = readFiles.Xml("module", userInfo).split(",").filter(i => i);
    userSubModules = readFiles.Xml("submodule", userInfo).split(",").filter(i => i);
    userTabs = readFiles.Xml("tabs", userInfo).split(",").filter(i => i);
    v_fcub_upload_user = readFiles.Xml("fcub_upload_user", userInfo);
    v_fcub_authorize_user = readFiles.Xml("fcub_authorize_user", userInfo);
    v_khr_standard_exch_rate = readFiles.Xml("khr_exch_rate", userInfo);
    v_thb_standard_exch_rate = readFiles.Xml("thb_exch_rate", userInfo);
    var new_update_stat = readFiles.Xml("new_update_accepted", userInfo);
    element.inputValue("fcub_standard_exch_rate_KHR", v_khr_standard_exch_rate);
    element.inputValue("fcub_standard_exch_rate_THB", v_thb_standard_exch_rate);
    // Display modules
    goShowHide.showOnDivAsBlock(userModule);
    goShowHide.showOnDivAsBlock(userSubModules);
    // End Display modules
    var currentUrl = window.location.href;
    var aclReview = url.Parameter("acl_review", currentUrl);
    if (aclReview == "1") {

        fn_fetch_layout('User access management', 'Review request', 'ACL_REQUEST_REVIEW');

    };
    var aclApprove = url.Parameter("acl_approve", currentUrl);
    if (aclApprove == "1") {

        fn_fetch_layout('User access management', 'Approve request', 'ACL_REQUEST_APPROVE');
    };

    if (new_update_stat == "N") {
        modals.OpenStatic("modalMessage");
        myRequest.Execute(v_getMessageUserWs, undefined, fnPopupSMS);
    }
};
function fnPopupSMS(xml) {
    var htmlCode = jqueryXml.Find("message", xml);
    element.inputValue("sms_information", htmlCode);
}
