<div id="DE_MAIN_ACCOUNT" class="tab-pane">
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
                                        <label>Saving Account <span style="color:red;">*</span></label>
                                        <div class="input-group mb-3">
                                            <input id="deMAACC" type="text" maxlength="12" class="form-control form-control-sm" placeholder="Search">
                                            <div class="input-group-append">
                                                <button class="btn btn-primary btn-xs" type="button" onclick="deMainAccSearch()"><i class="fas fa-search"></i>&nbsp;Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Account <span style="color:red;">*</span></label>
                                        <input id="deMAaccount" disabled maxlength="12" type="text" class="form-control form-control-sm disabled" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Branch Code <span style="color:red;">*</span></label>
                                        <select id="deMAbrcode" data-placeholder="Choose Branch Code" class="form-control form-control-sm" style="width:100%;">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Currency <span style="color:red;">*</span></label>
                                        <select id="deMAccy" data-placeholder="Choose Currency" class="form-control form-control-sm" style="width:100%;">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Account Name <span style="color:red;">*</span></label>
                                        <select id="deMAaccountname" data-placeholder="Choose Account Name" class="form-control form-control-sm" style="width:100%;" onchange="deMainAccNameCh(this.value)">
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Company Name <span style="color:red;">*</span></label>
                                        <input id="deMAcompanyname" type="text" class="form-control form-control-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button type="button" class="btn btn-primary btn-xs" onclick="deMainSaveAccDialog()"><i class="fas fa-save"></i>&nbsp; Save</button>
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