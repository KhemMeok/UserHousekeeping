namespace iau_api;

using System.Data;
using System.Text.Json;
using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using static RPTUserHousekeepingModel;

public class RPTBIHouseKeepingService
{
    public static string connection()
    {
        return new GetConnectionStr().getConnection();
    }
    // public static async Task<ResInsertUserPreCloseToTable> RptBIHkpInsertUserPreCloseToTable(ReqInsertUserBIPreClose param)
    // {
    //     ResInsertUserPreCloseToTable res = new ResInsertUserPreCloseToTable();
    //     OracleConnection conn = new OracleConnection();
    //     conn.ConnectionString = connection(); //connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment //TODO: uncomment
    //     OracleCommand cmd = new OracleCommand();
    //     cmd.Connection = conn;
    //     OracleClob msgclob;
    //     try
    //     {
    //         conn.Open();
    //         cmd.CommandText = "RPT_BI_REPORT.insert_bi_user_close";
    //         cmd.CommandType = CommandType.StoredProcedure;
    //         cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
    //         cmd.Parameters.Add("P_DEBUG", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
    //         cmd.Parameters.Add("op_date_report", OracleDbType.Varchar2).Value = param.date.ToString();
    //         cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
    //         cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
    //         cmd.ExecuteNonQuery();
    //         msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
    //         res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
    //         res.message = msgclob.Value.ToString();
    //         res.insertCount = cmd.Parameters["OP_STATUS"].Value.ToString().Split(" ")[0].ToString();
    //     }
    //     catch (Exception ex)
    //     {
    //         //Core.DebugError(ex); // TODO: Uncomment
    //     }
    //     finally
    //     {
    //         cmd.Dispose();
    //         conn.Close();
    //         conn.Dispose();
    //     }
    //     return await Task.FromResult(res);
    // }
    // public static async Task<DataGetFromExcelFileTmp> RptBIHkpGetDataFromExcelWithOLED(byte[] excelData, string sheetName, string fromDate, string toDate)
    // {
    //     DataGetFromExcelFileTmp res = new DataGetFromExcelFileTmp();
    //     DataGetFromExcelFile data = new DataGetFromExcelFile();
    //     List<DataGetFromExcelFile> dataListUser = new List<DataGetFromExcelFile>();
    //     DateTime fDate = DateTime.ParseExact(fromDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture);
    //     DateTime tDate = DateTime.ParseExact(toDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture);
    //     DataTable dataTable = new DataTable();

    //     try
    //     {
    //         // Implement ReadExcelFile method or replace it with your own implementation
    //         dataTable = await ReadExcelFile(excelData, sheetName);
    //         if (dataTable != null)
    //         {
    //             foreach (DataRow dr in dataTable.Rows)
    //             {
    //                 if (dr[1].ToString() != "")
    //                 {
    //                     DataGetFromExcelFile d = new DataGetFromExcelFile();
    //                     d.brn = dr[6].ToString().Length > 3 || dr[6].ToString() == "" ? "000" : dr[6].ToString();
    //                     d.staffId = dr[1].ToString();
    //                     d.staffName = dr[2].ToString();
    //                     if (double.TryParse(dr[9].ToString(), out double effectiveDateValue))
    //                     {
    //                         d.effectiveDate = DateTime.FromOADate(effectiveDateValue).ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture);
    //                     }
    //                     d.typeClose = "USER RESIGNED";
    //                     d.reportDate = DateTime.Now.ToString("dd-MMM-yyyy");
    //                     dataListUser.Add(d);
    //                 }
    //             }
    //         }
    //         dataListUser = dataListUser.Where(d =>
    //         {
    //             if (DateTime.TryParseExact(d.effectiveDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime effectiveDateTime))
    //             {
    //                 return effectiveDateTime >= fDate && effectiveDateTime <= tDate;
    //             }
    //             else
    //             {
    //                 return false;
    //             }
    //         }).ToList();

    //         res.data = dataListUser;
    //         res.status = "1";
    //         res.exception = "No";
    //     }
    //     catch (Exception ex)
    //     {
    //         //Core.DebugError(ex); // TODO: Uncomment
    //         res.exception = ex.Message;
    //     }

    //     return await Task.FromResult<DataGetFromExcelFileTmp>(res);
    // }
    // public static async Task<DataTable> ReadExcelFile(byte[] excelData, string sheetName)
    // {
    //     DataTable dataTable = new DataTable();

    //     using (MemoryStream stream = new MemoryStream(excelData))
    //     {
    //         using (SpreadsheetDocument document = SpreadsheetDocument.Open(stream, false))
    //         {
    //             WorkbookPart workbookPart = document.WorkbookPart;
    //             Sheet sheet = workbookPart.Workbook.Descendants<Sheet>().FirstOrDefault(s => s.Name == sheetName);

    //             if (sheet != null)
    //             {
    //                 WorksheetPart worksheetPart = (WorksheetPart)workbookPart.GetPartById(sheet.Id);
    //                 SheetData sheetData = worksheetPart.Worksheet.Elements<SheetData>().First();

    //                 // Get the first row to extract column names
    //                 Row headerRow = sheetData.Elements<Row>().FirstOrDefault();

    //                 if (headerRow != null)
    //                 {
    //                     foreach (Cell headerCell in headerRow.Elements<Cell>())
    //                     {
    //                         string columnName = GetCellValue(headerCell, workbookPart);

    //                         DataColumn dataColumn = new DataColumn(columnName);
    //                         dataTable.Columns.Add(dataColumn);
    //                     }
    //                 }

    //                 // Iterate over the remaining rows and import data
    //                 foreach (Row row in sheetData.Elements<Row>().Skip(1))
    //                 {
    //                     DataRow dataRow = dataTable.NewRow();
    //                     int columnIndex = 0;

    //                     foreach (Cell cell in row.Elements<Cell>())
    //                     {
    //                         string cellValue = GetCellValue(cell, workbookPart);

    //                         if (columnIndex >= dataTable.Columns.Count)
    //                         {
    //                             // Add a new column to the dataTable if columnIndex exceeds the current number of columns
    //                             string columnName = "Column" + (columnIndex + 1);
    //                             //DataColumn dataColumn = ;
    //                             dataTable.Columns.Add(new DataColumn(columnName));
    //                         }

    //                         DataColumn dataColumn = dataTable.Columns[columnIndex];
    //                         dataRow[dataColumn] = cellValue;

    //                         columnIndex++;
    //                     }

    //                     dataTable.Rows.Add(dataRow);
    //                 }
    //             }
    //         }
    //     }

    //     return await Task.FromResult<DataTable>(dataTable);
    // }
    // private static string GetCellValue(Cell cell, WorkbookPart workbookPart)
    // {
    //     string value = cell.CellValue?.InnerText;

    //     if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
    //     {
    //         SharedStringTablePart sharedStringPart = workbookPart.SharedStringTablePart;
    //         if (sharedStringPart != null)
    //         {
    //             value = sharedStringPart.SharedStringTable.ChildElements[int.Parse(value)].InnerText;
    //         }
    //     }

    //     return value;
    // }
    // public static async Task<ResDataGetBIUser> RptBIHkpGetDataBIUser()
    // {
    //     ResDataGetBIUser resData = new ResDataGetBIUser();
    //     List<string> userId = new List<string>();
    //     OracleConnection conn = new OracleConnection();
    //     conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
    //     OracleCommand cmd = new OracleCommand();
    //     cmd.Connection = conn;
    //     OracleClob msgclob;
    //     try
    //     {
    //         conn.Open();
    //         cmd.CommandText = "RPT_BI_REPORT.GET_BI_USER";
    //         cmd.CommandType = CommandType.StoredProcedure;
    //         cmd.Parameters.Add("OP_DATA_DOC_LISTING", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
    //         cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
    //         cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
    //         cmd.ExecuteNonQuery();
    //         resData.status = cmd.Parameters["OP_STATUS"].Value.ToString();
    //         msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
    //         resData.message = msgclob.Value.ToString();
    //         msgclob.Dispose();
    //         if (resData.status == "1")
    //         {
    //             OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["OP_DATA_DOC_LISTING"].Value;
    //             OracleDataAdapter ODA1 = new OracleDataAdapter();
    //             DataSet ds1 = new DataSet();
    //             DataTable dt1 = new DataTable();
    //             ODA1.Fill(ds1, ORC1);
    //             dt1 = ds1.Tables[0];
    //             foreach (DataRow dr in dt1.Rows)
    //             {
    //                 userId.Add(dr[0].ToString());
    //             }
    //             resData.userId = userId;
    //             dt1.Dispose();
    //             ds1.Dispose();
    //             ODA1.Dispose();
    //             ORC1.Dispose();
    //         }
    //     }
    //     catch (Exception ex)
    //     {
    //         resData.status = "-1";
    //         resData.message = ex.ToString();
    //         //Core.DebugError(ex); // TODO: Uncomment
    //     }
    //     finally
    //     {
    //         cmd.Dispose();
    //         conn.Close();
    //         conn.Dispose();
    //     }
    //     return await Task.FromResult<ResDataGetBIUser>(resData);
    // }
    public static async Task<ResDataGetUserBIInactive> RptBIHkpGetUserBIInactive(ReqDataGetUserBIInactive param)
    {
        ResDataGetUserBIInactive res = new ResDataGetUserBIInactive();
        List<DataGetFromExcelFile> ListUserInactive = new List<DataGetFromExcelFile>();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.GET_BI_USER_INACTIVE";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_DATE_REPORT", OracleDbType.Varchar2).Value = param.fromDate.ToString();
            cmd.Parameters.Add("OP_DATA_BI_USER", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();
            if (res.status == "1")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["OP_DATA_BI_USER"].Value;
                OracleDataAdapter ODA1 = new OracleDataAdapter();
                DataSet ds1 = new DataSet();
                DataTable dt1 = new DataTable();
                ODA1.Fill(ds1, ORC1);
                dt1 = ds1.Tables[0];
                foreach (DataRow dr in dt1.Rows)
                {
                    DataGetFromExcelFile d = new DataGetFromExcelFile();
                    d.brn = dr[0].ToString();
                    d.staffId = dr[1].ToString();
                    d.staffName = dr[2].ToString();
                    d.typeClose = dr[3].ToString();
                    d.reportDate = dr[4].ToString();
                    ListUserInactive.Add(d);
                }
                res.userInactive = ListUserInactive;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();
            }
        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    public static async Task<ResDataGetReportBIInactive> RptBIHkpGetReportBIInactive(ReqDataGetUserBIInactive param)
    {
        ResDataGetReportBIInactive res = new ResDataGetReportBIInactive();
        List<DataReportInactive> rptBIInactive = new List<DataReportInactive>();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        //OracleClob proStaClob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.GENERATE_REPORT_BI_HOUSEKEEPING";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("P_DEBUG", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
            cmd.Parameters.Add("p_from_date", OracleDbType.Varchar2).Value = param.fromDate.ToString();
            cmd.Parameters.Add("p_to_date", OracleDbType.Varchar2).Value = param.toDate.ToString();
            cmd.Parameters.Add("P_TYPE_USED", OracleDbType.Varchar2).Value = param.type.ToString();
            cmd.Parameters.Add("OP_DATA_BI_HOUSEKEEPING", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();
            if (res.status == "1")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["OP_DATA_BI_HOUSEKEEPING"].Value;
                OracleDataAdapter ODA1 = new OracleDataAdapter();
                DataSet ds1 = new DataSet();
                DataTable dt1 = new DataTable();
                ODA1.Fill(ds1, ORC1);
                dt1 = ds1.Tables[0];
                var autoIds = 1;
                foreach (DataRow dr in dt1.Rows)
                {
                    DataReportInactive d = new DataReportInactive();
                    d.id = Convert.ToString(autoIds++);
                    d.brn = dr[1].ToString();
                    d.userId = dr[2].ToString();
                    d.userName = dr[3].ToString();
                    d.createDate = dr[4].ToString();
                    d.lastLogin = dr[5].ToString();
                    d.numLastLogin = dr[6].ToString();
                    d.reportDate = dr[7].ToString();
                    d.reviewDate = dr[8].ToString();
                    d.remark = dr[9].ToString();
                    d.recordStatus = dr[10].ToString();
                    rptBIInactive.Add(d);
                }
                res.data = rptBIInactive;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();
            }
        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    public static async Task<ResDataGetUserBIDeletion> RptBIHkpGetReportBIDeletion(ReqDataGetUserBIDeletion param)
    {
        ResDataGetUserBIDeletion res = new ResDataGetUserBIDeletion();
        List<DataReportBIDeletion> rptBIDeletion = new List<DataReportBIDeletion>();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.get_report_deletion";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("P_DEBUG", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
            cmd.Parameters.Add("P_DATE", OracleDbType.Varchar2).Value = param.date.ToString();
            cmd.Parameters.Add("OP_DATA_DETECTION", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();
            if (res.status == "1")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["OP_DATA_DETECTION"].Value;
                OracleDataAdapter ODA1 = new OracleDataAdapter();
                DataSet ds1 = new DataSet();
                DataTable dt1 = new DataTable();
                ODA1.Fill(ds1, ORC1);
                dt1 = ds1.Tables[0];
                foreach (DataRow dr in dt1.Rows)
                {
                    DataReportBIDeletion d = new DataReportBIDeletion();
                    d.id = dr[0].ToString();
                    d.brn = dr[1].ToString();
                    d.brnName = dr[2].ToString();
                    d.userId = dr[3].ToString();
                    d.userName = dr[4].ToString();
                    d.position = dr[5].ToString();
                    d.reqDate = dr[6].ToString();
                    d.createDate = dr[7].ToString();
                    d.closeDate = dr[8].ToString();
                    d.status = dr[9].ToString();
                    d.remark = dr[10].ToString();
                    rptBIDeletion.Add(d);
                }
                res.biDeletion = rptBIDeletion;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();
            }
        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    public static async Task<ResInsertProcessStep> RptBIHkpInsertProcessStep(ReqDataInsertProcessStep param)
    {
        ResInsertProcessStep res = new ResInsertProcessStep();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.PRO_INSERT_PROCESS_STEP";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("p_step_id", OracleDbType.Varchar2).Value = param.stepId.ToString();
            //cmd.Parameters.Add("P_VAL_STEP", OracleDbType.Varchar2).Value = param.valStep.ToString();
            cmd.Parameters.Add("P_PRO_DATE", OracleDbType.Varchar2).Value = param.processDate.ToString();
            cmd.Parameters.Add("P_VAL_TEXT", OracleDbType.Varchar2).Value = param.valText.ToString();
            //cmd.Parameters.Add("P_PROCESS_DATA", OracleDbType.Clob).Value = param.processData.ToString();
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();
        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    public static async Task<ResGetProcessStep> RptBIHkpGetProcessStep(ReqDataGetProcessStep param)
    {
        ResGetProcessStep res = new ResGetProcessStep();
        DataAllGetProcessStep data = new DataAllGetProcessStep();
        List<DataGetProcessStep> list_step = new List<DataGetProcessStep>();
        RptBIHkpAllStaProcess statPro = new RptBIHkpAllStaProcess();
        RptDBHousekeepingStatus dbSta = new RptDBHousekeepingStatus();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        OracleClob statClob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.GET_PROCESS_STEP";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("p_user", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("p_debug", OracleDbType.Varchar2).Value = "N";
            cmd.Parameters.Add("P_DATE_REPORT", OracleDbType.Varchar2).Value = param.date.ToString();
            cmd.Parameters.Add("p_tab_process", OracleDbType.Varchar2).Value = param.tabProcess.ToString();
            cmd.Parameters.Add("OP_DATA_STEP", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("op_data_stat", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            statClob = (OracleClob)cmd.Parameters["op_data_stat"].Value;
            res.message = msgclob.Value.ToString();
            msgclob.Dispose();
            //res.data.staProcess = JsonSerializer.Deserialize<RptBIHkpAllStaProcess>(statClob.Value.ToString());
            statPro = JsonSerializer.Deserialize<RptBIHkpAllStaProcess>(statClob.Value.ToString());
            if (res.status == "1")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["OP_DATA_STEP"].Value;

                OracleDataAdapter ODA1 = new OracleDataAdapter();

                DataSet ds1 = new DataSet();

                DataTable dt1 = new DataTable();

                ODA1.Fill(ds1, ORC1);

                dt1 = ds1.Tables[0];

                foreach (DataRow dr in dt1.Rows)
                {
                    DataGetProcessStep d = new DataGetProcessStep();
                    d.id = dr[0].ToString();
                    d.stepName = dr[1].ToString();
                    d.valStep = dr[2].ToString();
                    //.processDate = dr[3].ToString();
                    d.category = dr[3].ToString();
                    //d.valText = dr[4].ToString();
                    d.elementId = dr[4].ToString();
                    list_step.Add(d);
                }


                data.steProcess = list_step;
                data.staProcess = statPro;
                res.data = data;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();
            }
        }
        catch (Exception ex)
        {
            res.status = "-1";
            res.message = ex.ToString();
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult<ResGetProcessStep>(res);
    }
    public static async Task<ResInsertProcessStep> RptBIHkpSentEmailInformUser(ReqSendEmailInformUser param)
    {
        ResInsertProcessStep res = new ResInsertProcessStep();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.send_email_inform_user";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("p_user", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("p_debug", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
            cmd.Parameters.Add("p_report_date", OracleDbType.Varchar2).Value = param.reportDate.ToString();
            cmd.Parameters.Add("p_type_used", OracleDbType.Varchar2).Value = param.type.ToString();
            //cmd.Parameters.Add("p_user_inform", OracleDbType.Varchar2).Value = param.userInform.ToString();
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();
        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    public static async Task<ResGetOldUserPreClose> RptBIHkpGetOldUserPreClose(ReqGetOldUserPreClose param)
    {
        ResGetOldUserPreClose res = new ResGetOldUserPreClose();
        DataGetOldUserPreClose data = new DataGetOldUserPreClose();
        List<DataUserInactive> dataUserClose = new List<DataUserInactive>();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        OracleClob userPreCloseClob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.get_old_user_pre_close";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("p_date_report", OracleDbType.Varchar2).Value = param.reportDate.ToString();
            cmd.Parameters.Add("op_data_user_close", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            userPreCloseClob = (OracleClob)cmd.Parameters["op_data_user_close"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();
            List<DataUserInactive> jsonData = JsonSerializer.Deserialize<List<DataUserInactive>>(userPreCloseClob.Value.ToString().Trim());
            dataUserClose = jsonData;
            data.listStaff = dataUserClose;
            res.data = data;
        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    public static async Task<ResRptBIHkpProcessStatus> RptBIHkpGetProcessStatus(ReqGetProcessStatus param)
    {
        ResRptBIHkpProcessStatus res = new ResRptBIHkpProcessStatus();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        OracleClob processStaClob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.get_process_status";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("p_date_report", OracleDbType.Varchar2).Value = param.reportDate.ToString();
            cmd.Parameters.Add("op_data", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            processStaClob = (OracleClob)cmd.Parameters["op_data"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();
            res.staProcess = JsonSerializer.Deserialize<RptBIHkpAllStaProcess>(processStaClob.Value.ToString());
        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    // public static async Task<ResGetListingDBUserHousekeeping> RptDbUserHousekeepingListing(ReqGetListingDBUserHousekeeping param)
    // {
    //     ResGetListingDBUserHousekeeping res = new ResGetListingDBUserHousekeeping();
    //     DataDBUserHousekeeping data = new DataDBUserHousekeeping();
    //     List<DBUserHousekeeping> dataDbUser = new List<DBUserHousekeeping>();
    //     OracleConnection conn = new OracleConnection();
    //     conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
    //     OracleCommand cmd = new OracleCommand();
    //     cmd.Connection = conn;
    //     OracleClob msgclob;
    //     int rowCount = 1;
    //     try
    //     {
    //         conn.Open();
    //         cmd.CommandText = "RPT_BI_REPORT.get_data_listing_db_user_housekeeping";
    //         cmd.CommandType = CommandType.StoredProcedure;
    //         cmd.Parameters.Add("p_start_date", OracleDbType.Varchar2).Value = param.fromDate.ToString();
    //         cmd.Parameters.Add("p_end_date", OracleDbType.Varchar2).Value = param.toDate.ToString();
    //         cmd.Parameters.Add("op_db_user", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
    //         cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
    //         cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
    //         cmd.ExecuteNonQuery();
    //         msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
    //         res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
    //         res.message = msgclob.Value.ToString();

    //         if (res.status == "1")
    //         {
    //             OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["op_db_user"].Value;
    //             OracleDataAdapter ODA1 = new OracleDataAdapter();
    //             DataSet ds1 = new DataSet();
    //             DataTable dt1 = new DataTable();
    //             ODA1.Fill(ds1, ORC1);
    //             dt1 = ds1.Tables[0];
    //             foreach (DataRow dr in dt1.Rows)
    //             {
    //                 DBUserHousekeeping d = new DBUserHousekeeping();
    //                 d.id = dr[0].ToString();
    //                 d.staffId = dr[1].ToString();
    //                 d.staffName = dr[2].ToString();
    //                 d.dbUsername = dr[3].ToString();
    //                 d.userRole = dr[4].ToString();
    //                 d.currentStatus = dr[5].ToString();
    //                 d.createDate = dr[6].ToString();
    //                 d.lastLogin = dr[7].ToString();
    //                 d.dbName = dr[8].ToString();
    //                 d.inactiveDays = dr[9].ToString();
    //                 d.insertedDate = dr[10].ToString();
    //                 d.remark = dr[11].ToString();
    //                 d.status = dr[12].ToString();
    //                 dataDbUser.Add(d);
    //             }
    //             data.dbUser = dataDbUser;
    //             res.data = data;
    //             dt1.Dispose();
    //             ds1.Dispose();
    //             ODA1.Dispose();
    //             ORC1.Dispose();
    //         }
    //     }
    //     catch (Exception ex)
    //     {
    //         //Core.DebugError(ex); // TODO: Uncomment
    //     }
    //     finally
    //     {
    //         cmd.Dispose();
    //         conn.Close();
    //         conn.Dispose();
    //     }
    //     return await Task.FromResult(res);
    // }
    // public static async Task<ResGenDBUserHousekeeping> RptDbGenUserHousekeeping(ReqGenDBUserHousekeeping param)
    // {
    //     ResGenDBUserHousekeeping res = new ResGenDBUserHousekeeping();
    //     OracleConnection conn = new OracleConnection();
    //     conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
    //     OracleCommand cmd = new OracleCommand();
    //     cmd.Connection = conn;
    //     OracleClob msgclob;
    //     try
    //     {
    //         conn.Open();
    //         cmd.CommandText = "RPT_BI_REPORT.call_process_pull_db_user_housekeeping";
    //         cmd.CommandType = CommandType.StoredProcedure;
    //         cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
    //         cmd.Parameters.Add("P_DEBUG", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
    //         cmd.Parameters.Add("p_date", OracleDbType.Varchar2).Value = param.date.ToString();
    //         cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
    //         cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
    //         cmd.ExecuteNonQuery();
    //         msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
    //         res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
    //         res.message = msgclob.Value.ToString();

    //     }
    //     catch (Exception ex)
    //     {
    //         //Core.DebugError(ex); // TODO: Uncomment
    //     }
    //     finally
    //     {
    //         cmd.Dispose();
    //         conn.Close();
    //         conn.Dispose();
    //     }
    //     return await Task.FromResult(res);
    // }
    public static async Task<ResInsertProcessStatus> RptUserHkpInsertProcessStatus(ReqInsertProcessStatus param)
    {
        ResInsertProcessStatus res = new ResInsertProcessStatus();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.pro_insert_process_status";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("p_status_id", OracleDbType.Varchar2).Value = param.statusId.ToString();
            cmd.Parameters.Add("p_status", OracleDbType.Varchar2).Value = param.status.ToString();
            cmd.Parameters.Add("p_status_count", OracleDbType.Varchar2).Value = param.statusCount.ToString();
            cmd.Parameters.Add("p_message", OracleDbType.Varchar2).Value = param.message.ToString();
            //cmd.Parameters.Add("p_process_data", OracleDbType.Varchar2).Value = param.processData.ToString();
            cmd.Parameters.Add("p_process_date", OracleDbType.Varchar2).Value = param.processDate.ToString();
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            res.message = msgclob.Value.ToString();

        }
        catch (Exception ex)
        {
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    public static async Task<ResGetBIUserInactive> RptBIHkpGetBIUserInactive(ReqGetBIUserInactive param)
    {
        ResGetBIUserInactive res = new ResGetBIUserInactive();
        List<DataGetBIUserInactive> listUser = new List<DataGetBIUserInactive>();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.get_bi_user_close";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("P_DEBUG", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
            cmd.Parameters.Add("op_date_report", OracleDbType.Varchar2).Value = param.date.ToString();
            cmd.Parameters.Add("op_data_bi_user", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.message = msgclob.Value.ToString();
            msgclob.Dispose();
            if (res.status == "1")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["op_data_bi_user"].Value;
                OracleDataAdapter ODA1 = new OracleDataAdapter();
                DataSet ds1 = new DataSet();
                DataTable dt1 = new DataTable();
                ODA1.Fill(ds1, ORC1);
                dt1 = ds1.Tables[0];
                foreach (DataRow dr in dt1.Rows)
                {
                    DataGetBIUserInactive d = new DataGetBIUserInactive();
                    d.id = dr[0].ToString();
                    d.userId = dr[1].ToString();
                    d.userName = dr[2].ToString();
                    d.dep = dr[3].ToString();
                    d.closeType = dr[4].ToString();
                    d.reportDate = dr[5].ToString();
                    listUser.Add(d);
                }
                res.data = listUser;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();
            }
        }
        catch (Exception ex)
        {
            res.status = "-1";
            res.message = ex.ToString();
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult<ResGetBIUserInactive>(res);
    }
    public static async Task<ResBIUserInactiveOperation> RptBIHkpBIUserInactiveOperation(ReqForBIUserInactiveOperation param)
    {
        ResBIUserInactiveOperation res = new ResBIUserInactiveOperation();
        List<DataBIUserInactiveOperation> listUser = new List<DataBIUserInactiveOperation>();

        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.bi_inactive_operations";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("P_DEBUG", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
            cmd.Parameters.Add("p_operation", OracleDbType.Varchar2).Value = param.p_operation.ToString();
            cmd.Parameters.Add("p_record_id", OracleDbType.Varchar2).Value = param.p_record_id.ToString();
            cmd.Parameters.Add("p_user_id", OracleDbType.Varchar2).Value = param.p_user_id.ToString();
            cmd.Parameters.Add("p_description", OracleDbType.Varchar2).Value = param.p_description.ToString();
            cmd.Parameters.Add("p_last_login_date", OracleDbType.Varchar2).Value = param.p_last_login_date.ToString();
            cmd.Parameters.Add("p_day_count_last_login", OracleDbType.Varchar2).Value = param.p_day_count_last_login.ToString();
            cmd.Parameters.Add("p_report_date", OracleDbType.Varchar2).Value = param.p_report_date.ToString();
            cmd.Parameters.Add("p_date_created", OracleDbType.Varchar2).Value = param.p_date_created.ToString();
            cmd.Parameters.Add("p_inserted_date", OracleDbType.Varchar2).Value = param.p_inserted_date.ToString();
            cmd.Parameters.Add("p_get_data", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.message = msgclob.Value.ToString();
            msgclob.Dispose();
            if (res.status == "1" && param.p_operation == "GETBYID")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["p_get_data"].Value;
                OracleDataAdapter ODA1 = new OracleDataAdapter();
                DataSet ds1 = new DataSet();
                DataTable dt1 = new DataTable();
                ODA1.Fill(ds1, ORC1);
                dt1 = ds1.Tables[0];
                foreach (DataRow dr in dt1.Rows)
                {
                    DataBIUserInactiveOperation d = new DataBIUserInactiveOperation();
                    d.id = dr[0].ToString();
                    d.user_id = dr[1].ToString();
                    d.description = dr[2].ToString();
                    d.last_login_date = dr[3].ToString();
                    d.day_count_last_login = dr[4].ToString();
                    d.report_date = dr[5].ToString();
                    d.date_created = dr[5].ToString();
                    d.report_date = dr[5].ToString();
                    listUser.Add(d);
                }
                res.processData = listUser;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();
            }
        }
        catch (Exception ex)
        {
            res.status = "-1";
            res.message = ex.ToString();
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult<ResBIUserInactiveOperation>(res);
    }
    public static async Task<ResCloseBIInactive> closeBIInactiveUserHousekeeping(ReqCloseUserBIInactive param)
    {
        ResCloseBIInactive res = new ResCloseBIInactive();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.close_user_bi_inactive";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("P_USER", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("P_DEBUG", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
            cmd.Parameters.Add("p_date_report", OracleDbType.Varchar2).Value = param.date.ToString();
            cmd.Parameters.Add("OP_STATUS", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("OP_MESSAGE", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.message = msgclob.Value.ToString();
            msgclob.Dispose();
        }
        catch (Exception ex)
        {
            res.status = "-1";
            res.message = ex.ToString();
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult<ResCloseBIInactive>(res);
    }
    public static async Task<resGetBIUserDeletionListing> getUserBIDeletionListing(reqGetBIUserDeletionListing param)
    {
        resGetBIUserDeletionListing res = new resGetBIUserDeletionListing();
        List<DataReportBIDeletion> data = new List<DataReportBIDeletion>();
        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.get_report_deletion_listing";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("p_user", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
            cmd.Parameters.Add("p_debug", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
            cmd.Parameters.Add("p_date", OracleDbType.Varchar2).Value = param.date.ToString();
            cmd.Parameters.Add("op_data_deletion", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("op_status", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("op_message", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.message = msgclob.Value.ToString();
            msgclob.Dispose();
            if (res.status == "1")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["op_data_deletion"].Value;
                OracleDataAdapter ODA1 = new OracleDataAdapter();
                DataSet ds1 = new DataSet();
                DataTable dt1 = new DataTable();
                ODA1.Fill(ds1, ORC1);
                dt1 = ds1.Tables[0];
                foreach (DataRow dr in dt1.Rows)
                {
                    DataReportBIDeletion d = new DataReportBIDeletion();
                    d.id = dr[0].ToString();
                    d.brn = dr[1].ToString();
                    d.brnName = dr[2].ToString();
                    d.userId = dr[3].ToString();
                    d.userName = dr[4].ToString();
                    d.position = dr[5].ToString();
                    d.reqDate = dr[6].ToString();
                    d.createDate = dr[7].ToString();
                    d.closeDate = dr[8].ToString();
                    d.status = dr[9].ToString();
                    d.remark = dr[10].ToString();
                    data.Add(d);
                }
                res.data = data;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();
            }
        }
        catch (Exception ex)
        {
            res.status = "-1";
            res.message = ex.ToString();
            //Core.DebugError(ex); // TODO: Uncomment
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }
    //public static async Task<resGetBIUserDeletionListing> getUserBIDeletionListing(reqGetBIUserDeletionListing param)
    //{
    //    resGetBIUserDeletionListing res = new resGetBIUserDeletionListing();
    //    List<DataReportBIDeletion> data = new List<DataReportBIDeletion>();
    //    OracleConnection conn = new OracleConnection();
    //    conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2"); //TODO: uncomment
    //    OracleCommand cmd = new OracleCommand();
    //    cmd.Connection = conn;
    //    OracleClob msgclob;
    //    try
    //    {
    //        conn.Open();
    //        cmd.CommandText = "RPT_BI_REPORT.get_report_deletion_listing";
    //        cmd.CommandType = CommandType.StoredProcedure;
    //        cmd.Parameters.Add("p_user", OracleDbType.Varchar2).Value = "11225"; //Core.GetContextValue("user_id");
    //        cmd.Parameters.Add("p_debug", OracleDbType.Varchar2).Value = "N"; //Core.DebugStat();
    //        cmd.Parameters.Add("p_date", OracleDbType.Varchar2).Value = param.date.ToString();
    //        cmd.Parameters.Add("op_data_deletion", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
    //        cmd.Parameters.Add("op_status", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
    //        cmd.Parameters.Add("op_message", OracleDbType.Clob).Direction = ParameterDirection.Output;
    //        cmd.ExecuteNonQuery();
    //        res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
    //        msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
    //        res.message = msgclob.Value.ToString();
    //        msgclob.Dispose();
    //        if (res.status == "1")
    //        {
    //            OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["op_data_deletion"].Value;
    //            OracleDataAdapter ODA1 = new OracleDataAdapter();
    //            DataSet ds1 = new DataSet();
    //            DataTable dt1 = new DataTable();
    //            ODA1.Fill(ds1, ORC1);
    //            dt1 = ds1.Tables[0];
    //            foreach (DataRow dr in dt1.Rows)
    //            {
    //                DataReportBIDeletion d = new DataReportBIDeletion();
    //                d.id = dr[0].ToString();
    //                d.brn = dr[1].ToString();
    //                d.brnName = dr[2].ToString();
    //                d.userId = dr[3].ToString();
    //                d.userName = dr[4].ToString();
    //                d.position = dr[5].ToString();
    //                d.reqDate = dr[6].ToString();
    //                d.createDate = dr[7].ToString();
    //                d.closeDate = dr[8].ToString();
    //                d.status = dr[9].ToString();
    //                d.remark = dr[10].ToString();
    //                data.Add(d);
    //            }
    //            res.data = data;
    //            dt1.Dispose();
    //            ds1.Dispose();
    //            ODA1.Dispose();
    //            ORC1.Dispose();
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        res.status = "-1";
    //        res.message = ex.ToString();
    //        //Core.DebugError(ex); // TODO: Uncomment
    //    }
    //    finally
    //    {
    //        cmd.Dispose();
    //        conn.Close();
    //        conn.Dispose();
    //    }
    //    return await Task.FromResult(res);
    //}
    public static async Task<resGetNotifi> getNotifyAll(reqGetNotifi param)
    {
        resGetNotifi res = new resGetNotifi();
        List<dataGetNotifi> data = new List<dataGetNotifi>();

        OracleConnection conn = new OracleConnection();
        conn.ConnectionString = connection(); //Connection.ConnectionString("ENTITY2");
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        OracleClob msgclob;
        try
        {
            conn.Open();
            cmd.CommandText = "RPT_BI_REPORT.pro_get_notifi";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("p_date", OracleDbType.Varchar2).Value = param.date.ToString();
            cmd.Parameters.Add("p_data_cur", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("op_status", OracleDbType.Varchar2, 2).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("op_message", OracleDbType.Clob).Direction = ParameterDirection.Output;
            cmd.ExecuteNonQuery();
            res.status = cmd.Parameters["OP_STATUS"].Value.ToString();
            msgclob = (OracleClob)cmd.Parameters["OP_MESSAGE"].Value;
            res.message = msgclob.Value.ToString();
            msgclob.Dispose();
            if (res.status == "1")
            {
                OracleRefCursor ORC1 = (OracleRefCursor)cmd.Parameters["p_data_cur"].Value;
                OracleDataAdapter ODA1 = new OracleDataAdapter();
                DataSet ds1 = new DataSet();
                DataTable dt1 = new DataTable();
                ODA1.Fill(ds1, ORC1);
                dt1 = ds1.Tables[0];
                foreach (DataRow dr in dt1.Rows)
                {
                    dataGetNotifi d = new dataGetNotifi();
                    d.name = dr[0].ToString();
                    d.noti = dr[1].ToString();
                    d.ele_id = dr[2].ToString();
                    data.Add(d);
                }
                res.data = data;
                dt1.Dispose();
                ds1.Dispose();
                ODA1.Dispose();
                ORC1.Dispose();

            }
        }
        catch (Exception ex)
        {
            res.status = "-1";
            res.message = ex.ToString();
            // Core.DebugError(ex);
        }
        finally
        {
            cmd.Dispose();
            conn.Close();
            conn.Dispose();
        }
        return await Task.FromResult(res);
    }

}