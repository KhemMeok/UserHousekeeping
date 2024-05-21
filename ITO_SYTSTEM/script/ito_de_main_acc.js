/// <reference path="ito_core.js" />
/// <reference path="ito_de_handle.js" />
function deMainAccSearch() {
    var account = $("#deMAACC").val()
    if (account.length < 12) {
        goAlert.alertErroTo("deMAACC", "Error", "Invalid account number", "click");
        return false;
    };
    myRequest.Execute(v_deMainAccSearch, { account: account }, mcFnSearchAcc, "Processing...");
};
function deMainAccNameCh(ac_name) {
    element.inputValue("deMAcompanyname", "");
    element.inputValue("deMAcompanyname",ac_name);
};
function deMainSaveAccDialog() {
    var acc_br = $("#deMAbrcode").val();
    var acc_ccy = $("#deMAccy").val();
    var acc_name = $("#deMAaccountname").val();
    var commpany_name = $("#deMAcompanyname").val();
    if (acc_br == "" || acc_br==undefined) {
        goAlert.alertErroTo("deMAbrcode", "Error", "Choose Branch Code", "change");
        return false;
    };
    if (acc_ccy == "" || acc_ccy == undefined) {
        goAlert.alertErroTo("deMAccy", "Error", "Choose Currency", "change");
        return false;
    };
    if (acc_name == "" || acc_name == undefined) {
        goAlert.alertErroTo("deMAaccountname", "Error", "Choose Account Name", "change");
        return false;
    };
    if (commpany_name == "" || commpany_name == undefined) {
        goAlert.alertErroTo("deMAcompanyname", "Error", "Fill Company Name", "click");
        return false;
    };
    if (modals.ConfirmShowAgain("mdsavemainaccconfirm") == true) {
        modals.Confirm("Save Main Account", "Are you sure to save the account?", "N", "Yes", "onclick", "deMainAccSave()", "mdsavemainaccconfirm");
    }
    else {
        deMainAccSave();
    };
};
function deMainAccSave() {
    modals.CloseConfirm();
    var acc_no = $("#deMAaccount").val();
    var acc_br = $("#deMAbrcode").val();
    var acc_ccy = $("#deMAccy").val();
    var acc_name = $("#deMAaccountname").val();
    var commpany_name = $("#deMAcompanyname").val();
    myRequest.Execute(v_deMainAccSave, {
        user_id: STAFF_ID,
        account: acc_no,
        brcode: acc_br,
        ccy: acc_ccy,
        name: acc_name,
        company_name: commpany_name
    }, mcFnSave, "Processing...");
};
function deMainAccQuery() {
    myRequest.Execute(v_deMainAccQuery, { table_id: "deMAdatatable" }, mcFnQuery,"Processing...");
};
function deMainAccDeleteDialog() {
    var objAcc = [];
    objAcc = table.GetValueSelected("deMAdatatable");
    if (objAcc.length == 0) {
        goAlert.alertError("Error", "No Saving Account selected");
        return false;
    }
    if (modals.ConfirmShowAgain("mdconfirmdeletemainacc") == true) {
        modals.Confirm("Delete Main Account", "Are you sure to delete the selected accounts?", "N", "Yes", "onclick", "deMainAccDelete()", "mdconfirmdeletemainacc");
    }
    else {
        deMainAccDelete();
    };
};
function deMainAccDelete() {
    modals.CloseConfirm();
    var objAcc = [];
    objAcc = table.GetValueSelected("deMAdatatable");
    var strAcc = stringCreate.FromObject(objAcc);
    myRequest.Execute(v_deMainAccDelete, { user_id: STAFF_ID, account: strAcc }, mcFnDelete, "Processing...");
};
