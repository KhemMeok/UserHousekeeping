CREATE OR REPLACE NONEDITIONABLE Package "RPT_BI_REPORT" Is
  Type ref_cur1 Is Ref Cursor;
  /*Procedure dg_init(p_userid Varchar2, p_debug Varchar2);
  Procedure dg_print(msg Varchar2);*/
  Procedure update_bi_user_status(p_statuscount Out Varchar2,
                                  op_status     Out Varchar2,
                                  op_message    Out Clob);
  Procedure update_bi_user_email(p_statuscount Out Varchar2,
                                 op_status     Out Varchar2,
                                 op_message    Out Clob);
  Procedure update_pull_last_login_bi_user(p_status_count Out Varchar2,
                                           op_status      Out Varchar2,
                                           op_message     Out Clob);
  Procedure get_report_housekeeping(p_user               In Varchar2,
                                    p_debug              In Varchar2 Default 'NN',
                                    p_date               In Date,
                                    p_type_process       In Varchar2,
                                    op_data_housekeeping Out ref_cur1,
                                    op_count             Out Number,
                                    op_status            Out Varchar2,
                                    op_message           Out Clob);
  Procedure generate_report_bi_housekeeping(p_user                  In Varchar2,
                                            p_debug                 In Varchar2 Default 'NN',
                                            p_from_date             In Date,
                                            p_to_date               In Date,
                                            p_type_used             In Varchar2,
                                            op_data_bi_housekeeping Out ref_cur1,
                                            op_status               Out Varchar2,
                                            op_message              Out Clob);
  /*procedure report_deletion(p_user     in varchar2,
  p_debug    in varchar2 default 'NN',
  p_date     in date,
  op_status  out varchar2,
  op_message out clob);*/
  Procedure get_report_deletion(p_user            In Varchar2,
                                p_debug           In Varchar2 Default 'NN',
                                p_date            In Date,
                                op_data_detection Out ref_cur1,
                                op_status         Out Varchar2,
                                op_message        Out Clob);
  Procedure insert_user_bi_detection(p_user         In Varchar2,
                                     p_debug        In Varchar2 Default 'NN',
                                     p_user_id_name In Varchar2,
                                     op_status      Out Varchar2,
                                     op_message     Out Clob);
  Procedure send_email_inform_user(p_user        In Varchar2,
                                   p_debug       In Varchar2 Default 'NN',
                                   p_report_date In Date,
                                   p_type_used   In Varchar2,
                                   /*p_user_inform In Varchar2,*/
                                   op_status  Out Varchar2,
                                   op_message Out Clob);

  /*PROCEDURE send_email_remove_bi_user(p_user        IN VARCHAR2,
  p_debug       IN VARCHAR2 DEFAULT 'NN',
  p_report_date IN VARCHAR2,
  p_output      OUT CLOB,
  op_status     OUT VARCHAR2,
  op_message    OUT CLOB);*/
  /*PROCEDURE get_bi_user(op_data_bi_user OUT ref_cur1,
  op_status       OUT VARCHAR2,
  op_message      OUT CLOB);*/
  /* PROCEDURE pro_insert_user_pre_close(user_close IN VARCHAR2,
  op_status  OUT VARCHAR2,
  op_message OUT CLOB);*/
  Procedure get_bi_user_inactive(p_date_report   In Date,
                                 op_data_bi_user Out ref_cur1,
                                 op_status       Out Varchar2,
                                 op_message      Out Clob);
  Function fn_auto_id_user_housekeeping(p_table_name Varchar2,
                                        p_col        Varchar2) Return Number
    Deterministic;
  Procedure get_process_step(p_date_report In Date,
                             p_tab_process In Varchar2,
                             op_data_step  Out ref_cur1,
                             op_data_stat  Out Clob,
                             op_status     Out Varchar2,
                             op_message    Out Clob);
  Procedure pro_insert_process_step(p_user    In Varchar2,
                                    p_step_id In Varchar2,
                                    /*p_val_step     In Varchar2,*/
                                    p_pro_date In Varchar2,
                                    p_val_text In Varchar2,
                                    /*p_process_data In Clob,*/
                                    op_status  Out Varchar2,
                                    op_message Out Clob);
  /*  Procedure get_data_from_xml(p_xml_clob In Clob,
  p_col_data In Varchar2,
  p_data     Out ref_cur1,
  op_status  Out Varchar2,
  op_message Out Clob);*/
  /*Procedure get_data_listing_db_user_housekeeping(p_start_date In Date,
                                                  p_end_date   In Date,
                                                  op_db_user   Out ref_cur1,
                                                  op_status    Out Varchar2,
                                                  op_message   Out Clob);
  Procedure call_process_pull_db_user_housekeeping(p_user     In Varchar2,
                                                   p_debug    In Varchar2 Default 'NN',
                                                   p_date     In Varchar2,
                                                   op_status  Out Varchar2,
                                                   op_message Out Clob);*/
  Procedure generate_email_content(p_brncode Varchar2,
                                   
                                   p_date_created         Date,
                                   p_last_login_date      Date,
                                   p_inserted_date        Date,
                                   p_day_count_last_login Number,
                                   p_footer1              Varchar2,
                                   p_footer2              Varchar2,
                                   p_footer3              Varchar2,
                                   p_footer4              Varchar2,
                                   p_footer5              Varchar2,
                                   p_staff_id             Varchar2,
                                   p_staff_name           Varchar2,
                                   p_db_username          Varchar2,
                                   p_user_role            Varchar2,
                                   p_current_status       Varchar2,
                                   p_dbname               Varchar2,
                                   p_db_full_name         Varchar2,
                                   p_email_type           Varchar2,
                                   p_email_content        Out Clob);
  Procedure pro_insert_process_status(p_user         In Varchar2,
                                      p_status_id    In Varchar2,
                                      p_status       In Varchar2,
                                      p_status_count In Varchar2,
                                      p_message      In Clob,
                                      /*p_process_data In Clob,*/
                                      p_process_date In Date,
                                      /*p_tab_process  In Varchar2,*/
                                      op_status  Out Varchar2,
                                      op_message Out Clob);
  /*PROCEDURE update_bi_user_status_new(p_status_count OUT VARCHAR2,
                                      op_status      OUT VARCHAR2,
                                      op_message     OUT CLOB);
  PROCEDURE update_bi_user_email_new(p_statuscount OUT VARCHAR2,
                                     op_status     OUT VARCHAR2,
                                     op_message    OUT CLOB);*/
  Procedure get_bi_user_close(p_user          In Varchar2,
                              p_debug         In Varchar2 Default 'NN',
                              op_date_report  Date,
                              op_data_bi_user Out ref_cur1,
                              op_status       Out Varchar2,
                              op_message      Out Clob);
  Procedure bi_inactive_operations(p_user                 In Varchar2,
                                   p_debug                In Varchar2 Default 'NN',
                                   p_operation            In Varchar2,
                                   p_record_id            In Number,
                                   p_user_id              In Varchar2 Default Null,
                                   p_description          In Varchar2 Default Null,
                                   p_last_login_date      In Varchar2 Default Null,
                                   p_day_count_last_login In Varchar2 Default Null,
                                   p_report_date          In Varchar2 Default Null,
                                   p_date_created         In Varchar2 Default Null,
                                   p_inserted_date        In Varchar2 Default Null,
                                   p_get_data             Out ref_cur1,
                                   op_status              Out Varchar2,
                                   op_message             Out Clob);

  Procedure insert_bi_user_close(p_user         In Varchar2,
                                 p_debug        In Varchar2 Default 'NN',
                                 op_date_report Date,
                                 op_status      Out Varchar2,
                                 op_message     Out Clob);
  Procedure close_user_bi_inactive(p_user        In Varchar2,
                                   p_debug       In Varchar2 Default 'NN',
                                   p_date_report Date,
                                   op_status     Out Varchar2,
                                   op_message    Out Clob);
  Procedure get_report_deletion_listing(p_user           In Varchar2,
                                        p_debug          In Varchar2 Default 'NN',
                                        p_date           In Date,
                                        op_data_deletion Out ref_cur1,
                                        op_status        Out Varchar2,
                                        op_message       Out Clob);
  Procedure get_user_update_status_listing(p_user     In Varchar2,
                                           p_debug    In Varchar2 Default 'NN',
                                           p_date     In Varchar2,
                                           op_data    Out ref_cur1,
                                           op_status  Out Varchar2,
                                           op_message Out Clob);
  Procedure pro_get_notifi(p_date     In Date,
                           p_data_cur Out ref_cur1,
                           op_status  Out Varchar2,
                           op_message Out Clob);
End rpt_bi_report;
/
CREATE OR REPLACE NONEDITIONABLE Package Body "RPT_BI_REPORT" Is
  v_user_id    Varchar2(50);
  v_real_debug Varchar2(1) := 'N';
  v_user_debug Varchar2(1) := 'N';

  -- Procedure dg_init(p_userid Varchar2, p_debug Varchar2) Is
  -- Begin
  --   v_user_id := p_userid;
  --   Begin
  --     Select substr(p_debug, 1, 1), substr(p_debug, 2, 2)
  --       Into v_real_debug, v_user_debug
  --       From dual;
  --   Exception
  --     When Others Then
  --       v_real_debug := 'N';
  --       v_user_debug := 'N';
  --   End;
  -- End dg_init;

  -- Procedure dg_print(msg Varchar2) Is
  --   slog_file_name Varchar2(100);
  --   smsg           Clob;
  --   f              utl_file.file_type;
  -- Begin
  --   If v_real_debug = 'Y' Then
  --     If v_user_debug = 'Y' Then
  --       slog_file_name := to_char(Sysdate, 'YYYYMMDD') || '-' ||
  --                         'user_housekeeping_' || '-' || v_user_id;
  --       smsg           := '[' ||
  --                         to_clob(to_char(Sysdate, 'dd-MON-YYYY hh24:mi:ss')) || '] ' ||
  --                         fn_append_calling_program || msg;
  --       f              := sys.utl_file.fopen('ITO_DEBUG',
  --                                            slog_file_name || '.log',
  --                                            'a',
  --                                            32767);
  --       /*a = append*/
  --       utl_file.put(f, smsg);
  --       utl_file.new_line(f);
  --       utl_file.fclose(f);
  --     End If;
  --   End If;
  -- End dg_print;

  Procedure update_bi_user_status(p_statuscount Out Varchar2,
                                  op_status     Out Varchar2,
                                  op_message    Out Clob) As
    v_compare_ad Number := 0;
    /*v_id_record_update           Number := 0;*/
    v_count_staff_resign         Number := 0;
    v_count_staff_remove_from_ad Number := 0;
    v_id_insert                  Number := 0;
    v_row_effect_count           Number := 0;
    Type user_sys_id_arr Is Varray(2000) Of Varchar2(10);
    v_record_id_update           user_sys_id_arr;
    v_record_req_id_update       user_sys_id_arr;
    v_user_resign_update         Clob := '';
    v_user_remove_from_ad_update Clob := '';
  Begin
    For j In (Select *
                From rpt_user_mgt_user_system bi
               Where bi.record_status = 'O'
                 And bi.system_name = 'BI'
                 And upper(bi.user_system) Not In
                     ('HO_TRN', 'ORACLEWL', 'FLEXUBI', 'ORACLEBI')) Loop
      Select Count(1)
        Into v_compare_ad
        From current_ad_users ad
       Where Trim(ad.user_id) = Trim(j.user_system);
      If v_compare_ad > 0 Then
        For i In (Select b.user_id, a.record_status, b.status
                    From rpt_user_mgt_user_system a, current_ad_users b
                   Where a.record_status = 'O'
                     And a.record_status <> b.status
                     And a.system_name = 'BI'
                     And Trim(a.user_system) = Trim(b.user_id)) Loop
          /* for staff resigned*/
          /* update tb user_system*/
          Update rpt_user_mgt_user_system bi
             Set bi.record_status  = 'C',
                 bi.remark         = 'User Resigned',
                 bi.last_oper_id   = 'SYSTEM',
                 bi.last_oper_date = Sysdate,
                 bi.user_status    = 'CLOSE'
           Where Trim(bi.user_system) = Trim(i.user_id)
             And bi.system_name = 'BI'
             And bi.record_status = 'O' Return bi.request_id Bulk
           Collect Into v_record_id_update;
          /* get the number of rows updated*/
          v_row_effect_count := Sql%Rowcount;
          /* count row update*/
          v_count_staff_resign := v_count_staff_resign + v_row_effect_count;
          /* get staff from row update as message*/
          v_user_resign_update := v_user_resign_update || (Case
                                    When v_user_resign_update Is Null Then
                                     i.user_id
                                    Else
                                     ''
                                  End) || (Case
                                    When v_user_resign_update Is Not Null Then
                                     ', ' || i.user_id
                                    Else
                                     ''
                                  End);
          If v_record_id_update.count > 0 Then
            For j In 1 .. v_record_id_update.count Loop
              /*  insert log*/
              v_id_insert := fn_auto_id_user_housekeeping('RPT_USER_MGT_USER_SYSTEM_LOG',
                                         'LOG_ID');
              Insert Into rpt_user_mgt_user_system_log
                (log_id,
                 event_log,
                 mod_no,
                 request_id,
                 id,
                 user_system,
                 system_name,
                 role_id,
                 host_id,
                 service_run,
                 verify_date,
                 effective_date,
                 user_status,
                 remark,
                 record_status,
                 maker_id,
                 create_date,
                 last_oper_id,
                 last_oper_date)
                Select v_id_insert,
                       'CLOSE' As event_log,
                       u.mod_no + 1 As mod_no,
                       u.request_id,
                       u.id,
                       u.user_system,
                       u.system_name,
                       u.role_id,
                       u.host_id,
                       u.service_run,
                       u.verify_date,
                       u.effective_date,
                       u.user_status,
                       u.remark,
                       u.record_status,
                       u.maker_id,
                       u.create_date,
                       u.last_oper_id,
                       u.last_oper_date
                  From rpt_user_mgt_user_system u
                 Where u.id = v_record_id_update(j);
            End Loop;
          End If;
          /* update tb req*/
          Update rpt_user_mgt_request user_bi_req
             Set user_bi_req.record_status  = 'C',
                 user_bi_req.request_remark = 'User Resigned',
                 user_bi_req.last_oper_date = Sysdate,
                 user_bi_req.last_oper_id   = 'SYSTEM'
           Where user_bi_req.request_staff_id = i.user_id
             And user_bi_req.record_status = 'O' Return
           user_bi_req.request_id Bulk Collect Into
           v_record_req_id_update;
          If v_record_req_id_update.count > 0 Then
            For j In 1 .. v_record_req_id_update.count Loop
              /* insert log req table*/
              v_id_insert := fn_auto_id_user_housekeeping('rpt_user_mgt_request_log',
                                         'LOG_ID');
              Insert Into rpt_user_mgt_request_log
                (log_id,
                 event_log,
                 mod_no,
                 request_id,
                 request_staff_id,
                 request_name,
                 request_email,
                 request_position,
                 branch_code,
                 branch_name,
                 request_date,
                 request_remark,
                 record_status,
                 maker_id,
                 create_date,
                 last_oper_id,
                 last_oper_date,
                 ticket_on_helpdesk)
                Select v_id_insert,
                       'CLOSE',
                       log.mod_no + 1,
                       log.request_id,
                       log.request_staff_id,
                       log.request_name,
                       log.request_email,
                       log.request_position,
                       log.branch_code,
                       log.branch_name,
                       log.request_date,
                       log.request_remark,
                       log.record_status,
                       log.maker_id,
                       log.create_date,
                       log.last_oper_id,
                       last_oper_date,
                       log.ticket_on_helpdesk
                  From rpt_user_mgt_request log
                 Where log.request_id = v_record_req_id_update(j);
            End Loop;
          End If;
        End Loop;
      Else
        /* for staff remove from ad due staff resigned bigger 30 days*/
        Update rpt_user_mgt_user_system bi
           Set bi.record_status  = 'C',
               bi.last_oper_id   = 'SYSTEM',
               bi.last_oper_date = Sysdate,
               bi.user_status    = 'CLOSE',
               bi.remark         = 'User deleted from AD'
         Where Trim(bi.user_system) = Trim(j.user_system)
           And bi.record_status = 'O'
           And bi.system_name = 'BI' Return bi.request_id Bulk
         Collect Into v_record_id_update;
        /* get the number of rows updated*/
        v_row_effect_count := Sql%Rowcount;
        /* count row update from row count*/
        v_count_staff_remove_from_ad := v_count_staff_remove_from_ad +
                                        v_row_effect_count;
        v_user_remove_from_ad_update := v_user_remove_from_ad_update || (Case
                                          When v_user_remove_from_ad_update Is Null Then
                                           j.user_system
                                          Else
                                           ''
                                        End) || (Case
                                          When v_user_remove_from_ad_update Is Not Null Then
                                           ', ' || j.user_system
                                          Else
                                           ''
                                        End);
        If v_record_id_update.count > 0 Then
          For j In 1 .. v_record_id_update.count Loop
            /* insert log*/
            v_id_insert := fn_auto_id_user_housekeeping('RPT_USER_MGT_USER_SYSTEM_LOG',
                                       'LOG_ID');
            Insert Into rpt_user_mgt_user_system_log
              (log_id,
               event_log,
               mod_no,
               request_id,
               id,
               user_system,
               system_name,
               role_id,
               host_id,
               service_run,
               verify_date,
               effective_date,
               user_status,
               remark,
               record_status,
               maker_id,
               create_date,
               last_oper_id,
               last_oper_date)
              Select v_id_insert,
                     'CLOSE' As event_log,
                     u.mod_no + 1 As mod_no,
                     u.request_id,
                     u.id,
                     u.user_system,
                     u.system_name,
                     u.role_id,
                     u.host_id,
                     u.service_run,
                     u.verify_date,
                     u.effective_date,
                     u.user_status,
                     u.remark,
                     u.record_status,
                     u.maker_id,
                     u.create_date,
                     u.last_oper_id,
                     u.last_oper_date
                From rpt_user_mgt_user_system u
               Where u.id = v_record_id_update(j);
          End Loop;
        End If;
        /* update tb req*/
        Update rpt_user_mgt_request user_bi_req
           Set user_bi_req.record_status  = 'C',
               user_bi_req.request_remark = 'User deleted from AD',
               user_bi_req.last_oper_date = Sysdate,
               user_bi_req.last_oper_id   = 'SYSTEM'
         Where user_bi_req.request_staff_id = j.user_system
           And user_bi_req.record_status = 'O' Return
         user_bi_req.request_id Bulk Collect Into
         v_record_req_id_update;
        If v_record_req_id_update.count > 0 Then
          For j In 1 .. v_record_req_id_update.count Loop
            /* insert log req table*/
            v_id_insert := fn_auto_id_user_housekeeping('rpt_user_mgt_request_log', 'LOG_ID');
            Insert Into rpt_user_mgt_request_log
              (log_id,
               event_log,
               mod_no,
               request_id,
               request_staff_id,
               request_name,
               request_email,
               request_position,
               branch_code,
               branch_name,
               request_date,
               request_remark,
               record_status,
               maker_id,
               create_date,
               last_oper_id,
               last_oper_date,
               ticket_on_helpdesk)
              Select v_id_insert,
                     'CLOSE',
                     log.mod_no + 1,
                     log.request_id,
                     log.request_staff_id,
                     log.request_name,
                     log.request_email,
                     log.request_position,
                     log.branch_code,
                     log.branch_name,
                     log.request_date,
                     log.request_remark,
                     log.record_status,
                     log.maker_id,
                     log.create_date,
                     log.last_oper_id,
                     last_oper_date,
                     log.ticket_on_helpdesk
                From rpt_user_mgt_request log
               Where log.request_id = v_record_req_id_update(j);
          End Loop;
        End If;
      End If;
    End Loop;
    /*p_statuscount := to_char(v_count_staff_resign +
    v_count_staff_remove_from_ad);*/
  
    Select Count(*)
      Into p_statuscount
      From rpt_user_mgt_user_system bi
     Where bi.record_status = 'C'
       And bi.last_oper_id = 'SYSTEM'
       And to_char(bi.last_oper_date, 'MON-YYYY') =
           to_char(Sysdate, 'MON-YYYY')
       And bi.user_status = 'CLOSE';
    op_status  := '1';
    op_message := 'User resigned (AD close) => (' || v_user_resign_update ||
                  '), User remove from AD (' ||
                  v_user_remove_from_ad_update || ')';
    If v_user_resign_update Is Null And
       v_user_remove_from_ad_update Is Null Then
      op_message := 'No! User found for update';
    End If;
    /* commit;*/
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End update_bi_user_status;

  Procedure update_bi_user_email(p_statuscount Out Varchar2,
                                 op_status     Out Varchar2,
                                 op_message    Out Clob) As
    v_check            Number := 0;
    v_statuscount      Number := 0;
    v_row_update_count Number := 0;
    Type user_id_arr Is Varray(2000) Of Varchar2(30);
    v_staff_ids_update user_id_arr;
    v_staff_ids_string Clob := '';
  Begin
    Select Count(uad.user_id)
      Into v_check
      From current_ad_users uad
     Inner Join (Select Distinct Trim(requser.request_staff_id) As userid,
                                 requser.request_email
                   From rpt_user_mgt_request requser
                  Where requser.record_status = 'O') umgt
        On uad.user_id = umgt.userid
     Where uad.email <> umgt.request_email;
    If v_check > 0 Then
      For i In (Select *
                  From current_ad_users uad
                 Inner Join (Select Distinct Trim(requser.request_staff_id) As userid,
                                            requser.request_email
                              From rpt_user_mgt_request requser
                             Where requser.record_status = 'O') umgt
                    On uad.user_id = umgt.userid
                 Where uad.email <> umgt.request_email) Loop
        Update rpt_user_mgt_request bi
           Set bi.request_email = i.email
         Where Trim(bi.request_staff_id) = Trim(i.user_id)
           And bi.record_status = 'O'
        Returning bi.request_staff_id Bulk Collect Into v_staff_ids_update;
        /* Get row update*/
        v_row_update_count := Sql%Rowcount;
        /* Count all row update*/
        v_statuscount := v_statuscount + v_row_update_count;
        /* Get msg*/
        If v_staff_ids_update.count > 0 Then
          For j In 1 .. v_staff_ids_update.count Loop
            v_staff_ids_string := v_staff_ids_string ||
                                  v_staff_ids_update(j) || ', ';
          End Loop;
        End If;
      End Loop;
    
      p_statuscount := to_char(v_statuscount);
      op_status     := '1';
      op_message    := 'Process update complete => (' || v_staff_ids_string || ')';
    Else
      op_status     := '1';
      op_message    := 'No user to update email!';
      p_statuscount := '0';
    End If;
    /*Commit;*/
    /*todo: Uncomment*/
  Exception
    When no_data_found Then
      op_status  := '-1';
      op_message := 'No data found.';
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End update_bi_user_email;

  Procedure update_pull_last_login_bi_user(p_status_count Out Varchar2,
                                           op_status      Out Varchar2,
                                           op_message     Out Clob) As
    v_auto_id               Number := 0;
    v_check                 Number := 0;
    v_count_pull_login_user Number := 0;
    v_count_last_login      Number := 0;
  Begin
    /* backup old data and clear tmp data*/
    Begin
      /* insert old last login to table history*/
      Insert Into rpt_bip_tmp_user_lastlogin_history
        (Select l.userid, l.last_login, l.last_date, l.rpt_date, Sysdate
           From rpt_bip_tmp_user_lastlogin l);
      /* delete old tmp last login*/
      Delete From rpt_bip_tmp_user_lastlogin;
      Commit;
    End;
    /* verify*/
  
    Select Count(*) Into v_check From rpt_bip_tmp_user_lastlogin;
    /* Start insert new last login user into tmp table*/
    If v_check = 0 Then
      dbms_output.put_line('Start insert new tmp last login');
      Begin
        Insert Into rpt_bip_tmp_user_lastlogin
          Select Distinct t.userid,
                          Max(t.last_login),
                          to_date(to_char(Max(t.last_login), 'yyyymmdd'),
                                  'yyyymmdd') As last_day,
                          Sysdate,Sysdate
            From (Select tb_lg.user_id         As userid,
                         tb_lg.last_login As last_login
                    From tmp_tb_bi_user_last_login tb_lg
                  /*SELECT A.IAU_INITIATOR AS USERID, MAX(A.IAU_TSTZORIGINATING)AS LAST_LOGIN
                  FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDC A
                  WHERE A.IAU_EVENTTYPE = 'UserLogin'
                     AND A.IAU_EVENTSTATUS = 1
                  GROUP BY A.IAU_INITIATOR
                  UNION
                  ALL
                  SELECT B.IAU_INITIATOR AS USERID, MAX(B.IAU_TSTZORIGINATING)AS LAST_LOGIN
                  FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDR B
                  WHERE B.IAU_EVENTTYPE = 'UserLogin'
                     AND B.IAU_EVENTSTATUS = 1
                  GROUP BY B.IAU_INITIATOR*/
                  ) t
           Group By t.userid
           Order By Max(t.last_login)
          /* todo: uncomment*/
          ;
        /* get total row that have insert ==> total user login*/
        v_count_pull_login_user := v_count_pull_login_user + Sql%Rowcount;
        dbms_output.put_line(v_count_pull_login_user);
      End;
    End If;
    /* this step can be keep*/
    /*3 get tmp last login on old bi*/
    /*insert into rpt_bip_tmp_user_lastlogin
    select * from rpt_bip_tmp_user_lastlogin_old;*/
    /* end pull last login*/
    /* start process get user inactive*/
    Delete From rpt_bip_iau_house_keeping_pre;
    Commit;
    Select Count(*) Into v_check From rpt_bip_iau_house_keeping_pre;
    /* insert log from audit log table by using viwe to pre table*/
    If v_check = 0 Then
      dbms_output.put_line('Insert new tmp rpt_bip_iau_house_keeping_pre');
      Begin
        Insert Into rpt_bip_iau_house_keeping_pre a
          Select Distinct tb.user_id,
                          tb.description,
                          tb.last_login_date,
                          tb.day_count_last_login,
                          tb.report_date,
                          tb.date_created,
                          to_char(Sysdate, 'DD-MON-YYYY') "INSERTED_DATE"
          /*From rpt_bip_vw_iau_house_keeping b;*/
            From (Select Distinct b.user_id,
                                  b.description,
                                  b.last_login_date,
                                  b.day_count_last_login,
                                  b.report_date,
                                  b.date_created,
                                  to_char(Sysdate, 'DD-MON-YYYY') "INSERTED_DATE"
                  /* FROM RPT_BIP_VW_IAU_HOUSE_KEEPING B;*/
                    From (Select all_users.user_id,
                                 all_users.description,
                                 to_char(max_date.maxdate,
                                         'dd-MON-yyyy HH24:MI:ss') last_login_date,
                                 to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                             -1)),
                                                         'yyyymmdd'),
                                                 'yyyymmdd') -
                                         to_date(to_char(max_date.maxdate,
                                                         'yyyymmdd'),
                                                 'yyyymmdd')) As day_count_last_login,
                                 to_char(last_day(add_months(Sysdate, -1)),
                                         'dd-MON-yyyy') As report_date,
                                 to_date(to_char(all_users.date_created,
                                                 'yyyymmdd'),
                                         'yyyymmdd') As date_created,
                                 'DC' As bi_site
                            From (
                                  /*SELECT UPPER(A.IAU_INITIATOR)USER_ID, MAX(A.IAU_TSTZORIGINATING)MAXDATE
                                  FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDC A
                                  WHERE A.IAU_EVENTSTATUS = '1'
                                  GROUP BY A.IAU_INITIATOR*/
                                  Select tb_lg.user_id,
                                          tb_lg.last_login maxdate
                                    From tmp_tb_bi_user_last_login tb_lg) max_date
                           Right Join (Select upper(umr.request_staff_id) As user_id,
                                             umr.branch_name As description,
                                             Case
                                               When remark =
                                                    'USER MIGRATION TO STAFF ID' Then
                                                umr.request_date
                                               Else
                                                ums.effective_date
                                             End date_created
                                        From rpt_user_mgt_user_system ums
                                       Inner Join rpt_user_mgt_request umr
                                          On ums.request_id = umr.request_id
                                       Where ums.record_status = 'O'
                                         And ums.user_status <> 'CLOSE'
                                         And upper(ums.user_system) Not In
                                             ('ORACLEWL', 'HO_TRN')
                                         And ums.system_name = 'BI') all_users
                              On max_date.user_id = all_users.user_id
                          /*Union
                          Select all_users.user_id,
                                 all_users.description,
                                 to_char(max_date.maxdate,
                                         'dd-MON-yyyy HH24:MI:ss') last_login_date,
                                 to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                             -1)),
                                                         'yyyymmdd'),
                                                 'yyyymmdd') -
                                         to_date(to_char(max_date.maxdate,
                                                         'yyyymmdd'),
                                                 'yyyymmdd')) As day_count_last_login,
                                 to_char(last_day(add_months(Sysdate, -1)),
                                         'dd-MON-yyyy') As report_date,
                                 to_date(to_char(all_users.date_created,
                                                 'yyyymmdd'),
                                         'yyyymmdd') As date_created,
                                 'DR' As bi_site
                            From (
                                  \* SELECT UPPER(A.IAU_INITIATOR)USER_ID, MAX(A.IAU_TSTZORIGINATING)MAXDATE
                                  FROM BI12_IAU_VIEWER.BIPUBLISHER_V@BIDR A
                                  WHERE A.IAU_EVENTSTATUS = '1'
                                  GROUP BY A.IAU_INITIATOR*\
                                  Select tb_lg.user_id,
                                          tb_lg.last_login_date maxdate
                                    From tmp_tb_bi_user_last_login tb_lg) max_date
                           Right Join (Select upper(umr.request_staff_id) As user_id,
                                             umr.branch_name As description,
                                             Case
                                               When remark =
                                                    'USER MIGRATION TO STAFF ID' Then
                                                umr.request_date
                                               Else
                                                ums.effective_date
                                             End date_created
                                        From rpt_user_mgt_user_system ums
                                       Inner Join rpt_user_mgt_request umr
                                          On ums.request_id = umr.request_id
                                       Where ums.record_status = 'O'
                                         And ums.user_status <> 'CLOSE'
                                         And upper(ums.user_system) Not In
                                             ('ORACLEWL', 'HO_TRN')
                                         And ums.system_name = 'BI') all_users
                              On max_date.user_id = all_users.user_id*/
                          ) b) tb;
        Commit;
      End;
    End If;
    /* delete from house keeping table on the inserted date*/
    /* if we process more than 1 time*/
  
    Begin
      Delete From rpt_bip_iau_tbl_house_keeping
       Where to_char(inserted_date, 'DD-MON-YYYY') =
             to_char(Sysdate, 'DD-MON-YYYY');
      Commit;
    End;
    /* insert user inactive into table bi housekeeping*/
  
    Begin
      For a In (Select Distinct user_id,
                                description,
                                last_login_date,
                                day_count_last_login,
                                inserted_date,
                                report_date,
                                date_created
                  From rpt_bip_iau_house_keeping_pre a
                 Where to_date(a.last_login_date, 'DD/MON/YYYY HH24:MI:SS') =
                       (Select Max(to_date(b.last_login_date,
                                           'DD/MON/YYYY HH24:MI:SS'))
                          From rpt_bip_iau_house_keeping_pre b
                         Where b.user_id = a.user_id)
                   And a.day_count_last_login >= 90
                   And a.inserted_date = to_char(Sysdate, 'DD-MON-YYYY')) Loop
        v_auto_id := fn_auto_id_user_housekeeping('rpt_bip_iau_tbl_house_keeping', 'id');
        Insert Into rpt_bip_iau_tbl_house_keeping
          (user_id,
           description,
           last_login_date,
           day_count_last_login,
           report_date,
           date_created,
           inserted_date,
           id,
           status)
        Values
          (a.user_id,
           a.description,
           a.last_login_date,
           a.day_count_last_login,
           a.report_date,
           a.date_created,
           a.inserted_date,
           v_auto_id,
           'O');
        v_count_last_login := v_count_last_login + Sql%Rowcount;
      End Loop;
    
    End;
    /* insert null last login to house keeping table*/
  
    Begin
      For a In (Select Distinct a.user_id,
                                a.description,
                                a.last_login_date,
                                to_date(to_char(last_day(add_months(Sysdate,
                                                                    -1)),
                                                'YYYYMMDD'),
                                        'YYYYMMDD') -
                                to_date(to_char(a.date_created, 'YYYYMMDD'),
                                        'YYYYMMDD') As day_count_last_login,
                                a.report_date,
                                a.date_created,
                                a.inserted_date
                  From rpt_bip_iau_house_keeping_pre a
                 Where a.last_login_date Is Null
                /*AND UPPER(A.USER_ID) NOT IN
                    (SELECT UPPER(USER_ID)
                       FROM RPT_BIP_IAU_TBL_HOUSE_KEEPING M
                      WHERE M.INSERTED_DATE =
                            TO_CHAR(SYSDATE, 'DD-MON-YYYY'))
                AND (SELECT COUNT(P.USER_ID)
                       FROM RPT_BIP_IAU_HOUSE_KEEPING_PRE P
                     WHERE P.USER_ID = A.USER_ID) >= 1
                AND TO_DATE(TO_CHAR(LAST_DAY(ADD_MONTHS(SYSDATE, -1)),
                                    'YYYYMMDD'),
                            'YYYYMMDD') -
                    TO_DATE(TO_CHAR(A.DATE_CREATED, 'YYYYMMDD'),
                           'YYYYMMDD') >= 90
                AND A.INSERTED_DATE = TO_CHAR(SYSDATE, 'DD-MON-YYYY')*/
                ) Loop
        v_auto_id := fn_auto_id_user_housekeeping('rpt_bip_iau_tbl_house_keeping', 'id');
        Insert Into rpt_bip_iau_tbl_house_keeping
          (user_id,
           description,
           last_login_date,
           day_count_last_login,
           report_date,
           date_created,
           inserted_date,
           id,
           status)
        Values
          (a.user_id,
           a.description,
           a.last_login_date,
           a.day_count_last_login,
           a.report_date,
           a.date_created,
           a.inserted_date,
           v_auto_id,
           'O');
        v_count_last_login := v_count_last_login + Sql%Rowcount;
      End Loop;
    End;
  
    Commit;
    p_status_count := v_count_pull_login_user;
    op_status      := '1';
    op_message     := 'Insert Last Login succeed';
    dbms_output.put_line('record insert :' || p_status_count);
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End update_pull_last_login_bi_user;

  Procedure get_report_housekeeping(p_user               In Varchar2,
                                    p_debug              In Varchar2 Default 'NN',
                                    p_date               In Date,
                                    p_type_process       In Varchar2,
                                    op_data_housekeeping Out ref_cur1,
                                    op_count             Out Number,
                                    op_status            Out Varchar2,
                                    op_message           Out Clob) As
    tmp_housekeeping ref_cur1;
  Begin
    --dg_init(p_user, p_debug);
    /* update last login to bi user*/
    If lower(p_type_process) = lower('getReport') Then
      For i In (Select a.userid,
                       a.last_login,
                       a.last_date,
                       Case
                         When sp.create_date > a.last_date Then
                          to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                      -1)),
                                                  'yyyymmdd'),
                                          'yyyymmdd') -
                                  to_date(to_char(sp.create_date, 'yyyymmdd'),
                                          'yyyymmdd'))
                         Else
                          to_char(to_date(to_char(last_day(add_months(Sysdate,
                                                                      -1)),
                                                  'yyyymmdd'),
                                          'yyyymmdd') -
                                  to_date(to_char(a.last_date, 'yyyymmdd'),
                                          'yyyymmdd'))
                       End As day_count
                  From rpt_bip_tmp_user_lastlogin a
                 Inner Join rpt_user_mgt_user_system sp
                    On sp.user_system = a.userid
                   And sp.record_status <> 'C'
                 Where to_date(a.last_login, 'DD/MON/YYYY HH24:MI:SS') =
                       (Select Max(to_date(c.last_login,
                                           'DD/MON/YYYY HH24:MI:SS'))
                          From rpt_bip_tmp_user_lastlogin c
                         Where c.userid = a.userid)) Loop
        Update rpt_bip_iau_tbl_house_keeping u
           Set u.last_login_date      = i.last_login,
               u.day_count_last_login = i.day_count
         Where to_char(inserted_date, 'DD-MON-YYYY') =
               to_char(Sysdate, 'DD-MON-YYYY')
           And u.user_id = i.userid;
        Commit;
      End Loop;
    End If;
  
    Open tmp_housekeeping For
      Select rownum As id, tb.*
        From (Select Case
                       When ad.branchid = 'Head Office' Then
                        '000'
                       Else
                        ad.branchid
                     End As brn_code,
                     a.user_id,
                     ad.fullname As user_name,
                     to_char(a.date_created, 'DD-MON-YYYY') As created_date,
                     coalesce(to_char(a.last_login_date), 'N/A') As last_login_date,
                     a.day_count_last_login,
                     a.report_date,
                     to_char(a.inserted_date, 'DD-MON-YYYY') As reviewed_date,
                     Case
                       When a.day_count_last_login Between 90 And 119 Then
                        'INFORM'
                       Else
                        'REMOVE'
                     End As remarks,
                     step.auth_status As status,
                     a.inserted_date
                From rpt_bip_iau_tbl_house_keeping a
               Inner Join rpt_user_mgt_user_system us
                  On Trim(a.user_id) = Trim(us.user_system)
                 And us.system_name = 'BI'
                 And us.record_status = 'O'
                Left Join rpt_user_housekeeping_step step
                  On to_char(a.inserted_date, 'MON-YYYY') =
                     to_char(add_months(step.process_date, 1), 'MON-YYYY')
                 And step.step_id = 10000
               Inner Join smtb_employee ad
                  On ad.employeeid = a.user_id
               Where to_char(a.inserted_date, 'MON-YYYY') =
                     to_char(add_months(p_date, 1), 'MON-YYYY')
                 And a.day_count_last_login >= 90
                 And us.record_status = 'O'
               Order By remarks) tb;
    Select Count(a.user_id)
      Into op_count
      From rpt_bip_iau_tbl_house_keeping a
     Inner Join rpt_user_mgt_user_system us
        On Trim(a.user_id) = Trim(us.user_system)
       And us.system_name = 'BI'
       And us.record_status = 'O'
      Left Join rpt_user_housekeeping_step step
        On to_char(a.inserted_date, 'MON-YYYY') =
           to_char(add_months(step.process_date, 1), 'MON-YYYY')
       And step.step_id = 10000
      Left Join current_ad_users ad
        On ad.user_id = a.user_id
     Where to_char(a.inserted_date, 'MON-YYYY') =
           to_char(add_months(p_date, 1), 'MON-YYYY')
       And a.day_count_last_login >= 90
       And us.record_status = 'O';
  
    op_data_housekeeping := tmp_housekeeping;
    op_status            := '1';
    op_message           := 'Get BI Housekeeping Successful';
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'Error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('Error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End get_report_housekeeping;

  Procedure generate_report_bi_housekeeping(p_user                  In Varchar2,
                                            p_debug                 In Varchar2 Default 'NN',
                                            p_from_date             In Date,
                                            p_to_date               In Date,
                                            p_type_used             In Varchar2,
                                            op_data_bi_housekeeping Out ref_cur1,
                                            op_status               Out Varchar2,
                                            op_message              Out Clob) As
    tmp_housekeeping                  ref_cur1;
    op_tmp_status                     Clob;
    op_tmp_status_update_user_status  Clob := '-1';
    op_tmp_status_update_user_email   Clob := '-1';
    op_tmp_status_pull_last_login     Clob := '-1';
    op_tmp_message                    Clob;
    op_tmp_message_update_user_status Clob := 'No Error found';
    op_tmp_message_update_user_email  Clob := 'No Error found';
    op_tmp_message_pull_last_login    Clob := 'No Error found';
    tmp_statuscount_update_status     Number := 0;
    tmp_statuscount_update_user_email Number := 0;
    tmp_statuscount_pull_last_login   Number := 0;
    tmp_count                         Number := 0;
    /*tmp_date                          varchar2(15) := to_char(p_from_date,
    'DD-MON-YYYY');*/
  Begin
    --dg_init(p_user, p_debug);
    If upper(p_type_used) = upper('getReport') Then
      /* process*/
      Begin
        update_bi_user_status(tmp_statuscount_update_status,
                              op_tmp_status_update_user_status,
                              op_tmp_message_update_user_status);
        update_bi_user_email(tmp_statuscount_update_user_email,
                             op_tmp_status_update_user_email,
                             op_tmp_message_update_user_email);
        update_pull_last_login_bi_user(tmp_statuscount_pull_last_login,
                                       op_tmp_status_pull_last_login,
                                       op_tmp_message_pull_last_login);
      End;
    
      Begin
        /* check and insert if true*/
        /*if op_tmp_status_update_user_status is not null then*/
        pro_insert_process_status(p_user,
                                  101,
                                  op_tmp_status_update_user_status,
                                  tmp_statuscount_update_status,
                                  op_tmp_message_update_user_status,
                                  p_from_date,
                                  op_tmp_status,
                                  op_tmp_message);
        /*end if;*/
        /*insert status update user email*/
        /*if op_tmp_status_update_user_email is not null then*/
        pro_insert_process_status(p_user,
                                  102,
                                  op_tmp_status_update_user_email,
                                  tmp_statuscount_update_user_email,
                                  op_tmp_message_update_user_email,
                                  p_to_date,
                                  op_tmp_status,
                                  op_tmp_message);
        /*end if;*/
        /*insert status pull last login*/
        /*if op_tmp_status_pull_last_login is not null then*/
        pro_insert_process_status(p_user,
                                  103,
                                  op_tmp_status_pull_last_login,
                                  tmp_statuscount_pull_last_login,
                                  op_tmp_message_pull_last_login,
                                  p_from_date,
                                  op_tmp_status,
                                  op_tmp_message);
        /*end if;*/
      End;
      --get report bi housekeeping
    
      Begin
        get_report_housekeeping(p_user,
                                p_debug,
                                p_from_date,
                                'getReport',
                                tmp_housekeeping,
                                tmp_count,
                                op_tmp_status,
                                op_tmp_message);
        If tmp_count = 0 Then
          --handle the case when the cursor doesn't have any data
          op_status               := '-1';
          op_message              := 'no data found for bi housekeeping.';
          op_data_bi_housekeeping := Null;
          --or assign any default value
        Else
          --Cursor has data, assign it to the output variable
          op_data_bi_housekeeping := tmp_housekeeping;
        End If;
        --insert status process get report bi housekeeping
      
        If op_tmp_status Is Not Null Then
          --todo
          pro_insert_process_status(p_user,
                                    104,
                                    op_tmp_status,
                                    tmp_count,
                                    op_tmp_message,
                                    p_from_date,
                                    op_tmp_status,
                                    op_tmp_message);
        End If;
      End;
      -- Used for get listing
    Elsif upper(p_type_used) = upper('getReportListing') Then
      get_report_housekeeping(p_user,
                              p_debug,
                              p_from_date,
                              'getReportListing',
                              tmp_housekeeping,
                              tmp_count,
                              op_tmp_status,
                              op_tmp_message);
      op_data_bi_housekeeping := tmp_housekeeping;
    Else
      op_status  := '-1';
      op_message := 'invalid type';
    End If;
  
    op_status  := '1';
    op_message := 'get bi housekeeping successful';
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End generate_report_bi_housekeeping;

  Procedure report_deletion(p_user     In Varchar2,
                            p_debug    In Varchar2 Default 'NN',
                            p_date     In Date,
                            op_status  Out Varchar2,
                            op_message Out Clob) As
    v_check        Number(5);
    v_updated_rows Number(5);
  Begin
    --dg_init(p_user, p_debug);
    Select Count(*)
      Into v_check
      From sp_user_close_pre_new c
     Where to_char(c.report_dt, 'MON-YYYY') = p_date
       And upper(c.user_id) In
           (Select upper(us.user_system)
              From rpt_user_mgt_user_system us
             Where us.system_name = 'BI'
               And us.record_status <> 'd');
    If v_check <> 0 Then
      Update rpt_user_mgt_user_system us
         Set us.record_status  = 'C',
             us.user_status    = 'CLOSE',
             us.effective_date = Sysdate,
             us.last_oper_id   = 'SYSTEM',
             us.last_oper_date = Sysdate,
             us.remark        =
             (Select c.type_close
                From sp_user_close_pre_new c
               Where upper(c.user_id) = upper(us.user_system)
                 And to_char(c.report_dt, 'MON-YYYY') = p_date)
       Where us.record_status = 'O'
         And us.system_name = 'BI'
         And upper(us.user_system) In
             (Select p.user_id
                From sp_user_close_pre_new p
               Where to_char(p.report_dt, 'MON-YYYY') = p_date)
      Returning Count(*) Into v_updated_rows;
      Commit;
      op_status  := '1';
      op_message := 'Update deletion successful';
    Else
      op_status  := '-1';
      op_message := 'Update deletion failed';
    End If;
  End report_deletion;

  Procedure get_report_deletion(p_user            In Varchar2,
                                p_debug           In Varchar2 Default 'NN',
                                p_date            In Date,
                                op_data_detection Out ref_cur1,
                                op_status         Out Varchar2,
                                op_message        Out Clob) As
    tmp_delection_report ref_cur1;
    tmp_status           Varchar2(5) := '-1';
    tmp_message          Varchar2(500);
    v_count_status_log   Number := 0;
  Begin
    Begin
      close_user_bi_inactive(p_user,
                             p_debug,
                             p_date,
                             tmp_status,
                             tmp_message);
    End;
  
    If tmp_status = '1' Then
      Open tmp_delection_report For
        Select row_number() over(Order By 10 Asc) no, z.*
          From (Select r.branch_code As brn_code,
                       Case
                         When r.branch_code = '000' Then
                          ep.jobtitle
                         Else
                          ep.branchid
                       End As branch_name,
                       us.user_system As user_id,
                       upper(r.request_name) As user_name,
                       r.request_position As position,
                       to_char(r.request_date, 'dd-MON-YYYY') As request_date,
                       to_char(us.create_date, 'dd-MON-YYYY') As create_date,
                       to_char(us.last_oper_date, 'dd-MON-YYYY') As close_date,
                       Case
                         When us.record_status = 'C' Then
                          'CLOSE'
                         Else
                          us.record_status
                       End As status,
                       Case
                         When us.remark Is Null Then
                          ''
                         Else
                          us.remark
                       End As remark
                  From rpt_user_mgt_user_system us
                 Inner Join rpt_user_mgt_request r
                    On r.request_id = us.request_id
                  Left Join smtb_employee ep
                    On r.request_staff_id = ep.sidcard
                 Where upper(to_char(add_months(trunc(us.last_oper_date), -1),
                                     'MON-YYYY')) =
                       upper(to_char(p_date, 'MON-YYYY'))
                   And us.last_oper_id = 'SYSTEM'
                   And us.record_status = 'C'
                   And r.record_status = 'C'
                   And us.user_system = r.request_staff_id
                   And us.system_name = 'BI') z
         Order By z.remark Asc;
    End If;
    /*Insert status log*/
  
    Begin
      Select Count(*)
        Into v_count_status_log
        From rpt_user_mgt_user_system us
       Inner Join rpt_user_mgt_request r
          On r.request_id = us.request_id
       Inner Join current_ad_users ep
          On r.request_staff_id = ep.user_id
       Where upper(to_char(add_months(trunc(us.last_oper_date), -1),
                           'MON-YYYY')) =
             upper(to_char(p_date, 'MON-YYYY'))
         And us.last_oper_id = 'SYSTEM'
         And us.record_status = 'C'
         And r.record_status = 'C'
         And us.user_system = r.request_staff_id
         And us.system_name = 'BI';
      pro_insert_process_status(p_user,
                                107,
                                '1',
                                v_count_status_log,
                                'Bi deletion',
                                p_date,
                                tmp_status,
                                tmp_message);
    End;
  
    If tmp_status = '1' Then
      op_data_detection := tmp_delection_report;
      op_status         := '1';
      op_message        := 'Get deletion successfull';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End get_report_deletion;

  Procedure insert_user_bi_detection(p_user         In Varchar2,
                                     p_debug        In Varchar2 Default 'NN',
                                     p_user_id_name In Varchar2,
                                     op_status      Out Varchar2,
                                     op_message     Out Clob) As
    v_verify_user Number;
    user_id       Varchar2(40);
    close_type    Varchar2(40);
    date_report   Varchar2(40);
  Begin
    --dg_init(p_user, p_debug);
    For l In (Select regexp_substr(p_user_id_name, '[^,]+', 1, Level) As user_close
                From dual
              Connect By regexp_substr(p_user_id_name, '[^,]+', 1, Level) Is Not Null) Loop
      user_id     := regexp_substr(l.user_close, '[^~]+', 1, 1);
      close_type  := regexp_substr(l.user_close, '[^~]+', 1, 2);
      date_report := regexp_substr(l.user_close, '[^~]+', 1, 3);
      Select Count(*)
        Into v_verify_user
        From sp_user_close_pre_new a
       Where a.user_id = user_id
         And a.report_dt = date_report;
      If v_verify_user = 0 Then
        Insert Into sp_user_close_pre_new
          (user_id, type_close, report_dt)
        Values
          (user_id, close_type, date_report);
      End If;
    End Loop;
  
    Commit;
    op_status  := '1';
    op_message := 'Insert successful';
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End insert_user_bi_detection;
  /*Procedure pro_insert_user_pre_close(user_close In Varchar2,
                                      op_status  Out Varchar2,
                                      op_message Out Clob) As
    tmp_user_id      Varchar2(10);
    tmp_close_type   Varchar2(50);
    tmp_report_date  Varchar2(20);
    v_check         Number;
    user_count     Number;
    user_dup_count Number;
  Begin
    \*intvar*\
    user_count := 0;
    \*user_close*\
    For i In (Select regexp_substr(user_close, '[^,]+', 1, Level) As v_end_point_id
                From dual
              Connect By regexp_substr(user_close, '[^,]+', 1, Level) Is Not Null) Loop
      \*row record*\
      tmp_user_id     := regexp_substr(i.v_end_point_id, '[^~]+', 1, 1);
      tmp_close_type  := regexp_substr(i.v_end_point_id, '[^~]+', 1, 2);
      tmp_report_date := regexp_substr(i.v_end_point_id, '[^~]+', 1, 3);
      \*verify duplicate*\
      Select Count(a.user_id)
        Into v_check
        From sp_user_close_pre@hklso_inh_db1 a
       Where a.user_id = tmp_user_id
         And to_char(to_date(a.report_dt, 'dd-MON-YYYY')) =
             to_char(to_date(tmp_report_date, 'dd-MON-YYYY'));
      dbms_output.put_line(v_check);
      \*insert into table*\
      If v_check = 0 And tmp_user_id Is Not Null And tmp_close_type Is Not Null And
         tmp_report_date Is Not Null Then
        user_count := user_count + 1;
        Insert Into sp_user_close_pre@hklso_inh_db1
          (user_id, type_close, report_dt)
        Values
          (tmp_user_id, tmp_close_type, tmp_report_date);
      Else
        user_dup_count := user_dup_count + 1;
      End If;
    End Loop;
  
    Commit;
    op_status  := '1';
    op_message := user_count || ' User insert successful' || user_dup_count;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
  End pro_insert_user_pre_close;*/

  Procedure close_user_bi_inactive(p_user        In Varchar2,
                                   p_debug       In Varchar2 Default 'NN',
                                   p_date_report Date,
                                   op_status     Out Varchar2,
                                   op_message    Out Clob) As
    count_user_close Number := 0;
    row_update       Number := 0;
    user_id_count    Number := 0;
    p_message        Clob := 'no message fount! (defualt message)';
    v_user_id_update Clob := '';
  Begin
    --dg_init(p_user, p_debug);
    Select Count(*)
      Into count_user_close
      From rpt_bip_iau_tbl_house_keeping b
     Where to_char(add_months(b.inserted_date, -1), 'MON-YYYY') =
           to_char(p_date_report, 'MON-YYYY')
       And b.day_count_last_login >= 120;
    /* check data in bi hkp and record insert is same or not*/
    If count_user_close > 0 Then
      For i In (Select Trim(b.user_id) As user_id
                  From sp_user_close_pre_new b
                 Where lower(to_char(b.report_dt, 'MON-YYYY')) =
                       lower(to_char(p_date_report, 'MON-YYYY'))) Loop
        /*update record by id*/
        Update rpt_user_mgt_user_system us
           Set us.record_status  = 'C',
               us.user_status    = 'CLOSE',
               us.last_oper_id   = 'SYSTEM',
               us.last_oper_date = Sysdate,
               us.remark         = 'User Inactive'
         Where us.record_status = 'O'
           And us.system_name = 'BI'
           And Trim(us.user_system) = i.user_id;
        /*count record effect*/
        row_update := row_update + to_number(Sql%Rowcount);
        If i.user_id Is Not Null And to_number(Sql%Rowcount) = 1 Then
          user_id_count    := user_id_count + 1;
          v_user_id_update := v_user_id_update || (Case
                                When v_user_id_update Is Null Then
                                 i.user_id
                                Else
                                 ''
                              End) || Case
                                When v_user_id_update Is Not Null Then
                                 ',' || i.user_id
                                Else
                                 ''
                              End;
        End If;
      End Loop;
    Else
      op_status := '1';
      p_message := 'No user for close';
    End If;
  
    If row_update = user_id_count Then
      p_message := 'update ' || user_id_count || ' user id (' ||
                   v_user_id_update || ')';
    Else
      p_message := 'row count: ' || to_char(row_update) || ' loop count: ' ||
                   to_char(user_id_count) || ' user-id count: ' ||
                   user_id_count || 'user-id' || v_user_id_update;
    End If;
  
    Commit;
    /*BEGIN
      pro_insert_process_status(p_user,
                                107,
                                '1',
                                row_update,
                                p_message,
                                
                                p_date_report,
                                
                                tmp_status,
                                tmp_message);
    END;*/
    op_status  := '1';
    op_message := p_message;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End close_user_bi_inactive;

  Procedure get_bi_user_inactive(p_date_report   In Date,
                                 op_data_bi_user Out ref_cur1,
                                 op_status       Out Varchar2,
                                 op_message      Out Clob) As
    tmp_bi_user ref_cur1;
  Begin
    Open tmp_bi_user For
      Select Case
               When ad.office = 'Head Office' Then
                '000'
               Else
                ad.office
             End As brn_code,
             a.user_id,
             ad.display_name,
             Case
               When a.day_count_last_login >= 120 Then
                'Inactive user'
               Else
                'Inform'
             End remarks,
             to_char(a.inserted_date, 'dd-MON-YYYY') reviewed_date
        From rpt_bip_iau_tbl_house_keeping a
       Inner Join current_ad_users ad
          On a.user_id = ad.user_id
       Where to_char(a.inserted_date, 'MON-YYYY') =
             to_char(add_months(p_date_report, +1), 'MON-YYYY')
         And a.day_count_last_login >= 120;
    op_data_bi_user := tmp_bi_user;
    op_status       := '1';
    op_message      := 'Get deletion successful';
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End get_bi_user_inactive;

  Procedure pro_insert_process_step(p_user    In Varchar2,
                                    p_step_id In Varchar2,
                                    /*p_val_step     In Varchar2,*/
                                    p_pro_date In Varchar2,
                                    p_val_text In Varchar2,
                                    /* p_process_data In Clob,*/
                                    op_status  Out Varchar2,
                                    op_message Out Clob) As
    v_check   Number;
    v_auto_id Number;
    v_max_id  rpt_user_housekeeping_step.step_id%Type;
  Begin
    Select Count(*)
      Into v_check
      From rpt_user_housekeeping_step s
     Where s.step_id = p_step_id
       And s.process_date = p_pro_date
       And s.record_status = 'O';
    If v_check = 0 Then
      Begin
        If p_val_text = '2002' And p_step_id = '20003' Or
           p_val_text = '1001' And p_step_id = '10002' Then
          /* Auth*/
          Begin
            Update rpt_user_housekeeping_step db_log
               Set db_log.auth_status = 'A'
             Where to_char(db_log.process_date, 'MON-YYYY') =
                   to_char(to_date(p_pro_date, 'dd-MON-YYYY'), 'MON-YYYY')
               And (Select d.tab_num
                      From rpt_user_housekeeping_data d
                     Where d.id_by_category = db_log.step_id) = p_val_text;
          End;
        End If;
        --update status step that have complete
        Begin
          -- get max id
          Select nvl((Select count(*)
                       From rpt_user_housekeeping_step d_log
                      Where to_char(d_log.process_date, 'MON-YYYY') =
                            to_char(to_date(p_pro_date, 'dd-MON-YYYY'),
                                    'MON-YYYY')),
                     0)
            Into v_max_id
            From dual;
        
          If v_max_id > 0 Then
            Update rpt_user_housekeeping_step db_log
               Set db_log.auth_status = 'A'
             Where to_char(db_log.process_date, 'MON-YYYY') =
                   to_char(to_date(p_pro_date, 'dd-MON-YYYY'), 'MON-YYYY')
               And to_number(db_log.step_id) < to_number(p_step_id);
          End If;
        
        End;
      End;
      /*check db hkp if reject update role back to frist step*/
    
      v_auto_id := fn_auto_id_user_housekeeping('rpt_user_housekeeping_step',
                                                'id');
      If p_val_text = '1001' And p_step_id = '10008' Or
         p_val_text = '2002' And p_step_id = '20005' Then
        Begin
          Rollback;
        End;
        /* Reset step*/
        Update rpt_user_housekeeping_step db_log
           Set db_log.record_status = 'D'
         Where to_char(db_log.process_date, 'MON-YYYY') =
               to_char(to_date(p_pro_date, 'dd-MON-YYYY'), 'MON-YYYY')
           And (Select d.tab_num
                  From rpt_user_housekeeping_data d
                 Where d.id_by_category = db_log.step_id
                   And d.category = 'step') = p_val_text;
        /* Reset status*/
        Update rpt_user_housekeeping_status_log status_log
           Set status_log.record_status = 'D'
         Where to_char(status_log.insert_date, 'MON-YYYY') =
               to_char(to_date(p_pro_date, 'dd-MON-YYYY'), 'MON-YYYY')
           And (Select d.tab_num
                  From rpt_user_housekeeping_data d
                 Where d.id_by_category = status_log.status_id
                   And d.category = 'status') = p_val_text;
      Else
        Insert Into rpt_user_housekeeping_step
          (id,
           step_id,
           process_date,
           last_update_by,
           last_update_date,
           record_status)
        Values
          (v_auto_id, p_step_id, p_pro_date, p_user, Sysdate, 'O');
      End If;
    
      Commit;
      op_status  := '1';
      op_message := 'Step insert successfully';
    Elsif v_check <> 0 Then
      op_status  := '1';
      op_message := 'Step already insert successfully';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End pro_insert_process_step;

  Function fn_auto_id_user_housekeeping(p_table_name Varchar2,
                                        p_col        Varchar2) Return Number
    Deterministic Is
    p_id           Number;
    v_check_record Number;
    v_sql_check    Varchar(300);
    v_sql_id       Varchar2(300);
  Begin
    v_sql_check := 'select count(*) from ' || p_table_name;
    v_sql_id    := 'select max(' || p_col || ') from ' || p_table_name;
    Execute Immediate v_sql_check
      Into v_check_record;
    If v_check_record = 0 Then
      p_id := 1;
    Else
      Execute Immediate v_sql_id
        Into p_id;
      p_id := p_id + 1;
    End If;
  
    Return p_id;
  End fn_auto_id_user_housekeeping;

  Procedure get_process_step(p_date_report In Date,
                             p_tab_process In Varchar2,
                             op_data_step  Out ref_cur1,
                             op_data_stat  Out Clob,
                             op_status     Out Varchar2,
                             op_message    Out Clob) As
    tmp_data_step ref_cur1;
    js_clob       Clob;
  Begin
    Open tmp_data_step For
      With max_step_id As
       (Select coalesce((Select Max(log.step_id) + 1
                          From rpt_user_housekeeping_step log
                         Inner Join rpt_user_housekeeping_data data
                            On log.step_id = data.id_by_category
                         Where log.record_status = 'O'
                           And data.status = 'O'
                           And data.tab_num = p_tab_process
                              /*id tab*/
                           And to_char(log.process_date, 'MON-YYYY') =
                               to_char(p_date_report, 'MON-YYYY')),
                        (Case
                          When p_tab_process = 1001 Then
                           10000
                          When p_tab_process = 2002 Then
                           20000
                          Else
                           0
                        End)) As max_step_id
          From dual),
      enable_btn As
       (Select btn.name, 'y' As val_step, btn.category, btn.element_id
          From rpt_user_housekeeping_data btn
         Inner Join (Select a.tab_num, a.step_num
                      From rpt_user_housekeeping_data a
                     Inner Join max_step_id s
                        On a.id_by_category = s.max_step_id
                     Where a.category = 'step') c
            On btn.tab_num = c.tab_num
           And btn.step_num = c.step_num
         Where btn.category = 'btn'
           And btn.tab_num = p_tab_process
           And btn.status = 'O'),
      disable_btn As
       (Select btn_disable.name,
               'n' As val_step,
               btn_disable.category,
               btn_disable.element_id
          From rpt_user_housekeeping_data btn_disable
         Where btn_disable.category = 'btn'
           And btn_disable.status = 'O'
           And btn_disable.tab_num = p_tab_process
           And btn_disable.id_by_category Not In
               (Select btn.id_by_category
                  From rpt_user_housekeeping_data btn
                 Inner Join (Select a.tab_num, a.step_num
                              From rpt_user_housekeeping_data a
                             Inner Join max_step_id s
                                On a.id_by_category = s.max_step_id
                             Where a.category = 'step') c
                    On btn.tab_num = c.tab_num
                   And btn.step_num = c.step_num
                 Where btn.category = 'btn'
                   And btn.tab_num = p_tab_process
                   And btn.status = 'O'))
      Select rownum As no, a.*
        From (Select * From enable_btn Union All Select * From disable_btn) a;
    With status As
     (Select st.id_by_category As id,
             st.category,
             (Case
               When stl.status Is Not Null Then
                to_char(stl.status)
               Else
                '0'
             /*not yet process*/
             End) As status,
             (Case
               When stl.status_count Is Not Null Then
                to_char(stl.status_count)
               Else
                '0'
             End) As status_count,
             (Case
               When stl.message Is Not Null Then
                stl.message
               Else
                to_char('not yet process')
             End) As message,
             st.element_id
        From rpt_user_housekeeping_data st
        Left Join (Select stl.id,
                         stl.status_id,
                         stl.status,
                         stl.status_count,
                         stl.message,
                         stl.process_data_old As process_data,
                         stl.insert_date,
                         tab.tab_name         As tab
                    From rpt_user_housekeeping_status_log stl
                   Inner Join rpt_user_housekeeping_data tab
                      On tab.id_by_category = stl.status_id
                     And tab.category = 'status'
                     And stl.record_status = 'O') stl
          On st.id_by_category = stl.status_id
         And st.category = 'status'
         And st.tab_num = p_tab_process
         And (to_char(stl.insert_date, 'MON-YYYY') Is Null Or
             to_char(stl.insert_date, 'MON-YYYY') =
             to_char(p_date_report, 'MON-YYYY'))
       Where st.category = 'status'
         And st.status = 'O')
    Select json_object('bi_housekeeping' Value
                       json_object('update_status' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 101
                                     Fetch First 1 Row Only),
                                   'update_email' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 102
                                     Fetch First 1 Row Only),
                                   'pull_last_login' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 103
                                     Fetch First 1 Row Only),
                                   'get_bi_housekeeping' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 104
                                     Fetch First 1 Row Only),
                                   /*'get_bi_user_close' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message)
                                      From status p
                                     Where p.id = 105
                                     Fetch First 1 Row Only),
                                   'insert_bi_user_close' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message)
                                      From status p
                                     Where p.id = 106
                                     Fetch First 1 Row Only),*/
                                   'close_bi_user' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 107
                                     Fetch First 1 Row Only)),
                       'db_housekeeping' Value
                       json_object('user_inform' Value
                                   (Select json_object('status' Value
                                                       p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 201
                                     Fetch First 1 Row Only),
                                   'user_remove' Value
                                   (Select json_object('status' Value p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 202
                                     Fetch First 1 Row Only),
                                   'total_user' Value
                                   (Select json_object('status' Value p.status,
                                                       'count' Value
                                                       to_char(p.status_count),
                                                       'message' Value
                                                       p.message,
                                                       'eleId' Value
                                                       p.element_id)
                                      From status p
                                     Where p.id = 203
                                     Fetch First 1 Row Only))) As Result
      Into js_clob
      From dual;
    op_data_step := tmp_data_step;
    op_data_stat := js_clob;
    op_status    := '1';
    op_message   := 'get data successful';
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End get_process_step;
  /*Procedure get_data_from_xml(p_xml_clob In Clob,
                              p_col_data In Varchar2,
                              p_data     Out ref_cur1,
                              op_status  Out Varchar2,
                              op_message Out Clob) As
    xml_data   xmltype;
    tmp_p_data ref_cur1;
  Begin
    --verify
    --check condition
    If p_xml_clob Is Not Null And p_col_data Is Not Null Then
      xml_data := xmltype(p_xml_clob);
      Open tmp_p_data For
        Select x.*
          From xmltable('/root/item' passing xml_data columns step_name
                        Varchar2(50) path 'step_name',
                        val_step Varchar2(50) path 'val_step',
                        pro_date Varchar2(50) path 'pro_date',
                        val_text Varchar2(4000) path 'val_text') x;
      p_data     := tmp_p_data;
      op_status  := '0'; --'assuming success code is' '0'
      op_message := 'done';
    Else
      op_status  := '1';
      op_message := 'no data found for this month';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
  End get_data_from_xml;*/

  /*Procedure get_data_listing_db_user_housekeeping(p_start_date In Date,
                                                  p_end_date   In Date,
                                                  op_db_user   Out ref_cur1,
                                                  op_status    Out Varchar2,
                                                  op_message   Out Clob) As
    v_check       Number;
    tmp_data_user ref_cur1;
  Begin
    --verify
    Select Count(a.staff_id)
      Into v_check
      From intuser.db_user_house_keeping a
     Where a.inserted_date Between p_start_date And p_end_date;
    If v_check > 0 Then
      Open tmp_data_user For
        Select rownum,
               a.staff_id,
               a.staff_name,
               a.db_username,
               a.user_role,
               a.current_status,
               to_char(a.created_date, 'dd-MON-YYYY') As created_date,
               to_char(a.last_login, 'dd-MON-YYYY') As last_login,
               a.dbname,
               a.inactive_days,
               to_char(a.inserted_date, 'dd-MON-YYYY') As inserted_date,
               a.remark,
               step.auth_status
          From intuser.db_user_house_keeping a
         Inner Join rpt_user_housekeeping_step step
            On to_char(step.process_date, 'MON-YYYY') =
               to_char(a.inserted_date, 'MON-YYYY')
           And step.step_id = 20001
         Where a.inserted_date Between p_start_date And p_end_date;
      op_db_user := tmp_data_user;
      op_status  := '1';
      op_message := 'get data successful';
    Elsif v_check = 0 Then
      op_status  := '0';
      op_message := 'no data found for this month';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
  End get_data_listing_db_user_housekeeping;
*/
  /*Procedure call_process_pull_db_user_housekeeping(p_user     In Varchar2,
                                                   p_debug    In Varchar2 Default 'NN',
                                                   p_date     In Varchar2,
                                                   op_status  Out Varchar2,
                                                   op_message Out Clob) As
    v_sql                          Varchar2(1000);
    tmp_status_insert_user_inform  Varchar2(2);
    tmp_status_insert_user_remove  Varchar2(2);
    tmp_status_insert_total_user   Varchar2(2);
    tmp_message_insert_user_inform Clob;
    tmp_message_insert_user_remove Clob;
    tmp_message_insert_total_user  Clob;
    v_check_privilege              Number := 0;
    tmp_count_user_inform          Number := 0;
    tmp_count_user_remove          Number := 0;
    tmp_count_total_user           Number := 0;
  Begin
    --dg_init(p_user, p_debug);
    --verify execute privilege on get_pull_db_user_housekeeping
    Begin
      Select Count(*)
        Into v_check_privilege
        From all_tab_privs
       Where table_name = 'GET_PULL_DB_USER_HOUSEKEEPING'
         And privilege = 'EXECUTE'
         And grantee = 'ITOAPP';
    End;
    If v_check_privilege = 1 Then
      Begin
        dbms_output.put_line('call get_pull_db_user_housekeeping');
        --if execute privilege is granted
        v_sql := 'begin intuser.get_pull_db_user_housekeeping; end;';
        --TODO
        --execute get_pull_db_user_housekeeping
        --execute immediate v_sql; -- todo: need uncomment
        dbms_output.put_line(v_sql);
      End;
       --insert proces stetus user inform
    
      Begin
        --get num user inform
        Select nvl((Select Count(*)
                     From intuser.db_user_house_keeping inf
                    Where inf.inactive_days Between 90 And 119
                      And lower(to_char(inf.inserted_date, 'MON-YYYY')) =
                          lower(to_char(to_date(lower(p_date),
                                                'dd-MON-YYYY'),
                                        'MON-YYYY'))),
                   0) As Result
          Into tmp_count_user_inform
          From dual;
        --get num user remove
        Select nvl((Select Count(*)
                     From intuser.db_user_house_keeping inf
                    Where inf.inactive_days > 119
                      And lower(to_char(inf.inserted_date, 'MON-YYYY')) =
                          lower(to_char(to_date(lower(p_date),
                                                'dd-MON-YYYY'),
                                        'MON-YYYY'))),
                   0) As Result
          Into tmp_count_user_remove
          From dual;
        --get num total user
        Select nvl((Select Count(*)
                     From intuser.db_user_house_keeping inf
                    Where lower(to_char(inf.inserted_date, 'MON-YYYY')) =
                          lower(to_char(to_date(lower(p_date),
                                                'dd-MON-YYYY'),
                                        'MON-YYYY'))),
                   0) As Result
          Into tmp_count_total_user
          From dual;
      End;
    
      Begin
        pro_insert_process_status(p_user,
                                  '201',
                                  '1',
                                  tmp_count_user_inform,
                                  'db user inform',
                                  to_date(lower(p_date), 'dd-MON-YYYY'),
                                  tmp_status_insert_user_inform,
                                  tmp_message_insert_user_inform);
        pro_insert_process_status(p_user,
                                  '202',
                                  '1',
                                  tmp_count_user_remove,
                                  'db user remove',
                                  to_date(lower(p_date), 'dd-MON-YYYY'),
                                  tmp_status_insert_user_remove,
                                  tmp_message_insert_user_remove);
        pro_insert_process_status(p_user,
                                  '203',
                                  '1',
                                  tmp_count_total_user,
                                  'db tatal user',
                                  to_date(lower(p_date), 'dd-MON-YYYY'),
                                  tmp_status_insert_total_user,
                                  tmp_message_insert_total_user);
      End;
      --verify by status insert step
    
      Begin
        If tmp_status_insert_user_inform = '1' And
           tmp_status_insert_user_remove = '1' And
           tmp_status_insert_total_user = '1' Then
          op_status  := '1';
          op_message := 'process successfully';
        End If;
      End;
    Elsif v_check_privilege = 0 Then
      op_status  := '0';
      op_message := 'this user not have premission to execute this procedure!';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);
  End call_process_pull_db_user_housekeeping;*/

  Procedure generate_email_content(p_brncode              Varchar2,
                                   p_date_created         Date,
                                   p_last_login_date      Date,
                                   p_inserted_date        Date,
                                   p_day_count_last_login Number,
                                   p_footer1              Varchar2,
                                   p_footer2              Varchar2,
                                   p_footer3              Varchar2,
                                   p_footer4              Varchar2,
                                   p_footer5              Varchar2,
                                   p_staff_id             Varchar2,
                                   p_staff_name           Varchar2,
                                   p_db_username          Varchar2,
                                   p_user_role            Varchar2,
                                   p_current_status       Varchar2,
                                   p_dbname               Varchar2,
                                   p_db_full_name         Varchar2,
                                   p_email_type           Varchar2,
                                   p_email_content        Out Clob) Is
    v_email_content Clob;
  Begin
    If p_email_type = 'BI' Then
      /* content for bi email*/
      v_email_content := '<h5 style="color: black;    "> dear teacher <b style="color:blue;  ">' ||
                         p_staff_name ||
                         '</b></h5><p style="font-size:15px;    ">' ||
                         ';;i hope you saw this email. ' ||
                         'i am reaching out to remind you about the importance of logging into the <a
            href="https://bi.hatthabank.com/xmlpserver/"
            style=" font-size:15px;      color: blue; text-decoration: none;   border-bottom: 1px solid blue;">bi</a> reporting system. ' ||
                         'to access it, kindly use your user id and password.</br></br>' ||
                         '<style>' || 'table, th, td {' ||
                         '  border-collapse: collapse;' ||
                         '  vertical-align: top;' ||
                         '  text-align: center;' ||
                         '  border: 1px solid black;' || '  width: fit;' ||
                         '  padding: 10px;' || '  padding-left: 10px;' ||
                         '  padding-right: 10px;' || '   ' || '}' ||
                         '</style>' ||
                         '<table style="font-size:14px;    ">' ||
                         '<tr style="background-color: #009da5; color: white;">' ||
                         '<th >branch code</th>' || '<th >staff id</th>' ||
                         '<th >user name</th>' || '<th >create date</th>' ||
                         '<th >last login</th>' || '<th >check date</th>' ||
                         '<th >inactive date</th>' || '</tr>' || '<tr>' ||
                         '<td>' || p_brncode || '</td>' || '<td >' ||
                         p_staff_id || '</td>' || '<td >' || p_staff_name ||
                         '</td>' || '<td >' ||
                         to_char(p_date_created, 'dd-MON-YYYY') || '</td>' ||
                         '<td >' ||
                         to_char(p_last_login_date, 'dd-MON-YYYY') ||
                         '</td>' || '<td >' ||
                         to_char(p_inserted_date, 'dd-MON-YYYY') || '</td>' ||
                         '<td >' || p_day_count_last_login || ' day' ||
                         '</td>' || '</tr>' || '</table></br>' || p_footer1 ||
                         'according to the procedures outlined in the bi administration manual, ' ||
                         'we proactively notify users who have not logged into the system for more than 90 days. ' ||
                         'for security and maintenance purposes, the isa department will remove access rights for users ' ||
                         'who have been inactive for more than 120 days. should you require access to the bi reporting ' ||
                         'system in the future, you can simply request it once again.' ||
                         '</br><p style="font-size:15px;    "> thanks & best regards. </p>
                           <td><p style="font-size:13px;    "><b>' ||
                         p_footer2 || '</b></br>' || p_footer3 || '</br>' ||
                         p_footer4 || '</br>' || p_footer5 || '</p></td>';
    Elsif p_email_type = 'DB' Then
      /*  content for db email*/
      v_email_content := '<h5 style="color: black;    "> dear teacher <b style="color:blue;  ">' ||
                         p_staff_name ||
                         '</b></h5><p style="font-size:15px;    ">' ||
                         ';;i hope you saw this email.  i am reaching out to remind you about the importance of logging into the database.  ' ||
                         '</br></br>' || '<style>' || 'table, th, td {' ||
                         '  border-collapse: collapse;' ||
                         '  vertical-align: top;' ||
                         '  text-align: center;' ||
                         '  border: 1px solid black;' || '  width: fit;' ||
                         '  padding: 10px;' || '  padding-left: 10px;' ||
                         '  padding-right: 10px;' || '   ' || '}' ||
                         '</style>' ||
                         '<table style="font-size:14px;    ">' ||
                         '<tr style="background-color: #009da5; color: white;">' ||
                         '<th >staff_id</th>' || '<th >staff_name</th>' ||
                         '<th >db_username</th>' || '<th >user_role</th>' ||
                         '<th >current_status</th>' ||
                         '<th >created_date</th>' || '<th >last_login</th>' ||
                         '<th >inactive_days</th>' || '<th >dbname</th>' ||
                         '<th style=" ">db_full_name</th>' || '</tr>' ||
                         '<tr>' || '<td>' || p_staff_id || '</td>' ||
                         '<td>' || p_staff_name || '</td>' || '<td >' ||
                         p_db_username || '</td>' || '<td>' || p_user_role ||
                         '</td>' || '<td>' || p_current_status || '</td>' ||
                         '<td >' || to_char(p_date_created, 'dd-MON-YYYY') ||
                         '</td>' || '<td >' ||
                         to_char(p_last_login_date, 'dd-MON-YYYY') ||
                         '</td>' || '<td>' || p_last_login_date || ' day' ||
                         '</td>' || '<td >' || p_dbname || '</td>' ||
                         '<td >' || p_db_full_name || '</td>' || '</tr>' ||
                         '</table></br><p style="font-size:15px;    ">' ||
                         p_footer1 ||
                         'as part of database security and db user housekeeping, i’d like to request you to be informed of the list ' ||
                         'of 120 days inactive db users who never logged into the database from the last login date or created date. ' ||
                         'to prevent your users from being categorized as inactive, please log into each database of your users at least once every 90 days. ' ||
                         'this email is to notify you that the dba unit of the isa department will remove access rights for users who have been inactive ' ||
                         'for more than 120 days. if you need access to the database user in the future, you can simply request it once again.' ||
                         '</br></br>for users who are in expired or locked status and caNNot log in with the current password, please use the <a href="https://hds.hatthabank.com:8444/Login" style=" font-size:15px;      color: blue; text-decoration: none;   border-bottom: 1px solid blue;">helpdesk system</a> ' ||
                         'to request a password reset or unlock.' ||
                         '</br></br>best regards, </p><p style="font-size:15px;    "><b>' ||
                         p_footer2 || '</b></br>' || p_footer3 || '</br>' ||
                         p_footer4 || '</br>' || p_footer5 || '</p>';
    Else
      raise_application_error(-20001,
                              'invalid email type: ' || p_email_type);
    End If;
  
    p_email_content := v_email_content;
  End generate_email_content;

  Procedure send_email_inform_user(p_user        In Varchar2,
                                   p_debug       In Varchar2 Default 'NN',
                                   p_report_date In Date,
                                   p_type_used   In Varchar2,
                                   /*p_user_inform In Varchar2,*/
                                   op_status  Out Varchar2,
                                   op_message Out Clob) As
    s_date         Varchar2(10);
    s_emailcc      Clob := 'khim.meok@hatthabank.com';
    s_emailfrom    Clob := 'bi_system@hatthabank.com';
    s_mail_server  Clob := 'mail.hatthabank.com';
    s_emailsubject Clob;
    s_emailto      Clob;
    s_html_msg     Clob;
    footer1        Varchar2(250) := '<b style="color:red; font-size:15px;">note</b>: ';
    footer2        Varchar2(250) := 'it operations and system admin department';
    footer3        Varchar2(250) := 'email: isa_group@hatthabank.com';
    footer4        Varchar2(250) := 'mobile: (855) 93 222 923, 93 222 905';
    footer5        Varchar2(250) := '#606, st.271, sansam kosal 3 village, boeng tumpun 1 sangkat, mean chey khan, phnom penh capital';
  Begin
    --dg_init(p_user, p_debug);
    Select to_char(p_report_date, 'MON-YYYY') Into s_date From dual;
    If p_type_used = 'BI' Then
      s_emailsubject := 'inform to login in bi system';
      For loopuser In (Select Distinct a.user_id,
                                       upper(ad.display_name) username,
                                       Case
                                         When ad.office = 'Head Office' Then
                                          '000'
                                         Else
                                          ad.office
                                       End As brn_code,
                                       to_char(z.create_date, 'dd-MON-YYYY') date_created,
                                       a.day_count_last_login,
                                       Case
                                         When a.last_login_date Like ' ' Then
                                          substr(a.last_login_date,
                                                 1,
                                                 instr(a.last_login_date, ' ') - 1)
                                         Else
                                          to_char(a.last_login_date)
                                       End As last_login_date,
                                       to_char(a.inserted_date,
                                               'dd-MON-YYYY') inserted_date,
                                       ad.email As staff_mail
                         From rpt_bip_iau_tbl_house_keeping a
                         Left Join rpt_user_mgt_user_system z
                           On z.user_system = a.user_id
                         Left Join current_ad_users ad
                           On a.user_id = ad.user_id
                        Where to_char(to_date(a.report_date, 'dd-MON-YYYY'),
                                      'MON-YYYY') =
                              to_char(p_report_date, 'MON-YYYY')
                          And a.day_count_last_login >= 90
                          And a.day_count_last_login <= 119
                          And z.record_status = 'O'
                          And rownum < 10 /* todo: remove limit*/
                       ) Loop
        Select listagg(a.email, ',')
          Into s_emailto
          From current_ad_users a
         Where a.user_id In ('11225');
        generate_email_content(p_brncode              => loopuser.brn_code,
                               p_date_created         => loopuser.date_created,
                               p_last_login_date      => loopuser.last_login_date,
                               p_inserted_date        => loopuser.inserted_date,
                               p_day_count_last_login => loopuser.day_count_last_login,
                               p_footer1              => footer1,
                               p_footer2              => footer2,
                               p_footer3              => footer3,
                               p_footer4              => footer4,
                               p_footer5              => footer5 || ' ->' ||
                                                         loopuser.staff_mail,
                               p_staff_id             => loopuser.user_id,
                               p_staff_name           => loopuser.username,
                               p_db_username          => '',
                               p_user_role            => '',
                               p_current_status       => '',
                               p_dbname               => '',
                               p_db_full_name         => '',
                               p_email_type           => 'BI',
                               p_email_content        => s_html_msg);
        /*If loopuser.user_id Is Not Null Then
          "SEND_EMAIL"(p_to        => s_emailto,
                       p_from      => s_emailfrom,
                       p_cc        => s_emailcc,
                       p_subject   => s_emailsubject,
                       p_text_msg  => '',
                       p_html_msg  => s_html_msg,
                       p_smtp_host => s_mail_server);
        End If;*/
      End Loop;
      /*  mail for db*/
    Elsif p_type_used = 'DB' Then
      s_emailsubject := 'inform to login into database';
      /*For loopuser In (Select *
                         From intuser.db_user_house_keeping a
                        Where to_char(a.inserted_date, 'MON-YYYY') =
                              to_char(p_report_date, 'MON-YYYY')
                          And a.inactive_days Between 90 And 120
                       \*(a.staff_id || '~' || a.db_username) in
                       (select regexp_substr(p_user_inform,
                                             '[^,]+',
                                             1,
                                             level) as v_end_point_id
                          from dual
                        coNNect by regexp_substr(p_user_inform,
                                                 '[^,]+',
                                                 1,
                                                 level) is not null)*\
                       ) Loop
        Select listagg(a.email, ',')
          Into s_emailto
          From current_ad_users a
         Where a.user_id In ('11225');
        generate_email_content(p_brncode              => '',
                               p_date_created         => loopuser.created_date,
                               p_last_login_date      => loopuser.last_login,
                               p_inserted_date        => loopuser.inserted_date,
                               p_day_count_last_login => loopuser.inactive_days,
                               p_footer1              => footer1,
                               p_footer2              => footer2,
                               p_footer3              => footer3,
                               p_footer4              => footer4,
                               p_footer5              => footer5,
                               p_staff_id             => loopuser.staff_id,
                               p_staff_name           => loopuser.staff_name,
                               p_db_username          => loopuser.db_username,
                               p_user_role            => loopuser.user_role,
                               p_current_status       => loopuser.current_status,
                               p_dbname               => loopuser.dbname,
                               p_db_full_name         => loopuser.remark,
                               p_email_type           => 'DB',
                               p_email_content        => s_html_msg);
        If loopuser.staff_id Is Not Null Then
          "SEND_EMAIL"(p_to        => s_emailto,
                       p_from      => s_emailfrom,
                       p_cc        => s_emailcc,
                       p_subject   => s_emailsubject,
                       p_text_msg  => '',
                       p_html_msg  => s_html_msg,
                       p_smtp_host => s_mail_server);
        End If;
      End Loop;*/
    End If;
  
    op_status  := '1';
    op_message := 'send email inform successfully';
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End send_email_inform_user;

  Procedure pro_insert_process_status(p_user         In Varchar2,
                                      p_status_id    In Varchar2,
                                      p_status       In Varchar2,
                                      p_status_count In Varchar2,
                                      p_message      In Clob,
                                      /* p_process_data In Clob,*/
                                      p_process_date In Date,
                                      /*p_tab_process  In Varchar2,*/
                                      op_status  Out Varchar2,
                                      op_message Out Clob) As
    v_auto_id Number;
    record_id Number;
  Begin
    Select nvl((Select s.id
                 From rpt_user_housekeeping_status_log s
                Where s.record_status = 'O'
                  And s.status_id = p_status_id
                  And to_char(s.insert_date, 'MON-YYYY') =
                      to_char(p_process_date, 'MON-YYYY')),
               0)
      Into record_id
      From dual;
    If record_id = 0 Then
      v_auto_id := fn_auto_id_user_housekeeping('rpt_user_housekeeping_status_log',
                                                'id');
      Insert Into rpt_user_housekeeping_status_log
        (id,
         status_id,
         status,
         status_count,
         message,
         record_status,
         insert_date,
         user_maker)
      Values
        (v_auto_id,
         p_status_id,
         p_status,
         p_status_count,
         p_message,
         'O',
         p_process_date,
         p_user);
      Commit;
      op_status  := '1';
      op_message := 'status insert successfully';
    Elsif record_id <> 0 Then
      /*update status to 'd' if exist*/
      Update rpt_user_housekeeping_status_log a
         Set a.record_status = 'D'
       Where a.id = record_id;
      v_auto_id := fn_auto_id_user_housekeeping('rpt_user_housekeeping_status_log',
                                                'id');
      Insert Into rpt_user_housekeeping_status_log
        (id,
         status_id,
         status,
         status_count,
         message,
         record_status,
         insert_date,
         user_maker)
      Values
        (v_auto_id,
         p_status_id,
         p_status,
         p_status_count,
         p_message,
         'O',
         p_process_date,
         p_user);
      Commit;
      op_status  := '1';
      op_message := 'status insert successfully';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End pro_insert_process_status;

  Procedure get_bi_user_close(p_user          In Varchar2,
                              p_debug         In Varchar2 Default 'NN',
                              op_date_report  Date,
                              op_data_bi_user Out ref_cur1,
                              op_status       Out Varchar2,
                              op_message      Out Clob) As
    tmp_bi_user    ref_cur1;
    v_count        Number := 0;
    v_message      Clob := 'no error found! (defualt message)';
    op_tmp_status  Number := -1;
    op_tmp_message Clob;
  Begin
    --dg_init(p_user, p_debug);
    Select nvl(Count(*), 0)
      Into v_count
      From rpt_bip_iau_tbl_house_keeping a
     Inner Join current_ad_users ad
        On a.user_id = ad.user_id
     Where a.day_count_last_login >= 120
       And to_char(to_date(a.report_date, 'DD-MON-YYYY'), 'MON-YYYY') =
           to_char(op_date_report, 'MON-YYYY');
    If v_count > 0 Then
      Open tmp_bi_user For
        Select rownum As id, c.*
          From (Select a.user_id,
                       ad.display_name,
                       ad.title,
                       (Case
                         When a.day_count_last_login > 120 Then
                          'Inactive user'
                         Else
                          'Inform'
                       End) As close_type,
                       a.report_date
                  From rpt_bip_iau_tbl_house_keeping a
                 Inner Join current_ad_users ad
                    On a.user_id = ad.user_id
                 Where a.day_count_last_login >= 120
                   And to_char(to_date(a.report_date, 'DD-MON-YYYY'),
                               'MON-YYYY') =
                       to_char(op_date_report, 'MON-YYYY')) c;
      pro_insert_process_status(p_user,
                                105,
                                (Case When v_count > 0 Then '1' Else '1' End),
                                /*todo: change to -1 if < 0*/
                                v_count,
                                v_message,
                                op_date_report,
                                op_tmp_status,
                                op_tmp_message);
      If op_tmp_status = 1 Then
        op_data_bi_user := tmp_bi_user;
        op_status       := '1';
        op_message      := 'Success';
      End If;
    Else
      op_status  := '-1';
      op_message := 'No data found!';
    End If;
  
    Commit;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End get_bi_user_close;

  Procedure insert_bi_user_close(p_user         In Varchar2,
                                 p_debug        In Varchar2 Default 'NN',
                                 op_date_report Date,
                                 op_status      Out Varchar2,
                                 op_message     Out Clob) As
    v_count        Number := 0;
    v_message      Varchar2(1000) := 'no error found! (defualt message)';
    op_tmp_status  Number := -1;
    op_tmp_message Varchar2(1000);
  Begin
    --dg_init(p_user, p_debug);
    Begin
      Insert Into sp_user_close_pre_new
        (user_id, type_close, report_dt)
        Select a.user_id, 'inactive user', a.report_date
          From rpt_bip_iau_tbl_house_keeping a
         Where a.day_count_last_login >= 120
           And to_char(add_months(a.inserted_date, -1), 'MON-YYYY') =
               to_char(op_date_report, 'MON-YYYY');
      v_count := Sql%Rowcount;
    End;
    pro_insert_process_status(p_user,
                              106,
                              (Case When v_count > 0 Then '1' Else '1' End),
                              /*todo : change to -1 if < 0*/
                              v_count,
                              v_message,
                              op_date_report,
                              op_tmp_status,
                              op_tmp_message);
    If op_tmp_status = 1 Then
      op_status  := '1';
      op_message := 'insert data successfully';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End insert_bi_user_close;

  Procedure bi_inactive_operations(p_user                 In Varchar2,
                                   p_debug                In Varchar2 Default 'NN',
                                   p_operation            In Varchar2,
                                   p_record_id            In Number,
                                   p_user_id              In Varchar2 Default Null,
                                   p_description          In Varchar2 Default Null,
                                   p_last_login_date      In Varchar2 Default Null,
                                   p_day_count_last_login In Varchar2 Default Null,
                                   p_report_date          In Varchar2 Default Null,
                                   p_date_created         In Varchar2 Default Null,
                                   p_inserted_date        In Varchar2 Default Null,
                                   p_get_data             Out ref_cur1,
                                   op_status              Out Varchar2,
                                   op_message             Out Clob) As
    tmp_data ref_cur1;
  Begin
    --dg_init(p_user, p_debug);
    If lower(p_operation) = 'update' Then
      Update rpt_bip_iau_tbl_house_keeping bi
         Set bi.user_id              = p_user_id,
             bi.description          = p_description,
             bi.last_login_date      = p_last_login_date,
             bi.day_count_last_login = p_day_count_last_login,
             bi.report_date          = p_report_date,
             bi.date_created         = p_date_created,
             bi.inserted_date        = p_inserted_date
       Where bi.id = p_record_id;
      op_status  := '1';
      op_message := 'update successfully.';
      /* delete operation*/
    Elsif lower(p_operation) = 'delete' Then
      Update rpt_bip_iau_tbl_house_keeping a
         Set a.status = 'd'
       Where a.id = p_record_id;
      op_status  := '1';
      op_message := 'delete data successfully.';
    Elsif lower(p_operation) = 'getbyid' Then
      Open tmp_data For
        Select a.id,
               a.user_id,
               a.description,
               a.last_login_date,
               a.day_count_last_login,
               a.report_date,
               a.date_created,
               a.inserted_date
          From rpt_bip_iau_tbl_house_keeping a
         Where a.id = p_record_id;
      p_get_data := tmp_data;
      op_status  := '1';
      op_message := 'get data successfully.';
    Else
      op_status  := '-1';
      op_message := 'invalid operation';
    End If;
  
    Commit;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm;
  End bi_inactive_operations;

  Procedure get_report_deletion_listing(p_user           In Varchar2,
                                        p_debug          In Varchar2 Default 'NN',
                                        p_date           In Date,
                                        op_data_deletion Out ref_cur1,
                                        op_status        Out Varchar2,
                                        op_message       Out Clob) As
    tmp_delection_report ref_cur1;
    v_count_status_log   Number := 0;
  Begin
    --dg_init(p_user, p_debug);
    Select nvl(Count(*), 0)
      Into v_count_status_log
      From rpt_user_mgt_user_system us
     Inner Join rpt_user_mgt_request r
        On r.request_id = us.request_id
     Inner Join current_ad_users ep
        On r.request_staff_id = ep.user_id
     Where upper(to_char(add_months(trunc(us.last_oper_date), -1),
                         'MON-YYYY')) = upper(to_char(p_date, 'MON-YYYY'))
       And us.last_oper_id = 'SYSTEM'
       And us.record_status = 'C'
       And r.record_status = 'C'
       And us.user_system = r.request_staff_id
       And us.system_name = 'BI';
    If v_count_status_log > 0 Then
      Open tmp_delection_report For
        Select row_number() over(Order By 10 Asc) no, z.*
          From (Select r.branch_code As brn_code,
                       Case
                         When r.branch_code = '000' Then
                          ep.jobtitle
                         Else
                          ep.branchid
                       End As branch_name,
                       us.user_system As user_id,
                       upper(r.request_name) As user_name,
                       r.request_position As position,
                       to_char(r.request_date, 'dd-MON-YYYY') As request_date,
                       to_char(us.create_date, 'dd-MON-YYYY') As create_date,
                       to_char(us.last_oper_date, 'dd-MON-YYYY') As close_date,
                       Case
                         When us.record_status = 'C' Then
                          'CLOSE'
                         Else
                          us.record_status
                       End As status,
                       Case
                         When us.remark Is Null Then
                          ''
                         Else
                          us.remark
                       End As remark
                  From rpt_user_mgt_user_system us
                 Inner Join rpt_user_mgt_request r
                    On r.request_id = us.request_id
                  Left Join smtb_employee ep
                    On r.request_staff_id = ep.sidcard
                 Where upper(to_char(add_months(trunc(us.last_oper_date), -1),
                                     'MON-YYYY')) =
                       upper(to_char(p_date, 'MON-YYYY'))
                   And us.last_oper_id = 'SYSTEM'
                   And us.record_status = 'C'
                   And r.record_status = 'C'
                   And us.user_system = r.request_staff_id
                   And us.system_name = 'BI') z
         Order By z.remark Asc;
      op_data_deletion := tmp_delection_report;
      op_status        := '1';
      op_message       := 'Get BI deletion success';
    Elsif v_count_status_log = 0 Then
      op_status  := '-1';
      op_message := 'No data found!';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End get_report_deletion_listing;

  Procedure get_user_update_status_listing(p_user     In Varchar2,
                                           p_debug    In Varchar2 Default 'NN',
                                           p_date     In Varchar2,
                                           op_data    Out ref_cur1,
                                           op_status  Out Varchar2,
                                           op_message Out Clob) As
    tmp_cur_data       ref_cur1;
    v_count_status_log Number := 0;
  Begin
    --dg_init(p_user, p_debug);
    Select nvl(Count(*), 0)
      Into v_count_status_log
      From rpt_user_mgt_user_system us
     Inner Join rpt_user_mgt_request r
        On r.request_id = us.request_id
     Inner Join current_ad_users ep
        On r.request_staff_id = ep.user_id
     Where upper(to_char(add_months(trunc(us.last_oper_date), -1),
                         'MON-YYYY')) = upper(p_date)
       And us.last_oper_id = 'SYSTEM'
       And us.record_status = 'C'
       And r.record_status = 'C'
       And us.user_system = r.request_staff_id
       And us.system_name = 'BI';
    If v_count_status_log > 0 Then
      Open tmp_cur_data For
        Select row_number() over(Order By 10 Asc) no, z.*
          From (Select r.branch_code As brn_code,
                       us.user_system As user_id,
                       upper(r.request_name) As user_name,
                       Case
                         When us.record_status = 'C' Then
                          'CLOSE'
                         Else
                          us.record_status
                       End As current_status,
                       ul.user_status As previous_status,
                       ep.jobtitle As position,
                       to_char(r.request_date, 'dd-MON-YYYY') As request_date,
                       to_char(us.create_date, 'dd-MON-YYYY') As create_date,
                       to_char(us.last_oper_date, 'dd-MON-YYYY') As close_date,
                       Case
                         When ep.branchname = 'Head Office' Then
                          '000'
                         Else
                          ep.branchname
                       End As branch_name,
                       Case
                         When us.remark Is Null Then
                          ''
                         Else
                          us.remark
                       End As remark
                  From rpt_user_mgt_user_system us
                 Inner Join rpt_user_mgt_request r
                    On r.request_id = us.request_id
                  Left Join smtb_employee ep
                    On r.request_staff_id = ep.sidcard
                  Left Join rpt_user_mgt_user_system_log ul
                    On us.request_id = ul.request_id
                   And ul.mod_no < us.mod_no
                 Where upper(to_char(add_months(trunc(us.last_oper_date), -1),
                                     'MON-YYYY')) = upper(p_date)
                   And us.last_oper_id = 'SYSTEM'
                   And us.record_status = 'C'
                   And r.record_status = 'C'
                   And us.request_id = r.request_id
                   And us.system_name = 'BI') z
         Order By z.remark Asc;
      op_data    := tmp_cur_data;
      op_status  := '1';
      op_message := 'Get BI deletion success';
    Elsif v_count_status_log = 0 Then
      op_status  := '-1';
      op_message := 'No data found!';
    End If;
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End get_user_update_status_listing;

  Procedure pro_get_notifi(p_date     In Date,
                           p_data_cur Out ref_cur1,
                           op_status  Out Varchar2,
                           op_message Out Clob) As
    tmp_cur_data ref_cur1;
  Begin
    Open tmp_cur_data For
      With data_notifi As
       (Select noti.*,
               Case
                 When noti.ref_id = step.step_id And step.auth_status = 'U' Then
                  1
                 Else
                  0
               End As show_noti
          From rpt_iau_notifi_data noti
          Left Join (Select dd.step_num + 1 As step_id, d.auth_status
                      From rpt_user_housekeeping_step d
                     Inner Join rpt_user_housekeeping_data dd
                        On d.step_id = dd.id_by_category
                     Where dd.category = 'step'
                       And d.process_date = p_date) step
            On noti.ref_id = step.step_id)
      --tab
      Select tab_menu.name, tab_menu.show_noti, tab_menu.element_id
        From data_notifi tab_menu
       Where tab_menu.id In (4, 5)
      Union All
      --sub
      Select sub_menu.name,
             Sum(tab_menu.show_noti) As count_noti,
             sub_menu.element_id
        From data_notifi sub_menu
       Inner Join data_notifi tab_menu
          On sub_menu.id = tab_menu.sub_id
       Where sub_menu.id In (2, 3)
       Group By sub_menu.name, sub_menu.element_id
      Union All
      --main
      Select main_menu.name,
             Sum(sub_menu.count_noti) As count_noti,
             main_menu.element_id
        From data_notifi main_menu
       Inner Join (Select sub_menu.sub_id,
                          Sum(tab_menu.show_noti) As count_noti
                     From data_notifi sub_menu
                    Inner Join data_notifi tab_menu
                       On sub_menu.id = tab_menu.sub_id
                    Where sub_menu.id In (2, 3)
                    Group By sub_menu.sub_id) sub_menu
          On main_menu.sub_id = sub_menu.sub_id
       Where main_menu.id = 1
       Group By main_menu.name, main_menu.element_id;
  
    p_data_cur := tmp_cur_data;
  
    op_status  := '1';
    op_message := 'success';
  
  Exception
    When Others Then
      Rollback;
      op_status  := '-1';
      op_message := 'error: ' || Sqlerrm || ' -> ' ||
                    dbms_utility.format_error_backtrace;
      /*dg_print('error: ' || Sqlerrm || ' -> ' ||
               dbms_utility.format_error_backtrace);*/
  End pro_get_notifi;

End rpt_bi_report;
/
