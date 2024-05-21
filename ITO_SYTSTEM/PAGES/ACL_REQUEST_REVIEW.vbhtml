<div id="ACL_REQUEST_REVIEW" class="tab-pane">
    <div class="row">
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
                            <table cellpadding="0" cellspacing="0" id="TBL_GET_DATA_ACL_REV_CONTROL"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" id="btn_review_request" type="button" onclick="FN_POP_REV_REQ()"><i class="fa fa-check"></i> Review Request</button>
                        <button class="btn btn-danger btn-xs" id="btn_reject_request" type="button" onclick="FN_ACL_REV_REJECT_POPUP()"><i class="fa fa-minus-square"></i> Reject Request</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="FN_ACL_REV_REFESH()"><i class="fa fa-sync"></i> Refresh</button>
                    </div>

                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    <!-- Modal-->
    <div id="MODAL_ACL_REVIEW" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <span id="SP_ACL_REVIEW_TITLE">Review request</span>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Comment:</label>
                                <textarea id="ACL_REVIEW_COMMENT" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" id="BTN_ACL_REVIEW_CONFIRM_YES" onclick="FN_REVIEW_REQ(this.value)">Review</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="MODAL_ACL_REV_REJECT" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Reject request</span>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Comment:</label>
                                <textarea id="ACL_REV_REJECT_COMMENT" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" id="btn_acl_rev_reject" onclick="FN_ACL_APP_REJECT(this.value)">Reject</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>