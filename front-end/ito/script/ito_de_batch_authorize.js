/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
/// <reference path="ito_de_handle.js" />
function fnDeBaGetRequester() {
    var objBatchTypes = $("#de_ba_bt").val();
    var strBatchTypes = stringCreate.FromObject(objBatchTypes);
    var objxml = {
        userID: STAFF_ID,
        reqFor: "Authorize",
        batchTypes: strBatchTypes
    };
    var xmlData = stringCreate.toXML("GetRequester", objxml).End();
    
    myRequest.Execute(v_deGetRequester, { xmlData: xmlData }, baFnGetRequester);
};
function fnDeBaGroupMoveGroup(types) {
    if (types == "UP") {
        option.MoveUpDualListOp("de_ba_group_id", "DE_BATCH_AUTHORIZE #de_ba_div_group_id #sl_duallistbox #bootstrap-duallistbox-selected-list_");
    }
    else {
        option.MoveDownDualListOp("de_ba_group_id", "DE_BATCH_AUTHORIZE #de_ba_div_group_id #sl_duallistbox #bootstrap-duallistbox-selected-list_");
    };
};
// Get Group ID requested authorize
function fnDeBaGetGroupID() {
    var objBatchTypes = $("#de_ba_bt").val();
    var strBatchTypes = stringCreate.FromObject(objBatchTypes);
    var objRequester = $("#de_ba_requester").val();
    var strRequester = stringCreate.FromObject(objRequester);
    if (strRequester == "") {
        strRequester = "NO_REQUESTER";
    }
    if (strBatchTypes == "" || strBatchTypes === undefined) {
        goAlert.alertErroTo("de_ba_bt", "Error", "No Batch Types have been selected", "change");
        return false;
    };
    var objxml = {
        userID: STAFF_ID,
        batchTypes: strBatchTypes,
        requester: strRequester
    };
    var xmlData = stringCreate.toXML("SelectGroupID", objxml).End();
    //console.log(xmlData);
    myRequest.Execute(v_deBatchAuthorizeGetGroupID, { xmlData: xmlData }, baFnGetGroupID4Authorize, "Processing...");
};
function fnDeBaViewBatchDetail() {
    var objgroup = [];
    objgroup = $("#de_ba_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    if (strGroupID == "" || strGroupID === undefined) {
        goAlert.alertErroTo("DE_BATCH_AUTHORIZE #de_ba_div_group_id #sl_duallistbox #bootstrap-duallistbox-selected-list_", "Error", "No Group ID selected", "change");
        return false;
    }
    var objBatchNo = [];
    objBatchNo = $("#de_ba_batch_no").val();
    var strBatchNo = stringCreate.FromObject(objBatchNo);
    if (strBatchNo == "" || strBatchNo === undefined) {
        goAlert.alertErroTo("DE_BATCH_AUTHORIZE #de_ba_div_batchno #bootstrap-duallistbox-selected-list_", "Error", "No Batch No selected", "change");
        return false;
    }
    var xmlData = {
        str_groupid: strGroupID,
        str_batch_no:strBatchNo,
        tbl_detail_id: "tbl_ba_data_batch_detail",
        tbl_master_id: "tbl_ba_data_batch_master"
    };
    myRequest.Execute(v_deGetBatchDetail, xmlData, baFnGetBatchDetail, "Processing...");
}
function fnDeBaDetailTrnExport() {
    modals.Close("modalDeBaBatchDetail");
    var objgroup = [];
    objgroup = $("#de_ba_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    var objBatchNo = [];
    objBatchNo = $("#de_ba_batch_no").val();
    var strBatchNo = stringCreate.FromObject(objBatchNo);
    window.location.href = "ACTIONS/Controllers/DE/doc_download.aspx?dot=deDetailTrn&grl=" + strGroupID + "&btc=" + strBatchNo;
}
function fnDeBaGetBatchNo(value) {
    var objGroup = [];
    objGroup = $("#de_ba_group_id").val();
    var deGroupIDtmp = stringCreate.FromObject(objGroup);
    if (deGroupIDtmp!=="") {
        deGroupIDtmp = stringCreate.FromObject(objGroup);
        var xmlObj = { userID: STAFF_ID, groupID: deGroupIDtmp };
        var xmlData = stringCreate.toXML("BatchAuthorize", xmlObj).End();
        myRequest.Execute(v_deBatchNo4authorize, { xmlData: xmlData }, baFnGetBatchNo4authrozie, "Processing...");
    }
    else {
        selectionStyle.Multiple("de_ba_batch_no", "");
    }
    
    
}
function fnDeBaGetBatchReqData() {
    var objBatchTypes = $("#de_ba_query_bt").val();
    var strBatchTypes = stringCreate.FromObject(objBatchTypes);
    if (strBatchTypes == "" || strBatchTypes === undefined) {
        goAlert.alertErroTo("de_ba_query_bt", "Error", "No Batch Types have been selected", "change");
        return false;
    };
    var valRange = $("#de_ba_query_vr").val();
    var fromDate = subString.FromDateDateRange(valRange);
    var toDate = subString.ToDateDateRange(valRange);
    var objxml = {
        UserID: STAFF_ID,
        BatchTypes: strBatchTypes,
        FromDate: fromDate,
        ToDate: toDate,
        TableID: "tbl_ba_data_req_authorize"
    };
    var xmlData = stringCreate.toXML("Query", objxml).End();
    //console.log(xmlData);
    myRequest.Execute(v_deBatchAuthorizeGetDataReqUpload, { xmlData: xmlData }, baFnBatchReqAuthorizeQuery, "Processing...");
}
// authorize dialog
function fnDeBaAuthorizeConfirmDialog() {

    var objgroup = [];
    objgroup = $("#de_ba_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    if (strGroupID == "" || strGroupID === undefined) {
        goAlert.alertErroTo("DE_BATCH_AUTHORIZE #de_ba_div_group_id #sl_duallistbox #bootstrap-duallistbox-selected-list_", "Error", "No Group ID selected", "change");
        return false;
    }
    var objBatchNo = [];
    objBatchNo = $("#de_ba_batch_no").val();
    var strBatchNo = stringCreate.FromObject(objBatchNo);
    if (strBatchNo == "" || strBatchNo === undefined) {
        goAlert.alertErroTo("DE_BATCH_AUTHORIZE #de_ba_div_batchno #bootstrap-duallistbox-selected-list_", "Error", "No Batch No selected", "change");
        return false;
    }
    if (modals.ConfirmShowAgain("md_de_ba_confirm_upload") == true) {
        modals.Confirm("Authorize Transaction", "Are you sure to authorize the selected Group ID?", "N", "Yes", "onclick", "fnDeBaAuthorize()", "md_de_ba_confirm_upload");
    }
    else {
        fnDeBaAuthorize();
    };
};
// authorize
function fnDeBaAuthorize() {
    modals.CloseConfirm();
    var objgroup = [];
    objgroup = $("#de_ba_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    var objBatchNo = [];
    objBatchNo = $("#de_ba_batch_no").val();
    var strBatchNo = stringCreate.FromObject(objBatchNo);
    var authorizeMode = $("#de_ba_authorize_mode").val();
    var xmlObj = {
        userID: STAFF_ID,
        authorizeMode: authorizeMode,
        groupID: strGroupID,
        batchNo: strBatchNo
    };
    element.setDisable("btn_ba_authorize");
    var xmlData = stringCreate.toXML("Authorize", xmlObj).End();
    //console.log(xmlData);
    myRequest.Execute(v_deBatchAuthorizeAuthorize, { xmlData: xmlData }, buFnBatchAuthorize, "Processing...");
};
//
function fnDeBaReset() {

    element.setEnable("btn_ba_authorize");
    selectionStyle.Multiple("de_ba_group_id", "");
    selectionStyle.Multiple("de_ba_batch_no", "");
};
function fnDeBaAddNoteDialog() {
    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_ba_data_req_authorize");
    var strGroupID = stringCreate.FromObject(objGroupID);
    if (strGroupID == "" || strGroupID === undefined) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    }
    modals.AddNote("fnDeBaSaveNote()");
};
function fnDeBaSaveNote() {
    var note = modals.GetNote();
    if (note == "") {
        goAlert.alertError("Error", "You have not added some note yet");
        return false;
    };
    modals.CloseAddNote();
    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_ba_data_req_authorize");
    var strGroupID = stringCreate.FromObject(objGroupID);
    var objxml = {
        userID: STAFF_ID,
        groupID: strGroupID,
        note: note,
        noteFrom: "Authorizer"
    };
    var xmlData = stringCreate.toXML("AddNote", objxml).End();
    //console.log(xmlData);
    myRequest.Execute(v_deAddNote, { xmlData: xmlData }, baFnAddNote, "Processing...");
};
var v_ba_group_id_doc;
function fnDebaDownloadDocDialog() {
    var objgroup = [];
    objgroup = $("#de_ba_group_id").val();
    v_ba_group_id_doc = stringCreate.FromObject(objgroup);
    if (objgroup.length == 0) {
        goAlert.alertErroTo("DE_BATCH_AUTHORIZE #sl_duallistbox #bootstrap-duallistbox-selected-list_", "Error", "No Group ID selected", "change");
        return false;
    };
    if (modals.ConfirmShowAgain("md_deba_confirm_download_doc") == true) {
        modals.Confirm("Download Documents", "Are you sure to download documents from selected Group ID?", "N", "Yes", "onclick", "fnBaDeDownloadDoc()", "md_deba_confirm_download_doc");
    }
    else {
        fnBaDeDownloadDoc();
    };

}
function fnDebaDownloadDocGridDialog() {
    var objgroup = [];
    objgroup = table.GetValueSelected("tbl_ba_data_req_authorize");
    v_ba_group_id_doc = stringCreate.FromObject(objgroup);
    if (objgroup.length == 0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    if (modals.ConfirmShowAgain("md_deba_confirm_download_doc") == true) {
        modals.Confirm("Download Documents", "Are you sure to download documents from selected Group ID?", "N", "Yes", "onclick", "fnBaDeDownloadDoc()", "md_deba_confirm_download_doc");
    }
    else {
        fnBaDeDownloadDoc();
    };

}
// download document
function fnBaDeDownloadDoc() {
    modals.CloseConfirm();
    window.location.href = "ACTIONS/Controllers/DE/doc_download.aspx?dot=dedoc&dwr=" + STAFF_ID + "&grl=" + v_ba_group_id_doc;
}
function fnDeCheckPendingTrn() {
    var objBatchTypes = $("#deCheckPendingBatchTypes").val();
    if (objBatchTypes.length == 0) {
        goAlert.alertError("Check Pending Error", "No Batch Types selected.");
        return false;
    };
    var chBatchType = stringCreate.FromObject(objBatchTypes);
    myRequest.Execute(v_deCheckPandingWs, { batchTypes: chBatchType }, fnDeCheckPendingCallBack, "Processing...");
};