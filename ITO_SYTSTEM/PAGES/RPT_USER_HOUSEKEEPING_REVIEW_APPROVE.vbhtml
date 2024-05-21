<div id="RPT_USER_HOUSEKEEPING_REVIEW_APPROVE" class="tab-pane">
    <div class="col-sm-12">
        <div class="card card-primary card-outline card-outline-tabs">
            <div class="card-header p-0 border-bottom-0">
                <ul class="nav nav-tabs" role="tablist">

                    <li class="nav-item">
                        <a class="nav-link"
                           data-toggle="pill"
                           href="#rpt_bi_inactive_listing_tab"
                           @*onclick="fn_tab_change_user_housekeeping('bi_hkp_listing_tab')"*@
                           role="tab">
                            BI User HouseKeeping Listing
                            <span id="" class="badge badge-danger right">1</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           data-toggle="pill"
                           href="#rpt_db_user_hkp_listing_tab"
                           @*onclick="fn_tab_change_user_housekeeping('db_listing_tab')"*@
                           role="tab">
                            DB User Housekeeping Listing
                            <span id="" class="badge badge-danger right">1</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="user_housekeeping_report_date_sc_re_ap">Report Date</label>
                                    <input type="text" id="user_housekeeping_report_date_sc_re_ap" onchange=""
                                           class="form-control form-control-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                        <div class="tab-pane fade show active"
                             id="rpt_bi_inactive_listing_tab"
                             role="tabpanel">
                            <div class="row">
                                <div class="table-responsive">
                                    <table id="rpt_bi_inactive_review_listing_review"
                                           cellpadding="0"
                                           cellspacing="0"
                                           class="display nowrap compact table table-bordered table-hover table-sm"
                                           style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox"
                                                           style="margin-left: 50%"
                                                           id="rpt_bi_inactive_listing_ck_selectall" />
                                                </th>
                                                <th nowrap>No</th>
                                                <th nowrap>Status</th>
                                                <th nowrap>Branch Code</th>
                                                <th nowrap>User ID</th>
                                                <th nowrap>User Name</th>
                                                <th nowrap>Created Date</th>
                                                <th nowrap>Last Signed</th>
                                                <th nowrap>Num Last Signed</th>
                                                <th nowrap>Report Date</th>
                                                <th nowrap>Review Date</th>
                                                <th nowrap>Remarks</th>
                                                <th nowrap></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade"
                             id="rpt_db_user_hkp_listing_tab"
                             role="tabpanel">
                            <div class="row">
                                <div class="table-responsive">
                                    <table id="tb_listing_db_hkp"
                                           cellpadding="0"
                                           cellspacing="0"
                                           class="display nowrap compact table table-bordered table-hover table-sm"
                                           style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox"
                                                           style="margin-left: 50%"
                                                           id="tb_listing_db_hkp_ck_selectall" />
                                                </th>
                                                <th nowrap>No</th>
                                                <th nowrap>Staff ID</th>
                                                <th nowrap>Staff Name</th>
                                                <th nowrap>DB Username</th>
                                                <th nowrap>Current Status</th>
                                                <th nowrap>Create Date</th>
                                                <th nowrap>Last Login</th>
                                                <th nowrap>Inserted Date</th>
                                                <th nowrap>Inactive Days</th>
                                                <th nowrap>DB Name</th>
                                                <th nowrap>Status</th>
                                                <th nowrap>User Role</th>
                                                <th nowrap>Remarks</th>
                                                <th nowrap></th>
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
                    @*button*@
                    <button id="RptBIHkpAuthBTN" style="color: white; font-family: 'Segoe UI'" class="btn btn-primary btn-xs"
                            type="button"
                            @* onclick="RptUserHkpFnAuthorizeRequest('biUserInform')" *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('auth')">
                        <i class="fa fa-check"></i>&nbsp;Authorize
                    </button>
                    <button id="RptBIHkpRejectBTN" style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-danger btn-xs" type="button"
                            @* onclick="RptBIHkpFnAuthorizeBIInactive('R')" *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('reject')">
                        <i class="fa fa-times" style="color: white"></i>&nbsp;Reject
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>