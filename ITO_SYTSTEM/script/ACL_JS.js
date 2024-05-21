
/// <reference path="ito_variable.js" />
/// <reference path="ito_core.js" />
/// <reference path="acl_handle.js" />
var findObject = ["htmlData"];

function FN_REFRESH_ACL_REQUEST() {

    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REQ_ACCESS|" + STAFF_ID, table_id:"DIV_TBL_ACL_REQ_CONTROL" }, aclFnReqConUserReq,"Loading...");
}
function FN_ACL_REQ_CONTROL_NEW() {
    formReset.ToDefaultValue("ACL_REQ_CON_APP", "NULL");
    formReset.ToDefaultValue("ACL_REQ_HOSTSIDE", "NULL");
    formReset.ToEmpty("ACL_REQ_CON_HOSTNAME");
    formReset.ToEmpty("ACL_REQ_CON_INSTANCE_NAME");
    formReset.ToEmpty("ACL_REQ_CON_USER");
    formReset.ToDefaultValue("ACL_REQ_TYPE", "NULL");
    formReset.ToDefaultValue("ACL_REQ_TICKET_NO", "NULL");
    formReset.ToEmpty("ACL_REQ_PATCH_NO");
    formReset.ToEmpty("ACL_REQ_WKS_FROM_DATETIME");
    formReset.ToEmpty("ACL_REQ_WKS_TO_DATETIME");
    formReset.ToEmpty("ACL_REQ_SUMMARY");
    formReset.ToEmpty("ACL_REQ_DETAIL");
    formReset.ToDefaultValue("ACL_REQ_REV1", "NULL");
    formReset.ToDefaultValue("ACL_REQ_REV2", "NULL");
    formReset.ToDefaultValue("ACL_REQ_REV3", "NULL");
    formReset.ToDefaultValue("ACL_REQ_APP", "NULL");
}
function FN_ACL_REQ_HOSTNAME() {
    var P_DATA = "";
    var ACL_REQ_APP = $("#ACL_REQ_CON_APP").val();
    var ACL_APP_SIDE = $("#ACL_REQ_HOSTSIDE").val();
    if (ACL_APP_SIDE !== "NULL" && ACL_REQ_APP !== "NULL") {
        $("#ACL_REQ_CON_INSTANCE_NAME").html("");
        $("#ACL_REQ_CON_USER").html("");
        P_DATA = "ACL_REQUEST_CONTROL|" + ACL_REQ_APP + "|" + ACL_APP_SIDE + "|" + STAFF_ID;
        myRequest.Execute(aclHostSelect, { DATA: P_DATA }, aclFnConReqHostSl);
    }
}
function FN_ACL_REQ_INSTANCE_NAME() {
    var APP = $("#ACL_REQ_CON_APP").val();
    var HOST_ID = $("#ACL_REQ_CON_HOSTNAME").val();
    if (APP !== "NULL" && HOST_ID !== "NULL") {
        var P_DATA = APP + "|" + HOST_ID;
        myRequest.Execute(aclInstanceSelect, { DATA: P_DATA }, aclFnConReqInstanceSl);
    }
}
function FN_GET_TICKET_JUSTIFICATION(TICKET_NO) {
    if (TICKET_NO !== "NULL" && TICKET_NO !== "-") {

        myRequest.Execute(aclTicketDescSelect, { DATA: TICKET_NO }, aclFnConReqTicketJustSl);
    }
}
function FN_ACL_REQ_USERID() {
    var P_DATA = "";
    var ACL_REQ_APP = $("#ACL_REQ_CON_APP").val();
    var ACL_HOSTNAME = $("#ACL_REQ_CON_HOSTNAME").val();
    var ACL_INSTANCE_NAME = $("#ACL_REQ_CON_INSTANCE_NAME").val();
    if (ACL_HOSTNAME !== "NULL" && ACL_REQ_APP !== "NULL" && ACL_INSTANCE_NAME !== "NULL") {
        P_DATA = "ACL_REQUEST_CONTROL|" + ACL_REQ_APP + "|" + ACL_HOSTNAME + "|" + ACL_INSTANCE_NAME + "|" + STAFF_ID;
        myRequest.Execute(aclReqUserSelect, { DATA: P_DATA }, aclFnConReqRequestUserSl);
    }
}
function FN_DELECT_ACL_USER_LOG() {
    var LogObject = [];
    LogObject = table.GetValueSelected("TBL_ACL_USER_LOG");
    var strLogID = stringCreate.FromObject(LogObject);
    if (strLogID === undefined || strLogID == "") {
        goAlert.alertError("Error", "No log selected");
        return false;
    };
    
    $("#MODAL_CONFIRM").modal("show");
    $("#SP_RESPOND_UPDATE").html("");
    $("#SP_CONFIRM_TITLE").html("Delete Log");
    $("#SP_CONFIRM_QUES").html("Do you want to delete log selected?");
    $("#BTN_CONFIRM_YES").html("Yes");
    $("#BTN_CONFIRM_YES").val("ACL_REQ_LOG|" + strLogID + "|" + STAFF_ID);
    $("#BTN_CONFIRM_YES").attr("onclick", "FN_ACL_DELETE_LOG(this.value)");
    $("#SP_RESPOND_UPDATE").css({ "color": "red" })
}
function FN_ACL_DELETE_LOG(P_DATA) {
    $("#MODAL_CONFIRM").modal("hide");
    myRequest.Execute(aclDeleteReqLog, { DATA: P_DATA }, aclFnConReqDeleteLogs,"Deleting...");
}
function FN_REFRESH_USER_LOG() {
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_USER_LOG|" + STAFF_ID, table_id:"TBL_ACL_USER_LOG" }, aclFnReqConUserLogs,"Loading...");
}
function FN_REFRESH_ACL_REQ() {
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REQ_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_REQ_CONTROL" }, aclFnReqConUserReq,"Loading...");
}
function FN_ACL_REQ_CONTROL_INSERT_LOG() {
    var P_DATA = "";
    var ACL_REQ_APP = $("#ACL_REQ_CON_APP").val();
    var ACL_APP_SIDE = $("#ACL_REQ_HOSTSIDE").val();
    var ACL_HOSTNAME = $("#ACL_REQ_CON_HOSTNAME").val();
    var ACL_INSTANCE_NAME = $("#ACL_REQ_CON_INSTANCE_NAME").val();
    var ACL_USER = $("#ACL_REQ_CON_USER").val();
    var ACL_REQ_TYPE = $("#ACL_REQ_TYPE").val();
    var ACL_TICKET_NO = $("#ACL_REQ_TICKET_NO").val();
    var ACL_PATCH_NO = $("#ACL_REQ_PATCH_NO").val();
    var ACL_REQ_SUMMARY = $("#ACL_REQ_SUMMARY").val();
    var ACL_REQ_DETAIL = $("#ACL_REQ_DETAIL").val();
    var ACL_WKS_FROM_DATETIME = $("#ACL_REQ_WKS_FROM_DATETIME").val();
    var ACL_WKS_TO_DATETIME = $("#ACL_REQ_WKS_TO_DATETIME").val();
    var ACL_REV1 = $("#ACL_REQ_REV1").val();
    var ACL_REV2 = $("#ACL_REQ_REV2").val();
    var ACL_REV3 = $("#ACL_REQ_REV3").val();
    var ACL_APP = $("#ACL_REQ_APP").val();
    if (ACL_REQ_APP == "NULL") {
        //fn_toats_alert("Error", "Please choose appliaction");
        goAlert.alertErroTo("ACL_REQ_CON_APP", "Erro", "Please choose appliaction","change");
        return false;
    }
    if (ACL_APP_SIDE == "NULL") {
      
        goAlert.alertErroTo("ACL_REQ_HOSTSIDE", "Erro", "Please choose appliaction site", "change");
        return false;
    }
    if (ACL_HOSTNAME == "NULL") {
        goAlert.alertErroTo("ACL_REQ_CON_HOSTNAME", "Erro", "Please choose hostname", "change");
        return false;
    }
    if (ACL_INSTANCE_NAME == "NULL") {
      
        goAlert.alertErroTo("ACL_REQ_CON_INSTANCE_NAME", "Erro", "Please choose instance name", "change");
        return false;
    }
    if (ACL_USER == "NULL") {

        goAlert.alertErroTo("ACL_REQ_CON_USER", "Erro", "Please choose request user", "change");
        return false;
    }
    if (ACL_REQ_TYPE == "NULL") {
        
        goAlert.alertErroTo("ACL_REQ_TYPE", "Erro", "Please choose request type", "change");
        return false;
    }
    if (ACL_TICKET_NO == "NULL") {

        goAlert.alertErroTo("ACL_REQ_TICKET_NO", "Erro", "Please choose ticket number or no ticket", "change");
        return false;
    }
    if (ACL_WKS_FROM_DATETIME == "") {
        //fn_toats_alert("Error", "Please choose working schedule from date and time");
        goAlert.alertErroTo("ACL_REQ_WKS_FROM_DATETIME", "Erro", "Please choose working schedule from date and time");
        return false;
    }
    if (ACL_WKS_TO_DATETIME == "") {
        
        goAlert.alertErroTo("ACL_REQ_WKS_TO_DATETIME", "Erro", "Please choose working schedule to date and time");
        return false;
    }
    if (ACL_REV2 != "NULL" && ACL_REV1 == "NULL") {
        goAlert.alertErroTo("ACL_REQ_REV1", "Erro", "You cannot skip selecting reviewer 1","change");
        return false;
    };
    if (ACL_REV3 != "NULL" && ACL_REV2 == "NULL") {
        goAlert.alertErroTo("ACL_REQ_REV2", "Erro", "You cannot skip selecting reviewer 2","change");
        return false;
    };
    if (ACL_REV3 != "NULL" && ACL_REV2 != "NULL" && ACL_REV1=="NULL") {
        goAlert.alertErroTo("ACL_REQ_REV1", "Erro", "You cannot skip selecting reviewer 1", "change");
        return false;
    };
    if (ACL_APP == "NULL") {
        goAlert.alertErroTo("ACL_REQ_APP", "Erro", "Please choose approver","change");
        return false;
    };
    if (ACL_REQ_SUMMARY == "") {
        
        goAlert.alertErroTo("ACL_REQ_SUMMARY", "Erro", "Please provide request summary");
        return false;
    }
    if (ACL_TICKET_NO == "") {
        ACL_TICKET_NO = "-";
    }
    if (ACL_PATCH_NO == "") {
        ACL_PATCH_NO = "-";
    }
    if (ACL_REQ_DETAIL == "") {
        ACL_REQ_DETAIL = "-";
    }
    if (ACL_REV1 == "NULL") {
        ACL_REV1 = "-";
    }
    if (ACL_REV2 == "NULL") {
        ACL_REV2 = "-";
    }
    if (ACL_REV3 == "NULL") {
        ACL_REV3 = "-";
    }
    P_DATA = STAFF_ID + "|";
    P_DATA = P_DATA + ACL_REQ_APP + "|";
    P_DATA = P_DATA + ACL_APP_SIDE + "|";
    P_DATA = P_DATA + ACL_HOSTNAME + "|";
    P_DATA = P_DATA + ACL_INSTANCE_NAME + "|";
    P_DATA = P_DATA + ACL_USER + "|";
    P_DATA = P_DATA + ACL_REQ_TYPE + "|";
    P_DATA = P_DATA + ACL_TICKET_NO + "|";
    P_DATA = P_DATA + ACL_PATCH_NO + "|";
    P_DATA = P_DATA + ACL_REQ_SUMMARY + "|";
    P_DATA = P_DATA + ACL_REQ_DETAIL + "|";
    P_DATA = P_DATA + ACL_WKS_FROM_DATETIME + "|";
    P_DATA = P_DATA + ACL_WKS_TO_DATETIME + "|";
    P_DATA = P_DATA + ACL_REV1 + "|";
    P_DATA = P_DATA + ACL_REV2 + "|";
    P_DATA = P_DATA + ACL_REV3 + "|";
    P_DATA = P_DATA + ACL_APP;
   
    myRequest.Execute(aclInsertReqLog, { DATA: P_DATA }, aclFnConReqSaveLogs, "Saving...");

}
function FN_REQUEST_ACCESS() {
    myRequest.Execute(aclRequestAccess, { STAFF_ID: STAFF_ID }, aclFnConReqSend, "Sending...");
}
function FN_POP_CANCEL_REQ() {
    var objectRequest = [];
    objectRequest = table.GetValueSelected("TBL_GET_DATA_ACL_REQ_CONTROL");
    var strRequestRef = stringCreate.FromObject(objectRequest);
    if (strRequestRef === undefined || strRequestRef == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    
    $("#MODAL_CONFIRM").modal("show");
    $("#SP_RESPOND_UPDATE").html("");
    $("#SP_CONFIRM_TITLE").html("Cancel Access Request");
    $("#SP_CONFIRM_QUES").html("Do you want to cancel access reference selected?");
    $("#BTN_CONFIRM_YES").html("Yes");
    $("#BTN_CONFIRM_YES").val(strRequestRef + "|" + STAFF_ID);
    $("#BTN_CONFIRM_YES").attr("onclick", "FN_CANCEL_REQUEST(this.value)");
    $("#SP_RESPOND_UPDATE").css({ "color": "red" });
}
function FN_CANCEL_REQUEST(P_DATA) {
    $("#MODAL_CONFIRM").modal("hide");
    myRequest.Execute(aclCancelRequest, { DATA: P_DATA }, aclFnConReqCancel, "Cancelling...");
}
function FN_POP_CHECK_IN() {
    var objectRef = [];
    objectRef = table.GetValueSelected("TBL_GET_DATA_ACL_REQ_CONTROL");
    if (objectRef.length > 1) {
        goAlert.alertError("Error", "You cannot do multiple check in");
        return false;
    };
    var ACL_REF = stringCreate.FromObject(objectRef);
    if (ACL_REF === undefined || ACL_REF == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    $("#MODAL_ACL_CHECKIN_OUT").modal("show");
    $("#SP_ACL_CHECKINOUT_RESPOND").html("");
    $("#SP_ACL_CHECKINOUT_TITLE").html("Check In Access Request [" + ACL_REF + "]");
    $("#BTN_ACL_CHECKINOUT").html("Check In");
    $("#BTN_ACL_CHECKINOUT").val("CHECKIN" + "|" + ACL_REF + "|" + STAFF_ID);
    $("#BTN_ACL_CHECKINOUT").attr("onclick", "FN_CHECKIN_CHECKOUT('Check In', this.value)");
    $("#SP_ACL_CHECKINOUT_RESPOND").css({ "color": "green" });
    datePicker.Refresh("ACL_TXT_CHECK_DATETIME");
    datePicker.DateTime("ACL_TXT_CHECK_DATETIME");
}
function FN_POP_CHECK_OUT() {
    var objectRef = [];
    objectRef = table.GetValueSelected("TBL_GET_DATA_ACL_REQ_CONTROL");
    if (objectRef.length > 1) {
        goAlert.alertError("Error", "You cannot do multiple check Out");
        return false;
    };
    var ACL_REF = stringCreate.FromObject(objectRef);
    if (ACL_REF === undefined || ACL_REF == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    $("#MODAL_ACL_CHECKIN_OUT").modal("show");
    $("#SP_ACL_CHECKINOUT_RESPOND").html("");
    $("#SP_ACL_CHECKINOUT_TITLE").html("Check Out Access Request [" + ACL_REF + "]");
    $("#BTN_ACL_CHECKINOUT").html("Check Out");
    $("#BTN_ACL_CHECKINOUT").val("CHECKOUT" + "|" + ACL_REF + "|" + STAFF_ID);
    $("#BTN_ACL_CHECKINOUT").attr("onclick", "FN_CHECKIN_CHECKOUT('Check Out', this.value)");
    $("#SP_ACL_CHECKINOUT_RESPOND").css({ "color": "green" });
    datePicker.Refresh("ACL_TXT_CHECK_DATETIME");
    datePicker.DateTime("ACL_TXT_CHECK_DATETIME");
}
function FN_CHECKIN_CHECKOUT(EVENT_NAME, VALUE) {
   // $("#ACL_TXT_CHECK_DATETIME").datetimepicker("refresh");
    var C_DATETIME = $("#ACL_TXT_CHECK_DATETIME").val();
    var C_REMARK = $("#ACL_TXT_CHECKINOUT_REMARK").val();
    if (C_DATETIME == "") {
        goAlert.alertErroTo("ACL_TXT_CHECK_DATETIME", "Error", "Please select datetime");
        return false;
    }
    if (C_REMARK == "" || C_REMARK===undefined) {
        C_REMARK = "-";
    }
    $("#MODAL_ACL_CHECKIN_OUT").modal("hide");
    VALUE = VALUE + "|" + C_DATETIME + "|" + C_REMARK;
    myRequest.Execute(aclCheckInCheckOut, { DATA: VALUE }, aclFnConReqCheckInOut, "Processing...");
}
// review screen
function FN_ACL_REV_REFESH() {
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REV_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_REV_CONTROL" }, aclFnReqConUserRev,"Loading...");
};
function FN_ACL_REV_REJECT_POPUP() {
    var objectRef = [];
    objectRef = table.GetValueSelected("TBL_GET_DATA_ACL_REV_CONTROL");
    var strRef = stringCreate.FromObject(objectRef);
    if (strRef === undefined || strRef == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    $("#MODAL_ACL_REV_REJECT").modal("show");
    $("#btn_acl_rev_reject").val(strRef + "|" + STAFF_ID);

};
function FN_ACL_REV_REJECT(VALUE) {
    $("#MODAL_ACL_REV_REJECT").modal("hide");
    var comments = $("#ACL_REV_REJECT_COMMENT").val();
    if (comments == "" || comments===undefined) {
        comments = "-";
    }
    VALUE = VALUE + "|" + comments;
    myRequest.Execute(aclRejectReqInapp, { DATA: VALUE }, aclFnConReqRejByRev, "Rejecting...");
    
}
function FN_POP_REV_REQ(){
    var objectRef = [];
    objectRef = table.GetValueSelected("TBL_GET_DATA_ACL_REV_CONTROL");
    var ACL_REF = stringCreate.FromObject(objectRef);
    if (ACL_REF === undefined || ACL_REF == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    $("#MODAL_ACL_REVIEW").modal("show");
    $("#BTN_ACL_REVIEW_CONFIRM_YES").val(ACL_REF + "|" + STAFF_ID);
}
function FN_REVIEW_REQ(VALUE) {
    $("#MODAL_ACL_REVIEW").modal("hide");
    var comments = $("#ACL_REVIEW_COMMENT").val();
    if (comments == "") {
        comments = "-";
    }
    VALUE = VALUE + "|" + comments;
    myRequest.Execute(aclReviewReqInapp, { DATA: VALUE }, aclFnConReqRevReq, "Reviewing...");

};
// approver screen
function FN_ACL_APP_REJECT_POPUP() {
    var objectRef = [];
    objectRef = table.GetValueSelected("TBL_GET_DATA_ACL_APP_CONTROL");
    var strRef = stringCreate.FromObject(objectRef);
    if (strRef === undefined || strRef == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    $("#MODAL_ACL_APP_REJECT").modal("show");
    $("#btn_acl_app_reject").val(strRef + "|" + STAFF_ID);
};
function FN_ACL_APP_REJECT(value) {
    $("#MODAL_ACL_APP_REJECT").modal("hide");
    var comment = $("#ACL_APP_REJECT_COMMENT").val();
    if (comment == "" || comment===undefined) {
        comment = "-";
    }
    value = value + "|" + comment;
    myRequest.Execute(aclRejectReqInapp, { DATA: value }, aclFnConReqRejByApp, "Rejecting...");
};
function FN_ACL_APP_APPROVE_POPUP() {
    var objectRef = [];
    objectRef = table.GetValueSelected("TBL_GET_DATA_ACL_APP_CONTROL");
    var strRef = stringCreate.FromObject(objectRef);
    if (strRef === undefined || strRef == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    $("#MODAL_ACL_APPROVE").modal("show");
    $("#btn_acl_app_approve").val(strRef + "|" + STAFF_ID);

}
function FN_APPROVE_REQ(VALUE) {
    $("#MODAL_ACL_APPROVE").modal("hide");
    var comments = $("#ACL_APPROVE_COMMENT").val();
    if (comments == "" || comments === undefined) {
        comments = "-";
    }
    VALUE = VALUE + "|" + comments;
    myRequest.Execute(aclApproveReqInapp, { DATA: VALUE }, aclFnConReqAppReq, "Approving...");
}
function FN_ACL_APP_REFRESH()
{
	myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_APP_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_APP_CONTROL" }, aclFnReqConUserApp,"Loading...");
};
// end scope Create request
function FN_ACL_FETCH_DATA_ADJUST() {
var objectRef = [];
    objectRef = table.GetValueSelected("TBL_GET_DATA_ACL_REQ_CONTROL");
    if (objectRef.length > 1) {
        goAlert.alertError("Error", "You cannot do multiple adjustment");
        return false;
    };
    var strRef = stringCreate.FromObject(objectRef);
    if (strRef === undefined || strRef == "") {
        goAlert.alertError("Error", "No request selected");
        return false;
    };
    $("#btn_acl_req_adj").val(strRef);
    element.inputValue("ACL_REQ_ADJ_REF", " [" + strRef + "]");
    myRequest.Execute(aclSlAdjust, { acl_ref: strRef }, aclFnConReqSlAdj, "Fetching...");
};
function FN_ACL_ADJUST(REF)
{
    var ACL_REF = REF;
    var wksFrom = $("#ACL_REQ_ADJ_WSCHFROM").val();
    var wksTo = $("#ACL_REQ_ADJ_WSCHTO").val();
    var checkIn = $("#ACL_REQ_ADJ_CHECKIN").val();
    var checkOut = $("#ACL_REQ_ADJ_CHECKOUT").val();
    if (wksFrom == "") {
        goAlert.alertErroTo("ACL_REQ_ADJ_WSCHFROM", "Error", "Working Schedule From cannot be empty");
        return;
    };
    if (wksTo == "") {
        goAlert.alertErroTo("ACL_REQ_ADJ_WSCHTO", "Error", "Working Schedule To cannot be empty");
        return;
    };
    var objData = {
        AclRef: ACL_REF,
        WksFrom: wksFrom,
        WksTo: wksTo,
        CheckIn: checkIn,
        CheckOut: checkOut
    };
    var objString = stringCreate.toXML("AclAdjust", objData).End();
    modals.Close("MODAL_ACL_ADJUST");
    myRequest.Execute(aclReqAdjust, { xmlData: objString }, aclFnConReqAdjust, "Processing...");
};

