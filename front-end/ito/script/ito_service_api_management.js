function api_parameter_fn_query_param_type(ProcessIndecatorType) {
    var parameter_id = $("#api_parameter_type").val();
    if (parameter_id == "" || parameter_id == null) {
        goAlert.alertErroTo("api_parameter_type", "Processing Failed", "Parameter Type must be selected");
        return false;
    }

    var data = {
        parameter_id: parameter_id,
    }
    if (ProcessIndecatorType == "Process") {
        CallAPI.Go(v_api_parameter_get_data, data, fnAPIPGetDataCallBack, "Processing...");
    }
    else {

        CallAPI.Go(v_api_parameter_get_data, data, fnAPIPGetDataCallBack);
    }
};

function api_parameter_fn_edit_param_type() {
    var objData = [];
    objData = table.GetValueSelected("apim_tbl_get_parameter_type_listing");
    if (objData.length > 1) {
        goAlert.alertError("Get Parameter for Update Error", "Operation do not support multiple selected.")
        return false;
    };
    if (objData.length == 0) {
        goAlert.alertError("Get Parameter for Update Error", "No Code selected.")
        return false;
    };
    modals.OpenStatic("modalEditParameter");

    var param_name = stringCreate.FromObject(objData);
    $("#param_api_btn_update").val(param_name);
    var data = {
        param_name: param_name
    }
    CallAPI.Go(v_api_parameter_edit, data, fnAPIPEditParamCallBack, "Processing...");
}
function api_parameter_fn_update_param_type() {
    var CheckPARAMname = $("#ParamName").val();
    var CheckPARAMvalue = $("#ParamValue").val();
    var CheckSystem = $("#System").val();
    $("#ParamValue").val();
    if (CheckPARAMname == "") {
        goAlert.alertErroTo("ParamName", "Check Error", "Check Param Name must be provided.");
        return false
    };
    if (CheckPARAMvalue == "") {
        goAlert.alertErroTo("ParamValue", "Check Error", "Check Param Value must be provided.");
        return false
    };
    if (CheckSystem == "") {
        goAlert.alertErroTo("System", "Check Error", "Check System must be provided.");
        return false
    };
    if (modals.ConfirmShowAgain("mdconfirmupdateparameter") == true) {
        modals.Confirm("Update Parameter", "Are you sure to update this Parameter?", "N", "Yes", "onclick", "api_parameter_fn_update_param_commit('" + CheckPARAMname +"')", "mdconfirmupdateparameter");
    }
    else {
        api_parameter_fn_update_param_commit(CheckPARAMname);
    };

};
function api_parameter_fn_update_param_commit(CheckPARAMname) {
    modals.CloseConfirm();
    var CheckPARAMname = $("#ParamName").val();
    var CheckPARAMvalue = $("#ParamValue").val();
    var CheckSystem = $("#System").val();
    var data = {
        type: "Update",
        parameter: CheckPARAMname,
        param_name: CheckPARAMname,
        param_value: CheckPARAMvalue,
        system: CheckSystem,

    };
    CallAPI.Go(v_api_parameter_update, data, fnAPIPUpdateParamCallBack, "Processing...");
};


var isCkENDPONIT = 0;
function fnAPIPGetEndpointMonitor() {
    alert
    if (isCkENDPONIT == 0) {

        fnAPIPRefreshEndpoint("Y");
    }
    else {
        modals.OpenStatic("modal_endpoint_register_monitoring");
    }

}
var isCkCLIENT = 1;
function fnAPIPGetClient() {
    alert
    if (isCkCLIENT == 0) {

        fnAPIPGetClient("Y");
    }
    else {
        modals.OpenStatic("modal_client");
        fnAPIPRefreshClient();
    }

}

var isCkMESSAGE = 1;
function fnAPIPGetMessage() {
    alert
    if (isCkMESSAGE == 0) {

        fnAPIPGetMessage("Y");
    }
    else {
        modals.OpenStatic("modal_message");
        fnAPIPRefreshMessage();
    }

}
var isCkENDPOINT = 1;
function fnAPIPGetEndpoint() {
    alert
    if (isCkENDPOINT == 0) {

        fnAPIPRefreshEndpoint();
    }
    else {
        modals.OpenStatic("modal_endpoint");
        fnAPIPRefreshUserEndpoint();
    }

}
function SearchAppIDClientEndMap() {
    var client_endpoint_appid = $("#apip_client_endpoint_appid").val();
    var client_endpoint_id = $("#apip_client_endpoint_id").val();
    if (client_endpoint_appid === undefined || client_endpoint_appid == "") {
        goAlert.alertErroTo("apip_client_endpoint_appid", "Error", "Please choose client endpoint appid", "change");
        return false;
    };
    if (client_endpoint_id == "") {
        goAlert.alertErroTo("apip_client_endpoint_id", "Processing Failed", "Client Endpoint ID must be input", "input");
        return false;
    }
    
    var data = {
        client_endpoint_appid: client_endpoint_appid,
        client_endpoint_id: client_endpoint_id
    }
    CallAPI.Go(v_apip_client_endpoint_fn_map_check, data, fnAPIPClientEndpointMapCheckDataCallBack, "Fetching Data...");
}
function fnAPIPGetClientEndpoint() {
    var client_id_obj = [];
    client_id_obj = table.GetValueSelected("api_parameter_tbl_client");
    if (client_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Client ID Selected");
        return false;
    }
    if (client_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    modals.OpenStatic("modal_client_endpoint");
    modals.Close("modal_client");
    var client_endpoint_id = stringCreate.FromObject(client_id_obj);
    var data = {
        client_endpoint_type: "CLIENT_ENDPOINT",
        client_endpoint_id: client_endpoint_id
    }
    CallAPI.Go(v_apip_client_endpoint_fn_map, data, fnAPIPClientEndpointMapDataCallBack, "Processing...");

}
function apip_client_endpoint_fn_submit() {
    var client_endpoint_appid = $("#apip_client_endpoint_appid").val();
    var client_endpoint_id = $("#apip_client_endpoint_id").val();
    var endpointuser_ids = $("#endpoint_id_module").val();
    let endpointuser_id = endpointuser_ids.toString();
    if (client_endpoint_appid == undefined || client_endpoint_appid == "") {
        goAlert.alertErroTo("apip_client_endpoint_appid", "Error", "Please choose app id", "change");
        return false;
    };
    if (client_endpoint_id == "") {
        goAlert.alertErroTo("apip_client_endpoint_id", "Check Error", "Client Endpoint ID must be provided.");
        return false
    };
    if (endpointuser_id === undefined || endpointuser_id == "") {
        if (length_clientendpoint == "" || length_clientendpoint === undefined) {
            goAlert.alertErroTo("endpoint_id_module", "Error", "Please choose endpoint id", "change");
            return false;
        };
    };
    
    
    var data = {
        client_endpoint_appid: client_endpoint_appid,
        client_endpoint_id: client_endpoint_id,
        endpointuser_id: endpointuser_id,
    };
    CallAPI.Go(v_apip_client_endpoint_fn_register, data, fnAPIPClientEndpointRegisterCallBack, "Processing...");
}

var isCkSINATURE = 1;
function fnAPIPGetSinature() {
    alert
    if (isCkSINATURE == 0) {

        fnAPIPGetSinature("Y");
    }
    else {
        modals.OpenStatic("modal_sinature");
        fnAPIPRefreshSinature();
    }

}
function SearchAppIDClientSigMap() {
    var client_sinature_appid = $("#apip_client_sinature_appid").val();
    var client_sinature_id = $("#apip_client_sinature_id").val();
    if (client_sinature_appid == "") {
        goAlert.alertErroTo("apip_client_sinature_appid", "Processing Failed", "Client Sinature Appid must be input", "input");
        return false;
    }
    if (client_sinature_id == "") {
        goAlert.alertErroTo("apip_client_sinature_id", "Processing Failed", "Client Sinature ID must be input", "input");
        return false;
    }
    var data = {
        client_sinature_appid: client_sinature_appid,
        client_sinature_id: client_sinature_id
    }
    CallAPI.Go(v_apip_client_signature_fn_map_check, data, fnAPIPClientSinatureMapCheckDataCallBack, "Fetching Data...");
}
function fnAPIPGetClientSinature() {
    var client_id_obj = [];
    client_id_obj = table.GetValueSelected("api_parameter_tbl_client");
    if (client_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Client ID Selected");
        return false;
    }
    if (client_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    modals.OpenStatic("modal_client_sinature");
    modals.Close("modal_client");
    var client_sinature_id = stringCreate.FromObject(client_id_obj);
    var data = {
        client_sinature_type: "CLIENT_SINATURE",
        client_sinature_id: client_sinature_id
    }
    CallAPI.Go(v_apip_client_sinature_fn_map, data, fnAPIPClientSinatureMapDataCallBack, "Processing...");
}
function apip_client_sinature_fn_clear() {
    $("#sinature_id").prop('selectedIndex', 0).change();
    document.getElementById("apip_client_sinature_appid").removeAttribute("disabled");
    document.getElementById("div_cs_status").style.display = "none";
    document.getElementById("api_client_signature_btn_update").style.display = "none";
    document.getElementById("api_client_signature_btn_submit").style.display = "";
}
function apip_client_sinature_fn_submit() {
    var client_sinature_appid = $("#apip_client_sinature_appid").val();
    var client_sinature_id = $("#apip_client_sinature_id").val();
    var sinature_id = $("#sinature_id").val();
    if (client_sinature_appid == undefined || client_sinature_appid == "") {
        goAlert.alertErroTo("apip_client_sinature_appid", "Error", "Please choose app id", "change");
        return false;
    };
    if (client_sinature_id == "") {
        goAlert.alertErroTo("apip_client_sinature_id", "Check Error", "Client Sinature ID must be provided.");
        return false
    };
    //if (client_sinatureuser_id == undefined || client_sinatureuser_id == "") {
    //    if (length_clientsignature == "" || length_clientsignature === undefined) {
    //        goAlert.alertErroTo("sinature_id_module", "Error", "Please choose signature id", "change");
    //        return false;
    //    };
    //};
    if (sinature_id == undefined || sinature_id == "") {
        goAlert.alertErroTo("sinature_id", "Error", "Please choose signature id", "change");
        return false;
    };

    var data = {
        client_sinature_appid: client_sinature_appid,
        client_sinature_id: client_sinature_id,
        sinature_id: sinature_id,
    };
    CallAPI.Go(v_apip_client_sinature_fn_register, data, fnAPIPClientSinatureRegisterCallBack, "Processing...");
}
function fnAPIPEditClientSinature() {
    var cli_sinature_id_obj = [];
    cli_sinature_id_obj = table.GetValueSelected("api_parameter_tbl_client_sinature");
    if (cli_sinature_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Client Signature ID Selected");
        return false;
    }
    if (cli_sinature_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    const cli_sinature_ids = Object.values(cli_sinature_id_obj);
    let cli_sinature_id = cli_sinature_ids.toString();
    var data = {
        client_sinature_type: "CLIENTSINATURE_EDIT",
        client_sinature_id: cli_sinature_id
    }
    CallAPI.Go(v_apip_client_sinature_fn_edit, data, fnAPIPClientSinatureEditDataCallBack, "Processing...");
}
function apip_client_sinature_fn_update() {
    var app_id = $("#apip_client_sinature_appid").val();
    var client_sinature_id = $("#apip_client_sinature_id").val();
    var sinature_id = $("#sinature_id").val();
    var client_sinature_status = $("#apip_client_sinature_status").val();
    if (app_id == null || app_id == "") {
        goAlert.alertErroTo("apip_client_sinature_appid", "Processing Failed", "App ID must be select", "change");
        return false;
    }
    if (client_sinature_id == "") {
        goAlert.alertErroTo("apip_sinature_id", "Processing Failed", "Client Id must be input", "input");
        return false;
    }
    if (sinature_id == null || sinature_id == "") {
        goAlert.alertErroTo("sinature_id", "Processing Failed", "Sinature id must be select", "change");
        return false;
    }
    if (client_sinature_status == "" || client_sinature_status == null) {
        goAlert.alertErroTo("apip_client_sinature_status", "Processing Failed", "Client Sinature status must be input", "input");
        return false;
    }
    if (modals.ConfirmShowAgain("apipclientsinatureconfirmupdate") == true) {
        modals.Confirm("Update Client Sinature Confirm", "Are you sure to update client sinature " + p_si_app_id + "," + p_si_client_id + "," + p_si_id + " ?", "N", "Yes", "onclick", "apip_client_sinature_fn_update_confirm('" + p_si_app_id + ',' + p_si_client_id + ',' + p_si_id +"')", "apipclientsinatureconfirmupdate");
    } else {
        apip_client_sinature_fn_update_confirm(p_si_param);
    }
}

function apip_client_sinature_fn_update_confirm(p_si_param) {
    modals.CloseConfirm();
    var app_id = $("#apip_client_sinature_appid").val();
    var client_sinature_id = $("#apip_client_sinature_id").val();
    var sinature_id = $("#sinature_id").val();
    var client_sinature_status = $("#apip_client_sinature_status").val();
    var data = {
        signature_pra: p_si_param,
        app_id: app_id,
        client_id: client_sinature_id,
        sinature_id: sinature_id,
        sinature_status: client_sinature_status,
    };
    CallAPI.Go(v_apip_client_sinature_fn_update, data, fnAPIPClientSinatureUpdateDataCallBack, "Processing...");
}
//////////////////////////////////////////////////////////////////
var isCkManageCLIENT = 0;
function fnAPIPManageClient() {
    if (isCkManageCLIENT == 0) {
        modals.OpenStatic("modal_manage_client");
       /* CallAPI.Go(v_api_manage_client, undefined, fnAPIPManageClientGetDataCallBack);*/
    }
    else {
        fnAPIPManageClient("Y");
    }

}
function fnAPIPClose() {
    modals.OpenStatic("modal_client");
}
function fnAPIUClose() {
    CallAPI.Go(v_apiu_fn_get_value, undefined, fnAPIUGetValueTypeCallBack, "Fetching Data...");
}
function fnAPIPRefreshClient(process) {
    if (process === undefined) {
        CallAPI.Go(v_api_parameter_get_client, undefined, fnAPIPClientGetDataCallBack);
    }
    else {
        CallAPI.Go(v_api_parameter_get_client, undefined, fnAPIPClientGetDataCallBack, "Processing...");
    }
}
function apip_client_fn_clear() {
    element.inputValue("apip_client_appid", "");
    element.inputValue("apip_client_id", "");
    element.inputValue("apip_client_secert", "");
    element.inputValue("apip_client_name", "");
    element.inputValue("apip_client_description", "");
    element.inputValue("apip_client_typegrent", "");
    $("#apip_client_status").prop('selectedIndex', 0).change();
    document.getElementById("api_client_btn_update").style.display = "none";
    document.getElementById("api_client_btn_submit").style.display = "";
    document.getElementById("div_client_id").style.display = "none";
    document.getElementById("div_client_secert").style.display = "none";
    document.getElementById("div_client_status").style.display = "none";
}
function apip_client_fn_submit() {
    var appid_client = $("#apip_client_appid").val();
    var client_name = $("#apip_client_name").val();
    var client_description = $("#apip_client_description").val();
    var client_typegrent = $("#apip_client_typegrent").val();
    if (appid_client == "") {
        goAlert.alertErroTo("apip_client_appid", "Processing Failed", "Client Appid must be input", "input");
        return false;
    }

    if (client_name == null || client_name == "") {
        goAlert.alertErroTo("apip_client_name", "Processing Failed", "Client Name must be select", "change");
        return false;
    }
    if (client_description == null || client_description == "") {
        goAlert.alertErroTo("apip_client_description", "Processing Failed", "Client description must be select", "change");
        return false;
    }
    if (client_typegrent == null || client_typegrent == "") {
        goAlert.alertErroTo("apip_client_typegrent", "Processing Failed", "Client typegrent  must be select", "change");
        return false;
    }
    var data = {
        appid_client: appid_client,
        client_name: client_name,
        client_des: client_description,
        grent_type: client_typegrent,
    };
    CallAPI.Go(v_apip_client_fn_submit, data, fnAPIPClientSubmitDataCallBack, "Processing...");
}
function fnAPIPDeleteClient() {
    var client_id_obj = [];
    client_id_obj = table.GetValueSelected("api_parameter_tbl_client");
    if (client_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Client ID Selected");
        return false;
    }
    if (client_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var client_id = stringCreate.FromObject(client_id_obj);
    if (modals.ConfirmShowAgain("apipconfdeleteclient") == true) {
        modals.Confirm("Delete Client Confirm", "Are you sure to delete client " + client_id + " ?", "N", "Yes", "onclick", "fnAPIPDeleteClientconfirm('" + client_id + "')", "apipconfdeleteclient");
    } else {
        fnAPIPDeleteClientconfirm(client_id);
    }
}
function fnAPIPDeleteClientconfirm(client_id) {
    modals.CloseConfirm();
    var data = {
        client_type: "CLIENT_DELECT",
        client_id: client_id
    }
    CallAPI.Go(v_apip_client_fn_delete, data, fnAPIPClientDeleteDataCallBack, "Processing...");
}
function fnAPIPEditClient() {
    var client_id_obj = [];
    client_id_obj = table.GetValueSelected("api_parameter_tbl_client");
    if (client_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Client ID Selected");
        return false;
    }
    if (client_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var client_id = stringCreate.FromObject(client_id_obj);
    var data = {
        client_type: "CLIENT_EDIT",
        client_id: client_id
    }
    CallAPI.Go(v_apip_client_fn_edit, data, fnAPIPClientEditDataCallBack, "Processing...");
}
function apip_client_fn_update() {
    var appid_client = $("#apip_client_appid").val();
    var client_id = $("#apip_client_id").val();
    var client_secert = $("#apip_client_secert").val();
    var client_name = $("#apip_client_name").val();
    var client_description = $("#apip_client_description").val();
    var client_typegrent = $("#apip_client_typegrent").val();
    var client_status = $("#apip_client_status").val();
    if (appid_client == "") {
        goAlert.alertErroTo("apip_client_appid", "Processing Failed", "Client Appid must be input", "input");
        return false;
    }
    if (client_id == "") {
        goAlert.alertErroTo("apip_client_id", "Processing Failed", "Client ID must be input", "input");
        return false;
    }
    if (client_secert == "") {
        goAlert.alertErroTo("apip_client_secert", "Processing Failed", "Client Secert must be input", "input");
        return false;
    }
    if (client_name == null || client_name == "") {
        goAlert.alertErroTo("apip_client_name", "Processing Failed", "Client Name must be select", "change");
        return false;
    }
    if (client_description == null || client_description == "") {
        goAlert.alertErroTo("apip_client_description", "Processing Failed", "Client description must be select", "change");
        return false;
    }
    if (client_typegrent == null || client_typegrent == "") {
        goAlert.alertErroTo("apip_client_typegrent", "Processing Failed", "Client typegrent  must be select", "change");
        return false;
    }
    if (client_status == null || client_status == "") {
        goAlert.alertErroTo("apip_client_status", "Processing Failed", "Client status type must be select", "change");
        return false;
    }

    if (modals.ConfirmShowAgain("apipclientconfirmupdate") == true) {
        modals.Confirm("Update Client Confirm", "Are you sure to update client " + p_client_id + " ?", "N", "Yes", "onclick", "apip_client_fn_update_confirm('" + p_client_id +"')", "apipclientconfirmupdate");
    } else {
        apip_client_fn_update_confirm(p_client_id);
    }
}

function apip_client_fn_update_confirm(p_client_id) {
    modals.CloseConfirm();
    var appid_client = $("#apip_client_appid").val();
    var client_id = $("#apip_client_id").val();
    var client_secert = $("#apip_client_secert").val();
    var client_name = $("#apip_client_name").val();
    var client_description = $("#apip_client_description").val();
    var client_typegrent = $("#apip_client_typegrent").val();
    var client_status = $("#apip_client_status").val();
    if (p_client_secert == client_secert) {
        var p_client_secerts = client_secert;
    } else {
        var p_client_secerts = p_client_secert;
    }
    
    var data = {
        p_client_id: p_client_id,
        p_client_secert: p_client_secerts,
        appid_client: appid_client,
        client_id: client_id,
        client_secert: client_secert,
        client_name: client_name,
        client_des: client_description,
        grent_type: client_typegrent,
        client_status: client_status,
    };
    CallAPI.Go(v_apip_client_fn_update, data, fnAPIPClientUpdateDataCallBack, "Processing...");
}

function fnAPIPRefreshSinature(process) {
    if (process === undefined) {
        CallAPI.Go(v_apip_sinature_fn_get, undefined, fnAPIPSinatureGetDataCallBack);
    }
    else {
        CallAPI.Go(v_apip_sinature_fn_get, undefined, fnAPIPSinatureGetDataCallBack, "Processing...");
    }
}
function apip_sinature_fn_clear() {
    element.setEnable("apip_sinature_id");
    element.inputValue("apip_sinature_id", "");
    element.inputValue("apip_sinature_keyid", "");
    element.inputValue("apip_sinature_algorithm", "");
    element.inputValue("apip_sinature_headers", "");
    element.inputValue("apip_sinature_secretkey", "");
    element.inputValue("apip_sinature_maxagerequest", "");
    $("#apip_sinature_status").prop('selectedIndex', 0).change();
    document.getElementById("api_sinature_btn_update").style.display = "none";
    document.getElementById("api_sinature_btn_submit").style.display = "";
    document.getElementById("div_sinature_selected").style.display = "none";
    document.getElementById("div_sinature_status_selected").style.display = "none";
    document.getElementById("div_sinature_secretkey").style.display = "none";
}
function apip_sinature_fn_submit() {
    var sinature_keyid = $("#apip_sinature_keyid").val();
    var sinature_algorithm = $("#apip_sinature_algorithm").val();
    var sinature_headers = $("#apip_sinature_headers").val();
    var sinature_max = $("#apip_sinature_maxagerequest").val();  
    if (sinature_keyid == "") {
        goAlert.alertErroTo("apip_sinature_keyid", "Processing Failed", "Sinature Keyid must be input", "input");
        return false;
    }
    if (sinature_algorithm == null || sinature_algorithm == "") {
        goAlert.alertErroTo("apip_sinature_algorithm", "Processing Failed", "Sinature Algorithm must be select", "change");
        return false;
    }
    if (sinature_headers == null || sinature_headers == "") {
        goAlert.alertErroTo("apip_sinature_headers", "Processing Failed", "Sinature headers must be select", "change");
        return false;
    }
    if (sinature_max == null || sinature_max == "") {
        goAlert.alertErroTo("apip_sinature_maxagerequest", "Processing Failed", "Sinature maxagerequest type must be select", "change");
        return false;
    }
    var data = {
        sinature_keyid: sinature_keyid,
        sinature_algorithm: sinature_algorithm,
        sinature_headers: sinature_headers,
        sinature_max: sinature_max,
    };
    CallAPI.Go(v_apip_sinature_fn_submit, data, fnAPIPSinatureSubmitDataCallBack, "Processing...");
}
function fnAPIPDeleteSinature() {
    var sinature_id_obj = [];
    sinature_id_obj = table.GetValueSelected("api_parameter_tbl_sinature");
    if (sinature_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Sinature ID Selected");
        return false;
    }
    if (sinature_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var sinature_id = stringCreate.FromObject(sinature_id_obj);
    if (modals.ConfirmShowAgain("apipconfdeletesinature") == true) {
        modals.Confirm("Delete Sinature Confirm", "Are you sure to delete sinature " + sinature_id + " ?", "N", "Yes", "onclick", "fnAPIPDeleteSinatureconfirm('" + sinature_id + "')", "apipconfdeletesinature");
    } else {
        fnAPIPDeleteSinatureconfirm(sinature_id);
    }
}
function fnAPIPDeleteSinatureconfirm(sinature_id) {
    modals.CloseConfirm();
    var data = {
        sinature_type: "SINATURE_DELETE",
        sinature_id: sinature_id
    }
    CallAPI.Go(v_apip_sinature_fn_delete, data, fnAPIPSinatureDeleteDataCallBack, "Processing...");
}
function fnAPIPEditSinature() {
    var sinature_id_obj = [];
    sinature_id_obj = table.GetValueSelected("api_parameter_tbl_sinature");
    if (sinature_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Sinature ID Selected");
        return false;
    }
    if (sinature_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var sinature_id = stringCreate.FromObject(sinature_id_obj);
    var data = {
        sinature_type: "SINATURE_EDIT",
        sinature_id: sinature_id
    }
    CallAPI.Go(v_apip_sinature_fn_edit, data, fnAPIPSinatureEditDataCallBack, "Processing...");
}
function apip_sinature_fn_update() {
    var sinature_id = $("#apip_sinature_id").val();
    var sinature_status = $("#apip_sinature_status").val();
    var sinature_keyid = $("#apip_sinature_keyid").val();
    var sinature_algorithm = $("#apip_sinature_algorithm").val();
    var sinature_headers = $("#apip_sinature_headers").val();
    var sinature_secretkey = $("#apip_sinature_secretkey").val();
    var sinature_max = $("#apip_sinature_maxagerequest").val();
    if (sinature_id == "") {
        goAlert.alertErroTo("apip_sinature_id", "Processing Failed", "Sinature Id must be input", "input");
        return false;
    }
    if (sinature_status == "" || sinature_status == null) {
        goAlert.alertErroTo("apip_sinature_status", "Processing Failed", "Sinature Status must be input", "input");
        return false;
    }
    if (sinature_keyid == "") {
        goAlert.alertErroTo("apip_sinature_keyid", "Processing Failed", "Sinature Keyid must be input", "input");
        return false;
    }
    if (sinature_algorithm == null || sinature_algorithm == "") {
        goAlert.alertErroTo("apip_sinature_algorithm", "Processing Failed", "Sinature Algorithm must be select", "change");
        return false;
    }
    if (sinature_headers == null || sinature_headers == "") {
        goAlert.alertErroTo("apip_sinature_headers", "Processing Failed", "Sinature headers must be select", "change");
        return false;
    }
    if (sinature_secretkey == null || sinature_secretkey == "") {
        goAlert.alertErroTo("apip_sinature_secretkey", "Processing Failed", "Sinature secretkey must be select", "change");
        return false;
    }
    if (sinature_max == null || sinature_max == "") {
        goAlert.alertErroTo("apip_sinature_maxagerequest", "Processing Failed", "Sinature maxagerequest type must be select", "change");
        return false;
    }

    if (modals.ConfirmShowAgain("apipsinatureconfirmupdate") == true) {
        modals.Confirm("Update Sinature Confirm", "Are you sure to update sinature " + sinature_id + " ?", "N", "Yes", "onclick", "apip_sinature_fn_update_confirm('" + sinature_id + "')", "apipsinatureconfirmupdate");
    } else {
        apip_sinature_fn_update_confirm(sinature_id);
    }
}

function apip_sinature_fn_update_confirm(sinature_id) {
    modals.CloseConfirm();
    var sinature_id = $("#apip_sinature_id").val();
    var sinature_status = $("#apip_sinature_status").val();
    var sinature_keyid = $("#apip_sinature_keyid").val();
    var sinature_algorithm = $("#apip_sinature_algorithm").val();
    var sinature_headers = $("#apip_sinature_headers").val();
    var sinature_secretkey = $("#apip_sinature_secretkey").val();
    var sinature_max = $("#apip_sinature_maxagerequest").val();
    var data = {
        sinature_id: sinature_id,
        sinature_status: sinature_status,
        sinature_keyid: sinature_keyid,
        sinature_algorithm: sinature_algorithm,
        sinature_headers: sinature_headers,
        sinature_secretkey: sinature_secretkey,
        sinature_max: sinature_max,
    };
    CallAPI.Go(v_apip_sinature_fn_update, data, fnAPIPSinatureUpdateDataCallBack, "Processing...");
}
///////////////////////////////////////////////////////

function fnAPIPRefreshUserEndpoint(process) {
    if (process === undefined) {
        CallAPI.Go(v_apip_endpoint_fn_get_userm, undefined, fnAPIPEndpointUserGetDataCallBack);
    }
    else {
        CallAPI.Go(v_apip_endpoint_fn_get_userm, undefined, fnAPIPEndpointUserGetDataCallBack, "Processing...");
    }
}
function fnauthtype() {
    var auth_type = $("#apip_endpointuser_type_auth").val();
    if (auth_type == "Bearer") {
        element.inputValue("apip_endpointuser_apikey", "");
        document.getElementById("div_endpointuser_Apikey").style.display = "none";
    }
    else{
        document.getElementById("div_endpointuser_Apikey").style.display = "";
    };
};
function apip_userendpoint_fn_clear() {
    element.setEnable("apip_endpointuser_endpointid");
    element.inputValue("apip_endpointuser_apiid", "");
    element.inputValue("apip_endpointuser_endpointid", "");
    element.inputValue("apip_endpointuser", "");
    element.inputValue("apip_endpointuser_debug_name", "");
    element.inputValue("apip_endpointuser_apikey", "");
    $("#apip_endpointuser_method").prop('selectedIndex', 0).change(); 
    $("#apip_endpointuser_status").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_enable").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_debug").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_authorize").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_validatetrnid").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_validatecreatetime").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_validateagq").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_validatedigest").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_validatesinature").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_sourcesys").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_allowanymous").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_multipartdata").prop('selectedIndex', 0).change();
    $("#apip_endpointuser_type_auth").prop('selectedIndex', 0).change();
    document.getElementById("api_userendpoint_btn_update").style.display = "none";
    document.getElementById("api_userendpoint_btn_submit").style.display = "";
    document.getElementById("div_endpoint_selected").style.display = "none";
    document.getElementById("div_endpoint_status_selected").style.display = "none";
    document.getElementById("div_endpointuser_Apikey").style.display = "none";
}
function apip_userendpoint_btn_submit() {
    var endpointuser_apiid = $("#apip_endpointuser_apiid").val();
    var endpointuser = $("#apip_endpointuser").val();
    var endpointuser_method = $("#apip_endpointuser_method").val();
    var endpointuser_enable = $("#apip_endpointuser_enable").val();
    var endpointuser_debug = $("#apip_endpointuser_debug").val();
    var endpointuser_debug_name = $("#apip_endpointuser_debug_name").val();
    var endpointuser_authorize = $("#apip_endpointuser_authorize").val();
    var endpointuser_validatetrnid = $("#apip_endpointuser_validatetrnid").val();
    var endpointuser_validatecreatetime = $("#apip_endpointuser_validatecreatetime").val();
    var endpointuser_validateagq = $("#apip_endpointuser_validateagq").val();
    var endpointuser_validatedigest = $("#apip_endpointuser_validatedigest").val();
    var endpointuser_validatesinature = $("#apip_endpointuser_validatesinature").val();
    var endpointuser_sourcesys = $("#apip_endpointuser_sourcesys").val();
    var endpointuser_allowanymous = $("#apip_endpointuser_allowanymous").val();
    var endpointuser_multipartdata = $("#apip_endpointuser_multipartdata").val();
    var endpointuser_auth_type = $("#apip_endpointuser_type_auth").val();
    var endpointuser_api_key = $("#apip_endpointuser_apikey").val();
    if (endpointuser_apiid == "") {
        goAlert.alertErroTo("apip_endpointuser_apiid", "Processing Failed", "API Id must be input", "input");
        return false;
    }
    if (endpointuser == "") {
        goAlert.alertErroTo("apip_endpointuser", "Processing Failed", "Endpoint must be input", "input");
        return false;
    }
    if (endpointuser_method == null || endpointuser_method == "") {
        goAlert.alertErroTo("apip_endpointuser_method", "Processing Failed", "Endpoint method must be select", "change");
        return false;
    }
    if (endpointuser_enable == "" || endpointuser_enable == null) {
        goAlert.alertErroTo("apip_endpointuser_enable", "Processing Failed", "Endpoint enable must be select", "change");
        return false;
    }
    
    if (endpointuser_debug == null || endpointuser_debug == "") {
        goAlert.alertErroTo("apip_endpointuser_debug", "Processing Failed", "Debug must be select", "change");
        return false;
    }
    
    if (endpointuser_debug_name == "") {
        goAlert.alertErroTo("apip_endpointuser_debug_name", "Processing Failed", "Debug name must be input", "input");
        return false;
    }
    if (endpointuser_authorize == null || endpointuser_authorize == "") {
        goAlert.alertErroTo("apip_endpointuser_authorize", "Processing Failed", "Authorize must be select", "change");
        return false;
    }
    if (endpointuser_validatetrnid == null || endpointuser_validatetrnid == "") {
        goAlert.alertErroTo("apip_endpointuser_validatetrnid", "Processing Failed", "Validatetrnid must be select", "change");
        return false;
    }
    
    if (endpointuser_validatecreatetime == null || endpointuser_validatecreatetime == "") {
        goAlert.alertErroTo("apip_endpointuser_validatecreatetime", "Processing Failed", "Validate create time must be select", "change");
        return false;
    }
    if (endpointuser_validateagq == null || endpointuser_validateagq == "") {
        goAlert.alertErroTo("apip_endpointuser_validateagq", "Processing Failed", "Validate age request must be select", "change");
        return false;
    }
    if (endpointuser_validatedigest == null || endpointuser_validatedigest == "") {
        goAlert.alertErroTo("apip_endpointuser_validatedigest", "Processing Failed", "Validate digest must be select", "change");
        return false;
    }
    if (endpointuser_validatesinature == null || endpointuser_validatesinature == "") {
        goAlert.alertErroTo("apip_endpointuser_validatesinature", "Processing Failed", "Validate sinature must be select", "change");
        return false;
    }
    if (endpointuser_sourcesys == null || endpointuser_sourcesys == "") {
        goAlert.alertErroTo("apip_endpointuser_sourcesys", "Processing Failed", "Source sysem must be select", "change");
        return false;
    }
    if (endpointuser_allowanymous == null || endpointuser_allowanymous == "") {
        goAlert.alertErroTo("apip_endpointuser_allowanymous", "Processing Failed", "Allow any mous must be select", "change");
        return false;
    }
    if (endpointuser_multipartdata == null || endpointuser_multipartdata == "") {
        goAlert.alertErroTo("apip_endpointuser_multipartdata", "Processing Failed", "Multipart data must be select", "change");
        return false;
    }
    if (endpointuser_auth_type == null || endpointuser_auth_type == "") {
        goAlert.alertErroTo("apip_endpointuser_type_auth", "Processing Failed", "Authentication type must be select", "change");
        return false;
    }
    if (endpointuser_auth_type != "Bearer") {
        if (endpointuser_api_key == null || endpointuser_api_key == "") {
            goAlert.alertErroTo("apip_endpointuser_apikey", "Processing Failed", "API Key must be input", "input");
            return false;
        } 
    }
    var data = {
        api_id: endpointuser_apiid,
        endpoint: endpointuser,
        method: endpointuser_method,
        enabled: endpointuser_enable,
        debug: endpointuser_debug,
        debug_name: endpointuser_debug_name,
        authorize: endpointuser_authorize,
        validatetrn_id: endpointuser_validatetrnid,
        validate_createtime: endpointuser_validatecreatetime,
        validate_agerequest: endpointuser_validateagq,
        validate_digest: endpointuser_validatedigest,
        validate_sinature: endpointuser_validatesinature,
        sourcesystem_check: endpointuser_sourcesys,
        allowanonymous: endpointuser_allowanymous,
        multipart_data: endpointuser_multipartdata,
        auth_type: endpointuser_auth_type,
        api_key: endpointuser_api_key
    };
    CallAPI.Go(v_apip_endpoint_fn_submit_userm, data, fnAPIPEndpointUserSubmitDataCallBack, "Processing...");
}
function fnAPIPDeleteUserEndpoint() {
    var userendpoint_id_obj = [];
    userendpoint_id_obj = table.GetValueSelected("api_parameter_tbl_userendpoint");
    if (userendpoint_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Endpoint ID Selected");
        return false;
    }
    if (userendpoint_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var endpoint_id = stringCreate.FromObject(userendpoint_id_obj);
    if (modals.ConfirmShowAgain("apipconfdeleteuserendpoint") == true) {
        modals.Confirm("Delete Endpoint Confirm", "Are you sure to delete endpoint " + endpoint_id + " ?", "N", "Yes", "onclick", "fnAPIPDeleteUserendointconfirm('" + endpoint_id + "')", "apipconfdeleteuserendpoint");
    } else {
        fnAPIPDeleteUserendointconfirm(endpoint_id);
    }
}
function fnAPIPDeleteUserendointconfirm(endpoint_id) {
    modals.CloseConfirm();
    var data = {
        endpoint_type: "ENDPOINT_DELETE",
        endpoint_id: endpoint_id
    }
    CallAPI.Go(v_apip_endpoint_fn_delete_userm, data, fnAPIPEndpointUserDeleteDataCallBack, "Processing...");
}
function fnAPIPEditUserEndpoint() {
    var userendpoint_id_obj = [];
    userendpoint_id_obj = table.GetValueSelected("api_parameter_tbl_userendpoint");
    if (userendpoint_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Endpoint ID Selected");
        return false;
    }
    if (userendpoint_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var endpoint_id = stringCreate.FromObject(userendpoint_id_obj);
    var data = {
        endpoint_type: "ENDPOINT_EDIT",
        endpoint_id: endpoint_id
    }
    CallAPI.Go(v_apip_endpoint_fn_edit_userm, data, fnAPIPEndpointUserEditDataCallBack, "Processing...");
}
function apip_userendpoint_fn_update() {
    var endpointuser_apiid = $("#apip_endpointuser_apiid").val();
    var endpointuser_endpointid = $("#apip_endpointuser_endpointid").val();
    var endpointuser = $("#apip_endpointuser").val();
    var endpointuser_method = $("#apip_endpointuser_method").val();
    var endpointuser_status = $("#apip_endpointuser_status").val();
    var endpointuser_enable = $("#apip_endpointuser_enable").val();
    var endpointuser_debug = $("#apip_endpointuser_debug").val();
    var endpointuser_debug_name = $("#apip_endpointuser_debug_name").val();
    var endpointuser_authorize = $("#apip_endpointuser_authorize").val();
    var endpointuser_validatetrnid = $("#apip_endpointuser_validatetrnid").val();
    var endpointuser_validatecreatetime = $("#apip_endpointuser_validatecreatetime").val();
    var endpointuser_validateagq = $("#apip_endpointuser_validateagq").val();
    var endpointuser_validatedigest = $("#apip_endpointuser_validatedigest").val();
    var endpointuser_validatesinature = $("#apip_endpointuser_validatesinature").val();
    var endpointuser_sourcesys = $("#apip_endpointuser_sourcesys").val();
    var endpointuser_allowanymous = $("#apip_endpointuser_allowanymous").val();
    var endpointuser_multipartdata = $("#apip_endpointuser_multipartdata").val();
    var endpointuser_auth_type = $("#apip_endpointuser_type_auth").val();
    var endpointuser_api_key = $("#apip_endpointuser_apikey").val();
    if (endpointuser_apiid == "") {
        goAlert.alertErroTo("apip_endpointuser_apiid", "Processing Failed", "API Id must be input", "input");
        return false;
    }
    if (endpointuser_endpointid == "") {
        goAlert.alertErroTo("apip_endpointuser_endpointid", "Processing Failed", "Endpoint ID must be input", "input");
        return false;
    }
    if (endpointuser == "") {
        goAlert.alertErroTo("apip_endpointuser", "Processing Failed", "Endpoint must be input", "input");
        return false;
    }
    if (endpointuser_method == null || endpointuser_method == "") {
        goAlert.alertErroTo("apip_endpointuser_method", "Processing Failed", "Endpoint method must be select", "change");
        return false;
    }
    if (endpointuser_status == null || endpointuser_status == "") {
        goAlert.alertErroTo("apip_endpointuser_status", "Processing Failed", "Endpoint status must be select", "change");
        return false;
    }
    if (endpointuser_enable == "" || endpointuser_enable == null) {
        goAlert.alertErroTo("apip_endpointuser_enable", "Processing Failed", "Endpoint enable must be select", "change");
        return false;
    }

    if (endpointuser_debug == null || endpointuser_debug == "") {
        goAlert.alertErroTo("apip_endpointuser_debug", "Processing Failed", "Debug must be select", "change");
        return false;
    }

    if (endpointuser_debug_name == "") {
        goAlert.alertErroTo("apip_endpointuser_debug_name", "Processing Failed", "Debug name must be input", "input");
        return false;
    }
    if (endpointuser_authorize == null || endpointuser_authorize == "") {
        goAlert.alertErroTo("apip_endpointuser_authorize", "Processing Failed", "Authorize must be select", "change");
        return false;
    }
    if (endpointuser_validatetrnid == null || endpointuser_validatetrnid == "") {
        goAlert.alertErroTo("apip_endpointuser_validatetrnid", "Processing Failed", "Validatetrnid must be select", "change");
        return false;
    }

    if (endpointuser_validatecreatetime == null || endpointuser_validatecreatetime == "") {
        goAlert.alertErroTo("apip_endpointuser_validatecreatetime", "Processing Failed", "Validate create time must be select", "change");
        return false;
    }
    if (endpointuser_validateagq == null || endpointuser_validateagq == "") {
        goAlert.alertErroTo("apip_endpointuser_validateagq", "Processing Failed", "Validate age request must be select", "change");
        return false;
    }
    if (endpointuser_validatedigest == null || endpointuser_validatedigest == "") {
        goAlert.alertErroTo("apip_endpointuser_validatedigest", "Processing Failed", "Validate digest must be select", "change");
        return false;
    }
    if (endpointuser_validatesinature == null || endpointuser_validatesinature == "") {
        goAlert.alertErroTo("apip_endpointuser_validatesinature", "Processing Failed", "Validate sinature must be select", "change");
        return false;
    }
    if (endpointuser_sourcesys == null || endpointuser_sourcesys == "") {
        goAlert.alertErroTo("apip_endpointuser_sourcesys", "Processing Failed", "Source sysem must be select", "change");
        return false;
    }
    if (endpointuser_allowanymous == null || endpointuser_allowanymous == "") {
        goAlert.alertErroTo("apip_endpointuser_allowanymous", "Processing Failed", "Allow any mous must be select", "change");
        return false;
    }
    if (endpointuser_multipartdata == null || endpointuser_multipartdata == "") {
        goAlert.alertErroTo("apip_endpointuser_multipartdata", "Processing Failed", "Multipart data must be select", "change");
        return false;
    }
    if (endpointuser_auth_type == null || endpointuser_auth_type == "") {
        goAlert.alertErroTo("apip_endpointuser_type_auth", "Processing Failed", "Authentication type must be select", "change");
        return false;
    }
    if (endpointuser_auth_type != "Bearer") {
        if (endpointuser_api_key == null || endpointuser_api_key == "") {
            goAlert.alertErroTo("apip_endpointuser_apikey", "Processing Failed", "API Key must be input", "input");
            return false;
        }
    }

    if (modals.ConfirmShowAgain("apipuserendpointconfirmupdate") == true) {
        modals.Confirm("Update Endpoint Confirm", "Are you sure to update endpoint " + endpointuser_endpointid + " ?", "N", "Yes", "onclick", "apip_userendpoint_fn_update_confirm('" + endpointuser_endpointid + "')", "apipuserendpointconfirmupdate");
    } else {
        apip_userendpoint_fn_update_confirm(endpointuser_endpointid);
    }
}

function apip_userendpoint_fn_update_confirm(endpointuser_endpointid) {
    modals.CloseConfirm();
    var endpointuser_apiid = $("#apip_endpointuser_apiid").val();
    var endpointuser_endpointid = $("#apip_endpointuser_endpointid").val();
    var endpointuser = $("#apip_endpointuser").val();
    var endpointuser_method = $("#apip_endpointuser_method").val();
    var endpointuser_status = $("#apip_endpointuser_status").val();
    var endpointuser_enable = $("#apip_endpointuser_enable").val();
    var endpointuser_debug = $("#apip_endpointuser_debug").val();
    var endpointuser_debug_name = $("#apip_endpointuser_debug_name").val();
    var endpointuser_authorize = $("#apip_endpointuser_authorize").val();
    var endpointuser_validatetrnid = $("#apip_endpointuser_validatetrnid").val();
    var endpointuser_validatecreatetime = $("#apip_endpointuser_validatecreatetime").val();
    var endpointuser_validateagq = $("#apip_endpointuser_validateagq").val();
    var endpointuser_validatedigest = $("#apip_endpointuser_validatedigest").val();
    var endpointuser_validatesinature = $("#apip_endpointuser_validatesinature").val();
    var endpointuser_sourcesys = $("#apip_endpointuser_sourcesys").val();
    var endpointuser_allowanymous = $("#apip_endpointuser_allowanymous").val();
    var endpointuser_multipartdata = $("#apip_endpointuser_multipartdata").val();
    var endpointuser_auth_type = $("#apip_endpointuser_type_auth").val();
    var endpointuser_api_key = $("#apip_endpointuser_apikey").val();
    var data = {
        api_id: endpointuser_apiid,
        endpoint_id: endpointuser_endpointid,
        endpoint: endpointuser,
        method: endpointuser_method,
        record_status: endpointuser_status,
        enabled: endpointuser_enable,
        debug: endpointuser_debug,
        debug_name: endpointuser_debug_name,
        authorize: endpointuser_authorize,
        validatetrn_id: endpointuser_validatetrnid,
        validate_createtime: endpointuser_validatecreatetime,
        validate_agerequest: endpointuser_validateagq,
        validate_digest: endpointuser_validatedigest,
        validate_sinature: endpointuser_validatesinature,
        sourcesystem_check: endpointuser_sourcesys,
        allowanonymous: endpointuser_allowanymous,
        multipart_data: endpointuser_multipartdata,
        auth_type: endpointuser_auth_type,
        api_key: endpointuser_api_key
    };
    CallAPI.Go(v_apip_endpoint_fn_update_userm, data, fnAPIPEndpointUserUpdateDataCallBack, "Processing...");
}
///////////////////////////////////////////////////////

function fnAPIPRefreshEndpoint(process) {
    if (process === undefined) {
        CallAPI.Go(v_api_parameter_get_endpoint, undefined, fnAPIPEndpointGetDataCallBack);
    }
    else {
        CallAPI.Go(v_api_parameter_get_endpoint, undefined, fnAPIPEndpointGetDataCallBack, "Processing...");
    }
}
function apip_endpoint_fn_clear() {
    element.inputValue("apip_endpoint_id", "");
    element.setEnable("apip_endpoint_id");
    element.inputValue("apip_endpoint_description", "");
    element.inputValue("apip_endpoint", "");
    element.inputValue("apip_endpoint_message_body", "");
    element.inputValue("apip_endpoint_key_name", "");
    element.inputValue("apip_endpoint_key_value", "");
    element.inputValue("apip_endpoint_content_type", "");

    $("#apip_endpoint_status").prop('selectedIndex', 0).change();
    $("#apip_endpoint_type").prop('selectedIndex', 0).change();
    $("#apip_endpoint_method").prop('selectedIndex', 0).change();
    $("#apip_endpoint_service_type").prop('selectedIndex', 0).change();
    document.getElementById("api_endpoint_btn_update").style.display = "none";
    document.getElementById("api_endpoint_btn_submit").style.display = "";
}
function apip_endpoint_fn_submit() {
    var endpoint_id = $("#apip_endpoint_id").val();
    var endpoint_description = $("#apip_endpoint_description").val();
    var endpoint = $("#apip_endpoint").val();
    var endpoint_status = $("#apip_endpoint_status").val();
    var endpoint_type = $("#apip_endpoint_type").val();
    var message_body = $("#apip_endpoint_message_body").val();
    var key_name = $("#apip_endpoint_key_name").val();
    var key_value = $("#apip_endpoint_key_value").val();
    var method = $("#apip_endpoint_method").val();
    var content_type = $("#apip_endpoint_content_type").val();
    var service_type = $("#apip_endpoint_service_type").val();
    if (endpoint_id == "") {
        goAlert.alertErroTo("apip_endpoint_id", "Processing Failed", "Endpoint Id must be input", "input");
        return false;
    }
    if (endpoint_description == "") {
        goAlert.alertErroTo("apip_endpoint_description", "Processing Failed", "Endpoint Description must be input", "input");
        return false;
    }
    if (endpoint == "") {
        goAlert.alertErroTo("apip_endpoint", "Processing Failed", "Endpoint must be input", "input");
        return false;
    }
    if (endpoint_status == null || endpoint_status == "") {
        goAlert.alertErroTo("apip_endpoint_status", "Processing Failed", "Endpoint status must be select", "change");
        return false;
    }
    if (endpoint_type == null || endpoint_type == "") {
        goAlert.alertErroTo("apip_endpoint_type", "Processing Failed", "Endpoint type must be select", "change");
        return false;
    }
    if (message_body == "") {
        goAlert.alertErroTo("apip_endpoint_message_body", "Processing Failed", "Message body must be input", "input");
        return false;
    }
    if (key_name == "") {
        goAlert.alertErroTo("apip_endpoint_key_name", "Processing Failed", "Key name must be input", "input");
        return false;
    }
    if (key_value == "") {
        goAlert.alertErroTo("apip_endpoint_key_value", "Processing Failed", "Key value must be input", "input");
        return false;
    }
    if (method == null || method == "") {
        goAlert.alertErroTo("apip_endpoint_method", "Processing Failed", "Method must be select", "change");
        return false;
    }
    if (content_type == "") {
        goAlert.alertErroTo("apip_endpoint_content_type", "Processing Failed", "Content type must be input", "input");
        return false;
    }
    if (service_type == null || service_type == "") {
        goAlert.alertErroTo("apip_endpoint_service_type", "Processing Failed", "Service type must be select", "change");
        return false;
    }
    var data = {
        endpoint_id: endpoint_id,
        endpoint_description: endpoint_description,
        endpoint: endpoint,
        endpoint_status: endpoint_status,
        endpoint_type: endpoint_type,
        message_body: message_body,
        key_name: key_name,
        key_value: key_value,
        method: method,
        content_type: content_type,
        service_type: service_type
    };
    CallAPI.Go(v_apip_endpoint_fn_submit, data, fnAPIPEndpointSubmitDataCallBack, "Processing...");
}
function fnAPIPEditEndpoint() {
    var endpoint_id_obj = [];
    endpoint_id_obj = table.GetValueSelected("api_parameter_tbl_endpoint");
    if (endpoint_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Endpoint ID Selected");
        return false;
    }
    if (endpoint_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var endpoint_ids = stringCreate.FromObject(endpoint_id_obj);
    var data = {
        endpoint_type: "ENDPOINT",
        endpoint_ids: endpoint_ids
    }
    CallAPI.Go(v_apip_endpoint_fn_edit, data, fnAPIPEndpointEditDataCallBack, "Processing...");
}
function apip_endpoint_fn_update() {
    var endpoint_id = $("#apip_endpoint_id").val();
    var endpoint_description = $("#apip_endpoint_description").val();
    var endpoint = $("#apip_endpoint").val();
    var endpoint_status = $("#apip_endpoint_status").val();
    var endpoint_type = $("#apip_endpoint_type").val();
    var message_body = $("#apip_endpoint_message_body").val();
    var key_name = $("#apip_endpoint_key_name").val();
    var key_value = $("#apip_endpoint_key_value").val();
    var method = $("#apip_endpoint_method").val();
    var content_type = $("#apip_endpoint_content_type").val();
    var service_type = $("#apip_endpoint_service_type").val();
    if (endpoint_id == "") {
        goAlert.alertErroTo("apip_endpoint_id", "Processing Failed", "Endpoint Id must be input", "input");
        return false;
    }
    if (endpoint_description == "") {
        goAlert.alertErroTo("apip_endpoint_description", "Processing Failed", "Endpoint Description must be input", "input");
        return false;
    }
    if (endpoint == "") {
        goAlert.alertErroTo("apip_endpoint", "Processing Failed", "Endpoint must be input", "input");
        return false;
    }
    if (endpoint_status == null || endpoint_status == "") {
        goAlert.alertErroTo("apip_endpoint_status", "Processing Failed", "Endpoint status must be select", "change");
        return false;
    }
    if (endpoint_type == null || endpoint_type == "") {
        goAlert.alertErroTo("apip_endpoint_type", "Processing Failed", "Endpoint type must be select", "change");
        return false;
    }
    if (message_body == "") {
        goAlert.alertErroTo("apip_endpoint_message_body", "Processing Failed", "Message body must be input", "input");
        return false;
    }
    if (key_name == "") {
        goAlert.alertErroTo("apip_endpoint_key_name", "Processing Failed", "Key name must be input", "input");
        return false;
    }
    if (key_value == "") {
        goAlert.alertErroTo("apip_endpoint_key_value", "Processing Failed", "Key value must be input", "input");
        return false;
    }
    if (method == null || method == "") {
        goAlert.alertErroTo("apip_endpoint_method", "Processing Failed", "Method must be select", "change");
        return false;
    }
    if (content_type == "") {
        goAlert.alertErroTo("apip_endpoint_content_type", "Processing Failed", "Content type must be input", "input");
        return false;
    }
    if (service_type == null || service_type == "") {
        goAlert.alertErroTo("apip_endpoint_service_type", "Processing Failed", "Service type must be select", "change");
        return false;
    }

    if (modals.ConfirmShowAgain("apipendpointconfirmupdate") == true) {
        modals.Confirm("Update Endpoint Confirm", "Are you sure to update endpoint " + endpoint_id + " ?", "N", "Yes", "onclick", "apip_endpoint_fn_update_confirm('" + endpoint_id + "')", "apipendpointconfirmupdate");
    } else {
        apip_endpoint_fn_update_confirm(endpoint_id);
    }
}

function apip_endpoint_fn_update_confirm(endpoint_id) {
    modals.CloseConfirm();
    var endpoint_id = $("#apip_endpoint_id").val();
    var endpoint_description = $("#apip_endpoint_description").val();
    var endpoint = $("#apip_endpoint").val();
    var endpoint_status = $("#apip_endpoint_status").val();
    var endpoint_type = $("#apip_endpoint_type").val();
    var message_body = $("#apip_endpoint_message_body").val();
    var key_name = $("#apip_endpoint_key_name").val();
    var key_value = $("#apip_endpoint_key_value").val();
    var method = $("#apip_endpoint_method").val();
    var content_type = $("#apip_endpoint_content_type").val();
    var service_type = $("#apip_endpoint_service_type").val();
    var data = {
        endpoint_id: endpoint_id,
        endpoint_description: endpoint_description,
        endpoint: endpoint,
        endpoint_status: endpoint_status,
        endpoint_type: endpoint_type,
        message_body: message_body,
        key_name: key_name,
        key_value: key_value,
        method: method,
        content_type: content_type,
        service_type: service_type
    };
    CallAPI.Go(v_apip_endpoint_fn_update, data, fnAPIPEndpointUpdateDataCallBack, "Processing...");
}
function fnAPIPDeleteEndpoint() {
    var endpoint_id_obj = [];
    endpoint_id_obj = table.GetValueSelected("api_parameter_tbl_endpoint");
    if (endpoint_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Endpoint ID Selected");
        return false;
    }
    if (endpoint_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var endpoint_id = stringCreate.FromObject(endpoint_id_obj);
    if (modals.ConfirmShowAgain("apipconfdeleteendpoint") == true) {
        modals.Confirm("Delete Endpoint Id Confirm", "Are you sure to delete endpoint id " + endpoint_id + " ?", "N", "Yes", "onclick", "fnAPIPDeleteEndpointconfirm('" + endpoint_id + "')", "apipconfdeleteendpoint");
    } else {
        fnAPIPDeleteEndpointconfirm(endpoint_id);
    }
}
function fnAPIPDeleteEndpointconfirm(endpoint_id) {
    modals.CloseConfirm();
    var data = {
        endpoint_type: "ENDPOINT_ID",
        endpoint_id: endpoint_id
    }
    CallAPI.Go(v_apip_endpoint_fn_delete, data, fnAPIPEndpointDeleteDataCallBack, "Processing...");
}
////////////////////////////////////////////
function fnAPIPRefreshClientEndpoint(process) {
    if (process === undefined) {
        CallAPI.Go(v_apip_client_endpoint_fn_get, undefined, fnAPIPClientEndpointGetDataCallBack);
    }
    else {
        CallAPI.Go(v_apip_client_endpoint_fn_get, undefined, fnAPIPClientEndpointGetDataCallBack, "Processing...");
    }
}
////////////////////////////////////////////

function fnAPIPRefreshClientSinature(process) {
    var client_sinature_appid = $("#apip_client_sinature_appid").val();
    var client_sinature_id = $("#apip_client_sinature_id").val();
    var sinature_id = $("#sinature_id").val();
    //var client_sinature_ids = $("#sinature_id_module").val();
    //let client_sinatureuser_id = client_sinature_ids.toString();
    if (client_sinature_appid == undefined || client_sinature_appid == "") {
        goAlert.alertErroTo("apip_client_sinature_appid", "Error", "Please choose app id", "change");
        return false;
    };
    if (client_sinature_id == "") {
        goAlert.alertErroTo("apip_client_sinature_id", "Check Error", "Client Sinature ID must be provided.");
        return false
    };


    var data = {
        client_sinature_appid: client_sinature_appid,
        client_sinature_id: client_sinature_id,
    };
    CallAPI.Go(v_apip_client_sinature_fn_get, data, fnAPIPClientSinatureGetDataCallBack, "Processing...");
        //CallAPI.Go(v_apip_client_sinature_fn_get, undefined, fnAPIPClientSinatureGetDataCallBack);
 
}
////////////////////////////////////////////
function fnAPIPRefreshMessage(process) {
    if (process === undefined) {
        CallAPI.Go(v_api_parameter_get_message, undefined, fnAPIPMessageGetDataCallBack);
    }
    else {
        CallAPI.Go(v_api_parameter_get_message, undefined, fnAPIPMessageGetDataCallBack, "Processing...");
    }
}


function fnCheckLanguageENG() {
    if (checkBox.checkStat("message_chk_eng") == true) {
        document.getElementById("mes_div_chk_eng").style.display = "";
    }
    else {
        document.getElementById("mes_div_chk_eng").style.display = "none";
        document.getElementById("div_messagesstatus_eng").style.display = "none";
    };
};
function fnCheckLanguageKHR() {
    if (checkBox.checkStat("message_chk_khr") == true) {
        document.getElementById("mes_div_chk_khr").style.display = "";
    }
    else {
        document.getElementById("mes_div_chk_khr").style.display = "none";
        document.getElementById("div_messagesstatus_khr").style.display = "none";
    };
};
function fnCheckLanguageTHB() {
    if (checkBox.checkStat("message_chk_thb") == true) {
        document.getElementById("mes_div_chk_thb").style.display = "";
    }
    else {
        document.getElementById("mes_div_chk_thb").style.display = "none";
        document.getElementById("div_messagesstatus_thb").style.display = "none";
    };
};
function apip_message_fn_clear() {
    element.setEnable("apip_message_id");
    element.inputValue("apip_message_id", "");
    element.inputValue("apip_message_description", "");
    element.inputValue("apip_message_description_eng", "");
    element.inputValue("apip_message_description_khr", "");
    element.inputValue("apip_message_description_thb", "");
    $("#apip_message_type").prop('selectedIndex', 0).change();
    //$("#apip_message_appid").prop('selectedIndex', 0).change();
    document.getElementById("api_message_btn_update").style.display = "none";
    document.getElementById("api_message_btn_submit").style.display = "";
    document.getElementById("div_messagesid_selected").style.display = "none";
    document.getElementById("div_messagescode").style.display = "none";
    element.setEnable("message_chk_eng");
    element.setEnable("message_chk_khr");
    element.setEnable("message_chk_thb");
    checkBox.Uncheck("message_chk_eng") == false;
    checkBox.Uncheck("message_chk_khr") == false;
    checkBox.Uncheck("message_chk_thb") == false;
    document.getElementById("mes_div_chk_eng").style.display = "none";
    document.getElementById("mes_div_chk_khr").style.display = "none";
    document.getElementById("mes_div_chk_thb").style.display = "none";
    document.getElementById("div_messagesstatus_eng").style.display = "none";
    document.getElementById("div_messagesstatus_khr").style.display = "none";
    document.getElementById("div_messagesstatus_thb").style.display = "none";
    document.getElementById("apip_message_appid").removeAttribute("disabled");
    document.getElementById("apip_message_type").removeAttribute("disabled");
}
//function SearchAppID() {
//    var appid_mes = $("#apip_message_appid").val();
//    var message_type = $("#apip_message_type").val();
//    if (appid_mes == "") {
//        goAlert.alertErroTo("apip_message_appid", "Processing Failed", "Message Appid must be input", "input");
//        return false;
//    }
//    if (message_type == "") {
//        goAlert.alertErroTo("apip_message_type", "Processing Failed", "Message type must be input", "input");
//        return false;
//    }
//    var data = {
//        appid_mes: appid_mes,
//        message_type: message_type,
//    };
//    CallAPI.Go(v_apip_message_fn_checkcode, data, fnAPIPMessageCheckDataCallBack, "Processing...");
//}
function apip_message_fn_submit() {
    var appid_mes = $("#apip_message_appid").val();
    var message_type = $("#apip_message_type").val();
    if (checkBox.checkStat("message_chk_eng") == true) {
        var message_eng = "ENG";
        var message_description_eng = $("#apip_message_description_eng").val();
        if (message_description_eng == null || message_description_eng == "") {
            goAlert.alertErroTo("apip_message_description_eng", "Processing Failed", "Message description english type must be input", "input");
            return false;
        }
    }
    else {
        message_eng = "ENG_NULL";
        message_description_eng = "ENG_NULL";
    };
    if (checkBox.checkStat("message_chk_khr") == true) {
        var message_khr = "KHR";
        var message_description_khr = $("#apip_message_description_khr").val();
        if (message_description_khr == null || message_description_khr == "") {
            goAlert.alertErroTo("apip_message_description_khr", "Processing Failed", "Message description khmer type must be input", "input");
            return false;
        }

    }
    else {
        message_khr = "KHR_NULL";
        message_description_khr = "KHR_NULL";
    };
    if (checkBox.checkStat("message_chk_thb") == true) {
        var message_thb = "THB";
        var message_description_thb = $("#apip_message_description_thb").val();
        if (message_description_thb == null || message_description_thb == "") {
            goAlert.alertErroTo("apip_message_description_thb", "Processing Failed", "Message description thailand type must be input", "input");
            return false;
        }
    }
    else {
        var message_thb = "THB_NULL";
        var message_description_thb = "THB_NULL";
    };
    if (message_eng == "ENG_NULL" && message_khr == "KHR_NULL" && message_thb == "THB_NULL") {
        goAlert.alertErroTo("message_chk_eng", "Processing Failed", "Message description english type must be select", "change");
        goAlert.alertErroTo("message_chk_khr", "Processing Failed", "Message description khmer type must be select", "change");
        goAlert.alertErroTo("message_chk_thb", "Processing Failed", "Message description thailand type must be select", "change");
        return false;
    }

    if (appid_mes == "" || appid_mes == null) {
        goAlert.alertErroTo("apip_message_appid", "Processing Failed", "Message Appid must be select", "change");
        return false;
    }
    if (message_type == "") {
        goAlert.alertErroTo("apip_message_type", "Processing Failed", "Message type must be input", "input");
        return false;
    }
    var data = {
        appid_mes: appid_mes,
        message_type: message_type,
        message_eng: message_eng,
        message_description_eng: message_description_eng,
        message_khr: message_khr,
        message_description_khr: message_description_khr,
        message_thb: message_thb,
        message_description_thb: message_description_thb,
    };
    CallAPI.Go(v_apip_message_fn_submit, data, fnAPIPMessageSubmitDataCallBack, "Processing...");
}
function fnAPIPEditMessage() {
    var message_id_obj = [];
    message_id_obj = table.GetValueSelected("api_parameter_tbl_message");
    if (message_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Message Code Selected");
        return false;
    }
    if (message_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var message_ids = stringCreate.FromObject(message_id_obj);
    var data = {
        message_type: "MESSAGE",
        message_ids: message_ids
    }
    CallAPI.Go(v_apip_message_fn_edit, data, fnAPIPMessageEditDataCallBack, "Processing...");
}
function apip_message_fn_update() {
    var message_id = $("#apip_message_id").val();
    var appid_mes = $("#apip_message_appid").val();
    var message_code = $("#apip_message_code").val();
    var message_type = $("#apip_message_type").val();
    if (checkBox.checkStat("message_chk_eng") == true) {
        var message_description_eng = $("#apip_message_description_eng").val();
        var message_status_eng = $("#apip_message_status_eng").val();
        if (message_description_eng == null || message_description_eng == "") {
            goAlert.alertErroTo("apip_message_description_eng", "Processing Failed", "Message description english type must be select", "change");
            return false;
        }
        if (message_status_eng == null || message_status_eng == "") {
            goAlert.alertErroTo("apip_message_status_eng", "Processing Failed", "Message status english type must be select", "change");
            return false;
        }

    }
    if (checkBox.checkStat("message_chk_khr") == true) {
        var message_description_khr = $("#apip_message_description_khr").val();
        var message_status_khr = $("#apip_message_status_khr").val();
        if (message_description_khr == null || message_description_khr == "") {
            goAlert.alertErroTo("apip_message_description_khr", "Processing Failed", "Message description khmer type must be select", "change");
            return false;
        }
        if (message_status_khr == null || message_status_khr == "") {
            goAlert.alertErroTo("apip_message_status_khr", "Processing Failed", "Message status khmer type must be select", "change");
            return false;
        }

    }

    if (checkBox.checkStat("message_chk_thb") == true) {
        var message_description_thb = $("#apip_message_description_thb").val();
        var message_status_thb = $("#apip_message_status_thb").val();
        if (message_description_thb == null || message_description_thb == "") {
            goAlert.alertErroTo("apip_message_description_thb", "Processing Failed", "Message description thailand type must be select", "change");
            return false;
        }
        if (message_status_thb == null || message_status_thb == "") {
            goAlert.alertErroTo("apip_message_status_thb", "Processing Failed", "Message status thailand type must be select", "change");
            return false;
        }
    }

    if (message_id == "") {
        goAlert.alertErroTo("apip_message_id", "Processing Failed", "Message id must be input", "input");
        return false;
    }
    if (appid_mes == "") {
        goAlert.alertErroTo("apip_message_appid", "Processing Failed", "Message Appid must be input", "input");
        return false;
    }
    if (message_code == "") {
        goAlert.alertErroTo("apip_message_code", "Processing Failed", "Message Code must be input", "input");
        return false;
    }
    if (message_type == "") {
        goAlert.alertErroTo("apip_message_type", "Processing Failed", "Message type must be input", "input");
        return false;
    }

    if (modals.ConfirmShowAgain("apipmessageconfirmupdate") == true) {
        modals.Confirm("Update Message Confirm", "Are you sure to update message " + message_id + " ?", "N", "Yes", "onclick", "apip_message_fn_update_confirm('" + message_id + "')", "apipmessageconfirmupdate");
    } else {
        apip_message_fn_update_confirm(message_id);
    }
}

function apip_message_fn_update_confirm(message_id) {
    modals.CloseConfirm();
    var message_id = $("#apip_message_id").val();
    var appid_mes = $("#apip_message_appid").val();
    var message_code = $("#apip_message_code").val();
    var message_type = $("#apip_message_type").val();
    if (checkBox.checkStat("message_chk_eng") == true) {
        var message_eng = "ENG";
        var message_description_eng = $("#apip_message_description_eng").val();
        var message_status_eng = $("#apip_message_status_eng").val();
    } else {
        var message_eng = "ENG_NULL";
        var message_description_eng = "ENG_NULL";
        var message_status_eng ="ENG_NULL"
    };
    if (checkBox.checkStat("message_chk_khr") == true) {
        var message_khr = "KHR";
        var message_description_khr = $("#apip_message_description_khr").val();
        var message_status_khr = $("#apip_message_status_khr").val();
    } else {
        var message_khr = "KHR_NULL";
        var message_description_khr = "KHR_NULL";
        var message_status_khr = "KHR_NULL"
    };

    if (checkBox.checkStat("message_chk_thb") == true) {
        var message_thb = "THB";
        var message_description_thb = $("#apip_message_description_thb").val();
        var message_status_thb = $("#apip_message_status_thb").val();
    } else {
        var message_thb = "THB_NULL";
        var message_description_thb = "THB_NULL";
        var message_status_thb = "THB_NULL"
    };
    var data = {
        message_id: message_id,
        appid_mes: appid_mes,
        message_code: message_code,
        message_type: message_type,
        message_eng: message_eng,
        message_description_eng: message_description_eng,
        message_status_eng: message_status_eng,
        message_khr: message_khr,
        message_description_khr: message_description_khr,
        message_status_khr: message_status_khr,
        message_thb: message_thb,
        message_description_thb: message_description_thb,
        message_status_thb: message_status_thb
    };
    CallAPI.Go(v_apip_message_fn_update, data, fnAPIPMessageUpdateDataCallBack, "Processing...");
}
function api_check_transaction_fn_query() {
    var transaction_type = $("#api_transaction_type").val();
    if (transaction_type === undefined || transaction_type == "") {
        goAlert.alertErroTo("api_transaction_type", "Error", "Please choose transaction types", "change");
        return false;
    };
    var dateTime = $("#api_transcation_query_date").val();
    if (dateTime === undefined || dateTime == "") {
        goAlert.alertErroTo("api_transcation_query_date", "Error", "Please choose transaction types");
        return false;
    };

    var fromdate = subString.FromDateTimeRange(dateTime);
    var todate = subString.ToDateTimeRange(dateTime);
    var data = {
        transaction_type: transaction_type,
        fromdate: fromdate,
        todate: todate,
    };
    CallAPI.Go(v_api_transaction_query, data, fnAPITQueryCallBack, "Processing...");
    $("#apit_tbl_get_detail_transaction_listing").DataTable().clear().draw();
};

function api_check_transaction_fn_detail(reference_no,service_type) {
    var data = {
        service_type: service_type,
        ref_no: reference_no,
    };
    CallAPI.Go(v_api_transaction_query_detail, data, fnAPITQueryDetailCallBack, "Processing...");
};
function api_check_transaction_fn_detail_data1(record_no, reference_no, service_type) {
    var data = {
        service_type: service_type,
        record_no: record_no,
        ref_no: reference_no,
    };
    modals.OpenStatic("modalpopupdetail");
    CallAPI.Go(v_api_transaction_detail_data1, data, fnAPITDetailData1CallBack, "Processing...");
};
function api_check_transaction_fn_detail_data2(record_no, reference_no, service_type) {
    var data = {
        service_type: service_type,
        record_no: record_no,
        ref_no: reference_no,
    };
    modals.OpenStatic("modalpopupdetail");
    CallAPI.Go(v_api_transaction_detail_data2, data, fnAPITDetailData2CallBack, "Processing...");
};
function api_check_transaction_fn_detail_data3(record_no, reference_no, service_type) {
    var data = {
        service_type: service_type,
        record_no: record_no,
        ref_no: reference_no,
    };
    modals.OpenStatic("modalpopupdetail");
    CallAPI.Go(v_api_transaction_detail_data3, data, fnAPITDetailData3CallBack, "Processing...");
};

function fnAPICCheckEndpoint() {
    modals.OpenStatic("modal_check_connection");
}
function api_transaction_fn_check_con(ProcessIndecatorType) {
    var connection_id = $("#api_endpoint_type").val();
    if (connection_id == "" || connection_id == null) {
        goAlert.alertErroTo("api_endpoint_type", "Processing Failed", "Service Type must be selected");
        return false;
    }
    var data = {
        endpoint_id: connection_id,
    }
    if (ProcessIndecatorType == "Process") {
        CallAPI.Go(v_api_connection_get_data, data, fnAPICGetDataCallBack, "Processing...");
    }
    else {

        CallAPI.Go(v_api_connection_get_data, data, fnAPICGetDataCallBack);
    }
};
//function api_connection_refresh_fn_list_downtime() {
//    CallAPI.Go(v_api_connection_downtime_listing, undefined, fnAPICGetServiceDownListingCallBack, "Processing...");
//}
var RefreshServiceInterval;
var RefreshService = 0;

function fnAutoRefreshService() {
var Service = $("#apic_auto_refresh_service").val();
    if (Service == "auto_refresh_service_15_sec") {
        clearInterval(RefreshServiceInterval);
        RefreshService = 0;
        $("#api_connection_refresh_all_service").removeClass("fa-spin");
        if (RefreshService == 0) {
            api_connection_refresh_fn_get_service();
            RefreshServiceInterval = setInterval(function () { api_connection_refresh_fn_get_service(); }, 15000);
            RefreshService = 1;
            $("#api_connection_refresh_all_service").addClass("fa-spin")
        }  
    }
    
    else if (Service == "auto_refresh_service_30_sec") {
        clearInterval(RefreshServiceInterval);
        RefreshService = 0;
        $("#api_connection_refresh_all_service").removeClass("fa-spin");
        if (RefreshService == 0) {
            api_connection_refresh_fn_get_service();
            RefreshServiceInterval = setInterval(function () { api_connection_refresh_fn_get_service(); }, 30000);
            RefreshService = 1;
            $("#api_connection_refresh_all_service").addClass("fa-spin")
        }
    }
    else if (Service == "auto_refresh_service_1_mn") {
        clearInterval(RefreshServiceInterval);
        RefreshService = 0;
        $("#api_connection_refresh_all_service").removeClass("fa-spin");
        if (RefreshService == 0) {
            api_connection_refresh_fn_get_service();
            RefreshServiceInterval = setInterval(function () { api_connection_refresh_fn_get_service(); }, 60000);
            RefreshService = 1;
             $("#api_connection_refresh_all_service").addClass("fa-spin")
        }
    }
    else {
        api_connection_refresh_fn_get_service();
        clearInterval(RefreshServiceInterval);
        RefreshService = 0;
        $("#api_connection_refresh_all_service").removeClass("fa-spin")
    }
}
function api_connection_refresh_fn_get_service() {
    CallAPI.Go(v_api_connection_list_all_service, undefined, fnAPICGetAllServiceListingCallBack, "Processing...");
}

function fnAPICCheckSerDowntime() {
    modals.OpenStatic("modal_ser_downtime");
}
function api_check_connection_fn_query() {
    var connection_type = $("#api_connection_type3").val();
    if (connection_type === undefined || connection_type == "") {
        goAlert.alertErroTo("api_connection_type1", "Error", "Please choose connection types", "change");
        return false;
    };
    var dateTime = $("#api_connection_date_check_down").val();
    if (dateTime === undefined || dateTime == "") {
        goAlert.alertErroTo("api_connection_query_date", "Error", "Please choose date connection types");
        return false;
    };

    var fromdate = subString.FromDateDateRange(dateTime);
    var todate = subString.ToDateDateRange(dateTime);
    var data = {
        connection_type: connection_type,
        fromdate: fromdate,
        todate: todate,
    };
    
     CallAPI.Go(v_api_connection_query, data, fnAPICGetServiceDownListingCallBack, "Processing..."); 
};
function apic_export_csv() {
    var connection_type = $("#api_connection_type3").val();
    if (connection_type === undefined || connection_type == "") {
        goAlert.alertErroTo("api_connection_type1", "Error", "Please choose connection types", "change");
        return false;
    };
    var dateTime = $("#api_connection_date_check_down").val();
    if (dateTime === undefined || dateTime == "") {
        goAlert.alertErroTo("api_connection_query_date", "Error", "Please choose date connection types");
        return false;
    };

    var fromdate = subString.FromDateDateRange(dateTime);
    var todate = subString.ToDateDateRange(dateTime);
    var data = {
        connection_type: connection_type,
        fromdate: fromdate,
        todate: todate,
    };

    CallAPI.Go(v_api_connection_query, data, fnAPICExportCallBack, "Processing...");
};

function fnAPICCheckDowntime(Process) {
    var dateTime = $("#api_connection_date_query_downtime").val();
    if (dateTime === undefined || dateTime == "") {
        goAlert.alertErroTo("api_connection_date_query_downtime", "Error", "Please choose date connection downtime");
        return false;
    };

    var fromdate = subString.FromDateTimeRange(dateTime);
    var todate = subString.ToDateTimeRange(dateTime);
    var data = {
        fromdate: fromdate,
        todate: todate,
    };
    if (Process == "Process") {
        CallAPI.Go(v_api_connection_query_chart, data, fnAPICChartCallBack, "Processing...");
    }
};

//function fnAPISelectall() {
//    //if ($("#api_connection_type1 option[value='ALL-001']").is(':selected')) {
//    //    $('#api_connection_type1 option').prop('selected', true);
//    //    $("#api_connection_type1 option[value='ALL-001']").prop('selected', false);
//    //}
//    if ($("#api_connection_type1 option[value='ALL-001']").is(':selected')) {
//        $('#api_connection_type1') = service_all;
//    } else {
//        $('#api_connection_type1').val();
//    }
//};
function fnAPICChartService() {
    modals.OpenStatic("modal_chart_connection");
};
function api_chart_down_connection_fn_query() {
    if ($("#api_connection_type1 option[value='ALL-001']").is(':selected')) {
        var connection_types = service_type_all;
    } else {
        var connection_types = $("#api_connection_type1").val();
    }
    //var connection_types = $("#api_connection_type1").val();
        const connection_type = Object.values(connection_types);
        if (connection_type === undefined || connection_type == "") {
            goAlert.alertErroTo("api_connection_type", "Error", "Please choose service types", "change");
            return false;
        };
        var dateTime = $("#api_connection_query_date").val();
        if (dateTime === undefined || dateTime == "") {
            goAlert.alertErroTo("api_connection_query_date", "Error", "Please choose date connection types");
            return false;
        };

        var fromdate = subString.FromDateDateRange(dateTime);
        var todate = subString.ToDateDateRange(dateTime);
        var data = {
            connection_type: connection_type,
            fromdate: fromdate,
            todate: todate,
        };
        CallAPI.Go(v_api_connection_chart_query, data, fnAPICALLChartCallBack, "Processing...");
    
};


function api_check_chart_connection_fn_query() {
    var service_type = $("#api_connection_type2").val(); 
    var date = $("#api_connection_date_query_downtime").val();
    if (service_type === undefined || service_type == "") {
        goAlert.alertErroTo("api_connection_type2", "Error", "Please choose service types", "change");
        return false;
    };
    if (date === undefined || date == "") {
        goAlert.alertErroTo("api_connection_date_query_downtime", "Error", "Please choose date");
        return false;
    };
    
    var data = {
        service_type: service_type,
        date: date,
    };

    CallAPI.Go(v_api_srvice_chart_query, data, fnAPICChartDayCallBack, "Processing...");
};
function apit_export_csv() {
    var transaction_type = $("#api_transaction_type").val();
    if (transaction_type === undefined || transaction_type == "") {
        goAlert.alertErroTo("api_transaction_type", "Error", "Please choose transaction types", "change");
        return false;
    };
    var dateTime = $("#api_transcation_query_date").val();
    if (dateTime === undefined || dateTime == "") {
        goAlert.alertErroTo("api_transcation_query_date", "Error", "Please choose transaction types");
        return false;
    };

    var fromdate = subString.FromDateTimeRange(dateTime);
    var todate = subString.ToDateTimeRange(dateTime);
    var data = {
        transaction_type: transaction_type,
        fromdate: fromdate,
        todate: todate,
    };
    CallAPI.Go(v_api_transaction_query, data, fnAPITExportCallBack, "Processing...");
};

var isCkTOOL = 1;
function fnAPIPGeneration() {
    alert
    if (isCkTOOL == 0) {

        fnAPIPGeneration("Y");
    }
    else {
        modals.OpenStatic("modal_tool");
    }

};
function fn_apip_tool() {
    //var type = $("#apip_tool_type").val();
    //var url_token = $("#apip_tool_url_token").val();
    //var key_id = $("#apip_tool_client_id").val();
    //var key_value = $("#apip_tool_client_secert").val();

    //var jsonObj = jsonObj || [];
    //for (var i = 1; i < cont_qty; i++) {
    //    item = {};
    //    item["apip_tool_name"] = $('#cont_no' + i).val();
    //    item["cont_size"] = $('#cont_size' + i).val();
    //    item["cont_type"] = $('#cont_type' + i).val();
    //    jsonObj.push(item);
    //}
    var names = [];
    var values = [];
    for (var i = 0; i <= 9; i++) {
        var header_name = $("#apip_tool_name" + i).val();
        var header_value = $("#apip_tool_value" + i).val();
        if (header_name != "" && header_name != undefined && header_value != "" && header_value != undefined) {
            names.push(header_name);
            values.push(header_value);
        }
        
    }
    var endpoint = $("#apip_tool_endpoint").val();
    var secretKey = $("#apip_tool_signature_secert").val();
    var algorithm = $("#apip_tool_algorithm").val();
    var header = $("#apip_tool_headers_sig").val();
    var keyid = $("#apip_tool_keyid").val();
    var type_headersig;
    if (checkBox.checkStat("header_signature") == true) {
        type_headersig = "Yes_Signature";
        if (endpoint === undefined || endpoint == "") {
            goAlert.alertErroTo("apip_tool_endpoint", "Processing Failed", "endpoint encrypte type must be input", "input");
            return false;
        };
        if (secretKey === undefined || secretKey == "") {
            goAlert.alertErroTo("apip_tool_signature_secert", "Processing Failed", "secert key type must be input", "input");
            return false;
        };
        if (algorithm === undefined || algorithm == "") {
            goAlert.alertErroTo("apip_tool_algorithm", "Processing Failed", "algorithm type must be input", "input");
            return false;
        };
        if (header === undefined || header == "") {
            goAlert.alertErroTo("apip_tool_headers_sig", "Processing Failed", "algorithm type must be input", "input");
            return false;
        };
        if (keyid === undefined || keyid == "") {
            goAlert.alertErroTo("apip_tool_keyid", "Processing Failed", "algorithm type must be input", "input");
            return false;
        };
    } else {
        type_headersig = "No_Signature";
    };
    
    var method = $("#apip_tool_method_req_data").val();
    var url_req = $("#apip_tool_url_req").val();
    const body = $("#apip_tool_body").val();

    var data = {
        name: names,
        value: values,
        type_headersig: type_headersig,
        endpoint: endpoint,
        secretKey: secretKey,
        algorithm: algorithm,
        header: header,
        keyid: keyid,
        method: method,
        url_req: url_req,
        body: body
    }
    CallAPI.Go(v_apip_tool, data, fnAPIToolCallBack, "Processing...");
};
async function fn_apip_tool_generation() {
    element.inputValue("apip_tool_trn_id", "");
    element.inputValue("apip_tool_create", "");
    element.inputValue("apip_tool_digest", "");
    element.inputValue("apip_tool_signature", "");
    element.inputValue("apip_tool_token", "");
    element.inputValue("apip_tool_response", "");
    var client_id = $("#apip_tool_client_id").val();
    var client_secert = $("#apip_tool_client_secert").val();
    var endpoint = $("#apip_tool_endpoint").val();
    var secretKey = $("#apip_tool_signature_secert").val();
    var url = $("#apip_tool_url").val();
    var body = $("#apip_tool_body").val();
    var algorithm = $("#apip_tool_algorithm").val();

    if (client_id == "" || client_id === undefined || client_secert == "" || client_secert === undefined || body == "" || body === undefined || url == "" || url === undefined || algorithm == "" || algorithm === undefined || secretKey == "" || secretKey === undefined || endpoint == "" || endpoint === undefined) {
        var transactionID = generateUUID();
        fnAPIToolTrnIDCallBack(transactionID);
        var created = Math.floor(new Date().getTime() / 1000.0);
        fnAPIToolCreatedCallBack(created);
        if (client_id != "" && client_id !== undefined && client_secert != "" && client_secert !== undefined) {
            var token;
            const tokens = await get_token(client_id, client_secert);
            if (tokens.status == "success") {
                token = tokens.tokenData.access_token;
            } else {
                token = JSON.stringify(tokens)
            };
            fnAPIToolTokenCallBack(token);
        }
        if (body != "" && body !== undefined) {
            //const digest = await hash(body);
            const hash = await crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(body))
            const digest = "SHA-256=" + btoa(String.fromCharCode(...new Uint8Array(hash)))
            fnAPIToolDigestCallBack(digest);
        };
        var scr = document.getElementById("reponse")
        scr.scrollIntoView();
        return true;
    };

    var token;
    const tokens = await get_token(client_id,client_secert);
    if (tokens.status == "success") {
        token = tokens.tokenData.access_token;
    } else {
        token = JSON.stringify(tokens)
    };
    fnAPIToolTokenCallBack(token);

    var transactionID = generateUUID();
    fnAPIToolTrnIDCallBack(transactionID);
    var datetime = new Date().getTime();
    var created = Math.floor(new Date().getTime() / 1000.0);
    fnAPIToolCreatedCallBack(created);
    var keyId = "client-shared-key";
    var headers = "(request-target) (created) digest client-transaction-id";
    var method = "POST";
    //const digest = await hash(body);
    const hash = await crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(body))
    const digest = "SHA-256=" + btoa(String.fromCharCode(...new Uint8Array(hash)))
    fnAPIToolDigestCallBack(digest);
    const ComputeSignature = "(request-target): " + method + " " + endpoint + "\n" + "(created): " + created + "\n" +"digest: " + digest + "\n" +"client-transaction-id: " + transactionID;
    const signatures = await hmacSha256Hex(secretKey,ComputeSignature);
    fnAPIToolSignatureCallBack(signatures);

    const signature = "keyId=\"" + keyId + "\", " + "algorithm=\"" + algorithm + "\", " + "created=" + created + ", " + "headers=\"" + headers + "\", " + "signature=\"" + signatures + "\"";

    
    try {
        const detail = await get_response(url, transactionID, created, digest, signature, token, body);
        var detail_value = JSON.stringify(detail);
        fnAPIToolCallBack(detail_value);
    } catch (err) {
        fnAPIToolCallBack(JSON.stringify(err.responseJSON));
    };


};
async function hmacSha256Hex(secret,message) {
    const enc = new TextEncoder("utf-8");
    const algorithm = { name: "HMAC", hash: "SHA-256" };
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        algorithm,
        false, ["sign", "verify"]
    );
    const hashBuffer = await crypto.subtle.sign(
        algorithm.name,
        key,
        enc.encode(message)
    );
    const hashHex = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
    return hashHex;
}

async function get_response(url,transactionID,created,digest,signature,token,body) {
    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "TransactionID": transactionID,
            "Created": created,
            "Digest": digest,
            "Signature": signature,
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
        },
        "data": body
    };
    return await $.ajax(settings).done(function (detail) { });
};
async function get_token(client_id,client_secert) {
    var settings = {
        "url": v_apip_url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "grant_type": "client_credentials",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "client_id": client_id,
            "client_secret": client_secert
        }),
    };
    return await $.ajax(settings).done(function (response) {}); 
};


function fnreqGet() {
    var req_type = $("#apip_tool_req_type").val();
    if (req_type == "Normal") {
        $("#apip_tool_aut_type").prop('selectedIndex', 0).change();
        element.setDisable("apip_tool_aut_type");
        $("#apip_tool_method_token").prop('selectedIndex', 0).change();
        element.setDisable("apip_tool_method_token");
        element.inputValue("apip_tool_url_token", "");
        element.setDisable("apip_tool_url_token");
        element.inputValue("apip_tool_client_id", "");
        element.setDisable("apip_tool_client_id");
        element.inputValue("apip_tool_client_secert", "");
        element.setDisable("apip_tool_client_secert");
        element.inputValue("apip_tool_content_type", "");
        element.setDisable("apip_tool_content_type");
        element.inputValue("apip_tool_algorithm", "");
        element.setDisable("apip_tool_algorithm");
        element.inputValue("apip_tool_endpoint", "");
        element.setDisable("apip_tool_endpoint");
        element.inputValue("apip_tool_signature_secert", "");
        element.setDisable("apip_tool_signature_secert");
    };
    if (req_type == "Token") {
        $("#apip_tool_aut_type").prop('selectedIndex', 0).change();
        element.setEnable("apip_tool_aut_type");
        $("#apip_tool_method_token").prop('selectedIndex', 0).change();
        element.setEnable("apip_tool_method_token");
        element.inputValue("apip_tool_url_token", "");
        element.setEnable("apip_tool_url_token");
        element.inputValue("apip_tool_client_id", "");
        element.setEnable("apip_tool_client_id");
        element.inputValue("apip_tool_client_secert", "");
        element.setEnable("apip_tool_client_secert");
        element.inputValue("apip_tool_content_type", "");
        element.inputValue("apip_tool_algorithm", "");
        element.setDisable("apip_tool_algorithm");
        element.inputValue("apip_tool_endpoint", "");
        element.setDisable("apip_tool_endpoint");
        element.inputValue("apip_tool_signature_secert", "");
        element.setDisable("apip_tool_signature_secert");
        element.inputValue("apip_tool_content_type", "");
        $("#apip_tool_method_req_data").prop('selectedIndex', 0).change();
        element.inputValue("apip_tool_url_req", "");
        element.inputValue("apip_tool_body", "");
    };
    if (req_type == "Header") {
        $("#apip_tool_aut_type").prop('selectedIndex', 0).change();
        element.setDisable("apip_tool_aut_type");
        $("#apip_tool_method_token").prop('selectedIndex', 0).change();
        element.setEnable("apip_tool_method_token");
        element.inputValue("apip_tool_url_token", "");
        element.setEnable("apip_tool_url_token");
        element.inputValue("apip_tool_client_id", "");
        element.setEnable("apip_tool_client_id");
        element.inputValue("apip_tool_client_secert", "");
        element.setEnable("apip_tool_client_secert");
        element.inputValue("apip_tool_content_type", "");
        element.setEnable("apip_tool_content_type");
        element.inputValue("apip_tool_algorithm", "");
        element.setEnable("apip_tool_algorithm");
        element.inputValue("apip_tool_endpoint", "");
        element.setEnable("apip_tool_endpoint");
        element.inputValue("apip_tool_signature_secert", "");
        element.setEnable("apip_tool_signature_secert");
        element.inputValue("apip_tool_content_type", "");
        $("#apip_tool_method_req_data").prop('selectedIndex', 0).change();
        element.inputValue("apip_tool_url_req", "");
        element.inputValue("apip_tool_body", "");
    };
};

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    var data = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    element.inputValue("apip_tool_trn_id", data);
};
function fnGetCreate(){
    var created = Math.floor(new Date().getTime() / 1000.0);
    element.inputValue("apip_tool_create", created);
}
var isCkDigest = 0;
function fnReqDigest() {
    if (isCkDigest == 0) {
        modals.OpenStatic("modal_digest");
    }
    else {
        fnGetdigest("Y");
    }
};
async function fnGetdigest() {
    var body = $("#apip_get_digest").val();
    if (body == null || body == "") {
        goAlert.alertErroTo("apip_get_digest", "Processing Failed", "body type must be input", "input");
        return false;
    }
    const hash = await crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(body))
    const digest = "SHA-256=" + btoa(String.fromCharCode(...new Uint8Array(hash)))
    element.inputValue("apip_tool_digest", digest);
    modals.Close("modal_digest");
};
var isCkSignature = 0;
function fnReqSignature() {
    if (isCkDigest == 0) {
        modals.OpenStatic("modal_generatesignature");
    }
    else {
        fnGetsignature("Y");
    }
};
async function fnGetsignature() {
    var algorithm = $("#apip_tool_sig_algorithm").val();
    var endpoint = $("#apip_tool_sig_endpoint").val();
    var secretKey = $("#apip_tool_sig_secert").val();
    var body = $("#apip_tool_sig_body").val();
    if (algorithm == null || algorithm == "") {
        goAlert.alertErroTo("apip_tool_sig_algorithm", "Processing Failed", "algorithm type must be input", "input");
        return false;
    }
    if (endpoint == null || endpoint == "") {
        goAlert.alertErroTo("apip_tool_sig_endpoint", "Processing Failed", "endpoint type must be input", "input");
        return false;
    }
    if (secretKey == null || secretKey == "") {
        goAlert.alertErroTo("apip_tool_sig_secert", "Processing Failed", "secretKey type must be input", "input");
        return false;
    }
    if (body == null || body == "") {
        goAlert.alertErroTo("apip_tool_sig_body", "Processing Failed", "body type must be input", "input");
        return false;
    }
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    var transactionID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    var datetime = new Date().getTime();
    var created = Math.floor(new Date().getTime() / 1000.0);
    var keyId = "client-shared-key";
    var headers = "(request-target) (created) digest client-transaction-id";
    var method = "POST";
    const hash = await crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(body))
    const digest = "SHA-256=" + btoa(String.fromCharCode(...new Uint8Array(hash)))
    const ComputeSignature = "(request-target): " + method + " " + endpoint + "\n" + "(created): " + created + "\n" + "digest: " + digest + "\n" + "client-transaction-id: " + transactionID;
    const signatures = await hmacSha256Hex(secretKey, ComputeSignature);
    const signature = "keyId=\"" + keyId + "\", " + "algorithm=\"" + algorithm + "\", " + "created=" + created + ", " + "headers=\"" + headers + "\", " + "signature=\"" + signatures + "\"";
    element.inputValue("apip_tool_signature", signature);
    modals.Close("modal_generatesignature");
}
//async function hash(body) {
//    const hash = await crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(body))
//    const digest = "SHA-256=" + btoa(String.fromCharCode(...new Uint8Array(hash)))
//    return digest;
//};


let x = 1;
function fnAddheader() {
    var max_fields = 10;
    var wrapper = $(".container1");
    if (x < max_fields) {  
        $(wrapper).append('<div class="col-sm-12" id="header_auth'+x+'"><div class="row"><div class="col-sm-1"><div class="form-group"><button class="delete" id="api_tool_generation" type="button" style="padding:3.5px;background-color:red;color:white" onclick="fnRemoveheader('+x+')"><i class="fas fa-minus"></i></button></div></div><div class="col-sm-5"><div class="form-group"><input type="text" class="form-control form-control-sm" id="apip_tool_name' + x + '" placeholder="Enter name' + x + '"></div></div><div class="col-sm-6"><div class="form-group"><input type="text" class="form-control form-control-sm" id="apip_tool_value' + x + '" placeholder="Enter value' + x +'"></div></div></div></div>'); //add input box
        x++;
    } else {
        alert('You Reached the limits')
    }

    //$(wrapper).on("click", "#api_tool_generation", function () {
    //    $(this).parent("#header").remove();
    //    x--;
    //})
};
function fnRemoveheader(x) {
    $('#header_auth' + x).remove();
};
function fnHeaderSignature() {
    if (checkBox.checkStat("header_signature") == true) {
        element.setEnable("apip_tool_endpoint");
        element.setEnable("apip_tool_algorithm");
        element.setEnable("apip_tool_signature_secert");
        element.setEnable("apip_tool_headers_sig");
        element.setEnable("apip_tool_keyid");
    }
    else {
        element.inputValue("apip_tool_endpoint", "");
        element.setDisable("apip_tool_endpoint");
        element.inputValue("apip_tool_algorithm", "");
        element.setDisable("apip_tool_algorithm");
        element.inputValue("apip_tool_signature_secert", "");
        element.setDisable("apip_tool_signature_secert");
        element.inputValue("apip_tool_headers_sig", "");
        element.setDisable("apip_tool_headers_sig");
        element.inputValue("apip_tool_keyid", "");
        element.setDisable("apip_tool_keyid");
    };
};
//////////////////User View Transcation///////////////////
var isCkSERVICE = 1;
function fnAPIPUserService() {
    alert
    if (isCkSERVICE == 0) {
        //fnAPIPRefreshServiceMap();
        fnGetServiceID();
    }
    else {
        modals.OpenStatic("modal_view_service");
        //fnAPIPRefreshServiceMap();
        fnGetServiceID();
    }

}
function fnGetServiceID() {
    CallAPI.Go(v_apip_user_check_fn, undefined, fnAPIPUserTxnCheckDataCallBack, "Processing...");
}
function SearchUserViewService() {
    var user_view_service = $("#apip_user_view_service").val();
    if (user_view_service == "") {
        goAlert.alertErroTo("apip_user_view_service", "Processing Failed", "User must be input", "input");
        return false;
    }

    var data = {
        user_view_service: user_view_service,
    }
    CallAPI.Go(v_apip_user_view_fn_map_check, data, fnAPIPUserServiceMapCheckDataCallBack, "Fetching Data...");
}
function fnAPIPRefreshServiceMap(process) {
    if (process === undefined) {
        CallAPI.Go(v_apip_user_view_fn_get, undefined, fnAPIPUserServiceGetDataCallBack);
    }
    else {
        CallAPI.Go(v_apip_user_view_fn_get, undefined, fnAPIPUserServiceGetDataCallBack, "Processing...");
    }
}
function apip_service_fn_submit() {
    var user_view_service = $("#apip_user_view_service").val();
    var service_mapping = $("#user_service_mapping").val();
    let service_mappings = service_mapping.toString();

    if (user_view_service == "") {
        goAlert.alertErroTo("apip_user_view_service", "Processing Failed", "User must be input", "input");
        return false
    };
    if (service_mappings === undefined || service_mappings == "") {
        if (length_user_view == "" || length_user_view === undefined) {
            goAlert.alertErroTo("user_service_mapping", "Error", "Please choose service id", "change");
            return false;
        };
    };


    var data = {
        user_view_service: user_view_service,
        service_id: service_mappings,
    };
    CallAPI.Go(v_apip_user_service_fn_register, data, fnAPIPUserServiceRegisterCallBack, "Processing...");
}
function apiu_service_export_csv() {
    CallAPI.Go(v_apip_user_view_fn_get, undefined, fnAPIUSExportCallBack, "Processing...");
};




    
