/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function fnEoCMtrTargetStageChange(value) {
    element.inputValue("eoc_monitor_summary_stage", value);
}
function fnEoCMtrGetEoDSummary(ProcessIndecatorType) {
    var today_date = $("#eoc_monitor_today_date").val();
    var next_working_day_date = $("#eoc_monitor_nextworking_date").val();
    var target_stage = $("#eoc_monitor_conf_target_stage").val();
    if (today_date == "") {
        goAlert.alertErroTo("eoc_monitor_today_date", "Get EoD Summary", "Today Date must be selected");
        return false;
    }
    if (next_working_day_date == "") {
        goAlert.alertErroTo("eoc_monitor_nextworking_date", "Get EoD Summary", "Next Working Date must be selected");
        return false;
    }
    if (target_stage == "") {
        goAlert.alertErroTo("eoc_monitor_conf_target_stage", "Get EoD Summary", "Target Stage must be selected");
        return false;
    }
    var data = {
        today_date: today_date,
        nextworking_day_date: next_working_day_date,
        target_stage: target_stage
    }
    if (ProcessIndecatorType == "Process") {
        CallAPI.Go(v_eoc_mtr_eod_summary, data, fnEoCMtrGetEoDSummaryCallBack, "Processing...");
    }
    else {

        CallAPI.Go(v_eoc_mtr_eod_summary, data, fnEoCMtrGetEoDSummaryCallBack);
    }
}
var iAutoRefreshEoDSummaryInterval;
var iAutoRefreshEoDSummary=0;
function fnAutoRefreshEoDSummary() {

    if (iAutoRefreshEoDSummary == 0) {
        fnEoCMtrGetEoDSummary();
        iAutoRefreshEoDSummaryInterval = setInterval(function () { fnEoCMtrGetEoDSummary(); }, 10000);
        iAutoRefreshEoDSummary = 1;
        $("#icon_eoc_mo_auto_refresh").addClass("fa-spin")
    }
    else {
        clearInterval(iAutoRefreshEoDSummaryInterval);
        iAutoRefreshEoDSummary = 0;
        $("#icon_eoc_mo_auto_refresh").removeClass("fa-spin")
    }
}
function fnEoCMtrGetRunAbleBr(Process) {
    var today_date = $("#eoc_monitor_today_date").val();
    var target_stage = $("#eoc_monitor_conf_target_stage").val();
    if (today_date == "") {
        goAlert.alertErroTo("eoc_monitor_today_date", "Get EoD Summary", "Today Date must be selected");
        return false;
    }
    if (target_stage == "") {
        goAlert.alertErroTo("eoc_monitor_conf_target_stage", "Get EoD Summary", "Target Stage must be selected");
        return false;
    }
    var data = { target_stage: target_stage, today_date: today_date };
    if (Process === undefined) {
        CallAPI.Go(v_eoc_mtr_eod_runable_br, data, fnEoCMtrGetRunAbleCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_eoc_mtr_eod_runable_br, data, fnEoCMtrGetRunAbleCallBack);
    }
}
var iAutoRefreshRunAbleBrInterval;
var iAutoRefreshRunAbleBr = 0;
function fnAutoRefreshRunAbleBr() {

    if (iAutoRefreshRunAbleBr == 0) {
        fnEoCMtrGetRunAbleBr("Auto");
        iAutoRefreshRunAbleBrInterval = setInterval(function () { fnEoCMtrGetRunAbleBr("Auto"); }, 10000);
        iAutoRefreshRunAbleBr = 1;
        $("#icon_eoc_mo_auto_refresh_runable_br").addClass("fa-spin")
    }
    else {
        clearInterval(iAutoRefreshRunAbleBrInterval);
        iAutoRefreshRunAbleBr = 0;
        $("#icon_eoc_mo_auto_refresh_runable_br").removeClass("fa-spin")
    }
}
function fnEoCMtrGetFinEoDMBr(Process) {
    var today_date = $("#eoc_monitor_today_date").val();
    var next_working_day_date = $("#eoc_monitor_nextworking_date").val();
    if (today_date == "") {
        goAlert.alertErroTo("eoc_monitor_today_date", "Get EoD Summary", "Today Date must be selected");
        return false;
    }
    if (next_working_day_date == "") {
        goAlert.alertErroTo("eoc_monitor_nextworking_date", "Get EoD Summary", "Next Working Date must be selected");
        return false;
    }
    var data = {
        today_date: today_date,
        nextworking_day_date: next_working_day_date
    }
    if (Process === undefined) {
        CallAPI.Go(v_eoc_mtr_eod_fin_eodm_br, data, fnEoCMtrGetFinEoDMBrCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_eoc_mtr_eod_fin_eodm_br, data, fnEoCMtrGetFinEoDMBrCallBack);
    }
}
var iAutoRefreshFinEoDMBrInterval;
var iAutoRefreshFinEoDMBr = 0;
function fnAutoRefreshFinEoDMBr() {

    if (iAutoRefreshFinEoDMBr == 0) {
        fnEoCMtrGetFinEoDMBr("Auto");
        iAutoRefreshFinEoDMBrInterval = setInterval(function () { fnEoCMtrGetFinEoDMBr("Auto"); }, 10000);
        iAutoRefreshFinEoDMBr = 1;
        $("#icon_eoc_mo_auto_refresh_fin_eodm_br").addClass("fa-spin")
    }
    else {
        clearInterval(iAutoRefreshFinEoDMBrInterval);
        iAutoRefreshFinEoDMBr = 0;
        $("#icon_eoc_mo_auto_refresh_fin_eodm_br").removeClass("fa-spin")
    }
}
function fnEoCMtrGetNotFinEoDMBr(Process) {
    
    var next_working_day_date = $("#eoc_monitor_nextworking_date").val();
    
    if (next_working_day_date == "") {
        goAlert.alertErroTo("eoc_monitor_nextworking_date", "Get EoD Summary", "Next Working Date must be selected");
        return false;
    }
    var data = {
        nextworking_day_date: next_working_day_date
    }
    if (Process === undefined) {
        CallAPI.Go(v_eoc_mtr_eod_not_fin_eodm_br, data, fnEoCMtrGetNotFinEoDMBrCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_eoc_mtr_eod_not_fin_eodm_br, data, fnEoCMtrGetNotFinEoDMBrCallBack);
    }
}
var iAutoRefreshNotFinEoDMBrInterval;
var iAutoRefreshNotFinEoDMBr = 0;
function fnAutoRefreshNotFinEoDMBr() {

    if (iAutoRefreshNotFinEoDMBr == 0) {
        fnEoCMtrGetNotFinEoDMBr("Auto");
        iAutoRefreshNotFinEoDMBrInterval = setInterval(function () { fnEoCMtrGetNotFinEoDMBr("Auto"); }, 10000);
        iAutoRefreshNotFinEoDMBr = 1;
        $("#icon_eoc_mo_auto_refresh_not_fin_eodm_br").addClass("fa-spin")
    }
    else {
        clearInterval(iAutoRefreshNotFinEoDMBrInterval);
        iAutoRefreshNotFinEoDMBr = 0;
        $("#icon_eoc_mo_auto_refresh_not_fin_eodm_br").removeClass("fa-spin")
    }
}
function fnEoCMtrGetFailedEoDMBr(Process) {

    var today_date = $("#eoc_monitor_today_date").val();
    var next_working_day_date = $("#eoc_monitor_nextworking_date").val();
    if (today_date == "") {
        goAlert.alertErroTo("eoc_monitor_today_date", "Get EoD Summary", "Today Date must be selected");
        return false;
    }
    if (next_working_day_date == "") {
        goAlert.alertErroTo("eoc_monitor_nextworking_date", "Get EoD Summary", "Next Working Date must be selected");
        return false;
    }
    var data = {
        today_date: today_date,
        nextworking_day_date: next_working_day_date
    }
    if (Process === undefined) {
        CallAPI.Go(v_eoc_mtr_eod_failed_eodm_br, data, fnEoCMtrGetFailedEoDMBrCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_eoc_mtr_eod_failed_eodm_br, data, fnEoCMtrGetFailedEoDMBrCallBack);
    }
}
var iAutoRefreshFailedEoDMBrInterval;
var iAutoRefreshFailedEoDMBr = 0;
function fnAutoRefreshFailedEoDMBr() {

    if (iAutoRefreshFailedEoDMBr == 0) {
        fnEoCMtrGetFailedEoDMBr("Auto");
        iAutoRefreshFailedEoDMBrInterval = setInterval(function () { fnEoCMtrGetFailedEoDMBr("Auto"); }, 10000);
        iAutoRefreshFailedEoDMBr = 1;
        $("#icon_eoc_mo_auto_refresh_failed_eodm_br").addClass("fa-spin")
    }
    else {
        clearInterval(iAutoRefreshFailedEoDMBrInterval);
        iAutoRefreshFailedEoDMBr = 0;
        $("#icon_eoc_mo_auto_refresh_failed_eodm_br").removeClass("fa-spin")
    }
}
function fnEoCMtrGetFinEoDBr(Process) {
    var today_date = $("#eoc_monitor_today_date").val();
    var target_stage = $("#eoc_monitor_conf_target_stage").val();
    if (today_date == "") {
        goAlert.alertErroTo("eoc_monitor_today_date", "Get EoD Summary", "Today Date must be selected");
        return false;
    }
    if (target_stage == "") {
        goAlert.alertErroTo("eoc_monitor_conf_target_stage", "Get EoD Summary", "Target Stage must be selected");
        return false;
    }
    var data = { target_stage: target_stage, today_date: today_date };
    if (Process === undefined) {
        CallAPI.Go(v_eoc_mtr_eod_fin_EoD_br, data, fnEoCMtrGetFinEoDBrCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_eoc_mtr_eod_fin_EoD_br, data, fnEoCMtrGetFinEoDBrCallBack);
    }
}
var iAutoRefreshFinEoDBrInterval;
var iAutoRefreshFinEoDBr = 0;
function fnAutoRefreshFinEoDBr() {

    if (iAutoRefreshFinEoDBr == 0) {
        fnEoCMtrGetFinEoDBr("Auto");
        iAutoRefreshFinEoDBrInterval = setInterval(function () { fnEoCMtrGetFinEoDBr("Auto"); }, 10000);
        iAutoRefreshFinEoDBr = 1;
        $("#icon_eoc_mo_auto_refresh_fin_eod_br").addClass("fa-spin")
    }
    else {
        clearInterval(iAutoRefreshFinEoDBrInterval);
        iAutoRefreshFinEoDBr = 0;
        $("#icon_eoc_mo_auto_refresh_fin_eod_br").removeClass("fa-spin")
    }
}
function fnEoCMtrGetSubmittedBr(Process) {
    if (Process === undefined) {
        CallAPI.Go(v_eoc_mtr_eod_submitted_br, undefined, fnEoCMtrGetSubmittedBrCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_eoc_mtr_eod_submitted_br, undefined, fnEoCMtrGetSubmittedBrCallBack);
    }
}
var iAutoRefreshSubmittedBrInterval;
var iAutoRefreshSubmittedBr = 0;
function fnAutoRefreshSubmittedBr() {

    if (iAutoRefreshSubmittedBr == 0) {
        fnEoCMtrGetSubmittedBr("Auto");
        iAutoRefreshSubmittedBrInterval = setInterval(function () { fnEoCMtrGetSubmittedBr("Auto"); }, 5000);
        iAutoRefreshSubmittedBr = 1;
        $("#icon_eoc_mo_auto_refresh_submitted_br").addClass("fa-spin")
    }
    else {
        clearInterval(iAutoRefreshSubmittedBrInterval);
        iAutoRefreshSubmittedBr = 0;
        $("#icon_eoc_mo_auto_refresh_submitted_br").removeClass("fa-spin")
    }
}
var isCkCBSTBS = 0;
function fnEoCMtrGetTablespace() {
    if (isCkCBSTBS == 0) {
        
        fnEoCMtrRefreshCBSTBS("Y");
    }
    else {
        modals.OpenStatic("modal_tablespace");
    }
    
}
function fnEoCMtrRefreshCBSTBS(process) {
    if (process === undefined) {
        CallAPI.Go(v_eoc_mtr_cbs_tbs, undefined, fnEoCMtrCBSTBSCallBack);
    }
    else {
        CallAPI.Go(v_eoc_mtr_cbs_tbs, undefined, fnEoCMtrCBSTBSCallBack, "Processing...");
    }
}
function fnEoCMtrGetDatafile() {
    var obj_tbs = [];
    obj_tbs = table.GetValueSelected("eoc_mo_tbl_cbs_tbs");
    if (obj_tbs.length == 0) {
        goAlert.alertError("Processing Failed", "Tablespace must be selected");
        return false;
    }
    if (obj_tbs.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var tbs_name = stringCreate.FromObject(obj_tbs);
    var data = { tablespace_name: tbs_name };
    CallAPI.Go(v_eoc_mtr_cbs_dbs, data, fnEoCMtrCBSDBSCallBack, "Processing...");
}
var isCkCBSDBSize = 0;
function fnEoCMtrGetCBSDBSize() {
    if (isCkCBSDBSize == 0) {
        
        fnEoCMtrRefreshCBSDBSize("Y");
    }
    else {
        modals.OpenStatic("modal_cbs_curr_size");
    }

}
function fnEoCMtrRefreshCBSDBSize(process) {
    if (process === undefined) {
        CallAPI.Go(v_eoc_mtr_cbs_db_size, undefined, fnEoCMtrCBSDBSizeCallBack);
    }
    else {
        CallAPI.Go(v_eoc_mtr_cbs_db_size, undefined, fnEoCMtrCBSDBSizeCallBack, "Processing...");
    }
}

//call model popup



//function fnContactGet() {

//    modals.OpenStatic("modal_contact");
//    CallAPI.Go(v_eoc_mtr_get_contact, undefined, fnEoCMtrGetContactCallBack, "Processing...");
     
//}
////call API
//function fnCheckContact() {
//    CallAPI.Go(v_eoc_mtr_get_contact, undefined, fnEoCMtrGetContactCallBack, "Processing...");
//}

//call model popup
//function fnPendingtrnGet() {
//    modals.OpenStatic("modal_pending");
//    CallAPI.Go(v_eoc_mtr_get_pending, undefined, fnEoCMtrGetPendingCallBack, "Processing...");
//}
//function fnMissmatchBalancetrnGet() {
//    modals.OpenStatic("modal_missmatch");
//    CallAPI.Go(v_eoc_mtr_get_MissmatchBalanc, undefined, fnEoCMtrGetMissmatchBalanceCallBack, "Processing...");
//}


//function fnPendingtrn() {
//    CallAPI.Go(v_eoc_mtr_get_pending, undefined, fnEoCMtrGetPendingCallBack, "Processing...");
//}
//function fnMissmatchBalancetrn() {
//    CallAPI.Go(v_eoc_mtr_get_MissmatchBalanc, undefined, fnEoCMtrGetMissmatchBalanceCallBack, "Processing...");
//}





var isCkContact = 0;
function fnContactGet() {
    if (isCkContact == 0) {

        fnCheckContact("Y");
    }
    else {
        modals.OpenStatic("modal_contact");
    }

}
function fnCheckContact(process) {
    
    if (process === undefined) {
        CallAPI.Go(v_eoc_mtr_get_contact, undefined, fnEoCMtrGetContactCallBack);
    }
    else {
        CallAPI.Go(v_eoc_mtr_get_contact, undefined, fnEoCMtrGetContactCallBack, "Processing...");
    }
}


//pending
var isCkPending = 0;
function fnPendingtrnGet() {
    if (isCkPending == 0) {

        fnPendingtrn("Y");
    }
    else {
        modals.OpenStatic("modal_pending");
    }

}
function fnPendingtrn(process) {

    if (process === undefined) {
        CallAPI.Go(v_eoc_mtr_get_pending, undefined, fnEoCMtrGetPendingCallBack);
    }
    else {
        CallAPI.Go(v_eoc_mtr_get_pending, undefined, fnEoCMtrGetPendingCallBack, "Processing...");
    }
}

//missmatch
var isCkMissmatch = 0;
function fnMissmatchBalancetrnGet() {
    if (isCkMissmatch == 0) {

        fnMissmatchBalancetrn("Y");
    }
    else {
        modals.OpenStatic("modal_missmatch");
    }

}
function fnMissmatchBalancetrn(process) {

    if (process === undefined) {
        CallAPI.Go(v_eoc_mtr_get_MissmatchBalanc, undefined, fnEoCMtrGetMissmatchBalanceCallBack);
    }
    else {
        CallAPI.Go(v_eoc_mtr_get_MissmatchBalanc, undefined, fnEoCMtrGetMissmatchBalanceCallBack, "Processing...");
    }
}