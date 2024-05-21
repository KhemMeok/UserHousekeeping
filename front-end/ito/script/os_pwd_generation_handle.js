/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
/// <reference path="os_pwd_generation.js" />

let os_user_data = "";
var opt_list_system = "";
let opt_list_env = '<option value=""></option>';
let opt_list_os_platform = '<option value=""></option>';
let opt_site = '<option value=""></option>';
function OSPasswordGenerateFnFirstLoadCallBack(data) {
  os_user_data = data;
  if (data.status === "1") {
    // system type
    opt_list_system = "";
    $.each(data.data.dataSytemType, function (i, item) {
      if (i === 0) {
        opt_list_system = '<option value=""></option>';
        opt_list_system +=
          '<option value="' +
          item.system_id +
          '"' +
          (item.system_name == "Operating System" ? " selected" : "") +
          ">" +
          item.system_name +
          "</option>";
      } else {
        opt_list_system +=
          '<option value="' +
          item.system_id +
          '"' +
          (item.system_name == "Operating System" ? " selected" : "") +
          ">" +
          item.system_name +
          "</option>";
      }
    });
    selectionStyle.LiveSearch("os_pwd_system_type_select", opt_list_system);
    $("#os_pwd_system_type_select").prop("disabled", true);

    // env select
    opt_list_env = '<option value=""></option>';
    opt_list_os_platform = '<option value=""></option>';
    $.each(data.data.dataGetENVs, function (i, item) {
      if (item.type === "ENV") {
        if (i === 0) {
          opt_list_env = '<option value=""></option>';
          opt_list_env =
            opt_list_env +
            '<option value="' +
            item.env_name +
            '">' +
            item.env_name +
            "</option>";
        } else {
          opt_list_env =
            opt_list_env +
            '<option value="' +
            item.env_name +
            '">' +
            item.env_name +
            "</option>";
        }
      } else if (item.type === "OS PLATFORM") {
        opt_list_os_platform =
          opt_list_os_platform +
          '<option value="' +
          item.env_name +
          '">' +
          item.env_name +
          "</option>";
      }
    });
    selectionStyle.LiveSearch("os_pwd_Env_select", opt_list_env);
    selectionStyle.LiveSearch("os_user_password_env_filter", opt_list_env);
    selectionStyle.LiveSearch("os_pwd_platform_select", opt_list_os_platform);
    selectionStyle.LiveSearch(
      "os_user_password_platform_filter",
      opt_list_os_platform
    );
    //site_filter
    opt_site = '<option value=""></option>';
    $.each(data.data.dataSite, function (i, item) {
      if (item.type == "SITE") {
        opt_site +=
          '<option value="' + item.name + '">' + item.name + "</option>";
      }
    });
    selectionStyle.LiveSearch("os_pwd_site_select", opt_site);
    selectionStyle.LiveSearch("os_user_password_site_filter", opt_site);
    // get admin user
    CallAPI.Go(
      v_OsPasswordchangeGetAdminUser,
      undefined,
      OsPwdFnGetAdminUserIdCallback
    );
  } else {
    goAlert.alertError("Processing Failed", data.message);
  }
}


function OsPwdFnOsPasswordChangeInsertRecordCallBack(data) {
  if (data.status === "1") {
    OsPwdDataForInsert = "";
    OsPwdDataForUpdate = "";
    //OsPwdFnClearAll(); // remove clear
    isExcludeUserModual == false ? OsPwdFnGetRecordData() : OsPwdFnGetUserExclude();
    goAlert.alertInfo("Os User Password", data.message);
  } else {
    goAlert.alertError("Processing Failed", data.message);
  }
}
let allRecordInCSV;
let isEncrypted = "N";
function OsPwdFnGetRecordTableCallBack(data) {
  if (data.status === "1") {
    // apply role to sl option
    //fnGetUserRolesFromFirstLoadData();
    allRecordInCSV =
      isAdmin === true
        ? data.data.allRecordUserPassword
        : data.data.allRecordUserPassword.filter((data) => {
          return data.staff_id == STAFF_ID;
        });
    OsPwdApplyDataToTable(allRecordInCSV);
  } else {
    goAlert.alertError("Processing Failed", data.message);
  }
}
function OsPwdApplyDataToTable(data) {
  let columns = [
    {
      data: "record_id",
      render: function (record_id) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          record_id +
          "' />"
        );
      },
      sortable: true,
    },
    { data: "record_id" },
    { data: "record_date" },
    { data: "host_name" },
    { data: "user_name" },
    { data: "site" },
    { data: "staff_id" },
  ];
  columns.push({
    data: "password",
    render: function (data, type, row) {
      const encrypt = row.encrypt;

      if (encrypt === "Y") {
        const passwordLength = 13;
        const stars = "*".repeat(passwordLength);
        return `
                <div style="margin: 0 0 0 0;">
                    <button type="button" onclick="OsPwdFnGetUserPwdTmpById(${row.record_id.toString()},'N')" style="margin: 0 5px; color: black; border: none; background-color: white;">
                        <i class="fa fa-eye-slash"></i>
                    </button>
                    ${stars}
                </div>`;
      } else {
        return `<div style="margin: 0 0 0 0;">
                <button type="button" onclick="OsPwdFnGetUserPwdTmpById(${row.record_id.toString()},'Y')" style="margin: 0 5px; color: black; border: none; background-color: white;">
                    <i class="fa fa-eye"></i>
                </button>
                ${data}
           </div>`;
      }
    },
    sortable: false,
  });
  columns.push(
    { data: "os_platform" },
    { data: "environment" },
    { data: "create_by" },
    { data: "last_oper_by" },
    { data: "last_oper_date" },
    {
      data: "",
      render: function () {
        return "";
      },
    }
  );

  try {
    if (data !== undefined) {
      console.log("true apply data");
      const filteredData =
        isAdmin === true
          ? data
          : data.filter((data) => {
            return data.staff_id == STAFF_ID;
          });
      dataTable.ApplyJson(
        "os_user_password_table_listing",
        columns,
        filteredData
      );
    } else {
      dataTable.ApplyJson("os_user_password_table_listing", columns, []);
      console.log("Data is empty");
    }
  } catch (error) {
    console.error("Error:", error.message);
    dataTable.ApplyJson("os_user_password_table_listing", columns, []);
  }
}
let isAdmin = false;
let allUserAdminIds = [];
function OsPwdFnGetAdminUserIdCallback(data) {
  let arr_user_id = data.user_id.toString().split(",");
  arr_user_id.forEach(function (item) {
    if (item !== "" && !allUserAdminIds.includes(item)) {
      allUserAdminIds.push(item);
    }
  });
  isAdmin = allUserAdminIds.includes(STAFF_ID);
  if (isAdmin) {
    document.getElementById("os_user_password_exclude_user").style.display = "";
    document.getElementById(
      "os_user_password_table_listing_show_pwd"
    ).style.display = "";
  } else {
    document.getElementById("os_user_password_exclude_user").style.display =
      "none";
    document.getElementById(
      "os_user_password_table_listing_show_pwd"
    ).style.display = "none";
  }
  OsPwdFnGetRecordData();
}

function OsPwdFnGetUserPwdTmpById(id, encrypt) {
  CallAPI.Go(
    v_OsPasswordGetUserTmpById,
    { id: id.toString(), encrypt: encrypt },
    OsPwdFnGetUserPwdTmpByIdCallback,
    "Processing.."
  );
}
function OsPwdFnGetUserPwdTmpByIdCallback(data) {
  if (data.status === "1") {
    let status = OsPwdFnUpdateRecordById(allRecordInCSV, data.data);
    if (status) {
      OsPwdApplyDataToTable(allRecordInCSV);
    }
  }
}
function OsPwdFnUpdateRecordById(originalData, newData) {
  const recordIdToUpdate = newData.record_id;

  // Find the index of the record with the matching record_id
  const indexToUpdate = originalData.findIndex(
    (record) => record.record_id === recordIdToUpdate
  );

  // If a matching record is found, update it
  if (indexToUpdate !== -1) {
    originalData[indexToUpdate] = newData;
    return true;
  } else {
    console.log("Record not found");
    return false;
  }
}
