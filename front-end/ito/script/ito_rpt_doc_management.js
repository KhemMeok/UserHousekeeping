/// <reference path="ito_core.js" />
/// <reference path="ito_content_validator.js" />
/// <reference path="ito_rpt_doc_management_handle.js" />

//==================start function clear=============================
function DocumentMGTfnClearAll(type) {
  if (type === "EDIT") {
    element.inputValue("rpt_doc_name", "");
    element.inputValue("rpt_doc_date", "");
    element.inputValue("rpt_doc_remark", "");
    $("#rpt_doc_unit_departement").prop("selectedIndex", 0).change();
    $("#rpt_doc_departement").prop("selectedIndex", 0).change();
    $("#rpt_doc_category").prop("selectedIndex", 0).change();
    document.getElementById("btn_insert_doc_management").style.display = "";
    document.getElementById("btn_update_doc_management").style.display = "none";
    document.getElementById("btn_reset_doc_management").style.display = "none";
    $("#rptDocumentManagementFileInput").val("");
    base64StringDoc = "";
    DocumentMGTfnMonthlyReportSelect();
    arrFileData = [];
    DocumentMGTfnRemoveRow("", arrFileData);
  } else if (type === "FILE") {
    $("#rptDocumentManagementFileInput").val("");
    base64StringDoc = "";
    arrFileData = [];
    DocumentMGTfnRemoveRow("", arrFileData);
  } else {
    element.inputValue("rpt_doc_name", "");
    element.inputValue("rpt_doc_date", "");
    element.inputValue("rpt_doc_remark", "");
    $("#rpt_doc_unit_departement").prop("selectedIndex", 0).change();
    $("#rpt_doc_departement").prop("selectedIndex", 0).change();
    $("#rpt_doc_category").prop("selectedIndex", 0).change();
    document.getElementById("btn_insert_doc_management").style.display = "";
    document.getElementById("btn_update_doc_management").style.display = "none";
    document.getElementById("btn_reset_doc_management").style.display = "none";
    $("#rptDocumentManagementFileInput").val("");
    base64StringDoc = "";
    DocumentMGTfnMonthlyReportSelect();
    arrFileData = [];
    DocumentMGTfnRemoveRow("", arrFileData);
    doc_id_edit = "";
  }
}
//==================end function clear=============================

//==================start function delete doc=========================
function DocumentMGTfnDeleteDocument() {
  let report_id_obj = table.GetValueSelected("rpt_doc_management");
  if (report_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    return false;
  }
  if (report_id_obj.length > 1) {
    goAlert.alertError(
      "Processing Failed",
      "Operation does not support with multiple selection"
    );
    return false;
  }
  let doc_management_id = stringCreate.FromObject(report_id_obj);
  if (modals.ConfirmShowAgain("rpt_doc_delete") === true) {
    modals.Confirm(
      "Delete document management",
      "Are you sure to delete documents ?",
      "N",
      "Yes",
      "onclick",
      "DocumentMGTfnDeleteDocumentHandle('" + doc_management_id + "')",
      "rpt_doc_delete"
    );
  } else {
    DocumentMGTfnDeleteDocumentHandle(doc_management_id);
  }
}
function DocumentMGTfnDeleteDocumentHandle(doc_id) {
  modals.CloseConfirm();
  let data = {
    document_id: doc_id,
  };
  CallAPI.Go(
    v_rpt_delete_doc_management,
    data,
    DocumentMGTfnDeleteDocumentCallBack,
    "Processing..."
  );
}
//========================end function delete doc========================

//=========================start function edit doc========================
let doc_id_edit = "";
function DocumentMGTfnEditDocument() {
  let report_id_obj = table.GetValueSelected("rpt_doc_management");
  if (doc_id_edit === "") {
    if (report_id_obj.length === 0) {
      goAlert.alertError("Processing Failed", "No Report ID Selected");
      return false;
    }
    if (report_id_obj.length > 1) {
      goAlert.alertError(
        "Processing Failed",
        "Operation does not support with multiple selection"
      );
      return false;
    }
    doc_id_edit = stringCreate.FromObject(report_id_obj);
    DocumentMGTfnEditDocumentHandle(doc_id_edit);
  } else {
    DocumentMGTfnEditDocumentHandle(doc_id_edit);
  }
}
function DocumentMGTfnEditDocumentHandle(edit_doc_management_id) {
  DocumentMGTfnClearAll("EDIT");
  $("#btn_insert_doc_management").hide();
  $("#btn_update_doc_management").show();
  $("#btn_reset_doc_management").show();

  let data = {
    doc_management_id: edit_doc_management_id,
  };
  CallAPI.Go(
    v_rpt_edit_doc_management,
    data,
    DocumentMGTfnEditDocumentCallBack,
    "Processing..."
  );
}
//=========================end function edit doc========================

//=======================start first load=========================
function DocumentMGTfnFirstLoad(process) {
  if (process === undefined) {
    CallAPI.Go(
      v_rpt_doc_management_first_load,
      undefined,
      DocumentMGTfnDocumentFirstLoadCallBack
    );
  } else {
    CallAPI.Go(
      v_rpt_doc_management_first_load,
      undefined,
      DocumentMGTfnDocumentFirstLoadCallBack,
      "Processing..."
    );
  }
}
//=======================end first load=========================

//=======================start function save====================
function DocumentMGTfnSaveNewDocumentHandle() {
    const doc_departement = $("#rpt_doc_departement").val();
    const doc_unit_departement = $("#rpt_doc_unit_departement").val();
    const doc_category = $("#rpt_doc_category").val();
    const doc_names = $("#rpt_doc_name").val();
    let doc_name = doc_names.toString().split("~");
    const doc_date = $("#rpt_doc_date").val();
    const doc_remark = $("#rpt_doc_remark").val();
    if (doc_departement === "" || doc_departement === null) {
        goAlert.alertErroTo(
            "rpt_doc_departement",
            "Entity Failed",
            "Please Insert"
        );
        return false;
    }
    if (doc_unit_departement === "" || doc_unit_departement === null) {
        goAlert.alertErroTo(
            "rpt_doc_unit_departement",
            "Entity Failed",
            "Please Insert"
        );
        return false;
    }
    if (doc_category === "") {
        goAlert.alertErroTo("rpt_doc_category", "Entity Failed", "Please Insert");
        return false;
    }
    if (doc_names === "") {
        goAlert.alertErroTo("rpt_doc_name", "Entity Failed", "Please Insert");
        return false;
    }
    if (doc_date === "") {
        goAlert.alertErroTo("rpt_doc_date", "Entity Failed", "Please Insert");
        return false;
    }
    if (arrFileData === undefined || arrFileData.length === 0) {
        goAlert.alertErroTo(
            "rptDocumentManagementTableListingFileInput",
            "Entity Failed",
            "Please Select a file"
        );
        return false;
    }
    let data = {
        doc_management_department: doc_departement,
        doc_management_unit: doc_unit_departement,
        doc_management_date: doc_date,
        doc_management_id: doc_name[1],
        doc_category_id: doc_category,
        doc_name: arrFileData.length === 1 ? (doc_name[2].toString().trim() +"."+ DocMgtFnGetFileExtension(arrFileData[0].name).toString().trim()) : doc_name[2] + ".zip",
        doc_file: arrFileData.length === 1 ? arrFileData[0].type : "application/zip",
        doc_remark: doc_remark === "" ? "-" : doc_remark,
        doc_id: doc_name[1],
        doc_management_name: doc_name[2],
    };
    const statusCheck = Object.values(data).every((item) => item);
    if (statusCheck) {
        CallAPI.Go(
            v_rpt_insert_doc_management,
            data,
            DocumentMGTfnSaveNewDocumentCallBack,
            "processing.."
        );
    } else {
        goAlert.alertError(
            "Update Check",
            "some data for update is null pls check!"
        );
        console.log(data);
    }
}
//---------------------------end save new doc-------------------------

//--------------------start upload file to sftp-----------------------
function DocumentMGTfnUploadDocumentToSFTP(fileName, file_path) {
  if (base64StringDoc.length <= 0) {
    goAlert.alertError("File Input", "File size is 0 pls check!");
  } else {
    let data = {
      file_data: base64StringDoc,
      file_name: fileName,
      file_path: file_path,
    };
    const status = Object.values(data).every((item) => item);
    if (status) {
      CallAPI.Go(
        v_rpt_uploadDocumentToSFTP,
        data,
        DocumentMGTfnUploadFileCallBack,
        "Processing"
      );
    } else {
      goAlert.alertError("File Input", "some info file is null pls check!");
    }
  }
}
function DocumentMGTfnUploadFileCallBack(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Save Document", data.message);
    DocMGTGetDataTbListing();
  }
}
//-----------------------------end upload file to sftp-----------------------------

//----------------------------start function download file-------------------------
function DocumentMGTfnDownloadFile() {
  let report_id_obj = [];
  report_id_obj = table.GetValueSelected("rpt_doc_management");
  if (report_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    return false;
  }
  if (report_id_obj.length > 1) {
    goAlert.alertError(
      "Processing Failed",
      "Operation does not support with multiple selection"
    );
    return false;
  }
  let report_id = stringCreate.FromObject(report_id_obj);
  const filteredDoc = listDocManagement.data.listDocManagement.filter(
    (doc) => doc.doc_management_id === report_id
  );
  let data = {
    file_name: filteredDoc[0].doc_name,
    file_path: filteredDoc[0].file_path,
  };
  CallAPI.Go(
    v_rpt_DownloadDocumentFromSFTP,
    data,
    DocumentMGTfnDownloadFileCallback,
    "Downloading.."
  );
}
function DocumentMGTfnDownloadFileCallback(data) {
  if (data.status === "1") {
    // Convert base64-encoded string to binary data
    const binaryData = atob(data.fileData.replace(/\s/g, ""));
    // Create Uint8Array directly from binary data
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    // Create a Blob from the Uint8Array and set the MIME type
    const blob = new Blob([uint8Array], { type: "application/octet-stream" });
    // Trigger a file download using the Blob
    saveAs(blob, data.file_name);
  }
}

//----------------------end function download file---------------------

//----------------------start function update doc----------------------
function DocumentMGTfnUpdateDocument() {
  if (modals.ConfirmShowAgain("rpt_doc_update") === true) {
    modals.Confirm(
      "Update document management",
      "Are you sure to update documents ?",
      "N",
      "Yes",
      "onclick",
      "DocumentMGTfnUpdateDocumentHandle()",
      "rpt_doc_update"
    );
  } else {
    DocumentMGTfnUpdateDocumentHandle();
  }
}
function DocumentMGTfnUpdateDocumentHandle() {
  modals.CloseConfirm();
  const doc_departement = $("#rpt_doc_departement").val();
  const doc_unit_departement = $("#rpt_doc_unit_departement").val();
  const doc_category = $("#rpt_doc_category").val();
  const doc_names = $("#rpt_doc_name").val();
  let doc_name = doc_names.toString().split("~");
  const doc_date = $("#rpt_doc_date").val();
  const doc_remark = $("#rpt_doc_remark").val();
  if (doc_departement === "") {
    goAlert.alertErroTo(
      "rpt_doc_departement",
      "Entity Failed",
      "Please Insert"
    );
    return false;
  }
  if (doc_unit_departement === "") {
    goAlert.alertErroTo(
      "rpt_doc_unit_departement",
      "Entity Failed",
      "Please Insert"
    );
    return false;
  }
  if (doc_category === "") {
    goAlert.alertErroTo("rpt_doc_category", "Entity Failed", "Please Insert");
    return false;
  }
  if (doc_names === "") {
    goAlert.alertErroTo("rpt_doc_name", "Entity Failed", "Please Insert");
    return false;
  }
  if (doc_date === "") {
    goAlert.alertErroTo("rpt_doc_date", "Entity Failed", "Please Insert");
    return false;
  }
  if (base64StringDoc.length === 0) {
    goAlert.alertError("File Input", "File input size is zero!");
    return false;
  }
  let data = {
    report_id:
      doc_id_edit !== "" ? doc_id_edit : alertError("Error", "no id selected"),
    doc_management_department: doc_departement,
    doc_management_unit: doc_unit_departement,
    doc_management_id: doc_name[1],
    doc_management_name: doc_name[2],
    doc_management_date: doc_date,
    doc_category_id: doc_category,
    doc_name:
          arrFileData.length === 1 ? (doc_name[2].toString().trim() + "." + DocMgtFnGetFileExtension(arrFileData[0].name).toString().trim()) : doc_name[2] + ".zip",
    doc_file:
      arrFileData.length === 1 ? arrFileData[0].type : "application/zip",
    doc_remark: doc_remark === "" ? "-" : doc_remark,
  };
  const statusCheck = Object.values(data).every((item) => item);
  if (statusCheck) {
    CallAPI.Go(
      v_rpt_Update_doc_management,
      data,
      DocumentMGTfnUpdateDocumentReportCallback,
      "processing.."
    );
  } else {
    goAlert.alertError(
      "Update Check",
      "some data for update is null pls check!"
    );
    console.log(data);
  }
}
function DocumentMGTfnUpdateDocumentReportCallback(data) {
  if (data.status === "1") {
    DocumentMGTfnUploadDocumentToSFTP(data.file_name, data.file_path);
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
//------------------------end function update doc-----------------------------

//------------------------start function option selected filter-------------------------------
function DocumentMGTfnMonthlyReportSelect() {
  const categorySelected = $("#rpt_doc_category").val().split("~");
  let status = false;
  element.inputValue("rpt_doc_date", "");
  if (categorySelected.length > 1) {
    $.each(DocMGTListCategory.data.listDocCategory, function (i, item) {
      if (
        categorySelected[0].toString().trim() ===
          item.doc_category_id.toString().trim() &&
        item.sub_category === "Y"
      ) {
        status = true;
        datePicker.Refresh("rpt_doc_date");
        datePicker.TimeMonthYear("rpt_doc_date");
      }
    });
  }
  if (status === false) {
    datePicker.Refresh("rpt_doc_date");
    datePicker.Date("rpt_doc_date");
  }
  DocumentMGTfnShowReportNameAndCode();
}
async function DocumentMGTfnShowReportNameAndCode() {
  let option_doc_cat_doc_name = '<option value=""></option>';
  let category = $("#rpt_doc_category").val();
    let unit = $("#rpt_doc_unit_departement").val();
    console.log(dataCategoryReport.data.list_cat_report);
    console.log(category.toString().split("~")[0]);
    console.log(unit.toString().split("~")[0]);
  $.each(dataCategoryReport.data.list_cat_report, function (i, item) {
    if (
      category.toString().split("~")[0] === item.category_id.trim() &&
        unit.toString().split("~")[0] === item.unit_code.toString().trim()
    ) {
        
      option_doc_cat_doc_name +=
        '<option value="' +
        item.category_id +
        "~" +
        item.doc_id +
        "~" +
        item.doc_name +
        '">' +
        (item.code !== "" ? "[" + item.code + "] - " : "") +
        item.doc_name +
        "</option>";
    }
  });
  selectionStyle.LiveSearch("rpt_doc_name", option_doc_cat_doc_name);
}
//-----------------------end function option selected filter------------------------

//-------------------------start function open module maintanance--------------------
function DocumentMGTfnOpenModuleForMaintenanceReport(tab) {
  modals.OpenStatic("modal_maintenance_report");
  DocumentMGTfnApplyDataCategoryToTable();
  DocumentMGTfnApplyDataCategoryReportToTable();
  selectionStyle.LiveSearch(
    "rpt_doc_mgt_report_maintance_category_id",
    option_category_maintance
  );
  selectionStyle.LiveSearch(
    "rpt_doc_mgt_report_maintenance_unit_code",
    option_unit_maintenance
  );
  if (tab !== "" && tab === "category") {
    DocumentMGTfnTabChange("category_tab");
    DocumentMGTfnTabChange("category_listing_tab");
  } else {
    DocumentMGTfnTabChange("category_report");
    DocumentMGTfnTabChange("category_report_listing");
  }
}
function DocumentMGTfnCloseModule() {
  DocumentMGTfnCancelCategoryMaintenances();
  DocumentMGTfnCancelReportMaintain();
  DocumentMGTfnTabChange("category_tab");
  DocumentMGTfnTabChange("category_listing_tab");
}
//-------------------------end function open module maintanance--------------------

//---------------------start function get category listing------------------------
function DocumentMGTfnGetCategory() {
  CallAPI.Go(
    v_rpt_GetCategoryReport,
    undefined,
    DocumentMGTfnGetCategoryCallback
  );
}
let dataCategoryReport;
function DocumentMGTfnGetCategoryCallback(data) {
  if (data.status === "1") {
    dataCategoryReport = data;
    DocumentMGTfnApplyDataCategoryToTable();
    DocumentMGTfnApplyDataCategoryReportToTable();
    selectionStyle.LiveSearch(
      "rpt_doc_mgt_report_maintance_category_id",
      option_category_maintance
    );
    // apply date after get data complete
    datePicker.DateRange("rpt_doc_date_date_filter");
  } else {
    goAlert.alertError("Processing Failed", data.message);
  }
}
//---------------------end function get category listing------------------------

//---------------------start function apply data to table category--------------
function DocumentMGTfnApplyDataCategoryToTable() {
  var columns_category = [
    {
      data: "category_id",
      render: function (category_id) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          category_id +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "category_id" },
    { data: "category_name" },
    { data: "remark" },
    { data: "last_oper" },
    { data: "last_oper_date" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson(
    "rpt_doc_category_listing",
    columns_category,
    dataCategoryReport.data.list_cat.filter((cat) => cat.type === "CAT")
  );
}
//---------------------end function apply data to table category--------------

//---------------------start function apply data to table doc mapping--------------
function DocumentMGTfnApplyDataCategoryReportToTable() {
  var columns_category = [
    {
      data: "doc_id",
      render: function (doc_id) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          doc_id +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "doc_id" },
    { data: "category_name" },
    { data: "doc_name" },
    { data: "code" },
    { data: "unit" },
    { data: "last_oper" },
    { data: "last_oper_date" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson(
    "rpt_doc_report_listing",
    columns_category,
    dataCategoryReport.data.list_cat_report
  );
}
//---------------------end function apply data to table doc mapping--------------

//---------------------start function tab change--------------------------------
function DocumentMGTfnTabChange(btn_attr) {
  if (btn_attr === "category_tab") {
    $('.nav-tabs a[href="#rpt_doc_mgt_category_listing_tab"]').tab("show");
    $("#rpt_doc_mgt_save_btn").attr(
      "onclick",
      "DocumentMGTfnInsertNewCategory()"
    );
    $("#rpt_doc_mgt_maintance_btn_edit").attr(
      "onclick",
      "DocumentMGTfnEditCategory()"
    );
    $("#rpt_doc_mgt_maintance_btn_delete").attr(
      "onclick",
      "DocumentMGTfnDeleteCategory()"
    );
    $("#rpt_doc_mgt_btn_clear").attr(
      "onclick",
      "DocumentMGTfnCancelCategoryMaintenances()"
    );
    dataTable.Recal();
  }
  if (btn_attr === "category_report") {
    $("#rpt_doc_mgt_save_btn").attr(
      "onclick",
      "DocumentMGTfnInsertReportAndMapToCategory()"
    );
    $("#rpt_doc_mgt_btn_clear").attr(
      "onclick",
      "DocumentMGTfnCancelReportMaintain()"
    );
    $('.nav-tabs a[href="#rpt_doc_mgt_category_report_listing_tab"]').tab(
      "show"
    );
    $("#rpt_doc_mgt_maintance_btn_edit").attr(
      "onclick",
      "DocumentMGTfnEditReportMaintain()"
    );
    $("#rpt_doc_mgt_maintance_btn_delete").attr(
      "onclick",
      "DocumentMGTfnDeleteReportMaintain()"
    );
    dataTable.Recal();
  }
  if (btn_attr === "category_listing_tab") {
    dataTable.Recal();
    $('.nav-tabs a[href="#rpt_doc_mgt_category_tab"]').tab("show");
    $("#rpt_doc_mgt_save_btn").attr(
      "onclick",
      "DocumentMGTfnInsertNewCategory()"
    );
    $("#rpt_doc_mgt_maintance_btn_edit").attr(
      "onclick",
      "DocumentMGTfnEditCategory()"
    );
    $("#rpt_doc_mgt_maintance_btn_delete").attr(
      "onclick",
      "DocumentMGTfnDeleteCategory()"
    );
    $("#rpt_doc_mgt_btn_clear").attr(
      "onclick",
      "DocumentMGTfnCancelCategoryMaintenances()"
    );
  }
  if (btn_attr === "category_report_listing") {
    dataTable.Recal();
    $('.nav-tabs a[href="#rpt_doc_mgt_category_report_tab"]').tab("show");
    $("#rpt_doc_mgt_save_btn").attr(
      "onclick",
      "DocumentMGTfnInsertReportAndMapToCategory()"
    );
    $("#rpt_doc_mgt_btn_clear").attr(
      "onclick",
      "DocumentMGTfnCancelReportMaintain()"
    );
    $('.nav-tabs a[href="#rpt_doc_mgt_category_report_listing_tab"]').tab(
      "show"
    );
    $("#rpt_doc_mgt_maintance_btn_edit").attr(
      "onclick",
      "DocumentMGTfnEditReportMaintain()"
    );
    $("#rpt_doc_mgt_maintance_btn_delete").attr(
      "onclick",
      "DocumentMGTfnDeleteReportMaintain()"
    );
  }
}
//--------------------------end function tab change-------------------------------

function DocumentMGTfnFilterDataByDocAndCategory(
  data,
  desiredDocId,
  desiredCategoryId
) {
  return data.filter(
    (element) =>
      element.doc_id === desiredDocId &&
      element.category_id === desiredCategoryId
  );
}

//---------------------start teb category operation------------------------------
function DocMGTFnGetValuesFromCheckBox() {
  const monthly_select = document.getElementById(
    "rpt_doc_mgt_category_maintance_monthly_check"
  );
  return monthly_select.checked ? "Y" : "N";
}
function DocumentMGTfnInsertNewCategory() {
  // insert new category
  const category_name = $("#rpt_doc_mgt_category_maintance_name").val();
  const remark = $("#rpt_doc_mgt_category_maintance_remark").val();

  if (category_name === "") {
    goAlert.alertErroTo(
      "rpt_doc_mgt_category_maintance_name",
      "Entity Failed",
      "Category name is Empty"
    );
    return false;
  }
  let data = {
    p_operation: "INSERT",
    p_category_id: "",
    p_category_name: category_name,
    p_new_category_name: "",
    p_remark: remark,
    p_monthly: DocMGTFnGetValuesFromCheckBox(),
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_category,
    data,
    DocumentMGTFnMaintainCategoryCallBack,
    "Processing..."
  );
}
function DocumentMGTFnMaintainCategoryCallBack(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Successfully", data.message);
    DocumentMGTfnFirstLoad();
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
let category_id = "";
function DocumentMGTfnEditCategory() {
  let report_id_obj = table.GetValueSelected("rpt_doc_category_listing");
  if (report_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    return false;
  }
  if (report_id_obj.length > 1) {
    goAlert.alertError(
      "Processing Failed",
      "Operation does not support with multiple selection"
    );
    return false;
  }
  category_id = stringCreate.FromObject(report_id_obj);
  let data = {
    p_operation: "GETBYID",
    p_category_id: category_id,
    p_category_name: "",
    p_new_category_name: "",
    p_remark: "",
    p_monthly: "",
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_category,
    data,
    DocumentMGTFnMaintainEditCategoryCallBack,
    "Processing..."
  );
}
function DocMGTFnSetSelectOrUnSelectCheckbox(value) {
  const checkbox = document.getElementById(
    "rpt_doc_mgt_category_maintance_monthly_check"
  );
  if (value === "Y") {
    checkbox.checked = true;
  } else if (value === "N") {
    checkbox.checked = false;
  }
}
function DocumentMGTFnMaintainEditCategoryCallBack(data) {
  if (data.status === "1") {
    if (data.data_category != null) {
      element.inputValue(
        "rpt_doc_mgt_category_maintance_name",
        data.data_category["category_name"]
      );
      element.inputValue(
        "rpt_doc_mgt_category_maintance_remark",
        data.data_category["remark"]
      );
      DocMGTFnSetSelectOrUnSelectCheckbox(
        data.data_category["monthly"] !== ""
          ? data.data_category["monthly"]
          : "N"
      );
      $("#rpt_doc_mgt_save_btn").hide();
      let btn_update = $("#rpt_doc_mgt_update_btn");
      let btn_cancel = $("#rpt_doc_mgt_cancel_btn");
      btn_cancel.show();
      btn_update.show();
      btn_update.attr("onclick", "DocumentMGTfnUpdateCategory()");
      btn_cancel.attr("onclick", "DocumentMGTfnCancelCategoryMaintenances()");
      DocumentMGTfnScrollToTop("modal_body");
    }
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
function DocumentMGTFnMaintainCategoryCallBack(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Successfully", data.message);
    DocumentMGTfnFirstLoad();
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
function DocumentMGTfnUpdateCategory() {
  const category_name = $("#rpt_doc_mgt_category_maintance_name").val();
  const remark = $("#rpt_doc_mgt_category_maintance_remark").val();
  if (category_name === "") {
    goAlert.alertErroTo(
      "rpt_doc_mgt_category_maintance_name",
      "Entity Failed",
      "Category name is Empty"
    );
    return false;
  }
  let data = {
    p_operation: "UPDATE",
    p_category_id: category_id,
    p_category_name: "",
    p_new_category_name: category_name,
    p_remark: remark,
    p_monthly: DocMGTFnGetValuesFromCheckBox(),
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_category,
    data,
    DocumentMGTFnMaintainCategoryCallBack,
    "Processing..."
  );
}
function DocumentMGTfnDeleteCategory() {
  let report_id_obj = table.GetValueSelected("rpt_doc_category_listing");
  if (report_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    return false;
  }
  if (report_id_obj.length > 1) {
    goAlert.alertError(
      "Processing Failed",
      "Operation does not support with multiple selection"
    );
    return false;
  }
  category_id = stringCreate.FromObject(report_id_obj);
  let data = {
    p_operation: "DELETE",
    p_category_id: category_id,
    p_category_name: "",
    p_new_category_name: "",
    p_remark: "",
    p_monthly: "",
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_category,
    data,
    DocumentMGTFnMaintainCategoryCallBack,
    "Processing..."
  );
}
function DocumentMGTfnCancelCategoryMaintenances() {
  element.inputValue("rpt_doc_mgt_category_maintance_name", "");
  element.inputValue("rpt_doc_mgt_category_maintance_remark", "");
  DocMGTFnSetSelectOrUnSelectCheckbox("N");
  $("#rpt_doc_mgt_save_btn").show();
  $("#rpt_doc_mgt_update_btn").hide();
  $("#rpt_doc_mgt_cancel_btn").hide();
}
//---------------------end tab category operation------------------------------

//---------------------start tab doc mapping operation-------------------------
function DocumentMGTfnInsertReportAndMapToCategory() {
  const category_id = $("#rpt_doc_mgt_report_maintance_category_id").val();
  const report_name = $("#rpt_doc_mgt_report_maintance_report_name").val();
  const code = $("#rpt_doc_mgt_report_maintance_code").val();
  const unit = $("#rpt_doc_mgt_report_maintenance_unit_code").val();
  if (category_id === "") {
    goAlert.alertErroTo(
      "rpt_doc_mgt_report_maintance_category_id",
      "Entity Failed",
      "Category name is Empty"
    );
    return false;
  }
  if (report_name === "") {
    goAlert.alertErroTo(
      "rpt_doc_mgt_report_maintance_report_name",
      "Entity Failed",
      "Report name is Empty"
    );
    return false;
  }
  let data = {
    p_operation: "INSERT",
    p_category_id: category_id,
    p_report_name: report_name,
    p_code: code,
    p_unit: unit,
    p_report_id: "",
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_report,
    data,
    DocumentMGTfnMaintainReportCallBack,
    "Processing..."
  );
}
function DocumentMGTfnEditReportMaintain() {
  let report_id_obj = table.GetValueSelected("rpt_doc_report_listing");
  if (report_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    return false;
  }
  if (report_id_obj.length > 1) {
    goAlert.alertError(
      "Processing Failed",
      "Operation does not support with multiple selection"
    );
    return false;
  }
  report_id_select = stringCreate.FromObject(report_id_obj);
  let data = {
    p_operation: "GETBYID",
    p_category_id: "",
    p_report_name: "",
    p_code: "",
    p_unit: "",
    p_report_id: report_id_select,
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_report,
    data,
    DocumentMGTfnMaintainEditReportCallBack,
    "Processing..."
  );
}
function DocumentMGTfnMaintainEditReportCallBack(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Successfully", data.message);
    if (data.data_report != null) {
      element.inputValue(
        "rpt_doc_mgt_report_maintance_report_name",
        data.data_report["doc_name"]
      );
      element.inputValue(
        "rpt_doc_mgt_report_maintance_code",
        data.data_report["code"]
      );
      $("#rpt_doc_mgt_report_maintance_category_id")
        .val(data.data_report["category_id"].toString().trim())
        .change();
      $("#rpt_doc_mgt_report_maintenance_unit_code")
        .val(data.data_report["unit"].toString().trim())
        .change();
      $("#rpt_doc_mgt_save_btn").hide();
      const btn_update = $("#rpt_doc_mgt_update_btn");
      const btn_cancel = $("#rpt_doc_mgt_cancel_btn");
      btn_update.show();
      btn_cancel.show();
      btn_update.attr("onclick", "DocumentMGTfnUpdateReportMaintain()");
      btn_cancel.attr("onclick", "DocumentMGTfnCancelReportMaintain()");
      DocumentMGTfnScrollToTop("modal_body");
    }
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
function DocumentMGTfnMaintainReportCallBack(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Successfully", data.message);
    if (data.data_report != null) {
      element.inputValue(
        "rpt_doc_mgt_report_maintance_report_name",
        data.data_report["doc_name"]
      );
      element.inputValue(
        "rpt_doc_mgt_report_maintance_code",
        data.data_report["code"]
      );
      $("#rpt_doc_mgt_report_maintance_category_id")
        .val(data.data_report["category_id"].toString().trim())
        .change();
      $("#rpt_doc_mgt_save_btn").hide();
      $("#rpt_doc_mgt_update_btn").show();
      $("#rpt_doc_mgt_cancel_btn").show();
      $("#rpt_doc_mgt_update_btn").attr(
        "onclick",
        "DocumentMGTfnUpdateReportMaintain()"
      );
      $("#rpt_doc_mgt_cancel_btn").attr(
        "onclick",
        "DocumentMGTfnCancelReportMaintain()"
      );
      DocumentMGTfnScrollToTop("modal_body");
    }
    DocumentMGTfnFirstLoad();
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
let report_id_select = "";
function DocumentMGTfnUpdateReportMaintain() {
  const category_id = $("#rpt_doc_mgt_report_maintance_category_id").val();
  const report_name = $("#rpt_doc_mgt_report_maintance_report_name").val();
  const code = $("#rpt_doc_mgt_report_maintance_code").val();
  const unit = $("#rpt_doc_mgt_report_maintenance_unit_code").val();
  if (category_id === "") {
    goAlert.alertErroTo(
      "rpt_doc_mgt_report_maintance_category_id",
      "Entity Failed",
      "Category name is Empty"
    );
    return false;
  }
  if (report_name === "") {
    goAlert.alertErroTo(
      "rpt_doc_mgt_report_maintance_report_name",
      "Entity Failed",
      "Report name is Empty"
    );
    return false;
  }
  let data = {
    p_operation: "UPDATE",
    p_category_id: category_id,
    p_report_name: report_name,
    p_code: code,
    p_unit: unit,
    p_report_id: report_id_select,
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_report,
    data,
    DocumentMGTfnMaintainReportCallBack,
    "Processing..."
  );
}
function DocumentMGTfnCancelReportMaintain() {
  element.inputValue("rpt_doc_mgt_report_maintance_report_name", "");
  element.inputValue("rpt_doc_mgt_report_maintance_code", "");
  $("#rpt_doc_mgt_report_maintance_category_id")
    .prop("selectedIndex", 0)
    .change();
  $("#rpt_doc_mgt_report_maintenance_unit_code")
    .prop("selectedIndex", 0)
    .change();
  $("#rpt_doc_mgt_save_btn").show();
  $("#rpt_doc_mgt_update_btn").hide();
  $("#rpt_doc_mgt_cancel_btn").hide();
}
function DocumentMGTfnDeleteReportMaintain() {
  let report_id_obj = table.GetValueSelected("rpt_doc_report_listing");
  if (report_id_obj.length === 0) {
    goAlert.alertError("Processing Failed", "No Report ID Selected");
    return false;
  }
  if (report_id_obj.length > 1) {
    goAlert.alertError(
      "Processing Failed",
      "Operation does not support with multiple selection"
    );
    return false;
  }
  report_id_select = stringCreate.FromObject(report_id_obj);
  let data = {
    p_operation: "DELETE",
    p_category_id: "",
    p_report_name: "",
    p_code: "",
    p_unit: "",
    p_report_id: report_id_select,
  };
  CallAPI.Go(
    v_rpt_doc_mgt_maintance_report,
    data,
    DocumentMGTfnMaintainReportCallBack,
    "Processing..."
  );
}
//-------------------end tab doc mappping operation----------------------------------

//-------------------start filter doc management listing------------------------------
function DocMgtFnFilterListing() {
  let arr_unit = $("#rpt_doc_management_filter_unit").val();
  let arr_dep = $("#rpt_doc_management_filter_dep").val();
  let arr_cat = $("#rpt_doc_management_filter_category_doc").val();
  let valRange = $("#rpt_doc_date_date_filter").val();

  let fromDate = subString.FromDateDateRange(valRange);
  let toDate = subString.ToDateDateRange(valRange);
  let dep = arr_dep.map((item) =>
    item.toString().split("~")[1].replace(/'/g, "")
  );
  let unit = arr_unit.map((item) =>
    item.toString().split("~")[1].replace(/'/g, "")
  );
  let cat = arr_cat.map((item) =>
    item.toString().split("~")[1].replace(/'/g, "")
  );

  let data = {
    dep: dep.toString(),
    unit: unit.toString(),
    category: cat.toString(),
    fromDate: fromDate.toString(),
    toDate: toDate.toString(),
  };
  CallAPI.Go(
    v_url_filter_doc_lising,
    data,
    DocMgtFnFilterListingCallback,
    "Processing.."
  );
}
function DocMgtFnFilterListingCallback(data) {
  if (data.status === "1") {
    DocMGTFnApplyDataToTableListing(data.data.list_doc);
  } else {
    goAlert.alertError("Filter data", data.message);
    DocMGTFnApplyDataToTableListing([]);
  }
}

function DocMGTFnFilterDataByDateRange(dataArray, fromDate, toDate) {
  const parsedFromDate = DocMGTFnParseDate(fromDate);
  const parsedToDate = DocMGTFnParseDate(toDate);
  return dataArray.filter((obj) => {
    const date = DocMGTFnParseToDate(
      DocMGTFnParseDate(obj.doc_management_date)
    );
    return (
      date >= DocMGTFnParseToDate(parsedFromDate) &&
      date <= DocMGTFnParseToDate(parsedToDate)
    );
  });
}
function DocMGTFnParseDate(dateString) {
  const parts = dateString.split("-");
  let day = parseInt(parts[0], 10);
  let month, year;
  if (parts.length === 3) {
    month = parts[1];
    year = parseInt(parts[2], 10);
  } else if (parts.length === 2) {
    day = 1;
    month = parts[0];
    year = parseInt(parts[1], 10);
  } else {
    throw new Error("Invalid date format.");
  }
  const formattedDate = day + "-" + month + "-" + year;
  return formattedDate;
}
function DocMGTFnParseToDate(dateString) {
  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const monthAbbreviation = parts[1];
  const year = parseInt(parts[2], 10);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month =
    monthNames.findIndex((name) => name.startsWith(monthAbbreviation)) + 1;
  return new Date(year, month - 1, day);
}

function DocumentMGTfnUploadFile() {
  let files = document.getElementById("rptDocumentManagementFileInput").files;
  if (files.length > 0) {
    DocumentMGTfnGetFileInput(files);
  }
}
let arrFileData = [];
let totalSize = 0;
function DocumentMGTfnGetFileInput(files) {
  if (Array.from(files).length === 0) {
    if (!arrFileData.some((file) => file.name === files.name)) {
      arrFileData.push({
        name: files.name,
        type: files.type,
        size: files.size,
        file: files,
      });
    }
  } else {
    Array.from(files).forEach(function (file) {
      if (
        files.length > 0 &&
        files.length < 16000000 &&
        !arrFileData.some((f) => f.name === file.name)
      ) {
        arrFileData.push({
          name: file.name,
          type: file.type,
          size: file.size,
          file: file,
        });
      }
    });
  }
  let tmpTotalSize = arrFileData.reduce((total, obj) => total + obj.size, 0);
  console.log(tmpTotalSize);
  console.log(totalSize);
  if (tmpTotalSize > 16000000) {
    goAlert.alertError(
      "Files Size",
      "Size of the file is " +
        DocumentMGTfnConvertBytesToMegabytes(tmpTotalSize) +
        " there is bigger than 15MB"
    );
    tmpTotalSize = 0;
    // clear all when bigger then 15mb
    DocumentMGTfnClearAll("FILE");
    const lastIndex = arrFileData.length - 1;
    const lastFileName = arrFileData[lastIndex].name;
    arrFileData = arrFileData.filter(function (item) {
      return item.name !== lastFileName;
    });
  } else {
    totalSize += tmpTotalSize;
    DocumentMGTfnAddRowToTable(arrFileData);
    DocumentMGTfnGetBase64FromFile(arrFileData);
  }
}

function DocumentMGTfnRemoveFileInput(fileName, arrFileData) {
  arrFileData = arrFileData.filter((obj) => obj.name !== fileName);
}
function DocumentMGTfnAddRowToTable(data) {
  // Get the table reference by its ID
  let table = document.getElementById(
    "rptDocumentManagementTableListingFileInput"
  );
  var rowCount = table.rows.length;
  // Remove all existing rows from the table
  for (var i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  for (let i = 0; i < data.length; i++) {
    // Create a new row element
    let newRow = document.createElement("tr");
    // Create cells for each property in the data object
    let nameCell = document.createElement("td");
    let sizeCell = document.createElement("td");
    let btnRmCell = document.createElement("td");
    btnRmCell.style.textAlign = "center";
    btnRmCell.style.border = "none";
    nameCell.style.border = "none";
    sizeCell.style.border = "none";

    // Create icons for the button
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash");
    icon.style.padding = "2px";
    icon.style.fontSize = "15px";
    icon.style.color = "black";
    icon.onmousemove = function () {
      icon.style.color = "red";
    };
    icon.onmouseout = function () {
      icon.style.color = "black";
    };
    icon.onclick = function () {
      DocumentMGTfnRemoveFileInput(data[i].name, data);
      DocumentMGTfnRemoveRow(i, data);
    };
    // Set the cell content based on the data object
    nameCell.textContent = (function () {
      if (data[i].name.length > 40) {
        return data[i].name.substring(0, 40) + "...";
      } else {
        return data[i].name;
      }
    })();
    sizeCell.textContent = DocumentMGTfnConvertBytesToMegabytes(data[i].size);

    // Append the button to the cell
    btnRmCell.appendChild(icon);
    // Append the cells to the new row
    newRow.appendChild(nameCell);
    newRow.appendChild(sizeCell);
    newRow.appendChild(btnRmCell);
    // Append the new row to the table body
    table.appendChild(newRow);
  }
}
function DocumentMGTfnRemoveRow(index, data) {
  try {
    if (data.length > 0) {
      // Remove the element from the data array
      data.splice(index, 1);
      //clear file selection
      document.getElementById("rptDocumentManagementFileInput").value = "";
      // Re-render the table
      DocumentMGTfnAddRowToTable(data);
      // Get base64 new
      DocumentMGTfnGetBase64FromFile(arrFileData);
    } else {
      DocumentMGTfnAddRowToTable("");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}
function DocumentMGTfnConvertBytesToMegabytes(bytes) {
  const megabytes = (bytes / (1024 * 1024)).toFixed(2);
  return megabytes + " MB";
}
let base64StringDoc;
async function DocumentMGTfnGetBase64FromFile(fileInput) {
  base64StringDoc = "";
  let totalSize = fileInput.reduce((total, obj) => total + obj.size, 0);
  if (totalSize <= 0) {
    goAlert.alertError(
      "Files Size",
      "Size of the file is zero please check again!"
    );
    base64StringDoc = "";
    return false;
  }
  if (totalSize > 16000000) {
    goAlert.alertError(
      "Files Size",
      "Size of the file is " +
        DocumentMGTfnConvertBytesToMegabytes(totalSize) +
        "MB there is bigger than 15MB"
    );
    base64StringDoc = "";
    return false;
  }
  processIndicator.Stop();
  if (fileInput.length > 0) {
    $("#btn_update_doc_management").prop("disabled", true);
    $("#btn_insert_doc_management").prop("disabled", true);
    $("#rptDocumentManagementFileInput").prop("disabled", true);
    await DocumentMGTfnReadFileAsBase64(fileInput)
      .then(() => {
        $("#btn_update_doc_management").prop("disabled", false);
        $("#btn_insert_doc_management").prop("disabled", false);
        $("#rptDocumentManagementFileInput").prop("disabled", false);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    $("#btn_update_doc_management").prop("disabled", false);
  }
}
function DocumentMGTfnReadFileAsBase64(files) {
  return new Promise((resolve, reject) => {
    if (files.length === 1) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0].file);
      reader.onload = () => {
        base64StringDoc = reader.result.split(",")[1]; // extract base64 data from result
        resolve(base64StringDoc); // resolve the Promise with the base64 data
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    } else if (files.length > 1) {
      const zip = new JSZip();
      Array.from(files).forEach((file) => {
        zip.file(file.name, file.file);
      });
      zip.generateAsync({ type: "blob" }).then(function (content) {
        // content is a Blob object containing the zipped file
        const reader = new FileReader();
        reader.readAsDataURL(content);
        reader.onload = () => {
          base64StringDoc = reader.result.split(",")[1]; // extract base64 data from result
          resolve(base64StringDoc);
        };
      });
    }
  });
}
async function DocumentMGTfnConvertBase64ToFile(
  base64String,
  filename,
  fileType,
  callback
) {
  const byteCharacters = atob(base64String);
  const byteArrays = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArrays], { type: "application/octet-stream" });
  const file = new File([blob], filename, { type: fileType });

  callback(file);
}
function DocumentMGTfnConvertBase64ToFileCallback(files) {
  const arrFile = [];
  DocumentMGTfnUnzipFileToOriginalFile(files)
    .then((files) => {
      files.forEach((file) => {
        DocumentMGTfnConvertBase64ToFile(
          file.content,
          file.name,
          file.type,
          (f) => {
            arrFile.push(f);
          }
        );
      });
    })
    .finally(() => {
      DocumentMGTfnGetFileInput(arrFile);
    })
    .catch((error) => {
      console.error("Error unzipping files:", error);
    });
}
async function DocumentMGTfnUnzipFileToOriginalFile(zipFile) {
  return new Promise((resolve, reject) => {
    const zip = new JSZip();
    zip
      .loadAsync(zipFile)
      .then((zipData) => {
        const filePromises = [];
        zipData.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir) {
            const filePromise = zipEntry
              .async("base64")
              .then((base64Content) => {
                return {
                  name: zipEntry.name,
                  content: base64Content,
                  size: zipEntry._data.uncompressedSize,
                  date: zipEntry.date,
                  type: DocumentMGTfnGetFileTypeFromExtension(zipEntry.name),
                };
              });
            filePromises.push(filePromise);
          }
        });
        Promise.all(filePromises)
          .then((files) => {
            resolve(files);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function DocumentMGTfnGetFileTypeFromExtension(filename) {
  const extension = filename.split(".").pop().toLowerCase();
  const extensionToTypeMap = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    bmp: "image/bmp",
    tiff: "image/tiff",
    txt: "text/plain",
    csv: "text/csv",
    xml: "text/xml",
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    zip: "application/zip",
  };
  return extensionToTypeMap[extension] || "application/octet-stream";
}
function DocMGTFnUnitSelectChange() {
  $("#rpt_doc_category").prop("selectedIndex", 0).change();
}
function DocumentMGTfnOpenModuleForSummaryReport() {
  modals.OpenStatic("modal_summary_report");
  selectionStyle.LiveSearch("rpt_doc_year_filter", option_year);
  DocMGTFnGetSummaryReport();
}
function DocMGTFnGetSummaryReport() {
  let year = $("#rpt_doc_year_filter").val();
  CallAPI.Go(
    v_rpt_doc_mgt_get_doc_summary,
    { summaryYear: year },
    DocMGTFnGetSummaryReportCallback,
    "Processing..."
  );
}
function DocMGTFnGetSummaryReportCallback(data) {
  if ((data.status = "1")) {
    dataTable.Recal();
    DocMGTFnApplyDataToTableSummary(data.data.listSummary);
  }
}
function DocMGTFnRenderIconByStatus(month) {
  var isChecked = month.toString().toUpperCase() === "YES";
  var iconClass = isChecked ? "fas fa-check" : "fas fa-times";
  var iconColor = isChecked ? "blue" : "red";
  return `<i style='margin-left:25%; color: ${iconColor};' class='${iconClass}'></i>`;
}
function DocMGTFnApplyDataToTableSummary(data) {
  if (Array.isArray(data) && data.length > 0) {
    let columns = [
      { data: "docId" },
      { data: "docName" },
      {
        data: "jan",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "feb",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "mar",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "apr",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "may",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "jun",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "jul",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "aug",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "sep",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "oct",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "nov",
        render: DocMGTFnRenderIconByStatus,
      },
      {
        data: "dec",
        render: DocMGTFnRenderIconByStatus,
      },
      { data: "unit" },
      { data: "docCode" },
      { data: "docFrequency" },
      {
        data: "",
        render: function () {
          return "";
        },
      },
    ];
    dataTable.ApplyJson("rpt_doc_summary_listing", columns, data);
  }
}
function DocMGTFnDepartmentFilterSelect() {
  const departement = $("#rpt_doc_management_filter_dep")
    .val()
    .toString()
    .split("~");

  selectionStyle.MultipleInline(
    "rpt_doc_management_filter_unit",
    '<option value=""></option>'
  );
  selectionStyle.MultipleInline(
    "rpt_doc_management_filter_category_doc",
    option_doc_category
  );
  let option_unit = "<option value=''></option>";

  $.each(DocMGTListCategory.data.listDocCategory, function (i, item) {
    if (item.type === "UNIT" && item.dep_id === departement[0]) {
      if (i == 0) {
        option_unit = '<option value=""></option>';
        option_unit +=
          '<option value="' +
          item.doc_category_id +
          "~" +
          item.doc_category_name +
          "~" +
          item.sub_category +
          '">' +
          item.doc_category_name +
          "</option>";
      } else {
        option_unit +=
          '<option value="' +
          item.doc_category_id +
          "~" +
          item.doc_category_name +
          "~" +
          item.sub_category +
          '">' +
          item.doc_category_name +
          "</option>";
      }
    }
  });
  selectionStyle.MultipleInline("rpt_doc_management_filter_unit", option_unit);
}
function DocMgtFnGetFileExtension(filename) {
    return filename.split('.').pop();
}
function applyCustomStyle() {
    // Check if select2 is applied
    $('.select2').each(function () {
        if ($(this).hasClass('select2')) {
            // Apply custom style
            $(this).addClass('custom-style');
        }
    });
}
applyCustomStyle();
