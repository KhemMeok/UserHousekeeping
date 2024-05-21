/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function fnEoCMtrParamConfigCallBack(data) {
    if (data.status == "1") {
        element.inputValue("eoc_monitor_today_date", data.data.today_date);
        element.inputValue("eoc_monitor_nextworking_date", data.data.nextworking_day_date);
        element.inputValue("eoc_monitor_next_nextworking_date", data.data.next_nextworking_day_date);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetEoDSummaryCallBack(data) {
    if (data.status == "1") {
        element.inputValue("sp_eoc_mo_total_branches", data.data.total_branches);
        element.inputValue("sp_eoc_mo_total_fin_eoc_stage", data.data.total_finished_eod);
        element.inputValue("sp_eoc_mo_total_eodm", data.data.total_finished_eodm);
        element.inputValue("sp_eoc_mo_total_not_eodm", data.data.total_not_finished_eodm);
        element.inputValue("sp_eoc_mo_failed_eodm", data.data.total_failed_eodm);
        element.inputValue("sp_eoc_mo_mismatch_gl_bal", data.data.mismatch_gl_bal);
        element.inputValue("sp_eoc_mo_daily_gl_pulled", data.data.total_pulled_gl_bal);
        element.inputValue("sp_eoc_mo_real_debug", data.data.real_debug_enabled);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetRunAbleCallBack(data) {
    if (data.status == "1") {

        var columns = [
            { 'data': 'group_code' },
            { 'data': 'branch_code' },
            { 'data': '', 'render': function () {return ""}}
        ];
        dataTable.ApplyJsonV2("eoc_mo_tbl_runable_br", columns, data.data);
        //dataTable.ApplyJsonDataScroll("eoc_mo_tbl_runable_br", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetFinEoDMBrCallBack(data) {
    if (data.status == "1") {
        var columns = [
            { 'data': 'group_code' },
            { 'data': 'branch_code' },
            { 'data': 'current_posting_date' },
            { 'data': 'next_posting_date' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJsonV2("eoc_mo_tbl_fin_eodm_br", columns, data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetNotFinEoDMBrCallBack(data) {
    if (data.status == "1") {
        var columns = [
            { 'data': 'group_code' },
            { 'data': 'branch_code' },
            { 'data': 'current_posting_date' },
            { 'data': 'next_posting_date' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJsonV2("eoc_mo_tbl_not_fin_eodm_br", columns, data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetFailedEoDMBrCallBack(data) {
    if (data.status == "1") {
        var columns = [
            { 'data': 'group_code' },
            { 'data': 'branch_code' },
            { 'data': 'current_posting_date' },
            { 'data': 'next_posting_date' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJsonV2("eoc_mo_tbl_failed_eodm_br", columns, data.data);
        
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetFinEoDBrCallBack(data) {
    if (data.status == "1") {

        var columns = [
            { 'data': 'group_code' },
            { 'data': 'eoc_status' },
            { 'data': 'branch_code' },
            { 'data': 'eod_date' },
            { 'data': 'branch_date' },
            { 'data': 'target_stage' },
            { 'data': 'running_stage' },
            { 'data': 'current_stage' },
            { 'data': 'eoc_ref_no' },
            { 'data': 'error_code' },
            { 'data': 'error_param' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJsonV2("eoc_mo_tbl_fin_EoD_br", columns, data.data);

        //dataTable.ApplyJsonDataScroll("eoc_mo_tbl_fin_EoD_br", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetSubmittedBrCallBack(data) {
    if (data.status == "1") {

        element.inputValue("sp_eoc_mo_running_stage", (data.data.running_stage == "null") ? "" : data.data.running_stage);
        var columns = [
            { 'data': 'group_code' },
            { 'data': 'eoc_status' },
            { 'data': 'branch_code' },
            { 'data': 'eod_date' },
            { 'data': 'branch_date' },
            { 'data': 'target_stage' },
            { 'data': 'running_stage' },
            { 'data': 'current_stage' },
            { 'data': 'eoc_ref_no' },
            { 'data': 'error_code' },
            { 'data': 'error_param' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJsonV2("eoc_mo_tbl_running_br", columns, data.data.running_branch);
        dataTable.ApplyJsonV2("eoc_mo_tbl_queue_br", columns, data.data.queue_branch);
        dataTable.ApplyJsonV2("eoc_mo_tbl_aborted_br", columns, data.data.aborted_branch);
      
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrCBSTBSCallBack(data) {
    if (data.status == "1") {

        var columns = [
            {
                'data': 'tablespace_name', 'render': function (tablespace_name) {
                    return "<input type='checkbox' style='transform: scale(1); margin-top:5px; margin-left:40%;' value='" + tablespace_name + "' />"
                },
                'sortable':false
            },
            { 'data': 'tablespace_name' },
            { 'data': 'size' },
            { 'data': 'used' },
            { 'data': 'free' },
            {
                'data': 'used_pct', 'render': function (user_pct) {
                    var bg_color = "";
                    let pct = Number(user_pct);
                    if (pct >= 90) {
                        bg_color = "bg-danger";
                    }
                    else {
                        bg_color = "bg-info";
                    }
                    var html = "<div class='progress' data-toggle='tooltip' data-placement='top' title='" + user_pct + " %'>";
                    html = html + "<div class='progress-bar " + bg_color+"' style='width: " + user_pct + "%'>" + user_pct + " %</div>";
                    html = html + "</div>";
                    return html;
                }
            },
            { 'data': 'free_pct' },
            { 'data': 'max_size' },
            {
                'data': 'used_max_pct', 'render': function (used_max_pct) {
                    var bg_color = "";
                    let pct = Number(used_max_pct);
                    if (pct >= 90) {
                        bg_color = "bg-danger";
                    }
                    else {
                        bg_color = "bg-info";
                    }
                    var html = "<div class='progress' data-toggle='tooltip' data-placement='top' title='" + used_max_pct + " %'>";
                    html = html + "<div class='progress-bar " + bg_color + "' style='width: " + used_max_pct + "%'>" + used_max_pct + " %</div>";
                    html = html + "</div>";
                    return html;
                }
            },
            { 'data': '', 'render': function () { return "" } }
        ];
        
        if (isCkCBSTBS == 0) {
            modals.OpenStatic("modal_tablespace");
            dataTable.ApplyJson("eoc_mo_tbl_cbs_tbs", columns, data.data);
			isCkCBSTBS=1;
        }
        else {
            dataTable.ApplyJson("eoc_mo_tbl_cbs_tbs", columns, data.data);
        }
        
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrCBSDBSCallBack(data) {
    if (data.status == "1") {

        var columns = [
            { 'data': 'tablespace_name' },
            { 'data': 'file_id' },
            { 'data': 'size' },
            { 'data': 'free' },
            {
                'data': 'used_size_pct', 'render': function (used_size_pct) {
                    var bg_color = "";
                    let pct = Number(used_size_pct);
                    if (pct >= 90) {
                        bg_color = "bg-danger";
                    }
                    else {
                        bg_color = "bg-info";
                    }
                    var html = "<div class='progress' data-toggle='tooltip' data-placement='top' title='" + used_size_pct + " %'>";
                    html = html + "<div class='progress-bar " + bg_color + "' style='width: " + used_size_pct + "%'>" + used_size_pct + " %</div>";
                    html = html + "</div>";
                    return html;
                }
            },
            { 'data': 'max_size' },
            {
                'data': 'used_max_pct', 'render': function (used_max_pct) {
                    var bg_color = "";
                    let pct = Number(used_max_pct);
                    if (pct >= 90) {
                        bg_color = "bg-danger";
                    }
                    else {
                        bg_color = "bg-info";
                    }
                    var html = "<div class='progress' data-toggle='tooltip' data-placement='top' title='" + used_max_pct + " %'>";
                    html = html + "<div class='progress-bar " + bg_color + "' style='width: " + used_max_pct + "%'>" + used_max_pct + " %</div>";
                    html = html + "</div>";
                    return html;
                }
            },
            { 'data': 'auto_extended' },
            { 'data': 'status' },
            {
                'data': 'file_name'
            },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJson("eoc_mo_tbl_cbs_dbs", columns, data.data);

    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrCBSDBSizeCallBack(data) {
    if (data.status == "1") {
        let total_size = Number(data.data.total_size_gb);
        let used_size = Number(data.data.used_size_gb);
        let free_size = total_size - used_size;
        let useed_pct = Math.round((used_size * 100) / total_size);
        let free_pct = Math.round((free_size * 100) / total_size);

        element.inputValue("pr_eoc_mtr_used_pct", "Used: "+useed_pct + "%");
        element.inputValue("pr_eoc_mtr_free_pct", "Free: " +free_pct + "%");

        $("#pr_eoc_mtr_used_pct").css("width", useed_pct + "%");
        $("#pr_eoc_mtr_free_pct").css("width", free_pct + "%");

        var chart = new CanvasJS.Chart("chartCBSSize", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Current CBS Database Size"
            },
            
            data: [{
                type: "column",
                showInLegend: false,
                yValueFormatString: "#,### GB",
                indexLabel: "{y}",
                legendMarkerColor: "grey",
                dataPoints: [
                    { y: total_size, label: "Total Size" },
                    { y: used_size, label: "Used Size" },
                    { y: free_size, label: "Free Size" }
                ]
            }]
        });
        

        if (isCkCBSDBSize == 0) {
            modals.OpenStatic("modal_cbs_curr_size");
            isCkCBSDBSize = 1;
            chart.render();

        }
        else {
            chart.render();
        }
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnEoCMtrGetContactCallBack(data) {
    if (isCkContact == 0) {
        modals.OpenStatic("modal_contact");
        isCkContact = 1;
    }
    
    if (data.status == 1) {
        goAlert.alertInfo("Processing Success", data.message);
        var columns = [
            { 'data': 'branch_code' },
            { 'data': 'staff_id' },
            { 'data': 'name' },
            { 'data': 'position' },
            { 'data': 'telephone','searchable': false  },
            { 'data': '', 'render': function () { return "" }}
        ];
        dataTable.ApplyJsonScroll("eoc_mo_tbl_contact_tbs", columns, data.data);
        dataTable.Recal();
        //dataTable.ApplyJsonData("eoc_mo_tbl_contact_tbs", data.data);
        //$("#eoc_mo_tbl_contact_tbs").DataTable({
        //    destroy: true,
        //    paging: false,
        //    columnDefs: [{
        //        "searchable": false,
        //        "targets": 5
        //    }]
        //})

        
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
   
}

function fnEoCMtrGetPendingCallBack(data) {
    if (isCkPending == 0) {
        modals.OpenStatic("modal_pending");
        isCkPending = 1;
    }
    if (data.status == 1) {
        goAlert.alertInfo("Processing Success", data.message);

        var columns = [
            { 'data': 'no' },
            { 'data': 'pending_type' },
            { 'data': 'branch_code' },
            { 'data': 'mudule' },
            { 'data': 'reference_number' },
            { 'data': 'even' },
            { 'data': 'marker_id' },
            {
                'data': 'till_id','searchable':false },
            { 'data': 'function_id' },
            { 'data': 'key_id' },
            { 'data': 'table_name' },
            { 'data': 'record_stat' },
            { 'data': 'auth_stat' },
            { 'data': 'username' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJsonScroll("eoc_mo_tbl_pending_tbs", columns, data.data);
        dataTable.Recal();
       // dataTable.ApplyJsonData("eoc_mo_tbl_pending_tbs", data.data);

        //$("#eoc_mo_tbl_pending_tbs").dataTable({
        //    destroy: true,
        //    paging: false,
        //    columnDefs: [{
        //        "searchable": false,
        //        "targets": 7
        //    }]
        //})
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
    
}
function fnEoCMtrGetMissmatchBalanceCallBack(data) {
    if (isCkMissmatch == 0) {
        modals.OpenStatic("modal_missmatch");
        isCkMissmatch = 1;
    }
    if (data.status == 1) {
        goAlert.alertInfo("Processing Success", data.message);
        var columns = [
            { 'data': 'no' },
            { 'data': 'branch_code' },
            { 'data': 'marker_id' },
            { 'data': 'mudule' },
            { 'data': 'real_dr' },
            { 'data': 'real_cr' },
            { 'data': 'dr_minus_cr' },
            { 'data': 'cont_dr' },
            { 'data': 'cont_cr' },
            { 'data': 'memo_dr' },
            { 'data': 'memo_cr' },
            { 'data': 'posn_dr' },
            { 'data': 'posn_cr' },
            { 'data': 'financial_cycle' },
            { 'data': 'period_code' },
            { 'data': '', 'render': function () { return "" } }
        ];
        dataTable.ApplyJsonScroll("eoc_mo_tbl_MissmatchBalanc_tbs", columns, data.data);
        dataTable.Recal();
        //dataTable.ApplyJsonData("eoc_mo_tbl_MissmatchBalanc_tbs", data.data);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }

}