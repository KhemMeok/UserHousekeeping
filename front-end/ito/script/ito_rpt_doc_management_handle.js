/// <reference path="ito_core.js" />
/// <reference path="ito_content_validator.js" />

function DocumentMGTfnDeleteDocumentCallBack(data) {
  if (data.status === "1") {
    goAlert.alertInfo("Successfully", data.message);
    DocumentMGTfnFirstLoad();
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
function DocumentMGTfnScrollToTop(id) {
  if (id === undefined) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    $("#" + id).animate({ scrollTop: 0 }, "smooth");
  }
}
async function DocumentMGTfnEditDocumentCallBack(data) {
    if (data.status === "1") {
        console.log(data);
    $("#rpt_doc_departement")
      .val(data.data.listEditDocManagement.doc_management_department)
      .change();
    $("#rpt_doc_unit_departement")
      .val(
        data.data.listEditDocManagement.doc_management_unit.toString().trim()
      )
      .change();
    let category = $("#rpt_doc_category");
    category
      .val(data.data.listEditDocManagement.doc_category_name.toString().trim())
      .change();
    if (category.val() !== "") {
      DocumentMGTfnShowReportNameAndCode().finally(() => {
        $("#rpt_doc_name")
          .val(
            data.data.listEditDocManagement.doc_management_name
              .toString()
              .trim()
          )
          .change();
      });
    }
    if (category.val() !== "" && category.val() !== undefined) {
      DocumentMGTfnShowReportNameAndCode(function (data) {
        if (data !== undefined) {
          $("#rpt_doc_name")
            .val(
              data.data.listEditDocManagement.doc_category_name
                .toString()
                .trim()
            )
            .change();
        }
      }, $("#rpt_doc_category").val());
    }
    element.inputValue(
      "rpt_doc_code",
      data.data.listEditDocManagement.doc_management_code
    );
    element.inputValue(
      "rpt_doc_date",
      data.data.listEditDocManagement.doc_management_date
    );
    element.inputValue(
      "rpt_doc_remark",
      data.data.listEditDocManagement.doc_remark
    );
    DocumentMGTfnScrollToTop();
    processIndicator.Start();
    await DocumentMGTfnConvertBase64ToFile(
      data.data.listEditDocManagement.docMGTDocFile,
      data.data.listEditDocManagement.docMGTDocName,
      data.data.listEditDocManagement.docMGTDocType,
      (file) => {
        const arrFile = [];
        if (
          file.type === "application/zip" ||
          file.type === "application/x-zip-compressed"
        ) {
          DocumentMGTfnUnzipFileToOriginalFile(file)
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
        } else {
          DocumentMGTfnGetFileInput(file);
        }
      }
    )
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
function DocMGTGetDataTbListing() {
  CallAPI.Go(
    v_rpt_doc_managementGetDataTbListing,
    undefined,
    DocMGTFnGetDataTbListingCallBack,
    "Processing.."
  );
}
let listDocManagement = "";
function DocMGTFnGetDataTbListingCallBack(data) {
  if (data.status === "1") {
    DocumentMGTfnGetCategory();
    listDocManagement = data;
    DocMGTFnApplyDataToTableListing(data.data.listDocManagement);
  }
}
function DocMGTFnApplyDataToTableListing(data) {
  let columns = [
    {
      data: "doc_management_id",
      render: function (doc_management_id) {
        return (
          "<input type='checkbox' style='margin-left:25%;' value='" +
          doc_management_id +
          "' />"
        );
      },
      sortable: false,
    },
    { data: "doc_management_id" },
    { data: "doc_management_department" },
    { data: "doc_management_unit" },
    { data: "doc_management_code" },
    { data: "doc_management_name" },
    { data: "doc_management_date" },
    { data: "doc_category_name" },
    { data: "upload_by_id" },    
      { data: "upload_date" },    
    { data: "doc_name" },
      { data: "file_path" },
      { data: "last_oper_id" },
    { data: "last_oper_date" },
    { data: "doc_remark" },
    { data: "doc_state" },
    {
      data: "",
      render: function () {
        return "";
      },
    },
  ];
  dataTable.ApplyJson("rpt_doc_management", columns, data);
}
let option_doc_category = "";
let option_unit_maintenance = "";
let option_department = "";
let option_unit = "";
let option_year = "";
let DocMGTListCategory = "";
function DocumentMGTfnDocumentFirstLoadCallBack(data) {
  option_doc_category = '<option value=""></option>';
  option_category_maintance = '<option value=""></option>';
  option_department = '<option value=""></option>';
  option_unit = '<option value=""></option>';
  option_unit_maintenance = '<option value=""></option>';
  option_year = '<option value=""></option>';
  if (data.status === "1") {
    DocMGTListCategory = data;
    DocMGTGetDataTbListing();
    $.each(data.data.listDocCategory, function (i, item) {
      if (item.type === "CAT") {
        option_doc_category =
          option_doc_category +
          '<option value="' +
          item.doc_category_id +
          "~" +
          item.doc_category_name +
          '">' +
          item.doc_category_name +
          "</option>";
      } else if (item.type === "DEP") {
        option_department =
          option_department +
          '<option value="' +
          item.doc_category_id +
          "~" +
          item.doc_category_name +
          '">' +
          item.doc_category_name +
          "</option>";
      } else if (item.type === "UNIT") {
        option_unit =
          option_unit +
          '<option value="' +
          item.doc_category_id +
          "~" +
          item.doc_category_name +
          "~" +
          item.sub_category +
          '">' +
          item.doc_category_name +
          "</option>";
        option_unit_maintenance +=
          '<option value="' +
        item.doc_category_id +
          '">' +
          item.doc_category_name +
          "</option>";
      } else if (item.type === "YEAR") {
        option_year =
          option_year +
          '<option value="' +
          item.doc_category_name +
          '">' +
          item.doc_category_name +
          "</option>";
      }
    });
    selectionStyle.LiveSearch("rpt_doc_category", option_doc_category);
    selectionStyle.LiveSearch("rpt_doc_unit_departement", option_unit);
    selectionStyle.LiveSearch("rpt_doc_departement", option_department);

    selectionStyle.MultipleInline(
      "rpt_doc_management_filter_dep",
      option_department
    );
    selectionStyle.MultipleInline(
      "rpt_doc_management_filter_unit",
      "<option value=''></option>"
    );
    selectionStyle.MultipleInline(
      "rpt_doc_management_filter_category_doc",
      option_doc_category
    );

    $.each(data.data.listDocCategory, function (i, item) {
      if (item.type === "CAT") {
        if (i === 0) {
          option_category_maintance = '<option value=""></option>';
          option_category_maintance +=
            '<option value="' +
            item.doc_category_id +
            '">' +
            item.doc_category_name +
            "</option>";
        } else {
          option_category_maintance +=
            '<option value="' +
            item.doc_category_id +
            '">' +
            item.doc_category_name +
            "</option>";
        }
      }
    });
  } else {
    goAlert.alertError("Processing Failed", data.message);
  }
}
function DocumentMGTfnSaveNewDocumentCallBack(data) {
  if (data.status === "1") {
    DocumentMGTfnUploadDocumentToSFTP(data.file_name, data.file_path);
  } else {
    goAlert.alertError("Failed", data.message);
  }
}
