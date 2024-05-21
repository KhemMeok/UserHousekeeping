
<div id="ACL_REQUEST_CONTROL" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <div class="btn-group">
                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-wrench"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <a class="dropdown-divider"></a>
                                <a href="javascript:FN_ACL_REQ_CONTROL_NEW()" class="dropdown-item" style="color:black;">New</a>
                            </div>
                        </div>
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Application <span style="color: Red;">*</span></label>
                                    <select style="width:100%;" id="ACL_REQ_CON_APP" class="form-control form-control-sm" onchange="FN_ACL_REQ_HOSTNAME(this.value)"></select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Site <span style="color: Red;">*</span></label>
                                    <select id="ACL_REQ_HOSTSIDE" class="form-control form-control-sm" onchange="FN_ACL_REQ_HOSTNAME(this.value)">
                                        <option value="NULL">Choose Application Side</option>
                                        <option value="DC">DC</option>
                                        <option value="DR">DR</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Hostname <span style="color: Red;">*</span></label>
                                    <select style="width:100%;" id="ACL_REQ_CON_HOSTNAME" class="form-control form-control-sm" onchange="FN_ACL_REQ_INSTANCE_NAME()"></select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Instance name <span style="color: Red;">*</span></label>
                                    <select style="width:100%;" id="ACL_REQ_CON_INSTANCE_NAME" class="form-control form-control-sm" onchange="FN_ACL_REQ_USERID()"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Request user <span style="color: Red;">*</span></label>
                                    <select style="width:100%;" id="ACL_REQ_CON_USER" class="form-control form-control-sm"></select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Request type <span style="color: Red;">*</span></label>
                                    <select style="width:100%;" id="ACL_REQ_TYPE" class="form-control form-control-sm"></select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Ticket number <span style="color: Red;">*</span></label>
                                    <select style="width:100%;" id="ACL_REQ_TICKET_NO" class="form-control form-control-sm" onchange="FN_GET_TICKET_JUSTIFICATION(this.value)"></select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Patch number</label>
                                    <input type="text" id="ACL_REQ_PATCH_NO" class="form-control form-control-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Working schedule from <span style="color: Red;">*</span></label>
                                    <input type="text" id="ACL_REQ_WKS_FROM_DATETIME" class="form-control form-control-sm" />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Working schedule to <span style="color: Red;">*</span></label>
                                    <input type="text" id="ACL_REQ_WKS_TO_DATETIME" class="form-control form-control-sm" />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Reviewer 1 <span style="color: Red;"></span></label>
                                    <select style="width:100%;" id="ACL_REQ_REV1" class="form-control form-control-sm"></select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Reviewer 2 <span style="color: Red;"></span></label>
                                    <select style="width:100%;" id="ACL_REQ_REV2" class="form-control form-control-sm"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Reviewer 3 <span style="color: Red;"></span></label>
                                    <select style="width:100%;" id="ACL_REQ_REV3" class="form-control form-control-sm"></select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Approver <span style="color: Red;">*</span></label>
                                    <select style="width:100%;" id="ACL_REQ_APP" class="form-control form-control-sm"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Request Summary<span style="color: Red;">*</span></label>
                                    <textarea id="ACL_REQ_SUMMARY" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Request detail</label>
                                    <textarea id="ACL_REQ_DETAIL" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="1000 characters limited..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" id="BTN_ACL_ADD_CART" class="btn btn-xs btn-primary" onclick="FN_ACL_REQ_CONTROL_INSERT_LOG()">
                            <i class="fa fa-save"></i> Save
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Logs listing</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-sm-12 table-responsive">
                        <table cellpadding="0" cellspacing="0" id="TBL_ACL_USER_LOG"
                               class="table table-bordered table-hover nowrap"></table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-danger btn-xs" type="button" onclick="FN_DELECT_ACL_USER_LOG()"><i class="fa fa-trash"></i> Delete</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="FN_REQUEST_ACCESS()"><i class="fa fa-paper-plane"></i> Send</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="FN_REFRESH_USER_LOG()"><i class="fa fa-sync"></i> Refresh</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
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
                        <div class="col-sm-12 table-responsive" id="DIV_TBL_ACL_REQ_CONTROL">
                            <table cellpadding="0" cellspacing="0" id="TBL_GET_DATA_ACL_REQ_CONTROL"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" id="btn_checkin_request" type="button" onclick="FN_POP_CHECK_IN()"><i class="fa fa-sign-in-alt"></i> Check In</button>
                        <button class="btn btn-primary btn-xs" id="btn_checkout_request" type="button" onclick="FN_POP_CHECK_OUT()"><i class="fa fa-sign-out-alt"></i> Check Out</button>
                        <button class="btn btn-primary btn-xs" id="btn_adjust_acl_req" type="button" onclick="FN_ACL_FETCH_DATA_ADJUST()"><i class="fas fa-pen-alt"></i> Adjust</button>
                        <button class="btn btn-danger btn-xs" id="btn_cancel_request" type="button" onclick="FN_POP_CANCEL_REQ()"><i class="fa fa-ban"></i> Cancel Request</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="FN_REFRESH_ACL_REQ()"><i class="fa fa-sync"></i> Refresh</button>
                    </div>

                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    <!--Modal-->
    <div id="MODAL_ACL_PROCESS" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <span id="SP_ACL_PROCESS_TITLE"></span>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Comment:</label>
                                <textarea id="ACL_PROCESS_COMMENT" class="form-control" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span id="SP_ACL_PROCESS_RESPOND"></span>
                    <button type="button" class="btn btn-primary btn-xs" id="BTN_ACL_PROCESS_CONFIRM_YES"></button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="MODAL_ACL_CHECKIN_OUT" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span id="SP_ACL_CHECKINOUT_TITLE"></span>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Datetime:</label>
                                <input type="text" id="ACL_TXT_CHECK_DATETIME" class="form-control form-control-sm" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Remark:</label>
                                <textarea class="form-control" id="ACL_TXT_CHECKINOUT_REMARK" style="margin: 0px; width: 100%; height: 53px; font-size:12px;" placeholder="100 characters limited..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span id="SP_ACL_CHECKINOUT_RESPOND"></span>
                    <button type="button" class="btn btn-primary btn-xs" id="BTN_ACL_CHECKINOUT"></button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--Modal-->
    <div id="MODAL_ACL_ADJUST" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Adjust Access Request <span id="ACL_REQ_ADJ_REF"></span></span> 
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Working Schedule From:</label>
                                <input type="text" id="ACL_REQ_ADJ_WSCHFROM" class="form-control form-control-sm" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Working Schedule To:</label>
                                <input type="text" id="ACL_REQ_ADJ_WSCHTO" class="form-control form-control-sm" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Check-In:</label>
                                <input type="text" id="ACL_REQ_ADJ_CHECKIN" class="form-control form-control-sm" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Check-Out:</label>
                                <input type="text" id="ACL_REQ_ADJ_CHECKOUT" class="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span id="SP_ACL_PROCESS_RESPOND"></span>
                    <button type="button" class="btn btn-primary btn-xs" id="btn_acl_req_adj" onclick="FN_ACL_ADJUST(this.value)"><i class="fas fa-save"></i> Save</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--End modal-->
</div>