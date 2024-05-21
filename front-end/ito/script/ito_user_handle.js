/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />



function userFnGetEmailSetupHd(xml) {
    var uploaderto = jqueryXml.Find("userUploaderTo", xml);
    var uploadercc = jqueryXml.Find("userUploaderCc", xml);
    var authorizerto = jqueryXml.Find("userAuthorizeTo", xml);
    var authorizercc = jqueryXml.Find("userAuthorizeCc", xml);
    var userInform = jqueryXml.Find("userInform", xml);
    var userEmail = jqueryXml.Find("userEmail", xml);
    var userEmailStat = jqueryXml.Find("userEmailStat", xml);
    var userEmailSetupStat = jqueryXml.Find("userEmailSetupStat", xml);
    if (userEmailSetupStat === "N") {
        element.setDisable(["up_email_uploader_to",
            "up_email_uploader_cc",
            "up_email_authorizer_to",
            "up_email_authorizer_cc",
            "up_email_inform"]);
    };
    element.inputValue("up_user_email", userEmail);
    if (userEmailStat == "Y") {
        checkBox.Check("up_email_ck_status");
    };
    selectionStyle.MultipleInline("up_email_uploader_to", uploaderto);
    selectionStyle.MultipleInline("up_email_uploader_cc", uploadercc);
    selectionStyle.MultipleInline("up_email_authorizer_to", authorizerto);
    selectionStyle.MultipleInline("up_email_authorizer_cc", authorizercc);
    selectionStyle.MultipleInline("up_email_inform", userInform);
};
function userFnSaveEmailSetupCallback(xml) {
    var status = jqueryXml.Find("status", xml);
    var message = jqueryXml.Find("message", xml);
    if (status === "1") {
        goAlert.alertInfo("Save Email Setup", message);
    }
    else {
        goAlert.alertError("Error Save Email Setup", message);
    };
};
function userFnPwdChangeCallback(xml) {
    var status = jqueryXml.Find("status", xml);
    var message = jqueryXml.Find("message", xml);
    if (status == "1") {
        goAlert.alertInfo("Password Change", message);
    }
    else {
        goAlert.alertError("Error Password Change", message);
    };
};
function userFnLogoutCallback(xml) {
    var status = jqueryXml.Find("status", xml);
    if (status == "1") {
        window.localStorage.removeItem("ito_token");
        window.location.href = "Default.aspx";
    }
};
var v_opt_modules;
function userFnGetModuleCallBack(xml) {
    var option = jqueryXml.Find("options", xml);
    v_opt_modules = option;
    selectionStyle.Multiples("umt_uc_module", option);
}
function userFnGetSummaryProfileCallback(xml) {
    fnClearForSearch();
    var nexXml = jqueryXml.Find("userInfo", xml);
    user_stat = readFiles.Xml("userStat", nexXml);
    if (user_stat == '1') {
        UmtUcFnGetUserDataForUpdate('SEARCH');
    }
    else {
        var fullname = readFiles.Xml("fullname", nexXml);
        var email = readFiles.Xml("email", nexXml);
        element.inputValue("umt_uc_fullname", fullname);
        element.inputValue("umt_uc_email", email);
    }
};
function userFnCreateUserCallback(xml) {
    var status = jqueryXml.Find("status", xml);
    var message = jqueryXml.Find("message", xml);
    if (status == "1") {
        goAlert.alertInfo("User Creation", message);
        UmtGetAllUserList("N");
        var access_api = $("#umt_acc_api_selete").val();
        if (access_api == 'Y') {
            fnAllowUserAccesssAPI('new');
        };
    }
    else {
        goAlert.alertError("User Creation Error", message);
    };
};
function userFnGetAllCallBack(xml) {
    var data = jqueryXml.Find("data_record", xml);
    dataTable.Apply("umt_uc_listing_tbl", data);
};
function userFnChangeUserCallback(xml) {
    var status = jqueryXml.Find("status", xml);
    var message = jqueryXml.Find("message", xml);
    if (status == "1") {
        goAlert.alertInfo("User Change", message);
        
        if (updateType === 'update') {
            fnAllowUserAccesssAPI('update');
        }
        if (updateType === 'delete') {
            fnDeleteUser();
        }
        UmtGetAllUserList("N");
    }
    else {
        goAlert.alertError("User Change Error", message);
    };
};
function userFnGetDataForUpdateCallBack(xml) {
    element.setDisable("umt_uc_password");
    var fullname = jqueryXml.Find("fullname", xml);
    var position = jqueryXml.Find("position", xml);
    var email = jqueryXml.Find("userEmail", xml);
    var requestDate = jqueryXml.Find("requesteDate", xml);
    var modules = jqueryXml.Find("dataModules", xml);   
    var access_api = jqueryXml.Find("access_api", xml);
    if (access_api === 'Y') {
        $("#umt_acc_api_selete").val(access_api).change();
        fnGetUserForUpdate('getUser');
    } else {
        $("#umt_acc_api_selete").val('N').change();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }    
    element.inputValue("umt_uc_fullname", fullname);
    element.inputValue("umt_uc_position", position);
    element.inputValue("umt_uc_email", email);
    element.inputValue("umt_uc_req_date", requestDate);
    selectionStyle.Multiples("umt_uc_module", modules);   
    goShowHide.hideOnDiv("umt_uc_btn_create_user");
    goShowHide.showOnDivAsInline(["umt_uc_btn_update_user", "umt_uc_btn_update_cancel"]);
    updateType = 'update';
};
function userFnSetMessageCallback(xml) {
    var status = jqueryXml.Find("status", xml);
    var message = jqueryXml.Find("message", xml);
    if (status == "1") {
        goAlert.alertInfo("Set Message", message);
    }
    else {
        goAlert.alertError("Set Message Error", message);
    }
};
function fnEnableUserAccesssAPICallBack(data) {
    if (data.status === "1") {
        goAlert.alertInfo("Update User Info", data.message);
        element.inputValue("umt_uc_user_id", "");
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
var ito_sys_module;
function fnGetTempleteCallBack(data) {
    if (data.status === "1") {
        CallAPI.Go(v_getEndPointUrl, undefined, fnGetEndPointUserCreationCallBack);
        ito_sys_module = data;
        var opt_list_template;
        $.each(ito_sys_module.data.user_templete, function (i, item) {
            if (i === 0) {
                opt_list_template = '<option value=""></option>';
                opt_list_template = opt_list_template + '<option value="' + item.templete_Id + '">' + item.project + '</option>';
            }
            else {
                opt_list_template = opt_list_template + '<option value="' + item.templete_Id + '">' + item.project + '</option>';
            }
        });
        selectionStyle.LiveSearch("umt_project_selete", opt_list_template);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

var dataUserForUpdate;
var userEndPoint;
let arrEndPointUser;
function fnGetUserForUpdateCallBack(data) {
    dataUserForUpdate = [];
    userEndPoint = [];
    arrEndPointUser = [];

    dataUserForUpdate = data;
    if (data.status === "1") {
        let accessAPI = data["data"]["p_access_api"];
        let projectSelect = data["data"]["p_usre_project"];
        actionSelect = data["action_id_and_module"];
        let ldap = data["data"]["p_allow_ldap"];
        if (ldap != null && projectSelect != null && accessAPI != null) {
            $("#umt_acc_api_selete").val(accessAPI).change();
            $("#umt_project_selete").val(projectSelect).change();
            $("#umt_allow_ldap").val(ldap).change();
        }
        else {
            $("#umt_acc_api_selete").val("N").change();
        }
        moduleChange();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        userEndPoint = data;
        let val_option;
        $.each(data.data.p_end_point_id, function (i, item) {
            val_option = val_option + ',' + item.end_point_id;
        });
        if (val_option !== undefined) {
            arrEndPointUser = val_option.split(',');
            $('#umt_end_point').val(arrEndPointUser);
        }
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnAllowUserAccessAPICallBack(data) {
    if (data.status === "1") {
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnDeleteUserITOCallBack(data) {
    if (data.status === "1") {
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnGetUserAccessAPICallBack(xml) {
    let access_api = jqueryXml.Find("access_api", xml);
    if (access_api === 'Y') {
        CallAPI.Go(v_getTemplete, undefined, fnGetTempleteCallBack, "Fetching Data...");        
    }
}
function fnGetEndPointUserCreationCallBack(data) {
    if (data.status === "1") {
        listing_end_point = data;
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}