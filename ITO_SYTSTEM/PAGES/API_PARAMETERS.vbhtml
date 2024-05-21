<div id="API_PARAMETERS" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> API Param</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Parameter Types</label>
                                <select id="api_parameter_type" @*multiple="multiple"*@ data-placeholder="Choose Transaction Type" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="api_parameter_fn_query_param_type('Process')"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                        @*<button class="btn btn-primary btn-xs" type="button" onclick="api_parameter_fn_edit_param_type()"><i class="fas fa-edit"></i>&nbsp;Edit</button>*@
                        <button style="display:none;" class="btn btn-danger btn-xs" type="button" onclick="ParamAPIdelete()"><i class="fas fa-trash"></i>&nbsp;Delete</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Listing</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-sm-12 table-responsive">
                        <table id="apim_tbl_get_parameter_type_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                            <thead>
                                <tr>
                                    @*<th><input type="checkbox" style="margin-left:50%;" id="apim_tbl_get_parameter_type_listing_ck_selectall"></th>*@
                                    <th></th>
                                    <th>Param Name</th>
                                    <th>Param Value</th>
                                    <th>System</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="api_parameter_fn_edit_param_type()"><i class="fas fa-edit"></i>&nbsp;Edit</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>

    </div>

    <div class="modal" id="modalEditParameter">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    Update API Parameter
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Param Name <span style="color:red;">*</span></label>
                                            <input id="ParamName" type="text" class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>Param Value <span style="color:red;">*</span></label>
                                            <input id="ParamValue" type="text" class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label>System <span style="color:red;">*</span></label>
                                            <input id="System" type="text" class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    @*<button type="button" id="param_api_btn_save" class="btn btn-primary btn-xs" onclick="fnParamAPIsave()"><i class="fas fa-save"></i>&nbsp; Save</button>*@
                    <button id="param_api_btn_update" type="button" class="btn btn-primary btn-xs" onclick="api_parameter_fn_update_param_type(this.value)"><i class="fas fa-edit"></i>&nbsp;Update</button>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"><i class="fas fa-times"></i>&nbsp;Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="fab-container">
        <div class="fab fab-icon-holder" style="background-color:mediumturquoise">
            <i class="fas fa-tasks"></i>

        </div>
        <ul class="fab-options">
            <li data-tooltip="Endpoint Register Monitoring" data-tooltip-position="left">
                <div class="fab-icon-holder" style="background-color:mediumturquoise">
                    <a href="javascript:fnAPIPGetEndpointMonitor()">
                        <i class="fas fa-file-alt"></i>
                    </a>
                </div>
            </li>

            @*<li data-tooltip="Manage Client" data-tooltip-position="left">
                <div class="fab-icon-holder" style="background-color:mediumturquoise">
                    <a href="javascript:fnAPIPManageClient()">
                        <i class="fas fa-clipboard-check"></i>
                    </a>
                </div>
            </li>*@
        </ul>
    </div>

    <div class="modal" id="modal_endpoint_register_monitoring" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Endpoint Monitoring @*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="Endpoint">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Endpoint Register Monitoring</span>
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
                                            <label>Endpoint ID <span style="color: Red; font-family:KH"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpoint_id">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Description<span style="color:red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpoint_description">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Endpoint<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpoint">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Status<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpoint_status" class="form-control form-control-sm" onchange="">
                                                <option value="A">A</option>
                                                <option vale="I">I</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Endpoint Type<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpoint_type" class="form-control form-control-sm" onchange="">
                                                <option value="SOAP">SOAP</option>
                                                <option vale="REST">REST</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Key Name<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpoint_key_name">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Key Value<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpoint_key_value">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Method<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpoint_method" class="form-control form-control-sm" onchange="">
                                                <option value="GET">GET</option>
                                                <option vale="POST">POST</option>
                                                <option vale="PUT">PUT</option>
                                                <option vale="PATCH">PATCH</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Content Type<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpoint_content_type">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Service Type<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpoint_service_type" class="form-control form-control-sm" onchange="">
                                                <option value="DC">DC</option>
                                                <option vale="DR">DR</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Message Body<span style="color:red;"> *</span></label>
                                            <textarea id="apip_endpoint_message_body" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_endpoint_btn_submit" type="button" onclick="apip_endpoint_fn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>
                                    <button style="display:none" id="api_endpoint_btn_update" class="btn btn-primary btn-xs" type="button" onclick="apip_endpoint_fn_update()"><i class="fas fa-edit"></i>&nbsp;Update</button>
                                    <button id="api_endpoint_btn_clear" class="btn btn-danger btn-xs" type="button" onclick="apip_endpoint_fn_clear()"><i class="fas fa-times"></i> Clear</button>
                                    @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@

                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_endpoint">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing Parameter Endpoint</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_endpoint" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="api_parameter_tbl_endpoint_ck_selectall"></th>
                                                    <th noraw>Endpoint Id</th>
                                                    <th noraw>Description</th>
                                                    <th noraw>Endpoint</th>
                                                    <th noraw>Status</th>
                                                    <th noraw>Endpoint Type</th>
                                                    <th noraw>Key Name</th>
                                                    <th noraw>Key Value</th>
                                                    <th noraw>Method</th>
                                                    <th noraw>Content Type</th>
                                                    <th noraw>DC or DR</th>
                                                    <th noraw>Current Service</th>
                                                    <th noraw>Status Code</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_list" type="button" onclick="fnAPIPRefreshEndpoint()"><i class="fa fa-sync"></i> Refresh</button>
                                    <button class="btn btn-primary btn-xs" id="api_parameter_Edit_endpoint" type="button" onclick="fnAPIPEditEndpoint()"><i class="fas fa-edit"></i> Edit </button>
                                    <button class="btn btn-danger btn-xs" id="api_parameter_delete_endpoint" type="button" onclick="fnAPIPDeleteEndpoint()"><i class="fa fa-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>
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
