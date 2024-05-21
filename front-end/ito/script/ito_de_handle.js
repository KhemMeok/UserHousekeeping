/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
/// <reference path="ito_user_info_handle.js" />
//re = respond data
// using in screen Batch Posting
function onLoadGetBatchType(rd) {
    deBatchTypesCheckRequestOpt = jqueryXml.Find("deBatchTypeCheckRequest", rd);
    deBatchTypesUploadOpt = jqueryXml.Find("deBatchTypeUpload", rd);
    deBatchTypesAuthorizeOpt = jqueryXml.Find("deBatchTypeAuthorize", rd);
    deAllBatchTypes = jqueryXml.Find("deAllBatchTypes", rd);
}
function bpFnGetCurrentBatchNo(rd) {
    var curBatch = jqueryXml.Find("deCurrentBatchNo", rd);
    element.inputValue("de_posting_curr_batch_no", curBatch);
    var status = jqueryXml.Find("deStatus", rd);
    if (status == "1") {
        element.checkSuccess("de_posting_curr_batch_no_check");
    }
    else {
        element.checkFail("de_posting_curr_batch_no_check");
    };
};
var appAuthAllow;
var nextWDAllow;
var backDateAllow;
var scheduleAllow;
var singleReqAllow;
var groupReqAllow;
var khr_inrounding;
var cypo_upload_allow;
function bpFnGetChkControlCallBack(rd) {
    var newXml = jqueryXml.Find("deCheckBox", rd);
    appAuthAllow = readFiles.Xml("app_auth_allow", newXml);
    nextWDAllow = readFiles.Xml("nextworkding_allow", newXml);
    backDateAllow = readFiles.Xml("backdate_allow", newXml);
    scheduleAllow = readFiles.Xml("schedule_allow", newXml);
    singleReqAllow = readFiles.Xml("single_req_allow", newXml);
    groupReqAllow = readFiles.Xml("group_req_allow", newXml);
    khr_inrounding = readFiles.Xml("khr_inrounding", newXml);
    cypo_upload_allow = readFiles.Xml("cypo_upload_allow", newXml);
    bpFnCheckBoxHandler();
};
function bpFnCheckBoxHandler() {
    if (appAuthAllow == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_approve_auth");
    };
    if (nextWDAllow == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_for_nextworkingday");
    };
    if (backDateAllow == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_back_date");
    };
    if (scheduleAllow == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_schedule");
    };
    if (singleReqAllow == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_single_req");
    };
    if (groupReqAllow == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_group_req");
    };
    if (singleReqAllow == "N" && groupReqAllow == "Y") {
        fnRequestTypeCheck_de_posting('de_posting_chk_group_req');
    };
    if (khr_inrounding == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_khr_inrounding");
    };
    if (cypo_upload_allow == "Y") {
        goShowHide.showOnDivAsBlock("de_div_chk_cypo_upload_allow");
    };
};
function bpFnGetBatchSources(rd) {
    var batchSources = jqueryXml.Find("deBatchSources", rd);
    selectionStyle.LiveSearch("de_posting_source", batchSources);

    if ($("#de_posting_source option").length == 2) {
        $("#de_posting_source option:eq(1)").prop("selected", true);
        selectionStyle.LiveSearchRefresh("de_posting_source");
        fnShowInputFileTypes_de_posting($("#de_posting_source").val());
        fnProcessStageView();
        setTimeout(function () { fnValidateButtons(); }, 1000);
    };
};
function bpFnUserRole(rd) {
    roleValBTN = jqueryXml.Find("deBatchTypeRole", rd).split(",");

};
function bpFnGetMainAccount(rd) {
    var mainAccount = jqueryXml.Find("deCustomerMainAccount", rd);
    selectionStyle.LiveSearch("de_posting_main_account", mainAccount);
};
function bpFnGetMainAccountDetail(rd) {
    var mainAccountDetail = jqueryXml.Find("deCustomerMainAccountDetail", rd);
    var status = readFiles.Xml("status", mainAccountDetail);
    element.inputValue("de_posting_main_acc_name", readFiles.Xml("account_name", mainAccountDetail));
    element.inputValue("de_posting_main_acc_no", readFiles.Xml("account_no", mainAccountDetail));
    element.inputValue("de_posting_main_acc_brcode", readFiles.Xml("branch_code", mainAccountDetail));
    element.inputValue("de_posting_main_acc_ccy", readFiles.Xml("account_ccy", mainAccountDetail));
    element.inputValue("de_posting_main_acc_curr_bal", readFiles.Xml("account_balance", mainAccountDetail));
    element.inputValue("de_posting_main_acc_status", readFiles.Xml("account_status", mainAccountDetail));
    inMainAccountCccy = readFiles.Xml("account_ccy", mainAccountDetail);
    inMainAccountBrcode = readFiles.Xml("branch_code", mainAccountDetail);
    inPayrollOffsetAccount = readFiles.Xml("offsetGl", mainAccountDetail);
    inPayrollOffsetFee = readFiles.Xml("offsetFee", mainAccountDetail);
    if (status == "1") {
        element.checkSuccess("de_posting_main_acc_name_check");
        element.checkSuccess("de_posting_main_acc_no_check");
        element.checkSuccess("de_posting_main_acc_brcode_check");
        element.checkSuccess("de_posting_main_acc_ccy_check");
        element.checkSuccess("de_posting_main_acc_curr_bal_check");
        element.checkSuccess("de_posting_main_acc_status_check");
    } else {
        element.checkFail("de_posting_main_acc_name_check");
        element.checkFail("de_posting_main_acc_no_check");
        element.checkFail("de_posting_main_acc_brcode_check");
        element.checkFail("de_posting_main_acc_ccy_check");
        element.checkFail("de_posting_main_acc_curr_bal_check");
        element.checkFail("de_posting_main_acc_status_check");
    };
};
function bpFnGetTrnRef(rd) {
    var ref = jqueryXml.Find("deTrnReference", rd);
    selectionStyle.LiveSearch("de_posting_transaction_ref", ref);
};
function bpFnUploadTemplate(rd) {
    var status = jqueryXml.Find("status", rd);
    var uploadMsg = jqueryXml.Find("message", rd)
    element.inputValue("de_posting_attachment_upload_status", uploadMsg)
    if (status == "1") {
        element.setEnable("btn_de_posting_pre_check");
        element.checkSuccess("de_posting_attachment_upload_check");
    }
    else {
        element.checkFail("de_posting_attachment_upload_check");
    };
};
function bpFnPreCheck(rd) {

    var preCheckDetail = jqueryXml.Find("preCheckDetail", rd);
    var status = readFiles.Xml("status", preCheckDetail);
    var message = readFiles.Xml("message", preCheckDetail);
    var ccy = readFiles.Xml("trnCcy", preCheckDetail);
    var totalDebit = readFiles.Xml("totalDebit", preCheckDetail);
    var totalCredit = readFiles.Xml("totalCredit", preCheckDetail);
    var batchNo = readFiles.Xml("batchNo", preCheckDetail);
    var totalTrn = readFiles.Xml("totalTrn", preCheckDetail);
    var groupID = readFiles.Xml("groupID", preCheckDetail);
    element.inputValue("de_posting_trn_ccy", ccy);
    element.inputValue("de_posting_total_debit", totalDebit);
    element.inputValue("de_posting_total_credit", totalCredit);
    element.inputValue("de_posting_batch_no", batchNo);
    element.inputValue("de_posting_total_trn", totalTrn);
    element.inputValue("de_posting_pre_check_status", message);
    element.inputValue("de_posting_group_id", groupID);
    var nextBtn = $("#btn_de_posting_pre_check").val();
    var objectCheck = ["de_posting_trn_ccy_check",
        "de_posting_total_debit_check",
        "de_posting_total_credit_check",
        "de_posting_batch_no_check",
        "de_posting_pre_check_check",
        "de_posting_group_id_check"
    ];
    if (status == "1") {
        element.setEnable(nextBtn);
        element.checkSuccess(objectCheck);
        inGroupID = groupID;
    }
    else {
        element.checkFail(objectCheck);
    };
};
function bpFnRequestUpload(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Request upload", message);
        element.setDisable("btn_de_posting_req_upload");
    }
    else {
        goAlert.alertError("Request upload", message);
    };
};
function bpFnCreateGRID(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Create group name", message);
        myRequest.Execute(v_dePostingGroupName, { userID: STAFF_ID }, bpFnGetGroupName);
    }
    else {
        goAlert.alertError("Create group name", message);
    };
};
function bpFnGetGroupName(rd) {
    var groupName = jqueryXml.Find("deGroupName", rd);
    selectionStyle.LiveSearch("de_posting_group_request_id", groupName);
};
var UploadInterval;
function bpFnSelfUpload(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    element.inputValue("de_posting_upload_stat", message);

    if (status == "1") {
        //goAlert.alertInfo("Selt upload", message);
        element.setDisable("btn_de_posting_seft_upload");
        element.checkSuccess("de_posting_upload_check");
        processIndicator.Start("Transaction is uploading, Do not leave the session");
        UploadInterval = setInterval(function () { myRequest.Execute(v_dePostingCheckProcessing, { group_id: inGroupID, type: "uploading_ck" }, bpSeftUploadProcessingCheck); }, 3000);

    }
    else {
        goAlert.alertError("Selt Upload", message);
        element.checkFail("de_posting_upload_check");
    };
};
function bpSeftUploadProcessingCheck(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    var tot_upload = jqueryXml.Find("total0", rd);
    if (status == "-1") {
        clearInterval(UploadInterval);
        processIndicator.Stop();
        var next_btn = $("#btn_de_posting_seft_upload").val();
        element.inputValue("de_posting_upload_stat", message);
        element.inputValue("de_posting_tot_uploaded", tot_upload)

        if (message.includes("System - Uploaded successfully") == true) {
            element.checkSuccess("de_posting_upload_check");
            element.setEnable(next_btn);
        }
        else {
            element.checkFail("de_posting_upload_check");
        };
    }
};
function bpFnBatchPostingQuery(rd) {
    var new_data = jqueryXml.Find("data_record", rd);
    dataTable.Apply("tbl_de_posting_batch", new_data);

};
function fnDeReplaceStatus(table_id) {
    setTimeout(function () {
        var table = document.getElementById(table_id);
        var cell;
        for (var i = 0, row; row = table.rows[i]; i++) {
            cell = row.cells[3];
            if (cell.innerHTML == "Aborted") {
                cell.innerHTML = '<i class="fas fa-ban text-danger"></i> ' + cell.innerHTML;
            };
            if (cell.innerHTML == "Booked") {
                cell.innerHTML = '<i class="fas fa-bookmark text-primary"></i> ' + cell.innerHTML;
            };
            if (cell.innerHTML == "Requested upload" || cell.innerHTML == "Requested authorize") {
                cell.innerHTML = '<i class="fas fa-paper-plane text-primary"></i> ' + cell.innerHTML;
            };
            if (cell.innerHTML == "Uploading" || cell.innerHTML == "Authorizing") {
                cell.innerHTML = '<i class="fas fa-spinner fa-pulse text-info"></i> ' + cell.innerHTML;
            };
            if (cell.innerHTML == "Authorized" || cell.innerHTML == "Uploaded") {
                cell.innerHTML = '<i class="fas fa-check-circle text-success"></i> ' + cell.innerHTML;
            };
            if (cell.innerHTML == "Deleted") {
                cell.innerHTML = '<i class="fas fa-trash-alt text-danger"></i> ' + cell.innerHTML;
            };
            if (cell.innerHTML == "Rejected") {
                cell.innerHTML = '<i class="fas fa-times-circle text-danger"></i> ' + cell.innerHTML;
            };
        }
    }, 1000);
};
function bpFnRequestAuthorize(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        element.setDisable("btn_de_posting_req_authorize");
        goAlert.alertInfo("Request Authorize", message);
    }
    else {
        goAlert.alertError("Error Request Authorize", message);
    };
};
function bpFnRequestAuthorizeGrid(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Request Authorize", message);
        fnDePostingQuery();
    }
    else {
        goAlert.alertError("Error Request Authorize", message);
    };
};
var AuthorizeInterval;
function bpFnSelfAuthorize(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    element.inputValue("de_posting_authorize_stat", message);

    if (status == "1") {
        //goAlert.alertInfo("Selt upload", message);
        element.setDisable("btn_de_posting_seft_authorize");
        element.checkSuccess("de_posting_authorize_check");
        processIndicator.Start("Transaction is authorizing, Do not leave the session");
        AuthorizeInterval = setInterval(function () { myRequest.Execute(v_dePostingCheckProcessing, { group_id: inGroupID, type: "authorizing_ck" }, bpSeftAuthorizeProcessingCheck); }, 3000);

    }
    else {
        goAlert.alertError("Selt Authorize", message);
        element.checkFail("de_posting_authorize_check");
    };
};
function bpSeftAuthorizeProcessingCheck(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    var tot_upload = jqueryXml.Find("total0", rd);
    if (status == "-1") {
        clearInterval(AuthorizeInterval);
        processIndicator.Stop();
        element.inputValue("de_posting_authorize_stat", message);
        element.inputValue("de_posting_tot_authorize", tot_upload)
        if (message.includes("System - Authorized successfully") == true) {
            element.checkSuccess("de_posting_authorize_check");
            element.setEnable(next_btn);
        }
        else {
            element.checkFail("de_posting_authorize_check");
        };
    }
};
function bpFnAbortRequest(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Abort Request", message);
        fnDePostingQuery();
    }
    else {
        goAlert.alertError("Error Abort Request", message);
    };
};
function bpFnPullRef(rd) {
    var status = jqueryXml.Find("status", rd);
    var uploadMsg = jqueryXml.Find("message", rd)
    element.inputValue("de_posting_pull_status", uploadMsg)
    if (status == "1") {
        element.setEnable("btn_de_posting_pre_check");
        element.checkSuccess("de_posting_pull_check");
    }
    else {
        element.checkFail("de_posting_pull_check");
    };
};
function bpFnGetIssueTrn(rd) {
    var new_data = jqueryXml.Find("data_record", rd);
    dataTable.Apply("tbl_get_de_issue", new_data);
    var summary = jqueryXml.Find("summary", rd);
    $("#issue_summary").html(summary);
    var detail = jqueryXml.Find("detail", rd);
    $("#issue_detail").html(detail);
    modals.Open("bpmdlIssueDetail");
};
function bpFnClearRef(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Clear Pulling Reference", message);
    }
    else {
        goAlert.alertError("Error Clear Pulling Reference", message);
    };
};
function bpFnBatchNoRequestDelete(rd) {
    var optBatchNo = jqueryXml.Find("options1", rd);
    var optBrandCode = jqueryXml.Find("options2", rd);
    selectionStyle.MultipleInline("de_posting_req_delete_batch_no", optBatchNo);
    selectionStyle.MultipleInline("de_posting_req_delete_branch_code", optBrandCode);
    modals.Open("modalDepostingReqDelete");
};
function bpFnRequestDelete(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Request Delete Batch", message);
    }
    else {
        goAlert.alertError("Error Request Delete Batch", message);
    };
};
function bpFnBatchNoRequestDeleteChange(rd) {
    var optBatchNo = jqueryXml.Find("options1", rd);
    var optBrandCode = jqueryXml.Find("options2", rd);
    selectionStyle.MultipleInline("de_posting_req_delete_batch_no", optBatchNo);
    selectionStyle.MultipleInline("de_posting_req_delete_branch_code", optBrandCode);
};
function bpFnBatchNo4jvExportHandler(rd) {
    modals.Open("modalDepostingExportJv");
    element.inputValue("de_posting_jv_manual_batch_enter", "");
    element.inputValue("de_posting_jv_value_date_enter", "");
    datePicker.Date("de_posting_jv_value_date_enter");
    var optBatchNo = jqueryXml.Find("options", rd);
    selectionStyle.MultipleInline("de_posting_jv_batch_no", optBatchNo);
};
function bpFnBatchNo4jvExportOnChangeHandler(rd) {
    var optBatchNo = jqueryXml.Find("options", rd);
    selectionStyle.MultipleInline("de_posting_jv_batch_no", optBatchNo);
};
// #################### BATCH UPLOAD

function buFnGetRequester(rd) {
    var requester = jqueryXml.Find("options", rd);
    selectionStyle.MultipleInline("de_bu_requester", requester);
};
function buFnGetGroupID4Upload(rd) {
    var options = jqueryXml.Find("options", rd);
    selectionStyle.Multiple("de_bu_group_id", options);
};
function buFnBatchReqUploadQuery(rd) {
    var new_data = jqueryXml.Find("data_record", rd);
    dataTable.Apply("tbl_bu_data_req_upload", new_data);
};
function buFnBatchUpload(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Upload Request", message);
    }
    else {
        goAlert.alertError("Upload Request", message);
    };
};
function buFnReject(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Reject Request Upload", message);
    }
    else {
        goAlert.alertError("Reject Request Upload", message);
    };
};
function buFnAddNote(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Add Note", message);
        fnDeBuGetBatchReqData();
    }
    else {
        goAlert.alertError("Add Note", message);
    };
};
function buFnGetIssueCode(rd) {
    var options = jqueryXml.Find("options", rd);
    selectionStyle.LiveSearch("de_bu_ch_issue_code", options);
    modals.Open("modalCheckIssue");

};
//###### Batch Authorize
function baFnGetRequester(rd) {
    var requester = jqueryXml.Find("options", rd);
    selectionStyle.MultipleInline("de_ba_requester", requester);
};
function baFnGetGroupID4Authorize(rd) {
    var options = jqueryXml.Find("options", rd);
    selectionStyle.Multiple("de_ba_group_id", options);
    selectionStyle.Multiple("de_ba_batch_no", "");
};
function baFnGetBatchNo4authrozie(rd) {
    var options = jqueryXml.Find("options", rd);
    selectionStyle.Multiple("de_ba_batch_no", options);
};
function baFnBatchReqAuthorizeQuery(rd) {
    var new_data = jqueryXml.Find("data_record", rd);
    dataTable.Apply("tbl_ba_data_req_authorize", new_data);
};
function baFnGetBatchDetail(rd) {
    var detail = jqueryXml.Find("detail", rd);
    var master = jqueryXml.Find("master", rd);
    dataTable.Apply("tbl_ba_data_batch_detail", detail);
    dataTable.Apply("tbl_ba_data_batch_master", master);
    modals.Open("modalDeBaBatchDetail");
};
function buFnBatchAuthorize(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Authorize Request", message);
    }
    else {
        goAlert.alertError("Authorize Request", message);
    };
};
function baFnAddNote(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Add Note", message);
        fnDeBaGetBatchReqData();
    }
    else {
        goAlert.alertError("Add Note", message);
    };
};
// Main Account section
function mcFnSearchAcc(rd) {
    var account = jqueryXml.Find("account", rd);
    var branch_code = jqueryXml.Find("branch_code", rd);
    var currency = jqueryXml.Find("ccy", rd);
    var Account_name = jqueryXml.Find("account_name", rd);
    element.inputValue("deMAaccount", account);
    selectionStyle.LiveSearch("deMAbrcode", branch_code);
    selectionStyle.LiveSearch("deMAccy", currency);
    selectionStyle.LiveSearch("deMAaccountname", Account_name);
}
function mcFnSave(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Saving Main Account", message);
        deMainAccQuery();
    }
    else {
        goAlert.alertError("Saving Main Account", message);
    };
};
function mcFnQuery(rd) {
    var data = jqueryXml.Find("data_record", rd);
    dataTable.Apply("deMAdatatable", data);
};
function mcFnDelete(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Delete Main Account", message);
        deMainAccQuery();
    }
    else {
        goAlert.alertError("Delete Main Account", message);
    };
};

// Approve Batch
function fnDeAppGetRequesterCallBack(xml) {
    var options = jqueryXml.Find("options", xml);
    selectionStyle.MultipleInline("deAppBatchRequester", options);
}
function fnDeAppGetBatchNoCallBack(xml) {
    var options = jqueryXml.Find("options", xml);
    selectionStyle.Multiple("deAppBatchNo", options);
};
function fnDeAppGetRequestCallBack(xml) {
    var data = jqueryXml.Find("data_record", xml);
    dataTable.Apply("de_to_app_batch_tbl", data);
};
// Batch Delete
function fnDeGetBatchDeleteRequesterCallBack(xml) {
    var options = jqueryXml.Find("options", xml);
    selectionStyle.MultipleInline("deDeleteBatchRequester", options);
}
function fnDeGetBatchDeleteBatchNoCallBack(xml) {
    var options = jqueryXml.Find("options", xml);
    selectionStyle.Multiple("deDeleteBatchNo", options);
}

function fnDeGetBatchDeleteAvlCallBack(xml) {
    var data = jqueryXml.Find("data_record", xml);
    dataTable.Apply("de_to_delete_batch_tbl", data);
};
function fnDeApproveRequestCallback(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    var app_action = (de_app_type == "app") ? "Approve Request" : "Reject Request";
    if (status == "1") {
        goAlert.alertInfo(app_action, message);
        deAppFetchRequest("N");
    }
    else {
        goAlert.alertError(app_action, message);
    };
};
function fnDeDeleteBatchCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Delete Batch", message);
        deFetchBatchDeleteAvl('N');
    }
    else {
        goAlert.alertError("Delete Batch", message);
    };
};
var v_all_batch_sources_opt;
function fnDeBTCGetAllBatchSourceCallBack(rd) {
    var opt = jqueryXml.Find("AllBatchSoures", rd);
    v_all_batch_sources_opt = opt;
    selectionStyle.Multiple("de_btc_bt_source", opt);
};
function feDeBTCCreteBatchTypeCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Batch Type Creation", message);
        BtcGetBatchTypeLising();
    }
    else {
        goAlert.alertError("Batch Type Creation Error", message);
    };
};
function fneBTCGetListingCallBack(xml) {
    var data = jqueryXml.Find("data_record", xml);
    dataTable.Apply("de_btc_batch_type_tbl", data);
    setTimeout(function () {
        $("#de_btc_batch_type_tbl td").css("vertical-align", "middle");
    }, 1000);

};
function fnBTCGetDataForUpdateCallBack(xml) {
    var new_data = jqueryXml.Find("detail", xml);
    var batch_name = readFiles.Xml("batch_name", new_data);
    var group_label = readFiles.Xml("group_label", new_data);
    var KHR = readFiles.Xml("KHR", new_data);
    var USD = readFiles.Xml("USD", new_data);
    var THB = readFiles.Xml("THB", new_data);
    var appAuth = readFiles.Xml("appAuth", new_data);
    var NKD = readFiles.Xml("NKD", new_data);
    var BKD = readFiles.Xml("BKD", new_data);
    var schedule = readFiles.Xml("schedule", new_data);
    var single_req = readFiles.Xml("single_req", new_data);
    var group_req = readFiles.Xml("group_req", new_data);
    var khr_inrounding = readFiles.Xml("khr_inrounding", new_data);
    var cypo_upload_allow = readFiles.Xml("cypo_upload_allow", new_data);
    element.inputValue("de_btc_bt_name", batch_name);
    element.inputValue("de_btc_group_label", group_label);
    element.inputValue("de_btn_riel_label", KHR);
    element.inputValue("de_btn_usd_label", USD);
    element.inputValue("de_btn_thb_label", THB);
    (appAuth == "Y") ? checkBox.Check("de_btc_app_auth_allow") : checkBox.Uncheck("de_btc_app_auth_allow");
    (NKD == "Y") ? checkBox.Check("de_btc_req_nkd_allow") : checkBox.Uncheck("de_btc_req_nkd_allow");
    (BKD == "Y") ? checkBox.Check("de_btc_bkd_allow") : checkBox.Uncheck("de_btc_bkd_allow");
    (schedule == "Y") ? checkBox.Check("de_btc_req_sche_allow") : checkBox.Uncheck("de_btc_req_sche_allow");
    (single_req == "Y") ? checkBox.Check("de_btc_single_req_allow") : checkBox.Uncheck("de_btc_single_req_allow");
    (group_req == "Y") ? checkBox.Check("de_btc_group_req_allow") : checkBox.Uncheck("de_btc_group_req_allow");
    (khr_inrounding == "Y") ? checkBox.Check("de_btc_khr_inrounding") : checkBox.Uncheck("de_btc_khr_inrounding");
    (cypo_upload_allow == "Y") ? checkBox.Check("de_btc_cypo_upload_allow") : checkBox.Uncheck("de_btc_cypo_upload_allow");
    var source = [];
    source = readFiles.Xml("source", new_data).split(",").filter(i => i);
    for (var i = 0; i < source.length; i++) {
        $('#de_btc_bt_source option[value="' + source[i] + '"]').prop("selected", true);
    };
    goShowHide.hideOnDiv("de_btc_create");
    goShowHide.showOnDivAsInline(["de_btc_update", "de_btc_cancel"]);
    document.body.scrollIntoView({
        behavior: 'smooth'
    });

};
function fnDeBTCUpdateBatchTypeCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Batch Type Update", message);
        BtcGetBatchTypeLising();
    }
    else {
        goAlert.alertError("Batch Type Update Error", message);
    };
};
function fnDeBTCDeleteBatchTypeCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Batch Type Delete", message);
        BtcGetBatchTypeLising();
    }
    else {
        goAlert.alertError("Batch Type Delete Error", message);
    };
};
function fnDeBTCgetUsersCallBack(rd) {
    var opt = jqueryXml.Find("options", rd);
    modals.Open("modalAddMemberBatchType");
    selectionStyle.LiveSearch("de_btc_mem_get_users", opt);
};
function fnDeBTCUserHandlerCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo(mdtitle, message);
    }
    else {
        setTimeout(function () {
            modals.Open("modalAddMemberBatchType");
            goAlert.alertError(mdtitle + " Error", message);
        }, 1000);
    };
};
function feDeBTCGetUserCurrRoleCallBack(rd) {
    var current_role = jqueryXml.Find("current_role", rd);
    var fucbUploadUser = jqueryXml.Find("fcubUploadUser", rd);
    var fucbAuthUser = jqueryXml.Find("fcubAuthorizeUser", rd);
    //$("#de_btc_mem_role").val("susauoraor");
    $("#de_btc_mem_role option:selected").prop("selected", false)
    $("#de_btc_mem_role option:eq(" + current_role + ")").prop('selected', true);
    selectionStyle.LiveSearchRefresh("de_btc_mem_role");
    element.inputValue("de_btc_mem_add_fcub_up_userid", fucbUploadUser);
    element.inputValue("de_btc_mem_add_fcub_au_userid", fucbAuthUser);
    var userdeRole = $("#de_btc_mem_role").val();
    BtcAddMemValFcubUser(userdeRole);
};
function fnDePreCheckSaveCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Pre-Check Creation", message);
        fnPreCheckQuery();
    }
    else {
        goAlert.alertError("Pre-Check Creation Error", message);
    };
};
function fnGetAllPreCheckCallBack(rd) {
    var data_record = jqueryXml.Find("data_record", rd);
    dataTable.Apply("de_pre_check_tbl", data_record);
};
function fnGetPreCheckForUpdateCallBack(rd) {
    var new_data = jqueryXml.Find("detail", rd);
    var CheckSQL = readFiles.Xml("CheckSQL", new_data);
    var QuerySQL = readFiles.Xml("QuerySQL", new_data);
    var Desc = readFiles.Xml("Desc", new_data);
    var Detail = readFiles.Xml("Detail", new_data);
    element.inputValue("de_pre_check_sql_script", CheckSQL);
    element.inputValue("de_pre_check_query_script", QuerySQL);
    element.inputValue("de_pre_check_desc", Desc);
    element.inputValue("de_pre_check_desc_detail", Detail);
    (readFiles.Xml("BKDAllowed", new_data) == "Y") ? checkBox.Check("de_pre_check_backdate_allow") : checkBox.Uncheck("de_pre_check_backdate_allow");
    (readFiles.Xml("NKDAllowed", new_data) == "Y") ? checkBox.Check("de_pre_check_nextwkd_allow") : checkBox.Uncheck("de_pre_check_nextwkd_allow");
    goShowHide.hideOnDiv("de_pre_check_btn_save");
    goShowHide.showOnDivAsInline(["de_pre_check_btn_update", "de_pre_check_btn_cancel"]);
    document.body.scrollIntoView({
        behavior: 'smooth'
    });
};
function fnDePreCheckUpdateCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Pre-Check Update", message);
        fnPreCheckQuery();
    }
    else {
        goAlert.alertError("Pre-Check Update Error", message);
    };
};
function fnDePreCheckHandlerCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Pre-Check " + pre_check_action, message);
        fnPreCheckQuery();
        //fnPreCheckMaintainQuery();
    }
    else {
        goAlert.alertError("Pre-Check " + pre_check_action + " Error", message);
    };
};
function fnDePreCheckGetAllUsersCallBack(rd) {
    var options = jqueryXml.Find("options", rd);
    selectionStyle.LiveSearch("de_pre_check_custo_requester", options);
};
function fnDePreCheckCustoCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Pre-Check Customise", message);
        fnDePreCheckGetAllExlude();
    }
    else {
        goAlert.alertError("Pre-Check Customise" + " Error", message);
    };
};
function fnGetAllPreCheckExcludedCallBack(rd) {
    var data_record = jqueryXml.Find("data_record", rd);
    dataTable.Apply("de_pre_check_excluded_tbl", data_record);
};
function fnDePreCheckRemoveExclCallBack(rd) {
    var status = jqueryXml.Find("status", rd);
    var message = jqueryXml.Find("message", rd);
    if (status == "1") {
        goAlert.alertInfo("Remove Excluded Code", message);
        fnDePreCheckGetAllExlude();
    }
    else {
        goAlert.alertError("Remove Excluded Code Error", message);
    };
};
function fnDeCheckPendingCallBack(rd) {
    var data_record = jqueryXml.Find("data_record", rd);
    dataTable.Apply("deCheckPendingTbl", data_record);
};