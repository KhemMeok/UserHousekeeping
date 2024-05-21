var STAFF_ID = "";
var SYSTEM_NOW = "";
var userfullname;
var userModule = [];
var userSubModules = [];
var userTabs = [];
var deAllBatchTypes;
var deBatchTypesCheckRequestOpt;
var deBatchTypesUploadOpt;
var deBatchTypesAuthorizeOpt;
var v_fcub_upload_user;
var v_fcub_authorize_user;
var v_khr_standard_exch_rate;
var v_thb_standard_exch_rate;

var v_ito_api = localStorage.getItem("ito_api_url");
//System webservice
var v_systemdatetime = "ACTIONS/Controllers/system/wsSystem.asmx/SystemDatetime";
// Notification
var v_Notifications = "ACTIONS/Controllers/notifications/notificationWs.asmx/notifications";
// ACL

var aclSelectDataUrl = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SELECT_DATA";
var aclSelectUserUrl = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_USER_SELECT";
var aclApplicationSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_APPLICATION_SELECT";
var aclRequestTypeSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_REQ_TYPE_SELECT";
var aclTicketSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_TICKET_SELECT";
var aclUserRoleSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_USER_ROLE_SELECT";
var aclHostSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_HOST_SELECT";
var aclInstanceSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_INSTANCE_SELECT";
var aclReqUserSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_REQ_USERID_SELECT";
var aclTicketDescSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_TICKET_JUSTIFICATION_SELECT";
var aclInsertReqLog = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_INSERT_ACL_LOG";
var aclDeleteReqLog = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_DELETE_LOG";
var aclRequestAccess = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_ACL_REQUEST";
var aclCancelRequest = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_CANCEL_REQUEST";
var aclApproveRequest = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_APPROVE_REQUEST";
var aclCheckInCheckOut = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_CHECKIN_CHECKOUT";
var aclRejectRequest = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_REJECT_REQUEST";
var aclReviewRequest = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_REVIEW_REQUEST";
var aclSchRoleSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SCHEDULE_ROLE_SELECT";
var aclSchAppSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SCHEDULE_APP_SELECT";
var aclSchHostSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SCHEDULE_HOSTNAME_SELECT";
var aclSchUserSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SCHEDULE_USER_SELECT";
var aclSchCreate = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SCHEDULE_CREATE";
var aclSchSelectForUpdate = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SCHEDULE_FOR_UPDATE";
var aclSchUpdate = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SCHEDULE_UPDATE";
var aclSchEnableDisable = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_DISABLE_ENABLE_SCHEDULE";
var aclSchDelete = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_DELETE_SCHEDULE";
var aclTraRoleSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_ROLE_4TRANSFER_SELECT";
var aclTraUserSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_USER_4TRANSFER_SELECT";
var aclTraUnitSelect = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_UNIT_4TRANSFER_SELECT";
var aclTraRole = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_TRANSFER_ROLE";
var aclTraDelete = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_DELETE_TRANSFER_ROLE";
var aclReviewReqInapp = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_REVIEW_REQUEST_INAPP"
var aclRejectReqInapp = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_REJECT_REQUEST_INAPP";
var aclApproveReqInapp = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_APPROVE_REQUEST_INAPP";
var aclSlAdjust = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_SL_ADJ_ACL";
var aclReqAdjust = "ACTIONS/Controllers/acl/wsAcl.asmx/FN_ADJ_ACL_REQ";
// End variables user access managment
// De Posting
var fileUpload = "ACTIONS/Controllers/Core/fileUpload.ashx";
var v_dePostingBatchTypesUrl = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingBatchType";
var v_dePostingBatchSourceUrl = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingBatchSource";
var v_dePostingMaintAccountUrl = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingMaintAccount";
var v_dePostingMaintAccountDetailUrl = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingMaintAccountDetail";
var v_dePostingTrnReferenceUrl = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingTrnReference";
var v_dePostingPreCheckUrl = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingPreCheck";
var v_dePostingCurrentBatchNo = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingCurrentBatch";
var v_dePostingRequestUpload = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingRequestUpload";
var v_dePostingCreateGRID = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingCreateGRID";
var v_dePostingGroupName = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingGroupName";
var v_dePostingSelfUpload = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingSelfUpload";
var v_dePostingSelfAuthorize = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingSelfAuthorize";
var v_dePostingQuery = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingDataQuery";
var v_dePostingCheckProcessing = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingGroupProcessing"
var v_dePostingRequestAuth = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingRequestAuthorize";
var v_dePostingAbortRequest = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingAbortRequest";
var v_dePostingPullRef = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingPullRef";
var v_deIssueTrn = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingIssueTrn";
var v_dePostingClearRef = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingClearPullRef";
var v_dePostingBatchTypeRole = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingBatchTypeRole";
var v_GetBatch4reqDelete = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingGetBatchReqDelete";
var v_dePostingRequestDelete = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingRequestDelete";
var v_dePostingGetCheckBoxAllow = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DePostingCheckBoxAllow";
var v_dePostingGetBatch4JvExport = "ACTIONS/Controllers/DE/wsDEPosting.asmx/DeBatchNoForExportJv";
var v_dePostingTemplateName;
var v_dePostingCSVMasterName;
var v_dePostingCSVDetailName;
// DE Batch Upload
var v_deBatchUploadGetGroupID = "ACTIONS/Controllers/DE/wsDEBatchUpload.asmx/FnGetGroup4Upload";
var v_deBatchUploadGetDataReqUpload = "ACTIONS/Controllers/DE/wsDEBatchUpload.asmx/DeBatchReqUploadDataQuery";
var v_deBatchUploadUpload = "ACTIONS/Controllers/DE/wsDEBatchUpload.asmx/DeBatchUploadUpload";
var v_deBatchUploadReject = "ACTIONS/Controllers/DE/wsDEBatchUpload.asmx/DeBatchUploadReject";
var v_deAddNote = "ACTIONS/Controllers/DE/wsDEBatchUpload.asmx/DeBatchUploadAddNote";
var v_deGetRequester = "ACTIONS/Controllers/DE/wsDEBatchUpload.asmx/FnGetRequester4Upload";
var v_deIssueCode = "ACTIONS/Controllers/DE/wsDEBatchUpload.asmx/FnGetIssueCode";
// DE Batch Authorize
var v_deBatchAuthorizeGetGroupID = "ACTIONS/Controllers/DE/wsDEBatchAuthorize.asmx/FnGetGroup4Authorize";
var v_deBatchAuthorizeGetDataReqUpload = "ACTIONS/Controllers/DE/wsDEBatchAuthorize.asmx/DeBatchReqAuthorizeDataQuery";
var v_deBatchAuthorizeAuthorize = "ACTIONS/Controllers/DE/wsDEBatchAuthorize.asmx/DeBatchAuthorizeAuthorize";
var v_deBatchNo4authorize = "ACTIONS/Controllers/DE/wsDEBatchAuthorize.asmx/DeBatchNo4Authorize";
var v_deGetBatchDetail = "ACTIONS/Controllers/DE/wsDEBatchAuthorize.asmx/DeGetBatchDetail";
var v_deCheckPandingWs = "ACTIONS/Controllers/DE/wsDEBatchAuthorize.asmx/DeCheckPendingTransactions";
// DE Main Account
var v_deMainAccSearch = "ACTIONS/Controllers/DE/wsDEMainAccount.asmx/DeSearchFCUBAccount";
var v_deMainAccSave = "ACTIONS/Controllers/DE/wsDEMainAccount.asmx/deMainAccSave";
var v_deMainAccQuery = "ACTIONS/Controllers/DE/wsDEMainAccount.asmx/DeMainAccQuery";
var v_deMainAccDelete = "ACTIONS/Controllers/DE/wsDEMainAccount.asmx/deMainAccDelete";
// DE approve
var v_deAppGetRequester = "ACTIONS/Controllers/DE/wsDEBatchApprove.asmx/DeGetRequester";
var v_deAppGetBatchNo = "ACTIONS/Controllers/DE/wsDEBatchApprove.asmx/DeGetBatchNo";
var v_deAppGetRequestList = "ACTIONS/Controllers/DE/wsDEBatchApprove.asmx/DeGetBatchRequestList";
var v_deAppRequestHandler = "ACTIONS/Controllers/DE/wsDEBatchApprove.asmx/DeRequestHandler";
// DE Delete
var v_deBatchDeleteRequester = "ACTIONS/Controllers/DE/wsDEBatchDelete.asmx/DeGetRequester";
var v_deBatchDeleteBatchNo = "ACTIONS/Controllers/DE/wsDEBatchDelete.asmx/DeGetBatchNo";
var v_deBatchDeleteList = "ACTIONS/Controllers/DE/wsDEBatchDelete.asmx/DeGetBatchDeleteList";
var v_deDeleteBatch = "ACTIONS/Controllers/DE/wsDEBatchDelete.asmx/DeDeleteBatch";
// DE Batch Type Create
var v_deBatchTypeGetAllBatchSource = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeGetBatchSources";
var v_deBatchTypeCreate = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeCreateBatchType";
var v_deBatchTypeListing = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeGetBatchTypeList";
var v_deBatchTypeForUpdate = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeGetDataUpdate";
var v_deBatchTypeUpdate = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeUpdateBatchType";
var v_deBatchTypeDelete = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeDeleteBatchType";
var v_deBatchTypeGetUser = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/GetAllUsersToAssignRole"
var v_deBatchTypeUserHandler = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeUserRoleHandle";
var v_deBatchTypeUserCurrRole = "ACTIONS/Controllers/DE/wsDEBatchTypeCreate.asmx/DeUserCurrentRole";
// DE Pre check Create
var v_dePreCheckSaveWs = "ACTIONS/Controllers/DE/wsDEPreCheckCreate.asmx/DePreCheckCreate";
var v_dePreCheckQueryWs = "ACTIONS/Controllers/DE/wsDEPreCheckCreate.asmx/DeGetAllPreCheck";
var v_dePreCheckGetForUpdateWs = "ACTIONS/Controllers/DE/wsDEPreCheckCreate.asmx/DeGetPreCheckUpdate";
var v_dePreCheckHandlerWs = "ACTIONS/Controllers/DE/wsDEPreCheckCreate.asmx/DePreCheckHandler";
var v_dePreCheckGetAllUsersWs = "ACTIONS/Controllers/DE/wsDEPreCheckCreate.asmx/DePreCheckGetAllUser";
var v_dePreCheckGetAllExcludeWs = "ACTIONS/Controllers/DE/wsDEPreCheckCreate.asmx/DeGetAllExcludedPreCheck"
// EoC management
var v_EoCParametersUrl = "ACTIONS/Controllers/eoc/wsEoC.asmx/fcubParameterSelect";
var v_EoCUpdateRealDebug = "ACTIONS/Controllers/eoc/wsEoC.asmx/updateRealDebug";
var v_EoCSwitchElcm = "ACTIONS/Controllers/eoc/wsEoC.asmx/switchElCM";
var v_EoCSwitchAmlWs = "ACTIONS/Controllers/eoc/wsEoC.asmx/switchAmlWs";
var v_EoCGetRestorePoint = "ACTIONS/Controllers/eoc/wsEoC.asmx/getRestorePoint";
var v_EoCCreateRestorePoint = "ACTIONS/Controllers/eoc/wsEoC.asmx/createRestorePoint";
//User
var v_userInfo = "ACTIONS/Controllers/user/wsUser.asmx/userInfo";
var v_userEmailSetUp = "ACTIONS/Controllers/user/wsUser.asmx/getUserEmailSetup";
var v_userSaveEmailSetup = "ACTIONS/Controllers/user/wsUser.asmx/SaveEmailSetup";
var v_userChangePwd = "ACTIONS/Controllers/user/wsUser.asmx/ChangePassword";
var v_userLogout = "ACTIONS/Controllers/user/wsUser.asmx/UserLogout";
var v_userUnlock = "ACTIONS/Controllers/user/wsUser.asmx/UserUnlock";
var v_userGetModules = "ACTIONS/Controllers/user/wsUser.asmx/GetModules";
var v_userGetUserProfile = "ACTIONS/Controllers/user/wsUser.asmx/SearchUser";
var v_userCreate = "ACTIONS/Controllers/user/wsUser.asmx/CreateUser";
var v_userGetAll = "ACTIONS/Controllers/user/wsUser.asmx/GetAllUsers";
var v_userUpdate = "ACTIONS/Controllers/user/wsUser.asmx/UpdateUser";
var v_userGetDataForUpdate = "ACTIONS/Controllers/user/wsUser.asmx/GetUserDataForUpdate";
var v_userGetUserOpt = "ACTIONS/Controllers/user/wsUser.asmx/GetAllUsersOpt";
var v_setMessageUserWs = "ACTIONS/Controllers/user/wsUser.asmx/CreateMessage";
var v_getMessageUserWs = "ACTIONS/Controllers/user/wsUser.asmx/GetMessage";
var v_getEndPointUrl = v_ito_api + "/api/v1/CreateNewUser/Get_APIEndPoint";
var v_getTemplete = v_ito_api + "/api/v1/CreateNewUser/Get_Templete";
var v_enableAccessAPI = v_ito_api + "/api/v1/CreateNewUser/EnableUserAccessAPI";
var v_addNewEndPoint = v_ito_api + "/api/v1/CreateNewUser/AddNewEndPoint";
var v_UpdateEndPoint = v_ito_api + "/api/v1/CreateNewUser/UpdateEndPoint";
var v_DeleteEndPoint = v_ito_api + "/api/v1/CreateNewUser/DeleteEndPoint";
var v_GetEndPointForUpdate = v_ito_api + "/api/v1/CreateNewUser/GetEndPointForUpdate";
var v_UserDataForUpdate = v_ito_api + "/api/v1/CreateNewUser/GetUserDataForUpdate";
var v_umt_new_ent_point_filter_end_point = v_ito_api + "/api/v1/CreateNewUser/GetFilterEndPoint";
var v_delete_user_ito = v_ito_api + "/api/v1/CreateNewUser/DeleteUser";
var v_find_user_ito = v_ito_api + "/api/v1/CreateNewUser/FindUserITO";
var v_get_end_point_select = v_ito_api + "/api/v1/CreateNewUser/GetEndPointSelect";
var v_userGetUserAccessAPI = "ACTIONS/Controllers/user/wsUser.asmx/GetDataAcessAPI";
// EoC Report

var v_rpt_eoc_first_load_endpoint = v_ito_api + "/api/EoCReport/v1/EoCReportFirstLoad";
var v_rpt_eoc_data_first_load = v_ito_api + "/api/EoCReport/v1/EoCReportDataFirstLoad";
var v_rpt_eoc_insert_duration_endpoint = v_ito_api + "/api/EoCReport/v1/InsertDuration";
var v_rpt_eoc_data_duration_endpoint = v_ito_api + "/api/EoCReport/v1/EoCDurationData";
var v_rpt_eoc_comp_pct = v_ito_api + "/api/EoCReport/v1/EoCCompletedPct";
var v_rpt_eoc_all_step = v_ito_api + "/api/EoCReport/v1/GetEoCSteps";
var v_rpt_eoc_step_duration = v_ito_api + "/api/EoCReport/v1/GetEoCStepDuration";
var v_rpt_eoc_update_step_duration = v_ito_api + "/api/EoCReport/v1/UpdateEoCStepDuration";
var v_rpt_eoc_delete_step_duration = v_ito_api + "/api/EoCReport/v1/DeleteEoCStepDuration";
var v_rpt_eoc_delete_step_duration_step_no = v_ito_api + "/api/EoCReport/v1/GetEoCStepDurationByStepNo";
var v_rpt_eoc_insert_pending = v_ito_api + "/api/EoCReport/v1/InsertPending";
var v_rpt_eoc_pending_data_by_id = v_ito_api + "/api/EoCReport/v1/GetPendingDataByID";
var v_rpt_eoc_pending_update = v_ito_api + "/api/EoCReport/v1/UpdatePending";
var v_rpt_eoc_pending_data_by_report_id = v_ito_api + "/api/EoCReport/v1/EoCPendingData";
var v_rpt_delete_eoc_reports = v_ito_api + "/api/EoCReport/v1/DeleteEoCReports";
var v_rpt_insert_eoc_resource = v_ito_api + "/api/EoCReport/v1/InsertEoCResource";
var v_rpt_eoc_resource_date = v_ito_api + "/api/EoCReport/v1/EoCResourceData";
var v_rpt_eoc_refresh_resource = v_ito_api + "/api/EoCReport/v1/RefreshResource";
var v_rpt_eoc_get_resource_by_id = v_ito_api + "/api/EoCReport/v1/GetResourceByID";
var v_rpt_eoc_update_resource_utl = v_ito_api + "/api/EoCReport/v1/UpdateResourceUtl";
var v_rpt_eoc_insert_storage_utl = v_ito_api + "/api/EoCReport/v1/InsertStorageUtl";
var v_rpt_eoc_refresh_storage = v_ito_api + "/api/EoCReport/v1/RefreshStorageUtl";
var v_rpt_eoc_refresh_storage_data = v_ito_api + "/api/EoCReport/v1/RefreshStorageData";
var v_rpt_eoc_get_storage_data_by_id = v_ito_api + "/api/EoCReport/v1/GetStorageByID";
var v_rpt_eoc_update_storage_utl = v_ito_api + "/api/EoCReport/v1/UpdateStorageUtl";
var v_rpt_eoc_insert_failure_branch = v_ito_api + "/api/EoCReport/v1/InsertEoCFailure";
var v_rpt_eoc_refresh_failure_branch = v_ito_api + "/api/EoCReport/v1/RefreshBranchFailure";
var v_rpt_eoc_refresh_failure_data = v_ito_api + "/api/EoCReport/v1/RefreshEoCFailureData";
var v_rpt_eoc_failure_data_by_id = v_ito_api + "/api/EoCReport/v1/GetEoCFailureDataByID";
var v_rpt_eoc_failure_update = v_ito_api + "/api/EoCReport/v1/UpdateEoCFailure";
var v_rpt_eoc_refresh_restorepoint_data = v_ito_api + "/api/EoCReport/v1/RefreshEoCRestorePointData";

////////////////// BI Backup & Restore

var v_rpt_bi_catalog_list = v_ito_api + "/api/weblogic/v1/ListBICatalogs";
var v_rpt_bi_get_backup_detail_data = v_ito_api + "/api/weblogic/v1/GetBackupDetail";
var v_rpt_bi_archive_catalog = v_ito_api + "/api/weblogic/v1/BackupBICatalogs";
var v_rpt_bi_unarchive_catalog = v_ito_api + "/api/weblogic/v1/RestoreBICatalogs";

//////////////// FCUBS Parameter 

var v_fcubs_real_debug_stat = v_ito_api + "/api/fcubs/v1/CurrentRealDebugStat";
var v_fcubs_update_real_debug = v_ito_api + "/api/fcubs/v1/UpdateRealDebug";
var v_fcubs_update_user_debug = v_ito_api + "/api/fcubs/v1/UpdateUserDebug";
var v_fcubs_load_debug_logs = v_ito_api + "/api/fcubs/v1/GetUpdateDebugLogs";
var v_fcubs_user_debug_stat = v_ito_api + "/api/fcubs/v1/CurrentUserDebugStat";
var v_fcubs_first_load = v_ito_api + "/api/fcubs/v1/FcubParamFirstLoad";

/////////////// EoC Monitoring ///////////////////

var v_eoc_mtr_param_config = v_ito_api + "/api/EoCMonitoring/v1/GetParamConfig";
var v_eoc_mtr_eod_summary = v_ito_api + "/api/EoCMonitoring/v1/GetEoDSummary";
var v_eoc_mtr_eod_runable_br = v_ito_api + "/api/EoCMonitoring/v1/GetRunAbleBranches";
var v_eoc_mtr_eod_fin_eodm_br = v_ito_api + "/api/EoCMonitoring/v1/GetFinishEoDMBranches";
var v_eoc_mtr_eod_not_fin_eodm_br = v_ito_api + "/api/EoCMonitoring/v1/GetNotFinishEoDMBranches";
var v_eoc_mtr_eod_failed_eodm_br = v_ito_api + "/api/EoCMonitoring/v1/GetFailedEoDMBranches";
var v_eoc_mtr_eod_fin_EoD_br = v_ito_api + "/api/EoCMonitoring/v1/GetFinishEoC";
var v_eoc_mtr_eod_submitted_br = v_ito_api + "/api/EoCMonitoring/v1/GetSubmitBranches";
var v_eoc_mtr_cbs_tbs = v_ito_api + "/api/EoCMonitoring/v1/GetCBSTBS";
var v_eoc_mtr_cbs_dbs = v_ito_api + "/api/EoCMonitoring/v1/GetCBSDBS";
var v_eoc_mtr_cbs_db_size = v_ito_api + "/api/EoCMonitoring/v1/GetCBSDBSize";
//GET CONTACT
var v_eoc_mtr_get_contact = v_ito_api + "/api/EoCMonitoring/v1/GetContact";
//GET Pending
var v_eoc_mtr_get_pending = v_ito_api + "/api/EoCMonitoring/v1/GetPending";
var v_eoc_mtr_get_MissmatchBalanc = v_ito_api + "/api/EoCMonitoring/v1/GetMissmatchBalance";
/////////////////SERVER INVENTORY /////////////////////////
var v_rpt_server_invt_on_load = v_ito_api + "/api/ServerINVT/v1/ServerINVTonLoad";
var v_rpt_server_invt_fn_submit_host = v_ito_api + "/api/ServerINVT/v1/ServerINVTRegisterHost";
var v_rpt_server_invt_fn_submit_csi = v_ito_api + "/api/ServerINVT/v1/ServerINVTRegisterCSI";
var v_rpt_server_invt_fn_submit_service = v_ito_api + "/api/ServerINVT/v1/ServerINVTServiceMapping";
var v_rpt_server_invt_server_listing = v_ito_api + "/api/ServerINVT/v1/ServerINVTAllServerListing";
var v_rpt_server_invt_csi_listing = v_ito_api + "/api/ServerINVT/v1/ServerINVTAllCSIListing";
var v_rpt_server_invt_service_listing = v_ito_api + "/api/ServerINVT/v1/ServerINVTAllServiceListing";
var v_rpt_server_invt_delete_report = v_ito_api + "/api/ServerINVT/v1/ServerINVTDeleteReport";
var v_rpt_server_invt_edit_report = v_ito_api + "/api/ServerINVT/v1/ServerINVTEditReport";
var v_rpt_server_invt_update_server_report = v_ito_api + "/api/ServerINVT/v1/ServerINVTUpdateServerReport";
var v_rpt_server_invt_update_service_report = v_ito_api + "/api/ServerINVT/v1/ServerINVTUpdateServiceReport";
var v_rpt_server_invt_update_csi_report = v_ito_api + "/api/ServerINVT/v1/ServerINVTUpdateCSIReport";
var v_rpt_server_invt_get_csi_doc = v_ito_api + "/api/ServerINVT/v1/ServerINVTGetCSIDoc";
var v_rpt_server_invt_upload_csi_doc = v_ito_api + "/api/ServerINVT/v1/ServerINVTUploadCSIDoc";
var v_rpt_server_invt_download_doc = v_ito_api + "/api/ServerINVT/v1/ServerINVTGetDoc4Download";
//API
var v_api_managemnet_on_load = v_ito_api + "/api/APIManagement/v1/APIMonLoad";
var v_api_parameter_get_endpoint = v_ito_api + "/api/APIManagement/v1/APIPGetEndpoint";
var v_apip_endpoint_fn_submit = v_ito_api + "/api/APIManagement/v1/APIPRegisterEndpoint";
var v_apip_endpoint_fn_delete = v_ito_api + "/api/APIManagement/v1/APIPDeleteEndpoint";
var v_apip_endpoint_fn_edit = v_ito_api + "/api/APIManagement/v1/APIPEditEndpoint";
var v_apip_endpoint_fn_update = v_ito_api + "/api/APIManagement/v1/APIPUpdateEndpoint";
var v_api_transaction_on_load = v_ito_api + "/api/APIManagement/v1/APITonLoad";
var v_api_parameter_get_data = v_ito_api + "/api/APIManagement/v1/APIParamQuery";
var v_api_parameter_edit = v_ito_api + "/api/APIManagement/v1/APIParamCheckQuery";
var v_api_parameter_update = v_ito_api + "/api/APIManagement/v1/APIParamUpdate";
var v_api_transaction_query = v_ito_api + "/api/APIManagement/v1/APITransactionQuery";
var v_api_transaction_query_detail = v_ito_api + "/api/APIManagement/v1/APITransactionDetail";
var v_api_transaction_detail_data1 = v_ito_api + "/api/APIManagement/v1/APITGetRequestData";
var v_api_transaction_detail_data2 = v_ito_api + "/api/APIManagement/v1/APITGetResponseData";
var v_api_transaction_detail_data3 = v_ito_api + "/api/APIManagement/v1/APITGetHeaderData";
var v_api_managemnet_connection_onload = v_ito_api + "/api/APIManagement/v1/APIConnectiononLoad";
//var v_api_managemnet_connection_onloadall = v_ito_api + "/api/APIManagement/v1/APIConnectiononLoadAll";
var v_api_connection_get_data = v_ito_api + "/api/APIManagement/v1/APIConnectionCheck";
var v_api_connection_query = v_ito_api + "/api/APIManagement/v1/APICDowntimeService";
var v_api_connection_list_all_service = v_ito_api + "/api/APIManagement/v1/APICGetAllService";
var v_api_connection_chart_query = v_ito_api + "/api/APIManagement/v1/APICGetChartDownService";
var v_api_srvice_chart_query = v_ito_api + "/api/APIManagement/v1/APICGetChartDowntimeService";
var v_api_parameter_get_message = v_ito_api + "/api/APIManagement/v1/APIPGetMessage";
var v_apip_message_fn_checkcode = v_ito_api + "/api/APIManagement/v1/APIPGetMessageCode";
var v_apip_message_fn_submit = v_ito_api + "/api/APIManagement/v1/APIPRegisterMessage";
var v_apip_message_fn_edit = v_ito_api + "/api/APIManagement/v1/APIPEditMessage";
var v_apip_message_fn_update = v_ito_api + "/api/APIManagement/v1/APIPUpdateMessage";
var v_api_parameter_get_client = v_ito_api + "/api/APIManagement/v1/APIPGetClient";
var v_apip_client_fn_submit = v_ito_api + "/api/APIManagement/v1/APIPRegisterClient";
var v_apip_client_fn_delete = v_ito_api + "/api/APIManagement/v1/APIPDeleteClient";
var v_apip_client_fn_edit = v_ito_api + "/api/APIManagement/v1/APIPEditClient";
var v_apip_client_fn_update = v_ito_api + "/api/APIManagement/v1/APIPUpdateClient";
var v_apip_sinature_fn_get = v_ito_api + "/api/APIManagement/v1/APIPGetSinature";
var v_apip_sinature_fn_submit = v_ito_api + "/api/APIManagement/v1/APIPRegisterSinature";
var v_apip_sinature_fn_delete = v_ito_api + "/api/APIManagement/v1/APIPDeleteSinature";
var v_apip_sinature_fn_edit = v_ito_api + "/api/APIManagement/v1/APIPEditSinature";
var v_apip_sinature_fn_update = v_ito_api + "/api/APIManagement/v1/APIPUpdateSinature";
var v_apip_endpoint_fn_get_userm = v_ito_api + "/api/APIManagement/v1/APIPGetEndpointuser";
var v_apip_endpoint_fn_submit_userm = v_ito_api + "/api/APIManagement/v1/APIPRegisterEndpointuser";
var v_apip_endpoint_fn_delete_userm = v_ito_api + "/api/APIManagement/v1/APIPDeleteEndpointuser";
var v_apip_endpoint_fn_edit_userm = v_ito_api + "/api/APIManagement/v1/APIPEditEndpointuser";
var v_apip_endpoint_fn_update_userm = v_ito_api + "/api/APIManagement/v1/APIPUpdateEndpointuser";
var v_apip_client_endpoint_fn_get = v_ito_api + "/api/APIManagement/v1/APIPGetClientEndpoint";
var v_apip_client_sinature_fn_get = v_ito_api + "/api/APIManagement/v1/APIPGetClientSinature";

var v_apiu_fn_get_value = v_ito_api + "/api/APIManagement/v1/APIUGetValue";
var v_apiu_endpointid_module = v_ito_api + "/api/APIManagement/v1/APIUEndpointonLoad";
var v_apiu_sinatureid_module = v_ito_api + "/api/APIManagement/v1/APIUSinatureonLoad";
var v_apip_client_endpoint_fn_map = v_ito_api + "/api/APIManagement/v1/APIPClientEndpointMap";
var v_apip_client_sinature_fn_map = v_ito_api + "/api/APIManagement/v1/APIPClientSinatureMap";
var v_apip_client_endpoint_fn_map_check = v_ito_api + "/api/APIManagement/v1/APIPClientEndpointMapCheck";
var v_apip_client_signature_fn_map_check = v_ito_api + "/api/APIManagement/v1/APIPClientSinatureMapCheck";
var v_apip_client_endpoint_fn_register = v_ito_api + "/api/APIManagement/v1/APIPRegisterClientEndpoint";
var v_apip_client_sinature_fn_register = v_ito_api + "/api/APIManagement/v1/APIPRegisterClientSinature";
var v_apip_client_sinature_fn_edit = v_ito_api + "/api/APIManagement/v1/APIPEditClientSinature";
var v_apip_client_sinature_fn_update = v_ito_api + "/api/APIManagement/v1/APIPUpdateClientSinature";

var v_apip_tool = v_ito_api + "/api/APIManagement/v1/APITool";

var v_apip_user_check_fn = v_ito_api + "/api/APIManagement/v1/APIPUserTxnCheck";
var v_apip_user_view_fn_get = v_ito_api + "/api/APIManagement/v1/APIPUserServiceGet";
var v_apip_user_view_fn_map_check = v_ito_api + "/api/APIManagement/v1/APIPUserServiceMapCheck";
var v_apip_user_service_fn_register = v_ito_api + "/api/APIManagement/v1/APIPRegisterUserService";

// Handoff
var v_eoc_flex_issue_handoff_tbl_listing = v_ito_api + "/api/fcubs/v1/HandoffFailedEntriesListing";
var v_eoc_flex_issue_fix_handoff = v_ito_api + "/api/fcubs/v1/FixHandoffFailedEntries";
var v_eoc_flex_issue_handoff_tbl_log_listing = v_ito_api + "/api/fcubs/v1/HandoffLogListing";
var v_get_fcub_error_sms = v_ito_api + "/api/fcubs/v1/Get_Fcub_Error_SMS";
var v_eoc_flex_issue_handoff_first_load = v_ito_api + "/api/fcubs/v1/HandoffFailedEntriesFirstLoad";
var v_eoc_flex_issue_req_fix_handoff = v_ito_api + "/api/fcubs/v1/InsertRequestFixHandoff";
var v_eoc_flex_issue_reject_handoff = v_ito_api + "/api/fcubs/v1/InsertRequestRejectHandoff";
////////////// Weblogic Management /////////////////
/*
 * Manage Server
*/
var v_wls_list_environment = v_ito_api + "/api/weblogic/v1/GetListEnvironment";
var v_wls_manage_servers = v_ito_api + "/api/weblogic/v1/GetWeblogicServers";
var v_wls_list_tickets = v_ito_api + "/api/weblogic/v1/GetListTickets";
var v_wls_startup_server = v_ito_api + "/api/weblogic/v1/StarupServer";
var v_wls_shutdown_server = v_ito_api + "/api/weblogic/v1/ShutdownServer";
var v_wls_web_job = v_ito_api + "/JobController/jobs/enqueued";
var v_wls_get_hist_action_log = v_ito_api + "/api/weblogic/v1/GetHistActionLog";

/*
 * Change Password Datasource
 */
var v_wls_jdbc_get_jdbc = v_ito_api + "/api/weblogic/v1/GetJDBCListing";
var v_wls_jdbc_create_task = v_ito_api + "/api/weblogic/v1/BookingTaskJDBC";
var v_wls_jdbc_get_task = v_ito_api + "/api/weblogic/v1/GetTasks";
var v_wls_jdbc_get_jdbc_change = v_ito_api + "/api/weblogic/v1/GetJDBCChange";
var v_wls_jdbc_execute_jdbc_change = v_ito_api + "/api/weblogic/v1/ExecuteJDBCPWDChange";
var v_wls_jdbc_get_task_exe_log = v_ito_api + "/api/weblogic/v1/GetJDBCTaskExeLog";
var v_verify_ad_user = v_ito_api + "/api/additional/v1/verifyaduser";
var v_wls_jdbc_test_ds = v_ito_api + "/api/weblogic/v1/TestDatasource";

// BI housekeeping
var vBIHkpGetStaffResign = v_ito_api + "/api/v1/RptBIHouseKeeping/GetDataFromExcelFile";
var user_housekeeping_url_insert_user_bi_close = v_ito_api + "/api/v1/RptBIHouseKeeping/InsertUserBIPreClose";
var vBIHkpInsertProcessStep = v_ito_api + "/api/v1/RptBIHouseKeeping/InsertProcessStep";
var varUrlGetProcessStep = v_ito_api + "/api/v1/RptBIHouseKeeping/GetProcessStep";
var v_url_get_bi_housekeeping = v_ito_api + "/api/v1/RptBIHouseKeeping/GetReportBIInactive";
var user_housekeeping_url_get_bi_deletion = v_ito_api + "/api/v1/RptBIHouseKeeping/GetReportBIDeletion";
var url_set_mail_inform_user_db_housekeeping = v_ito_api + "/api/v1/RptBIHouseKeeping/SentEmailInformUserInactive";
var url_get_user_bi_close_user_housekeeping = v_ito_api + "/api/v1/RptBIHouseKeeping/GetOldUserPreClose";
var vBIHkpGetProcessStatus = v_ito_api + "/api/v1/RptBIHouseKeeping/GetAllProcessStatus";
var url_refresh_listing_db_user_housekeeping = v_ito_api + "/api/v1/RptBIHouseKeeping/GetListingDBUserHousekeeping";
var url_pull_db_user_housekeeping = v_ito_api + "/api/v1/RptBIHouseKeeping/GenDBUserHousekeeping";
var vBIHkpInsertProcessStatus = v_ito_api + "/api/v1/RptBIHouseKeeping/InsertProcessStatus";
var v_user_housekeeping_get_user_inactive = v_ito_api + "/api/v1/RptBIHouseKeeping/GetUserInactive";
var url_close_bi_user_housekeeping = v_ito_api + "/api/v1/RptBIHouseKeeping/CloseBIInactive";
var url_get_bi_deletion_listing = v_ito_api + "/api/v1/RptBIHouseKeeping/GetBIDeletionListing";
var url_get_bi_user_update_status = v_ito_api + "/api/v1/RptBIHouseKeeping/GetBIUserUpdateStatusListing";
var url_get_bi_housekeeping_listing = v_ito_api + "/api/v1/RptBIHouseKeeping/GetBIUserHousekeepingListing";


/*
*RPT_Doc_Report
*/
var v_rpt_doc_management_first_load = v_ito_api + "/api/RPTDocManagement/v1/FirstLoad";
var v_rpt_doc_managementGetDataTbListing = v_ito_api + "/api/v1/RPTDocManagement/DocMGTGetDataTbListing";
var v_rpt_insert_doc_management = v_ito_api + "/api/RPTDocManagement/v1/InsertDocManagement";
var v_rpt_edit_doc_management = v_ito_api + "/api/RPTDocManagement/v1/EditDocManagement";
var v_rpt_delete_doc_management = v_ito_api + "/api/RPTDocManagement/v1/DeleteDocManagement";
var v_rpt_uploadDocumentToSFTP = v_ito_api + "/api/v1/RPTDocManagement/UploadDocManagement";
var v_rpt_DownloadDocumentFromSFTP = v_ito_api + "/api/RPTDocManagement/v1/DownloadDocManagement";
var v_rpt_Update_doc_management = v_ito_api + "/api/RPTDocManagement/v1/UpdateDocManagement";
var v_rpt_GetCategoryReport = v_ito_api + "/api/RPTDocManagement/v1/GetCategoryReport";
var v_rpt_doc_mgt_maintance_category = v_ito_api + "/api/RPTDocManagement/v1/InsertCategoryReport";
var v_rpt_doc_mgt_maintance_report = v_ito_api + "/api/RPTDocManagement/v1/OperationReport";
var v_url_filter_doc_lising = v_ito_api + "/api/RPTDocManagement/v1/GetFilterDocManagement";
var v_rpt_doc_mgt_get_doc_summary = v_ito_api + "/api/RPTDocManagement/v1/GetSummaryReport";

// OS password change 
var v_OsPasswordchangeFristLoad = v_ito_api + "/api/OsPasswordChange/v1/GetHostNameOsUserFristLoad";
var v_OsPasswordchangeInsertRecord = v_ito_api + "/api/OsPasswordChange/v1/InsertRecordUserPassword";
var v_OsPasswordchangeGetRecordTable = v_ito_api + "/api/OsPasswordChange/v1/GetUserPasswordRecordTable";
var v_OsPasswordchangeGenerateCSVFile = v_ito_api + "/api/OsPasswordChange/v1/GernerateCSVFile";
var v_OsPasswordchangeUpdateRecordCSVFile = v_ito_api + "/api/OsPasswordChange/v1/UpdateRecordInCSVFile";
var v_OsPasswordchangeDeleteRecordCSVFile = v_ito_api + "/api/OsPasswordChange/v1/DeleteRecordInCSVFile";
var v_OsPasswordchangeGetDataForUpdate = v_ito_api + "/api/OsPasswordChange/v1/GetDataForUpdate";
var v_OsPwdEncrypt = "ACTIONS/Controllers/os_pwd_genertion/os_pwd_generation.asmx/GetDataPwdEncrypte";
var v_OsPwdUnEncrypt = "ACTIONS/Controllers/os_pwd_genertion/os_pwd_generation.asmx/GetDataPwdUnEncrypte";
var v_OsPasswordchangeExploreDataToServer = v_ito_api + "/api/OsPasswordChange/v1/ExploreDataToFileOnServer";
var v_OsPasswordchangeGetAdminUser = v_ito_api + "/api/OsPasswordChange/v1/GetUserAdmin";
var v_OsPasswordGenerateGetUserExclude = v_ito_api + "/api/OsPasswordChange/v1/GetDataTableExcludeUser";
var v_OsPasswordGetUserTmpById = v_ito_api + "/api/OsPasswordChange/v1/GetUserTmpById";

/*
 * patch management
 */
var v_ptm_gtName = v_ito_api + "/api/v1/RPT_PATCH_GetISAName";
var v_ptm_insert_patch = v_ito_api + "/api/v1/RPT_PATCH_INSERT";
var v_ptm_getDataTable = v_ito_api + "/api/v1/RPT_PATCH_GetDateTable";
var v_rpt_ptm_delete_record = v_ito_api + "/api/v1/RPT_PATCH_DeletePatch";
var v_rpt_ptm_update_record = v_ito_api + "/api/v1/RPT_PATCH_UpdatePatch";
var v_rpt_ptm_get_record_for_update = v_ito_api + "/api/v1/RPT_PATCH_GetPatchForUpdate";
var v_rpt_ptm_get_current_version = v_ito_api + "/api/v1/RPT_PATCH_GetCurrentVersion";
var v_rpt_ptm_get_ticket_from_hd_sys = v_ito_api + "/api/v1/RPT_PATCH_GetTicketFromHDSys";