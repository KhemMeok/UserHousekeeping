/// <reference path="ito_core.js" />
/// <reference path="ito_rpt_patch_management_handle.js"/>

function RptPatchMGTGetDataFirstLoad() {
    CallAPI.Go(v_ptm_gtName, undefined, RptPatchMGTFnGetDataFirstLoadCallback, "Processing");
}
function RptPatchMGTFnEnvironmentSl() {
    let envSl = $("#rptPatchMGTEnvironmentSl").val();
    let sysTypeSl = $("#rptPatchMGTSystemTypeSl").val();
    let siteSl = $("#rptPatchMGTSiteSl").val();
    let optionHostSl = '<option value=""></option>';;
    $.each(onloadData.data.listHostAndVs, function (i, item) {
        if (item.environment === envSl && item.sysName === sysTypeSl && item.site === siteSl) {
            optionHostSl = optionHostSl + '<option value="' + item.hostId + '">' + item.host_name + '(' + item.ip + ')' + '</option>';
        }
    });
    selectionStyle.LiveSearch("rptPatchMGTHostSl", optionHostSl);
}
function RptPatchMGTFnSysTypeSl() {
    $("#rptPatchMGTEnvironmentSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTHostSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTSiteSl").prop("selectedIndex", 0).change();
}
function RptPatchMGTFnSiteSl() {
    $("#rptPatchMGTEnvironmentSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTHostSl").prop("selectedIndex", 0).change();
}
function RptPatchMGTClearAll() {
    element.inputValue("rptPatchMGTRequestDateIn", "");
    element.inputValue("rptPatchMGTCurrentVersionIn", "");
    element.inputValue("rptPatchMGTUpgradeVersionIn", "");
    element.inputValue("rptPatchMGTDocumentIn", "");
    element.inputValue("rptPatchMGTSrIn", "");
    element.inputValue("rptPatchMGTAppliedDateIn", "");
    element.inputValue("rptPatchMGTReviewedDateIn", "");
    element.inputValue("rptPatchMGTApprovedDateIn", "");
    element.inputValue("rptPatchMGTDescriptionIn", "");
    element.inputValue("rptPatchMGTRemarkIn", "");
    $("#rptPatchMGTRequesterSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTTicketIn").prop("selectedIndex", 0).change();
    $("#rptPatchMGTEnvironmentSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTComponentSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTUatSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTSystemTypeSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTHostSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTPatchTypeSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTPrioritySl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTServiceImpactSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTStatusSl").prop("selectedIndex", 0).change();
    //$("#rptPatchMGTAppliedBySl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTAppliedBySl").val([]);
    $("#rptPatchMGTReviewerSl").val([]);
    $("#rptPatchMGTApprovedSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTSiteSl").prop("selectedIndex", 0).change();
    $("#rptPatchMGTCriticalitySl").prop("selectedIndex", 0).change();
    document.getElementById("rpt_ptm_insert_patch").style.display = "";
    document.getElementById("rpt_ptm_update_patch_btn").style.display = "none";
    document.getElementById("rpt_ptm_cancel").style.display = "none";
    patchId = "";
    report_ids = '';
    $("#rptPatchMGTRequesterSl").prop("disabled", false);
    $("#rptPatchMGTUatSl").prop("disabled", false);
    $("#rptPatchMGTPrioritySl").prop("disabled", false);
    $("#rptPatchMGTServiceImpactSl").prop("disabled", false);
    $("#rptPatchMGTCriticalitySl").prop("disabled", false);
    $("#rptPatchMGTAppliedBySl").prop("disabled", false);
    $("#rptPatchMGTReviewerSl").prop("disabled", false);
    $("#rptPatchMGTApprovedSl").prop("disabled", false);
    $("#rptPatchMGTRequestDateIn").prop("disabled", false);
    $("#rptPatchMGTAppliedDateIn").prop("disabled", false);
    $("#rptPatchMGTReviewedDateIn").prop("disabled", false);
    $("#rptPatchMGTApprovedDateIn").prop("disabled", false);
}
function RptPatchMGTClearForTicketSl() {
    try {
        element.inputValue("rptPatchMGTRequestDateIn", "");
        element.inputValue("rptPatchMGTAppliedDateIn", "");
        element.inputValue("rptPatchMGTReviewedDateIn", "");
        element.inputValue("rptPatchMGTApprovedDateIn", "");
        element.inputValue("rptPatchMGTDescriptionIn", "");
        element.inputValue("rptPatchMGTRemarkIn", "");
        $("#rptPatchMGTRequesterSl").prop("selectedIndex", 0).change();
        $("#rptPatchMGTUatSl").prop("selectedIndex", 0).change();
        $("#rptPatchMGTPrioritySl").prop("selectedIndex", 0).change();
        $("#rptPatchMGTServiceImpactSl").prop("selectedIndex", 0).change();
        //$("#rptPatchMGTAppliedBySl").prop("selectedIndex", 0).change();
        $("#rptPatchMGTAppliedBySl").val([]).change();
        $("#rptPatchMGTReviewerSl").val([]).change();
        $("#rptPatchMGTApprovedSl").prop("selectedIndex", 0).change();
        $("#rptPatchMGTCriticalitySl").prop("selectedIndex", 0).change();
    } catch (error) {
        console.error(error);
    }
}
function RptPatchMGTGetDataForUpdate(report_ids) {
    patchId = report_ids;
    CallAPI.Go(v_rpt_ptm_get_record_for_update, { patchId: report_ids }, RptPatchMGTEditPatchCallback, "Processing...");
}
function RptPatchMGTFnGetDataAll() {
    // get all elements data
    let requestDateIn = $("#rptPatchMGTRequestDateIn").val();
    let requesterSl = $("#rptPatchMGTRequesterSl").val();
    let sysTypeSl = $("#rptPatchMGTSystemTypeSl").val();
    let hostIdIn = $("#rptPatchMGTHostSl").val();
    let patchTypeSl = $("#rptPatchMGTPatchTypeSl").val();
    let curVersionIn = $("#rptPatchMGTCurrentVersionIn").val();
    let upgradeVersionIn = $("#rptPatchMGTUpgradeVersionIn").val();
    let uatSl = $("#rptPatchMGTUatSl").val();
    let prioritySl = $("#rptPatchMGTPrioritySl").val();
    let serviceImpactSL = $("#rptPatchMGTServiceImpactSl").val();
    let docIdIn = $("#rptPatchMGTDocumentIn").val();
    let srIdIn = $("#rptPatchMGTSrIn").val();
    let statusSl = $("#rptPatchMGTStatusSl").val();
    let appliedBySl = $("#rptPatchMGTAppliedBySl").val();
    let appliedDate = $("#rptPatchMGTAppliedDateIn").val();
    let reviewerSl = $("#rptPatchMGTReviewerSl").val();
    let reviewDate = $("#rptPatchMGTReviewedDateIn").val();
    let approvedSl = $("#rptPatchMGTApprovedSl").val();
    let approvedDate = $("#rptPatchMGTApprovedDateIn").val();
    let ticNote = $("#rptPatchMGTTicketIn").val();
    let descriptionIn = $("#rptPatchMGTDescriptionIn").val();
    let siteSelected = $("#rptPatchMGTSiteSl").val();
    let patchComponentSl = $("#rptPatchMGTComponentSl").val().split("~");
    let criticalSl = $("#rptPatchMGTCriticalitySl").val();
    let remarkIn = $("#rptPatchMGTRemarkIn").val();
    let status = true;
    // check verify data

    if (sysTypeSl === "" || sysTypeSl == null) {
        goAlert.alertErroTo("rptPatchMGTSystemTypeSl", "Processing Failed", "System type must be select", "change");
        status = false;
        return false;
    }
    if (siteSelected === "" || siteSelected == null) {
        goAlert.alertErroTo("rptPatchMGTSiteSl", "Processing Failed", "Site must be select", "change");
        status = false;
        return false;
    }
    if (hostIdIn === "" || hostIdIn == null) {
        goAlert.alertErroTo("rptPatchMGTHostSl", "Processing Failed", "Host must be select", "change");
        status = false;
        return false;
    }
    if (patchTypeSl === "" || patchTypeSl == null) {

        goAlert.alertErroTo("rptPatchMGTPatchTypeSl", "Processing Failed", "Patch type must be select", "change");
        status = false;
        return false;
    }
    if (patchComponentSl[0] === "" || patchComponentSl[0] == null) {
        goAlert.alertErroTo("rptPatchMGTComponentSl", "Processing Failed", "Patch Component must be select", "change");
        status = false;
        return false;
    }
    if (curVersionIn === "") {
        goAlert.alertErroTo("rptPatchMGTCurrentVersionIn", "Processing Failed", "Current version must be input", "input");
        status = false;
        return false;
    }
    if (upgradeVersionIn === "") {
        if (patchTypeSl != '5') { // id fix bugs
            goAlert.alertErroTo("rptPatchMGTUpgradeVersionIn", "Processing Failed", "Upgrade version must be input", "input");
            status = false;
            return false;
        }
    }
    if (ticNote === "" || ticNote == null) {
        goAlert.alertErroTo("rptPatchMGTTicketIn", "Processing Failed", "Ticket must be select", "input");
        status = false;
        return false;
    }
    if (prioritySl === "" || prioritySl == null) {
        goAlert.alertErroTo("rptPatchMGTPrioritySl", "Processing Failed", "priority must be select", "change");
        status = false;
        return false;
    }
    if (criticalSl === "" || criticalSl == null) {
        goAlert.alertErroTo("rptPatchMGTCriticalitySl", "Processing Failed", "Criticality must be select", "change");
        status = false;
        return false;
    }
    if (serviceImpactSL === "" || serviceImpactSL == null) {
        goAlert.alertErroTo("rptPatchMGTServiceImpactSl", "Processing Failed", "Service Impact must be select", "change");
        status = false;
        return false;
    }
    if (uatSl === "" || uatSl == null) {
        goAlert.alertErroTo("rptPatchMGTUatSl", "Processing Failed", "UAT must be select", "change");
        status = false;
        return false;
    }
    if (requesterSl === "" || requesterSl == null) {
        goAlert.alertErroTo("rptPatchMGTRequesterSl", "Processing Failed", "Requester must be select", "change");
        status = false;
        return false;
    }
    if (requestDateIn === "") {
        goAlert.alertErroTo("rptPatchMGTRequestDateIn", "Processing Failed", "Request Date must be input", "input");
        status = false;
        return false;
    }
    if (reviewerSl === "" || reviewerSl == null || reviewerSl.length === 0) {
        goAlert.alertErroTo("rptPatchMGTReviewerSl", "Processing Failed", "reviewer must be select", "change");
        status = false;
        return false;
    }
    if (reviewDate === "" || reviewDate == null) {
        goAlert.alertErroTo("rptPatchMGTReviewedDateIn", "Processing Failed", "Review date must be input", "input");
        status = false;
        return false;
    }
    if (approvedSl === "" || approvedSl == null) {
        goAlert.alertErroTo("rptPatchMGTApprovedSl", "Processing Failed", "Approved must be select", "change");
        status = false;
        return false;
    }
    if (approvedDate === "" || approvedDate == null) {
        goAlert.alertErroTo("rptPatchMGTApprovedDateIn", "Processing Failed", "Approved date must be select", "input");
        status = false;
        return false;
    }
    if (appliedBySl === "" || appliedBySl == null) {
        goAlert.alertErroTo("rptPatchMGTAppliedBySl", "Processing Failed", "applied by must be select", "change");
        status = false;
        return false;
    }
    if (appliedDate === "" || appliedDate == null) {
        goAlert.alertErroTo("rptPatchMGTAppliedDateIn", "Processing Failed", "applied date must be select", "input");
        status = false;
        return false;
    }
    if (statusSl === "" || statusSl == null) {
        goAlert.alertErroTo("rptPatchMGTStatusSl", "Processing Failed", "status must be select", "change");
        status = false;
        return false;
    }
    if (statusSl === "FAILED" && remarkIn === "") {
        goAlert.alertErroTo("rptPatchMGTRemarkIn", "Processing Failed", "Pls input remark information", "input");
        status = false;
        return false;
    }
    if (descriptionIn === "" || descriptionIn == null) {
        goAlert.alertErroTo("rptPatchMGTDescriptionIn", "Processing Failed", "Description must be select", "input");
        status = false;
        return false;
    }
    function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }
    function convertFloatingStringToNumber(floatingString) {
        let cleanString = floatingString.toString().replace(/\./g, "");
        let convertedNumber = parseFloat(cleanString);
        return convertedNumber;
    }
    try {
        if (isNumber(parseFloat(upgradeVersionIn)) && isNumber(parseFloat(upgradeVersionIn))) {
            if (convertFloatingStringToNumber(upgradeVersionIn) < convertFloatingStringToNumber(curVersionIn) ||
                (convertFloatingStringToNumber(upgradeVersionIn) === convertFloatingStringToNumber(curVersionIn) &&
                    patchTypeSl !== '5')
            ) {
                goAlert.alertErroTo(
                    'rptPatchMGTUpgradeVersionIn',
                    'Processing Failed',
                    'Upgrade version must be greater than the current version.',
                    'input'
                );
                status = false;
                return false;
            }
        }
    } catch (error) {
        goAlert.alertErroTo(
            'rptPatchMGTUpgradeVersionIn',
            'Processing Failed',
            'Error number of version is not valid',
            'input'
        );
        goAlert.alertErroTo(
            'rptPatchMGTCurrentVersionIn',
            'Processing Failed',
            'Error number of version is not valid',
            'input'
        );
        // Handle the exception here
        console.log('An error occurred:', error);
    }
    return {
        data: {
            requestDate: requestDateIn,
            requester: requesterSl,
            curr_version: curVersionIn,
            upgrade_version: upgradeVersionIn,
            host_id: hostIdIn.split("~")[0],
            system_type: sysTypeSl,
            priority: prioritySl,
            uat: uatSl,
            impact: serviceImpactSL,
            objective: ticNote,
            descriptions: descriptionIn,
            doc_id: docIdIn === "" ? "N/A" : docIdIn,
            status: statusSl,
            applied_by: appliedBySl.toString(),
            applied_date: appliedDate,
            reviewed_by: reviewerSl.toString(),
            reviewed_date: reviewDate,
            approved_by: approvedSl,
            approved_date: approvedDate,
            sr_id: srIdIn === "" ? "N/A" : srIdIn,
            patch_type: patchTypeSl,
            site: siteSelected,
            patch_component: patchComponentSl[0],
            criticality: criticalSl,
            remark: remarkIn
        },
        status: status
    };
}
var report_ids = '';
function RptPatchMGTFnEditPatchHandle() {

    let report_id_obj = table.GetValueSelected("rpt_ptm_get_data_table");
    if (report_id_obj.length === 0) {
        goAlert.alertError("Processing Failed", "No Record ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    report_ids = stringCreate.FromObject(report_id_obj);
    RptPatchMGTGetDataForUpdate(report_ids);
}
var rptPatchDataForInsert = '';
function RptPatchMGTInsertNewPatch() {
    rptPatchDataForInsert = RptPatchMGTFnGetDataAll();
    if (rptPatchDataForInsert.status) {
        CallAPI.Go(
            v_ptm_insert_patch,
            rptPatchDataForInsert.data,
            RptPatchMGTFnInsertNewPatchCallback,
            "Processing..."
        );
    }
}
function RptPatchMGTDeleteExitingPatch(report_ids) {
    modals.CloseConfirm();
    CallAPI.Go(
        v_rpt_ptm_delete_record,
        { id: report_ids },
        RptPatchMGTFnDeletePatchCallback,
        "Processing..."
    );
}
function RptPatchMGTFnGetDataListing() {
    CallAPI.Go(v_ptm_getDataTable, undefined, RptPatchMGTFnGetDataListingCallback, 'Processing..');
}
let rptPatchDataForUpdate;
function RptPatchMGTFnUpdateExitingPatch() {
    rptPatchDataForUpdate = RptPatchMGTFnGetDataAll();

    if (rptPatchDataForUpdate.status) {
        // add new properties
        rptPatchDataForUpdate.data.patch_mid = patchId;
        rptPatchDataForUpdate.data.env = "";
        rptPatchDataForUpdate.data.host_name = "";
        const data = rptPatchDataForUpdate.data;
        CallAPI.Go(
            v_rpt_ptm_update_record,
            data,
            RptPatchMGTFnUpdatePatchCallback,
            "Processing..."
        );
    }
}
function RptPatchMGTFnTicketSl() {
    let ticketSelect = $("#rptPatchMGTTicketIn").val();
    const item = dataTicketFromHD.data.listGetTicket.find(
        item => item.ticketId === ticketSelect
    );
    if (item !== undefined) {
        RptPatchMGTClearForTicketSl();
        $("#rptPatchMGTRequesterSl").val(item.requester.toString().trim().toUpperCase()).change();
        $("#rptPatchMGTUatSl").val(item.uat).change();
        $("#rptPatchMGTPrioritySl").val(item.priority.toString().trim().toUpperCase()).change();
        $("#rptPatchMGTServiceImpactSl").val(item.service_impact.toString().trim().toUpperCase()).change();
        $("#rptPatchMGTCriticalitySl").val(item.criticality.toString().trim().toUpperCase()).change();
        $("#rptPatchMGTAppliedBySl").val(item.applied_by.toString().trim().toUpperCase().split(",")).change();
        $("#rptPatchMGTReviewerSl").val(item.reviewed_by.toString().trim().toUpperCase().split(",")).change();
        $("#rptPatchMGTApprovedSl").val(item.approved_by.toString().trim().toUpperCase()).change();
        const description = document.getElementById("rptPatchMGTDescriptionIn");
        description.style.fontSize = "13px";
        description.value = item.patch_description;
        element.inputValue("rptPatchMGTRequestDateIn", item.request_date);
        element.inputValue("rptPatchMGTAppliedDateIn", item.applied_date);
        element.inputValue("rptPatchMGTReviewedDateIn", item.reviewed_date);
        element.inputValue("rptPatchMGTApprovedDateIn", item.approved_date);
        if (item.ticketId !== 'No Ticket') {
            $("#rptPatchMGTRequesterSl").prop("disabled", true);
            $("#rptPatchMGTUatSl").prop("disabled", true);
            $("#rptPatchMGTPrioritySl").prop("disabled", true);
            $("#rptPatchMGTServiceImpactSl").prop("disabled", true);
            $("#rptPatchMGTCriticalitySl").prop("disabled", true);
            $("#rptPatchMGTAppliedBySl").prop("disabled", true);
            $("#rptPatchMGTReviewerSl").prop("disabled", true);
            $("#rptPatchMGTApprovedSl").prop("disabled", true);
            $("#rptPatchMGTRequestDateIn").prop("disabled", true);
            $("#rptPatchMGTAppliedDateIn").prop("disabled", true);
            $("#rptPatchMGTReviewedDateIn").prop("disabled", true);
            $("#rptPatchMGTApprovedDateIn").prop("disabled", true);
        } else {
            $("#rptPatchMGTRequesterSl").prop("disabled", true);
            $("#rptPatchMGTUatSl").prop("disabled", true);
            $("#rptPatchMGTPrioritySl").prop("disabled", true);
            $("#rptPatchMGTServiceImpactSl").prop("disabled", true);
            $("#rptPatchMGTCriticalitySl").prop("disabled", true);
            $("#rptPatchMGTAppliedBySl").prop("disabled", true);
            $("#rptPatchMGTReviewerSl").prop("disabled", true);
            $("#rptPatchMGTApprovedSl").prop("disabled", true);
            $("#rptPatchMGTRequestDateIn").prop("disabled", false);
            $("#rptPatchMGTAppliedDateIn").prop("disabled", true);
            $("#rptPatchMGTReviewedDateIn").prop("disabled", true);
            $("#rptPatchMGTApprovedDateIn").prop("disabled", true);
            element.inputValue("rptPatchMGTRequestDateIn", "");
        }
    } else {
        RptPatchMGTClearForTicketSl();
    }
}
function RptPatchMGTFnPatchComponentSl() {
    let hostId = $("#rptPatchMGTHostSl").val();
    let patch_component = $("#rptPatchMGTComponentSl").val().toString().split("~");
    let sys_type = $("#rptPatchMGTSystemTypeSl").val();
    let req_data = {
        patch_component: patch_component[0],
        host_id: hostId,
        sys_type: sys_type
    };

    if (hostId !== null && hostId !== undefined && hostId) {
        CallAPI.Go(v_rpt_ptm_get_current_version, req_data, d => {
            if (d.status === "1") {
                element.inputValue("rptPatchMGTCurrentVersionIn", d.version);
            } else {
                alert(d);
            }
        });
    }
}
function fnGetTicketFromHDSys() {
    CallAPI.Go(v_rpt_ptm_get_ticket_from_hd_sys, undefined, RptGetTicketFromHDCallBack);
}
let dataTicketFromHD = '';
function RptGetTicketFromHDCallBack(data) {
    if (data.status === "1") {
        dataTicketFromHD = data;

        //Add options ticket
        let option_ticket_sl = '<option value=""></option>';
        $.each(data.data.listGetTicket, function (i, item) {
            var optionTitle = item.criticality_note === "" ? "" : ' - ' + item.criticality_note;
            var optionValue = item.ticketId;
            var title = item.patch_description;
            option_ticket_sl += '<option value="' + optionValue + '" title="' + title + '">' + optionValue + optionTitle + '</option>';
        });
        selectionStyle.LiveSearch("rptPatchMGTTicketIn", option_ticket_sl);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
