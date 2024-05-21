<div id="RPT_BI_BACKUP_RESTORE" class="tab-pane">
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
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <label>Report Date:&nbsp;<span style="color:green;" id="rpt_bi_bak_report_date"></span></label>
                                </div>
                                <div class="col-sm-4">
                                    <label>Backup From:&nbsp;<span style="color:green;" id="rpt_bi_bak_from_server"></span></label>
                                </div>
                                <div class="col-sm-4">
                                    <label>Restore To:&nbsp;<span style="color:green;" id="rpt_bi_res_to_server"></span></label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">

                                <div class="col-sm-12 table-responsive">
                                    <table cellpadding="0" cellspacing="0" id="rpt_bi_catalog_to_bak_tbl"
                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="rpt_eoc_btn_save" class="btn btn-primary btn-xs" type="button" onclick="fnConfirmArchiveBICatalog()"><i class="fa fa-download"></i> Archive</button>
                        <button id="rpt_eoc_btn_new" class="btn btn-primary btn-xs" type="button" onclick="fnRefreshBICatalog()"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Reports Listing</span>
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
                                        <label>Report Date&nbsp;<span style="color:red;">*</span></label>
                                        <input type="text" id="rpt_bi_bak_rpt_date_in" class="form-control form-control-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12 table-responsive">
                                    <table cellpadding="0" cellspacing="0" id="rpt_bi_catalogs_bak_detail_tbl"
                                           class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnRefreshBackupDetail('Y')"><i class="fas fa-sync"></i>&nbsp;Refresh</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnConfirmUnarchiveBICatalog()"><i class="fas fa-download"></i>&nbsp;Unarchive</button>
                        <button type="button" class="btn btn-primary btn-xs" onclick="fnVerifyDRCatalogOpenModal()"><i class="fas fa-eye"></i>&nbsp;Verify Unarchive</button>
                        @*<button  type="button" class="btn btn-danger btn-xs" onclick="fnConfirmDeleteRptEoCStepDuration()"><i class="fas fa-trash-alt"></i>&nbsp;Delete</button>*@
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>
    </div>
    <div class="modal" id="rpt_bi_verify_unarchive_md">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Realtime DR Catalogs
                </div>
                <div class="modal-body">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <table cellpadding="0" cellspacing="0" id="rpt_bi_verify_unarchive_tbl"
                                       class="display table table-bordered table-hover nowrap" style="width:100%"></table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <div class="flex-container">
                        
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

