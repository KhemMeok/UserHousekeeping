/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
/// <reference path="ito_de_handle.js" />

// Get Requester
function fnDeBuGetRequester() {
    var objBatchTypes = $("#de_bu_bt").val();
    var strBatchTypes = stringCreate.FromObject(objBatchTypes);
    var objxml = {
        userID: STAFF_ID,
        reqFor:"Upload",
        batchTypes: strBatchTypes
    };
    var xmlData = stringCreate.toXML("GetRequester", objxml).End();
    myRequest.Execute(v_deGetRequester, { xmlData: xmlData }, buFnGetRequester);
};
// Move group ID up & down
function fnDeBuGroupMoveGroup(types) {
    if (types == "UP") {
        option.MoveUpDualListOp("de_bu_group_id", "DE_BATCH_UPLOAD #sl_duallistbox #bootstrap-duallistbox-selected-list_");
    }
    else {
        option.MoveDownDualListOp("de_bu_group_id", "DE_BATCH_UPLOAD #sl_duallistbox #bootstrap-duallistbox-selected-list_");
    };
};
// Get Group ID requested upload
function fnDeBuGetGroupID() {
    var objBatchTypes = $("#de_bu_bt").val();
    var strBatchTypes = stringCreate.FromObject(objBatchTypes);
    var objRequester = $("#de_bu_requester").val();
    var strRequester = stringCreate.FromObject(objRequester);
    if (strRequester == "") {
        strRequester = "NO_REQUESTER";
    }
    if (strBatchTypes == "" || strBatchTypes === undefined) {
        goAlert.alertErroTo("de_bu_bt", "Error", "No Batch Types have been selected", "change");
        return false;
    };
    var objxml = {
        userID: STAFF_ID,
        batchTypes: strBatchTypes,
        requester: strRequester
    };
    var xmlData = stringCreate.toXML("SelectGroupID", objxml).End();
    //console.log(xmlData);
    myRequest.Execute(v_deBatchUploadGetGroupID, { xmlData: xmlData }, buFnGetGroupID4Upload, "Processing...");
};
// Get Data Gridview
function fnDeBuGetBatchReqData() {
    var objBatchTypes = $("#de_bu_query_bt").val();
    var strBatchTypes = stringCreate.FromObject(objBatchTypes);
    if (strBatchTypes == "" || strBatchTypes === undefined) {
        goAlert.alertErroTo("de_bu_query_bt", "Error", "No Batch Types have been selected", "change");
        return false;
    };
    var valRange = $("#de_bu_query_vr").val();
    var fromDate = subString.FromDateDateRange(valRange);
    var toDate = subString.ToDateDateRange(valRange);
    var objxml = {
        UserID: STAFF_ID,
        BatchTypes: strBatchTypes,
        FromDate: fromDate,
        ToDate: toDate,
        TableID: "tbl_bu_data_req_upload"
    };
    var xmlData = stringCreate.toXML("Query", objxml).End();
    myRequest.Execute(v_deBatchUploadGetDataReqUpload, { xmlData: xmlData }, buFnBatchReqUploadQuery, "Processing...");
}
function fnDeBuUploadConfirmDialog() {
    var objgroup = [];
    objgroup = $("#de_bu_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    if (strGroupID == "" || strGroupID === undefined) {
        goAlert.alertErroTo("sl_duallistbox #bootstrap-duallistbox-selected-list_", "Error", "No Group ID selected", "change");
        return false;
    }
    if (modals.ConfirmShowAgain("md_de_bu_confirm_upload") == true) {
        modals.Confirm("Upload Transaction", "Are you sure to upload the selected Group ID?", "N", "Yes", "onclick", "fnDeBuUpload()", "md_de_bu_confirm_upload");
    }
    else {
        fnDeBuUpload();
    };
};
function fnDeBuUpload() {
    modals.CloseConfirm();
    var objgroup = [];
    objgroup = $("#de_bu_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    var uploadMode = $("#de_bu_upload_mode").val();
    var xmlObj = {
        userID: STAFF_ID,
        uploadMode: uploadMode,
        groupID: strGroupID
    };
    element.setDisable("btn_bu_upload");
    element.setDisable("btn_bu_reject");
    var xmlData = stringCreate.toXML("Upload", xmlObj).End();
    myRequest.Execute(v_deBatchUploadUpload, { xmlData: xmlData }, buFnBatchUpload, "Processing...");
};
function fnDeBuReset() {
    
    element.setEnable("btn_bu_upload");
    element.setEnable("btn_bu_reject");
    selectionStyle.Multiple("de_bu_group_id", "");
};
function fnDeBuRejectConfirmDialog() {

    var objgroup = [];
    objgroup = $("#de_bu_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    if (strGroupID == "" || strGroupID === undefined) {
        goAlert.alertErroTo("sl_duallistbox #bootstrap-duallistbox-selected-list_", "Error", "No Group ID selected", "change");
        return false;
    }
    if (modals.ConfirmShowAgain("md_de_bu_confirm_reject") == true) {
        modals.Confirm("Reject Upload", "Are you sure to reject upload the selected Group ID?", "Y", "Yes", "onclick", "fnDeBuReject()", "md_de_bu_confirm_reject");
    }
    else {
        fnDeBuReject();
    };

};
function fnDeBuReject() {
    modals.CloseConfirm();
    var objgroup = [];
    objgroup = $("#de_bu_group_id").val();
    var strGroupID = stringCreate.FromObject(objgroup);
    var note = modals.getConfirmNote();
    var xmlObj = {
        userID: STAFF_ID,
        groupID: strGroupID,
        note: note
    };
    element.setDisable("btn_bu_upload");
    element.setDisable("btn_bu_reject");
    var xmlData = stringCreate.toXML("Reject", xmlObj).End();
    //console.log(xmlData);
    myRequest.Execute(v_deBatchUploadReject, { xmlData: xmlData }, buFnReject, "Processing...");
};
function fnDeBuAddNoteDialog() {
    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_bu_data_req_upload");
    var strGroupID = stringCreate.FromObject(objGroupID);
    if (strGroupID == "" || strGroupID === undefined) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    }
    modals.AddNote("fnDeBuSaveNote()");
};
function fnDeBuSaveNote() {
    var note = modals.GetNote();
    if (note =="") {
        goAlert.alertError("Error", "You have not added some note yet");
        return false;
    };
    modals.CloseAddNote();
    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_bu_data_req_upload");
    var strGroupID = stringCreate.FromObject(objGroupID);
    var objxml = {
        userID: STAFF_ID,
        groupID: strGroupID,
        note: note,
        noteFrom:"Uploader"
    };
    var xmlData = stringCreate.toXML("AddNote", objxml).End();
    myRequest.Execute(v_deAddNote, { xmlData: xmlData }, buFnAddNote, "Processing...");
};
var v_bu_group_id_doc;
function fnDebuDownloadDocDialog() {
    var objgroup = [];
    objgroup = $("#de_bu_group_id").val();
    v_bu_group_id_doc = stringCreate.FromObject(objgroup);
    if (objgroup.length == 0) {
        goAlert.alertErroTo("DE_BATCH_UPLOAD #sl_duallistbox #bootstrap-duallistbox-selected-list_", "Error", "No Group ID selected", "change");
        return false;
    };
    if (modals.ConfirmShowAgain("md_debu_confirm_download_doc") == true) {
        modals.Confirm("Download Documents", "Are you sure to download documents from selected Group ID?", "N", "Yes", "onclick", "fnBuDeDownloadDoc()", "md_debu_confirm_download_doc");
    }
    else {
        fnBuDeDownloadDoc();
    };
}
function fnDebuDownloadDocGridDialog() {
    var objgroup = [];
    objgroup = table.GetValueSelected("tbl_bu_data_req_upload");
    v_bu_group_id_doc = stringCreate.FromObject(objgroup);
    if (objgroup.length == 0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    if (modals.ConfirmShowAgain("md_debu_confirm_download_doc") == true) {
        modals.Confirm("Download Documents", "Are you sure to download documents from selected Group ID?", "N", "Yes", "onclick", "fnBuDeDownloadDoc()", "md_debu_confirm_download_doc");
    }
    else {
        fnBuDeDownloadDoc();
    };

}
// download document
function fnBuDeDownloadDoc() {
    modals.CloseConfirm();
    window.location.href = "ACTIONS/Controllers/DE/doc_download.aspx?dot=dedoc&dwr=" + STAFF_ID + "&grl=" + v_bu_group_id_doc;
};
function fnBuCheckIssueDailog() {
    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_bu_data_req_upload");
    var strGroupID = stringCreate.FromObject(objGroupID);
    if (objGroupID.length==0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    if (objGroupID.length >1) {
        goAlert.alertError("Error", "The function is not avialable for multiple group id checking");
        return false;
    }
    element.inputValue("de_bu_ch_issue_group_id", strGroupID);
    myRequest.Execute(v_deIssueCode, undefined, buFnGetIssueCode, "Processing...");
    
};
function fnBuCheckIssue() {
    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_bu_data_req_upload");
    var strGroupID = stringCreate.FromObject(objGroupID);
    var code = $("#de_bu_ch_issue_code").val();
    if (code == "") {
        goAlert.alertErroTo("de_bu_ch_issue_code", "Error", "Issue Code shoule be selected", "change");
        return false;
    };
    modals.Close("modalCheckIssue");
    fnDeCheckIssue(code, "", strGroupID);
}