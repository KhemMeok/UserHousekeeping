/// <reference path="ito_variable.js" />
/// <reference path="ito_core.js" />
function fnPreCheckNewInit() {
    goShowHide.showOnDivAsInline("de_pre_check_btn_save");
    goShowHide.hideOnDiv(["de_pre_check_btn_update", "de_pre_check_btn_cancel"]);
    element.inputValue("de_pre_check_sql_script", "");
    element.inputValue("de_pre_check_query_script", "");
    element.inputValue("de_pre_check_desc", "");
    element.inputValue("de_pre_check_desc_detail", "");
    checkBox.Uncheck(["de_pre_check_backdate_allow", "de_pre_check_nextwkd_allow"]);
};
function fnSavePreCheck() {
    var checkSql = $("#de_pre_check_sql_script").val();
    checkSql =checkSql.replace(/;\s*$/, "");
    var querySql = $("#de_pre_check_query_script").val();
    querySql = querySql.replace(/;\s*$/, "");
    var desc = $("#de_pre_check_desc").val();
    var desc_detail = $("#de_pre_check_desc_detail").val();
    var BKDAllow = (checkBox.checkStat("de_pre_check_backdate_allow") == true) ? "Y" : "N";
    var NKDAllow = (checkBox.checkStat("de_pre_check_nextwkd_allow") == true) ? "Y" : "N";
    if (checkSql == "") {
        goAlert.alertErroTo("de_pre_check_sql_script", "Pre-Check Creation Error", "Pre-Check SQL Script must be provided.");
        return false
    };
    if (querySql == "") {
        goAlert.alertErroTo("de_pre_check_query_script", "Pre-Check Creation Error", "Pre-Check Query Script must be provided.");
        return false
    };
    if (desc == "") {
        goAlert.alertErroTo("de_pre_check_desc", "Pre-Check Creation Error", "Pre-Check Description must be provided.");
        return false
    };
    var xmlObj = {
        CheckSql: checkSql,
        QuerySql: querySql,
        Desc: desc,
        DetailDesc: desc_detail,
        BKDAllow: BKDAllow,
        NKDAllow: NKDAllow
    };
    var xmlData = stringCreate.toXML("AddPreCheck", xmlObj).End();
    myRequest.Execute(v_dePreCheckSaveWs, { xmlData: xmlData }, fnDePreCheckSaveCallBack, "Processing...");
};
function fnPreCheckQuery(process) {
    if (process == undefined) {
        myRequest.Execute(v_dePreCheckQueryWs, undefined, fnGetAllPreCheckCallBack);
    }
    else {
        myRequest.Execute(v_dePreCheckQueryWs, undefined, fnGetAllPreCheckCallBack,"Processing...");
    }
};
function fnGetPreCheckForUpdate() {
    var objData = [];
    objData = table.GetValueSelected("de_pre_check_tbl");
    if (objData.length > 1) {
        goAlert.alertError("Get Pre-Check for Update Error", "Operation do not support multiple selected.")
        return false;
    };
    if (objData.length == 0) {
        goAlert.alertError("Get Pre-Check for Update Error", "No Code selected.")
        return false;
    };
    var pre_code = stringCreate.FromObject(objData);
    $("#de_pre_check_btn_update").val(pre_code);
    myRequest.Execute(v_dePreCheckGetForUpdateWs, { pre_code: pre_code }, fnGetPreCheckForUpdateCallBack, "Processing...");
};
var objDataPreCheck={ };
function fnUpdatePreCheckConfirm(pre_code) {
    objDataPreCheck = {};
    var checkSql = $("#de_pre_check_sql_script").val();
    checkSql = checkSql.replace(/;\s*$/, "");
    var querySql = $("#de_pre_check_query_script").val();
    querySql = querySql.replace(/;\s*$/, "");
    var desc = $("#de_pre_check_desc").val();
    var desc_detail = $("#de_pre_check_desc_detail").val();
    var BKDAllow = (checkBox.checkStat("de_pre_check_backdate_allow") == true) ? "Y" : "N";
    var NKDAllow = (checkBox.checkStat("de_pre_check_nextwkd_allow") == true) ? "Y" : "N";
    if (checkSql == "") {
        goAlert.alertErroTo("de_pre_check_sql_script", "Pre-Check Creation Error", "Pre-Check SQL Script must be provided.");
        return false
    };
    if (querySql == "") {
        goAlert.alertErroTo("de_pre_check_query_script", "Pre-Check Creation Error", "Pre-Check Query Script must be provided.");
        return false
    };
    if (desc == "") {
        goAlert.alertErroTo("de_pre_check_desc", "Pre-Check Creation Error", "Pre-Check Description must be provided.");
        return false
    };
    var xmlObj = {
        Type: "Update",
        PreCode:pre_code,
        CheckSql: checkSql,
        QuerySql: querySql,
        Desc: desc,
        DetailDesc: desc_detail,
        BKDAllow: BKDAllow,
        NKDAllow: NKDAllow
    };
    objDataPreCheck = xmlObj;
    if (modals.ConfirmShowAgain("mdconfirmupdateprecheck") == true) {
        modals.Confirm("Update Pre-Check", "Are you sure to update this Pre-Check?", "N", "Yes", "onclick", "fnUpdatePreCheckCommit()", "mdconfirmupdateprecheck");
    }
    else {
        fnUpdatePreCheckCommit();
    };
};
function fnUpdatePreCheckCommit() {
    modals.CloseConfirm();
    var xmlData = stringCreate.toXML("PreCheckHandler", objDataPreCheck).End();
    myRequest.Execute(v_dePreCheckHandlerWs, { xmlData: xmlData }, fnDePreCheckUpdateCallBack, "Processing...");
};
var pre_check_action;
function fnGetPreCheckEnableDisableConfirm(types) {
    objDataPreCheck = {};
    pre_check_action = types;
    var objData = [];
    objData = table.GetValueSelected("de_pre_check_tbl");
    if (objData.length == 0) {
        goAlert.alertError("Pre-Check " + types+" Error", "No Code selected.")
        return false;
    };
    var pre_code = stringCreate.FromObject(objData);
    var xmlObj = {
        Type: types,
        PreCode: pre_code,
        CheckSql: "",
        QuerySql: "",
        Desc: "",
        DetailDesc: "",
        BKDAllow: "",
        NKDAllow: ""
    };
    objDataPreCheck = xmlObj;
    var conprehandlermd = "mdconfirmprechechandler" + types;
    if (modals.ConfirmShowAgain(conprehandlermd) == true) {
        modals.Confirm(types + " Pre-Check", "Are you sure to " + types.toLowerCase() + " selected code?", "N", "Yes", "onclick", "fnGetPreCheckEnableDisableCommit()", conprehandlermd);
    }
    else {
        fnGetPreCheckEnableDisableCommit();
    };
};
function fnGetPreCheckEnableDisableCommit() {
    modals.CloseConfirm();
    var xmlData = stringCreate.toXML("PreCheckHandler", objDataPreCheck).End();
    myRequest.Execute(v_dePreCheckHandlerWs, { xmlData: xmlData }, fnDePreCheckHandlerCallBack, "Processing...");
};
function fnOpenModalCustomise() {
    var objCode = [];
    objCode = table.GetValueSelected("de_pre_check_tbl");
    if (objCode.length == 0) {
        goAlert.alertError("Customise Error", "No Codes selected.");
        return false;
    };
    var codes = stringCreate.FromObject(objCode);
    element.inputValue("de_pre_check_custo_codes", codes);
    modals.Open("mdCustoPreCheckCodes");
    setTimeout(function () {
        selectionStyle.MultipleInlineRefresh("de_pre_check_custo_batch_types");
        if ($("#de_pre_check_custo_batch_types option").length == 1) {
            $("#de_pre_check_custo_batch_types option:eq(0)").prop("selected", true)
            selectionStyle.MultipleInlineRefresh("de_pre_check_custo_batch_types");
        };
    }, 1000);
    fnDePreCheckGetAllExlude();
};
function fnDePreCheckGetAllExlude(process) {
    if (process == undefined) {
        myRequest.Execute(v_dePreCheckGetAllExcludeWs, undefined, fnGetAllPreCheckExcludedCallBack);
    }
    else {
        myRequest.Execute(v_dePreCheckGetAllExcludeWs, undefined, fnGetAllPreCheckExcludedCallBack,"Processing...");
    };
};
function fnDePreCheckCustoExclAsChange(exclas) {
    if (exclas == "permanent") {
        element.setDisable("de_pre_check_custo_perioddate");
    }
    else {
        element.setEnable("de_pre_check_custo_perioddate");
    };
};
function fnDePreCheckConfirmExclude() {
    objDataPreCheck = {};
    var codes = $("#de_pre_check_custo_codes").val();
    var objBatchType = $("#de_pre_check_custo_batch_types").val();
    if (objBatchType.length == 0) {
        goAlert.alertErroTo("de_pre_check_custo_batch_types", "Exclude Error", "No Batch Types selected.","change");
        return false;
    };
    var exBatchTypes = stringCreate.FromObject(objBatchType);
    var exclAs = $("#de_pre_check_custo_excl_as").val();
    var exExpiredDate = "";
    if (exclAs == "period") {
        exExpiredDate = $("#de_pre_check_custo_perioddate").val();
        if (exExpiredDate == "") {
            goAlert.alertErroTo("de_pre_check_custo_perioddate", "Exclude Error", "Expired Date should be chose");
            return false;
        };
    };
    var exRequester = $("#de_pre_check_custo_requester").val();
    if (exRequester == "") {
        goAlert.alertErroTo("de_pre_check_custo_requester", "Exclude Error", "Requester should be selected","change");
        return false;
    };
    var exReason = $("#de_pre_check_custo_reason").val();
    if (exReason == "") {
        goAlert.alertErroTo("de_pre_check_custo_reason", "Exclude Error", "Reason should be provided");
        return false;
    };
    exReason = exReason + " [Recorded By: " + userfullname + "]";
    var xmlObj = {
        Type: "Exclude",
        PreCode: codes,
        CheckSql: "",
        QuerySql: "",
        Desc: "",
        DetailDesc: "",
        BKDAllow: "",
        NKDAllow: "",
        BatchTypes: exBatchTypes,
        ExcludeAs: exclAs,
        ExExpDate: exExpiredDate,
        ExRequester: exRequester,
        ExReason: exReason
    };
    objDataPreCheck = xmlObj;
    if (modals.ConfirmShowAgain("mddeprecheckcusto") == true) {
        modals.Confirm("Pre-Check Customise", "Are you sure to exclude select Codes from selected Batch Types?", "N", "Yes", "onclick", "fnDePreCheckCommitExclude()", "mddeprecheckcusto");
    }
    else {
        fnDePreCheckCommitExclude();
    };
};
function fnDePreCheckCommitExclude() {
    modals.CloseConfirm();
    var xmlData = stringCreate.toXML("PreCheckHandler", objDataPreCheck).End();
    myRequest.Execute(v_dePreCheckHandlerWs, { xmlData: xmlData }, fnDePreCheckCustoCallBack, "Processing...");
};
function fnDePreCheckConfirmRemoveExcl() {
    var objExCode = [];
    objExCode = table.GetValueSelected("de_pre_check_excluded_tbl");
    if (objExCode.length == 0) {
        goAlert.alertError("Remove Excluded Code Error", "No Code selected.");
        return false;
    };
    if (modals.ConfirmShowAgain("mdremoveexcludeprecheck") == true) {
        modals.Confirm("Remove Excluded Code", "Are you sure to remove selected Codes?", "N", "Yes", "onclick", "fnDePreCheckCommitRemoveExcl()", "mdremoveexcludeprecheck");
    }
    else {
        fnDePreCheckCommitRemoveExcl();
    };
};
function fnDePreCheckCommitRemoveExcl() {
    modals.CloseConfirm();
    var objExCode = [];
    objExCode = table.GetValueSelected("de_pre_check_excluded_tbl");
    var codes = stringCreate.FromObject(objExCode);
    var xmlObj = {
        Type: "RemoveExcl",
        PreCode: codes,
        CheckSql: "",
        QuerySql: "",
        Desc: "",
        DetailDesc: "",
        BKDAllow: "",
        NKDAllow: ""
    };
    var xmlData = stringCreate.toXML("PreCheckHandler", xmlObj).End();
    myRequest.Execute(v_dePreCheckHandlerWs, { xmlData: xmlData }, fnDePreCheckRemoveExclCallBack, "Processing...");
};