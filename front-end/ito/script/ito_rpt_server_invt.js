/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function rpt_server_refresh_obj() {
    CallAPI.Go(v_rpt_server_invt_on_load, undefined, fnRPTServerINVTRefreshObjCallBack, "Processing...");
}

function ValidateIPaddress(ipaddress, obj) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    } else {
        goAlert.alertErroTo(obj, "Processing Failed", "You have entered an invalid IP address!", "input");
        return false;
    }
}

function rpt_server_invt_fn_submit_host() {
    var host_name = $("#rpt_server_invt_hostid").val();
    var product_des = $("#rpt_server_invt_productdesc").val();
    var site = $("#rpt_server_invt_hostside").val();
    var dr_of = $("#rpt_server_invt_drof").val();
    var system_type = $("#rpt_server_invt_system_type").val();
    var environment = $("#rpt_server_invt_environment").val();
    var os_platform = $("#rpt_server_invt_osplatform").val();
    var os_version = $("#rpt_server_invt_osver").val();
    var csi = $("#rpt_server_invt_csi").val();
    var ip_mgt = $("#rpt_server_invt_mgrip").val();
    var ip_lan = $("#rpt_server_invt_lanip").val();
    var remark = $("#rpt_server_invt_registerhost_remark").val();
    if (host_name == "") {
        goAlert.alertErroTo("rpt_server_invt_hostid", "Processing Failed", "Host name must be input", "input");
        return false;
    }
    if (product_des == "") {
        goAlert.alertErroTo("rpt_server_invt_productdesc", "Processing Failed", "Product Description must be input", "input");
        return false;
    }
    if (site == null) {
        goAlert.alertErroTo("rpt_server_invt_hostside", "Processing Failed", "Site must be select", "change");
        return false;
    }
    if (system_type == null || system_type == "") {
        goAlert.alertErroTo("rpt_server_invt_system_type", "Processing Failed", "System Type must be select", "change");
        return false;
    }
    if (environment == null) {
        goAlert.alertErroTo("rpt_server_invt_environment", "Processing Failed", "Environment must be select", "change");
        return false;
    }
    if (os_platform == null || os_platform == "") {
        goAlert.alertErroTo("rpt_server_invt_osplatform", "Processing Failed", "OS Platform must be select", "change");
        return false;
    }
    if (os_version == "") {
        goAlert.alertErroTo("rpt_server_invt_osver", "Processing Failed", "OS Version must be input", "input");
        return false;
    }
    if (csi == null) {
        goAlert.alertErroTo("rpt_server_invt_csi", "Processing Failed", "CSI must be select", "change");
        return false;
    }
    if (ip_mgt !== "" && ValidateIPaddress(ip_mgt, "rpt_server_invt_mgrip") == false) {
        return false;
    }
    if (ip_lan !== "" && ValidateIPaddress(ip_lan, "rpt_server_invt_lanip") == false) {
        return false;
    }
    if (site == "DC") {
        dr_of = "0";
    }
    var data = {
        host_name: host_name,
        product_des: product_des,
        site: site,
        dr_of: dr_of,
        system_type: system_type,
        environment: environment,
        os_platform: os_platform,
        os_version: os_version,
        csi: csi,
        ip_mgt: ip_mgt,
        ip_lan: ip_lan,
        remark: remark
    };
    CallAPI.Go(v_rpt_server_invt_fn_submit_host, data, fnRPTServerINVTRegisterHostCallBack, "Processing...");
}

function rpt_server_invt_FN_on_hostside(value) {
    if (value == "DC") {
        element.setDisable("rpt_server_invt_drof");
    } else {
        element.setEnable("rpt_server_invt_drof");
    }
}

function fnrpt_server_invt_tabchange(btn_attr) {
    if (btn_attr == "register_csi") {
        $("#rpt_server_invt_btn_submit").attr("onclick", "rpt_server_invt_fn_submit_csi()");
        $("#rpt_server_invt_btn_update").attr("onclick", "rpt_server_invt_fn_update_csi()");
        $("#rpt_server_invt_btn_clear").attr("onclick", "rpt_server_invt_fn_clear_csi()");
        $('.nav-tabs a[href="#rpt_server_invt_list_csi_tab"]').tab('show');
        //CHANGE LISTING BUTTON
        $("#rpt_server_invt_update_list").attr("onclick", "rpt_server_invt_fn_edit_csi_list()");
        $("#rpt_server_invt_refresh_list").attr("onclick", "rpt_server_invt_fnRefresh_csi_listing()");
        $("#rpt_server_invt_delete_list").attr("onclick", "rpt_server_invt_fn_delete_csi_list()");
        document.getElementById("rpt_server_invt_view_doc_support_list").style.display = "";
        dataTable.Recal();
    };
    if (btn_attr == "register_host") {
        $("#rpt_server_invt_btn_submit").attr("onclick", "rpt_server_invt_fn_submit_host()");
        $("#rpt_server_invt_btn_update").attr("onclick", "rpt_server_invt_fn_update_host()");
        $("#rpt_server_invt_btn_clear").attr("onclick", "rpt_server_invt_fn_clear_host()");
        $('.nav-tabs a[href="#rpt_server_invt_list_hostregister_tab"]').tab('show');
        //CHANGE LISTING BUTTON
        $("#rpt_server_invt_update_list").attr("onclick", "rpt_server_invt_fn_edit_host_list()");
        $("#rpt_server_invt_refresh_list").attr("onclick", "rpt_server_invt_fnRefresh_host_listing()");
        $("#rpt_server_invt_delete_list").attr("onclick", "rpt_server_invt_fn_confirm_delete_host_list()");
        document.getElementById("rpt_server_invt_view_doc_support_list").style.display = "none";
        dataTable.Recal();
    };
    if (btn_attr == "service_mapping") {
        $("#rpt_server_invt_btn_submit").attr("onclick", "rpt_server_invt_fn_submit_service()");
        $("#rpt_server_invt_btn_update").attr("onclick", "rpt_server_invt_fn_update_service()");
        $("#rpt_server_invt_btn_clear").attr("onclick", "rpt_server_invt_fn_clear_service()");
        $('.nav-tabs a[href="#rpt_server_invt_list_service_mapping_tab"]').tab('show');
        //CHANGE LISTING BUTTON
        $("#rpt_server_invt_update_list").attr("onclick", "rpt_server_invt_fn_edit_service_list()");
        $("#rpt_server_invt_refresh_list").attr("onclick", "rpt_server_invt_fnRefresh_service_listing()");
        $("#rpt_server_invt_delete_list").attr("onclick", "rpt_server_invt_fn_delete_service_list()");
        dataTable.Recal();
    };
    if (btn_attr == "rpt_server_invt_list_hostregister") {
        $("#rpt_server_invt_update_list").attr("onclick", "rpt_server_invt_fn_edit_host_list()");
        $("#rpt_server_invt_refresh_list").attr("onclick", "rpt_server_invt_fnRefresh_host_listing()");
        $("#rpt_server_invt_delete_list").attr("onclick", "rpt_server_invt_fn_confirm_delete_host_list()");
        document.getElementById("rpt_server_invt_view_doc_support_list").style.display = "none";
        dataTable.Recal();
    };
    if (btn_attr == "service_mapping_listing") {
        dataTable.Recal();
        $("#rpt_server_invt_update_list").attr("onclick", "rpt_server_invt_fn_edit_service_list()");
        $("#rpt_server_invt_refresh_list").attr("onclick", "rpt_server_invt_fnRefresh_service_listing()");
        $("#rpt_server_invt_delete_list").attr("onclick", "rpt_server_invt_fn_delete_service_list()");
    };
    if (btn_attr == "rpt_server_invt_list_csi") {
        $("#rpt_server_invt_update_list").attr("onclick", "rpt_server_invt_fn_edit_csi_list()");
        $("#rpt_server_invt_refresh_list").attr("onclick", "rpt_server_invt_fnRefresh_csi_listing()");
        $("#rpt_server_invt_delete_list").attr("onclick", "rpt_server_invt_fn_delete_csi_list()");
        document.getElementById("rpt_server_invt_view_doc_support_list").style.display = "";
        dataTable.Recal();
    };
}

 function rpt_server_invt_fnRefresh_host_listing() {
    if (checkBox.checkStat("rpt_server_invt_refresh_all_check") == true) {
        CallAPI.Go(v_rpt_server_invt_on_load, undefined, fnRPTServerINVTFirstLoadCallBack, "Processing...");
    } else {
        CallAPI.Go(v_rpt_server_invt_server_listing, undefined, fnRPTServerINVTServerListingCallBack, "Processing...");
    }
}

function rpt_server_invt_fnRefresh_service_listing() {
    if (checkBox.checkStat("rpt_server_invt_refresh_all_check") == true) {
        CallAPI.Go(v_rpt_server_invt_on_load, undefined, fnRPTServerINVTFirstLoadCallBack, "Processing...");
    } else {
        CallAPI.Go(v_rpt_server_invt_service_listing, undefined, fnRPTServerINVTServiceListingCallBack, "Processing...");
    }
}
function rpt_server_invt_fnRefresh_csi_listing() {
    if (checkBox.checkStat("rpt_server_invt_refresh_all_check") == true) {
        CallAPI.Go(v_rpt_server_invt_on_load, undefined, fnRPTServerINVTFirstLoadCallBack, "Processing...");
    } else {
        CallAPI.Go(v_rpt_server_invt_csi_listing, undefined, fnRPTServerINVTCSIListingCallBack, "Processing...");
    }
}

function rpt_server_invt_fn_edit_host_list() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_host_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    var data = {
        report_type: "SERVER",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_server_invt_edit_report, data, fnRPTServerINVTEditReportCallBack, "Processing...");
}

function rpt_server_invt_fn_edit_service_list() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_service_mapping_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    var data = {
        report_type: "SERVICE",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_server_invt_edit_report, data, fnRPTServerINVTEditReportCallBack, "Processing...");
}

function rpt_server_invt_fn_edit_csi_list() {
    //rpt_server_invt_fn_clear_csi();

    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_csi_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    var data = {
        report_type: "CSI",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_server_invt_edit_report, data, fnRPTServerINVTEditReportCallBack, "Processing...");
}

//var site_selected;
function rpt_server_invt_fn_confirm_delete_host_list() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_host_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeleteserverlisting") == true) {
        modals.Confirm("Delete Server Listing Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "rpt_server_invt_fn_delete_server_listing('" + report_ids + "')", "rptconfdeleteserverlisting");
    } else {
        rpt_server_invt_fn_delete_server_listing(report_ids);
    }
}
function rpt_server_invt_fn_delete_server_listing(report_ids) {
    modals.CloseConfirm();
    var data = {
        report_type: "SERVER_INVT_LISTING",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_server_invt_delete_report, data, fnRPTServerINVTDeleteServerCallBack, "Processing...");
}

function rpt_server_invt_fn_delete_service_list() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_service_mapping_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeleteservicelisting") == true) {
        modals.Confirm("Delete Service Listing Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "rpt_server_invt_fn_delete_service_listing('" + report_ids + "')", "rptconfdeleteservicelisting");
    } else {
        rpt_server_invt_fn_delete_service_listing(report_ids);
    }
}

function rpt_server_invt_fn_delete_service_listing(report_ids) {
    modals.CloseConfirm();
    var data = {
        report_type: "SERVICE_LISTING",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_server_invt_delete_report, data, fnRPTServerINVTDeleteServiceCallBack, "Processing...");
}

function rpt_server_invt_fn_delete_csi_list() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_csi_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rptconfdeletecsilisting") == true) {
        modals.Confirm("Delete CSI Listing Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "rpt_server_invt_fn_delete_csi_listing('" + report_ids + "')", "rptconfdeletecsilisting");
    } else {
        rpt_server_invt_fn_delete_csi_listing(report_ids);
    }
}

function rpt_server_invt_fn_delete_csi_listing(report_ids) {
    modals.CloseConfirm();
    var data = {
        report_type: "CSI_LISTING",
        report_id: report_ids
    }
    CallAPI.Go(v_rpt_server_invt_delete_report, data, fnRPTServerINVTDeleteCSICallBack, "Processing...");
}

function rpt_server_invt_fn_submit_csi() {
    var csi_sla = $("#rpt_server_invt_csisla").val();
    var sn = $("#rpt_server_invt_snnumber").val();
    var contract_type = $("#rpt_server_invt_contract_type").val();
    var product_type = $("#rpt_server_invt_product_type").val();
    var supporter = $("#rpt_server_invt_supporter").val();
    var asr = $("#rpt_server_invt_asr").val();
    var start_date = $("#rpt_server_invt_startdate").val();
    var expire_date = $("#rpt_server_invt_expiredate").val();
    var contact_person = $("#rpt_server_invt_contact_person").val();
    var remark = $("#rpt_server_invt_csiremark").val();
    var doc_support = base64String;
    var doc_name = ""; //ALLOW SUBMIT WITHOUT DOC SUPPORT
    var doc_size = $('#rpt_server_invt_doc_support')[0].files[0];
    if (base64String !== "") {
        doc_name = $('#rpt_server_invt_doc_support')[0].files[0].name;
    }
    if (doc_size == undefined) {
        doc_size = 0;
    }
    if (doc_size.size == 0) {
        goAlert.alertErroTo("rpt_server_invt_doc_support", "Processing Failed", "Size of the file is blank!", "input");
        return false;
    }
    if (csi_sla == "") {
        goAlert.alertErroTo("rpt_server_invt_csisla", "Processing Failed", "CSI or SLA must be input", "input");
        return false;
    }
    if (sn == "") {
        goAlert.alertErroTo("rpt_server_invt_snnumber", "Processing Failed", "SN Number must be input", "input");
        return false;
    }
    if (contract_type == null) {
        goAlert.alertErroTo("rpt_server_invt_contract_type", "Processing Failed", "Contract Type must be select", "change");
        return false;
    }
    if (product_type == null) {
        goAlert.alertErroTo("rpt_server_invt_product_type", "Processing Failed", "Product Type must be select", "change");
        return false;
    }
    if (supporter == null) {
        goAlert.alertErroTo("rpt_server_invt_supporter", "Processing Failed", "Supporter must be select", "change");
        return false;
    }
    if (asr == null) {
        goAlert.alertErroTo("rpt_server_invt_asr", "Processing Failed", "ASR must be select", "change");
        return false;
    }
    if (start_date == "") {
        goAlert.alertErroTo("rpt_server_invt_startdate", "Processing Failed", "Start Date must be input", "input");
        return false;
    }
    if (expire_date == "") {
        goAlert.alertErroTo("rpt_server_invt_expiredate", "Processing Failed", "Expire Date must be input", "input");
        return false;
    }
    var data = {
        csi_sla: csi_sla,
        sn: sn,
        contract_type: contract_type,
        product_type: product_type,
        supporter: supporter,
        asr: asr,
        start_date: start_date,
        expire_date: expire_date,
        contact_person: contact_person,
        remark: remark,
        doc_support: doc_support,
        doc_name: doc_name
    };
    CallAPI.Go(v_rpt_server_invt_fn_submit_csi, data, fnRPTServerINVTRegisterCSICallBack, "Processing...");
}

function rpt_server_invt_fn_submit_service() {
    var service_type = $("#rpt_server_invt_servicetype_mapping").val();
    var service_run = $("#rpt_server_invt_servicerun_mapping").val();
    var host_id = $("#rpt_server_invt_hostid_mapping").val();
    var remark = $("#rpt_server_invt_remark_mapping").val();
    if (host_id == null || host_id == "") {
        goAlert.alertErroTo("rpt_server_invt_hostid_mapping", "Processing Failed", "Host Name must be select", "change");
        return false;
    }
    if (service_type == null || service_type == "") {
        goAlert.alertErroTo("rpt_server_invt_servicetype_mapping", "Processing Failed", "Service Type must be select", "change");
        return false;
    }
    if (service_run == "") {
        goAlert.alertErroTo("rpt_server_invt_servicerun_mapping", "Processing Failed", "Service Run must be input", "input");
        return false;
    }
    var data = {
        service_type: service_type,
        service_run: service_run,
        host_id: host_id,
        remark: remark
    };
    CallAPI.Go(v_rpt_server_invt_fn_submit_service, data, fnRPTServerINVTRegisterServiceCallBack, "Processing...");
}

function rpt_server_invt_fn_clear_host() {
    element.inputValue("rpt_server_invt_hostid", "");
    element.inputValue("rpt_server_invt_productdesc", "");
    element.inputValue("rpt_server_invt_osver", "");
    element.inputValue("rpt_server_invt_mgrip", "");
    element.inputValue("rpt_server_invt_lanip", "");
    element.inputValue("rpt_server_invt_registerhost_remark", "");
    $("#rpt_server_invt_hostside").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_drof").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_system_type").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_environment").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_osplatform").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_csi").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_btn_submit").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_hostid").prop('selectedIndex', 0).change();
    $("#div_rpt_server_invt_hostidselected").prop('selectedIndex', 0).change();
    document.getElementById("rpt_server_invt_btn_update").style.display = "none";
    document.getElementById("rpt_server_invt_btn_submit").style.display = "";
    document.getElementById("div_rpt_server_invt_hostidselected").style.display = "none";
}

function rpt_server_invt_fn_clear_service() {
    element.inputValue("rpt_server_invt_servicerun_mapping", "");
    element.inputValue("rpt_server_invt_remark_mapping", "");
    element.inputValue("rpt_server_invt_registerhost_remark", "");
    $("#rpt_server_invt_hostid_mapping").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_servicetype_mapping").prop('selectedIndex', 0).change();
    document.getElementById("rpt_server_invt_btn_update").style.display = "none";
    document.getElementById("rpt_server_invt_btn_submit").style.display = "";
    document.getElementById("div_rpt_server_invt_serviceidselected").style.display = "none";
}
function rpt_server_invt_fn_clear_csi() {
    var contact_person = $("#rpt_server_invt_contact_person").val();
    amsifySuggestags = new AmsifySuggestags($('#rpt_server_invt_contact_person'));
    amsifySuggestags._init();
    var str = contact_person;
    var temp = new Array();
    temp = str.split(",");
    for (let i = 0; i <= temp.length; i++) {
        temp.forEach(function (item, index) {
            amsifySuggestags.removeTag(item);
        });
    }
    element.inputValue("rpt_server_invt_csisla", "");
    element.inputValue("rpt_server_invt_snnumber", "");
    element.inputValue("rpt_server_invt_startdate", "");
    element.inputValue("rpt_server_invt_expiredate", "");
    element.inputValue("rpt_server_invt_contact_person", "");
    element.inputValue("rpt_server_invt_doc_support", "");
    element.inputValue("rpt_server_invt_csiremark", "");
    $("#rpt_server_invt_contract_type").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_product_type").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_supporter").prop('selectedIndex', 0).change();
    $("#rpt_server_invt_asr").prop('selectedIndex', 0).change();
    document.getElementById("rpt_server_invt_btn_update").style.display = "none";
    document.getElementById("rpt_server_invt_btn_submit").style.display = "";
    element.setEnable("rpt_server_invt_csisla");
    document.getElementById("div_rpt_server_invt_csiidselected").style.display = "none";
    document.getElementById("rpt_server_invt_div_doc_support").style.display = "";
}

function rpt_server_invt_fn_update_host() {
    var host_id = $("#rpt_server_invt_hostidselected").val();
    var host_name = $("#rpt_server_invt_hostid").val();
    var product_des = $("#rpt_server_invt_productdesc").val();
    var site = $("#rpt_server_invt_hostside").val();
    var system_type = $("#rpt_server_invt_system_type").val();
    var environment = $("#rpt_server_invt_environment").val();
    var os_platform = $("#rpt_server_invt_osplatform").val();
    var os_version = $("#rpt_server_invt_osver").val();
    var csi = $("#rpt_server_invt_csi").val();
    if (host_name == "") {
        goAlert.alertErroTo("rpt_server_invt_hostid", "Processing Failed", "Host name must be input", "input");
        return false;
    }
    if (product_des == "") {
        goAlert.alertErroTo("rpt_server_invt_productdesc", "Processing Failed", "Product Description must be input", "input");
        return false;
    }
    if (site == null) {
        goAlert.alertErroTo("rpt_server_invt_hostside", "Processing Failed", "Site must be select", "change");
        return false;
    }
    if (system_type == null) {
        goAlert.alertErroTo("rpt_server_invt_system_type", "Processing Failed", "System Type must be select", "change");
        return false;
    }
    if (environment == null) {
        goAlert.alertErroTo("rpt_server_invt_environment", "Processing Failed", "Environment must be select", "change");
        return false;
    }
    if (os_platform == null) {
        goAlert.alertErroTo("rpt_server_invt_osplatform", "Processing Failed", "OS Platform must be select", "change");
        return false;
    }
    if (os_version == "") {
        goAlert.alertErroTo("rpt_server_invt_osver", "Processing Failed", "OS Version must be input", "input");
        return false;
    }
    if (csi == null) {
        goAlert.alertErroTo("rpt_server_invt_csi", "Processing Failed", "CSI must be select", "change");
        return false;
    }
    if (site == "DC") {
        dr_of = "0";
    }

    if (modals.ConfirmShowAgain("rptconfupdateserverreport") == true) {
        modals.Confirm("Update Server Confirm", "Are you sure to update server report id " + host_id + " ?", "N", "Yes", "onclick", "rpt_server_invt_fn_update_host_confirmed('" + host_id + "')", "rptconfupdateserverreport");
    } else {
        rpt_server_invt_fn_update_host_confirmed(host_id);
    }
}

function rpt_server_invt_fn_update_host_confirmed(host_id) {
    modals.CloseConfirm();
    var host_name = $("#rpt_server_invt_hostid").val();
    var product_desc = $("#rpt_server_invt_productdesc").val();
    var site = $("#rpt_server_invt_hostside").val();
    var dr_of = $("#rpt_server_invt_drof").val();
    var system_type = $("#rpt_server_invt_system_type").val();
    var enviroment = $("#rpt_server_invt_environment").val();
    var os_platform = $("#rpt_server_invt_osplatform").val();
    var os_version = $("#rpt_server_invt_osver").val();
    var csi = $("#rpt_server_invt_csi").val();
    var ip_mgt = $("#rpt_server_invt_mgrip").val();
    var ip_lan = $("#rpt_server_invt_lanip").val();
    var remark = $("#rpt_server_invt_registerhost_remark").val();
    var data = {
        host_id: host_id,
        host_name: host_name,
        product_desc: product_desc,
        site: site,
        dr_of: dr_of,
        system_type: system_type,
        enviroment: enviroment,
        os_platform: os_platform,
        os_version: os_version,
        csi: csi,
        ip_mgt: ip_mgt,
        ip_lan: ip_lan,
        remark: remark
    }
    CallAPI.Go(v_rpt_server_invt_update_server_report, data, fnRPTServerINVTUpdateServerReportCallBack, "Processing...");
}

function rpt_server_invt_fn_update_service() {
    var service_id = $("#rpt_server_invt_serviceidselected").val();
    var service_type = $("#rpt_server_invt_servicetype_mapping").val();
    var service_run = $("#rpt_server_invt_servicerun_mapping").val();
    var host_id = $("#rpt_server_invt_hostid_mapping").val();
    if (host_id == null) {
        goAlert.alertErroTo("rpt_server_invt_hostid_mapping", "Processing Failed", "Host Name must be select", "change");
        return false;
    }
    if (service_type == null) {
        goAlert.alertErroTo("rpt_server_invt_servicetype_mapping", "Processing Failed", "Service Type must be select", "change");
        return false;
    }
    if (service_run == "") {
        goAlert.alertErroTo("rpt_server_invt_servicerun_mapping", "Processing Failed", "Service Run must be input", "input");
        return false;
    }
    if (modals.ConfirmShowAgain("rptconfupdateservicereport") == true) {
        modals.Confirm("Update Service Confirm", "Are you sure to update service report id " + service_id + " ?", "N", "Yes", "onclick", "rpt_server_invt_fn_update_service_confirmed('" + service_id + "')", "rptconfupdateservicereport");
    } else {
        rpt_server_invt_fn_update_service_confirmed(service_id);
    }
}

function rpt_server_invt_fn_update_service_confirmed(service_id) {
    modals.CloseConfirm();
    var host_id = $("#rpt_server_invt_hostid_mapping").val();
    var service_type = $("#rpt_server_invt_servicetype_mapping").val();
    var service_run = $("#rpt_server_invt_servicerun_mapping").val();
    var remark = $("#rpt_server_invt_remark_mapping").val();
    var data = {
        service_id: service_id,
        host_id: host_id,
        service_type: service_type,
        service_run: service_run,
        remark: remark
    }
    CallAPI.Go(v_rpt_server_invt_update_service_report, data, fnRPTServerINVTUpdateServiceReportCallBack, "Processing...");
}

function rpt_server_invt_fn_update_csi() {
    var csi_no = $("#rpt_server_invt_csiidselected").val();
    var csi_sla = $("#rpt_server_invt_csisla").val();
    var sn = $("#rpt_server_invt_snnumber").val();
    var contract_type = $("#rpt_server_invt_contract_type").val();
    var product_type = $("#rpt_server_invt_product_type").val();
    var supporter = $("#rpt_server_invt_supporter").val();
    var asr = $("#rpt_server_invt_asr").val();
    var start_date = $("#rpt_server_invt_startdate").val();
    var expire_date = $("#rpt_server_invt_expiredate").val();

    if (csi_sla == "") {
        goAlert.alertErroTo("rpt_server_invt_csisla", "Processing Failed", "CSI or SLA must be input", "input");
        return false;
    }
    if (sn == "") {
        goAlert.alertErroTo("rpt_server_invt_snnumber", "Processing Failed", "SN Number must be input", "input");
        return false;
    }
    if (contract_type == null) {
        goAlert.alertErroTo("rpt_server_invt_contract_type", "Processing Failed", "Contract Type must be select", "change");
        return false;
    }
    if (product_type == null) {
        goAlert.alertErroTo("rpt_server_invt_product_type", "Processing Failed", "Product Type must be select", "change");
        return false;
    }
    if (supporter == null) {
        goAlert.alertErroTo("rpt_server_invt_supporter", "Processing Failed", "Supporter must be select", "change");
        return false;
    }
    if (asr == null) {
        goAlert.alertErroTo("rpt_server_invt_asr", "Processing Failed", "ASR must be select", "change");
        return false;
    }
    if (start_date == "") {
        goAlert.alertErroTo("rpt_server_invt_startdate", "Processing Failed", "Start Date must be input", "input");
        return false;
    }
    if (expire_date == "") {
        goAlert.alertErroTo("rpt_server_invt_expiredate", "Processing Failed", "Expire Date must be input", "input");
        return false;
    }
    if (modals.ConfirmShowAgain("rptconfupdatecsireport") == true) {
        modals.Confirm("Update CSI Confirm", "Are you sure to update CSI report id " + csi_no + " ?", "N", "Yes", "onclick", "rpt_server_invt_fn_update_csi_confirmed('" + csi_no + "')", "rptconfupdatecsireport");
    } else {
        rpt_server_invt_fn_update_csi_confirmed(csi_no);
    }
}

function rpt_server_invt_fn_update_csi_confirmed(csi_no) {
    modals.CloseConfirm();
    var csi_id = $("#rpt_server_invt_csisla").val();
    var sn = $("#rpt_server_invt_snnumber").val();
    var contract_type = $("#rpt_server_invt_contract_type").val();
    var product_type = $("#rpt_server_invt_product_type").val();
    var supporter = $("#rpt_server_invt_supporter").val();
    var asr = $("#rpt_server_invt_asr").val();
    var start_date = $("#rpt_server_invt_startdate").val();
    var expire_date = $("#rpt_server_invt_expiredate").val();
    var contact_person = $("#rpt_server_invt_contact_person").val();
    var remark = $("#rpt_server_invt_csiremark").val();

    var data = {
        csi_no: csi_no,
        csi_id: csi_id,
        sn: sn,
        contract_type: contract_type,
        product_type: product_type,
        supporter: supporter,
        asr: asr,
        start_date: start_date,
        expire_date: expire_date,
        contact_person: contact_person,
        remark: remark
    }
    CallAPI.Go(v_rpt_server_invt_update_csi_report, data, fnRPTServerINVTUpdateCSIReportCallBack, "Processing...");
}
var base64String = "";
//GET Base64String from multiple input box on change()
function GetBase64String(object_id, object_disable_when_error) {
    var files = document.getElementById(object_id);
    //Combine multiple file into a zip file
    var zip = new JSZip();
    let totalsize = 0;
    if (files.files.length <= 0) {
        base64String = "";
        return false;
    };
    for (var i = 0; i <= files.files.length - 1; i++) {
        var fname = files.files.item(i).name; // THE NAME OF THE FILE.
        var fsize = files.files.item(i).size; // THE SIZE OF THE FILE.
        totalsize += fsize;
        var file = files.files[i]; // THE byte OF THE FILE.
        //assign file into a zip file
        zip.file(fname, file);
    }
    if (totalsize <= 0) {
        goAlert.alertError("Files Size", "Size of the file is zero please check again!");
        element.setDisable(object_disable_when_error);
        base64String = "";
        return false;
    }
    if (totalsize > 10485760) {
        goAlert.alertError("Files Size", "Size of the file is " + (totalsize / (1024 * 1024)).toFixed(2) + "MB there is bigger than 10MB");
        element.setDisable(object_disable_when_error);
        return false;
    }
    element.setEnable(object_disable_when_error);
    zip.generateAsync({
        type: "blob"
    })
        .then(function (content) {
            ////download combined zip file
            //saveAs(content, "download.zip");

            //convert to base64 string
            var reader = new FileReader();

            reader.onload = function () {
                base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");
                //tmp_base64 = base64String;
                //console.log(base64String);
            }
            reader.readAsDataURL(content);
        });
}

function rpt_server_invt_fn_download_csi_doc_support() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_csi_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    var csi_no = stringCreate.FromObject(report_id_obj);
    var data = {
        report_type: "CSI",
        p_id: csi_no
    }
    CallAPI.Go(v_rpt_server_invt_download_doc, data, fnRPTServerINVTDownloadCSIDocSupportCallBack, "Processing...");
}

function rpt_server_invt_fn_download_doc_support() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_csi_listing_doc");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    var doc_id = stringCreate.FromObject(report_id_obj);
    var data = {
        report_type: "CSI_SINGLE",
        p_id: doc_id
    }
    CallAPI.Go(v_rpt_server_invt_download_doc, data, fnRPTServerINVTDownloadDocSupportCallBack, "Processing...");
}

function rpt_server_invt_fn_open_modal_csi_doc_support() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_csi_listing");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    };
    var csi_no = report_id_obj[0];
    element.inputValue("rpt_server_invt_modal_csi_no", csi_no);
    var data = {
        csi_no: csi_no
    };
    CallAPI.Go(v_rpt_server_invt_get_csi_doc, data, fnRPTServerINVTGetDocSupportCallBack, "Processing...");
}

function rpt_server_invt_fn_add_doc() {
    var csi_no = $("#rpt_server_invt_modal_csi_no").val();
    var doc_size = $('#rpt_server_invt_input_add_more_doc_support')[0].files[0];
    if (doc_size == undefined) {
        goAlert.alertErroTo("rpt_server_invt_input_add_more_doc_support", "Processing Failed", "Document can't be null!", "input");
        doc_size = 0;
        return false;
    }
    if (csi_no == "") {
        goAlert.alertErroTo("rpt_server_invt_modal_csi_no", "Processing Failed", "CSI No can't be null", "input");
        return false;
    }
    var doc_name = $('#rpt_server_invt_input_add_more_doc_support')[0].files[0].name;
    if (modals.ConfirmShowAgain("rptconfuploaddocsupportreport") == true) {
        modals.Confirm("Upload attached file Confirm", "Are you sure to upload attached file?", "N", "Yes", "onclick", "rpt_server_invt_fn_confirm_add_doc('" + csi_no + "','" + doc_name + "')", "rptconfuploaddocsupportreport");
    } else {
        rpt_server_invt_fn_confirm_add_doc(csi_no, doc_name);
    }
}

function rpt_server_invt_fn_confirm_add_doc(csi_no, doc_name) {
    modals.CloseConfirm();
    element.setEnable("rpt_server_invt_input_add_more_doc_support");

    var doc_file = base64String;
    var data = {
        csi_no: csi_no,
        doc_name: doc_name,
        doc_file: doc_file
    }
    CallAPI.Go(v_rpt_server_invt_upload_csi_doc, data, fnRPTServerINVTUploadCSICallBack, "Processing...");
}

function rpt_server_invt_fn_delete_doc() {
    var report_id_obj = [];
    report_id_obj = table.GetValueSelected("rpt_server_invt_tbl_csi_listing_doc");
    if (report_id_obj.length == 0) {
        goAlert.alertError("Processing Failed", "No Report ID Selected");
        return false;
    }
    if (modals.ConfirmShowAgain("rptconfdeletedocsupportreport") == true) {
        modals.Confirm("Delete Document Support Confirm", "Are you sure to delete attached file?", "N", "Yes", "onclick", "rpt_server_invt_fn_confirm_delete_doc('" + report_id_obj + "')", "rptconfdeletedocsupportreport");
    } else {
        rpt_server_invt_fn_confirm_delete_doc(report_id_obj);
    }
}

function rpt_server_invt_fn_confirm_delete_doc(doc_id) {
    modals.CloseConfirm();
    var data = {
        report_type: "DOC",
        report_id: doc_id
    }
    CallAPI.Go(v_rpt_server_invt_delete_report, data, fnRPTServerINVTDeleteDocCallBack, "Processing...");
}