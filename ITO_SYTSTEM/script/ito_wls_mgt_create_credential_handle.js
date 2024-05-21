/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function fnWlsMgtCredGetEnvCallBack(data) {
    if (data.status == "1") {

        var opt_list_envs;
        $.each(data.data, function (i, item) {
            if (i == 0) {

                opt_list_envs = '<option value=""></option>';
                opt_list_envs = opt_list_envs + '<option value="' + item.id + '">' + item.desc + '</option>';
            }
            else {
                opt_list_envs = opt_list_envs + '<option value="' + item.id + '">' + item.desc + '</option>';
            }

        });
        selectionStyle.LiveSearch("wls_mgt_cred_env_sl", opt_list_envs);
    }
    else {
        goAlert.alertError("Processing Failed", data.message);
    }
}