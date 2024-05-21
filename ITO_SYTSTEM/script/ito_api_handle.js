/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
/// <reference path="ito_user_info_handle.js" />

///////////////////////////////////////
function fnAPIManegementLoadCallBack(data) {
    if (data.status == "1") {
        var option_service_type = '<option value=""></option>';
        v_step_auto = [];
        $.each(data.data.all_service_type, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.all_service_type);
            }
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                option_service_type = option_service_type + '<option value="' + item.service_name + '">' + item.service_desc + '</option>';
            } else {
                option_service_type = option_service_type + '<option value="' + item.service_name + '">' + item.service_desc + '</option>';
            }
        });
        selectionStyle.LiveSearch("api_parameter_type", option_service_type);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};

function fnAPITransactionLoadTypeCallBack(data) {
    if (data.status == "1") {
        var option_service_type = '<option value=""></option>';
        v_step_auto = [];
        $.each(data.data.all_transaction_service_type, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.all_transaction_service_type);
            }
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                option_service_type = option_service_type + '<option value="' + item.service_name + '">' + item.service_desc + '</option>';
            } else {
                option_service_type = option_service_type + '<option value="' + item.service_name + '">' + item.service_desc + '</option>';
            }
        });
        selectionStyle.LiveSearch("api_transaction_type", option_service_type);
        /*selectionStyle.LiveSearch("api_service_type", option_service_type);*/

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPGetDataCallBack(data) {
    if (data.status == "1") {
        var columns_param = [{
            'data': 'param_name',
            'render': function (param_name) {
                return "<input type='checkbox' style='margin-left:28%;' value='" + param_name + "' />"
            },
            'sortable': false
        },
        {
            'data': 'param_name'
        },
        {
            'data': 'param_value'
        },
        {
            'data': 'system'
        },
        {
            'data': '',
            'render': function () {
                return ""   
            }
        }
        ];
        dataTable.ApplyJson("apim_tbl_get_parameter_type_listing", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPEditParamCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.inputValue("ParamName", item.param_name);
            element.inputValue("ParamValue", item.param_value);
            element.inputValue("System", item.system);
            element.setDisable("ParamName");
            element.setDisable("System");

            goAlert.alertInfo("api retrive parameter", data.message);
            window.scrollTo(0, 0);
        });
    }
    else {
        goAlert.alertError("api retrive parameter", data.message);

    }
};
function fnAPIPUpdateParamCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Param Update", data.message);
        modals.Close("modalEditParameter");
        api_parameter_fn_query_param_type();
    } else {
        goAlert.alertError("Param Update Error", data.message);
    }
    /*modals.Close("modalEditParameter");*/
};
function fnAPIPEndpointGetDataCallBack(data) {
    if (isCkENDPONIT == 0) {
        modals.OpenStatic("modal_endpoint_register_monitoring");
        isCkENDPONIT = 1;
    }
    if (data.status == "1") {
        var columns_param = [{
            'data': 'endpoint_id',
            'render': function (endpoint_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + endpoint_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'endpoint_id'
        },
        {
            'data': 'description'
        },
        {
            'data': 'endpoint'
        },
        { 'data': 'status' },
        { 'data': 'endpoint_type' },
        { 'data': 'key_name' },
        { 'data': 'key_value' },
        { 'data': 'method' },
        { 'data': 'content_type' },
        { 'data': 'dc_or_dr' },
        { 'data': 'current_service' },
        { 'data': 'status_code' },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
    
        dataTable.ApplyJson("api_parameter_tbl_endpoint", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPEndpointSubmitDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Parameter Endpoint Process", data.message);
        var scr = document.getElementById("listing_endpoint")
        scr.scrollIntoView();
        fnAPIPRefreshEndpoint();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAPIPEndpointEditDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.setDisable("apip_endpoint_id");
            element.inputValue("apip_endpoint_id", item.endpoint_id);
            element.inputValue("apip_endpoint_description", item.endpoint_description);
            element.inputValue("apip_endpoint", item.endpoint);
            element.inputValue("apip_endpoint_message_body", item.message_body);
            element.inputValue("apip_endpoint_key_name", item.key_name);
            element.inputValue("apip_endpoint_key_value", item.key_value);
            element.inputValue("apip_endpoint_content_type", item.content_type);

            $("#apip_endpoint_status").val(item.endpoint_status).change();
            $("#apip_endpoint_type").val(item.endpoint_type).change();
            $("#apip_endpoint_method").val(item.method).change();
            $("#apip_endpoint_service_type").val(item.service_type).change();

            goAlert.alertInfo("endpoint retrive data", data.message);
            window.scrollTo(0, 0);
            var scr = document.getElementById("Endpoint")
            scr.scrollIntoView();
            document.getElementById("api_endpoint_btn_update").style.display = "";
            document.getElementById("api_endpoint_btn_submit").style.display = "none";
        });
    }
    else {
        goAlert.alertError("endpoint retrive data", data.message);

    }
};

function fnAPIPClientEndpointMapDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $("#apip_client_endpoint_appid").val(data.client_endpoint_appid).change();
        element.setDisable("apip_client_endpoint_id");
        element.inputValue("apip_client_endpoint_id", data.client_endpoint_id);
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                option_service_type = option_service_type + '<option value="' + item.endpointuser_id + '">' + item.endpointuser_desc + '</option>';
            } else {
                option_service_type = option_service_type + '<option value="' + item.endpointuser_id + '">' + item.endpointuser_desc + '</option>';
            }
        });
        document.getElementById("endpoint_div_chk").style.display = "none";
        selectionStyle.Multiple("endpoint_id_module", option_service_type);
        
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    }
    else {
        goAlert.alertError("client endpoint retrive data", data.message);

    }
};
var length_clientendpoint;
function fnAPIPClientEndpointMapCheckDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                if (item.endpoint_id == "") {
                    option_service_type = option_service_type + '<option value="' + item.endpointuser_id + '">' + item.endpointuser_desc + '</option>';
                } else {
                    option_service_type = option_service_type + '<option selected="selected" value="' + item.endpointuser_id + '">' + item.endpointuser_desc + '</option>';
                }
                
            } else {
                if (item.endpoint_id == "") {
                    option_service_type = option_service_type + '<option value="' + item.endpointuser_id + '">' + item.endpointuser_desc + '</option>';
                } else {
                    option_service_type = option_service_type + '<option selected="selected" value="' + item.endpointuser_id + '">' + item.endpointuser_desc + '</option>';
                }
            }
            length_clientendpoint = item.endpoint_id;
        });
        
        document.getElementById("endpoint_div_chk").style.display = "";
        selectionStyle.Multiple("endpoint_id_module", option_service_type);
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    }
    else {
        goAlert.alertError("client endpoint retrive data", data.message);

    }
};
function fnAPIPClientEndpointRegisterCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Parameter Endpoint Process", data.message);
        var scr = document.getElementById("listing_client_endpoint")
        scr.scrollIntoView();
        SearchAppIDClientEndMap();
        //fnAPIPRefreshClientEndpoint();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
var length_clientsignature;
function fnAPIPClientSinatureMapCheckDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                if (item.client_sinatureuser_id == "") {
                    option_service_type = option_service_type + '<option value="' + item.client_sinatureuser_appid + '">' + item.client_sinatureuser_des + '</option>';
                } else {
                    option_service_type = option_service_type + '<option selected="selected" value="' + item.client_sinatureuser_appid + '">' + item.client_sinatureuser_des + '</option>';
                }

            } else {
                if (item.client_sinatureuser_id == "") {
                    option_service_type = option_service_type + '<option value="' + item.client_sinatureuser_appid + '">' + item.client_sinatureuser_des + '</option>';
                } else {
                    option_service_type = option_service_type + '<option selected="selected" value="' + item.client_sinatureuser_appid + '">' + item.client_sinatureuser_des + '</option>';
                }
            }
            length_clientsignature = item.endpoint_id;
        });
        document.getElementById("sinature_div_chk").style.display = "";
        selectionStyle.Multiple("sinature_id_module", option_service_type);
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    }
    else {
        goAlert.alertError("client sinature retrive data", data.message);

    }
};
function fnAPIPClientSinatureMapDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        element.setDisable("apip_client_sinature_id");
        element.inputValue("apip_client_sinature_id", data.client_sinature_id);
        $("#apip_client_sinature_appid").val(data.client_sinature_appid).change();
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                option_service_type = option_service_type + '<option value="' + item.client_sinatureuser_id + '">' + item.client_sinatureuser_des + '</option>';
            } else {
                option_service_type = option_service_type + '<option value="' + item.client_sinatureuser_id + '">' + item.client_sinatureuser_des + '</option>';
            }
        });
        //document.getElementById("sinature_div_chk").style.display = "none";
        selectionStyle.LiveSearch("sinature_id", option_service_type);
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    }
    else {
        goAlert.alertError("client sinature retrive data", data.message);

    }
};
function fnAPIPClientSinatureRegisterCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Parameter Client Sinature Process", data.message);
        var scr = document.getElementById("listing_client_sinature")
        scr.scrollIntoView();
        SearchAppIDClientSigMap();
        //fnAPIPRefreshClientSinature();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
var p_si_app_id;
var p_si_client_id;
var p_si_id;
function fnAPIPClientSinatureEditDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.setDisable("apip_client_sinature_id");
            element.inputValue("apip_client_sinature_id", item.client_id);

            $("#apip_client_sinature_appid").val(item.app_id).change();
            $("#sinature_id").val(item.sinature_id).change();
            $("#apip_client_sinature_status").val(item.sinature_status).change();
            //document.getElementById("apip_client_sinature_appid").setAttribute("disabled", "disabled");

            goAlert.alertInfo("client sinature retrive data", data.message);
            window.scrollTo(0, 0);
            var scr = document.getElementById("client_sinature")
            scr.scrollIntoView();
            document.getElementById("div_cs_status").style.display = "";
            document.getElementById("api_client_signature_btn_update").style.display = "";
            document.getElementById("api_client_signature_btn_submit").style.display = "none";
            p_si_app_id = item.app_id;
            p_si_client_id = item.client_id;
            p_si_id = item.sinature_id;
        });
    }
    else {
        goAlert.alertError("client sinature retrive data", data.message);

    }
};
function fnAPIPClientSinatureUpdateDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Client Sinature Update", data.message);
        var scr = document.getElementById("listing_client_signature")
        scr.scrollIntoView();
        document.getElementById("div_cs_status").style.display = "none";
        document.getElementById("api_client_signature_btn_update").style.display = "none";
        document.getElementById("api_client_signature_btn_submit").style.display = "";
        document.getElementById("apip_client_sinature_appid").setAttribute("enabled", "enabled");
        fnAPIPRefreshClientSinature();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAPIPEndpointUpdateDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Endpoint Update", data.message);
        apip_endpoint_fn_clear();
        var scr = document.getElementById("listing_endpoint")
        scr.scrollIntoView();
        fnAPIPRefreshEndpoint();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnAPIPEndpointDeleteDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Endpoint Process", data.message);
        var scr = document.getElementById("listing_endpoint")
        scr.scrollIntoView();
        fnAPIPRefreshEndpoint();
    } else {
        goAlert.alertError("Delete Server Process", data.message);
    }
}

function fnAPIPClientDeleteDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Client Process", data.message);
        var scr = document.getElementById("listing_client")
        scr.scrollIntoView();
        fnAPIPRefreshClient();
    } else {
        goAlert.alertError("Delete Server Process", data.message);
    }
}

function fnAPIPClientGetDataCallBack(data) {
    if (isCkCLIENT == 0) {
        modals.OpenStatic("modal_client");
        isCkCLIENT = 1;
    }
    if (data.status == "1") {
        var columns_param = [{
            'data': 'client_id',
            'render': function (client_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + client_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'appid_client'
        },
        {
            'data': 'client_id'
        },
        {
            'data': 'client_secert'
        },
        { 'data': 'client_name' },
            { 'data': 'client_des' },
            { 'data': 'grent_type' },
            { 'data': 'client_status' },
            { 'data': 'create_date' },
            { 'data': 'update_date' },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];

        dataTable.ApplyJson("api_parameter_tbl_client", columns_param, data.data);
        /*dataTable.ApplyJson("apim_tbl_get_parameter_type_listing", columns_param, data.data);*/

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPClientSubmitDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Parameter Client Process", data.message);
        var scr = document.getElementById("listing_client")
        scr.scrollIntoView();
        fnAPIPRefreshClient();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
var p_client_id;
var p_client_secert;
function fnAPIPClientEditDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.inputValue("apip_client_appid", item.appid_client);
            element.inputValue("apip_client_id", item.client_id);
            element.inputValue("apip_client_secert", item.client_secert);
            element.inputValue("apip_client_name", item.client_name);
            element.inputValue("apip_client_description", item.client_des);
            element.inputValue("apip_client_typegrent", item.grent_type);

            $("#apip_client_status").val(item.client_status).change();

            goAlert.alertInfo("client retrive data", data.message);
            window.scrollTo(0, 0);
            var scr = document.getElementById("Client")
            scr.scrollIntoView();
            document.getElementById("api_client_btn_update").style.display = "";
            document.getElementById("api_client_btn_submit").style.display = "none";
            document.getElementById("div_client_id").style.display = "";
            document.getElementById("div_client_secert").style.display = "";
            document.getElementById("div_client_status").style.display = "";
            p_client_id = item.client_id;
            p_client_secert = item.client_secert;
        });
    }
    else {
        goAlert.alertError("client retrive data", data.message);

    }
};
function fnAPIPClientUpdateDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Client Update", data.message);
        apip_client_fn_clear();
        var scr = document.getElementById("listing_client")
        scr.scrollIntoView();
        fnAPIPRefreshClient();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnAPIPSinatureGetDataCallBack(data) {
    if (isCkSINATURE == 0) {
        modals.OpenStatic("modal_sinature");
        isCkSINATURE = 1;
    }
    if (data.status == "1") {
        var columns_param = [{
            'data': 'sinature_id',
            'render': function (sinature_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + sinature_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'sinature_id'
            },
            { 'data': 'created_by' },
            { 'data': 'created_date' },
            { 'data': 'modifired_by' },
            { 'data': 'modifired_date' },
        {
            'data': 'sinature_status'
            },
            {
                'data': 'sinature_keyid'
            },
        {
            'data': 'sinature_algorithm'
        },
            { 'data': 'sinature_headers' },
            { 'data': 'sinature_secretkey' },
            { 'data': 'sinature_maxagerequest' },

        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];

        dataTable.ApplyJson("api_parameter_tbl_sinature", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPSinatureSubmitDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Parameter Sinature Process", data.message);
        var scr = document.getElementById("listing_sinature")
        scr.scrollIntoView();
        fnAPIPRefreshSinature();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAPIPSinatureDeleteDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Sianture Process", data.message);
        var scr = document.getElementById("listing_sinature")
        scr.scrollIntoView();
        fnAPIPRefreshSinature();
    } else {
        goAlert.alertError("Delete Server Process", data.message);
    }
}
function fnAPIPSinatureEditDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.setDisable("apip_sinature_id");
            element.setDisable("apip_sinature_secretkey");
            element.inputValue("apip_sinature_id", item.sinature_id);
            element.inputValue("apip_sinature_keyid", item.sinature_keyid);
            element.inputValue("apip_sinature_algorithm", item.sinature_algorithm);
            element.inputValue("apip_sinature_headers", item.sinature_headers);
            element.inputValue("apip_sinature_secretkey", item.sinature_secretkey);
            element.inputValue("apip_sinature_maxagerequest", item.sinature_max);

            $("#apip_sinature_status").val(item.sinature_status).change();

            goAlert.alertInfo("sinature retrive data", data.message);
            window.scrollTo(0, 0);
            var scr = document.getElementById("Sinature")
            scr.scrollIntoView();
            document.getElementById("api_sinature_btn_update").style.display = "";
            document.getElementById("api_sinature_btn_submit").style.display = "none";
            document.getElementById("div_sinature_selected").style.display = "";
            document.getElementById("div_sinature_status_selected").style.display = "";
            document.getElementById("div_sinature_secretkey").style.display = "";
        });
    }
    else {
        goAlert.alertError("sinature retrive data", data.message);

    }
};
function fnAPIPSinatureUpdateDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Sinature Update", data.message);
        apip_sinature_fn_clear();
        var scr = document.getElementById("listing_sinature")
        scr.scrollIntoView();
        fnAPIPRefreshSinature();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnAPIPEndpointUserGetDataCallBack(data) {
    if (isCkCLIENT == 0) {
        modals.OpenStatic("modal_endpoint");
        isCkCLIENT = 1;
    }
    if (data.status == "1") {
        var columns_param = [{
            'data': 'endpoint_id',
            'render': function (endpoint_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + endpoint_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'api_id'    
        },
            { 'data': 'endpoint_id' },
            { 'data': 'endpoint' },
            {
                'data': 'method'
            },
            {
                'data': 'record_status'
            },
        { 'data': 'created_by' },
            { 'data': 'created_date' },
            { 'data': 'modifired_by' },
            { 'data': 'modifired_date' },
        {
            'data': 'enabled'
        },
        {
            'data': 'debug'
        },
        {
            'data': 'debug_name'
        },
        { 'data': 'authorize' },
        { 'data': 'validatetrn_id' },
            { 'data': 'validate_createtime' },
            { 'data': 'validate_agerequest' },
            { 'data': 'validate_digest' },
            { 'data': 'validate_sinature' },
            { 'data': 'sourcesystem_check' },
            { 'data': 'allowanonymous' },
            { 'data': 'multipart_data' },
            { 'data': 'auth_type' },
            { 'data': 'api_key' },

        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];

        dataTable.ApplyJson("api_parameter_tbl_userendpoint", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPEndpointUserSubmitDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Parameter Endpoint Process", data.message);
        var scr = document.getElementById("listing_userendpoint")
        scr.scrollIntoView();
        fnAPIPRefreshUserEndpoint();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAPIPEndpointUserDeleteDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Endpoint Process", data.message);
        var scr = document.getElementById("listing_userendpoint")
        scr.scrollIntoView();
        fnAPIPRefreshUserEndpoint();
    } else {
        goAlert.alertError("Delete Endpoint Process", data.message);
    }
}
function fnAPIPEndpointUserEditDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.setDisable("apip_endpointuser_endpointid");
            element.inputValue("apip_endpointuser_apiid", item.api_id);
            element.inputValue("apip_endpointuser_endpointid", item.endpoint_id);
            element.inputValue("apip_endpointuser", item.endpoint);
            element.inputValue("apip_endpointuser_debug_name", item.debug_name);
            element.inputValue("apip_endpointuser_apikey", item.api_key);

            $("#apip_endpointuser_method").val(item.method).change();
            $("#apip_endpointuser_status").val(item.record_status).change();
            $("#apip_endpointuser_enable").val(item.enabled).change();
            $("#apip_endpointuser_debug").val(item.debug).change();
            $("#apip_endpointuser_authorize").val(item.authorize).change();
            $("#apip_endpointuser_validatetrnid").val(item.validatetrn_id).change();
            $("#apip_endpointuser_validatecreatetime").val(item.validate_createtime).change();
            $("#apip_endpointuser_validateagq").val(item.validate_agerequest).change();
            $("#apip_endpointuser_validatedigest").val(item.validate_digest).change();
            $("#apip_endpointuser_validatesinature").val(item.validate_sinature).change();
            $("#apip_endpointuser_sourcesys").val(item.sourcesystem_check).change();
            $("#apip_endpointuser_allowanymous").val(item.allowanonymous).change();
            $("#apip_endpointuser_multipartdata").val(item.multipart_data).change();
            $("#apip_endpointuser_type_auth").val(item.auth_type).change();
            if (item.auth_type != "Bearer") {
                document.getElementById("div_endpointuser_Apikey").style.display = "";
            } else {
                document.getElementById("div_endpointuser_Apikey").style.display = "none";
            }
            goAlert.alertInfo("endpoint retrive data", data.message);
            window.scrollTo(0, 0);
            var scr = document.getElementById("Endpoint_User")
            scr.scrollIntoView();
            document.getElementById("api_userendpoint_btn_update").style.display = "";
            document.getElementById("api_userendpoint_btn_submit").style.display = "none";
            document.getElementById("div_endpoint_selected").style.display = "";
            document.getElementById("div_endpoint_status_selected").style.display = "";
            
        });
    }
    else {
        goAlert.alertError("sinature retrive data", data.message);

    }
};
function fnAPIPEndpointUserUpdateDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Endpoint Update", data.message);
        apip_userendpoint_fn_clear();
        var scr = document.getElementById("listing_userendpoint")
        scr.scrollIntoView();
        fnAPIPRefreshUserEndpoint();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnAPIPClientEndpointGetDataCallBack(data) {
    modals.OpenStatic("modal_client_endpoint");
    if (data.status == "1") {
        var columns_param = [{
            'data': 'endpoint_id',
            'render': function (endpoint_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + endpoint_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'app_id'
        },
        { 'data': 'client_id' },
        { 'data': 'endpoint_id' },
        { 'data': 'record_status' },
        { 'data': 'created_by' },
        { 'data': 'created_date' },
        { 'data': 'modifired_by' },
        { 'data': 'modifired_date' },
        { 'data': 'action_type' },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];

        dataTable.ApplyJson("api_parameter_tbl_client_endpoint", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPClientSinatureGetDataCallBack(data) {
    modals.OpenStatic("modal_client_sinature");
    if (data.status == "1") {
        var columns_param = [{
            'data': 'app_id',
            'render': function (data, type, row) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + row['app_id'] + ',' + row['client_id'] + ',' + row['sig_id'] +"' />"
            },
            'sortable': false
        },
        {
            'data': 'app_id'
        },
        { 'data': 'client_id' },
        { 'data': 'sig_id' },
        { 'data': 'record_status' },
        { 'data': 'created_by' },
        { 'data': 'created_date' },
        { 'data': 'modifired_by' },
        { 'data': 'modifired_date' },
        { 'data': 'action_type' },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];

        dataTable.ApplyJson("api_parameter_tbl_client_sinature", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};

function fnAPIPMessageGetDataCallBack(data) {
    if (isCkMESSAGE == 0) {
        modals.OpenStatic("modal_message");
        isCkMESSAGE = 1;
    }
    if (data.status == "1") {
        var columns_param = [{
            'data': 'message_id',
            'render': function (message_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + message_id + "' />"
            },
            'sortable': false
        },
            {
                'data': 'message_id'
            },
        {
            'data': 'appid_mes'
        },
        {
            'data': 'message_code'
        },
        {
            'data': 'message_type'
        },
        { 'data': 'message_language' },
            { 'data': 'message_description' },
            { 'data': 'record_status' },
            { 'data': 'created_by' },
            { 'data': 'created_date' },
            { 'data': 'modifired_by' },
            { 'data': 'modifired_date' },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];

        dataTable.ApplyJson("api_parameter_tbl_message", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPMessageCheckDataCallBack(data) {
    if (data.status == "1") {
        element.inputValue("apip_message_code", data.message_code);
    }
}
function fnAPIPMessageSubmitDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Parameter Message Process", data.message);
        apip_message_fn_clear();
        fnAPIPRefreshMessage();
        var scr = document.getElementById("listing_message")
        scr.scrollIntoView();
        
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAPIPMessageEditDataCallBack(data) {
    if (data.status == "1") {
        element.inputValue("apip_message_id", data.message_id);
        element.inputValue("apip_message_code", data.message_code);
        $("#apip_message_appid").val(data.appid_mes).change();
        $("#apip_message_type").val(data.message_type).change();
        document.getElementById("div_messagescode").style.display = "";
        document.getElementById("apip_message_appid").setAttribute("disabled", "disabled");
        document.getElementById("apip_message_type").setAttribute("disabled", "disabled");
        element.setDisable("apip_message_id");

        if (data.data.message_eng != "" && data.data.message_eng !== undefined) {
            checkBox.Check("message_chk_eng") == true;
            element.setDisable("message_chk_eng");
            document.getElementById("mes_div_chk_eng").style.display = "";
            document.getElementById("div_messagesstatus_eng").style.display = "";
            $.each(data.data.message_eng, function (i, item) {  
                element.inputValue("apip_message_description_eng", item.message_description_eng);
                $("#apip_message_status_eng").val(item.record_status_eng).change();
            });
        }
        if (data.data.message_khr != "" && data.data.message_khr !== undefined) {
            checkBox.Check("message_chk_khr") == true;
            element.setDisable("message_chk_khr");
            document.getElementById("mes_div_chk_khr").style.display = "";
            document.getElementById("div_messagesstatus_khr").style.display = "";
            $.each(data.data.message_khr, function (i, item) {
                element.inputValue("apip_message_description_khr", item.message_description_khr);
                $("#apip_message_status_khr").val(item.record_status_khr).change();
            });
        }
        if (data.data.message_thb != "" && data.data.message_thb !== undefined) {
            checkBox.Check("message_chk_thb") == true;
            element.setDisable("message_chk_thb");
            document.getElementById("mes_div_chk_thb").style.display = "";
            document.getElementById("div_messagesstatus_thb").style.display = "";
            $.each(data.data.message_thb, function (i, item) {
                element.inputValue("apip_message_description_thb", item.message_description_thb);
                $("#apip_message_status_thb").val(item.record_status_thb).change();
            });
        }
        
        goAlert.alertInfo("message retrive data", data.message);
        window.scrollTo(0, 0);
        var scr = document.getElementById("Message")
        scr.scrollIntoView();
        document.getElementById("api_message_btn_update").style.display = "";
        document.getElementById("api_message_btn_submit").style.display = "none";
        document.getElementById("div_messagesid_selected").style.display = "";
        
    }
    else {
        goAlert.alertError("message retrive data", data.message);

    }
};
function fnAPIPMessageUpdateDataCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Message Update", data.message);
        apip_message_fn_clear();
        var scr = document.getElementById("listing_message")
        scr.scrollIntoView();
        fnAPIPRefreshMessage();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAPIUGetValueTypeCallBack(data) {
    if (data.status == "1") {
        element.inputValue("client_value", data.client_value);
        element.inputValue("endpoint_value", data.endpoint_value);
        element.inputValue("sinature_value", data.sinature_value);
        element.inputValue("messages_value", data.messages_value);

        var option_service_type = '<option value=""></option>';
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                option_service_type = option_service_type + '<option value="' + item.app_id + '">' + item.app_id + '</option>';
            } else {
                option_service_type = option_service_type + '<option value="' + item.app_id + '">' + item.app_id + '</option>';
            }
        });
        selectionStyle.LiveSearch("apip_message_appid", option_service_type);
        selectionStyle.LiveSearch("apip_client_endpoint_appid", option_service_type);
        selectionStyle.LiveSearch("apip_client_sinature_appid", option_service_type);
    }
    else {
        goAlert.alertError("api retrive data", data.message);

    }
}
function fnAPITQueryCallBack(data) {
    if (data.status == "1") {
        var columns_param = [
        {
            'data': 'reference_no'
        },
        {
            'data': 'date'
        },
        {
            'data': 'status'
        },
        {
            'data': 'message'
        },
        {
            'data': 'customer'
        },
        {
            'data': 'amount'
        },
        {
            'data': 'currency'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("apit_tbl_get_transaction_listing", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
    
};
function fnAPITExportCallBack(data) {
    if (data.status == "1") {
        var data = data.data;
            JsonFields = ["Reference No", "Date", "Status", "Message", "Remark", "Amount", "Currency"]
            var csvStr = JsonFields.join(",") + "\n";
            data.forEach(element => {
                reference_no1 = element.reference_no1;
                date = element.date;
                status = element.status
                message = element.message
                customer = element.customer
                amount = element.amount
                currency = element.currency
                csvStr += reference_no1 + ',' + date + ',' + status + ',' + message + ',' + customer + ',' + amount + ',' + currency + "\n";
            })
            var link = document.createElement('a');
            link.href = 'data:text/csv;charset=utf-16LE,%EF%BB%BF' + encodeURI(csvStr);
            link.target = '_blank';
            link.download = 'Transaction.csv';
            link.click();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }

};
function fnAPITQueryDetailCallBack(data) {
    if (data.status == "1") {
        var columns_param = [
            {
                'data': 'record_no'
            },
            {
                'data': 'reference_no'
            },
            {
                'data': 'action_type'
            },
            {
                'data': 'action_date'
            },
            {
                'data': 'request_data'
            },
            {
                'data': 'response_data'
            },
            {
                'data': 'header_data'
            },
            {
                'data': '',
                'render': function () {
                    return ""
                }
            }
        ];

        dataTable.ApplyJson("apit_tbl_get_detail_transaction_listing", columns_param, data.data);
        var scr = document.getElementById("listing")
        scr.scrollIntoView();

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPITDetailData1CallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.inputValue("view_data", item.data1);
            $("#view_data").format({ method: 'xml' });
            $("#view_data").format({ method: 'json' });
            var scr = document.getElementById("listing")
            scr.scrollIntoView();         
        });
    }
    else {
        goAlert.alertError("api retrive data", data.message);

    }
};
function fnAPITDetailData2CallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.inputValue("view_data", item.data2);
            $("#view_data").format({ method: 'xml' });
            $("#view_data").format({ method: 'json' });
            var scr = document.getElementById("listing")
            scr.scrollIntoView();
        });
    }
    else {
        goAlert.alertError("api retrive data", data.message);

    }
}
function fnAPITDetailData3CallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            element.inputValue("view_data", item.data3);
            $("#view_data").format({ method: 'xml' });
            $("#view_data").format({ method: 'json' });
            var scr = document.getElementById("listing")
            scr.scrollIntoView();
        });
    }
    else {
        goAlert.alertError("api retrive data", data.message);
    }
}
var service_type_all=[];
function fnAPIconnectionLoadTypeCallBack(data) {
    if (data.status == "1") {
        var option_service_type_all = '<option value=""></option>';
        var option_service_type = '<option value=""></option>';
        v_step_auto = [];
        v_step_auto_1 = [];
        $.each(data.data.all_service, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.data.data);
            }
            if (i == 0) {
                option_service_type_all = '<option value=""></option>'
                option_service_type_all = option_service_type_all + '<option value="' + item.endpoint_ids + '">' + item.descriptions + '</option>';
            } else {
                option_service_type_all = option_service_type_all + '<option value="' + item.endpoint_ids + '">' + item.descriptions + '</option>';
            }
        });
        $.each(data.data.service, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto_1.push(item.data.data);
            }
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                option_service_type = option_service_type + '<option value="' + item.endpoint_id + '">' + item.description + '</option>';
            } else {
                option_service_type = option_service_type + '<option value="' + item.endpoint_id + '">' + item.description + '</option>';
            }
        });
        $.each(data.data.service, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.data.data);
            }
            var service_all=[];
            if (i == 0) {
                service_all = item.endpoint_id;
                service_type_all.push(service_all);
            } else {
                service_all = item.endpoint_id;
                service_type_all.push(service_all);
            }
        });
        selectionStyle.LiveSearch("api_endpoint_type", option_service_type);
        selectionStyle.LiveSearch("api_connection_type", option_service_type);
        selectionStyle.LiveSearch("api_connection_type2", option_service_type);
        selectionStyle.MultipleInline("api_connection_type1", option_service_type_all);
        selectionStyle.LiveSearch("api_connection_type3", option_service_type_all);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnAPICGetDataCallBack(data) {
    modals.OpenStatic("modal_check_connection");
    element.inputValue("status_connection", "");
    element.inputValue("status_code_connection", "");
    element.inputValue("apip_stauts_response", "");
    if (data.status == "1" && data.data !== undefined) {
        element.inputValue("status_connection", data.data.status_con);
        element.inputValue("status_code_connection", data.data.statuscode_con);
        element.inputValue("apip_stauts_response", data.data.data_responce);
        $("#apip_stauts_response").format({ method: 'xml' });
        $("#apip_stauts_response").format({ method: 'json' });
    }
    else {
        goAlert.alertError("api retrive data", data.message);
    }
}
function fnAPICGetServiceDownListingCallBack(data) {
    if (data.status == "1") {
        var columns_host = [
        {
            'data': 'service_name'
        },
        {
            'data': 'location'
        },
        {
            'data': 'down_time'
        },
        {
            'data': 'up_time'
        },
        {
            'data': 'total_downTime',
                'render': function (total_downTime) {
                    return '<div>' + total_downTime + " mn"  +'</div>';
                }
        },
        {
            'data': '',
            'render': function () {
                return ""
           }
        }
        ];
        dataTable.ApplyJson("api_connection_listing_downtime", columns_host, data.data);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAPICExportCallBack(data) {
    if (data.status == "1") {
        var data = data.data;
        JsonFields = ["Service Name", "Location", "Down Time", "Up Time", "Total DownTime"]
        var csvStr = JsonFields.join(",") + "\n";

        data.forEach(element => {
            service_name = element.service_name;
            locations = element.location;
            down_time = element.down_time
            up_time = element.up_time
            total_downTime = element.total_downTime

            csvStr += service_name + ',' + locations + ',' + down_time + ',' + up_time + ',' + total_downTime + "\n";
        })
        var link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-16LE,%EF%BB%BF' + encodeURI(csvStr);
        link.target = '_blank';
        link.download = 'Service_Downtime.csv';
        link.click();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }

};
function fnAPICGetAllServiceListingCallBack(data) {
    if (data.status == "1") {
        var columns_host = [
            
                {
                'data': 'service_name'
                },
                {
                    'data': 'endpoint_type'
                },
                {
                    'data': 'location'
            },
            {
                'data': 'offline_date'
            },
            {
                'data': 'online_date'
            },
                {
                    'data': 'status',
                    'render': function (status) {
                        if (status == 'offline') {
                            return '<div style="color:red;font-family:Arial Black">' + status + '</div>';
                        }
                        if (status == 'online') {
                            return '<div style="color:green;font-family:Arial Black">' + status + '</div>';
                        }
                    }
                },
                {
                    'data': 'status_code',
                    'render': function (status_code) {
                        if (status_code != '200') {
                            return '<div style="color:red;font-family:Arial Black">' + status_code + '</div>';
                        }
                        if (status_code == '200') {
                            return '<div style="color:green;font-family:Arial Black">' + status_code + '</div>';
                        }
                    }
            },
            
                {
                'data': '',
                'render': function () {
                    return ""
                }
            }
        ];
        dataTable.ApplyJson("api_connection_all_serivce", columns_host, data.data);
        //////////////////////////////////////////////////////////////////
        var jsonData = data.data;
        var dataPoints = [];
        if (jsonData == "") {
            dataPoints.push({ label: "0", y: 0 });
        }
        else {
            total_service_up = 0;
            total_service_down = 0;
            var name=[];
            var name1=[];
            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].status == "online") {
                    total_service_up += 1;
                    name.push(jsonData[i].service_name + '<br />');
                } else {
                    total_service_down += 1;
                    name1.push(jsonData[i].service_name + '<br />');
                };
            }
            var total = total_service_up + total_service_down;
            dataPoints.push({ label: "Service Online", y: total_service_up, name: name}, { label: "Service Offline", y: total_service_down, name: name1});
            CanvasJS.addColorSet("color",
                [
                    "#2ECC40",
                    "#FF4136"
                ]);
            var chart = new CanvasJS.Chart("APICtotalService", {
                colorSet: "color",
                theme: "light2",
                animationEnabled: true,
                exportEnabled: true,
                title: {
                    text: "All Current Services"
                },
                subtitles: [{
                    text: "Total: " + total + " Services",
                    backgroundColor: "#2eacd1",
                    fontSize: 16,
                    fontColor: "white",
                    padding: 5
                }],
                data: [{
                    type: "pie",
                    startAngle: 2000,
                    toolTipContent: "<b>{name}</b>",
                    showInLegend: true,
                    legendText: "{label}",
                    indexLabelFontSize: 15,
                    indexLabel: "{label} - {y} Service",
                    dataPoints: dataPoints
                }]
            });
            chart.render();
        }
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnAPICALLChartCallBack(data) {
    if (data.status == "1") {
        var format = data.format;
        var from_date = data.from_date;
        var to_date = data.to_date;
        var date;
        if (from_date == to_date) {
            date = from_date;
        }
        else {
            date = from_date + ' To ' + to_date;
        };
        var jsonData = data.data;
        var data = [];
        var data_point = [];
        for (var i = 0; i < jsonData.length; i++) {
            //var name_id = jsonData[i].service_id;
            var name = jsonData[i].service_name;
            var detaildata = jsonData[i].data_detail
            var tmp_data_point = [];
            var total_time;
            total_time = 0;
            total_date_time = 0;
            for (var j = 0; j < detaildata.length; j++) {
                tmp_data_point.push({ label: detaildata[j].current_date, y: Number(detaildata[j].total_Time) });
                total_time += Number(detaildata[j].total_Time);
                total_date_time += 1440;
            }
            if (name != 'null' && name != '') {
                data_point.push({ y: total_time, label: name });
            };
            //data_point.push({ y: total_date_time, label: "Total Minute Between Date" }, { y: total_time, label: name });
            
            data.push({
                type: "spline",
                visible: true,
                showInLegend: true,
                yValueFormatString: "#,###,##0 " + format,
                name: name,
                dataPoints: tmp_data_point
            });
        }
        //data_point.push({ y: total_date_time, label: "Total Minute Between Date" });
        var chart = new CanvasJS.Chart("APICALLChartDown", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Chart Service DownTime " + date
            },
            axisY: {
                title: "Number Of Minute",
                suffix: format

            },
            toolTip: {
                shared: "true"
            },
            legend: {
                cursor: "pointer",
            },
            data: data
        });
        var chart1 = new CanvasJS.Chart("APICtotalChartDown", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Service Total DownTime " + date
            },

            axisY: {
                includeZero: true,
                suffix: format
            },
            axisX: {
                interval: 1
            },
            data: [{
                type: "bar",
                yValueFormatString: "##,##0 " + format,
                indexLabel: "{y}",
                dataPoints: data_point
            }]
        });
        chart.render();
        chart1.render();

    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnAPICChartDayCallBack(data) {
    if (data.status == "1") {
        var jsonData = data.data;
        var name = data.service_type;
        var date = data.date;
        var format = data.format;
        var dataPoints = [];
        if (jsonData == "") {
            dataPoints.push({ label: date, y: 0 });
        }
        else {
            for (var i = 0; i < jsonData.length; i++) {
                dataPoints.push({ label: jsonData[i].rang_time, y: Number(jsonData[i].total_time) });
            }
        }
        var chart = new CanvasJS.Chart("chartCDowntime", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Downtime Service " + name + " " + date
            },

            axisY: {
                includeZero: true,
                suffix: format
            },
            data: [{
                type: "column",
                yValueFormatString: "##,##0 " + format,
                indexLabel: "{y}",
                dataPoints: dataPoints
            }]

        });
        chart.render();
  
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
//function fnToolgeneration(rd) {
//    var options = jqueryXml.Find("options", rd);
//    selectionStyle.Multiple("de_bu_group_id", options);
//};


function fnAPIToolTokenCallBack(data) {
    element.inputValue("apip_tool_token", data);
};

function fnAPIToolTrnIDCallBack(data) {
    element.inputValue("apip_tool_trn_id", data);
};
function fnAPIToolCreatedCallBack(data) {
    element.inputValue("apip_tool_create", data);
};
function fnAPIToolDigestCallBack(data) {
    element.inputValue("apip_tool_digest", data);
};
function fnAPIToolSignatureCallBack(data) {
    element.inputValue("apip_tool_signature", data);
};
//function fnAPIToolCallBack(data) {
//    element.inputValue("apip_tool_response", data);
//    $("#apip_tool_response").format({ method: 'json' });
//    var scr = document.getElementById("reponse")
//    scr.scrollIntoView();
//};

function fnAPIToolCallBack(data) {
    element.inputValue("apip_tool_trn_id", data.transaction_id);
    element.inputValue("apip_tool_create", data.created);
    element.inputValue("apip_tool_digest", data.digest);
    element.inputValue("apip_tool_signature", data.signature);
    element.inputValue("apip_tool_token", data.token);
    element.inputValue("apip_tool_response", data.data);
    $("#apip_tool_response").format({ method: 'json' });
    var scr = document.getElementById("reponse")
    scr.scrollIntoView();
};
///////////////////////////////////////////////////
var length_user_view;
function fnAPIPUserServiceMapCheckDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                if (item.user_service_id == "") {
                    option_service_type = option_service_type + '<option value="' + item.user_service_mapid + '">' + item.user_service_mapdesc + '</option>';
                } else {
                    option_service_type = option_service_type + '<option selected="selected" value="' + item.user_service_mapid + '">' + item.user_service_mapdesc + '</option>';
                }

            } else {
                if (item.user_service_id == "") {
                    option_service_type = option_service_type + '<option value="' + item.user_service_mapid + '">' + item.user_service_mapdesc + '</option>';
                } else {
                    option_service_type = option_service_type + '<option selected="selected" value="' + item.user_service_mapid + '">' + item.user_service_mapdesc + '</option>';
                }
            }
            length_user_view = item.user_service_id;
        });
        document.getElementById("api_service_btn_submit").style.display = "";
        selectionStyle.Multiple("user_service_mapping", option_service_type);
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
        goAlert.alertInfo("User retrive data", data.message);
    }
    else {
        goAlert.alertError("User retrive data", data.message);
        document.getElementById("api_service_btn_submit").style.display = "none";
        fnGetServiceID();
    }
};

function fnAPIPUserTxnCheckDataCallBack(data) {
    if (data.status == "1" && data.data !== undefined) {
        var option_service_type = '<option value=""></option>';
        v_step_auto = [];
        $.each(data.data, function (i, item) {
            if (i == 0) {
                option_service_type = '<option value=""></option>'
                option_service_type = option_service_type + '<option value="' + item.user_txn_id + '">' + item.user_txn_desc + '</option>';
            } else {
                option_service_type = option_service_type + '<option value="' + item.user_txn_id + '">' + item.user_txn_desc + '</option>';
            }
        });

        selectionStyle.Multiple("user_service_mapping", option_service_type);
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
        goAlert.alertInfo("user retrive data", data.message);
    }
    else {
        goAlert.alertError("user retrive data", data.message);

    }
};
function fnAPIPUserServiceGetDataCallBack(data) {
    modals.OpenStatic("modal_view_service");
    if (data.status == "1") {
        var columns_param = [
            {
                'data': 'service_id'
            },
            {
                'data': 'service_name'
            },
            { 'data': 'user_id' },
            { 'data': 'user_name' },
            { 'data': 'record_status' },
            { 'data': 'created_by' },
            { 'data': 'created_date' },
            { 'data': 'modifired_by' },
            { 'data': 'modifired_date' },
            {
                'data': '',
                'render': function () {
                    return ""
                }
            }
        ];

        dataTable.ApplyJson("api_parameter_tbl_service_mapping", columns_param, data.data);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIPUserServiceRegisterCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("User Service Process", data.message);
        var scr = document.getElementById("listing_service_mapping")
        scr.scrollIntoView();
        fnAPIPRefreshServiceMap();
        SearchUserViewService();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
};
function fnAPIUSExportCallBack(data) {
    if (data.status == "1") {
        var data = data.data;
        JsonFields = ["Service ID", "Service Name", "User ID", "User Name", "Status", "Create By", "Create Date", "Modifired By", "Modifired Date"]
        var csvStr = JsonFields.join(",") + "\n";
        data.forEach(element => {
            service_id = element.service_id;
            service_name = element.service_name;
            user_id = element.user_id;
            user_name = element.user_name;
            record_status = element.record_status
            created_by = element.created_by
            created_date = element.created_date
            modifired_by = element.modifired_by
            modifired_date = element.modifired_date
            csvStr += service_id + ',' + service_name + ',' + user_id + ',' + user_name + ',' + record_status + ',' + created_by + ',' + created_date + ',' + modifired_by + ',' + modifired_date + "\n";
        })
        var link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-16LE,%EF%BB%BF' + encodeURI(csvStr);
        link.target = '_blank';
        link.download = 'User_Transaction_Monitor.csv';
        link.click();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }

};

