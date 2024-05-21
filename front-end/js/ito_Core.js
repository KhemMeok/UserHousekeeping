/// <reference path="ito_variable.js" />

var myRequest = (function () {
    var methods = {};
    methods.Execute = function (url, data, callBackFunction, processIndecatorName, processIndecatorType, spinner_id, request_method, data_type) {
        var newRequestMethod = (request_method === undefined) ? "POST" : request_method;
        var newDataType = (data_type === undefined) ? "xml" : data_type;
        var newContentType = (newDataType == "xml") ? "application/x-www-form-urlencoded; charset=utf-8" : "application/json; charset=utf-8";
        $.ajax({
            type: newRequestMethod,
            url: url,
            data: data,
            dataType: newDataType,
            timeout: 3600000,
            contentType: newContentType,
            beforeSend: function () {

                if (processIndecatorName !== undefined) {
                    if (processIndecatorName !== "No_Indecator") {
                        processIndicator.Start(processIndecatorName);
                    };
                }
                else {
                    if (processIndecatorType == "spin") {
                        if (typeof spinner_id != "object") {
                            processIndicator.SpinnerStart(spinner_id);
                        }
                        else {
                            for (var I = 0; I < spinner_id.length; I++) {
                                processIndicator.SpinnerStart(spinner_id[I]);
                            };
                        };

                    }
                };

            },
            success: function (respond_data) {
                if (processIndecatorName !== undefined) {
                    if (processIndecatorName !== "No_Indecator") {
                        processIndicator.Stop();
                    };
                }
                callBackFunction(respond_data);
            },
            error: function () {
                if (processIndecatorName !== undefined) {
                    if (processIndecatorName !== "No_Indecator") {
                        processIndicator.Stop();
                    };
                }
            }
        });
        return methods;
    };
    methods.FileUpload = function (url, formData, callBackFunction, upload_method) {
        upload_method = (upload_method === undefined) ? "POST" : upload_method;
        $.ajax({
            url: url,
            method: upload_method,
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                processIndicator.Start("Uploading...");
            },
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        var percent = Math.round(e.loaded / e.total * 100);
                        processIndicator.ResetTitle("Uploaded (" + percent + "%)");
                    }
                });
                return xhr;
            },
            success: function (respond_data) {
                processIndicator.Stop();
                callBackFunction(respond_data);
            },
            error: function () {

                processIndicator.Stop();
            }
        });
        return methods;
    };
    return methods;
})();
function fn_error_alert(msg) {
    toastr.error(msg);
};
function fn_success_alert(msg) {
    toastr.success(msg)
};
var goShowHide = (function () {
    var methods = {};
    methods.showOnDivAsBlock = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).css({ "display": "block" });
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).css({ "display": "block" });
            };
        };
        return methods;

    };
    methods.showOnDivAsInline = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).css({ "display": "inline" });
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).css({ "display": "inline" });
            };
        };
        return methods;

    };
    methods.showTr = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).css({ "display": "" });
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).css({ "display": "" });
            };
        };
        return methods;

    };
    methods.hideTr = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).css({ "display": "none" });
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).css({ "display": "none" });
            };
        };
        return methods;

    };
    methods.hideOnDiv = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).css({ "display": "none" });
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).css({ "display": "none" });
            };
        };
        return methods;
    };
    return methods;
})();
var element = (function () {
    var month_names = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];
    var methods = {};
    methods.setDisable = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).prop("disabled", true);
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).prop("disabled", true);
            };
        };
        return methods;
    };
    methods.setEnable = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).prop("disabled", false);
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).prop("disabled", false);
            };
        };
        return methods;
    };
    methods.inputValue = function (element_id, value) {
        $("#" + element_id).val(value);
        $("#" + element_id).html(value);
        return methods;
    };
    methods.checkSuccess = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).html("<i class='fa fa-check' style='color:#28a745;'></i>");
        }
        else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).html("<i class='fa fa-check' style='color:#28a745;'></i>");
            };
        };

        return methods;
    };
    methods.checkFail = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).html("<i class='fa fa-times' style='color:#dc3545;'></i>");
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).html("<i class='fa fa-times' style='color:#dc3545;'></i>");
            };
        };

        return methods;
    };
    methods.SetCurrentDate = function (element_id) {
        var td = new Date();
        var datestr = td.getDate() + "-" + month_names[td.getMonth()] + "-" + td.getFullYear();
        $("#" + element_id).val(datestr);
    };
    return methods;
})();
var checkBox = (function () {
    var methods = {};
    var status;
    methods.Uncheck = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).removeAttr("checked");
            $("#" + element_id).prop("checked", false);
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).removeAttr("checked");
                $("#" + element_id[I]).prop("checked", false);
            };
        };
        return methods;
    };
    methods.Check = function (element_id) {
        if (typeof element_id != "object") {
            $("#" + element_id).removeAttr("checked");
            $("#" + element_id).prop("checked", true);
        } else {
            for (var I = 0; I < element_id.length; I++) {
                $("#" + element_id[I]).removeAttr("checked");
                $("#" + element_id[I]).prop("checked", true);
            };
        };
        return methods;
    };
    methods.checkStat = function (element_id) {
        status = false;
        var checkBoxDoc = document.getElementById(element_id);
        if (checkBoxDoc.checked == true) {
            status = true;
        }
        else {
            status = false;
        };
        return status;
    };
    return methods;
})();
var goAlert = (function () {
    var methods = {};
    methods.alertErroTo = function (elementID, actionTitle, msg, eventActionName) {
        eventActionName = (eventActionName === undefined) ? "click" : eventActionName;
        if (typeof elementID != "object") {

            $("#" + elementID).addClass("is-invalid");
            $("#" + elementID).bind(eventActionName, function () {
                $("#" + elementID).removeClass("is-invalid");
            });
        }
        else {
            for (var I = 0; I < elementID.length; I++) {
                $("#" + elementID[I]).addClass("is-invalid");
                $("#" + elementID[I]).bind(eventActionName, function () {
                    $("#" + elementID[I]).removeClass("is-invalid");
                });
            };
        };
        fn_toats_alert(actionTitle, msg);
        return methods;
    };
    methods.alertInfo = function (actiontitle, msg) {
        fn_toats_alert(actiontitle, msg, "info");
        return methods;
    };
    methods.alertError = function (actiontitle, msg) {
        fn_toats_alert(actiontitle, msg);
        return methods;
    };
    methods.alertHelp = function (msg) {
        fn_toats_alert("Help", msg, "help");
        return methods;
    };
    return methods;
})();
function fn_toats_alert(actiontitle, msg, type) {
    var backgroundClass = "";
    var icon_name = "";
    var durration_delay = 0;
    if (type === undefined) {
        backgroundClass = "bg-danger";
        icon_name = "fa fa-exclamation-triangle fa-lg";
        durration_delay = 10000;
    }
    else if (type == "info") {
        backgroundClass = "bg-info";
        icon_name = "fa fa-info-circle fa-lg"
        durration_delay = 10000;
    }
    else if (type == "help") {
        backgroundClass = "bg-white"
        icon_name = "fa fa-question-circle fa-lg";
        durration_delay = 60000;
    };
    $(document).Toasts('create', {
        class: backgroundClass,
        title: actiontitle,
        body: msg,
        autohide: true,
        stackable: true,
        icon: icon_name,
        delay: durration_delay
    })
};
var selectionStyle = {
    LiveSearch: function (element_id, data) {
        if (data !== undefined) {
            $("#" + element_id).empty();
            $("#" + element_id).html(data);
        };
        $("#" + element_id).select2({
            theme: 'bootstrap4'
        })
    },
    LiveSearchRefresh: function (element_id) {

        $("#" + element_id).select2({
            theme: 'bootstrap4'
        })
    },
    LiveSearchRefreshWithOption: function (element_id, optionValue) {
        $("#" + element_id).val(optionValue);
        $("#" + element_id).select2({
            theme: 'bootstrap4'
        })
    },
    Multiple: function (element_id, data) {
        if (data !== undefined) {
            $("#" + element_id).empty();
            $("#" + element_id).html(data);
        };
        $("#" + element_id + " option[value='']").remove();
        $("#" + element_id).bootstrapDualListbox({
            moveOnSelect: false
        });
        setTimeout(function () {
            $("#" + element_id).bootstrapDualListbox("refresh", true);
        }, 100); //Khim edit for faster select
    },
    //add new for 2 Multiple select
    Multiples: function (element_id, data) {
        if (data !== undefined) {
            $("#" + element_id).empty();
            $("#" + element_id).html(data);
        };
        $("#" + element_id + " option[value='']").remove();
        $("#" + element_id).bootstrapDualListbox({
            moveOnSelect: false
        });
        setTimeout(function () {
            $("#" + element_id).bootstrapDualListbox("refresh", true);
        }, 300);
    },
    MultipleInline: function (element_id, data) {
        if (data !== undefined) {
            $("#" + element_id).empty();
            $("#" + element_id).html(data);
        };
        setTimeout(function () {
            $("#" + element_id + " option[value='']").remove();
            $("#" + element_id).addClass("select2bs4");
            $("#" + element_id).select2({
                theme: 'bootstrap4',
                allowClear: true
            });
        }, 10);
        //$("#" + element_id + " option[value='NULL']").remove();

    },
    MultipleInlineRefresh: function (element_id) {
        $("#" + element_id).select2({
            theme: 'bootstrap4',
            allowClear: true
        });
    },
    MultipleInline2: function (element_id, data, isMultiple) {
        if (data !== undefined) {
            $("#" + element_id).empty();
            $("#" + element_id).html(data);
        }

        setTimeout(function () {
            $("#" + element_id + " option[value='']").remove();
            $("#" + element_id).addClass("select2bs4");

            // Configure Select2 with the "multiple" option
            const select2Options = {
                theme: 'bootstrap4',
                allowClear: true
            };

            if (isMultiple) {
                select2Options.multiple = true;
            }

            $("#" + element_id).select2(select2Options);
        }, 10);
    }

};
//function apply process indicator
//This object literals can return value too
var processIndicator = {
    Start: function (title) {
        if (title === undefined) {
            title = "Processing...";
        };
        var content = '<div class="modal" id="modalProcess">';
        content = content + '<div class="modal-dialog modal-dialog-centered modal-sm">';
        content = content + '<div class="modal-content" style="border: 0px; background-color: transparent; box-shadow: none">';
        content = content + '<div class="modal-body text-center" style="border: 0px;">';
        content = content + '<div class="spinner-border text-primary"></div>';
        content = content + '<div style="font-weight: bold;" class="text-light" id="modalProcessActionName"></div>';
        content = content + '</div></div></div></div>';
        var tmpmodal = document.getElementById("modalProcess");
        if (tmpmodal == null) {
            $("body").append(content);
        };

        $("#modalProcess").modal({ backdrop: "static" });
        $("#modalProcessActionName").html(title);
    },
    Stop: function () {
        //$("#process_indicator").removeClass("is-active");
        $("#modalProcess").modal("hide");
    },
    ResetTitle: function (title) {
        $("#modalProcessActionName").html(title);
    },
    SpinnerStart: function (element_id) {
        $("#" + element_id).html("<i class='spinner-border text-primary spinner-border-sm'></i>");
    }
};
var v_confirm_note;
var v_modal_type;
var v_note;
var modals = {
    Open: function (modalID) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($.fn.dataTable.tables(true)).DataTable()
                .columns.adjust()
                .responsive.recalc();
        });

        $("#" + modalID + " .modal-dialog").css({
            top: 0,
            left: 0
        });
        $("#" + modalID + " .modal-dialog .modal-header").css({
            cursor: "all-scroll"
        });

        $("#" + modalID + " .modal-dialog").draggable({
            handle: ".modal-header"
        });
        $("#" + modalID).modal("show");

    },
    OpenStatic: function (modalID) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($.fn.dataTable.tables(true)).DataTable()
                .columns.adjust()
                .responsive.recalc();
                
        });

        $("#" + modalID + " .modal-dialog").css({
            top: 0,
            left: 0
        });
        $("#" + modalID + " .modal-dialog .modal-header").css({
            cursor: "all-scroll"
        });

        $("#" + modalID + " .modal-dialog").draggable({
            handle: ".modal-header"
        });
        $("#" + modalID).modal({ backdrop: 'static' });

    },
    Close: function (modalID) {
        $("#" + modalID).modal("hide");
    },
    CloseConfirm: function () {
        $("#modal_confirm_note").modal("hide");
        if (checkBox.checkStat("md_confirm_check_show") == true) {
            if (v_modal_type !== null || v_modal_type !== undefined) {
                localStorages.AddNew(v_modal_type, "Y");
                v_modal_type = undefined;
            };
        };
    },
    Confirm: function (title, question, require_remark, btn_confirm_name, attribute, callfunction, modal_type) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($.fn.dataTable.tables(true)).DataTable()
                .columns.adjust()
                .responsive.recalc();
        });
        v_modal_type = modal_type;
        $("#modal_confirm_note").modal("show");
        $("#md_confirm_title").html(title);
        $("#md_confirm_question").html(question);
        $("#md_confirm_btn").html(btn_confirm_name);
        $("#md_confirm_btn").attr(attribute, callfunction);
        $("#md_confirm_note").val("");
        if (require_remark == "Y") {
            goShowHide.showOnDivAsBlock("md_div_confirm_note")
        }
        else {
            goShowHide.hideOnDiv("md_div_confirm_note");
        };
        checkBox.Uncheck("md_confirm_check_show");
    },
    getConfirmNote: function () {
        v_confirm_note = $("#md_confirm_note").val();
        $("#md_confirm_note").val("");
        return v_confirm_note;
    },
    ConfirmShowAgain: function (modal_type) {
        var boolStat;
        var status = (localStorages.GetValue(modal_type) === null) ? "Y" : "N";
        if (status == "Y") {
            boolStat = true;
            return boolStat;
        }
        else {
            boolStat = false;
            return boolStat;
        };
    },
    AddNote: function (callfunction) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($.fn.dataTable.tables(true)).DataTable()
                .columns.adjust()
                .responsive.recalc();
        });
        $("#modal_add_note .modal-dialog").css({
            top: 0,
            left: 0
        });
        $("#modal_add_note .modal-dialog .modal-header").css({
            cursor: "all-scroll"
        });

        $("#modal_add_note .modal-dialog").draggable({
            handle: ".modal-header"
        });
        $("#modal_add_note").modal("show");
        $("#md_add_note_btn").attr("onclick", callfunction);
        $("#md_add_note_note").val("");
    },
    CloseAddNote: function () {
        $("#modal_add_note").modal("hide");
    },
    GetNote: function () {
        v_note = $("#md_add_note_note").val();
        return v_note;
    }
};
//Datetimepicker
var datePicker = {
    DateTest: function (element_id) {
        $("#" + element_id).attr("data-target", "#" + element_id);
        $("#" + element_id).attr("data-toggle", "datetimepicker");
        $("#" + element_id).addClass("datetimepicker-input");
        $("#" + element_id).datetimepicker({
            format: 'DD/MM/YYYY',
            icons: {
                time: 'far fa-clock'
            },
            autoclose: true
        });
    },
    TimeMonthYear: function (element_id) {
        $("#" + element_id).attr("data-target", "#" + element_id);
        $("#" + element_id).attr("data-toggle", "datetimepicker");
        $("#" + element_id).addClass("datetimepicker-input");

        // Get the current date and format it as 'MMM-YYYY'
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        var formattedDate = currentDate.toLocaleString('en-us', { month: 'short', year: 'numeric' });

        $("#" + element_id).datetimepicker({
            format: 'MMM-YYYY',
            icons: {
                time: 'far fa-clock'
            },
            autoclose: true
        });

        $("#" + element_id).val(formattedDate.replace(" ","-"));
    },
    Date: function (element_id) {
        $("#" + element_id).attr("data-target", "#" + element_id);
        $("#" + element_id).attr("data-toggle", "datetimepicker");
        $("#" + element_id).addClass("datetimepicker-input");
        $("#" + element_id).datetimepicker({
            format: 'DD-MMM-YYYY',
            icons: {
                time: 'far fa-clock'
            },
            autoclose: true
        });
    },
    DateTime: function (element_id) {
        $("#" + element_id).attr("data-target", "#" + element_id);
        $("#" + element_id).attr("data-toggle", "datetimepicker");
        $("#" + element_id).addClass("datetimepicker-input");
        $("#" + element_id).datetimepicker({

            format: 'DD-MMM-YYYY HH:mm',
            icons: {
                time: 'far fa-clock'
            },
            autoclose: true
        });
    },
    Time: function (element_id) {
        $("#" + element_id).attr("data-target", "#" + element_id);
        $("#" + element_id).attr("data-toggle", "datetimepicker");
        $("#" + element_id).addClass("datetimepicker-input");
        $("#" + element_id).datetimepicker({
            format: 'HH:mm',
            icons: {
                time: 'far fa-clock'
            },
            autoclose: true
        });
    },
    DateRange: function (element_id) {
        $("#" + element_id).daterangepicker({
            "buttonClasses": "btn btn-xs",
            "drops": "auto",
            "showDropdowns": true,
            locale: {
                format: 'DD-MMM-YYYY'
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            "alwaysShowCalendars": true,
            "opens": "center"

        });
    },
	DateTimeRange: function (element_id) {
        $("#" + element_id).daterangepicker({
            timePicker: true,
            "buttonClasses": "btn btn-xs",
            "drops": "auto",
            "showDropdowns": true,
            locale: {
                format: 'DD-MMM-YYYY HH:mm'
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            "alwaysShowCalendars": true,
            "opens": "center"
        });
    },
    Refresh: function (element_id) {
        $("#" + element_id).val(null);
        $("#" + element_id).datetimepicker("destroy");
    },
};
//datatable
var dataTable = {
    Apply: function (frespondElementID, data) {
        setTimeout(function () {

            $("#" + frespondElementID).empty();
            $("#" + frespondElementID).html("");
            $("#" + frespondElementID).html(data);
            $("#" + frespondElementID).dataTable({
                stateSave: true,
                destroy: true,
                responsive: {
                    details: {
                        type: 'column',
                        target: -1
                    }
                },
                select: true,
                order: [],
                columnDefs: [
                    {

                        'targets': 0,
                        'searchable': false,
                        'orderable': false,
                        'className': 'dt-body-center'
                    },
                    {
                        className: 'control',
                        orderable: false,
                        targets: -1
                    }],
            });
            setTimeout(function () {

                var tmpTable = $('#' + frespondElementID).DataTable();
                $('#' + frespondElementID + ' tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        tmpTable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
            }, 10);
        }, 1000);

    },
    ApplyJsonV2: function (table_id, object_columns, data) {
        //$("#" + table_id).empty();
        $("#" + table_id).dataTable({
            data:data,
            stateSave: true,
            scrollY: "200px",
            scrollCollapse: true,
            paging: false,
            destroy: true,
            responsive: {
                details: {
                    type: 'column',
                    target: -1
                }
            },
            columns: object_columns,
            select: true,
            order: [],
            columnDefs: [{
                className: 'control',
                orderable: false,
                targets: -1
            }]
        });
        setTimeout(function () {

            var tmpTable = $('#' + table_id).DataTable();
            $('#' + table_id + ' tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tmpTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        }, 10);
    },
    ApplyJson: function (table_id, object_columns, data) {
        //$("#" + table_id).empty();
        $("#" + table_id).dataTable({
            data: data,
            stateSave: true,
            destroy: true,
            responsive: {
                details: {
                    type: 'column',
                    target: -1
                }
            },
            columns: object_columns,
            select: true,
            order: [],
            columnDefs: [{
                className: 'control',
                orderable: false,
                targets: -1
            }]
        });
        setTimeout(function () {
            $("#" + table_id + "_ck_selectall").attr("onclick", "table.SelectAllCheckBox('" + table_id + "','" + table_id + "_ck_selectall')");
            var tmpTable = $('#' + table_id).DataTable();
            $('#' + table_id + ' tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tmpTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        }, 10);
    },
    ApplyJsonScroll: function (table_id, object_columns, data) {
        //$("#" + table_id).empty();
        $("#" + table_id).dataTable({
            data: data,
            stateSave: true,
            scrollY: "200px",
            scrollCollapse: true,
            paging: false,
            destroy: true,
            responsive: {
                details: {
                    type: 'column',
                    target: -1
                }
            },
            columns: object_columns,
            select: true,
            order: [],
            columnDefs: [{
                className: 'control',
                orderable: false,
                targets: -1
            }]
        });
        setTimeout(function () {
            $("#" + table_id + "_ck_selectall").attr("onclick", "table.SelectAllCheckBox('" + table_id + "','" + table_id + "_ck_selectall')");
            var tmpTable = $('#' + table_id).DataTable();
            $('#' + table_id + ' tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tmpTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        }, 10);
    },
    ApplyJsonData: function (table_id, json_data) {
        if ($.fn.DataTable.isDataTable("#" + table_id)) {
            $("#" + table_id).DataTable().destroy();
            
        }
        //$("#" + table_id + " thead").empty();
        //$("#" + table_id + " tboday").empty();
        $("#" + table_id).empty();
        //$("#" + table_id).html("");
        //$("#" + table_id).html("");
        setTimeout(function () {
            var table_data = "";
            // Get Columns
            var col = [];
            //col.push("");
            for (var i = 0; i < json_data.length; i++) {
                for (var key in json_data[i]) {
                    if (col.indexOf(key) === -1) {
                        //console.log(key);
                        col.push(key);
                    }
                }
            }

            var tbl_header = "<thead><tr style='height:30px;'><th data-orderable='false' style='text-align:center;  height:20px; padding-top:1px;padding-bottom:1px;'><input type='checkbox' style='transform: scale(1);' id='" + table_id + "_ck_selectall'></th>";
            for (var i = 0; i < col.length; i++) {
                tbl_header = tbl_header + "<th style=' height:20px; padding-top:0px;padding-bottom:5px;'>" + col[i].toUpperCase() + "</th>";
            }
            tbl_header = tbl_header + "<th style='text-align:center;  height:20px; padding-top:1px;padding-bottom:1px;'></th></tr></thead>";
            var table_body = "<tbody>";

            for (var i = 0; i < json_data.length; i++) {
                table_body = table_body + "<tr style='height:21px;'>";
                for (var j = 0; j < col.length; j++) {
                    if (j == 0) {
                        table_body = table_body + "<td style='text-align:center; height:20px;  padding-top:1px; padding-bottom:1px;'><input type='checkbox' style='transform: scale(1); margin-top:5px;' value='" + json_data[i][col[j]] + "' /></td>"
                    }
                    table_body = table_body + "<td style='height:20px; padding-top:5px;padding-bottom:0px; margin-top:5px;'>" + json_data[i][col[j]] + "</td>";
                }
                table_body = table_body + "<td style='text-align:center; height:20px; padding-top:1px;padding-bottom:1px;'></td>";
                table_body = table_body + "</tr>";
            }
            table_body = table_body + "</tbody>";
            table_data = tbl_header + table_body;
            $("#" + table_id).html(table_data);
            $("#" + table_id).dataTable({
               
                stateSave: true,
                destroy: true,
                responsive: {
                    details: {
                        type: 'column',
                        target: -1
                    }
                },
                select: true,
                order: [],
                columnDefs: [
                    {

                        'targets': 0,
                        'searchable': false,
                        'orderable': false,
                        'className': 'dt-body-center'
                    },
                    {
                        className: 'control',
                        orderable: false,
                        targets: -1
                    }],
            });
            setTimeout(function () {
                $("#" + table_id + "_ck_selectall").attr("onclick", "table.SelectAllCheckBox('" + table_id + "','" + table_id + "_ck_selectall')");
                var tmpTable = $('#' + table_id).DataTable();
                $('#' + table_id + ' tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        tmpTable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
            }, 10);
        }, 1000);

    },
    ApplyJsonDataScroll: function (table_id, json_data) {
        if ($.fn.DataTable.isDataTable("#" + table_id)) {
            $("#" + table_id).DataTable().destroy();

        }
        //$("#" + table_id + " thead").empty();
        //$("#" + table_id + " tboday").empty();
        $("#" + table_id).empty();
        //$("#" + table_id).html("");
        //$("#" + table_id).html("");
        setTimeout(function () {
            var table_data = "";
            // Get Columns
            var col = [];
            //col.push("");
            for (var i = 0; i < json_data.length; i++) {
                for (var key in json_data[i]) {
                    if (col.indexOf(key) === -1) {
                        //console.log(key);
                        col.push(key);
                    }
                }
            }

            var tbl_header = "<thead><tr style='height:30px;'><th data-orderable='false' style='text-align:center;  height:20px; padding-top:1px;padding-bottom:1px;'><input type='checkbox' style='transform: scale(1);' id='" + table_id + "_ck_selectall'></th>";
            for (var i = 0; i < col.length; i++) {
                tbl_header = tbl_header + "<th style=' height:20px; padding-top:0px;padding-bottom:5px;'>" + col[i].toUpperCase() + "</th>";
            }
            tbl_header = tbl_header + "<th style='text-align:center;  height:20px; padding-top:1px;padding-bottom:1px;'></th></tr></thead>";
            var table_body = "<tbody>";

            for (var i = 0; i < json_data.length; i++) {
                table_body = table_body + "<tr style='height:21px;'>";
                for (var j = 0; j < col.length; j++) {
                    if (j == 0) {
                        table_body = table_body + "<td style='text-align:center; height:20px;  padding-top:1px; padding-bottom:1px;'><input type='checkbox' style='transform: scale(1); margin-top:5px;' value='" + json_data[i][col[j]] + "' /></td>"
                    }
                    table_body = table_body + "<td style='height:20px; padding-top:5px;padding-bottom:0px; margin-top:5px;'>" + json_data[i][col[j]] + "</td>";
                }
                table_body = table_body + "<td style='text-align:center; height:20px; padding-top:1px;padding-bottom:1px;'></td>";
                table_body = table_body + "</tr>";
            }
            table_body = table_body + "</tbody>";
            table_data = tbl_header + table_body;
            $("#" + table_id).html(table_data);
            $("#" + table_id).dataTable({

                stateSave: true,
                destroy: true,
                scrollY: "200px",
                scrollCollapse: true,
                paging: false,
                responsive: {
                    details: {
                        type: 'column',
                        target: -1
                    }
                },
                select: true,
                order: [],
                columnDefs: [
                    {

                        'targets': 0,
                        'searchable': false,
                        'orderable': false,
                        'className': 'dt-body-center'
                    },
                    {
                        className: 'control',
                        orderable: false,
                        targets: -1
                    }],
            });
            setTimeout(function () {
                $("#" + table_id + "_ck_selectall").attr("onclick", "table.SelectAllCheckBox('" + table_id + "','" + table_id + "_ck_selectall')");
                var tmpTable = $('#' + table_id).DataTable();
                $('#' + table_id + ' tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        tmpTable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
            }, 10);
        }, 1000);

    },
    Refresh: function (frespondElementID) {
        $("#" + frespondElementID).dataTable({
            responsive: {
                details: {
                    type: 'column',
                    target: -1
                }
            },
            stateSave: true,
            select: true,
            order: [],
            columnDefs: [
                {

                    'targets': 0,
                    'searchable': false,
                    'orderable': false,
                    'className': 'dt-body-center'
                },
                {
                    className: 'control',
                    orderable: false,
                    targets: -1
                }],
        });
    },
    Recal: function () {
        setTimeout(function () { $($.fn.dataTable.tables(true)).DataTable().responsive.recalc() }, 500);
    }
};
var formReset = (function () {
    var methods = {};
    methods.ToEmpty = function (elementID) {
        var elementTag = $("#" + elementID)[0].tagName;
        if (elementTag == "INPUT" || elementTag == "TEXTAREA") {
            $("#" + elementID).val("");
        }
        else {

            $("#" + elementID).html("");
            $("#" + elementID).bootstrapDualListbox("refresh", true);
        };
        return methods;
    };
    methods.ToDefaultValue = function (elementID, defaultValue) {
        var elementTag = $("#" + elementID)[0].tagName;
        if (elementTag == "INPUT" || elementTag == "SELECT") {
            $("#" + elementID).val(defaultValue);
            $("#" + elementID).val(defaultValue).trigger('change');
        }
        else {
            $("#" + elementID).html(defaultValue);
        };
        return methods;
    };
    return methods;
})();

// function create xml only 2 sub child structure
var stringCreate = (function () {
    var xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    var finalString;
    var xmlroot;
    var methods = {};
    var tmpValue;;
    methods.toXML = function (root, object) {
        xmlroot = root;
        finalString = "";
        tmpValue = "";
        for (var child in object) {
            if (typeof object[child] != "object") {
                tmpValue = object[child].toString();
                tmpValue = tmpValue.replace("<>", "R_LESS_THEN_R_GREATER_THEN");
                tmpValue = tmpValue.replace("<", "R_LESS_THEN");
                tmpValue = tmpValue.replace(">", "R_GREATER_THEN");
                tmpValue = tmpValue.replace("&", "R_AND");
                finalString = finalString + '<' + child + '>' + tmpValue + '</' + child + '>';
            } else {
                finalString = finalString + '<' + child + '>';
                for (var subchild1 in object[child]) {
                    if (typeof object[child][subchild1] != "object") {
                        tmpValue = object[child][subchild1].toString();
                        tmpValue = tmpValue.replace("<>", "R_LESS_THEN_R_GREATER_THEN");
                        tmpValue = tmpValue.replace("<", "R_LESS_THEN");
                        tmpValue = tmpValue.replace(">", "R_GREATER_THEN");
                        tmpValue = tmpValue.replace("&", "R_AND");
                        finalString = finalString + '<' + subchild1 + '>' + object[child][subchild1] + '</' + subchild1 + '>';
                    } else {
                        finalString = finalString + '<' + subchild1 + '>';
                        for (var subchild2 in object[child][subchild1]) {
                            if (typeof object[child][subchild1][subchild2] != "object") {
                                tmpValue = object[child][subchild1][subchild2].toString();
                                tmpValue = tmpValue.replace("<>", "R_LESS_THEN_R_GREATER_THEN");
                                tmpValue = tmpValue.replace("<", "R_LESS_THEN");
                                tmpValue = tmpValue.replace(">", "R_GREATER_THEN");
                                tmpValue = tmpValue.replace("&", "R_AND");
                                finalString = finalString + '<' + subchild2 + '>' + object[child][subchild1][subchild2] + '</' + subchild2 + '>';
                            };
                        }
                        finalString = finalString + '</' + subchild1 + '>';
                    }
                };
                finalString = finalString + '</' + child + '>';
            };
        };
        return methods;
    };
    methods.End = function () {
        finalString = xmlHeader + "<" + xmlroot + ">" + finalString + "</" + xmlroot + ">";
        tmpValue = "";
        return finalString;
    };
    methods.FromObject = function (Object_array) {
        var str = "";
        for (var i = 0; i < Object_array.length; i++) {
            str = str + Object_array[i] + ",";
        };
        str = str.replace(/,\s*$/, "");
        return str;
    };
    return methods;
})();
var searchData = (function () {
    var methods = {};
    var searchStat;
    methods.arrayInarray = function (searchObject, toObject) {
        searchStat = "N";
        for (var I = 0; I < searchObject.length; I++) {
            for (var J = 0; J < toObject.length; J++) {
                if (searchObject[I] == toObject[J]) {
                    searchStat = "Y";
                };
                if (searchStat == "Y") {
                    break;
                };
            };
            if (searchStat == "Y") {
                break;
            };
        };
        return searchStat;
    };
    methods.SearchNode = function (seachNode, InObject) {
        searchStat = "N";
        for (var J = 0; J < InObject.length; J++) {
            if (InObject[J] == seachNode) {
                searchStat = "Y";
            };
            if (searchStat == "Y") {
                break;
            };
        };
        return searchStat;
    };
    return methods;
})();
var readFiles = (function () {
    var methods = {};
    //var Value="";
    methods.Xml = function (node, xmlString) {
        var parser;
        var xmlDoc;
        var Value = "";
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlString, "text/xml");
        } else {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlString);

        };
        Value = xmlDoc.getElementsByTagName(node)[0].firstChild;
        if (Value == null) {
            Value = "";
        }
        else {
            Value = xmlDoc.getElementsByTagName(node)[0].childNodes[0].nodeValue;
        };
        return Value;
    };
    return methods;
})();
var jqueryXml = (function () {
    var methods = {};
    methods.Find = function (find_node, data) {
        var jXml = $(data);
        return jXml.find(find_node).text();
    };
    return methods;
})();

function fnTableCheckAll(tbl) {
    var searchIDs = [];

    if (checkBox.checkStat(tbl + "_ck_selectall") == true) {
        $("#" + tbl + " tbody input:checkbox:not(:checked)").each(function () {
            //$(this).prop('checked', true);

        });

    }
    else {
        $("#" + tbl + " tbody input:checkbox:checked").each(function () {
            $(this).prop('checked', false);
        });
    };

    //alert(searchIDs);
};
var table = (function () {
    var methods = {};
    methods.SelectAllCheckBox = function (table_id, checkbox_id) {
        var tmpTable = $('#' + table_id).DataTable();
        var allPages = tmpTable.cells().nodes();
        if (checkBox.checkStat(checkbox_id) == true) {
            $(allPages).find('input[type="checkbox"]').prop('checked', true);
        } else {
            $(allPages).find('input[type="checkbox"]').prop('checked', false);
        };
        return methods;
    };
    methods.GetValueSelected = function (table_id) {
        var values = [];
        var tmpTable = $('#' + table_id).DataTable();
        var rowCollection = tmpTable.$("input:checkbox:checked", { "page": "all" });
        rowCollection.each(function (index, elem) {
            values.push($(elem).val());
        });
        return values;
    };
    return methods;
})();
var url = (function () {
    var methods = {};
    methods.Parameter = function (parameter, inbound_url) {
        var tmpUrl = inbound_url.slice(inbound_url.indexOf("?") + 1).split("&");
        for (var i = 0; i < tmpUrl.length; i++) {
            var urlparam = tmpUrl[i].split('=');
            if (urlparam[0] == parameter) {
                return urlparam[1];
            }
        }
    };
    return methods;
})();
var popup = (function () {
    var methods = {};
    methods.Detail = function (text) {
        $("#modalDetail").modal("show");
        $("#div_detail_text").html(text);
    };
    return methods;
})();
var subString = (function () {
    var methods = {};
    methods.FromDateDateRange = function (date) {
        var value = "";
        value = date.substring(0, 11);
        return value;
    };
    methods.ToDateDateRange = function (date) {
        var value = "";
        value = date.substring(14, 25);
		return value;
    };
	methods.FromDateTimeRange = function (date) {
        var value = "";
        value = date.substring(0, 17);
        return value;
    };
    methods.ToDateTimeRange = function (date) {
        var value = "";
        value = date.substring(20, 37);
        return value;
    };
    return methods;
})();
var option = (function () {
    var methods = {};
    // this function is for DualListbox
    methods.MoveUpDualListOp = function (parent_id, select_id) {
        const current_index = $("#" + select_id + " option:selected").index();
        const option_text = $("#" + select_id + " option:selected").text();
        const option_value = $("#" + select_id + " option:selected").val();

        if (current_index == 0) {
            return false;
        };
        if (option_value == "") {
            goAlert.alertError("Error", "No option selected");
            return false;
        };
        if (current_index == -1) {
            goAlert.alertError("Error", "Option selected not found or multiple selected")
            return false;
        };
        const next_index = current_index - 1;
        const next_value = $("#" + select_id + " option").eq(next_index).val();
        const next_text = $("#" + select_id + " option").eq(next_index).text();
        // set next index value and text
        $("#" + select_id + " option:eq(" + next_index + ")").attr("value", option_value);
        $("#" + select_id + " option:eq(" + next_index + ")").text(option_text);
        // prop select
        $("#" + select_id + " option:eq(" + current_index + ")").prop('selected', false);
        $("#" + select_id + " option:eq(" + next_index + ")").prop('selected', true);
        // set current index value and text
        $("#" + select_id + " option:eq(" + current_index + ")").attr("value", next_value);
        $("#" + select_id + " option:eq(" + current_index + ")").text(next_text);
        // set next index value and text to parent
        $("#" + parent_id + " option:eq(" + next_index + ")").attr("value", option_value);
        $("#" + parent_id + " option:eq(" + next_index + ")").text(option_text);
        // set current index value and text to parent
        $("#" + parent_id + " option:eq(" + current_index + ")").attr("value", next_value);
        $("#" + parent_id + " option:eq(" + current_index + ")").text(next_text);
    };
    methods.MoveDownDualListOp = function (parent_id, select_id) {
        const length = $('#' + select_id + ' > option').length;
        const current_index = $("#" + select_id + " option:selected").index();
        const option_text = $("#" + select_id + " option:selected").text();
        const option_value = $("#" + select_id + " option:selected").val();
        if (current_index == -1) {
            goAlert.alertError("Error", "Option selected not found or multiple selected")
            return false;
        };
        if (current_index == (length - 1)) {
            return false;
        }
        if (option_value == "") {
            goAlert.alertError("Error", "No option selected");
            return false;
        };

        const next_index = current_index + 1;
        const next_value = $("#" + select_id + " option").eq(next_index).val();
        const next_text = $("#" + select_id + " option").eq(next_index).text();
        // set next index value and text
        $("#" + select_id + " option:eq(" + next_index + ")").attr("value", option_value);
        $("#" + select_id + " option:eq(" + next_index + ")").text(option_text);
        // prop select
        $("#" + select_id + " option:eq(" + current_index + ")").prop('selected', false);
        $("#" + select_id + " option:eq(" + next_index + ")").prop('selected', true);
        // set current index value and text
        $("#" + select_id + " option:eq(" + current_index + ")").attr("value", next_value);
        $("#" + select_id + " option:eq(" + current_index + ")").text(next_text);
        // set next index value and text to parent
        $("#" + parent_id + " option:eq(" + next_index + ")").attr("value", option_value);
        $("#" + parent_id + " option:eq(" + next_index + ")").text(option_text);
        // set current index value and text to parent
        $("#" + parent_id + " option:eq(" + current_index + ")").attr("value", next_value);
        $("#" + parent_id + " option:eq(" + current_index + ")").text(next_text);
    };
    return methods;
})();
var localStorages = {
    AddNew: function (name, value) {
        window.localStorage.setItem("ito_" + name, value);
    },
    GetValue: function (name) {
        return localStorage.getItem("ito_" + name);
    },
    ClearAll: function () {

        // window.localStorage.clear();
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf("ito_") === 0) {
                if (key !== "ito_userid" && key !== "ito_username" && key !== "ito_currenct_system" && key !== "ito_token") {
                    window.localStorage.removeItem(key);
                }

            }
        }
    }
};
var password = (function () {
    var methods = {};
    methods.Validate = function (pwd) {
        var boolStat;
        var score = 0;
        if (pwd.length < 8) {
            boolStat = false;
            return boolStat;
        };
        var special_char = "!$%^&*_@#~?";
        for (var i = 0; i < pwd.length; i++) {
            if (special_char.indexOf(pwd.charAt(i)) > -1) {
                score += 20;
            }
        }
        if (/[a-z]/.test(pwd)) {
            score += 20;
        }
        if (/[A-Z]/.test(pwd)) {
            score += 20;
        }
        if (/[\d]/.test(pwd)) {
            score += 20;
        }
        if (pwd.length >= 8) {
            score += 20;
        }
        if (score < 100) {
            boolStat = false;
        }
        else {
            boolStat = true;
        };
        return boolStat;
    };
    return methods;
})();
var editor = {
    summernoted: function (textarea_id) {
        $("#" + textarea_id).summernote({
            height: 200,
            lineHeights: ['0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'fontsize', 'strikethrough', 'superscript', 'subscript', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph', 'height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video','hr']],
                ['undo', ['undo']],
                ['redo', ['redo']],
                ['view', ['codeview', 'help']],
            ]
        });
    },
    summernoteModal: function (textarea_id) {
        $("#" + textarea_id).summernote({
            height: 200,
            lineHeights: ['0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'fontsize', 'strikethrough', 'superscript', 'subscript', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph', 'height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['undo', ['undo']],
                ['redo', ['redo']],
                ['view', ['codeview', 'help']],
            ]
        });
    },
    getCode: function (textarea_id) {
        return $("#" + textarea_id).summernote("code");
    },
    getText: function (textarea_id) {
        return $($("#" + textarea_id).summernote("code")).text();
    },
    addCode: function (textarea_id, html_code) {
        $("#" + textarea_id).summernote('code', html_code);
    }
};

var CallAPI = (function () {
    var methods = {};
    methods.Go = function (url, data, callBackFunction, processIndecatorName, header, required_token, processIndecatorType, spinner_id, request_method) {
        var newRequestMethod = (request_method === undefined) ? "POST" : request_method;
        var newDataType = "json";
        var newContentType = "application/json; charset=utf-8";
        var default_header;
        if (required_token === undefined) {
            var token = localStorage.getItem("ito_token");
            default_header = {
                Authorization: "Bearer " + token,
                "Access-Control-Allow-Origin": "*"
            };
        }
        else {
            default_header = {
                "Access-Control-Allow-Origin": "*"
            };
        }
        
        var newHeader = (header === undefined) ? default_header : header;

        $.ajax({
            type: newRequestMethod,
            url: url,
            headers: newHeader,
            data: JSON.stringify(data),
            dataType: newDataType,
            timeout: 3600000,
            contentType: newContentType,
            beforeSend: function () {

                if (processIndecatorName !== undefined) {
                    if (processIndecatorName !== "No_Indecator") {
                        processIndicator.Start(processIndecatorName);
                    };
                }
                else {
                    if (processIndecatorType == "spin") {
                        if (typeof spinner_id != "object") {
                            processIndicator.SpinnerStart(spinner_id);
                        }
                        else {
                            for (var I = 0; I < spinner_id.length; I++) {
                                processIndicator.SpinnerStart(spinner_id[I]);
                            };
                        };

                    }
                };

            },
            success: function (respond_data) {
                if (processIndecatorName !== undefined) {
                    if (processIndecatorName !== "No_Indecator") {
                        processIndicator.Stop();
                    };
                }
                callBackFunction(respond_data);
            },
            error: function () {
                if (processIndecatorName !== undefined) {
                    if (processIndecatorName !== "No_Indecator") {
                        processIndicator.Stop();
                    };
                }
            }
        });
        return methods;
    };
    return methods;
})();
