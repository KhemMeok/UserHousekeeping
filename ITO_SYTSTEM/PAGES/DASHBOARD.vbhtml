<div id="TAB_DASHBOARD" class="tab-pane fade in active">
    <div class="col-lg-12" style="margin-left: 0px; margin-right:0px; padding-left: 0px; padding-right:0px;">
        <div class="panel panel-default" style="background-color:transparent;  border:0px; box-shadow:none;">
            <div class="panel-heading text-center" style="background-color: #007CC1; color: white;">
                <h5>
                    <span style="color: White; font-weight: lighter bold;">DASHBOARD</span>
                </h5>
            </div>
            <div class="row">
                <div class="col-lg-12 col-xs-12" id="DAB_EOC" style="display:none;">
                    <div class="well well-sm table-responsive my_well  table-responsive">
                        <img src="~/image/icons/dashboard.png" class="img-fluid" alt="Responsive image" height="20px;" /> <span>EoC Summary</span>
                        <hr />
                        <table cellpadding="0" cellspacing="0" width="100%" class="table table-striped nowrap">
                            <thead>
                                <tr>

                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">FCUB System Date</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">FCUB Next System Date</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">EoC Target Stage</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Total Branch</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Finished EoC</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Double EoC</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Finished EoDM</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Not Yet EoDM</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Double EoDM</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Branch Double EoDM</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">Real Debug</th>
                                    <th style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">EoC Process</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_SDATE"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_NDATE"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_TARGET_STAGE"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="FCUB_TOT_BRANCHES"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_FEOC"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_DEOC"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_FEODM"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_NEODM"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_DEODM"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_DBREODM"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_REAL_DEBUG"></span></td>
                                    <td style="white-space:nowrap;text-overflow:ellipsis; overflow:hidden;"><span id="EOC_PROCESS"></span></td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />
                        <button type="button" class="btn btn-primary btn-xs" onclick="FN_FETCH_DASHBOARD_EOC_MONITOR('EOC_MONITOR', 'EOC_MONITOR')"><i class="fas fa-sync"></i> Refresh</button>
                    </div>
                </div>
                <div class="col-lg-3 col-xs-3" id="DAB_ACCOUNT_DE" style="display:none;">
                    <div class="well well-sm table-responsive my_well">
                        <img src="~/image/icons/dashboard.png" class="img-fluid" alt="Responsive image" height="20px;" /> <span>Accounting DE Summary</span>
                        <hr />
                        <table class="w3-table w3-striped nowrap">
                            <tr>
                                <td>Pending Transaction</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACDE_TOT_PENDING"></span></td>
                            </tr>
                            
                            <tr>
                                <td>Total Batches Today</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACDE_TOT_BATCH"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches USD</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACDE_TOT_BATCH_USD"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches KHR</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACDE_TOT_BATCH_KHR"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches THB</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACDE_TOT_BATCH_THB"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Deleted</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACDE_TOT_BATCH_DEL"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Back Date</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACDE_TOT_BATCH_BD"></span></td>
                            </tr>
                        </table>
                        <hr />
                        <button type="button" class="btn btn-primary btn-xs" onclick="FN_FETCH_DASH_ACDE('ACDE')"><i class="fas fa-sync"></i> Refresh</button>
                    </div>
                </div>
                <div class="col-lg-3 col-xs-3" id="DAB_ACCOUNT_IFRS" style="display:none;">
                    <div class="well well-sm table-responsive my_well">
                        <img src="~/image/icons/dashboard.png" class="img-fluid" alt="Responsive image" height="20px;" /> <span>Accounting IFRS Summary</span>
                        <hr />
                        <table class="w3-table w3-striped nowrap">
                            <tr>
                                <td>Pending Transaction</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACIF_TOT_PENDING"></span></td>
                            </tr>

                            <tr>
                                <td>Total Batches Today</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACIF_TOT_BATCH"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches USD</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACIF_TOT_BATCH_USD"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches KHR</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACIF_TOT_BATCH_KHR"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches THB</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACIF_TOT_BATCH_THB"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Deleted</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACIF_TOT_BATCH_DEL"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Back Date</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="ACIF_TOT_BATCH_BD"></span></td>
                            </tr>
                        </table>
                        <hr />
                        <button type="button" class="btn btn-primary btn-xs" onclick="FN_FETCH_DASH_ACIF('ACIF')"><i class="fas fa-sync"></i> Refresh</button>
                    </div>
                </div>
                <div class="col-lg-3 col-xs-3" id="DAB_TREASURY_DE" style="display:none;">
                    <div class="well well-sm table-responsive my_well">
                        <img src="~/image/icons/dashboard.png" class="img-fluid" alt="Responsive image" height="20px;" /> <span>Treasury DE Summary</span>
                        <hr />
                        <table class="w3-table w3-striped nowrap">
                            <tr>
                                <td>Pending Transaction</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="TRDE_TOT_PENDING"></span></td>
                            </tr>

                            <tr>
                                <td>Total Batches Today</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="TRDE_TOT_BATCH"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches USD</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="TRDE_TOT_BATCH_USD"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches KHR</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="TRDE_TOT_BATCH_KHR"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches THB</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="TRDE_TOT_BATCH_THB"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Deleted</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="TRDE_TOT_BATCH_DEL"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Back Date</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="TRDE_TOT_BATCH_BD"></span></td>
                            </tr>
                        </table>
                        <hr />
                        <button type="button" class="btn btn-primary btn-xs" onclick="FN_FETCH_DASH_TRDE('TRDE')"><i class="fas fa-sync"></i> Refresh</button>
                    </div>
                </div>
                <div class="col-lg-3 col-xs-3" id="DAB_UPLOAD_BATCH" style="display:none;">
                    <div class="well well-sm table-responsive my_well">
                        <img src="~/image/icons/dashboard.png" class="img-fluid" alt="Responsive image" height="20px;" /> <span>Payroll & Channel Banking Summary</span>
                        <hr />
                        <table class="w3-table w3-striped nowrap">
                            <tr>
                                <td>Pending Transaction</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="UPLOAD_TOT_PENDING"></span></td>
                            </tr>

                            <tr>
                                <td>Total Batches Today</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="UPLOAD_TOT_BATCH"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches USD</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="UPLOAD_TOT_BATCH_USD"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches KHR</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="UPLOAD_TOT_BATCH_KHR"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batches THB</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="UPLOAD_TOT_BATCH_THB"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Deleted</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="UPLOAD_TOT_BATCH_DEL"></span></td>
                            </tr>
                            <tr>
                                <td>Total Batched Back Date</td>
                                <td style="padding-left: 0px; border: 0px; width:1%">:</td>
                                <td><span id="UPLOAD_TOT_BATCH_BD"></span></td>
                            </tr>
                        </table>
                        <hr />
                        <button type="button" class="btn btn-primary btn-xs" onclick="FN_FETCH_DASH_UPLOAD('UPLOAD')"><i class="fas fa-sync"></i> Refresh</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
