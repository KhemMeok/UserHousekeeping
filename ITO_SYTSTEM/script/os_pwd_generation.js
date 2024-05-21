/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
/// <reference path="os_pwd_generation_handle.js" />

function OsPwdFnCloseModual() {
  isExcludeUserModual = false;
  OsPwdFnClearAllExcludeUser();
  selectionStyle.Multiple("os_pwd_host_name_exclude_list", "<option></option>");
  selectionStyle.Multiple("os_pwd_user_exclude_list", "<option></option>");
}
var isExcludeUserModual = false;
let opt_list_end_point = "";
function OsPwdFnHostSelect() {
  let hostName = "";
  hostName =
    isExcludeUserModual == false
      ? $("#os_pwd_host_name_list").val()
      : $("#os_pwd_host_name_exclude_list").val();
  opt_list_end_point = '<option value=""></option>';
  selectionStyle.Multiple("os_pwd_user_list", '<option value=""></option>');
  let userHostFilter = [];
  console.log("hostSelected", os_user_data);
  $.each(os_user_data.data.dataGetOSUsers, function (i, item) {
    hostName.forEach(function (host) {
      if (allUserAdminIds.includes(STAFF_ID)) {
        if (
          item.host_id.toUpperCase() ===
          host.toString().split("~")[1].toUpperCase()
        ) {
          if (
            !userHostFilter.some(function (filteredItem) {
              return (
                filteredItem.host_id.toUpperCase() ===
                  item.host_id.toUpperCase() &&
                filteredItem.user_name.toUpperCase() ===
                  item.user_name.toUpperCase()
              );
            })
          ) {
            userHostFilter.push(item);
          }
        }
      } else if (
        item.host_id.toUpperCase() ===
          host.toString().split("~")[1].toUpperCase() &&
        item.staff_id.toUpperCase() === STAFF_ID.toUpperCase() &&
        item.role.toLowerCase().trim() === "normal user"
      ) {
        if (
          !userHostFilter.some(function (filteredItem) {
            return (
              filteredItem.host_id.toUpperCase() ===
                item.host_id.toUpperCase() &&
              filteredItem.user_name.toUpperCase() ===
                item.user_name.toUpperCase()
            );
          })
        ) {
          userHostFilter.push(item);
        }
      }
    });
  });
  $.each(userHostFilter, function (i, item) {
    let arr_username =
      item.user_name + "~" + item.host_id + "~" + item.staff_id;
    if (i === 0) {
      opt_list_end_point = '<option value=""></option>';
      opt_list_end_point =
        opt_list_end_point +
        '<option value="' +
        arr_username +
        '">' +
        "[" +
        item.host_name +
        "] ~ " +
        item.user_name +
        "</option>";
    } else {
      opt_list_end_point =
        opt_list_end_point +
        '<option value="' +
        arr_username +
        '">' +
        "[" +
        item.host_name +
        "] ~ " +
        item.user_name +
        "</option>";
    }
  });
  // before
  OsPwdFnUserSelected("before");
  // set new
  if (isExcludeUserModual == false) {
    selectionStyle.Multiple("os_pwd_user_list", opt_list_end_point);
  } else {
    selectionStyle.Multiple("os_pwd_user_exclude_list", opt_list_end_point);
  }
  // after
  OsPwdFnUserSelected("after");
}
function OsPwdFnOSPlatformSelect() {
  selectionStyle.Multiple("os_pwd_host_name_list", "");
  selectionStyle.Multiple("os_pwd_user_list", "");
  let opt_list_host_name = "";
  let sys_type =
    isExcludeUserModual == false
      ? $("#os_pwd_system_type_select").val()
      : $("#os_pwd_system_type_exclude_select").val();
  let site =
    isExcludeUserModual == false
      ? $("#os_pwd_site_select").val()
      : $("#os_pwd_site_exclude_select").val();
  let env =
    isExcludeUserModual == false
      ? $("#os_pwd_Env_select").val()
      : $("#os_pwd_Env_exclude_select").val();
  let os_platform =
    isExcludeUserModual == false
      ? $("#os_pwd_platform_select").val()
      : $("#os_pwd_platform_exclude_select").val();
  let arrHostFilter = [];
  console.log("data1", sys_type, site, env, os_platform);
  if (
    sys_type !== null &&
    sys_type !== undefined &&
    site !== null &&
    site !== undefined &&
    env !== null &&
    env !== undefined &&
    os_platform !== null &&
    os_platform !== undefined
  ) {
    console.log("ture1");
    if (allUserAdminIds.includes(STAFF_ID)) {
      $.each(os_user_data.data.dataGetHostNames, function (i, item) {
        if (
          item.system_type.toUpperCase() ===
            sys_type.toString().toUpperCase() &&
          item.site.toUpperCase() === site.toString().toUpperCase() &&
          item.env.toUpperCase() === env.toString().toUpperCase() &&
          item.os_platform.toUpperCase() ===
            os_platform.toString().toUpperCase()
        ) {
          console.log("ture2");
          if (
            !arrHostFilter.some(function (filteredItem) {
              return filteredItem.host_id === item.host_id;
            })
          ) {
            arrHostFilter.push(item);
          }
        }
      });
    } else {
      $.each(os_user_data.data.dataGetHostNames, function (i, item) {
        if (
          item.system_type.toUpperCase() ===
            sys_type.toString().toUpperCase() &&
          item.site.toUpperCase() === site.toString().toUpperCase() &&
          item.env.toUpperCase() === env.toString().toUpperCase() &&
          item.os_platform.toUpperCase() ===
            os_platform.toString().toUpperCase() &&
          item.staff_id.toUpperCase() === STAFF_ID.toUpperCase()
        ) {
          console.log("ture3");
          if (
            !arrHostFilter.some(function (filteredItem) {
              return filteredItem.host_id === item.host_id;
            })
          ) {
            arrHostFilter.push(item);
          }
        }
      });
    }
  }
  console.log("ArrayHostFilter", arrHostFilter);
  $.each(arrHostFilter, function (i, item) {
    if (i === 0) {
      opt_list_host_name = '<option value=""></option>';
      opt_list_host_name =
        opt_list_host_name +
        '<option value="' +
        item.host_name +
        "~" +
        item.host_id +
        '">' +
        item.host_name +
        "</option>";
    } else {
      opt_list_host_name =
        opt_list_host_name +
        '<option value="' +
        item.host_name +
        "~" +
        item.host_id +
        '">' +
        item.host_name +
        "</option>";
    }
  });
  if (isExcludeUserModual == false) {
    selectionStyle.Multiple("os_pwd_host_name_list", opt_list_host_name);
  } else {
    selectionStyle.Multiple(
      "os_pwd_host_name_exclude_list",
      opt_list_host_name
    );
  }
}
function OsPwdFnEnvSelect() {
  if (isExcludeUserModual == false) {
    $("#os_pwd_platform_select").prop("selectedIndex", 0).change();
  } else {
    $("#os_pwd_platform_exclude_select").prop("selectedIndex", 0).change();
  }
}
function OsPwdFnSystemTypeSelect() {
  $("#os_pwd_site_select").prop("selectedIndex", 0).change();
  $("#os_pwd_Env_select").prop("selectedIndex", 0).change();
  $("#os_pwd_platform_select").prop("selectedIndex", 0).change();
}
function OsPwdFnSiteChange() {
  if (isExcludeUserModual == false) {
    console.log("st1");
    $("#os_pwd_Env_select").prop("selectedIndex", 0).change();
    $("#os_pwd_platform_select").prop("selectedIndex", 0).change();
  } else if (isExcludeUserModual == true) {
    console.log("st2");
    $("#os_pwd_Env_exclude_select").prop("selectedIndex", 0).change();
    $("#os_pwd_platform_exclude_select").prop("selectedIndex", 0).change();
  }
}
function OsPwdFnInsertRecordHandle(usedOn) {
  UsedOn = usedOn;
  if (isExcludeUserModual == false) {
    let password = $("#os_user_password_password_input").val();
    if (!checkPasswordPolicy(password)) {
      goAlert.alertErroTo(
        "os_user_password_password_input",
        "Password",
        "Password not correctly required"
      );
      return false;
    } else {
      OsPwdFnGetPwdEncrypt(password);
    }
  } else {
    OsPwdFnInsertRecord();
  }
}
function OsPwdGetDataAll(type) {
  let hostName =
    isExcludeUserModual == false
      ? $("#os_pwd_host_name_list").val()
      : $("#os_pwd_host_name_exclude_list").val();
  let userName =
    isExcludeUserModual == false
      ? $("#os_pwd_user_list").val()
      : $("#os_pwd_user_exclude_list").val();
  console.log(isExcludeUserModual);
  console.log(hostName);
  console.log(userName);
  let date = $("#os_pwd_date_input").val();
  let password = $("#os_user_password_password_input").val();
  let all_host_name = hostName.toString();
  let all_user_name = userName.toString();
  let sta = true;
  if (isExcludeUserModual == false) {
    if (!checkPasswordPolicy(password)) {
      goAlert.alertErroTo(
        "os_user_password_password_input",
        "Processing Failed",
        "Password not match require!",
        "input"
      );
      sta = false;
      return false;
    }
    if (type === "insert") {
      if (all_host_name === "") {
        goAlert.alertErroTo(
          "os_pwd_host_name_list",
          "Processing Failed",
          "Host name must be select",
          "change"
        );
        sta = false;
        return false;
      }
    }
    console.log(all_user_name);
    if (all_user_name === "") {
      goAlert.alertErroTo(
        "os_pwd_user_list",
        "Processing Failed",
        "User must be select",
        "change"
      );
      sta = false;
      return false;
    }
    if (date === null || date === "") {
      goAlert.alertErroTo(
        "os_pwd_date_input",
        "Processing Failed",
        "Date must be input",
        "input"
      );
      sta = false;
      return false;
    }
    if (password === "") {
      goAlert.alertErroTo(
        "os_user_password_password_input",
        "Processing Failed",
        "password must be input",
        "input"
      );
      sta = false;
      return false;
    }
  }
  let data = {
    data: {
      record_date: date,
      host_name: all_host_name,
      user_name: all_user_name,
      password: isExcludeUserModual == true ? "" : passwordEncrypt,
      type:
        isExcludeUserModual == true
          ? $("#os_pwd_exclude_type_select").val()
          : "pwdGen",
    },
    status: sta,
  };
  console.log(data);
  return data;
}
let OsPwdDataForInsert;
function OsPwdFnInsertRecord() {
  OsPwdDataForInsert = OsPwdGetDataAll("insert");
  if (OsPwdDataForInsert.status) {
    CallAPI.Go(
      v_OsPasswordchangeInsertRecord,
      OsPwdDataForInsert.data,
      OsPwdFnOsPasswordChangeInsertRecordCallBack,
      "Process"
    );
  }
}
function OsPwdHandleCheckboxClick() {
  console.log("admin user", STAFF_ID);
  var checkbox = document.getElementById(
    "os_user_password_table_listing_show_pwd"
  );
  if (checkbox.checked) {
    OsPwdFnGetRecordDataUnEncrypt();
  } else {
    OsPwdFnGetRecordData();
  }
}
function OsPwdFnRefreshDataTable() {
  $("#os_user_password_site_filter").prop("selectedIndex", 0).change();
  $("#os_user_password_env_filter").prop("selectedIndex", 0).change();
  $("#os_user_password_platform_filter").prop("selectedIndex", 0).change();
  OsPwdFnGetRecordData();
}
function OsPwdFnGetRecordData() {
  isEncrypted = "Y";
  CallAPI.Go(
    v_OsPasswordchangeGetRecordTable,
    { encrypt: "Y", env: "A" },
    OsPwdFnGetRecordTableCallBack,
    "Processing.."
  );
}
function OsPwdFnGetRecordDataUnEncrypt() {
  isEncrypted = "N";
  CallAPI.Go(
    v_OsPasswordchangeGetRecordTable,
    { encrypt: "N", env: "A" },
    OsPwdFnGetRecordTableCallBack,
    "Processing.."
  );
}
letv_arr_list = [];
lettmp_v_arr_list = [];
function OsPwdFnWriteDataToCSVFile() {
  CallAPI.Go(
    v_OsPasswordchangeGenerateCSVFile,
    undefined,
    OsPwdFnGenerateCSVFileCallBack
  );
}
function OsPwdFnGenerateCSVFileCallBack(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Export", data.message);
  }
}
var passwordEncrypt;
function OsPwdFnUpdateRecordHandle(usedOn) {
  UsedOn = usedOn;
  OsPwdOperation = "update";
  let password = $("#os_user_password_password_input").val();
  if (modals.ConfirmShowAgain("user_os_pwd_update_data") === true) {
    modals.Confirm(
      "Update User Confirm",
      "Are you sure to update user ?",
      "N",
      "Yes",
      "onclick",
      "OsPwdFnGetPwdEncrypt('" + password + "')",
      "user_os_pwd_update_data"
    );
  } else {
    OsPwdFnGetPwdEncrypt(password);
  }
}
var OsPwdDataForUpdate;
function OsPwdFnUpdateRecord() {
  modals.CloseConfirm();
  OsPwdDataForUpdate = OsPwdGetDataAll("update");
  console.log("data all:", OsPwdDataForUpdate.data);
  OsPwdDataForUpdate.data.ids = OSPwdGetRecordIdSelect().id;
  delete OsPwdDataForUpdate.data.host_name;
  delete OsPwdDataForUpdate.data.user_name;
  const maxDate = new Date(
    Math.max.apply(
      null,
      arrRecordDate.map(function (date) {
        return new Date(date);
      })
    )
  );
  let newDate = OsPwdDataForUpdate.data.record_date.toString().split("/");
  var date = new Date(newDate[2], newDate[1] - 1, newDate[0]);
  let status = date > maxDate ? true : false;
  if (OsPwdDataForUpdate.status === true && status === true) {
    CallAPI.Go(
      v_OsPasswordchangeUpdateRecordCSVFile,
      OsPwdDataForUpdate.data,
      OsPwdFnOsPasswordChangeInsertRecordCallBack,
      "Processing"
    );
    //console.log('call api');
  } else {
    goAlert.alertErroTo(
      "os_pwd_date_input",
      "Processing Failed",
      "Next effective date must be grater then old date!",
      "input"
    );
    return false;
  }
}
function checkPasswordPolicy(password) {
  const PASSLENGTH = 14;
  const MINDIFF = 3;
  const MINALPHA = 2;
  const MINUPPER = 1;
  const MINLOWER = 0;
  const MINSPECIAL = 1;
  const MINDIGIT = 1;
  const MAXREPEATS = 1;
  const WHITESPACE = "no";

  // Check password length
  if (password.length < PASSLENGTH) {
    return false;
  }

  // Check minimum number of character types
  let diffChars = new Set(password).size;
  let alphaChars = password.match(/[a-z]/gi)?.length || 0;
  let upperChars = password.match(/[A-Z]/g)?.length || 0;
  let lowerChars = password.match(/[a-z]/g)?.length || 0;
  let specialChars = password.match(/[^\w\s]/g)?.length || 0;
  let digitChars = password.match(/\d/g)?.length || 0;

  if (
    diffChars < MINDIFF ||
    alphaChars < MINALPHA ||
    upperChars < MINUPPER ||
    lowerChars < MINLOWER ||
    specialChars < MINSPECIAL ||
    digitChars < MINDIGIT
  ) {
    return false;
  }

  // Check maximum number of repeated characters
  if (MAXREPEATS > 0) {
    let repeatChars = password.match(/(.)\1+/g) || [];
    let maxRepeatChars = Math.max(...repeatChars.map((s) => s.length));
    if (maxRepeatChars > MAXREPEATS) {
      return false;
    }
  }

  // Check whitespace
  if (WHITESPACE === "no" && /\s/.test(password)) {
    return false;
  }

  return true;
}
function applypassword() {
  let password = generatePassword();
  console.log(password);
  $("#os_user_password_password_input").val(password);
}
function generatePassword() {
  const PASSLENGTH = 14;
  const NAMECHECK = "NO";
  const MINDIFF = 3;
  const MINALPHA = 2;
  const MINUPPER = 1;
  const MINLOWER = 0;
  const MINSPECIAL = 1;
  const MINDIGIT = 1;
  const MINNONALPHA = 1;
  const MAXREPEATS = 1;
  const WHITESPACE = "no";

  let password = "";
  let usedChars = [];

  // Add minimum number of uppercase letters
  for (let i = 0; i < MINUPPER; i++) {
    let charCode = getRandomCharCode("upper");
    password += String.fromCharCode(charCode);
    usedChars.push(charCode);
  }

  // Add minimum number of lowercase letters
  for (let i = 0; i < MINLOWER; i++) {
    let charCode = getRandomCharCode("lower");
    password += String.fromCharCode(charCode);
    usedChars.push(charCode);
  }

  // Add minimum number of special characters
  for (let i = 0; i < MINSPECIAL; i++) {
    let charCode = getRandomCharCode("special");
    password += String.fromCharCode(charCode);
    usedChars.push(charCode);
  }

  // Add minimum number of digits
  for (let i = 0; i < MINDIGIT; i++) {
    let charCode = getRandomCharCode("digit");
    password += String.fromCharCode(charCode);
    usedChars.push(charCode);
  }

  // Add remaining characters
  while (password.length < PASSLENGTH) {
    let charCode = getRandomCharCode();
    if (!usedChars.includes(charCode)) {
      password += String.fromCharCode(charCode);
      usedChars.push(charCode);
    }
  }

  return password;

  function getRandomCharCode(type) {
    let charCode;
    if (type === "upper") {
      charCode = Math.floor(Math.random() * 26) + 65;
    } else if (type === "lower") {
      charCode = Math.floor(Math.random() * 26) + 97;
    } else if (type === "digit") {
      charCode = Math.floor(Math.random() * 10) + 48;
    } else if (type === "special") {
      let specials = "!@#$%^&{}?[]";
      charCode = specials.charCodeAt(
        Math.floor(Math.random() * specials.length)
      );
    } else {
      // Random character code
      let allChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%^&()+{}<>?\\//";
      charCode = allChars.charCodeAt(
        Math.floor(Math.random() * allChars.length)
      );
    }
    return charCode;
  }
}
function OsPwdCheckPasswordStrength() {
  const password = document.getElementById(
    "os_user_password_password_input"
  ).value;
  const passwordStrength = document.getElementById(
    "os_user_password_password_input"
  );
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])(?!.*(.).*\\1)[A-Za-z\\d@$!%*?&\\S]{14,}$"
  );
  const mediumRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?!.*(.).*\\1)[A-Za-z\\d@$!%*?&\\S]{14,}$"
  );

  if (password === "") {
    passwordStrength.style.color = "red";
  } else if (strongRegex.test(password)) {
    passwordStrength.style.color = "green";
  } else if (mediumRegex.test(password)) {
    passwordStrength.style.color = "orange";
  } else {
    passwordStrength.style.color = "red";
  }
}
function OsPwdFnAddEventToInput(type) {
  console.log("work");
  let pwd = document.getElementById("os_user_password_password_input");
  if (type === "over") {
    pwd.type = "text";
  } else if (type === "out") {
    pwd.type = "password";
  }
}
function OsPwdFnClearAll() {
  element.inputValue("os_pwd_date_input", "");
  element.inputValue("os_user_password_password_input", "");
  $("#os_pwd_site_select").prop("selectedIndex", 0).change();
  selectionStyle.Multiple("os_pwd_host_name_list", undefined);
  selectionStyle.Multiple("os_pwd_user_list", undefined);
  document.getElementById("os_user_password_insert").style.display = "";
  document.getElementById("os_user_password_update").style.display = "none";
  document.getElementById("os_user_password_clear").style.display = "none";
  record_id_edit = "";
  OsPwdDisableDiv("enable");
  arrRecordDate = [];
}
function OsPwdFnConformDeleteRecord() {
  let record_id_obj = [];
  record_id_obj = table.GetValueSelected("os_user_password_table_listing");
  if (record_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    return false;
  }
  if (record_id_obj.length > 1) {
    goAlert.alertError(
      "Processing Failed",
      "Operation does not support with multiple selection"
    );
    return false;
  }
  console.log(record_id_obj);
  let record_id = stringCreate.FromObject(record_id_obj);
  if (modals.ConfirmShowAgain("user_os_pwd_generation") === true) {
    modals.Confirm(
      "Edit User Confirm",
      "Are you sure to edit user ?",
      "N",
      "Yes",
      "onclick",
      "OsPwdFnDeleteRecordInCSV('" + record_id + "')",
      "user_os_pwd_generation1"
    );
  } else {
    OsPwdFnDeleteRecordInCSV(record_id);
  }
}
function OsPwdFnDeleteRecordInCSV(record_id) {
  modals.CloseConfirm();
  let data = {
    record_date: "",
    ids: record_id,
    password: "",
  };
  CallAPI.Go(
    v_OsPasswordchangeDeleteRecordCSVFile,
    data,
    OsPwdFnDeleteRecordCallBack,
    "Processing"
  );
}
function OsPwdFnDeleteRecordCallBack(data) {
  if (data.status === "1") {
    OsPwdFnGetRecordData();
    goAlert.alertInfo("Delete Record", data.message);
  } else {
    goAlert.alertError("Processing Failed", data.message);
  }
}
function OsPwdFnFilterById(records, recordId) {
  return records.filter((record) => record.record_id === recordId);
}
function OsPwdFnGetHostAndUser(records) {
  let result = [];
  for (let i = 0; i < records.length; i++) {
    let obj = {};
    obj.host_name = records[i].host_name;
    obj.user_name = records[i].user_name;
    result.push(obj);
  }
  return result;
}
function OsPwdFnCheckHostAndUserExist(userNames, records) {
  let status = false;
  let arrUser = userNames.toString().split(",");
  arrUser.forEach((userName) => {
    records.filter((record) => {
      if (
        userName.includes(
          record.user_name + "~" + record.host_id + "~" + record.staff_id
        )
      ) {
        status = true;
      }
    });
  });
  return status;
}
let arrUserName = [];
let OsPwdOperation = "";
function OsPwdFnCheckHostAndUserExistHandel(OsPwdOperation) {
  if (OsPwdOperation === "new") {
    OsPwdCheckUserSelected();
    let userName = $("#os_pwd_user_list").val();
    console.log("user select", userName);
    let tmpArrUserName = userName.toString().split(",");
    let status = OsPwdFnCheckHostAndUserExist(userName, allRecordInCSV);
    if (status) {
      goAlert.alertInfo("User already exists");
      $("#os_pwd_user_list").val(arrUserName);
      console.log("true", arrUserName.toString());
    } else {
      tmpArrUserName.forEach((arrUser) => {
        if (!arrUserName.includes(arrUser)) {
          arrUserName.push(arrUser);
        }
      });
      $("#os_pwd_user_list").val(arrUserName);
      console.log("false", arrUserName.toString());
    }
    OsPwdCheckUserSelected();
  }
}
function OsPwdCheckUserSelected() {
  let userName = $("#os_pwd_user_list").val();
  let tmpArrUserName = userName.toString().split(",");
  console.log("before", arrUserName);
  arrUserName = arrUserName.filter((arrUser) =>
    tmpArrUserName.includes(arrUser)
  );
  console.log("after", arrUserName);
  console.log(arrUserName.length, arrUserName.toString());
}
function OsPwdFnGetData(records) {
  console.log(records);
  if (records.length > 0) {
    const [
      {
        host_name,
        user_name,
        password,
        site,
        environment,
        os_platform,
        staff_id,
        record_date,
      },
    ] = records.map(
      ({
        host_name,
        user_name,
        password,
        site,
        environment,
        os_platform,
        staff_id,
        record_date,
      }) => ({
        host_name,
        user_name,
        password,
        site,
        environment,
        os_platform,
        staff_id,
        record_date,
      })
    );

    return {
      host_name: host_name,
      user_name: user_name,
      pwd: password,
      site: site,
      environment: environment,
      os_platform: os_platform,
      staff_id: staff_id,
      date: record_date,
    };
  }
}
function OSPwdGetRecordIdSelect() {
  let user_id_obj = table.GetValueSelected("os_user_password_table_listing");
  let sta = true;
  if (user_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    sta = false;
    return false;
  }
  return { id: user_id_obj.toString(), status: sta };
}
var arrRecordDate = [];
function OsPwdFnConformGetDataForUpdate() {
  let site = [];
  let environment = [];
  let userName = [];
  let osPlatform = [];
  OsPwdFnClearAll();
  let record_id = OSPwdGetRecordIdSelect();
  if (record_id.status) {
    record_id.id
      .toString()
      .split(",")
      .forEach((id) => {
        let record = OsPwdFnFilterById(allRecordInCSV, id);
        let dataUser = OsPwdFnGetData(record);
        userName.push(
          dataUser.user_name +
            "-" +
            dataUser.host_name +
            "-" +
            dataUser.staff_id
        );
        if (!site.includes(dataUser.site)) {
          site.push(dataUser.site);
        }
        if (!environment.includes(dataUser.environment)) {
          environment.push(dataUser.environment);
        }
        if (!osPlatform.includes(dataUser.os_platform)) {
          osPlatform.push(dataUser.os_platform);
        }
        var dateParts = dataUser.date.toString().split("/");
        var date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        if (!arrRecordDate.includes(new Date(date))) {
          arrRecordDate.push(new Date(date));
        }
      });
    if (site.length >= 2) {
      goAlert.alertError(
        "Processing Failed",
        "Operation not support multiple Site"
      );
      return false;
    }
    if (environment.length >= 2) {
      goAlert.alertError(
        "Processing Failed",
        "Operation not support multiple Environment"
      );
      return false;
    }
    if (osPlatform.length >= 2) {
      goAlert.alertError(
        "Processing Failed",
        "Operation not support multiple Platform"
      );
      return false;
    }
    //if (modals.ConfirmShowAgain("user_os_pwd_generation") === true) {
    //  modals.Confirm(
    //    "Edit User Confirm",
    //    "Are you sure to edit user ?",
    //    "N",
    //    "Yes",
    //    "onclick",
    //    "OsPwdFnGetDataForUpdate('" + userName + "')",
    //    "user_os_pwd_generation"
    //  );
    //} else {
    OsPwdFnGetDataForUpdate(userName);
    //}
  }
}
function OsPwdFnGetDataForUpdate(userName) {
  modals.CloseConfirm();
  let data = {
    userName: userName.toString(),
  };
  console.log(data);
  CallAPI.Go(
    v_OsPasswordchangeGetDataForUpdate,
    data,
    OsPwdFnGetDataHostNameUserCallBack,
    "Processing"
  );
}
function OsPwdFnGetDataHostNameUserCallBack(data) {
  if (data.status !== "1") {
    goAlert.alertError("GetHostNameUser", data.message);
  } else {
    let username = [];
    let hostName = [];
    let site = [];
    let env = [];
    let systemType = [];
    let osPlatform = [];
    $.each(data.data.dataUserUpdate, function (i, item) {
      if (!username.includes(item.userName + "~" + item.hostId)) {
        username.push(item.userName + "~" + item.hostId + "~" + item.staff_id);
      }
      if (!hostName.includes(item.hostName + "~" + item.hostId)) {
        hostName.push(item.hostName + "~" + item.hostId);
      }
      if (!site.includes(item.site)) {
        site.push(item.site);
      }
      if (!env.includes(item.enviroment)) {
        env.push(item.enviroment);
      }
      if (!systemType.includes(item.systemName)) {
        systemType.push(item.systemName);
      }
      if (!osPlatform.includes(item.os_platform)) {
        osPlatform.push(item.os_platform);
      }
    });
    let sysType = $("#os_pwd_system_type_select").val();
    sysType == "Operating System"
      ? console.log(systemType[0])
      : $("#os_pwd_system_type_select").val("Operating System").change();
    $("#os_pwd_site_select").val(site[0]).change();
    $("#os_pwd_Env_select").val(env[0]).change();
    $("#os_pwd_platform_select").val(osPlatform[0]).change();
    $("#os_pwd_host_name_list")
      .val(hostName)
      .after(() => {
        OsPwdFnHostSelect();
        $("#os_pwd_user_list").val(username);
        document.getElementById("os_user_password_insert").style.display =
          "none";
        document.getElementById("os_user_password_update").style.display = "";
        document.getElementById("os_user_password_clear").style.display = "";
      });
    OsPwdDisableDiv("disable");
    OsPwdFnScrollToTop();
  }
}
function OsPwdDisableDiv(type) {
  let arrDivForDisable = ["divSysType", "divSite", "divEnv", "divPla"];
  let arrDivMulSelect = ["divHostName", "divUser"];

  if (type === "disable") {
    arrDivForDisable.forEach((id) => {
      element.setDisable(id + " *");
    });
    arrDivMulSelect.forEach((id) => {
      OsPwdFnDisableMultipleSelect(true, id);
    });
  } else {
    arrDivForDisable.forEach((id) => {
      element.setEnable(id + " *");
    });
    arrDivMulSelect.forEach((id) => {
      OsPwdFnDisableMultipleSelect(false, id);
      element.setEnable(id + " *");
    });
  }
}
function OsPwdFnDisableMultipleSelect(action, id) {
  var parent = document.getElementById(id);
  var inputs = parent.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = action;
  }
  const selects = parent.getElementsByTagName("select");
  for (let i = 0; i < selects.length; i++) {
    selects[i].disabled = true;
    if (action) {
      selects[i].onchange = null;
    } else {
      $("#os_pwd_user_list").on("change", function () {
        OsPwdFnCheckHostAndUserExistHandel("new");
      });

      $("#os_pwd_host_name_list").on("change", function () {
        OsPwdFnHostSelect();
      });
    }
  }
  var textareas = parent.getElementsByTagName("textarea");
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].disabled = action;
  }
  var button = parent.getElementsByTagName("button");
  for (var i = 0; i < button.length; i++) {
    button[i].disabled = action;
  }
}
function OsPwdFnScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function OsPwdFnConformExploreRecord(used) {
  if (modals.ConfirmShowAgain("user_os_pwd_generation") == true) {
    modals.Confirm(
      "Edit User Confirm",
      "Are you sure to edit user ?",
      "N",
      "Yes",
      "onclick",
      "OsPwdFnExploreRecord('" + used + "')",
      "user_os_pwd_generation"
    );
  } else {
    OsPwdFnExploreRecord(used);
  }
}
function OsPwdFnExploreRecord(used) {
  modals.CloseConfirm();
  CallAPI.Go(
    v_OsPasswordchangeExploreDataToServer,
    { type: used },
    OsPwdFnExploreDataCallBack,
    "Processing"
  );
}
function OsPwdFnExploreDataCallBack(data) {
  if (data.status === "1") {
    OsPwdFnGetRecordData();
    goAlert.alertInfo("Os User Password", data.message);
  } else {
    goAlert.alertError("Processing Failed", data.message);
  }
}
function OsPwdFnGetPwdEncrypt(pwd) {
  usedOn = UsedOn;
  myRequest.Execute(v_OsPwdEncrypt, { pwd: pwd }, OsPwdFnGetPwdEncryptCallback);
}
function OsPwdFnGetPwdUnEncrypt() {
  let arrPwd = [];
  let index = 1;
  let old_index = 0;
  $.each(allRecordInCSV, function (i, item) {
    if (!arrPwd.includes(old_index + "~" + item.password)) {
      arrPwd.push(index + "~" + item.password);
      old_index++;
      index++;
    }
  });
  console.log(arrPwd);
  myRequest.Execute(
    v_OsPwdUnEncrypt,
    { pwd: arrPwd.toString() },
    OsPwdFnGetPwdUnEncryptCallback
  );
}
function OsPwdFnGetPwdUnEncryptCallback(xml) {
  var status = jqueryXml.Find("status", xml);
  var password = jqueryXml.Find("pwd", xml);
  console.log(password);
  console.log(status);
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
      sortable: false,
    },
    { data: "record_id" },
    { data: "record_date" },
    { data: "host_name" },
    { data: "user_name" },
    { data: "site" },
    { data: "environment" },
    { data: "staff_id" },
    { data: "create_by" },
    { data: "last_oper_by" },
    { data: "last_oper_date" },
    {
      data: function (password) {
        let passwordLength = 8;
        let stars = "";
        for (let i = 0; i < passwordLength; i++) {
          stars += "*";
        }
        return (
          "<div class='password-cell' data-password='" +
          password +
          "'>" +
          stars +
          "</div>"
        );
      },
    },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];

  dataTable.ApplyJson("os_user_password_table_listing", columns, data);
}
var UsedOn;
function OsPwdFnGetPwdEncryptCallback(xml) {
  var status = jqueryXml.Find("status", xml);
  var password = jqueryXml.Find("pwd", xml);
  if (status === "1") {
    passwordEncrypt = password;
  }
  switch (UsedOn) {
    case "insert":
      {
        OsPwdFnInsertRecord();
      }
      break;
    case "update":
      {
        OsPwdFnUpdateRecord();
      }
      break;
  }
}
let UserNameSelected = [];
function OsPwdFnUserSelected(action) {
  let arrUserSelected = [];
  let hostSelected = $("#os_pwd_host_name_list").val();
  let newUserSelected = $("#os_pwd_user_list").val();
  if (hostSelected.length > 0 && UserNameSelected.length > 0) {
    $("#os_pwd_user_list").val(UserNameSelected);
  } else if (hostSelected.length > 0) {
    UserNameSelected = [];
  }
  arrUserSelected = newUserSelected.toString().split(",");
  UserNameSelected =
    arrUserSelected.length > 0 ? arrUserSelected : UserNameSelected;
}
var staCheckBox = false;
function OsPwdHandleButtonEyeClick() {
  var icon = document
    .getElementById("os_user_password_table_listing_show_pwd")
    .getElementsByTagName("i")[0];
  var isPasswordShown = icon.classList.contains("fa-eye-slash");

  if (!isPasswordShown) {
    // Password is currently hidden
    OsPwdFnGetRecordData();
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    // Password is currently being shown
    OsPwdFnGetRecordDataUnEncrypt();
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
let dataFilterBySite = [];
let statusApplyAllDataToTb = false;
function OsPwdFnFilterBySite() {
  let siteFilter = $("#os_user_password_site_filter").val();
  $("#os_user_password_env_filter").prop("selectedIndex", 0).change();
  $("#os_user_password_platform_filter").prop("selectedIndex", 0).change();
  if (siteFilter !== "") {
    dataFilterBySite = allRecordInCSV.filter((data) => {
      return data.site === siteFilter;
    });
    OsPwdApplyDataToTable(dataFilterBySite);
  } else {
    if (statusApplyAllDataToTb === false) {
      OsPwdApplyDataToTable(allRecordInCSV);
    }
    statusApplyAllDataToTb = true;
  }
}
let dataFilterByEnv = [];
function OsPwdFnFilterByEnv() {
  let envFilter = $("#os_user_password_env_filter").val();
  let siteFilter = $("#os_user_password_site_filter").val();
  $("#os_user_password_platform_filter").prop("selectedIndex", 0).change();
  if (envFilter !== "") {
    if (siteFilter !== "") {
      dataFilterByEnv = dataFilterBySite.filter((data) => {
        return data.environment === envFilter;
      });
    } else {
      dataFilterByEnv = allRecordInCSV.filter((data) => {
        return data.environment === envFilter;
      });
    }
    console.log("env", envFilter);
    console.log(dataFilterByEnv);
    OsPwdApplyDataToTable(dataFilterByEnv);
  } else {
    if (statusApplyAllDataToTb === false) {
      OsPwdApplyDataToTable(allRecordInCSV);
    }
    statusApplyAllDataToTb = true;
  }
}
let dataFilterByOsPlatform = "";
function OsPwdFnFilterByOsPlatform() {
  let envFilter = $("#os_user_password_env_filter").val();
  let siteFilter = $("#os_user_password_site_filter").val();
  let platformFilter = $("#os_user_password_platform_filter").val();
  if (envFilter !== "" && siteFilter !== "" && platformFilter !== "") {
    dataFilterByOsPlatform = dataFilterByEnv.filter((data) => {
      return data.os_platform === platformFilter;
    });
    OsPwdApplyDataToTable(dataFilterByOsPlatform);
  } else if (envFilter === "" && siteFilter === "" && platformFilter !== "") {
    dataFilterByOsPlatform = allRecordInCSV.filter((data) => {
      return data.os_platform === platformFilter;
    });
    OsPwdApplyDataToTable(dataFilterByOsPlatform);
  } else if (envFilter !== "" && siteFilter === "" && platformFilter !== "") {
    dataFilterByOsPlatform = dataFilterByEnv.filter((data) => {
      return data.os_platform === platformFilter;
    });
    OsPwdApplyDataToTable(dataFilterByOsPlatform);
  } else if (envFilter === "" && siteFilter !== "" && platformFilter !== "") {
    dataFilterByOsPlatform = dataFilterByEnv.filter((data) => {
      return data.os_platform === platformFilter;
    });
    OsPwdApplyDataToTable(dataFilterByOsPlatform);
  } else {
    if (statusApplyAllDataToTb === false) {
      OsPwdApplyDataToTable(allRecordInCSV);
    }
    statusApplyAllDataToTb = true;
  }
}
function OsPwdGenerateFnOpenModualExcludeUser() {
  isExcludeUserModual = true;
  modals.Open("modalOsPwdGenerateExcludeUser");
  selectionStyle.LiveSearch(
    "os_pwd_system_type_exclude_select",
    opt_list_system
  );
  selectionStyle.LiveSearch("os_pwd_site_exclude_select", opt_site);
  selectionStyle.LiveSearch("os_pwd_Env_exclude_select", opt_list_env);
  selectionStyle.LiveSearch(
    "os_pwd_platform_exclude_select",
    opt_list_os_platform
  );
  selectionStyle.Multiple("os_pwd_host_name_exclude_list", undefined);
  selectionStyle.Multiple("os_pwd_user_exclude_list", undefined);
  //let listExcludeType = [{ id: "UserOnBoard", name: "User on board" }];
  let optionExcludeType = "<option></option>";
  $.each(os_user_data.data.dataSite, function (i, item) {
    if (item.type == "ExcludeUser") {
      optionExcludeType +=
        '<option value="' + item.name + '">' + item.name + "</option>";
    }
  });
  selectionStyle.LiveSearch("os_pwd_exclude_type_select", optionExcludeType);

  if (dataUserExclude !== "") {
    OsPwdFnApplyDataUserExcludeToTable();
  } else {
    OsPwdFnGetUserExclude();
  }
}
function OsPwdFnGetUserExclude() {
  CallAPI.Go(
    v_OsPasswordGenerateGetUserExclude,
    undefined,
    OsPwdFnGetUserExcludeCallback,
    "processing"
  );
}
var dataUserExclude = "";
function OsPwdFnGetUserExcludeCallback(data) {
  if (data.status === "1") {
    dataUserExclude = data;
    OsPwdFnApplyDataUserExcludeToTable();
  } else {
    goAlert.alertError("process faild", data.message);
  }
}
function OsPwdFnApplyDataUserExcludeToTable() {
  let columns = [
    {
      data: "password",
      render: function (password) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          password +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "record_id" },
    { data: "host_name" },
    { data: "user_name" },
    { data: "record_date" },
    { data: "site" },
    { data: "environment" },
    { data: "staff_id" },
    { data: "os_platform" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson(
    "osPwdTbListingUserExclude",
    columns,
    dataUserExclude.data.allRecordUserPassword
  );
}
function OsPwdFnDeleteUserExclude() {
  let user_id_obj = table.GetValueSelected("osPwdTbListingUserExclude");
  if (user_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    sta = false;
    return false;
  }
  let record_id = user_id_obj.toString();
  if (modals.ConfirmShowAgain("user_os_pwd_generationUserExclude") === true) {
    modals.Confirm(
      "Edit User Confirm",
      "Are you sure to delete user id" + record_id + "?",
      "N",
      "Yes",
      "onclick",
      "OsPwdFnDeleteRecordInCSV('" + record_id + "')",
      "user_os_pwd_generation1"
    );
  } else {
    OsPwdFnDeleteRecordInCSV(record_id);
  }
}
function OsPwdFnClearAllExcludeUser() {
  $("#os_pwd_Env_exclude_select").prop("selectedIndex", 0).change();
  $("#os_pwd_platform_exclude_select").prop("selectedIndex", 0).change();
  $("#os_pwd_site_exclude_select").prop("selectedIndex", 0).change();
  $("#os_pwd_exclude_type_select").prop("selectedIndex", 0).change();
}
