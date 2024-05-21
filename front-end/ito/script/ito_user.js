/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function userProfileTabSwitch(value) {
    if (value == "mail_setup") {
        goShowHide.showOnDivAsInline("btn_up_save_email");
        goShowHide.hideOnDiv("btn_up_change_pwd");
    }
    else {
        goShowHide.showOnDivAsInline("btn_up_change_pwd");
        goShowHide.hideOnDiv("btn_up_save_email");
    };
};
var userEmailFetchStat = 0;
function fnUserFetchEmail() {
    if (userEmailFetchStat == 0) {
        myRequest.Execute(v_userEmailSetUp, { user_id: STAFF_ID }, userFnGetEmailSetupHd, "Processing...");
        userEmailFetchStat = 1;
    };
}
function fnUserClearCaches() {
    localStorages.ClearAll();
}
function fnUserUpdateEmail() {
    var u_email = $("#up_user_email").val();
    var u_email_enable = (checkBox.checkStat("up_email_ck_status") == true) ? "Y" : "N";
    var u_email_uploader_to = stringCreate.FromObject($("#up_email_uploader_to").val());
    var u_email_uploader_cc = stringCreate.FromObject($("#up_email_uploader_cc").val());
    var u_email_authorize_to = stringCreate.FromObject($("#up_email_authorizer_to").val());
    var u_email_authorize_cc = stringCreate.FromObject($("#up_email_authorizer_cc").val());
    var u_email_inform = stringCreate.FromObject($("#up_email_inform").val());
    if (u_email == "") {
        goAlert.alertErroTo("up_user_email", "Error", "Your Email cannot be empty");
        return false;
    };
    var xmlObj = {
        userID: STAFF_ID,
        userEmail: u_email,
        userEmailEnable: u_email_enable,
        emailUploaderTo: u_email_uploader_to,
        emailUploaderCc: u_email_uploader_cc,
        emailAuthorizerTo: u_email_authorize_to,
        emailAuthorizerCc: u_email_authorize_cc,
        emailInform:u_email_inform
    };
    var xmlData = stringCreate.toXML("UserEmail", xmlObj).End();
    myRequest.Execute(v_userSaveEmailSetup, { xmlData: xmlData }, userFnSaveEmailSetupCallback, "Processing...");
};
function fnUserChangeCurrentPwd() {
    var current_password = $("#up_in_curr_pwd").val();
    var new_password = $("#up_in_new_pwd").val();
    var re_type_password = $("#up_in_re_type_pwd").val();
    if (current_password == "") {
        goAlert.alertErroTo("up_in_curr_pwd", "Error Password Change", "Current password cannot be empty.");
        return false;
    };
    if (new_password == "") {
        goAlert.alertErroTo("up_in_new_pwd", "Error Password Change", "New password cannot be empty.");
        return false;
    };
    if (re_type_password == "") {
        goAlert.alertErroTo("up_in_re_type_pwd", "Error Password Change", "Re-type password cannot be empty.");
        return false;
    };
    if (new_password !== re_type_password) {
        goAlert.alertError("Error Password Change", "New password not match to Re-Type new.");
        return false;
    }
    if (password.Validate(new_password) == false) {
        goAlert.alertError("Error Password Change", "New password is not stronge enought. Password must have 8 characteres, at least 1 uppercase 1 lowercase character, at least 1 number and 1 special character.");
        return false;
    }
    else {
        var xmlData = {
            user_id:STAFF_ID,
            change_type:"change_current",
            current_pwd: current_password,
            new_pwd: new_password,
            verify_code:""
        };
        myRequest.Execute(v_userChangePwd, xmlData, userFnPwdChangeCallback, "Processing...");
    }
};
function fnUserLogout() {
    myRequest.Execute(v_userLogout, { user_id: STAFF_ID }, userFnLogoutCallback,"Processing...");
}
function UmtGetAllUserList(process_indecator) {
    if (process_indecator == "Y") {
        myRequest.Execute(v_userGetAll, undefined, userFnGetAllCallBack, "Processing...");
    }
    else {
        myRequest.Execute(v_userGetAll, undefined, userFnGetAllCallBack);
    };
}
function UmtUcFnSearchEnter(event) {
    if (event.keyCode == 13) {
        UmtUcFnSearchUser();
    };
};
function UmtUcFnNewInit() {
    element.inputValue("umt_uc_user_id", "");
    element.inputValue("umt_uc_fullname", "");
    element.inputValue("umt_uc_position", "");
    element.inputValue("umt_uc_email", "");
    element.inputValue("umt_uc_password", "");
    element.setEnable("umt_uc_password");
    element.inputValue("umt_uc_req_date", "");
    selectionStyle.Multiples("umt_uc_module", v_opt_modules);
    goShowHide.hideOnDiv(["umt_uc_btn_update_user", "umt_uc_btn_update_cancel"]);
    goShowHide.showOnDivAsInline("umt_uc_btn_create_user");
    $("#umt_project_selete").prop('selectedIndex', 0).change();
    selectionStyle.Multiples("umt_end_point", "");
    selectionStyle.Multiples("umt_uc_end_point_role", "");
    $('#umt_acc_api_selete').val('N');
    accessAPIEnable();
    dataUserForUpdate = undefined;
    userEndPoint = undefined;
    updateType = undefined;
    endPointSelected = undefined;
    ito_sys_module = undefined;
    CallAPI.Go(v_getTemplete, undefined, fnGetTempleteCallBack);
};
function fnClearForSearch() {
    element.inputValue("umt_uc_fullname", "");
    element.inputValue("umt_uc_position", "");
    element.inputValue("umt_uc_email", "");
    element.inputValue("umt_uc_password", "");
    element.setEnable("umt_uc_password");
    element.inputValue("umt_uc_req_date", "");
    selectionStyle.Multiples("umt_uc_module", v_opt_modules);
    goShowHide.hideOnDiv(["umt_uc_btn_update_user", "umt_uc_btn_update_cancel"]);
    goShowHide.showOnDivAsInline("umt_uc_btn_create_user");
    $("#umt_project_selete").prop('selectedIndex', 0).change();
    selectionStyle.Multiples("umt_end_point", "");
    selectionStyle.Multiples("umt_uc_end_point_role", "");
    $('#umt_acc_api_selete').val('N');
    accessAPIEnable();
    dataUserForUpdate = undefined;
    userEndPoint = undefined;
    updateType = undefined;
    endPointSelected = [];
};
function UmtUcFnSearchUser() {
    var user_id = $("#umt_uc_user_id").val();
    if (user_id == "") {
        goAlert.alertErroTo("umt_uc_user_id", "User Creation Error", "Enter User ID to search");
        return false;
    };
    myRequest.Execute(v_userGetUserProfile, { user_id: user_id }, userFnGetSummaryProfileCallback, "Searching...");
}
function UmtCreateUserDialog() {
    if (UmtUcFnValidate("Y") == true) {
        if (modals.ConfirmShowAgain("mdumtuc") == true) {
            modals.Confirm("User Creation", "Are you sure to create user ?", "N", "Yes", "onclick", "UmtCreateUser()", "mdumtuc");
        }
        else {
            UmtCreateUser();
        };

    };
};
function UmtCreateUser() {
    modals.CloseConfirm();
    if (UmtUcFnValidate("Y") == true) {
        var userID = $("#umt_uc_user_id").val();
        var fullname = $("#umt_uc_fullname").val();
        var position = $("#umt_uc_position").val();
        var email = $("#umt_uc_email").val();
        var password = $("#umt_uc_password").val();
        var requestDate = $("#umt_uc_req_date").val();
        var modules = [];
        modules = $("#umt_uc_module").val();
        var strModule = stringCreate.FromObject(modules);
        var xmlObj = {
            userID: userID,
            fullname: fullname,
            position: position,
            email: email,
            password: password,
            requestDate: requestDate,
            modules: strModule,
            makerID: STAFF_ID
        };
        var xmlData = stringCreate.toXML("UserCreation", xmlObj).End();
        myRequest.Execute(v_userCreate, { xmlData: xmlData }, userFnCreateUserCallback, "Processing...");
    };
};
function UmtUcFnValidate(password_check) {
    var boolStat = true;

    if ($("#umt_uc_fullname").val() == "") {
        goAlert.alertErroTo("umt_uc_fullname", "User Creation Error", "User's Fullname cannot be empty");
        boolStat = false;
    };
    if ($("#umt_uc_position").val() == "") {
        goAlert.alertErroTo("umt_uc_position", "User Creation Error", "User's Position cannot be empty");
        boolStat = false;
    };
    if ($("#umt_uc_email").val() == "") {
        goAlert.alertErroTo("umt_uc_email", "User Creation Error", "User's Email cannot be empty");
        boolStat = false;
    };
    if ($("#umt_uc_password").val() == "") {
        if (password_check !== undefined) {
            goAlert.alertErroTo("umt_uc_password", "User Creation Error", "User's Password cannot be empty");
            boolStat = false;
        }
        else {
            boolStat = true;
        };
        
    };
    if ($("#umt_uc_req_date").val() == "") {
        goAlert.alertErroTo("umt_uc_req_date", "User Creation Error", "Request Date cannot be empty");
        boolStat = false;
    };
    var modules = [];
    modules = $("#umt_uc_module").val();
    if (modules.length == 0) {

        goAlert.alertErroTo("umt_uc_module", "User Creation Error", "Choose Module for user to access", "change");
        boolStat = false;
    };
    // check acess api Y api for user not null
    const access_api = $("#umt_acc_api_selete").val();
    const end_point_id = $("#umt_end_point").val();
    if (access_api === 'Y' && end_point_id.length === 0) {
        modals.CloseConfirm();
        goAlert.alertErroTo("umt_uc_end_point_role", "User Creation Error", "Choose End Point for user to access", "change");
        boolStat = false;
    }
    return boolStat;
};
function UmtUcFnGetUserDataForUpdate(type) {
    fnClearForSearch();
    var user_id_obj = [];
    var user_id_input = $("#umt_uc_user_id").val();
    var user_id;
    user_id_obj = table.GetValueSelected("umt_uc_listing_tbl");
    if (type === 'UPDATE') {
        if (user_id_obj.length === 0) {
            goAlert.alertError("Processing Failed", "No End Point ID Selected");
            return false;
        }
        if (user_id_obj.length > 1) {
            goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
            return false;
        }
        user_id = stringCreate.FromObject(user_id_obj);

    }
    else if (type === 'SEARCH') {
        user_id = user_id_input;
    }
    element.inputValue("umt_uc_user_id", user_id);
    myRequest.Execute(v_userGetDataForUpdate, { user_id: user_id }, userFnGetDataForUpdateCallBack, "Processing...");
};
let updateType;
function UmtUcFnUpdateDialog(types) {
    updateType = types;
    var objUser = [];
    var question = "";
    var pwd = $("#umt_uc_reset_pwd").val();
    var userID = $("#umt_uc_user_id").val();
    objUser = table.GetValueSelected("umt_uc_listing_tbl");
    if (objUser.length === 0 && userID === "") {
        goAlert.alertError("User Change Error", "No UserID selected");
        return false;
    };
    if (types == "reset_pwd" && userID == "") {
        if (pwd == "") {
            goAlert.alertErroTo("umt_uc_reset_pwd", "User Change Error", "Password cannot be empty");
            return false;
        };
    };
    if (types == "update" && userID == "") {
        if (UmtUcFnValidate() == false) {
            return false;
        };
    };
    question = (types == "update") ? "Are you sure to update this users?" : question;
    question = (types == "activate") ? "Are you sure to active selected users?" : question;
    question = (types == "deactivate") ? "Are you sure to deactivate selected users?" : question;
    question = (types == "enable_debug") ? "Are you sure to enable debug selected users?" : question;
    question = (types == "disable_debug") ? "Are you sure to disable debug selected users?" : question;
    question = (types == "reset_pwd") ? "Are you sure to reset password selected users?" : question;
    question = (types == "unlock") ? "Are you sure to unlock selected users?" : question;
    question = (types == "enable_mail_setup") ? "Are you sure to enable email setup selected users?" : question;
    question = (types == "disable_mail_setup") ? "Are you sure to disable email setup selected users?" : question;
    question = (types == "delete") ? "Are you sure to delete selected users?" : question;
    modals.Close("modalResetPwd");
    if (modals.ConfirmShowAgain("mdumtucchnage") == true) {
        modals.Confirm("User Change", question, "N", "Yes", "onclick", "umtUcFnUpdate('" + types + "')", "mdumtucchnage");
    }
    else {
        umtUcFnUpdate(types);
    };
};
function umtUcFnUpdate(types) {
    var userID = $("#umt_uc_user_id").val();
    if (types == "update" && userID == "") {
        if (UmtUcFnValidate() == false) {
            return false;
        };
    } else if (types == "update" && UmtUcFnValidate() === false) {
            return false;  
    }
    
    modals.CloseConfirm();
    var objUser = [];
    if (types !== "update") {
        var pwd = $("#umt_uc_reset_pwd").val();
        objUser = table.GetValueSelected("umt_uc_listing_tbl");
        var strUser = stringCreate.FromObject(objUser);
        var xmlObj = {
            type: types,
            userIDs: strUser,
            pwd: pwd,
            maker: STAFF_ID
        };
    }
    else {
        var userID = $("#umt_uc_user_id").val();
        var fullname = $("#umt_uc_fullname").val();
        var position = $("#umt_uc_position").val();
        var email = $("#umt_uc_email").val();
        var requestDate = $("#umt_uc_req_date").val();
        var modules = [];
        modules = $("#umt_uc_module").val();
        var strModule = stringCreate.FromObject(modules);
        var xmlObj = {
            type: types,
            userIDs: userID,
            fullname: fullname,
            position: position,
            email: email,
            requestDate: requestDate,
            modules: strModule,
            maker: STAFF_ID
        };
    };
    var xmlData = stringCreate.toXML("userUpdate", xmlObj).End();
    modals.CloseConfirm();
    myRequest.Execute(v_userUpdate, { xmlData: xmlData }, userFnChangeUserCallback, "Processing...");
};
function umtOpenModalSendSMS() {
    var objUser = [];
    objUser = table.GetValueSelected("umt_uc_listing_tbl");
    if (objUser.length == 0) {
        goAlert.alertError("Set Message Error", "No users selected.");
        return false;
    };
    modals.Open("modalSendMessage");
};
function umtSetMessage() {
    var htmlcode = editor.getCode("umt_uc_sms_txt");
    var objUser = [];
    objUser = table.GetValueSelected("umt_uc_listing_tbl");
    var strUsers = stringCreate.FromObject(objUser);
    var xmlObj = {
        type: "add_new_update_accept",
        userIDs: strUsers,
        maker: STAFF_ID
    };
    var xmlData = stringCreate.toXML("userUpdate", xmlObj).End();
    myRequest.Execute(v_setMessageUserWs, { xmlData: xmlData, text: htmlcode }, userFnSetMessageCallback, "Processing...");
};
function fnAcceptNewUpdate() {
    modals.Close("modalMessage");
    var xmlObj = {
        type: "accept_update",
        userIDs: STAFF_ID,
        maker: STAFF_ID
    };
    var xmlData = stringCreate.toXML("userUpdate", xmlObj).End();
    myRequest.Execute(v_userUpdate, { xmlData: xmlData }, undefined);
};
function addProjectselect() {
    let opt_list_project_add_new_end_point;
    $.each(ito_sys_module.data.user_templete, function (i, item) {
        if (i === 0) {
            opt_list_project_add_new_end_point = '<option value=""></option>';
            opt_list_project_add_new_end_point = opt_list_project_add_new_end_point + '<option value="' + item.project + '">' + item.project + '</option>';
        }
        else {
            opt_list_project_add_new_end_point = opt_list_project_add_new_end_point + '<option value="' + item.project + '">' + item.project + '</option>';
        }
    });
    selectionStyle.LiveSearch("umt_new_end_point_project_select", opt_list_project_add_new_end_point);
}
function moduleChange() {
    let acc_api = $("#umt_acc_api_selete").val();
    const user_id = $("#umt_uc_user_id").val();
        if (acc_api === 'Y') {
            let modules = $("#umt_uc_module").val();
            let role_select = '';
            delete role_select;
            let dataFilter = [];
            let dataFilter2 = [];
            let arrayData = modules.toString().split(',');
            if (user_id !== "") {
                $.each(ito_sys_module.data.submodules, function (index, item) {
                    if ($.inArray(item.sub_module_id, arrayData) !== -1) {
                        dataFilter.push(item);
                    }
                });
                let arrListModule = [];
                $.each(ito_sys_module.data.modeleEndPoint, function (index, item) {
                    arrListModule.push(item.action_name + '_' + item.module_id);
                });
                $.each(dataFilter, function (i, item) {
                    $.each(ito_sys_module.data.endPointActions, function (i, item1) {
                        if ($.inArray(item1.action_id + '_' + item1.sub_module_id, arrListModule) !== -1) {
                            dataFilter2.push(item);
                        }
                    });
                });
                $.each(dataFilter, function (i, item2) {
                    $.each(ito_sys_module.data.endPointActions, function (i, item1) {
                        if ($.inArray(item1.action_id + '_' + item2.sub_module_id, arrListModule) !== -1) {
                            role_select += '<option value="' + item1.action_id + '_' + item2.sub_module_id + '">' + item2.sub_module_name + ' - [' + item1.action_name + ']' + '</option>';
                        }
                    });
                });
                selectionStyle.Multiples("umt_uc_end_point_role", role_select);
                fnEndPointList();
                if (user_id !== undefined && dataUserForUpdate !== undefined) {
                    let val_option;
                    let actionSelect = dataUserForUpdate["action_id_and_module"];
                    $.each(dataUserForUpdate.data.p_end_point_id, function (i, item) {
                        val_option = val_option + ',' + item.end_point_id;
                    });
                    let arrayArea = val_option.toString().split(',');
                    let action = actionSelect.split(',');
                    $('#umt_uc_end_point_role').val(action);
                    fnEndPointList();
                    $('#umt_end_point').val(arrayArea);
                }
            }
        }
}
function getRole(num) {
    let role='';
    let number = parseInt(num);
    switch(number) {
        case 1:
            role = '[View] ';
            break;
        case 2:
            role = '[Add] ';
            break;
        case 3:
            role = '[Edit] ';
            break;
        default:
            role = '[Delete] ';
    }
    return role;
}
function fnEndPointList() {
    let modules = $("#umt_uc_module").val();
    let action_select = $("#umt_uc_end_point_role").val();
    let opt_list_end_point = '';
    let filteredData = [];
    let arrFilterModule = modules.toString().split(',');
    let arrFilterAction = action_select.toString().split(',');
    $.each(listing_end_point.data.dataAPIEndPoints, function (index, item) {
        if (arrFilterModule.indexOf(item.sub_module_id) !== -1 && arrFilterAction.indexOf(item.action_id+'_'+item.sub_module_id) !== -1) {
            filteredData.push(item);
        }
    });
    $.each(filteredData, function (i, item) {
            opt_list_end_point = opt_list_end_point + '<option value="' + item.end_point_id + '">'+'['+ item.sub_module_name+'] - ' + getRole(item.action_id) + item.end_point_url_substring + '</option>';
    });
    selectionStyle.Multiples("umt_end_point", opt_list_end_point);
}
let endPointSelected = [];
function fnGetEndPointSelected() {
    let endpointSelected = [];
    endpointSelected = $("#umt_end_point").val();
    let arrEndPointSelected = [];
    arrEndPointSelected = endpointSelected.toString().split(',');
    if (updateType !== undefined && updateType === 'update' && arrEndPointSelected.length > 1 && arrEndPointUser.length > 1) {
        endPointSelected = [...arrEndPointSelected, ...arrEndPointUser];
    }else{
        endPointSelected = arrEndPointSelected;
    }
}

let listEndPointId = '';
function fnEndPointActionChange() {
    let action_id_select = $("#umt_uc_end_point_role").val();
    let val_id_select = '';
    if (listEndPointId !== '') {
        let dataFilter = [];
        let arrayData = action_id_select.toString().split(',');
        $.each(listEndPointId.data.listEndPoint, function (index, item) {
            if ($.inArray(item.sub_module_id, arrayData) !== -1) {
                dataFilter.push(item);
            }
        });
        if(dataFilter.length === 0) { endPointSelected = []; }
        $.each(dataFilter, function (i, item) {
            val_id_select = val_id_select + ',' + item.end_point_id;
        });
        fnGetEndPointSelected();
        fnEndPointList();
        // selected user end point already assigned
        $('#umt_end_point').val(endPointSelected);
        fnGetEndPointSelected();
    }else
     {
        CallAPI.Go(v_get_end_point_select, undefined, fnGetEndPointSelectCallBack, 'processing');
    }
}
function fnGetEndPointSelectCallBack(data) {
    if (data.status === '1') {
        listEndPointId = data;
        fnEndPointActionChange();
    } else {
        goAlert.alertError("Error Get Data", data.message);
    }
}
function accessAPIEnable() {
    let api_access = $("#umt_acc_api_selete").val();
    if (api_access === 'Y') {
        if (listing_end_point == null || listing_end_point === "") {
            CallAPI.Go(v_getEndPointUrl, undefined, fnGetEndPointCallBack);
        }
        goShowHide.showOnDivAsBlock("umt_end_point_div");
        goShowHide.showOnDivAsBlock("umt_end_point_action_div");
        goShowHide.showOnDivAsBlock("div_project");
        goShowHide.showOnDivAsBlock("div_ldap");
        selectionStyle.Multiples("umt_end_point", undefined);
        selectionStyle.Multiples("umt_uc_end_point_role", undefined);
        $("#umt_project_selete").val('2').change();
    } else {
        selectionStyle.Multiples("umt_end_point", undefined);
        selectionStyle.Multiples("umt_uc_end_point_role", undefined);
        goShowHide.hideOnDiv("umt_end_point_div");
        goShowHide.hideOnDiv("umt_end_point_action_div");
        goShowHide.hideOnDiv("div_project");
        goShowHide.hideOnDiv("div_ldap");
    }
}
function fnAllowUserAccesssAPI(type) {
    let user_id = $("#umt_uc_user_id").val();
    let user_name = $("#umt_uc_fullname").val();
    let user_email = $("#umt_uc_email").val();
    let user_password = $("#umt_uc_password").val();
    let templete_id = $("#umt_project_selete").val();
    let access_api = $("#umt_acc_api_selete").val();
    let request_date = $("#umt_uc_req_date").val();
    let allowLdap = $("#umt_allow_ldap").val();
    let end_point_id = $("#umt_end_point").val();
    let values_endPointId = end_point_id.toString();
    if (user_id === "") {
        goAlert.alertErroTo("umt_uc_user_id", "Processing Failed", "User id must be input", "input");
        return false;
    }
    if (user_name === "") {
        goAlert.alertErroTo("umt_uc_fullname", "Processing Failed", "user name must be input", "input");
        return false;
    }
    if (user_email == null) {
        goAlert.alertErroTo("umt_uc_email", "Processing Failed", "mail must be select", "input");
        return false;
    }
    if (templete_id == null) {
        goAlert.alertErroTo("umt_project_selete", "Processing Failed", "project must be select", "change");
        return false;
    }
    if (request_date === "") {
        goAlert.alertErroTo("umt_uc_req_date", "Processing Failed", "request date must be input", "input");
        return false;
    }
    if (access_api == null || access_api === "") {
        goAlert.alertErroTo("umt_acc_api_selete", "Processing Failed", "access api must be select", "change");
        return false;
    }
    if (allowLdap == null || allowLdap === "") {
        goAlert.alertErroTo("umt_allow_ldap", "Processing Failed", "allow ldap must be select", "change");
        return false;
    }
    if (access_api != null || access_api !== "") {
        if (end_point_id === '') {
            goAlert.alertErroTo("umt_end_point", "Processing Failed", "end point must be select", "change");
            return false;
        }
    }
    let data = {
        new_user_id: user_id,
        fullname: user_name,
        email: user_email,
        pwd: user_password,
        templete_id: templete_id,
        access_api: access_api,
        request_date: request_date,
        end_point_id: values_endPointId,
        enable_ldap: allowLdap,
        type: type
    };
    CallAPI.Go(v_enableAccessAPI, data, fnAllowUserAccessAPICallBack, "Processing...");
}
var end_point_id_select;
function fnGetUserForUpdate(useOn) {
    delete end_point_id_select;
    let data;
    let user_id_input = $("#umt_uc_user_id").val();
    switch (useOn) {
        case 'getUser': {
            let user_id_obj = [];
            let user_id;
            user_id_obj = table.GetValueSelected("umt_uc_listing_tbl");
            if (user_id_input !== "") {
                user_id = user_id_input;
            }
            else {
                if (user_id_obj.length === 0) {
                    goAlert.alertError("Processing Failed", "No End Point ID Selected");
                    return false;
                }
                if (user_id_obj.length > 1) {
                    goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
                    return false;
                }
                user_id = stringCreate.FromObject(user_id_obj);
            }
            data = {
                user_id: user_id
            };
            CallAPI.Go(v_UserDataForUpdate, data, fnGetUserForUpdateCallBack, "Processing...");
        } break;
        case 'getUserEndPoint': {
            if (user_id_input !== 0) {
                data = {
                    user_id: user_id_input
                }
                CallAPI.Go(v_UserDataForUpdate, data, fnGetUserEndPointCallback, "Processing...");
            }
        } break;
    }
}
function fnDeleteUser() {
    let user_id_obj = [];
    user_id_obj = table.GetValueSelected("umt_uc_listing_tbl");
    if (user_id_obj.length === 0) {
        goAlert.alertError("Processing Failed", "No End Point ID Selected");
        return false;
    }
    if (user_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    let user_id = stringCreate.FromObject(user_id_obj);
    let data = {
        user_id: user_id
    };
    CallAPI.Go(v_delete_user_ito, data, fnDeleteUserITOCallBack, "Processing...");
}
