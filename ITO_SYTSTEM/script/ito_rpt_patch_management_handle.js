/// <reference path="ito_core.js" />

let onloadData;
let patchId;
function RptPatchMGTFnGetDataFirstLoadCallback(data) {
    if (data.status === "1") {
        onloadData = data;
        RptPatchMGTFnGetDataListing();
        let option_name_steps = '<option value=""></option>';
        v_step_auto = [];
        $.each(data.data.listgetTeamName, function (i, item) {
            if (i === 0) {
                option_name_steps = '<option value=""></option>';
                option_name_steps = option_name_steps + '<option value="' + item.name.toString().trim() + '">' + item.name.toString().trim() + '</option>';
            }
            else {
                option_name_steps = option_name_steps + '<option value="' + item.name.toString().trim() + '">' + item.name.toString().trim() + '</option>';
            }
        });
        selectionStyle.LiveSearch("rptPatchMGTRequesterSl", option_name_steps);
        selectionStyle.MultipleInline("rptPatchMGTAppliedBySl", option_name_steps);
        selectionStyle.MultipleInline("rptPatchMGTReviewerSl", option_name_steps);
        selectionStyle.LiveSearch("rptPatchMGTApprovedSl", option_name_steps);
        let option_patch_steps = '<option value=""></option>';
        $.each(data.data.listSystemType, function (i, item) {
            if (i === 0) {
                option_patch_steps = '<option value=""></option>';
                option_patch_steps = option_patch_steps + '<option value="' + item.name + '">' + item.name + '</option>';
            }
            else {
                option_patch_steps = option_patch_steps + '<option value="' + item.name + '">' + item.name + '</option>';
            }
        });
        selectionStyle.LiveSearch("rptPatchMGTSystemTypeSl", option_patch_steps);
        //apply patch component
        let option_patch_component_steps = '';
        $.each(onloadData.data.listPatchComponent, function (i, item) {
            if (i === 0) {
                option_patch_component_steps = '<option value=""></option>';
                option_patch_component_steps = option_patch_component_steps + '<option value="' + item.id + '~' + item.type + '~' + item.name + '">' + item.name + '</option>';
            }
            else {
                option_patch_component_steps = option_patch_component_steps + '<option value="' + item.id + '~' + item.type + '~' + item.name + '">' + item.name + '</option>';
            }
        });
        selectionStyle.LiveSearch("rptPatchMGTComponentSl", option_patch_component_steps);
        //apply option patch type listPatchType
        let option_patch_type_op = '';
        $.each(onloadData.data.listPatchType, function (i, item) {
            if (i === 0) {
                option_patch_type_op = '<option value=""></option>';
                option_patch_type_op = option_patch_type_op + '<option value="' + item.id + '">' + item.name + '</option>';
            }
            else {
                option_patch_type_op = option_patch_type_op + '<option value="' + item.id + '">' + item.name + '</option>';
            }
        });
        selectionStyle.LiveSearch("rptPatchMGTPatchTypeSl", option_patch_type_op);
        selectionStyle.LiveSearch("rptPatchMGTHostSl", '<option></option>');
        goShowHide.hideOnDiv("divPriority");
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function RptPatchMGTEditPatchCallback(data) {
    if (data.status === "1") {
        document.getElementById("rpt_ptm_insert_patch").style.display = "none";
        document.getElementById("rpt_ptm_update_patch_btn").style.display = "";
        document.getElementById("rpt_ptm_cancel").style.display = "";
        $("#rptPatchMGTTicketIn").val(data.data.objective).change();
        $("#rpt_ptm_update_patch_btn").attr("onclick", "RptPatchMGTFnUpdateExitingPatch()");
        $("#rptPatchMGTRequesterSl").val(data.data.requester).change();
        $("#rptPatchMGTSystemTypeSl").val(data.data.system_type).change();
        $("#rptPatchMGTSiteSl").val(data.data.site).change();
        $("#rptPatchMGTComponentSl").val(data.data.patch_component).change();
        let environmentSl = $("#rptPatchMGTEnvironmentSl");
        environmentSl.val(data.data.env).change();
        let invData = environmentSl.val();
        if (invData) {
            $("#rptPatchMGTHostSl").val(data.data.host_name).change();
        }
        $("#rptPatchMGTPatchTypeSl").val(data.data.patch_type).change();
        $("#rptPatchMGTUatSl").val(data.data.uat).change();
        $("#rptPatchMGTPrioritySl").val(data.data.priority).change();
        $("#rptPatchMGTServiceImpactSl").val(data.data.impact).change();
        $("#rptPatchMGTStatusSl").val(data.data.status).change();
        $("#rptPatchMGTAppliedBySl").val(data.data.applied_by.toString().split(",")).change();
        $("#rptPatchMGTReviewerSl").val(data.data.reviewed_by.toString().split(",")).change();
        $("#rptPatchMGTApprovedSl").val(data.data.approved_by).change();
        $("#rptPatchMGTCriticalitySl").val(data.data.criticality).change();
        const description = document.getElementById("rptPatchMGTDescriptionIn");
        description.style.fontSize = '13px';
        description.value = data.data.descriptions;
        element.inputValue("rptPatchMGTRequestDateIn", data.data.requestDate);
        document.getElementById("rptPatchMGTCurrentVersionIn").value = data.data.curr_version;
        document.getElementById("rptPatchMGTUpgradeVersionIn").value = data.data.upgrade_version;
        element.inputValue("rptPatchMGTDocumentIn", data.data.doc_id);
        element.inputValue("rptPatchMGTSrIn", data.data.sr_id);
        element.inputValue("rptPatchMGTAppliedDateIn", data.data.applied_date);
        element.inputValue("rptPatchMGTReviewedDateIn", data.data.reviewed_date);
        element.inputValue("rptPatchMGTApprovedDateIn", data.data.approved_date);
        element.inputValue("rptPatchMGTRemarkIn", data.data.remark);
        scrollToTop();
    }
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function RptPatchMGTFnInsertNewPatchCallback(data) {
    if (data.status === "1") {
        rptPatchDataForInsert = '';
        goAlert.alertInfo("Patch insert success", data.message);
        RptPatchMGTFnGetDataListing();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
let dataPatchListing = '';
function RptPatchMGTFnGetDataListingCallback(data) {
    if (data.status === "1") {
        if (dataTicketFromHD === '') { fnGetTicketFromHDSys(); }
        dataPatchListing = data;
        datePicker.DateRange("rpt_patch_date_filter");
        if (dataPatchListing != '') {
            RptPatchManagementFilterByDate(data.data);
        }
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function RptPatchFnParseToDate1(dateString) {
    const parts = dateString.split("-");
    const day = parseInt(parts[0], 10);
    const monthAbbreviation = parts[1];
    const year = parseInt(parts[2], 10);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames.findIndex(name => name.startsWith(monthAbbreviation)) + 1;
    return new Date(year, month - 1, day);
}
function RptPatchFnParseDate(dateString) {
    const parts = dateString.split("-");
    let day = parseInt(parts[0], 10);
    let month, year;
    if (parts.length === 3) {
        month = parts[1];
        year = parseInt(parts[2], 10);
    } else if (parts.length === 2) {
        day = 1;
        month = parts[0];
        year = parseInt(parts[1], 10);
    } else {
        throw new Error("Invalid date format.");
    }
    const formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
}
function RptPatchFnFilterDataByDateRange(dataArray, fromDate, toDate) {
    const parsedFromDate = RptPatchFnParseDate(fromDate);
    const parsedToDate = RptPatchFnParseDate(toDate);
    return dataArray.filter(obj => {
        const date = RptPatchFnParseToDate1(RptPatchFnParseDate(obj.requestDate));
        return (
            date >= RptPatchFnParseToDate1(parsedFromDate) &&
            date <= RptPatchFnParseToDate1(parsedToDate)
        );
    });
}
function RptPatchFilterByDateChange() {
    RptPatchManagementFilterByDate(dataPatchListing.data);
}
let dataFilter = '';
function RptPatchManagementFilterByDate(data) {
    let valRange = $("#rpt_patch_date_filter").val();
    let fromDate = subString.FromDateDateRange(valRange);
    let toDate = subString.ToDateDateRange(valRange);
    dataFilter = RptPatchFnFilterDataByDateRange(data, fromDate, toDate);
    let columns = [
        {
            'data': 'patch_mid',
            'render': function (patch_mid) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + patch_mid + "' />"
            },
            'sortable': false
        },
        { 'data': 'patch_mid' },
        { 'data': 'requestDate' },
        { 'data': 'requester' },
        { 'data': 'host_name' },
        { 'data': 'system_type' },
        { 'data': 'curr_version' },
        { 'data': 'upgrade_version' },
        { 'data': 'patch_type' },
        { 'data': 'patch_component' },
        { 'data': 'descriptions' },
        { 'data': 'status' },
        { 'data': 'uat' },
        { 'data': 'impact' },
        { 'data': 'objective' },
        { 'data': 'doc_id' },
        { 'data': 'applied_by' },
        { 'data': 'applied_date' },
        { 'data': 'reviewed_by' },
        { 'data': 'reviewed_date' },
        { 'data': 'approved_by' },
        { 'data': 'approved_date' },
        { 'data': 'sr_id' },
        { 'data': 'site' },
        { 'data': 'criticality' },
        { 'data': 'remark' },
        { 'data': '', 'render': function () { return "" } }
    ];
    dataTable.ApplyJson("rpt_ptm_get_data_table", columns, dataFilter);
}

function RptPatchMGTDeleteExitingPatchHandle() {
    let report_id_obj = table.GetValueSelected("rpt_ptm_get_data_table");
    if (report_id_obj.length === 0) {
        goAlert.alertError("Processing Failed", "No Record ID Selected");
        return false;
    }
    if (report_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    let report_ids = stringCreate.FromObject(report_id_obj);
    if (modals.ConfirmShowAgain("rpt_ptm_get_data_table_alrt") === true) {
        modals.Confirm("Delete Service Listing Confirm", "Are you sure to delete report id " + report_ids + " ?", "N", "Yes", "onclick", "RptPatchMGTDeleteExitingPatch('" + report_ids + "')", "rpt_ptm_get_data_table_alrt");
    } else {
        RptPatchMGTDeleteExitingPatch(report_ids);
    }
}
function RptPatchMGTFnDeletePatchCallback(data) {
    if (data.status === "1") {
        goAlert.alertInfo("Delete Server Process", data.message);
        RptPatchMGTFnGetDataListing();
    } else {
        goAlert.alertError("Delete Server Process", data.message);
    }
}
function RptPatchMGTFnUpdatePatchCallback(data) {
    if (data.status === "1") {
        rptPatchDataForUpdate = '';
        goAlert.alertInfo("Record update success", data.message);
        RptPatchMGTFnGetDataListing();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}