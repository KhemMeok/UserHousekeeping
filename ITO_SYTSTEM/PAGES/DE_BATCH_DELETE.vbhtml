<div id="DE_BATCH_DELETE" class="tab-pane">
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
                                            <select style="width:80%;" data-placeholder="Choose Requester" class="form-control form-control-sm" multiple id="deDeleteBatchRequester">
                                            </select>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary btn-xs" type="button" onclick="deFetchBatchDeleteRequester('Y')"><i class="fas fa-sync-alt"></i>&nbsp;Refresh</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <button class="btn btn-flat bg-gradient-primary btn-xs" type="button" onclick="deFetchBatchNoAvl()"><i class="fas fa-arrow-down"></i> Fetch Batch No</button>
                                </div>
                                <div class="col-sm-12" style="margin-top:10px;">
                                    <div class="form-group">
                                        <label>Batch No&nbsp;<span style="color:red;">*</span></label>
                                        <select style="width:100%;" class="form-control form-control-sm" multiple id="deDeleteBatchNo">
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
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeDeleteBatchReset()"><i class="fas fa-retweet"></i>&nbsp;Reset</button>
                        <button class="btn btn-danger btn-xs" type="button" id="btn_de_delete_batch_dialog" onclick="deBatchDeleteDialog()"><i class="fa fa-trash"></i> Delete Batch</button>
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
                            <table cellpadding="0" cellspacing="0" id="de_to_delete_batch_tbl"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="deFetchBatchDeleteAvl('Y')"><i class="fa fa-sync"></i> Refresh</button>
                    </div>

                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
</div>