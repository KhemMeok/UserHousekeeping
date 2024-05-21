namespace iau_api;
public class RPTUserHousekeepingModel
{
    public class ResGetDataFromExcelFile
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public string? lenght { get; set; }
        public ResDataGetFromExcelFile? data { get; set; }
        public string? exception { get; set; }
        public string? dataFilterLenght { get; set; }
        public string? lenghtInsertToTable { get; set; }
    }
    public class ResDataGetFromExcelFile
    {
        public List<DataGetFromExcelFile>? listStaff { get; set; }
    }
    public class DataGetFromExcelFile
    {
        public string? brn { get; set; }
        public string? staffId { get; set; }
        public string? staffName { get; set; }
        public string? effectiveDate { get; set; }
        public string? typeClose { get; set; }
        public string? reportDate { get; set; }
    }
    public class ReqDataGetDataFromExcelFile
    {
        public string? fileData { get; set; }
        public string? fromDate { get; set; }
        public string? toDate { get; set; }
    }
    public class DataGetFromExcelFileTmp
    {
        public string? status { get; set; }
        public List<DataGetFromExcelFile>? data { get; set; }
        public string? exception { get; set; }
    }
    public class ResDataGetBIUser
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<string>? userId { get; set; }

    }
    public class ResInsertUserPreCloseToTable
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public string? insertCount { get; set; }
    }
    public class DataPreUserDelete
    {
        public string? userId { get; set; }
        public string? typeClose { get; set; }
        public string? dateReport { get; set; }

    }
    public class ReqDataGetUserBIInactive
    {
        public string? fromDate { get; set; }
        public string? toDate { get; set; }
        public string? type { get; set; }
    }
    public class ReqInsertUserBIPreClose
    {
        public string? date { get; set; }
    }
    public class ResDataGetUserBIInactive
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<DataGetFromExcelFile>? userInactive { get; set; }
    }

    public class DataUserInactive
    {
        public string? brn { get; set; }
        public string? staffId { get; set; }
        public string? staffName { get; set; }
        public string? effectiveDate { get; set; }
        public string? typeClose { get; set; }
        public string? reportDate { get; set; }
    }
    // Report BI Inactive
    public class ResDataGetReportBIInactive
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<DataReportInactive>? data { get; set; }

    }
    public class RptBIHkpAllStaProcess
    {
        public RptBIHkpStaProGenBIInactive? bi_housekeeping { get; set; }
        //public RptBIHkpStaProGenBIDeletion biDeletion { get; set; }
        //public RptDBHousekeepingStatus? db_housekeeping { get; set; }
    }
    public class RptBIHkpStaProGenBIInactive
    {
        public RptBIHkpProcessSta? update_status { get; set; }
        public RptBIHkpProcessSta? update_email { get; set; }
        public RptBIHkpProcessSta? pull_last_login { get; set; }
        public RptBIHkpProcessSta? get_bi_housekeeping { get; set; }
        //public RptBIHkpProcessSta get_bi_user_close { get; set; }
        //public RptBIHkpProcessSta insert_bi_user_close { get; set; }
        public RptBIHkpProcessSta? close_bi_user { get; set; }
    }
    public class RptDBHousekeepingStatus
    {
        public RptBIHkpProcessSta? user_inform { get; set; }
        public RptBIHkpProcessSta? user_remove { get; set; }
        public RptBIHkpProcessSta? total_user { get; set; }
    }
    public class RptBIHkpProcessSta
    {
        public string? status { get; set; }
        public string? count { get; set; }
        public string? message { get; set; }
        public string? eleId { get; set; }
    }
    public class DataReportInactive
    {
        public string? id { get; set; }
        public string? brn { get; set; }
        public string? userId { get; set; }
        public string? userName { get; set; }
        public string? createDate { get; set; }
        public string? lastLogin { get; set; }
        public string? numLastLogin { get; set; }
        public string? reportDate { get; set; }
        public string? reviewDate { get; set; }
        public string? remark { get; set; }
        public string? recordStatus { get; set; }
    }

    // Report BI Deletion
    public class ResDataGetUserBIDeletion
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<DataReportBIDeletion>? biDeletion { get; set; }

    }
    public class ReqDataGetUserBIDeletion
    {
        public string? date { get; set; }
    }
    public class DataReportBIDeletion
    {
        public string? id { get; set; }
        public string? brn { get; set; }
        public string? brnName { get; set; }
        public string? userId { get; set; }
        public string? userName { get; set; }
        public string? position { get; set; }
        public string? reqDate { get; set; }
        public string? createDate { get; set; }
        public string? closeDate { get; set; }
        public string? status { get; set; }
        public string? remark { get; set; }
    }
    // insert process step 
    public class ReqDataInsertProcessStep
    {
        public string? stepId { get; set; }
        public string? valStep { get; set; }
        public string? processDate { get; set; }
        public string? valText { get; set; }
        public string? processData { get; set; }
    }
    public class ResInsertProcessStep
    {
        public string? status { get; set; }
        public string? message { get; set; }
    }
    // end insert process step

    // get process step
    public class ReqDataGetProcessStep
    {
        public string? date { get; set; }
        public string? tabProcess { get; set; }
    }
    public class ResGetProcessStep
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public DataAllGetProcessStep? data { get; set; }
    }
    public class DataAllGetProcessStep
    {
        public List<DataGetProcessStep>? steProcess { get; set; }
        public RptBIHkpAllStaProcess? staProcess { get; set; }
    }
    public class DataGetProcessStep
    {
        public string? id { get; set; }
        public string? stepName { get; set; }
        public string? valStep { get; set; }
        //public string? processDate { get; set; }
        public string? category { get; set; }
        //public string? valText { get; set; }
        public string? elementId { get; set; }
    }
    // end get process step




    // test get data from excel file 
    public class ReqGetDataFromExcelWithOled
    {
        public string? fileData { get; set; }
        public string? fDate { get; set; }
        public string? tDate { get; set; }
        public string? sheetName { get; set; }
    }

    // send emain inform user inactive
    public class ReqSendEmailInformUser
    {
        public string? reportDate { get; set; }
        public string? type { get; set; }
        public string? userInform { get; set; }
    }
    public class ResSendEmailInform
    {
        public string? status { get; set; }
        public string? message { get; set; }
    }

    // get old user pre close
    public class ResGetOldUserPreClose
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public DataGetOldUserPreClose? data { get; set; }
    }
    public class DataGetOldUserPreClose
    {
        public List<DataUserInactive>? listStaff { get; set; }
    }
    public class ReqGetOldUserPreClose
    {
        public string? reportDate { get; set; }
    }


    // get process status 
    public class ResRptBIHkpProcessStatus
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public RptBIHkpAllStaProcess? staProcess { get; set; }
    }
    public class ReqGetProcessStatus
    {
        public string? reportDate { get; set; }
    }

    // db user housekeeping
    public class ResGetListingDBUserHousekeeping
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public DataDBUserHousekeeping? data { get; set; }
    }
    public class ReqGetListingDBUserHousekeeping
    {
        public string? fromDate { get; set; }
        public string? toDate { get; set; }
    }
    public class DataDBUserHousekeeping
    {
        public List<DBUserHousekeeping>? dbUser { get; set; }
    }
    public class DBUserHousekeeping
    {
        public string? id { get; set; }
        public string? staffId { get; set; }
        public string? staffName { get; set; }
        public string? dbUsername { get; set; }
        public string? userRole { get; set; }
        public string? currentStatus { get; set; }
        public string? createDate { get; set; }
        public string? lastLogin { get; set; }
        public string? dbName { get; set; }
        public string? inactiveDays { get; set; }
        public string? insertedDate { get; set; }
        public string? remark { get; set; }
        public string? status { get; set; }
    }
    // db user hkp pull last login
    public class ResGenDBUserHousekeeping
    {
        public string? status { get; set; }
        public string? message { get; set; }
    }
    public class ReqGenDBUserHousekeeping
    {
        public string? date { get; set; }
    }

    // insert process status
    public class ReqInsertProcessStatus
    {
        public string? statusId { get; set; }
        public string? status { get; set; }
        public string? statusCount { get; set; }
        public string? message { get; set; }
        public string? processData { get; set; }
        public string? processDate { get; set; }
    }
    public class ResInsertProcessStatus
    {
        public string? status { get; set; }
        public string? message { get; set; }
    }
    public class ReqGetBIUserInactive
    {
        public string? date { get; set; }
    }
    public class ResGetBIUserInactive
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<DataGetBIUserInactive>? data { get; set; }
    }
    public class DataGetBIUserInactive
    {
        public string? id { get; set; }
        public string? userId { get; set; }
        public string? userName { get; set; }
        public string? dep { get; set; }
        public string? closeType { get; set; }
        public string? reportDate { get; set; }
    }

    public class ResBIUserInactiveOperation
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<DataBIUserInactiveOperation>? processData { get; set; }
    }
    public class DataBIUserInactiveOperation
    {
        public string? id { get; set; }
        public string? user_id { get; set; }
        public string? description { get; set; }
        public string? last_login_date { get; set; }
        public string? day_count_last_login { get; set; }
        public string? report_date { get; set; }
        public string? date_created { get; set; }
        public string? inserted_date { get; set; }
    }
    public class ReqForBIUserInactiveOperation
    {
        public string? p_operation { get; set; }
        public string? p_record_id { get; set; }
        public string? p_user_id { get; set; }
        public string? p_description { get; set; }
        public string? p_last_login_date { get; set; }
        public string? p_day_count_last_login { get; set; }
        public string? p_report_date { get; set; }
        public string? p_date_created { get; set; }
        public string? p_inserted_date { get; set; }
    }

    // get user bi close by inactive
    public class ResCloseBIInactive
    {
        public string? status { get; set; }
        public string? message { get; set; }
    }
    public class ReqCloseUserBIInactive
    {
        public string? date { get; set; }
    }
    // bi user deletion
    public class resGetBIUserDeletionListing
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<DataReportBIDeletion>? data { get; set; }
    }
    public class reqGetBIUserDeletionListing
    {
        public string? date { get; set; }
    }
    // bi update status
    public class reqGetBIUserUpdateStatus
    {
        public string? date { get; set; }
    }
    public class resGetBIUserUpdateStatus
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<dataGetBIUserUpdateStaus>? data { get; set; }
    }
    public class dataGetBIUserUpdateStaus
    {
        public string? no { get; set; }
        public string? brn_code { get; set; }
        public string? user_id { get; set; }
        public string? user_name { get; set; }
        public string? current_status { get; set; }
        public string? previous_status { get; set; }

        public string? request_date { get; set; }
        public string? create_date { get; set; }
        public string? close_date { get; set; }
        //public string? branch_code { get; set; }
        public string? remark { get; set; }
        public string? position { get; set; }

    }

    // BI housekeeping listing
    public class resGetBIUserHousekeeping
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<dataBIUserHousekeeping>? data { get; set; }
    }
    public class reqGetBIUserHousekeepingListing
    {
        public string? date { get; set; }
        public string? status { get; set; }
    }
    public class dataBIUserHousekeeping
    {
        public string? id { get; set; }
        public string? brn { get; set; }
        public string? userId { get; set; }
        public string? userName { get; set; }
        public string? createDate { get; set; }
        public string? lastLogin { get; set; }
        public string? numLastLogin { get; set; }
        public string? reportDate { get; set; }
        public string? reviewDate { get; set; }
        public string? remark { get; set; }
        public string? recordStatus { get; set; }
    }
    // Get Notify
    public class reqGetNotifi
    {
        public string? date { get; set; }
    }
    public class dataGetNotifi
    {
        public string? name { get; set; }
        public string? noti { get; set; }
        public string? ele_id { get; set; }
    }
    public class resGetNotifi
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public List<dataGetNotifi>? data { get; set; }
    }
}