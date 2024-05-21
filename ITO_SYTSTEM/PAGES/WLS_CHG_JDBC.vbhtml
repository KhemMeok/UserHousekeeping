<div id="WLS_CHG_JDBC" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="pill" href="#eoc_param_real_debug_tab" onclick="fnWlsJDBCTabSwitch('datasource_list')" role="tab">Datasource List</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#eoc_user_debug_tab" onclick="fnWlsJDBCTabSwitch('execute_task')" role="tab">Execute Task</a>
                                        </li>

                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="eoc_param_real_debug_tab" role="tabpanel">
                                            <div class="col-sm-12">
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Environment&nbsp;<span style="color:red;">*</span></label>
                                                            <select style="width:100%;" class="form-control form-control-sm" id="wls_mgt_jdbc_env" data-placeholder="Choose Enironment...">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 table-responsive">

                                                <table id="wls_mgt_tbl_jdbc" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%;">
                                                    <thead>
                                                        <tr>
                                                            <th><input type="checkbox" style="margin-top:0px;margin-left:50%;" id="wls_mgt_tbl_jdbc_ck_selectall"></th>
                                                            <th>Name</th>
                                                            <th>Username</th>
                                                            <th>Url</th>
                                                            <th>Driver</th>
                                                            <th noraw></th>
                                                        </tr>
                                                    </thead>
                                                </table>

                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="eoc_user_debug_tab" role="tabpanel">
                                            <div class="col-sm-12">
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Choose Task Name&nbsp;<span style="color:red;">*</span></label>
                                                            <select style="width:100%;" class="form-control form-control-sm" id="wls_mgt_jdbc_sl_task_name" onchange="fnWlsJDBCGetTicketForChg()" data-placeholder="Choose Task...">
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Ticket&nbsp;<span style="color:red;">*</span></label>
                                                            <select style="width:100%;" class="form-control form-control-sm" id="wls_mgt_jdbc_sl_ticket" data-placeholder="Choose Tickets...">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 table-responsive">

                                                <table id="wls_mgt_tbl_jdbc_change" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%;">
                                                    <thead>
                                                        <tr>
                                                            <th><input type="checkbox" style="margin-top:0px;margin-left:50%;" id="wls_mgt_tbl_jdbc_change_ck_selectall"></th>
                                                            <th>Name</th>
                                                            <th>Username</th>
                                                            <th>Url</th>
                                                            <th>Driver</th>
                                                            @*<th>New Password</th>*@
                                                            <th>Environment</th>
                                                            <th noraw></th>
                                                        </tr>
                                                    </thead>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="wls_btn_fetch_datasource" type="button" class="btn btn-primary btn-xs" onclick="fnWlsJdbcGetJdbc()"><i class="fas fa-arrow-down"></i>&nbsp;Fetch Datasource</button>
                        <button id="wls_btn_add_to_change_list" type="button" class="btn btn-primary btn-xs" onclick="fnWlsJdbcAddJdbcToChgList()"><i class="fas fa-plus"></i>&nbsp;Add To Change List</button>
                        <button id="wls_btn_test_datasource" type="button" class="btn btn-success btn-xs" onclick="fnWlsJdbcTest()"><i class="fas fa-random"></i>&nbsp;Test</button>
                        <button style="display:none;" id="wls_btn_fetch_jdbc_chg" type="button" class="btn btn-primary btn-xs" onclick="fnWlsJDBCGetJDBCChange('Y')"><i class="fas fa-arrow-down"></i>&nbsp;Fetch Datasource</button>
                        <button style="display:none;" id="wls_btn_execute_task" type="button" class="btn btn-primary btn-xs" onclick="fnWlsJDBCOpenModalExeTask()"><i class="fas fa-cogs"></i>&nbsp;Execute Task</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12" id="wls_div_jdbc_chg_list">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Change List</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 table-responsive">
                            <table id="wls_mgt_tbl_jdbc_chg_list" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%;">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" style="margin-top:0px;margin-left:50%;" id="wls_mgt_tbl_jdbc_chg_list_ck_selectall"></th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Url</th>
                                        <th>Driver</th>
                                        @*<th>Secret Key</th>
        <th>New Password</th>*@
                                        <th>Environment</th>
                                        <th noraw></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </div>
                    <div class="col-sm-12" style="margin-top:10px;">
                        <div class="alert alert-info alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Info!</strong> Create Task button will insert all rows in Change List table to database
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsJDBCCreateTask()"><i class="fas fa-tasks"></i>&nbsp;Create Task</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="fnWlsJDBCRemoveJDBCFrChgList()"><i class="fas fa-trash-alt"></i>&nbsp;Remove</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12" id="wls_div_jdbc_execute_log" style="display:none;">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Task Executed Log</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Environment&nbsp;<span style="color:red;">*</span></label>
                                        <select style="width:100%;" class="form-control form-control-sm" id="wls_mgt_jdbc_exe_log_sl" data-placeholder="Choose Enironment...">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Task Created Date&nbsp;<span style="color:red;">*</span></label>
                                        <input class="form-control form-control-sm" id="wls_mgt_jdbc_task_date_range" placeholder="DD-MON-YYYY - DD-MON-YYYY" />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12 table-responsive">
                            <table id="wls_mgt_tbl_jdbc_task_log" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%;">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Task Name</th>
                                        <th>DS Name</th>
                                        <th>Executed Status</th>
                                        <th>Executed Response</th>
                                        <th>Executed By</th>
                                        <th>Executed Date</th>
                                        <th>Task Owner</th>
                                        <th>Grantee</th>
                                        <th>Task Expired Date</th>
                                        <th>Ticket No</th>
                                        <th noraw></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </div>

                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsJDBCGetTaskExeLog()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="modal" id="modal_wls_jdbc_conf_cred" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Define Credential
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Secret Key&nbsp;<span style="color:red;">*</span></label>
                                        <input type="password" class="form-control form-control-sm" id="wls_mgt_jdbc_secret_key" />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group" style="padding-top:30px;">
                                        <div class="icheck-primary d-inline">
                                            <input type="checkbox" class="form-control form-control-sm" id="wls_mgt_jdbc_secret_key_use_next" />
                                            <label for="wls_mgt_jdbc_secret_key_use_next">Use for next datasource</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>New Password&nbsp;<span style="color:red;">*</span></label>
                                        <input type="password" class="form-control form-control-sm" id="wls_mgt_jdbc_password" onkeyup="fnWlsJDBCInputPwdChg()" />
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group" style="padding-top:30px;">
                                        <div class="icheck-primary d-inline">
                                            <input type="checkbox" class="form-control form-control-sm" id="wls_mgt_jdbc_password_use_next" />
                                            <label for="wls_mgt_jdbc_password_use_next">Use for next datasource</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="icheck-primary d-inline">
                                            <input type="checkbox" class="form-control form-control-sm" id="wls_mgt_jdbc_show_password" onclick="fnWlsJDBCShowNewPassword()" />
                                            <label for="wls_mgt_jdbc_show_password">Show Password</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsJdbcAddJdbcToChgListConfirm()"><i class="fas fa-check"></i>&nbsp;Confirm Add</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_wls_jdbc_create_task" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Create Task
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Task Name&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" class="form-control form-control-sm" id="wls_mgt_jdbc_create_task_name" />
                            </div>
                        </div>
                        
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Working Schedule&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" class="form-control form-control-sm" id="wls_mgt_jdbc_create_task_wksch" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Grant To</label>
                                <input type="text" class="form-control form-control-sm" id="wls_mgt_jdbc_create_task_grantee" placeholder="Staff ID" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsJDBCCreateTaskConfirm()"><i class="fas fa-check"></i>&nbsp;Confirm Create</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_wls_jdbc_password_pre_view" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Encryption Password
                </div>
                <div class="modal-body">
                    <pre id="wls_jdbc_password_view_pre_view"></pre>
                </div>
                <div class=" modal-footer">

                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modal_wls_jdbc_exe_res_pre_view" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Response
                </div>
                <div class="modal-body">
                    <pre id="wls_jdbc_exe_view_pre_res"></pre>
                </div>
                <div class=" modal-footer">

                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" id="modal_wls_jdbc_chg_input_secret_key" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Enter Secret Key
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Secret Key&nbsp;<span style="color:red;">*</span></label>
                                <input type="password" class="form-control form-control-sm" id="wls_mgt_jdbc_chg_secret_key" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsJDBCConfirmExeTask()"><i class="fas fa-check"></i>&nbsp;Confirm Execute</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_wls_jdbc_enter_ad_pwd" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Verify Login Password
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Login Password&nbsp;<span style="color:red;">*</span></label>
                                <input type="password" class="form-control form-control-sm" id="wls_mgt_jdbc_verify_login_pwd" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsJDBCVerifyLoginPwd()"><i class="fas fa-check"></i>&nbsp;Verify</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_wls_jdbc_test_result" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Data source testing result
                </div>
                <div class="modal-body">
                    <table id="wls_mgt_jdbc_tbl_ds_test" cellpadding="0" cellspacing="0" class="display compact table table-bordered table-hover table-sm" style="width:100%;">
                        <thead>
                            <tr>
                                <th>Sequence No</th>
                                <th>Name</th>
                                <th>Test</th>
                                <th>Message</th>
                                <th noraw></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>