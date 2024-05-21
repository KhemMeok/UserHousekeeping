<div id="DE_CHECK_PENDING" class="tab-pane">
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
                            <div class="form-group">
                                <label>Choose Batch Types <span style="color:red;"></span></label>
                                <div class="input-group">
                                    <select style="width:80%;" data-placeholder="Choose Batch Types..." class="form-control form-control-sm" multiple id="deCheckPendingBatchTypes">
                                    </select>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary btn-xs" type="button" onclick="fnDeCheckPendingTrn()"><i class="fas fa-search"></i>&nbsp;Check</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 table-responsive">
                            <table cellpadding="0" cellspacing="0" id="deCheckPendingTbl"
                                   class="table table-bordered table-hover nowrap"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>