/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

function EndPointGetModuleCallBack(xml) {
    let option = jqueryXml.Find("options", xml);
    fnApplyModuleAndSubModuleFilter(option);
}
function fnGetSystemModuleCallBack(data) {
    if (data.status === "1") {
        ito_sys_module_api = data;
        CallAPI.Go(v_getEndPointUrl, undefined, fnGetEndPointCallBack, "Fetching Data...");
        let opt_list_templates;
        $.each(data.data.user_templete, function (i, item) {
            if (i === 0) {
                opt_list_templates = '<option value=""></option>';
                opt_list_templates = opt_list_templates + '<option value="' + item.project + '">' + item.project + '</option>';
            }
            else {
                opt_list_templates = opt_list_templates + '<option value="' + item.project + '">' + item.project + '</option>';
            }
        });
        let opt_list_module;
        $.each(data.data.modules, function (i, item) {
            if (i === 0) {
                opt_list_module = '<option value=""></option>';
                opt_list_module = opt_list_module + '<option value="' + item.module_id + '">' + item.module_name + '</option>';
            }
            else {
                opt_list_module = opt_list_module + '<option value="' + item.module_id + '">' + item.module_name + '</option>';
            }
        });
        let opt_list_End_point_Action;
        $.each(data.data.endPointActions, function (i, item) {
            if (i === 0) {
                opt_list_End_point_Action = '<option value=""></option>';
                opt_list_End_point_Action = opt_list_End_point_Action + '<option value="' + item.action_id + '">' + item.action_name + '</option>';
            }
            else {
                opt_list_End_point_Action = opt_list_End_point_Action + '<option value="' + item.action_id + '">' + item.action_name + '</option>';
            }
        });
        selectionStyle.LiveSearch("umt_new_end_point_project_select", opt_list_templates);
        selectionStyle.LiveSearch("umt_new_end_point_filter_mudule", opt_list_module);
        selectionStyle.LiveSearch("umt_new_end_point_url_action", opt_list_End_point_Action);
        selectionStyle.LiveSearch("umt_new_end_point_filter_sub_mudule", undefined);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
let endPointData = '';
function fnGetEndPointCallBack(data) {
    if (data.status === "1") {
        endPointData = data;
        fnApplyEndPointToDataTable(data);
        UmtUcFnNewInit();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnRefreshEndPoint() {
    if (endPointData !== '') {
        fnApplyEndPointToDataTable(endPointData);
    } else {
        CallAPI.Go(v_getEndPointUrl, undefined, fnGetEndPointCallBack,'processing');
    }
}
function fnEditEndPointCallBack(data) {
    if (data.status === "1") {
        let projectSelect = $("#umt_new_end_point_project_select").val(data["data"]["project_id"]).change();
        let project = projectSelect.val();
        if (project != null && project !== "") {
            let moduleSelect = $("#umt_new_end_point_module_select").val(data["data"]["module_id"]).change();
            let module =moduleSelect.val();
            if (module !== "" && module != null) {
                $("#umt_new_end_point_sys_sub_module").val(data["data"]["sub_module_id"]).change();
            }
        }
        $("#umt_new_end_point_required_encrypt").val(data["data"]["required_encrypt"]).change();
        $("#umt_new_end_point_url_action").val(data["data"]["action_id"]).change();
        element.inputValue("umt_new_end_point_add_new_end_point", data["data"]["end_point_url"]);
        document.getElementById("umt_new_end_point_btn_update_end_point").style.display = "";
        document.getElementById("umt_new_end_point_btn_update_cancel").style.display = "";
        document.getElementById("umt_uc_add_new_end_point").style.display = "none";
        $("#umt_new_end_point_btn_update_end_point").attr("onclick", "fnUpdateEndPoint()");
        $("#umt_new_end_point_btn_update_cancel").attr("onclick", "fnClearNewEndPoint()");
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function fnAddNewEndPointCallBack(data) {
    if (data.status === "1") {
        goAlert.alertInfo("Add End point", data.message);
        CallAPI.Go(v_getEndPointUrl, undefined, fnGetEndPointCallBack);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnUpdateEndPointCallBack(data) {
    if (data.status === "1") {
        goAlert.alertInfo("Update End Point", data.message);
        CallAPI.Go(v_getEndPointUrl, undefined, fnGetEndPointCallBack);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnDeleteEndPointCallBack(data) {
    if (data.status === "1") {
        goAlert.alertInfo("Delete End point", data.message);
        CallAPI.Go(v_getEndPointUrl, undefined, fnGetEndPointCallBack);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
let get_end_point_filter;
function fnFilterEndPointCallBack(data) {
    if (data.status === "1") {
        get_end_point_filter = data;
        fnApplyEndPointToTableFilter();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

