/// <reference path="ito_core.js" />
/// <reference path="ito_eoc.js" />
//CB = call back

function fnEoCParametersCB(data) {
    //var newData = jqueryXml.Find("fcub_parameters", rd);
    //var realDebug = readFiles.Xml("realDebug", newData);
    debug_stat = data.status
    if (data.status == "1") {
        realDebug = data.data.real_debug;
        sRealDebugStatus = realDebug;
        element.inputValue("eoc_param_real_debug", realDebug);
        goShowHide.showOnDivAsInline("eoc_param_real_debug");        
        if (realDebug == "N") {
                goShowHide.showOnDivAsInline("eoc_param_btn_refresh");
                goShowHide.showOnDivAsInline("eoc_param_btn_enable_real_debug");
                goShowHide.hideOnDiv("eoc_param_btn_disable_real_debug");
                goShowHide.hideOnDiv(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
            };
        if (realDebug == "Y") {
                goShowHide.showOnDivAsInline("eoc_param_btn_refresh");
                goShowHide.showOnDivAsInline("eoc_param_btn_disable_real_debug");
                goShowHide.hideOnDiv("eoc_param_btn_enable_real_debug");
                goShowHide.hideOnDiv(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
            };
    }
    else {
        goShowHide.hideOnDiv("eoc_param_real_debug");
        goShowHide.hideOnDiv["eoc_param_btn_enable_real_debug", "eoc_param_btn_disable_real_debug"];
        goShowHide.hideOnDiv(["eoc_param_btn_enable_user_debug", "eoc_param_btn_disable_user_debug"]);
        goAlert.alertError("Processing Failed", "Connection Unreachable, Please Contact ITO System Adminstrator");
};
    fnFcubParamTabChange(sFcubParamCurrTab);
    
    //var elcmDC = readFiles.Xml("elcmDC", newData);
    //var elcmDR = readFiles.Xml("elcmDR", newData);
    //var elcmActiveSite = readFiles.Xml("elcmActiveSite", newData);
    //sElcmActiveSite = elcmActiveSite;
    //var amlWsDC = readFiles.Xml("amlWsDC", newData);
    //var amlWsDR = readFiles.Xml("amlWsDR", newData);
    //var amlWsActiveSite = readFiles.Xml("amlWsActiveSite", newData);
    //sAmlActiveSite = amlWsActiveSite;
    //element.inputValue("eoc_param_elcm_dc_active", "");
    //element.inputValue("eoc_param_elcm_dr_active", "");
    //element.inputValue("eoc_param_amlws_dc_active", "");
    //element.inputValue("eoc_param_amlws_dr_active", "");
    //element.inputValue("eoc_param_real_debug", realDebug);
    //element.inputValue("eoc_param_elcm_dc_url", elcmDC);
    //element.inputValue("eoc_param_elcm_dr_url", elcmDR);
    //element.inputValue("eoc_param_amlws_dc_url", amlWsDC);
    //element.inputValue("eoc_param_amlws_dr_url", amlWsDR);
    //$("#eoc_param_btn_switch_elcm").val(elcmActiveSite);
    //$("#eoc_param_btn_switch_aml_url").val(amlWsActiveSite);

    //if (realDebug == "N") {
    //    goShowHide.showOnDivAsInline("eoc_param_btn_enable_real_debug");
    //};
    //if (realDebug == "Y") {
    //    goShowHide.showOnDivAsInline("eoc_param_btn_disable_real_debug");
    //};
    //if (elcmActiveSite == "DC") {
    //    element.inputValue("eoc_param_elcm_dc_active", "(Running)");
    //};
    //if (elcmActiveSite == "DR") {
    //    element.inputValue("eoc_param_elcm_dr_active", "(Running)");
    //};
    //if (amlWsActiveSite == "DC") {
    //    element.inputValue("eoc_param_amlws_dc_active", "(Running)");
    //};
    //if (amlWsActiveSite == "DR") {
    //    element.inputValue("eoc_param_amlws_dr_active", "(Running)");
    //};
    
}
//function fnEoCParametersRefreshCB(rd) {
//    var newData = jqueryXml.Find("fcub_parameters", rd);
//    var realDebug = readFiles.Xml("realDebug", newData);
//    sRealDebugStatus = realDebug;
//    var elcmDC = readFiles.Xml("elcmDC", newData);
//    var elcmDR = readFiles.Xml("elcmDR", newData);
//    var elcmActiveSite = readFiles.Xml("elcmActiveSite", newData);
//    sElcmActiveSite = elcmActiveSite;
//    var amlWsDC = readFiles.Xml("amlWsDC", newData);
//    var amlWsDR = readFiles.Xml("amlWsDR", newData);
//    var amlWsActiveSite = readFiles.Xml("amlWsActiveSite", newData);
//    sAmlActiveSite = amlWsActiveSite;
//    element.inputValue("eoc_param_elcm_dc_active", "");
//    element.inputValue("eoc_param_elcm_dr_active", "");
//    element.inputValue("eoc_param_amlws_dc_active", "");
//    element.inputValue("eoc_param_amlws_dr_active", "");
//    element.inputValue("eoc_param_real_debug", realDebug);
//    element.inputValue("eoc_param_elcm_dc_url", elcmDC);
//    element.inputValue("eoc_param_elcm_dr_url", elcmDR);
//    element.inputValue("eoc_param_amlws_dc_url", amlWsDC);
//    element.inputValue("eoc_param_amlws_dr_url", amlWsDR);
//    $("#eoc_param_btn_switch_elcm").val(elcmActiveSite);
//    $("#eoc_param_btn_switch_aml_url").val(amlWsActiveSite);
//    if (elcmActiveSite == "DC") {
//        element.inputValue("eoc_param_elcm_dc_active", "(Running)");
//    };
//    if (elcmActiveSite == "DR") {
//        element.inputValue("eoc_param_elcm_dr_active", "(Running)");
//    };
//    if (amlWsActiveSite == "DC") {
//        element.inputValue("eoc_param_amlws_dc_active", "(Running)");
//    };
//    if (amlWsActiveSite == "DR") {
//        element.inputValue("eoc_param_amlws_dr_active", "(Running)");
//    };
//    fnFcubParamTabChange(sFcubParamCurrTab);
//};
function fnFcubRealDebugCB(data) {
    var status = data.status;
    var message = data.message;
    if (status == "1") {
        goAlert.alertInfo("Update Real Debug", message);
        element.inputValue("eoc_param_real_debug", data.data.real_debug);
        sRealDebugStatus = data.data.real_debug;
        if (data.data.real_debug == "N") {
            goShowHide.showOnDivAsInline("eoc_param_btn_enable_real_debug");
            goShowHide.hideOnDiv("eoc_param_btn_disable_real_debug");
        };
        if (data.data.real_debug == "Y") {
            goShowHide.showOnDivAsInline("eoc_param_btn_disable_real_debug");
            goShowHide.hideOnDiv("eoc_param_btn_enable_real_debug");
        };
    }
    else {
      goAlert.alertError("Processing Failed", message);
    };
};
function fnFcubUserDebugCB(data) { 
    if (data.status == "1") {
        goAlert.alertInfo($("#eoc_param_confirm_md_title_user_debug").html(), data.message);
    }
    else {
        goAlert.alertError($("#eoc_param_confirm_md_title_user_debug").html(), data.message);
    }
    fnCheckUserDebugStat();
}

function fncallbackEoCParamlog(data) {
    if (data.status == "1") {
        var debug_logs = [
            { 'data': 'log_id' },
            { 'data': 'enviroment' },
            { 'data': 'time_stamp' },
            { 'data': 'debug_status' },
            ////{ 'data': 'completed' },            
            { 'data': 'debug_param' },
            { 'data': 'user_id' },
            { 'data': 'completed_by' },
            { 'data': '',
                'render': function () {
                    return ""
                }
            }
        ];
        dataTable.ApplyJson("eoc_param_log_tbl", debug_logs, data.data);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnCallBackUserDebugStat(data) {
    if (data.status == "1") {
        //user_Debug = data.data.user_debug;
        element.inputValue("eoc_param_user_debug", data.data.user_debug);
        goShowHide.showOnDivAsInline("eoc_param_user_debug");
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    };
    fnFcubParamTabChange(sFcubParamCurrTab);
}

function fnEocParamFirstLoadCallBack(data) {
    if (data.status == "1") {
        element.inputValue("eoc_param_log_date_in", data.current_date);
        var option_debugEnv = '<option value=""></option>';
        $.each(data.all_environment, function (i, item) {
            if (i == 0) {
                option_debugEnv = '<option value=""></option>';
                option_debugEnv = option_debugEnv + '<option value="' + item.envir_id + '">' + item.enviroment_name + '</option>';
            }
            else {
                option_debugEnv = option_debugEnv + '<option value="' + item.envir_id + '">' + item.enviroment_name + '</option>';
            }

        });
        selectionStyle.LiveSearch("eoc_param_debug_Env", option_debugEnv);
        var debug_logs = [
            { 'data': 'log_id' },
            { 'data': 'enviroment' },
            { 'data': 'time_stamp' },
            { 'data': 'debug_status' },
            ////{ 'data': 'completed' },            
            { 'data': 'debug_param' },
            { 'data': 'user_id' },
            { 'data': 'completed_by' },
            {
                'data': '',
                'render': function () {
                    return ""
                }
            }
        ];
        dataTable.ApplyJson("eoc_param_log_tbl", debug_logs, data.debug_log);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}


//function fnFcubElcmCB(rd) {
//    var status = jqueryXml.Find("status", rd);
//    var message = jqueryXml.Find("message", rd);
//    if (status == "1") {
//        goAlert.alertInfo("Switch ELCM", message);
//    } else {
//        goAlert.alertError("Error", message);
//    };
//    myRequest.Execute(v_EoCParametersUrl, undefined, fnEoCParametersRefreshCB);
//};
//function fnFcubAmlWsCB(rd) {
//    var status = jqueryXml.Find("status", rd);
//    var message = jqueryXml.Find("message", rd);
//    if (status == "1") {
//        goAlert.alertInfo("Switch AML Webservice", message);
//    } else {
//        goAlert.alertError("Error", message);
//    };
//    myRequest.Execute(v_EoCParametersUrl, undefined, fnEoCParametersRefreshCB);
//};
//function fnEoCGetRestorePointCB(rd) {
//    var data = jqueryXml.Find("data_record", rd);
//    dataTable.Apply("eoc_restore_point_tbl_listing", data);
//};
//function fnCreateRestorePointCB(rd) {
//    var status = jqueryXml.Find("status", rd);
//    var message = jqueryXml.Find("message", rd);
//    if (status == "1") {
//        goAlert.alertInfo("Create Restore Point", message);
//    } else {
//        goAlert.alertError("Error", message);
//    };
//    myRequest.Execute(v_EoCGetRestorePoint, undefined, fnEoCGetRestorePointCB);
//};