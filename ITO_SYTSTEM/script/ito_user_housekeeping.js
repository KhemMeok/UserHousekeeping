/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

// global variables
var tabProcess = "1001";

// all message elements id
let msElementIds = [
  "icon_ms_update_user_status_bi_user_housekeeping",
  "icon_ms_update_user_email_bi_user_housekeeping",
  "icon_ms_pull_last_login_user_bi_user_housekeeping",
  "icon_ms_get_bi_user_housekeeping",
  "icon_ms_get_bi_user_close_bi_housekeeping",
  "icon_ms_insert_bi_user_close_bi_user_housekeeping",
  "icon_ms_get_bi_user_deletion_bi_housekeeping",
  "icon_ms_user_inform_db_user_housekeeping",
  "icon_ms_user_remove_db_user_housekeeping",
  "icon_ms_total_user_db_housekeeping",
];
//------------------function helper------------------
function user_housekeeping_fn_get_correct_date_format(dateShort) {
  return "01-" + dateShort;
}

function fnUpdateElementEnableOrDisableUserHousekeeping ( elementId, value ) {
    if ( elementId !== "" && value !== "" ) {
        var element = document.getElementById( elementId );
        if ( element !== null ) {
            element.disabled = value;
        } else {
            console.error( "Element with ID '" + elementId + "' not found." );
        }
    } else {
        console.error( "Invalid element ID or value." );
    }
}


function fnUpdateElementTextUserHousekeeping(elementId, text) {
  document.getElementById(elementId).textContent = text !== "0" ? text : "";
}

function fnUpdateIconClassUserHousekeeping(elementId, status) {
  fnAddIconClassUserHousekeeping(
    elementId,
    fnGetIconByStatusUserHousekeeping(status)
  );
}

function fnUpdateProcessDataUserHousekeeping(obj) {
  let { elementId, valStep, category } = obj;
  if (category.toString().toLowerCase() === "btn") {
    fnUpdateElementEnableOrDisableUserHousekeeping(
      elementId,
      valStep.toString().toLowerCase() === "n" ? true : false
    );
  }
}

function fnSetColorByStatusUserHousekeeping(elementId, status) {
  var element = document.getElementById(elementId);
  if (element && status === "1") {
    element.style.color = "green";
    element.style.display = "";
  } else if (element && status === "-1") {
    element.style.color = "red";
    element.style.display = "";
  } else if (element && status === "0") {
    element.style.display = "none";
  }
}

function fnUpdateStatusUserHousekeeping(
  status,
  countElement,
  messageElement,
  iconElement,
  iconMsEleId
) {
  fnUpdateElementTextUserHousekeeping(countElement, status.count);
  fnUpdateElementTextUserHousekeeping(messageElement, status.message);
  fnUpdateIconClassUserHousekeeping(iconElement, status.status);
  fnSetColorByStatusUserHousekeeping(status.eleId, status.status);
}
//--------------------- call next process-------------------
async function user_housekeeping_fn_call_next_process(
  fn,
  checkStatusFn,
  interval,
  maxTries,
  processName
) {
  let numTries = 0;
  async function retry() {
    if (checkStatusFn() === true) {
      console.log("call fn and checkStatusFn: " + checkStatusFn());
      return await fn();
    } else if (numTries < maxTries || maxTries === undefined) {
      numTries++;
      await new Promise((resolve) => setTimeout(resolve, interval));
      console.log(processName + " try: " + numTries);
      return await retry();
    }
  }
  return await retry();
}

function fnTestCallNextProcess() {
  fnAwait();
  user_housekeeping_fn_call_next_process(
    fnComplete, // Function to call when status is true
    () => sta_pro, // Status checking function
    1000, // Interval in milliseconds
    90, // Maximum number of tries
    "TestProcess" // Name of the process (for logging)
  );
}

function fnComplete() {
  console.log("Complete");
}

let sta_pro = false;

function fnAwait() {
  setTimeout(() => {
    sta_pro = true;
  }, 10000); // Set status to true after 10 seconds
}

//---------------get icon by status----------------------------------------
function fnGetIconByStatusUserHousekeeping(status) {
  let iconApply = [
    { status: "1", icon: ["fa", "fa-lg", "fa-check"] },
    { status: "-1", icon: ["fa", "fa-lg", "fa-times"] },
    { status: "0", icon: ["fa", "fa-lg" /*"fa-times"*/] },
  ];
  const matchingIcon = iconApply.find((item) => item.status === status);
  return matchingIcon ? matchingIcon.icon : "";
}

//---------------fn add icon---------------------------
function fnAddIconClassUserHousekeeping(elementId, iconArray) {
  const element = document.getElementById(elementId); // check element is correctly
  if (!element) {
    console.error(`Element with id '${elementId}' not found.`);
    return;
  }
  if (!Array.isArray(iconArray) || iconArray.length === 0) {
    console.error("Icon array should not be empty.");
    return;
  } // remove all classes
  element.classList.remove(...element.classList); // add icon to element
  iconArray.forEach((icon) => {
    element.classList.add(icon);
    if (icon === "fa-times") {
      element.style.color = "red";
    } else if (icon == "fa-check") {
      element.style.color = "green";
    }
  });
}

//-----------------get date time now-------------------------
function rpt_user_housekeeping_fn_get_date_time_now() {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  return day + "-" + month + "-" + year;
}
//------------------fn show or hide element------------------------
function rpt_user_housekeeping_fn_toggle_element_show_hide(elementIds, action) {
  var ids = Array.isArray(elementIds) ? elementIds : [elementIds];
  ids.forEach(function (elementId) {
    var element = document.getElementById(elementId);
    if (element) {
      if (action === "show") {
        element.style.display = "";
      } else if (action === "hide") {
        element.style.display = "none";
      } else {
        console.log("Invalid action. Please use 'show' or 'hide' :)");
      }
    } else {
      console.log(
        "Element with id '" + elementId + "' does not exist or is incorrect :)"
      );
    }
  });
}
//------------------fn get date from date range------------------------
function fnGetFullMonthDate(monthYear) {
  const [month, year] = monthYear.split("-");
  const startDate = new Date(`${month} 1, ${year}`);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  );
  const formattedStartDate =
    rpt_user_housekeeping_get_correct_format_date(startDate);
  const formattedEndDate =
    rpt_user_housekeeping_get_correct_format_date(endDate);
  return formattedStartDate + "~" + formattedEndDate;
}

function rpt_user_housekeeping_get_correct_format_date(date) {
  const day = String(date.getDate()).padStart(2, "0").replace(" ", "");
  const month = date
    .toLocaleString("default", { month: "short" })
    .toLowerCase()
    .replace(" ", "");
  const year = date.getFullYear().toString().replace(" ", "");
  return day + "-" + month + "-" + year;
}
//---------------------------get row selected from table------------------------
function rpt_user_housekeeping_get_selected_row_from_table(
  tb_id,
  notSelectMessage,
  multipleSelectionCondition
) {
  let id_obj = [];
  id_obj = table.GetValueSelected(tb_id);
  if (id_obj.length == 0) {
    goAlert.alertError(
      "Processing Failed",
      "No " + notSelectMessage + " Id Selected!"
    );
    return false;
  }
  if (multipleSelectionCondition) {
    return stringCreate.FromObject(id_obj).split(",");
  } else {
    if (id_obj.length > 1) {
      goAlert.alertError(
        "Processing Failed",
        "Operation does not support with multiple selection"
      );
      return false;
    }
  }
  return stringCreate.FromObject(id_obj);
}
//------------------apply data to table deletion----------------------

function rpt_user_housekeeping_fn_refresh_listing(type, date) {
  let toDate = "";
  let fromDate = "";
  if (tabProcess == "1001") {
    if (date === undefined || date === "") {
      let dateRage = fnGetFullMonthDate(
        $("#rang_date_id_user_housekeeping").val()
      ).split("~");
      fromDate = dateRage[0];
      toDate = dateRage[1];
    } else if (date !== undefined && date !== "") {
      let dateRage = fnGetFullMonthDate(date).split("~");
      fromDate = dateRage[0];
      toDate = dateRage[1];
    }
    CallAPI.Go(
      v_url_get_bi_housekeeping,
      { fromDate: fromDate, toDate: toDate, type: type },
      fnRefreshListingBiUserHousekeepingCallback,
      ""
    );
  } else if (tabProcess == "2002") {
    if (date === undefined || date === "") {
      let dateRage = fnGetFullMonthDate(
        $("#rang_date_id_user_housekeeping").val()
      ).split("~");
      fromDate = dateRage[0];
      toDate = dateRage[1];
    } else if (date !== undefined && date !== "") {
      let dateRage = fnGetFullMonthDate(date).split("~");
      fromDate = dateRage[0];
      toDate = dateRage[1];
    }
    let data = { fromDate: fromDate, toDate: toDate };
    CallAPI.Go(
      url_refresh_listing_db_user_housekeeping,
      data,
      RptBIHkpFnGetDBHkpListingCallback,
      ""
    );
  }
}

let statusGetUserClose = false;
function rpt_user_housekeeping_fn_get_user_inactive() {
  statusGetUserClose = false;
  let dateReportBi = $("#bi_date_report_ele_id").val();
  CallAPI.Go(
    v_user_housekeeping_get_user_inactive,
    { date: user_housekeeping_fn_get_correct_date_format(dateReportBi) },
    (res_data) => {
      if (res_data.status === "1") {
        console.log(res_data);
        statusGetUserClose = true;
        $('.nav-tabs a[href="#rpt_bi_user_pre_close_listing_tab"]').tab("show");
        rpt_user_housekeeping_apply_data_to_table_bi_user_close(res_data.data);
      }
    },
    "."
  );
}

let boolStatusInsert = false;
async function rpt_user_Housekeeping_fn_insert_process_step_all(stepName) {
  boolStatusInsert = false;
  let dateReportBi = $("#bi_date_report_ele_id").val();
  let dateReportDb = $("#db_date_report_id").val();
  let tmpDate = tabProcess === "1001" ? dateReportBi : dateReportDb;
  let dateProcess = user_housekeeping_fn_get_correct_date_format(tmpDate);
  const handleInsertProcessStep = (processId, description) => {
    rpt_user_housekeeping_fn_insert_process_step(
      processId,
      "Y",
      dateProcess,
      tabProcess,
      description,
      (data) => {
        if (data.status === "1") {
          boolStatusInsert = true;
          console.log(`Insert process step ${stepName} complete :(`);
        }
        setTimeout(() => {
          user_housekeeping_fn_call_next_process(
            () => fnGetProcessStepUserHousekeeping(),
            () => boolStatusInsert,
            1000,
            100,
            "call update process step after insert process step complete"
          );
        }, 1000);
      }
    );
  };
  switch (stepName) {
    case "gen_bi_inactive":
      {
        let date = $("#bi_date_report_ele_id").val();
        fnGetBIUserHousekeeping("getReport");
        user_housekeeping_fn_call_next_process(
          () => handleInsertProcessStep("10001", "-"),
          () => sta_get_bi_housekeeping,
          1000,
          100,
          "try insert process step after get bi housekeeping"
        );
        user_housekeeping_fn_call_next_process(
          () =>
            rpt_user_housekeeping_fn_refresh_listing("getReportListing", date),
          () => boolStatusInsert,
          1000,
          100,
          "call update refresh listing after complete!"
        );
      }
      break;
    case "req_auth":
      handleInsertProcessStep("10002", "-");
      break;
    case "auth":
      {
        let date = $("#bi_date_report_ele_id").val();
        handleInsertProcessStep("10003", "-");
        user_housekeeping_fn_call_next_process(
          () =>
            rpt_user_housekeeping_fn_refresh_listing("getReportListing", date),
          () => boolStatusInsert,
          1000,
          100,
          "try insert process step after get bi housekeeping"
        );
      }
      break;
    case "reject":
      handleInsertProcessStep("10008", "-");
      break;
    case "inform":
      {
        user_housekeeping_fn_sent_mail_inform_user_bi();
        user_housekeeping_fn_call_next_process(
          () => handleInsertProcessStep("10004", "-"),
          () => user_housekeeping_sta_sent_mail_inform,
          1000,
          100,
          "call update process step => get_bi_close"
        );
      }
      break;
    case "get_bi_close":
      {
        rpt_user_housekeeping_fn_get_user_inactive();
        user_housekeeping_fn_call_next_process(
          () => handleInsertProcessStep("10005", "-"),
          () => statusGetUserClose,
          1000,
          100,

          "call update process step => get_bi_close"
        );
      }
      break;
    case "insert_bi_close":
      {
        user_housekeeping_fn_insert_bi_user_close();
        user_housekeeping_fn_call_next_process(
          () => handleInsertProcessStep("10006", "-"),
          () => statusInsertUserClose,
          1000,
          100,
          "call update process step => insert bi close"
        );
      }
      break;
    case "get_bi_deletion":
      {
        user_housekeeping_fn_get_bi_deletion();
        user_housekeeping_fn_call_next_process(
          () => handleInsertProcessStep("10007", "-"),
          () => sta_close_bi_inactive,
          1000,
          100,
          "call update process step => update close bi inactive"
        );
      }
      break;
    case "db_get_user_housekeeping":
      {
        let date = $("#db_date_report_id").val();
        fnGenerateUserHousekeepingDBHousekeeping();
        user_housekeeping_fn_call_next_process(
          () => handleInsertProcessStep("20001", "-"),
          () => statusGenerateDBHkp,
          1000,
          100,
          "call update process step => generate database user housekeeping"
        );
        user_housekeeping_fn_call_next_process(
          () => rpt_user_housekeeping_fn_refresh_listing("", date),
          () => boolStatusInsert,
          1000,
          100,
          "Refresh listing after insert process step"
        );
      }
      break;
    case "db_req_auth":
      {
        handleInsertProcessStep("20002", "-");
      }
      break;
    case "db_auth":
      {
        let date = $("#db_date_report_id").val();
        handleInsertProcessStep("20003", "-");
        user_housekeeping_fn_call_next_process(
          () => rpt_user_housekeeping_fn_refresh_listing("", date),
          () => boolStatusInsert,
          1000,
          100,
          "call update process step => generate database user housekeeping"
        );
      }
      break;
    case "db_reject":
      handleInsertProcessStep("20005", "-");
      break;
    case "db_inform":
      fnSentMailInformDBUserHousekeeping();
      user_housekeeping_fn_call_next_process(
        () => handleInsertProcessStep("20004", "-"),
        () => statusSentMailDBUserHousekeeping,
        1000,
        100,
        "call update process step => after sent mail inform user db"
      );
      break;
  }
}

var sta_get_bi_housekeeping = false;
async function fnGetBIUserHousekeeping(type) {
  sta_get_bi_housekeeping = false;
  let date = $("#bi_date_report_ele_id").val();
  let dateRange = fnGetFullMonthDate(date).split("~");
  CallAPI.Go(
    v_url_get_bi_housekeeping,
    {
      fromDate: dateRange[0].toString(),
      toDate: dateRange[1].toString(),
      type: type,
    },
    (data) => {
      if (data.status === "1") {
        sta_get_bi_housekeeping = true;
        fn_apply_data_to_table_bi_user_inactive_user_housekeeping(
          data.data,
          "rpt_bi_inactive_listing"
        );
        console.log(data);
      } else {
        goAlert.alertError("Error Process", data.message);
      }
    },
    ""
  );
}

function fnGetProcessStepUserHousekeeping() {
  let date = "";
  const biDateReportInput = $("#bi_date_report_ele_id");
  const dbDateReportInput = $("#db_date_report_id");
  if (tabProcess === "1001") {
    date = biDateReportInput.val();
  } else if (tabProcess === "2002") {
    date = dbDateReportInput.val();
  }
  if (date && tabProcess) {
    const formattedDate = user_housekeeping_fn_get_correct_date_format(date);
    if (formattedDate) {
      const data = { date: formattedDate, tabProcess: tabProcess };
      CallAPI.Go(
        varUrlGetProcessStep,
        data,
        fnGetProcessStepCallbackUserHousekeeping,
        ""
      );
    } else {
      goAlert.alertError("Error Data", "Invalid date format, please check.");
    }
  } else {
    goAlert.alertError("Error Data", "Date is empty, please check.");
  }
}

function fnGetProcessStepCallbackUserHousekeeping(data) {
  if (data.status === "1") {
    for (let obj of data.data.steProcess) {
      fnUpdateProcessDataUserHousekeeping(obj);
    } // Update status

    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.bi_housekeeping.update_status,
      "td_update_user_status_bi_housekeeping",
      "txt_ms_update_user_status_bi_housekeeping",
      "icon_status_update_user_status_bi_housekeeping",
      "icon_ms_update_user_status_bi_user_housekeeping"
    ); // Update email
    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.bi_housekeeping.update_email,
      "td_update_user_email_bi_housekeeping",
      "txt_ms_update_user_email_bi_housekeeping",
      "icon_status_update_user_email_bi_housekeeping",
      "icon_ms_update_user_email_bi_user_housekeeping"
    ); // Pull last login
    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.bi_housekeeping.pull_last_login,
      "td_ms_pull_last_login_bi_housekeeping",
      "txt_ms_pull_last_login_bi_housekeeping",
      "icon_status_pull_last_login_bi_housekeeping",
      "icon_ms_pull_last_login_user_bi_user_housekeeping"
    ); // Get bi inactive
    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.bi_housekeeping.get_bi_housekeeping,
      "td_get_bi_user_housekeeping",
      "txt_ms_get_bi_user_housekeeping",
      "icon_status_get_bi_user_housekeeping",
      "icon_ms_get_bi_user_housekeeping"
    ); // DB Housekeeping
    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.db_housekeeping.user_inform,
      "td_user_inform_db_housekeeping",
      "txt_ms_user_inform_db_housekeeping",
      "icon_status_user_inform_db_housekeeping",
      "icon_ms_user_inform_db_user_housekeeping"
    );
    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.db_housekeeping.user_remove,
      "td_user_remove_db_housekeeping",
      "txt_ms_user_remove_db_housekeeping",
      "icon_status_user_remove_db_housekeeping",
      "icon_ms_user_remove_db_user_housekeeping"
    );
    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.db_housekeeping.total_user,
      "td_total_user_db_housekeeping",
      "txt_ms_total_user_db_housekeeping",
      "icon_status_total_user_db_housekeeping",
      "icon_ms_total_user_db_housekeeping"
    ); //bi deletion
    // fnUpdateStatusUserHousekeeping(
    //   data.data.staProcess.bi_housekeeping.get_bi_user_close,
    //   "td_bi_user_close_bi_housekeeping",
    //   "txt_ms_get_bi_user_close_bi_housekeeping",
    //   "icon_status_get_bi_user_close_bi_housekeeping",
    //   "icon_ms_get_bi_user_close_bi_housekeeping"    // );
    // fnUpdateStatusUserHousekeeping(
    //   data.data.staProcess.bi_housekeeping.insert_bi_user_close,
    //   "td_insert_bi_user_close_bi_housekeeping",
    //   "txt_ms_insert_bi_user_close_bi_housekeeping",
    //   "icon_status_insert_bi_user_close_bi_housekeeping",
    //   "icon_ms_insert_bi_user_close_bi_user_housekeeping"
    // );
    fnUpdateStatusUserHousekeeping(
      data.data.staProcess.bi_housekeeping.close_bi_user,
      "td_get_bi_user_deletion_bi_housekeeping",
      "txt_ms_get_bi_deletion_bi_housekeeping",
      "icon_status_get_bi_deletion_bi_housekeeping",
      "icon_ms_get_bi_user_deletion_bi_housekeeping"
    );
  } else {
    goAlert.alertError("Error get process step!", data.message);
  }
}

let listingBIUserHousekeeping = "";
function fnRefreshListingBiUserHousekeepingCallback(data) {
  if (data.status == "1") {
    console.log(data);
    listingBIUserHousekeeping = data;
    fn_apply_data_to_table_bi_user_inactive_user_housekeeping(
      data.data,
      "rpt_bi_inactive_listing"
    );
  } else {
    goAlert.alertError("Get Listing", data.message);
    fn_apply_data_to_table_bi_user_inactive_user_housekeeping([]);
  }
}

// var statusInsertUserClose = false;
// function user_housekeeping_fn_insert_bi_user_close() {
//   let date = $("#bi_date_report_ele_id").val();
//   statusInsertUserClose = false;
//   CallAPI.Go(
//     user_housekeeping_url_insert_user_bi_close,
//     { date: user_housekeeping_fn_get_correct_date_format(date) },
//     (data) => {
//       if (data.status == "1") {
//         statusInsertUserClose = true;
//         goAlert.alertInfo("Insert user bi close", data.message);
//       } else {
//         goAlert.alertError("Insert user bi close", data.message);
//       }
//     },
//     "."
//   );
// }

var sta_close_bi_inactive = false;
function user_housekeeping_fn_get_bi_deletion() {
  let date = $("#bi_date_report_ele_id").val();
  sta_close_bi_inactive = false;
  CallAPI.Go(
    user_housekeeping_url_get_bi_deletion,
    { date: user_housekeeping_fn_get_correct_date_format(date) },
    (data) => {
      if (data.status === "1") {
        sta_close_bi_inactive = true;
        rpt_user_housekeeping_apply_data_to_table_user_deletion(
          data.biDeletion
        );
        $('.nav-tabs a[href="#rpt_bi_deletion_listing_tab"]').tab("show");
        goAlert.alertInfo("Insert user bi close", data.message);
      } else {
        goAlert.alertError("Insert user bi close", data.message);
      }
    },
    "."
  );
}

// function fnSendMailInformToUserBIHousekeeping() {
//   let record_id = table.GetValueSelected("rpt_bi_inactive_listing");
//   let user_id = "";
//   let all_user = "";
//   try {
//     if (record_id.length === 0) {
//       goAlert.alertError("Processing Failed", "No Report ID Selected");
//       return false;
//     } else {
//       user_id = listingBIUserHousekeeping.data.filter((d) =>
//         record_id.includes(d.id)
//       );
//     }
//     user_id = user_id.forEach((id) => {
//       all_user = all_user + id.userId + ",";
//     });
//     console.log(all_user);
//   } catch (error) {
//     console.error(error);
//   }
// }

//------------------ Database user housekeeping--------------------
var statusGenerateDBHkp = false;
function fnGenerateUserHousekeepingDBHousekeeping() {
  // Init status
  statusGenerateDBHkp = false;
  let reportDate = $("#db_date_report_id").val(); //call api get db housekeeping
  CallAPI.Go(
    url_pull_db_user_housekeeping,
    { date: user_housekeeping_fn_get_correct_date_format(reportDate) },
    () => {
      setTimeout(() => {
        statusGenerateDBHkp = true;
        console.log("Complete generate database user housekeeping.");
      }, 2000);
    },
    "."
  );
}

let statusSentMailDBUserHousekeeping = false;
function fnSentMailInformDBUserHousekeeping() {
  statusSentMailDBUserHousekeeping = false;
  let reportDate = $("#db_date_report_id").val();
  let date = user_housekeeping_fn_get_correct_date_format(reportDate);
  CallAPI.Go(
    url_set_mail_inform_user_db_housekeeping,
    { reportDate: date, type: "DB", userInform: "" },
    (data) => {
      if (data.status === "1") {
        goAlert.alertInfo("Inform DB user", data.message);
        statusSentMailDBUserHousekeeping = true;
      } else {
        goAlert.alertError("Inform DB user", data.message);
      }
    },
    "."
  );
}

let user_housekeeping_sta_sent_mail_inform = false;
function user_housekeeping_fn_sent_mail_inform_user_bi() {
  user_housekeeping_sta_sent_mail_inform = false;
  let reportDate = $("#bi_date_report_ele_id").val();
  let date = user_housekeeping_fn_get_correct_date_format(reportDate);
  CallAPI.Go(
    url_set_mail_inform_user_db_housekeeping,
    { reportDate: date, type: "BI", userInform: "" },
    (data) => {
      if (data.status === "1") {
        user_housekeeping_sta_sent_mail_inform = true;
        goAlert.alertInfo("Inform BI user", data.message);
      } else {
        goAlert.alertError("Inform BI user", data.message);
      }
    },
    "."
  );
}
var sta_ref_listing_bi_del = false;
function user_housekeeping_fn_get_bi_deletion_listing() {
  if (sta_ref_listing_bi_del === false) {
    let date_report = $("#rang_date_id_user_housekeeping").val();
    CallAPI.Go(
      url_get_bi_deletion_listing,
      { date: user_housekeeping_fn_get_correct_date_format(date_report) },
      (data) => {
        if (data.status === "1") {
          rpt_user_housekeeping_apply_data_to_table_user_deletion(data.data);
        } else {
          rpt_user_housekeeping_apply_data_to_table_user_deletion([]);
        }
      },
      ""
    );
    sta_ref_listing_bi_del = true;
    setTimeout(() => {
      sta_ref_listing_bi_del = false;
    }, 500);
  }
}

//var sta_ref_listing_ = false;
// function user_housekeeping_fn_get_bi_user_remove_listing() {
//   let date_report = $("#rang_date_id_user_housekeeping").val();
//   CallAPI.Go(
//     v_user_housekeeping_get_user_inactive,
//     { date: user_housekeeping_fn_get_correct_date_format(date_report) },
//     (data) => {
//       if (data.status === "1") {
//         rpt_user_housekeeping_apply_data_to_table_bi_user_close(data.data);
//       } else {
//         rpt_user_housekeeping_apply_data_to_table_bi_user_close([]);
//       }
//     },
//     ""
//   );
// }

var sta_ref_listing_bi_user_update_status = false;
function user_housekeeping_fn_get_listing_bi_user_update_status() {
  if (sta_ref_listing_bi_user_update_status === false) {
    let date = $("#rang_date_id_user_housekeeping").val();
    CallAPI.Go(
      url_get_bi_user_update_status,
      { date: date },
      (d) => {
        if (d.status === "1") {
          user_housekeeping_fn_apply_data_to_tb_bi_user_update_status(d.data);
        } else {
          user_housekeeping_fn_apply_data_to_tb_bi_user_update_status([]);
        }
      },
      ""
    );
    sta_ref_listing_bi_user_update_status = true;
    setTimeout(() => {
      sta_ref_listing_bi_user_update_status = false;
    }, 500);
  }
}

function user_housekeeping_fn_get_bi_user_update_status() {
  let date = $("#bi_date_report_ele_id").val();
  CallAPI.Go(
    url_get_bi_user_update_status,
    { date: date },
    (d) => {
      user_housekeeping_fn_apply_data_to_tb_bi_user_update_status(d.data);
    },
    ""
  );
}

let dbHkpListingData = "";
function RptBIHkpFnGetDBHkpListingCallback(data) {
  if (data.status == "1") {
    dbHkpListingData = data.data.dbUser;
    console.log(dbHkpListingData);
    rpt_user_housekeeping_apply_data_table_db_user_housekeeping(
      data.data.dbUser
    );
  } else {
    goAlert.alertError("Get Listing", data.message);
    rpt_user_housekeeping_apply_data_table_db_user_housekeeping([]);
  }
}
function RptUserHkpFnInsertProcessStatus(
  statusId,
  status,
  statusCount,
  message,
  processData,
  processDate
) {
  let data = {
    statusId: statusId,
    status: status,
    statusCount: statusCount,
    message: message,
    processData: processData,
    processDate: processDate,
  };
  const statusCheck = data.every((value) => value);
  if (statusCheck) {
    CallAPI.Go(
      vBIHkpInsertProcessStatus,
      data,
      (data) => {
        if (data.status === "1") {
          goAlert.alertInfo("Insert Status", data.message);
        } else {
          goAlert.alertError("Insert Status", data.message);
        }
      },
      ""
    );
  } else {
    console.log("All data is null pls check!");
  }
}

//function fnOpenModalOperationBIUserHousekeeping () {
//    modals.Open( "modal_operation_bi_user_housekeeping" ); //listingBIUserHousekeeping
//    fn_apply_data_to_table_bi_user_inactive_user_housekeeping(
//        listingBIUserHousekeeping.data,
//        "rpt_bi_inactive_operation_listing"
//    );
//}

//function fnOpenModalOperationDBUserHousekeeping () {
//    modals.Open( "modal_operation_db_user_housekeeping" );
//}

//==================Start fn apply data to table===============================
function user_housekeeping_fn_apply_data_to_tb_bi_user_update_status(data) {
  dataTable.ApplyJsonData("rpt_bi_update_status_listing", data);
}
function rpt_user_housekeeping_apply_data_table_db_user_housekeeping(data) {
  var columns = [
    {
      data: "id",
      render: function (id) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          id +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "id" },
    { data: "staffId" },
    { data: "staffName" },
    { data: "dbUsername" },
    { data: "currentStatus" },
    { data: "createDate" },
    { data: "lastLogin" },
    { data: "insertedDate" },
    { data: "inactiveDays" },
    { data: "dbName" },
    { data: "status" },
    { data: "userRole" },
    { data: "remark" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson("tb_listing_db_hkp", columns, data);
}
function rpt_user_housekeeping_apply_data_to_table_user_deletion(data) {
  var columns_inactive = [
    {
      data: "id",
      render: function (id) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          id +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "id" },
    { data: "brn" },
    { data: "userId" },
    { data: "userName" },
    { data: "reqDate" },
    { data: "createDate" },
    { data: "closeDate" },
    { data: "status" },
    { data: "remark" },
    { data: "brnName" },
    { data: "position" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson("rpt_bi_deletion_listing", columns_inactive, data);
}

function rpt_user_housekeeping_apply_data_to_table_bi_user_close(data) {
  let i = 0;
  let columns = [
    {
      data: "staffId",
      render: function (no) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          no +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "id" },
    { data: "userId" },
    { data: "userName" },
    { data: "closeType" },
    { data: "reportDate" },
    { data: "dep" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson("table_listing_user_close", columns, data);
}
function fn_apply_data_to_table_bi_user_inactive_user_housekeeping(
  data,
  tableId
) {
  var columns_inactive = [
    {
      data: "id",
      render: function (id) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          id +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "id" },
    { data: "recordStatus" },
    { data: "brn" },
    { data: "userId" },
    { data: "userName" },
    { data: "createDate" },
    { data: "lastLogin" },
    { data: "numLastLogin" },
    { data: "reportDate" },
    { data: "reviewDate" },
    { data: "remark" },

    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson(tableId, columns_inactive, data);
}
//==================End fn apply data to table===============================

//================== Start Insert Process Step ==============================
function RptBIHkpFnInsertProcessStat(
  statusId,
  status,
  statusCount,
  message,
  processData,
  processDate,
  callback
) {
  let data = {
    statusId: statusId,
    status: status,
    statusCount: statusCount,
    message: message,
    processData: processData,
    processDate: processDate,
  };
  const values = Object.values(data);
  const statusCheck = values.every((value) => value);
  if (statusCheck) {
    CallAPI.Go(vBIHkpInsertProcessStep, data, callback, "");
  } else {
    goAlert.alertError("Error Data", "All data is null. Please check.");
  }
}
//================== End Insert Process Step ================================

//================== Start refresh listing ==================================
function rpt_user_housekeeping_fn_refresh_listing_user_inactive() {
  let dateReportBi = $("#rang_date_id_user_housekeeping").val();
  CallAPI.Go(
    v_user_housekeeping_get_user_inactive,
    { date: user_housekeeping_fn_get_correct_date_format(dateReportBi) },
    (res_data) => {
      if (res_data.status === "1") {
        console.log(res_data);
        statusGetUserClose = true;
        //$('.nav-tabs a[href="#rpt_bi_user_pre_close_listing_tab"]').tab("show");
        rpt_user_housekeeping_apply_data_to_table_bi_user_close(res_data.data);
      }
    },
    "."
  );
}
function user_housekeeping_fn_refresh_listing_bi_housekeeping() {
  let dateReportBi = $("#rang_date_id_user_housekeeping").val();
  CallAPI.Go(
    url_get_bi_housekeeping_listing,
    { date: user_housekeeping_fn_get_correct_date_format(dateReportBi) },
    (res_data) => {
      if (res_data.status === "1") {
        console.log(res_data);
        statusGetUserClose = true;
        //$('.nav-tabs a[href="#rpt_bi_user_pre_close_listing_tab"]').tab("show");
        fn_apply_data_to_table_bi_user_inactive_user_housekeeping(
          res_data.data,
          "rpt_bi_inactive_listing"
        );
      }
    },
    "."
  );
}

//================== End refresh listing ========================================
