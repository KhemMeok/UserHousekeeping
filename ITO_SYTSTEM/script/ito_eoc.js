/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

var sRealDebugStatus;
var sFcubParamCurrTab;
var debug_stat;
function fnFcubParamTabChange(tab_name) {
    var status = debug_stat;
    if (status == "1") {
        if (tab_name == "RealDebug") {            
            if (sRealDebugStatus == "N") {
                goShowHide.showOnDivAsInline("eoc_param_btn_enable_real_debug");
                goShowHide.hideOnDiv("eoc_param_btn_disable_real_debug");
                goShowHide.hideOnDiv(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
                goShowHide.showOnDivAsInline("eoc_param_btn_refresh");
                goShowHide.hideOnDiv("eoc_param_btn_check");
            };
            if (sRealDebugStatus == "Y") {
                goShowHide.showOnDivAsInline("eoc_param_btn_disable_real_debug");
                goShowHide.hideOnDiv("eoc_param_btn_enable_real_debug");
                goShowHide.hideOnDiv(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
                goShowHide.showOnDivAsInline("eoc_param_btn_refresh");
                goShowHide.hideOnDiv("eoc_param_btn_check");
            };
        };
        if (tab_name == "UserDebug") {

            goShowHide.showOnDivAsInline(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
            goShowHide.hideOnDiv(["eoc_param_btn_enable_real_debug", "eoc_param_btn_disable_real_debug"]);
            goShowHide.showOnDivAsInline("eoc_param_btn_check");
            goShowHide.hideOnDiv("eoc_param_btn_refresh");
        };
    }
    else {
        if (tab_name == "RealDebug") {
            goShowHide.hideOnDiv(["eoc_param_btn_disable_real_debug", "eoc_param_btn_enable_real_debug"]);
            goShowHide.hideOnDiv(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
        };
        if (tab_name == "UserDebug") {
            goShowHide.hideOnDiv(["eoc_param_btn_disable_real_debug", "eoc_param_btn_enable_real_debug"]);
            goShowHide.hideOnDiv(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
        };
    };
    sFcubParamCurrTab = tab_name;
};

function fnFcubParamRefresh() {
    myRequest.Execute(v_EoCParametersUrl, undefined, fnEoCParametersRefreshCB,"Loading...");
};
function fnConfirmFcubUpdateRealDebug(Value) {
    
    var vEnir_ID = $("#eoc_param_debug_Env").val();
    if (vEnir_ID == "") {
        goAlert.alertErroTo("eoc_param_real_debug_confirm", "Processing Failed", "System Enviroment must be select");
        return false;
    }
    else {
        modals.Open("eoc_param_real_debug_confirm");
        if (Value == "N") {
            element.inputValue("sp_eoc_param_read_debug", "disable");
            element.inputValue("eoc_param_confirm_md_title_real_debug", "Disable Real Debug");
        }
        else {
            element.inputValue("sp_eoc_param_read_debug", "enable");
            element.inputValue("eoc_param_confirm_md_title_real_debug", "Enable Real Debug");
        };
        $("#eoc_param_btn_confirm_update_real_debug").val(Value);
    };
    //myRequest.Execute(v_EoCParametersUrl, undefined, fnEoCParametersRefreshCB, "Loading...");
    
};
function fnFcubUpdateRealDebug(Value) {
    var vEnir_ID = $("#eoc_param_debug_Env").val();
    var data = { environment_id: vEnir_ID, enable: Value };
    modals.Close("eoc_param_real_debug_confirm");
   //myRequest.Execute(v_EoCUpdateRealDebug, { param_value: Value, updater: STAFF_ID }, fnFcubRealDebugCB, "Processing...");
    CallAPI.Go(v_fcubs_update_real_debug, data, fnFcubRealDebugCB, "Processing...");
};

function fnConfirmFcubUpdateUserDebug(Value) {
    var user_debug_id = $("#eoc_user_id_debug").val();
    var vEnir_ID = $("#eoc_param_debug_Env").val();
    if (user_debug_id == "") {
        goAlert.alertErroTo("eoc_user_id_debug", "Processing Failed", "User ID must be input");
        return false;
    }
    if (vEnir_ID == "") {
        goAlert.alertErroTo("eoc_param_real_debug_confirm", "Processing Failed", "System Enviroment must be select");
        return false;
    }
    modals.Open("eoc_param_user_debug_confirm");
    if (Value == "N") {
        element.inputValue("sp_eoc_param_user_debug", "disable");
        element.inputValue("eoc_param_confirm_md_title_user_debug", "Disable User Debug");
    }
    else {
        element.inputValue("sp_eoc_param_user_debug", "enable");
        element.inputValue("eoc_param_confirm_md_title_user_debug", "Enable User Debug");
    };
    $("#eoc_param_btn_confirm_update_user_debug").val(Value);
};

function fnFcubUpdateUserDebug(value) {
    var vEnir_ID = $("#eoc_param_debug_Env").val();
    var user_debug_id = $("#eoc_user_id_debug").val();
    var enable = value;
    if (vEnir_ID == "") {
        goAlert.alertErroTo("eoc_param_real_debug_confirm", "Processing Failed", "System Enviroment must be select");
        return false;
    }
    else {
        var data = { environment_id: vEnir_ID, user_id: user_debug_id, enable: enable };
    };
    modals.Close("eoc_param_user_debug_confirm");
    CallAPI.Go(v_fcubs_update_user_debug, data, fnFcubUserDebugCB, "Processing...");
}

function fnGetEnviromentSource(value) {
    var data = { environment_id: value };
    CallAPI.Go(v_fcubs_real_debug_stat, data, fnEoCParametersCB, "Loading..."); 
}

function fnResfreshRealDebugStat() {
    var vEnir_ID = $("#eoc_param_debug_Env").val();
    var data = { environment_id: vEnir_ID};
    CallAPI.Go(v_fcubs_real_debug_stat, data, fnEoCParametersCB, "Loading...")
};

function fnCheckUserDebugStat() {
    var vEnir_ID = $("#eoc_param_debug_Env").val();
    var user_debug_id = $("#eoc_user_id_debug").val();
    if (user_debug_id == "") {
        goAlert.alertErroTo("eoc_user_id_debug", "Processing Failed", "User ID must be input");
        return false;
    }
    if (vEnir_ID == "") {
        goAlert.alertErroTo("eoc_param_real_debug_confirm", "Processing Failed", "System Enviroment must be select");
        return false;
    }
    var data = { environment_id: vEnir_ID, user_id: user_debug_id };
    CallAPI.Go(v_fcubs_user_debug_stat, data, fnCallBackUserDebugStat, "Loading...")
};

function fnRefreshEoCParamlog() {
    var log_date = $("#eoc_param_log_date_in").val();
    var data = { Logs_Date: log_date };
    CallAPI.Go(v_fcubs_load_debug_logs, data, fncallbackEoCParamlog, "Loading...")
};

//function fnConfirmFcubUpdateElcm(Value) {
//    modals.Open("eoc_param_switch_elcm_confirm");
//    $("#eoc_param_btn_confirm_switch_elcm").val(Value);
//};


//function fnFcubUpdateElCM(Value) {
//    modals.Close("eoc_param_switch_elcm_confirm");
//    myRequest.Execute(v_EoCSwitchElcm, { active_site: Value, updater: STAFF_ID }, fnFcubElcmCB, "Processing...");
//};
//function fnConfirmFcubUpdateAmlWS(Value) {
//    modals.Open("eoc_param_switch_aml_ws_confirm");
//    $("#eoc_param_btn_confirm_switch_aml_ws").val(Value);
//};
//function fnFcubUpdateAmlWS(Value) {
//    modals.Close("eoc_param_switch_aml_ws_confirm");
//    myRequest.Execute(v_EoCSwitchAmlWs, { active_site: Value, updater: STAFF_ID }, fnFcubAmlWsCB, "Processing...");
//};
//function fnDataRestorePointRefresh() {
//    myRequest.Execute(v_EoCGetRestorePoint, undefined, fnEoCGetRestorePointCB,"Loading...");
//};
//function fnConfirmRestorePointCreate() {
//    modals.Open("eoc_restore_point_create_confirm");
//};
//function fnCreateRestorePoint() {
//    modals.Close("eoc_restore_point_create_confirm");
//    var create_type = $("#eoc_restore_point_create_type").val();
//    if (create_type == "NULL") {
//        goAlert.alertErroTo("eoc_restore_point_create_type", "Error", "Choose create type", "change");
//        return false;
//    }
//    else {
//        myRequest.Execute(v_EoCCreateRestorePoint, { create_type: create_type, creator: STAFF_ID }, fnCreateRestorePointCB, "Creating...");
//    };

//}
//Handoff
function EntereocflexFnSearchEnterHandoffTRN(event) {
    if (event.keyCode == 13) {
        fnSearchFcubHandoffFailed();
    };
};
function fnSearchFcubHandoffFailed(value) {
    var trn_ref = $("#eoc_flex_handoff_failed_trn_ref").val();
    if (trn_ref == "") {
        goAlert.alertErroTo("eoc_flex_handoff_failed_trn_ref", "Processing Failed", "Transaction Refference must be input", "input");
        return false;
    }
    var data = {
        trn_ref: trn_ref
    };
    if (value == 'N') {
        CallAPI.Go(v_eoc_flex_issue_handoff_tbl_listing, data, fnRefreshFcubHandoffFailedCallBack, undefined);
    }
    else {
        CallAPI.Go(v_eoc_flex_issue_handoff_tbl_listing, data, fnRefreshFcubHandoffFailedCallBack, "Processing...");
    }
}
var data_FcubHandoffFailed_listing;
function fnRefreshFcubHandoffFailedCallBack(data) {
    window.localStorage.setItem('data_FcubHandoffFailed_listing', data);
    data_FcubHandoffFailed_listing = data;
    if (data.status == "1") {
        if (data.op_type == 'fix') {
            document.getElementById("eoc_flex_issue_handoff_btn_request").style.display = "none";
            document.getElementById("eoc_flex_issue_handoff_btn_fix").style.display = "";
            document.getElementById("eoc_flex_issue_handoff_btn_reject").style.display = "";
        }
        else {
            document.getElementById("eoc_flex_issue_handoff_btn_request").style.display = "";
            document.getElementById("eoc_flex_issue_handoff_btn_fix").style.display = "none";
            document.getElementById("eoc_flex_issue_handoff_btn_reject").style.display = "none";
        };
        var columns_trn = [{
            'data': 'trn_ref_no',
            'render': function (trn_ref_no) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + trn_ref_no + "' />"
            },
            'sortable': false
        },
        {
            'data': 'trn_ref_no'
        },
        {
            'data': 'txn_branch'
        },
        {
            'data': 'value_dt'
        },
        {
            'data': 'txn_date'
        },
        {
            'data': 'user_id'
        },
        {
            'data': 'error_cd',
            'render': function (data, type, row) {
                var error_cd_value = "'" + data + "'"; //add single quote to string
                var error_message = "'" + row['error_message'] + "'";;
                return '<div><a style="color:red" title="Get Error Message" href="#" onclick="fn_get_fcub_error_sms(' + error_message + ')">' + data + '</a></div>';
            }
        },
        {
            'data': 'txn_stat'
        },
        {
            'data': 'source_code'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("eoc_flex_issue_handoff_tbl_listing", columns_trn, data.data);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnConfirmFcubRequestFixHandoffFailed() {
    var entries_id_obj = [];
    entries_id_obj = table.GetValueSelected("eoc_flex_issue_handoff_tbl_listing");
    if (entries_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Entries ID Selected");
        return false;
    };
    if (entries_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    };
    var entries_ids = stringCreate.FromObject(entries_id_obj);
    if (modals.ConfirmShowAgain("fcubconfinserthandofffailed") == true) {
        modals.Confirm("Request Fix Handoff Entries Failed Confirm", "Are you sure to request fix trn_ref_no " + entries_id_obj + " ?", "N", "Yes", "onclick", "fnFcubRequestFixHandoffFailed('" + entries_id_obj + "')", "fcubconfinserthandofffailed");
    } else {
        fnFcubRequestFixHandoffFailed(entries_ids);
    }
}
function fnFcubRequestFixHandoffFailed(entries_ids) {
    modals.CloseConfirm();
    var data = {
        trn_ref_no: entries_ids
    }
    CallAPI.Go(v_eoc_flex_issue_req_fix_handoff, data, fnFcubReqFixHandoffFailedCallBack, "Processing...");
}
function fnFcubReqFixHandoffFailedCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Fix Handoff Entries", data.message);
        setTimeout(function () {
            fnSearchFcubHandoffFailed('N');
        }, 100);
        var log_date = $("#eoc_flex_issue_handoff_log_date").val();
        var data = {
            log_date: log_date
        };
        CallAPI.Go(v_eoc_flex_issue_handoff_tbl_log_listing, data, fnRefreshFcubHandoffLogListingCallBack, undefined);
    } else {
        goAlert.alertError("Fix Handoff Entries", data.message);
    }
}
function fnConfirmFcubFixHandoffFailed() {
    var entries_id_obj = [];
    entries_id_obj = table.GetValueSelected("eoc_flex_issue_handoff_tbl_listing");
    if (entries_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Entries ID Selected");
        return false;
    };
    if (entries_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    };
    var entries_ids = stringCreate.FromObject(entries_id_obj);
    if (modals.ConfirmShowAgain("fcubconffixhandofffailed") == true) {
        modals.Confirm("Fix Handoff Entries Failed Confirm", "Are you sure to fix trn_ref_no " + entries_id_obj + " ?", "N", "Yes", "onclick", "fnFcubFixHandoffFailed('" + entries_id_obj + "')", "fcubconffixhandofffailed");
    } else {
        fnFcubFixHandoffFailed(entries_ids);
    }
}
function fnFcubFixHandoffFailed(entries_ids) {
    modals.CloseConfirm();
    var data = {
        trn_ref_no: entries_ids
    }
    CallAPI.Go(v_eoc_flex_issue_fix_handoff, data, fnFcubFixHandoffFailedCallBack, "Processing...");
}
function fnFcubFixHandoffFailedCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Fix Handoff Entries", data.message);
        setTimeout(function () {
            fnSearchFcubHandoffFailed('N');
        }, 100);
        var log_date = $("#eoc_flex_issue_handoff_log_date").val();
        var data = {
            log_date: log_date
        };
        CallAPI.Go(v_eoc_flex_issue_handoff_tbl_log_listing, data, fnRefreshFcubHandoffLogListingCallBack, undefined);
    } else {
        goAlert.alertError("Fix Handoff Entries", data.message);
    }
}
function fnConfirmFcubRejectHandoffFailed() {
    var entries_id_obj = [];
    entries_id_obj = table.GetValueSelected("eoc_flex_issue_handoff_tbl_listing");
    if (entries_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Entries ID Selected");
        return false;
    };
    if (entries_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    };
    var entries_ids = stringCreate.FromObject(entries_id_obj);
    if (modals.ConfirmShowAgain("fcubconfrejecthandofffailed") == true) {
        modals.Confirm("Reject Handoff Entries Failed Confirm", "Are you sure to reject trn_ref_no " + entries_id_obj + " ?", "N", "Yes", "onclick", "fnFcubRejectHandoffFailed('" + entries_id_obj + "')", "fcubconfrejecthandofffailed");
    } else {
        fnFcubRejectHandoffFailed(entries_ids);
    }
}
function fnFcubRejectHandoffFailed(entries_ids) {
    modals.CloseConfirm();
    var data = {
        trn_ref_no: entries_ids
    }
    CallAPI.Go(v_eoc_flex_issue_reject_handoff, data, fnFcubRejectHandoffFailedCallBack, "Processing...");
}
function fnFcubRejectHandoffFailedCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Reject Handoff Entries", data.message);
        setTimeout(function () {
            fnSearchFcubHandoffFailed('N');
        }, 100);
        var log_date = $("#eoc_flex_issue_handoff_log_date").val();
        var data = {
            log_date: log_date
        };
        CallAPI.Go(v_eoc_flex_issue_handoff_tbl_log_listing, data, fnRefreshFcubHandoffLogListingCallBack, undefined);
    } else {
        goAlert.alertError("Fix Handoff Entries", data.message);
    }
}
function fnRefreshFcubHandoffLogListing() {
    var log_date = $("#eoc_flex_issue_handoff_log_date").val();
    var data = {
        log_date: log_date
    }
    CallAPI.Go(v_eoc_flex_issue_handoff_tbl_log_listing, data, fnRefreshFcubHandoffLogListingCallBack, "Processing...");
}
function fnRefreshFcubHandoffLogListingCallBack(data) {
    if (data.status == "1") {
        var columns_trn = [{
            'data': 'log_id',
            'render': function (log_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + log_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'log_id'
        },
        {
            'data': 'trn_ref_no'
        },
        {
            'data': 'txn_branch'
        },
        {
            'data': 'value_dt'
        },
        {
            'data': 'txn_dt'
        },
        {
            'data': 'user_id'
        },
        {
            'data': 'error_cd',
            'render': function (data, type, row) {
                var error_cd_value = "'" + data + "'"; //add single quote to string
                var error_message = "'" + row['error_message'] + "'";;
                return '<div><a style="color:red" title="Get Error Message" href="#" onclick="fn_get_fcub_error_sms(' + error_message + ')">' + data + '</a></div>';
            }
        },
        {
            'data': 'txn_stat'
        },
        {
            'data': 'source_code'
        },
        {
            'data': 'status'
        },
        {
            'data': 'request_by'
        },
        {
            'data': 'request_date'
        },
        {
            'data': 'resolve_by'
        },
        {
            'data': 'resolve_date'
        },
        {
            'data': 'reject_by'
        },
        {
            'data': 'reject_date'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("eoc_flex_issue_handoff_tbl_log_listing", columns_trn, data.data);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fn_get_fcub_error_sms(data) {
    modals.Open("eoc_flex_issue_handoff_modalpopupdetail");
    element.inputValue("eoc_flex_issue_handoff_error_sms", data);
}
function fnFcubHandoffFailedFirstLoadCallBack(data) {
    var option_issue_type = '<option value=""></option>';
    if (data.status == "1") {
        $.each(data.data.fcub_issue_type, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.fcub_issue_type);
            }
            if (i == 0) {
                option_issue_type = '<option value=""></option>'
                option_issue_type = option_issue_type + '<option value="' + item.issue_id + '">' + item.issue_name + '</option>';
            } else {
                option_issue_type = option_issue_type + '<option value="' + item.issue_id + '">' + item.issue_name + '</option>';
            }
        });
        var columns_log = [{
            'data': 'log_id',
            'render': function (log_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + log_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'log_id'
        },
        {
            'data': 'trn_ref_no'
        },
        {
            'data': 'txn_branch'
        },
        {
            'data': 'value_dt'
        },
        {
            'data': 'txn_dt'
        },
        {
            'data': 'user_id'
        },
        {
            'data': 'error_cd',
            'render': function (data, type, row) {
                var error_cd_value = "'" + data + "'"; //add single quote to string
                var error_message = "'" + row['error_message'] + "'";;
                return '<div><a style="color:red" title="Get Error Message" href="#" onclick="fn_get_fcub_error_sms(' + error_message + ')">' + data + '</a></div>';
            }
        },
        {
            'data': 'txn_stat'
        },
        {
            'data': 'source_code'
        },
        {
            'data': 'status'
        },
        {
            'data': 'request_by'
        },
        {
            'data': 'request_date'
        },
        {
            'data': 'resolve_by'
        },
        {
            'data': 'resolve_date'
        },
        {
            'data': 'reject_by'
        },
        {
            'data': 'reject_date'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("eoc_flex_issue_handoff_tbl_log_listing", columns_log, data.data.handoff_entries_log);
        selectionStyle.LiveSearch("eoc_flex_issue_type", option_issue_type);
        $("#eoc_flex_issue_type").val('1').change();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnrpt_flex_issue_tabchange(btn_attr) {
    if (btn_attr == '1') {
        $('.nav-tabs a[href="#eoc_flex_issue_handoff_tab"]').tab('show');
        $('.nav-tabs a[href="#eoc_flex_issue_handoff_log_tab"]').tab('show');
    };
}