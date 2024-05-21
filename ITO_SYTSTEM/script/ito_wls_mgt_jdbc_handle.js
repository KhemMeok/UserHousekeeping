/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function fnWlsMgtJDBGetListEnvCallBack(data) {
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
        selectionStyle.LiveSearch("wls_mgt_jdbc_env", opt_list_envs);
        selectionStyle.LiveSearch("wls_mgt_jdbc_exe_log_sl", opt_list_envs);
        //selectionStyle.LiveSearch("wls_mgt_sl_env_get_data", opt_list_envs);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }

}
function fnWlsJdbcGetJdbcCallBack(data) {
    v_list_jdbc = data.data;
    //console.log(data.data);
    var columns = [
        {
            'data': 'name', 'render': function (name) {
                return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + name + "' />"
            },
            'sortable': false
        },
        { 'data': 'name' },
        { 'data': 'username' },
        { 'data': 'url' },
        { 'data': 'driver' },
        { 'data': '', 'render': function () { return "" } }
    ];
    if (data.status == "1") {

        v_wls_mgt_env_url = data.info.url;
        v_wls_mgt_user_basic = data.info.basic;

   

        dataTable.ApplyJson("wls_mgt_tbl_jdbc", columns, data.data);

    }
    else {
        dataTable.ApplyJson("wls_mgt_tbl_jdbc", columns, data.data);
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnWlsJDBCCreateTaskCallBack(data) {
    v_arr_jdbc_chg_list = [];
    if (data.status == "1") {
        goAlert.alertInfo("Information", data.message);
        
        var columns = [
            {
                'data': 'name', 'render': function (name) {
                    return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + name + "' />"
                },
                'sortable': false
            },
            { 'data': 'name' },
            { 'data': 'username' },
            { 'data': 'url' },
            { 'data': 'driver' },
            //{
            //    'data': '', 'render': function (data, type, row) {
            //        var tmp_key = row['key'];
            //        var f = tmp_key.substring(0, 2);
            //        var l = tmp_key.substring(tmp_key.length - 2, tmp_key.length);

            //        var s = f + "<i class='fas fa-circle fa-xs'></i><i class='fas fa-circle fa-xs'></i><i class='fas fa-circle fa-xs'></i>" + l;

            //        return s;
            //    }
            //},
            //{
            //    'data': '', 'render': function (data, type, row) {
            //        var tmp_key = row['pwd'];
            //        var f = tmp_key.substring(0, 2);
            //        var l = tmp_key.substring(tmp_key.length - 2, tmp_key.length);

            //        var s = f + "<i class='fas fa-circle fa-xs'></i><i class='fas fa-circle fa-xs'></i><i class='fas fa-circle fa-xs'></i>" + l;

            //        return s;
            //    }
            //},
            { 'data': 'env_name' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJson("wls_mgt_tbl_jdbc_chg_list", columns, v_arr_jdbc_chg_list);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnWlsJDBCGetTasksCallBack(data) {
    if (data.status == "1") {
        v_jdbc_list_tasks = data.data;
        var opt_list_tasks;
        $.each(data.data, function (i, item) {
            if (i == 0) {

                opt_list_tasks = '<option value=""></option>';
                opt_list_tasks = opt_list_tasks + '<option value="' + item.id + '">' + item.name + '</option>';
            }
            else {
                opt_list_tasks = opt_list_tasks + '<option value="' + item.id + '">' + item.name + '</option>';
            }

        });
        selectionStyle.LiveSearch("wls_mgt_jdbc_sl_task_name", opt_list_tasks);
        //selectionStyle.LiveSearch("wls_mgt_sl_env_get_data", opt_list_envs);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }

}
function fnWlsJDBCGetTikectCallBack(data) {
    if (data.status == "1") {
        var opt_list_tickets;
        $.each(data.data, function (i, item) {
            if (i == 0) {

                opt_list_tickets = '<option value=""></option>';
                opt_list_tickets = opt_list_tickets + '<option value="' + item.acl_ref + '">' + item.acl_ref + " - " + item.desc + '</option>';
            }
            else {
                opt_list_tickets = opt_list_tickets + '<option value="' + item.acl_ref + '">' + item.acl_ref + " - " + item.desc + '</option>';
            }

        });
        selectionStyle.LiveSearch("wls_mgt_jdbc_sl_ticket", opt_list_tickets);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnWlsJDBCGetJDBCChangeCallBack(data) {
    if (data.status == "1") {
        v_jdbc_change_list_arr = data.data;
 
        var columns = [
            {
                'data': 'id', 'render': function (id) {
                    return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + id + "' />"
                },
                'sortable': false
            },
            { 'data': 'name' },
            { 'data': 'username' },
            { 'data': 'url' },
            { 'data': 'driver' },
            //{
            //    'data': 'password', 'render': function (data, type, row) {
            //        return '<span style="color:green;"><a href="javascript:fnWlsJDBCPreViewPassword(' + row['id'] + ')"><i class="fas fa-key"></i> View</a></span>'
            //    }
            //},
            { 'data': 'environment' },
            { 'data': '', 'render': function () { return "" } }
        ];

        dataTable.ApplyJson("wls_mgt_tbl_jdbc_change", columns, data.data);

    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnWlsJDBCExeChangeCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Execute Task", data.message);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
    fnWlsJDBCGetJDBCChange();
}
function fnWlsJDBCGetTaskExeLogCallBack(data) {
    v_jdbc_exe_log = [];
    if (data.status == "1") {
        v_jdbc_exe_log = data.data;
        var columns = [
            {
                'data': 'id'
            },
            { 'data': 'task_name' },
            { 'data': 'ds_name' },
            {
                'data': 'executed_stat'
            },
            {
                'data': 'executed_response', 'render': function (data, type, row) {

                    var re_str = "";
                    if (row['executed_response'] == "{}") {
                        re_str = '<span style="color:green;"><a href="javascript:fnWlsJDBCViewExeResponse(' + row['id'] + ')"><i class="fas fa-sticky-note"></i> View</a></span>'
                    }
                    else {

                        if (row['executed_stat'] == "Y") {
                            re_str = '<span style="color:green;"><a href="javascript:fnWlsJDBCViewExeResponse(' + row['id'] + ')"><i class="text-warning fas fa-exclamation-triangle"></i> | <i class="fas fa-sticky-note"></i> View</a></span>'
                        }
                        else {
                            re_str = "";
                        }
                        
                    }
                    return re_str
                }
            },
            { 'data': 'executed_by' },
            { 'data': 'executed_date' },
            { 'data': 'task_owner' },
            { 'data': 'grantee' },
            { 'data': 'task_expired_date' },
            { 'data': 'ticket_no' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJson("wls_mgt_tbl_jdbc_task_log", columns, data.data);

    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnWlsJDBCVerifyLoginPwdCallBack(data) {
    if (data.status == "1") {
        v_jdbc_pwd_verified = "Y";
        goAlert.alertInfo("Password Verify", data.message);
        fnWlsJdbcAddJdbcToChgList("N");
        setTimeout(function () { v_jdbc_pwd_verified = "N" }, 30000);
    }
    else {
        modals.OpenStatic("modal_wls_jdbc_enter_ad_pwd");
        goAlert.alertError("Password Verify", data.message);
    }
}

function fnWlsJdbcTestCallBack(data) {
    console.log(data.data);
    var columns = [
        { 'data': 'seq' },
        { 'data': 'ds_name' },
        {
            'data': 'ds_status', 'render': function (ds_status) {
                var str_new_val = "";
                if (ds_status == "SUCCESS") {
                    str_new_val = "<strong><i class='fas fa-check' style='color:green;'></i></strong> " + ds_status;
                }
                else {
                    str_new_val = str_new_val = "<strong><i class='fas fa-exclamation-triangle text-danger'></i></strong> "; + ds_status;
                }
                return str_new_val;
            }
        },
        { 'data': 'ds_message' },
        { 'data': '', 'render': function () { return "" } }
    ];
    if (data.status == "1") {
        dataTable.ApplyJson("wls_mgt_jdbc_tbl_ds_test", columns, data.data);
        modals.OpenStatic("modal_wls_jdbc_test_result");
        //dataTable.Recal();
    }
    else {
        dataTable.ApplyJson("wls_mgt_jdbc_tbl_ds_test", columns, data.data);
        goAlert.alertError("Processing Failed", data.message);
    }
}