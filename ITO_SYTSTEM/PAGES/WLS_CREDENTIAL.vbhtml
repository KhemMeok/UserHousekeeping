<div id="WLS_CREDENTIAL" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
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
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Environment&nbsp;<span style="color:red;">*</span></label>
                                        <select style="width:100%;" class="form-control form-control-sm" id="wls_mgt_cred_env_sl" data-placeholder="Choose Enironment...">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Username&nbsp;<span style="color:red;">*</span></label>
                                        <input type="text" class="form-control form-control-sm" id="wls_mgt_cred_username" placeholder="Username" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Password&nbsp;<span style="color:red;">*</span></label>
                                        <input type="password" class="form-control form-control-sm" id="wls_mgt_cred_password" placeholder="Password" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Confirm Password&nbsp;<span style="color:red;">*</span></label>
                                        <input type="text" class="form-control form-control-sm" id="wls_mgt_cred_con_password" placeholder="Confirm Password" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs"><i class="fas fa-edit"></i>&nbsp;Create</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> History Log</span>
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
                                        <select style="width:100%;" class="form-control form-control-sm" id="wls_mgt_sl_env_get_data" data-placeholder="Choose Enironment...">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 table-responsive">
                            <table id="wls_mgt_tbl_history_log" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ACL Ref</th>
                                        <th>Server Name</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                        <th>Respose</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Execute By</th>
                                        <th noraw></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsMgtGetHistActionLog()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_wls_mgt_open_response" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Response
                </div>
                <div class="modal-body">
                    <pre id="wls_mgt_hist_action_log_pre"></pre>
                </div>
                <div class=" modal-footer">

                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_wls_mgt_open_alert" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header bg-warning">
                    Shutdown Alert
                </div>
                <div class="modal-body text-center">
                    You are about to shutdown all manage servers and the service will be lost.
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnWlsMgtShutDownAlertProceed()"><i class="fas fa-check"></i>&nbsp;Confirm Proceed</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>