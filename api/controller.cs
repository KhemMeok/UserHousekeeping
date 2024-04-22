using ITOAPP_API.Helpers;
using Microsoft.AspNetCore.Mvc;
using static ITOAPP_API.Models.RPTBIHouseKeepingModel;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System;

namespace ITOAPP_API.Controllers
{
    [ApiController]
    public class RPTBIHouseKeepingController : ControllerBase
    {
        [Route("api/v1/RptBIHouseKeeping/GetDataFromExcelFile")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetDataFromExcelFile(ReqDataGetDataFromExcelFile param)
        {
            ResGetDataFromExcelFile res = await RPTBIHouseKeepingService.RptBIHkpGetDataFromExcel(param);
            return Ok(res);
        }
        [Route("api/v1/RptBIHouseKeeping/GetDataBIUser")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetDataBIUser()
        {
            ResDataGetBIUser res = await RPTBIHouseKeepingService.RptBIHkpGetDataBIUser();
            return Ok(res);
        }
        [Route("api/v1/RptBIHouseKeeping/InsertUserBIPreClose")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> InsertUserPreClose(ReqInsertUserBIPreClose param)
        {
            ResInsertUserPreCloseToTable res = await RPTBIHouseKeepingService.RptBIHkpInsertUserPreCloseToTable(param);
            return Ok(res);
        }
        [Route("api/v1/RptBIHouseKeeping/InsertProcessStep")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> InsertProcessStep(ReqDataInsertProcessStep param)
        {
            ResInsertProcessStep res = await RPTBIHouseKeepingService.RptBIHkpInsertProcessStep(param);
            return Ok(res);
        }
        [Route("api/v1/RptBIHouseKeeping/GetProcessStep")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetProcessStep(ReqDataGetProcessStep param)
        {
            ResGetProcessStep res = await RPTBIHouseKeepingService.RptBIHkpGetProcessStep(param);
            return Ok(res);
        }
        [Route("api/v1/RptBIHouseKeeping/GetReportBIInactive")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetReportBIInactive(ReqDataGetUserBIInactive param)
        {
            ResDataGetReportBIInactive res = await RPTBIHouseKeepingService.RptBIHkpGetReportBIInactive(param);
            return Ok(res);
        }
        [Route("api/v1/RptBIHouseKeeping/GetReportBIDeletion")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetReportBIDeletion(ReqDataGetUserBIDeletion param)
        {
            ResDataGetUserBIDeletion res = await RPTBIHouseKeepingService.RptBIHkpGetReportBIDeletion(param);
            return Ok(res);
        }
        [Route("api/v1/RptBIHouseKeeping/GetDataFromExcelFileWithOLED")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetDataFromExcelFileWithOLEDB(ReqGetDataFromExcelWithOled param)
        {
            DataGetFromExcelFileTmp res = new DataGetFromExcelFileTmp();
            var data = await RPTBIHouseKeepingService.ReadExcelFile(Convert.FromBase64String(param.fileData), param.sheetName);
            List<DataGetFromExcelFile> dataList = new List<DataGetFromExcelFile>();
            foreach (DataRow dr in data.Rows)
            {
                DataGetFromExcelFile d = new DataGetFromExcelFile();
                d.staffId = dr[1].ToString();
                dataList.Add(d);
            }
            res.status = "1";
            res.data = dataList;
            if (res.status == "1")
            {
                return Ok(res);
            }
            else
            {
                return Ok(res.exception = "Error");
            }

        }
        [Route("api/v1/RptBIHouseKeeping/GetDataFromExcelFileWithOLED2")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetDataFromExcelFileWithOLEDB2(ReqGetDataFromExcelWithOled param)
        {
            var data = await RPTBIHouseKeepingService.RptBIHkpGetDataFromExcelWithOLED(Convert.FromBase64String(param.fileData), param.sheetName, param.fDate, param.tDate);
            return Ok(data);
        }
        [Route("api/v1/RptBIHouseKeeping/SentEmailInformUserInactive")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SentEmilInformUserInactive(ReqSendEmailInformUser param)
        {
            var data = await RPTBIHouseKeepingService.RptBIHkpSentEmailInformUser(param);
            return Ok(data);
        }
        [Route("api/v1/RptBIHouseKeeping/GetOldUserPreClose")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetOldUserPreClose(ReqGetOldUserPreClose param)
        {
            return Ok(await RPTBIHouseKeepingService.RptBIHkpGetOldUserPreClose(param));
        }
        [Route("api/v1/RptBIHouseKeeping/GetAllProcessStatus")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetAllProcessStatus(ReqGetProcessStatus param)
        {
            return Ok(await RPTBIHouseKeepingService.RptBIHkpGetProcessStatus(param));

        }
        [Route("api/v1/RptBIHouseKeeping/GetListingDBUserHousekeeping")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetListingDBUserHousekeeping(ReqGetListingDBUserHousekeeping param)
        {
            return Ok(await RPTBIHouseKeepingService.RptDbUserHousekeepingListing(param));
        }
        [Route("api/v1/RptBIHouseKeeping/GenDBUserHousekeeping")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GenDBUserHousekeeping(ReqGenDBUserHousekeeping param)
        {
            return Ok(await RPTBIHouseKeepingService.RptDbGenUserHousekeeping(param));
        }
        [Route("api/v1/RptBIHouseKeeping/InsertProcessStatus")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> InsertProcessStatus(ReqInsertProcessStatus param)
        {
            return Ok(await RPTBIHouseKeepingService.RptUserHkpInsertProcessStatus(param));
        }
        [Route("api/v1/RptBIHouseKeeping/GetUserInactive")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetUserInactive(ReqGetBIUserInactive param)
        {
            return Ok(await RPTBIHouseKeepingService.RptBIHkpGetBIUserInactive(param));
        }
        [Route("api/v1/RptBIHouseKeeping/BIUserInactiveOperation")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> BIUserInactiveOperation(ReqForBIUserInactiveOperation param)
        {
            return Ok(await RPTBIHouseKeepingService.RptBIHkpBIUserInactiveOperation(param));
        }
        [Route("api/v1/RptBIHouseKeeping/CloseBIInactive")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> closeBIInactiveUserHousekeeping(ReqCloseUserBIInactive param)
        {
            return Ok(await RPTBIHouseKeepingService.closeBIInactiveUserHousekeeping(param));
        }
        [Route("api/v1/RptBIHouseKeeping/GetBIDeletionListing")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetBIDeletionListing(reqGetBIUserDeletionListing param)
        {
            return Ok(await RPTBIHouseKeepingService.getUserBIDeletionListing(param));
        }
    }
}
