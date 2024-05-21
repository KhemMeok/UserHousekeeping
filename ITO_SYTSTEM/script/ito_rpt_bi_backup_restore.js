/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

function fnRefreshBICatalog() {
    var data = { site: "DC" };
    CallAPI.Go(v_rpt_bi_catalog_list, data, fnBIRefreshBICatalogCallBack, "Processing...");
}
function fnRefreshBackupDetail(Processer) {
    var report_date = $("#rpt_bi_bak_rpt_date_in").val();
    if (report_date == "") {
        goAlert.alertErroTo("rpt_bi_bak_rpt_date_in", "Processing Failed", "Report Date must be selected");
        return false;
    };
    var data = { report_date: report_date };

    if (Processer === undefined) {
        CallAPI.Go(v_rpt_bi_get_backup_detail_data, data, fnBIBakGetBakDetailDataCallBack);
    }
    else {
        CallAPI.Go(v_rpt_bi_get_backup_detail_data, data, fnBIBakGetBakDetailDataCallBack, "Processing...");
    }

}
function fnConfirmArchiveBICatalog() {
    var catalog_obj = [];
    catalog_obj = table.GetValueSelected("rpt_bi_catalog_to_bak_tbl");
    if (catalog_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Catalog Selected");
        return false;
    }
    var catalog = stringCreate.FromObject(catalog_obj);
    
    

    if (modals.ConfirmShowAgain("rptconfirmarchivebicatalog") == true) {
        modals.Confirm("Archive BI Catalog Confirm", "Are you sure to archive selected catalog?", "N", "Yes", "onclick", "fnArchiveBICatalog('" + catalog + "')", "rptconfirmarchivebicatalog");
    }
    else {
        fnArchiveBICatalog(catalog);
    }
   
}
function fnArchiveBICatalog(catalog_name) {
    modals.CloseConfirm();
    var data = { catalog_name: catalog_name };
    CallAPI.Go(v_rpt_bi_archive_catalog, data, fnArchiveBICatalogCallBack, "Processing...");
}
function fnConfirmUnarchiveBICatalog() {
    var report_date = $("#rpt_bi_bak_rpt_date_in").val();
    if (report_date == "") {
        goAlert.alertErroTo("rpt_bi_bak_rpt_date_in", "Processing Failed", "Report Date must be selected");
        return false;
    };
    var catalog_obj = [];
    catalog_obj = table.GetValueSelected("rpt_bi_catalogs_bak_detail_tbl");
    if (catalog_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Catalog Selected");
        return false;
    }
    var catalog = stringCreate.FromObject(catalog_obj);



    if (modals.ConfirmShowAgain("rptconfirmunarchivebicatalog") == true) {
        modals.Confirm("Unarchive BI Catalog Confirm", "Are you sure to unarchive selected catalog?", "N", "Yes", "onclick", "fnUnarchiveBICatalog('" + catalog + "','" + report_date+"')", "rptconfirmunarchivebicatalog");
    }
    else {
        fnUnarchiveBICatalog(catalog, report_date);
    }

}
function fnUnarchiveBICatalog(catalog_name, report_date) {
    modals.CloseConfirm();
    var data = { catalog_name: catalog_name, report_date:report_date };
    CallAPI.Go(v_rpt_bi_unarchive_catalog, data, fnUnarchiveBICatalogCallBack, "Processing...");
}
function fnVerifyDRCatalogOpenModal() {
    var data = { site: "DR" };
    CallAPI.Go(v_rpt_bi_catalog_list, data, fnBIRefreshBIDRCatalogCallBack, "Processing...");
}