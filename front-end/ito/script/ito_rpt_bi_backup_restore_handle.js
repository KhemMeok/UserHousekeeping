/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function fnCatalogListCallBack(data) {

    if (data.status == "1") {
        element.inputValue("rpt_bi_bak_report_date", data.data.report_date);
        element.inputValue("rpt_bi_bak_from_server", data.data.backup_source);
        element.inputValue("rpt_bi_res_to_server", data.data.restore_destination);
        element.inputValue("rpt_bi_bak_rpt_date_in", data.data.report_date)
        dataTable.ApplyJsonData("rpt_bi_catalog_to_bak_tbl", data.data.to_backup_catalog);
        fnRefreshBackupDetail();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
    
}
function fnBIBakGetBakDetailDataCallBack(data) {
    if (data.status == "1") {
        dataTable.ApplyJsonData("rpt_bi_catalogs_bak_detail_tbl", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnBIRefreshBICatalogCallBack(data) {
    if (data.status == "1") {
        dataTable.ApplyJsonData("rpt_bi_catalog_to_bak_tbl", data.data.to_backup_catalog);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnArchiveBICatalogCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Catalog Archive", data.message);
        fnRefreshBackupDetail();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnUnarchiveBICatalogCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Catalog Unarchive", data.message);
        fnRefreshBackupDetail();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnBIRefreshBIDRCatalogCallBack(data) {
    if (data.status == "1") {
        dataTable.ApplyJsonData("rpt_bi_verify_unarchive_tbl", data.data.to_backup_catalog);
        modals.Open("rpt_bi_verify_unarchive_md");
        dataTable.Recal();
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}