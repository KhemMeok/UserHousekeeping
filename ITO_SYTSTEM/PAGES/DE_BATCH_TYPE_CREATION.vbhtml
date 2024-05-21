<div id="DE_BATCH_TYPE_CREATION" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <div class="btn-group">
                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-wrench"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <a class="dropdown-divider"></a>
                                <a href="javascript:BtcNewInit()" class="dropdown-item" style="color:black;">New</a>
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
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Batch Type Name&nbsp;<span style="color:red">*</span></label>
                                        <input type="text" id="de_btc_bt_name" class="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Group Label&nbsp;<span style="color:red">*</span></label>
                                        <input maxlength="1" type="text" id="de_btc_group_label" class="form-control form-control-sm" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Batch Number Currency Khmer Riel Label&nbsp;<span style="color:red;">*</span></label>
                                        <div class="input-group">
                                            <div class="input-prepend">
                                                <span>
                                                    <img src="~/Images/icons/riel.png" class="responsive" style="height:29px;" />
                                                </span>
                                            </div>
                                            <input id="de_btn_riel_label" maxlength="1" type="text" class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Batch Number Currency Dollar Label&nbsp;<span style="color:red;">*</span></label>
                                        <div class="input-group">
                                            <div class="input-prepend">
                                                <span>
                                                    <img src="~/Images/icons/dollar.png" class="responsive" style="height:29px;" />
                                                </span>
                                            </div>
                                            <input id="de_btn_usd_label" maxlength="1" type="text" class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Batch Number Currency Thai Baht Label&nbsp;<span style="color:red;">*</span></label>
                                        <div class="input-group">
                                            <div class="input-prepend">
                                                <span>
                                                    <img src="~/Images/icons/baht.png" class="responsive" style="height:29px;" />
                                                </span>
                                            </div>
                                            <input id="de_btn_thb_label" maxlength="1" type="text" class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_btc_app_auth_allow" />
                                        <label for="de_btc_app_auth_allow">Approve Authorize Allow</label>
                                    </div>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_btc_req_nkd_allow" />
                                        <label for="de_btc_req_nkd_allow">Nextworking Day Request Allow</label>
                                    </div>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_btc_bkd_allow" />
                                        <label for="de_btc_bkd_allow">Backdate Upload Allow</label>
                                    </div>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_btc_req_sche_allow" />
                                        <label for="de_btc_req_sche_allow">Schedule Request Allow</label>
                                    </div>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" checked="checked" id="de_btc_single_req_allow" />
                                        <label for="de_btc_single_req_allow">Single Request Allow</label>
                                    </div>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_btc_group_req_allow" />
                                        <label for="de_btc_group_req_allow">Group Request Allow</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_btc_khr_inrounding" />
                                        <label for="de_btc_khr_inrounding">Inrounding</label>
                                    </div>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_btc_cypo_upload_allow" />
                                        <label for="de_btc_cypo_upload_allow">CYPO Upload Allow</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Batch Source&nbsp;<span style="color:red;">*</span></label>
                                <select size="10" multiple style="width:100%;" id="de_btc_bt_source" class="form-control form-control-sm">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="de_btc_create" type="button" class="btn btn-primary btn-xs" onclick="BtcCreateBatchTypeDialog()"><i class="fas fa-edit"></i>&nbsp;Create</button>
                        <button style="display:none;" id="de_btc_update" type="button" class="btn btn-primary btn-xs" onclick="BtcUpdateBatchTypeDialog()"><i class="fas fa-user-edit"></i>&nbsp;Update</button>
                        <button style="display:none;" id="de_btc_cancel" type="button" class="btn btn-danger btn-xs" onclick="BtcNewInit()"><i class="fas fa-times"></i>&nbsp;Cancel</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Batch Type Listing</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 table-responsive" id="DIV_TBL_ACL_APP_CONTROL">
                            <table cellpadding="0" cellspacing="0" id="de_btc_batch_type_tbl"
                                   class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="BtcGetBatchTypeLising('Y')"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="BtcGetDataForUpdate()"><i class="fas fa-pencil-alt"></i>&nbsp;Update</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="BtcStartMember()"><i class="fas fa-users"></i>&nbsp;Member</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="BtcDeleteDialog()"><i class="fas fa-trash-alt"></i>&nbsp;Delete</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    <div class="modal fade" id="modalAddMemberBatchType">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Member
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Batch Type ID</label>
                                <input type="text" readonly="readonly" class="form-control form-control-sm" id="de_btc_mem_batch_type_id" />
                            </div>
                        </div>
                        <div class="col-sm-12 border-bottom-0">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a onclick="BtcDefineActiveTab('add_member_tab')" class="nav-link active" data-toggle="tab" href="#de_btc_tab_add_member" role="tab"><i class="fas fa-user-plus"></i>&nbsp;Add User</a>
                                </li>
                                <li class="nav-item">
                                    <a onclick="BtcDefineActiveTab('modify_member_tab')" class="nav-link" data-toggle="tab" href="#de_btc_tab_add_member" role="tab"><i class="fas fa-user-edit"></i>&nbsp;Modify User</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-sm-12">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="de_btc_tab_add_member" role="tabpanel">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="form-group">
                                                        <label>Choose User</label>
                                                        <select data-placeholder="Choose User" style="width:100%;" class="form-control form-control-sm" id="de_btc_mem_get_users"></select>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="form-group">
                                                        <label>Choose Role</label>
                                                        <select data-placeholder="Choose User" style="width:100%;" class="form-control form-control-sm" id="de_btc_mem_role" onchange="BtcAddMemValFcubUser(this.value)">
                                                            <option value=""></option>
                                                            <option value="co">#1 - Check Only</option>
                                                            <option value="ro">#2 - Request Only</option>
                                                            <option value="uor">#3 - Upload Other Requester</option>
                                                            <option value="aor">#4 - Authorize Other Requester</option>
                                                            <option value="suuor">#5 - Self Upload and Upload Other Requester</option>
                                                            <option value="suaor">#6 - Self Upload and Authorize Other Requester</option>
                                                            <option value="susauoraor">#7 - Self Upload, Self Authorize, Upload Other Requester and Authorize Other Requester</option>
                                                            <option value="uoraor">#8 - Upload other Requester and Authorize Other Requester</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>FCUB Upload UserID <span style="color:red;">*</span></label>
                                                                <input type="text" disabled class="form-control form-control-sm" id="de_btc_mem_add_fcub_up_userid" />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>FCUB Authorize UserID <span style="color:red;">*</span></label>
                                                                <input type="text" disabled class="form-control form-control-sm" id="de_btc_mem_add_fcub_au_userid" />
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
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        <button id="de_btc_mem_add_btn" type="button" class="btn btn-primary btn-xs" onclick="BtcMemRoleSubmitDialog()"><i class="fas fa-wrench"></i>&nbsp;Submit</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="BtcRemoveMemberDialog()"><i class="fas fa-trash-alt"></i>&nbsp;Remove Member</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
