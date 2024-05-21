<div id="DE_BATCH_APPROVE" class="tab-pane">
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
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Requester</label>
                                        <div class="input-group">
                                            <select style="width:80%;" data-placeholder="Choose Requester" class="form-control form-control-sm" multiple id="deAppBatchRequester">
                                            </select>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary btn-xs" type="button" onclick="deAppFetchRequester('Y')"><i class="fas fa-sync-alt"></i>&nbsp;Refresh</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <button class="btn btn-primary btn-xs" type="button" onclick="deAppFetchBatchNo()"><i class="fas fa-arrow-down"></i> Fetch Batch No</button>
                                </div>
                                <div class="col-sm-12" style="margin-top:10px;">
                                    <div class="form-group">
                                        <label>Batch No&nbsp;<span style="color:red;">*</span></label>
                                        <select style="width:100%;" class="form-control form-control-sm" multiple id="deAppBatchNo">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="alert alert-info alert-dismissible">
                                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        <strong>Info!</strong> Batch No dispaly: [Batch No][Branch Cdoe][Group ID]
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="deAppReset()"><i class="fas fa-retweet"></i>&nbsp;Reset</button>
                        <button class="btn btn-primary btn-xs" id="btn_de_approve_approve" type="button" onclick="deAppRequestDailog('app')"><i class="fa fa-check"></i> Approve Request</button>
                        <button class="btn btn-danger btn-xs" id="btn_de_approve_reject" type="button" onclick="deAppRequestDailog('rej')"><i class="fa fa-minus-square"></i> Reject Request</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Request listing</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 table-responsive" id="DIV_TBL_ACL_REV_CONTROL">
                            <table cellpadding="0" cellspacing="0" id="de_to_app_batch_tbl"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="deAppFetchRequest('Y')"><i class="fa fa-sync"></i> Refresh</button>
                    </div>

                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
</div>