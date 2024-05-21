//$(document).ready(function () {


//    GET_TAB_PATCH_MGT();
//});
//GET TABS
function GET_TAB_PATCH_MGT() {
//    $.ajax({
//        type: "POST",
//        url: "PAGES/PATCH_MGT.vbhtml",
//        success: function (content) {
//            $("#MAIT_CONTENT_TABS").append(content);
            APPLY_DATE_PICKER("pa_request_date","NO");
            APPLY_DATE_PICKER("pa_applied_date", "NO");
            APPLY_DATE_PICKER("pa_reviewed_date", "NO");
            APPLY_DATE_PICKER("pa_approved_date", "NO");
            INVISIBLE_BTN("btn_pa_update");
            INVISIBLE_BTN("btn_pa_no_update");
            INVISIBLE_BTN("pa_host_update_mgt");
            INVISIBLE_BTN("pa_host_up_cancel_mgt");
            GET_ALL_PA_USERS("pa_requester");
            GET_ALL_PA_USERS("pa_applied_by");
            GET_ALL_PA_USERS("pa_reviewed_by");
            GET_ALL_PA_USERS("pa_approved_by");
            GET_GENERAL_PATCH_TYPE("pa_patch_type");
            GET_GENERAL_PATCH_TYPE("pa_host_type_mgt");
            SELECT_PA_ALL_PATCH();

//        }
//    });
}
//END GET TABS
//Date Make up

//function APPLY_DATE_PICKER(ID) {
//    $('#' + ID).datepicker({
//        format: "dd-M-yyyy",
//        autoclose: true,
//        todayHighlight: true,
//        toggleActive: true,
//        readonly: true
//    });
//}
//END DATE MAKE UP
//invisable Button
function INVISIBLE_BTN(BTN_ID) {
    $("#" + BTN_ID).hide();
}
//visable button
function VISIBLE_BTN(BTN_ID) {
    $("#" + BTN_ID).show();
}
//FUNCTION GET DATA
function GET_GENERAL_PATCH_TYPE(CONTENT_ID) {
    $("#" + CONTENT_ID).html("");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/PA_MGT_GENERAL_PATCH_TYPE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (content) {
            $("#" + CONTENT_ID).html(content.d);
        }
    });
}
//FUNCTION GET USER
function GET_ALL_PA_USERS(CONTENT_ID) {
    $("#" + CONTENT_ID).html("");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/PA_MGT_GET_ALL_USERS",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (content) {
            $("#" + CONTENT_ID).html(content.d);
        }
    });
}
//END FUNCTION GET DATA
//FUNCTION INSERT DATA
// INSERT_PA_HOST
function INSERT_PA_HOST() {
    var HOSTNAME = $("#pa_host_name_mgt").val();
    var PATCH_TYPE = $("#pa_host_type_mgt").val();
    if (HOSTNAME == "") {
        $("#GET_INSERT_PA_HOST_RESULT").text("Fied Host/Storage/Database Name");
    }
    else if (PATCH_TYPE == "NULL") {
        $("#GET_INSERT_PA_HOST_RESULT").text("Choose Type");
    }
    else {
        $.ajax({
            type: "POST",
            url: "ACTIONS/PATCH_MGT.aspx/PA_INSERT_HOST",
            contentType: "application/json; charset=utf-8",
            data: '{V_HOSTNAME:"' + HOSTNAME + '", V_PATCH_TYPE:"' + PATCH_TYPE + '"}',
            dataType: "json",
            success: function (content) {
                $("#GET_INSERT_PA_HOST_RESULT").text(content.d);
                SELECT_PA_ALL_HOST();
            }
        });
    }

}
//END FUNCTION INSERT DATA
// FUNCTION SELECT DATA
function GET_ALL_PA_HOSTS() {

    setTimeout(SELECT_PA_ALL_HOST, 1000);
}
function GET_ALL_PA_PATCHES() {
    setTimeout(SELECT_PA_ALL_PATCH, 1000);
}
function SELECT_PA_ALL_HOST() {
    $("#TBL_GET_ALL_HOSTS").html("");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/PA_SELECT_ALL_HOST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var result = data.d;
            APPLY_DATATABASE("TBL_GET_ALL_HOSTS", result);

        }
    });
}
function SELECT_PA_ALL_PATCH() {
    $("#TBL_GET_ALL_PATCH").html("");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/PA_SELECT_ALL_PATCH",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var result = data.d;
            APPLY_DATATABASE("TBL_GET_ALL_PATCH", result);

        }
    });
}
//function apply datatabase
function APPLY_DATATABASE(TBL_ID, DATA) {
    $("#" + TBL_ID).html(DATA);
    $("#" + TBL_ID).dataTable({
        destroy: true, //for calling to other db we must destroy first
        //data: result,
        //"iDisplayLength": 25,
        "scrollX": true

    });
}
//DELETE PA_HOSTS
function DELETE_PA_HOST(value) {
    $("#md_con_delete_pa_host").modal("toggle");
    $("#BTN_CON_DELETE_PA_HOST").val(value);
}
function CONFIRM_DELETE_PA_HOST(value) {
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/DELETE_PA_HOST",
        data: '{V_HOST_ID:"' + value + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var result = data.d;
            APPLY_DATATABASE("TBL_GET_ALL_HOSTS", result);

        }
    });
}
//UPDATE HOST
function GET_UPDATE_HOST(value) {
    INVISIBLE_BTN("pa_host_save_mgt");
    VISIBLE_BTN("pa_host_update_mgt");
    VISIBLE_BTN("pa_host_up_cancel_mgt");
    $("#pa_host_update_mgt").val(value);
    $("#pa_host_name_mgt").html("");
    $("#pa_host_type_mgt").html("");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.asmx/PA_GET_UPDATE_HOST",
        data: { V_HOST_ID: value },
        dataType: "xml",
        success: function (data) {
            var jqueryXml = $(data);
            $("#pa_host_name_mgt").val(jqueryXml.find("V_HOSTNAME").text());
            $("#pa_host_type_mgt").html(jqueryXml.find("V_PATCH_TYPE").text());
        }
    });
}
function UPDATE_HOST(value) {
    var HOSTNAME = $("#pa_host_name_mgt").val();
    var PATCH_TYPE = $("#pa_host_type_mgt").val();
    if (HOSTNAME == "") {
        $("#GET_INSERT_PA_HOST_RESULT").text("Fied Host/Storage/Database Name");
    }
    else {
        $.ajax({
            type: "POST",
            url: "ACTIONS/PATCH_MGT.aspx/UPDATE_PA_HOST",
            data: '{V_HOST_ID:"' + value + '",V_HOSTNAME:"' + HOSTNAME + '",V_PATCH_TYPE:"' + PATCH_TYPE + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var result = data.d;
                APPLY_DATATABASE("TBL_GET_ALL_HOSTS", result);
                CANCAL_UPDATE_HOST();

            }
        });
    }
}
//Cancel UPDATE HOST
function CANCAL_UPDATE_HOST() {

    VISIBLE_BTN("pa_host_save_mgt");
    INVISIBLE_BTN("pa_host_update_mgt");
    INVISIBLE_BTN("pa_host_up_cancel_mgt");
    $("#pa_host_name_mgt").val("");
    GET_GENERAL_PATCH_TYPE("pa_host_type_mgt");
}

//SELECT HOST AS OPTION
function GET_HOST_OPT(value) {
    $("#pa_host").html("");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/PA_MGT_HOST_OPT",
        data: '{V_PATCH_TYPE:"' + value + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (content) {
            $("#pa_host").html(content.d);
        }
    });
}
//SELECT CURRENT VERSION
function GET_HOST_CURR_VERSION(value) {
    var HOST_ID = $("#pa_host").val();
    $("#pa_cur_version").val("");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/PA_MGT_HOST_CUR_VERSION",
        data: '{V_HOST_ID:"' + HOST_ID + '", V_VERSION_TYPE:"' + value + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (content) {
            $("#pa_cur_version").val(content.d);
        }
    });
}

//Validation
function PATCH_MGT_VALIDATION() {
    var return_stat = 1;
    var p_req_date = $("#pa_request_date").val();
    var p_requester = $("#pa_requester").val();
    var p_patch_type = $("#pa_patch_type").val();
    var p_host = $("#pa_host").val();
    var p_curr_vs = $("#pa_cur_version").val(); //not unknown
    var p_up_vs = $("#pa_up_version").val();
    var p_uat = $("#pa_uat").val();
    var p_priority = $("#pa_priority").val();
    var p_impact = $("#pa_impact").val();
    var p_doc_ID = $("#pa_doc_ID").val();
    var p_SR_ID = $("#pa_sr_ID").val();
    var p_status = $("#pa_status").val();
    var p_applied_by = $("#pa_applied_by").val();
    var p_applied_date = $("#pa_applied_date").val();
    var p_reviewed_by = $("#pa_reviewed_by").val();
    var p_reviewed_date = $("#pa_reviewed_date").val();
    var p_approved_by = $("#pa_approved_by").val();
    var p_approved_date = $("#pa_approved_date").val();
    var p_objective = $("#pa_objective").val();
    var p_description = $("#pa_description").val();
    var p_version_type = $("#pa_version").val();
    if (p_req_date == "") {

        return_stat = 0;
        return false;
    }
    if (p_requester == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_patch_type == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_host == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_curr_vs == "unknown" || p_curr_vs == "") {
        return_stat = 0;
        return false;
    }
    if (p_up_vs == "") {
        return_stat = 0;
        return false;
    }
    if (p_uat == "NULL") {
        return_stat = 0;
        return false;
    }

    if (p_priority == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_impact == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_doc_ID == "") {
        return_stat = 0;
        return false;
    }
    if (p_SR_ID == "") {
        return_stat = 0;
        return false;
    }
    if (p_status == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_applied_by == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_applied_date == "") {
        return_stat = 0;
        return false;
    }
    if (p_reviewed_by == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_reviewed_date == "") {
        return_stat = 0;
        return false;
    }
    if (p_approved_by == "NULL") {
        return_stat = 0;
        return false;
    }
    if (p_approved_date == "") {
        return_stat = 0;
        return false;
    }
    if (p_objective == "") {
        return_stat = 0;
        return false;
    }
    if (p_description == "") {
        return_stat = 0;
        return false;
    }
    if (p_version_type == "NULL") {
        return_stat = 0;
        return false;
    }
    return return_stat;
}
//INSERT PATCH MANAGEMENT
function INSERT_PATCH() {
    var return_stat = 1;
    var p_req_date = $("#pa_request_date").val();
    var p_requester = $("#pa_requester").val();
    var p_patch_type = $("#pa_patch_type").val();
    var p_host = $("#pa_host").val();
    var p_curr_vs = $("#pa_cur_version").val(); //not unknown
    var p_up_vs = $("#pa_up_version").val();
    var p_uat = $("#pa_uat").val();
    var p_priority = $("#pa_priority").val();
    var p_impact = $("#pa_impact").val();
    var p_doc_ID = $("#pa_doc_ID").val();
    var p_SR_ID = $("#pa_sr_ID").val();
    var p_status = $("#pa_status").val();
    var p_applied_by = $("#pa_applied_by").val();
    var p_applied_date = $("#pa_applied_date").val();
    var p_reviewed_by = $("#pa_reviewed_by").val();
    var p_reviewed_date = $("#pa_reviewed_date").val();
    var p_approved_by = $("#pa_approved_by").val();
    var p_approved_date = $("#pa_approved_date").val();
    var p_objective = $("#pa_objective").val();
    var p_description = $("#pa_description").val();
    var p_version_type = $("#pa_version").val();
    var stat = PATCH_MGT_VALIDATION();
    if (stat == 1) {
        var formData = new FormData();
        formData.append("p_req_date", p_req_date);
        formData.append("p_requester", p_requester);
        formData.append("p_patch_type", p_patch_type);
        formData.append("p_host", p_host);
        formData.append("p_curr_vs", p_curr_vs);
        formData.append("p_up_vs", p_up_vs);
        formData.append("p_uat", p_uat);
        formData.append("p_priority", p_priority);
        formData.append("p_impact", p_impact);
        formData.append("p_doc_ID", p_doc_ID);
        formData.append("p_SR_ID", p_SR_ID);
        formData.append("p_status", p_status);
        formData.append("p_applied_by", p_applied_by);
        formData.append("p_applied_date", p_applied_date);
        formData.append("p_reviewed_by", p_reviewed_by);
        formData.append("p_reviewed_date", p_reviewed_date);
        formData.append("p_approved_by", p_approved_by);
        formData.append("p_approved_date", p_approved_date);
        formData.append("p_objective", p_objective);
        formData.append("p_description", p_description);
        formData.append("p_version_type", p_version_type);
        $.ajax({
            url: "ACTIONS/PATCH_MGT_Handler.ashx",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                var result = data;
                $("#GET_INSERT_PATCH_MGT_RESULT").text(result);
                SELECT_PA_ALL_PATCH();
            },
            error: function (erro) {
                alert(erro);
            }
        });
    }
    else {
        $("#GET_INSERT_PATCH_MGT_RESULT").text("Please fill all requirements");
    }

}

function GET_PMGT_FOR_UPDATE(value) {
    INVISIBLE_BTN("btn_pa_save");
    VISIBLE_BTN("btn_pa_update");
    VISIBLE_BTN("btn_pa_no_update");
    $("#btn_pa_update").val(value);
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.asmx/PA_GET_UPDATE_PATCH_MGT",
        data: { V_PMGT_ID: value },
        dataType: "xml",
        success: function (data) {
            var jqueryXml = $(data);
            $("#pa_request_date").val(jqueryXml.find("p_req_date").text());
            $("#pa_requester").val(jqueryXml.find("p_requester").text());
            $("#pa_patch_type").val(jqueryXml.find("p_patch_type").text());
            GET_HOST_OPT($("#pa_patch_type").val());
            setTimeout(function () { $("#pa_host").val(jqueryXml.find("p_host").text()) }, 1000);
            $("#pa_version").val(jqueryXml.find("p_version_type").text());
            $("#pa_cur_version").val(jqueryXml.find("p_curr_vs").text());
            $("#pa_up_version").val(jqueryXml.find("p_up_vs").text());
            $("#pa_uat").val(jqueryXml.find("p_uat").text());
            $("#pa_priority").val(jqueryXml.find("p_priority").text());
            $("#pa_impact").val(jqueryXml.find("p_impact").text());
            $("#pa_doc_ID").val(jqueryXml.find("p_doc_ID").text());
            $("#pa_sr_ID").val(jqueryXml.find("p_SR_ID").text());
            $("#pa_status").val(jqueryXml.find("p_status").text());
            $("#pa_applied_by").val(jqueryXml.find("p_applied_by").text());
            $("#pa_applied_date").val(jqueryXml.find("p_applied_date").text());
            $("#pa_reviewed_by").val(jqueryXml.find("p_reviewed_by").text());
            $("#pa_reviewed_date").val(jqueryXml.find("p_reviewed_date").text());
            $("#pa_approved_by").val(jqueryXml.find("p_approved_by").text());
            $("#pa_approved_date").val(jqueryXml.find("p_approved_date").text());
            $("#pa_objective").val(jqueryXml.find("p_objective").text());
            $("#pa_description").val(jqueryXml.find("p_description").text());
        }
    });
}
function UPDATE_PMGT(value) {
    var p_req_date = $("#pa_request_date").val();
    var p_requester = $("#pa_requester").val();
    var p_patch_type = $("#pa_patch_type").val();
    var p_host = $("#pa_host").val();
    var p_curr_vs = $("#pa_cur_version").val(); //not unknown
    var p_up_vs = $("#pa_up_version").val();
    var p_uat = $("#pa_uat").val();
    var p_priority = $("#pa_priority").val();
    var p_impact = $("#pa_impact").val();
    var p_doc_ID = $("#pa_doc_ID").val();
    var p_SR_ID = $("#pa_sr_ID").val();
    var p_status = $("#pa_status").val();
    var p_applied_by = $("#pa_applied_by").val();
    var p_applied_date = $("#pa_applied_date").val();
    var p_reviewed_by = $("#pa_reviewed_by").val();
    var p_reviewed_date = $("#pa_reviewed_date").val();
    var p_approved_by = $("#pa_approved_by").val();
    var p_approved_date = $("#pa_approved_date").val();
    var p_objective = $("#pa_objective").val();
    var p_description = $("#pa_description").val();
    var p_version_type = $("#pa_version").val();
    var stat = PATCH_MGT_VALIDATION();
    if (stat == 1) {
        var formData = new FormData();
        formData.append("p_req_date", p_req_date);
        formData.append("p_requester", p_requester);
        formData.append("p_patch_type", p_patch_type);
        formData.append("p_host", p_host);
        formData.append("p_curr_vs", p_curr_vs);
        formData.append("p_up_vs", p_up_vs);
        formData.append("p_uat", p_uat);
        formData.append("p_priority", p_priority);
        formData.append("p_impact", p_impact);
        formData.append("p_doc_ID", p_doc_ID);
        formData.append("p_SR_ID", p_SR_ID);
        formData.append("p_status", p_status);
        formData.append("p_applied_by", p_applied_by);
        formData.append("p_applied_date", p_applied_date);
        formData.append("p_reviewed_by", p_reviewed_by);
        formData.append("p_reviewed_date", p_reviewed_date);
        formData.append("p_approved_by", p_approved_by);
        formData.append("p_approved_date", p_approved_date);
        formData.append("p_objective", p_objective);
        formData.append("p_description", p_description);
        formData.append("p_version_type", p_version_type);
        formData.append("PMGT_ID", value);
        $.ajax({
            url: "ACTIONS/PATCH_MGT_UPDATE.ashx",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                var result = data;
                $("#GET_INSERT_PATCH_MGT_RESULT").text(result);
                SELECT_PA_ALL_PATCH();
                CANCEL_PMGT_UPDATE();
            },
            error: function (erro) {
                alert(erro);
            }
        });
    }
    else {
        $("#GET_INSERT_PATCH_MGT_RESULT").text("Please fill all requirements");
    }
}
function DELETE_PATCH(value) {
    $("#md_con_delete_patch").modal("toggle");
    $("#BTN_CON_DELETE_PATCH").val(value);
}
function CONFIRM_DELETE_PATCH(value) {
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.aspx/DELETE_PATCH",
        data: '{V_PATCH_ID:"' + value + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            SELECT_PA_ALL_PATCH();
            $("#md_con_delete_patch").modal("hide");
        }
    });
}
function PATCH_DETAIL(value) {
    $("#patch_detail_md").modal("toggle");
    $.ajax({
        type: "POST",
        url: "ACTIONS/PATCH_MGT.asmx/PA_GET_DETAIL_PATCH_MGT",
        data: { V_PMGT_ID: value },
        dataType: "xml",
        success: function (data) {
            var jqueryXml = $(data);
            $("#de_patch_reqDate").html(jqueryXml.find("p_req_date").text());
            $("#de_patch_reqer").html(jqueryXml.find("p_requester").text());
            $("#de_patch_patch_type").html(jqueryXml.find("p_patch_type").text());
            $("#patch_detail").html(jqueryXml.find("p_host").text());
            $("#de_patch_hostname").html(jqueryXml.find("p_host").text());
            $("#de_patch_version_type").html(jqueryXml.find("p_version_type").text());
            $("#de_patch_pre_version").html(jqueryXml.find("p_curr_vs").text());
            $("#de_patch_cur_version").html(jqueryXml.find("p_up_vs").text());
            $("#de_patch_uat").html(jqueryXml.find("p_uat").text());
            $("#de_patch_priority").html(jqueryXml.find("p_priority").text());
            $("#de_patch_impact").html(jqueryXml.find("p_impact").text());
            $("#de_patch_docID").html(jqueryXml.find("p_doc_ID").text());
            $("#de_patch_SRID").html(jqueryXml.find("p_SR_ID").text());
            $("#de_patch_status").html(jqueryXml.find("p_status").text());
            $("#de_patch_appliedby").html(jqueryXml.find("p_applied_by").text());
            $("#de_patch_applieddate").html(jqueryXml.find("p_applied_date").text());
            $("#de_patch_reviewedby").html(jqueryXml.find("p_reviewed_by").text());
            $("#de_patch_revieweddate").html(jqueryXml.find("p_reviewed_date").text());
            $("#de_patch_approvedby").html(jqueryXml.find("p_approved_by").text());
            $("#de_patch_approveddate").html(jqueryXml.find("p_approved_date").text());
            $("#de_patch_objective").html(jqueryXml.find("p_objective").text());
            $("#pa_objective").html(jqueryXml.find("p_objective").text());
            $("#de_patch_desc").html(jqueryXml.find("p_description").text());
        }
    });
}
function CANCEL_PMGT_UPDATE() {
    $("#pa_request_date").val("");
    //$("#pa_requester").val();
    //$("#pa_patch_type").val();
    $("#pa_host").html("");
    $("#pa_cur_version").val(""); //not unknown
    $("#pa_up_version").val("");
    //$("#pa_uat").val();
    //$("#pa_priority").val();
    //$("#pa_impact").val();
    $("#pa_doc_ID").val("");
    $("#pa_sr_ID").val("");
    //$("#pa_status").val();
    //$("#pa_applied_by").val();
    $("#pa_applied_date").val("");
    //$("#pa_reviewed_by").val();
    $("#pa_reviewed_date").val("");
    //$("#pa_approved_by").val();
    $("#pa_approved_date").val("");
    $("#pa_objective").val("");
    $("#pa_description").val("");
    //$("#pa_version").val();
    INVISIBLE_BTN("btn_pa_update");
    INVISIBLE_BTN("btn_pa_no_update");
    VISIBLE_BTN("btn_pa_save");
}