/// <reference path="ito_variable.js" />
/// <reference path="ito_core.js" />
/// <reference path="ito_system.js" />
/// <reference path="ito_de_handle.js" />


//in scope variables
var inBatchTypes;
var inBatchSource;
var inTransactionName;
var inMainAccount;
var inTrnReference;
var inMainAccountCccy;
var inMainAccountBrcode;
var inPayrollOffsetAccount;
var inPayrollOffsetFee;
var inGroupID;
var inBackDateStat;
var inNexWorkDayStat;
var inRounding;
///////////////////////////
var roleValBTN = [];
function fnDepostingUserRole() {
    var BatchTypes = $("#de_posting_batch_type").val();
    if (BatchTypes !== "NULL") {
        var xmlData = {
            user_id: STAFF_ID,
            batch_type: BatchTypes
        };

        myRequest.Execute(v_dePostingBatchTypeRole, xmlData, bpFnUserRole);
    };
}
function fnDepostingNewInitailize() {

    var batchSource = $("#de_posting_source").val();
    if (batchSource.includes("_TEMPLATE") == true || batchSource == "CSV") {
        element.setEnable("btn_de_posting_load_attachment");
    }
    else {
        element.setEnable("btn_de_posting_pull_reference");
    };
    element.setEnable(["de_posting_batch_type",
        "de_posting_source",
        "de_posting_transaction_name",
        "de_posting_batch_master",
        "de_posting_batch_detail",
        "de_posting_main_account",
        "de_posting_template",
        "de_posting_doc_support",
        "de_posting_transaction_ref",
        "de_posting_chk_for_nextworkingday",
        "de_posting_chk_back_date",
        "de_posting_chk_approve_auth",
        "de_posting_chk_schedule",
        "de_posting_chk_single_req",
        "de_posting_chk_group_req",
        "de_posting_schedule_datetime",
        "de_posting_group_request_id",
        "de_posting_chk_last_transaction",
        "de_posting_notice",
        "de_posting_chk_khr_inrounding",
        "de_posting_chk_cypo_upload_allow"
    ]);
    formReset.ToEmpty("de_posting_transaction_name");
    formReset.ToEmpty("de_posting_batch_master");
    formReset.ToEmpty("de_posting_batch_detail");
    formReset.ToEmpty("de_posting_template");
    formReset.ToEmpty("de_posting_doc_support");
    formReset.ToEmpty("de_posting_schedule_datetime");
    formReset.ToDefaultValue("de_posting_main_account", "NULL");
    formReset.ToDefaultValue("de_posting_transaction_ref", "NULL");
    formReset.ToDefaultValue("de_posting_group_request_id", "NULL");
    checkBox.Uncheck(["de_posting_chk_for_nextworkingday",
        "de_posting_chk_back_date",
        "de_posting_chk_approve_auth",
        "de_posting_chk_schedule",
        "de_posting_chk_group_req",
        "de_posting_chk_last_transaction",
        "de_posting_chk_khr_inrounding",
        "de_posting_chk_cypo_upload_allow"
    ])
    checkBox.Check("de_posting_chk_single_req");
    fnScheduleCheck_de_posting();
    fnRequestTypeCheck_de_posting("de_posting_chk_single_req")

    // reset process stage
    formReset.ToEmpty("de_posting_attachment_upload_status");
    formReset.ToEmpty("de_posting_attachment_upload_check");
    formReset.ToEmpty("de_posting_pull_status");
    formReset.ToEmpty("de_posting_pull_check");
    formReset.ToEmpty("de_posting_main_acc_name");
    formReset.ToEmpty("de_posting_main_acc_name_check");
    formReset.ToEmpty("de_posting_main_acc_no");
    formReset.ToEmpty("de_posting_main_acc_no_check");
    formReset.ToEmpty("de_posting_main_acc_brcode");
    formReset.ToEmpty("de_posting_main_acc_brcode_check");
    formReset.ToEmpty("de_posting_main_acc_ccy");
    formReset.ToEmpty("de_posting_main_acc_ccy_check");
    formReset.ToEmpty("de_posting_main_acc_curr_bal");
    formReset.ToEmpty("de_posting_main_acc_curr_bal_check");
    formReset.ToEmpty("de_posting_main_acc_status");
    formReset.ToEmpty("de_posting_main_acc_status_check");
    formReset.ToEmpty("de_posting_trn_ccy");
    formReset.ToEmpty("de_posting_trn_ccy_check");
    formReset.ToEmpty("de_posting_total_debit");
    formReset.ToEmpty("de_posting_total_debit_check");
    formReset.ToEmpty("de_posting_total_credit");
    formReset.ToEmpty("de_posting_total_credit_check");
    formReset.ToEmpty("de_posting_batch_no");
    formReset.ToEmpty("de_posting_batch_no_check");
    formReset.ToEmpty("de_posting_total_trn");
    formReset.ToEmpty("de_posting_pre_check_status");
    formReset.ToEmpty("de_posting_pre_check_check");
    formReset.ToEmpty("de_posting_group_id");
    formReset.ToEmpty("de_posting_group_id_check");
    formReset.ToEmpty("de_posting_upload_stat");
    formReset.ToEmpty("de_posting_upload_check");
    formReset.ToEmpty("de_posting_tot_uploaded");
    formReset.ToEmpty("de_posting_authorize_stat");
    formReset.ToEmpty("de_posting_authorize_check");
    formReset.ToEmpty("de_posting_tot_authorize");
    element.setDisable(["btn_de_posting_pre_check",
        "btn_de_posting_req_upload",
        "btn_de_posting_seft_upload",
        "btn_de_posting_req_authorize",
        "btn_de_posting_seft_authorize"
    ]);
    inNexWorkDayStat = undefined;
    inBackDateStat = undefined;
    inBatchTypes = undefined;
    inBatchSource = undefined;
    inTransactionName = undefined;
    inMainAccount = undefined;
    inTrnReference = undefined;
    inMainAccountCccy = undefined;
    inMainAccountBrcode = undefined;
    inPayrollOffsetAccount = undefined;
    inPayrollOffsetFee = undefined;
    inGroupID = undefined;
    bpFnCheckBoxHandler();
    fnCurrentBatchNo();
};
function fnCurrentBatchNo() {
    var vBatchType = $("#de_posting_batch_type").val();
    if (vBatchType != "NULL") {
        var value_date = $("#de_posting_batch_curr_date").val();
        var dataObject = {
            UserID: STAFF_ID,
            BatchType: vBatchType,
            ValueDate: value_date
        };
        var xmlData = stringCreate.toXML("CurrentBatchNo", dataObject).End();
        myRequest.Execute(v_dePostingCurrentBatchNo, { xmlData: xmlData }, bpFnGetCurrentBatchNo, undefined, "spin", "de_posting_curr_batch_no");
    }
};
function fnGetBatchSource_de_posting() {

    var vBatchType = $("#de_posting_batch_type").val();
    if (vBatchType !== "") {
        var objectInputFileHide = ["de_div_batch_master", "de_div_batch_detail", "de_div_main_account", "de_div_transaction_name", "de_div_template", "de_div_transaction_referenct"];
        goShowHide.hideOnDiv(objectInputFileHide);
        myRequest.Execute(v_dePostingBatchSourceUrl, { BatchType: vBatchType }, bpFnGetBatchSources);
        if (vBatchType == "001") {
            goShowHide.showOnDivAsBlock("de_div_main_account");
            myRequest.Execute(v_dePostingMaintAccountUrl, undefined, bpFnGetMainAccount);
        };
    };
};
function fnProcessStageView() {
    var batchType = $("#de_posting_batch_type").val();
    var source = "";
    var source = $("#de_posting_source").val();
    source = (source == undefined) ? "" : source;
    if (source != "CSV" && source.includes("_TEMPLATE") == false) {
        goShowHide.showTr("de_posting_tr_pull_data");
        goShowHide.hideTr("de_posting_tr_attahcment_upload");
    }
    else {
        goShowHide.hideTr("de_posting_tr_pull_data");
        goShowHide.showTr("de_posting_tr_attahcment_upload");
    };
    if (batchType == "001") {
        goShowHide.showTr(["de_posting_tr_main_account_name",
            "de_posting_tr_main_account_no",
            "de_posting_tr_main_account_brcode",
            "de_posting_tr_main_account_ccy",
            "de_posting_tr_main_account_curr_bal",
            "de_posting_tr_main_account_status"
        ]);

    } else {
        goShowHide.hideTr(["de_posting_tr_main_account_name",
            "de_posting_tr_main_account_no",
            "de_posting_tr_main_account_brcode",
            "de_posting_tr_main_account_ccy",
            "de_posting_tr_main_account_curr_bal",
            "de_posting_tr_main_account_status"
        ]);

        formReset.ToEmpty("de_posting_main_acc_name");
        formReset.ToEmpty("de_posting_main_acc_name_check");
        formReset.ToEmpty("de_posting_main_acc_no");
        formReset.ToEmpty("de_posting_main_acc_no_check");
        formReset.ToEmpty("de_posting_main_acc_brcode");
        formReset.ToEmpty("de_posting_main_acc_brcode_check");
        formReset.ToEmpty("de_posting_main_acc_ccy");
        formReset.ToEmpty("de_posting_main_acc_ccy_check");
        formReset.ToEmpty("de_posting_main_acc_curr_bal");
        formReset.ToEmpty("de_posting_main_acc_curr_bal_check");
        formReset.ToEmpty("de_posting_main_acc_status");
        formReset.ToEmpty("de_posting_main_acc_status_check");
    };
};
function fnMainAccountChange(account) {
    if (account != "") {
        var elementsSpin = ["de_posting_main_acc_name",
            "de_posting_main_acc_no",
            "de_posting_main_acc_brcode",
            "de_posting_main_acc_ccy",
            "de_posting_main_acc_curr_bal",
            "de_posting_main_acc_status"
        ];
        myRequest.Execute(v_dePostingMaintAccountDetailUrl, { AccountNo: account }, bpFnGetMainAccountDetail, undefined, "spin", elementsSpin);
    };

};
function fnShowInputFileTypes_de_posting(batchSource) {
    var outSource = {};
    var objectInputFileShow = [];
    var objectInputFileHide = [];
    if (batchSource == "CSV") {
        objectInputFileShow = ["de_div_transaction_name", "de_div_batch_master", "de_div_batch_detail"];
        objectInputFileHide = ["de_div_template", "de_div_transaction_referenct"];

    } else if (batchSource.includes("_TEMPLATE") == true) {
        objectInputFileShow = ["de_div_transaction_name", "de_div_template"];
        objectInputFileHide = ["de_div_batch_master", "de_div_batch_detail", "de_div_transaction_referenct"];
    } else {
        var objectInputFileShow = ["de_div_transaction_referenct"];
        var objectInputFileHide = ["de_div_batch_master", "de_div_batch_detail", "de_div_transaction_name", "de_div_template"];
        var data = {
            UserID: STAFF_ID,
            BatchSource: batchSource
        };
        var xmlData = stringCreate.toXML("TrnRef", data).End();
        myRequest.Execute(v_dePostingTrnReferenceUrl, { xmlData: xmlData }, bpFnGetTrnRef);
    };
    goShowHide.hideOnDiv(objectInputFileHide).showOnDivAsBlock(objectInputFileShow);
};
function fnShowCheckbox_de_posting() {
    batchTypes = $("#de_posting_batch_type").val();
    var objechcheckBoxUncheck = ["de_posting_chk_for_nextworkingday", "de_posting_chk_back_date", "de_posting_chk_approve_auth", "de_posting_chk_schedule", "de_posting_chk_group_req", "de_posting_chk_last_transaction", "de_posting_chk_khr_inrounding", "de_posting_chk_cypo_upload_allow"];
    checkBox.Uncheck(objechcheckBoxUncheck);
    objectCheckBox = ["de_div_chk_back_date", "de_div_chk_for_nextworkingday", "de_div_chk_approve_auth", "de_div_chk_schedule", "de_div_chk_single_req", "de_div_chk_group_req", "de_div_chk_khr_inrounding", "de_div_chk_cypo_upload_allow"];
    goShowHide.hideOnDiv(objectCheckBox);
    fnRequestTypeCheck_de_posting('de_posting_chk_single_req');
    myRequest.Execute(v_dePostingGetCheckBoxAllow, { batch_type: batchTypes }, bpFnGetChkControlCallBack);
};
var activeCheckBox;
function fnBackDateNextWKChange(element_id) {

    if (element_id == "de_posting_chk_for_nextworkingday") {

        if (activeCheckBox == element_id) {

            checkBox.Uncheck(element_id);
            activeCheckBox = "-1";
        }
        else {
            checkBox.Check(element_id);
            activeCheckBox = element_id;
            checkBox.Uncheck("de_posting_chk_back_date");
        };
    } else {
        if (activeCheckBox == element_id) {
            checkBox.Uncheck(element_id);
            activeCheckBox = "-1";
        }
        else {
            checkBox.Check(element_id);
            activeCheckBox = element_id;
            checkBox.Uncheck("de_posting_chk_for_nextworkingday");
        };
    };
};
function fnScheduleCheck_de_posting() {
    if (checkBox.checkStat("de_posting_chk_schedule") == true) {
        goShowHide.showOnDivAsBlock("de_dive_schedule_datetime");
    }
    else {
        goShowHide.hideOnDiv("de_dive_schedule_datetime");
    };
};
function fnRequestTypeCheck_de_posting(checkBoxName) {
    if (checkBoxName == "de_posting_chk_single_req") {
        checkBox.Check("de_posting_chk_single_req");
        checkBox.Uncheck("de_posting_chk_group_req");
        goShowHide.hideOnDiv("de_div_request_group");
        goShowHide.hideOnDiv("de_div_last_transaction");
    };
    if (checkBoxName == "de_posting_chk_group_req") {
        checkBox.Check("de_posting_chk_group_req");
        checkBox.Uncheck("de_posting_chk_single_req");
        goShowHide.showOnDivAsBlock("de_div_request_group");
        goShowHide.showOnDivAsBlock("de_div_last_transaction");
        myRequest.Execute(v_dePostingGroupName, { userID: STAFF_ID }, bpFnGetGroupName);
    };

};
function fnAlertHelp_de_posting(helpPoint) {
    if (helpPoint == "back_date_chk") {
        goAlert.alertHelp('When you tick on Back date checkbox, you can request upload or upload or authorize transaction that have value date smaller than Core Banking System current date.')
    } else if (helpPoint == "nextworking_day_chk") {
        goAlert.alertHelp('When you tick on For nextworking day checkbox, you can request for upload for nextworking day.')
    } else if (helpPoint == "approve_authorize") {
        goAlert.alertHelp('When you tick on Approve authorize checkbox, Your transaction will be available for authorization automatic and you will never receive notification after transaction upload, but you will receive notifiaction after transaction authorize.')
    } else if (helpPoint == "schedule") {
        goAlert.alertHelp('When you tick on Schedule checkbox, you will choose Schedule datetime. Uploader or Authorizer can process your transaction behind your schedule time.')
    } else if (helpPoint == "single_request") {
        goAlert.alertHelp('When you tick on Single request checkbox, Transaction will send request notification to uploader or authorizer after you click on Request Button')
    } else if (helpPoint == "group_request") {
        goAlert.alertHelp('When you tick on Group request checkbox, you will choose Group name (click on plus button to create Group name if you have no one). All request transactions will be kept in System and they will be sent out to uploader or authorizer after you tick on Last transaction checkbox and click on Request button.')
    }
    else if (helpPoint == "last_transaction") {
        goAlert.alertHelp('When you tick on Last transaction checkbox, All request transactions as Group request will be sent out to uploader or authorizer after click on Request button.')
    } else if (helpPoint == "khr_inrounding") {
        goAlert.alertHelp('When you tick on Inrounding checkbox, System will not round for all transactions that you requesting!')
    }
    else if (helpPoint == "cypo_upload_allow") {
        goAlert.alertHelp('When you tick on CYPO Allow checkbox, System will not check CYPO transactions of all batch that you requesting!')
    };
};
function fnValidateButtons() {
    var BatchTypes = $("#de_posting_batch_type").val();
    if (BatchTypes === undefined) {
        BatchTypes = $("#de_posting_batch_type").val();
    };
    goShowHide.hideOnDiv(["btn_de_posting_load_attachment",
        "btn_de_posting_clear_pulling",
        "btn_de_posting_pull_reference",
        "btn_de_posting_pre_check",
        "btn_de_posting_req_upload",
        "btn_de_posting_seft_upload",
        "btn_de_posting_req_authorize",
        "btn_de_posting_seft_authorize"]);

    element.setDisable(["btn_de_posting_load_attachment",
        "btn_de_posting_pull_reference",
        "btn_de_posting_pre_check",
        "btn_de_posting_req_upload",
        "btn_de_posting_seft_upload",
        "btn_de_posting_req_authorize",
        "btn_de_posting_seft_authorize"]);

    goShowHide.hideTr(["de_posting_tr_fcub_upload_user", "de_posting_tr_fcub_authorize_user", "de_posting_tr_upload_stat", "de_posting_tr_authorize_stat", "de_posting_tr_upload_tot", "de_posting_tr_authorize_tot"]);
    var checkerStat = searchData.SearchNode("001", roleValBTN);
    var requesterStat = searchData.SearchNode("002", roleValBTN);
    var uploaderStat = searchData.SearchNode("003", roleValBTN);
    var authorizerStat = searchData.SearchNode("004", roleValBTN);
    var outSourceStat = "N";
    var batchSource = $("#de_posting_source").val();
    if (batchSource != undefined) {
        if (batchSource != "CSV" && batchSource.includes("_TEMPLATE") == false) {
            outSourceStat = "Y";
        };
        // check only
        if (checkerStat == "Y" && requesterStat != "Y" && uploaderStat != "Y" && authorizerStat != "Y") {
            if (outSourceStat == "Y") {

                goShowHide.showOnDivAsInline(["btn_de_posting_clear_pulling", "btn_de_posting_pull_reference",
                    "btn_de_posting_pre_check"]);
                element.setEnable(["btn_de_posting_pull_reference", "btn_de_posting_clear_pulling"]);
            }
            else if (outSourceStat != "NULL" && outSourceStat != "Y") {

                goShowHide.showOnDivAsInline(["btn_de_posting_load_attachment",
                    "btn_de_posting_pre_check"]);
                element.setEnable("btn_de_posting_load_attachment");
            };
        };
        // request upload
        if (requesterStat == "Y" && checkerStat != "Y" && uploaderStat != "Y" && authorizerStat != "Y") {
            // add new button after check
            $("#btn_de_posting_pre_check").val("btn_de_posting_req_upload");
            if (outSourceStat == "Y") {
                goShowHide.showOnDivAsInline(["btn_de_posting_clear_pulling", "btn_de_posting_pull_reference",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_req_upload"]);
                element.setEnable("btn_de_posting_pull_reference");
            }
            else if (outSourceStat != "NULL" && outSourceStat != "Y") {
                goShowHide.showOnDivAsInline(["btn_de_posting_load_attachment",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_req_upload"]);
                element.setEnable("btn_de_posting_load_attachment");
            };
        };
        // upload and request authorize
        if (requesterStat == "Y" && uploaderStat == "Y" && checkerStat != "Y" && authorizerStat != "Y") {
            goShowHide.showTr(["de_posting_tr_fcub_upload_user", "de_posting_tr_upload_stat", "de_posting_tr_upload_tot"]);
            element.inputValue("de_posting_fcub_upload_user", v_fcub_upload_user);
            $("#btn_de_posting_pre_check").val("btn_de_posting_seft_upload");
            $("#btn_de_posting_seft_upload").val("btn_de_posting_req_authorize");
            if (outSourceStat == "Y") {
                goShowHide.showOnDivAsInline(["btn_de_posting_clear_pulling", "btn_de_posting_pull_reference",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_seft_upload",
                    "btn_de_posting_req_authorize"]);
                element.setEnable("btn_de_posting_pull_reference");
            }
            else if (outSourceStat != "NULL" && outSourceStat != "Y") {
                goShowHide.showOnDivAsInline(["btn_de_posting_load_attachment",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_seft_upload",
                    "btn_de_posting_req_authorize"]);
                element.setEnable("btn_de_posting_load_attachment");
            };
        };
        // upload and request authorize
        if (requesterStat == "Y" && authorizerStat == "Y" && checkerStat != "Y" && uploaderStat != "Y") {
            goShowHide.showTr(["de_posting_tr_fcub_upload_user", "de_posting_tr_upload_stat", "de_posting_tr_upload_tot"]);
            element.inputValue("de_posting_fcub_upload_user", v_fcub_upload_user);
            $("#btn_de_posting_pre_check").val("btn_de_posting_seft_upload");
            $("#btn_de_posting_seft_upload").val("btn_de_posting_req_authorize");

            if (outSourceStat == "Y") {

                goShowHide.showOnDivAsInline(["btn_de_posting_clear_pulling", "btn_de_posting_pull_reference",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_seft_upload",
                    "btn_de_posting_req_authorize"]);
                element.setEnable("btn_de_posting_pull_reference");
            }
            else if (outSourceStat != "NULL" && outSourceStat != "Y") {
                goShowHide.showOnDivAsInline(["btn_de_posting_load_attachment",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_seft_upload",
                    "btn_de_posting_req_authorize"]);
                element.setEnable("btn_de_posting_load_attachment");
            };
        };
        // upload and authorize
        if (uploaderStat == "Y" && authorizerStat == "Y" && checkerStat != "Y" && requesterStat == "Y") {
            goShowHide.showTr(["de_posting_tr_fcub_upload_user", "de_posting_tr_fcub_authorize_user", "de_posting_tr_upload_stat", "de_posting_tr_upload_tot", "de_posting_tr_authorize_stat", "de_posting_tr_authorize_tot"]);
            element.inputValue("de_posting_fcub_upload_user", v_fcub_upload_user);
            element.inputValue("de_posting_fcub_authorize_user", v_fcub_authorize_user);
            $("#btn_de_posting_pre_check").val("btn_de_posting_seft_upload");
            $("#btn_de_posting_seft_upload").val("btn_de_posting_seft_authorize");
            if (outSourceStat == "Y") {

                goShowHide.showOnDivAsInline(["btn_de_posting_clear_pulling", "btn_de_posting_pull_reference",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_seft_upload",
                    "btn_de_posting_seft_authorize"]);
                element.setEnable("btn_de_posting_pull_reference");
            }
            else if (outSourceStat != "NULL" && outSourceStat != "Y") {
                goShowHide.showOnDivAsInline(["btn_de_posting_load_attachment",
                    "btn_de_posting_pre_check",
                    "btn_de_posting_seft_upload",
                    "btn_de_posting_seft_authorize"]);
                element.setEnable("btn_de_posting_load_attachment");
            };
        };
    };
};
function fnUploadAttachment() {
    inBatchTypes = $("#de_posting_batch_type").val();
    inBatchSource = $("#de_posting_source").val();
    inTransactionName = $("#de_posting_transaction_name").val();
    element.inputValue("de_posting_attachment_upload_status", "");
    var formData = new FormData();
    formData.append("userID", STAFF_ID);
    if (inBatchTypes == "") {
        goAlert.alertErroTo("de_posting_batch_type", "Error", "Please choose Batch type before load attachments", "change");
        return false;
    };
    if (inBatchSource == "" || inBatchSource === undefined) {
        goAlert.alertErroTo("de_posting_source", "Error", "Please choose Source before load attachments", "change");
        return false;
    };
    if (inBatchTypes == "001") {
        inMainAccount = $("#de_posting_main_account").val();
        if (inMainAccount == "") {
            goAlert.alertErroTo("de_posting_main_account", "Error", "Please choose Main account before load attachments", "change");
            return false;
        };
    };
    if (inTransactionName == "") {
        goAlert.alertErroTo("de_posting_transaction_name", "Error", "Please input transaction name before load attachments", "click");
        return false;
    };
    if (inBatchSource.includes("_TEMPLATE") == true) {

        if ($("#de_posting_template").val() == "") {
            goAlert.alertErroTo("de_posting_template", "Error", "Please choose attachment template before load attachments", "click");
            return false;
        }
        else {
            var template = $("#de_posting_template")[0].files;
            v_dePostingTemplateName = template[0].name;
            formData.append(template[0].name, template[0]);
        };
    };
    if (inBatchSource == "CSV") {

        if ($("#de_posting_batch_master").val() == "") {
            goAlert.alertErroTo("de_posting_batch_master", "Error", "Please choose Batch master before load attachments", "click");
            return false;
        }
        else if ($("#de_posting_batch_detail").val() == "") {
            goAlert.alertErroTo("de_posting_batch_detail", "Error", "Please choose Batch detail before load attachments", "click");
            return false;
        }
        else {
            var batchMaster = $("#de_posting_batch_master")[0].files;
            var batchDetail = $("#de_posting_batch_detail")[0].files;
            v_dePostingCSVMasterName = batchMaster[0].name;
            v_dePostingCSVDetailName = batchDetail[0].name;
            formData.append(batchMaster[0].name, batchMaster[0]);
            formData.append(batchDetail[0].name, batchDetail[0]);
        };
    };
    formData.append("batchSource", inBatchSource);
    //append documents support
    var doc_support = $("#de_posting_doc_support").get(0);
    var doc_files = doc_support.files;
    var doc_length = doc_files.length;
    if (doc_length > 0) {
        for (var i = 0; i < doc_length; i++) {
            formData.append(doc_files[i].name, doc_files[i]);
        };
    };
    myRequest.FileUpload(fileUpload, formData, bpFnUploadTemplate);
};
// pull reference
function fnDePostingPullRef() {
    inBatchTypes = $("#de_posting_batch_type").val();
    inBatchSource = $("#de_posting_source").val();
    inTrnReference = $("#de_posting_transaction_ref").val();
    if (inBatchTypes == "") {
        goAlert.alertErroTo("de_posting_batch_type", "Error", "Please choose Batch type before pulling transaction", "change");
        return false;
    };
    if (inBatchSource == "" || inBatchSource === undefined) {
        goAlert.alertErroTo("de_posting_source", "Error", "Please choose Source before pulling transaction", "change");
        return false;
    };
    if (inTrnReference == "" || inTrnReference === undefined) {
        goAlert.alertErroTo("de_posting_transaction_ref", "Error", "Please choose Transaction reference before pulling transaction", "change");
        return false;
    };
    var obj = {
        userID: STAFF_ID,
        source: inBatchSource,
        sourceRef: inTrnReference
    };
    var xmlData = stringCreate.toXML("PullReference", obj).End();

    myRequest.Execute(v_dePostingPullRef, { xmlData: xmlData }, bpFnPullRef, "Pulling...");
    var doc_support = $("#de_posting_doc_support").get(0);
    var doc_files = doc_support.files;
    var doc_length = doc_files.length;
    var formData = new FormData();
    formData.append("userID", STAFF_ID);
    formData.append("batchSource", inBatchSource);
    if (doc_length > 0) {

        for (var i = 0; i < doc_length; i++) {
            formData.append(doc_files[i].name, doc_files[i]);
        };
    };
    // at leat we need to clear file from system
    myRequest.FileUpload(fileUpload, formData, bpFnUploadTemplate);
};
// function pre-check
function fnPreCheck() {
    element.setDisable(["btn_de_posting_pre_check",
        "btn_de_posting_pull_reference",
        "btn_de_posting_load_attachment",
        "de_posting_batch_type",
        "de_posting_source",
        "de_posting_transaction_name",
        "de_posting_batch_master",
        "de_posting_batch_detail",
        "de_posting_main_account",
        "de_posting_template",
        "de_posting_doc_support",
        "de_posting_transaction_ref",
        "de_posting_chk_for_nextworkingday",
        "de_posting_chk_back_date",
        "de_posting_chk_khr_inrounding",
        "de_posting_chk_cypo_upload_allow"
    ]);
    var backDate = (checkBox.checkStat("de_posting_chk_back_date") == true) ? "Y" : "N";
    var nextWorkingDay = (checkBox.checkStat("de_posting_chk_for_nextworkingday") == true) ? "Y" : "N";
    inBackDateStat = (backDate == "Y") ? "Y" : "N";
    inNexWorkDayStat = (nextWorkingDay == "Y") ? "Y" : "N";
    v_dePostingTemplateName = (v_dePostingTemplateName === undefined) ? "" : v_dePostingTemplateName;
    v_dePostingCSVMasterName = (v_dePostingCSVMasterName === undefined) ? "" : v_dePostingCSVMasterName;
    v_dePostingCSVDetailName = (v_dePostingCSVDetailName === undefined) ? "" : v_dePostingCSVDetailName;
    inMainAccount = (inMainAccount === undefined) ? "" : inMainAccount;
    inMainAccountCccy = (inMainAccountCccy === undefined) ? "" : inMainAccountCccy;
    inMainAccountBrcode = (inMainAccountBrcode === undefined) ? "" : inMainAccountBrcode;
    inPayrollOffsetAccount = (inPayrollOffsetAccount === undefined) ? "" : inPayrollOffsetAccount;
    inPayrollOffsetFee = (inPayrollOffsetFee === undefined) ? "" : inPayrollOffsetFee
    inTrnReference = (inTrnReference === undefined) ? "" : inTrnReference;
    inTransactionName = (inTransactionName === undefined) ? "" : inTransactionName;
    inRounding = (checkBox.checkStat("de_posting_chk_khr_inrounding") == true) ? "Y" : "N";
    CYPOUploadAllow = (checkBox.checkStat("de_posting_chk_cypo_upload_allow") == true) ? "Y" : "N";
    var xmlObject = {
        userID: STAFF_ID,
        batchType: inBatchTypes,
        batchSource: inBatchSource,
        trnName: inTransactionName,
        templateName: v_dePostingTemplateName,
        batchMasterName: v_dePostingCSVMasterName,
        batchDetailName: v_dePostingCSVDetailName,
        backDate: backDate,
        nextWorkingDay: nextWorkingDay,
        mainAccount: inMainAccount,
        mainAccountCcy: inMainAccountCccy,
        mainAccountBrcode: inMainAccountBrcode,
        payrollOffset: inPayrollOffsetAccount,
        payrollOffsetFee: inPayrollOffsetFee,
        trnReference: inTrnReference,
        inRounding: inRounding,
        CYPOUploadAllow: CYPOUploadAllow
    }
    //console.log(xmlObject.tostring());
    var xml = stringCreate.toXML("PreCheck", xmlObject).End();
    var requestData = { xmlData: xml };

    myRequest.Execute(v_dePostingPreCheckUrl, requestData, bpFnPreCheck, "Checking...");
    //System.Event(page_title, xml);
};
var dePostingObjReUpload = {};
function fnRequestUpload() {
    dePostingObjReUpload = {};
    var source = $("#de_posting_source").val();
    var trnType = "C";
    var appAuth = "N";
    var scheduleDt = "";
    var singleReqStat = "";
    var requestGrid = 0;
    var trnName = $("#de_posting_transaction_name").val();
    var lastTrn = "N";
    var note = $("#de_posting_notice").val();
    inRounding = (checkBox.checkStat("de_posting_chk_khr_inrounding") == true) ? "Y" : "N";
    CYPOAllow = (checkBox.checkStat("de_posting_chk_cypo_upload_allow") == true) ? "Y" : "N";
    if (inBackDateStat == "Y") {
        trnType = "B";
    };
    if (inNexWorkDayStat == "Y") {
        trnType = "N";
    };
    if (checkBox.checkStat("de_posting_chk_approve_auth") == true) {
        appAuth = "Y";
    };
    if (checkBox.checkStat("de_posting_chk_schedule") == true) {
        scheduleDt = $("#de_posting_schedule_datetime").val();
        if (scheduleDt == "") {
            goAlert.alertErroTo("de_posting_schedule_datetime", "Error", "Schedule datetime cannot be empty", "click");
            return false;
        };
    };
    if (checkBox.checkStat("de_posting_chk_single_req") == true) {
        singleReqStat = "Y";
        requestGrid = 0;
    };

    if (checkBox.checkStat("de_posting_chk_group_req") == true) {
        singleReqStat = "N";
        requestGrid = $("#de_posting_group_request_id").val();

        if (requestGrid == "") {
            goAlert.alertErroTo("de_posting_group_request_id", "Error", "Choose group name", "change");
            return false;
        };
    };
    if (checkBox.checkStat("de_posting_chk_last_transaction") == true) {
        lastTrn = "Y";
    };
    element.setDisable([
        "de_posting_chk_approve_auth",
        "de_posting_chk_schedule",
        "de_posting_chk_single_req",
        "de_posting_chk_group_req",
        "de_posting_schedule_datetime",
        "de_posting_group_request_id",
        "de_posting_chk_last_transaction",
        "de_posting_notice",
        "de_posting_chk_khr_inrounding",
        "de_posting_chk_cypo_upload_allow"
    ]);
    var objectData = {
        userID: STAFF_ID,
        groupID: inGroupID,
        scheduleDateTime: scheduleDt,
        singleRequest: singleReqStat,
        requestGrid: requestGrid,
        trnType: trnType,
        approveAuthorize: appAuth,
        note: note,
        trnName: trnName,
        lastTrn: lastTrn,
        source: source,
        inRounding: inRounding,
        CYPOAllow: CYPOAllow

    };
    dePostingObjReUpload = objectData;
    if (singleReqStat == "N" && lastTrn == "N") {
        $("#btn_de_posting_req_commit_pos").attr("onclick", "fnRequestUploadCommit('Y')");
        $("#btn_de_posting_req_commit_neg").attr("onclick", "fnRequestUploadCommit('N')");
        modals.OpenStatic("de_posting_md_group_req_confirm");
    }
    else {
        fnRequestUploadCommit(lastTrn);
    };
};
function fnRequestUploadCommit(v_last_trn) {
    modals.Close("de_posting_md_group_req_confirm");
    dePostingObjReUpload.lastTrn = v_last_trn;
    var xmlData = stringCreate.toXML("RequestUpload", dePostingObjReUpload).End();
    myRequest.Execute(v_dePostingRequestUpload, { xmlData: xmlData }, bpFnRequestUpload, "Processing...");
};
function fnCreateGRID() {
    var groupName = $("#de_posting_create_group_name").val();
    if (groupName == "") {
        goAlert.alertErroTo("de_posting_create_group_name", "Error", "Group name cannot be empty", "click");
        return false;
    }
    else {
        modals.Close("modalCreateGRID");
        var data = { userID: STAFF_ID, groupName: groupName };
        myRequest.Execute(v_dePostingCreateGRID, data, bpFnCreateGRID, "Saving...");
    }
};
// self upload
function fnDeSelfUpload() {
    var source = $("#de_posting_source").val();
    var trnType = "C";
    var appAuth = "N";
    var scheduleDt = "";
    var singleReqStat = "";
    var requestGrid = 0;
    var trnName = $("#de_posting_transaction_name").val();
    var lastTrn = "N";
    var note = $("#de_posting_notice").val();
    inRounding = (checkBox.checkStat("de_posting_chk_khr_inrounding") == true) ? "Y" : "N";
    CYPOAllow = (checkBox.checkStat("de_posting_chk_cypo_upload_allow") == true) ? "Y" : "N";
    if (inBackDateStat == "Y") {
        trnType = "B";
    };
    if (inNexWorkDayStat == "Y") {
        trnType = "N";
    };
    if (checkBox.checkStat("de_posting_chk_approve_auth") == true) {
        appAuth = "Y";
    };
    if (checkBox.checkStat("de_posting_chk_schedule") == true) {
        scheduleDt = $("#de_posting_schedule_datetime").val();
        if (scheduleDt == "") {
            goAlert.alertErroTo("de_posting_schedule_datetime", "Error", "Schedule datetime cannot be empty", "click");
            return false;
        };
    };
    if (checkBox.checkStat("de_posting_chk_single_req") == true) {
        singleReqStat = "Y";
        requestGrid = 0;
    };
    if (checkBox.checkStat("de_posting_chk_group_req") == true) {
        singleReqStat = "N";
        requestGrid = $("#de_posting_group_request_id").val();
        if (requestGrid == "NULL") {
            goAlert.alertErroTo("de_posting_group_request_id", "Error", "Choose group name", "change");
            return false;
        };
    };
    if (checkBox.checkStat("de_posting_chk_last_transaction") == true) {
        lastTrn = "Y";
    }
    element.setDisable([
        "de_posting_chk_approve_auth",
        "de_posting_chk_schedule",
        "de_posting_chk_single_req",
        "de_posting_chk_group_req",
        "de_posting_schedule_datetime",
        "de_posting_group_request_id",
        "de_posting_chk_last_transaction",
        "de_posting_notice",
        "de_posting_chk_khr_inrounding",
        "de_posting_chk_cypo_upload_allow"
    ]);
    var objectData = {
        userID: STAFF_ID,
        groupID: inGroupID,
        scheduleDateTime: scheduleDt,
        singleRequest: singleReqStat,
        requestGrid: requestGrid,
        trnType: trnType,
        approveAuthorize: appAuth,
        note: note,
        trnName: trnName,
        lastTrn: lastTrn,
        source: source,
        inrounding: inRounding,
        CYPOAllow: CYPOAllow
    };
    var xmlData = stringCreate.toXML("SelfUpload", objectData).End();

    myRequest.Execute(v_dePostingSelfUpload, { xmlData: xmlData }, bpFnSelfUpload, "Processing...");
    System.Event(page_title, xmlData);
};
// query data
function fnDePostingQuery() {
    var object_batch_type = $("#de_posting_batch_type_filter").val();
    var batch_type = stringCreate.FromObject(object_batch_type);
    if (batch_type === undefined || batch_type == "") {
        goAlert.alertErroTo("de_posting_batch_type_filter", "Error", "Please choose Batch types", "change");
        return false;
    };
    var dateRange = $("#de_posting_query_date").val();
    if (dateRange === undefined || dateRange == "") {
        goAlert.alertErroTo("de_posting_query_date", "Error", "Please choose Batch types");
        return false;
    };
    var fromDate = subString.FromDateDateRange(dateRange);
    var toDate = subString.ToDateDateRange(dateRange);
    var objectQuery = {
        UserID: STAFF_ID,
        BatchTypes: batch_type,
        FromDate: fromDate,
        ToDate: toDate,
        TableID: "tbl_de_posting_batch"
    };
    var xmlData = stringCreate.toXML("Query", objectQuery).End();
    myRequest.Execute(v_dePostingQuery, { xmlData: xmlData }, bpFnBatchPostingQuery, "Processing...");
}
// request authorize button
var dePostingObjReAuth = {};
function fnDeRequestAuthorize() {
    dePostingObjReAuth = {};
    var lastTrn = "N";
    var singleReqStat = "";
    var requestGrid = 0;
    if (checkBox.checkStat("de_posting_chk_last_transaction") == true) {
        lastTrn = "Y";
    };
    if (checkBox.checkStat("de_posting_chk_single_req") == true) {
        singleReqStat = "Y";
        requestGrid = 0;
    };
    if (checkBox.checkStat("de_posting_chk_group_req") == true) {
        singleReqStat = "N";
        requestGrid = $("#de_posting_group_request_id").val();
        if (requestGrid == "NULL") {
            goAlert.alertErroTo("de_posting_group_request_id", "Error", "Choose group name", "change");
            return false;
        };
    };
    var objectData = {
        userID: STAFF_ID,
        groupID: inGroupID,
        singleRequest: singleReqStat,
        requestGrid: requestGrid,
        lastTrn: lastTrn,
        requestFrom: "O"
    };
    dePostingObjReAuth = objectData;
    if (singleReqStat == "N" && lastTrn == "N") {
        $("#btn_de_posting_req_commit_pos").attr("onclick", "fnDeRequestAuthorizeCommit('Y')");
        $("#btn_de_posting_req_commit_neg").attr("onclick", "fnDeRequestAuthorizeCommit('N')");
        modals.OpenStatic("de_posting_md_group_req_confirm");
    }
    else {
        fnDeRequestAuthorizeCommit(lastTrn);
    };
};
function fnDeRequestAuthorizeCommit(v_last_trn) {
    modals.Close("de_posting_md_group_req_confirm");
    dePostingObjReAuth.lastTrn = v_last_trn;
    var xmlData = stringCreate.toXML("RequestAuthorize", dePostingObjReAuth).End();
    myRequest.Execute(v_dePostingRequestAuth, { xmlData: xmlData }, bpFnRequestAuthorize, "Processing...");
};
// request authorize grid view
function fnDeRequestAuthorizeGridDialog() {
    var objectGroup = [];
    objectGroup = table.GetValueSelected("tbl_de_posting_batch");
    if (objectGroup.length == 0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    if (modals.ConfirmShowAgain("mdderequestauthroize") == true) {
        modals.Confirm("Request Authorize", "Are you sure to request selected Group ID for authorize?", "Y", "Yes", "onclick", "fnDeRequestAuthorizeGrid()", "mdderequestauthroize");;
    }
    else {
        fnDeRequestAuthorizeGrid();
    };

};
function fnDeRequestAuthorizeGrid() {
    modals.CloseConfirm();
    var objectGroup = [];
    objectGroup = table.GetValueSelected("tbl_de_posting_batch");
    if (objectGroup.length == 0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    var stringGroup = stringCreate.FromObject(objectGroup);
    var remark = modals.getConfirmNote();
    var objectReqGroup = {
        userID: STAFF_ID,
        groupID: stringGroup,
        sReqFrom: "G",
        remark: remark
    };
    var xmlData = stringCreate.toXML("RequestAuthorize", objectReqGroup).End();
    myRequest.Execute(v_dePostingRequestAuth, { xmlData: xmlData }, bpFnRequestAuthorizeGrid, "Processing...");
    System.Event(page_title, xmlData);
};
// seft authorize
function fnDeSelfAuthorize() {
    var objectData = {
        userID: STAFF_ID,
        groupID: inGroupID
    };
    var xmlData = stringCreate.toXML("SelfAuthorize", objectData).End();
    myRequest.Execute(v_dePostingSelfAuthorize, { xmlData: xmlData }, bpFnSelfAuthorize, "Processing...");
    System.Event(page_title, xmlData);
};
// abort Request
function fnDeAbortRequestDialog() {
    var objectGroup = [];
    objectGroup = table.GetValueSelected("tbl_de_posting_batch");
    if (objectGroup.length == 0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    if (modals.ConfirmShowAgain("mdderequestabort") == true) {
        modals.Confirm("Request Abort", "Are you sure to request selected Group ID for abort?", "Y", "Yes", "onclick", "fnDeAbortRequest()", "mdderequestabort");;
    }
    else {
        fnDeAbortRequest();
    };
};
function fnDeAbortRequest() {
    modals.CloseConfirm();
    var objectGroup = [];
    objectGroup = table.GetValueSelected("tbl_de_posting_batch");
    if (objectGroup.length == 0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    var remark = modals.getConfirmNote();
    var strGroup = stringCreate.FromObject(objectGroup);;
    var objectReqGroup = {
        userID: STAFF_ID,
        groupID: strGroup,
        remark: remark
    };
    var xmlData = stringCreate.toXML("AbortRequest", objectReqGroup).End();
    myRequest.Execute(v_dePostingAbortRequest, { xmlData: xmlData }, bpFnAbortRequest, "Processing...");
    System.Event(page_title, xmlData);
};
// Confirm donwload doc
function fnDePostingDownloadDocDialog() {
    objectGroup = table.GetValueSelected("tbl_de_posting_batch");
    if (objectGroup.length == 0) {
        goAlert.alertError("Error", "No Group ID selected");
        return false;
    };
    v_doc_group_id = stringCreate.FromObject(objectGroup);
    if (modals.ConfirmShowAgain("md_deposting_confirm_download_doc") == true) {
        modals.Confirm("Download Documents", "Are you sure to download documents from selected Group ID?", "N", "Yes", "onclick", "fnDeDownloadDoc()", "md_deposting_confirm_download_doc");
    }
    else {
        fnDeDownloadDoc();
    };

}
// download document
var v_doc_group_id;
function fnDeDownloadDoc() {
    modals.CloseConfirm();
    window.location.href = "ACTIONS/Controllers/DE/doc_download.aspx?dot=dedoc&dwr=" + STAFF_ID + "&grl=" + v_doc_group_id;
}
var tmpIssueCode;
var tmpUserId;
var tmpGroupID;
function fnDeCheckIssue(issue_code, user_id, group_id) {
    tmpIssueCode = issue_code;
    tmpUserId = user_id;
    tmpGroupID = group_id;
    var tmpmodal = document.getElementById("bpmdlIssueDetail");
    if (tmpmodal !== null) {
        tmpmodal.remove();
    };
    var content = '<div class="modal" id="bpmdlIssueDetail" tabindex="-1" role="dialog">';
    content = content + '<div class="modal-dialog modal-xl">';
    content = content + '<div class="modal-content">';
    content = content + '<div class="modal-header">';
    content = content + '<span>Pre-Check</span>';
    content = content + '</div>';
    content = content + '<div class="modal-body">';
    content = content + '<div class="col-sm-12">';
    content = content + '<table class="table table-sm">';
    content = content + '<tbody>';
    content = content + '<tr>';
    content = content + '<td>Issue Code</td>';
    content = content + '<td>:</td>';
    content = content + '<td><span id="issue_code">' + issue_code + '</span></td>';
    content = content + '</tr>';
    content = content + '<tr>';
    content = content + '<td>Summary</td>';
    content = content + '<td>:</td>';
    content = content + '<td><span id="issue_summary"></span></td>';
    content = content + '</tr>';
    content = content + '<tr>';
    content = content + '<td>Detail</td>';
    content = content + '<td>:</td>';
    content = content + '<td><span id="issue_detail"></span></td>';
    content = content + '</tr>';
    content = content + '</tbody>';
    content = content + '</table>';
    content = content + '</div>';
    content = content + '<div class="col-sm-12 table-responsive">';
    content = content + '<table cellpadding="0" cellspacing="0" id="tbl_get_de_issue" class="table table-bordered table-hover nowrap"></table>';
    content = content + '</div>';
    content = content + '</div>';
    content = content + '<div class="modal-footer">';
    content = content + '<button class="btn btn-primary btn-xs" type="button" onclick="fnDeExportIssueTrn()"><i class="fas fa-file-download"></i> Export</button>';
    content = content + '<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Close</button>';
    content = content + '</div>';
    content = content + '</div>';
    content = content + '</div>';
    content = content + '</div>';
    $("#MAIT_CONTENT_TABS").append(content);
    myRequest.Execute(v_deIssueTrn, {
        pre_code: issue_code,
        user_id: user_id,
        group_id: group_id,
        table_data: "tbl_get_de_issue"
    },
        bpFnGetIssueTrn,
        "Processing...");
};
function fnDeExportIssueTrn() {
    modals.Close("bpmdlIssueDetail");
    window.location.href = "ACTIONS/Controllers/DE/doc_download.aspx?dot=deissuetrn&code=" + tmpIssueCode + "&uid=" + tmpUserId + "&grl=" + tmpGroupID;
};
function fnDeePostingClearPullDialog() {
    var source = $("#de_posting_source").val();
    var ref = $("#de_posting_transaction_ref").val();
    if (source == "") {
        goAlert.alertErroTo("de_posting_source", "Error", "Choose Batch Source", "change");
        return false;
    };
    if (ref == "") {
        goAlert.alertErroTo("de_posting_transaction_ref", "Error", "Choose Transaction Reference", "change");
        return false;
    };
    if (modals.ConfirmShowAgain("mdconfirmclearpullref") == true) {
        modals.Confirm("Clear Reference", "Are you sure to clear reference from raw table?", "N", "Yes", "onclick", "fnDePostingClearRef()", "mdconfirmclearpullref");
    }
    else {
        fnDePostingClearRef();
    }

};
function fnDePostingClearRef() {
    modals.CloseConfirm();
    var source = $("#de_posting_source").val();
    var ref = $("#de_posting_transaction_ref").val();
    myRequest.Execute(v_dePostingClearRef, {
        UserID: STAFF_ID,
        Source: source,
        Ref: ref
    },
        bpFnClearRef,
        "Processing...");
};
function fnDePostingRequestDeleteModal() {

    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_de_posting_batch");
    if (objGroupID.length == 0) {
        goAlert.alertError("Error Request Delete Batch", "No Group ID selected.");
        return false;
    }
    var groupOpt = "";
    for (var i = 0; i < objGroupID.length; i++) {
        groupOpt = groupOpt + "<option selected='selected' value='" + objGroupID[i] + "'>" + objGroupID[i] + "</option>";
    };
    selectionStyle.MultipleInline("de_posting_req_delete_group_id", groupOpt);
    var strGroupID = stringCreate.FromObject(objGroupID);
    var dateRange = $("#de_posting_query_date").val();
    var fromDate = subString.FromDateDateRange(dateRange);
    var toDate = subString.ToDateDateRange(dateRange);
    var xmlData = {
        user_id: STAFF_ID,
        str_groupid: strGroupID,
        from_date: fromDate,
        to_date: toDate
    };
    myRequest.Execute(v_GetBatch4reqDelete, xmlData, bpFnBatchNoRequestDelete, "Processing...");
}
function DePostingRequestDeleteChangeGroupID() {
    var objGroupID = [];
    objGroupID = $("#de_posting_req_delete_group_id").val();
    var strGroupID = stringCreate.FromObject(objGroupID);
    var dateRange = $("#de_posting_query_date").val();
    var fromDate = subString.FromDateDateRange(dateRange);
    var toDate = subString.ToDateDateRange(dateRange);
    var xmlData = {
        user_id: STAFF_ID,
        str_groupid: strGroupID,
        from_date: fromDate,
        to_date: toDate
    };
    myRequest.Execute(v_GetBatch4reqDelete, xmlData, bpFnBatchNoRequestDeleteChange);
}
function DePostingRequestDeleteBatch() {

    var objGroupID = [];
    objGroupID = $("#de_posting_req_delete_group_id").val();
    if (objGroupID.length == 0) {
        goAlert.alertErroTo("de_posting_req_delete_group_id", "Error Request Delete Batch", "No Group ID selected.", "change");
        return false;
    };

    var strGroupID = stringCreate.FromObject(objGroupID);
    var dateRange = $("#de_posting_query_date").val();
    var fromDate = subString.FromDateDateRange(dateRange);
    var toDate = subString.ToDateDateRange(dateRange);
    var objBatchNo = [];
    objBatchNo = $("#de_posting_req_delete_batch_no").val();
    if (objBatchNo.length == 0) {
        goAlert.alertErroTo("de_posting_req_delete_batch_no", "Error Request Delete Batch", "No Batch No selected.", "change");
        return false;
    };
    var strBatchNo = stringCreate.FromObject(objBatchNo);
    var objBranch = [];
    objBranch = $("#de_posting_req_delete_branch_code").val();
    if (objBranch.length == 0) {
        goAlert.alertErroTo("de_posting_req_delete_branch_code", "Error Request Delete Batch", "No Branch Code selected.", "change");
        return false;
    };
    var strBranch = stringCreate.FromObject(objBranch);
    var remark = $("#de_posting_req_delete_remark").val();
    var objData = {
        userID: STAFF_ID,
        groupID: strGroupID,
        batchNo: strBatchNo,
        branch: strBranch,
        fromDate: fromDate,
        toDate: toDate,
        remark: remark
    };

    var xmlData = stringCreate.toXML("RequestDelete", objData).End();
    modals.Close("modalDepostingReqDelete");
    myRequest.Execute(v_dePostingRequestDelete, { xmlData: xmlData }, bpFnRequestDelete, "Processing...");
};
function DePostingFnExportJvDialog() {
    var objGroupID = [];
    objGroupID = table.GetValueSelected("tbl_de_posting_batch");
    if (objGroupID.length == 0) {
        checkBox.Check("de_posting_jv_not_above_batch_ck");
        DePostingNoTheseBatchJvCheck();
    }
    else {
        checkBox.Uncheck("de_posting_jv_not_above_batch_ck");
        DePostingNoTheseBatchJvCheck();
    };
    var groupOpt = "";
    for (var i = 0; i < objGroupID.length; i++) {
        groupOpt = groupOpt + "<option selected='selected' value='" + objGroupID[i] + "'>" + objGroupID[i] + "</option>";
    };
    selectionStyle.MultipleInline("de_posting_jv_group_id", groupOpt);
    var strGroupId = stringCreate.FromObject(objGroupID);
    myRequest.Execute(v_dePostingGetBatch4JvExport, { str_groupid: strGroupId }, bpFnBatchNo4jvExportHandler, "Processing...");
};
function DePostingGetBatchForJvOnChange() {
    var objGroupID = [];
    objGroupID = $("#de_posting_jv_group_id").val();
    selectionStyle.MultipleInline("de_posting_jv_batch_no", "");
    if (objGroupID.length !== 0) {
        var strGroupId = stringCreate.FromObject(objGroupID);
        myRequest.Execute(v_dePostingGetBatch4JvExport, { str_groupid: strGroupId }, bpFnBatchNo4jvExportOnChangeHandler);
    }
};
function DePostingNoTheseBatchJvCheck() {
    if (checkBox.checkStat("de_posting_jv_not_above_batch_ck") == true) {
        goShowHide.showOnDivAsBlock(["div_jv_batch_manual", "div_jv_value_date_manual"]);
        element.setDisable(["de_posting_jv_group_id", "de_posting_jv_batch_no"])
    }
    else {
        goShowHide.hideOnDiv(["div_jv_batch_manual", "div_jv_value_date_manual"]);
        element.setEnable(["de_posting_jv_group_id", "de_posting_jv_batch_no"])
    }
};
function DePostingStartExportJv() {
    var objGroupID = [];
    var StrGroupID;
    var ObjbatchNo = [];
    var StrBatchNo;
    var ValueDate;
    var Type = $("#de_posting_jv_type").val();
    if (checkBox.checkStat("de_posting_jv_not_above_batch_ck") == true) {
        StrGroupID = "";
        StrBatchNo = $("#de_posting_jv_manual_batch_enter").val();
        ValueDate = $("#de_posting_jv_value_date_enter").val();
        if (StrBatchNo == "") {
            goAlert.alertErroTo("de_posting_jv_manual_batch_enter", "Export Error", "Batch No cannot be empty.");
            return false;
        }
        if (ValueDate == "") {
            goAlert.alertErroTo("de_posting_jv_value_date_enter", "Export Error", "Value Date cannot be empty.");
            return false;
        }
    }
    else {
        objGroupID = $("#de_posting_jv_group_id").val();
        if (objGroupID.length == 0) {
            goAlert.alertErroTo("de_posting_jv_group_id", "Export Error", "Group ID cannot be empty.", "change");
            return false;
        }
        ObjbatchNo = $("#de_posting_jv_batch_no").val();
        if (ObjbatchNo.length == 0) {
            goAlert.alertErroTo("de_posting_jv_batch_no", "Export Error", "Batch No cannot be empty.", "change");
            return false;
        }
        StrGroupID = stringCreate.FromObject(objGroupID);
        StrBatchNo = stringCreate.FromObject(ObjbatchNo);
        ValueDate = "";
    }
    modals.Close("modalDepostingExportJv");
    window.location.href = "ACTIONS/Controllers/DE/doc_download.aspx?dot=jv&ext=" + STAFF_ID + "&grl=" + StrGroupID + "&btc=" + StrBatchNo + "&vld=" + ValueDate + "&type=" + Type;
    //window.open("ACTIONS/Controllers/DE/doc_download.aspx?dot=jv&ext=" + STAFF_ID + "&grl=" + StrGroupID + "&btc=" + StrBatchNo + "&vld=" + ValueDate + "&type=" + Type, '_blank');
};