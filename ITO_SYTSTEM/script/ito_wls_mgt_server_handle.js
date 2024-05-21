/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function fnWlsMgtGetListEnvCallBack(data) {
    if (data.status == "1") {
        var opt_list_envs;
        $.each(data.data, function (i, item) {
            if (i == 0) {

                opt_list_envs = '<option value=""></option>';
                opt_list_envs = opt_list_envs + '<option value="' + item.id + '">' + item.desc + '</option>';
            }
            else {
                opt_list_envs = opt_list_envs + '<option value="' + item.id + '">' + item.desc + '</option>';
            }

        });
        selectionStyle.LiveSearch("wls_mgt_sl_env", opt_list_envs);
        selectionStyle.LiveSearch("wls_mgt_sl_env_get_data", opt_list_envs);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
    
}
function fnWlsMgtGetManageServersCallBack(data) {
    
    var columns = [
        {
            'data': 'name', 'render': function (name) {
                return "<input type='checkbox' style='transform: scale(1); margin-top:0px; margin-left:40%; margin-bottom:0;' value='" + name + "' />"
            },
            'sortable': false
        },
        { 'data': 'name' },
        { 'data': 'type' },
        { 'data': 'cluster' },
        { 'data': 'machine' },
        {
            'data': 'state', 'render': function (state) {
                var str_new_val = "";

                if (state == "SHUTDOWN") {
                    str_new_val = "<strong><i class='fas fa-arrow-down text-danger'></i></strong> " + state;
                }
                else if (state == "STARTING") {
                    str_new_val = "<strong><i class='fas fa-circle-notch fa-spin' style='color:blue;'></i></strong> " + state;

                }
                else if (state == "RESUMING" || state == "STANDBY" || state == "ADMIN") {
                    str_new_val = "<strong><i class='fas fa-spinner fa-pulse' style='color:green;'></i></strong> " + state;
                }
                else if (state == "SUSPENDING" || state == "FORCE_SUSPENDING" || state == "SHUTTING_DOWN" || state == "FORCE_SHUTTING_DOWN") {
                    str_new_val = "<strong><i class='fas fa-spinner fa-pulse text-danger'></i></strong> " + state;
                }
                else if (state == "FAILED") {
                    str_new_val = "<strong><i class='fas fa-times text-danger'></i></strong> " + state;
                }
                else if (state == "RUNNING") {
                    str_new_val = "<strong><i class='fas fa-arrow-up' style='color:green;'></i></strong> " + state;
                }
                else {
                    str_new_val = state;
                }
                return str_new_val;

            }
        },
        {
            'data': 'health', 'render': function (health) {
                var str_new_val = "";
                if (health == "HEALTH_OK") {
                    str_new_val = "<strong><i class='fas fa-check' style='color:green;'></i></strong> OK";
                }
                else if (health == "HEALTH_WARN") {
                    str_new_val = "<strong><i class='fas fa-exclamation text-warning'></i></strong> WARNING";
                }
                else if (health == "HEALTH_CRITICAL") {
                    str_new_val = "<strong><i class='fas fa-exclamation-triangle text-danger'></i></strong> CRITICAL";
                }
                else if (health == "HEALTH_FAILED") {
                    str_new_val = "<strong><i class='fas fa-times text-danger'></i></strong> FAILED";
                }
                else if (health == "UNKNOWN") {
                    str_new_val = "<strong><i class='fas fa-question text-danger'></i></strong> FAILED";
                }
                else {
                    str_new_val = health;
                }
                return str_new_val;
            }
        },
        { 'data': 'listen_port' },
        { 'data': 'ssl_listen_port' },
        {
            'data': 'nodemanager', 'render': function (nodemanager) {
                var str_new_val = "";
                if (nodemanager == "true") {
                    str_new_val = "<strong><i class='fas fa-check' style='color:green;'></i></strong> Reachable";
                }
                else {
                    str_new_val = "<strong><i class='fas fa-times text-danger'></i></strong> Inactive";
                }
                return str_new_val;
            }
        },
        { 'data': '', 'render': function () { return "" } }
    ];
    if (data.status == "1") {
        v_total_manage_server = data.data.length;
        dataTable.ApplyJson("wls_mgt_tbl_manage_servers", columns, data.data);
    }
    else {
        dataTable.ApplyJson("wls_mgt_tbl_manage_servers", columns, data.data);
        v_total_manage_server = 0;
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnWlsMgtEnvChangeCallBack(data) {
    if (data.status == "1") {
        var opt_list_tickets;
        $.each(data.data, function (i, item) {
            if (i == 0) {

                opt_list_tickets = '<option value=""></option>';
                opt_list_tickets = opt_list_tickets + '<option value="' + item.acl_ref + '">' + item.acl_ref+" - " + item.desc + '</option>';
            }
            else {
                opt_list_tickets = opt_list_tickets + '<option value="' + item.acl_ref + '">' + item.acl_ref + " - " + item.desc + '</option>';
            }

        });
        selectionStyle.LiveSearch("wls_mgt_sl_ticket", opt_list_tickets);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnWlsMgtActionServerCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Information", data.message);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
    v_wls_mgt_check_shut_click = "N";
}
function fnWlsMgtGetHistActionLogCallback(data) {
    if (data.status == "1") {
        var columns_log = [
            { 'data': 'id' },
            { 'data': 'acl_ref' },
            { 'data': 'server_name' },
            { 'data': 'action' },
            { 'data': 'status' },
            {
                'data': '', 'render': function (data, type, row) {
                    return '<span style="color:green;"><a href="javascript:fnWlsMgtOpenResponsActionLog(' + row['id'] + ')"><i class="fas fa-sticky-note"></i> View</a></span>'
                }
            },
            { 'data': 'start_time' },
            { 'data': 'end_time' },
            { 'data': 'execute_by' },
            { 'data': '', 'render': function () { return "" } }

        ];
        v_wls_mgt_hist_action_log = data.data;
        dataTable.ApplyJson("wls_mgt_tbl_history_log", columns_log, data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
