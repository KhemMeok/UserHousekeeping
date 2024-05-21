/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

function rpt_iau_fn_clear_all_by_tab_iau(tab) {
  switch (tab) {
    case "BI":
      {
        $("#bi_date_report_ele_id").val("");
        const statusCountBIInactiveEle = [
          "td_ms_pull_last_login_bi_housekeeping",
          "td_update_user_email_bi_housekeeping",
          "td_update_user_status_bi_housekeeping",
          "td_get_bi_iau",
          "td_bi_user_close_bi_housekeeping",
          "td_insert_bi_user_close_bi_housekeeping",
          "td_get_bi_user_deletion_bi_housekeeping",
        ];
        const iconStatusShowEle = [
          "icon_status_update_user_status_bi_housekeeping",
          "icon_status_update_user_email_bi_housekeeping",
          "icon_status_pull_last_login_bi_housekeeping",
          "icon_status_get_bi_iau",
          "icon_status_get_bi_user_close_bi_housekeeping",
          "icon_status_insert_bi_user_close_bi_housekeeping",
          "icon_status_get_bi_deletion_bi_housekeeping",
        ];
        statusCountBIInactiveEle.forEach((elementId) => {
          document.getElementById(elementId).textContent = "";
        });
        iconStatusShowEle.forEach((elementId) => {
          document.getElementById(elementId).removeAttribute("class");
        });
        rpt_iau_fn_apply_data_to_table_bi_user_inactive([]);
      }
      break;
    case "DB":
      {
        $("#rpt_bi_hkp_bi_deletion_date_in").val("");
        const statusCountDbEleIds = [
          "td_user_remove_db_housekeeping",
          "td_total_user_db_housekeeping",
          "td_user_inform_db_housekeeping",
        ];
        const iconStatusShowEle = [
          "icon_status_user_inform_db_housekeeping",
          "icon_status_user_remove_db_housekeeping",
          "icon_status_total_user_db_housekeeping",
        ];
        statusCountDbEleIds.forEach((elementId) => {
          document.getElementById(elementId).textContent = "";
        });
        iconStatusShowEle.forEach((elementId) => {
          document.getElementById(elementId).removeAttribute("class");
        });
        rpt_iau_fn_apply_data_to_table_user_deletion([]);
      }
      break;
  }
}
function rpt_iau_fn_bi_update_status_tab_select () {
    // set active listing tab
    $( '.nav-tabs a[href="#rpt_bi_update_status_listing_tab"]' ).tab( "show" );
    // set attributes btn and date report
    $( "#RptBIHkpRefreshBTN" ).attr(
        "onclick",
        "iau_fn_get_listing_bi_user_update_status()"
    );
    $( "#rang_date_id_iau" ).attr(
        "onchange",
        "iau_fn_get_listing_bi_user_update_status()"
    );
    // hide ele btn
    var hideElementIds = [
        "RptBIHkpOperationBTN",
        "RptBIHkpGenRptBIDlBtn",
        "RptBIHkpGenDBHkpBtn",
        "RptDBHkpAuthBTN",
        "RptDBHkpReqAuthBTN",
        "RptDBHkpRejectBTN",
        "RptDBHkpSentMailInformBTN",
        "RptBIHkpReqAuthBTN",
        "RptBIHkpSentMailInformBTN",
        "RptBIHkpSentMailInformBTN",
        "RptBIHkpGenRptBIDlBtn",
    ];
    rpt_iau_fn_toggle_element_show_hide( hideElementIds, "hide" );
    // refresh listing
    setTimeout( () => {
        iau_fn_get_listing_bi_user_update_status();
    }, 500 );
}
function iau_fn_bi_iau_tab_select () {
    // set active listing tab
    $( '.nav-tabs a[href="#rpt_bi_inactive_listing_tab"]' ).tab( "show" );
    // set attributes tbn and date report change
    $( "#RptBIHkpRefreshBTN" ).attr(
        "onclick",
        "rpt_iau_fn_refresh_listing('getReportListing')"
    );
    $( "#rang_date_id_iau" ).attr(
        "onchange",
        "rpt_iau_fn_refresh_listing('getReportListing')"
    );
}
function iau_fn_bi_user_deletion_tab_select() {
  // set active listing tab
  $('.nav-tabs a[href="#rpt_bi_deletion_listing_tab"]').tab("show");
  // hide btn
  var hideElementIds = [
    "RptBIHkpOperationBTN",
    "RptBIHkpGenRptBIDlBtn",
    "RptBIHkpGenDBHkpBtn",
    "RptDBHkpAuthBTN",
    "RptDBHkpReqAuthBTN",
    "RptDBHkpRejectBTN",
    "RptDBHkpSentMailInformBTN",
    "RptBIHkpReqAuthBTN",
    "RptBIHkpSentMailInformBTN",
    "RptBIHkpGenRptBIDlBtn",
  ];
  rpt_iau_fn_toggle_element_show_hide(hideElementIds, "hide");
  // set attribute btn and date report
  $("#RptBIHkpRefreshBTN").attr(
    "onclick",
    "iau_fn_get_bi_deletion_listing()"
  );
  $("#rang_date_id_iau").attr(
    "onchange",
    "iau_fn_get_bi_deletion_listing()"
  );
  // refresh data by date
  setTimeout(() => {
    iau_fn_get_bi_deletion_listing();
  }, 500);
}
function iau_fn_bi_tab_select () {
    // set active tab
    tabProcess = "1"; // show active listing tab
    $( '.nav-tabs a[href="#rpt_bi_inactive_listing_tab"]' ).tab( "show" ); // change btn value
    setTimeout( function () {
        $( '.nav-tabs a[href="#rpt_bi_inactive_listing_tab"]' ).css(
            "background-color",
            ""
        );
    }, 1000 );
    // set attributes btn and onchange date report
    $( "#RptBIHkpRefreshBTN" ).attr(
        "onclick",
        "iau_fn_refresh_listing_bi_housekeeping()"
    );
    $( "#rang_date_id_iau" ).attr(
        "onchange",
        "iau_fn_refresh_listing_bi_housekeeping()"
    );

    // change listing btn
    var showElementIds = [
        "RptBIHkpReqAuthBTN",
        "RptBIHkpOperationBTN",
        "RptBIHkpSentMailInformBTN",
        "RptBIHkpGenRptBIDlBtn",
        "RptBIHkpGenRptBIHkpBtn",
    ];
    var hideElementIds = [
        "RptBIHkpGenDBHkpBtn",
        "RptDBHkpAuthBTN",
        "RptDBHkpReqAuthBTN",
        "RptDBHkpRejectBTN",
        "RptDBHkpSentMailInformBTN",
        "RptDBHkpOperationBTN",
    ];
    rpt_iau_fn_toggle_element_show_hide( showElementIds, "show" );
    rpt_iau_fn_toggle_element_show_hide( hideElementIds, "hide" );
    fnGetProcessStepUserHousekeeping( "1" );

    dataTable.Recal();
    setTimeout(
        rpt_iau_fn_apply_data_to_table_bi_user_inactive(
            [],
            "rpt_bi_inactive_listing"
        ),
        500
    );
    setTimeout( rpt_iau_fn_get_ito_user(), 2000 );
}
function rpt_iau_fn_db_tab_select() {
  // set active tab
  tabProcess = "2002";

  // change btn attribute
  $("#RptBIHkpRefreshBTN").attr(
    "onclick",
    "rpt_iau_fn_refresh_listing('db_housekeeping','')"
  );

  $('.nav-tabs a[href="#rpt_db_user_hkp_listing_tab"]').tab("show");

  var hideElementIds = [
    "RptBIHkpReqAuthBTN",
    "RptBIHkpGenRptBIDlBtn",
    "RptBIHkpSentMailInformBTN",
    "RptBIHkpOperationBTN",
  ]; // element IDs to hide
  var showElementIds = [
    "RptBIHkpGenDBHkpBtn",
    "RptDBHkpAuthBTN",
    "RptDBHkpReqAuthBTN",
    "RptDBHkpRejectBTN",
    "RptDBHkpSentMailInformBTN",
    "RptDBHkpOperationBTN",
  ];
  rpt_iau_fn_toggle_element_show_hide(showElementIds, "show");
  rpt_iau_fn_toggle_element_show_hide(hideElementIds, "hide");
  dataTable.Recal();
  fnGetProcessStepUserHousekeeping("2002");
}
function iau_fn_db_listing_tab_select() {
  // set active tab
  tabProcess == "2002";
  // set show and hide btn
  var hideElementIds = [
    "RptBIHkpReqAuthBTN",
    "RptBIHkpGenRptBIDlBtn",
    "RptBIHkpSentMailInformBTN",
  ];
  // element IDs to hide
  var showElementIds = [
    "RptBIHkpGenDBHkpBtn",
    "RptDBHkpAuthBTN",
    "RptDBHkpReqAuthBTN",
    "RptDBHkpRejectBTN",
    "RptDBHkpSentMailInformBTN",
  ];
  rpt_iau_fn_toggle_element_show_hide(showElementIds, "show");
  rpt_iau_fn_toggle_element_show_hide(hideElementIds, "hide");
  dataTable.Recal();
}
function iau_fn_bi_listing_tab_select() {
  var showElementIds = [
    "RptBIHkpReqAuthBTN",
    "RptBIHkpOperationBTN",
    "RptBIHkpSentMailInformBTN",
    "RptBIHkpGenRptBIDlBtn",
  ];
  var hideElementIds = [
    "RptBIHkpGenDBHkpBtn",
    "RptDBHkpAuthBTN",
    "RptDBHkpReqAuthBTN",
    "RptDBHkpRejectBTN",
    "RptDBHkpSentMailInformBTN",
    "RptDBHkpOperationBTN",
  ];
  rpt_iau_fn_toggle_element_show_hide(showElementIds, "show");
  rpt_iau_fn_toggle_element_show_hide(hideElementIds, "hide");
  // change  attribute btn refresh
  $("#RptBIHkpRefreshBTN").attr(
    "onclick",
    "rpt_iau_fn_refresh_listing_bi_housekeeping()"
  );
  $("#rang_date_id_iau").attr(
    "onchange",
    "rpt_iau_fn_refresh_listing_bi_housekeeping()"
  );
  setTimeout(() => {
    rpt_iau_fn_refresh_listing_bi_housekeeping();
  }, 500);
  console.log("clicked");
}
function iau_fn_bi_approve_tab_sl() {
  rpt_iau_fn_get_process_step_bi_housekeeping();
}
let statusCallFun = false;
function fn_tab_change_iau(btn_attr) {
  if (statusCallFun === false) {
    switch (btn_attr) {
      case "bi_tab":
        {
          iau_fn_bi_tab_select();
        }
        break;
      case "bi_update_status_tab":
        {
          rpt_iau_fn_bi_update_status_tab_select();
        }
        break;
      case "bi_hkp_listing_tab":
        {
          iau_fn_bi_listing_tab_select();
        }
        break;
      case "bi_deletion_tab":
        {
          iau_fn_bi_user_deletion_tab_select();
        }
        break;
      case "db_tab":
        {
          rpt_iau_fn_db_tab_select();
        }
        break;
      case "db_listing_tab":
        {
          iau_fn_db_listing_tab_select();
        }
        break;
      case "bi_approve_tab":
        {
          iau_fn_bi_approve_tab_sl();
        }
        break;
      case "db_approve_tab":
        {
          iau_fn_db_listing_tab_select();
        }
        break;
    }
    statusCallFun = true;
    setTimeout(() => {
      statusCallFun = false;
    }, 1100);
  }
}
var isInsertUserClose = false;
var statusInsertUserClose = false;
var statusOtherProcess = false;
function rpt_iau_fn_insert_process_step(
  stepId,
  valStep,
  processDate,
  valText,
  processData,
  callback
) {
  let data = {
    stepId: stepId,
    valStep: valStep,
    processDate: processDate,
    valText: valText,
    processData: processData,
  };
  console.log(data);
  const values = Object.values(data);
  const statusCheck = values.every((value) => value);
  if (statusCheck) {
    CallAPI.Go(vBIHkpInsertProcessStep, data, callback, "");
  } else {
    console.log("Data: ", data);
    goAlert.alertError("Error Data", "All data is null pls check :)");
  }
}
function RptBIHkpFnInsertProcessStepCallback(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Insert Process", data.message);
    if (isInsertUserClose) {
      statusInsertUserClose = true;
    }
    fnGetProcessStepUserHousekeeping();
  } else {
    goAlert.alertError("Error Insert Process", data.message);
  }
}
function iau_fn_get_bi_inactive_listing () {
    let date = $( "#bi_date_report_ele_id" ).val();
    CallAPI.Go();
}
