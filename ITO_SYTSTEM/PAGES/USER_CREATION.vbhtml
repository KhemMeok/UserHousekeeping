<div id="USER_CREATION" class="tab-pane">
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
                                <a href="javascript:UmtUcFnNewInit()" class="dropdown-item" style="color:black;">New</a>
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
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" id="umt_uc_user_id" class="form-control form-control-sm" placeholder="Enter User ID" onkeydown="UmtUcFnSearchEnter(event)" />
                                        <div class="input-group-append">
                                            <button class="btn btn-primary btn-xs" type="button" onclick="UmtUcFnSearchUser()"><i class="fas fa-search"></i>&nbsp;Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12" style="margin-top:10px;">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Fullname&nbsp;<span style="color:red;">*</span></label>
                                        <input id="umt_uc_fullname" type="text" class="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Position&nbsp;<span style="color:red;">*</span></label>
                                        <input id="umt_uc_position" type="text" class="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Email&nbsp;<span style="color:red;">*</span></label>
                                        <input id="umt_uc_email" type="text" class="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Password&nbsp;<span style="color:red;">*</span></label>
                                        <input id="umt_uc_password" type="password" class="form-control form-control-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Request Date&nbsp;<span style="color:red;">*</span></label>
                                        <input id="umt_uc_req_date" type="text" class="form-control form-control-sm" />
                                    </div>
                                </div>


                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Access API&nbsp;<span style="color:red;">*</span></label>
                                        <select id="umt_acc_api_selete" onchange="accessAPIEnable()" onvolumechange="accessAPIEnable()" class="form-control form-control-sm">
                                            <option value="Y">Yes</option>
                                            <option value="N" selected="selected">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-3" id="div_project">
                                    <div class="form-group">
                                        <label>Project&nbsp;<span style="color:red;">*</span></label>
                                        <select disabled style="width:100%;" data-placeholder="Choose Project" id="umt_project_selete" class="form-control form-control-sm">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-3" id="div_ldap">
                                    <div class="form-group">
                                        <label>Allow LDAP&nbsp;<span style="color:red;">*</span></label>
                                        <select disabled style="width: 100%;  " id="umt_allow_ldap" class="form-control form-control-sm">
                                            <option value="Y" selected="selected">Yes</option>
                                            <option value="N">No</option>
                                        </select>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Moduls&nbsp;<span style="color:red;">*</span></label>
                                <select size="15" data-placeholder="Choose Modules" id="umt_uc_module" multiple class="form-control form-control-sm" style="width: 100%; height:250px" onchange="moduleChange()">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6" id="umt_end_point_action_div">
                            <div class="form-group">
                                <label>End Point Role&nbsp;<span style="color:red;">*</span></label>
                                <select size="15" data-placeholder="Choose Modules" id="umt_uc_end_point_role" multiple class="form-control form-control-sm" style="width: 100%; height:250px" onchange=" fnEndPointActionChange()">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12" id="umt_end_point_div">
                            <div class="form-group">
                                <label for="text"> End Point&nbsp;<span style="color:red;">*</span></label>
                                <select size="15" disabled data-placeholder="Choose Modules" multiple class="form-control form-control-sm" style="width: 100%; height:250px" id="umt_end_point" onchange="fnGetEndPointSelected()">
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="umt_uc_btn_create_user" type="button" class="btn btn-primary btn-xs" onclick="UmtCreateUserDialog()"><i class="fas fa-edit"></i>&nbsp;Create</button>
                        <button style="display:none;" id="umt_uc_btn_update_user" type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('update')"><i class="fas fa-user-edit"></i>&nbsp;Update</button>
                        <button style="display:none;" id="umt_uc_btn_update_cancel" type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnNewInit()"><i class="fas fa-times"></i>&nbsp;Cancel</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
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
                        <div class="col-sm-12 table-responsive" id="DIV_TBL_ACL_APP_CONTROL">
                            <table cellpadding="0" cellspacing="0" id="umt_uc_listing_tbl"
                                   class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="UmtGetAllUserList('Y')"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnGetUserDataForUpdate('UPDATE')"><i class="fas fa-user-edit"></i>&nbsp;Update</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('activate')"><i class="fas fa-user-check"></i>&nbsp;Activate</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('deactivate')"><i class="fas fa-user-times"></i>&nbsp;Deactivate</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('enable_debug')"><i class="fas fa-align-left"></i>&nbsp;Enable Debug</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('disable_debug')"><i class="fas fa-align-left"></i>&nbsp;Disable Debug</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="modals.Open('modalResetPwd');element.inputValue('umt_uc_reset_pwd', '');"><i class="fas fa-key"></i>&nbsp;Reset Password</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('unlock')"><i class="fas fa-unlock-alt"></i>&nbsp;Unlock</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('enable_mail_setup')"><i class="fas fa-mail-bulk"></i>&nbsp;Enable Email Setup</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('disable_mail_setup')"><i class="fas fa-mail-bulk"></i>&nbsp;Disable Email Setup</button>
                        <button type="button" class="btn btn-danger btn-xs" onclick="UmtUcFnUpdateDialog('delete')"><i class="fas fa-trash-alt"></i>&nbsp;Delete</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="umtOpenModalSendSMS()"><i class="fas fa-envelope"></i> Set Message</button>                
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    <div class="modal" id="modalResetPwd">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Reset Password
                </div>
                <div class="modal-body text-center">
                    <input type="password" class="form-control form-control-sm" id="umt_uc_reset_pwd" placeholder="Enter Password" />
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="UmtUcFnUpdateDialog('reset_pwd')">
                        Go
                    </button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalSendMessage">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Set Message
                </div>
                <div class="modal-body">
                    <textarea style="height:1000px;" id="umt_uc_sms_txt"></textarea>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="umtSetMessage()"><i class="fas fa-share-square"></i> Set</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    
    </div>
