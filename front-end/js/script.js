var _date_time_now = "";

// api url
var url_get_process_step = "https://localhost:8000/api/v1/RPTUserHousekeeping/RetrieveProcessStep";

function rpt_iau_get_date_time_now() {
  const now = new Date();
  const day = now.getDate();
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  return `${month}-${year}`;
}

$(document).ready(function () {
  $("#external-content").load("page/operation.html");
  setTimeout(() => {
    fn_show_page('operation.html');
  }, 500);
});
function fn_show_page(_page_name) {
  $("#external-content").load("page/" + _page_name);

  setTimeout(() => {
    fn_apply_date_2_input();
    if (_page_name != 'operation.html') {
      rpt_iau_fn_apply_data_to_table_bi_user_inactive_rev_app([]);

    } else {
      rpt_iau_fn_apply_data_to_table_bi_user_inactive([]);
      rpt_iau_fn_apply_data_to_table_user_deletion([]);
      iau_fn_apply_data_to_tb_bi_user_update_status([]);
    }
  }, 1000);

}


function fn_apply_date_2_input() {
  _date_time_now = rpt_iau_get_date_time_now();
  const _dateApprove = $("#iau_report_date_approve_scr");
  const _dateOperation = $("#bi_date_report_ele_id");
  const _dateListing = $("#rang_date_id_iau");

  if (_dateApprove.length) {
    const currentDate = _dateApprove.val();
    if (currentDate !== _date_time_now) {
      _dateApprove.val(_date_time_now);
    }
  } else {
    console.log("Element #iau_report_date_approve_scr not found.");
  }

  if (_dateOperation.length) {
    const currentDate = _dateOperation.val();
    if (currentDate !== _date_time_now) {
      _dateOperation.val(_date_time_now);
    }
  } else {
    console.log("Element #bi_date_report_ele_id not found.");
  }

  if (_dateListing.length) {
    const currentDate = _dateListing.val();
    if (currentDate !== _date_time_now) {
      _dateListing.val(_date_time_now);
    }
  } else {
    console.log("Element #rang_date_id_iau not found.");
  }
}

function callApi(url, data, callback) {
  // Create a request options object
  const requestOptions = {
    method: 'POST', // or 'GET' depending on your API
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Convert data object to JSON string
  };

  // Make the API call
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      // Call the callback function with the response data
      callback(data);
    })
    .catch(error => {
      // Call the callback function with the error
      callback(error);
    });
}










