/// <reference path="ito_core.js" />
// screen validation 

function aclFnReqConUser(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    selectionStyle.LiveSearch("ACL_REQ_REV1", newData);
    selectionStyle.LiveSearch("ACL_REQ_REV2", newData);
    selectionStyle.LiveSearch("ACL_REQ_REV3", newData);
    selectionStyle.LiveSearch("ACL_REQ_APP", newData);
};
function aclFnReqConApp(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    selectionStyle.LiveSearch("ACL_REQ_CON_APP", newData);
};
function aclFnConReqInstanceSl(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    selectionStyle.LiveSearch("ACL_REQ_CON_INSTANCE_NAME", newData);
};
function aclFnReqConReqType(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    selectionStyle.LiveSearch("ACL_REQ_TYPE", newData);
};
function aclFnReqConTicketNo(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    selectionStyle.LiveSearch("ACL_REQ_TICKET_NO", newData);
};
function aclFnReqConUserLogs(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    dataTable.Apply("TBL_ACL_USER_LOG", newData);
   
};
function aclFnReqConUserReq(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    dataTable.Apply("TBL_GET_DATA_ACL_REQ_CONTROL", newData);
};
function aclFnReqConUserRev(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    dataTable.Apply("TBL_GET_DATA_ACL_REV_CONTROL", newData);
};
function aclFnReqConUserApp(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    dataTable.Apply("TBL_GET_DATA_ACL_APP_CONTROL", newData);
};
function aclFnConReqHostSl(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    selectionStyle.LiveSearch("ACL_REQ_CON_HOSTNAME", newData);
};
function aclFnConReqTicketJustSl(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
	newData=newData.replace(/\|/g, " ");
    $("#ACL_REQ_SUMMARY").val(newData);
};
function aclFnConReqRequestUserSl(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    selectionStyle.LiveSearch("ACL_REQ_CON_USER", newData);
};
function aclFnConReqDeleteLogs(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Delete request log", newData)
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_USER_LOG|" + STAFF_ID, table_id:"TBL_ACL_USER_LOG" }, aclFnReqConUserLogs);
};
function aclFnConReqSaveLogs(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Insert log", newData)
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_USER_LOG|" + STAFF_ID, table_id:"TBL_ACL_USER_LOG" }, aclFnReqConUserLogs);
};
function aclFnConReqSend(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Send request access", newData)
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_USER_LOG|" + STAFF_ID, table_id:"TBL_ACL_USER_LOG" }, aclFnReqConUserLogs);
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REQ_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_REQ_CONTROL" }, aclFnReqConUserReq);
};
function aclFnConReqCancel(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Cancel request", newData)
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REQ_ACCESS|" + STAFF_ID, table_id:"TBL_GET_DATA_ACL_REQ_CONTROL" }, aclFnReqConUserReq);
};
function aclFnConReqAppReq(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Approve request", newData)
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_APP_ACCESS|" + STAFF_ID, table_id:"TBL_GET_DATA_ACL_APP_CONTROL" }, aclFnReqConUserApp);
};
function aclFnConReqCheckInOut(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Checking / Checkout request", newData)
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REQ_ACCESS|" + STAFF_ID, table_id:"TBL_GET_DATA_ACL_REQ_CONTROL" }, aclFnReqConUserReq);
};
function aclFnConReqRejByRev(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Reject request", newData);
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REV_ACCESS|" + STAFF_ID, table_id:"TBL_GET_DATA_ACL_REV_CONTROL" }, aclFnReqConUserRev);
};
function aclFnConReqRejByApp(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Reject request", newData);
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_APP_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_APP_CONTROL" }, aclFnReqConUserApp);
};
function aclFnConReqRevReq(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Review request", newData);
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REV_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_REV_CONTROL" }, aclFnReqConUserRev);
};
function aclFnConReqSlAdj(respond_data) {
    modals.Open("MODAL_ACL_ADJUST");
    var newXml = jqueryXml.Find("htmlData", respond_data);
    var wksfrom = readFiles.Xml("WksFrom", newXml);
    var wksto = readFiles.Xml("WksTo", newXml);
    var checkin = readFiles.Xml("CheckIn", newXml);
    var checkout = readFiles.Xml("CheckOut", newXml);
    checkin = (checkin == "N/A") ? "" : checkin;
    checkout = (checkout == "N/A") ? "" : checkout;
    element.inputValue("ACL_REQ_ADJ_WSCHFROM", wksfrom);
    element.inputValue("ACL_REQ_ADJ_WSCHTO", wksto);
    element.inputValue("ACL_REQ_ADJ_CHECKIN", checkin);
    element.inputValue("ACL_REQ_ADJ_CHECKOUT", checkout);
};
function aclFnConReqAdjust(respond_data) {
    var newData = jqueryXml.Find("htmlData", respond_data);
    goAlert.alertInfo("Access Log Adjustment", newData)
    myRequest.Execute(aclSelectDataUrl, { DATA: "ACL_REQ_ACCESS|" + STAFF_ID, table_id: "TBL_GET_DATA_ACL_REQ_CONTROL" }, aclFnReqConUserReq);
};
