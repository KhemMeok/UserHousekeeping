using Microsoft.AspNetCore.Mvc;
using static iau_api.RPTBIHouseKeepingService;
using static iau_api.RPTUserHousekeepingModel;

namespace iau_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RPTUserHousekeepingController : ControllerBase
    {
        [HttpPost("RetrieveProcessStep")]
        public async Task<IActionResult> RetrieveProcessStep(ReqDataGetProcessStep param)
        {
            return Ok(await RptBIHkpGetProcessStep(param));
        }
        [HttpPost("RetrieveNotify")]
        public async Task<IActionResult> RetrieveNotify(reqGetNotifi param)
        {
            return Ok(await getNotifyAll(param));
        }
    }

}
