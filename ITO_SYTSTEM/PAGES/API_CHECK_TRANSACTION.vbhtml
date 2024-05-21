<div id="API_CHECK_TRANSACTION" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Check Transaction</span>
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
                                <label>Transaction types</label>
                                <select id="api_transaction_type" @*multiple="multiple"*@ data-placeholder="Choose Transaction Type" class="form-control form-control-sm" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Range Value date</label>
                                <input type="text" class="form-control form-control-sm" id="api_transcation_query_date">
                            </div>
                        </div>
                        @*<div class="col-sm-12 table-responsive">
                            <table cellpadding="0" cellspacing="0" id="tbl_api_transaction_history" class="table table-bordered table-hover nowrap"></table>
                        </div>*@
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="api_check_transaction_fn_query()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                        <button class="btn btn-primary btn-xs" type="button" onclick="apit_export_csv()"><i class="fas fa-arrow-down"></i>&nbsp;Export</button>
                        @*<button class="btn btn-primary btn-xs" type="button" onclick="fnCheckTransaction()"><i class="fas fa-search"></i>&nbsp;Check</button>*@
                        @*<button class="btn btn-primary btn-xs" type="button" onclick=""><i class="fas fa-file-download"></i>&nbsp;Export JV</button>*@
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Listing Transaction</span>
                    <div class="card-tools">
                        @*<button title="Export" type="button" class="btn btn-tool" onclick="apit_export_csv()">
                            <i class="fas fa-file-download"></i>
                        </button>*@
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-sm-12 table-responsive">
                        <table id="apit_tbl_get_transaction_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Reference_No</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Message</th>
                                    <th>Remark</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
            <!--End card listing-->
        </div>
        <div class="col-sm-12" id="listing">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Listing Type Transaction</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-sm-12 table-responsive">
                        <table id="apit_tbl_get_detail_transaction_listing" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Record_No</th>
                                    <th>Reference_No</th>
                                    <th>Action_Type</th>
                                    <th>Action_Date</th>
                                    <th>Request_Data</th>
                                    <th>Response_Data</th>
                                    <th>Header_Data</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
            <!--End card listing-->
        </div>
    </div>
    @* Modal *@
    <div class="modal" id="modalpopupdetail">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    Data Respond From Database
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Data Value<span style="color:red;"></span></label>
                                            <textarea id="view_data" class="form-control" style="margin: 0px; width: 100%; height: 330px; color:black;font-size:12px;"></textarea>
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

