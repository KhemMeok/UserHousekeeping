<div id="API_END_POINT" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i>  Add New End Point</span>
                    <div class="card-tools">
                        <div class="btn-group">
                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-wrench"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <a class="dropdown-divider"></a>
                                <a href="javascript:fnClearNewEndPoint()" class="dropdown-item" style="color:black;">New</a>
                            </div>
                        </div>
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label>Project&nbsp;<span style="color:red;">*</span></label>
                                <select id="umt_new_end_point_project_select" data-placeholder="Choose Project" class="form-control form-control-sm" style="width: 100%;" onchange="fnApplyModuleAndSubModule()">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group" id="id_module">
                                <label>Moduls&nbsp;<span style="color:red;">*</span></label>
                                <select data-placeholder="Choose Modules.." id="umt_new_end_point_module_select" class="form-control form-control-sm" style="width:100%" onchange="fnSystemModuleSelect('add')">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group" id="id_sub_module">
                                <label>Sub Moduls&nbsp;<span style="color:red;">*</span></label>
                                <select data-placeholder="Choose Sub Modules.." id="umt_new_end_point_sys_sub_module" class="form-control form-control-sm" style="width:100%">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label>Required Encrypt&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" id="umt_new_end_point_required_encrypt" class="form-control form-control-sm">
                                    <option value="Y">Yes</option>
                                    <option value="N" selected="selected">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label>End Point Role&nbsp;<span style="color:red;">*</span></label>
                                <select data-placeholder="Choose Action.." id="umt_new_end_point_url_action" class="form-control form-control-sm" style="width:100%">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="form-group">
                                <label>End Point&nbsp;<span style="color:red;">*</span></label>
                                <input title="The URL must be start with http:// or https://"
                                       size="15" type="url"
                                       required placeholder="http://exampleURL"
                                       id="umt_new_end_point_add_new_end_point"
                                       class="form-control form-control-sm"
                                       style="width:100%"
                                       list="defaultURLs" />
                                <datalist id="defaultURLs">
                                    <option value="https://"></option>
                                    <option value="http://"></option>
                                </datalist>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" id="umt_uc_add_new_end_point" class="btn btn-primary btn-xs" onclick="fnAddNewEndPoint()"><i class="fas fa-save"></i> Save</button>
                        <button style="display:none;" id="umt_new_end_point_btn_update_end_point" type="button" class="btn btn-primary btn-xs" onclick=""><i class="fas fa-link"></i>&nbsp;Update</button>
                        <button style="display:none;" id="umt_new_end_point_btn_update_cancel" type="button" class="btn btn-danger btn-xs"><i class="fas fa-times"></i>&nbsp;Cancel</button>
                    </div>
                </div>
            </div>
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> End Point Listing</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Module&nbsp;</label>
                                <select id="umt_new_end_point_filter_mudule" multiple="multiple" data-placeholder="Choose module filter" class="form-control form-control-sm" style="width: 100%; height: 10px;" onchange="fnSystemModuleSelect('filter')">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Sub Module&nbsp;</label>
                                <select id="umt_new_end_point_filter_sub_mudule" multiple="multiple" data-placeholder="Choose Sub module filter" class="form-control form-control-sm" style="width: 100%; height: 10px;">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Range Value date</label>
                                <input type="text" class="form-control form-control-sm" id="umt_new_end_point_date_filter" ondblclick="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 table-responsive">
                            <table id="umt_end_point_data_table" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" style="margin-left:50%;" id="umt_end_point_data_table_ck_selectall"></th>
                                        <th>ID</th>
                                        <th>Main Module</th>
                                        <th>Sub Modules</th>
                                        <th>Project</th>
                                        <th>End Point URL</th>
                                        <th>Role</th>
                                        <th>Created Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnRefreshEndPoint()"><i class="fas fa-sync"></i> Refresh</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnFilterEndPoint()"><i class="fas fa-search"></i> Query</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnEditEndPoint()"><i class="fas fa-link"></i> Edit</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="fnDeleteEndPointHandle()"><i class="fas fa-trash-alt"></i> Delete</button>
                    </div>
                </div>
            </div>
    </div>   
    </div>
</div>


