/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
function fnAddNewEndPoint() {
    let project = $("#umt_new_end_point_project_select :selected").text();
    let required_encrypt = $("#umt_new_end_point_required_encrypt").val();
    let module = $("#umt_new_end_point_module_select").val();
    let sub_module = $("#umt_new_end_point_sys_sub_module").val();
    let end_point_url = $("#umt_new_end_point_add_new_end_point").val();
    let action_id = $("#umt_new_end_point_url_action").val();
    let data;
    if (project === "" || project == null) {
        goAlert.alertErroTo("umt_new_end_point_project_select", "Processing Failed", "project must be select", "change");
        return false;
    }

    if (required_encrypt === "" || required_encrypt == null) {
        goAlert.alertErroTo("umt_required_encrypt", "Processing Failed", "required encrypt must be select", "change");
        return false;
    }
    if (end_point_url == null || end_point_url === "") {
        goAlert.alertErroTo("umt_new_end_point_add_new_end_point", "Processing Failed", "End point URL must be input", "input");

        return false;
    }
    if (end_point_url.startsWith("http://") !== true && end_point_url.startsWith("https://") !== true) {
        goAlert.alertErroTo("umt_new_end_point_add_new_end_point", "Processing Failed", "End point URL input must be correct format", "input");
        return false;
    }
    if (end_point_url.length <= 15) {
        goAlert.alertErroTo("umt_new_end_point_add_new_end_point", "Processing Failed", "End point URL length must be greater than 15 character", "input");
        return false;
    }
    if(project === 'ITOAPP'){
        if (module === "" || module == null) {
            goAlert.alertErroTo("umt_new_end_point_module_select", "Processing Failed", "module must be select", "change");
            return false;
        }
        if (sub_module === "" || sub_module == null) {
            goAlert.alertErroTo("umt_new_end_point_sys_sub_module", "Processing Failed", "sub module must be select", "change");
            return false;
        }
        data = {
            project: project,
            end_point_url: end_point_url,
            required_encrypt: required_encrypt,
            module: module,
            sub_module: sub_module,
            action_id: action_id
        };
    }
    else {
        data = {
            project: project,
            end_point_url: end_point_url,
            required_encrypt: required_encrypt,
            module: 'NA',
            sub_module: 'NA',
            action_id: action_id
        };
    }

    CallAPI.Go(v_addNewEndPoint, data, fnAddNewEndPointCallBack, "Processing...");
}
function fnEditEndPoint() {
    let end_point_id_obj= table.GetValueSelected("umt_end_point_data_table");
    if (end_point_id_obj.length === 0) {
        goAlert.alertError("Processing Failed", "No End Point ID Selected");
        return false;
    }
    if (end_point_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    let end_point_ids = stringCreate.FromObject(end_point_id_obj);
    end_point_id_select = end_point_ids;
    let data = {
        end_point_id: end_point_ids
    }
    CallAPI.Go(v_GetEndPointForUpdate, data, fnEditEndPointCallBack, "Processing...");
}
function fnUpdateEndPoint() {
    let project = $("#umt_new_end_point_project_select :selected").text();
    let required_encrypt = $("#umt_new_end_point_required_encrypt").val();
    let module = $("#umt_new_end_point_module_select").val();
    let sub_module = $("#umt_new_end_point_sys_sub_module").val();
    let end_point_url = $("#umt_new_end_point_add_new_end_point").val();
    let action_id = $("#umt_new_end_point_url_action").val();
    let data;
    if (project === "" || project == null) {
        goAlert.alertErroTo("umt_new_end_point_project_select", "Processing Failed", "project must be select", "change");
        return false;
    }
    if (required_encrypt === "" || required_encrypt == null) {
        goAlert.alertErroTo("umt_required_encrypt", "Processing Failed", "required encrypt must be select", "change");
        return false;
    }
    if (end_point_url == null || end_point_url === "") {
        goAlert.alertErroTo("umt_uc_add_new_end_point", "Processing Failed", "access api must be input", "input");

        return false;
    }
    if (end_point_url.length <= 15) {
        goAlert.alertErroTo("umt_new_end_point_add_new_end_point", "Processing Failed", "End point URL length is to small", "input");
        return false;
    }
    if (action_id == null || action_id === "") {
        goAlert.alertErroTo("umt_new_end_point_url_action", "Processing Failed", "action must be select", "change");
        return false;
    }

    if(project === 'ITOAPP'){
        if (module === "" || module == null) {
            goAlert.alertErroTo("umt_new_end_point_module_select", "Processing Failed", "module must be select", "change");
            return false;
        }
        if (sub_module === "" || sub_module == null) {
            goAlert.alertErroTo("umt_new_end_point_sys_sub_module", "Processing Failed", "sub module must be select", "change");
            return false;
        }
        data = {
            end_point_id: end_point_id_select,
            project: project,
            end_point_url: end_point_url,
            required_encrypt: required_encrypt,
            module: module,
            sub_module: sub_module,
            action_id: action_id
        };
    }
    else {
        data = {
            end_point_id: end_point_id_select,
            project: project,
            end_point_url: end_point_url,
            required_encrypt: required_encrypt,
            module: 'NA',
            sub_module: 'NA',
            action_id: action_id
        };
    }
    CallAPI.Go(v_UpdateEndPoint, data, fnUpdateEndPointCallBack, "Processing...");
}
let listing_end_point;
function fnFilterEndPoint() {
    let module = $("#umt_new_end_point_filter_mudule").val();
    let values_module = module.toString();
    let sub_module = $("#umt_new_end_point_filter_sub_mudule").val();
    let values_sub_module = sub_module.toString();
    let range_valve_date_request = $("#umt_new_end_point_date_filter").val();
    let fromDate = subString.FromDateDateRange(range_valve_date_request);
    let toDate = subString.ToDateDateRange(range_valve_date_request);
    let data = {
        p_module: values_module,
        p_sub_module: values_sub_module,
        p_start_date: fromDate,
        p_end_date: toDate
    }
    CallAPI.Go(v_umt_new_ent_point_filter_end_point, data, fnFilterEndPointCallBack, "Processing...");
}
function fnClearNewEndPoint() {
    $("#umt_new_end_point_project_select").val(0).change();
    $("#umt_new_end_point_module_select").val(0).change();
    $("#umt_new_end_point_sys_sub_module").val(0).change();
    $("#umt_new_end_point_url_action").val(0).change();
    $("#umt_new_end_point_required_encrypt").val('N').change();
    element.inputValue("umt_new_end_point_add_new_end_point", "");
    document.getElementById("umt_new_end_point_btn_update_end_point").style.display = "none";
    document.getElementById("umt_new_end_point_btn_update_cancel").style.display = "none";
    document.getElementById("umt_uc_add_new_end_point").style.display = "";
}
function fnDeleteEndPointHandle() {
    let end_point_id_obj= table.GetValueSelected("umt_end_point_data_table");
    if (end_point_id_obj.length === 0) {
        goAlert.alertError("Processing Failed", "No End Point ID Selected");
        return false;
    }
    if (end_point_id_obj.length > 1) {
        goAlert.alertError("Processing Failed", "Operation does not support with multiple selection");
        return false;
    }
    let end_point_ids = stringCreate.FromObject(end_point_id_obj);
    if (modals.ConfirmShowAgain("umt_delete_end_point_data_table_modals") === true) {
        modals.Confirm("Delete Service Listing Confirm", "Are you sure to delete report id " + end_point_ids + " ?", "N", "Yes", "onclick", "fnDeleteEndPoint('" + end_point_ids + "')", "umt_delete_end_point_data_table_modals");
    } else {
        fnDeleteEndPoint(end_point_ids);
    }
}

function fnDeleteEndPoint(end_point_ids) {
    modals.CloseConfirm();
    let data = {
        end_point_id: end_point_ids
    }
    CallAPI.Go(v_DeleteEndPoint, data, fnDeleteEndPointCallBack, "Processing...");
}
function fnSystemModuleSelect(used) {
    let module_select='';
    switch (used) {
        case "add": {
            module_select = $("#umt_new_end_point_module_select").val();
            let op_sub_module = '<option value=""></option>';
            $.each(ito_sys_module_api.data.submodules, function (i, item) {
                if (module_select === item.main_module_id) {
                    if (i === 0) {
                        op_sub_module = op_sub_module + '<option value="' + item.sub_module_id + '">' + item.sub_module_name + '</option>';
                    }
                    else {
                        op_sub_module = op_sub_module + '<option value="' + item.sub_module_id + '">' + item.sub_module_name + '</option>';
                    }
                }
            });
            selectionStyle.LiveSearch("umt_new_end_point_sys_sub_module", op_sub_module);
        } break;

        case "filter": {
            module_select = $("#umt_new_end_point_filter_mudule").val();
            let module_split;
            module_split = module_select.toString();
            let arrayModule_split = module_split.split(',');
            let op_sub_ModuleFilter = undefined;
            let a = 0;
            if (module_split.toString() !== '') {
                while (a < arrayModule_split.length) {
                    $.each(ito_sys_module_api.data.submodules, function (i, item) {
                        if (arrayModule_split[a] === item.main_module_id) {
                            if (i === 0) {
                                op_sub_ModuleFilter = '<option value=""></option>';
                                op_sub_ModuleFilter = op_sub_ModuleFilter + '<option value="' + item.sub_module_id + '">' + item.sub_module_name + '</option>';
                            }
                            else {
                                op_sub_ModuleFilter = op_sub_ModuleFilter + '<option value="' + item.sub_module_id + '">' + item.sub_module_name + '</option>';
                            }
                        }
                    });
                    a++;
                } selectionStyle.MultipleInline("umt_new_end_point_filter_sub_mudule", op_sub_ModuleFilter);
            }
            else {
                selectionStyle.MultipleInline("umt_new_end_point_filter_sub_mudule", '<option value=""></option>');
            }
        } break;
    }
}
function fnApplyModuleAndSubModule() {
    let op_module = undefined;
    const moduleSelect = document.getElementById("umt_new_end_point_module_select");
    const subModuleSelect = document.getElementById("umt_new_end_point_sys_sub_module");
    selectionStyle.LiveSearch("umt_new_end_point_module_select", '<option value=""></option>');
    selectionStyle.LiveSearch("umt_new_end_point_sys_sub_module", '<option value=""></option>');
    let project = $("#umt_new_end_point_project_select :selected").text();
    if(project.trim() === 'ITOAPP') {
        moduleSelect.disabled = false;
        subModuleSelect.disabled = false;
        $.each(ito_sys_module_api.data.modules, function (i, item) {
            if (project.trim() === item.project_name) {
                if (i === 0) {
                    op_module = '<option value=""></option>';
                    op_module = op_module + '<option value="' + item.module_id + '">' + item.module_name + '</option>';
                } else {
                    op_module = op_module + '<option value="' + item.module_id + '">' + item.module_name + '</option>';
                }
            }
        });
        selectionStyle.LiveSearch("umt_new_end_point_module_select", op_module);
    }else {
        moduleSelect.disabled = true;
        subModuleSelect.disabled = true;
    }
}
function fnApplyModuleAndSubModuleFilter() {
    let op_module = undefined;
    $.each(ito_sys_module_api.data.modules, function (i, item) {
            if (i === 0) {
                op_module = '<option value=""></option>';
                op_module = op_module + '<option value="' + item.module_id + '">' + item.module_name + '</option>';
            }
            else {
                op_module = op_module + '<option value="' + item.module_id + '">' + item.module_name + '</option>';
            }
    });
    selectionStyle.MultipleInline("umt_new_end_point_filter_sub_mudule", '<option value=""></option>');
    selectionStyle.MultipleInline("umt_new_end_point_filter_mudule", op_module);
}
function fnApplyEndPointToTableFilter() {
    let columns_end_point = [{
        'data': 'end_point_id',
        'render': function (end_point_id) {
            return "<input type='checkbox' style='margin-left:25%;' value='" + end_point_id + "' />"
        },
        'sortable': false
    },
        {
            'data': 'end_point_id'
        },
        {
            'data': 'module_name'
        },
        {
            'data': 'sub_module_name'
        },
        {
            'data': 'project'
        },
        {
            'data': 'end_point_url'
        },
        {
            'data': 'action_id'
        },
        {
            'data': 'create_date'
        },
    {
        'data': '',
        'render': function () {
            return ""
        }
    }
    ];
    dataTable.ApplyJson("umt_end_point_data_table", columns_end_point, get_end_point_filter.data);
}
function fnApplyEndPointToDataTable(data) {
    let columns_end_point = [{
        'data': 'end_point_id',
        'render': function (end_point_id) {
            return "<input type='checkbox' style='margin-left:25%;' value='" + end_point_id + "' />"
        },
        'sortable': false
    },
    {
        'data': 'end_point_id'
    },
    {
        'data': 'module_name'
    },
    {
        'data': 'sub_module_name'
    },
    {
        'data': 'project'
    },
    {
        'data': 'end_point_url'
    },
    {
        'data': 'end_point_action_name'
    },
    {
        'data': 'create_date'
    },
    {
        'data': '',
        'render': function () {
            return ""
        }
    }
    ];
    dataTable.ApplyJson("umt_end_point_data_table", columns_end_point, data.data.dataAPIEndPoints);
}