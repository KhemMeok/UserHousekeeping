<div id="USER_PROFILE" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fas fa-user-circle"></i> My Profile</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 p-0 border-bottom-0">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#up_change_pwd" role="tab" onclick="userProfileTabSwitch('change_pwd')"><i class="fas fa-key"></i>&nbsp;Change Password</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#up_email_settup" role="tab" onclick="userProfileTabSwitch('mail_setup');fnUserFetchEmail()"><i class="fas fa-mail-bulk"></i>&nbsp;Email Setup</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-sm-12" style="margin-top:10px;">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="up_change_pwd" role="tabpanel">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Current&nbsp;<span style="color:red;">*</span></label>
                                                    <input type="password" id="up_in_curr_pwd" class="form-control form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>New&nbsp;<span style="color:red;">*</span></label>
                                                    <input type="password" id="up_in_new_pwd" class="form-control form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Re-type new&nbsp;<span style="color:red;">*</span></label>
                                                    <input type="password" id="up_in_re_type_pwd" class="form-control form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="up_email_settup" role="tabpanel">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="alert alert-info alert-dismissible">
                                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                <strong>Info!</strong> Email Settup section currently is avialable for Data Entry (DE) Modul only. The email setup, user can only done by one time only if you want to re-setup please contact ISA Department to allow.
                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <div class="callout callout-info">
                                                <div class="media">
                                                    <div class="media-body">
                                                        <strong>Your Email</strong>
                                                        <div class="media p-3">
                                                            <div class="media-body">
                                                                <div class="col-sm-12">
                                                                    <div class="col-sm-4">
                                                                        <input type="email" readonly="readonly" id="up_user_email" class="form-control form-control-sm" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-12" style="margin-top:10px;">
                                                                    <div class="col-sm-4">
                                                                        <div class="form-group">
                                                                            <div class="icheck-primary d-inline">
                                                                                <input type="checkbox" id="up_email_ck_status" class="form-control form-control-sm" />
                                                                                <label for="up_email_ck_status">Enable</label>
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
                                        <div class="col-sm-6">
                                            <div class="callout callout-info">
                                                <div class="media">
                                                    <div class="media-body">
                                                        <strong>Data Entry Uploader (To)</strong>
                                                        <div class="media p-3">
                                                            <div class="media-body">
                                                                <div class="col-sm-12">
                                                                    <select style="width:100%;" multiple="multiple" id="up_email_uploader_to" class="form-control form-control-sm">
                                                                        
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="callout callout-info">
                                                <div class="media">
                                                    <div class="media-body">
                                                        <strong>Data Entry Uploader (CC)</strong>
                                                        <div class="media p-3">
                                                            <div class="media-body">
                                                                <div class="col-sm-12">
                                                                    <select style="width:100%;" multiple="multiple" id="up_email_uploader_cc" class="form-control form-control-sm">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="callout callout-info">
                                                <div class="media">
                                                    <div class="media-body">
                                                        <strong>Data Entry Authorizer (To)</strong>
                                                        <div class="media p-3">
                                                            <div class="media-body">
                                                                <div class="col-sm-12">
                                                                    <select style="width:100%;" multiple="multiple" id="up_email_authorizer_to" class="form-control form-control-sm">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="callout callout-info">
                                                <div class="media">
                                                    <div class="media-body">
                                                        <strong>Data Entry Authorizer (CC)</strong>
                                                        <div class="media p-3">
                                                            <div class="media-body">
                                                                <div class="col-sm-12">
                                                                    <select style="width:100%;" multiple="multiple" id="up_email_authorizer_cc" class="form-control form-control-sm">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="callout callout-info">
                                                <div class="media">
                                                    <div class="media-body">
                                                        <strong>Data Entry to inform (Management)</strong>
                                                        <div class="media p-3">
                                                            <div class="media-body">
                                                                <div class="col-sm-12">
                                                                    <select style="width:100%;" multiple="multiple" id="up_email_inform" class="form-control form-control-sm">
                                                                    </select>
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
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" id="btn_up_change_pwd" type="button" onclick="fnUserChangeCurrentPwd()"><i class="fa fa-key"></i>&nbsp;Change</button>
                        <button class="btn btn-primary btn-xs" style="display:none" id="btn_up_save_email" type="button" onclick="fnUserUpdateEmail()"><i class="fa fa-save"></i>&nbsp;Save</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
</div>