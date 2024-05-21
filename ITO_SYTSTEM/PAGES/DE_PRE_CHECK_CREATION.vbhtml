<div id="DE_PRE_CHECK_CREATION" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <div class="btn-group">
                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-wrench"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <a class="dropdown-divider"></a>
                                <a href="javascript:fnPreCheckNewInit()" class="dropdown-item" style="color:black;">New</a>
                            </div>
                        </div>
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Pre-Check SQL script <span style="color:red;">*</span></label>
                                        <textarea id="de_pre_check_sql_script" class="form-control" style="margin: 0px; width: 100%; height: 230px; color:black;font-size:12px;"></textarea>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Pre-Check Query script <span style="color:red;">*</span></label>
                                        <textarea id="de_pre_check_query_script" class="form-control" style="margin: 0px; width: 100%; height: 230px; color:black;font-size:12px;"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Description <span style="color:red;">*</span></label>
                                        <textarea id="de_pre_check_desc" class="form-control" style="margin: 0px; width: 100%; height: 100px; color:black;font-size:12px;"></textarea>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Detail Description <span style="color:red;"></span></label>
                                        <textarea id="de_pre_check_desc_detail" class="form-control" style="margin: 0px; width: 100%; height: 100px; color:black;font-size:12px;"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <div class="icheck-primary d-inline">
                                            <input type="checkbox" id="de_pre_check_backdate_allow" />
                                            <label for="de_pre_check_backdate_allow">Back Date Allow</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="icheck-primary d-inline">
                                            <input type="checkbox" id="de_pre_check_nextwkd_allow" />
                                            <label for="de_pre_check_nextwkd_allow">Nextworking Day Allow</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="de_pre_check_btn_save" class="btn btn-primary btn-xs" type="button" onclick="fnSavePreCheck()"><i class="fa fa-save"></i> Save</button>
                        <button style="display:none;" id="de_pre_check_btn_update" type="button" class="btn btn-primary btn-xs" onclick="fnUpdatePreCheckConfirm(this.value)"><i class="fas fa-edit"></i>&nbsp;Update</button>
                        <button style="display:none;" id="de_pre_check_btn_cancel" type="button" class="btn btn-danger btn-xs" onclick="fnPreCheckNewInit()"><i class="fas fa-times"></i>&nbsp;Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> listing</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 table-responsive">
                            <table width="100%" cellpadding="0" cellspacing="0" id="de_pre_check_tbl"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnPreCheckQuery('Y')"><i class="fa fa-sync"></i> Refresh</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnGetPreCheckForUpdate()"><i class="fas fa-edit"></i> Update</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnGetPreCheckEnableDisableConfirm('Enable')"><i class="fas fa-check"></i> Enable</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnOpenModalCustomise()"><i class="fas fa-wrench"></i> Customise</button>
                        <button class="btn btn-danger btn-xs" type="button" onclick="fnGetPreCheckEnableDisableConfirm('Disable')"><i class="fas fa-times"></i> Disable</button>
                    </div>

                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    <div class="modal fade" id="mdCustoPreCheckCodes">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Customise Pre-Check
                </div>
                <div class="modal-body">
                    <div class="col-sm-12">
                    <div class="card ">
                        <div class="card-header">
                            <span class="card-title"><i class="fas fa-wrench"></i> Operation</span>
                            <div class="card-tools">
                                <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12 alert alert-info alert-dismissible">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Info!</strong> Choose Batch Types to exclude pre-check on selected codes.
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Selected Codes</label>
                                        <input type="text" readonly="readonly" class="form-control form-control-sm" id="de_pre_check_custo_codes" />
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Choose Batch <span style="color:red;">*</span></label>
                                        <select id="de_pre_check_custo_batch_types" multiple="multiple" data-placeholder="Choose Batch Types..." class="form-control form-control-sm" style="width:100%">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Exclude As <span style="color:red;">*</span></label>
                                        <select onchange="fnDePreCheckCustoExclAsChange(this.value)" id="de_pre_check_custo_excl_as" class="form-control form-control-sm" style="width:100%">
                                            <option value="permanent">Permanent</option>
                                            <option value="period">Period</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Expired Date <span style="color:red;">*</span></label>
                                        <input disabled="disabled" type="text" class="form-control form-control-sm" id="de_pre_check_custo_perioddate" />
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Request By <span style="color:red;">*</span></label>
                                        <select id="de_pre_check_custo_requester" data-placeholder="Choose Requester..." class="form-control form-control-sm" style="width:100%">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Reason <span style="color:red;">*</span></label>
                                            <textarea id="de_pre_check_custo_reason" class="form-control" style="margin: 0px; width: 100%; height: 100px; color:black;font-size:12px;"></textarea>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="flex-container">
                                <button type="button" class="btn btn-primary btn-xs" onclick="fnDePreCheckConfirmExclude()"><i class="fas fa-save"></i> Save</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Excluded Listing</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table width="100%" cellpadding="0" cellspacing="0" id="de_pre_check_excluded_tbl"
                                               class="table table-bordered table-hover nowrap"></table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button type="button" class="btn btn-primary btn-xs" onclick="fnDePreCheckConfirmRemoveExcl()"><i class="fas fa-broom text-danger"></i> Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>