<div id="OS_PASSWORD_GENERATION" class="tab-pane">
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
                                <a href="javascript:OsPwdFnClearAll()" class="dropdown-item" style="color:black;">New</a>
                            </div>
                            <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-2" id="divSysType">
                                <div class="form-group">
                                    <label>System Type&nbsp;<span style="color:red;">*</span></label>
                                    <select data-placeholder="Choose System Type.." style="width:100%;" id="os_pwd_system_type_select" class="form-control form-control-sm" onchange="OsPwdFnSystemTypeSelect()"></select>
                                </div>
                            </div>
                            <div class="col-sm-2" id="divSite">
                                <div class="form-group">
                                    <label>Site&nbsp;<span style="color:red;">*</span></label>
                                    <select data-placeholder="Choose Site.." id="os_pwd_site_select" style="width:100%;" type="text" class="form-control form-control-sm" onchange="OsPwdFnSiteChange()">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2" id="divEnv">
                                <div class="form-group">
                                    <label>Environment&nbsp;<span style="color:red;">*</span></label>
                                    <select data-placeholder="Choose Environment.." id="os_pwd_Env_select" style="width:100%;" type="text" class="form-control form-control-sm" onchange="OsPwdFnEnvSelect()">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2" id="divPla">
                                <div class="form-group">
                                    <label for="os_pwd_platform_select">OS Platform&nbsp;<span style="color:red;">*</span></label>
                                    <select data-placeholder="Choose Platform.." id="os_pwd_platform_select" style="width:100%;" type="text" class="form-control form-control-sm" onchange="OsPwdFnOSPlatformSelect()">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label>Effective Date&nbsp;<span style="color:red;">*</span></label>
                                    <input id="os_pwd_date_input" type="text" class="form-control form-control-sm" />
                                </div>
                            </div>
                            <div class="col-sm-2">
                                @* <div class="form-group"> *@
                                <label>Password&nbsp;<span style="color:red;">*</span></label>
                                <div class="input-group">
                                    <input id="os_user_password_password_input" type="password" class="form-control form-control-sm" onmouseover="OsPwdFnAddEventToInput('over')" onmouseout="OsPwdFnAddEventToInput('out')" oninput="OsPwdCheckPasswordStrength()" />
                                    <div class="input-group-append">
                                        <button onclick="applypassword()" class="btn btn-primary btn-xs" type="button">&nbsp;<i class="fa fa-plus"></i>&nbsp;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" >
                            <div class="col-sm-6" id="divHostName">
                                <div class="form-group">
                                    <label>Host Name&nbsp;<span style="color:red;">*</span></label>
                                    <select size="15" data-placeholder="" id="os_pwd_host_name_list" multiple="multiple" class="form-control form-control-sm" style="height:200px; width:100%" onchange="OsPwdFnHostSelect()">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6" id="divUser">
                                <div class="form-group">
                                    <label>User&nbsp;<span style="color:red;">*</span></label>
                                    <select size="15" data-placeholder="Choose Modules.." id="os_pwd_user_list" multiple="multiple" class="form-control form-control-sm" style="height:200px; width:100%" onchange="OsPwdFnCheckHostAndUserExistHandel('new')">
                                    </select>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="os_user_password_insert" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-primary btn-xs" onclick="OsPwdFnInsertRecordHandle('insert')"><i class="fas fa-save"></i>&nbsp; Save</button>
                        <button id="os_user_password_update" style="display: none; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-success btn-xs" onclick="OsPwdFnUpdateRecordHandle('update')"><i class="fas fa-edit"></i>&nbsp; Update</button>
                        <button id="os_user_password_clear" style=" display: none; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-danger btn-xs" onclick="OsPwdFnClearAll()"><i class="fas fa-times"></i>&nbsp; Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Listing</span>
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
                                <label>Site</label>
                                <select id="os_user_password_site_filter" onchange="OsPwdFnFilterBySite()" data-placeholder="Choose filter" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label>Environment</label>
                                <select id="os_user_password_env_filter" onchange="OsPwdFnFilterByEnv()" data-placeholder="Choose filter" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label>Os Platform</label>
                                <select id="os_user_password_platform_filter" onchange="OsPwdFnFilterByOsPlatform()" data-placeholder="Choose filter" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 table-responsive" id="#">
                            <table id="os_user_password_table_listing" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" style="margin-left:50%;" id="os_user_password_table_listing_ck_selectall"></th>
                                        <th>Id</th>
                                        <th>Effective Date</th>
                                        <th>Host Name</th>
                                        <th>User Name</th>
                                        <th>Site</th>
                                        <th>Staff ID</th>
                                        @*<th>Password <input  style="margin-top:5px;" id="os_user_password_table_listing_show_pwd" onclick="OsPwdHandleCheckboxClick()"></th>*@
                                        <th style="margin: 0 0 0 0; "> Password  <button type="button" onclick="OsPwdHandleButtonEyeClick()" id="os_user_password_table_listing_show_pwd" style="margin: 0 0 0 5px; color: black; border: none; background-color: white;"><i class="fa fa-eye-slash"></i></button></th>
                                        <th>OS Platform</th>
                                        <th>Environment</th>
                                        <th>Create By</th>
                                        <th>Last Update By</th>
                                        <th>Last Update Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="os_user_password_refresh" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-primary btn-xs" onclick="OsPwdFnRefreshDataTable()"><i class="fas fa-sync"></i>&nbsp; Refresh</button>
                        <button id="os_user_password_edit" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-success btn-xs" onclick="OsPwdFnConformGetDataForUpdate()"><i class="fas fa-edit"></i>&nbsp; Edit</button>
                        <button id="os_user_password_delete_record" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-danger btn-xs" onclick="OsPwdFnConformDeleteRecord()"><i class="fas fa-trash-alt"></i>&nbsp; Delete</button>
                        <button id="os_user_password_explore_to_server" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-primary btn-xs" onclick="OsPwdFnConformExploreRecord('P')"><i class="fas fa-upload"></i>&nbsp; Upload Data</button>
                        <button id="os_user_password_explore_to_server_uat" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-primary btn-xs" onclick="OsPwdFnConformExploreRecord('U')"><i class="fas fa-upload"></i>&nbsp; Upload Data UAT</button>
                        <button id="os_user_password_exclude_user" style="display:none; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" type="button" class="btn btn-primary btn-xs" onclick="OsPwdGenerateFnOpenModualExcludeUser()"><i class="fa fa-cog"></i>&nbsp; Exclude User</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalOsPwdGenerateExcludeUser" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Maintenance
                </div>
                <div class="modal-body" id="modal_body">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Operation</span>
                                <div class="card-tools">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                            <i class="fas fa-wrench"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right" role="menu">
                                            <a class="dropdown-divider"></a>
                                            <a href="javascript:OsPwdFnClearAllExcludeUser()" class="dropdown-item" style="color:black;">New</a>
                                        </div>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3" id="divSysTypeExclude">
                                        <div class="form-group">
                                            <label>System Type&nbsp;<span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose System Type.." style="width:100%;" id="os_pwd_system_type_exclude_select" class="form-control form-control-sm" onchange=""></select>
                                        </div>
                                    </div>
                                    <div class="col-sm-2" id="divSite">
                                        <div class="form-group">
                                            <label>Site&nbsp;<span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose Site.." style="width: 100%;" id="os_pwd_site_exclude_select" type="text" class="form-control form-control-sm" onchange="OsPwdFnSiteChange()">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-2" id="divEnv">
                                        <div class="form-group">
                                            <label>Environment&nbsp;<span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose Environment.." id="os_pwd_Env_exclude_select" style="width:100%;" type="text" class="form-control form-control-sm" onchange="OsPwdFnEnvSelect()">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-2" id="divPla">
                                        <div class="form-group">
                                            <label for="os_pwd_platform_select">OS Platform&nbsp;<span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose Platform.." id="os_pwd_platform_exclude_select" style="width:100%;" type="text" class="form-control form-control-sm" onchange="OsPwdFnOSPlatformSelect()">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3" id="">
                                        <div class="form-group">
                                            <label for="os_pwd_platform_select">Exclude Type&nbsp;<span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose type.." id="os_pwd_exclude_type_select" style="width:100%;" type="text" class="form-control form-control-sm" onchange="">
                                                 
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="divUser">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Host Name&nbsp;<span style="color:red;">*</span></label>
                                            <select size="15" data-placeholder="" id="os_pwd_host_name_exclude_list" multiple="multiple" class="form-control form-control-sm" style="height:200px; width:100%" onchange="OsPwdFnHostSelect()">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>User&nbsp;<span style="color:red;">*</span></label>
                                            <select size="15" data-placeholder="Choose Modules.." id="os_pwd_user_exclude_list" multiple="multiple" class="form-control form-control-sm" style="height:200px; width:100%" onchange="OsPwdFnCheckHostAndUserExistHandel('new')">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="" type="button"
                                            onclick="OsPwdFnInsertRecordHandle('insert')">
                                        <i class="fas fa-edit"></i> Save
                                    </button>
                                    <button class="btn btn-success btn-xs" style="display:none"
                                            id="rpt_doc_mgt_update_btn" type="button" onclick="">
                                        <i class="fas fa-edit"></i>
                                        Update
                                    </button>
                                    <button class="btn btn-danger btn-xs" style="display:none"
                                            id="rpt_doc_mgt_cancel_btn" type="button" onclick="">
                                        <i class="fas fa-times"></i> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> User exclude Listing</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool"
                                            data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="col-sm-12 table-responsive">
                                            <table id="osPwdTbListingUserExclude" cellpadding="0"
                                                   cellspacing="0"
                                                   class="display nowrap compact table table-bordered table-hover table-sm"
                                                   style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <input type="checkbox"
                                                                   style="margin-top:5px;margin-left:50%;"
                                                                   id="osPwdTbListingUserExclude_ck_selectall">
                                                        </th>
                                                        <th noraw>No</th>
                                                        <th noraw>Host Name</th>
                                                        <th noraw>User Name</th>
                                                        <th noraw>Exclude Type</th>
                                                        <th noraw>Site</th>
                                                        <th noraw>Environment</th>
                                                        <th noraw>Staff Id</th>
                                                        <th noraw>Os Platform</th>
                                                        <th noraw></th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <!--End card listing-->
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs"
                                            id="" type="button"
                                            onclick="OsPwdFnGetUserExclude()">
                                        <i class="fa fa-sync"></i> Refresh
                                    </button>
                                    <button class="btn btn-danger btn-xs"
                                            id="" type="button"
                                            onclick="OsPwdFnDeleteUserExclude()">
                                        <i class="fa fa-trash"></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal" onclick="OsPwdFnCloseModual()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div></div>