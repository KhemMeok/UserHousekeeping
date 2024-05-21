<div id="tab_backup_db" class="tab-pane fade in">
    <div class="col-lg-12" style="margin-left: 0px; margin-right:0px; padding-left: 0px; padding-right:0px;">
        <div class="panel panel-default" style="background-color:transparent;   border:0px; box-shadow:none;">
            <div class="panel-heading" style="background-color: #007CC1; color: white;">DATABASES BACKUP & RESTORATION</div>
            <div class="row">
                <div class="col-lg-12" style="margin-bottom:0px; padding-bottom:0px;">
                    <div class="well well-sm table-responsive my_well" style="overflow-x: hidden; margin-bottom:0px;">
                        <div class="row" style="margin-top: 0px; padding-top: 0px;">
                            <div id="ts_tabmenu" style="margin-top: -8px; margin-left: -5px; padding-top: 0px;">
                                <ul style="margin-top: 0px; padding-top: 0px;">
                                    <li>
                                        <a href="#TAB_DB_RESTORE_DB_BACKUP" id="LI_DB_BACKUP_RESTORE_1" data-toggle="tab"
                                           onclick="ACT_INACT_SUB_LI('LI_DB_BACKUP_RESTORE_', 1, 4); FN_GET_SUB_LAYOUT('DB', '', 'TAB_DB_RESTORE_DB_BACKUP')">
                                            <strong>DB Backup Failed</strong>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#TAB_DB_RESTORE_DB_RETORE" id="LI_DB_BACKUP_RESTORE_2" data-toggle="tab"
                                           onclick="ACT_INACT_SUB_LI('LI_DB_BACKUP_RESTORE_', 2, 4); FN_GET_SUB_LAYOUT('DB_SYNC', 'DB_SYNC_FAIL', 'TAB_DB_SYNC_FAIL')">
                                            <strong>DB Sync Failed</strong>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#TAB_DB_RESTORATION" id="LI_DB_BACKUP_RESTORE_3" data-toggle="tab" onclick="ACT_INACT_SUB_LI('LI_DB_BACKUP_RESTORE_', 3, 4); FN_GET_SUB_LAYOUT('DB_RESTORE', 'DB_RESTORATION', 'TAB_DB_RESTORATION')">
                                            <strong>DB Restoration</strong>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#TAB_DB_TAPE_BACKUP" id="LI_DB_BACKUP_RESTORE_4" data-toggle="tab" onclick="ACT_INACT_SUB_LI('LI_DB_BACKUP_RESTORE_', 4, 4); FN_GET_SUB_LAYOUT('TAPE_BACKUP', 'DB_TAPE_BACKUP', 'TAB_DB_TAPE_BACKUP')">
                                            <strong>TAPE BACKUP</strong>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane fade in active" id="TAB_DB_RESTORE_DB_BACKUP">
                                <table style="padding-bottom: 0px;">
                                    <tbody>
                                        <tr>
                                            <td class="cl_td" style="padding: 0px 10px 0px 0px; border: 0px;">
                                                <label>
                                                    Database Name:<span style="color: Red;">*</span>
                                                </label>
                                                <select id="DB_BACKUP_DBNAME" class="cl_select"></select>
                                            </td>
                                            <td style="padding-left: 0px; border: 0px;">
                                                <label>
                                                    Backup Date<span style="color: Red;">*</span>
                                                </label>
                                                <input class="form-control input-sm date cl_input"
                                                       text-transform uppercase;" id="DB_BACKUP_DATE" type="text" placeholder="DD-MON-YYYY" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0px 10px 0px 0px; border: 0px;" colspan="2">
                                                <label>
                                                    Remark:<span style="color: Red;">*</span>
                                                </label>
                                                <textarea class="form-control" rows="3" id="DB_BACKUP_REMARK"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="border: 0px;">
                                                <button style="margin-top: 5px;" type="button" class="btn btn-xs btn-default" onclick="INSERT_DB_BACKUP_FAIL()">
                                                    Submit
                                                </button>
                                                &nbsp;&nbsp;&nbsp;<span style="color: Red;" id="GET_DB_BACKUP_INSERT_STAT"></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade in" id="TAB_DB_SYNC_FAIL">
                            </div>
                            <div class="tab-pane fade in" id="TAB_DB_RESTORATION">
                            </div>
                            <div class="tab-pane fade in" id="TAB_DB_TAPE_BACKUP">
                            </div>
                        </div>
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
                            <select id="DB_FILTER_MONTH" class="form-control input-sm" style="height: 25px; width: 65px;
                        text-transform: uppercase; vertical-align: bottom;"></select>
                            <button title="Go" id="DB_GO" type="button" class="btn btn-default btn-xs" style="height: 25px;"
                                    onclick="BTN_RETRIEVE_DATA_BY_MONTH('DB')">
                                <i class="fas fa-caret-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-12 table-responsive" style="margin-top: 10px;" id="DIV_DB_BACKUP_FAIL">
                        <table cellpadding="0" cellspacing="0" id="TBL_GET_DATA_DB_BACKUP_FAIL"
                               class="display compact hover table table-condensed table-bordered nowrap" style="font-size: small;width:100%;"></table>
                    </div>
                    <div class="col-lg-12 table-responsive" style="margin-top: 10px; display:none;" id="DIV_DB_SYNC_FAIL">
                        <table cellpadding="0" cellspacing="0" id="TBL_GET_DATA_DB_SYN_FAIL"
                               class="display compact hover table table-condensed table-bordered nowrap" style="font-size: small;width:100%;"></table>
                    </div>
                    <div class="col-lg-12 table-responsive" style="margin-top: 10px; display:none;" id="DIV_DB_RESTORATION">
                        <table cellpadding="0" cellspacing="0" id="TBL_GET_DATA_DB_RESTORATION"
                               class="display compact hover table table-condensed table-bordered nowrap" style="font-size: small;width:100%;"></table>
                    </div>
                    <div class="col-lg-12 table-responsive" style="margin-top: 10px; display:none;" id="DIV_DB_TAPE_BACKUP">
                        <table cellpadding="0" cellspacing="0" id="TBL_GET_DATA_DB_TAPE_BACKUP"
                               class="display compact hover table table-condensed table-bordered nowrap" style="font-size: small; width:100%;"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
