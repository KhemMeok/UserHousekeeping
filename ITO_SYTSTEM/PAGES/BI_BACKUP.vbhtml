<div id="tab_backup_bi" class="tab-pane fade in">
    <div class="col-lg-12" style="margin-left: 0px; margin-right:0px; padding-left: 0px; padding-right:0px;">
        <div class="panel panel-default" style="background-color:transparent;   border:0px; box-shadow:none;">
            <div class="panel-heading" style="background-color: #007CC1; color: white;">BI BACKUP & RESTORATION</div>
            <div class="row">
                <div class="col-lg-12" style="margin-bottom:0px; padding-bottom:0px;">
                    <div class="well well-sm table-responsive my_well" style="overflow-x: hidden; margin-bottom:0px;">
                        <table style="padding-bottom: 0px;">
                            <tbody>
                                <tr>
                                    <td style="padding: 0px 10px 0px 0px; border: 0px;">
                                        <label>
                                            Backup Date<span style="color: Red;">*</span>
                                        </label>
                                        <input class="form-control input-sm" style="height: 25px; width: 250px; text-transform: uppercase;"
                                               id="bi_backup_date" type="text" placeholder="DD-MON-YYYY" />
                                    </td>
                                    <td style="padding-left: 0px; border: 0px;">
                                        <label>
                                            Restore Date<span style="color: Red;">*</span>
                                        </label>
                                        <input class="form-control input-sm" style="height: 25px; width: 250px; text-transform: uppercase;"
                                               id="bi_restore_date" type="text" placeholder="DD-MON-YYYY" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 0px;">
                                        <label>
                                            Backup Status<span style="color: Red;">*</span>
                                        </label>
                                        &nbsp;&nbsp;&nbsp;<input class="input-sm" type="checkbox" id="ck_bi_backup_stat"
                                                                 style="vertical-align: bottom;" checked="checked" />
                                    </td>
                                    <td style="padding-left: 0px; border: 0px;">
                                        <label>
                                            Restore Status<span style="color: Red;">*</span>
                                        </label>
                                        &nbsp;&nbsp;&nbsp;<input class="input-sm" id="ck_bi_restore_stat" style="vertical-align: bottom;"
                                                                 type="checkbox" checked="checked" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 0px;">
                                        <button type="button" class="btn btn-xs btn-default" onclick="INSERT_BI_BACKUP_RESTORE()">
                                            Submit
                                        </button>
                                        &nbsp;&nbsp;&nbsp;<span style="color: Red;" id="get_bi_backup_restore"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12" style="margin-left: 0px; margin-right:0px; padding-left: 0px; padding-right:0px; padding-top:0px; margin-top:0px;">
        <div class="panel panel-default" style="background-color:transparent; border:0px; box-shadow:none;">
            <div class="panel-heading" style="background-color: #007CC1; color: white;">Data listing</div>
            <div class="well well-sm table-responsive my_well" style="overflow-x: hidden;">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="input-group">
                            <span class="input-group-addon input-sm" style="height: 25px;">
                                <i class="fas fa-filter">
                                </i>
                            </span>
                            <select id="BI_FILTER_MONTH" class="form-control input-sm" style="height: 25px; width: 65px; text-transform: uppercase;
                        vertical-align: bottom;"></select> <button title="Go" id="FILTER_DB_GO" onclick="BTN_RETRIEVE_DATA_BY_MONTH('BI')" type="button" class="btn btn-default btn-xs" style="height:25px;"><i class="fas fa-caret-right"></i></button>
                        </div>

                    </div>
                    <div class="col-lg-12 table-responsive" style="margin-top:10px;">
                        <table cellpadding="0" cellspacing="0" id="TBL_GET_ALL_BI_BACKUP" width="100%" class="display compact hover table table-condensed table-bordered nowrap"
                               style="font-size: small;"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
