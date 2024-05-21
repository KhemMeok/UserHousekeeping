<div id="RPT_USER_MANAGEMENT" class="tab-pane">
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
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> User Info</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Staff ID&nbsp;<span style="color:red;">*</span></label>
                                            <div class="input-group">
                                                <input type="text" id="rpt_usr_mgr_staff_id" class="form-control form-control-sm" placeholder="Enter Staff ID" onkeydown="rpt_usr_mgr_FnSearchEnter(event)" />
                                                <div class="input-group-append">
                                                    <button class="btn btn-primary btn-xs" type="button" onclick="rpt_usr_mgr_SearchUser()"><i class="fas fa-search"></i>&nbsp;Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Rquester&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <input type="text" id="rpt_usr_mgr_requester" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Position&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <input type="text" id="rpt_usr_mgr_position" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>DEPT/BRN&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <input type="text" id="rpt_usr_mgr_deptbrn" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Branch Code&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <input type="text" id="rpt_usr_mgr_brn" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Role Detail</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>System Type&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <select style="width:100%;" data-placeholder="Choose System Type..." id="rpt_usr_mgr_systype" class="form-control form-control-sm" onchange="rpt_usr_mgr_fnslsystype(this.value)"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>System User&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <input type="text" id="rpt_usr_mgr_systemuser" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Host Name&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <select style="width:100%;" data-placeholder="Choose Host Name..." id="rpt_usr_mgr_hostname" class="form-control form-control-sm" onchange="rpt_usr_mgr_fnslhostname(this.value)"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Service Request&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <select style="width:100%;" data-placeholder="Choose Service Request..." id="rpt_usr_mgr_servicerequest" class="form-control form-control-sm" onchange="rpt_usr_mgr_fnslservicerequest(this.value)"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Status&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <select style="width:100%;" data-placeholder="Choose Status..." id="rpt_usr_mgr_status" class="form-control form-control-sm"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Request Date&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <input type="text" id="rpt_usr_mgr_reqdate" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Roles&nbsp;<span style="color:red;">*</span></label>
                                            <select size="15" data-placeholder="Choose Roles..." id="rpt_usr_mgr_roles" multiple class="form-control form-control-sm" style="width:100%">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Remark&nbsp;<span style="color:red;">*</span></label>
                                            <div class="form-group">
                                                <textarea id="rpt_usr_mgr_remark" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button id="rpt_usr_mgr_submit" type="button" class="btn btn-primary btn-xs" onclick="rpt_usr_mgr_fnsubmit()"><i class="fas fa-edit"></i>&nbsp;Submit</button>
                                    <button id="rpt_usr_mgr_clear" class="btn btn-warning btn-xs" type="button" onclick="rpt_usr_mgr_fnclear()"><i class="fas fa-broom"></i> Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Users Listing</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive" id="rpt_usr_mgr_DIV_TBL_APP_CONTROL">
                                        <table cellpadding="0" cellspacing="0" id="rpt_usr_mgr_listing_tbl"
                                               class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button type="button" class="btn btn-primary btn-xs" onclick="rpt_usr_mgr_fnGetAllUserList('Y')"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                                    <button type="button" class="btn btn-primary btn-xs" onclick="rpt_usr_mgr_fnGetDataForUpdate()"><i class="fas fa-user-edit"></i>&nbsp;Update</button>
                                    <button type="button" class="btn btn-danger btn-xs" onclick="rpt_usr_mgr_Fndelete('delete')"><i class="fas fa-trash-alt"></i>&nbsp;Delete</button>
                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
