/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />




function fnrpteoctabchange(btn_attr) {
    if (btn_attr == "eoc_duration") {
        $("#rpt_eoc_btn_save").attr("onclick", "fnrpteocduractionsave()");
        $("#rpt_eoc_btn_new").attr("onclick", "fnrpteocduractionclear()");
    };
    if (btn_attr == "eoc_pending") {
        $("#rpt_eoc_btn_save").attr("onclick", "fnrpteocpendingsave()");
        $("#rpt_eoc_btn_new").attr("onclick", "fnrpteocpendingclear()");
    };
    if (btn_attr == "eoc_resources") {
        $("#rpt_eoc_btn_save").attr("onclick", "fnrpteocresourcessave()");
        $("#rpt_eoc_btn_new").attr("onclick", "fnrpteocresourceclear()");
    };
    if (btn_attr == "eoc_storage") {
        $("#rpt_eoc_btn_save").attr("onclick", "fnrpteocstoragesave()");
        $("#rpt_eoc_btn_new").attr("onclick", "fnrpteocstorageclear()");
    };
    if (btn_attr == "eoc_failure") {
        $("#rpt_eoc_btn_save").attr("onclick", "fnrpteocfailuresave()");
        $("#rpt_eoc_btn_new").attr("onclick", "fnrpteocfailureclear()");
    };
}

var v_rpt_pending_refresh = 0;
var v_rpt_resource_refresh = 0;
var v_rpt_storage_refresh = 0;
var v_rpt_eoc_failure_refresh = 0;

function fnrpteocreportlisttabchange(rpt_tab) {
    if (rpt_tab == "eoc_duration") {
        $("#rpt_eoc_listing_btn_refresh").attr("onclick", "fnRefreshEoDDataDuration('Y')");
        $("#rpt_eoc_listing_btn_update").attr("onclick", "fnOpenModelUpdateEoCDuration()");
        $("#rpt_eoc_listing_btn_delete").attr("onclick", "fnConfirmDeleteRptEoCStepDuration()");
        dataTable.Recal();
    }
    if (rpt_tab == "eoc_pending") {
        $("#rpt_eoc_listing_btn_refresh").attr("onclick", "fnRefreshEoDDataPending('Y')");
        $("#rpt_eoc_listing_btn_update").attr("onclick", "fnOpenModelUpdateEoCPending()");
        $("#rpt_eoc_listing_btn_delete").attr("onclick", "fnConfirmDeleteRptEoCPending()");
        dataTable.Recal();
    }
    if (rpt_tab == "eoc_resources") {
        $("#rpt_eoc_listing_btn_refresh").attr("onclick", "fnRefreshEoDResourceData('Y')");
        $("#rpt_eoc_listing_btn_update").attr("onclick", "fnOpenModelUpdateEoCResource()");
        $("#rpt_eoc_listing_btn_delete").attr("onclick", "fnConfirmDeleteRptEoCResource()");
        dataTable.Recal();
    }
    if (rpt_tab == "eoc_storage") {
        $("#rpt_eoc_listing_btn_refresh").attr("onclick", "fnRefreshEoDStorageData('Y')");
        $("#rpt_eoc_listing_btn_update").attr("onclick", "fnOpenModelUpdateEoCStorage()");
        $("#rpt_eoc_listing_btn_delete").attr("onclick", "fnConfirmDeleteRptEoCStorage()");
        dataTable.Recal();
    }
    if (rpt_tab == "eoc_failure") {

        $("#rpt_eoc_listing_btn_refresh").attr("onclick", "fnRefreshEoDFailureData('Y')");
        $("#rpt_eoc_listing_btn_update").attr("onclick", "fnOpenModelUpdateEoCFailure()");
        $("#rpt_eoc_listing_btn_delete").attr("onclick", "fnConfirmDeleteRptEoCFailure()");
        dataTable.Recal();
    }
    if (rpt_tab == "eoc_failure") {

        $("#rpt_eoc_listing_btn_refresh").attr("onclick", "fnRefreshEoDFailureData('Y')");
        $("#rpt_eoc_listing_btn_update").attr("onclick", "fnOpenModelUpdateEoCFailure()");
        $("#rpt_eoc_listing_btn_delete").attr("onclick", "fnConfirmDeleteRptEoCFailure()");
        dataTable.Recal();
    }
    if (rpt_tab == "eoc_restorepoint") {
        $("#rpt_eoc_listing_btn_refresh").attr("onclick", "fnRefreshEoDRestorePointData('Y')");
        $("#rpt_eoc_listing_btn_update").removeAttr("onclick");
        $("#rpt_eoc_listing_btn_delete").removeAttr("onclick");
        dataTable.Recal();
    }
}

var v_saved_step_no;
var v_step_auto = [];
function fnrpteocduractionclear() {

    $("#eoc_duration_step_sl").val("").change();
    element.inputValue("eoc_duration_start_time_in", "");
    element.inputValue("eoc_duration_end_time_in", "");
    element.inputValue("eoc_duration_nature_in", "");
}
function fnrpteocpendingclear() {
    $("#rpt_eoc_pending_br_sl").val("").change();
    element.inputValue("rpt_eoc_pending_makerid_in", "");
    element.inputValue("rpt_eoc_pending_module_in", "");
    element.inputValue("rpt_eoc_pending_functionid_in", "");
    $("#rpt_eoc_pending_resolved_type_sl").val("").change();
    editor.addCode("rpt_eoc_pending_resolve_detail_in", "");

}
function fnrpteocduractionsave() {
    var step_no = $("#eoc_duration_step_sl").val();
    var start_time = $("#eoc_duration_start_time_in").val();
    var end_time = $("#eoc_duration_end_time_in").val();

    if (step_no == "") {
        goAlert.alertErroTo("eoc_duration_step_sl", "Processing Failed", "Step number required select", "change");
        return false;
    }
    var is_auto = searchData.SearchNode(step_no, v_step_auto);

    if (start_time == "" && is_auto == "N") {
        goAlert.alertErroTo("eoc_duration_start_time_in", "Processing Failed", "Start Time must be choose");
        return false;
    }
    if (end_time == "" && is_auto == "N") {
        goAlert.alertErroTo("eoc_duration_end_time_in", "Processing Failed", "End Time must be choose");
        return false;
    }
    var token = localStorage.getItem("ito_token");
    var header = {
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*"
    };
    v_saved_step_no = step_no;
    var data = {
        step_no: step_no,
        start_time: start_time,
        end_time: end_time,
        completed_stat: "Y"
    };
    CallAPI.Go(v_rpt_eoc_insert_duration_endpoint, data, fnCallBackInsertDuration, "Processing...", header);
}
function fnRptEoCFillNatureStep(step_no) {

    element.inputValue("eoc_duration_start_time_in", "");
    element.inputValue("eoc_duration_end_time_in", "");
    element.inputValue("eoc_duration_nature_in", (searchData.SearchNode(step_no, v_step_auto) == "Y") ? "Automatically" : "Manually");
    if (step_no == "1") {
        var data = { step_no: step_no, report_date: v_current_rpt_eoc_date };
        CallAPI.Go(v_rpt_eoc_delete_step_duration_step_no, data, fnCallBackRptEoCStepDurationByStepNo, "Processing...");
    }

}
function fnIntervalGetPct(report_date) {
    var data = { report_date: report_date };
    CallAPI.Go(v_rpt_eoc_comp_pct, data, fnCallBackRptEoCCompPct);
}
function fnRefreshEoCSteps() {
    CallAPI.Go(v_rpt_eoc_all_step, undefined, fnCallBackRptGetAllSteps, "Processing...");
}
function fnRefreshEoDDataDuration(Processer) {
    var report_date = $("#rpt_eoc_duration_rpt_date_in").val();
    if (report_date == "") {
        goAlert.alertErroTo("rpt_eoc_duration_rpt_date_in", "Processing Failed", "Report Date must be selected");
        return false;
    };
    var data = { report_date: report_date };

    if (checkBox.checkStat("rpt_eoc_refresh_all_check") == true) {

        CallAPI.Go(v_rpt_eoc_data_first_load, data, fnCallBankRptEoDDataFirstLoad, "Processing...");
    }
    else {
        if (Processer === undefined) {
            CallAPI.Go(v_rpt_eoc_data_duration_endpoint, data, fnCallBackDataDuration);
        }
        else {
            CallAPI.Go(v_rpt_eoc_data_duration_endpoint, data, fnCallBackDataDuration, "Processing...");
        }
    }
    
}
function fnOpenModelUpdateEoCDuration() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_duration_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    };
    var report_id = report_id_obj[0];
    element.inputValue("rpt_eoc_duration_rpt_id_update", report_id)
    var data = { report_id: report_id };
    CallAPI.Go(v_rpt_eoc_step_duration, data, fnCallBackRptEoCStepDuration, "Processing...");
}
function fnConfirmUpdateRptEoCStepDuration() {
    var report_id = $("#rpt_eoc_duration_rpt_id_update").val();
    var start_time = $("#rpt_eoc_duration_start_time_update_in").val();
    var end_time = $("#rpt_eoc_duration_end_time_update_in").val();
    var completed = "Y";
    if (start_time == "") {
        goAlert.alertErroTo("rpt_eoc_duration_start_time_update_in", "Processing Failed", "Start Time must be not empty");
        return false;
    }
    if (end_time == "") {
        goAlert.alertErroTo("rpt_eoc_duration_end_time_update_in", "Processing Failed", "End Time must be not empty");
        return false;
    }


    if (modals.ConfirmShowAgain("rptconfupdatestepeoc") == true) {
        modals.Confirm("Update EoC Step Duration Confirm", "Are you sure to update report id " + report_id + " ?", "N", "Yes", "onclick", "fnSaveUpdateRptEoCStepDuration('" + report_id + "','" + start_time + "','" + end_time + "','" + completed + "')", "rptconfupdatestepeoc");
    }
    else {
        fnSaveUpdateRptEoCStepDuration(report_id, start_time, end_time, completed);
    }

}
function fnSaveUpdateRptEoCStepDuration(report_id, start_time, end_time, completed) {
    modals.CloseConfirm();
    modals.Close("rpt_eoc_durction_update_md");
    var data = {
        report_id: report_id,
        start_time: start_time,
        end_time: end_time,
        completed: completed
    }
    CallAPI.Go(v_rpt_eoc_update_step_duration, data, fnCallBackRptEoCUpdateStepDuration, "Processing...");
}
function fnConfirmDeleteRptEoCStepDuration() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_duration_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeletestepeoc") == true) {
        modals.Confirm("Delete EoC Step Duration Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "fnDeleteRptEoCStepDuration('" + report_ids + "')", "rptconfdeletestepeoc");
    }
    else {
        fnDeleteRptEoCStepDuration(report_ids);
    }
}
function fnDeleteRptEoCStepDuration(report_ids) {
    modals.CloseConfirm();
    var data = {
        report_type:"EOC_DURATION",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_delete_eoc_reports, data, fnCallBackRptEoCDeleteStepDuration, "Processing...");
}
function fnrpteocpendingsave() {
    var issue_category = $("#rpt_eoc_pending_issue_sl").val();
    var branch_code = $("#rpt_eoc_pending_br_sl").val();
    var maker_id = $("#rpt_eoc_pending_makerid_in").val();
    var module = $("#rpt_eoc_pending_module_in").val();
    var function_id = $("#rpt_eoc_pending_functionid_in").val();
    var resolved_type = $("#rpt_eoc_pending_resolved_type_sl").val();
    var resolved_detail = editor.getText("rpt_eoc_pending_resolve_detail_in");
    var resolved_detail_html = editor.getCode("rpt_eoc_pending_resolve_detail_in");
    if (resolved_detail == "") {
        resolved_detail_html = "";
    }

    if (issue_category == "") {
        goAlert.alertErroTo("rpt_eoc_pending_issue_sl", "Processing Failed", "Issue Category must be selected", "change");
        return false;
    }

    if (branch_code == "") {
        goAlert.alertErroTo("rpt_eoc_pending_br_sl", "Processing Failed", "Branche Code must be selected", "change");
        return false;
    }
    if (maker_id == "") {
        goAlert.alertErroTo("rpt_eoc_pending_makerid_in", "Processing Failed", "Maker ID must be input");
        return false;
    }
    if (module == "") {
        goAlert.alertErroTo("rpt_eoc_pending_module_in", "Processing Failed", "Pending Module must be input");
        return false;
    }
    if (function_id == "") {
        goAlert.alertErroTo("rpt_eoc_pending_functionid_in", "Processing Failed", "Function ID must be input");
        return false;
    }
    if (resolved_type == "") {
        goAlert.alertErroTo("rpt_eoc_pending_resolved_type_sl", "Processing Failed", "Resolved Type must be selected", "change");
        return false;
    }
    var maker_challenge = "";
    var maker_solution = "";
    var maker_solution_html = "";
    var resolved_stat = "Y";

    var data = {
        issue_category: issue_category,
        branch_code: branch_code,
        maker_id: maker_id,
        module: module,
        function_id: function_id,
        maker_challenge: maker_challenge,
        maker_solution: maker_solution,
        maker_solution_html: maker_solution_html,
        resolved_solution: resolved_type,
        resolved_detail: resolved_detail,
        resolved_detail_html: resolved_detail_html,
        resolved_stat: resolved_stat
    };
    CallAPI.Go(v_rpt_eoc_insert_pending, data, fnCallBackRptEoCInsertPending, "Processing...");
}

function fnOpenModelUpdateEoCPending() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_pending_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "Report ID must be selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_id = stringCreate.FromObject(report_id_obj);
    element.inputValue("rpt_eoc_pending_report_id_up_in", report_id);
    var data = { report_id: report_id };
    CallAPI.Go(v_rpt_eoc_pending_data_by_id, data, fnCallBackRptEoCPendingDataUpdate, "Processing");

}
function fnConfirmUpdateRptEoCPending() {
    var report_id = $("#rpt_eoc_pending_report_id_up_in").val();
    var issue_category = $("#rpt_eoc_pending_issue_up_sl").val();
    var branch_code = $("#rpt_eoc_pending_up_br_sl").val();
    var maker_id = $("#rpt_eoc_pending_makerid_up_in").val();
    var module = $("#rpt_eoc_pending_module_up_in").val();
    var function_id = $("#rpt_eoc_pending_functionid_up_in").val();
    var resolved_type = $("#rpt_eoc_pending_resolved_type_up_sl").val();
    var resolved_detail = editor.getText("rpt_eoc_pending_resolve_detail_up_in");
    var resolved_detail_html = editor.getCode("rpt_eoc_pending_resolve_detail_up_in");
    if (resolved_detail == "") {
        resolved_detail_html = "";
    }
    if (issue_category == "") {
        goAlert.alertErroTo("rpt_eoc_pending_up_br_sl", "Processing Failed", "Issue Category must be selected", "change");
        return false;
    }
    if (branch_code == "") {
        goAlert.alertErroTo("rpt_eoc_pending_up_br_sl", "Processing Failed", "Branche Code must be selected", "change");
        return false;
    }
    if (maker_id == "") {
        goAlert.alertErroTo("rpt_eoc_pending_makerid_up_in", "Processing Failed", "Maker ID must be input");
        return false;
    }
    if (module == "") {
        goAlert.alertErroTo("rpt_eoc_pending_module_up_in", "Processing Failed", "Pending Module must be input");
        return false;
    }
    if (function_id == "") {
        goAlert.alertErroTo("rpt_eoc_pending_functionid_up_in", "Processing Failed", "Function ID must be input");
        return false;
    }
    if (resolved_type == "") {
        goAlert.alertErroTo("rpt_eoc_pending_resolved_type_up_sl", "Processing Failed", "Resolved Type must be selected", "change");
        return false;
    }
    var maker_challenge = "";
    var maker_solution = "";
    var maker_solution_html = "";
    var resolved_stat = "Y";
    if (modals.ConfirmShowAgain("confrpteocupdatependingmd") == true) {

        modals.Confirm("Update Pending Report", "Are you sure to update pending report id " + report_id + " ?", "N", "Yes", "onclick", "fnUpdateRptEoCPending()", "confrpteocupdatependingmd");
    }
    else {

    }
}
function fnUpdateRptEoCPending() {
    var report_id = $("#rpt_eoc_pending_report_id_up_in").val();
    var issue_category = $("#rpt_eoc_pending_issue_up_sl").val();
    var branch_code = $("#rpt_eoc_pending_up_br_sl").val();
    var maker_id = $("#rpt_eoc_pending_makerid_up_in").val();
    var module = $("#rpt_eoc_pending_module_up_in").val();
    var function_id = $("#rpt_eoc_pending_functionid_up_in").val();
    var resolved_type = $("#rpt_eoc_pending_resolved_type_up_sl").val();
    var resolved_detail = editor.getText("rpt_eoc_pending_resolve_detail_up_in");
    var resolved_detail_html = editor.getCode("rpt_eoc_pending_resolve_detail_up_in");
    if (resolved_detail == "") {
        resolved_detail_html = "";
    }
    var maker_challenge = "";
    var maker_solution = "";
    var maker_solution_html = "";
    var resolved_stat = "Y";
    var data = {
        report_id: report_id,
        issue_category:issue_category,
        branch_code: branch_code,
        maker_id: maker_id,
        module: module,
        function_id: function_id,
        maker_chg: maker_challenge,
        maker_solution: maker_solution,
        maker_solution_html: maker_solution_html,
        resolved_type: resolved_type,
        resolved_solution: resolved_detail,
        resolved_solution_html: resolved_detail_html,
        resolved_stat: resolved_stat
    }
    modals.CloseConfirm();
    modals.Close("rpt_eoc_pending_update_md");
    CallAPI.Go(v_rpt_eoc_pending_update, data, fnCallBackRptEoCUpdatePending, "Processing...");
}
function fnRefreshEoDDataPending(Processer) {
    var report_date = $("#rpt_eoc_duration_rpt_date_in").val();
    if (report_date == "") {
        goAlert.alertErroTo("rpt_eoc_duration_rpt_date_in", "Processing Failed", "Report Date must be selected");
        return false;
    };
    var data = { report_date: report_date };
    if (checkBox.checkStat("rpt_eoc_refresh_all_check") == true) {

        CallAPI.Go(v_rpt_eoc_data_first_load, data, fnCallBankRptEoDDataFirstLoad, "Processing...");
    }
    else {
        if (Processer === undefined) {
            CallAPI.Go(v_rpt_eoc_pending_data_by_report_id, data, fnCallBackDataPending);
        }
        else {
            CallAPI.Go(v_rpt_eoc_pending_data_by_report_id, data, fnCallBackDataPending, "Processing...");
        }
    }
    
}
function fnConfirmDeleteRptEoCPending() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_pending_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeletependingrpt") == true) {
        modals.Confirm("Delete Pending Report Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "fnDeleteRptEoCPending('" + report_ids + "')", "rptconfdeletependingrpt");
    }
    else {
        fnDeleteRptEoCPending(report_ids);
    }
}
function fnDeleteRptEoCPending(report_ids) {
    var data = {
        report_type: "EOC_PENDING",
        report_id: report_ids
    };
    modals.CloseConfirm();
    CallAPI.Go(v_rpt_delete_eoc_reports, data, fnCallBackRptEoCDeletePending, "Processing...");
}
var v_resource_id;
function fnrpteocresourcessave() {
    var resource_id = $("#rpt_eoc_resources_sl").val();
    var min_mem_used = $("#rpt_eoc_resource_min_mem_used_in").val();
    var max_mem_used = $("#rpt_eoc_resource_max_mem_used_in").val();
    var min_cpu_used = $("#rpt_eoc_resource_min_cpu_used_in").val();
    var max_cpu_used = $("#rpt_eoc_resource_max_cpu_used_in").val();
    if (resource_id == "") {
        goAlert.alertErroTo("rpt_eoc_resources_sl", "Processing Failed", "Resource must be selected", "change");
        return false;
    }
    if (min_mem_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_min_mem_used_in", "Processing Failed", "Min Memory Used must be input");
        return false;
    }
    if (max_mem_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_max_mem_used_in", "Processing Failed", "Max Memory Used must be input");
        return false;
    }
    if (min_cpu_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_min_cpu_used_in", "Processing Failed", "Min CPU Used must be input");
        return false;
    }
    if (max_cpu_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_max_cpu_used_in", "Processing Failed", "Max CPU Used must be input");
        return false;
    }
    var data = {
        resource_id: resource_id,
        min_mem_used: min_mem_used,
        max_mem_used: max_mem_used,
        min_cpu_used: min_cpu_used,
        max_cpu_used: max_cpu_used
    }
    v_resource_id = resource_id;
    CallAPI.Go(v_rpt_insert_eoc_resource, data, fnCallBackRptEoCInsertResource, "Processing...");
}
function fnRefreshEoDResourceData(Processer) {
    var report_date = $("#rpt_eoc_duration_rpt_date_in").val();
    if (report_date == "") {
        goAlert.alertErroTo("rpt_eoc_duration_rpt_date_in", "Processing Failed", "Report Date must be selected");
        return false;
    };
    var data = { report_date: report_date };
    if (checkBox.checkStat("rpt_eoc_refresh_all_check") == true) {

        CallAPI.Go(v_rpt_eoc_data_first_load, data, fnCallBankRptEoDDataFirstLoad, "Processing...");
    }
    else {
        if (Processer === undefined) {
            CallAPI.Go(v_rpt_eoc_resource_date, data, fnCallBackDataResource);
        }
        else {
            CallAPI.Go(v_rpt_eoc_resource_date, data, fnCallBackDataResource, "Processing...");
        }
    }
}
function fnRefreshResource() {
    CallAPI.Go(v_rpt_eoc_refresh_resource, undefined, fnCallBackRefreshResource, "Processing...");
}
function fnrpteocresourceclear() {
    $("#rpt_eoc_resources_sl").val("").change();
    element.inputValue("rpt_eoc_resource_min_mem_used_in", "");
    element.inputValue("rpt_eoc_resource_max_mem_used_in", "");
    element.inputValue("rpt_eoc_resource_min_cpu_used_in", "");
    element.inputValue("rpt_eoc_resource_max_cpu_used_in", "");
}
function fnConfirmDeleteRptEoCResource() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_resource_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeleteresourceeoc") == true) {
        modals.Confirm("Delete Resource Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "fnDeleteRptEoCResource('" + report_ids + "')", "rptconfdeleteresourceeoc");
    }
    else {
        fnDeleteRptEoCResource(report_ids);
    }
}
function fnDeleteRptEoCResource(report_ids) {
    modals.CloseConfirm();
    var data = {
        report_type: "EOC_RESOURCE_UTL",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_delete_eoc_reports, data, fnCallBackRptEoCDeleteResource, "Processing...");
}
function fnOpenModelUpdateEoCResource() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_resource_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "Report ID must be selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_id = stringCreate.FromObject(report_id_obj);
    element.inputValue("rpt_eoc_resource_report_id_up_in", report_id);
    var data = { report_id: report_id };
    CallAPI.Go(v_rpt_eoc_get_resource_by_id, data, fnCallBackRptEoCResourceDataUpdate, "Processing");
    
}
function fnConfirmUpdateRptEoCResource() {
    
    var report_id = $("#rpt_eoc_resource_report_id_up_in").val();
    var min_mem_used = $("#rpt_eoc_resource_min_mem_used_up_in").val();
    var max_mem_used = $("#rpt_eoc_resource_max_mem_used_up_in").val();
    var min_cpu_used = $("#rpt_eoc_resource_min_cpu_used_up_in").val();
    var max_cpu_used = $("#rpt_eoc_resource_max_cpu_used_up_in").val();

    if (min_mem_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_min_mem_used_up_in", "Processing Failed", "Min Memory Used must be input");
        return false;
    }
    if (max_mem_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_max_mem_used_up_in", "Processing Failed", "Max Memory Used must be input");
        return false;
    }
    if (min_cpu_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_min_cpu_used_up_in", "Processing Failed", "Min CPU Used must be input");
        return false;
    }
    if (max_cpu_used == "") {
        goAlert.alertErroTo("rpt_eoc_resource_max_cpu_used_up_in", "Processing Failed", "Max CPU Used must be input");
        return false;
    }


    if (modals.ConfirmShowAgain("rptconfupdateresourcerpt") == true) {
        modals.Confirm("Update Resource Utilization Report Confirm", "Are you sure to update report id " + report_id + " ?", "N", "Yes", "onclick", "fnSaveUpdateRptEoCResource()", "rptconfupdateresourcerpt");
    }
    else {
        fnSaveUpdateRptEoCResource();
    }
}
function fnSaveUpdateRptEoCResource() {
    var report_id = $("#rpt_eoc_resource_report_id_up_in").val();
    var min_mem_used = $("#rpt_eoc_resource_min_mem_used_up_in").val();
    var max_mem_used = $("#rpt_eoc_resource_max_mem_used_up_in").val();
    var min_cpu_used = $("#rpt_eoc_resource_min_cpu_used_up_in").val();
    var max_cpu_used = $("#rpt_eoc_resource_max_cpu_used_up_in").val();
    var data = {
        report_id: report_id,
        min_used_memory: min_mem_used,
        max_used_memory: max_mem_used,
        min_used_cpu: min_cpu_used,
        max_used_cpu: max_cpu_used
    }
    modals.CloseConfirm();
    modals.Close("rpt_eoc_resource_update_md");
    CallAPI.Go(v_rpt_eoc_update_resource_utl, data, fnCallBackRptEoCUpdateResource, "Processing");
}
var v_storage_id;
function fnrpteocstoragesave() {
    var storage_id = $("#rpt_eoc_storage_sl").val();
    var total_size = $("#rpt_eoc_storage_total_size_in").val();
    var used_size = $("#rpt_eoc_storage_used_size_in").val();
    if (storage_id == "") {
        goAlert.alertErroTo("rpt_eoc_storage_sl", "Processing Failed", "Storage must be selected", "change");
        return false;
    }
    if (total_size == "") {
        goAlert.alertErroTo("rpt_eoc_storage_total_size_in", "Processing Failed", "Total Size must be input");
        return false;
    }
    if (used_size == "") {
        goAlert.alertErroTo("rpt_eoc_storage_used_size_in", "Processing Failed", "Used Size must be input");
        return false;
    }
    var total_size_mesu = $("#rpt_eoc_storage_total_size_mesu_sl").val();
    var used_size_mesu = $("#rpt_eoc_storage_used_size_mesu_sl").val();
    var data = {
        storage_id: storage_id,
        total_size: total_size,
        total_size_mesu: total_size_mesu,
        used_size: used_size,
        used_size_mesu: used_size_mesu
    };
    v_storage_id = storage_id;
    CallAPI.Go(v_rpt_eoc_insert_storage_utl, data, fnCallBackRptEoCInsertStorage, "Processing...");
}
function fnrpteocstorageclear() {
    $("#rpt_eoc_storage_sl").val("").change();
    $("#rpt_eoc_storage_total_size_mesu_sl").val("MB").change();
    $("#rpt_eoc_storage_used_size_mesu_sl").val("MB").change();
    element.inputValue("rpt_eoc_storage_total_size_in", "");
    element.inputValue("rpt_eoc_storage_used_size_in", "");
}
function fnRefreshStorageList() {
    CallAPI.Go(v_rpt_eoc_refresh_storage, undefined, fnCallBackRptEoCStorageRefresh, "Processing...");
}
function fnOpenModelUpdateEoCStorage() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_storage_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "Report ID must be selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_id = stringCreate.FromObject(report_id_obj);
    element.inputValue("rpt_eoc_storage_report_id_up_in", report_id);
    //modals.Open("rpt_eoc_storage_update_md");
    var data = {
        report_id: report_id
    }
    CallAPI.Go(v_rpt_eoc_get_storage_data_by_id, data, fnCallBackRptEoCStorageeDataUpdate, "Processing...");
}
function fnRefreshEoDStorageData(Processer) {
    var report_date = $("#rpt_eoc_duration_rpt_date_in").val();
    if (report_date == "") {
        goAlert.alertErroTo("rpt_eoc_duration_rpt_date_in", "Processing Failed", "Report Date must be selected");
        return false;
    };
    var data = { report_date: report_date };
    if (checkBox.checkStat("rpt_eoc_refresh_all_check") == true) {

        CallAPI.Go(v_rpt_eoc_data_first_load, data, fnCallBankRptEoDDataFirstLoad, "Processing...");
    }
    else {
        if (Processer === undefined) {
            CallAPI.Go(v_rpt_eoc_refresh_storage_data, data, fnCallBackDataStorage);
        }
        else {
            CallAPI.Go(v_rpt_eoc_refresh_storage_data, data, fnCallBackDataStorage, "Processing...");
        }
    }
}
function fnConfirmUpdateRptEoCStorage() {
    
    var total_size = $("#rpt_eoc_storage_total_size_up_in").val();
    var used_size = $("#rpt_eoc_storage_used_size_up_in").val();
    
    if (total_size == "") {
        goAlert.alertErroTo("rpt_eoc_storage_total_size_up_in", "Processing Failed", "Total Size must be input");
        return false;
    }
    if (used_size == "") {
        goAlert.alertErroTo("rpt_eoc_storage_used_size_up_in", "Processing Failed", "Used Size must be input");
        return false;
    }
    var report_id = $("#rpt_eoc_storage_report_id_up_in").val();
    if (modals.ConfirmShowAgain("rptconfupdatestoragerpt") == true) {
        modals.Confirm("Update Storage Utilization Report Confirm", "Are you sure to update report id " + report_id + " ?", "N", "Yes", "onclick", "fnSaveUpdateRptEoCStorage()", "rptconfupdatestoragerpt");
    }
    else {
        fnSaveUpdateRptEoCStorage();
    }
    
}
function fnSaveUpdateRptEoCStorage() {
    var report_id = $("#rpt_eoc_storage_report_id_up_in").val();
    var total_size = $("#rpt_eoc_storage_total_size_up_in").val();
    var used_size = $("#rpt_eoc_storage_used_size_up_in").val();
    var total_size_mesu = $("#rpt_eoc_storage_total_size_mesu_up_sl").val();
    var used_size_mesu = $("#rpt_eoc_storage_used_size_mesu_up_sl").val();
    var data = {
        report_id: report_id,
        total_size: total_size,
        total_size_mesu: total_size_mesu,
        used_size: used_size,
        used_size_mesu: used_size_mesu
    }
    modals.CloseConfirm();
    modals.Close("rpt_eoc_storage_update_md");
    CallAPI.Go(v_rpt_eoc_update_storage_utl, data, fnCallBackRptEoCUpdateStorage, "Processing...");
}
function fnConfirmDeleteRptEoCStorage() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_storage_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeletestorageeeoc") == true) {
        modals.Confirm("Delete Storage Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "fnDeleteRptEoCStorage('" + report_ids + "')", "rptconfdeletestorageeeoc");
    }
    else {
        fnDeleteRptEoCStorage(report_ids);
    }
}
function fnDeleteRptEoCStorage(report_ids) {
    modals.CloseConfirm();
    var data = {
        report_type: "EOC_STORAGE_UTL",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_delete_eoc_reports, data, fnCallBackRptEoCDeleteStorage, "Processing...");
}
function fnrpteocfailuresave() {
    var branch_code = $("#rpt_eoc_faiure_branch_sl").val();
    var eoc_ref_no = $("#rpt_eoc_failure_reference_in").val();
    var sr_no = $("#rpt_eoc_failure_sr_no_in").val();
    var root_cause_summary = $("#rpt_eoc_failure_root_cause_summary_in").val();
    var resolve_detail = editor.getText("rpt_eoc_failure_resolve_detail_in")
    var resolved_stat = $("#rpt_eoc_failure_resolved_stat_sl").val();
    if (branch_code == "") {
        goAlert.alertErroTo("rpt_eoc_faiure_branch_sl", "Processing Failed", "Branch Code must be selected", "change");
        return false;
    }
    if (eoc_ref_no == "") {
        goAlert.alertErroTo("rpt_eoc_failure_reference_in", "Processing Failed", "EoC Reference Number must be input");
        return false;
    }
    if (sr_no == "") {
        goAlert.alertErroTo("rpt_eoc_failure_sr_no_in", "Processing Failed", "SR Number must be input");
        return false;
    }
    if (root_cause_summary == "") {
        goAlert.alertErroTo("rpt_eoc_failure_root_cause_summary_in", "Processing Failed", "Root Cause Summary must be input");
        return false;
    }
    if (resolve_detail == "") {
        goAlert.alertErroTo("rpt_eoc_failure_resolve_detail_in", "Processing Failed", "Resolve Detail must be input");
        return false;
    }
    var resolve_detail_html;
    if (resolve_detail !== "") {
        resolve_detail_html = editor.getCode("rpt_eoc_failure_resolve_detail_in");
    }
    var data = {
        branch_code: branch_code,
        eoc_ref_no: eoc_ref_no,
        resolved_detail: resolve_detail,
        resolved_detail_html: resolve_detail_html,
        sr_no: sr_no,
        root_cause_summary: root_cause_summary,
        resolved_stat: resolved_stat
    }
    CallAPI.Go(v_rpt_eoc_insert_failure_branch, data, fnCallBackRptEoCInsertFailureBranch, "Processing...");
}
function fnrpteocfailureclear() {
    $("#rpt_eoc_faiure_branch_sl").val("").change();
    element.inputValue("rpt_eoc_failure_reference_in", "");
    element.inputValue("rpt_eoc_failure_sr_no_in", "");
    element.inputValue("rpt_eoc_failure_root_cause_summary_in", "");
    editor.addCode("rpt_eoc_failure_resolve_detail_in", "");
}
function fnRefreshBranchFailure() {
    CallAPI.Go(v_rpt_eoc_refresh_failure_branch, undefined, fnCallBackRefreshBranchFailure, "Processing...");
}
function fnRefreshEoDFailureData(Processer) {
    var report_date = $("#rpt_eoc_duration_rpt_date_in").val();
    if (report_date == "") {
        goAlert.alertErroTo("rpt_eoc_duration_rpt_date_in", "Processing Failed", "Report Date must be selected");
        return false;
    };
    var data = { report_date: report_date };
    if (checkBox.checkStat("rpt_eoc_refresh_all_check") == true) {

        CallAPI.Go(v_rpt_eoc_data_first_load, data, fnCallBankRptEoDDataFirstLoad, "Processing...");
    }
    else {
        if (Processer === undefined) {
            CallAPI.Go(v_rpt_eoc_refresh_failure_data, data, fnCallBackDataEoCFailure);
        }
        else {
            CallAPI.Go(v_rpt_eoc_refresh_failure_data, data, fnCallBackDataEoCFailure, "Processing...");
        }
    }
}
function fnOpenModelUpdateEoCFailure() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_failure_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "Report ID must be selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_id = stringCreate.FromObject(report_id_obj);
    element.inputValue("rpt_eoc_failure_report_id_up_in", report_id);
    var data = {
        report_id: report_id
    }
    CallAPI.Go(v_rpt_eoc_failure_data_by_id, data, fnCallBackRptEoCFailureDataByID, "Processing...");
}
function fnConfirmUpdateEoCFailure() {
    var sr_no = $("#rpt_eoc_failure_sr_no_up_in").val();
    var root_cause_summary = $("#rpt_eoc_failure_root_cause_summary_up_in").val();
    var resolved_detail = editor.getText("rpt_eoc_failure_resolve_detail_up_in");
    var resolved_detail_html = editor.getCode("rpt_eoc_failure_resolve_detail_up_in");
    if (sr_no == "") {
        goAlert.alertErroTo("rpt_eoc_failure_sr_no_up_in", "Processing Failed", "SR Number must be input");
        return false;
    }
    if (root_cause_summary == "") {
        goAlert.alertErroTo("rpt_eoc_failure_root_cause_summary_up_in", "Processing Failed", "Root Cause Summary must be input");
        return false;
    }
    if (resolved_detail == "") {
        goAlert.alertErroTo("rpt_eoc_failure_resolve_detail_up_in", "Processing Failed", "Resolve Detail must be input");
        return false;
    }
    var report_id = $("#rpt_eoc_failure_report_id_up_in").val();
    if (modals.ConfirmShowAgain("rptconfupdateeocfailure") == true) {
        modals.Confirm("Delete Storage Confirm", "Are you sure to update report id " + report_id + " ?", "N", "Yes", "onclick", "fnUpdateEoCFailure()", "rptconfupdateeocfailure");
    }
    else {
        fnUpdateEoCFailure();
    }
}
function fnUpdateEoCFailure() {
    var report_id = $("#rpt_eoc_failure_report_id_up_in").val();
    var sr_no = $("#rpt_eoc_failure_sr_no_up_in").val();
    var root_cause_summary = $("#rpt_eoc_failure_root_cause_summary_up_in").val();
    var resolved_detail = editor.getText("rpt_eoc_failure_resolve_detail_up_in");
    var resolved_detail_html = editor.getCode("rpt_eoc_failure_resolve_detail_up_in");
    var resolved_stat = $("#rpt_eoc_failure_resolved_stat_up_sl").val();
    var data = {
        report_id: report_id,
        sr_no: sr_no,
        root_cause_summary: root_cause_summary,
        resolved_stat: resolved_stat,
        resolved_detail: resolved_detail,
        resolved_detail_html: resolved_detail_html
    }
    modals.CloseConfirm();
    modals.Close("rpt_eoc_failure_update_md");
    CallAPI.Go(v_rpt_eoc_failure_update, data, fnCallBackUpdateEoCFailure, "Processing...");
}
function fnConfirmDeleteRptEoCFailure() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_eoc_failure_tbl");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeleteeocfailure") == true) {
        modals.Confirm("Delete Storage Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "fnDeleteRptEoCFailure('" + report_ids + "')", "rptconfdeleteeocfailure");
    }
    else {
        fnDeleteRptEoCFailure(report_ids);
    }
}
function fnDeleteRptEoCFailure(report_ids) {
    modals.CloseConfirm();
    var data = {
        report_type: "EOC_FAILURE",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_delete_eoc_reports, data, fnCallBackRptEoCDeleteFailure, "Processing...");
}
function fnRefreshEoDRestorePointData(Processer) {
    if (checkBox.checkStat("rpt_eoc_refresh_all_check") == true) {
        CallAPI.Go(v_rpt_eoc_data_first_load, undefined, fnCallBankRptEoDDataFirstLoad, "Processing...");
    }
    else {
        if (Processer === undefined) {
            CallAPI.Go(v_rpt_eoc_refresh_restorepoint_data, undefined, fnCallBackDataEoCRestorePoint);
        }
        else {
            CallAPI.Go(v_rpt_eoc_refresh_restorepoint_data, undefined, fnCallBackDataEoCRestorePoint, "Processing...");
        }
    }
}