<div id="RPT_DOC_MANAGEMENT" class="tab-pane">
    <div class="row">
        <div class="col-12">
            <div class="card card-info">
                <div class="card-header">
                    <span class="card-title">
                        <i class="fas fa-file fa-lg" style="color: white"></i> Document
                        Operation
                    </span>
                    <div class="card-tools">
                        <div class="btn-group">
                            <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-wrench"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <a class="dropdown-divider"></a>
                                <a href="javascript:DocumentMGTfnClearAll()" class="dropdown-item"
                                   style="color: black">New</a>
                            </div>
                        </div>
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="form-group col-sm-4">
                                <label>Department<code>*</code></label>
                                <select data-placeholder="Choose Department." onchange="" style="width: 100%; border-radius: 10px;"
                                        class="form-control form-control-sm" id="rpt_doc_departement"></select>
                            </div>
                            <div class="form-group col-sm-4">
                                <label>Unit<code>*</code></label>
                                <select data-placeholder="Choose Unit.." onchange="DocMGTFnUnitSelectChange()"
                                        style="width: 100%" class="form-control form-control-sm"
                                        id="rpt_doc_unit_departement"></select>
                            </div>
                            <div class="col-sm-4">
                                <label>Category<code>*</code></label>
                                <div class="input-group">
                                    <select data-placeholder="Choose Category"
                                            onchange="DocumentMGTfnMonthlyReportSelect()"
                                            class="form-control form-control-sm" id="rpt_doc_category"></select>
                                    <div class="input-group-append">
                                        <button onclick="DocumentMGTfnOpenModuleForMaintenanceReport('category')"
                                                class="btn btn-primary btn-xs" type="button">
                                            &nbsp;<i class="fa fa-plus"></i>&nbsp;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-4" id="">
                                <label>Document Name<code>*</code></label>
                                <div class="input-group">
                                    <select data-placeholder="Choose Report.." onchange=""
                                            class="form-control form-control-sm" id="rpt_doc_name"></select>
                                    <div class="input-group-append">
                                        <button onclick="DocumentMGTfnOpenModuleForMaintenanceReport('document')"
                                                class="btn btn-primary btn-xs" type="button">
                                            &nbsp;<i class="fa fa-plus"></i>&nbsp;
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-4">
                                <label>Date <code>*</code></label>
                                <input type="text" class="form-control form-control-sm" placeholder="Choose Date "
                                       id="rpt_doc_date" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label for="rptDocumentManagementFileInput">Document File<code>*</code></label>
                                <input style="margin-bottom: 5px" id="rptDocumentManagementFileInput"
                                       class="form-control-file" type="file" name="rptDocumentManagementFileInput"
                                       onchange="DocumentMGTfnUploadFile()" multiple />
                                <div class="table-responsive">
                                    <table id="rptDocumentManagementTableListingFileInput" cellpadding="0"
                                           cellspacing="0" class="display compact table table-hover table-sm"
                                           style="width: 100%; border-collapse: collapse">
                                        <thead>
                                            <tr></tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="form-group col-sm-6" id="">
                                <label for="rpt_doc_remark">Remark</label>
                                <textarea style="height: 55px" type="textarea" class="form-control form-control-sm"
                                          placeholder="1000 character" id="rpt_doc_remark" maxlength="1000"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="btn_insert_doc_management" class="btn btn-primary btn-xs" type="button"
                                onclick="DocumentMGTfnSaveNewDocumentHandle()">
                            <i class="fa fa-save"></i>&nbsp;Save
                        </button>
                        <button style="
                display: none;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " disabled id="btn_update_doc_management" class="btn btn-primary btn-xs" type="button"
                                onclick="DocumentMGTfnUpdateDocument();">
                            <i class="fa fa-save"></i>&nbsp;Update
                        </button>
                        <button style="
                display: none;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="btn_reset_doc_management" class="btn btn-danger btn-xs" type="button"
                                onclick="DocumentMGTfnClearAll();">
                            <i class="fa fa-times"></i>&nbsp; Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div class="card card-info">
                <div class="card-header">
                    <span class="card-title">
                        <i class="fas fa-file-alt fa-lg" style="color: white"></i> Document
                        Listing
                    </span>
                    <div class="card-tools">
                        <button title="Minimize" type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="form-group col-3">
                                <label for="rpt_doc_management_filter_dep">Department</label>
                                <select id="rpt_doc_management_filter_dep" multiple="multiple"
                                        onchange="DocMGTFnDepartmentFilterSelect()" data-placeholder="Choose department.."
                                        class="form-control form-control-sm" style="width: 100%"></select>
                            </div>
                            <div class="form-group col-3">
                                <label for="rpt_doc_management_filter_unit">Unit</label>
                                <select id="rpt_doc_management_filter_unit" multiple="multiple" onchange=""
                                        data-placeholder="Choose unit.." class="form-control form-control-sm"
                                        style="width: 100%"></select>
                            </div>
                            <div class="form-group col-3">
                                <label for="rpt_doc_management_filter_category_doc">Document Category</label>
                                <select id="rpt_doc_management_filter_category_doc" multiple="multiple" onchange=""
                                        data-placeholder="Choose Category.." class="form-control form-control-sm"
                                        style="width: 100%"></select>
                            </div>
                            <div class="form-group col-3">
                                <label for="rpt_doc_date_date_filter">Date </label>
                                <input type="text" class="form-control form-control-sm" placeholder="Choose Date "
                                       id="rpt_doc_date_date_filter" style="height: max-content; width: 100%"
                                       onchange="" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12 table-responsive" id="#">
                                <table id="rpt_doc_management" cellpadding="0" cellspacing="0"
                                       class="display compact nowrap table table-bordered table-hover table-sm"
                                       style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" style="margin-left: 50%"
                                                       id="rpt_doc_management_ck_selectall" />
                                            </th>
                                            <th noraw>No</th>
                                            <th noraw>Department</th>
                                            <th noraw>Unit</th>
                                            <th noraw>Code/Ticket</th>
                                            <th noraw>Document Name</th>
                                            <th noraw>Date</th>
                                            <th noraw>Category</th>
                                            <th noraw>Upload By</th>
                                            <th noraw>Upload Date</th>
                                            <th noraw>File Name</th>
                                            <th noraw>File Path</th>
                                            <th noraw>Last Oper</th>
                                            <th noraw>Last Oper Date</th>
                                            <th noraw>Remark</th>
                                            <th noraw>Status</th>
                                            <th noraw></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="flex-container">
                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="rpt_refresh_doc_management" class="btn btn-primary btn-xs" type="button"
                                onclick="DocMGTGetDataTbListing()">
                            <i class="fa fa-sync-alt"></i>&nbsp;Refresh
                        </button>
                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="rpt_delete_doc_management" class="btn btn-primary btn-xs" type="button"
                                onclick="DocMgtFnFilterListing();">
                            <i class="fas fa-arrow-down"></i>&nbsp;Query Filter
                        </button>
                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="#" class="btn btn-primary btn-xs" type="button" onclick="DocumentMGTfnEditDocument();">
                            <i class="fas fa-edit"></i>&nbsp;Edit
                        </button>

                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="rpt_delete_doc_management" class="btn btn-danger btn-xs" type="button"
                                onclick="DocumentMGTfnDeleteDocument();">
                            <i class="fas fa-trash"></i>&nbsp;Delete
                        </button>
                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="rpt_downloand_doc_management" onclick="DocumentMGTfnDownloadFile()" class="btn btn-primary btn-xs"
                                type="button">
                            <i class="fas fa-file-download"></i>&nbsp;Download Document
                        </button>
                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="rpt_downloand_doc_management" onclick="DocumentMGTfnOpenModuleForMaintenanceReport('category')"
                                class="btn btn-info btn-xs" type="button">
                            <i class="fa fa-cog"></i>&nbsp;Maintenance
                        </button>
                        <button style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              " id="rpt_downloand_doc_management" onclick="DocumentMGTfnOpenModuleForSummaryReport()"
                                class="btn btn-info btn-xs" type="button">
                            <i class="fas fa-eye"></i>&nbsp;Report Summary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_maintenance_report" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">Maintenance</div>
                <div class="modal-body" id="modal_body">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Maintenance</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool"
                                            data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card card-primary card-outline card-outline-tabs">
                                                <div class="card-header p-0 border-bottom-0">
                                                    <ul class="nav nav-tabs" role="tablist">
                                                        <li class="nav-item">
                                                            <a class="nav-link active" data-toggle="pill"
                                                               href="#rpt_doc_mgt_category_tab"
                                                               onclick="DocumentMGTfnTabChange('category_tab')"
                                                               role="tab">Category</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" data-toggle="pill"
                                                               href="#rpt_doc_mgt_category_report_tab"
                                                               onclick="DocumentMGTfnTabChange('category_report')"
                                                               role="tab">Map Document</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="card-body">
                                                    <div class="tab-content">
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <button id="rpt_doc_mgt_btn_clear"
                                                                        class="btn btn-primary btn-xs" type="button"
                                                                        onclick="">
                                                                    <i class="fas fa-broom"></i> New
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div class="tab-pane fade show active"
                                                             id="rpt_doc_mgt_category_tab" role="tabpanel">
                                                            <div class="col-sm-12">
                                                                <div class="row">
                                                                    <div class="col-sm-3">
                                                                        <div class="form-group">
                                                                            <label>
                                                                                Category Name
                                                                                <span style="color: Red">*</span>
                                                                            </label>
                                                                            <input type="text"
                                                                                   id="rpt_doc_mgt_category_maintance_name"
                                                                                   class="form-control form-control-sm" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <div class="form-group">
                                                                            <label>Remark </label>
                                                                            <input type="text"
                                                                                   id="rpt_doc_mgt_category_maintance_remark"
                                                                                   class="form-control form-control-sm" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <div class="form-group" style="
                                        margin-top: 28px;
                                        position: relative;
                                      ">
                                                                            <div class="icheck-primary d-inline">
                                                                                <input style="margin-top: 20px"
                                                                                       type="checkbox"
                                                                                       class="form-control form-control-sm"
                                                                                       id="rpt_doc_mgt_category_maintance_monthly_check" />
                                                                                <label for="rpt_doc_mgt_category_maintance_monthly_check">Monthly</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="tab-pane fade" id="rpt_doc_mgt_category_report_tab"
                                                             role="tabpanel">
                                                            <div class="col-sm-12">
                                                                <div class="row">
                                                                    <div class="col-sm-3">
                                                                        <div class="form-group">
                                                                            <label>
                                                                                Category Name
                                                                                <span style="color: Red">*</span>
                                                                            </label>
                                                                            <select data-placeholder="Choose Category"
                                                                                    onchange="" style="width: 100%"
                                                                                    class="form-control form-control-sm"
                                                                                    id="rpt_doc_mgt_report_maintance_category_id"></select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <div class="form-group">
                                                                            <label>
                                                                                Document Name
                                                                                <span style="color: Red">*</span>
                                                                            </label>
                                                                            <input type="text"
                                                                                   id="rpt_doc_mgt_report_maintance_report_name"
                                                                                   class="form-control form-control-sm" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <div class="form-group">
                                                                            <label>Code / Ticket </label>
                                                                            <input type="text"
                                                                                   id="rpt_doc_mgt_report_maintance_code"
                                                                                   class="form-control form-control-sm" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <div class="form-group">
                                                                            <label for="rpt_doc_mgt_report_maintenance_unit_code">
                                                                                Unit
                                                                            </label>
                                                                            <select data-placeholder="Choose unit.."
                                                                                    onchange="" style="width: 100%"
                                                                                    class="form-control form-control-sm"
                                                                                    id="rpt_doc_mgt_report_maintenance_unit_code"></select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex-container">
                                    <button class="btn btn-primary btn-xs" id="rpt_doc_mgt_save_btn" type="button"
                                            onclick="DocumentMGTfnInsertNewCategory()">
                                        <i class="fas fa-edit"></i> Save
                                    </button>
                                    <button class="btn btn-success btn-xs" style="display: none"
                                            id="rpt_doc_mgt_update_btn" type="button" onclick="">
                                        <i class="fas fa-edit"></i>
                                        Update
                                    </button>
                                    <button class="btn btn-danger btn-xs" style="display: none"
                                            id="rpt_doc_mgt_cancel_btn" type="button" onclick="">
                                        <i class="fas fa-times"></i> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <span class="card-title"><i class="fa fa-list-alt"></i> Maintenance Listing</span>
                                <div class="card-tools">
                                    <button title="Minimize" type="button" class="btn btn-tool"
                                            data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="card card-primary card-outline card-outline-tabs">
                                            <div class="card-header p-0 border-bottom-0">
                                                <ul class="nav nav-tabs" role="tablist">
                                                    <li class="nav-item active">
                                                        <a class="nav-link" data-toggle="pill"
                                                           href="#rpt_doc_mgt_category_listing_tab"
                                                           onclick="DocumentMGTfnTabChange('category_listing_tab')"
                                                           role="tab">Category Listing</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" data-toggle="pill"
                                                           href="#rpt_doc_mgt_category_report_listing_tab"
                                                           onclick="DocumentMGTfnTabChange('category_report_listing')"
                                                           role="tab">Map Document Listing</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="card-body">
                                                <div class="tab-content">
                                                    <div class="tab-pane fade show active"
                                                         id="rpt_doc_mgt_category_listing_tab" role="tabpanel">
                                                        <div class="row">
                                                            <div class="col-sm-12 table-responsive">
                                                                <table id="rpt_doc_category_listing" cellpadding="0"
                                                                       cellspacing="0"
                                                                       class="display nowrap compact table table-bordered table-hover table-sm"
                                                                       style="width: 100%">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                <input type="checkbox" style="
                                            margin-top: 5px;
                                            margin-left: 50%;
                                          " id="rpt_doc_category_listing_ck_selectall" />
                                                                            </th>
                                                                            <th noraw>No</th>
                                                                            <th noraw>Category Name</th>
                                                                            <th noraw>Remark</th>
                                                                            <th noraw>Last Oper ID</th>
                                                                            <th noraw>Last Oper Date</th>
                                                                            <th noraw></th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade"
                                                         id="rpt_doc_mgt_category_report_listing_tab" role="tabpanel">
                                                        <div class="row">
                                                            <div class="col-sm-12 table-responsive">
                                                                <table id="rpt_doc_report_listing" cellpadding="0"
                                                                       cellspacing="0"
                                                                       class="display nowrap compact table table-bordered table-hover table-sm"
                                                                       style="width: 100%">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                <input type="checkbox"
                                                                                       style="margin-left: 50%"
                                                                                       id="rpt_doc_report_listing_ck_selectall" />
                                                                            </th>
                                                                            <th noraw>No</th>
                                                                            <th noraw>Category Name</th>
                                                                            <th noraw>Document Name</th>
                                                                            <th noraw>Code/Ticket</th>
                                                                            <th noraw>Unit</th>
                                                                            <th noraw>Last Oper ID</th>
                                                                            <th noraw>Last Oper Date</th>
                                                                            <th noraw></th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                <div class="flex-container">
                                                    <button class="btn btn-primary btn-xs"
                                                            id="rpt_doc_mgt_maintance_btn_refresh" type="button"
                                                            onclick="DocumentMGTfnFirstLoad()">
                                                        <i class="fa fa-sync"></i> Refresh
                                                    </button>
                                                    <button class="btn btn-primary btn-xs"
                                                            id="rpt_doc_mgt_maintance_btn_edit" type="button"
                                                            onclick="DocumentMGTfnEditCategory()">
                                                        <i class="fas fa-edit"></i> Edit
                                                    </button>
                                                    <button class="btn btn-danger btn-xs"
                                                            id="rpt_doc_mgt_maintance_btn_delete" type="button"
                                                            onclick="DocumentMGTfnDeleteCategory()">
                                                        <i class="fa fa-trash"></i>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <!--End card listing-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal"
                            onclick="DocumentMGTfnCloseModule()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal_summary_report" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-header">Report Summary</div>
                <div class="modal-body" id="modal_body">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="form-group col-3">
                                <label for="rpt_doc_year_filter">Year </label>

                                <select data-placeholder="Choose date.." onchange="DocMGTFnGetSummaryReport()"
                                        style="width: 100%; height:fit-content" class="form-control form-control-sm"
                                        id="rpt_doc_year_filter"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12 table-responsive" id="#">
                                <table id="rpt_doc_summary_listing" cellpadding="0" cellspacing="0"
                                       class="display compact nowrap table table-bordered table-hover table-sm"
                                       style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th noraw>No</th>

                                            <th noraw>Report Name</th>
                                            <th noraw>Jan</th>
                                            <th noraw>Feb</th>
                                            <th noraw>Mar</th>
                                            <th noraw>Apr</th>
                                            <th noraw>May</th>
                                            <th noraw>Jun</th>
                                            <th noraw>Jul</th>
                                            <th noraw>Aug</th>
                                            <th noraw>Sep</th>
                                            <th noraw>Oct</th>
                                            <th noraw>Nov</th>
                                            <th noraw>Dec</th>
                                            <th noraw>Unit</th>
                                            <th noraw>Report ID</th>
                                            <th noraw>FREQUENCY</th>
                                            <th noraw></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-xs" data-dismiss="modal"
                            onclick="DocumentMGTfnCloseModule()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>