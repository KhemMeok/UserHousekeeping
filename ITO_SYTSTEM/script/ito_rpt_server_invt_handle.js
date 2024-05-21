/// <reference path="ito_core.js" />
/// <reference path="ito_variable.js" />
/// <reference path="ito_rpt_server_invt.js" />

function fnRPTServerINVTFirstLoadCallBack(data) {
    if (data.status == "1") {
        var option_system_type = '<option value=""></option>';
        var option_ostype = '<option value=""></option>';
        var option_csi = '<option value="0">N/A</option>';
        var option_host = '<option value=""></option>';
        var option_system_type_service = '<option value=""></option>';
        var option_dc_host = '<option value="0">N/A</option>';
        var option_product_type = '<option value=""></option>';
        v_step_auto = [];
        $.each(data.data.all_product_type, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.all_product_type);
            }
            if (i == 0) {
                option_product_type = '<option value=""></option>'
                option_product_type = option_product_type + '<option value="' + item.pd_id + '">' + item.product_name + '</option>';
            } else {
                option_product_type = option_product_type + '<option value="' + item.pd_id + '">' + item.product_name + '</option>';
            }
        });
        $.each(data.data.all_dc_host, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.all_dc_host);
            }
            if (i == 0) {
                option_dc_host = option_dc_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            } else {
                option_dc_host = option_dc_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            }
        });
        $.each(data.data.all_system_type, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.all_system_type);
            }
            if (i == 0) {
                option_system_type = '<option value=""></option>'
                option_system_type = option_system_type + '<option value="' + item.system_type + '">' + item.pl_name + '</option>';
            } else {
                option_system_type = option_system_type + '<option value="' + item.system_type + '">' + item.pl_name + '</option>';
            }
        });

        $.each(data.data.all_os_platform, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_ostype);
            }
            if (i == 0) {
                option_ostype = '<option value=""></option>';
                option_ostype = option_ostype + '<option value="' + item.os_id + '">' + item.os_name + '</option>';
            } else {
                option_ostype = option_ostype + '<option value="' + item.os_id + '">' + item.os_name + '</option>';
            }
        });
        $.each(data.data.all_csi, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_csi);
            }
            if (i == 0) {
                option_csi = option_csi + '<option value="' + item.no + '">' + item.no + ' - CSI_' + item.csi_number + ' - SN_' + item.sn + '</option>';
            } else {
                option_csi = option_csi + '<option value="' + item.no + '">' + item.no + ' - CSI' + item.csi_number + ' - SN_' + item.sn + '</option>';
            }
        });
        $.each(data.data.host_listing, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_host);
            }
            if (i == 0) {
                option_host = '<option value=""></option>';
                option_host = option_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            } else {
                option_host = option_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            }
        });
        $.each(data.data.all_system_type_service, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_host);
            }
            if (i == 0) {
                option_system_type_service = '<option value=""></option>';
                option_system_type_service = option_system_type_service + '<option value="' + item.system_id + '">' + item.system_name + '</option>';
            } else {
                option_system_type_service = option_system_type_service + '<option value="' + item.system_id + '">' + item.system_name + '</option>';
            }
        });
        selectionStyle.LiveSearch("rpt_server_invt_system_type", option_system_type);
        selectionStyle.LiveSearch("rpt_server_invt_osplatform", option_ostype);
        selectionStyle.LiveSearch("rpt_server_invt_csi", option_csi);
        selectionStyle.LiveSearch("rpt_server_invt_hostid_mapping", option_host);
        selectionStyle.LiveSearch("rpt_server_invt_servicetype_mapping", option_system_type_service);
        selectionStyle.LiveSearch("rpt_server_invt_drof", option_dc_host);
        selectionStyle.LiveSearch("rpt_server_invt_product_type", option_product_type);
        //dataTable.ApplyJsonData("rpt_server_invt_tbl_csi_listing", data.data.csi_listing);
        //dataTable.ApplyJsonData("rpt_server_invt_tbl_host_listing", data.data.host_listing);
        //dataTable.ApplyJsonData("rpt_server_invt_tbl_service_mapping_listing", data.data.service_listing);

        var columns_host = [{
            'data': 'host_id',
            'render': function (host_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + host_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'host_id'
        },
        {
            'data': 'host_name'
        },
        {
            'data': 'product_desc'
        },
        {
            'data': 'site'
        },
        {
            'data': 'dr_of'
        },
        {
            'data': 'system_type'
        },
        {
            'data': 'os_platform'
        },
        {
            'data': 'run_service'
        },
        {
            'data': 'csi'
        },
        {
            'data': 'ip_mgmt'
        },
        {
            'data': 'ip_lan'
        },
        {
            'data': 'os_version'
        },
        {
            'data': 'environment'
        },
        {
            'data': 'remark'
        },
        {
            'data': 'record_stat'
        },
        {
            'data': 'create_date'
        },
        {
            'data': 'create_by'
        },
        {
            'data': 'last_oper_dt'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("rpt_server_invt_tbl_host_listing", columns_host, data.data.host_listing);

        var columns_service = [{
            'data': 'service_id',
            'render': function (service_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + service_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'service_id'
        },
        {
            'data': 'service_type'
        },
        {
            'data': 'service_run'
        },
        {
            'data': 'host_id'
        },
        {
            'data': 'remark'
        },
        {
            'data': 'map_date'
        },
        {
            'data': 'map_by'
        },
        {
            'data': 'last_oper_id'
        },
        {
            'data': 'last_oper_dt'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("rpt_server_invt_tbl_service_mapping_listing", columns_service, data.data.service_listing);

        var columns_csi = [{
            'data': 'no',
            'render': function (no) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + no + "' />"
            },
            'sortable': false
        },
        {
            'data': 'no'
        },
        {
            'data': 'csi_sla'
        },
        {
            'data': 'sn'
        },
        {
            'data': 'contract_type'
        },
        {
            'data': 'product_type'
        },
        {
            'data': 'supporter'
        },
        {
            'data': 'contact_person'
        },
        {
            'data': 'asr'
        },
        {
            'data': 'start_date'
        },
        {
            'data': 'expire_date',
            'render': function (expire_date) {
                //Date calculate
                var today = moment(new Date()).format('MM/DD/YYYY');
                var date1 = new Date(expire_date);
                var date2 = new Date(today);
                var Remaining_times = date1.getTime() - date2.getTime();
                var Remaining_days = Remaining_times / (1000 * 3600 * 24);
                if (Remaining_days > 0 && Remaining_days <= 10) { // Expire remaing
                    return '<div style="color:orange;"><a title="This CSI remaining: ' + Remaining_days + ' days!" href="#">' + expire_date + ' <i class="fa fa-exclamation-triangle"></i></a></div>';
                }
                if (Remaining_days == 0) { // Expire today
                    return '<div style="color:orange;"><a title="This CSI expire today!" href="#">' + expire_date + ' <i class="fa fa-exclamation-triangle"></i></a></div>';
                }
                if (Remaining_days < 0) { // Expired
                    return '<div style="color:red; "><a title="This CSI expired" href="#">' + expire_date + ' <i class="fa fa-hourglass-end"></i></a></div>';
                }
                if (Remaining_days > 10) { // Expire remaing
                    return '<div><a title="This CSI remaining: ' + Remaining_days + ' days" href="#">' + expire_date + ' </a></div>';
                }
            }
        },
        {
            'data': 'remark'
        },
        {
            'data': 'create_date'
        },
        {
            'data': 'create_by'
        },
        {
            'data': 'last_oper_id'
        },
        {
            'data': 'last_oper_dt'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("rpt_server_invt_tbl_csi_listing", columns_csi, data.data.csi_listing);

    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnRPTServerINVTRegisterHostCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Host Register Transaction", data.message);
        rpt_server_invt_fnRefresh_host_listing();
        setTimeout(function () {
            rpt_server_refresh_obj();
        }, 100);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnRPTServerINVTRegisterCSICallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("CSI Register Transaction", data.message);
        rpt_server_invt_fnRefresh_csi_listing();
        setTimeout(function () {
            rpt_server_refresh_obj();
        }, 100);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTRegisterServiceCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Service Register Transaction", data.message);
        rpt_server_invt_fnRefresh_service_listing();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTGetDROfCallBack(data) {
    if (data.status == "1") {
        var option_all_dr_of = '<option value="0">N/A</option>';
        v_step_auto = [];
        $.each(data.data, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.dr_of);
            }
            if (i == 0) {
                option_all_dr_of = option_all_dr_of + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            } else {
                option_all_dr_of = option_all_dr_of + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            }
        });
        selectionStyle.LiveSearch("rpt_server_invt_drof", option_all_dr_of);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTServerListingCallBack(data) {
    if (data.status == "1") {
        //dataTable.ApplyJsonData("rpt_server_invt_tbl_host_listing", data.data);
        var columns_host = [{
            'data': 'host_id',
            'render': function (host_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + host_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'host_id'
        },
        {
            'data': 'host_name'
        },
        {
            'data': 'product_desc'
        },
        {
            'data': 'site'
        },
        {
            'data': 'dr_of'
        },
        {
            'data': 'system_type'
        },
        {
            'data': 'os_platform'
        },
        {
            'data': 'run_service'
        },
        {
            'data': 'csi'
        },
        {
            'data': 'ip_mgmt'
        },
        {
            'data': 'ip_lan'
        },
        {
            'data': 'os_version'
        },
        {
            'data': 'environment'
        },
        {
            'data': 'remark'
        },
        {
            'data': 'record_stat'
        },
        {
            'data': 'create_date'
        },
        {
            'data': 'create_by'
        },
        {
            'data': 'last_oper_dt'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("rpt_server_invt_tbl_host_listing", columns_host, data.data);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTCSIListingCallBack(data) {
    if (data.status == "1") {
        //dataTable.ApplyJsonData("rpt_server_invt_tbl_csi_listing", data.data);
        var columns_csi = [{
            'data': 'no',
            'render': function (no) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + no + "' />"
            },
            'sortable': false
        },
        {
            'data': 'no'
        },
        {
            'data': 'csi_sla'
        },
        {
            'data': 'sn'
        },
        {
            'data': 'contract_type'
        },
        {
            'data': 'product_type'
        },
        {
            'data': 'supporter'
        },
        {
            'data': 'contact_person'
        },
        {
            'data': 'asr'
        },
        {
            'data': 'start_date'
        },
        {
            'data': 'expire_date',
            'render': function (expire_date) {
                //Date calculate
                var today = moment(new Date()).format('MM/DD/YYYY');
                var date1 = new Date(expire_date);
                var date2 = new Date(today);
                var Remaining_times = date1.getTime() - date2.getTime();
                var Remaining_days = Remaining_times / (1000 * 3600 * 24);
                if (Remaining_days > 0 && Remaining_days <= 10) { // Expire remaing
                    return '<div style="color:orange;"><a title="This CSI remaining: ' + Remaining_days + ' days!" href="#">' + expire_date + ' <i class="fa fa-exclamation-triangle"></i></a></div>';
                }
                if (Remaining_days == 0) { // Expire today
                    return '<div style="color:orange;"><a title="This CSI expire today!" href="#">' + expire_date + ' <i class="fa fa-exclamation-triangle"></i></a></div>';
                }
                if (Remaining_days < 0) { // Expired
                    return '<div style="color:red; "><a title="This CSI expired" href="#">' + expire_date + ' <i class="fa fa-hourglass-end"></i></a></div>';
                }
                if (Remaining_days > 10) { // Expire remaing
                    return '<div><a title="This CSI remaining: ' + Remaining_days + ' days" href="#">' + expire_date + ' </a></div>';
                }
            }
        },
        {
            'data': 'remark'
        },
        {
            'data': 'create_date'
        },
        {
            'data': 'create_by'
        },
        {
            'data': 'last_oper_id'
        },
        {
            'data': 'last_oper_dt'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("rpt_server_invt_tbl_csi_listing", columns_csi, data.data);


    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTServiceListingCallBack(data) {
    if (data.status == "1") {
        //dataTable.ApplyJsonData("rpt_server_invt_tbl_service_mapping_listing", data.data);
        var columns_service = [{
            'data': 'service_id',
            'render': function (service_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + service_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'service_id'
        },
        {
            'data': 'service_type'
        },
        {
            'data': 'service_run'
        },
        {
            'data': 'host_id'
        },
        {
            'data': 'remark'
        },
        {
            'data': 'map_date'
        },
        {
            'data': 'map_by'
        },
        {
            'data': 'last_oper_id'
        },
        {
            'data': 'last_oper_dt'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        dataTable.ApplyJson("rpt_server_invt_tbl_service_mapping_listing", columns_service, data.data);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
function fnRPTServerINVTDeleteServerCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Server Process", data.message);
        setTimeout(function () {
            rpt_server_refresh_obj();
        }, 100);
        rpt_server_invt_fnRefresh_host_listing();
    } else {
        goAlert.alertError("Delete Server Process", data.message);
    }
}

function fnRPTServerINVTDeleteServiceCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Server Process", data.message);
        rpt_server_invt_fnRefresh_service_listing();
    } else {
        goAlert.alertError("Delete Server Process", data.message);
    }
}
function fnRPTServerINVTDeleteCSICallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Server Process", data.message);
        CallAPI.Go(v_rpt_server_invt_csi_listing, undefined, fnRPTServerINVTCSIListingCallBack, "Processing...");
        setTimeout(function () {
            rpt_server_refresh_obj();
        }, 100);

    } else {
        goAlert.alertError("Delete Server Process", data.message);
    }
}

function fnRPTServerINVTEditReportCallBack(data) {
    if (data.status == "1" && data.data.server_data !== undefined) {
        $.each(data.data.server_data, function (i, item) {
            $("#rpt_server_invt_hostside").val(item.site).change();
            $("#rpt_server_invt_drof").val(item.dr_of).change();
            $("#rpt_server_invt_system_type").val(item.system_type).change();
            $("#rpt_server_invt_environment").val(item.enviroment).change();
            $("#rpt_server_invt_osplatform").val(item.os_plat).change();
            $("#rpt_server_invt_csi").val(item.csi).change();

            element.inputValue("rpt_server_invt_hostidselected", item.host_id);
            element.inputValue("rpt_server_invt_hostid", item.host_name);
            element.inputValue("rpt_server_invt_productdesc", item.product_desc);
            element.inputValue("rpt_server_invt_osver", item.os_version);
            element.inputValue("rpt_server_invt_mgrip", item.ip_mgt);
            element.inputValue("rpt_server_invt_lanip", item.ip_lan);
            element.inputValue("rpt_server_invt_registerhost_remark", item.remark);

            goAlert.alertInfo("Server retrive from Inventory", data.message);
            window.scrollTo(0, 0);
            $('.nav-tabs a[href="#rpt_server_invt_register_host_tab"]').tab('show');
            document.getElementById("rpt_server_invt_btn_update").style.display = "";
            document.getElementById("div_rpt_server_invt_hostidselected").style.display = "";
            document.getElementById("rpt_server_invt_btn_submit").style.display = "none";
            $("#rpt_server_invt_btn_submit").attr("onclick", "rpt_server_invt_fn_submit_host()");
            $("#rpt_server_invt_btn_update").attr("onclick", "rpt_server_invt_fn_update_host()");
            $("#rpt_server_invt_btn_clear").attr("onclick", "rpt_server_invt_fn_clear_host()");
        });
    }
    if (data.status == "1" && data.data.service_data !== undefined) {
        $.each(data.data.service_data, function (i, item) {
            element.inputValue("rpt_server_invt_serviceidselected", item.service_id);
            element.inputValue("rpt_server_invt_servicerun_mapping", item.service_run);
            element.inputValue("rpt_server_invt_remark_mapping", item.remark);
            $("#rpt_server_invt_hostid_mapping").val(item.host_id).change();
            $("#rpt_server_invt_servicetype_mapping").val(item.service_type).change();
            goAlert.alertInfo("Server retrive from Inventory", data.message);
            window.scrollTo(0, 0);
            $('.nav-tabs a[href="#rpt_server_invt_service_mapping_tab"]').tab('show');
            document.getElementById("rpt_server_invt_btn_update").style.display = "";
            document.getElementById("div_rpt_server_invt_serviceidselected").style.display = "";
            document.getElementById("rpt_server_invt_btn_submit").style.display = "none";
            $("#rpt_server_invt_btn_submit").attr("onclick", "rpt_server_invt_fn_submit_service()");
            $("#rpt_server_invt_btn_update").attr("onclick", "rpt_server_invt_fn_update_service()");
            $("#rpt_server_invt_btn_clear").attr("onclick", "rpt_server_invt_fn_clear_service()");
        });
    }
    if (data.status == "1" && data.data.csi_data !== undefined) {
        $.each(data.data.csi_data, function (i, item) {
            rpt_server_invt_fn_clear_csi();
            amsifySuggestags = new AmsifySuggestags($('#rpt_server_invt_contact_person'));
            amsifySuggestags._init();
            var str = item.contact_person;
            var temp = new Array();
            temp = str.split(",");
            temp.forEach(function (item, index) {
                amsifySuggestags.addTag(item);
            });

            element.inputValue("rpt_server_invt_csiidselected", item.csi_id);
            element.inputValue("rpt_server_invt_csisla", item.csi);
            element.inputValue("rpt_server_invt_snnumber", item.sn);
            element.inputValue("rpt_server_invt_startdate", item.start_date);
            element.inputValue("rpt_server_invt_expiredate", item.expire_date);
            element.inputValue("rpt_server_invt_csiremark", item.remark);
            $("#rpt_server_invt_contract_type").val(item.contract_type).change();
            $("#rpt_server_invt_product_type").val(item.product_type).change();
            $("#rpt_server_invt_supporter").val(item.supporter).change();
            $("#rpt_server_invt_asr").val(item.asr).change();
            goAlert.alertInfo("Server retrive from Inventory", data.message);
            window.scrollTo(0, 0);
            $('.nav-tabs a[href="#rpt_server_invt_register_csi_tab"]').tab('show');
            document.getElementById("rpt_server_invt_btn_update").style.display = "";
            document.getElementById("div_rpt_server_invt_csiidselected").style.display = "";
            document.getElementById("rpt_server_invt_btn_submit").style.display = "none";
            document.getElementById("rpt_server_invt_div_doc_support").style.display = "none";
            $("#rpt_server_invt_btn_submit").attr("onclick", "rpt_server_invt_fn_submit_csi()");
            $("#rpt_server_invt_btn_update").attr("onclick", "rpt_server_invt_fn_update_csi()");
            $("#rpt_server_invt_btn_clear").attr("onclick", "rpt_server_invt_fn_clear_csi()");
        });
    } else {
        goAlert.alertError("Server retrive from Inventory", data.message);

    }
}

function converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
        type: contentType
    }); //statement which creates the blob
    return blob;
}

function fnRPTServerINVTUpdateServerReportCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Server Update Transaction", data.message);
        rpt_server_invt_fnRefresh_host_listing();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTUpdateServiceReportCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Service Update Transaction", data.message);
        rpt_server_invt_fnRefresh_service_listing();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTUpdateCSIReportCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("CSI Update Transaction", data.message);
        rpt_server_invt_fnRefresh_csi_listing();
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTDownloadCSIDocSupportCallBack(data) {
    if (data.status == "1") {
        var zip = new JSZip();
        var csi_number;
        $.each(data.data, function (i, item) {
            if (item.doc_file.length > 0) {
                blob = converBase64toBlob(item.doc_file, "applcation/zip");
                var file = new File([blob], "blob.zip");
                var fname = item.doc_name;
                csi_number = item.csi_no;
                zip.file(fname, file);
            } else {
                goAlert.alertError("Processing Failed", "No document support for this CSI");
            }
        });
        zip.generateAsync({
            type: "blob"
        })
            .then(function (content) {
                saveAs(content, csi_number + ".zip");
            });
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}
/*var fileunzip = "";*/
function fnRPTServerINVTDownloadDocSupportCallBack(data) {
    if (data.status == "1") {
        var zip = new JSZip();
        var csi_number;
        var file_name;
        var loop_count;
        var file;
        $.each(data.data, function (i, item) {
            if (item.doc_file.length > 0) {
                blob = converBase64toBlob(item.doc_file, "applcation/zip");
                file = new File([blob], "blob.zip");
                file_name = item.doc_name;
                csi_number = item.csi_no;
                
                //zip.loadAsync(file).then(function (zip) {
                //    Object.keys(zip.files).forEach(function (filename) {
                //        zip.files[filename].async("blob").then(function (fileData) {
                //            fileunzip = new File([fileData], "blob.zip");
                //        })
                //    })
                //})
                zip.file(file_name + ".zip", file);
                

                loop_count = i + 1;
            } else {
                goAlert.alertError("Processing Failed", "No document support for this CSI");
            }
        });

        if (loop_count > 1) {
            zip.generateAsync({
                type: "blob"
            })
                .then(function (content) {
                    saveAs(content, csi_number + "_" + loop_count + "files.zip");
                    //if (loop_count > 1) {
                    //    saveAs(content, csi_number + "_" + loop_count + "files.zip");
                    //}
                    ////else {
                    ////    saveAs(content, csi_number + "_" + file_name + ".zip");
                    ////}
                });
        }
        else {
            saveAs(file, csi_number + "_" + file_name + ".zip");
        }
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTGetDocSupportCallBack(data) {
    if (data.status == "1") {
        //dataTable.ApplyJsonData("rpt_server_invt_tbl_csi_listing_doc", data.data);
        var columns_csi_doc = [{
            'data': 'doc_id',
            'render': function (doc_id) {
                return "<input type='checkbox' style='margin-left:25%;' value='" + doc_id + "' />"
            },
            'sortable': false
        },
        {
            'data': 'doc_id'
        },
        {
            'data': 'doc_name'
        },
        {
            'data': 'doc_size'
        },
        {
            'data': 'upload_date'
        },
        {
            'data': 'uploader'
        },
        {
            'data': '',
            'render': function () {
                return ""
            }
        }
        ];
        modals.OpenStatic("rpt_server_invt_modal_view_doc_support_list");
        dataTable.ApplyJson("rpt_server_invt_tbl_csi_listing_doc", columns_csi_doc, data.data);
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTUploadCSICallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("CSI Upload Transaction", data.message);
        var csi_no = $("#rpt_server_invt_modal_csi_no").val();
        var data = {
            csi_no: csi_no
        };
        CallAPI.Go(v_rpt_server_invt_get_csi_doc, data, fnRPTServerINVTGetDocSupportCallBack, "Processing...");
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTRefreshObjCallBack(data) {
    if (data.status == "1") {
        var option_system_type = '<option value=""></option>';
        var option_ostype = '<option value=""></option>';
        var option_csi = '<option value="0">N/A</option>';
        var option_host = '<option value=""></option>';
        var option_system_type_service;
        var option_dc_host = '<option value="0">N/A</option>';
        v_step_auto = [];
        $.each(data.data.all_dc_host, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.all_dc_host);
            }
            if (i == 0) {
                option_dc_host = option_dc_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            } else {
                option_dc_host = option_dc_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            }
        });
        $.each(data.data.all_system_type, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.all_system_type);
            }
            if (i == 0) {
                option_system_type = '<option value=""></option>'
                option_system_type = option_system_type + '<option value="' + item.system_type + '">' + item.pl_name + '</option>';
            } else {
                option_system_type = option_system_type + '<option value="' + item.system_type + '">' + item.pl_name + '</option>';
            }
        });

        $.each(data.data.all_os_platform, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_ostype);
            }
            if (i == 0) {
                option_ostype = '<option value=""></option>';
                option_ostype = option_ostype + '<option value="' + item.os_id + '">' + item.os_name + '</option>';
            } else {
                option_ostype = option_ostype + '<option value="' + item.os_id + '">' + item.os_name + '</option>';
            }
        });
        $.each(data.data.all_csi, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_csi);
            }
            if (i == 0) {
                option_csi = option_csi + '<option value="' + item.no + '">' + item.no + ' - CSI_' + item.csi_number + ' - SN_' + item.sn + '</option>';
            } else {
                option_csi = option_csi + '<option value="' + item.no + '">' + item.no + ' - CSI' + item.csi_number + ' - SN_' + item.sn + '</option>';
            }
        });
        $.each(data.data.host_listing, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_host);
            }
            if (i == 0) {
                option_host = '<option value=""></option>';
                option_host = option_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            } else {
                option_host = option_host + '<option value="' + item.host_id + '">' + item.host_name + '</option>';
            }
        });
        $.each(data.data.all_system_type_service, function (i, item) {
            if (item.is_auto == "Y") {
                v_step_auto.push(item.option_host);
            }
            if (i == 0) {
                option_system_type_service = option_system_type_service + '<option value="' + item.system_id + '">' + item.system_name + '</option>';
            } else {
                option_system_type_service = option_system_type_service + '<option value="' + item.system_id + '">' + item.system_name + '</option>';
            }
        });
        //selectionStyle.LiveSearch("rpt_server_invt_system_type", option_system_type);
        //selectionStyle.LiveSearch("rpt_server_invt_osplatform", option_ostype);
        selectionStyle.LiveSearch("rpt_server_invt_csi", option_csi);
        selectionStyle.LiveSearch("rpt_server_invt_hostid_mapping", option_host);
        //selectionStyle.LiveSearch("rpt_server_invt_servicetype_mapping", option_system_type_service);
        selectionStyle.LiveSearch("rpt_server_invt_drof", option_dc_host);

        //var site = $("#rpt_server_invt_hostside").val();
        //if (site == "DC") {
        //    selectionStyle.LiveSearch("rpt_server_invt_drof", option_dc_host);
        //}
    } else {
        goAlert.alertError("Processing Failed", data.message);
    }
}

function fnRPTServerINVTDeleteDocCallBack(data) {
    if (data.status == "1") {
        goAlert.alertInfo("Delete Document Process", data.message);
        rpt_server_invt_fn_open_modal_csi_doc_support();
    } else {
        goAlert.alertError("Delete Document Process", data.message);
    }
}
