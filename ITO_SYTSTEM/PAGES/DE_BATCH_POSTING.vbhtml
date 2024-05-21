<div id="DE_BATCH_POSTING" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">Batch initialize</span>
                                    <div class="card-tools">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                                <i class="fas fa-wrench"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                                <a class="dropdown-divider"></a>
                                                <a href="javascript:fnDepostingNewInitailize()" class="dropdown-item" style="color:black;">New</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Batch type <span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose Batch Type" onchange="fnGetBatchSource_de_posting(); fnCurrentBatchNo(); fnShowCheckbox_de_posting(); fnDepostingUserRole();fnProcessStageView()" id="de_posting_batch_type" class="form-control form-control-sm" style="width:100%;"></select>
                                        </div>
                                        <div class="form-group">
                                            <label>Source <span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose Source" onchange="fnShowInputFileTypes_de_posting(this.value); fnValidateButtons(); fnProcessStageView();" id="de_posting_source" class="form-control form-control-sm"></select>
                                        </div>
                                        <div class="form-group" id="de_div_main_account" style="display:none">
                                            <label>Main account <span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose Main Account" id="de_posting_main_account" class="form-control form-control-sm" onchange="fnMainAccountChange(this.value)"></select>
                                        </div>
                                        <div class="form-group" id="de_div_transaction_name" style="display:none">
                                            <label>Transaction name <span style="color:red;">*</span></label>
                                            <input id="de_posting_transaction_name" type="text" class="form-control form-control-sm" placeholder="Enter transaction name" />
                                        </div>
                                        <div class="form-group" id="de_div_batch_master" style="display:none">
                                            <label>Batch master <span style="color:red;">*</span></label>
                                            <input type="file" id="de_posting_batch_master" class="form-control-file border" accept=".CSV, .csv">
                                        </div>
                                        <div class="form-group" id="de_div_batch_detail" style="display:none">
                                            <label>Batch detail <span style="color:red;">*</span></label>
                                            <input type="file" id="de_posting_batch_detail" class="form-control-file border" accept=".CSV, .csv">
                                        </div>

                                        <div class="form-group" id="de_div_template" style="display:none">
                                            <label>Template <span style="color:red;">*</span></label>
                                            <input type="file" id="de_posting_template" class="form-control-file border" accept=".xlsx, .XLSX, .xls, .XLS, .XLSM, .xlsm">
                                        </div>
                                        <div class="form-group" id="de_div_transaction_referenct" style="display:none">
                                            <label>Transaction reference <span style="color:red;">*</span></label>
                                            <select data-placeholder="Choose Transaction Reference" id="de_posting_transaction_ref" class="form-control form-control-sm"></select>
                                        </div>
                                        <div class="form-group">
                                            <label>Documents Support</label>
                                            <input type="file" id="de_posting_doc_support" multiple class="form-control-file border">
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="row">
                                                    <div class="form-group col-sm-6" id="de_div_chk_for_nextworkingday" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input type="checkbox" onclick="fnBackDateNextWKChange('de_posting_chk_for_nextworkingday')" class="form-control form-control-sm" id="de_posting_chk_for_nextworkingday" />
                                                            <label for="de_posting_chk_for_nextworkingday">For nextworking day <a href="javascript:fnAlertHelp_de_posting('nextworking_day_chk')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>

                                                    </div>
                                                    <div class="form-group col-sm-6" id="de_div_chk_back_date" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input type="checkbox" onclick="fnBackDateNextWKChange('de_posting_chk_back_date')" class="form-control form-control-sm" id="de_posting_chk_back_date" />
                                                            <label for="de_posting_chk_back_date">Back date <a href="javascript:fnAlertHelp_de_posting('back_date_chk')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6" id="de_div_chk_approve_auth" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input type="checkbox" class="form-control form-control-sm" id="de_posting_chk_approve_auth" />
                                                            <label for="de_posting_chk_approve_auth">Approve authorize <a href="javascript:fnAlertHelp_de_posting('approve_authorize')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6" id="de_div_chk_schedule" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input onclick="fnScheduleCheck_de_posting()" type="checkbox" class="form-control form-control-sm" id="de_posting_chk_schedule" />
                                                            <label for="de_posting_chk_schedule">Schedule <a href="javascript:fnAlertHelp_de_posting('schedule')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6" id="de_div_chk_single_req" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input onclick="fnRequestTypeCheck_de_posting('de_posting_chk_single_req')" type="checkbox" checked="checked" class="form-control form-control-sm" id="de_posting_chk_single_req" />
                                                            <label for="de_posting_chk_single_req">Single request <a href="javascript:fnAlertHelp_de_posting('single_request')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6" id="de_div_chk_group_req" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input onclick="fnRequestTypeCheck_de_posting('de_posting_chk_group_req')" type="checkbox" class="form-control form-control-sm" id="de_posting_chk_group_req" />
                                                            <label for="de_posting_chk_group_req">Group request <a href="javascript:fnAlertHelp_de_posting('group_request')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6" id="de_div_chk_khr_inrounding" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input onclick="fnRequestTypeCheck_de_posting('de_posting_chk_khr_inrounding')" type="checkbox" class="form-control form-control-sm" id="de_posting_chk_khr_inrounding" />
                                                            <label for="de_posting_chk_khr_inrounding">Inrounding <a href="javascript:fnAlertHelp_de_posting('khr_inrounding')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6" id="de_div_chk_cypo_upload_allow" style="display:none">
                                                        <div class="icheck-primary d-inline">
                                                            <input onclick="fnRequestTypeCheck_de_posting('de_posting_chk_cypo_upload_allow')" type="checkbox" class="form-control form-control-sm" id="de_posting_chk_cypo_upload_allow" />
                                                            <label for="de_posting_chk_cypo_upload_allow">CYPO Allow <a href="javascript:fnAlertHelp_de_posting('cypo_upload_allow')"><i class="fa fa-question-circle"></i></a></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group" id="de_dive_schedule_datetime" style="display:none;">
                                            <label>Schedule datetime <span style="color:red;">*</span></label>
                                            <input id="de_posting_schedule_datetime" type="text" class="form-control form-control-sm" placeholder="Choose schedule datetime" />
                                        </div>
                                        <div class="form-group" id="de_div_request_group" style="display:none">
                                            <label>Group name <span style="color:red;">*</span></label>
                                            <div class="input-group">
                                                <select data-placeholder="Choose Group Name" id="de_posting_group_request_id" class="form-control form-control-sm"></select>
                                                <div class="input-group-append">
                                                    <button title="Create group" type="button" class="btn btn-primary btn-xs" onclick="modals.Open('modalCreateGRID')"><i class="fa fa-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group" id="de_div_last_transaction" style="display:none;">
                                            <div class="icheck-primary d-inline">
                                                <input type="checkbox" id="de_posting_chk_last_transaction" />
                                                <label for="de_posting_chk_last_transaction">Last transaction <a href="javascript:fnAlertHelp_de_posting('last_transaction')"><i class="fa fa-question-circle"></i></a></label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Note</label>
                                            <textarea id="de_posting_notice" class="form-control" style="margin: 0px; width: 100%; height: 50px; background-color:#f7de99; border-color:#997205; color:black;font-size:12px;"></textarea>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        @* end input *@
                        <div class="col-sm-7">
                            <div class="card  card-outline">
                                <div class="card-header">
                                    <div class="card-title">Process</div>
                                </div>
                                <div class="card-body table-responsive">
                                    @*<div class="row">*@
                                    <table id="de_posting_tbl_process" class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th nowrap>
                                                    # Process name
                                                </th>
                                                <th nowrap></th>
                                                <th nowrap>
                                                    # Process status
                                                </th>
                                                <th nowrap>
                                                    #
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td nowrap>Current batch number &nbsp;&nbsp; <a style="color:red;" title="Reset current date" href="javascript:modals.Open('modalCurrDate')"><i class="fas fa-calendar-alt"></i></a></td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_curr_batch_no"></span></td>
                                                <td nowrap><span id="de_posting_curr_batch_no_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_fcub_upload_user" style="display:none;">
                                                <td nowrap><i class="fas fa-tags text-warning"></i> Flexcube Upload User</td>
                                                <td nowrap>:</td>
                                                <td nowrap colspan="2"><span id="de_posting_fcub_upload_user"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_fcub_authorize_user" style="display:none;">
                                                <td nowrap><i class="fas fa-tags text-warning"></i> Flexcube Authorize User</td>
                                                <td nowrap>:</td>
                                                <td nowrap colspan="2"><span id="de_posting_fcub_authorize_user"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_main_account_name" style="display:none;">
                                                <td nowrap>Main account name</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_main_acc_name"></span></td>
                                                <td nowrap><span id="de_posting_main_acc_name_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_main_account_no" style="display:none;">
                                                <td nowrap>Main account number</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_main_acc_no"></span></td>
                                                <td nowrap><span id="de_posting_main_acc_no_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_main_account_brcode" style="display:none;">
                                                <td nowrap>Main account branch code</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_main_acc_brcode"></span></td>
                                                <td nowrap><span id="de_posting_main_acc_brcode_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_main_account_ccy" style="display:none;">
                                                <td nowrap>Main account currency</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_main_acc_ccy"></span></td>
                                                <td nowrap><span id="de_posting_main_acc_ccy_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_main_account_curr_bal" style="display:none;">
                                                <td nowrap>Main account current balance</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_main_acc_curr_bal"></span></td>
                                                <td nowrap><span id="de_posting_main_acc_curr_bal_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_main_account_status" style="display:none;">
                                                <td nowrap>Main account status</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_main_acc_status"></span></td>
                                                <td nowrap><span id="de_posting_main_acc_status_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_attahcment_upload">
                                                <td nowrap>Template upload</td>
                                                <td nowrap>:</td>
                                                <td nowrap>
                                                    <span id="de_posting_attachment_upload_status"></span>
                                                </td>
                                                <td nowrap><span id="de_posting_attachment_upload_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_pull_data" style="display:none;">
                                                <td nowrap>Pull status</td>
                                                <td nowrap>:</td>
                                                <td nowrap>
                                                    <span id="de_posting_pull_status"></span>
                                                </td>
                                                <td nowrap><span id="de_posting_pull_check"></span></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Transaction currency</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_trn_ccy"></span></td>
                                                <td nowrap><span id="de_posting_trn_ccy_check"></span></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Total debit</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_total_debit"></span></td>
                                                <td nowrap><span id="de_posting_total_debit_check"></span></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Total credit</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_total_credit"></span></td>
                                                <td nowrap><span id="de_posting_total_credit_check"></span></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Batch Number</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_batch_no"></span></td>
                                                <td nowrap><span id="de_posting_batch_no_check"></span></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Total transactions</td>
                                                <td nowrap>:</td>
                                                <td nowrap colspan="2"><span id="de_posting_total_trn"></span></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Check status</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_pre_check_status"></span></td>
                                                <td nowrap><span id="de_posting_pre_check_check"></span></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Group ID</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_group_id"></span></td>
                                                <td nowrap><span id="de_posting_group_id_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_upload_stat" style="display:none;">
                                                <td nowrap>Upload status</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_upload_stat"></span></td>
                                                <td nowrap><span id="de_posting_upload_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_upload_tot" style="display:none;">
                                                <td nowrap>Total uploaded</td>
                                                <td nowrap>:</td>
                                                <td nowrap colspan="2"><span id="de_posting_tot_uploaded"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_authorize_stat" style="display:none;">
                                                <td nowrap>Authorize status</td>
                                                <td nowrap>:</td>
                                                <td nowrap><span id="de_posting_authorize_stat"></span></td>
                                                <td nowrap><span id="de_posting_authorize_check"></span></td>
                                            </tr>
                                            <tr id="de_posting_tr_authorize_tot" style="display:none;">
                                                <td nowrap>Total authorized</td>
                                                <td nowrap>:</td>
                                                <td nowrap colspan="2"><span id="de_posting_tot_authorize"></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    @*</div>*@

                                </div>
                            </div>
                        </div>
                        @* end process status *@
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button disabled id="btn_de_posting_load_attachment" type="button" class="btn btn-flat bg-gradient-primary btn-xs" onclick="fnUploadAttachment()">
                            <i class="fa fa-file-upload"></i> Load Attachment
                        </button>
                        <button style="display:none;" id="btn_de_posting_clear_pulling" type="button" class="btn btn-flat bg-gradient-danger btn-xs" onclick="fnDeePostingClearPullDialog()">
                            <i class="fa fa-eraser"></i> Clear Pulling
                        </button>
                        <button style="display:none;" disabled id="btn_de_posting_pull_reference" type="button" class="btn btn-flat bg-gradient-primary btn-xs" onclick="fnDePostingPullRef()">
                            <i class="fa fa-download"></i> Pull Reference
                        </button>
                        <button style="display:none;" disabled id="btn_de_posting_pre_check" type="button" class="btn btn-flat bg-gradient-primary btn-xs" onclick="fnPreCheck()">
                            <i class="fa fa-search"></i> Check
                        </button>
                        <button style="display:none;" disabled id="btn_de_posting_req_upload" type="button" class="btn btn-flat bg-gradient-primary btn-xs" onclick="fnRequestUpload()">
                            <i class="fa fa-paper-plane"></i> Request upload
                        </button>
                        <button style="display:none;" disabled id="btn_de_posting_seft_upload" type="button" class="btn btn-flat bg-gradient-primary btn-xs" onclick="fnDeSelfUpload()">
                            <i class="fa fa-upload"></i> Upload Now
                        </button>
                        <button style="display:none;" disabled id="btn_de_posting_req_authorize" type="button" class="btn btn-flat bg-gradient-primary btn-xs" onclick="fnDeRequestAuthorize()">
                            <i class="fa fa-paper-plane"></i> Request Authorize
                        </button>
                        <button style="display:none;" disabled id="btn_de_posting_seft_authorize" type="button" class="btn btn-flat bg-gradient-primary btn-xs" onclick="fnDeSelfAuthorize()">
                            <i class="fa fa-check"></i> Authorize Now
                        </button>
                    </div>

                </div>
            </div>
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
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Batch types</label>
                                <select id="de_posting_batch_type_filter" multiple="multiple" data-placeholder="Choose Batch Type" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Range Value date</label>
                                <input type="text" class="form-control form-control-sm" id="de_posting_query_date">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 table-responsive">
                        <table cellpadding="0" cellspacing="0" id="tbl_de_posting_batch" class="table table-bordered table-hover nowrap"></table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDePostingQuery()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeRequestAuthorizeGridDialog()"><i class="fa fa-paper-plane"></i>&nbsp;Request Authorize</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDePostingDownloadDocDialog()"><i class="fas fa-file-download"></i>&nbsp;Download Document</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="DePostingFnExportJvDialog()"><i class="fas fa-file-download"></i>&nbsp;Export JV</button>
                        <button class="btn btn-danger btn-xs" type="button" onclick="fnDePostingRequestDeleteModal()"><i class="fa fa-paper-plane"></i>&nbsp;Request Delete</button>
                        <button class="btn btn-danger btn-xs" type="button" onclick="fnDeAbortRequestDialog()"><i class="fas fa-times"></i> Abort</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    @* END ROW *@
    @* Modal *@
    <div class="modal" id="modalCurrDate">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Reset current date
                </div>
                <div class="modal-body text-center">
                    <input type="text" class="form-control form-control-sm" id="de_posting_batch_curr_date" />
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" data-dismiss="modal" onclick="fnCurrentBatchNo()">
                        Set
                    </button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalCreateGRID">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Create group name
                </div>
                <div class="modal-body text-center">
                    <input type="text" placeholder="Group name" class="form-control form-control-sm" id="de_posting_create_group_name" />
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnCreateGRID()">
                        <i class="fas fa-save"></i>&nbsp;Save
                    </button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalDepostingReqDelete">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Request Delete Batch
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Group ID&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" multiple id="de_posting_req_delete_group_id" onchange="DePostingRequestDeleteChangeGroupID()"></select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Batch No&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" multiple id="de_posting_req_delete_batch_no"></select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Branch Code&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" multiple id="de_posting_req_delete_branch_code"></select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Remark</label>
                                <textarea id="de_posting_req_delete_remark" class="form-control" style="margin: 0px; width: 100%; height: 50px; background-color:#f7de99; border-color:#997205; color:black;font-size:12px;"></textarea>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="alert alert-info alert-dismissible">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                <strong>Info!</strong> The request will send to your authorizers for approval.
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="DePostingRequestDeleteBatch()"><i class="fa fa-paper-plane"></i>&nbsp;Request Delete</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalDepostingExportJv">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    Export JV / IFT
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Types&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" id="de_posting_jv_type" class="form-control form-control-sm">
                                    <option value="Journal Voucher (JNV)">Journal Voucher (JNV)</option>
                                    <option value="Inernal Fund Transfer (IFT)">Inernal Fund Transfer (IFT)</option>
                                    <option value="IFRS Adjustment">IFRS Adjustment</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Group ID&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" class="form-control form-control-sm" multiple id="de_posting_jv_group_id" onchange="DePostingGetBatchForJvOnChange()"></select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Batch No&nbsp;<span style="color:red;">*</span></label>
                                <select style="width:100%;" ​​​​​ class="form-control form-control-sm" multiple id="de_posting_jv_batch_no"></select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="form-group col-sm-3">
                                    <div class="icheck-primary d-inline">
                                        <input type="checkbox" class="form-control form-control-sm" id="de_posting_jv_not_above_batch_ck" onclick="DePostingNoTheseBatchJvCheck()" />
                                        <label for="de_posting_jv_not_above_batch_ck">Not these batches</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12" id="div_jv_batch_manual" style="display:none;">
                            <div class="form-group">
                                <label>Batch No&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" class="form-control form-control-sm" placeholder="Enter multiple batch no here by seperate with comma symbol ( , )" id="de_posting_jv_manual_batch_enter" />
                            </div>
                        </div>
                        <div class="col-sm-12" id="div_jv_value_date_manual" style="display:none;">
                            <div class="form-group">
                                <label>Value Date&nbsp;<span style="color:red;">*</span></label>
                                <input type="text" class="form-control form-control-sm" placeholder="Value Date" id="de_posting_jv_value_date_enter" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="DePostingStartExportJv()"><i class="fas fa-file-download"></i>&nbsp;Export</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="de_posting_md_group_req_confirm" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Group Request Confirm</span>
                </div>
                <div class="modal-body">
                    <div class="row text-center">
                        <div class="col-sm-12">
                            <p>
                                <span>Is this Group ID your last transaction?</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" id="btn_de_posting_req_commit_pos">
                        Yes
                    </button>
                    <button type="button" class="btn btn-danger btn-xs" id="btn_de_posting_req_commit_neg">
                        No
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>