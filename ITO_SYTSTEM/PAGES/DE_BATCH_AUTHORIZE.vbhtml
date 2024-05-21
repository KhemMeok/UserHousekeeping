<div id="DE_BATCH_AUTHORIZE" class="tab-pane">
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
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Authorize Mode <span></span></label>
                                        <select style="width:100%;" id="de_ba_authorize_mode" class="form-control form-control-sm">
                                            <option value="Serial">Serial</option>
                                            <option value="Parallel">Parallel</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Batch Types <span style="color:red">*</span></label>
                                        <select style="width:100%;" multiple="multiple" data-placeholder="Choose Batch Types" id="de_ba_bt" class="form-control form-control-sm" onchange="fnDeBaGetRequester()">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Requester</label>
                                        <select style="width:100%;" multiple="multiple" data-placeholder="Choose Requester" id="de_ba_requester" class="form-control form-control-sm">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <button type="button" class="btn btn-primary btn-xs" onclick="fnDeBaGetGroupID()"><i class="fas fa-arrow-down"></i> Fetch Group ID</button>
                        </div>
                        <div class="col-sm-12" style="margin-top:10px;">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Group ID <span style="color:red">*</span></label>
                                        <div class="row">
                                            <div class="col-sm-11" id="de_ba_div_group_id">
                                                <div id="sl_duallistbox">
                                                    <select style="width:100%; height:210px;" multiple="multiple" id="de_ba_group_id" class="form-control form-control-sm" onchange="fnDeBaGetBatchNo(this.value)">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-1 btn-move" style="padding-left:0px; padding-right:0px; margin-right:0px;">
                                                <div class="flex-container">
                                                    <button type="button" class="btn btn-default btn-sm" title="Move Down" onclick="fnDeBaGroupMoveGroup('DOWN')"><i class="fas fa-arrow-down"></i></button>
                                                    <br />
                                                    <button type="button" class="btn btn-default btn-sm" title="Move Up" onclick="fnDeBaGroupMoveGroup('UP')"><i class="fas fa-arrow-up"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6" id="de_ba_div_batchno">
                                    <div class="form-group">
                                        <label>Batch No <span style="color:red">*</span></label>
                                        <select style="width:100%; height:210px;" multiple id="de_ba_batch_no" class="form-control form-control-sm">
                                           
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="alert alert-info col-sm-4">
                                <strong><i class="fas fa-tags fa-lg text-warning"></i></strong> Your Flexcube Authorize User <i class="fas fa-long-arrow-alt-right fa-lg text-warning"></i> <strong id="de_authorize_sp_fcub_user"></strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeBaReset()"><i class="fas fa-retweet"></i>&nbsp;Reset</button>
                        <button type="button" id="btn_ba_authorize" class="btn btn-primary btn-xs" onclick="fnDeBaAuthorizeConfirmDialog()"><i class="fas fa-upload"></i>&nbsp;Authorize</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnDebaDownloadDocDialog()"><i class="fas fa-file-download"></i>&nbsp;Download Document</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnDeBaViewBatchDetail()"><i class="fas fa-binoculars"></i>&nbsp;View Batch Detail</button>
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
                                <select id="de_ba_query_bt" multiple="multiple" data-placeholder="Choose query filter" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Range Value date</label>
                                <input type="text" class="form-control form-control-sm" id="de_ba_query_vr">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 table-responsive">
                        <table cellpadding="0" cellspacing="0"
                               class="table table-bordered table-hover nowrap" id="tbl_ba_data_req_authorize"></table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeBaGetBatchReqData()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeBaAddNoteDialog()"><i class="fas fa-comment-alt"></i>&nbsp;Add Note</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnDebaDownloadDocGridDialog()"><i class="fas fa-file-download"></i>&nbsp;Download Document</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    @* END ROW *@
    <div class="modal" id="modalDeBaBatchDetail" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Batch Detail</span>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12 p-0 border-bottom-0">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#de_ba_batch_detail" role="tab">Batch Detail</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#de_ba_batch_master" role="tab">Batch Master</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-sm-12" style="margin-top:10px;">
                            <div class="tab-content">
                                <div class="tab-pane fade show active table-responsive" id="de_ba_batch_detail" role="tabpanel">
                                    <div class="table-responsive">
                                        <table style="width:100%;" cellpadding="0" cellspacing="0"
                                               class="table table-bordered table-hover nowrap" id="tbl_ba_data_batch_detail"></table>
                                    </div>
                                </div>
                                <div class="tab-pane fade table-responsive" id="de_ba_batch_master" role="tabpanel">
                                    <div class="table-responsive">
                                        <table style="width:100%;" cellpadding="0" cellspacing="0"
                                               class="table table-bordered table-hover nowrap" id="tbl_ba_data_batch_master"></table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-xs" type="button" onclick="fnDeBaDetailTrnExport()"><i class="fas fa-file-download"></i>&nbsp;Export</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>