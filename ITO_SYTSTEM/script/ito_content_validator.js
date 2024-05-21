/// <reference path="ito_variable.js" />
/// <reference path="ito_eoc_handle.js" />

//User access management
var layoutValidate = {
    Layout: function (layout_name) {
        $("#" + layout_name + " .card-header").addClass("bg-info");
        if (layout_name == "USER_PROFILE") {
            selectionStyle.MultipleInline("up_email_uploader_to", undefined);
            selectionStyle.MultipleInline("up_email_uploader_cc", undefined);
            selectionStyle.MultipleInline("up_email_authorizer_to", undefined);
            selectionStyle.MultipleInline("up_email_authorizer_cc", undefined);
            selectionStyle.MultipleInline("up_email_inform", undefined);

        };
        if (layout_name == "ACL_REQUEST_CONTROL") {
            datePicker.DateTime("ACL_REQ_WKS_FROM_DATETIME");
            datePicker.DateTime("ACL_REQ_WKS_TO_DATETIME");
            myRequest.Execute(aclApplicationSelect, { DATA: STAFF_ID }, aclFnReqConApp);
            myRequest.Execute(aclRequestTypeSelect, { DATA: "" }, aclFnReqConReqType);
            myRequest.Execute(aclTicketSelect, { DATA: "ACL_TICKET_NO" }, aclFnReqConTicketNo);
            var reqData1 = { DATA: "" };
            myRequest.Execute(aclSelectUserUrl, reqData1, aclFnReqConUser);
            datePicker.DateTime("ACL_TXT_CHECK_DATETIME");

            var requestDataLog = { DATA: "ACL_USER_LOG|" + STAFF_ID, table_id: "TBL_ACL_USER_LOG" };
            var requestDataConReq = { DATA: "ACL_REQ_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_REQ_CONTROL" };
            myRequest.Execute(aclSelectDataUrl, requestDataLog, aclFnReqConUserLogs);
            myRequest.Execute(aclSelectDataUrl, requestDataConReq, aclFnReqConUserReq);
            datePicker.DateTime("ACL_REQ_ADJ_WSCHFROM");
            datePicker.DateTime("ACL_REQ_ADJ_WSCHTO");
            datePicker.DateTime("ACL_REQ_ADJ_CHECKIN");
            datePicker.DateTime("ACL_REQ_ADJ_CHECKOUT");
        };
        if (layout_name == "ACL_REQUEST_REVIEW") {
            myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REV_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_REV_CONTROL" }, aclFnReqConUserRev);
        };
        if (layout_name == "ACL_REQUEST_APPROVE") {
            myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_APP_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_APP_CONTROL" }, aclFnReqConUserApp);
        };
        if (layout_name == "DE_BATCH_POSTING") {
            selectionStyle.LiveSearch("de_posting_batch_type", deBatchTypesCheckRequestOpt);
            if ($("#de_posting_batch_type option").length == 2) {
                $("#de_posting_batch_type option:eq(1)").prop("selected", true);
                selectionStyle.LiveSearchRefresh("de_posting_batch_type");
                fnGetBatchSource_de_posting();
                fnCurrentBatchNo();
                fnShowCheckbox_de_posting();
                fnDepostingUserRole();
                fnProcessStageView();
            };
            selectionStyle.MultipleInline("de_posting_batch_type_filter", deBatchTypesCheckRequestOpt);
            setTimeout(function () {
                if ($("#de_posting_batch_type_filter option").length == 1) {
                    $("#de_posting_batch_type_filter option:eq(0)").prop("selected", true)
                    selectionStyle.MultipleInlineRefresh("de_posting_batch_type_filter");
                };
            }, 1000);
            datePicker.DateTime("de_posting_schedule_datetime");
            datePicker.Date("de_posting_batch_curr_date");
            element.SetCurrentDate('de_posting_batch_curr_date');
            datePicker.DateRange("de_posting_query_date");
            selectionStyle.MultipleInline("de_posting_req_delete_group_id", undefined);
            selectionStyle.MultipleInline("de_posting_req_delete_batch_no", undefined);
            selectionStyle.MultipleInline("de_posting_req_delete_branch_code", undefined);
            //alert($('#de_posting_batch_type option').length)

        }; // De Posting
        if (layout_name == "DE_BATCH_UPLOAD") {
            selectionStyle.MultipleInline("de_bu_requester", undefined);
            selectionStyle.Multiple("de_bu_group_id", undefined);
            datePicker.DateRange("de_bu_query_vr");
            selectionStyle.MultipleInline("de_bu_bt", deBatchTypesUploadOpt);
            //selectionStyle.MultipleInlineRefresh("de_bu_bt");
            selectionStyle.MultipleInline("de_bu_query_bt", deBatchTypesUploadOpt);
            //selectionStyle.MultipleInlineRefresh("de_bu_query_bt");
            setTimeout(function () {
                if ($("#de_bu_bt option").length == 1) {
                    $("#de_bu_bt option:eq(0)").prop("selected", true)
                    selectionStyle.MultipleInlineRefresh("de_bu_bt");
                    fnDeBuGetRequester();
                };
                if ($("#de_bu_query_bt option").length == 1) {
                    $("#de_bu_query_bt option:eq(0)").prop("selected", true)
                    selectionStyle.MultipleInlineRefresh("de_bu_query_bt");
                };
            }, 1000);

            element.inputValue("de_upload_sp_fcub_user", v_fcub_upload_user);
        };
        if (layout_name == "DE_BATCH_AUTHORIZE") {
            selectionStyle.MultipleInline("de_ba_requester", undefined);
            selectionStyle.Multiple("de_ba_group_id", undefined);
            datePicker.DateRange("de_ba_query_vr");
            selectionStyle.MultipleInline("de_ba_bt", deBatchTypesAuthorizeOpt);
            selectionStyle.MultipleInline("de_ba_query_bt", deBatchTypesAuthorizeOpt);
            //selectionStyle.MultipleInlineRefresh("de_ba_bt");
            //selectionStyle.MultipleInlineRefresh("de_ba_query_bt");
            setTimeout(function () {
                if ($("#de_ba_bt option").length == 1) {
                    $("#de_ba_bt option:eq(0)").prop("selected", true)
                    selectionStyle.MultipleInlineRefresh("de_ba_bt");
                    fnDeBaGetRequester();
                };

                if ($("#de_ba_query_bt option").length == 1) {
                    $("#de_ba_query_bt option:eq(0)").prop("selected", true)
                    selectionStyle.MultipleInlineRefresh("de_ba_query_bt");
                };
            }, 1000);
            selectionStyle.Multiple("de_ba_batch_no", undefined);
            element.inputValue("de_authorize_sp_fcub_user", v_fcub_authorize_user);

        };
        if (layout_name == "DE_BATCH_APPROVE") {
            deAppFetchRequester("N");
            selectionStyle.Multiple("deAppBatchNo", undefined);
            deAppFetchRequest("N");
        };
        if (layout_name == "DE_BATCH_DELETE") {
            deFetchBatchDeleteRequester("N");
            selectionStyle.MultipleInline("deDeleteBatchRequester", undefined);
            selectionStyle.Multiple("deDeleteBatchNo", undefined);
            deFetchBatchDeleteAvl("N");
        };
        if (layout_name == "DE_BATCH_TYPE_CREATION") {
            myRequest.Execute(v_deBatchTypeGetAllBatchSource, { batch_type: "" }, fnDeBTCGetAllBatchSourceCallBack);
            BtcGetBatchTypeLising();
            selectionStyle.LiveSearch("de_btc_mem_role", undefined);
        };
        if (layout_name == "DE_PRE_CHECK_CREATION") {
            fnPreCheckQuery();
            selectionStyle.MultipleInline("de_pre_check_custo_batch_types", deAllBatchTypes);
            datePicker.Date("de_pre_check_custo_perioddate")
            myRequest.Execute(v_dePreCheckGetAllUsersWs, undefined, fnDePreCheckGetAllUsersCallBack);
        };
        if (layout_name == "DE_CHECK_PENDING") {
            selectionStyle.MultipleInline("deCheckPendingBatchTypes", deAllBatchTypes);
            setTimeout(function () {
                if ($("#deCheckPendingBatchTypes option").length == 1) {
                    $("#deCheckPendingBatchTypes option:eq(0)").prop("selected", true)
                    selectionStyle.MultipleInlineRefresh("deCheckPendingBatchTypes");
                };
            }, 1000);
        };

        if (layout_name == "DE_MAIN_ACCOUNT") {
            myRequest.Execute(v_deMainAccQuery, { table_id: "deMAdatatable" }, mcFnQuery);
        };

        if (layout_name == "EOC_PARAMETERS") {
            datePicker.Date("eoc_param_log_date_in");
            CallAPI.Go(v_fcubs_first_load, undefined, fnEocParamFirstLoadCallBack);
        };

        if (layout_name == "EOC_RESTORE_POINT_CREATE") {
            myRequest.Execute(v_EoCGetRestorePoint, undefined, fnEoCGetRestorePointCB);
        };

        if (layout_name == "USER_CREATION") {
            datePicker.Date("umt_uc_req_date");
            myRequest.Execute(v_userGetModules, undefined, userFnGetModuleCallBack);
            UmtGetAllUserList("N");
            editor.summernoteModal("umt_uc_sms_txt");
            myRequest.Execute(v_userGetUserAccessAPI, { user_id: STAFF_ID }, fnGetUserAccessAPICallBack);
            accessAPIEnable();
        };
        if (layout_name == "API_END_POINT") {
            selectionStyle.LiveSearch("umt_new_end_point_module_select", undefined);
            selectionStyle.LiveSearch("umt_new_end_point_sys_sub_module", undefined);
            selectionStyle.LiveSearch("umt_new_end_point_filter_mudule", undefined);
            selectionStyle.LiveSearch("umt_new_end_point_filter_sub_mudule", undefined);
            CallAPI.Go(v_getTemplete, undefined, fnGetSystemModuleCallBack, "Fetching Data...");
            datePicker.DateRange("umt_new_end_point_date_filter");
        };
        if (layout_name == "RPT_EOC_REPORT") {
            goShowHide.showOnDivAsInline("eoc_duraction_btn_save");
            datePicker.DateTime("eoc_duration_start_time_in");
            datePicker.DateTime("eoc_duration_end_time_in");
            datePicker.Date("rpt_eoc_duration_rpt_date_in");
            datePicker.DateTime("rpt_eoc_duration_start_time_update_in");
            datePicker.DateTime("rpt_eoc_duration_end_time_update_in");
            editor.summernoted("rpt_eoc_pending_resolve_detail_in");
            editor.summernoted("rpt_eoc_failure_resolve_detail_in");
            editor.summernoteModal("rpt_eoc_pending_resolve_detail_up_in");
            editor.summernoteModal("rpt_eoc_failure_resolve_detail_up_in");
            selectionStyle.LiveSearchRefresh("rpt_eoc_pending_resolved_type_sl");
            selectionStyle.LiveSearchRefresh("rpt_eoc_pending_resolved_type_up_sl");
            selectionStyle.LiveSearch("rpt_eoc_pending_issue_sl");
            selectionStyle.LiveSearch("rpt_eoc_pending_issue_up_sl");
            CallAPI.Go(v_rpt_eoc_first_load_endpoint, undefined, fnCallBackRptEoCFirstLoad, "Fetching Data...");

        };
        if (layout_name == "EOC_MONITOR") {
            datePicker.Date("eoc_monitor_today_date");
            datePicker.Date("eoc_monitor_nextworking_date");
            datePicker.Date("eoc_monitor_next_nextworking_date");
            selectionStyle.LiveSearch("eoc_monitor_conf_target_stage");

            CallAPI.Go(v_eoc_mtr_param_config, undefined, fnEoCMtrParamConfigCallBack);


        };
        if (layout_name == "RPT_BI_BACKUP_RESTORE") {
            datePicker.Date("rpt_bi_bak_rpt_date_in");
            var data = { site: "DC" };
            setTimeout(function () { CallAPI.Go(v_rpt_bi_catalog_list, data, fnCatalogListCallBack, "Fetching Data..."); }, 1000);

        }
        if (layout_name == "RPT_SERVER_INVENTORY") {
            CallAPI.Go(v_rpt_server_invt_on_load, undefined, fnRPTServerINVTFirstLoadCallBack, "Fetching Data...");
            //Initialize data ip inputmask
            $('[data-mask]').inputmask();
            datePicker.Date("rpt_server_invt_startdate");
            datePicker.Date("rpt_server_invt_expiredate");
            //Initialize tagging input
            amsifySuggestags = new AmsifySuggestags($('#rpt_server_invt_contact_person'));
            amsifySuggestags._init();


            $('#zoomBtn').click(function () {
                $('.zoom-btn-sm').toggleClass('scale-out');
            });
        };
        //////////////API
        if (layout_name == "API_PARAMETERS") {
            CallAPI.Go(v_api_managemnet_on_load, undefined, fnAPIManegementLoadCallBack, "Fetching Data...");
        };
        if (layout_name == "API_CHECK_TRANSACTION") {
            CallAPI.Go(v_api_transaction_on_load, undefined, fnAPITransactionLoadTypeCallBack, "Fetching Data...");
            datePicker.DateTimeRange("api_transcation_query_date");
        };
        if (layout_name == "API_CHECK_CONNECTION") {
            CallAPI.Go(v_api_managemnet_connection_onload, undefined, fnAPIconnectionLoadTypeCallBack, "Fetching Data...");
            //CallAPI.Go(v_api_managemnet_connection_onloadall, undefined, fnAPIconnectionLoadallTypeCallBack, "Fetching Data...");
            datePicker.DateRange("api_connection_query_date");
            datePicker.Date("api_connection_date_query_downtime");
            datePicker.DateRange("api_connection_date_check_down");
            setTimeout(function () {
                if ($("#api_connection_type1 option").length == 1) {
                    $("#api_connection_type1 option:eq(0)").prop("selected", true)
                    selectionStyle.MultipleInlineRefresh("api_connection_type1");
                };
            }, 1000);

        };
        if (layout_name == "API_USER_MANAGEMENT") {
            CallAPI.Go(v_apiu_fn_get_value, undefined, fnAPIUGetValueTypeCallBack, "Fetching Data...");
        };
        //////////////RPT User Management
        if (layout_name == "RPT_USER_MANAGEMENT") {
            selectionStyle.Multiple("rpt_usr_mgmt_roles", option);
        };
        if (layout_name == "DE_PRE_CHECK_MAINTENANCE") {
            fnPreCheckMaintainQuery();
        };
        if (layout_name == "EOC_FLEXCUBE_ISSUE") {
            CallAPI.Go(v_eoc_flex_issue_handoff_first_load, undefined, fnFcubHandoffFailedFirstLoadCallBack, undefined);
            datePicker.Date("eoc_flex_issue_handoff_log_date");
            var today = moment(new Date()).format('DD-MMM-YYYY');
            element.inputValue("eoc_flex_issue_handoff_log_date", today);
            data = { log_date: today };
        };
        if (layout_name == "WLS_MANAGE_SERVER") {
            setTimeout(function () {
                var columns = [
                    {
                        'data': 'name', 'render': function (name) {
                            return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + name + "' />"
                        },
                        'sortable': false
                    },
                    { 'data': 'name' },
                    { 'data': 'type' },
                    { 'data': 'cluster' },
                    { 'data': 'machine' },
                    { 'data': 'state' },
                    { 'data': 'health' },
                    { 'data': 'listen_port' },
                    { 'data': 'ssl_listen_port' },
                    { 'data': 'nodemanager' },
                    { 'data': '', 'render': function () { return "" } }
                ];
                dataTable.ApplyJson("wls_mgt_tbl_manage_servers", columns, undefined);

                var columns_log = [
                    { 'data': 'id' },
                    { 'data': 'acl_ref' },
                    { 'data': 'server_name' },
                    { 'data': 'action' },
                    { 'data': 'status' },
                    { 'data': 'response' },
                    { 'data': 'start_time' },
                    { 'data': 'end_time' },
                    { 'data': 'execute_by' },
                    { 'data': '', 'render': function () { return "" } }

                ];
                dataTable.ApplyJson("wls_mgt_tbl_history_log", columns_log, undefined);

                dataTable.Recal();
            }, 1000);

            CallAPI.Go(v_wls_list_environment, undefined, fnWlsMgtGetListEnvCallBack);
        }
        if (layout_name == "WLS_CHG_JDBC") {
            setTimeout(function () {
                var columns = [
                    {
                        'data': 'name', 'render': function (name) {
                            return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + name + "' />"
                        },
                        'sortable': false
                    },
                    { 'data': 'name' },
                    { 'data': 'username' },
                    { 'data': 'url' },
                    { 'data': 'driver' },
                    { 'data': '', 'render': function () { return "" } }
                ];
                dataTable.ApplyJson("wls_mgt_tbl_jdbc", columns, undefined);

                var columns1 = [
                    {
                        'data': 'name', 'render': function (name) {
                            return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + name + "' />"
                        },
                        'sortable': false
                    },
                    { 'data': 'name' },
                    { 'data': 'username' },
                    { 'data': 'url' },
                    { 'data': 'driver' },
                    //{ 'data': 'key' },
                    //{ 'data': 'pwd' },
                    { 'data': 'env_name' },
                    { 'data': '', 'render': function () { return "" } }
                ];

                dataTable.ApplyJson("wls_mgt_tbl_jdbc_chg_list", columns1, undefined);

                var columns2 = [
                    {
                        'data': 'id', 'render': function (id) {
                            return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + id + "' />"
                        },
                        'sortable': false
                    },
                    { 'data': 'name' },
                    { 'data': 'username' },
                    { 'data': 'url' },
                    { 'data': 'driver' },
                    //{ 'data': 'password' },
                    { 'data': 'environment' },
                    { 'data': '', 'render': function () { return "" } }
                ];

                dataTable.ApplyJson("wls_mgt_tbl_jdbc_change", columns2, undefined);

                var columns3 = [
                    {
                        'data': 'id'
                    },
                    { 'data': 'task_name' },
                    { 'data': 'ds_name' },
                    {
                        'data': 'executed_stat'
                    },
                    {
                        'data': 'executed_response', 'render': function (data, type, row) {

                            return '<span style="color:green;"><a href="javascript:fnWlsJDBCViewExeResponse(' + row['id'] + ')"><i class="fas fa-key"></i> View</a></span>'
                        }
                    },
                    { 'data': 'executed_by' },
                    { 'data': 'executed_date' },
                    { 'data': 'task_owner' },
                    { 'data': 'grantee' },
                    { 'data': 'task_expired_date' },
                    { 'data': 'ticket_no' },
                    { 'data': '', 'render': function () { return "" } }
                ];
                dataTable.ApplyJson("wls_mgt_tbl_jdbc_task_log", columns3, undefined);

                var column4 = [
                    { 'data': 'seq' },
                    { 'data': 'ds_name' },
                    { 'data': 'ds_status' },
                    { 'data': 'ds_message' },
                    { 'data': '', 'render': function () { return "" } }
                ];
                dataTable.ApplyJson("wls_mgt_jdbc_tbl_ds_test", column4, undefined);
                dataTable.Recal();
            }, 1000);
            datePicker.DateTimeRange("wls_mgt_jdbc_create_task_wksch");
            datePicker.Date("wls_mgt_jdbc_create_task_expired_date");
            datePicker.DateRange("wls_mgt_jdbc_task_date_range");
            CallAPI.Go(v_wls_list_environment, undefined, fnWlsMgtJDBGetListEnvCallBack);
        }
        if (layout_name == "WLS_CREDENTIAL") {

            CallAPI.Go(v_wls_list_environment, undefined, fnWlsMgtCredGetEnvCallBack);
        }
        if (layout_name === "RPT_USER_HOUSEKEEPING_OPERATION") {
            goShowHide.hideOnDiv("listing_bi_deletion");
            goShowHide.hideOnDiv("listing_bi_inactive");
            datePicker.TimeMonthYear("bi_date_report_ele_id");
            //datePicker.TimeMonthYear("rpt_bi_hkp_bi_deletion_date_in");
            datePicker.TimeMonthYear("db_date_report_id");
            datePicker.TimeMonthYear("rang_date_id_user_housekeeping");
            //fnGetProcessStepUserHousekeeping();
            fn_tab_change_user_housekeeping( "bi_tab" );
            user_housekeeping_fn_apply_data_to_tb_bi_user_update_status([]);
            rpt_user_housekeeping_apply_data_to_table_user_deletion([]);
            fn_apply_data_to_table_bi_user_inactive_user_housekeeping([],"rpt_bi_inactive_listing");
            rpt_user_housekeeping_apply_data_to_table_bi_user_close([]);
            rpt_user_housekeeping_apply_data_table_db_user_housekeeping([]);
        }
        if (layout_name === "RPT_USER_HOUSEKEEPING_REVIEW_APPROVE") {
            // goShowHide.hideOnDiv("listing_bi_deletion");
            // goShowHide.hideOnDiv("listing_bi_inactive");
            // datePicker.TimeMonthYear("bi_date_report_ele_id");
            // //datePicker.TimeMonthYear("rpt_bi_hkp_bi_deletion_date_in");
            // datePicker.TimeMonthYear("db_date_report_id");
            datePicker.TimeMonthYear("user_housekeeping_report_date_sc_re_ap");
            // //fnGetProcessStepUserHousekeeping();
            // fn_tab_change_user_housekeeping("bi_tab");
            rpt_user_housekeeping_apply_data_to_table_user_deletion([]);
            fn_apply_data_to_table_bi_user_inactive_user_housekeeping([],"rpt_bi_inactive_review_listing_review");
            rpt_user_housekeeping_apply_data_to_table_bi_user_close([]);
            rpt_user_housekeeping_apply_data_table_db_user_housekeeping([]);
        }
        if (layout_name == "RPT_DOC_MANAGEMENT") {
            datePicker.Date("rpt_doc_date");
            //datePicker.DateRange("rpt_doc_date_date_filter");
            selectionStyle.LiveSearch('rpt_doc_name', '<option></option>');
            DocumentMGTfnFirstLoad('processing');
        }
        //Os Password change
        if (layout_name == "OS_PASSWORD_GENERATION") {
            datePicker.DateTest("os_pwd_date_input");
            CallAPI.Go(v_OsPasswordchangeFristLoad, undefined, OSPasswordGenerateFnFirstLoadCallBack, 'Processing');
            selectionStyle.Multiple("os_pwd_user_list", undefined);
            selectionStyle.Multiple("os_pwd_host_name_list", undefined);
        }
        //khim insert patch

        if (layout_name === "RPT_PATCH_MANAGEMENT") {
            datePicker.Date("rptPatchMGTRequestDateIn");
            datePicker.Date("rptPatchMGTApprovedDateIn");
            datePicker.Date("rptPatchMGTReviewedDateIn");
            datePicker.Date("rptPatchMGTAppliedDateIn");


            goShowHide.hideOnDiv("divPriority");
            goShowHide.hideOnDiv("div_date_report");
            RptPatchMGTGetDataFirstLoad();
        }
    }
};
