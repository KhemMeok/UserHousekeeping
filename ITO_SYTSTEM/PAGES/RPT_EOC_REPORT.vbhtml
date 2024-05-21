<div id="RPT_EOC_REPORT" class="tab-pane">
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
                            <div class="row">
                                <div class="col-sm-3">
                                    <label>Report Type:&nbsp;<span style="color:green;" id="rpt_eoc_tye_name"></span></label>
                                </div>
                                <div class="col-sm-3">
                                    <label>Report Date:&nbsp;<span style="color:green;" id="rpt_eoc_report_date"></span></label>
                                </div>
                                <div class="col-sm-3">
                                    <label>Completed Percentage:&nbsp;<span style="color:green;" id="rpt_eoc_report_comp_pct"></span></label>
                                </div>
                                <div class="col-sm-3">
                                    <label>Total Pulled GL Balance:&nbsp;<span style="color:green;" id="rpt_eoc_report_total_br_pulled_gl" >0</span></label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="pill" href="#eoc_duration_tab" onclick="fnrpteoctabchange('eoc_duration')" role="tab">EoC Duration</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_eoc_pending_tab" onclick="fnrpteoctabchange('eoc_pending')" role="tab">Pending Transaction</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_eoc_resources_tab" onclick="fnrpteoctabchange('eoc_resources')" role="tab">Resources Utilization</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_eoc_storages_tab" onclick="fnrpteoctabchange('eoc_storage')" role="tab">Storages Utilization</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_eoc_failure_tab" onclick="fnrpteoctabchange('eoc_failure')" role="tab">EoC Failure</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="eoc_duration_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Steps&nbsp;<span style="color:red;">*</span></label>
                                                            <div class="input-group">
                                                                <select style="width:80%;" data-placeholder="Choose Step..." class="form-control form-control-sm" id="eoc_duration_step_sl" onchange="fnRptEoCFillNatureStep(this.value)">
                                                                </select>
                                                                <div class="input-group-append">
                                                                    <button class="btn btn-primary btn-xs" type="button" onclick="fnRefreshEoCSteps()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Start Time&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="text" id="eoc_duration_start_time_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Ent Time&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="text" id="eoc_duration_end_time_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Nature</label>
                                                            <input type="text" id="eoc_duration_nature_in" class="form-control form-control-sm" readonly />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_eoc_pending_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Issue Category&nbsp;<span style="color:red;">*</span></label>
                                                            <select style="width:100%;" data-placeholder="Choose Issue Category..." class="form-control form-control-sm" id="rpt_eoc_pending_issue_sl">
                                                                <option value=""></option>
                                                                <option value="Pending Transaction">Pending Transaction</option>
                                                                <option value="Not Run EoDM">Not Run EoDM</option>
                                                                <option value="Late EoDM">Late EoDM</option>
                                                                <option value="Failed EoDM">Failed EoDM</option>
                                                                <option value="Electricity Issue">Electricity Issue</option>
                                                                <option value="Network Issue">Network Issue</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Choose Branch&nbsp;<span style="color:red;">*</span></label>
                                                            <select style="width:100%;" data-placeholder="Choose Branch..." class="form-control form-control-sm" id="rpt_eoc_pending_br_sl">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Maker ID&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="text" id="rpt_eoc_pending_makerid_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Pending Module&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="text" id="rpt_eoc_pending_module_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Function ID&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="text" id="rpt_eoc_pending_functionid_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Resolved Type&nbsp;<span style="color:red;">*</span></label>
                                                            <select id="rpt_eoc_pending_resolved_type_sl" data-placeholder="Choose Resolved Type..." style="width:100%" class="form-control form-control-sm">
                                                                <option value=""></option>
                                                                <option value="Authorize">Authorize</option>
                                                                <option value="Delete">Delete</option>
                                                                <option value="Close">Close</option>
                                                                <option value="Run EoDM">Run EoDM</option>
																<option value="Contact Branch">Contact Branch</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label>Resolve Detail</label>
                                                            <textarea style="height:1000px;" id="rpt_eoc_pending_resolve_detail_in"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_eoc_resources_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Choose Resource&nbsp;<span style="color:red;">*</span></label>
                                                            <div class="input-group">
                                                                <select style="width:80%;" data-placeholder="Choose Resource..." class="form-control form-control-sm" id="rpt_eoc_resources_sl">
                                                                </select>
                                                                <div class="input-group-append">
                                                                    <button class="btn btn-primary btn-xs" type="button" onclick="fnRefreshResource()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Min Memory Used (%)&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="number" id="rpt_eoc_resource_min_mem_used_in" class="form-control form-control-sm" />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Max Memory Used (%)&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="number" id="rpt_eoc_resource_max_mem_used_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Min CPU Used (%)&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="number" id="rpt_eoc_resource_min_cpu_used_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Max CPU Used (%)&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="number" id="rpt_eoc_resource_max_cpu_used_in" class="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_eoc_storages_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Choose Resource&nbsp;<span style="color:red;">*</span></label>
                                                            <div class="input-group">
                                                                <select style="width:80%;" data-placeholder="Choose Storage..." class="form-control form-control-sm" id="rpt_eoc_storage_sl">
                                                                </select>
                                                                <div class="input-group-append">
                                                                    <button class="btn btn-primary btn-xs" type="button" onclick="fnRefreshStorageList()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Total Size&nbsp;<span style="color:red;">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <select class="form-control form-control-sm" id="rpt_eoc_storage_total_size_mesu_sl">
                                                                        <option value="TB">TB</option>
                                                                        <option value="GB">GB</option>
                                                                        <option value="MB" selected>MB</option>
                                                                        <option value="KB">KB</option>
                                                                        <option value="B">B</option>
                                                                    </select>
                                                                </div>
                                                                <input type="number" class="form-control form-control-sm" id="rpt_eoc_storage_total_size_in" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Used Size&nbsp;<span style="color:red;">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <select class="form-control form-control-sm" id="rpt_eoc_storage_used_size_mesu_sl">
                                                                        <option value="TB">TB</option>
                                                                        <option value="GB">GB</option>
                                                                        <option value="MB" selected>MB</option>
                                                                        <option value="KB">KB</option>
                                                                        <option value="B">B</option>
                                                                    </select>
                                                                </div>
                                                                <input type="number" class="form-control form-control-sm" id="rpt_eoc_storage_used_size_in" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_eoc_failure_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Choose Resource&nbsp;<span style="color:red;">*</span></label>
                                                            <div class="input-group">
                                                                <select style="width:80%;" data-placeholder="Choose Branch..." class="form-control form-control-sm" id="rpt_eoc_faiure_branch_sl">
                                                                </select>
                                                                <div class="input-group-append">
                                                                    <button class="btn btn-primary btn-xs" type="button" onclick="fnRefreshBranchFailure()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>EoC Reference Number&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="text" class="form-control form-control-sm" id="rpt_eoc_failure_reference_in" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>SR Number&nbsp;<span style="color:red;">*</span></label>
                                                            <input type="text" class="form-control form-control-sm" id="rpt_eoc_failure_sr_no_in" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Root Cause Summary&nbsp;<span style="color:red;">*</span></label>
                                                            <textarea class="form-control form-control-sm" style="height:100px;" id="rpt_eoc_failure_root_cause_summary_in"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Resolved Status&nbsp;<span style="color:red;">*</span></label>
                                                            <select style="width:100%;"  class="form-control form-control-sm" id="rpt_eoc_failure_resolved_stat_sl">

                                                                <option value="Y">Yes</option>
                                                                <option value="N">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label>Resolve Detail&nbsp;<span style="color:red;">*</span></label>
                                                            <textarea style="height:1000px;" id="rpt_eoc_failure_resolve_detail_in"></textarea>
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
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="rpt_eoc_btn_save" class="btn btn-primary btn-xs" type="button" onclick="fnrpteocduractionsave()"><i class="fas fa-save"></i> Save</button>
                        <button id="rpt_eoc_btn_new" class="btn btn-warning btn-xs" type="button" onclick="fnrpteocduractionclear()"><i class="fas fa-broom"></i> Clear</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Reports Listing</span>
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
                                        <input type="text" id="rpt_eoc_duration_rpt_date_in" class="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group" style="padding-top:30px;">
                                        <div class="icheck-primary d-inline">
                                            <input type="checkbox" class="form-control form-control-sm" id="rpt_eoc_refresh_all_check" />
                                            <label for="rpt_eoc_refresh_all_check">Refresh All Reports</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-sm-12">
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">

                                    <ul class="nav nav-tabs" role="tablist">

                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="pill" href="#rpt_list_eoc_duration_tab" onclick="fnrpteocreportlisttabchange('eoc_duration')" role="tab">EoC Duration Report</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_list_eoc_pending_tab" onclick="fnrpteocreportlisttabchange('eoc_pending')" role="tab">Pending Report</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_list_eoc_resource_tab" onclick="fnrpteocreportlisttabchange('eoc_resources')" role="tab">Resources Utilization Report</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_list_eoc_storage_tab" onclick="fnrpteocreportlisttabchange('eoc_storage')" role="tab">Storages Utilization Report</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_list_eoc_failure_tab" onclick="fnrpteocreportlisttabchange('eoc_failure')" role="tab">EoC Failure Report</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_list_eoc_restorepoint_tab" onclick="fnrpteocreportlisttabchange('eoc_restorepoint')" role="tab">EoC Restore Point Report</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="rpt_list_eoc_duration_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table cellpadding="0" cellspacing="0" id="rpt_eoc_duration_tbl"
                                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_list_eoc_pending_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table cellpadding="0" cellspacing="0" id="rpt_eoc_pending_tbl"
                                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_list_eoc_resource_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table cellpadding="0" cellspacing="0" id="rpt_eoc_resource_tbl"
                                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_list_eoc_storage_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table cellpadding="0" cellspacing="0" id="rpt_eoc_storage_tbl"
                                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_list_eoc_failure_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table cellpadding="0" cellspacing="0" id="rpt_eoc_failure_tbl"
                                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_list_eoc_restorepoint_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table cellpadding="0" cellspacing="0" id="rpt_eoc_restorepoint_tbl"
                                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
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
                        <button id="rpt_eoc_listing_btn_refresh" type="button" class="btn btn-primary btn-xs" onclick="fnRefreshEoDDataDuration('Y')"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                        <button id="rpt_eoc_listing_btn_update" type="button" class="btn btn-primary btn-xs" onclick="fnOpenModelUpdateEoCDuration()"><i class="fas fa-edit"></i>&nbsp;Update</button>
                        <button id="rpt_eoc_listing_btn_delete" type="button" class="btn btn-danger btn-xs" onclick="fnConfirmDeleteRptEoCStepDuration()"><i class="fas fa-trash-alt"></i>&nbsp;Delete</button>
                        @*<button type="button" class="btn btn-primary btn-xs" onclick="UmtGetAllUserList('Y')"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                            <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnGetUserDataForUpdate()"><i class="fas fa-user-edit"></i>&nbsp;Update</button>
                            <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('activate')"><i class="fas fa-user-check"></i>&nbsp;Activate</button>
                            <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('deactivate')"><i class="fas fa-user-times"></i>&nbsp;Deactivate</button>
                            <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('enable_debug')"><i class="fas fa-align-left"></i>&nbsp;Enable Debug</button>
                            <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('disable_debug')"><i class="fas fa-align-left"></i>&nbsp;Disable Debug</button>
                            <button type="button" class="btn btn-danger btn-xs" onclick="modals.Open('modalResetPwd');element.inputValue('umt_uc_reset_pwd', '');"><i class="fas fa-key"></i>&nbsp;Reset Password</button>
                            <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('unlock')"><i class="fas fa-unlock-alt"></i>&nbsp;Unlock</button>
                            <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('enable_mail_setup')"><i class="fas fa-mail-bulk"></i>&nbsp;Enable Email Setup</button>
                            <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('disable_mail_setup')"><i class="fas fa-mail-bulk"></i>&nbsp;Disable Email Setup</button>
                            <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('delete')"><i class="fas fa-trash-alt"></i>&nbsp;Delete</button>
                            <button type="button" class="btn btn-primary btn-xs" onclick="umtOpenModalSendSMS()"><i class="fas fa-envelope"></i> Set Message</button>*@
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    @*Modal Section*@
    <div class="modal" id="rpt_eoc_durction_update_md">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Update EoC Step Duration
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Report ID</label>
                        <input id="rpt_eoc_duration_rpt_id_update" type="text" class="form-control form-control-sm" readonly />
                    </div>
                    <div class="form-group">
                        <label>Start Time&nbsp;<span style="color:red;">*</span></label>
                        <input id="rpt_eoc_duration_start_time_update_in" type="text" class="form-control form-control-sm" />
                    </div>
                    <div class="form-group">
                        <label>End Time&nbsp;<span style="color:red;">*</span></label>
                        <input id="rpt_eoc_duration_end_time_update_in" type="text" class="form-control form-control-sm" />
                    </div>
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnConfirmUpdateRptEoCStepDuration()">
                            <i class="fas fa-save"></i>&nbsp;Save Update
                        </button>
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="rpt_eoc_pending_update_md">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Update Pending Report
                </div>
                <div class="modal-body">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Report ID</label>
                                <input type="text" id="rpt_eoc_pending_report_id_up_in" readonly class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Issue Category&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" data-placeholder="Choose Issue Category..." class="form-control form-control-sm" id="rpt_eoc_pending_issue_up_sl">
                                    <option value=""></option>
                                    <option value="Pending Transaction">Pending Transaction</option>
                                    <option value="Not Run EoDM">Not Run EoDM</option>
                                    <option value="Late EoDM">Late EoDM</option>
                                    <option value="Failed EoDM">Failed EoDM</option>
                                    <option value="Electricity Issue">Electricity Issue</option>
                                    <option value="Network Issue">Network Issue</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Choose Branch&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" data-placeholder="Choose Branch..." class="form-control form-control-sm" id="rpt_eoc_pending_up_br_sl">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Maker ID&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" id="rpt_eoc_pending_makerid_up_in" class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Pending Module&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" id="rpt_eoc_pending_module_up_in" class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Function ID&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" id="rpt_eoc_pending_functionid_up_in" class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Resolved Type&nbsp;<span style="color:red;">*</span></label>
                                <select id="rpt_eoc_pending_resolved_type_up_sl" data-placeholder="Choose Resolved Type..." style="width:100%" class="form-control form-control-sm">
                                    <option value=""></option>
                                    <option value="Authorize">Authorize</option>
                                    <option value="Delete">Delete</option>
                                    <option value="Close">Close</option>
                                    <option value="Run EoDM">Run EoDM</option>
									<option value="Contact Branch">Contact Branch</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Resolved Detail</label>
                            <textarea style="height:1000px;" id="rpt_eoc_pending_resolve_detail_up_in"></textarea>

                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnConfirmUpdateRptEoCPending()">
                            <i class="fas fa-save"></i>&nbsp;Save Update
                        </button>
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="rpt_eoc_resource_update_md">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Update Resource Report
                </div>
                <div class="modal-body">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Report ID</label>
                                <input type="text" id="rpt_eoc_resource_report_id_up_in" readonly class="form-control form-control-sm" />

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Min Memory Used (%)&nbsp;<span style="color:red;">*</span></label>
                                <input type="number" id="rpt_eoc_resource_min_mem_used_up_in" class="form-control form-control-sm" />

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Max Memory Used (%)&nbsp;<span style="color:red;">*</span></label>
                                <input type="number" id="rpt_eoc_resource_max_mem_used_up_in" class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Min CPU Used (%)&nbsp;<span style="color:red;">*</span></label>
                                <input type="number" id="rpt_eoc_resource_min_cpu_used_up_in" class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Max CPU Used (%)&nbsp;<span style="color:red;">*</span></label>
                                <input type="number" id="rpt_eoc_resource_max_cpu_used_up_in" class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnConfirmUpdateRptEoCResource()">
                            <i class="fas fa-save"></i>&nbsp;Save Update
                        </button>
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="rpt_eoc_storage_update_md">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Update Storage Report
                </div>
                <div class="modal-body">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Report ID</label>
                                <input type="text" id="rpt_eoc_storage_report_id_up_in" readonly class="form-control form-control-sm" />

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Total Size&nbsp;<span style="color:red;">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <select class="form-control form-control-sm" id="rpt_eoc_storage_total_size_mesu_up_sl">
                                            <option value="TB">TB</option>
                                            <option value="GB">GB</option>
                                            <option value="MB" selected>MB</option>
                                            <option value="KB">KB</option>
                                            <option value="B">B</option>
                                        </select>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="rpt_eoc_storage_total_size_up_in" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Used Size&nbsp;<span style="color:red;">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <select class="form-control form-control-sm" id="rpt_eoc_storage_used_size_mesu_up_sl">
                                            <option value="TB">TB</option>
                                            <option value="GB">GB</option>
                                            <option value="MB" selected>MB</option>
                                            <option value="KB">KB</option>
                                            <option value="B">B</option>
                                        </select>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="rpt_eoc_storage_used_size_up_in" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnConfirmUpdateRptEoCStorage()">
                            <i class="fas fa-save"></i>&nbsp;Save Update
                        </button>
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="rpt_eoc_failure_update_md">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    EoC Failure Update Report
                </div>
                <div class="modal-body">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Report ID</label>
                                <input type="text" id="rpt_eoc_failure_report_id_up_in" readonly class="form-control form-control-sm" />

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>SR Number&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" class="form-control form-control-sm" id="rpt_eoc_failure_sr_no_up_in" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Root Cause Summary&nbsp;<span style="color:red;">*</span></label>
                                <textarea class="form-control form-control-sm" style="height:100px;" id="rpt_eoc_failure_root_cause_summary_up_in"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Resolved Status&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" class="form-control form-control-sm" id="rpt_eoc_failure_resolved_stat_up_sl">
                                   
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Resolve Detail&nbsp;<span style="color:red;">*</span></label>
                                <textarea style="height:1000px;" id="rpt_eoc_failure_resolve_detail_up_in"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnConfirmUpdateEoCFailure()">
                            <i class="fas fa-save"></i>&nbsp;Save Update
                        </button>
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

