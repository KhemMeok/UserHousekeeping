
/// <reference path="ito_variable.js" />
/// <reference path="ito_core.js" />
$(document).ready(function () {
    // remove cache
    window.localStorage.removeItem("ito_userid");
    window.localStorage.removeItem("ito_username");
    window.localStorage.removeItem("ito_currenct_system");
    // Tap icon
    $("link[rel='icon']").attr("href", "Images/HKL.png");
});
function fnEnterLogin(event) {
    if (event.keyCode == 13) {
        fnLogin();
    };
};
function fnLogin() {
    var user_id = $("#login_user_id").val();
    var user_pwd = $("#login_user_password").val();
    var login_mode = $("#login_mode").val();
    if (user_id == "") {
        goAlert.alertErroTo("login_user_id", "Error Login", "Staff ID cannot be empty.");
        return false;
    };
    if (user_pwd == "") {
        goAlert.alertErroTo("login_user_password", "Error Login", "Password cannot be empty.");
        return false;
    };

    myRequest.Execute("ACTIONS/Controllers/user/wsUser.asmx/UserLogin",
        { user_id: user_id, password: user_pwd, login_mode: login_mode },
        fnLoginCallBack,
        "Processing..."
    );
};
var login_data;
var currentUrl;
function fnLoginCallBack(xml) {
    var user_id = $("#login_user_id").val();
    var login_mode = $("#login_mode").val();
    var status = jqueryXml.Find("loginStatus", xml);
    var message = jqueryXml.Find("loginMessage", xml);
    var expiredStat = jqueryXml.Find("loginPasswordExpired", xml);
    var alreadyLoginStat = jqueryXml.Find("alreadyLogin", xml);
    var userfullname = jqueryXml.Find("loginUserFullname", xml);
    var currentSystem = jqueryXml.Find("systemNow", xml);
    currentUrl = jqueryXml.Find("currentUrl", xml);
    var access_api_stat = jqueryXml.Find("api_access_stat", xml);
    var auth_api_url = jqueryXml.Find("auth_api_url", xml);
    //var auth_api_url = "http://localhost:3832"
    //v_ito_api = jqueryXml.Find("ito_api_url", xml);
    v_ito_api = "http://localhost:7001";
    window.localStorage.setItem("ito_api_url", v_ito_api);
    var project = jqueryXml.Find("project", xml);
    var auth_key = jqueryXml.Find("auth_key", xml);
    var bank_code = jqueryXml.Find("bank_code", xml);
    if (status == "1") {

        goAlert.alertInfo("System Login", message);
        window.localStorage.setItem("ito_userid", user_id);
        window.localStorage.setItem("ito_username", userfullname);
        window.localStorage.setItem("ito_currenct_system", currentSystem);


        if (access_api_stat == "Y") {
            var user_pwd = $("#login_user_password").val();
            var data = { user_id: user_id, password: user_pwd, bank_code: "HTB" };
            var header = { auth_key: auth_key, project: project, "Content-Type": "application/json" };
            CallAPI.Go(auth_api_url + "/api/v1/CreateToken", data, fnGetTokenCallBack, "Processing Redirect...", header, "Y", undefined, undefined, "POST");
        }
        else {
            window.localStorage.setItem("ito_token", "");
            window.location.href = currentUrl;
        }

    }
    else {
        if (expiredStat == "Y") {
            if (login_mode == "system_user" || user_id == "admin") {
                modals.OpenStatic("mdChangePwdExpired");
                goAlert.alertError("System Login", message);
                return false;
            };
        };
        if (alreadyLoginStat == "Y") {
            modals.OpenStatic("modalSelfUnlock");
            goAlert.alertError("System Login", message);
            return false;
        };
        if (expiredStat !== "Y" && alreadyLoginStat !== "Y") {
            goAlert.alertError("Error system Login", message);
            return false;
        }
    };
};
function fnGetTokenCallBack(data) {

    if (data.status == "1") {


        window.localStorage.setItem("ito_token", data.token);
        //window.localStorage.setItem("ito_token", "");
    }
    else {
        window.localStorage.setItem("ito_token", "");
    }
    window.location.href = currentUrl;
}
function fnUserSelfUplock() {
    var user_id = $("#login_user_id").val();
    var verify_code = $("#self_unlock_verify_code").val();
    if (verify_code == "") {
        goAlert.alertErroTo("self_unlock_verify_code", "Error Self Unlock", "Verify Code cannot be empty");
        return false;
    };
    var xmlData = {
        str_userid: user_id,
        type: "seft_unlock",
        verify_code: verify_code,
        unlocker: user_id
    };
    modals.Close("modalSelfUnlock");
    myRequest.Execute("ACTIONS/Controllers/user/wsUser.asmx/UserUnlock", xmlData, fnUserUnlockHandle, "Processing...");
};
function fnUserUnlockHandle(xml) {
    var status = jqueryXml.Find("status", xml);
    var message = jqueryXml.Find("message", xml);
    if (status == "1") {
        goAlert.alertInfo("Self Unlock", message);
    }
    else {

        setTimeout(function () {
            goAlert.alertError("Error Self Unlock", message);
            modals.OpenStatic("modalSelfUnlock");
        }, 1000);
    }
};
function fnUserChangePwd() {
    var user_id = $("#login_user_id").val();
    var new_pwd = $("#login_new_pwd").val();
    var re_type_pwd = $("#login_retype_pwd").val();
    var verify_code = $("#login_change_pwd_verify_code").val();
    if (new_pwd == "") {
        goAlert.alertErroTo("login_new_pwd", "Error Change Password", "New Password cannot be empty.");
        return false;
    };
    if (re_type_pwd == "") {
        goAlert.alertErroTo("login_retype_pwd", "Error Change Password", "Re-type Password cannot be empty.");
        return false;
    };
    if (re_type_pwd !== new_pwd) {
        goAlert.alertErroTo("login_retype_pwd", "Error Change Password", "New Password & Re-type Password are not matched.");
        return false;
    };
    if (verify_code == "") {
        goAlert.alertErroTo("login_change_pwd_verify_code", "Error Change Password", "Verify Code cannot be empty.");
        return false;
    };
    if (password.Validate(new_pwd) == true) {
        modals.Close("mdChangePwdExpired");
        var xmlData = { user_id: user_id, change_type: "change_expired", current_pwd: "", new_pwd: new_pwd, verify_code: verify_code };
        myRequest.Execute("ACTIONS/Controllers/user/wsUser.asmx/ChangePassword", xmlData, fnUserChangePwdCallBack, "Processing...");
    } else {
        goAlert.alertErroTo("login_new_pwd", "Error Change Password", "New password is not stronge enought. Password must have 8 characteres, at least 1 uppercase 1 lowercase character, at least 1 number and 1 special character.");
        return false;
    };
};
function fnUserChangePwdCallBack(xml) {
    var status = jqueryXml.Find("status", xml);
    var message = jqueryXml.Find("message", xml);
    if (status == "1") {

        goAlert.alertInfo("Change Password", message);
    }
    else {
        setTimeout(function () {
            modals.OpenStatic("mdChangePwdExpired");
            goAlert.alertError("Error Change Password", message);
        }, 1000);

    }
}
