<div id="API_USER_MANAGEMENT" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i>Manage Client Service</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3 id="client_value"></h3>
                                    <p>Client Registrations</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <a href="javascript:fnAPIPGetClient()" class="small-box-footer">Check info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3 id="endpoint_value"></h3>
                                    <p>Endpoint Registrations</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-link"></i>
                                </div>
                                <a href="javascript:fnAPIPGetEndpoint()" class="small-box-footer">Check info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3 id="sinature_value"></h3>
                                    <p>Signature Registrations</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-signature"></i>
                                </div>
                                <a href="javascript:fnAPIPGetSinature()" class="small-box-footer">Check info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        @*<div class="col-lg-3 col-6">
                                <div class="small-box bg-success">
                                    <div class="inner">
                                        <h3>-</h3>
                                        <p>Cliend Endpoint Registrations</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fas fa-people-arrows"></i>
                                    </div>
                                    <a href="javascript:fnAPIPGetClientEndpoint()" class="small-box-footer">Check info <i class="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>*@

                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3 id="messages_value"></h3>
                                    <p>Message Registrations</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <a href="javascript:fnAPIPGetMessage()" class="small-box-footer">Check info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>-</h3>
                                    <p>Tool Generation</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-globe"></i>
                                </div>
                                <a href="javascript:fnAPIPGeneration()" class="small-box-footer">Check info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3 id="user_value">-</h3>
                                    <p>User Transaction Monitor</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-user-check"></i>
                                </div>
                                <a href="javascript:fnAPIPUserService()" class="small-box-footer">Check info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>

    </div>
    <div class="modal" id="modal_client" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Client
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="Client">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Client Service</span>
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
                                            <label>APP ID <span style="color: Red; font-family:KH"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_appid">
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_client_id">
                                        <div class="form-group">
                                            <label>Client ID<span style="color:red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_id" placeholder="Value Text Normal">
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_client_secert">
                                        <div class="form-group">
                                            <label>Client Secert<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_secert" placeholder="Value Text Normal">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Client Name<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_name">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Client Description<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_description">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Grent Type<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_typegrent">
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_client_status">
                                        <div class="form-group">
                                            <label>Record Status<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_client_status" class="form-control form-control-sm" onchange="">
                                                <option value="O">O</option>
                                                <option vale="C">C</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_client_btn_submit" type="button" onclick="apip_client_fn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>
                                    <button style="display:none" id="api_client_btn_update" class="btn btn-primary btn-xs" type="button" onclick="apip_client_fn_update()"><i class="fas fa-edit"></i>&nbsp;Update</button>
                                    <button id="api_client_btn_clear" class="btn btn-danger btn-xs" type="button" onclick="apip_client_fn_clear()"><i class="fas fa-times"></i> Clear</button>
                                    @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@

                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_client">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing Parameter Client</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_client" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="api_parameter_tbl_client_ck_selectall"></th>
                                                    <th noraw>APP ID</th>
                                                    <th noraw>Client ID</th>
                                                    <th noraw>Client Secert</th>
                                                    <th noraw>Client Name</th>
                                                    <th noraw>Client Description</th>
                                                    <th noraw>Grent Type</th>
                                                    <th noraw>Record Status</th>
                                                    <th noraw>Create Date</th>
                                                    <th noraw>Update Date</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_list_client" type="button" onclick="fnAPIPRefreshClient()"><i class="fa fa-sync"></i> Refresh</button>
                                    <button class="btn btn-primary btn-xs" id="api_parameter_Edit_client" type="button" onclick="fnAPIPEditClient()"><i class="fas fa-edit"></i> Edit </button>
                                    <button class="btn btn-danger btn-xs" id="api_parameter_delete_client" type="button" onclick="fnAPIPDeleteClient()"><i class="fa fa-trash"></i> Delete</button>
                                    <button class="btn btn-success btn-xs" id="api_parameter_client_endpoint" type="button" onclick="fnAPIPGetClientEndpoint()"><i class="fas fa-users"></i> Client Endpoint </button>
                                    <button class="btn btn-success btn-xs" id="api_parameter_client_sinature" type="button" onclick="fnAPIPGetClientSinature()"><i class="fa fa-pen-alt"></i> Client Sinature</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="fnAPIUClose()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_endpoint" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Client Endpoint@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="Endpoint_User">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i>Endpoint User</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3" style="display:none" id="div_endpoint_selected">
                                        <div class="form-group">
                                            <label>Endpoint ID<span style="color:red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpointuser_endpointid">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>API ID <span style="color: Red; font-family:KH"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpointuser_apiid">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Endpoint<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpointuser">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Method<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_method" class="form-control form-control-sm" onchange="">
                                                <option value="GET">GET</option>
                                                <option vale="POST">POST</option>
                                                <option vale="PUT">PUT</option>
                                                <option vale="PATCH">PATCH</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_endpoint_status_selected">
                                        <div class="form-group">
                                            <label>Record Status<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_status" class="form-control form-control-sm" onchange="">
                                                <option value="O">O</option>
                                                <option vale="C">C</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Enable<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_enable" class="form-control form-control-sm" onchange="">
                                                <option value="Y">Y</option>
                                                <option vale="N">N</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Debug<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_debug" class="form-control form-control-sm" onchange="">
                                                <option value="Y">Y</option>
                                                <option vale="N">N</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Debug Name<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpointuser_debug_name" value=".txt">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Authorize<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_authorize" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Validate Transaction ID<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_validatetrnid" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Validate Create<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_validatecreatetime" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Validate Age Request<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_validateagq" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Validate Digest<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_validatedigest" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Validate Signature<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_validatesinature" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Source System Check<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_sourcesys" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Allow Anonymous<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_allowanymous" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Multipart Form Data<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_multipartdata" class="form-control form-control-sm" onchange="">
                                                <option vale="N">N</option>
                                                <option value="Y">Y</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Authentication Type<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_endpointuser_type_auth" class="form-control form-control-sm" onchange="fnauthtype()">
                                                <option vale="Bearer">Bearer</option>
                                                <option value="APIKey">APIKey</option>
                                                <option value="AllAuth">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_endpointuser_Apikey">
                                        <div class="form-group">
                                            <label>API Key<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_endpointuser_apikey">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_userendpoint_btn_submit" type="button" onclick="apip_userendpoint_btn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>
                                    <button style="display:none" id="api_userendpoint_btn_update" class="btn btn-primary btn-xs" type="button" onclick="apip_userendpoint_fn_update()"><i class="fas fa-edit"></i>&nbsp;Update</button>
                                    <button id="api_userendpoint_btn_clear" class="btn btn-danger btn-xs" type="button" onclick="apip_userendpoint_fn_clear()"><i class="fas fa-times"></i> Clear</button>
                                    @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@

                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_userendpoint">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing Endpoint</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_userendpoint" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="api_parameter_tbl_userendpoint_ck_selectall"></th>
                                                    <th noraw>API ID</th>
                                                    <th noraw>Endpoint ID</th>
                                                    <th noraw>Endpoint</th>
                                                    <th noraw>Method</th>
                                                    <th noraw>Record Status</th>
                                                    <th noraw>Created By</th>
                                                    <th noraw>Created Date</th>
                                                    <th noraw>Modified By</th>
                                                    <th noraw>Modified Date</th>
                                                    <th noraw>Enable</th>
                                                    <th noraw>Debug</th>
                                                    <th noraw>Debug Name</th>
                                                    <th noraw>Authorize</th>
                                                    <th noraw>Validate Transaction ID</th>
                                                    <th noraw>Validate Create</th>
                                                    <th noraw>Validate Age Request</th>
                                                    <th noraw>Validate Digest</th>
                                                    <th noraw>Validate Signature</th>
                                                    <th noraw>Source System Check</th>
                                                    <th noraw>Allow Anonymous</th>
                                                    <th noraw>Multipart Form Data</th>
                                                    <th noraw>Authentication Type</th>
                                                    <th noraw>API Key</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_userendpoint" type="button" onclick="fnAPIPRefreshUserEndpoint()"><i class="fa fa-sync"></i> Refresh</button>
                                    <button class="btn btn-primary btn-xs" id="api_parameter_Edit_userendpoint" type="button" onclick="fnAPIPEditUserEndpoint()"><i class="fas fa-edit"></i> Edit </button>
                                    <button class="btn btn-danger btn-xs" id="api_parameter_delete_userendpoint" type="button" onclick="fnAPIPDeleteUserEndpoint()"><i class="fa fa-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="fnAPIUClose()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_sinature" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Sinature@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="Sinature">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Sinature</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3" style="display:none" id="div_sinature_selected">
                                        <div class="form-group">
                                            <label>SIG ID <span style="color: Red; font-family:KH"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_sinature_id">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3" style="display:none" id="div_sinature_status_selected">
                                        <div class="form-group">
                                            <label>Record Status<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_sinature_status" class="form-control form-control-sm" onchange="">
                                                <option value="O">O</option>
                                                <option vale="C">C</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Key ID<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_sinature_keyid">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Algorithm<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_sinature_algorithm">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Headers<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_sinature_headers">
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_sinature_secretkey">
                                        <div class="form-group">
                                            <label>Secretkey<span style="color: Red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_sinature_secretkey">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Max Request<span style="color: Red;"> *</span></label>
                                            <input type="number" class="form-control form-control-sm" id="apip_sinature_maxagerequest">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_sinature_btn_submit" type="button" onclick="apip_sinature_fn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>
                                    <button style="display:none" id="api_sinature_btn_update" class="btn btn-primary btn-xs" type="button" onclick="apip_sinature_fn_update()"><i class="fas fa-edit"></i>&nbsp;Update</button>
                                    <button id="api_sinature_btn_clear" class="btn btn-danger btn-xs" type="button" onclick="apip_sinature_fn_clear()"><i class="fas fa-times"></i> Clear</button>
                                    @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@

                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_sinature">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing Parameter Sinature</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_sinature" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="api_parameter_tbl_sinature_ck_selectall"></th>
                                                    <th noraw>SIG ID</th>
                                                    <th noraw>Created By</th>
                                                    <th noraw>Created Date</th>
                                                    <th noraw>Modifired By</th>
                                                    <th noraw>Modifired Date</th>
                                                    <th noraw>Record Status</th>
                                                    <th noraw>Key ID</th>
                                                    <th noraw>Algorithm</th>
                                                    <th noraw>Headers</th>
                                                    <th noraw>Secretkey</th>
                                                    <th noraw>Max Request</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_list_sinature" type="button" onclick="fnAPIPRefreshSinature()"><i class="fa fa-sync"></i> Refresh</button>
                                    <button class="btn btn-primary btn-xs" id="api_parameter_Edit_sinature" type="button" onclick="fnAPIPEditSinature()"><i class="fas fa-edit"></i> Edit </button>
                                    <button class="btn btn-danger btn-xs" id="api_parameter_delete_sinature" type="button" onclick="fnAPIPDeleteSinature()"><i class="fa fa-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="fnAPIUClose()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_client_endpoint" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Client Endpoint@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="Client_Endpoint">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Client Endpoint Service</span>
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
                                            <label>APP ID <span style="color: Red; font-family:KH"> *</span></label>
                                            <div class="input-group">
                                                @*<input type="text" class="form-control form-control-sm" id="apip_client_endpoint_appid">*@
                                                <select id="apip_client_endpoint_appid" class="form-control form-control-sm" onchange="">
                                                </select>
                                                <div class="input-group-append">
                                                    <button id="Search_btn_clientmap" class="btn btn-primary btn-xs" type="button" onclick="SearchAppIDClientEndMap()"><i class="fas fa-search"></i>&nbsp;Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Client ID<span style="color: Red; font-family:KH"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_endpoint_id">
                                        </div>
                                    </div>
                                    <div class="col-sm-12" id="endpoint_div_chk" style="display:none">
                                        <div class="form-group">
                                            <label>Endpoint ID&nbsp;<span style="color:red;">*</span></label>
                                            <select size="15" data-placeholder="Choose Modules" id="endpoint_id_module" multiple class="form-control form-control-sm" style="width: 100%; height: 300px;">
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_client_endpoint_btn_submit" type="button" onclick="apip_client_endpoint_fn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>
                                    @*<button style="display:none" id="api_client_endpoint_btn_update" class="btn btn-primary btn-xs" type="button" onclick="apip_client_endpoint_fn_update()"><i class="fas fa-edit"></i>&nbsp;Update</button>*@
                                    @*<button id="api_client_endpoint_btn_clear" class="btn btn-danger btn-xs" type="button" onclick="apip_client_endpoint_fn_clear()"><i class="fas fa-times"></i> Clear</button>*@
                                    @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@

                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_client_endpoint">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing Parameter Client Endpoint Map</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_client_endpoint" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="api_parameter_tbl_client_endpoint_ck_selectall"></th>
                                                    <th noraw>APP ID</th>
                                                    <th noraw>Client ID</th>
                                                    <th noraw>Endoint ID</th>
                                                    <th noraw>Record Status</th>
                                                    <th noraw>Created By</th>
                                                    <th noraw>Created Date</th>
                                                    <th noraw>Modifired By</th>
                                                    <th noraw>Modifired Date</th>
                                                    <th noraw>Action Type</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_list_client_endpoint" type="button" onclick="fnAPIPRefreshClientEndpoint()"><i class="fa fa-sync"></i> Refresh</button>
                                    @*<button class="btn btn-primary btn-xs" id="api_parameter_edit_client_endpoint" type="button" onclick="fnAPIPEditClientEndpoint()"><i class="fas fa-edit"></i> Edit </button>
                                        <button class="btn btn-danger btn-xs" id="api_parameter_delete_client_endpoint" type="button" onclick="fnAPIPDeleteClientEndpoint()"><i class="fa fa-trash"></i> Delete</button>*@
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="fnAPIPClose()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_client_sinature" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Client@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="client_sinature">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Client Sinature Service</span>
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
                                            <label>APP ID&nbsp;<span style="color:red;">*</span></label>
                                            <select id="apip_client_sinature_appid" class="form-control form-control-sm" onchange="">
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Client ID<span style="color:red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_client_sinature_id">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Signature ID&nbsp;<span style="color:red;">*</span></label>
                                            <select id="sinature_id" class="form-control form-control-sm" onchange="">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_cs_status">
                                        <div class="form-group">
                                            <label>Record Status<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_client_sinature_status" class="form-control form-control-sm" onchange="">
                                                <option value="O">O</option>
                                                <option vale="C">C</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_client_signature_btn_submit" type="button" onclick="apip_client_sinature_fn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>
                                    <button style="display:none" id="api_client_signature_btn_update" class="btn btn-primary btn-xs" type="button" onclick="apip_client_sinature_fn_update()"><i class="fas fa-edit"></i>&nbsp;Update</button>
                                    <button id="api_client_signature_btn_clear" class="btn btn-danger btn-xs" type="button" onclick="apip_client_sinature_fn_clear()"><i class="fas fa-times"></i> Clear</button>
                                    @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@

                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_client_signature">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing Parameter Client</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_client_sinature" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="api_parameter_tbl_client_sinature_ck_selectall"></th>
                                                    <th noraw>APP ID</th>
                                                    <th noraw>Client ID</th>
                                                    <th noraw>SIG ID</th>
                                                    <th noraw>Record Status</th>
                                                    <th noraw>Created By</th>
                                                    <th noraw>Created Date</th>
                                                    <th noraw>Modifired By</th>
                                                    <th noraw>Modifired Date</th>
                                                    <th noraw>Action Type</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_list_client_sinature" type="button" onclick="fnAPIPRefreshClientSinature()"><i class="fa fa-sync"></i> Refresh</button>
                                    <button class="btn btn-primary btn-xs" id="api_parameter_edit_client_sinature" type="button" onclick="fnAPIPEditClientSinature()"><i class="fas fa-edit"></i> Edit </button>
                                    @*<button class="btn btn-danger btn-xs" id="api_parameter_delete_client_sinature" type="button" onclick="fnAPIPDeleteSinature()"><i class="fa fa-trash"></i> Delete</button>*@
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="fnAPIPClose()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_message" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Message@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="Message">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Message Register</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3" style="display:none" id="div_messagesid_selected">
                                        <div class="form-group">
                                            <label>Message ID <span style="color: Red; font-family:KH"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_message_id" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>APP ID <span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_message_appid" class="form-control form-control-sm" onchange="">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Message Type<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_message_type" class="form-control form-control-sm" onchange="">
                                                <option value="E">ERROR</option>
                                                <option value="I">INFO</option>
                                                <option value="W">WARNING</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_messagescode">
                                        <div class="form-group">
                                            <label>Message Code<span style="color:red;"> *</span></label>
                                            <input type="text" class="form-control form-control-sm" id="apip_message_code">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-sm-3">
                                        <div class="icheck-primary d-inline">
                                            <input onclick="fnCheckLanguageENG()" type="checkbox" class="form-control form-control-sm" id="message_chk_eng" />
                                            <label for="message_chk_eng">English </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6" id="mes_div_chk_eng" style="display:none">
                                        <div class="form-group">
                                            <label>Message Description English<span style="color:red;"> *</span></label>
                                            <textarea id="apip_message_description_eng" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_messagesstatus_eng">
                                        <div class="form-group">
                                            <label>Record Status ENG<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_message_status_eng" class="form-control form-control-sm" onchange="">
                                                <option value="O">O</option>
                                                <option value="C">C</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-sm-3">
                                        <div class="icheck-primary d-inline">
                                            <input onclick="fnCheckLanguageKHR()" type="checkbox" class="form-control form-control-sm" id="message_chk_khr" />
                                            <label for="message_chk_khr">Khmer </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6" id="mes_div_chk_khr" style="display:none">
                                        <div class="form-group">
                                            <label>Message Description Khmer<span style="color:red;"> *</span></label>
                                            <textarea id="apip_message_description_khr" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_messagesstatus_khr">
                                        <div class="form-group">
                                            <label>Record Status KHR<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_message_status_khr" class="form-control form-control-sm" onchange="">
                                                <option value="O">O</option>
                                                <option value="C">C</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-sm-3">
                                        <div class="icheck-primary d-inline">
                                            <input onclick="fnCheckLanguageTHB()" type="checkbox" class="form-control form-control-sm" id="message_chk_thb" />
                                            <label for="message_chk_thb">Thailand </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6" id="mes_div_chk_thb" style="display:none">
                                        <div class="form-group">
                                            <label>Message Description Thailand<span style="color:red;"> *</span></label>
                                            <textarea id="apip_message_description_thb" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" style="display:none" id="div_messagesstatus_thb">
                                        <div class="form-group">
                                            <label>Record Status THB<span style="color: Red;"> *</span></label>
                                            <select style="width:100%;" id="apip_message_status_thb" class="form-control form-control-sm" onchange="">
                                                <option value="O">O</option>
                                                <option value="C">C</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_message_btn_submit" type="button" onclick="apip_message_fn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>
                                    <button style="display:none" id="api_message_btn_update" class="btn btn-primary btn-xs" type="button" onclick="apip_message_fn_update()"><i class="fas fa-edit"></i>&nbsp;Update</button>
                                    <button id="api_message_btn_clear" class="btn btn-danger btn-xs" type="button" onclick="apip_message_fn_clear()"><i class="fas fa-times"></i> Clear</button>
                                    @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@
                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_message">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing Message</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_message" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="api_parameter_tbl_message_ck_selectall"></th>
                                                    <th noraw>Message ID</th>
                                                    <th noraw>APP ID</th>
                                                    <th noraw>Message Code</th>
                                                    <th noraw>Message Type</th>
                                                    <th noraw>Message Language</th>
                                                    <th noraw>Message Description</th>
                                                    <th noraw>Record Status</th>
                                                    <th noraw>Created By</th>
                                                    <th noraw>Created Date</th>
                                                    <th noraw>Modified By</th>
                                                    <th noraw>Modified Date</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_list_message" type="button" onclick="fnAPIPRefreshMessage()"><i class="fa fa-sync"></i> Refresh</button>
                                    <button class="btn btn-primary btn-xs" id="api_parameter_Edit_message" type="button" onclick="fnAPIPEditMessage()"><i class="fas fa-edit"></i> Edit </button>
                                    @*<button class="btn btn-danger btn-xs" id="api_parameter_delete_message" type="button" onclick="fnAPIPDeleteMessage()"><i class="fa fa-trash"></i> Delete</button>*@
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="fnAPIUClose()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_tool" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Tool Generation
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="Tool">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Tool Generation</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Additional Headers</label>
                                            </div>
                                        </div>

                                        <div class="container1">
                                            <div class="col-sm-12">
                                                <div class="row">
                                                    <div class="col-sm-1">
                                                        <div class="form-group">
                                                            <button class="add_form_field" id="apip_add_header" type="button" onclick="fnAddheader()" style="padding:3.5px;background-color:blue;color:white"><i class="fas fa-plus"></i></button>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <div class="form-group">
                                                            <input type="text" class="form-control form-control-sm" id="apip_tool_name0" placeholder="Enter name">
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <input type="text" class="form-control form-control-sm" id="apip_tool_value0" placeholder="Enter value">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="header2" style="padding-top:20px;">
                                            <div class="col-sm-12">
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <div class="form-group">
                                                            <label style="padding-top:5px">Header Signature </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1">
                                                        <div class="form-group">
                                                            <input onchange="fnHeaderSignature()" type="checkbox" class="form-control form-control-sm" id="header_signature" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Endpoint Encrypte</label>
                                                        <input type="text" class="form-control form-control-sm" id="apip_tool_endpoint" disabled>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Algorithm</label>
                                                        <input type="text" class="form-control form-control-sm" id="apip_tool_algorithm" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Headers</label>
                                                        <input type="text" class="form-control form-control-sm" id="apip_tool_headers_sig" disabled>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Key ID</label>
                                                        <input type="text" class="form-control form-control-sm" id="apip_tool_keyid" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Signature Secert Key</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_signature_secert" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Method Request</label>
                                                        <select style="width:100%;" id="apip_tool_method_req_data" class="form-control form-control-sm" disabled>
                                                            <option value="POST">POST</option>
                                                            <option value="GET">GET</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-sm-9">
                                                    <div class="form-group">
                                                        <label>URL</label>
                                                        <input type="text" class="form-control form-control-sm" id="apip_tool_url_req">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Body</label>
                                                <textarea id="apip_tool_body" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;height:320px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="flex-container">
                                        <button class="btn btn-primary btn-xs" id="api_tool_generation" type="button" onclick="fn_apip_tool()"><i class="fas fa-paper-plane"></i>&nbsp;Send</button>

                                    </div>
                                </div>
                            </div>
                            <!--End card listing-->
                        </div>

                    </div>
                    <div class="col-sm-12" id="reponse">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Reponse</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Status</label>
                                                <textarea id="apip_tool_response" class="form-control" style="margin: 0px; width: 100%; color: black; font-size: 12px; height: 400px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Transaction ID@*<span style="color: blue;">&nbsp;&nbsp; <i class="fas fa-sync" id="api_transaction_refresh" onclick="generateUUID()"></i></span>*@</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_trn_id" disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Created@*<span style="color: blue;">&nbsp;&nbsp; <i class="fas fa-sync" id="api_created_refresh" onclick="fnGetCreate()"></i></span>*@</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_create" disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Digest@*<span style="color: blue;">&nbsp;&nbsp; <i class="fas fa-sync" id="api_digest_refresh" onclick="fnReqDigest()"></i></span>*@</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_digest" disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Signature@*<span style="color: blue;">&nbsp;&nbsp; <i class="fas fa-sync" id="api_signature_refresh" onclick="fnReqSignature()"></i></span>*@</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_signature" disabled>
                                            </div>
                                        </div>
                                        <!--<div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Token</label>
                                                <textarea id="apip_tool_token" class="form-control" style="margin: 0px; width: 100%; color: black; font-size: 12px; height: 100px;" disabled></textarea>-->
                                        @*<input type="text" class="form-control form-control-sm" id="apip_tool_token">*@
                                        <!--</div>
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" modal-footer">
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="modal" id="modal_digest" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage Digest@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="digest">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Generate Digest</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Body</label>
                                            <textarea id="apip_get_digest" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;height:380px;"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_digest_btn" type="button" onclick="fnGetdigest()"><i class="fas fa-search"></i>&nbsp;Send</button>
                                    <button type="button" data-dismiss="modal" class="btn btn-danger btn-xs" onclick="">&nbsp;Close</button>
                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="modal" id="modal_generatesignature" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Get Signature@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="digest">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Generate Signature</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Algorithm</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_sig_algorithm">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Endpoint</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_sig_endpoint">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Signature Secert Key</label>
                                                <input type="text" class="form-control form-control-sm" id="apip_tool_sig_secert">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-6">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Body</label>
                                                <textarea id="apip_tool_sig_body" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;height:380px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_sig_btn" type="button" onclick="fnGetsignature()"><i class="fas fa-search"></i>&nbsp;Send</button>
                                    <button type="button" data-dismiss="modal" class="btn btn-danger btn-xs" onclick="">&nbsp;Close</button>
                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="modal" id="modal_view_service" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Manage User Transaction Monitor@*<span style="color: Red;font-family:'Khmer OS Battambang';">   បម្រាម: ​បើ Endpoint ដែលអ្នកបញ្ខូលថ្មីមិនទាន់​​ត្រឹមត្រូវ ១០០% សូមជ្រើសរើស column Status (U)​</span>*@
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12" id="User_Service_Map">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> User Transaction Monitor</span>
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
                                            <label>USER ID <span style="color: Red; font-family:KH"> *</span></label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm" id="apip_user_view_service">
                                                <div class="input-group-append">
                                                    <button id="Search_btn_user" class="btn btn-primary btn-xs" type="button" onclick="SearchUserViewService()"><i class="fas fa-search"></i>&nbsp;Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Service ID&nbsp;<span style="color:red;">*</span></label>
                                            <select size="15" data-placeholder="Choose Modules" id="user_service_mapping" multiple class="form-control form-control-sm" style="width: 100%; height: 300px;">
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_service_btn_submit" type="button" onclick="apip_service_fn_submit()"><i class="fas fa-arrow-down"></i>&nbsp;Save</button>

                                </div>
                            </div>
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12" id="listing_service_mapping">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Listing User Transaction Monitor</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table id="api_parameter_tbl_service_mapping" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th noraw>Service ID</th>
                                                    <th noraw>Service Name</th>
                                                    <th noraw>User ID</th>
                                                    <th noraw>User Name</th>
                                                    <th noraw>Record Status</th>
                                                    <th noraw>Created By</th>
                                                    <th noraw>Created Date</th>
                                                    <th noraw>Modifired By</th>
                                                    <th noraw>Modifired Date</th>
                                                    <th noraw></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="api_parameter_refresh_list_service_mapping" type="button" onclick="fnAPIPRefreshServiceMap()"><i class="fa fa-sync"></i> Refresh</button>
                                    <button class="btn btn-primary btn-xs" type="button" onclick="apiu_service_export_csv()"><i class="fas fa-arrow-down"></i>&nbsp;Export</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="fnAPIUClose()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
