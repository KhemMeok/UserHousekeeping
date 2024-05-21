<div id="EOC_FLEXCUBE_ISSUE" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label>Issue Type <span style="color: Red;">*</span></label>
                        <select data-placeholder="Choose Issue Type" style="width:30%;" id="eoc_flex_issue_type" class="form-control form-control-sm" onchange="fnrpt_flex_issue_tabchange(this.value)"></select>
                    </div>
                    @*to activate tab when select on Issue Type*@
                    <div class="card-header p-0 border-bottom-0 hide" style="display:none">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="pill" href="#eoc_flex_issue_handoff_tab" onclick="fnrpt_flex_issue_tabchange(this.value)" role="tab">Handdoff</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-pane fade show active" id="eoc_flex_issue_handoff_tab" role="tabpanel">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card card-primary card-outline card-outline-tabs">
                                    <div class="card-header">
                                        <span class="card-title"> Handoff Entries</span>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content">
                                            <div class="input-group" style="width:30%;">
                                                <input type="text" id="eoc_flex_handoff_failed_trn_ref" class="form-control form-control-sm" placeholder="Input Transaction Refference" onkeydown="EntereocflexFnSearchEnterHandoffTRN(event)" />
                                                <div class="input-group-append">
                                                    <button id="btn_search_handofflisting" class="btn btn-primary btn-xs" type="button" onclick="fnSearchFcubHandoffFailed()"><i class="fas fa-search"></i>&nbsp;Search</button>
                                                </div>
                                            </div>
                                            <br />
                                            <table id="eoc_flex_issue_handoff_tbl_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" style="margin-left:35%;" id="eoc_flex_issue_handoff_tbl_listing_ck_selectall"></th>
                                                        <th>TRN REF NO</th>
                                                        <th>TXN Branch</th>
                                                        <th>Value Date</th>
                                                        <th>TXN Date</th>
                                                        <th>User ID</th>
                                                        <th>Error Code</th>
                                                        <th>TXN Stat</th>
                                                        <th>Source Code</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
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
                        <button style="display:none" id="eoc_flex_issue_handoff_btn_request" class="btn btn-primary btn-xs" type="button" onclick="fnConfirmFcubRequestFixHandoffFailed()"><i class="fas fa-check"></i> Request Fix</button>
                        <button style="display:none" id="eoc_flex_issue_handoff_btn_fix" class="btn btn-primary btn-xs" type="button" onclick="fnConfirmFcubFixHandoffFailed()"><i class="fas fa-check"></i> Fix</button>
                        <button style="display:none" id="eoc_flex_issue_handoff_btn_reject" class="btn btn-danger btn-xs" type="button" onclick="fnConfirmFcubRejectHandoffFailed()"><i class="fas fa-times"></i> Reject</button>
                        @*<button id="eoc_flex_issue_handoff_btn_search" class="btn btn-primary btn-xs" type="button" value="N" onclick="fnSearchFcubHandoffFailed()"><i class="fas fa-sync"></i> Refresh</button>*@
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Log Listing</span>
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
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Log Date&nbsp;<span style="color:red;">*</span></label>
                                        <input type="text" id="eoc_flex_issue_handoff_log_date" class="form-control form-control-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">
                                    <div class="card-header">
                                        <span class="card-title"> Handoff Entries</span>
                                    </div>
                                    @*to activate tab when select on Issue Type*@
                                    <ul class="nav nav-tabs" role="tablist" style="display:none">
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="pill" href="#eoc_flex_issue_handoff_log_tab" onclick="fnrpt_flex_issue_tabchange(this.value)" role="tab">Handdoff</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="eoc_flex_issue_handoff_log_tab" role="tabpanel">
                                            <table id="eoc_flex_issue_handoff_tbl_log_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" style="margin-left:35%;" id="eoc_flex_issue_handoff_tbl_log_listing_ck_selectall"></th>
                                                        @*<th><input type="checkbox" style="margin-left:35%;" id="eoc_flex_issue_handoff_tbl_log_listing_ck_selectall"></th>*@
                                                        <th>Log ID</th>
                                                        <th>TRN REF NO</th>
                                                        <th>TXN Branch</th>
                                                        <th>Value Date</th>
                                                        <th>TXN Date</th>
                                                        <th>User ID</th>
                                                        <th>Error Code</th>
                                                        <th>TXN Stat</th>
                                                        <th>Source Code</th>
                                                        <th>Status</th>
                                                        <th>Request By</th>
                                                        <th>Request Date</th>
                                                        <th>Resolve By</th>
                                                        <th>Resolve Date</th>
                                                        <th>Reject By</th>
                                                        <th>Reject Date</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
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
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnRefreshFcubHandoffLogListing()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                        @*<button  type="button" class="btn btn-danger btn-xs" onclick="fnConfirmDeleteRptEoCStepDuration()"><i class="fas fa-trash-alt"></i>&nbsp;Delete</button>*@
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    @* Modal *@
    <div class="modal" id="eoc_flex_issue_handoff_modalpopupdetail">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    Error Message from Flexcube
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Error Code:&nbsp;<span style="color:red;" id="eoc_flex_issue_handoff_span_error_code"></span></label>
                                            <textarea id="eoc_flex_issue_handoff_error_sms" class="form-control" style="margin: 0px; width: 100%; height: 330px; color:black;font-size:12px;"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"><i class="fas fa-times"></i>&nbsp;Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>