<div id="EOC_RESTORE_POINT_CREATE" class="tab-pane">
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
                            <div class="form-group">
                                <label>Create types <span style="color: Red;">*</span></label>
                                <select style="width:100%;" id="eoc_restore_point_create_type" class="form-control form-control-sm">
                                    <option value="NULL">Choose create type</option>
                                    <option value="BEFORE_EOC">Before EoC</option>
                                    <option value="AFTER_EOC">After EoC</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnConfirmRestorePointCreate()"><i class="fas fa-pen-nib"></i> Create</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Restore points listing</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 table-responsive">
                            <table cellpadding="0" cellspacing="0" id="eoc_restore_point_tbl_listing"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDataRestorePointRefresh()"><i class="fa fa-sync"></i> Refresh</button>
                    </div>

                </div>
            </div>
            <!--End card listing-->
        </div>
        @* Modal *@
        <div class="modal" id="eoc_restore_point_create_confirm" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <span>Create Restore Point</span>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body" style="border: 0px;">
                        <div class="row">
                            <div class="col-sm-12 text-center"><span style="color:red;">This is critical! </span> Are you sure to create restore point?</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="flex-container">
                            <button type="button" class="btn btn-primary btn-xs" onclick="fnCreateRestorePoint()"><i class="fas fa-check"></i> Yes</button>
                            <button type="button" class="btn btn-default btn-xs" data-dismiss="modal"><i class="fas fa-times"></i> No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>