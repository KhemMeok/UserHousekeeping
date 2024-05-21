<div id="RPT_PATCH_MANAGEMENT" class="tab-pane">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <span class="card-title">
                        <i class="fa fa-pencil-ruler"></i> PATCH MANAGEMENT
                    </span>
                    <div class="card-tools">
                        <div class="btn-group">
                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-wrench"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <a class="dropdown-divider"></a>
                                <a href="javascript:RptPatchMGTClearAll()" class="dropdown-item" style="color:black;">New</a>
                            </div>
                        </div>
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTSystemTypeSl">
                                    System Type&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" data-placeholder="Choose System type..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTSystemTypeSl" onchange="RptPatchMGTFnSysTypeSl()"></select>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTSiteSl">
                                    Site&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTSiteSl" onchange="RptPatchMGTFnSiteSl()">
                                    <option value="" disabled selected style="color: #999"> Choose Site.. </option>
                                    <option value="DC">DC</option>
                                    <option value="DR">DR</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTEnvironmentSl">
                                    Environment&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTEnvironmentSl" onchange="RptPatchMGTFnEnvironmentSl()">
                                    <option value="" disabled selected style="color: #999"> Choose Site.. </option>
                                    <option value="UAT">UAT</option>
                                    <option value="SIT">SIT</option>
                                    <option value="PROD">PROD</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTHostSl">
                                    Host Name&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" data-placeholder="Choose Host..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTHostSl" onchange=""></select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTPatchTypeSl">
                                    Patch Type&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" data-placeholder="Choose Patch type..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTPatchTypeSl" onchange=""></select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTComponentSl">
                                    Patch Component&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" data-placeholder="Choose component..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTComponentSl" onchange="RptPatchMGTFnPatchComponentSl()"></select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTCurrentVersionIn">
                                    Current Version&nbsp; <span style="color:red;">*</span>
                                </label>
                                <input type="text" class="form-control form-control-sm" id="rptPatchMGTCurrentVersionIn" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTUpgradeVersionIn">
                                    Upgrade Version&nbsp; <span style="color:red;">*</span>
                                </label>
                                <input type="text" class="form-control form-control-sm" id="rptPatchMGTUpgradeVersionIn" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTTicketIn">
                                    Ticket No&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" data-placeholder="Choose Ticket..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTTicketIn" onchange="RptPatchMGTFnTicketSl()"></select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTStatusSl">
                                    Status&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select onchange="" style="width:100%;" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTStatusSl">
                                    <option value="" disabled selected style="color: #999"> Choose Status.. </option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="FAILED">Failed</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3" id="divPriority">
                            <div class="form-group">
                                <label for="rptPatchMGTPrioritySl">
                                    Priority&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTPrioritySl">
                                    <option value="" disabled selected style="color: #999"> Choose Option </option>
                                    <option value="YES">Yes</option>
                                    <option value="NO">No</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTSrIn">SR</label>
                                <input type="text" class="form-control form-control-sm" id="rptPatchMGTSrIn" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTDocumentIn">Reference Doc</label>
                                <input type="text" class="form-control form-control-sm" id="rptPatchMGTDocumentIn" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTUatSl">UAT</label>
                                <select style="width:100%;" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTUatSl">
                                    <option value="" disabled selected style="color: #999"> Choose Option </option>
                                    <option value="YES">Yes</option>
                                    <option value="NO">No</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTCriticalitySl">
                                    Criticality&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTCriticalitySl" onchange="">
                                    <option value="" disabled selected style="color: #999"> Choose Criticality.. </option>
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="URGENT">Urgent</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTServiceImpactSl">
                                    Service Impact&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTServiceImpactSl">
                                    <option value="" disabled selected style="color: #999"> Choose Option </option>
                                    <option value="YES">Yes</option>
                                    <option value="NO">No</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTRequesterSl">
                                    Requester&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" data-placeholder="Choose User..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTRequesterSl"></select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTRequestDateIn">
                                    Request Date&nbsp; <span style="color:red;">*</span>
                                </label>
                                <input type="text" id="rptPatchMGTRequestDateIn" class="form-control form-control-sm" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTReviewerSl">
                                    Reviewed By&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" multiple data-placeholder="Choose User..." onchange="" class="col-sm-12 form-control form-control-sm" id="rptPatchMGTReviewerSl"></select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTReviewedDateIn">
                                    Reviewed Date&nbsp; <span style="color:red;">*</span>
                                </label>
                                <input type="text" class="form-control form-control-sm" id="rptPatchMGTReviewedDateIn" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTApprovedSl">
                                    Approved By&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" data-placeholder="Choose User..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTApprovedSl"></select>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTApprovedDateIn">
                                    Approved Date&nbsp; <span style="color:red;">*</span>
                                </label>
                                <input type="text" class="form-control form-control-sm" id="rptPatchMGTApprovedDateIn" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTAppliedBySl">
                                    Applied By&nbsp; <span style="color:red;">*</span>
                                </label>
                                <select style="width:100%;" multiple data-placeholder="Choose User..." class="col-sm-12 form-control form-control-sm" id="rptPatchMGTAppliedBySl"></select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="rptPatchMGTAppliedDateIn">
                                    Applied Date&nbsp; <span style="color:red;">*</span>
                                </label>
                                <input type="text" class="form-control form-control-sm" id="rptPatchMGTAppliedDateIn" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="rptPatchMGTDescriptionIn">
                                    Patch Description&nbsp; <span style="color:red;">*</span>
                                </label>
                                <textarea class="form-control" placeholder="limit 1000 charater" id="rptPatchMGTDescriptionIn" maxlength="1000" style=" font-size: 13px; height: 50px; width: 100%"></textarea>
                            </div>
                        </div>
                        <div class="col-sm-6" id="divRemarkStatusSl">
                            <div class="form-group">
                                <label>Remark</label>
                                <textarea class="form-control" placeholder="limit 1000 charater" id="rptPatchMGTRemarkIn" maxlength="1000" style=" font-size:13px; height: 50px; width: 100%"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button id="rpt_ptm_insert_patch" style=" font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" class="btn btn-primary btn-xs" type="button" onclick="RptPatchMGTInsertNewPatch();">
                            <i class="fas fa-save"></i> Save
                        </button>
                        <button id="rpt_ptm_update_patch_btn" style="display:none; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" class="btn btn-primary btn-xs" type="button">
                            <i class="fas fa-save"></i> Update
                        </button>
                        <button id="rpt_ptm_cancel" style="display:none; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" class="btn btn-danger btn-xs" type="button" onclick="RptPatchMGTClearAll()">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card ">
                <div class="card-header">
                    <span class="card-title">
                        <i class="fa fa-list-alt"></i> Patch listing
                    </span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="form-group col-3">
                                <label for="rpt_patch_date_filter">Report Date </label>
                                <input type="text" class="form-control form-control-sm" placeholder=""
                                       id="rpt_patch_date_filter" style="height: max-content; width: 100%;" onchange="RptPatchFilterByDateChange()">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <table id="rpt_ptm_get_data_table" cellpadding="0" cellspacing="0" class="display compact nowrap table table-bordered table-hover table-sm" style="width:100%">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" style="margin-left:50%;" id="rpt_ptm_get_data_table_ck_selectall">
                                    </th>
                                    <th noraw>NO</th>
                                    <th noraw>REQUEST DATE</th>
                                    <th noraw>REQUESTER</th>
                                    <th noraw>HOST NAME</th>
                                    <th noraw>SYSTEM TYPE</th>
                                    <th noraw>CURRENT VERSION</th>
                                    <th noraw>UPGRADE VERSION</th>
                                    <th noraw>PATCH TYPE</th>
                                    <th noraw>PATCH COMPONENT</th>
                                    <th noraw>DESCRITION</th>
                                    <th noraw>STATUS</th>
                                    <th noraw>UAT</th>
                                    <th noraw>IMPACT</th>
                                    <th noraw>OJECTIVE</th>
                                    <th noraw>DOC ID</th>
                                    <th noraw>APPLIED BY</th>
                                    <th noraw>APPLIED DATE</th>
                                    <th noraw>REVIEWED BY</th>
                                    <th noraw>REVIEWED DATE</th>
                                    <th noraw>APPROVED BY</th>
                                    <th noraw>APPROVED DATE</th>
                                    <th noraw>SR ID</th>
                                    <th noraw>SITE</th>
                                    <th noraw>CRITICALITY</th>
                                    <th noraw>REMARK</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button style=" font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" id="rpt_ptm_getDataTable" class="btn btn-primary btn-xs" type="button" onclick="RptPatchMGTFnGetDataListing()">
                            <i class="fas fa-sync"></i> Refresh
                        </button>
                        <button style=" font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" id="rpt_ptm_edit_patch" class="btn btn-primary btn-xs" type="button" onclick="RptPatchMGTFnEditPatchHandle()">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" id="rpt_ptm_delete_patch" class="btn btn-danger btn-xs" type="button" onclick="RptPatchMGTDeleteExitingPatchHandle()">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>