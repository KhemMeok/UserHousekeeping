<div id="ACL_REQUEST_APPROVE" class="tab-pane">
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
                        <div class="col-sm-12 table-responsive" id="DIV_TBL_ACL_APP_CONTROL">
                            <table cellpadding="0" cellspacing="0" id="TBL_GET_DATA_ACL_APP_CONTROL"
                                   class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" id="btn_approve_request" type="button" onclick="FN_ACL_APP_APPROVE_POPUP()"><i class="fa fa-check"></i> Approve Request</button>
                        <button class="btn btn-danger btn-xs" id="btn_app_reject_request" type="button" onclick="FN_ACL_APP_REJECT_POPUP()"><i class="fa fa-minus-square"></i> Reject Request</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="FN_ACL_APP_REFRESH()"><i class="fa fa-sync"></i> Refresh</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    <!-- Modal-->
    <div id="MODAL_ACL_APPROVE" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <span id="SP_ACL_APPRVOE_TITLE">Approve request</span>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Comment:</label>
                                <textarea id="ACL_APPROVE_COMMENT" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" id="btn_acl_app_approve" onclick="FN_APPROVE_REQ(this.value)">Approve</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="MODAL_ACL_APP_REJECT" class="modal fade" tabindex="-1" role="dialog">
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
                                <textarea id="ACL_APP_REJECT_COMMENT" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" id="btn_acl_app_reject" onclick="FN_ACL_APP_REJECT(this.value)">
                        Reject
                    </button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>