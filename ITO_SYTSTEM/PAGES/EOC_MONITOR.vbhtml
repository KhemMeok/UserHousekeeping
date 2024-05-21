<div id="EOC_MONITOR" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title">System Operation</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">Parameter Configuration</span>
                                    <div class="card-tools">
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Today Date <code>*</code></label>
                                                <input type="text" class="form-control form-control-sm" id="eoc_monitor_today_date" />
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Next Working Date <code>*</code></label>
                                                <input type="text" class="form-control form-control-sm" id="eoc_monitor_nextworking_date" />
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Next Next Working Date <code>*</code></label>
                                                <input type="text" class="form-control form-control-sm" id="eoc_monitor_next_nextworking_date" />
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Target Stage <code>*</code></label>
                                                <select id="eoc_monitor_conf_target_stage" style="width:100%" class="form-control form-control-sm" onchange="fnEoCMtrTargetStageChange(this.value)">
                                                    <option value="MARKTIMELVL9">1. Mark Time Level 9</option>
                                                    <option value="MARKEOTI">2. Mark End of Transaction Input</option>
                                                    <option value="POSTEOTI_1">3. Post End of Transaction Input 1</option>
                                                    <option value="POSTEOTI_2">4. Post End of Transaction Input 2</option>
                                                    <option value="POSTEOTI_3">5. Post End of Transaction Input 3</option>
                                                    <option value="MARKEOFI">6. Mark End of Financial Input</option>
                                                    <option value="POSTEOFI_1">7. Post End of Financial Input 1</option>
                                                    <option value="POSTEOFI_2">8. Post End of Financial Input 2</option>
                                                    <option value="POSTEOFI_3" selected>9. Post End of Financial Input 3</option>
                                                    <option value="MARKEOD">10. Mark End of Day</option>
                                                    <option value="POSTEOD_1">11. Post End of Day 1</option>
                                                    <option value="POSTEOD_2">12. Post End of Day 2</option>
                                                    <option value="POSTEOD_3">13. Post End of Day 3</option>
                                                    <option value="MARKBOD">14. Mark Beginning of Day</option>
                                                    <option value="POSTBOD_1">15. Post Beginning of Day 1</option>
                                                    <option value="POSTBOD_2">16. Post Beginning of Day 2</option>
                                                    <option value="POSTBOD_3">17. Post Beginning of Day 3</option>
                                                    <option value="MARKTI">18. Mark Transaction Input</option>
                                                    <option value="MARKEOPD">19. Mark End of Previous Day</option>
                                                    <option value="POSTEOPD_1">20. Post End of Previous Day 1</option>
                                                    <option value="POSTEOPD_2">21. Post End of Previous Day 2</option>
                                                    <option value="POSTEOPD_3">22. Post End of Previous Day 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        @*<div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>EoDM Branch Check<code>*</code></label>
                                                    <select id="#" class="form-control form-control-sidebar"></select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Branch Contact<code>*</code></label>
                                                    <select id="#" class="form-control form-control-sidebar"></select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Department Contact<code>*</code></label>
                                                    <select id="#" class="form-control form-control-sidebar"></select>
                                                </div>
                                            </div>*@
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">EoD Summary</span>

                                </div>
                                <div class="card-body table-responsive">
                                    <table id="#" class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th noraw>
                                                    <i class="fas fa-landmark"></i>
                                                </th>
                                                <th noraw>

                                                </th>
                                                <th noraw>
                                                    Totals
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td nowrap>Total Branches</td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_total_branches"></span></strong></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Finish EoC <strong style="color:green">[<span id="eoc_monitor_summary_stage">POSTEOFI_3</span>]</strong></td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_total_fin_eoc_stage"></span></strong></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Daily GL Pulled</td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_daily_gl_pulled"></span></strong></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>EoDM</td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_total_eodm"></span></strong></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Not EoDM</td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_total_not_eodm"></span></strong></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Failed EoDM</td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_failed_eodm"></span></strong></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Mismatch GL Balance</td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_mismatch_gl_bal"></span></strong></td>
                                            </tr>
                                            <tr>
                                                <td nowrap>Real Debug Enabled</td>
                                                <td nowrap>:</td>
                                                <td nowrap><strong style="color:green"><span id="sp_eoc_mo_real_debug"></span></strong></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div class="card-footer">
                                    <div class="flex-container">
                                        <button type="button" class="btn btn-primary btn-xs" onclick="fnEoCMtrGetEoDSummary('Process')">
                                            <i class="fas fa-play"></i>&nbsp; Refresh
                                        </button>
                                        <button type="button" class="btn btn-warning btn-xs" onclick="fnAutoRefreshEoDSummary()" title="Auto Refresh Every 10s">
                                            <i class="fa fa-sync" id="icon_eoc_mo_auto_refresh"></i>&nbsp; Auto Refresh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @*-----End EoC Date-----*@
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Branch Monitor</span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">Branch Runable</span>
                                    <div class="card-tools">
                                        <button title="Refresh" type="button" class="btn btn-tool" onclick="fnEoCMtrGetRunAbleBr()">
                                            <i class="fas fa-play"></i>
                                        </button>
                                        <button title="Auto Refresh Every 10s" type="button" class="btn btn-tool" onclick="fnAutoRefreshRunAbleBr()">
                                            <i class="fa fa-sync" id="icon_eoc_mo_auto_refresh_runable_br"></i>
                                        </button>
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="eoc_mo_tbl_runable_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>Branch Code</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">Branches Finish EoDM</span>
                                    <div class="card-tools">
                                        <button title="Refresh" type="button" class="btn btn-tool" onclick="fnEoCMtrGetFinEoDMBr()">
                                            <i class="fas fa-play"></i>
                                        </button>
                                        <button title="Auto Refresh Every 10s" type="button" class="btn btn-tool" onclick="fnAutoRefreshFinEoDMBr()">
                                            <i class="fa fa-sync" id="icon_eoc_mo_auto_refresh_fin_eodm_br"></i>
                                        </button>
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="eoc_mo_tbl_fin_eodm_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>Branch Code</th>
                                                <th noraw>Current Posting Date</th>
                                                <th noraw>Next Posting Date</th>
                                                <th noraw></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">Branches Not Yet EoDM</span>
                                    <div class="card-tools">
                                        <button title="Refresh" type="button" class="btn btn-tool" onclick="fnEoCMtrGetNotFinEoDMBr()">
                                            <i class="fas fa-play"></i>
                                        </button>
                                        <button title="Auto Refresh Every 10s" type="button" class="btn btn-tool" onclick="fnAutoRefreshNotFinEoDMBr()">
                                            <i class="fa fa-sync" id="icon_eoc_mo_auto_refresh_not_fin_eodm_br"></i>
                                        </button>
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive">

                                    <table id="eoc_mo_tbl_not_fin_eodm_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>Branch Code</th>
                                                <th noraw>Current Posting Date</th>
                                                <th noraw>Next Posting Date</th>
                                                <th noraw></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">Branches Failed EoDM</span>
                                    <div class="card-tools">
                                        <button title="Refresh" type="button" class="btn btn-tool" onclick="fnEoCMtrGetFailedEoDMBr()">
                                            <i class="fas fa-play"></i>
                                        </button>
                                        <button title="Auto Refresh Every 10s" type="button" class="btn btn-tool" onclick="fnAutoRefreshFailedEoDMBr()">
                                            <i class="fa fa-sync" id="icon_eoc_mo_auto_refresh_failed_eodm_br"></i>
                                        </button>
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive">

                                    <table id="eoc_mo_tbl_failed_eodm_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>Branch Code</th>
                                                <th noraw>Current Posting Date</th>
                                                <th noraw>Next Posting Date</th>
                                                <th noraw></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">Branches Finished EoD</span>
                                    <div class="card-tools">
                                        <button title="Refresh" type="button" class="btn btn-tool" onclick="fnEoCMtrGetFinEoDBr()">
                                            <i class="fas fa-play"></i>
                                        </button>
                                        <button title="Auto Refresh Every 10s" type="button" class="btn btn-tool" onclick="fnAutoRefreshFinEoDBr()">
                                            <i class="fa fa-sync" id="icon_eoc_mo_auto_refresh_fin_eod_br"></i>
                                        </button>
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="eoc_mo_tbl_fin_EoD_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>EoC Status</th>
                                                <th noraw>Branch Code</th>
                                                <th noraw>EoD Date</th>
                                                <th noraw>Branch Date</th>
                                                <th noraw>Target Stage</th>
                                                <th noraw>Running Stage</th>
                                                <th noraw>Current Stage</th>
                                                <th noraw>EoC Ref No</th>
                                                <th noraw>Error Code</th>
                                                <th noraw>Message</th>
                                                <th noraw></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">EoD Running</span>
                                    <div class="card-tools">
                                        <strong title="Running Stage"><span id="sp_eoc_mo_running_stage"></span></strong>&nbsp;
                                        <button title="Refresh" type="button" class="btn btn-tool" onclick="fnEoCMtrGetSubmittedBr()">
                                            <i class="fas fa-play"></i>
                                        </button>
                                        <button title="Auto Refresh Every 5s" type="button" class="btn btn-tool" onclick="fnAutoRefreshSubmittedBr()">
                                            <i class="fa fa-sync" id="icon_eoc_mo_auto_refresh_submitted_br"></i>
                                        </button>
                                        <button title="Set Alarm" type="button" class="btn btn-tool" onclick="">
                                            <i class="fa fa-bell"></i>
                                        </button>
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="eoc_mo_tbl_running_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>EoC Status</th>
                                                <th noraw>Branch Code</th>
                                                <th noraw>EoD Date</th>
                                                <th noraw>Branch Date</th>
                                                <th noraw>Target Stage</th>
                                                <th noraw>Running Stage</th>
                                                <th noraw>Current Stage</th>
                                                <th noraw>EoC Ref No</th>
                                                <th noraw>Error Code</th>
                                                <th noraw>Message</th>
                                                <th noraw></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">EoD Queue</span>
                                    <div class="card-tools">
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>

                                </div>
                                <div class="card-body table-responsive">
                                    <table id="eoc_mo_tbl_queue_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>EoC Status</th>
                                                <th noraw>Branch Code</th>
                                                <th noraw>EoD Date</th>
                                                <th noraw>Branch Date</th>
                                                <th noraw>Target Stage</th>
                                                <th noraw>Running Stage</th>
                                                <th noraw>Current Stage</th>
                                                <th noraw>EoC Ref No</th>
                                                <th noraw>Error Code</th>
                                                <th noraw>Message</th>
                                                <th noraw></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-outline">
                                <div class="card-header">
                                    <span class="card-title">EoD Aborted</span>
                                    <div class="card-tools">
                                        <button title="Close Panel" type="button" class="btn btn-tool" data-card-widget="remove">
                                            <i class="fas fa-times" style="color:red;"></i>
                                        </button>
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="eoc_mo_tbl_aborted_br" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th noraw>Group Code</th>
                                                <th noraw>EoC Status</th>
                                                <th noraw>Branch Code</th>
                                                <th noraw>EoD Date</th>
                                                <th noraw>Branch Date</th>
                                                <th noraw>Target Stage</th>
                                                <th noraw>Running Stage</th>
                                                <th noraw>Current Stage</th>
                                                <th noraw>EoC Ref No</th>
                                                <th noraw>Error Code</th>
                                                <th noraw>Message</th>
                                                <th noraw></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fab-container">
        <div class="fab fab-icon-holder">
            <i class="fas fa-tasks"></i>
            
        </div>
        <ul class="fab-options">
            <li data-tooltip="Tablespace" data-tooltip-position="left">
                <div class="fab-icon-holder">
                    <a href="javascript:fnEoCMtrGetTablespace()">
                        <i class="fas fa-cubes"></i>
                    </a>
                </div>
            </li>

            <li data-tooltip="Current Databases Size" data-tooltip-position="left">
                <div class="fab-icon-holder">
                    <a href="javascript:fnEoCMtrGetCBSDBSize()">
                        <i class="fas fa-database"></i>
                    </a>
                </div>
            </li>

            <li data-tooltip="Contact Number" data-tooltip-position="left">
                <div class="fab-icon-holder">
                    <a href="javascript:fnContactGet()">
                        <i class="fas fa-id-card-alt"></i>
                    </a>
                </div>
            </li>

            <li data-tooltip="Pending Transaction" data-tooltip-position="left">
                <div class="fab-icon-holder">
                    <a href="javascript:fnPendingtrnGet()">
                        <i class="fas fa-user-clock"></i>
                    </a>
                </div>
            </li>

            <li data-tooltip="Missmatch Balance" data-tooltip-position="left">
                <div class="fab-icon-holder">
                    <a href="javascript:fnMissmatchBalancetrnGet()">
                        <i class="far fa-list-alt"></i>
                    </a>
                </div>
            </li>
        </ul>
    </div>

    @*<ul id="menu" class="mfb-component--br mfb-zoomin" data-mfb-toggle="hover">
            <li class="mfb-component__wrap">
                <a href="#" class="mfb-component__button--main">
                    <i class="mfb-component__main-icon--resting fas fa-tasks"></i>
                    <i class="mfb-component__main-icon--active fas fa-times"></i>
                </a>
                <ul class="fab-options">
                    <li>
                        <a href="javascript:fnEoCMtrGetTablespace()" data-mfb-label="Tablespace" class="mfb-component__button--child">
                            <i class="mfb-component__child-icon fas fa-cubes"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:fnEoCMtrGetCBSDBSize()" data-mfb-label="Current Databases Size" class="mfb-component__button--child">
                            <i class="mfb-component__child-icon fas fa-database"></i>
                        </a>
                    </li>

                    <li>
                        <a href="javascript:fnContactGet()" data-mfb-label="Contact Number" class="mfb-component__button--child">
                            <i class="mfb-component__child-icon fas fa-id-card-alt" aria-hidden="true"></i>


                        </a>
                    </li>

                    <li>
                        <a href="javascript:fnPendingtrnGet()" data-mfb-label="Pending Transaction" class="mfb-component__button--child">
                            <i class="mfb-component__child-icon far fa-list-alt" aria-hidden="true"></i>

                        </a>
                    </li>

                    <li>
                        <a href="javascript:fnMissmatchBalancetrnGet()" data-mfb-label="Missmatch Balance" class="mfb-component__button--child">
                            <i class="mfb-component__child-icon far fa-list-alt" aria-hidden="true"></i>

                        </a>
                    </li>
                </ul>

        </ul>*@
    <!--modal_tablespace-->
    <div class="modal" id="modal_tablespace" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Core Banking Database Tablespaces
                </div>
                <div class="modal-body table-responsive">
                    <div class="card card-outline">
                        <div class="card-header">
                            <span class="card-title">Tablespaces</span>
                            <div class="card-tools">
                                <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body table-responsive">
                            <table id="eoc_mo_tbl_cbs_tbs" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="eoc_mo_tbl_cbs_tbs_ck_selectall"></th>
                                        <th noraw>Tablespace Name</th>
                                        <th noraw>Size</th>
                                        <th noraw>Used</th>
                                        <th noraw>Free</th>
                                        <th noraw>Used %</th>
                                        <th noraw>Free %</th>
                                        <th noraw>Max Size</th>
                                        <th noraw>Used Max %</th>
                                        <th noraw></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="card-footer">
                            <div class="flex-container">
                                <button type="button" class="btn btn-primary btn-xs" onclick="fnEoCMtrRefreshCBSTBS('Y')"><i class="fas fa-sync"></i> Refresh</button>
                                <button type="button" class="btn btn-primary btn-xs" onclick="fnEoCMtrGetDatafile()"><i class="fas fa-info-circle"></i> Datafile Info</button>
                            </div>
                        </div>
                    </div>
                    <div class="card card-outline">
                        <div class="card-header">
                            <span class="card-title">Datafile</span>
                            <div class="card-tools">
                                <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body table-responsive">
                            <table id="eoc_mo_tbl_cbs_dbs" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                                <thead>
                                    <tr>
                                        <th noraw>Tablespace Name</th>
                                        <th noraw>File ID</th>
                                        <th noraw>Size</th>
                                        <th noraw>Free</th>
                                        <th noraw>Used %</th>
                                        <th noraw>Max Size</th>
                                        <th noraw>Used Max %</th>
                                        <th noraw>Auto Extended</th>
                                        <th noraw>Status</th>
                                        <th noraw>File Name</th>
                                        <th noraw></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">

                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_cbs_curr_size" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Core Banking Database Size
                </div>
                <div class="modal-body" style="text-align:center;">

                    <div id="chartCBSSize" style="height: 370px; width: 100%;"></div>

                    <div class="progress">
                        <div id="pr_eoc_mtr_used_pct" class="progress-bar" style="background-color:#86DCBD;">
                        </div>
                        <div id="pr_eoc_mtr_free_pct" class="progress-bar" style="background-color:#E9A19B;">
                        </div>
                    </div>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnEoCMtrRefreshCBSDBSize('Y')"><i class="fas fa-sync"></i> Refresh</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>





    <!--contact new-->
    <div class="modal" id="modal_contact" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Contact Numbers
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table id="eoc_mo_tbl_contact_tbs" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                            <thead>
                                <tr>
                                    @*<th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="eoc_mo_tbl_contact_ck_selectall"></th>*@
                                    <th noraw>BRANCH_CODE</th>
                                    <th noraw>STAFF_ID</th>
                                    <th noraw>NAME</th>
                                    <th noraw>POSITION</th>
                                    <th noraw>TELEPHONE</th>
                                    <th noraw></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnCheckContact('Y')"><i class="fas fa-sync"></i> Refresh</button>
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>




    <!--missmatch balance-->
    <div class="modal" id="modal_missmatch" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Missmatch Balance
                </div>
                <div class="modal-body ">

                    <div class="table-responsive">
                        <table id="eoc_mo_tbl_MissmatchBalanc_tbs" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                            <thead>
                                <tr>
                                    <th noraw>NO</th>
                                    <th noraw>BRANCH_CODE</th>
                                    <th noraw>MARKER_ID</th>
                                    <th noraw>MODULE</th>
                                    <th noraw>REAL_DR</th>
                                    <th noraw>REAL_CR</th>
                                    <th noraw>DR_MINUS_CR</th>
                                    <th noraw>CONT_DR</th>
                                    <th noraw>CONT_CR</th>
                                    <th noraw>MEMO_DR</th>
                                    <th noraw>MEMO_CR</th>
                                    <th noraw>POSN_DR</th>
                                    <th noraw>POSN_CR</th>
                                    <th noraw>FINANCIAL_CYCLE</th>
                                    <th noraw>PERIOD CODE</th>
                                    <th noraw></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class=" modal-footer">


                    <button type="button" class="btn btn-primary btn-xs" onclick="fnMissmatchBalancetrn('Y')"><i class="fas fa-sync"></i> Refresh</button>

                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>

                </div>
            </div>
        </div>
    </div>



    <!--pending transaction-->
    <div class="modal" id="modal_pending" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Pending Transaction
                </div>
                <div class="modal-body">


                    <div class="table-responsive">

                        <table id="eoc_mo_tbl_pending_tbs" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                            <thead>
                                <tr>
                                    @*<th><input type="checkbox" style="margin-top:5px;margin-left:50%;" id="eoc_mo_tbl_cbs_tbs_ck_selectall"></th>*@
                                    <th noraw>NO</th>
                                    <th noraw>PENDING_TYPE</th>
                                    <th noraw>BRANCH_CODE</th>
                                    <th noraw>MODULE</th>
                                    <th noraw>REFERENCE_NUMBER</th>
                                    <th noraw>EVENT</th>
                                    <th noraw>MARKER_ID</th>
                                    <th noraw>TILL_ID</th>
                                    <th noraw>FUNCTION_ID</th>
                                    <th noraw>KEY_ID</th>
                                    <th noraw>TABLE_NAME</th>
                                    <th noraw>RECORD_STAT</th>
                                    <th noraw>AUTH_STAT</th>
                                    <th noraw>USER_NAME</th>
                                    <th noraw></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class=" modal-footer">


                    <button type="button" class="btn btn-primary btn-xs" onclick="fnPendingtrn('Y')"><i class="fas fa-sync"></i> Refresh</button>

                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">
                        Close
                    </button>

                </div>
            </div>
        </div>
    </div>

</div>






