/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

var v_wls_mgt_env_url;
var v_wls_mgt_user_basic;
function fnWlsJdbcGetJdbc() {
    var env_id = $("#wls_mgt_jdbc_env").val();
    
    if (env_id == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_env", "Processing Failed", "Environment must be selected", "change");
        return false;
    }
    var data = {
        env_id: env_id
    }
    CallAPI.Go(v_wls_jdbc_get_jdbc, data, fnWlsJdbcGetJdbcCallBack, "Processing...");
}
var v_list_jdbc;
var v_arr_jdbc_chg_list = [];
function fnWlsJdbcAddJdbcToChgList(clear) {
    
    var sl_jdbc = [];
    sl_jdbc = table.GetValueSelected("wls_mgt_tbl_jdbc");
    if (sl_jdbc.length == 0) {
        goAlert.alertError("Processing Failed", "Datasource must be selected");
        return false;
    }
    if (checkBox.checkStat("wls_mgt_jdbc_secret_key_use_next") == true) {
        $("#wls_mgt_jdbc_secret_key").val(jdbc_secret_key);
    }
    else {
        if (clear === undefined) {
            console.log(1);
            $("#wls_mgt_jdbc_secret_key").val("");
        }
        
    }
    if (checkBox.checkStat("wls_mgt_jdbc_password_use_next") == true) {
        $("#wls_mgt_jdbc_password").val(jdbc_password);
    }
    else {
        if (clear === undefined) {
            console.log(2);
            jdbc_password = "";
            $("#wls_mgt_jdbc_password").val("");
        }
        
    }
    var env_id = $("#wls_mgt_jdbc_env").val();
    var already_stat = "1";
    for (var l = 0; l < sl_jdbc.length; l++) {

        $.each(v_arr_jdbc_chg_list, function (i, item) {
            if (item.env_id !== env_id) {
                already_stat = "-1";
                goAlert.alertError("Processing Failed", "Change List is having different environment");
                return false;
            }

            if (item.name == sl_jdbc[l]) {
                already_stat = "-1";
                goAlert.alertError("Processing Failed", "Datasource " + sl_jdbc[l] + " already existed in Change List");
                return false;
            }
        });
        if (already_stat == "-1") {
            return false;
        }
    }
    var x = document.getElementById("wls_mgt_jdbc_password");
    if (v_jdbc_pwd_verified == "Y") {
        if (checkBox.checkStat("wls_mgt_jdbc_show_password") == true) {
            if (x.type == "password") {
                console.log("type=password");
                x.type = "text";
            }

        }
        
    }
    else {
        x.type = "password";
    }

    modals.OpenStatic("modal_wls_jdbc_conf_cred");

}
var jdbc_secret_key;
var jdbc_password;
function fnWlsJdbcAddJdbcToChgListConfirm() {
    var secret_key = $("#wls_mgt_jdbc_secret_key").val();
    var password = $("#wls_mgt_jdbc_password").val();

    if (secret_key.length < 8) {
        goAlert.alertErroTo("wls_mgt_jdbc_secret_key", "Processing Failed", "Secret Key must not lower than 8 characters");
        return false;
    }

    if (secret_key == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_secret_key", "Processing Failed", "Secret Key must not be empty");
        return false;
    }
    if (password == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_password", "Processing Failed", "Password must not be empty");
        return false;
    }

    if (checkBox.checkStat("wls_mgt_jdbc_secret_key_use_next") == true) {
        jdbc_secret_key = secret_key;
    }
    else {
        jdbc_secret_key = "";
    }
    if (checkBox.checkStat("wls_mgt_jdbc_password_use_next") == true) {
        jdbc_password = password
    }
    else {
        jdbc_password = "";
    }
    var env_id = $("#wls_mgt_jdbc_env").val();
    var env_name = $("#wls_mgt_jdbc_env option:selected").text();
    var sl_jdbc = [];
    sl_jdbc = table.GetValueSelected("wls_mgt_tbl_jdbc");
    for (var l = 0; l < sl_jdbc.length; l++) {
        $.each(v_list_jdbc, function (i, item) {
            if (item.name == sl_jdbc[l]) {
                var tmp_arr = { name: item.name, username:item.username, url: item.url, driver: item.driver, link: item.link, key: secret_key, pwd: password, env_id: env_id, env_name: env_name};
                v_arr_jdbc_chg_list.push(tmp_arr);
                return false;
            }
        });
    }
    
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
    modals.Close("modal_wls_jdbc_conf_cred");

}
function fnWlsJDBCRemoveJDBCFrChgList() {
    var sl_jdbc = [];
    sl_jdbc = table.GetValueSelected("wls_mgt_tbl_jdbc_chg_list");
    if (sl_jdbc.length == 0) {
        goAlert.alertError("Processing Failed", "Datasource must be selected");
        return false;
    }
    for (var l = 0; l < sl_jdbc.length; l++) {
        $.each(v_arr_jdbc_chg_list, function (i, item) {
            if (item.name == sl_jdbc[l]) {
                v_arr_jdbc_chg_list.splice(i, 1);
                return false;
            }
        });
    }
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
function fnWlsJDBCCreateTask() {
    if (v_arr_jdbc_chg_list.length == 0) {
        goAlert.alertError("Processing Failed", "Change List have no data");
        return false;
    }
    modals.OpenStatic('modal_wls_jdbc_create_task');
}
function fnWlsJDBCCreateTaskConfirm() {
    var task_name = $("#wls_mgt_jdbc_create_task_name").val();
    //var expired_date = $("#wls_mgt_jdbc_create_task_expired_date").val();
    var wksch = $("#wls_mgt_jdbc_create_task_wksch").val();
    var grantee = $("#wls_mgt_jdbc_create_task_grantee").val();
    if (task_name == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_create_task_name", "Processing Failed", "Task Name must not be empty");
        return false;
    }
    if (wksch == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_create_task_expired_date", "Processing Failed", "Working Schedule must not be empty");
        return false;
    }
    var fdate = subString.FromDateTimeRange(wksch);
    var tdate = subString.ToDateTimeRange(wksch);
    var list = {
        task_name: task_name,
        from_date: fdate,
        to_date: tdate,
        grantee: grantee,
        data:v_arr_jdbc_chg_list
    }
    modals.Close("modal_wls_jdbc_create_task");
    CallAPI.Go(v_wls_jdbc_create_task, list, fnWlsJDBCCreateTaskCallBack, "Processing...");
}
function fnWlsJDBCTabSwitch(tab) {
    if (tab == "datasource_list") {
        goShowHide.showOnDivAsInline(["wls_btn_fetch_datasource", "wls_btn_add_to_change_list","wls_btn_test_datasource"]);
        goShowHide.hideOnDiv(["wls_btn_fetch_jdbc_chg", "wls_btn_execute_task","wls_div_jdbc_execute_log"]);
        goShowHide.showOnDivAsBlock("wls_div_jdbc_chg_list");
    }
    if (tab == "execute_task") {
        fnWlsJDBCGetTasks();
        goShowHide.showOnDivAsInline(["wls_btn_fetch_jdbc_chg", "wls_btn_execute_task"]);
        goShowHide.hideOnDiv(["wls_btn_fetch_datasource", "wls_btn_add_to_change_list", "wls_div_jdbc_chg_list","wls_btn_test_datasource"]);
        goShowHide.showOnDivAsBlock("wls_div_jdbc_execute_log");
    }
}
var v_jdbc_get_tasks_stat = "1";
var v_jdbc_list_tasks = [];
function fnWlsJDBCGetTasks() {
    if (v_jdbc_get_tasks_stat == "1") {
        CallAPI.Go(v_wls_jdbc_get_task, undefined, fnWlsJDBCGetTasksCallBack, "Processing...");
        v_jdbc_get_tasks_stat = "-1";
    }
}
function fnWlsJDBCGetJDBCChange(proccess) {
    var task_id = $("#wls_mgt_jdbc_sl_task_name").val();
    if (task_id == "" || task_id==undefined) {
        goAlert.alertErroTo("wls_mgt_jdbc_sl_task_name", "Processing Failed", "Task Name must be selected", "change");
        return false;
    }
    var data = { task_id: task_id };
    if (proccess == "Y") {
        CallAPI.Go(v_wls_jdbc_get_jdbc_change, data, fnWlsJDBCGetJDBCChangeCallBack, "Processing...");
    }
    else {
        CallAPI.Go(v_wls_jdbc_get_jdbc_change, data, fnWlsJDBCGetJDBCChangeCallBack);
    }
}
var v_jdbc_change_list_arr=[];
function fnWlsJDBCPreViewPassword(id) {
    modals.Open("modal_wls_jdbc_password_pre_view");
    $.each(v_jdbc_change_list_arr, function (i, item) {
        if (item.id == id) {
            $("#wls_jdbc_password_view_pre_view").html(item.password);
            return false;
        }
    });
}
function fnWlsJDBCGetTicketForChg() {
    var task_id = $("#wls_mgt_jdbc_sl_task_name").val();
    var env_id = "";
    $.each(v_jdbc_list_tasks, function (i, item) {
        if (item.id == task_id) {
            env_id = item.env_id;
            return false;
        }
    });

    var data = {
        environment: env_id,
        condition: "JDBC"
    };
    CallAPI.Go(v_wls_list_tickets, data, fnWlsJDBCGetTikectCallBack, "Processing...");

}
function fnWlsJDBCOpenModalExeTask() {
    var task_id = $("#wls_mgt_jdbc_sl_task_name").val();
    if (task_id == "" || task_id == undefined) {
        goAlert.alertErroTo("wls_mgt_jdbc_sl_task_name", "Processing Failed", "Task Name must be selected", "change");
        return false;
    }
    var ac_ref = $("#wls_mgt_jdbc_sl_ticket").val();
    ac_ref = "";
    //if (ac_ref == "" || ac_ref == undefined) {
    //    goAlert.alertErroTo("wls_mgt_jdbc_sl_ticket", "Processing Failed", "Ticket must be selected", "change");
    //    return false;
    //}
    var sl_jdbc_chg = [];
    sl_jdbc_chg = table.GetValueSelected("wls_mgt_tbl_jdbc_change");
    if (sl_jdbc_chg.length == 0) {
        goAlert.alertError("Processing Failed", "Datasource must be selected");
        return false;
    }

    modals.OpenStatic("modal_wls_jdbc_chg_input_secret_key");
}
function fnWlsJDBCConfirmExeTask() {
    var secret_key = $("#wls_mgt_jdbc_chg_secret_key").val();
    if (secret_key == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_chg_secret_key", "Processing Failed", "Secret Key must be entered", "change");
        return false;
    }
    modals.Close("modal_wls_jdbc_chg_input_secret_key");

    var task_id = $("#wls_mgt_jdbc_sl_task_name").val();
    var ac_ref = $("#wls_mgt_jdbc_sl_ticket").val();
    var sl_jdbc_chg = [];
    sl_jdbc_chg = table.GetValueSelected("wls_mgt_tbl_jdbc_change");
    var arr_jdbc_chg_sl = [];
    for (var l = 0; l < sl_jdbc_chg.length; l++) {
        $.each(v_jdbc_change_list_arr, function (i, item) {
            if (item.id == sl_jdbc_chg[l]) {
                var tmp_arr = { id: item.id, name:item.name, link: item.link, password: item.password, auth_basic: item.auth_basic};
                arr_jdbc_chg_sl.push(tmp_arr);
                return false;
            }
        });
    }
    var arr_jdbc_exe = {
        task_id: task_id,
        ac_ref: ac_ref,
        secret_key: secret_key,
        data: arr_jdbc_chg_sl
    }
    CallAPI.Go(v_wls_jdbc_execute_jdbc_change, arr_jdbc_exe, fnWlsJDBCExeChangeCallBack, "Processing...");
}
function fnWlsJDBCGetTaskExeLog() {
    var env_id = $("#wls_mgt_jdbc_exe_log_sl").val();
    var create_date = $("#wls_mgt_jdbc_task_date_range").val();
    if (env_id == "" || env_id == undefined) {
        goAlert.alertErroTo("wls_mgt_jdbc_exe_log_sl", "Processing Failed", "Environment must be selected", "change");
        return false;
    }
    if (create_date == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_task_date_range", "Processing Failed", "Task Created Date must be select");
        return false;
    }

    var task_created_from_date = subString.FromDateDateRange(create_date);
    var task_created_to_date = subString.ToDateDateRange(create_date);
    var data = {
        env_id: env_id,
        task_created_from_date: task_created_from_date,
        task_created_to_date: task_created_to_date
    }
    CallAPI.Go(v_wls_jdbc_get_task_exe_log, data, fnWlsJDBCGetTaskExeLogCallBack, "Processing...");
}

var v_jdbc_exe_log = [];
function fnWlsJDBCViewExeResponse(id) {

    modals.Open("modal_wls_jdbc_exe_res_pre_view");
    $.each(v_jdbc_exe_log, function (i, item) {
        if (item.id == id) {
            try {
                const res = JSON.parse(item.executed_response);
                const options = { quoteKeys: true };
                $("#wls_jdbc_exe_view_pre_res").html(prettyPrintJson.toHtml(res, options));

            } catch (e) {
                var res = item.response;

                $("#wls_jdbc_exe_view_pre_res").html(res);

            }
            return false;
        }
    });
}
function fnWlsJDBCShowNewPassword() {
    var x = document.getElementById("wls_mgt_jdbc_password");
    if (checkBox.checkStat("wls_mgt_jdbc_show_password") == true) {
        if (jdbc_password == "") {
            x.type = "text";
        }
        else {
            if (v_jdbc_pwd_verified == "Y") {
                x.type = "text";
            }
            else {
                modals.Close("modal_wls_jdbc_conf_cred");
                modals.OpenStatic("modal_wls_jdbc_enter_ad_pwd");
            }
        }
    }
    else {
        x.type = "password";
    }
}
var v_jdbc_pwd_verified = "N";
function fnWlsJDBCVerifyLoginPwd() {
    var pwd = $("#wls_mgt_jdbc_verify_login_pwd").val();
    if (pwd == "") {
        goAlert.alertErroTo("wls_mgt_jdbc_verify_login_pwd", "Processing Failed", "Input Password");
        return false;
    }
    var data = { user_id: STAFF_ID, password: pwd };
    modals.Close("modal_wls_jdbc_enter_ad_pwd");
    CallAPI.Go(v_verify_ad_user, data, fnWlsJDBCVerifyLoginPwdCallBack, "Processing...");
}
function fnWlsJDBCInputPwdChg() {
    if (jdbc_password !== "") {
        jdbc_password = "";
        $("#wls_mgt_jdbc_password").val("");
    }
}

function fnWlsJdbcTest() {
    var sl_jdbc = [];
    sl_jdbc = table.GetValueSelected("wls_mgt_tbl_jdbc");
    if (sl_jdbc.length == 0) {
        goAlert.alertError("Processing Failed", "Datasource must be selected");
        return false;
    }

    var ds_collection = [];
    for (var l = 0; l < sl_jdbc.length; l++) {
        ds_collection.push(sl_jdbc[l]);
    }

    var data = {
        env_url: v_wls_mgt_env_url,
        user_basic: v_wls_mgt_user_basic,
        ds_collection: ds_collection
    };

    CallAPI.Go(v_wls_jdbc_test_ds, data, fnWlsJdbcTestCallBack, "Processing...");
    //modals.OpenStatic("modal_wls_jdbc_conf_cred");

}