/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

// global variables
var tabProcess = "1";
function iau_fn_get_correct_date_format(dateShort) {
  return "01-" + dateShort;
}
function iau_fn_enable_disable_ele(elementId, value) {
  if (elementId !== "" && value !== "") {
    var element = document.getElementById(elementId);
    if (element !== null) {
      if (element.style.display === "none") {
        element.style.display = value == true ? "none" : "";
        element.disabled = value;
        //console.log( "button -> " + elementId + " : " + value + 'set display: ' + value == true ? 'none' : 'show' );
      } else {
        element.disabled = value;
      }
    } else {
      console.error("button with Id: '" + elementId + "' not found.");
    }
  } else {
    console.error("Invalid element ID or value.");
  }
}
function iau_fn_update_txt_2_ele(elementId, text) {
  if (element !== null && text !== undefined) {
    document.getElementById(elementId).textContent = text !== "0" ? text : "";
  } else {
    console.error("Element with ID '" + elementId + "' not found.");
  }
}
function iau_fn_set_icon_2_ele(elementId, status) {
  fnAddIconClassUserHousekeeping(
    elementId,
    fnGetIconByStatusUserHousekeeping(status)
  );
}
function iau_fn_update_process_btn(obj) {
  let { elementId, valStep, category } = obj;
  if (category.toString().toLowerCase() === "btn") {
    iau_fn_enable_disable_ele(
      elementId,
      valStep.toString().toLowerCase() === "n" ? true : false
    );
  }
}
function iau_fn_set_style_2_message_ele(elementId, status) {
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
function iau_fn_update_status_txt_btn(
  status,
  countElement,
  messageElement,
  iconElement,
  iconMsEleId
) {
  iau_fn_update_txt_2_ele(countElement, status.count);
  iau_fn_update_txt_2_ele(messageElement, status.message);
  iau_fn_set_icon_2_ele(iconElement, status.status);
  iau_fn_set_style_2_message_ele(status.eleId, status.status);
}
let currentProcess = null;
const processMap = {};
async function iau_fn_call_next_process(
  fn,
  checkStatusFn,
  interval,
  maxTries,
  processName,
  allowCancel = false
) {
  if (allowCancel && processMap[processName]) {
    console.log("Canceling the current process: " + processName);
    processMap[processName].cancel();
  }
  let numTries = 0;
  let isCanceled = false;
  function cancel() {
    isCanceled = true;
  }
  async function retry() {
    if (!isCanceled && checkStatusFn() === true) {
      console.log("call fn and checkStatusFn: " + checkStatusFn());
      return await fn();
    } else if (!isCanceled && (numTries < maxTries || maxTries === undefined)) {
      numTries++;
      await new Promise((resolve) => setTimeout(resolve, interval));
      console.log(processName + " try: " + numTries);
      return await retry();
    }
  }
  const retryPromise = retry();
  if (allowCancel) {
    processMap[processName] = {
      cancel,
    };
  }
  const result = await retryPromise;
  if (allowCancel) {
    delete processMap[processName];
  }
  return result;
}
function cancelProcess(processName) {
  if (processMap[processName]) {
    console.log("Canceling process: " + processName);
    processMap[processName].cancel();
    delete processMap[processName]; 
  } else {
    console.log("Process not found: " + processName);
  }
}

function fnGetIconByStatusUserHousekeeping(status) {
  let iconApply = [
    { status: "1", icon: ["fa", "fa-lg", "fa-check"] },
    { status: "-1", icon: ["fa", "fa-lg", "fa-times"] },
    { status: "0", icon: ["fa", "fa-lg" /*"fa-times"*/] },
  ];
  const matchingIcon = iconApply.find((item) => item.status === status);
  return matchingIcon ? matchingIcon.icon : "";
}
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
function rpt_iau_fn_get_date_time_now() {
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
function rpt_iau_fn_toggle_element_show_hide(elementIds, action) {
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
function fnGetFullMonthDate(monthYear) {
  const [month, year] = monthYear.split("-");
  const startDate = new Date(`${month} 1, ${year}`);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  );
  const formattedStartDate = rpt_iau_get_correct_format_date(startDate);
  const formattedEndDate = rpt_iau_get_correct_format_date(endDate);
  return formattedStartDate + "~" + formattedEndDate;
}
function rpt_iau_get_correct_format_date(date) {
  const day = String(date.getDate()).padStart(2, "0").replace(" ", "");
  const month = date
    .toLocaleString("default", { month: "short" })
    .toLowerCase()
    .replace(" ", "");
  const year = date.getFullYear().toString().replace(" ", "");
  return day + "-" + month + "-" + year;
}
function rpt_iau_get_selected_row_from_table(
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
function rpt_iau_fn_refresh_listing(type, date) {
  let toDate = "";
  let fromDate = "";
  if (tabProcess == "1") {
    if (date === undefined || date === "") {
      let dateRage = fnGetFullMonthDate($("#rang_date_id_iau").val()).split(
        "~"
      );
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
      let dateRage = fnGetFullMonthDate($("#rang_date_id_iau").val()).split(
        "~"
      );
      fromDate = dateRage[0];
      toDate = dateRage[1];
    } else if (date !== undefined && date !== "") {
      let dateRage = fnGetFullMonthDate(date).split("~");
      fromDate = dateRage[0];
      toDate = dateRage[1];
    }
    let data = { fromDate: fromDate, toDate: toDate };
    CallAPI.Go(
      url_refresh_listing_db_iau,
      data,
      rpt_iau_fn_get_db_housekeeping_listing_callback,
      ""
    );
  }
}
let statusGetUserClose = false;
function rpt_iau_fn_get_user_inactive() {
  statusGetUserClose = false;
  let dateReportBi = $("#bi_date_report_ele_id").val();
  CallAPI.Go(
    v_iau_get_user_inactive,
    { date: iau_fn_get_correct_date_format(dateReportBi) },
    (res_data) => {
      if (res_data.status === "1") {
        console.log(res_data);
        statusGetUserClose = true;
        $('.nav-tabs a[href="#rpt_bi_user_pre_close_listing_tab"]').tab("show");
        rpt_iau_fn_apply_data_to_table_bi_user_close(res_data.data);
      } else {
        goAlert.alertError("Get user inactive", res_data.message);
      }
    },
    ""
  );
}
let boolStatusInsert = false;
async function rpt_iau_fn_insert_process_step_all(stepName) {
  boolStatusInsert = false;
  let dateReportBi = $("#bi_date_report_ele_id").val();
  let dateApproveTab = $("#iau_report_date_approve_scr").val();
  //let tmpDate = tabProcess === "1" ? dateReportBi : dateApproveTab;
  //let dateProcess = iau_fn_get_correct_date_format(tmpDate);
  const handleInsertProcessStep = (processId, description, dateProcess) => {
    rpt_iau_fn_insert_process_step(
      processId,
      "Y",
      iau_fn_get_correct_date_format(dateProcess),
      tabProcess,
      description,
      (data) => {
        if (data.status === "1") {
          boolStatusInsert = true;
          console.log(`Insert process step ${stepName} complete :(`);
        } else {
          console.log("insert process step fail");
        }
        setTimeout(() => {
          iau_fn_call_next_process(
            () => fnGetProcessStepUserHousekeeping(),
            () => boolStatusInsert,
            500,
            100,
            "Up_af_In"
          );
        }, 500);
      }
    );
  };
  switch (stepName) {
    case "gen_bi_inactive":
      {
        let date = $("#bi_date_report_ele_id").val();
        fnGetBIUserHousekeeping("getReport");
        iau_fn_call_next_process(
          () => handleInsertProcessStep("1", "-", date),
          () => sta_get_bi_housekeeping,
          500,
          100,
          "ins_pro_st"
        );
        iau_fn_call_next_process(
          () => rpt_iau_fn_refresh_listing("getReportListing", date),
          () => boolStatusInsert,
          500,
          100,
          "up_listing"
        );
      }
      break;
    case "req_auth":
      var date = $("#bi_date_report_ele_id").val();
      handleInsertProcessStep("2", "-", date);
      iau_fn_call_next_process(
        () => rpt_iau_fn_insert_user_review_approve(),
        () => boolStatusInsert,
        500,
        100,
        "insert review approve"
      );
      break;
    case "review":
      {
        let date = $("#iau_report_date_approve_scr").val();
        handleInsertProcessStep("3", "-", date);
        iau_fn_call_next_process(
          () => rpt_iau_fn_refresh_listing("getReportListing", date),
          () => boolStatusInsert,
          500,
          100,
          "insert_review"
        );
      }
      break;
    case "approve":
      {
        let date = $("#iau_report_date_approve_scr").val();
        handleInsertProcessStep("4", "-", date);
        iau_fn_call_next_process(
          () => rpt_iau_fn_refresh_listing("getReportListing", date),
          () => boolStatusInsert,
          500,
          100,
          "insert_auth"
        );
      }
      break;
    case "reject":
      var date = $("#bi_date_report_ele_id").val();
      handleInsertProcessStep("7", "-", date);
      break;
    case "inform":
      {
        var date = $("#bi_date_report_ele_id").val();
        iau_fn_sent_mail_inform_user_bi();
        iau_fn_call_next_process(
          () => handleInsertProcessStep("5", "-", date),
          () => iau_sta_sent_mail_inform,
          500,
          100,
          "up_step"
        );
      }
      break;

    case "get_bi_deletion":
      {
        var date = $("#bi_date_report_ele_id").val();
        iau_fn_get_bi_deletion();
        iau_fn_call_next_process(
          () => handleInsertProcessStep("6", "-", date),
          () => sta_close_bi_inactive,
          500,
          100,
          "get_bi_deletion"
        );
      }
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
        rpt_iau_fn_apply_data_to_table_bi_user_inactive(
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
  const biApproveDateReportInput = $("#iau_report_date_approve_scr");
  if (tabProcess === "1") {
    date =
      biDateReportInput.val() !== undefined
        ? biDateReportInput.val()
        : biApproveDateReportInput.val();
  } else if (tabProcess === "2002") {
    date = dbDateReportInput.val();
  }
  console.log(date);
  if (date && tabProcess) {
    const formattedDate = iau_fn_get_correct_date_format(date);
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
      iau_fn_update_process_btn(obj);
    } // Update status

    iau_fn_update_status_txt_btn(
      data.data.staProcess.bi_housekeeping.update_status,
      "td_update_user_status_bi_housekeeping",
      "txt_ms_update_user_status_bi_housekeeping",
      "icon_status_update_user_status_bi_housekeeping",
      "icon_ms_update_user_status_bi_iau"
    ); // Update email
    iau_fn_update_status_txt_btn(
      data.data.staProcess.bi_housekeeping.update_email,
      "td_update_user_email_bi_housekeeping",
      "txt_ms_update_user_email_bi_housekeeping",
      "icon_status_update_user_email_bi_housekeeping",
      "icon_ms_update_user_email_bi_iau"
    ); // Pull last login
    iau_fn_update_status_txt_btn(
      data.data.staProcess.bi_housekeeping.pull_last_login,
      "td_ms_pull_last_login_bi_housekeeping",
      "txt_ms_pull_last_login_bi_housekeeping",
      "icon_status_pull_last_login_bi_housekeeping",
      "icon_ms_pull_last_login_user_bi_iau"
    ); // Get bi inactive
    iau_fn_update_status_txt_btn(
      data.data.staProcess.bi_housekeeping.get_bi_housekeeping,
      "td_get_bi_iau",
      "txt_ms_get_bi_iau",
      "icon_status_get_bi_iau",
      "icon_ms_get_bi_iau"
    );
    iau_fn_update_status_txt_btn(
      data.data.staProcess.bi_housekeeping.close_bi_user,
      "td_get_bi_user_deletion_bi_housekeeping",
      "txt_ms_get_bi_deletion_bi_housekeeping",
      "icon_status_get_bi_deletion_bi_housekeeping",
      "icon_ms_get_bi_user_deletion_bi_housekeeping"
    );
    // update notifi
    rpt_iau_fn_get_notify_all();
  } else {
    goAlert.alertError("Error get process step!", data.message);
  }
}
let listingBIUserHousekeeping = "";
function fnRefreshListingBiUserHousekeepingCallback(data) {
  if (data.status == "1") {
    console.log(data);
    listingBIUserHousekeeping = data;
    rpt_iau_fn_apply_data_to_table_bi_user_inactive(
      data.data,
      "rpt_bi_inactive_listing"
    );
  } else {
    goAlert.alertError("Get Listing", data.message);
    rpt_iau_fn_apply_data_to_table_bi_user_inactive([]);
  }
}
var sta_close_bi_inactive = false;
function iau_fn_get_bi_deletion() {
  let date = $("#bi_date_report_ele_id").val();
  sta_close_bi_inactive = false;
  CallAPI.Go(
    iau_url_get_bi_deletion,
    { date: iau_fn_get_correct_date_format(date) },
    (data) => {
      if (data.status === "1") {
        sta_close_bi_inactive = true;
        rpt_iau_fn_apply_data_to_table_user_deletion(data.biDeletion);
        $('.nav-tabs a[href="#rpt_bi_deletion_listing_tab"]').tab("show");
        goAlert.alertInfo("Insert user bi close", data.message);
      } else {
        goAlert.alertError("Insert user bi close", data.message);
      }
    },
    ""
  );
}
// var statusGenerateDBHkp = false;
// function fnGenerateUserHousekeepingDBHousekeeping() {
//   // Init status
//   statusGenerateDBHkp = false;
//   let reportDate = $("#db_date_report_id").val(); //call api get db housekeeping
//   CallAPI.Go(
//     url_pull_db_iau,
//     { date: iau_fn_get_correct_date_format(reportDate) },
//     () => {
//       setTimeout(() => {
//         statusGenerateDBHkp = true;
//         console.log("Complete generate database user housekeeping.");
//       }, 2000);
//     },
//     ""
//   );
// }
// let statusSentMailDBUserHousekeeping = false;
// function fnSentMailInformDBUserHousekeeping() {
//   statusSentMailDBUserHousekeeping = false;
//   let reportDate = $("#db_date_report_id").val();
//   let date = iau_fn_get_correct_date_format(reportDate);
//   CallAPI.Go(
//     url_set_mail_inform_user_db_housekeeping,
//     { reportDate: date, type: "DB", userInform: "" },
//     (data) => {
//       if (data.status === "1") {
//         goAlert.alertInfo("Inform DB user", data.message);
//         statusSentMailDBUserHousekeeping = true;
//       } else {
//         goAlert.alertError("Inform DB user", data.message);
//       }
//     },
//     ""
//   );
// }
let iau_sta_sent_mail_inform = false;
function iau_fn_sent_mail_inform_user_bi() {
  iau_sta_sent_mail_inform = false;
  let reportDate = $("#bi_date_report_ele_id").val();
  let date = iau_fn_get_correct_date_format(reportDate);
  CallAPI.Go(
    url_set_mail_inform_user_db_housekeeping,
    { reportDate: date, type: "BI", userInform: "" },
    (data) => {
      if (data.status === "1") {
        iau_sta_sent_mail_inform = true;
        goAlert.alertInfo("Inform BI user", data.message);
      } else {
        goAlert.alertError("Inform BI user", data.message);
      }
    },
    ""
  );
}
var sta_ref_listing_bi_del = false;
function iau_fn_get_bi_deletion_listing() {
  if (sta_ref_listing_bi_del === false) {
    let date_report = $("#rang_date_id_iau").val();
    CallAPI.Go(
      url_get_bi_deletion_listing,
      { date: iau_fn_get_correct_date_format(date_report) },
      (data) => {
        if (data.status === "1") {
          rpt_iau_fn_apply_data_to_table_user_deletion(data.data);
        } else {
          rpt_iau_fn_apply_data_to_table_user_deletion([]);
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
var sta_ref_listing_bi_user_update_status = false;
function iau_fn_get_listing_bi_user_update_status() {
  if (sta_ref_listing_bi_user_update_status === false) {
    let date = $("#rang_date_id_iau").val();
    CallAPI.Go(
      url_get_bi_user_update_status,
      { date: date },
      (d) => {
        if (d.status === "1") {
          iau_fn_apply_data_to_tb_bi_user_update_status(d.data);
        } else {
          iau_fn_apply_data_to_tb_bi_user_update_status([]);
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
function rpt_iau_fn_get_bi_user_update_status() {
  let date = $("#bi_date_report_ele_id").val();
  CallAPI.Go(
    url_get_bi_user_update_status,
    { date: date },
    (d) => {
      if (d.status === "1") {
        iau_fn_apply_data_to_tb_bi_user_update_status(d.data);
      } else {
        goAlert.alertError("get bi update status");
      }
    },
    ""
  );
}
let dbHkpListingData = "";
function rpt_iau_fn_get_db_housekeeping_listing_callback(data) {
  if (data.status == "1") {
    dbHkpListingData = data.data.dbUser;
    console.log(dbHkpListingData);
    rpt_iau_apply_data_table_db_iau(data.data.dbUser);
  } else {
    goAlert.alertError("Get Listing", data.message);
    rpt_iau_apply_data_table_db_iau([]);
  }
}
function rpt_iau_fn_insert_process_status(
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
function iau_fn_apply_data_to_tb_bi_user_update_status(data) {
  dataTable.ApplyJsonData("rpt_bi_update_status_listing", data);
}
function rpt_iau_apply_data_table_db_iau(data) {
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
function rpt_iau_fn_apply_data_to_table_user_deletion(data) {
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
    // { data: "brnName" },
    // { data: "position" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson("rpt_bi_deletion_listing", columns_inactive, data);
}
function rpt_iau_fn_apply_data_to_table_bi_user_close(data) {
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
function rpt_iau_fn_apply_data_to_table_bi_user_inactive(data, tableId) {
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
    /*{ data: "recordStatus" }*/
    {
      data: "recordStatus",
      render: function (recordStatus) {
        if (recordStatus == "A") {
          return '<i class="fas fa-check-circle text-success"></i> Authorized';
        }
        if (recordStatus == "U") {
          return '<i class="fas fa-info-circle text-info"></i> Unauthorize';
        }
        if (recordStatus == "E") {
          return '<i class="fas fa-info-circle text-info"></i> Edited';
        }
        if (recordStatus == "F") {
          return '<i class="fas fa-info-circle text-warning"></i> Feedbacked';
        }
        if (recordStatus == "RD") {
          return '<i class="fas fa-trash-alt text-danger"></i> Request Delete';
        } else {
          return recordStatus;
        }
      },
    },
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
function rpt_iau_fn_insert_process_status(
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
function rpt_iau_fn_refresh_listing_user_inactive() {
  let dateReportBi = $("#rang_date_id_iau").val();
  CallAPI.Go(
    v_iau_get_user_inactive,
    { date: iau_fn_get_correct_date_format(dateReportBi) },
    (res_data) => {
      if (res_data.status === "1") {
        console.log(res_data);
        statusGetUserClose = true;
        //$('.nav-tabs a[href="#rpt_bi_user_pre_close_listing_tab"]').tab("show");
        rpt_iau_fn_apply_data_to_table_bi_user_close(res_data.data);
      }
    },
    ""
  );
}
function rpt_iau_fn_refresh_listing_bi_housekeeping() {
  let dateReportBi = $("#rang_date_id_iau").val();
  CallAPI.Go(
    url_get_bi_housekeeping_listing,
    { date: iau_fn_get_correct_date_format(dateReportBi) },
    (res_data) => {
      if (res_data.status === "1") {
        console.log(res_data);
        statusGetUserClose = true;
        //$('.nav-tabs a[href="#rpt_bi_user_pre_close_listing_tab"]').tab("show");
        rpt_iau_fn_apply_data_to_table_bi_user_inactive(
          res_data.data,
          "rpt_bi_inactive_listing"
        );
      } else {
        goAlert.alertError("refresh listing", res_data.message);
      }
    },
    ""
  );
}

// bi approve screen
// global parameters
let bi_approve_tab_process = "1"; //1 => bi, 2002 => db
function rpt_iau_fn_get_process_step_bi_housekeeping() {
  bi_approve_tab_process = "1";
  let date = "";
  date = $("#iau_report_date_approve_scr").val();
  console.log(date);
  if (date && tabProcess) {
    const formattedDate = iau_fn_get_correct_date_format(date);
    if (formattedDate) {
      const data = { date: formattedDate, tabProcess: bi_approve_tab_process };
      CallAPI.Go(
        varUrlGetProcessStep,
        data,
        rpt_iau_fn_get_process_step_callback,
        ""
      );
    } else {
      goAlert.alertError("Error Data", "Invalid date format, please check.");
    }
  } else {
    goAlert.alertError("Error Data", "Date is empty, please check.");
  }
}
function rpt_iau_fn_get_process_step_callback(data) {
  if (data.status === "1") {
    for (let obj of data.data.steProcess) {
      iau_fn_update_process_btn(obj);
    }
    rpt_iau_fn_refresh_listing_bi_hkp();
  } else {
    goAlert.alertError("Error get process step!", data.message);
  }
}
function rpt_iau_fn_refresh_listing_bi_hkp() {
  console.log("refresh listing");
  let toDate = "";
  let fromDate = "";
  let date = "";
  if (bi_approve_tab_process == "1") {
    if (date === undefined || date === "") {
      let dateRage = fnGetFullMonthDate(
        $("#iau_report_date_approve_scr").val()
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
      { fromDate: fromDate, toDate: toDate, type: "GetReportListing" },
      (data) => {
        if (data.status == "1") {
          console.log(data);
          listingBIUserHousekeeping = data;
          rpt_iau_fn_apply_data_to_table_bi_user_inactive(
            data.data,
            "rpt_bi_inactive_review_listing_review"
          );
          //rpt_iau_fn_get_notify_all();
        } else {
          goAlert.alertError("Get Listing", data.message);
          rpt_iau_fn_apply_data_to_table_bi_user_inactive(
            [],
            "rpt_bi_inactive_review_listing_review"
          );
        }
      },
      ""
    );
  } else {
    console.error("error date" + date);
  }
}
function rpt_iau_fn_get_notify_all() {
  let _date = $("#bi_date_report_ele_id").val();
  let date = iau_fn_get_correct_date_format(_date);
  CallAPI.Go(url_get_iau_get_notifi, { date: date }, (data) => {
    if (data.status === "1") {
      data.data.forEach((d) => {
        if (d.ele_id !== undefined) {
          const element = document.getElementById(d.ele_id);
          if (element && d.noti.toString() !== "") {
            element.textContent =
              d.noti.toString() == "0" ? "" : d.noti.toString();
          } else {
            console.error(
              "Notification with Id: '" + d.ele_id + "' not found!"
            );
          }
        }
      });
    } else {
      goAlert.alertError("Get notification failed", data.message);
    }
  });
  if (
    menu_name_active === "RPT_IAU_OPERATION" ||
    menu_name_active === "RPT_IAU_REVIEW_APPROVE"
  ) {
    active_menu = true;
    console.log("menu: " + menu_name_active + " active: " + active_menu);
  } else {
    active_menu = false;
    console.log("menu: " + menu_name_active + " active: " + active_menu);
  }
  return active_menu;
}
let active_menu = true;
let menu_name_active = "";
function rpt_iau_fn_test() {
  console.log("call");
  //iau_fn_call_next_process(
  //    () => console.log( 'stop call' ),
  //    () => !rpt_iau_fn_get_notify_all(),
  //    5000,
  //    1000,
  //    "ref_notification",
  //    true
  //);
}
function rpt_iau_fn_popup_modal_conform_review_approve() {
  modals.Open("modal_operation_confirm_reviewer_approve");
  selectionStyle.LiveSearch("rpt_iau_user_review_ele_id_01", ito_user_op_sl);
  selectionStyle.LiveSearch("rpt_iau_user_approve_ele_id", ito_user_app_sl);
  _count_reviewer = 0;
  setTimeout(() => {
    rpt_iau_fn_enable_add_reviewer_sl("refresh");
  }, 100);
}
function rpt_iau_fn_close_modal_() {
  _count_reviewer = 0;
  setTimeout(() => {
    rpt_iau_fn_enable_add_reviewer_sl("refresh");
  }, 100);
}
var ito_user_op_sl = "";
var ito_user_app_sl = "";
var allITOUser = "";
function rpt_iau_fn_get_ito_user() {
  ito_user_op_sl = "<option></option>";
  ito_user_app_sl = "<option></option>";
  CallAPI.Go(url_get_iau_get_ito_user, undefined, (data) => {
    if (data.status === "1") {
      allITOUser = data.data;
      data.data.forEach((d) => {
        ito_user_op_sl +=
          '<option value="' +
          d.user_id.toString().trim() +
          '">' +
          d.username.toString().trim() +
          "</option>";
        ito_user_app_sl +=
          '<option value="' +
          d.user_id.toString().trim() +
          '">' +
          d.username.toString().trim() +
          "</option>";
        //console.log(d.user_id, d.username);
      });
    } else {
      goAlert.alertError("Error get ITO user", data.message);
    }
  });
}

function rpt_iau_fn_show_position_to_input(userId, inputId) {
  var ele = document.getElementById(inputId);
  var user = allITOUser.find((a) => a.user_id === userId);
  if (ele) {
    console.log("apply values", user.position);
    ele.value = user.position;
  } else {
    console.log("Element with ID " + inputId + " not found.");
  }
}
var _count_reviewer = 0;
function rpt_iau_fn_enable_add_reviewer_sl(type) {
  var eleId = [
    {
      ele_id: "rpt_iau_reviewer_ele_id_02",
      op_id: "rpt_iau_user_review_ele_id_02",
      position_ele: "rpt_iau_user_review_position_ele_id_02",
    },
    {
      ele_id: "rpt_iau_reviewer_ele_id_03",
      op_id: "rpt_iau_user_review_ele_id_03",
      position_ele: "rpt_iau_user_review_position_ele_id_03",
    },
    {
      ele_id: "rpt_iau_reviewer_ele_id_04",
      op_id: "rpt_iau_user_review_ele_id_04",
      position_ele: "rpt_iau_user_review_position_ele_id_04",
    },
  ];

  switch (type) {
    case "add":
      {
        if (_count_reviewer >= 0 && _count_reviewer <= 2) {
          var element = document.getElementById(eleId[_count_reviewer].ele_id);
          var sl_ele = document.getElementById(eleId[_count_reviewer].op_id);
          if (element !== null && sl_ele) {
            element.style.display = "";
            selectionStyle.LiveSearch(
              eleId[_count_reviewer].op_id,
              ito_user_op_sl
            );
            if ((_count_reviewer) => 0 && _count_reviewer < 2) {
              _count_reviewer < 2
                ? (_count_reviewer += 1)
                : console.log("max review: ", _count_reviewer);
            }
            console.log(_count_reviewer);
          } else {
            console.error(
              "Element with ID '" +
              eleId[_count_reviewer].ele_id +
              "' not found."
            );
          }
        } else {
          console.log("reviewer only 4");
        }
      }
      break;
    case "refresh":
      {
        _count_reviewer = 0;
        console.log("call refresh");
        selectionStyle.LiveSearch(
          "rpt_iau_user_review_ele_id_01",
          ito_user_op_sl
        );
        document.getElementById(
          "rpt_iau_user_review_position_ele_id_01"
        ).value = "";
        eleId.forEach((element, i) => {
          console.log("index: " + i);
          var divElement = document.getElementById(element.ele_id);
          var inputEle = document.getElementById(element.position_ele);
          if (divElement && inputEle) {
            divElement.style.display = "none";
            inputEle.value = "";
          } else {
            console.log("Element with ID " + element.ele_id + " not found");
          }
        });
      }
      break;
    case "remove":
      {
        var ele = "";
        var in_ele = "";
        if (_count_reviewer >= 0 && _count_reviewer <= 2) {
          ele = eleId[_count_reviewer].ele_id;
          in_ele = eleId[_count_reviewer].position_ele;
        }
        if (ele) {
          rpt_iau_fn_remove_reviewer(ele, in_ele);
        } else {
          console.log("element id: ", eleId[_count_reviewer].ele_id);
        }
      }
      break;
  }
}
function rpt_iau_fn_remove_reviewer(eleId, in_ele) {
  var element = document.getElementById(eleId);
  var input_element = document.getElementById(in_ele);
  if (element && input_element) {
    element.style.display = "none";
    input_element.value = "";
    if (_count_reviewer >= 0 && _count_reviewer <= 2) {
      if (_count_reviewer > 0) {
        _count_reviewer -= 1;
      } else if (_count_reviewer == 0) {
        _count_reviewer = 0;
      }
    }
  } else {
    console.error("Element with ID '" + eleId + "' not found.");
  }
}
function rpt_iau_fn_get_reviewer_selected() {
  var eleId = [
    {
      ele_id: "rpt_iau_reviewer_ele_id_01",
      op_id: "rpt_iau_user_review_ele_id_01",
      position_ele: "rpt_iau_user_review_position_ele_id_01",
    },
    {
      ele_id: "rpt_iau_reviewer_ele_id_02",
      op_id: "rpt_iau_user_review_ele_id_02",
      position_ele: "rpt_iau_user_review_position_ele_id_02",
    },
    {
      ele_id: "rpt_iau_reviewer_ele_id_03",
      op_id: "rpt_iau_user_review_ele_id_03",
      position_ele: "rpt_iau_user_review_position_ele_id_03",
    },
    {
      ele_id: "rpt_iau_reviewer_ele_id_04",
      op_id: "rpt_iau_user_review_ele_id_04",
      position_ele: "rpt_iau_user_review_position_ele_id_04",
    },
  ];
  var userIds = [];
  var userId = "";
  var divEnable = false;
  console.log("count reviewer: " + _count_reviewer);
  for (var i = 0; i <= _count_reviewer + 1; i++) {
    divEnable = rpt_iau_fn_check_element_display_status(eleId[i].ele_id);
    console.log("element id: ", eleId[i].op_id);
    if (divEnable) {
      userId = $("#" + eleId[i].op_id).val();
      if (userId && !userIds.includes(userId)) {
        userIds.push(userId);
      }
    }
  }
  console.log("userIds: " + userIds);
  return String(userIds);
}
function rpt_iau_fn_check_element_display_status(eleId) {
  var element = document.getElementById(eleId);
  if (element) {
    var displayStyle = element.style.display;
    if (displayStyle === "") {
      console.log("Element Enabled.");
      return true;
    } else if (displayStyle === "none") {
      console.log("Element visible.");
      return false;
    }
  } else {
    console.log("Element not found.");
    return null;
  }
}

function rpt_iau_fn_insert_user_review_approve() {
  var approver = $("#rpt_iau_user_approve_ele_id").val();
  var reviewer = rpt_iau_fn_get_reviewer_selected();
  var date = $("#bi_date_report_ele_id").val();
  var data = {
    reviewer: reviewer.toString(),
    approver: approver,
    report_date: iau_fn_get_correct_date_format(date),
  };
  CallAPI.Go(
    iau_url_insert_rev_app,
    data,
    (d) => {
      if (d.status == "1") {
        goAlert.alertInfo("Insert Data", d.message);
      } else {
        goAlert.alertError("Error Insert Data", d.message);
      }
    },
    ""
  );
}
// Sample procedure text
const procedureText = `
Create Or Replace Package Body "RPT_BI_REPORT" Is

v_user_id    Varchar2(50);
v_real_debug Varchar2(1) := 'N';
v_user_debug Varchar2(1) := 'N';

Procedure dg_init(p_userid Varchar2,
                  p_debug  Varchar2) Is
Begin
   v_user_id := p_userid;
   Begin
      Select substr(p_debug, 1, 1), substr(p_debug, 2, 2)
      Into   v_real_debug, v_user_debug
      From   dual;
   
   Exception
      When Others Then
         v_real_debug := 'N';
         v_user_debug := 'N';
   End;

End dg_init;

Procedure dg_print(msg Varchar2) Is
   slog_file_name Varchar2(100);
   smsg           Clob;
   f              utl_file.file_type;
Begin
   If v_real_debug = 'Y' Then
      If v_user_debug = 'Y' Then
         slog_file_name := to_char(Sysdate, 'YYYYMMDD') || '-' ||
                           'user_housekeeping_' || '-' || v_user_id;
      
         smsg := '[' ||
                 to_clob(to_char(Sysdate, 'dd-MON-YYYY hh24:mi:ss')) || '] ' ||
                 fn_append_calling_program || msg;
      
         f := sys.utl_file.fopen('ITO_DEBUG',
                                 slog_file_name || '.log',
                                 'a',
                                 32767);
         /*a = append*/
         utl_file.put(f, smsg);
         utl_file.new_line(f);
         utl_file.fclose(f);
      End If;
   
   End If;
End dg_print;

Procedure update_bi_user_status(p_statuscount Out Varchar2,
                                op_status     Out Varchar2,
                                op_message    Out Clob) As

   v_compare_ad Number := 0;
   /*v_id_record_update           Number := 0;*/
   v_count_staff_resign         Number := 0;
   v_count_staff_remove_from_ad Number := 0;
   v_id_insert                  Number := 0;
   v_row_effect_count           Number := 0;
   Type user_sys_id_arr Is Varray(2000) Of Varchar2(10);
   v_record_id_update           user_sys_id_arr;
   v_record_req_id_update       user_sys_id_arr;
   v_user_resign_update         Clob := '';
   v_user_remove_from_ad_update Clob := '';
Begin
   For j In (Select *
             From   rpt_user_mgt_user_system bi
             Where  bi.record_status = 'O'
             And    bi.system_name = 'BI'
             And    regexp_like(bi.user_system, '[0-9]')) Loop
      Select Count(1)
      Into   v_compare_ad
      From   current_ad_users ad
      Where  Trim(ad.user_id) = Trim(j.user_system);
   
      If v_compare_ad > 0 Then
         For i In (Select b.user_id, a.record_status, b.status
                   From   rpt_user_mgt_user_system a, current_ad_users b
                   Where  a.record_status = 'O'
                   And    a.record_status <> b.status
                   And    a.system_name = 'BI'
                   And    Trim(a.user_system) = Trim(b.user_id)) Loop
            /* for staff resigned*/
            /* update tb user_system*/
            Update rpt_user_mgt_user_system bi
            Set    bi.record_status  = 'C',
                   bi.remark         = 'User Resigned',
                   bi.last_oper_id   = 'SYSTEM',
                   bi.last_oper_date = Sysdate,
                   bi.user_status    = 'CLOSE'
            Where  Trim(bi.user_system) = Trim(i.user_id)
            And    bi.system_name = 'BI'
            And    bi.record_status = 'O' Return bi.request_id Bulk
             Collect Into v_record_id_update;
            /* get the number of rows updated*/
            v_row_effect_count := Sql%Rowcount;
            /* count row update*/
            v_count_staff_resign := v_count_staff_resign +
                                    v_row_effect_count;
            /* get staff from row update as message*/
            v_user_resign_update := v_user_resign_update || (Case
                                       When v_user_resign_update Is Null Then
                                        i.user_id
                                       Else
                                        ''
                                    End) || (Case
                                       When v_user_resign_update Is Not Null Then
                                        ', ' || i.user_id
                                       Else
                                        ''
                                    End);
         
            If v_record_id_update.count > 0 Then
               For j In 1 .. v_record_id_update.count Loop
                  /*  insert log*/
                  v_id_insert := fn_input_id('RPT_USER_MGT_USER_SYSTEM_LOG',
                                             'LOG_ID');
                  Insert Into rpt_user_mgt_user_system_log
                     (log_id,
                      event_log,
                      mod_no,
                      request_id,
                      id,
                      user_system,
                      system_name,
                      role_id,
                      host_id,
                      service_run,
                      verify_date,
                      effective_date,
                      user_status,
                      remark,
                      record_status,
                      maker_id,
                      create_date,
                      last_oper_id,
                      last_oper_date)
                     Select v_id_insert,
                            'CLOSE' As event_log,
                            u.mod_no + 1 As mod_no,
                            u.request_id,
                            u.id,
                            u.user_system,
                            u.system_name,
                            u.role_id,
                            u.host_id,
                            u.service_run,
                            u.verify_date,
                            u.effective_date,
                            u.user_status,
                            u.remark,
                            u.record_status,
                            u.maker_id,
                            u.create_date,
                            u.last_oper_id,
                            u.last_oper_date
                     From   rpt_user_mgt_user_system u
                     Where  u.id = v_record_id_update(j);
               
               End Loop;
            End If;
            /* update tb req*/
            Update rpt_user_mgt_request user_bi_req
            Set    user_bi_req.record_status  = 'C',
                   user_bi_req.request_remark = 'User Resigned',
                   user_bi_req.last_oper_date = Sysdate,
                   user_bi_req.last_oper_id   = 'SYSTEM'
            Where  user_bi_req.request_staff_id = i.user_id
            And    user_bi_req.record_status = 'O' Return
             user_bi_req.request_id Bulk Collect Into
             v_record_req_id_update;
         
            If v_record_req_id_update.count > 0 Then
               For j In 1 .. v_record_req_id_update.count Loop
                  /* insert log req table*/
                  v_id_insert := fn_input_id('rpt_user_mgt_request_log',
                                             'LOG_ID');
                  Insert Into rpt_user_mgt_request_log
                     (log_id,
                      event_log,
                      mod_no,
                      request_id,
                      request_staff_id,
                      request_name,
                      request_email,
                      request_position,
                      branch_code,
                      branch_name,
                      request_date,
                      request_remark,
                      record_status,
                      maker_id,
                      create_date,
                      last_oper_id,
                      last_oper_date,
                      ticket_on_helpdesk)
                     Select v_id_insert,
                            'CLOSE',
                            log.mod_no + 1,
                            log.request_id,
                            log.request_staff_id,
                            log.request_name,
                            log.request_email,
                            log.request_position,
                            log.branch_code,
                            log.branch_name,
                            log.request_date,
                            log.request_remark,
                            log.record_status,
                            log.maker_id,
                            log.create_date,
                            log.last_oper_id,
                            last_oper_date,
                            log.ticket_on_helpdesk
                     From   rpt_user_mgt_request log
                     Where  log.request_id = v_record_req_id_update(j);
               
               End Loop;
            End If;
         
         End Loop;
      
      Else
         /* for staff remove from ad due staff resigned bigger 30 days*/
         Update rpt_user_mgt_user_system bi
         Set    bi.record_status  = 'C',
                bi.last_oper_id   = 'SYSTEM',
                bi.last_oper_date = Sysdate,
                bi.user_status    = 'CLOSE',
                bi.remark         = 'User deleted from AD'
         Where  Trim(bi.user_system) = Trim(j.user_system)
         And    bi.record_status = 'O'
         And    bi.system_name = 'BI' Return bi.request_id Bulk
          Collect Into v_record_id_update;
         /* get the number of rows updated*/
         v_row_effect_count := Sql%Rowcount;
         /* count row update from row count*/
         v_count_staff_remove_from_ad := v_count_staff_remove_from_ad +
                                         v_row_effect_count;
         v_user_remove_from_ad_update := v_user_remove_from_ad_update || (Case
                                            When v_user_remove_from_ad_update Is Null Then
                                             j.user_system
                                            Else
                                             ''
                                         End) || (Case
                                            When v_user_remove_from_ad_update Is Not Null Then
                                             ', ' || j.user_system
                                            Else
                                             ''
                                         End);
      
         If v_record_id_update.count > 0 Then
            For j In 1 .. v_record_id_update.count Loop
               /* insert log*/
               v_id_insert := fn_input_id('RPT_USER_MGT_USER_SYSTEM_LOG',
                                          'LOG_ID');
               Insert Into rpt_user_mgt_user_system_log
                  (log_id,
                   event_log,
                   mod_no,
                   request_id,
                   id,
                   user_system,
                   system_name,
                   role_id,
                   host_id,
                   service_run,
                   verify_date,
                   effective_date,
                   user_status,
                   remark,
                   record_status,
                   maker_id,
                   create_date,
                   last_oper_id,
                   last_oper_date)
                  Select v_id_insert,
                         'CLOSE' As event_log,
                         u.mod_no + 1 As mod_no,
                         u.request_id,
                         u.id,
                         u.user_system,
                         u.system_name,
                         u.role_id,
                         u.host_id,
                         u.service_run,
                         u.verify_date,
                         u.effective_date,
                         u.user_status,
                         u.remark,
                         u.record_status,
                         u.maker_id,
                         u.create_date,
                         u.last_oper_id,
                         u.last_oper_date
                  From   rpt_user_mgt_user_system u
                  Where  u.id = v_record_id_update(j);
            
            End Loop;
         End If;
         /* update tb req*/
         Update rpt_user_mgt_request user_bi_req
         Set    user_bi_req.record_status  = 'C',
                user_bi_req.request_remark = 'User deleted from AD',
                user_bi_req.last_oper_date = Sysdate,
                user_bi_req.last_oper_id   = 'SYSTEM'
         Where  user_bi_req.request_staff_id = j.user_system
         And    user_bi_req.record_status = 'O' Return
          user_bi_req.request_id Bulk Collect Into
          v_record_req_id_update;
      
         If v_record_req_id_update.count > 0 Then
            For j In 1 .. v_record_req_id_update.count Loop
               /* insert log req table*/
               v_id_insert := fn_input_id('rpt_user_mgt_request_log',
                                          'LOG_ID');
               Insert Into rpt_user_mgt_request_log
                  (log_id,
                   event_log,
                   mod_no,
                   request_id,
                   request_staff_id,
                   request_name,
                   request_email,
                   request_position,
                   branch_code,
                   branch_name,
                   request_date,
                   request_remark,
                   record_status,
                   maker_id,
                   create_date,
                   last_oper_id,
                   last_oper_date,
                   ticket_on_helpdesk)
                  Select v_id_insert,
                         'CLOSE',
                         log.mod_no + 1,
                         log.request_id,
                         log.request_staff_id,
                         log.request_name,
                         log.request_email,
                         log.request_position,
                         log.branch_code,
                         log.branch_name,
                         log.request_date,
                         log.request_remark,
                         log.record_status,
                         log.maker_id,
                         log.create_date,
                         log.last_oper_id,
                         last_oper_date,
                         log.ticket_on_helpdesk
                  From   rpt_user_mgt_request log
                  Where  log.request_id = v_record_req_id_update(j);
            
            End Loop;
         End If;
      
      End If;
   
   End Loop;
   p_statuscount := to_char(v_count_staff_resign +
                            v_count_staff_remove_from_ad);
   /*Select Count(*)
   Into   p_statuscount
   From   rpt_user_mgt_user_system bi
   Where  bi.record_status = 'C'
   And    bi.last_oper_id = 'SYSTEM'
   And    to_char(bi.last_oper_date, 'MON-YYYY') =
          to_char(Sysdate, 'MON-YYYY')
   And    bi.user_status = 'CLOSE';*/

   op_status  := '1';
   op_message := 'User resigned (AD close) => (' || v_user_resign_update ||
                 '), User remove from AD (' ||
                 v_user_remove_from_ad_update || ')';
   If v_user_resign_update Is Null And
      v_user_remove_from_ad_update Is Null Then
      op_message := 'No! User found for update';
   End If;
   /* commit;*/
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End update_bi_user_status;

Procedure update_bi_user_email(p_statuscount Out Varchar2,
                               op_status     Out Varchar2,
                               op_message    Out Clob) As

   v_check            Number := 0;
   v_statuscount      Number := 0;
   v_row_update_count Number := 0;
   Type user_id_arr Is Varray(2000) Of Varchar2(30);
   v_staff_ids_update user_id_arr;
   v_staff_ids_string Clob := '';
Begin
   Select Count(uad.user_id)
   Into   v_check
   From   current_ad_users uad
   Inner  Join (Select Distinct Trim(requser.request_staff_id) As userid,
                                requser.request_email
                From   rpt_user_mgt_request requser
                Where  requser.record_status = 'O') umgt
   On     uad.user_id = umgt.userid
   Where  uad.email <> umgt.request_email;

   If v_check > 0 Then
      For i In (Select *
                From   current_ad_users uad
                Inner  Join (Select Distinct Trim(requser.request_staff_id) As userid,
                                            requser.request_email
                            From   rpt_user_mgt_request requser
                            Where  requser.record_status = 'O') umgt
                On     uad.user_id = umgt.userid
                Where  uad.email <> umgt.request_email) Loop
         Update rpt_user_mgt_request bi
         Set    bi.request_email = i.email
         Where  Trim(bi.request_staff_id) = Trim(i.user_id)
         And    bi.record_status = 'O'
         Returning bi.request_staff_id Bulk Collect Into v_staff_ids_update;
         /* Get row update*/
         v_row_update_count := Sql%Rowcount;
         /* Count all row update*/
         v_statuscount := v_statuscount + v_row_update_count;
         /* Get msg*/
         If v_staff_ids_update.count > 0 Then
            For j In 1 .. v_staff_ids_update.count Loop
               v_staff_ids_string := v_staff_ids_string ||
                                     v_staff_ids_update(j) || ', ';
            End Loop;
         End If;
      
      End Loop;
   
      p_statuscount := to_char(v_statuscount);
      op_status     := '1';
      op_message    := 'Process update complete => (' ||
                       v_staff_ids_string || ')';
   Else
      op_status     := '1';
      op_message    := 'No user to update email!';
      p_statuscount := '0';
   End If;
   /*Commit;*/
   /*todo: Uncomment*/
Exception
   When no_data_found Then
      op_status  := '-1';
      op_message := 'No data found.';
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End update_bi_user_email;

Procedure update_pull_last_login_bi_user(p_status_count Out Varchar2,
                                         op_status      Out Varchar2,
                                         op_message     Out Clob) As

   v_auto_id               Number := 0;
   v_check                 Number := 0;
   v_count_pull_login_user Number := 0;
   v_count_last_login      Number := 0;
Begin
   /* backup old data and clear tmp data*/
   Begin
      /* insert old last login to table history*/
      Insert Into rpt_bip_tmp_user_lastlogin_history
         (Select l.userid, l.last_login, l.last_date, l.rpt_date, Sysdate
          From   rpt_bip_tmp_user_lastlogin l);
      /* delete old tmp last login*/
      Delete From rpt_bip_tmp_user_lastlogin;
   
      Commit;
   End;
   /* verify*/
   Select Count(*) Into v_check From rpt_bip_tmp_user_lastlogin;
   /* Start insert new last login user into tmp table*/
   If v_check = 0 Then
      dbms_output.put_line('Start insert new tmp last login');
      Begin
         Insert Into rpt_bip_tmp_user_lastlogin
            Select Distinct t.userid,
                            Max(t.last_login),
                            to_date(to_char(Max(t.last_login), 'yyyymmdd'),
                                    'yyyymmdd') As last_day,
                            Sysdate
            From   (Select tb_lg.user_id         As userid,
                           tb_lg.last_login_date As last_login
                    From   tmp_tb_bi_user_last_login tb_lg
                    /*SELECT A.IAU_INITIATOR AS USERID, MAX(A.IAU_TSTZORIGINATING)AS LAST_LOGIN
                    FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDC A
                    WHERE A.IAU_EVENTTYPE = 'UserLogin'
                       AND A.IAU_EVENTSTATUS = 1
                    GROUP BY A.IAU_INITIATOR
                    UNION
                    ALL
                    SELECT B.IAU_INITIATOR AS USERID, MAX(B.IAU_TSTZORIGINATING)AS LAST_LOGIN
                    FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDR B
                    WHERE B.IAU_EVENTTYPE = 'UserLogin'
                       AND B.IAU_EVENTSTATUS = 1
                    GROUP BY B.IAU_INITIATOR*/
                    ) t
            Group  By t.userid
            Order  By Max(t.last_login)
            /* todo: uncomment*/
            ;
         /* get total row that have insert ==> total user login*/
         v_count_pull_login_user := v_count_pull_login_user + Sql%Rowcount;
         dbms_output.put_line(v_count_pull_login_user);
      End;
   
   End If;
   /* this step can be keep*/
   /*3 get tmp last login on old bi*/
   /*insert into rpt_bip_tmp_user_lastlogin
   select * from rpt_bip_tmp_user_lastlogin_old;*/
   /* end pull last login*/
   /* start process get user inactive*/
   Delete From rpt_bip_iau_house_keeping_pre;

   Commit;
   Select Count(*) Into v_check From rpt_bip_iau_house_keeping_pre;
   /* insert log from audit log table by using viwe to pre table*/
   If v_check = 0 Then
      dbms_output.put_line('Insert new tmp rpt_bip_iau_house_keeping_pre');
      Begin
         Insert Into rpt_bip_iau_house_keeping_pre a
            Select Distinct tb.user_id,
                            tb.description,
                            tb.last_login_date,
                            tb.day_count_last_login,
                            tb.report_date,
                            tb.date_created,
                            to_char(Sysdate, 'DD-MON-YYYY') "INSERTED_DATE"
            /*From rpt_bip_vw_iau_house_keeping b;*/
            From   (Select Distinct b.user_id,
                                    b.description,
                                    b.last_login_date,
                                    b.day_count_last_login,
                                    b.report_date,
                                    b.date_created,
                                    to_char(Sysdate, 'DD-MON-YYYY') "INSERTED_DATE"
                    /* FROM RPT_BIP_VW_IAU_HOUSE_KEEPING B;*/
                    From   (Select all_users.user_id,
                                   all_users.description,
                                   to_char(max_date.maxdate,
                                           'dd-MON-yyyy HH24:MI:ss') last_login_date,
                                   to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                               -1)),
                                                           'yyyymmdd'),
                                                   'yyyymmdd') -
                                           to_date(to_char(max_date.maxdate,
                                                           'yyyymmdd'),
                                                   'yyyymmdd')) As day_count_last_login,
                                   to_char(last_day(add_months(Sysdate, -1)),
                                           'dd-MON-yyyy') As report_date,
                                   to_date(to_char(all_users.date_created,
                                                   'yyyymmdd'),
                                           'yyyymmdd') As date_created,
                                   'DC' As bi_site
                            From   (
                                    /*SELECT UPPER(A.IAU_INITIATOR)USER_ID, MAX(A.IAU_TSTZORIGINATING)MAXDATE
                                    FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDC A
                                    WHERE A.IAU_EVENTSTATUS = '1'
                                    GROUP BY A.IAU_INITIATOR*/
                                    Select tb_lg.user_id,
                                            tb_lg.last_login_date maxdate
                                    From   tmp_tb_bi_user_last_login tb_lg) max_date
                            Right  Join (Select upper(umr.request_staff_id) As user_id,
                                               umr.branch_name As description,
                                               Case
                                                  When remark =
                                                       'USER MIGRATION TO STAFF ID' Then
                                                   umr.request_date
                                                  Else
                                                   ums.effective_date
                                               End date_created
                                        From   rpt_user_mgt_user_system ums
                                        Inner  Join rpt_user_mgt_request umr
                                        On     ums.request_id =
                                               umr.request_id
                                        Where  ums.record_status = 'O'
                                        And    ums.user_status <> 'CLOSE'
                                        And    upper(ums.user_system) Not In
                                               ('ORACLEWL', 'HO_TRN')
                                        And    ums.system_name = 'BI') all_users
                            On     max_date.user_id = all_users.user_id
                            /*Union
                            Select all_users.user_id,
                                   all_users.description,
                                   to_char(max_date.maxdate,
                                           'dd-MON-yyyy HH24:MI:ss') last_login_date,
                                   to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                               -1)),
                                                           'yyyymmdd'),
                                                   'yyyymmdd') -
                                           to_date(to_char(max_date.maxdate,
                                                           'yyyymmdd'),
                                                   'yyyymmdd')) As day_count_last_login,
                                   to_char(last_day(add_months(Sysdate, -1)),
                                           'dd-MON-yyyy') As report_date,
                                   to_date(to_char(all_users.date_created,
                                                   'yyyymmdd'),
                                           'yyyymmdd') As date_created,
                                   'DR' As bi_site
                              From (
                                    \* SELECT UPPER(A.IAU_INITIATOR)USER_ID, MAX(A.IAU_TSTZORIGINATING)MAXDATE
                                    FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDR A
                                    WHERE A.IAU_EVENTSTATUS = '1'
                                    GROUP BY A.IAU_INITIATOR*\
                                    Select tb_lg.user_id,
                                            tb_lg.last_login_date maxdate
                                      From tmp_tb_bi_user_last_login tb_lg) max_date
                             Right Join (Select upper(umr.request_staff_id) As user_id,
                                               umr.branch_name As description,
                                               Case
                                                 When remark =
                                                      'USER MIGRATION TO STAFF ID' Then
                                                  umr.request_date
                                                 Else
                                                  ums.effective_date
                                               End date_created
                                          From rpt_user_mgt_user_system ums
                                         Inner Join rpt_user_mgt_request umr
                                            On ums.request_id = umr.request_id
                                         Where ums.record_status = 'O'
                                           And ums.user_status <> 'CLOSE'
                                           And upper(ums.user_system) Not In
                                               ('ORACLEWL', 'HO_TRN')
                                           And ums.system_name = 'BI') all_users
                                On max_date.user_id = all_users.user_id*/
                            ) b) tb;
      
         Commit;
      End;
   
   End If;
   /* delete from house keeping table on the inserted date*/
   /* if we process more than 1 time*/
   Begin
      Delete From rpt_bip_iau_tbl_house_keeping
      Where  to_char(inserted_date, 'DD-MON-YYYY') =
             to_char(Sysdate, 'DD-MON-YYYY');
   
      Commit;
   End;
   /* insert user inactive into table bi housekeeping*/
   Begin
      For a In (Select Distinct user_id,
                                description,
                                last_login_date,
                                day_count_last_login,
                                inserted_date,
                                report_date,
                                date_created
                From   rpt_bip_iau_house_keeping_pre a
                Where  to_date(a.last_login_date, 'DD/MON/YYYY HH24:MI:SS') =
                       (Select Max(to_date(b.last_login_date,
                                           'DD/MON/YYYY HH24:MI:SS'))
                        From   rpt_bip_iau_house_keeping_pre b
                        Where  b.user_id = a.user_id)
                And    a.day_count_last_login >= 90
                And    a.inserted_date = to_char(Sysdate, 'DD-MON-YYYY')) Loop
         v_auto_id := fn_input_id('rpt_bip_iau_tbl_house_keeping', 'id');
         Insert Into rpt_bip_iau_tbl_house_keeping
            (user_id,
             description,
             last_login_date,
             day_count_last_login,
             report_date,
             date_created,
             inserted_date,
             id,
             status)
         Values
            (a.user_id,
             a.description,
             a.last_login_date,
             a.day_count_last_login,
             a.report_date,
             a.date_created,
             a.inserted_date,
             v_auto_id,
             'O');
      
         v_count_last_login := v_count_last_login + Sql%Rowcount;
      End Loop;
   End;
   /* insert null last login to house keeping table*/
   Begin
      For a In (Select Distinct a.user_id,
                                a.description,
                                a.last_login_date,
                                to_date(to_char(last_day(add_months(Sysdate,
                                                                    -1)),
                                                'YYYYMMDD'),
                                        'YYYYMMDD') -
                                to_date(to_char(a.date_created, 'YYYYMMDD'),
                                        'YYYYMMDD') As day_count_last_login,
                                a.report_date,
                                a.date_created,
                                a.inserted_date
                From   rpt_bip_iau_house_keeping_pre a
                Where  a.last_login_date Is Null
                /*AND UPPER(A.USER_ID) NOT IN
                    (SELECT UPPER(USER_ID)
                       FROM RPT_BIP_IAU_TBL_HOUSE_KEEPING M
                      WHERE M.INSERTED_DATE =
                            TO_CHAR(SYSDATE, 'DD-MON-YYYY'))
                AND (SELECT COUNT(P.USER_ID)
                       FROM RPT_BIP_IAU_HOUSE_KEEPING_PRE P
                     WHERE P.USER_ID = A.USER_ID) >= 1
                AND TO_DATE(TO_CHAR(LAST_DAY(ADD_MONTHS(SYSDATE, -1)),
                                    'YYYYMMDD'),
                            'YYYYMMDD') -
                    TO_DATE(TO_CHAR(A.DATE_CREATED, 'YYYYMMDD'),
                           'YYYYMMDD') >= 90
                AND A.INSERTED_DATE = TO_CHAR(SYSDATE, 'DD-MON-YYYY')*/
                ) Loop
         v_auto_id := fn_input_id('rpt_bip_iau_tbl_house_keeping', 'id');
         Insert Into rpt_bip_iau_tbl_house_keeping
            (user_id,
             description,
             last_login_date,
             day_count_last_login,
             report_date,
             date_created,
             inserted_date,
             id,
             status)
         Values
            (a.user_id,
             a.description,
             a.last_login_date,
             a.day_count_last_login,
             a.report_date,
             a.date_created,
             a.inserted_date,
             v_auto_id,
             'O');
      
         v_count_last_login := v_count_last_login + Sql%Rowcount;
      End Loop;
   End;

   Commit;
   p_status_count := v_count_pull_login_user;
   op_status      := '1';
   op_message     := 'Insert Last Login succeed';
   dbms_output.put_line('record insert :' || p_status_count);
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End update_pull_last_login_bi_user;

Procedure get_report_housekeeping(p_user               In Varchar2,
                                  p_debug              In Varchar2 Default 'NN',
                                  p_date               In Date,
                                  p_type_process       In Varchar2,
                                  op_data_housekeeping Out ref_cur1,
                                  op_count             Out Number,
                                  op_status            Out Varchar2,
                                  op_message           Out Clob) As
   tmp_housekeeping ref_cur1;
Begin
   dg_init(p_user, p_debug);
   /* update last login to bi user*/
   If lower(p_type_process) = lower('getReport') Then
      For i In (Select a.userid,
                       a.last_login,
                       a.last_date,
                       Case
                          When sp.create_date > a.last_date Then
                           to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                       -1)),
                                                   'yyyymmdd'),
                                           'yyyymmdd') -
                                   to_date(to_char(sp.create_date,
                                                   'yyyymmdd'),
                                           'yyyymmdd'))
                          Else
                           to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                       -1)),
                                                   'yyyymmdd'),
                                           'yyyymmdd') -
                                   to_date(to_char(a.last_date, 'yyyymmdd'),
                                           'yyyymmdd'))
                       End As day_count
                From   rpt_bip_tmp_user_lastlogin a
                Inner  Join rpt_user_mgt_user_system sp
                On     sp.user_system = a.userid
                And    sp.record_status <> 'C'
                Where  to_date(a.last_login, 'DD/MON/YYYY HH24:MI:SS') =
                       (Select Max(to_date(c.last_login,
                                           'DD/MON/YYYY HH24:MI:SS'))
                        From   rpt_bip_tmp_user_lastlogin c
                        Where  c.userid = a.userid)) Loop
         Update rpt_bip_iau_tbl_house_keeping u
         Set    u.last_login_date      = i.last_login,
                u.day_count_last_login = i.day_count
         Where  to_char(inserted_date, 'DD-MON-YYYY') =
                to_char(Sysdate, 'DD-MON-YYYY')
         And    u.user_id = i.userid;
      
         Commit;
      End Loop;
   
   End If;

   Open tmp_housekeeping For
      Select Distinct rownum As id, tb.*
      From   (Select Distinct Case
                                 When ad.branchid = 'Head Office' Then
                                  '000'
                                 Else
                                  ad.branchid
                              End As brn_code,
                              a.user_id,
                              ad.fullname As user_name,
                              to_char(a.date_created, 'DD-MON-YY') As created_date,
                              coalesce(to_char(a.last_login_date), 'N/A') As last_login_date,
                              a.day_count_last_login,
                              to_char(to_date(a.report_date, 'dd-MON-YYYY'),
                                      'DD-MON-YY') As report_date,
                              to_char(a.inserted_date, 'DD-MON-YY') As reviewed_date,
                              Case
                                 When a.day_count_last_login Between 90 And 119 Then
                                  'INFORM'
                                 Else
                                  'REMOVE'
                              End As remarks,
                              nvl(step.auth_status, 'U') As status,
                              a.inserted_date
              From   rpt_bip_iau_tbl_house_keeping a
              Inner  Join rpt_user_mgt_user_system us
              On     Trim(a.user_id) = Trim(us.user_system)
              And    us.system_name = 'BI'
              And    us.record_status = 'O'
              Left   Join (Select Case
                                    When Sum(Case
                                                When rev_app.auth_status = 'U' Then
                                                 1
                                                Else
                                                 0
                                             End) > 0 Then
                                     'U'
                                    Else
                                     'A'
                                 End As auth_status,
                                 rev_app.report_date
                          From   rpt_iau_rev_app rev_app
                          Where  rev_app.step_id In (3, 4)
                          Group  By rev_app.report_date) step
              On     to_char(step.report_date, 'MON-YYYY') =
                     to_char(p_date, 'MON-YYYY')
              Inner  Join smtb_employee ad
              On     ad.employeeid = a.user_id
              Where  to_char(a.inserted_date, 'MON-YYYY') =
                     to_char(add_months(p_date, 1), 'MON-YYYY')
              And    a.day_count_last_login >= 90
              And    us.record_status = 'O'
              Order  By remarks) tb;

   Select Distinct Count(a.user_id)
   Into   op_count
   From   rpt_bip_iau_tbl_house_keeping a
   Inner  Join rpt_user_mgt_user_system us
   On     Trim(a.user_id) = Trim(us.user_system)
   And    us.system_name = 'BI'
   And    us.record_status = 'O'
   Left   Join rpt_iau_process_step step
   On     to_char(a.inserted_date, 'MON-YYYY') =
          to_char(add_months(step.process_date, 1), 'MON-YYYY')
   And    step.step_id = 1
   Left   Join current_ad_users ad
   On     ad.user_id = a.user_id
   Where  to_char(a.inserted_date, 'MON-YYYY') =
          to_char(add_months(p_date, 1), 'MON-YYYY')
   And    a.day_count_last_login >= 90
   And    us.record_status = 'O';

   op_data_housekeeping := tmp_housekeeping;
   op_status            := '1';
   op_message           := 'Get BI Housekeeping Successful';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_report_housekeeping;

Procedure generate_report_bi_housekeeping(p_user                  In Varchar2,
                                          p_debug                 In Varchar2 Default 'NN',
                                          p_from_date             In Date,
                                          p_to_date               In Date,
                                          p_type_used             In Varchar2,
                                          op_data_bi_housekeeping Out ref_cur1,
                                          op_status               Out Varchar2,
                                          op_message              Out Clob) As

   tmp_housekeeping                  ref_cur1;
   op_tmp_status                     Clob;
   op_tmp_status_update_user_status  Clob := '-1';
   op_tmp_status_update_user_email   Clob := '-1';
   op_tmp_status_pull_last_login     Clob := '-1';
   op_tmp_message                    Clob;
   op_tmp_message_update_user_status Clob := 'No Error found';
   op_tmp_message_update_user_email  Clob := 'No Error found';
   op_tmp_message_pull_last_login    Clob := 'No Error found';
   tmp_statuscount_update_status     Number := 0;
   tmp_statuscount_update_user_email Number := 0;
   tmp_statuscount_pull_last_login   Number := 0;
   tmp_count                         Number := 0;
   /*tmp_date                          varchar2(15) := to_char(p_from_date,
   'DD-MON-YYYY');*/
Begin
   dg_init(p_user, p_debug);
   If upper(p_type_used) = upper('getReport') Then
      /* process*/
      Begin
         update_bi_user_status(tmp_statuscount_update_status,
                               op_tmp_status_update_user_status,
                               op_tmp_message_update_user_status);
         update_bi_user_email(tmp_statuscount_update_user_email,
                              op_tmp_status_update_user_email,
                              op_tmp_message_update_user_email);
         update_pull_last_login_bi_user(tmp_statuscount_pull_last_login,
                                        op_tmp_status_pull_last_login,
                                        op_tmp_message_pull_last_login);
      End;
   
      Begin
         /* check and insert if true*/
         /*if op_tmp_status_update_user_status is not null then*/
         pro_insert_process_status(p_user,
                                   1,
                                   op_tmp_status_update_user_status,
                                   tmp_statuscount_update_status,
                                   op_tmp_message_update_user_status,
                                   p_from_date,
                                   op_tmp_status,
                                   op_tmp_message);
         /*end if;*/
         /*insert status update user email*/
         /*if op_tmp_status_update_user_email is not null then*/
         pro_insert_process_status(p_user,
                                   2,
                                   op_tmp_status_update_user_email,
                                   tmp_statuscount_update_user_email,
                                   op_tmp_message_update_user_email,
                                   p_to_date,
                                   op_tmp_status,
                                   op_tmp_message);
         /*end if;*/
         /*insert status pull last login*/
         /*if op_tmp_status_pull_last_login is not null then*/
         pro_insert_process_status(p_user,
                                   3,
                                   op_tmp_status_pull_last_login,
                                   tmp_statuscount_pull_last_login,
                                   op_tmp_message_pull_last_login,
                                   p_from_date,
                                   op_tmp_status,
                                   op_tmp_message);
         /*end if;*/
      End;
      /* get report bi housekeeping*/
      Begin
         get_report_housekeeping(p_user,
                                 p_debug,
                                 p_from_date,
                                 'getReport',
                                 tmp_housekeeping,
                                 tmp_count,
                                 op_tmp_status,
                                 op_tmp_message);
      
         If tmp_count = 0 Then
            /* handle the case when the cursor doesn't have any data*/
            op_status               := '-1';
            op_message              := 'no data found for bi housekeeping.';
            op_data_bi_housekeeping := Null;
            /* or assign any default value*/
         Else
            /* Cursor has data, assign it to the output variable*/
            op_data_bi_housekeeping := tmp_housekeeping;
         End If;
         /* insert status process get report bi housekeeping*/
         If op_tmp_status Is Not Null Then
            /*todo*/
            pro_insert_process_status(p_user,
                                      4,
                                      op_tmp_status,
                                      tmp_count,
                                      op_tmp_message,
                                      p_from_date,
                                      op_tmp_status,
                                      op_tmp_message);
         End If;
      
      End;
      /* used for get listing*/
   Elsif upper(p_type_used) = upper('getReportListing') Then
      get_report_housekeeping(p_user,
                              p_debug,
                              p_from_date,
                              'getReportListing',
                              tmp_housekeeping,
                              tmp_count,
                              op_tmp_status,
                              op_tmp_message);
   
      op_data_bi_housekeeping := tmp_housekeeping;
   Else
      op_status  := '-1';
      op_message := 'invalid type';
   End If;

   op_status  := '1';
   op_message := 'get bi housekeeping successful';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End generate_report_bi_housekeeping;

Procedure report_deletion(p_user     In Varchar2,
                          p_debug    In Varchar2 Default 'NN',
                          p_date     In Date,
                          op_status  Out Varchar2,
                          op_message Out Clob) As
   v_check        Number(5);
   v_updated_rows Number(5);
Begin
   dg_init(p_user, p_debug);
   Select Count(*)
   Into   v_check
   From   sp_user_close_pre c
   Where  to_char(c.report_dt, 'MON-YYYY') = p_date
   And    upper(c.user_id) In
          (Select upper(us.user_system)
            From   rpt_user_mgt_user_system us
            Where  us.system_name = 'BI'
            And    us.record_status <> 'D');

   If v_check <> 0 Then
      Update rpt_user_mgt_user_system us
      Set    us.record_status  = 'C',
             us.user_status    = 'CLOSE',
             us.effective_date = Sysdate,
             us.last_oper_id   = 'SYSTEM',
             us.last_oper_date = Sysdate,
             us.remark         = 'User Inactive'
      Where  us.record_status = 'O'
      And    us.system_name = 'BI'
      And    upper(us.user_system) In
             (Select p.user_id
               From   sp_user_close_pre p
               Where  to_char(p.report_dt, 'MON-YYYY') = p_date)
      Returning Count(*) Into v_updated_rows;
   
      Commit;
      op_status  := '1';
      op_message := 'Update deletion successful';
   Else
      op_status  := '-1';
      op_message := 'Update deletion failed';
   End If;

End report_deletion;

Procedure get_report_deletion(p_user            In Varchar2,
                              p_debug           In Varchar2 Default 'NN',
                              p_date            In Date,
                              op_data_detection Out ref_cur1,
                              op_status         Out Varchar2,
                              op_message        Out Clob) As

   tmp_delection_report ref_cur1;
   tmp_status           Varchar2(5) := '-1';
   tmp_message          Clob := '';
   v_count_status_log   Number := 0;
Begin
   Begin
   
      close_user_bi_inactive(p_user,
                             p_debug,
                             p_date,
                             tmp_status,
                             tmp_message);
      dbms_output.put_line('call update user inactive :' || tmp_status ||
                           tmp_message);
   End;
   If tmp_status = '1' Then
      Open tmp_delection_report For
         Select row_number() over(Order By 10 Asc) no, z.*
         From   (Select r.branch_code As brn_code,
                        Case
                           When r.branch_code = '000' Then
                            ep.jobtitle
                           Else
                            ep.branchid
                        End As branch_name,
                        us.user_system As user_id,
                        upper(r.request_name) As user_name,
                        r.request_position As position,
                        to_char(r.request_date, 'dd-MON-YYYY') As request_date,
                        to_char(us.create_date, 'dd-MON-YYYY') As create_date,
                        to_char(us.last_oper_date, 'dd-MON-YYYY') As close_date,
                        Case
                           When us.record_status = 'C' Then
                            'CLOSE'
                           Else
                            us.record_status
                        End As status,
                        Case
                           When us.remark Is Null Then
                            ''
                           Else
                            us.remark
                        End As remark
                 From   rpt_user_mgt_user_system us
                 Inner  Join rpt_user_mgt_request r
                 On     r.request_id = us.request_id
                 Left   Join smtb_employee ep
                 On     r.request_staff_id = ep.sidcard
                 Where  upper(to_char(add_months(trunc(us.last_oper_date),
                                                 -1),
                                      'MON-YYYY')) =
                        upper(to_char(p_date, 'MON-YYYY'))
                 And    us.last_oper_id = 'SYSTEM'
                 And    us.record_status = 'C'
                 And    r.record_status = 'C'
                 And    us.user_system = r.request_staff_id
                 And    us.system_name = 'BI') z
         Order  By z.remark Asc;
   
   End If;
   /*Insert status log*/
   Begin
      Select Count(*)
      Into   v_count_status_log
      From   rpt_user_mgt_user_system us
      Inner  Join rpt_user_mgt_request r
      On     r.request_id = us.request_id
      Left   Join smtb_employee ep
      On     r.request_staff_id = ep.sidcard
      Where  upper(to_char(add_months(trunc(us.last_oper_date), -1),
                           'MON-YYYY')) =
             upper(to_char(p_date, 'MON-YYYY'))
      And    us.last_oper_id = 'SYSTEM'
      And    us.record_status = 'C'
      And    r.record_status = 'C'
      And    us.user_system = r.request_staff_id
      And    us.system_name = 'BI';
   
      pro_insert_process_status(p_user,
                                5,
                                '1',
                                v_count_status_log,
                                'Bi deletion',
                                p_date,
                                tmp_status,
                                tmp_message);
      dbms_output.put_line('insert process status :' || tmp_status ||
                           tmp_message);
   End;

   If tmp_status = '1' Then
      op_data_detection := tmp_delection_report;
      op_status         := '1';
      op_message        := 'success';
   Else
      op_status  := '-1';
      op_message := 'Failed';
   End If;

Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_report_deletion;

Procedure close_user_bi_inactive(p_user        In Varchar2,
                                 p_debug       In Varchar2 Default 'NN',
                                 p_date_report Date,
                                 op_status     Out Varchar2,
                                 op_message    Out Clob) As

   count_user_close Number := 0;
   row_update       Number := 0;
   user_id_count    Number := 0;
   p_message        Clob := 'no message fount! (defualt message)';
   v_user_id_update Clob := '';
   Type user_sys_id_arr Is Varray(2000) Of Varchar2(10);
   v_record_id_update     user_sys_id_arr;
   v_record_req_id_update user_sys_id_arr;
   v_id_insert            Number := 0;
Begin
   dg_init(p_user, p_debug);
   Select Count(*)
   Into   count_user_close
   From   rpt_bip_iau_tbl_house_keeping b
   Where  to_char(add_months(b.inserted_date, -1), 'MON-YYYY') =
          to_char(p_date_report, 'MON-YYYY')
   And    b.day_count_last_login >= 120;
   --insert into table close
   Begin
      Insert Into sp_user_close_pre_new
         (user_id, type_close, report_dt)
         (Select b.user_id, 'User Inactive', b.report_date
          From   rpt_bip_iau_tbl_house_keeping b
          Where  to_char(add_months(b.inserted_date, -1), 'MON-YYYY') =
                 to_char(p_date_report, 'MON-YYYY')
          And    b.day_count_last_login >= 120);
   
      Commit;
   End;
   /* check data in bi hkp and record insert is same or not*/
   If count_user_close > 0 Then
      For i In (Select Trim(b.user_id) As user_id
                From   sp_user_close_pre_new b
                Where  lower(to_char(b.report_dt, 'MON-YYYY')) =
                       lower(to_char(p_date_report, 'MON-YYYY'))) Loop
         /*update record by id*/
         Update rpt_user_mgt_user_system us
         Set    us.record_status  = 'C',
                us.user_status    = 'CLOSE',
                us.last_oper_id   = 'SYSTEM',
                us.last_oper_date = Sysdate,
                us.remark         = 'User Inactive'
         Where  us.record_status = 'O'
         And    us.system_name = 'BI'
         And    Trim(us.user_system) = i.user_id Return
          us.request_id Bulk Collect Into v_record_id_update;
      
         Update rpt_user_mgt_request user_bi_req
         Set    user_bi_req.record_status  = 'C',
                user_bi_req.request_remark = 'User Inactive',
                user_bi_req.last_oper_date = Sysdate,
                user_bi_req.last_oper_id   = 'SYSTEM'
         Where  user_bi_req.request_staff_id = i.user_id
         And    user_bi_req.record_status = 'O' Return
          user_bi_req.request_id Bulk Collect Into
          v_record_req_id_update;
         /*count record effect*/
         row_update := row_update + to_number(Sql%Rowcount);
         If i.user_id Is Not Null And to_number(Sql%Rowcount) = 1 Then
            user_id_count    := user_id_count + 1;
            v_user_id_update := v_user_id_update || (Case
                                   When v_user_id_update Is Null Then
                                    i.user_id
                                   Else
                                    ''
                                End) || Case
                                   When v_user_id_update Is Not Null Then
                                    ',' || i.user_id
                                   Else
                                    ''
                                End;
         
         End If;
      
      End Loop;
   
      If v_record_id_update.count > 0 Then
         For j In 1 .. v_record_id_update.count Loop
            /*  insert log*/
            v_id_insert := fn_input_id('RPT_USER_MGT_USER_SYSTEM_LOG',
                                       'LOG_ID');
            Insert Into rpt_user_mgt_user_system_log
               (log_id,
                event_log,
                mod_no,
                request_id,
                id,
                user_system,
                system_name,
                role_id,
                host_id,
                service_run,
                verify_date,
                effective_date,
                user_status,
                remark,
                record_status,
                maker_id,
                create_date,
                last_oper_id,
                last_oper_date)
               Select v_id_insert,
                      'CLOSE' As event_log,
                      u.mod_no + 1 As mod_no,
                      u.request_id,
                      u.id,
                      u.user_system,
                      u.system_name,
                      u.role_id,
                      u.host_id,
                      u.service_run,
                      u.verify_date,
                      u.effective_date,
                      u.user_status,
                      u.remark,
                      u.record_status,
                      u.maker_id,
                      u.create_date,
                      u.last_oper_id,
                      u.last_oper_date
               From   rpt_user_mgt_user_system u
               Where  u.id = v_record_id_update(j);
         
         End Loop;
      
      End If;
   
      If v_record_id_update.count > 0 Then
         For j In 1 .. v_record_id_update.count Loop
            /*  insert log*/
            v_id_insert := fn_input_id('RPT_USER_MGT_USER_SYSTEM_LOG',
                                       'LOG_ID');
            Insert Into rpt_user_mgt_user_system_log
               (log_id,
                event_log,
                mod_no,
                request_id,
                id,
                user_system,
                system_name,
                role_id,
                host_id,
                service_run,
                verify_date,
                effective_date,
                user_status,
                remark,
                record_status,
                maker_id,
                create_date,
                last_oper_id,
                last_oper_date)
               Select v_id_insert,
                      'CLOSE' As event_log,
                      u.mod_no + 1 As mod_no,
                      u.request_id,
                      u.id,
                      u.user_system,
                      u.system_name,
                      u.role_id,
                      u.host_id,
                      u.service_run,
                      u.verify_date,
                      u.effective_date,
                      u.user_status,
                      u.remark,
                      u.record_status,
                      u.maker_id,
                      u.create_date,
                      u.last_oper_id,
                      u.last_oper_date
               From   rpt_user_mgt_user_system u
               Where  u.id = v_record_id_update(j);
         
         End Loop;
      End If;
   
   Else
      op_status := '1';
      p_message := 'No user for close';
   End If;
   /*If row_update = user_id_count Then*/
   p_message := 'update ' || user_id_count || ' user id (' || row_update || ')';
   /*Else
     p_message := 'row count: ' || to_char(row_update) || ' loop count: ' ||
                  to_char(user_id_count) || ' user-id count: ' ||
                  user_id_count || 'user-id' || v_user_id_update;
   End If;*/
   Commit;
   /*BEGIN
     pro_insert_process_status(p_user,
                               107,
                               '1',
                               row_update,
                               p_message,
                               
                               p_date_report,
                               
                               tmp_status,
                               tmp_message);
   END;*/
   op_status  := '1';
   op_message := p_message;
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End close_user_bi_inactive;

Procedure get_bi_user_inactive(p_date_report   In Date,
                               op_data_bi_user Out ref_cur1,
                               op_status       Out Varchar2,
                               op_message      Out Clob) As
   tmp_bi_user ref_cur1;
Begin
   Open tmp_bi_user For
      Select (Case
                When ad.office = 'Head Office' Then
                 '000'
                Else
                 ad.office
             End) As brn_code,
             a.user_id,
             ad.display_name,
             Case
                When a.day_count_last_login >= 120 Then
                 'Inactive user'
                Else
                 'Inform'
             End remarks,
             to_char(a.inserted_date, 'dd-MON-YYYY') reviewed_date
      From   rpt_bip_iau_tbl_house_keeping a
      Inner  Join current_ad_users ad
      On     a.user_id = ad.user_id
      Where  to_char(a.inserted_date, 'MON-YYYY') =
             to_char(add_months(p_date_report, +1), 'MON-YYYY')
      And    a.day_count_last_login >= 120;

   op_data_bi_user := tmp_bi_user;
   op_status       := '1';
   op_message      := 'Get deletion successful';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_bi_user_inactive;
/*Procedure pro_insert_process_step(p_user     In Varchar2,
                                  p_step_id  In Varchar2,
                                  p_pro_date In Date,
                                  p_val_text In Varchar2,
                                  op_status  Out Varchar2,
                                  op_message Out Clob) As
  v_check        Number;
  v_auto_id      Number;
  v_max_id       rpt_iau_process_step.id%Type;
  tmp_op_status  Varchar2(10) := '';
  tmp_op_message Clob := '';
Begin
  Select Count(*)
    Into v_check
    From rpt_iau_process_step s
   Where s.id = p_step_id
     And s.process_date = p_pro_date
     And s.record_status = 'O';
  If v_check = 0 Then
  
    --update status step that have complete
    Begin
      -- get max id
      Select nvl((Select Count(*)
                   From rpt_iau_process_step d_log
                  Where to_char(d_log.process_date, 'MON-YYYY') =
                        to_char(to_date(p_pro_date, 'dd-MON-YYYY'),
                                'MON-YYYY')),
                 0)
        Into v_max_id
        From dual;
      If v_max_id > 0 Then
        Update rpt_iau_process_step st
           Set st.auth_status = 'A'
         Where to_char(st.process_date, 'MON-YYYY') =
               to_char(to_date(p_pro_date, 'dd-MON-YYYY'), 'MON-YYYY')
           And st.step_id Not In (3, 4)
           And to_number(st.step_id) < to_number(p_step_id);
      End If;
    End;
    \*check db hkp if reject update role back to frist step*\
    v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_step',
                                              'id');
    If p_step_id = '7' Then
      Begin
        Rollback;
      End;
      \* Reset step*\
      Update rpt_iau_process_step db_log
         Set db_log.record_status = 'D'
       Where to_char(db_log.process_date, 'MON-YYYY') =
             to_char(to_date(p_pro_date, 'dd-MON-YYYY'), 'MON-YYYY');
      \* Reset status*\
      Update rpt_iau_process_status status_log
         Set status_log.record_status = 'D'
       Where to_char(status_log.insert_date, 'MON-YYYY') =
             to_char(to_date(p_pro_date, 'dd-MON-YYYY'), 'MON-YYYY');
    Else
      Insert Into rpt_iau_process_step
        (id,
         process_date,
         process_by_id,
         last_update_date,
         record_status,
         auth_status,
         step_id)
      Values
        (v_auto_id, p_pro_date, p_user, Sysdate, 'O', 'U', p_step_id);
    End If;
    Commit;
    Case
      When p_step_id In (3) Then
        pro_update_auth_status(user_id       => p_user,
                               p_report_date => p_pro_date,
                               p_step_id     => p_step_id,
                               op_status     => tmp_op_status,
                               op_message    => tmp_op_message);
        If tmp_op_status = '1' Then
          op_status  := '1';
          op_message := 'Reviewed successfully';
        End If;
      When p_step_id In (4) Then
        pro_update_auth_status(user_id       => p_user,
                               p_report_date => p_pro_date,
                               p_step_id     => p_step_id,
                               op_status     => tmp_op_status,
                               op_message    => tmp_op_message);
        If tmp_op_status = '1' Then
          op_status  := '1';
          op_message := 'Approved successfully';
        End If;
      Else
        op_status  := '1';
        op_message := 'Step insert successfully';
    End Case;
  Elsif v_check > 0 Then
    --check update auth status review and approve step
    Begin
      Case
        When p_step_id = 3 Then
          dbms_output.put_line('update auth status');
          pro_update_auth_status(user_id       => p_user,
                                 p_report_date => p_pro_date,
                                 p_step_id     => p_step_id,
                                 op_status     => tmp_op_status,
                                 op_message    => tmp_op_message);
          If tmp_op_status = '1' Then
            op_status  := '1';
            op_message := 'Reviewed successfully';
          End If;
          op_status  := '1';
          op_message := 'Review successfully';
      End Case;
    End;
    Begin
      Case
        When p_step_id Not In (3, 4) Then
          op_status  := '1';
          op_message := 'Step already insert successfully';
      End Case;
    End;
  End If;
  Commit;
Exception
  When Others Then
    Rollback;
    op_status  := '-1';
    op_message := 'error: ' || Sqlerrm || ' -> ' ||
                  dbms_utility.format_error_backtrace;
    dg_print('error: ' || Sqlerrm || ' -> ' ||
             dbms_utility.format_error_backtrace);
End pro_insert_process_step;*/
/*Procedure pro_insert_process_step(p_user     In Varchar2,
                                  p_step_id  In Varchar2,
                                  p_pro_date In Date,
                                  p_val_text In Varchar2,
                                  op_status  Out Varchar2,
                                  op_message Out Clob) As

   v_check                Number;
   v_auto_id              Number;
   v_max_id               rpt_iau_process_step.id%Type;
   tmp_op_status          Varchar2(10) := '';
   tmp_op_message         Clob := '';
   v_auth_count           Number := 0;
   v_auth_status          Varchar2(10);
   v_check_reviewer_count Number := 0;
   v_check_reviewed_count Number := 0;
Begin
   -- Check if the step already exists for the given date
   Select Count(*)
   Into   v_check
   From   rpt_iau_process_step s
   Where  s.id = p_step_id
   And    s.process_date = p_pro_date
   And    s.record_status = 'O';
   dbms_output.put_line('check record: ' || v_check);
   If v_check = 0 Then
      -- Update status for completed steps
      Begin
         -- Get max id
         Select nvl((Select Count(*)
                    From   rpt_iau_process_step d_log
                    Where  to_char(d_log.process_date,
                                   'MON-YYYY') =
                           to_char(to_date(p_pro_date,
                                           'dd-MON-YYYY'),
                                   'MON-YYYY')),
                    0)
         Into   v_max_id
         From   dual;
         dbms_output.put_line('inside update status from U to A : ' ||
                              v_max_id);
         If v_max_id > 0 Then
            Update rpt_iau_process_step st
            Set    st.auth_status = 'A'
            Where  to_char(st.process_date,
                           'MON-YYYY') =
                   to_char(to_date(p_pro_date,
                                   'dd-MON-YYYY'),
                           'MON-YYYY')
            And    st.step_id Not In (3,
                                      4)
            And    to_number(st.step_id) < to_number(p_step_id);
         End If;
      End;
      If p_step_id = 7 Then
         dbms_output.put_line('inside update to rollback when step: ' ||
                              p_step_id);
         -- Reset step and status if rejects 
      
         Update rpt_iau_process_step db_log
         Set    db_log.record_status = 'D'
         Where  to_char(db_log.process_date,
                        'MON-YYYY') =
                to_char(to_date(p_pro_date,
                                'dd-MON-YYYY'),
                        'MON-YYYY');
         Update rpt_iau_process_status status_log
         Set    status_log.record_status = 'D'
         Where  to_char(status_log.insert_date,
                        'MON-YYYY') =
                to_char(to_date(p_pro_date,
                                'dd-MON-YYYY'),
                        'MON-YYYY');
         Commit;
      Elsif p_step_id In (3) Then
         pro_update_auth_status(p_user_id     => p_user,
                                p_report_date => p_pro_date,
                                p_step_id     => p_step_id,
                                op_status     => tmp_op_status,
                                op_message    => tmp_op_message);
      
         If tmp_op_status = '1' Then
            op_status  := '1';
            op_message := 'Reviewed successfully';
         End If;
      Elsif p_step_id In (4) Then
         pro_update_auth_status(p_user_id     => p_user,
                                p_report_date => p_pro_date,
                                p_step_id     => p_step_id,
                                op_status     => tmp_op_status,
                                op_message    => tmp_op_message);
      
         If tmp_op_status = '1' Then
            op_status  := '1';
            op_message := 'Approved successfully';
         End If;
      Elsif p_step_id Not In (3,
                              7) Then
         dbms_output.put_line(' insert step not in 3 and 7: ' ||
                              p_step_id);
         v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_step',
                                                   'id');
         Insert Into rpt_iau_process_step
            (id,
             process_date,
             process_by_id,
             last_update_date,
             record_status,
             auth_status,
             step_id)
         Values
            (v_auto_id,
             p_pro_date,
             p_user,
             Sysdate,
             'O',
             'U',
             p_step_id);
         Commit;
      End If;
   
      \*Begin
         -- Update reviewed step
         If p_step_id In (3) Then
            pro_update_auth_status(p_user_id     => p_user,
                                   p_report_date => p_pro_date,
                                   p_step_id     => p_step_id,
                                   op_status     => tmp_op_status,
                                   op_message    => tmp_op_message);
         
            If tmp_op_status = '1' Then
               op_status  := '1';
               op_message := 'Reviewed successfully';
            End If;
         
         Elsif p_step_id In (4) Then
            pro_update_auth_status(p_user_id     => p_user,
                                   p_report_date => p_pro_date,
                                   p_step_id     => p_step_id,
                                   op_status     => tmp_op_status,
                                   op_message    => tmp_op_message);
         
            If tmp_op_status = '1' Then
               op_status  := '1';
               op_message := 'Approved successfully';
            End If;
         Else
            op_status  := '1';
            op_message := 'Step inserted successfully';
         End If;
      End;*\
   Elsif v_check > 0 Then
      -- Check update auth status review and approve step
      Begin
         If p_step_id = 3 Then
            dbms_output.put_line('update auth status');
            pro_update_auth_status(p_user_id     => p_user,
                                   p_report_date => p_pro_date,
                                   p_step_id     => p_step_id,
                                   op_status     => tmp_op_status,
                                   op_message    => tmp_op_message);
         
            --check review have reviewed all befor insert:
            Select Count(*)
            Into   v_check_reviewer_count
            From   rpt_iau_rev_app a
            Where  a.step_id = 3
            And    to_char(a.report_date,
                           'MON-YYYY') = p_pro_date;
         
            Select Count(*)
            Into   v_check_reviewed_count
            From   rpt_iau_rev_app ra
            Where  ra.step_id = 3
            And    ra.auth_status = 'A'
            And    to_char(ra.report_date,
                           'MON-YYYY') = p_pro_date;
            If v_check_reviewer_count = v_check_reviewed_count Then
               v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_step',
                                                         'id');
               Insert Into rpt_iau_process_step
                  (id,
                   process_date,
                   process_by_id,
                   last_update_date,
                   record_status,
                   auth_status,
                   step_id)
               Values
                  (v_auto_id,
                   p_pro_date,
                   p_user,
                   Sysdate,
                   'O',
                   'U',
                   p_step_id);
               Commit;
               pro_sent_mail_inform_reviewer(p_type_inform => 'app',
                                             p_report_date => p_pro_date,
                                             op_status     => tmp_op_status,
                                             op_message    => tmp_op_message);
            End If;
         End If;
         If tmp_op_status = '1' Then
            op_status  := '1';
            op_message := 'Reviewed successfully';
         End If;
      End;
   
      Begin
         Case
            When p_step_id Not In (3,
                                   4) Then
               op_status  := '1';
               op_message := 'Step already inserted successfully';
            Else
               dbms_output.put_line('step already insert');
         End Case;
      
      End;
   
   End If;

   Commit;
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End pro_insert_process_step;*/
Procedure pro_insert_process_step(p_user     In Varchar2,
                                  p_step_id  In Varchar2,
                                  p_pro_date In Date,
                                  p_val_text In Varchar2,
                                  op_status  Out Varchar2,
                                  op_message Out Clob) As

   v_check                Number;
   v_auto_id              Number;
   v_max_id               rpt_iau_process_step.id%Type;
   tmp_op_status          Varchar2(10) := '';
   tmp_op_message         Clob := '';
   v_auth_count           Number := 0;
   v_auth_status          Varchar2(10);
   v_check_reviewer_count Number := 0;
   v_check_reviewed_count Number := 0;
Begin
   -- Check if the step already exists for the given date
   Select Count(*)
   Into   v_check
   From   rpt_iau_process_step s
   Where  s.step_id = p_step_id
   And    s.process_date = p_pro_date
   And    s.record_status = 'O';
   dbms_output.put_line('check record: ' || v_check);
   If v_check = 0 Then
      -- Update status for completed steps
      Begin
         Select nvl((Select Count(*)
                    From   rpt_iau_process_step d_log
                    Where  to_char(d_log.process_date, 'MON-YYYY') =
                           to_char(p_pro_date, 'MON-YYYY')),
                    0)
         Into   v_max_id
         From   dual;
         dbms_output.put_line('inside update status from U to A : ' ||
                              v_max_id);
         If v_max_id > 0 Then
            Update rpt_iau_process_step st
            Set    st.auth_status = 'A'
            Where  to_char(st.process_date, 'MON-YYYY') =
                   to_char(p_pro_date, 'MON-YYYY')
            And    st.step_id Not In (3, 4)
            And    to_number(st.step_id) < to_number(p_step_id);
         End If;
      End;
   
      Begin
         If p_step_id = 7 Then
            Begin
               dbms_output.put_line('inside update to rollback when step: ' ||
                                    p_step_id);
               -- Reset step and status if rejects
               Update rpt_iau_process_step db_log
               Set    db_log.record_status = 'D'
               Where  to_char(db_log.process_date, 'MON-YYYY') =
                      to_char(p_pro_date, 'MON-YYYY');
               Update rpt_iau_process_status status_log
               Set    status_log.record_status = 'D'
               Where  to_char(status_log.insert_date, 'MON-YYYY') =
                      to_char(p_pro_date, 'MON-YYYY');
               Commit;
            End;
         
         Elsif p_step_id = 3 Then
            dbms_output.put_line('update status from U to A : ' ||
                                 p_step_id);
            pro_update_auth_status(p_user_id     => p_user,
                                   p_report_date => p_pro_date,
                                   p_step_id     => p_step_id,
                                   op_status     => tmp_op_status,
                                   op_message    => tmp_op_message);
            -- Check if review has reviewed all before insert
            Select Count(*)
            Into   v_check_reviewer_count
            From   rpt_iau_rev_app a
            Where  a.step_id = 3
            And    to_char(a.report_date, 'MON-YYYY') =
                   to_char(p_pro_date, 'MON-YYYY');
         
            Select Count(*)
            Into   v_check_reviewed_count
            From   rpt_iau_rev_app ra
            Where  ra.step_id = 3
            And    ra.auth_status = 'A'
            And    to_char(ra.report_date, 'MON-YYYY') =
                   to_char(p_pro_date, 'MON-YYYY');
         
            If v_check_reviewer_count = v_check_reviewed_count Then
               v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_step',
                                                         'id');
               Insert Into rpt_iau_process_step
                  (id,
                   process_date,
                   process_by_id,
                   last_update_date,
                   record_status,
                   auth_status,
                   step_id)
               Values
                  (v_auto_id,
                   p_pro_date,
                   p_user,
                   Sysdate,
                   'O',
                   'U',
                   p_step_id);
               Commit;
               pro_sent_mail_inform_reviewer(p_type_inform => 'app',
                                             p_report_date => p_pro_date,
                                             op_status     => tmp_op_status,
                                             op_message    => tmp_op_message);
            
            End If;
            If tmp_op_status = '1' Then
               op_status  := '1';
               op_message := 'Reviewed successfully';
            End If;
         Elsif p_step_id = 4 Then
            dbms_output.put_line('update status from U to A : ' ||
                                 p_step_id);
            pro_update_auth_status(p_user_id     => p_user,
                                   p_report_date => p_pro_date,
                                   p_step_id     => p_step_id,
                                   op_status     => tmp_op_status,
                                   op_message    => tmp_op_message);
            v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_step',
                                                      'id');
            Insert Into rpt_iau_process_step
               (id,
                process_date,
                process_by_id,
                last_update_date,
                record_status,
                auth_status,
                step_id)
            Values
               (v_auto_id,
                p_pro_date,
                p_user,
                Sysdate,
                'O',
                'U',
                p_step_id);
            Commit;
            If tmp_op_status = '1' Then
               op_status  := '1';
               op_message := 'Approved successfully';
            End If;
         Elsif p_step_id Not In (3, 7) Then
            dbms_output.put_line('insert step not in 3 and 7: ' ||
                                 p_step_id);
            v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_step',
                                                      'id');
            Insert Into rpt_iau_process_step
               (id,
                process_date,
                process_by_id,
                last_update_date,
                record_status,
                auth_status,
                step_id)
            Values
               (v_auto_id,
                p_pro_date,
                p_user,
                Sysdate,
                'O',
                'U',
                p_step_id);
            Commit;
            op_status  := '1';
            op_message := 'Step inserted successfully';
         End If;
      End;
   
   Elsif v_check > 0 Then
      op_status  := '1';
      op_message := 'Step already inserted successfully';
   End If;
   If op_status Is Null Then
      op_status  := '-1';
      op_message := 'Step fail to insert!';
   End If;
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End pro_insert_process_step;

Function fn_auto_id_user_housekeeping(p_table_name Varchar2,
                                      p_col        Varchar2) Return Number
   Deterministic Is
   p_id           Number;
   v_check_record Number;
   v_sql_check    Varchar(300);
   v_sql_id       Varchar2(300);
Begin
   v_sql_check := 'select count(*) from ' || p_table_name;
   v_sql_id    := 'select max(' || p_col || ') from ' || p_table_name;
   Execute Immediate v_sql_check
      Into v_check_record;
   If v_check_record = 0 Then
      p_id := 1;
   Else
      Execute Immediate v_sql_id
         Into p_id;
      p_id := p_id + 1;
   End If;

   Return p_id;
End fn_auto_id_user_housekeeping;

Procedure get_process_step(p_user        In Varchar2,
                           p_debug       In Varchar2 Default 'NN',
                           p_date_report In Date,
                           p_tab_process In Varchar2,
                           op_data_step  Out ref_cur1,
                           op_data_stat  Out Clob,
                           op_status     Out Varchar2,
                           op_message    Out Clob) As
   tmp_data_step ref_cur1;
   js_clob       Clob;
Begin
   dg_init(p_userid => p_user, p_debug => p_debug);
   Open tmp_data_step For
   /*With max_step_id As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    (Select coalesce((Select Max(log.step_id) + 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       From rpt_iau_process_step log
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Inner Join rpt_iau_step st
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         On log.step_id = st.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      LEFT JOIN rpt_iau_rev_app rev_app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ON rev_app.step_id = st.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Where log.record_status = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        And st.record_status = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        And st.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        And to_char(log.process_date, 'MON-YYYY') =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            to_char(p_date_report, 'MON-YYYY')),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     (Case
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       When p_tab_process = 1 Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       When p_tab_process = 2 Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Else
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     End)) As id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       From dual),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   enable_btn As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    (Select btn.name,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nvl(Case
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  When rev_app.user_id Is Not Null And
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Trim(rev_app.user_id) = Trim(p_user) Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   'Y'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  When rev_app.user_id Is Not Null And
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Trim(rev_app.user_id) <> Trim(p_user) Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   'N'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  When rev_app.user_id Is Null Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Null
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                End,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                'Y') As val_step,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            'BTN' As category,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            btn.element_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       From rpt_iau_btn btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Left Join rpt_iau_rev_app rev_app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         On btn.step_id = rev_app.step_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Inner Join max_step_id step
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         On btn.step_id = step.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Where btn.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        And btn.step_id = step.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        And btn.record_status = 'O'),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   disable_btn As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    (Select btn_disable.name,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            'N' As val_step,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            'BTN' As category,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            btn_disable.element_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       From rpt_iau_btn btn_disable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Where btn_disable.record_status = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        And btn_disable.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        And btn_disable.id Not In
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            (Select btn.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               From rpt_iau_btn btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Inner Join max_step_id step
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 On btn.step_id = step.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Where btn.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                And btn.step_id = step.id))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Select rownum As no, a. *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     From (Select * From enable_btn Union All Select * From disable_btn) a;*/
   /*WITH REV_APP_COUNTS AS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                (SELECT STEP_ID, AUTH_STATUS, COUNT(*) AS COUNT_U_STATUS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   FROM RPT_IAU_REV_APP
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  GROUP BY STEP_ID, AUTH_STATUS),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               MAX_STEP_ID AS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                (SELECT MAX(LOG.STEP_ID) AS MAX_STEP_ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   FROM RPT_IAU_PROCESS_STEP LOG
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  INNER JOIN RPT_IAU_STEP ST
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ON LOG.STEP_ID = ST.ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  WHERE LOG.RECORD_STATUS = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND ST.RECORD_STATUS = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND ST.TAB_ID = P_TAB_PROCESS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND TO_CHAR(LOG.PROCESS_DATE, 'MON-YYYY') =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        TO_CHAR(P_DATE_REPORT, 'MON-YYYY')),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ADJUSTED_STEP_ID AS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                (SELECT COALESCE((SELECT CASE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          WHEN (MAX_STEP_ID.MAX_STEP_ID) IN (3, 4) AND
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               REV_APP_COUNTS.AUTH_STATUS = 'A' THEN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           MAX_STEP_ID.MAX_STEP_ID + 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          WHEN (MAX_STEP_ID.MAX_STEP_ID) NOT IN (3, 4) THEN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           MAX_STEP_ID.MAX_STEP_ID + 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ELSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           MAX_STEP_ID.MAX_STEP_ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        END AS ADJUSTED_STEP_ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   FROM MAX_STEP_ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   LEFT JOIN REV_APP_COUNTS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ON REV_APP_COUNTS.STEP_ID =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        MAX_STEP_ID.MAX_STEP_ID + 1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 CASE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   WHEN P_TAB_PROCESS = 1 THEN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   WHEN P_TAB_PROCESS = 2 THEN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ELSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 END) AS ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   FROM DUAL),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ENABLE_BTN AS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                (SELECT BTN.NAME,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        NVL(CASE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              WHEN REV_APP.USER_ID IS NOT NULL AND
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   TRIM(REV_APP.USER_ID) = TRIM(P_USER) THEN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               'Y'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              WHEN REV_APP.USER_ID IS NULL AND STEP.ID IN (3, 4) THEN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               'N'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              WHEN REV_APP.USER_ID IS NULL AND
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   STEP.ID NOT IN (3, 4) THEN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               NULL
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            END,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            'Y') AS VAL_STEP,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        'BTN' AS CATEGORY,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        BTN.ELEMENT_ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   FROM RPT_IAU_BTN BTN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   LEFT JOIN RPT_IAU_REV_APP REV_APP
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ON BTN.STEP_ID = REV_APP.STEP_ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND REV_APP.USER_ID = P_USER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND REV_APP.AUTH_STATUS = 'U'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  INNER JOIN ADJUSTED_STEP_ID STEP
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ON BTN.STEP_ID = STEP.ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  WHERE BTN.TAB_ID = P_TAB_PROCESS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND BTN.STEP_ID = STEP.ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND BTN.RECORD_STATUS = 'O'),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               DISABLE_BTN AS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                (SELECT BTN_DISABLE.NAME,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        'N' AS VAL_STEP,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        'BTN' AS CATEGORY,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        BTN_DISABLE.ELEMENT_ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   FROM RPT_IAU_BTN BTN_DISABLE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  WHERE BTN_DISABLE.RECORD_STATUS = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND BTN_DISABLE.TAB_ID = P_TAB_PROCESS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AND BTN_DISABLE.ID NOT IN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        (SELECT BTN.ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           FROM RPT_IAU_BTN BTN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          INNER JOIN ADJUSTED_STEP_ID STEP
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ON BTN.STEP_ID = STEP.ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          WHERE BTN.TAB_ID = P_TAB_PROCESS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            AND BTN.STEP_ID = STEP.ID))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               SELECT ROWNUM AS NO, A.*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 FROM (SELECT * FROM ENABLE_BTN UNION ALL SELECT * FROM DISABLE_BTN) A;*/
   /*   With rev_app_counts As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          (Select step_id, auth_status, Count(*) As count_u_status, user_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             From rpt_iau_rev_app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Group By step_id, auth_status, user_id),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         max_step_id As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          (Select Max(log.step_id) As max_step_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             From rpt_iau_process_step log
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Inner Join rpt_iau_step st
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               On log.step_id = st.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Where log.record_status = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And st.record_status = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And st.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And to_char(log.process_date, 'MON-YYYY') =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  to_char(p_date_report, 'MON-YYYY')),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         adjusted_step_id As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          (Select nvl((Select Case
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               When max_step_id.max_step_id + 1 In (3) And
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    rev_app_counts.auth_status = 'A' Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                max_step_id.max_step_id + 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Else
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                max_step_id.max_step_id + 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             End As adjusted_step_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        From max_step_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Left Join rev_app_counts
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          On rev_app_counts.step_id = max_step_id.max_step_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         And rev_app_counts.user_id = p_user),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      p_tab_process) As id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             From dual),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         enable_btn As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          (Select btn.name,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Case
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    When rev_app.user_id Is Not Null And
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Trim(rev_app.user_id) = TRIM(p_user) Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     'Y'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    When rev_app.user_id Is Null And
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         step.id In (3, 4) Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     'N'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    When rev_app.user_id Is Null And
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         step.id Not In (3, 4) Then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     'Y'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  End As val_step,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  'BTN' As category,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  btn.element_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             From rpt_iau_btn btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Left Join rpt_iau_rev_app rev_app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               On btn.step_id = rev_app.step_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And rev_app.user_id = p_user
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And rev_app.auth_status = 'U'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Inner Join adjusted_step_id step
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               On btn.step_id = step.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Where btn.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And btn.step_id = step.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And btn.record_status = 'O'),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         disable_btn As
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          (Select btn_disable.name,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  'N' As val_step,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  'BTN' As category,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  btn_disable.element_id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             From rpt_iau_btn btn_disable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Where btn_disable.record_status = 'O'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And btn_disable.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              And btn_disable.id Not In
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  (Select btn.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     From rpt_iau_btn btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Inner Join adjusted_step_id step
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       On btn.step_id = step.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Where btn.tab_id = p_tab_process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      And btn.step_id = step.id))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Select rownum As no, a.*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           From (Select * From enable_btn Union All Select * From disable_btn) a;    */
      With max_step_id As
       (Select nvl((Select Max(log.step_id) + 1 As id
                   From   rpt_iau_process_step log
                   Inner  Join rpt_iau_step st
                   On     log.step_id = st.id
                   Where  log.record_status = 'O'
                   And    st.record_status = 'O'
                   And    st.tab_id = p_tab_process
                   And    to_char(log.process_date, 'MON-YYYY') =
                          to_char(p_date_report, 'MON-YYYY')),
                   1) As id
        From   dual),
      
      enable_btn As
       (Select btn.id,
               btn.name,
               (Case
                  When rev_app.user_id Is Not Null And
                       Trim(rev_app.user_id) = Trim(p_user) Then
                   'Y'
                  When rev_app.user_id Is Null And st_id.id In (3, 4) Then
                   'N'
                  When rev_app.user_id Is Null And st_id.id Not In (3, 4) Then
                   'Y'
               End) As val_step,
               'BTN' As category,
               btn.element_id
        From   rpt_iau_btn btn
        Left   Join rpt_iau_rev_app rev_app
        On     btn.step_id = rev_app.step_id
        And    rev_app.user_id = p_user
        And    rev_app.auth_status = 'U'
        And    btn.step_id In (3, 4) --review
        Inner  Join max_step_id st_id
        On     st_id.id = btn.step_id
        Where  btn.tab_id = p_tab_process
        And    btn.step_id = st_id.id
        And    btn.record_status = 'O'),
      disable_btn As
       (Select btn_disable.id,
               btn_disable.name,
               'N' As val_step,
               'BTN' As category,
               btn_disable.element_id
        From   rpt_iau_btn btn_disable
        Where  btn_disable.record_status = 'O'
        And    btn_disable.tab_id = p_tab_process
        And    btn_disable.id Not In (Select id From enable_btn))
      Select rownum As no, a.*
      From   (Select * From enable_btn Union All Select * From disable_btn) a;

   With status As
    (Select st.id As id,
            'STATUS' As category,
            (Case
               When stl.status Is Not Null Then
                to_char(stl.status)
               Else
                '0'
            End) As status,
            (Case
               When stl.status_count Is Not Null Then
                to_char(stl.status_count)
               Else
                '0'
            End) As status_count,
            (Case
               When stl.message Is Not Null Then
                stl.message
               Else
                to_clob('not yet process')
            End) As message,
            st.element_id
     From   rpt_iau_status st
     Left   Join rpt_iau_process_status stl
     On     st.id = stl.status_id
     And    (to_char(stl.insert_date, 'MON-YYYY') Is Null Or
           to_char(stl.insert_date, 'MON-YYYY') =
           to_char(p_date_report, 'MON-YYYY'))
     Where  st.record_status = 'O')
   Select json_object('bi_housekeeping' Value
                      json_object('update_status' Value
                                  (Select json_object('status' Value
                                                      p.status,
                                                      'count' Value
                                                      to_char(p.status_count),
                                                      'message' Value
                                                      p.message,
                                                      'eleId' Value
                                                      p.element_id)
                                   From   status p
                                   Where  p.id = 1
                                   Fetch  First 1 Row Only),
                                  'update_email' Value
                                  (Select json_object('status' Value
                                                      p.status,
                                                      'count' Value
                                                      to_char(p.status_count),
                                                      'message' Value
                                                      p.message,
                                                      'eleId' Value
                                                      p.element_id)
                                   From   status p
                                   Where  p.id = 2
                                   Fetch  First 1 Row Only),
                                  'pull_last_login' Value
                                  (Select json_object('status' Value
                                                      p.status,
                                                      'count' Value
                                                      to_char(p.status_count),
                                                      'message' Value
                                                      p.message,
                                                      'eleId' Value
                                                      p.element_id)
                                   From   status p
                                   Where  p.id = 3
                                   Fetch  First 1 Row Only),
                                  'get_bi_housekeeping' Value
                                  (Select json_object('status' Value
                                                      p.status,
                                                      'count' Value
                                                      to_char(p.status_count),
                                                      'message' Value
                                                      p.message,
                                                      'eleId' Value
                                                      p.element_id)
                                   From   status p
                                   Where  p.id = 4
                                   Fetch  First 1 Row Only),
                                  'close_bi_user' Value
                                  (Select json_object('status' Value
                                                      p.status,
                                                      'count' Value
                                                      to_char(p.status_count),
                                                      'message' Value
                                                      p.message,
                                                      'eleId' Value
                                                      p.element_id)
                                   From   status p
                                   Where  p.id = 5
                                   Fetch  First 1 Row Only))) As Result
   Into   js_clob
   From   dual;

   op_data_step := tmp_data_step;
   op_data_stat := js_clob;
   op_status    := '1';
   op_message   := 'get data successful';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_process_step;

Procedure generate_email_content(p_brncode              Varchar2,
                                 p_date_created         Date,
                                 p_last_login_date      Date,
                                 p_inserted_date        Date,
                                 p_day_count_last_login Number,
                                 p_footer1              Varchar2,
                                 p_footer2              Varchar2,
                                 p_footer3              Varchar2,
                                 p_footer4              Varchar2,
                                 p_footer5              Varchar2,
                                 p_staff_id             Varchar2,
                                 p_staff_name           Varchar2,
                                 p_db_username          Varchar2,
                                 p_user_role            Varchar2,
                                 p_current_status       Varchar2,
                                 p_dbname               Varchar2,
                                 p_db_full_name         Varchar2,
                                 p_email_type           Varchar2,
                                 p_email_content        Out Clob) Is
   v_email_content Clob;
Begin
   If p_email_type = 'BI' Then
      /* content for bi email*/
      v_email_content := '<h5 style="color: black;    "> dear teacher <b style="color:blue;  ">' ||
                         p_staff_name ||
                         '</b></h5><p style="font-size:15px;    ">' ||
                         '&nbsp;&nbsp;i hope you saw this email. ' ||
                         'i am reaching out to remind you about the importance of logging into the <a
         href="https://bi.hatthabank.com/xmlpserver/"
         style=" font-size:15px;      color: blue; text-decoration: none;   border-bottom: 1px solid blue;">bi</a> reporting system. ' ||
                         'to access it, kindly use your user id and password.</br></br>' ||
                         '<style>' || 'table, th, td {' ||
                         '  border-collapse: collapse;' ||
                         '  vertical-align: top;' ||
                         '  text-align: center;' ||
                         '  border: 1px solid black;' || '  width: fit;' ||
                         '  padding: 10px;' || '  padding-left: 10px;' ||
                         '  padding-right: 10px;' || '   ' || '}' ||
                         '</style>' ||
                         '<table style="font-size:14px;    ">' ||
                         '<tr style="background-color: #009da5; color: white;">' ||
                         '<th >branch code</th>' || '<th >staff id</th>' ||
                         '<th >user name</th>' || '<th >create date</th>' ||
                         '<th >last login</th>' || '<th >check date</th>' ||
                         '<th >inactive date</th>' || '</tr>' || '<tr>' ||
                         '<td>' || p_brncode || '</td>' || '<td >' ||
                         p_staff_id || '</td>' || '<td >' || p_staff_name ||
                         '</td>' || '<td >' ||
                         to_char(p_date_created, 'dd-MON-YYYY') || '</td>' ||
                         '<td >' ||
                         to_char(p_last_login_date, 'dd-MON-YYYY') ||
                         '</td>' || '<td >' ||
                         to_char(p_inserted_date, 'dd-MON-YYYY') ||
                         '</td>' || '<td >' || p_day_count_last_login ||
                         ' day' || '</td>' || '</tr>' || '</table></br>' ||
                         p_footer1 ||
                         'according to the procedures outlined in the bi administration manual, ' ||
                         'we proactively notify users who have not logged into the system for more than 90 days. ' ||
                         'for security and maintenance purposes, the isa department will remove access rights for users ' ||
                         'who have been inactive for more than 120 days. should you require access to the bi reporting ' ||
                         'system in the future, you can simply request it once again.' ||
                         '</br><p style="font-size:15px;    "> thanks & best regards. </p> 
                        <td><p style="font-size:13px;    "><b>' ||
                         p_footer2 || '</b></br>' || p_footer3 || '</br>' ||
                         p_footer4 || '</br>' || p_footer5 || '</p></td>';
   Elsif p_email_type = 'DB' Then
      /*  content for db email*/
      v_email_content := '<h5 style="color: black;    "> dear teacher <b style="color:blue;  ">' ||
                         p_staff_name ||
                         '</b></h5><p style="font-size:15px;    ">' ||
                         '&nbsp;&nbsp;i hope you saw this email.  i am reaching out to remind you about the importance of logging into the database.  ' ||
                         '</br></br>' || '<style>' || 'table, th, td {' ||
                         '  border-collapse: collapse;' ||
                         '  vertical-align: top;' ||
                         '  text-align: center;' ||
                         '  border: 1px solid black;' || '  width: fit;' ||
                         '  padding: 10px;' || '  padding-left: 10px;' ||
                         '  padding-right: 10px;' || '   ' || '}' ||
                         '</style>' ||
                         '<table style="font-size:14px;    ">' ||
                         '<tr style="background-color: #009da5; color: white;">' ||
                         '<th >staff_id</th>' || '<th >staff_name</th>' ||
                         '<th >db_username</th>' || '<th >user_role</th>' ||
                         '<th >current_status</th>' ||
                         '<th >created_date</th>' ||
                         '<th >last_login</th>' ||
                         '<th >inactive_days</th>' || '<th >dbname</th>' ||
                         '<th style=" ">db_full_name</th>' || '</tr>' ||
                         '<tr>' || '<td>' || p_staff_id || '</td>' ||
                         '<td>' || p_staff_name || '</td>' || '<td >' ||
                         p_db_username || '</td>' || '<td>' || p_user_role ||
                         '</td>' || '<td>' || p_current_status || '</td>' ||
                         '<td >' || to_char(p_date_created, 'dd-MON-YYYY') ||
                         '</td>' || '<td >' ||
                         to_char(p_last_login_date, 'dd-MON-YYYY') ||
                         '</td>' || '<td>' || p_last_login_date || ' day' ||
                         '</td>' || '<td >' || p_dbname || '</td>' ||
                         '<td >' || p_db_full_name || '</td>' || '</tr>' ||
                         '</table></br><p style="font-size:15px;    ">' ||
                         p_footer1 ||
                         'as part of database security and db user housekeeping, i’d like to request you to be informed of the list ' ||
                         'of 120 days inactive db users who never logged into the database from the last login date or created date. ' ||
                         'to prevent your users from being categorized as inactive, please log into each database of your users at least once every 90 days. ' ||
                         'this email is to notify you that the dba unit of the isa department will remove access rights for users who have been inactive ' ||
                         'for more than 120 days. if you need access to the database user in the future, you can simply request it once again.' ||
                         '</br></br>for users who are in expired or locked status and caNNot log in with the current password, please use the <a href="https://hds.hatthabank.com:8444/Login" style=" font-size:15px;      color: blue; text-decoration: none;   border-bottom: 1px solid blue;">helpdesk system</a> ' ||
                         'to request a password reset or unlock.' ||
                         '</br></br>best regards, </p><p style="font-size:15px;    "><b>' ||
                         p_footer2 || '</b></br>' || p_footer3 || '</br>' ||
                         p_footer4 || '</br>' || p_footer5 || '</p>';
   Elsif p_email_type = 'BI_INFORM_TEAM' Then
      /*  content for db email*/
      v_email_content := '<h5 style="color: black;    "> Dear management and team </br> kindly review and approve BI User Housekeeping on ITO System.
                      <b style="color:blue;  ">' ||
                         '</br></br>best regards, </p><p style="font-size:15px;    "><b>' ||
                         p_footer2 || '</b></br>' || p_footer3 || '</br>' ||
                         p_footer4 || '</br>' || p_footer5 || '</p>';
   Else
      raise_application_error(-20001,
                              'invalid email type: ' || p_email_type);
   End If;

   p_email_content := v_email_content;
End generate_email_content;

Procedure send_email_inform_user(p_user        In Varchar2,
                                 p_debug       In Varchar2 Default 'NN',
                                 p_report_date In Date,
                                 p_type_used   In Varchar2,
                                 /*p_user_inform In Varchar2,*/
                                 op_status  Out Varchar2,
                                 op_message Out Clob) As

   s_date         Varchar2(10);
   s_emailcc      Clob := 'khim.meok@hatthabank.com';
   s_emailfrom    Clob := 'bi_system@hatthabank.com';
   s_mail_server  Clob := 'mail.hatthabank.com';
   s_emailsubject Clob;
   s_emailto      Clob;
   s_html_msg     Clob;
   footer1        Varchar2(250) := '<b style="color:red; font-size:15px;">note</b>: ';
   footer2        Varchar2(250) := 'it operations and system admin department';
   footer3        Varchar2(250) := 'email: isa_group@hatthabank.com';
   footer4        Varchar2(250) := 'mobile: (855) 93 222 923, 93 222 905';
   footer5        Varchar2(250) := '#606, st.271, sansam kosal 3 village, boeng tumpun 1 sangkat, mean chey khan, phnom penh capital';
Begin
   dg_init(p_user, p_debug);
   Select to_char(p_report_date, 'MON-YYYY') Into s_date From dual;

   If p_type_used = 'BI' Then
      s_emailsubject := 'inform to login in bi system';
      For loopuser In (Select Distinct a.user_id,
                                       upper(ad.display_name) username,
                                       Case
                                          When ad.office = 'Head Office' Then
                                           '000'
                                          Else
                                           ad.office
                                       End As brn_code,
                                       to_char(z.create_date, 'dd-MON-YYYY') date_created,
                                       a.day_count_last_login,
                                       Case
                                          When a.last_login_date Like ' ' Then
                                           substr(a.last_login_date,
                                                  1,
                                                  instr(a.last_login_date,
                                                        ' ') - 1)
                                          Else
                                           a.last_login_date
                                       End As last_login_date,
                                       to_char(a.inserted_date,
                                               'dd-MON-YYYY') inserted_date,
                                       ad.email As staff_mail
                       From   rpt_bip_iau_tbl_house_keeping a
                       Left   Join rpt_user_mgt_user_system z
                       On     z.user_system = a.user_id
                       Left   Join current_ad_users ad
                       On     a.user_id = ad.user_id
                       Where  to_char(to_date(a.report_date, 'dd-MON-YYYY'),
                                      'MON-YYYY') =
                              to_char(p_report_date, 'MON-YYYY')
                       And    a.day_count_last_login >= 90
                       And    a.day_count_last_login <= 119
                       And    z.record_status = 'O'
                       And    rownum < 5 /* todo: remove limit*/
                       ) Loop
         Select listagg(a.email, ',')
         Into   s_emailto
         From   current_ad_users a
         Where  a.user_id In ('11225');
      
         generate_email_content(p_brncode              => loopuser.brn_code,
                                p_date_created         => loopuser.date_created,
                                p_last_login_date      => loopuser.last_login_date,
                                p_inserted_date        => loopuser.inserted_date,
                                p_day_count_last_login => loopuser.day_count_last_login,
                                p_footer1              => footer1,
                                p_footer2              => footer2,
                                p_footer3              => footer3,
                                p_footer4              => footer4,
                                p_footer5              => footer5 ||
                                                         
                                                          ' ->' ||
                                                         
                                                          loopuser.staff_mail,
                                p_staff_id             => loopuser.user_id,
                                p_staff_name           => loopuser.username,
                                p_db_username          => '',
                                p_user_role            => '',
                                p_current_status       => '',
                                p_dbname               => '',
                                p_db_full_name         => '',
                                p_email_type           => 'BI',
                                p_email_content        => s_html_msg);
      
         If loopuser.user_id Is Not Null Then
            "SEND_EMAIL"(p_to       => s_emailto,
                         p_from     => s_emailfrom,
                         p_cc       => s_emailcc,
                         p_subject  => s_emailsubject,
                         p_text_msg => '',
                         p_html_msg => s_html_msg);
         End If;
         -- sleep 3 sec
         rpt_bi_report.proc_sleep(3);
      End Loop;
      /*  mail for     db*/
   Elsif p_type_used = 'DB' Then
      s_emailsubject := 'inform to login into database';
      For loopuser In (Select *
                       From   intuser.db_user_house_keeping a
                       Where  to_char(a.inserted_date, 'MON-YYYY') =
                              to_char(p_report_date, 'MON-YYYY')
                       And    a.inactive_days Between 90 And 120
                       /*(a.staff_id || '~' || a.db_username) in
                       (select regexp_substr(p_user_inform,
                                             '[^,]+',
                                             1,
                                             level) as v_end_point_id
                          from dual
                        coNNect by regexp_substr(p_user_inform,
                                                 '[^,]+',
                                                 1,
                                                 level) is not null)*/
                       ) Loop
         Select listagg(a.email, ',')
         Into   s_emailto
         From   current_ad_users a
         Where  a.user_id In ('11225');
      
         generate_email_content(p_brncode              => '',
                                p_date_created         => loopuser.created_date,
                                p_last_login_date      => loopuser.last_login,
                                p_inserted_date        => loopuser.inserted_date,
                                p_day_count_last_login => loopuser.inactive_days,
                                p_footer1              => footer1,
                                p_footer2              => footer2,
                                p_footer3              => footer3,
                                p_footer4              => footer4,
                                p_footer5              => footer5,
                                p_staff_id             => loopuser.staff_id,
                                p_staff_name           => loopuser.staff_name,
                                p_db_username          => loopuser.db_username,
                                p_user_role            => loopuser.user_role,
                                p_current_status       => loopuser.current_status,
                                p_dbname               => loopuser.dbname,
                                p_db_full_name         => loopuser.remark,
                                p_email_type           => 'DB',
                                p_email_content        => s_html_msg);
      
         If loopuser.staff_id Is Not Null Then
            "SEND_EMAIL"(p_to       => s_emailto,
                         p_from     => s_emailfrom,
                         p_cc       => s_emailcc,
                         p_subject  => s_emailsubject,
                         p_text_msg => '',
                         p_html_msg => s_html_msg);
         End If;
      
      End Loop;
   
   End If;

   op_status  := '1';
   op_message := 'send email inform successfully';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End send_email_inform_user;

Procedure pro_insert_process_status(p_user         In Varchar2,
                                    p_status_id    In Varchar2,
                                    p_status       In Varchar2,
                                    p_status_count In Varchar2,
                                    p_message      In Clob,
                                    /* p_process_data In Clob,*/
                                    p_process_date In Date,
                                    /*p_tab_process  In Varchar2,*/
                                    op_status  Out Varchar2,
                                    op_message Out Clob) As
   v_auto_id Number;
   record_id Number;
Begin
   Select nvl((Select s.id
              From   rpt_iau_process_status s
              Where  s.record_status = 'O'
              And    s.status_id = p_status_id
              And    to_char(s.insert_date, 'MON-YYYY') =
                     to_char(p_process_date, 'MON-YYYY')),
              0)
   Into   record_id
   From   dual;

   If record_id = 0 Then
      v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_status',
                                                'id');
      Insert Into rpt_iau_process_status
         (id,
          status_id,
          status,
          status_count,
          message,
          record_status,
          insert_date,
          user_maker)
      Values
         (v_auto_id,
          p_status_id,
          p_status,
          p_status_count,
          p_message,
          'O',
          p_process_date,
          p_user);
   
      Commit;
      op_status  := '1';
      op_message := 'status insert successfully';
   Elsif record_id <> 0 Then
      /*update status to 'd' if exist*/
      Update rpt_iau_process_status a
      Set    a.record_status = 'D'
      Where  a.id = record_id;
   
      v_auto_id := fn_auto_id_user_housekeeping('rpt_iau_process_status',
                                                'id');
      Insert Into rpt_iau_process_status
         (id,
          status_id,
          status,
          status_count,
          message,
          record_status,
          insert_date,
          user_maker)
      Values
         (v_auto_id,
          p_status_id,
          p_status,
          p_status_count,
          p_message,
          'O',
          p_process_date,
          p_user);
   
      Commit;
      op_status  := '1';
      op_message := 'status insert successfully';
   End If;

Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End pro_insert_process_status;

Procedure get_bi_user_close(p_user          In Varchar2,
                            p_debug         In Varchar2 Default 'NN',
                            op_date_report  Date,
                            op_data_bi_user Out ref_cur1,
                            op_status       Out Varchar2,
                            op_message      Out Clob) As

   tmp_bi_user    ref_cur1;
   v_count        Number := 0;
   v_message      Clob := 'no error found! (defualt message)';
   op_tmp_status  Number := -1;
   op_tmp_message Clob;
Begin
   dg_init(p_user, p_debug);
   Select nvl(Count(*), 0)
   Into   v_count
   From   rpt_bip_iau_tbl_house_keeping a
   Inner  Join current_ad_users ad
   On     a.user_id = ad.user_id
   Where  a.day_count_last_login >= 120
   And    to_char(to_date(a.report_date, 'DD-MON-YYYY'), 'MON-YYYY') =
          to_char(op_date_report, 'MON-YYYY');

   If v_count > 0 Then
      Open tmp_bi_user For
         Select rownum As id, c.*
         From   (Select a.user_id,
                        ad.display_name,
                        ad.title,
                        (Case
                           When a.day_count_last_login > 120 Then
                            'Inactive user'
                           Else
                            'Inform'
                        End) As close_type,
                        a.report_date
                 From   rpt_bip_iau_tbl_house_keeping a
                 Inner  Join current_ad_users ad
                 On     a.user_id = ad.user_id
                 Where  a.day_count_last_login >= 120
                 And    to_char(to_date(a.report_date, 'DD-MON-YYYY'),
                                'MON-YYYY') =
                        to_char(op_date_report, 'MON-YYYY')) c;
   
      pro_insert_process_status(p_user,
                                105,
                                (Case When v_count > 0 Then '1' Else '1' End),
                                /*todo: change to -1 if < 0*/
                                v_count,
                                v_message,
                                op_date_report,
                                op_tmp_status,
                                op_tmp_message);
   
      If op_tmp_status = 1 Then
         op_data_bi_user := tmp_bi_user;
         op_status       := '1';
         op_message      := 'Success';
      End If;
   
   Else
      op_status  := '-1';
      op_message := 'No data found!';
   End If;

   Commit;
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_bi_user_close;

Procedure insert_bi_user_close(p_user         In Varchar2,
                               p_debug        In Varchar2 Default 'NN',
                               op_date_report Date,
                               op_status      Out Varchar2,
                               op_message     Out Clob) As

   v_count        Number := 0;
   v_message      Varchar2(1000) := 'no error found! (defualt message)';
   op_tmp_status  Number := -1;
   op_tmp_message Varchar2(1000);
Begin
   dg_init(p_user, p_debug);
   Begin
      Insert Into sp_user_close_pre_new
         (user_id, type_close, report_dt)
         Select a.user_id, 'Inactive User', a.report_date
         From   rpt_bip_iau_tbl_house_keeping a
         Where  a.day_count_last_login >= 120
         And    to_char(add_months(a.inserted_date, -1), 'MON-YYYY') =
                to_char(op_date_report, 'MON-YYYY');
   
      v_count := Sql%Rowcount;
   End;

   pro_insert_process_status(p_user,
                             5,
                             (Case When v_count > 0 Then '1' Else '-1' End),
                             v_count,
                             v_message,
                             op_date_report,
                             op_tmp_status,
                             op_tmp_message);

   If op_tmp_status = 1 Then
      op_status  := '1';
      op_message := 'Insert data successfully';
   End If;
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End insert_bi_user_close;

Procedure bi_inactive_operations(p_user                 In Varchar2,
                                 p_debug                In Varchar2 Default 'NN',
                                 p_operation            In Varchar2,
                                 p_record_id            In Number,
                                 p_user_id              In Varchar2 Default Null,
                                 p_description          In Varchar2 Default Null,
                                 p_last_login_date      In Varchar2 Default Null,
                                 p_day_count_last_login In Varchar2 Default Null,
                                 p_report_date          In Varchar2 Default Null,
                                 p_date_created         In Varchar2 Default Null,
                                 p_inserted_date        In Varchar2 Default Null,
                                 p_get_data             Out ref_cur1,
                                 op_status              Out Varchar2,
                                 op_message             Out Clob) As
   tmp_data ref_cur1;
Begin
   dg_init(p_user, p_debug);
   If lower(p_operation) = 'update' Then
      Update rpt_bip_iau_tbl_house_keeping bi
      Set    bi.user_id              = p_user_id,
             bi.description          = p_description,
             bi.last_login_date      = p_last_login_date,
             bi.day_count_last_login = p_day_count_last_login,
             bi.report_date          = p_report_date,
             bi.date_created         = p_date_created,
             bi.inserted_date        = p_inserted_date
      Where  bi.id = p_record_id;
   
      op_status  := '1';
      op_message := 'update successfully.';
      /* delete operation*/
   Elsif lower(p_operation) = 'delete' Then
      Update rpt_bip_iau_tbl_house_keeping a
      Set    a.status = 'd'
      Where  a.id = p_record_id;
   
      op_status  := '1';
      op_message := 'delete data successfully.';
   Elsif lower(p_operation) = 'getbyid' Then
      Open tmp_data For
         Select a.id,
                a.user_id,
                a.description,
                a.last_login_date,
                a.day_count_last_login,
                a.report_date,
                a.date_created,
                a.inserted_date
         From   rpt_bip_iau_tbl_house_keeping a
         Where  a.id = p_record_id;
   
      p_get_data := tmp_data;
      op_status  := '1';
      op_message := 'get data successfully.';
   Else
      op_status  := '-1';
      op_message := 'invalid operation';
   End If;

   Commit;
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm;
End bi_inactive_operations;

Procedure get_report_deletion_listing(p_user           In Varchar2,
                                      p_debug          In Varchar2 Default 'NN',
                                      p_date           In Date,
                                      op_data_deletion Out ref_cur1,
                                      op_status        Out Varchar2,
                                      op_message       Out Clob) As
   tmp_delection_report ref_cur1;
   v_count_status_log   Number := 0;
Begin
   dg_init(p_user, p_debug);
   Select nvl(Count(*), 0)
   Into   v_count_status_log
   From   rpt_user_mgt_user_system us
   Inner  Join rpt_user_mgt_request r
   On     r.request_id = us.request_id
   Inner  Join current_ad_users ep
   On     r.request_staff_id = ep.user_id
   Where  upper(to_char(add_months(trunc(us.last_oper_date), -1),
                        'MON-YYYY')) = upper(to_char(p_date, 'MON-YYYY'))
   And    us.last_oper_id = 'SYSTEM'
   And    us.record_status = 'C'
   And    r.record_status = 'C'
   And    us.user_system = r.request_staff_id
   And    us.system_name = 'BI';

   If v_count_status_log > 0 Then
      Open tmp_delection_report For
         Select row_number() over(Order By 10 Asc) no, z.*
         From   (Select r.branch_code As brn_code,
                        Case
                           When r.branch_code = '000' Then
                            ep.jobtitle
                           Else
                            ep.branchid
                        End As branch_name,
                        us.user_system As user_id,
                        upper(r.request_name) As user_name,
                        r.request_position As position,
                        to_char(r.request_date, 'dd-MON-YYYY') As request_date,
                        to_char(us.create_date, 'dd-MON-YYYY') As create_date,
                        to_char(us.last_oper_date, 'dd-MON-YYYY') As close_date,
                        Case
                           When us.record_status = 'C' Then
                            'CLOSE'
                           Else
                            us.record_status
                        End As status,
                        Case
                           When us.remark Is Null Then
                            ''
                           Else
                            us.remark
                        End As remark
                 From   rpt_user_mgt_user_system us
                 Inner  Join rpt_user_mgt_request r
                 On     r.request_id = us.request_id
                 Left   Join smtb_employee ep
                 On     r.request_staff_id = ep.sidcard
                 Where  upper(to_char(add_months(trunc(us.last_oper_date),
                                                 -1),
                                      'MON-YYYY')) =
                        upper(to_char(p_date, 'MON-YYYY'))
                 And    us.last_oper_id = 'SYSTEM'
                 And    us.record_status = 'C'
                 And    r.record_status = 'C'
                 And    us.user_system = r.request_staff_id
                 And    us.system_name = 'BI') z
         Order  By z.remark Asc;
   
      op_data_deletion := tmp_delection_report;
      op_status        := '1';
      op_message       := 'Get BI deletion success';
   Elsif v_count_status_log = 0 Then
      op_status  := '-1';
      op_message := 'No data found!';
   End If;

Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_report_deletion_listing;

Procedure get_user_update_status_listing(p_user     In Varchar2,
                                         p_debug    In Varchar2 Default 'NN',
                                         p_date     In Varchar2,
                                         op_data    Out ref_cur1,
                                         op_status  Out Varchar2,
                                         op_message Out Clob) As
   tmp_cur_data       ref_cur1;
   v_count_status_log Number := 0;
Begin
   dg_init(p_user, p_debug);
   Select nvl(Count(*), 0)
   Into   v_count_status_log
   From   rpt_user_mgt_user_system us
   Inner  Join rpt_user_mgt_request r
   On     r.request_id = us.request_id
   Left   Join smtb_employee ep
   On     r.request_staff_id = ep.sidcard
   Where  upper(to_char(add_months(trunc(us.last_oper_date), -1),
                        'MON-YYYY')) = upper(p_date)
   And    us.last_oper_id = 'SYSTEM'
   And    us.record_status = 'C'
   And    r.record_status = 'C'
   And    us.user_system = r.request_staff_id
   And    us.system_name = 'BI';

   If v_count_status_log > 0 Then
      Open tmp_cur_data For
         Select row_number() over(Order By 10 Asc) no, z.*
         From   (Select r.branch_code As brn_code,
                        us.user_system As user_id,
                        upper(r.request_name) As user_name,
                        Case
                           When us.record_status = 'C' Then
                            'CLOSE'
                           Else
                            us.record_status
                        End As current_status,
                        ul.user_status As previous_status,
                        ep.jobtitle As position,
                        to_char(r.request_date, 'dd-MON-YY') As request_date,
                        to_char(us.create_date, 'dd-MON-YY') As create_date,
                        to_char(us.last_oper_date, 'dd-MON-YY') As close_date,
                        Case
                           When ep.branchname = 'Head Office' Then
                            '000'
                           Else
                            ep.branchname
                        End As branch_name,
                        Case
                           When us.remark Is Null Then
                            ''
                           Else
                            us.remark
                        End As remark
                 From   rpt_user_mgt_user_system us
                 Inner  Join rpt_user_mgt_request r
                 On     r.request_id = us.request_id
                 Left   Join smtb_employee ep
                 On     r.request_staff_id = ep.sidcard
                 Left   Join rpt_user_mgt_user_system_log ul
                 On     us.request_id = ul.request_id
                 And    ul.mod_no < us.mod_no
                 Where  upper(to_char(add_months(trunc(us.last_oper_date),
                                                 -1),
                                      'MON-YYYY')) = upper(p_date)
                 And    us.last_oper_id = 'SYSTEM'
                 And    us.record_status = 'C'
                 And    r.record_status = 'C'
                 And    us.request_id = r.request_id
                 And    us.system_name = 'BI') z
         Order  By z.remark Asc;
   
      op_data    := tmp_cur_data;
      op_status  := '1';
      op_message := 'Get BI deletion success';
   Elsif v_count_status_log = 0 Then
      op_status  := '-1';
      op_message := 'No data found!';
   End If;

Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_user_update_status_listing;

Procedure pro_get_notifi(p_date     In Date,
                         p_data_cur Out ref_cur1,
                         op_status  Out Varchar2,
                         op_message Out Clob) As
   tmp_cur_data ref_cur1;
Begin
   Open tmp_cur_data For
      With data_notifi As
       (Select noti.*,
               Case
                  When noti.ref_id = step.step_id And step.auth_status = 'U' Then
                   (Select Distinct Count(a.user_id)
                    From   rpt_bip_iau_tbl_house_keeping a
                    Inner  Join rpt_user_mgt_user_system us
                    On     Trim(a.user_id) = Trim(us.user_system)
                    And    us.system_name = 'BI'
                    And    us.record_status = 'O'
                    Left   Join rpt_user_housekeeping_step step
                    On     to_char(a.inserted_date, 'MON-YYYY') =
                           to_char(add_months(step.process_date, 1),
                                   'MON-YYYY')
                    And    step.step_id = 10001
                    Left   Join current_ad_users ad
                    On     ad.user_id = a.user_id
                    Where  to_char(a.inserted_date, 'MON-YYYY') =
                           to_char(add_months(p_date, 1), 'MON-YYYY')
                    And    a.day_count_last_login >= 90
                    And    us.record_status = 'O')
                  Else
                   0
               End As show_noti
        From   rpt_iau_notifi_data noti
        Left   Join (Select dd.step_num + 1 As step_id, d.auth_status
                    From   rpt_user_housekeeping_step d
                    Inner  Join rpt_user_housekeeping_data dd
                    On     d.step_id = dd.id_by_category
                    Where  dd.category = 'step'
                    And    d.process_date = p_date) step
        On     noti.ref_id = step.step_id)
      --tab
      Select tab_menu.name, tab_menu.show_noti, tab_menu.element_id
      From   data_notifi tab_menu
      Where  tab_menu.id In (4, 5)
      Union All
      --sub
      Select sub_menu.name,
             Sum(tab_menu.show_noti) As count_noti,
             sub_menu.element_id
      From   data_notifi sub_menu
      Inner  Join data_notifi tab_menu
      On     sub_menu.id = tab_menu.sub_id
      Where  sub_menu.id In (2, 3)
      Group  By sub_menu.name, sub_menu.element_id
      Union All
      --main
      Select main_menu.name,
             Sum(sub_menu.count_noti) As count_noti,
             main_menu.element_id
      From   data_notifi main_menu
      Inner  Join (Select sub_menu.sub_id,
                          Sum(tab_menu.show_noti) As count_noti
                   From   data_notifi sub_menu
                   Inner  Join data_notifi tab_menu
                   On     sub_menu.id = tab_menu.sub_id
                   Where  sub_menu.id In (2, 3)
                   Group  By sub_menu.sub_id) sub_menu
      On     main_menu.sub_id = sub_menu.sub_id
      Where  main_menu.id = 1
      Group  By main_menu.name, main_menu.element_id;

   p_data_cur := tmp_cur_data;
   op_status  := '1';
   op_message := 'success';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End pro_get_notifi;

Procedure get_ito_user(op_data_cur Out ref_cur1,
                       op_status   Out Varchar2,
                       op_message  Out Clob) As
   tmp_cur ref_cur1;
Begin
   Open tmp_cur For
      Select Trim(u.user_id) As user_id,
             Trim(u.fullname) As username,
             nvl(ad.title, '-') As position
      From   ito_users u
      Left   Join current_ad_users ad
      On     u.user_id = ad.user_id
      Where  u.record_stat = 'O'
      And    length(Trim(u.user_id)) = 5
      Order  By u.fullname Asc;

   op_data_cur := tmp_cur;
   op_status   := '1';
   op_message  := 'success';
   Rollback;
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End get_ito_user;

Procedure pro_insert_user_rev_app(p_user        In Varchar2,
                                  p_debug       In Varchar2 Default 'NN',
                                  p_reviewer    In Varchar2,
                                  p_approver    In Varchar2,
                                  p_report_date In Date,
                                  op_status     Out Varchar2,
                                  op_message    Out Clob) As

   auto_id     Number := 0;
   tmp_status  Varchar2(10) := '';
   tmp_message Clob := '';
Begin
   dg_init(p_user, p_debug);
   --insert reviewer
   Begin
      For i In (Select regexp_substr(p_reviewer, '[^,]+', 1, Level) As user_id
                From   dual
                Connect By regexp_substr(p_reviewer, '[^,]+', 1, Level) Is Not Null) Loop
         auto_id := fn_auto_id_user_housekeeping('rpt_iau_rev_app', 'id');
         Insert Into rpt_iau_rev_app
            (id,
             user_id,
             role_id,
             step_id,
             record_status,
             auth_status,
             report_date)
         Values
            (auto_id, i.user_id, 1, 3, 'O', 'U', p_report_date);
      
      End Loop;
   
      Commit;
   End;
   --insert approver
   Begin
      auto_id := fn_auto_id_user_housekeeping('rpt_iau_rev_app', 'id');
      Insert Into rpt_iau_rev_app
         (id,
          user_id,
          role_id,
          step_id,
          record_status,
          auth_status,
          report_date)
      Values
         (auto_id, p_approver, 2, 4, 'O', 'U', p_report_date);
   
      Commit;
   End;
   --call inform reviewer
   Begin
      dbms_output.put_line('call inform');
      pro_sent_mail_inform_reviewer('rev',
                                    p_report_date,
                                    tmp_status,
                                    tmp_message);
   End;

   op_status  := '1';
   op_message := 'success';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End pro_insert_user_rev_app;

Procedure pro_sent_mail_inform_reviewer(p_type_inform In Varchar2,
                                        p_report_date In Date,
                                        op_status     Out Varchar2,
                                        op_message    Out Clob) As

   var_chaeck_reviewer Number := 0;
   var_id_inform_type  Number := 0;
   var_email_content   Clob := '';
   var_email_sent_to   Varchar2(150) := '';
   s_emailcc           Clob := 'khim.meok@hatthabank.com';
   s_emailfrom         Clob := 'itosystem@hatthabank.com';
   s_mail_server       Clob := 'mail.hatthabank.com';
   s_emailsubject      Clob := '';
Begin
   --get id inform type
   Case
      When lower(p_type_inform) = 'rev' Then
         var_id_inform_type := 1;
         s_emailsubject     := 'To review BI housekeeping';
      When lower(p_type_inform) = 'app' Then
         var_id_inform_type := 2;
         s_emailsubject     := 'To approve BI housekeeping';
      Else
         var_id_inform_type := 0;
   End Case;

   Begin
      Select Count(*)
      Into   var_chaeck_reviewer
      From   rpt_iau_rev_app rev_app
      Where  rev_app.role_id = var_id_inform_type
      And    rev_app.auth_status = 'U'
      And    to_char(rev_app.report_date, 'MON-YYYY') =
             to_char(p_report_date, 'MON-YYYY')
      And    rev_app.record_status = 'O';
   
      If var_chaeck_reviewer > 0 Then
         For l In (Select *
                   From   rpt_iau_rev_app rev_app
                   Inner  Join ito_users ito
                   On     ito.user_id = rev_app.user_id
                   Where  rev_app.role_id = var_id_inform_type
                   And    rev_app.auth_status = 'U'
                   And    to_char(rev_app.report_date, 'MON-YYYY') =
                          to_char(p_report_date, 'MON-YYYY')
                   And    rev_app.record_status = 'O') Loop
            generate_email_content(p_brncode              => '',
                                   p_date_created         => Sysdate,
                                   p_last_login_date      => Sysdate,
                                   p_inserted_date        => Sysdate,
                                   p_day_count_last_login => 0,
                                   p_footer1              => '',
                                   p_footer2              => '',
                                   p_footer3              => '',
                                   p_footer4              => '',
                                   p_footer5              => '',
                                   p_staff_id             => '',
                                   p_staff_name           => '',
                                   p_db_username          => '',
                                   p_user_role            => '',
                                   p_current_status       => '',
                                   p_dbname               => '',
                                   p_db_full_name         => '',
                                   p_email_type           => 'BI_INFORM_TEAM',
                                   p_email_content        => var_email_content);
         
            var_email_sent_to := l.email;
            "SEND_EMAIL"(p_to        => var_email_sent_to,
                         p_from      => s_emailfrom,
                         p_cc        => s_emailcc,
                         p_subject   => s_emailsubject,
                         p_text_msg  => '',
                         p_html_msg  => var_email_content,
                         p_smtp_host => s_mail_server);
         
         End Loop;
      
      End If;
   
   End;

   op_status  := '1';
   op_message := 'success';
Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End pro_sent_mail_inform_reviewer;

Procedure pro_update_auth_status(p_user_id     In Varchar2,
                                 p_report_date In Date,
                                 p_step_id     In Varchar2,
                                 op_status     Out Varchar2,
                                 op_message    Out Clob) Is
   v_check            Number := 0;
   v_row_update_count Number := 0;
Begin
   --check record
   Select Count(*)
   Into   v_check
   From   rpt_iau_rev_app rev_app
   Where  rev_app.user_id = p_user_id
   And    rev_app.report_date = p_report_date
   And    rev_app.step_id = p_step_id
   And    rev_app.auth_status = 'U';

   dbms_output.put_line(v_check);
   If v_check = 1 Then
      Update rpt_iau_rev_app rev_app
      Set    rev_app.auth_status = 'A'
      Where  rev_app.user_id = p_user_id
      And    rev_app.report_date = p_report_date
      And    rev_app.step_id = p_step_id
      And    rev_app.auth_status = 'U';
   
      v_row_update_count := Sql%Rowcount;
      Commit;
   Else
      op_status  := '-1';
      op_message := 'Record not found!';
   End If;

   If v_row_update_count = 1 Then
      op_status  := '1';
      op_message := 'record update success';
   Else
      op_status  := '-1';
      op_message := 'record update not success';
   End If;

Exception
   When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
End pro_update_auth_status;
Procedure proc_sleep(p_seconds In Number) Is
   v_start_time Timestamp;
   v_end_time   Timestamp;
Begin
   If p_seconds < 0 Then
      dbms_output.put_line('Negative seconds not allowed');
   Else
      v_start_time := systimestamp;
      v_end_time   := v_start_time + Interval '1' Second * p_seconds;
      Loop
         Exit When systimestamp >= v_end_time;
      End Loop;
   End If;
Exception
   When Others Then
      dbms_output.put_line('Error: ' || Sqlerrm);
End proc_sleep;

Procedure test_loop_delay(seconds Number) Is
Begin
   Begin
      dbms_output.put_line('start time: ' ||
                           to_char(Sysdate, 'DD-MON-YY HH24:MI:SS'));
      For i In 1 .. 5 Loop
         dbms_output.put_line('Iteration: ' || i || ' ' ||
                              to_char(Sysdate, 'DD-MON-YY HH24:MI:SS'));
         proc_sleep(seconds);
      End Loop;
   End;
End test_loop_delay;

End rpt_bi_report;

`;

// Function to extract table names from procedure text
function extractTableNames(procedureText) {
    const tableNames = new Set();
    const tableRegex = /\b(FROM|JOIN|INTO|UPDATE|DELETE\s+FROM)\s+([\w\d_]+)/gi;

    let match;
    while ((match = tableRegex.exec(procedureText)) !== null) {
        tableNames.add(match[2]);
    }

    return Array.from(tableNames);
}

// Extract and print table names
const tables = extractTableNames(procedureText);
console.log(tables);
