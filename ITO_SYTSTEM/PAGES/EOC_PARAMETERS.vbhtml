<div id="EOC_PARAMETERS" class="tab-pane">
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
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>System Enviroment&nbsp;<span style="color:red;">*</span></label>
                                    <select data-placeholder="Choose Enviroment ..." id="eoc_param_debug_Env" class="form-control form-control-sm" onchange="fnGetEnviromentSource(this.value)"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">
                                    <ul class="nav nav-tabs" role="tablist" href="#eoc_param_tab">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="pill" href="#eoc_param_real_debug_tab" onclick="fnFcubParamTabChange('RealDebug')" role="tab">Real debug</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#eoc_user_debug_tab" onclick="fnFcubParamTabChange('UserDebug')" role="tab">User Debug</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="eoc_param_real_debug_tab" role="tabpanel">
                                            <label>Current value: </label>&nbsp;&nbsp;<span style="font-weight: bold; display: none;" id="eoc_param_real_debug" class="text-primary"></span>
                                        </div>
                                        <div class="tab-pane fade" id="eoc_user_debug_tab" role="tabpanel">
                                            <div class="col-sm-12">
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label>User ID&nbsp;<span style="color:red;">*</span></label>
                                                        <input type="text" class="form-control form-control-sm" id="eoc_user_id_debug" />
                                                    </div>
                                                    <div class="tab-pane fade show active" id="eoc_param_real_debug_tab" role="tabpanel">
                                                        <label>Current value: </label>&nbsp;&nbsp;<span style="font-weight: bold; display: none;" id="eoc_param_user_debug" class="text-primary"></span>
                                                    </div>
                                                </div>
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
                        <button style="display:none" id="eoc_param_btn_enable_real_debug" class="btn btn-primary btn-xs" type="button" value="Y" onclick="fnConfirmFcubUpdateRealDebug(this.value)"><i class="fas fa-check"></i> Enable</button>
                        <button style="display:none" id="eoc_param_btn_disable_real_debug" class="btn btn-danger btn-xs" type="button" value="N" onclick="fnConfirmFcubUpdateRealDebug(this.value)"><i class="fas fa-ban"></i> Disable</button>
                        <button style="display:none" id="eoc_param_btn_enable_user_debug" class="btn btn-primary btn-xs" type="button" value="Y" onclick="fnConfirmFcubUpdateUserDebug(this.value)"><i class="fas fa-check"></i> Enable</button>
                        <button style="display:none" id="eoc_param_btn_disable_user_debug" class="btn btn-danger btn-xs" type="button" value="N" onclick="fnConfirmFcubUpdateUserDebug(this.value)"><i class="fas fa-ban"></i> Disable</button>
                        <button style="display:none" id="eoc_param_btn_refresh" type="button" class="btn btn-primary btn-xs" onclick="fnResfreshRealDebugStat()"><i class="fas fa-sync"></i> Refresh</button>
                        <button style="display:none" id="eoc_param_btn_check" type="button" class="btn btn-primary btn-xs" onclick="fnCheckUserDebugStat()"><i class="fas fa-check"></i> Check</button>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-12">
        <div class="card ">
            <div class="card-header">
                <span class="card-title"><i class="fa fa-list-alt"></i> Reports Logs</span>
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
                                    <label>Report Date&nbsp;<span style="color:red;">*</span></label>
                                    <input type="text" id="eoc_param_log_date_in" class="form-control form-control-sm" />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card card-primary card-outline card-outline-tabs">
                            <div class="card-body">                          
                                 <div class="row">
                                     <div class="col-sm-12 table-responsive">
                                         <table cellpadding="0" cellspacing="0" id="eoc_param_log_tbl"
                                                class="display table table-bordered table-hover nowrap" style="width:100%">
                                             <thead>
                                                 <tr>
                                                     <th>LOG_ID</th>
                                                     <th>ENVIROMENT</th>
                                                     <th>TIME_STAMP</th>
                                                     <th>DEBUG_STATUS</th>
                                                     <th>DEBUG_PARAM</th>
                                                     @*<th>COMPLETED</th>*@
                                                     <th>USER_ID</th>
                                                     <th>COMPLETED_BY</th>
                                                     <th></th>
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
     </div>
         <div class="card-footer">
             <div class="flex-container">
                 <button id="eoc_param_listing_btn_refresh" type="button" class="btn btn-primary btn-xs" onclick="fnRefreshEoCParamlog()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
             </div>
         </div>
@* Modal *@
    <div class="modal" id="eoc_param_real_debug_confirm" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <span id="eoc_param_confirm_md_title_real_debug"></span>
                </div>
                <!-- Modal body -->
                <div class="modal-body" style="border: 0px;">
                    <div class="row">
                        <div class="col-sm-12 text-center"><span style="color:red;">This is critical! </span> Are you sure to <span id="sp_eoc_param_read_debug"></span> real debug?</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="flex-container">
                        <button type="button" id="eoc_param_btn_confirm_update_real_debug" class="btn btn-primary btn-xs" onclick="fnFcubUpdateRealDebug(this.value)"><i class="fas fa-check"></i> Yes</button>
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal"><i class="fas fa-times"></i> No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="eoc_param_user_debug_confirm" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <span id="eoc_param_confirm_md_title_user_debug"></span>
                </div>
                <!-- Modal body -->
                <div class="modal-body" style="border: 0px;">
                    <div class="row">
                        <div class="col-sm-12 text-center"><span style="color:red;">This is critical! </span> Are you sure to <span id="sp_eoc_param_user_debug"></span> this user debug?</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="flex-container">
                        <button type="button" id="eoc_param_btn_confirm_update_user_debug" class="btn btn-primary btn-xs" onclick="fnFcubUpdateUserDebug(this.value)"><i class="fas fa-check"></i> Yes</button>
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal"><i class="fas fa-times"></i> No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
