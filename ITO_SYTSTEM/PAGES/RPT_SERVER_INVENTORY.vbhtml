<div id="RPT_SERVER_INVENTORY" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <div class="btn-group">
                        </div>
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card card-primary card-outline card-outline-tabs">
                                    <div class="card-header p-0 border-bottom-0">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="pill" href="#rpt_server_invt_register_host_tab" onclick="fnrpt_server_invt_tabchange('register_host')" role="tab">Register Host</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="pill" href="#rpt_server_invt_service_mapping_tab" onclick="fnrpt_server_invt_tabchange('service_mapping')" role="tab">Map Service</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="pill" href="#rpt_server_invt_register_csi_tab" onclick="fnrpt_server_invt_tabchange('register_csi')" role="tab">Register CSI</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <button id="rpt_server_invt_btn_clear" class="btn btn-primary btn-xs" type="button" onclick="rpt_server_invt_fn_clear_host()"><i class="fas fa-broom"></i> New</button>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="tab-pane fade show active" id="rpt_server_invt_register_host_tab" role="tabpanel">
                                                <div class="col-sm-12">
                                                    <div class="row" id="div_rpt_server_invt_hostidselected" style="display:none">
                                                        <div class="col-sm-12">
                                                            <div class="form-group">
                                                                <label>Host ID Selected <span style="color: Red;">*</span></label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class="fas fa-server"></i></span>
                                                                    </div>
                                                                    <input type="text" id="rpt_server_invt_hostidselected" class="form-control form-control-sm is-valid" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Host Name <span style="color: Red;">*</span></label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class="fas fa-server"></i></span>
                                                                    </div>
                                                                    <input type="text" id="rpt_server_invt_hostid" class="form-control form-control-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Product Description <span style="color: Red;">*</span></label>
                                                                <input type="text" id="rpt_server_invt_productdesc" class="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Site<span style="color: Red;">*</span></label>
                                                                <select style="width:100%;" id="rpt_server_invt_hostside" class="form-control form-control-sm" onchange="rpt_server_invt_FN_on_hostside(this.value)">
                                                                    <option value="DC">DC</option>
                                                                    <option vale="DR">DR</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>DR of</label>
                                                                <select style="width:100%;" id="rpt_server_invt_drof" class="form-control form-control-sm" disabled></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>System Type <span style="color: Red;">*</span></label>
                                                                <select data-placeholder="Choose System Type" style="width:100%;" id="rpt_server_invt_system_type" class="form-control form-control-sm"></select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Environment <span style="color: Red;">*</span></label>
                                                                <select style="width:100%;" id="rpt_server_invt_environment" class="form-control form-control-sm">
                                                                    <option value="PROD">Production</option>
                                                                    <option value="UAT">UAT</option>
                                                                    <option value="SIT">SIT</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>OS Platform <span style="color: Red;">*</span></label>
                                                                <select data-placeholder="Choose OS Platform" style="width:100%;" id="rpt_server_invt_osplatform" class="form-control form-control-sm"></select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>OS Version<span style="color: Red;">*</span></label>
                                                                <input type="text" id="rpt_server_invt_osver" class="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>CSI <span style="color: Red;">*</span></label>
                                                                <select style="width:100%;" id="rpt_server_invt_csi" class="form-control form-control-sm"></select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Management IP</label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class="fas fa-network-wired"></i></span>
                                                                    </div>
                                                                    <input id="rpt_server_invt_mgrip" type="text" class="form-control form-control-sm" data-inputmask="'alias': 'ip'" data-mask>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Local IP</label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class="fas fa-network-wired"></i></span>
                                                                    </div>
                                                                    <input id="rpt_server_invt_lanip" type="text" class="form-control form-control-sm" data-inputmask="'alias': 'ip'" data-mask>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <div class="form-group">
                                                                <label>Remark</label>
                                                                <textarea id="rpt_server_invt_registerhost_remark" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="1000 characters limited..."></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @*END REGISTER HOST TAB*@
                                            <div class="tab-pane fade" id="rpt_server_invt_register_csi_tab" role="tabpanel">
                                                <div class="col-sm-12">
                                                    <div class="row" id="div_rpt_server_invt_csiidselected" style="display:none">
                                                        <div class="col-sm-12">
                                                            <div class="form-group">
                                                                <label>CSI ID Selected <span style="color: Red;">*</span></label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class="fas fa-server"></i></span>
                                                                    </div>
                                                                    <input type="text" id="rpt_server_invt_csiidselected" class="form-control form-control-sm is-valid" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>CSI/SLA <span style="color: Red;">*</span></label>
                                                                <input type="text" id="rpt_server_invt_csisla" class="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>S/N <span style="color: Red;">*</span></label>
                                                                <input type="text" id="rpt_server_invt_snnumber" class="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Contract Type<span style="color: Red;">*</span></label>
                                                                <select style="width:100%;" id="rpt_server_invt_contract_type" class="form-control form-control-sm">
                                                                    <option value="Hardware">Hardware</option>
                                                                    <option value="Software">Software</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Product Type <span style="color: Red;">*</span></label>
                                                                <select data-placeholder="Choose Product Type" style="width:100%;" id="rpt_server_invt_product_type" class="form-control form-control-sm">
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Supporter<span style="color: Red;">*</span></label>
                                                                <select style="width:100%;" id="rpt_server_invt_supporter" class="form-control form-control-sm">
                                                                    <option value="0">N/A</option>
                                                                    <option value="FIRST CAMBODIA">FIRST CAMBODIA</option>
                                                                    <option value="SUNWEST">SUNWEST</option>
                                                                    <option value="DEAM">DEAM</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>ASR<span style="color: Red;">*</span></label>
                                                                <select style="width:100%;" id="rpt_server_invt_asr" class="form-control form-control-sm">
                                                                    <option value="N">N</option>
                                                                    <option value="Y">Y</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Start Date <span style="color: Red;">*</span></label>
                                                                <input type="text" id="rpt_server_invt_startdate" class="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Expire Date <span style="color: Red;">*</span></label>
                                                                <input type="text" id="rpt_server_invt_expiredate" class="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label>Contact Person</label>
                                                                <input type="text" id="rpt_server_invt_contact_person" class="form-control form-control-sm form-control-solid" @*placeholder="Type and hit enter for multiple person"*@ />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group" id="rpt_server_invt_div_doc_support">
                                                                <label>Documents Support</label>
                                                                <input type="file" id="rpt_server_invt_doc_support" @*multiple*@ class="form-control-file border" onchange="GetBase64String('rpt_server_invt_doc_support','rpt_server_invt_btn_update')">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <div class="form-group">
                                                                <label>Remark</label>
                                                                <textarea id="rpt_server_invt_csiremark" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="1000 characters limited..."></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @*END REGISTER CSI*@
                                            <div class="tab-pane fade" id="rpt_server_invt_service_mapping_tab" role="tabpanel">
                                                <div class="col-sm-12">
                                                    <div class="row" id="div_rpt_server_invt_serviceidselected" style="display:none">
                                                        <div class="col-sm-12">
                                                            <div class="form-group">
                                                                <label>Service ID Selected <span style="color: Red;">*</span></label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class="fas fa-server"></i></span>
                                                                    </div>
                                                                    <input type="text" id="rpt_server_invt_serviceidselected" class="form-control form-control-sm is-valid" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>Host Name <span style="color: Red;">*</span></label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class="fas fa-server"></i></span>
                                                                    </div>
                                                                    <select id="rpt_server_invt_hostid_mapping" data-placeholder="Choose Host Name" class="form-control form-control-sm"></select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>Service Type<span style="color: Red;">*</span></label>
                                                                <select data-placeholder="Choose Service Type" style="width:100%;" id="rpt_server_invt_servicetype_mapping" class="form-control form-control-sm">
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>Service Run<span style="color: Red;">*</span></label>
                                                                <input type="text" id="rpt_server_invt_servicerun_mapping" class="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <div class="form-group">
                                                                <label>Remark</label>
                                                                <textarea id="rpt_server_invt_remark_mapping" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="1000 characters limited..."></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @*END SERVICE MAPPING*@
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="rpt_server_invt_btn_submit" class="btn btn-success btn-xs" type="button" onclick="rpt_server_invt_fn_submit_host()"><i class="fa fa-paper-plane"></i> Save</button>
                        <button style="display:none" id="rpt_server_invt_btn_update" class="btn btn-primary btn-xs" type="button" onclick="rpt_server_invt_fn_update_host()"><i class="fas fa-edit"></i> Update</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Report Listing</span>
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
                                    <div class="form-group">
                                        <div class="icheck-primary d-inline">
                                            <input type="checkbox" class="form-control form-control-sm" id="rpt_server_invt_refresh_all_check" />
                                            <label for="rpt_server_invt_refresh_all_check">Refresh All Listing</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item active">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_server_invt_list_hostregister_tab" onclick="fnrpt_server_invt_tabchange('rpt_server_invt_list_hostregister')" role="tab">Host Register Listing</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_server_invt_list_service_mapping_tab" onclick="fnrpt_server_invt_tabchange('service_mapping_listing')" role="tab">Service Map Listing</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#rpt_server_invt_list_csi_tab" onclick="fnrpt_server_invt_tabchange('rpt_server_invt_list_csi')" role="tab">CSI Listing</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="rpt_server_invt_list_hostregister_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table id="rpt_server_invt_tbl_host_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                                        <thead>
                                                            <tr>
                                                                <th><input type="checkbox" style="margin-left:50%;" id="rpt_server_invt_tbl_host_listing_ck_selectall"></th>
                                                                <th>Host ID</th>
                                                                <th>Host Name</th>
                                                                <th>Product Description</th>
                                                                <th>Site</th>
                                                                <th>DR of Host</th>
                                                                <th>System Type</th>
                                                                <th>OS Platform</th>
                                                                <th>Run Service</th>
                                                                <th>CSI Number</th>
                                                                <th>IP Management</th>
                                                                <th>IP LAN</th>
                                                                <th>OS Version</th>
                                                                <th>Environment</th>
                                                                <th>Remark</th>
                                                                <th>Record Stat</th>
                                                                <th>Create Date</th>
                                                                <th>Create By</th>
                                                                <th>Last Oper DT</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_server_invt_list_service_mapping_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    <table id="rpt_server_invt_tbl_service_mapping_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                                        <thead>
                                                            <tr>
                                                                <th><input type="checkbox" style="margin-left:50%;" id="rpt_server_invt_tbl_service_mapping_listing_ck_selectall"></th>
                                                                <th>Service ID</th>
                                                                <th>Service Type</th>
                                                                <th>Service Run</th>
                                                                <th>Host ID</th>
                                                                <th>Remark</th>
                                                                <th>Map Date</th>
                                                                <th>Map By</th>
                                                                <th>Last Oper ID</th>
                                                                <th>Last Oper DT</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="rpt_server_invt_list_csi_tab" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12 table-responsive">
                                                    @*<table cellpadding="0" cellspacing="0" id="rpt_server_invt_tbl_csi_listing"
                                                        class="display table table-bordered table-hover nowrap" style="width:100%"></table>*@
                                                    <table id="rpt_server_invt_tbl_csi_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                                        <thead>
                                                            <tr>
                                                                <th><input type="checkbox" style="margin-left:50%;" id="rpt_server_invt_tbl_csi_listing_ck_selectall"></th>
                                                                <th>NO</th>
                                                                <th>CSI/SLA</th>
                                                                <th>SN</th>
                                                                <th>Contract Type</th>
                                                                <th>Product Type</th>
                                                                <th>Supporter</th>
                                                                <th>Contact Persion</th>
                                                                <th>ASR</th>
                                                                <th>Start Date</th>
                                                                <th>Expire Date</th>
                                                                <th>Remark</th>
                                                                <th>Create Date</th>
                                                                <th>Create By</th>
                                                                <th>Last Oper ID</th>
                                                                <th>Last Oper DT</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="flex-container">
                                        <button class="btn btn-primary btn-xs" id="rpt_server_invt_update_list" type="button" onclick="rpt_server_invt_fn_edit_host_list()"><i class="fas fa-edit"></i> Edit </button>
                                        <button class="btn btn-primary btn-xs" id="rpt_server_invt_refresh_list" type="button" onclick="rpt_server_invt_fnRefresh_host_listing()"><i class="fa fa-sync"></i> Refresh</button>
                                        <button class="btn btn-danger btn-xs" id="rpt_server_invt_delete_list" type="button" onclick="rpt_server_invt_fn_confirm_delete_host_list()"><i class="fa fa-trash"></i> Delete</button>
                                        @*<button class="btn btn-primary btn-xs" id="rpt_server_invt_download_doc_support_list" type="button" onclick="rpt_server_invt_fn_download_csi_doc_support()" style="display:none"><i class="fas fa-file-download"></i>&nbsp;Download Document</button>*@
                                        <button class="btn btn-primary btn-xs" id="rpt_server_invt_view_doc_support_list" type="button" onclick="rpt_server_invt_fn_open_modal_csi_doc_support()" style="display:none"><i class="fas fa-folder"></i>&nbsp;View Documents</button>
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
    @*Modal Section*@
    <div class="modal" id="rpt_server_invt_modal_view_doc_support_list" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    CSI Document
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>CSI Number</label>
                        <input id="rpt_server_invt_modal_csi_no" type="text" class="form-control form-control-sm is-valid" readonly />
                    </div>
                    @*<div class="form-group">
                            <label>Add Document</label>
                            <input type="file" id="rpt_server_invt_input_add_more_doc_support" multiple class="form-control-file border" onchange="GetBase64String('rpt_server_invt_input_add_more_doc_support','rpt_server_invt_btn_add_more_doc_support')">
                        </div>*@
                    <div class="form-group">
                        <label>Add Document</label>
                        <div class="input-group">
                            <div>
                                <input type="file" id="rpt_server_invt_input_add_more_doc_support" multiple class="form-control-file border" onchange="GetBase64String('rpt_server_invt_input_add_more_doc_support','rpt_server_invt_btn_add_more_doc_support')">
                            </div>
                            <div class="input-group-append">
                                <button id="rpt_server_invt_btn_add_more_doc_support" type="button" class="btn btn-primary btn-xs" onclick="rpt_server_invt_fn_add_doc()" disabled>
                                    <i class="fa fa-file-upload"></i>&nbsp;Upload
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 table-responsive">
                            @*<table cellpadding="0" cellspacing="0" id="rpt_server_invt_tbl_csi_listing_doc"
                                class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                         </div>*@
                            <table id="rpt_server_invt_tbl_csi_listing_doc" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" style="margin-left:35%;" id="rpt_server_invt_tbl_csi_listing_doc_ck_selectall"></th>
                                        <th>DOC ID</th>
                                        <th>DOC Name</th>
                                        <th>DOC Size</th>
                                        <th>Upload Date</th>
                                        <th>Uploader</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class=" modal-footer">
                        <div class="flex-container">
                            @*<button id="rpt_server_invt_btn_add_more_doc_support" type="button" class="btn btn-primary btn-xs" onclick="rpt_server_invt_fn_add_doc()">
                                    <i class="fa fa-file-upload"></i>&nbsp;Upload
                                </button>*@
                            <button id="rpt_server_invt_btn_delete_doc_support" type="button" class="btn btn-danger btn-xs" onclick="rpt_server_invt_fn_delete_doc()">
                                <i class="fas fa-trash"></i>&nbsp;Delete
                            </button>
                            <button class="btn btn-primary btn-xs" id="rpt_server_invt_btn_download_doc_support" type="button" onclick="rpt_server_invt_fn_download_doc_support()"><i class="fas fa-file-download"></i>&nbsp;Download</button>
                            <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>