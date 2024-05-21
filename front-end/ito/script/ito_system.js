/// <reference path="ito_core.js" />

var System = {
    Event: function (Event_Name, Any_Text) {
        myRequest.Execute("ACTIONS/Controllers/system/wsSystem.asmx/EventLog", {
            user: STAFF_ID,
            eventname: Event_Name,
            anytext: Any_Text
        },
            fnLog)
    }
};
function fnLog() {

}