<div id="RPT_USER_HOUSEKEEPING_OPERATION" class="tab-pane">
    <div class="col-sm-12">
        <div class="card card-primary card-outline card-outline-tabs">
            <div class="card-header p-0 border-bottom-0">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active"
                           data-toggle="pill"
                           href="#href_tab_id_bi_housekeeping"
                           onclick="fn_tab_change_user_housekeeping('bi_tab')"
                           role="tab">
                            BI User HouseKeeping
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           data-toggle="pill"
                           href="#href_tab_id_db_housekeeping"
                           onclick="fn_tab_change_user_housekeeping('db_tab')"
                           role="tab">
                            DB User Housekeeping
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <div class="tab-pane fade show active"
                         id="href_tab_id_bi_housekeeping"
                         role="tabpanel">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="card h-100">
                                    <div class="card-header" style="padding-top: 0px">
                                        <span class="card-title" style="padding-top: 5px">Operation</span>
                                        <div class="card-tools">
                                            <div class="btn-group">
                                                <button type="button"
                                                        class="btn btn-tool dropdown-toggle"
                                                        data-toggle="dropdown">
                                                    <i class="fas fa-wrench"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right"
                                                     role="menu">
                                                    <a class="dropdown-divider"></a>
                                                    <a href="javascript:fn_clear_all_by_tab_user_housekeeping('BI')"
                                                       class="dropdown-item"
                                                       style="color: black">New</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="bi_date_report_ele_id">
                                                        Report Date
                                                    </label>
                                                    <input type="text"
                                                           id="bi_date_report_ele_id"
                                                           onchange="fn_tab_change_user_housekeeping('bi_tab')"
                                                           class="form-control form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <div class="card-title">Process</div>
                                    </div>
                                    <div class="card-body table-responsive">
                                        <table id="de_posting_tbl_process" class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th nowrap># Process Name</th>
                                                    <th nowrap></th>
                                                    <th nowrap># User Count</th>
                                                    <th nowrap># Status</th>
                                                    <th nowrap># Message</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr id="">
                                                    <td nowrap>Updated BI Users Status</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_update_user_status_bi_housekeeping">
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_update_user_status_bi_housekeepingCheck">
                                                            <i id="icon_status_update_user_status_bi_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a style="display: none"
                                                               id="icon_ms_update_user_status_bi_user_housekeeping"
                                                               href="javascript:modals.Open('modual_ms_update_user_status_bi_housekeeping')"
                                                               onclick="user_housekeeping_fn_bi_update_status_tab_select()">
                                                                <i class="far fa-envelope fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr id="">
                                                    <td nowrap>Updated BI Users Email</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_update_user_email_bi_housekeeping">
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_update_user_email_bi_housekeepingCheck">
                                                            <i id="icon_status_update_user_email_bi_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a style="display: none"
                                                               id="icon_ms_update_user_email_bi_user_housekeeping"
                                                               href="javascript:modals.Open('modual_ms_update_user_email_bi_housekeeping')">
                                                                <i class="far fa-envelope fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr id="">
                                                    <td nowrap>Pulled Last Login Users</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_ms_pull_last_login_bi_housekeeping">
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_ms_pull_last_login_bi_housekeepingCheck">
                                                            <i id="icon_status_pull_last_login_bi_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a style="display: none"
                                                               id="icon_ms_pull_last_login_user_bi_user_housekeeping"
                                                               href="javascript:modals.Open('modual_ms_pull_last_login_bi_housekeeping')">
                                                                <i class="far fa-envelope fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr id="">
                                                    <td nowrap>Generated BI User Housekeeping</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_get_bi_user_housekeeping"> </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_get_bi_user_housekeepingCheck">
                                                            <i id="icon_status_get_bi_user_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a style="display: none"
                                                               id="icon_ms_get_bi_user_housekeeping"
                                                               title="Detail Generate BI HouseKeeping"
                                                               href="javascript:modals.Open('modual_ms_get_bi_hosekeeping')"
                                                               onclick="user_housekeeping_fn_bi_user_housekeeping_tab_select()">
                                                                <i class="far fa-envelope fa-lg fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr id="">
                                                    <td nowrap>Generated BI User Deletion</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_get_bi_user_deletion_bi_housekeeping">
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <i id="icon_status_get_bi_deletion_bi_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a style="display: none"
                                                               id="icon_ms_get_bi_user_deletion_bi_housekeeping"
                                                               title="Detail Generate BI User Deletion"
                                                               href="javascript:modals.Open('modual_ms_get_bi_deletion_bi_housekeeping')"
                                                               onclick="user_housekeeping_fn_bi_user_deletion_tab_select()">
                                                                <i class="far fa-envelope fa-lg fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show"
                         id="href_tab_id_db_housekeeping"
                         role="tabpanel">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="card h-100">
                                    <div class="card-header" style="padding-top: 0px">
                                        <span class="card-title" style="padding-top: 5px">Operation</span>
                                        <div class="card-tools">
                                            <div class="btn-group">
                                                <button type="button"
                                                        class="btn btn-tool dropdown-toggle"
                                                        data-toggle="dropdown">
                                                    <i class="fas fa-wrench"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right"
                                                     role="menu">
                                                    <a class="dropdown-divider"></a>
                                                    <a href="javascript:fn_clear_all_by_tab_user_housekeeping('DB')"
                                                       class="dropdown-item"
                                                       style="color: black">New</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="db_date_report_id">Report Date</label>
                                                    <input type="text"
                                                           id="db_date_report_id"
                                                           onchange="fn_tab_change_user_housekeeping('db_tab')"
                                                           class="form-control form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <div class="card-title">Process</div>
                                    </div>
                                    <div class="card-body table-responsive">
                                        <table id="de_posting_tbl_process" class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th nowrap># Process name</th>
                                                    <th nowrap></th>
                                                    <th nowrap># Process count</th>
                                                    <th nowrap># Process status</th>
                                                    <th nowrap># Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr id="">
                                                    <td nowrap>User Inform</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_user_inform_db_housekeeping"> </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_user_inform_db_housekeepingStatus">
                                                            <i id="icon_status_user_inform_db_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a id="icon_ms_user_inform_db_user_housekeeping"
                                                               href="javascript:modals.Open('modual_ms_user_inform_db_housekeeping')">
                                                                <i class="far fa-envelope fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr id="">
                                                    <td nowrap>User Remove</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_user_remove_db_housekeeping"> </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="dbHkpUserRemoveCheck">
                                                            <i id="icon_status_user_remove_db_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a id="icon_ms_user_remove_db_user_housekeeping"
                                                               href="javascript:modals.Open('modual_ms_user_remove_db_housekeeping')">
                                                                <i class="far fa-envelope fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr id="">
                                                    <td nowrap>Total User</td>
                                                    <td nowrap>:</td>
                                                    <td nowrap colspan="1">
                                                        <span id="td_total_user_db_housekeeping"> </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id=" dbHkpTotalUserCheck">
                                                            <i id="icon_status_total_user_db_housekeeping"></i>
                                                        </span>
                                                    </td>
                                                    <td nowrap colspan="1">
                                                        <span id="">
                                                            <a id="icon_ms_total_user_db_housekeeping"
                                                               href="javascript:modals.Open('modual_ms_total_user_db_housekeeping')">
                                                                <i class="far fa-envelope fa-lg"></i>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="flex-container">
                    <button id="RptBIHkpGenDBHkpBtn"
                            class="btn btn-primary btn-xs"
                            type="button"
                            style="display: none"
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('db_get_user_housekeeping')">
                        <i id="" class="fas fa-sync"></i>
                        &nbsp;DB Housekeeping
                    </button>
                </div>
                <div class="flex-container">
                    <button id="RptBIHkpGenRptBIHkpBtn"
                            class="btn btn-primary btn-xs"
                            type="button"
                            style="display: none"
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('gen_bi_inactive')">
                        <i id="" class="fas fa-sync"></i>
                        &nbsp;Job Process BI Housekeeping
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--</div>
       </div>
             </div>
          </div>
      </div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fa fa-list-alt"></i> Report Listing</span>
                <div class="card-tools">
                    <button title="Minimize"
                            type="button"
                            class="btn btn-tool"
                            data-card-widget="collapse">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rang_date_id_user_housekeeping">Report Date</label>
                                <input type="text"
                                       id="rang_date_id_user_housekeeping"
                                       onchange=""
                                       class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card card-primary card-outline card-outline-tabs">
                            <div class="card-header p-0 border-bottom-0">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link"
                                           data-toggle="pill"
                                           href="#rpt_bi_update_status_listing_tab"
                                           role="tab"
                                           onclick="fn_tab_change_user_housekeeping('bi_update_status_tab')">
                                            BI User Update Status Listing
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link"
                                           data-toggle="pill"
                                           href="#rpt_bi_inactive_listing_tab"
                                           onclick="fn_tab_change_user_housekeeping('bi_hkp_listing_tab')"
                                           role="tab">
                                            BI User HouseKeeping Listing
                                            <span id="" class="badge badge-danger right">1</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link"
                                           data-toggle="pill"
                                           href="#rpt_bi_deletion_listing_tab"
                                           onclick="fn_tab_change_user_housekeeping('bi_deletion_tab')"
                                           role="tab">
                                            BI User Deletion Listing
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link"
                                           data-toggle="pill"
                                           href="#rpt_db_user_hkp_listing_tab"
                                           onclick="fn_tab_change_user_housekeeping('db_listing_tab')"
                                           role="tab">
                                            DB User Housekeeping Listing
                                            <span id="" class="badge badge-danger right">1</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="tab-pane fade show active"
                                         id="rpt_bi_update_status_listing_tab"
                                         role="tabpanel">
                                        <div class="row">
                                            <div class="table-responsive">
                                                <table id="rpt_bi_update_status_listing"
                                                       cellpadding="0"
                                                       cellspacing="0"
                                                       class="display nowrap compact table table-bordered table-hover table-sm"
                                                       style="width: 100%"></table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade show active"
                                         id="rpt_bi_inactive_listing_tab"
                                         role="tabpanel">
                                        <div class="row">
                                            <div class="table-responsive">
                                                <table id="rpt_bi_inactive_listing"
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
                                         id="rpt_bi_deletion_listing_tab"
                                         role="tabpanel">
                                        <div class="row">
                                            <div class="table-responsive">
                                                <table id="rpt_bi_deletion_listing"
                                                       cellpadding="0"
                                                       cellspacing="0"
                                                       class="display nowrap compact table table-bordered table-hover table-sm"
                                                       style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <input type="checkbox"
                                                                       style="margin-left: 50%"
                                                                       id="rpt_bi_deletion_listing_ck_selectall" />
                                                            </th>
                                                            <th>No</th>
                                                            <th>Branch Code</th>
                                                            <th>User ID</th>
                                                            <th>User Name</th>
                                                            <th>Request date</th>
                                                            <th>Created Date</th>
                                                            <th>Close Date</th>
                                                            <th>Status</th>
                                                            <th>Remarks</th>
                                                            <th>Branch Desc</th>
                                                            <th>Description</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    @*
                                        <div
                                          class="tab-pane fade"
                                          id="rpt_bi_user_pre_close_listing_tab"
                                          role="tabpanel"
                                        >
                                          <div class="row">
                                            <div class="table-responsive">
                                              <table
                                                id="table_listing_user_close"
                                                cellpadding="0"
                                                cellspacing="0"
                                                class="display nowrap compact table table-bordered table-hover table-sm"
                                                style="width: 100%"
                                              >
                                                <thead>
                                                  <tr>
                                                    <th>
                                                      <input
                                                        type="checkbox"
                                                        style="margin-left: 50%"
                                                        id="table_listing_user_close_ck_selectall"
                                                      />
                                                    </th>
                                                    <th nowrap>No</th>
                                                    <th nowrap>Staff Id</th>
                                                    <th nowrap>Staff Name</th>
                                                    <th nowrap>Close Type</th>
                                                    <th nowrap>Report Date</th>
                                                    <th nowrap>Position</th>
                                                    <th nowrap></th>
                                                  </tr>
                                                </thead>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                    *@
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
                        </div>
                        <!--End card listing-->
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="flex-container">
                    <button id="RptBIHkpRefreshBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            onclick="rpt_user_housekeeping_fn_refresh_listing()">
                        <i id="iconRefreshListing"
                           class="fas fa-sync"
                           style="color: white"></i>&nbsp;Refresh
                    </button>
                    <button id="RptBIHkpOperationBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            onclick="">
                        <i class="fas fa-pencil-alt" style="color: white"></i>&nbsp;Edit
                    </button>
                    <button id="RptBIHkpReqAuthBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            @*
            onclick="RptBIHkpFnReqAuthorizeBIInactive()"
            *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('req_auth')">
                        <i class="fa fa-paper-plane fa-flip"></i>&nbsp;Request Authorize
                    </button>
                    <!-- <button id="RptBIHkpAuthBTN" style="color: white; font-family: 'Segoe UI'" class="btn btn-primary btn-xs"
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
                              </button> -->
                    <button id="RptBIHkpSentMailInformBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            @*
            onclick="RptBIHkpFnSentEmailInformUserInactive('biInactive')"
            *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('inform')">
                        <i class="fa fa-paper-plane fa-flip"></i>&nbsp;Inform User
                    </button>
                    <!-- <button title="Insert All User for Pro-Close" id="RptBIHkpInsertBIUserCloseBTN"
                                      style="color: white; font-family: 'Segoe UI'" class="btn btn-primary btn-xs" type="button"
                                      @* onclick="RptBIHkpInsertUserPreClose()" *@
                                      onclick="rpt_user_Housekeeping_fn_insert_process_step_all('insert_bi_close')">
                                  <i class="fas fa-save" style="color: white"></i>&nbsp;Insert BI User Close
                              </button> -->
                    <button id="RptDBHkpOperationBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            onclick="fnOpenModalOperationDBUserHousekeeping()">
                        <i class="fas fa-pencil-alt" style="color: white"></i>&nbsp;Edit
                    </button>
                    <button id="RptDBHkpReqAuthBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            @*
            onclick="DBHkpFnInsertaReqAuthStep()"
            *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('db_req_auth')">
                        <i class="fa fa-paper-plane fa-flip"></i>&nbsp;Request Authorize
                    </button>
                    <button id="RptDBHkpAuthBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            @*
            onclick="DBHkpFnInsertAuthOrRejectStep('AUTH')"
            *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('db_auth')">
                        <i class="fa fa-check"></i>&nbsp;Authorize
                    </button>
                    <button id="RptDBHkpRejectBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-danger btn-xs"
                            type="button"
                            @*
            onclick="DBHkpFnInsertAuthOrRejectStep('REJECT')"
            *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('db_reject')">
                        <i class="fa fa-times" style="color: white"></i>&nbsp;Reject
                    </button>
                    <button id="RptDBHkpSentMailInformBTN"
                            style="color: white; font-family: 'Segoe UI'"
                            class="btn btn-primary btn-xs"
                            type="button"
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('db_inform')">
                        <i class="fa fa-paper-plane fa-flip"></i>&nbsp;Inform User @*
                            onclick="DBUserHkpFnInsertSentEmailInformStatus()" *@
                    </button>
                    <button id="RptBIHkpGenRptBIDlBtn"
                            class="btn btn-primary btn-xs"
                            type="button"
                            style="display: none"
                            @*
            onclick="RptBIHkpFnGetReportBIDeletion('getReport')"
            *@
                            onclick="rpt_user_Housekeeping_fn_insert_process_step_all('get_bi_deletion')">
                        <i id="iconBIDeletion" class="fas fa-sync"></i>
                        &nbsp;Close User Inactive
                    </button>
                </div>
            </div>
        </div>
        @*modual*@
        <div class="modal" id="modual_ms_update_user_status_bi_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">Update User Status</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_update_user_status_bi_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="modual_ms_update_user_email_bi_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">Update User Email</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_update_user_email_bi_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="modual_ms_pull_last_login_bi_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">Pull Last Login</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_pull_last_login_bi_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="modual_ms_get_bi_hosekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">BI User Housekeeping</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_get_bi_user_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="modual_ms_get_bi_user_close_bi_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">Get BI User Close</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_get_bi_user_close_bi_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="modual_ms_insert_bi_user_close_bi_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">Insert BI User Close</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_insert_bi_user_close_bi_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="modual_ms_get_bi_deletion_bi_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">Get BI Deletion</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_get_bi_deletion_bi_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="modual_ms_user_inform_db_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">DB User Inform</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_user_inform_db_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="modual_ms_user_remove_db_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">DB User Remove</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_user_remove_db_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="modual_ms_total_user_db_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">DB Total User</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_total_user_db_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        @* modal operation bi user housekeeping *@
        <div class="modal" id="modal_operation_bi_user_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">BI User Operation</div>
                    <div class="modal-body">
                        @* operation card *@
                        <div class="card">
                            <div class="card-header" style="padding-top: 0px">
                                <span class="card-title" style="padding-top: 5px">Operation</span>
                                <div class="card-tools">
                                    <div class="btn-group">
                                        <button type="button"
                                                class="btn btn-tool dropdown-toggle"
                                                data-toggle="dropdown">
                                            <i class="fas fa-wrench"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right" role="menu">
                                            <a class="dropdown-divider"></a>
                                            <a href="javascript:function"
                                               class="dropdown-item"
                                               style="color: black">New</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="db_date_report_id">Report Date</label>
                                            <input type="text"
                                                   id="db_date_report_id"
                                                   onchange=""
                                                   class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="db_date_report_id">Report Date</label>
                                            <input type="text"
                                                   id="db_date_report_id"
                                                   onchange=""
                                                   class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="db_date_report_id">Report Date</label>
                                            <input type="text"
                                                   id="db_date_report_id"
                                                   onchange=""
                                                   class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="db_date_report_id">Report Date</label>
                                            <input type="text"
                                                   id="db_date_report_id"
                                                   onchange=""
                                                   class="form-control form-control-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button id="RptBIHkpRefreshBTN"
                                            style="color: white; font-family: 'Segoe UI'"
                                            class="btn btn-primary btn-xs"
                                            type="button"
                                            onclick="rpt_user_housekeeping_fn_refresh_listing()">
                                        <i id="iconRefreshListing"
                                           class="fas fa-sync"
                                           style="color: white"></i>&nbsp;Refresh
                                    </button>
                                    <button id="RptBIHkpOperationBTN"
                                            style="color: white; font-family: 'Segoe UI'"
                                            class="btn btn-primary btn-xs"
                                            type="button"
                                            onclick="fnOpenModalOperationBIUserHousekeeping()">
                                        <i class="fas fa-pencil-alt" style="color: white"></i>&nbsp;Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        @* listing card *@
                        <div class="card">
                            <div class="card-header" style="padding-top: 0px">
                                <span class="card-title" style="padding-top: 5px">Operation</span>
                                <div class="card-tools">
                                    <div class="btn-group"></div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="rpt_bi_inactive_operation_listing"
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
                                                <th nowrap>Branch Code</th>
                                                <th nowrap>User ID</th>
                                                <th nowrap>User Name</th>
                                                <th nowrap>Created Date</th>
                                                <th nowrap>Last Signed</th>
                                                <th nowrap>Num Last Signed</th>
                                                <th nowrap>Report Date</th>
                                                <th nowrap>Review Date</th>
                                                <th nowrap>Remarks</th>
                                                <th nowrap>status</th>
                                                <th nowrap></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>

                            <div class="card-footer">
                                <div class="flex-container">
                                    <button id="RptBIHkpRefreshBTN"
                                            style="color: white; font-family: 'Segoe UI'"
                                            class="btn btn-primary btn-xs"
                                            type="button"
                                            onclick="rpt_user_housekeeping_fn_refresh_listing()">
                                        <i id="iconRefreshListing"
                                           class="fas fa-sync"
                                           style="color: white"></i>&nbsp;Refresh
                                    </button>
                                    <button id="RptBIHkpOperationBTN"
                                            style="color: white; font-family: 'Segoe UI'"
                                            class="btn btn-primary btn-xs"
                                            type="button"
                                            onclick="fnOpenModalOperationBIUserHousekeeping()">
                                        <i class="fas fa-pencil-alt" style="color: white"></i>&nbsp;Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        @* modal operation db user housekeeping *@
        <div class="modal" id="modal_operation_db_user_housekeeping">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <!-- Modal body -->
                    <div class="modal-header">Database User Operation</div>
                    <div class="modal-body text-center">
                        <p id="txt_ms_total_user_db_housekeeping">Hello 😉🤞</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-xs"
                                data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
