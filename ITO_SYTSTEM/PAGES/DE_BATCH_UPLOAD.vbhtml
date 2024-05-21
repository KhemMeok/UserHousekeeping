<div id="DE_BATCH_UPLOAD" class="tab-pane">
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
                        <div class="col-sm-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Upload Mode <span></span></label>
                                    <select style="width:100%;" id="de_bu_upload_mode" class="form-control form-control-sm">
                                        <option value="Serial">Serial</option>
                                        <option value="Parallel">Parallel</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Batch Types <span style="color:red">*</span></label>
                                    <select style="width:100%;" multiple="multiple" data-placeholder="Choose Batch Types" id="de_bu_bt" class="form-control form-control-sm" onchange="fnDeBuGetRequester()">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Requester</label>
                                    <select style="width:100%;" multiple="multiple" data-placeholder="Choose Requester" id="de_bu_requester" class="form-control form-control-sm">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary btn-xs" onclick="fnDeBuGetGroupID()"><i class="fas fa-arrow-down"></i>&nbsp;Fetch Group ID</button>
                                </div>
                            </div>
                            <div class="alert alert-info">
                                <strong><i class="fas fa-tags fa-lg text-warning"></i></strong> Your Flexcube Upload User <i class="fas fa-long-arrow-alt-right fa-lg text-warning"></i> <strong id="de_upload_sp_fcub_user"></strong>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Group ID <span style="color:red">*</span></label>
                                    <div class="row">

                                        <div class="col-sm-11">
                                            <div id="sl_duallistbox">
                                                <select  style="width:100%; height:210px;" multiple="multiple" id="de_bu_group_id" class="form-control form-control-sm">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-1 btn-move" style="padding-right:0px; margin-right:0px;">
                                            <div class="flex-container">
                                                <button type="button" class="btn btn-default btn-sm" title="Move Down" onclick="fnDeBuGroupMoveGroup('DOWN')"><i class="fas fa-arrow-down"></i></button>
                                                <br />
                                                <button type="button" class="btn btn-default btn-sm" title="Move Up" onclick="fnDeBuGroupMoveGroup('UP')"><i class="fas fa-arrow-up"></i></button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        @* end input *@
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeBuReset()"><i class="fas fa-retweet"></i>&nbsp;Reset</button>
                        <button type="button" id="btn_bu_upload" class="btn btn-primary btn-xs" onclick="fnDeBuUploadConfirmDialog()"><i class="fas fa-upload"></i>&nbsp;Upload</button>
                        <button type="button" id="btn_bu_reject" class="btn btn-danger btn-xs" onclick="fnDeBuRejectConfirmDialog()"><i class="fas fa-times"></i>&nbsp;Reject</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnDebuDownloadDocDialog()"><i class="fas fa-file-download"></i>&nbsp;Download Document</button>
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
                                <select id="de_bu_query_bt" multiple="multiple" data-placeholder="Choose query filter" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Range Value date</label>
                                <input type="text" class="form-control form-control-sm" id="de_bu_query_vr">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 table-responsive">
                        <table cellpadding="0" cellspacing="0"
                               class="table table-bordered table-hover nowrap" id="tbl_bu_data_req_upload"></table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeBuGetBatchReqData()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeBuAddNoteDialog()"><i class="fas fa-comment-alt"></i>&nbsp;Add Note</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnBuCheckIssueDailog()"><i class="fas fa-search"></i>&nbsp;Check Issue</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnDebuDownloadDocGridDialog()"><i class="fas fa-file-download"></i>&nbsp;Download Document</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    @* END ROW *@
    <div class="modal" id="modalCheckIssue" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Check Issue Transaction</span>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Group ID</label>
                                <input type="text" class="form-control form-control-sm disabled" id="de_bu_ch_issue_group_id" />
                            </div>
                            <div class="form-group">
                                <label>Issue Code</label>
                                <select class="form-control form-control-sm disabled" id="de_bu_ch_issue_code" style="width: 100%;" data-placeholder="Choose Issue Code">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-xs" type="button" onclick="fnBuCheckIssue()"><i class="fas fa-search"></i>&nbsp;Check</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>