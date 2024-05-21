/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function deFetchBatchDeleteRequester(process_indecator) {
    if (process_indecator == "Y") {
        myRequest.Execute(v_deBatchDeleteRequester, { user_id: STAFF_ID }, fnDeGetBatchDeleteRequesterCallBack, "Processing...");
    }
    else {
        myRequest.Execute(v_deBatchDeleteRequester, { user_id: STAFF_ID }, fnDeGetBatchDeleteRequesterCallBack);
    };
};
function deFetchBatchNoAvl() {
    var objReqester = [];
    objReqester = $("#deDeleteBatchRequester").val();
    var requester = stringCreate.FromObject(objReqester);
    var xmlData = {
        user_id: STAFF_ID,
        requester:requester
    };
    myRequest.Execute(v_deBatchDeleteBatchNo, xmlData, fnDeGetBatchDeleteBatchNoCallBack,"Processing...");
};
function deFetchBatchDeleteAvl(process_indecator) {
    if (process_indecator == "Y") {
        myRequest.Execute(v_deBatchDeleteList, { user_id: STAFF_ID }, fnDeGetBatchDeleteAvlCallBack, "Processing...");
    }
    else {
        myRequest.Execute(v_deBatchDeleteList, { user_id: STAFF_ID }, fnDeGetBatchDeleteAvlCallBack);
    };
};
function deBatchDeleteDialog() {
    var objBatch = [];
    objBatch = $("#deDeleteBatchNo").val();
    if (objBatch.length == 0) {
        goAlert.alertErroTo("DE_BATCH_DELETE #bootstrap-duallistbox-selected-list_","Erro Batch Delete", "No Batch No selected.");
        return false;
    };
    if (modals.ConfirmShowAgain("mdconfirmdeletebatch") == true) {
        modals.Confirm("Batch Delete", "Are you to delete selected batch no?", "N", "Yes", "onclick", "fnDeDeleteBatch()", "mdconfirmdeletebatch");
    }
    else {
        fnDeDeleteBatch();
    };
}
function fnDeDeleteBatch() {
    element.setDisable("btn_de_delete_batch_dialog");
    modals.CloseConfirm();
    var objBatch = [];
    objBatch = $("#deDeleteBatchNo").val();
    var strBatchNo = stringCreate.FromObject(objBatch);
    var objXml = {
        userId: STAFF_ID,
        batchNo:strBatchNo
    };
    var xmlData = stringCreate.toXML("DeleteBatch", objXml).End();
    myRequest.Execute(v_deDeleteBatch, { xmlData: xmlData }, fnDeDeleteBatchCallBack, "Processing...");
};
function fnDeDeleteBatchReset() {
    element.setEnable("btn_de_delete_batch_dialog");
    selectionStyle.Multiple("deDeleteBatchNo", "");
};