/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function BtcNewInit() {
    element.inputValue("de_btc_bt_name", "");
    element.inputValue("de_btc_group_label", "");
    element.inputValue("de_btn_riel_label", "");
    element.inputValue("de_btn_usd_label", "");
    element.inputValue("de_btn_thb_label", "");
    checkBox.Uncheck(["de_btc_app_auth_allow", "de_btc_req_nkd_allow", "de_btc_bkd_allow", "de_btc_req_sche_allow", "de_btc_group_req_allow", "de_btc_khr_inrounding", "de_btc_cypo_upload_allow"]);
    checkBox.Check("de_btc_single_req_allow");
    selectionStyle.Multiple("de_btc_bt_source", v_all_batch_sources_opt);
    goShowHide.showOnDivAsInline("de_btc_create");
    goShowHide.hideOnDiv(["de_btc_update", "de_btc_cancel"]);
}
function BtcValidateInput() {
    var boolStat = true;
    if ($("#de_btc_bt_name").val() == "") {
        goAlert.alertErroTo("de_btc_bt_name", "Batch Type Creation Error", "Batch Type Name cannot be empty.");
        boolStat = false;
    };
    if ($("#de_btc_group_label").val() == "") {
        goAlert.alertErroTo("de_btc_group_label", "Batch Type Creation Error", "Group Label cannot be empty.");
        boolStat = false;
    };
    if ($("#de_btn_riel_label").val() == "") {
        goAlert.alertErroTo("de_btn_riel_label", "Batch Type Creation Error", "Batch Number Currency Khmer Riel Label cannot be empty.");
        boolStat = false;
    };
    if ($("#de_btn_usd_label").val() == "") {
        goAlert.alertErroTo("de_btn_usd_label", "Batch Type Creation Error", "Batch Number Currency Dollar Label cannot be empty.");
        boolStat = false;
    };
    if ($("#de_btn_thb_label").val() == "") {
        goAlert.alertErroTo("de_btn_thb_label", "Batch Type Creation Error", "Batch Number Currency Thai Baht Label cannot be empty.");
        boolStat = false;
    };
    if (checkBox.checkStat("de_btc_single_req_allow") == false && checkBox.checkStat("de_btc_group_req_allow") == false) {
        goAlert.alertError("Batch Type Creation Error", "Single Request Allow or Group Request Allow should be selected.");
        boolStat = false;
    };
    var BTCBatchSource = [];
    BTCBatchSource = $("#de_btc_bt_source").val();
    if (BTCBatchSource.length == 0) {
        goAlert.alertErroTo("DE_BATCH_TYPE_CREATION #bootstrap-duallistbox-selected-list_", "Batch Type Creation Error", "Batch Sources should be selected.");
        boolStat = false;
    };
    return boolStat;
};
function BtcCreateBatchTypeDialog() {
    if (BtcValidateInput() == true) {
        if (modals.ConfirmShowAgain("mdbtcreatebatchtype") == true) {
            modals.Confirm("Batch Type Creation", "Are you sure to create this batch type?", "N", "Yes", "onclick", "BtcCreateBatchType()", "mdbtcreatebatchtype");
        }
        else {
            BtcCreateBatchType();
        };
    };
}
function BtcCreateBatchType() {
    if (BtcValidateInput() == true) {
        modals.CloseConfirm();
        var btName = $("#de_btc_bt_name").val();
        var btGroupLabel = $("#de_btc_group_label").val();
        var btKHRLabel = $("#de_btn_riel_label").val();
        var btUSDLabel = $("#de_btn_usd_label").val();
        var btTHBLabel = $("#de_btn_thb_label").val();
        var btAppAuth = (checkBox.checkStat("de_btc_app_auth_allow") == true) ? "Y" : "N";
        var btNKD = (checkBox.checkStat("de_btc_req_nkd_allow") == true) ? "Y" : "N";
        var btBKD = (checkBox.checkStat("de_btc_bkd_allow") == true) ? "Y" : "N";
        var btSchedule = (checkBox.checkStat("de_btc_req_sche_allow") == true) ? "Y" : "N";
        var btSingleReq = (checkBox.checkStat("de_btc_single_req_allow") == true) ? "Y" : "N";
        var btGroupReq = (checkBox.checkStat("de_btc_group_req_allow") == true) ? "Y" : "N";
        var btSourcesObj = [];
        btSourcesObj = $("#de_btc_bt_source").val();
        var btStrSrources = stringCreate.FromObject(btSourcesObj);
        var xmlObj = {
            BatchTypeName: btName,
            GroupLabel: btGroupLabel,
            KHRLabel: btKHRLabel,
            USDLabel: btUSDLabel,
            THBLabel: btTHBLabel,
            AppAuth: btAppAuth,
            NKD: btNKD,
            BKD: btBKD,
            Schedule: btSchedule,
            SingleReq: btSingleReq,
            GroupReq: btGroupReq,
            BatchSources: btStrSrources,
            Maker: STAFF_ID
        };
        var xmlData = stringCreate.toXML("BatchTypeCreation", xmlObj).End();

        myRequest.Execute(v_deBatchTypeCreate, { xmlData: xmlData }, feDeBTCCreteBatchTypeCallBack, "Processing...");
    };
};
function BtcGetBatchTypeLising(process_indecator) {
    if (process_indecator == undefined) {
        myRequest.Execute(v_deBatchTypeListing, undefined, fneBTCGetListingCallBack);
    }
    else {
        myRequest.Execute(v_deBatchTypeListing, undefined, fneBTCGetListingCallBack, "Processing...");
    }
};
function BtcGetDataForUpdate() {
    var objBatchType = [];
    objBatchType = table.GetValueSelected("de_btc_batch_type_tbl");
    if (objBatchType.length == 0) {
        goAlert.alertError("Batch Type Update Error", "No Batch Type selected");
        return false;
    };
    if (objBatchType.length > 1) {
        goAlert.alertError("Batch Type Update Error", "Operation cannot select multiple batch types");
        return false;
    };
    var batch_type = stringCreate.FromObject(objBatchType);
    BtcNewInit();
    $("#de_btc_update").val(batch_type);
    myRequest.Execute(v_deBatchTypeForUpdate, { batch_type: batch_type }, fnBTCGetDataForUpdateCallBack, "Processing...");
};
function BtcUpdateBatchTypeDialog() {
    if (BtcValidateInput() == true) {
        if (modals.ConfirmShowAgain("mdbtupdatebatchtype") == true) {
            modals.Confirm("Batch Type Update", "Are you sure to update this batch type?", "N", "Yes", "onclick", "BtcUpdateBatchType()", "mdbtupdatebatchtype");
        }
        else {
            BtcUpdateBatchType();
        };
    };
};
function BtcUpdateBatchType(batchtypeid) {
    modals.CloseConfirm();
    var batchtypeid = $("#de_btc_update").val();
    var btName = $("#de_btc_bt_name").val();
    var btGroupLabel = $("#de_btc_group_label").val();
    var btKHRLabel = $("#de_btn_riel_label").val();
    var btUSDLabel = $("#de_btn_usd_label").val();
    var btTHBLabel = $("#de_btn_thb_label").val();
    var btAppAuth = (checkBox.checkStat("de_btc_app_auth_allow") == true) ? "Y" : "N";
    var btNKD = (checkBox.checkStat("de_btc_req_nkd_allow") == true) ? "Y" : "N";
    var btBKD = (checkBox.checkStat("de_btc_bkd_allow") == true) ? "Y" : "N";
    var btSchedule = (checkBox.checkStat("de_btc_req_sche_allow") == true) ? "Y" : "N";
    var btSingleReq = (checkBox.checkStat("de_btc_single_req_allow") == true) ? "Y" : "N";
    var btGroupReq = (checkBox.checkStat("de_btc_group_req_allow") == true) ? "Y" : "N";
    var btKHRInrounding = (checkBox.checkStat("de_btc_khr_inrounding") == true) ? "Y" : "N";
    var btCYPOUploadAllow = (checkBox.checkStat("de_btc_cypo_upload_allow") == true) ? "Y" : "N";
    var btSourcesObj = [];
    btSourcesObj = $("#de_btc_bt_source").val();
    var btStrSrources = stringCreate.FromObject(btSourcesObj);
    var xmlObj = {
        BatchTypeID: batchtypeid,
        BatchTypeName: btName,
        GroupLabel: btGroupLabel,
        KHRLabel: btKHRLabel,
        USDLabel: btUSDLabel,
        THBLabel: btTHBLabel,
        AppAuth: btAppAuth,
        NKD: btNKD,
        BKD: btBKD,
        Schedule: btSchedule,
        SingleReq: btSingleReq,
        GroupReq: btGroupReq,
        KHRInrounding: btKHRInrounding,
        CYPOUploadAllow: btCYPOUploadAllow,
        BatchSources: btStrSrources,
        Maker: STAFF_ID
    };
    var xmlData = stringCreate.toXML("BatchTypeUpdate", xmlObj).End();
    console.log(xmlData);
    myRequest.Execute(v_deBatchTypeUpdate, { xmlData: xmlData }, fnDeBTCUpdateBatchTypeCallBack, "Processing...");
};
function BtcDeleteDialog() {
    var objBatchType = [];
    objBatchType = table.GetValueSelected("de_btc_batch_type_tbl");
    if (objBatchType.length == 0) {
        goAlert.alertError("Batch Type Update Error", "No Batch Type selected");
        return false;
    };
    if (modals.ConfirmShowAgain("mdbtdeletebatchtype") == true) {
        modals.Confirm("Batch Type Delete", "Are you sure to delete selected batch types?", "N", "Yes", "onclick", "BtcDelete()", "mdbtdeletebatchtype");
    }
    else {
        BtcDelete();
    };

};
function BtcDelete() {
    modals.CloseConfirm();
    var objBatchType = [];
    objBatchType = table.GetValueSelected("de_btc_batch_type_tbl");
    var batch_type = stringCreate.FromObject(objBatchType);
    var xmlObj = {
        BatchTypes: batch_type,
        Maker: STAFF_ID
    };
    var xmlData = stringCreate.toXML("DeleteBatchType", xmlObj).End();
    myRequest.Execute(v_deBatchTypeDelete, { xmlData: xmlData }, fnDeBTCDeleteBatchTypeCallBack, "Processing...");
};
function BtcStartMember() {
    var objBatchType = [];
    objBatchType = table.GetValueSelected("de_btc_batch_type_tbl");
    if (objBatchType.length == 0) {
        goAlert.alertError("Batch Type Update Error", "No Batch Type selected");
        return false;
    };
    var batch_type_id = stringCreate.FromObject(objBatchType);
    element.inputValue("de_btc_mem_batch_type_id", batch_type_id);
    element.inputValue("de_btc_mem_add_fcub_up_userid", "");
    element.inputValue("de_btc_mem_add_fcub_au_userid", "");
    myRequest.Execute(v_deBatchTypeGetUser, { types: "to_add", batch_type: batch_type_id }, fnDeBTCgetUsersCallBack, "Processing...")
};
var current_btc_mem_tab = "add_member_tab";
var current_btc_modal_show_id = "mdbtcconfirmadduserrole";
function BtcDefineActiveTab(tab) {
    current_btc_mem_tab = tab;
    var batch_type_id = $("#de_btc_mem_batch_type_id").val();
    if (tab == "add_member_tab") {
        myRequest.Execute(v_deBatchTypeGetUser, { types: "to_add", batch_type: batch_type_id }, fnDeBTCgetUsersCallBack);
        $("#de_btc_mem_get_users").removeAttr("onchange");
        current_btc_modal_show_id = "mdbtcconfirmadduserrole";
    };
    if (tab == "modify_member_tab") {
        myRequest.Execute(v_deBatchTypeGetUser, { types: "to_modify", batch_type: batch_type_id }, fnDeBTCgetUsersCallBack);
        $("#de_btc_mem_get_users").attr("onchange", "BtcGetUserCurrentRole()");
        current_btc_modal_show_id = "mdbtcconfirmmodifyuserrole";
    };
};
var mdtitle = "";
function BtcMemRoleSubmitDialog() {
    if (BtcMemhandleValInput(current_btc_mem_tab) == false) { return false };
    if (modals.ConfirmShowAgain(current_btc_modal_show_id) == true) {
        var questionair = "";
        mdtitle = (current_btc_mem_tab == "add_member_tab") ? "Add Member" : mdtitle;
        questionair = (current_btc_mem_tab == "add_member_tab") ? "Are you sure to add this user?" : questionair;
        mdtitle = (current_btc_mem_tab == "modify_member_tab") ? "Modify Member" : mdtitle;
        questionair = (current_btc_mem_tab == "modify_member_tab") ? "Are you sure to modify this user?" : questionair;
        modals.Confirm(mdtitle, questionair, "N", "Yes", "onclick", "BtcMemRoleSubmitConfirm()", current_btc_modal_show_id);
    }
    else {
        BtcMemRoleSubmitConfirm();
    };
};
function BtcMemRoleSubmitConfirm() {
    if (BtcMemhandleValInput(current_btc_mem_tab) == false) { return false };
    modals.CloseConfirm();
    modals.Close("modalAddMemberBatchType");
    var types = "";
    if (current_btc_mem_tab == "add_member_tab") {
        types = "assign";
    };
    if (current_btc_mem_tab == "modify_member_tab") {
        types = "modify";
    };
    var batchType = $("#de_btc_mem_batch_type_id").val();
    var memID = $("#de_btc_mem_get_users").val();
    var memRole = $("#de_btc_mem_role").val();
    var memFcubUpUser = $("#de_btc_mem_add_fcub_up_userid").val();
    var memFcubAuUser = $("#de_btc_mem_add_fcub_au_userid").val();
    var xmlObj = {
        type: types,
        batchType: batchType,
        userID: memID,
        role: memRole,
        maker: STAFF_ID,
        fcubUploadUser: memFcubUpUser,
        fcubAuthorizeUser: memFcubAuUser
    };
    var xmlData = stringCreate.toXML("DeUserRole", xmlObj).End();
    //console.log(xmlData);
    myRequest.Execute(v_deBatchTypeUserHandler, { xmlData: xmlData }, fnDeBTCUserHandlerCallBack, "Processing...");
};
function BtcMemhandleValInput(tab) {
    var boolStat = true;
    if (tab == "add_member_tab") {
        var MemAdd = $("#de_btc_mem_get_users").val();
        var MemRole = $("#de_btc_mem_role").val();
        if (MemAdd == "") {
            goAlert.alertErroTo("de_btc_mem_get_users", "Add Member Error", "Choose User to add.", "change");
            boolStat = false;
        };
        if (MemRole == "") {
            goAlert.alertErroTo("de_btc_mem_role", "Add Member Error", "Choose role to add.", "change");
            boolStat = false;
        };
        if (MemRole == "uor" || MemRole == "suuor") {
            if ($("#de_btc_mem_add_fcub_up_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_up_userid", "Add Member Error", "Fill Core Banking Upload UserID.", "change");
                boolStat = false;
            };
        };
        if (MemRole == "aor" || MemRole == "suaor") {
            if ($("#de_btc_mem_add_fcub_au_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_au_userid", "Add Member Error", "Fill Core Banking Authorize UserID.", "change");
                boolStat = false;
            };
        };
        if (MemRole == "susauoraor" || MemRole == "uoraor") {
            if ($("#de_btc_mem_add_fcub_up_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_up_userid", "Add Member Error", "Fill Core Banking Upload UserID.", "change");
                boolStat = false;
            };
            if ($("#de_btc_mem_add_fcub_au_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_au_userid", "Add Member Error", "Fill Core Banking Authorize UserID.", "change");
                boolStat = false;
            };
        };
    };
    if (tab == "modify_member_tab") {
        var MemAdd = $("#de_btc_mem_get_users").val();
        var MemRole = $("#de_btc_mem_role").val();
        if (MemAdd == "") {
            goAlert.alertErroTo("de_btc_mem_get_users", "Add Member Error", "Choose User to add.", "change");
            boolStat = false;
        };
        if (MemRole == "") {
            goAlert.alertErroTo("de_btc_mem_role", "Add Member Error", "Choose role to add.", "change");
            boolStat = false;
        };
        if (MemRole == "uor" || MemRole == "suuor") {
            if ($("#de_btc_mem_add_fcub_up_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_up_userid", "Add Member Error", "Fill Core Banking Upload UserID.", "change");
                boolStat = false;
            };
        };
        if (MemRole == "aor" || MemRole == "suaor") {
            if ($("#de_btc_mem_add_fcub_au_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_au_userid", "Add Member Error", "Fill Core Banking Authorize UserID.", "change");
                boolStat = false;
            };
        };
        if (MemRole == "susauoraor" || MemRole == "uoraor") {
            if ($("#de_btc_mem_add_fcub_up_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_up_userid", "Add Member Error", "Fill Core Banking Upload UserID.", "change");
                boolStat = false;
            };
            if ($("#de_btc_mem_add_fcub_au_userid").val() == "") {
                goAlert.alertErroTo("de_btc_mem_add_fcub_au_userid", "Add Member Error", "Fill Core Banking Authorize UserID.", "change");
                boolStat = false;
            };
        };
    };
    return boolStat;
};
function BtcAddMemValFcubUser(role) {
    element.setDisable(["de_btc_mem_add_fcub_up_userid", "de_btc_mem_add_fcub_au_userid"]);
    if (role == "uor" || role == "suuor") {
        element.setEnable("de_btc_mem_add_fcub_up_userid");
    };
    if (role == "aor" || role == "suaor") {
        element.setEnable("de_btc_mem_add_fcub_au_userid");
    };
    if (role == "susauoraor" || role == "uoraor") {
        element.setEnable(["de_btc_mem_add_fcub_au_userid", "de_btc_mem_add_fcub_up_userid"]);
    };
};
function BtcGetUserCurrentRole() {
    var memID = $("#de_btc_mem_get_users").val();
    var batchType = $("#de_btc_mem_batch_type_id").val();
    myRequest.Execute(v_deBatchTypeUserCurrRole, { user_id: memID, batch_type: batchType }, feDeBTCGetUserCurrRoleCallBack);
};
function BtcRemoveMemberDialog() {
    if (current_btc_mem_tab != "modify_member_tab") {
        goAlert.alertError("Remove Member Error", "Click on Tab Modify and select user to delete.");
        return false;
    };
    if ($("#de_btc_mem_get_users").val() == "") {
        goAlert.alertErroTo("de_btc_mem_get_users", "Remove Member Error", "Select user to remove");
        return false;
    };
    if (modals.ConfirmShowAgain("mdbtcconfirmremoveuser") == true) {
        mdtitle = "Remove Member";
        modals.Confirm(mdtitle, "Are you sure to remove the selected user?", "N", "Yes", "onclick", "BtcRemoveMember()", "mdbtcconfirmremoveuser");
    }
    else {
        BtcRemoveMember();
    };

};
function BtcRemoveMember() {
    modals.CloseConfirm();
    modals.Close("modalAddMemberBatchType");
    var batchType = $("#de_btc_mem_batch_type_id").val();
    var memID = $("#de_btc_mem_get_users").val();
    var xmlObj = {
        type: "delete",
        batchType: batchType,
        userID: memID,
        role: "",
        maker: STAFF_ID,
        fcubUploadUser: "",
        fcubAuthorizeUser: ""
    };
    var xmlData = stringCreate.toXML("DeUserRole", xmlObj).End();
    myRequest.Execute(v_deBatchTypeUserHandler, { xmlData: xmlData }, fnDeBTCUserHandlerCallBack, "Processing...");
};