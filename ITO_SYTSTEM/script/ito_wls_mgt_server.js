/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />



var v_total_manage_server = 0;
function fnWlsFetchManageServers(Process) {
    var env_id = $("#wls_mgt_sl_env").val();
    if (env_id == "") {
        goAlert.alertErroTo("wls_mgt_sl_env", "Processing Failed", "Environment must be selected", "change");
        $("#wls_mgt_icon_auto_fetch_server").removeClass("fa-spin");
        return false;
    }
    var data = {
        environment: env_id
    };
    if (Process == "Y") {
        CallAPI.Go(v_wls_manage_servers, data, fnWlsMgtGetManageServersCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_wls_manage_servers, data, fnWlsMgtGetManageServersCallBack);
    }
}
function fnWlsMgtEnvChange(env) {
    if (env != "") {
        $("#wls_mgt_sl_ticket").html("");
        var data = {
            environment: env,
            condition: "SERVER"
        };
        CallAPI.Go(v_wls_list_tickets, data, fnWlsMgtEnvChangeCallBack, "Processing...");
    }
}

var iAutoFetchServerInterval;
var iAutoFetchServer = 0;
function fnWlsAutoFetchManageServers() {

    if (iAutoFetchServer == 0) {
        $("#wls_mgt_icon_auto_fetch_server").addClass("fa-spin");
        fnWlsFetchManageServers();
        iAutoFetchServerInterval = setInterval(function () { fnWlsFetchManageServers(); }, 10000);
        iAutoFetchServer = 1;
        
    }
    else {
        clearInterval(iAutoFetchServerInterval);
        iAutoFetchServer = 0;
        $("#wls_mgt_icon_auto_fetch_server").removeClass("fa-spin");
    }
}
function fnWlsMgtStartupConfirm() {

    var ticket_no = $("#wls_mgt_sl_ticket").val();

    if (ticket_no == "") {
        goAlert.alertErroTo("wls_mgt_sl_ticket", "Processing Failed", "Ticket must be selected", "change");
        return false;
    }

    var obj_servers = [];
    obj_servers = table.GetValueSelected("wls_mgt_tbl_manage_servers");
    if (obj_servers.length == 0) {
        goAlert.alertError("Processing Failed", "Manage Server must be selected");
        return false;
    }
    

    var servers = stringCreate.FromObject(obj_servers);

    if (modals.ConfirmShowAgain("wlsmgtconfirmstartupmanageserver") == true) {
        modals.Confirm("Startup Server Confirm", "Are you sure to startup server " + servers + " ?", "N", "Yes", "onclick", "fnWlsMgtStartupServer()", "wlsmgtconfirmstartupmanageserver");
    }
    else {
        fnWlsMgtStartupServer();
    }
}
function fnWlsMgtStartupServer() {

    var env_id = $("#wls_mgt_sl_env").val();
    var ticket_no = $("#wls_mgt_sl_ticket").val();
    var obj_servers = [];
    obj_servers = table.GetValueSelected("wls_mgt_tbl_manage_servers");
    var data = {
        environment: env_id,
        ticket: ticket_no,
        servers_collection: obj_servers
    };
    modals.CloseConfirm();
    CallAPI.Go(v_wls_startup_server, data, fnWlsMgtActionServerCallBack, "Processing...");
}
var v_wls_mgt_shutdown_con_proceed = "N";
function fnWlsMgtShutdownConfirm() {

    var ticket_no = $("#wls_mgt_sl_ticket").val();

    //if (ticket_no == "") {
    //    goAlert.alertErroTo("wls_mgt_sl_ticket", "Processing Failed", "Ticket must be selected", "change");
    //    return false;
    //}

    var obj_servers = [];
    obj_servers = table.GetValueSelected("wls_mgt_tbl_manage_servers");
    if (obj_servers.length == 0) {
        goAlert.alertError("Processing Failed", "Manage Server must be selected");
        return false;
    }

    if (v_wls_mgt_shutdown_con_proceed == "N") {
        if (obj_servers.length == v_total_manage_server) {
            modals.OpenStatic("modal_wls_mgt_open_alert");
            return false;
        }
    }

    var servers = stringCreate.FromObject(obj_servers);

    if (modals.ConfirmShowAgain("wlsmgtconfirmshutdownmanageserver") == true) {
        modals.Confirm("Shutdown Server Confirm", "Are you sure to shutdown server " + servers + " ?", "N", "Yes", "onclick", "fnWlsMgtShutdownServer()", "wlsmgtconfirmshutdownmanageserver");
    }
    else {
        fnWlsMgtShutdownServer();
    }
}
var v_wls_mgt_check_shut_click = "N";

function fnWlsMgtShutdownServer() {
    v_wls_mgt_check_shut_click = "Y";
    v_wls_mgt_shutdown_con_proceed = "N";
    var env_id = $("#wls_mgt_sl_env").val();
    var ticket_no = $("#wls_mgt_sl_ticket").val();
    var obj_servers = [];
    obj_servers = table.GetValueSelected("wls_mgt_tbl_manage_servers");
    var data = {
        environment: env_id,
        ticket: ticket_no,
        servers_collection: obj_servers
    };
    modals.CloseConfirm();
    CallAPI.Go(v_wls_shutdown_server, data, fnWlsMgtActionServerCallBack, "Processing...");
}
function fnWlsMgtViewJob() {
    window.open(v_wls_web_job, "newWin", "width=" + screen.availWidth + ",height=" + screen.availHeight)
}
function fnWlsMgtGetHistActionLog() {
    var env_id = $("#wls_mgt_sl_env_get_data").val();
    if (env_id == "") {
        goAlert.alertErroTo("wls_mgt_sl_env_get_data", "Processing Failed", "Environment must be selected", "change");
        return false;
    }
    var data = {
        env_id: env_id
    };
    CallAPI.Go(v_wls_get_hist_action_log, data, fnWlsMgtGetHistActionLogCallback, "Processing...");
}
var v_wls_mgt_hist_action_log;
function fnWlsMgtOpenResponsActionLog(id) {

    modals.Open("modal_wls_mgt_open_response");
    $.each(v_wls_mgt_hist_action_log, function (i, item) {
        if (item.id == id) {
            try {
                const res = JSON.parse(item.response);
                const options= { quoteKeys: true };
                $("#wls_mgt_hist_action_log_pre").html(prettyPrintJson.toHtml(res, options));
               
            } catch (e) {
                var res = item.response;

                $("#wls_mgt_hist_action_log_pre").html(res);
               
            }
            return false;
        }
    });
}