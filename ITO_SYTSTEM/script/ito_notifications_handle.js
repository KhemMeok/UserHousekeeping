/// <reference path="ito_variable.js" />
/// <reference path="ito_core.js" />
var acl_total;
var de_total;
var titlNotifiTotal;
var eoc_mgt_total;
var handoff_failed;
function fnNotificationsCallBack(rd) {
    var xmlData = jqueryXml.Find("dataXml", rd);
    var acl_review = parseInt(readFiles.Xml("acl_review", xmlData));
    var acl_approve = parseInt(readFiles.Xml("acl_approve", xmlData));
    var acl_pending = parseInt(readFiles.Xml("acl_pending", xmlData));
    acl_total = acl_review + acl_approve + acl_pending;
    var de_your_req = parseInt(readFiles.Xml("de_your_req", xmlData));
    var de_req_upload = parseInt(readFiles.Xml("de_req_upload", xmlData));
    var de_req_authorize = parseInt(readFiles.Xml("de_req_authorize", xmlData));
    var de_req_delete = parseInt(readFiles.Xml("de_req_delete", xmlData));
    var de_delete_avl = parseInt(readFiles.Xml("de_delete_avl", xmlData));
    handoff_failed = parseInt(readFiles.Xml("handoff_failed", xmlData));
    de_total = de_your_req + de_req_upload + de_req_authorize + de_req_delete + de_delete_avl;
    eoc_mgt_total = handoff_failed;
    element.inputValue("sp_de_total_notifi", "");
    element.inputValue("sp_de_your_req_notifi", "");
    element.inputValue("sp_de_req_upload_notifi", "");
    element.inputValue("sp_de_req_authorize_notifi", "");
    element.inputValue("sp_de_req_delete_notifi", "");
    element.inputValue("sp_de_batch_delete_notifi", "");
    element.inputValue("sp_acl_notificatin_total", "");
    element.inputValue("sp_acl_notificatin_pending", "");
    element.inputValue("sp_acl_notificatin_review", "");
    element.inputValue("sp_acl_notificatin_approve", "");
    element.inputValue("eoc_flexcube_issue_notifi", "");
    // titl total
    titlNotifiTotal = acl_total + de_total + eoc_mgt_total;
    if (titlNotifiTotal > 0) {
        document.title = SYSTEM_NOW + " (" + titlNotifiTotal + ")";
    }
    else {
        document.title = SYSTEM_NOW;
    };
    // DE
    if (de_total > 0 && deMgtOpenStat == 0) {
        element.inputValue("sp_de_total_notifi", de_total);
    };
    if (de_your_req > 0) {
        element.inputValue("sp_de_your_req_notifi", de_your_req);
    };
    if (de_req_upload > 0) {
        element.inputValue("sp_de_req_upload_notifi", de_req_upload);
    };
    if (de_req_authorize > 0) {
        element.inputValue("sp_de_req_authorize_notifi", de_req_authorize);
    };
    if (de_req_delete > 0) {
        element.inputValue("sp_de_req_delete_notifi", de_req_delete);
    };
    if (de_delete_avl > 0) {
        element.inputValue("sp_de_batch_delete_notifi", de_delete_avl);
    };
    // End DE
    // ACL
    if (acl_total > 0 && deAclMgtOpenStat == 0) {
        element.inputValue("sp_acl_notificatin_total", acl_total);
    };
    if (acl_review > 0) {
        element.inputValue("sp_acl_notificatin_review", acl_review);
    };
    if (acl_approve > 0) {
        element.inputValue("sp_acl_notificatin_approve", acl_approve);
    };
    if (acl_pending > 0) {
        element.inputValue("sp_acl_notificatin_pending", acl_pending);
    };
    //END ACL
    //EoC MGT
    if (eoc_mgt_total > 0 && EoCMGTOpenStat == 0) {
        element.inputValue("eoc_mgt_notification_total", eoc_mgt_total);
    };
    if (handoff_failed > 0) {
        element.inputValue("eoc_flexcube_issue_notifi", handoff_failed);
    };
    //END MGT
};
var deMgtOpenStat = 0; //0 treeview clos , 1 Treeview open
var deAclMgtOpenStat = 0;
var EoCMGTOpenStat = 0;
function FnNotifiTreeOpen(Tree_ID) {
    if (Tree_ID == "DEMGT") {
        if (deMgtOpenStat == 0) {
            deMgtOpenStat = 1;
            element.inputValue("sp_de_total_notifi", "");
        } else {
            deMgtOpenStat = 0;
            if (de_total > 0) {
                element.inputValue("sp_de_total_notifi", de_total);
            };
        }
    };
    if (Tree_ID == "ACL") {
        if (deAclMgtOpenStat == 0) {
            deAclMgtOpenStat = 1;
            element.inputValue("sp_acl_notificatin_total", "");
        } else {
            deAclMgtOpenStat = 0;
            if (acl_total > 0) {
                element.inputValue("sp_acl_notificatin_total", acl_total);
            };
        }
    };
    if (Tree_ID == "EOC_MGT") {
        if (EoCMGTOpenStat == 0) {
            EoCMGTOpenStat = 1;
            element.inputValue("eoc_mgt_notification_total", "");
        } else {
            EoCMGTOpenStat = 0;
            if (eoc_mgt_total > 0) {
                element.inputValue("eoc_mgt_notification_total", eoc_mgt_total);
            };
        }
    };
};