<div id="API_CHECK_CONNECTION" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title"><i class="fa fa-list-alt"></i> Listing Connection</span>
                    
                    <div class="card-tools">

                        @*<button title="Auto Refresh Every 10s" type="button" class="btn btn-tool" onclick="fnAutoRefreshService()">
            <i class="fa fa-sync" id="api_connection_refresh_all_service"></i>
        </button>*@
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>

                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3">
                           <div class="form-group">
                               <select style="width:100%;" id="apic_auto_refresh_service" class="form-control form-control-sm" onchange="">
                                   <option value="refresh_service">Refresh Services Normal</option>
                                   <option value="auto_refresh_service_15_sec">Auto Refresh Services 15 Sec</option>
                                   <option value="auto_refresh_service_30_sec">Auto Refresh Services 30 Sec</option>
                                   <option value="auto_refresh_service_1_mn">Auto Refresh Services 1 Min</option>
                               </select> 
                           </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="col-sm-3">
                                <div class="form-group" style="padding-top:3.5px;">
                                    <button class="btn btn-primary btn-xs" type="button" onclick="fnAutoRefreshService()"><i class="fas fa-sync" id="api_connection_refresh_all_service"></i>&nbsp;Refresh</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="col-sm-12 table-responsive">
                                    <table id="api_connection_all_serivce" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Service Name</th>
                                                <th>Enpoint_Type</th>
                                                <th>Location</th>
                                                <th>Offline_date</th>
                                                <th>Online_date</th>
                                                <th>Status</th>
                                                <th>Status_Code</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="card-header">
                                    <span class="card-title"><i class="fa fa-chart-pie"></i> Service</span>
                                    <div class="card-tools">
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="card-body">
                                        <div id="APICtotalService" style="height: 300px; width: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                        </div>

                    </div>
            <!--End card listing-->
        </div>

    </div>
    <div class="fab-container">
        <div class="fab fab-icon-holder" style="background-color:mediumturquoise">
            <i class="fas fa-tasks"></i>

        </div>
        <ul class="fab-options">
            <li data-tooltip="Check Connection Service" data-tooltip-position="left">
            <div class="fab-icon-holder" style="background-color:mediumturquoise">
                <a href="javascript:fnAPICCheckEndpoint()">
                    <i class="fas fa-sort-amount-up"></i>
                </a>
            </div>
        </li>
            <li data-tooltip="Check Downtime Service" data-tooltip-position="left">
                <div class="fab-icon-holder" style="background-color:mediumturquoise">
                    <a href="javascript:fnAPICCheckSerDowntime()">
                        <i class="fas fa-hourglass-end"></i>
                    </a>
                </div>
            </li>
            <li data-tooltip="Chart Service" data-tooltip-position="left">
                <div class="fab-icon-holder" style="background-color:mediumturquoise">
                    <a href="javascript:fnAPICChartService()">
                        <i class="fas fa-chart-line"></i>
                    </a>
                </div>
            </li>
        </ul>
    </div>

    <div class="modal" id="modal_check_connection" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Connection
                </div>
                <div class="modal-body table-responsive">
                    <div class="card card-outline">
                        <div class="card-header">
                            <span class="card-title">Check Connection Service</span>
                            <div class="card-tools">
                                <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Service Types</label>
                                            <select id="api_endpoint_type" @*multiple="multiple"*@ data-placeholder="Choose Service Type" class="form-control form-control-sm" style="width: 100%;">
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Status</label>
                                            <input type="text" class="form-control form-control-sm" id="status_connection" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label>Status Code</label>
                                            <input type="text" class="form-control form-control-sm" id="status_code_connection" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Response</label>
                                            <textarea id="apip_stauts_response" class="form-control" style="margin: 0px; width: 100%; color:black;font-size:12px;height:300px;" disabled></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" type="button" onclick="api_transaction_fn_check_con('Process')"><i class="fas fa-arrow-down"></i>&nbsp;Check</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Close</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <div class="modal" id="modal_ser_downtime" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Api Connection
                </div>
                <div class="modal-body table-responsive">
                        <div class="col-sm-12">
                            <div class="card ">
                                <div class="card-header">
                                    <span class="card-title"><i class="fa fa-list-alt"></i> Check Connection</span>
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
                                                <label>Service types</label>
                                                <select id="api_connection_type3" @*multiple="multiple"*@ data-placeholder="Choose Service Type" class="form-control form-control-sm" style="width: 100%;">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Range Value DownTime</label>
                                                <input type="text" class="form-control form-control-sm" id="api_connection_date_check_down">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="flex-container">
                                        <button class="btn btn-primary btn-xs" type="button" onclick="api_check_connection_fn_query()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                                        <button class="btn btn-primary btn-xs" type="button" onclick="apic_export_csv()"><i class="fas fa-arrow-down"></i>&nbsp;Èxport</button>
                                       
                                    </div>
                                </div>
                            </div>
                            <!--End card listing-->
                        </div>
                        <div class="col-sm-12">
                            <div class="card ">
                                <div class="card-header">
                                    <span class="card-title"><i class="fa fa-list-alt"></i> Listing Service DownTime</span>
                                    <div class="card-tools">
                                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-12 table-responsive">
                                            <table id="api_connection_listing_downtime" cellpadding="0" cellspacing="0" class="display nowrap compact table table-bordered table-hover table-sm" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>Service Name</th>
                                                        <th>Location</th>
                                                        <th>Down Time</th>
                                                        <th>Up Time</th>
                                                        <th>Total DownTime</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Close</button>
                        </div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="modal" id="modal_chart_connection" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">
                    Chart Service
                </div>
                <div class="modal-body table-responsive">
                    <div class="col-sm-12">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Chart Connection</span>
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
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Service types</label>
                                                    <select id="api_connection_type1" multiple="multiple" data-placeholder="Choose Service Type" class="form-control form-control-sm" style="width: 100%;" >
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Range Value date</label>
                                                    <input type="text" class="form-control form-control-sm" id="api_connection_query_date">

                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <button class="btn btn-primary btn-xs" type="button" onclick="api_chart_down_connection_fn_query()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="card ">
                                            <div class="card-header">
                                                <span class="card-title"><i class="fa fa-chart-line"></i> Chart Service DownTime</span>
                                                <div class="card-tools">
                                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                                        <i class="fas fa-minus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="card-body">
                                                    <div id="APICALLChartDown" style="height: 300px; width: 100%;"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="card-body">
                                                    <div id="APICtotalChartDown" style="height: 400px; width: 100%;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <!--End card listing-->
                    </div>
                    <div class="col-sm-12">
                        <div class="card ">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Chart Service</span>
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
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Service types</label>
                                                    <select id="api_connection_type2" data-placeholder="Choose Service Type" class="form-control form-control-sm" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Value Date</label>
                                                    <input type="text" class="form-control form-control-sm" id="api_connection_date_query_downtime" placeholder="Choose Value Date">
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <button class="btn btn-primary btn-xs" type="button" onclick="api_check_chart_connection_fn_query()"><i class="fas fa-arrow-down"></i>&nbsp;Query</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="card ">
                                            <div class="card-header">
                                                <span class="card-title"><i class="fa fa-chart-bar"></i> View Chart Service DownTime(Day)</span>
                                                <div class="card-tools">
                                                    <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                                                        <i class="fas fa-minus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div id="chartCDowntime" style="height: 300px; width: 100%;"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                           
                        </div>
                        <!--End card listing-->
                    </div>
                    
                    <div class=" modal-footer">
                        <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
               
            </div>
        </div>
  </div>


