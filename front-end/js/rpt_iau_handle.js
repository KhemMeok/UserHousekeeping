
/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />

// global variables
var iau_id_tab_process = "1";
let iau_bool_status_insert_process_step = false;
var iau_status_get_bi_housekeeping = false;

function iau_fn_get_correct_date_format(dateShort) {
    return "01-" + dateShort;
}
function iau_fn_update_element_enableOrDisable(elementId, value) {
    if (elementId !== "" && value !== "") {
        var element = document.getElementById(elementId);
        if (element !== null) {
            element.disabled = value;
        } else {
            console.error("Element with ID '" + elementId + "' not found.");
        }
    } else {
        console.error("Invalid element ID or value.");
    }
}
function fnUpdateElementTextUserHousekeeping(elementId, text) {
    if (element !== null && text !== undefined) {
        document.getElementById(elementId).textContent = text !== "0" ? text : "";
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}
function fnUpdateIconClassUserHousekeeping(elementId, status) {
    fnAddIconClassUserHousekeeping(
        elementId,
        fnGetIconByStatusUserHousekeeping(status)
    );
}
function RPTIAUfnUpdateProcessData(obj) {
    let { elementId, valStep, category } = obj;
    if (category.toString().toLowerCase() === "btn") {
        iau_fn_update_element_enableOrDisable(
            elementId,
            valStep.toString().toLowerCase() === "n" ? true : false
        );
    }
}
function RPTIAUFnSetColorByStatus(elementId, status) {
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
    RPTIAUFnSetColorByStatus(status.eleId, status.status);
}
let currentProcess = null;
const processMap = {}; 
async function iau_fn_call_next_process(
    fn,
    checkStatusFn,
    interval,
    maxTries,
    processName,
    allowCancel = false // Default value is true
) {
    // Cancel the current process with the given process name if it exists and cancelation is allowed
    if (allowCancel && processMap[processName]) {
        console.log("Canceling the current process: " + processName);
        processMap[processName].cancel(); // Cancel the ongoing process
    }

    let numTries = 0;

    // Flag to track if the process is canceled
    let isCanceled = false;

    // Function to cancel the process
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

    // Start the retry process
    const retryPromise = retry();

    // Store information about the ongoing process if cancelation is allowed
    if (allowCancel) {
        processMap[processName] = {
            cancel,
        };
    }

    // Wait for the retry process to complete
    const result = await retryPromise;

    // Clear the reference to the current process if cancelation is allowed
    if (allowCancel) {
        delete processMap[processName];
    }

    return result;
}

// Function to cancel a process by its name
function cancelProcess(processName) {
    if (processMap[processName]) {
        console.log("Canceling process: " + processName);
        processMap[processName].cancel(); // Cancel the process
        delete processMap[processName]; // Remove it from the process map
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
    if (iau_id_tab_process == "1") {
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
            }
        },
        ""
    );
}

async function rpt_iau_fn_insert_process_step_all(stepName) {
    iau_bool_status_insert_process_step = false;
    const handleInsertProcessStep = (processId, description, dateProcess) => {
        rpt_iau_fn_insert_process_step(
            processId,
            "Y",
            iau_fn_get_correct_date_format(dateProcess),
            iau_id_tab_process,
            description,
            (data) => {
                if (data.status === "1") {
                    iau_bool_status_insert_process_step = true;
                    console.log(`Insert process step ${stepName} complete :(`);
                } else {
                    console.log("insert process step fail");
                }
                setTimeout(() => {
                    iau_fn_call_next_process(
                        () => fnGetProcessStepUserHousekeeping(),
                        () => iau_bool_status_insert_process_step,
                        1000,
                        100,
                        "Up_af_In"
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
                iau_fn_call_next_process(
                    () => handleInsertProcessStep("1", "-", date),
                    () => iau_status_get_bi_housekeeping,
                    1000,
                    100,
                    "ins_pro_st"
                );
                iau_fn_call_next_process(
                    () => rpt_iau_fn_refresh_listing("getReportListing", date),
                    () => iau_bool_status_insert_process_step,
                    1000,
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
                () => iau_bool_status_insert_process_step,
                1000,
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
                    () => iau_bool_status_insert_process_step,
                    1000,
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
                    () => iau_bool_status_insert_process_step,
                    1000,
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
                    1000,
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
                    1000,
                    100,
                    "get_bi_deletion"
                );
            }
            break;
    }
}

async function fnGetBIUserHousekeeping(type) {
    iau_status_get_bi_housekeeping = false;
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
                iau_status_get_bi_housekeeping = true;
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
    const biApproveDateReportInput = $("#iau_report_date_approve_scr");
    if (iau_id_tab_process === "1") {
        date =
            biDateReportInput.val() !== undefined
                ? biDateReportInput.val()
                : biApproveDateReportInput.val();
    }
    if (date && iau_id_tab_process) {
        const formattedDate = iau_fn_get_correct_date_format(date);
        if (formattedDate) {
            const data = { date: formattedDate, tabProcess: iau_id_tab_process };
            callApi(url_get_process_step,data,fnGetProcessStepCallbackUserHousekeeping); //TODO: change to original call api
            // CallAPI.Go(
            //     varUrlGetProcessStep,
            //     data,
            //     fnGetProcessStepCallbackUserHousekeeping,
            //     ""
            // );
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
            RPTIAUfnUpdateProcessData(obj);
        } // Update status

        fnUpdateStatusUserHousekeeping(
            data.data.staProcess.bi_housekeeping.update_status,
            "td_update_user_status_bi_housekeeping",
            "txt_ms_update_user_status_bi_housekeeping",
            "icon_status_update_user_status_bi_housekeeping",
            "icon_ms_update_user_status_bi_iau"
        ); // Update email
        fnUpdateStatusUserHousekeeping(
            data.data.staProcess.bi_housekeeping.update_email,
            "td_update_user_email_bi_housekeeping",
            "txt_ms_update_user_email_bi_housekeeping",
            "icon_status_update_user_email_bi_housekeeping",
            "icon_ms_update_user_email_bi_iau"
        ); // Pull last login
        fnUpdateStatusUserHousekeeping(
            data.data.staProcess.bi_housekeeping.pull_last_login,
            "td_ms_pull_last_login_bi_housekeeping",
            "txt_ms_pull_last_login_bi_housekeeping",
            "icon_status_pull_last_login_bi_housekeeping",
            "icon_ms_pull_last_login_user_bi_iau"
        ); // Get bi inactive
        fnUpdateStatusUserHousekeeping(
            data.data.staProcess.bi_housekeeping.get_bi_housekeeping,
            "td_get_bi_iau",
            "txt_ms_get_bi_iau",
            "icon_status_get_bi_iau",
            "icon_ms_get_bi_iau"
        );
        fnUpdateStatusUserHousekeeping(
            data.data.staProcess.bi_housekeeping.close_bi_user,
            "td_get_bi_user_deletion_bi_housekeeping",
            "txt_ms_get_bi_deletion_bi_housekeeping",
            "icon_status_get_bi_deletion_bi_housekeeping",
            "icon_ms_get_bi_user_deletion_bi_housekeeping"
        );
        // update notifi
        // rpt_iau_fn_get_notify_all(); //TODO: uncomment and change position to call this function
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
var statusGenerateDBHkp = false;
function fnGenerateUserHousekeepingDBHousekeeping() {
    // Init status
    statusGenerateDBHkp = false;
    let reportDate = $("#db_date_report_id").val(); //call api get db housekeeping
    CallAPI.Go(
        url_pull_db_iau,
        { date: iau_fn_get_correct_date_format(reportDate) },
        () => {
            setTimeout(() => {
                statusGenerateDBHkp = true;
                console.log("Complete generate database user housekeeping.");
            }, 2000);
        },
        ""
    );
}
let statusSentMailDBUserHousekeeping = false;
function fnSentMailInformDBUserHousekeeping() {
    statusSentMailDBUserHousekeeping = false;
    let reportDate = $("#db_date_report_id").val();
    let date = iau_fn_get_correct_date_format(reportDate);
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
        ""
    );
}
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
            iau_fn_apply_data_to_tb_bi_user_update_status(d.data);
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
    if (date && iau_id_tab_process) {
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
            RPTIAUfnUpdateProcessData(obj);
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
        console.log("error date" + date);
    }
}
//url_get_iau_get_notifi
function rpt_iau_fn_get_notify_all() {
    let _date = $("#bi_date_report_ele_id").val();
    let date = iau_fn_get_correct_date_format(_date);
    CallAPI.Go(url_get_iau_get_notifi, { date: date }, (data) => {
        if (data.status === "1") {
            data.data.forEach((d) => {
                const element = document.getElementById(d.ele_id);
                if (element && d.noti.toString() !== "") {
                    element.textContent =
                        d.noti.toString() == "0" ? "" : d.noti.toString();
                } else {
                    console.log("Element not found or 'noti' is empty.");
                }
            });
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
function rpt_iau_fn_bi_update_status_tab_select() {
    // set active listing tab
    $('.nav-tabs a[href="#rpt_bi_update_status_listing_tab"]').tab("show");
    // set attributes btn and date report
    $("#RptBIHkpRefreshBTN").attr(
        "onclick",
        "iau_fn_get_listing_bi_user_update_status()"
    );
    $("#rang_date_id_iau").attr(
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
    rpt_iau_fn_toggle_element_show_hide(hideElementIds, "hide");
    // refresh listing
    setTimeout(() => {
        iau_fn_get_listing_bi_user_update_status();
    }, 500);
}
function iau_fn_bi_iau_tab_select() {
    // set active listing tab
    $('.nav-tabs a[href="#rpt_bi_inactive_listing_tab"]').tab("show");
    // set attributes tbn and date report change
    $("#RptBIHkpRefreshBTN").attr(
        "onclick",
        "rpt_iau_fn_refresh_listing('getReportListing')"
    );
    $("#rang_date_id_iau").attr(
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
function iau_fn_bi_tab_select() {
    $('.nav-tabs a[href="#rpt_bi_inactive_listing_tab"]').tab("show");
    $("#RptBIHkpRefreshBTN").attr(
        "onclick",
        "iau_fn_refresh_listing_bi_housekeeping()"
    );
    $("#rang_date_id_iau").attr(
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
    rpt_iau_fn_toggle_element_show_hide(showElementIds, "show");
    rpt_iau_fn_toggle_element_show_hide(hideElementIds, "hide");
    fnGetProcessStepUserHousekeeping("1");
    //dataTable.Recal(); //TODO: uncomment
    setTimeout(
        rpt_iau_fn_apply_data_to_table_bi_user_inactive(
            [],
            "rpt_bi_inactive_listing"
        ),
        500
    );
    //setTimeout(rpt_iau_fn_get_ito_user(), 2000); //TODO: call get ito user
}
function rpt_iau_fn_db_tab_select() {
    // set active tab
    iau_id_tab_process = "2002";

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
    iau_id_tab_process == "2002";
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
function iau_fn_get_bi_inactive_listing() {
    let date = $("#bi_date_report_ele_id").val();
    CallAPI.Go();
}