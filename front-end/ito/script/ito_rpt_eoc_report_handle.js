/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
var v_current_rpt_eoc_date;

function fnCallBackRptEoCFirstLoad(data) {
    if (data.status == "1") {
        
        element.inputValue("rpt_eoc_tye_name", data.eoc_type);
        element.inputValue("rpt_eoc_report_date", data.eoc_report_date);
        element.inputValue("rpt_eoc_report_comp_pct", data.eoc_report_comp_pct);
        element.inputValue("rpt_eoc_duration_rpt_date_in", data.eoc_report_date);
        v_current_rpt_eoc_date = data.eoc_report_date;
        var option_steps = '<option value=""></option>';
        var option_branches = '<option value=""></option>';
        var option_resources = '<option value=""></option>';
        var option_storage = '<option value=""></option>';
        var option_branch_failure = '<option value=""></option>';
        v_step_auto = [];
        $.each(data.eoc_steps, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.step_no);
            }
            if (i == 0) {
               
                option_steps = '<option value=""></option>';
                option_steps = option_steps + '<option value="' + item.step_no + '">' + item.step_no + " - " + item.step_name + '</option>';
            }
            else {
                option_steps = option_steps + '<option value="' + item.step_no + '">' + item.step_no + " - " + item.step_name + '</option>';
            }
            
        });
        
        $.each(data.branches, function (i, item) {
            if (i == 0) {
                option_branches = '<option value=""></option>';
                option_branches = option_branches + '<option value="' + item.branch_code + '">' + item.branch_code + '</option>';
            }
            else {
                option_branches = option_branches + '<option value="' + item.branch_code + '">' + item.branch_code + '</option>';
            }

        });
        $.each(data.resources, function (i, item) {
            if (i == 0) {
                option_resources = '<option value=""></option>';
                option_resources = option_resources + '<option value="' + item.resource_id + '">' + item.resource_id + " - " + item.resource_name + '</option>';
            }
            else {
                option_resources = option_resources + '<option value="' + item.resource_id + '">' + item.resource_id + " - " + item.resource_name + '</option>';
            }

        });
        $.each(data.storages, function (i, item) {
            if (i == 0) {
                option_storage = '<option value=""></option>';
                option_storage = option_storage + '<option value="' + item.storage_id + '">' + item.storage_id + " - " + item.storage_name + '</option>';
            }
            else {
                option_storage = option_storage + '<option value="' + item.storage_id + '">' + item.storage_id + " - " + item.storage_name + '</option>';
            }

        });
        $.each(data.failure_branches, function (i, item) {
            if (i == 0) {
                option_branch_failure = '<option value=""></option>';
                option_branch_failure = option_branch_failure + '<option value="' + item.branch_code + '">' + item.branch_code + '</option>';
            }
            else {
                option_branch_failure = option_branch_failure + '<option value="' + item.branch_code + '">' + item.branch_code + '</option>';
            }
        });
        selectionStyle.LiveSearch("eoc_duration_step_sl", option_steps);
        selectionStyle.LiveSearch("rpt_eoc_pending_br_sl", option_branches);
        selectionStyle.LiveSearch("rpt_eoc_pending_up_br_sl", option_branches);
        selectionStyle.LiveSearch("rpt_eoc_resources_sl", option_resources);
        selectionStyle.LiveSearch("rpt_eoc_storage_sl", option_storage);
        selectionStyle.LiveSearch("rpt_eoc_faiure_branch_sl", option_branch_failure);
        var data = { report_date: data.eoc_report_date }
        CallAPI.Go(v_rpt_eoc_data_first_load, data, fnCallBankRptEoDDataFirstLoad,"Fetching Data...");
        setInterval(function () { fnIntervalGetPct(v_current_rpt_eoc_date); }, 30000);
    }
    else {
        goAlert.alertError("Fetch Data Failed", data.message);
    }
}
function fnCallBankRptEoDDataFirstLoad(data) {
    if (data.status == "1") {
        dataTable.ApplyJsonData("rpt_eoc_duration_tbl", data.data.step_duration);
        dataTable.ApplyJsonData("rpt_eoc_pending_tbl", data.data.pending_trn);
        dataTable.ApplyJsonData("rpt_eoc_resource_tbl", data.data.resource_utl);
        dataTable.ApplyJsonData("rpt_eoc_storage_tbl", data.data.storage_utl);
        dataTable.ApplyJsonData("rpt_eoc_failure_tbl", data.data.failure_branches);
        dataTable.ApplyJsonData("rpt_eoc_restorepoint_tbl", data.data.restorepoint);
    }
    else {
        goAlert.alertError("Fetching Data Failed".data.message);
    }
}
function fnCallBackInsertDuration(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Saving EoC Duration", data.message);
        $("#eoc_duration_step_sl option[value='" + v_saved_step_no + "']").remove();
        selectionStyle.LiveSearchRefresh("eoc_duration_step_sl");

        fnRefreshEoDDataDuration();

    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackDataDuration(data) {
    if (data.status == "1") {
        
        dataTable.ApplyJsonData("rpt_eoc_duration_tbl", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnCallBackRptEoCCompPct(data) {
    if (data.status == "1") {
        element.inputValue("rpt_eoc_report_comp_pct", data.eoc_report_comp_pct);
        element.inputValue("rpt_eoc_report_total_br_pulled_gl", data.total_br_pulled_gl);
    }
    else {
        console.log("Get Completed EoC Percentage: " + data.message);
    }
}
function fnCallBackRptGetAllSteps(data) {
    if (data.status == "1") {
        var option_steps = '<option value=""></option>';
        v_step_auto = [];
        $.each(data.data, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.step_no);
            }
            if (i == 0) {
                option_steps = '<option value=""></option>';
                option_steps = option_steps + '<option value="' + item.step_no + '">' + item.step_no + " - " + item.step_name + '</option>';
            }
            else {
                option_steps = option_steps + '<option value="' + item.step_no + '">' + item.step_no + " - " + item.step_name + '</option>';
            }

        });
        
        selectionStyle.LiveSearch("eoc_duration_step_sl", option_steps);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCStepDuration(data) {
    if (data.status == "1") {
        element.inputValue("rpt_eoc_duration_start_time_update_in", (data.data.start_time == "null") ? "" : data.data.start_time);
        element.inputValue("rpt_eoc_duration_end_time_update_in", (data.data.end_time == "null") ? "" : data.data.end_time);
        modals.Open("rpt_eoc_durction_update_md");
        goAlert.alertInfo("Report Duration", data.message);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCStepDurationByStepNo(data) {
    if (data.status == "1") {
        element.inputValue("eoc_duration_start_time_in", (data.data.start_time == "null") ? "" : data.data.start_time);
        element.inputValue("eoc_duration_end_time_in", (data.data.end_time == "null") ? "" : data.data.end_time);
    }
}
function fnCallBackRptEoCUpdateStepDuration(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Update EoC Step Duration", data.message);
        
        fnRefreshEoDDataDuration();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
        modals.Open("rpt_eoc_durction_update_md");
    }
}
function fnCallBackRptEoCDeleteStepDuration(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete EoC Step Duration", data.message);

        fnRefreshEoDDataDuration();
    }
    else {
        goAlert.alertError("Delete EoC Step Duration", data.message);
        
    }
}
function fnCallBackRptEoCInsertPending(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Saving Pending Transaction", data.message);
        fnRefreshEoDDataPending();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCPendingDataUpdate(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Update Pending Report", data.message);
        $("#rpt_eoc_pending_issue_up_sl").val(data.data.issue_category).change();
        $("#rpt_eoc_pending_up_br_sl").val(data.data.branch_code).change();
        element.inputValue("rpt_eoc_pending_makerid_up_in", data.data.maker_id);
        element.inputValue("rpt_eoc_pending_module_up_in", data.data.module);
        element.inputValue("rpt_eoc_pending_functionid_up_in", data.data.function_id);
        $("#rpt_eoc_pending_resolved_type_up_sl").val(data.data.resolved_type).change();
        editor.addCode("rpt_eoc_pending_resolve_detail_up_in", (data.data.resolved_detail == "null") ? "" : data.data.resolved_detail);
        modals.Open("rpt_eoc_pending_update_md");
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCUpdatePending(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Update Pending Report", data.message);
        fnRefreshEoDDataPending();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
        modals.Open("rpt_eoc_pending_update_md");
    }
}
function fnCallBackDataPending(data) {
    if (data.status == "1") {
        dataTable.ApplyJsonData("rpt_eoc_pending_tbl", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCDeletePending(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Pending Report", data.message);
        fnRefreshEoDDataPending();
    }
    else {
        goAlert.alertError("Delete Pending Report", data.message);

    }
}
function fnCallBackDataResource(data) {
    if (data.status == "1") {

        dataTable.ApplyJsonData("rpt_eoc_resource_tbl", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCInsertResource(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Saving Resource Utilization", data.message);
        $("#rpt_eoc_resources_sl option[value='" + v_resource_id + "']").remove();
        fnRefreshEoDResourceData();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRefreshResource(data) {
    if (data.status == "1") {
        var option_resources = '<option value=""></option>';;
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_resources = '<option value=""></option>';
                option_resources = option_resources + '<option value="' + item.resource_id + '">' + item.resource_id + " - " + item.resource_name + '</option>';
            }
            else {
                option_resources = option_resources + '<option value="' + item.resource_id + '">' + item.resource_id + " - " + item.resource_name + '</option>';
            }

        });
        selectionStyle.LiveSearch("rpt_eoc_resources_sl", option_resources);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCDeleteResource(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Resource", data.message);

        fnRefreshEoDResourceData();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);

    }
}
function fnCallBackRptEoCResourceDataUpdate(data) {
    if (data.status == "1") {
        element.inputValue("rpt_eoc_resource_min_mem_used_up_in", data.data.min_used_memory);
        element.inputValue("rpt_eoc_resource_max_mem_used_up_in", data.data.max_used_memory);
        element.inputValue("rpt_eoc_resource_min_cpu_used_up_in", data.data.min_used_cpu);
        element.inputValue("rpt_eoc_resource_max_cpu_used_up_in", data.data.max_used_cpu);
        modals.Open("rpt_eoc_resource_update_md");
        
    }
    else {
        goAlert.alertError("Processing Failed",data.message);
    }
}
function fnCallBackRptEoCUpdateResource(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Update Resource Utilization", data.message);
        fnRefreshEoDResourceData();
    }
    else {
        modals.Open("rpt_eoc_resource_update_md");
        goAlert.alertError("Processing Failed", data.message);

    }
}
function fnCallBackRptEoCInsertStorage(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Saving Storage Utilization", data.message);
        $("#rpt_eoc_storage_sl option[value='" + v_storage_id + "']").remove();
        fnRefreshEoDStorageData();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);

    }
}
function fnCallBackRptEoCStorageRefresh(data) {
    if (data.status == "1") {
        var option_storage = '<option value=""></option>';
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_storage = '<option value=""></option>';
                option_storage = option_storage + '<option value="' + item.storage_id + '">' + item.storage_id + " - " + item.storage_name + '</option>';
            }
            else {
                option_storage = option_storage + '<option value="' + item.storage_id + '">' + item.storage_id + " - " + item.storage_name + '</option>';
            }

        });
        selectionStyle.LiveSearch("rpt_eoc_storage_sl", option_storage);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackDataStorage(data) {
    if (data.status == "1") {

        dataTable.ApplyJsonData("rpt_eoc_storage_tbl", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCStorageeDataUpdate(data) {
    if (data.status == "1") {
        element.inputValue("rpt_eoc_storage_total_size_up_in", data.data.total_size);
        element.inputValue("rpt_eoc_storage_used_size_up_in", data.data.used_size);
        modals.Open("rpt_eoc_storage_update_md");
        
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCUpdateStorage(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Update Storage Utilization", data.message);
        fnRefreshEoDStorageData();
    }
    else {
        modals.Open("rpt_eoc_storage_update_md");
        goAlert.alertError("Processing Failed", data.message);

    }
}
function fnCallBackRptEoCDeleteStorage(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Storage", data.message);

        fnRefreshEoDStorageData();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);

    }
}
function fnCallBackRptEoCInsertFailureBranch(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Saving Failure Branch", data.message);
        fnRefreshEoDFailureData();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);

    }
}
function fnCallBackRefreshBranchFailure(data) {
    if (data.status == "1") {
        var option_branch_failure = '<option value=""></option>';
        
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_branch_failure = '<option value=""></option>';
                option_branch_failure = option_branch_failure + '<option value="' + item.branch_code + '">' + item.branch_code + '</option>';
            }
            else {
                option_branch_failure = option_branch_failure + '<option value="' + item.branch_code + '">' + item.branch_code + '</option>';
            }
        });
        
        selectionStyle.LiveSearch("rpt_eoc_faiure_branch_sl", option_branch_failure);
    }
    
}
function fnCallBackDataEoCFailure(data) {
    if (data.status == "1") {
        dataTable.ApplyJsonData("rpt_eoc_failure_tbl", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCFailureDataByID(data) {
    if (data.status == "1") {
        element.inputValue("rpt_eoc_failure_sr_no_up_in", data.data.sr_no);
        element.inputValue("rpt_eoc_failure_root_cause_summary_up_in", data.data.root_cause_summary);
        $("#rpt_eoc_failure_resolved_stat_up_sl").val(data.data.resolved_stat);
        editor.addCode("rpt_eoc_failure_resolve_detail_up_in", data.data.resolved_detail_html);
        modals.Open("rpt_eoc_failure_update_md");
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackUpdateEoCFailure(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Update EoC Failure", data.message);
        fnRefreshEoDFailureData();
    }
    else {
        modals.Open("rpt_eoc_failure_update_md");
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackRptEoCDeleteFailure(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete EoC Failure", data.message);

        fnRefreshEoDFailureData();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);

    }
}
function fnCallBackDataEoCRestorePoint(data) {
    if (data.status == "1") {
        dataTable.ApplyJsonData("rpt_eoc_restorepoint_tbl", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}