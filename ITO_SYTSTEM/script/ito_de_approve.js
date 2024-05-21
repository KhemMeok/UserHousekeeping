/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

function deAppFetchRequester(process_indecator) {
   
    if (process_indecator == "Y") {
        myRequest.Execute(v_deAppGetRequester, { user_id: STAFF_ID }, fnDeAppGetRequesterCallBack, "Processing...");
    }
    else {
        myRequest.Execute(v_deAppGetRequester, { user_id: STAFF_ID }, fnDeAppGetRequesterCallBack);
    };
};
function deAppFetchBatchNo() {
    var objRequester = [];
    objRequester = $("#deAppBatchRequester").val();
    var requester = stringCreate.FromObject(objRequester);
    var xmlData = { user_id: STAFF_ID, requester: requester };
    myRequest.Execute(v_deAppGetBatchNo, xmlData, fnDeAppGetBatchNoCallBack, "Processing...");
};
function deAppFetchRequest(process_indecator) {
    if (process_indecator == "Y") {
        myRequest.Execute(v_deAppGetRequestList, { user_id: STAFF_ID }, fnDeAppGetRequestCallBack, "Processing...");
    }
    else {
        myRequest.Execute(v_deAppGetRequestList, { user_id: STAFF_ID }, fnDeAppGetRequestCallBack);
    };
};

var de_app_type;
function deAppRequestDailog(action) {
    var question = (action == "app") ? "Are you sure to approve delete the selecte Batch No?" : "Are you sure to reject delete the selecte Batch No?";
    de_app_type = action;
    var app_action = (action == "app") ? "Approve Request" : "Reject Request";
    var objBatch = [];
    objBatch = $("#deAppBatchNo").val();
    if (objBatch.length == 0) {
        goAlert.alertErroTo("DE_BATCH_APPROVE #bootstrap-duallistbox-selected-list_", app_action, "No Batch No selected.");
        return false;
    };
    if (modals.ConfirmShowAgain("mdconfirmhandlrequest") == true) {
        modals.Confirm(app_action, question, "Y", "Yes", "onclick", "deAppRequestHandle()", "mdconfirmhandlrequest");
    }
    else {
        deAppRequestHandle();
    };
};
function deAppRequestHandle() {
    modals.CloseConfirm();
    element.setDisable(["btn_de_approve_approve", "btn_de_approve_reject"]);
    var remark = modals.getConfirmNote();
    var objBatch = [];
    objBatch = $("#deAppBatchNo").val();
    var strBatchNo = stringCreate.FromObject(objBatch);
    var objXml = {
        userID: STAFF_ID,
        batchNo: strBatchNo,
        remark: remark,
        type: de_app_type
    };
    var xmlData = stringCreate.toXML("ApproveRequest", objXml).End();
    myRequest.Execute(v_deAppRequestHandler, { xmlData: xmlData }, fnDeApproveRequestCallback, "Processing...");
};
function deAppReset() {
    element.setEnable(["btn_de_approve_approve", "btn_de_approve_reject"]);
    selectionStyle.Multiple("deAppBatchNo", "");
};