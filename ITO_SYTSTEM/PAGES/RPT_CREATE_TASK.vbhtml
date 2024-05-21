<div id="RPT_CREATE_TASK" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-pencil-ruler"></i> Operation</span>
                    <div class="card-tools">
                        <div class="btn-group">
                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-wrench"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <a class="dropdown-divider"></a>
                                <a href="#" class="dropdown-item" style="color:black;">New</a>
                            </div>
                        </div>
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Task Name <span style="color:red;">*</span></label>
                                        <input id="rpt_ct_t_name" type="text" class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Expect Start Date <span style="color:red;">*</span></label>
                                        <input id="rpt_ct_t_exp-stdate" type="text" class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Expect End Date <span style="color:red;">*</span></label>
                                        <input id="rpt_ct_t_exp-eddate" type="text" class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Current Status <span style="color:red;">*</span></label>
                                        <select class="form-control form-control-sm" style="width:100%"></select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Review 1 <span style="color:red;">*</span></label>
                                        <select class="form-control form-control-sm" style="width:100%"></select>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Review 2</label>
                                        <select class="form-control form-control-sm" style="width:100%"></select>
                                    </div>
                                </div>


                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Review 3</label>
                                        <select class="form-control form-control-sm" style="width:100%"></select>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Approve <span style="color:red;">*</span></label>
                                        <select class="form-control form-control-sm" style="width:100%"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Summary <span style="color:red;">*</span></label>
                                        <textarea style="height:1000px;" id="rpt_ct_t_summary"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs btn-normal" onclick="deMainSaveAccDialog()"><i class="fas fa-save"></i>&nbsp; Save</button>
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
                        <div class="col-sm-12 table-responsive">
                            <table cellpadding="0" cellspacing="0" id="deMAdatatable"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button class="btn btn-primary btn-xs" type="button" onclick="deMainAccQuery()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                        <button class="btn btn-danger btn-xs" type="button" onclick="deMainAccDeleteDialog()"><i class="fas fa-trash"></i>&nbsp;Delete</button>
                    </div>
                </div>
            </div>
            <!--End card listing-->
        </div>

    </div>
</div>