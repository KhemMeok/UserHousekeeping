PROCEDURE PR_INSERT_EOC_DURATION(P_STEP_NO VARCHAR2,
P_START_TIME VARCHAR2,
P_END_TIME VARCHAR2,
P_COMPLETED_STAT VARCHAR2 DEFAULT 'Y',
P_REGISTER VARCHAR2,
P_DEBUG VARCHAR2 DEFAULT 'NN',
P_REMARK VARCHAR2,
OP_STATUS OUT VARCHAR2,
OP_MESSAGE OUT CLOB)IS
SAUTO_ID NUMBER;
SAUTO_PULL CHAR(1);
SFROM_STAGE RPT_EOC_STEPS.FROM_STAGE%TYPE;
STO_STAGE RPT_EOC_STEPS.TO_STAGE%TYPE;
SRPT_TYPE VARCHAR2(3):=FN_RPT_TYPE;
SRPT_DATE DATE:=FN_RPT_DATE;
SSTART_TIME VARCHAR2(20);
SEND_TIME VARCHAR2(20);
SCHECK NUMBER;
SUPDATE_STAT CHAR(1):='N';
SID NUMBER;
STOTAL_BRANCHES NUMBER;
SCOMP_STAT VARCHAR2(1);
SPULLED_DATE DATE;
SRP_NAME VARCHAR2(50);
SSSH_SCRIPT CLOB;
SSQL_SCRIPT CLOB;
SINDEX NUMBER:=0;
STOTAL_BI_BAK_COUNT NUMBER;
STOTAL_BI_RES_COUNT NUMBER;
SHTML CLOB;
SUSERNAME VARCHAR2(50);
SCOUNT_HISTORY_REC NUMBER;
SESTIMATE_TIME NUMBER;
TMP_DURATION NUMBER;
BOOL_COMPARE_ESTIMATE BOOLEAN;
BEGIN
   V_COM_STAT:='N';
   DG_INIT(P_REGISTER, P_DEBUG);
   DG_PRINT('Inside PR_INSERT_EOC_DURATION');
   DG_PRINT('Report Type: '
            || SRPT_TYPE);
   DG_PRINT('Report Date: '
            || SRPT_DATE);
   DG_PRINT('Inserting step: '
            || P_STEP_NO);
   SCOMP_STAT:=P_COMPLETED_STAT;
   SELECT COUNT(1)INTO SCHECK
   FROM RPT_EOC_STEPS A
   WHERE A.EOC_TYPE=SRPT_TYPE
      AND A.RECORD_STAT='O'
      AND A.STEP_NO=P_STEP_NO;
   IF SCHECK=0 THEN OP_STATUS:='-1';
      OP_MESSAGE:='Report step is not existed in step detail';
      DG_PRINT(OP_MESSAGE);
      RETURN;
   END IF;
   SELECT COUNT(1)INTO SCHECK
   FROM RPT_EOC_DURATION A
   WHERE A.EOC_TYPE=SRPT_TYPE
      AND A.RPT_DATE=SRPT_DATE
      AND A.STEP_NO=P_STEP_NO
      AND A.RECORD_STAT='O';
   IF SCHECK<>0 THEN
      SELECT COUNT(1)INTO SCHECK
      FROM RPT_EOC_DURATION A
      WHERE A.EOC_TYPE=SRPT_TYPE
         AND A.RPT_DATE=SRPT_DATE
         AND A.STEP_NO=P_STEP_NO
         AND A.COMPLETED='N'
         AND A.RECORD_STAT='O';
      IF SCHECK=0 THEN OP_STATUS:='-1';
         OP_MESSAGE:='Report step is already existed';
         DG_PRINT(OP_MESSAGE);
         RETURN;
      END IF;
      SELECT A.ID INTO SID
      FROM RPT_EOC_DURATION A
      WHERE A.EOC_TYPE=SRPT_TYPE
         AND A.RPT_DATE=SRPT_DATE
         AND A.STEP_NO=P_STEP_NO
         AND A.COMPLETED='N'
         AND A.RECORD_STAT='O';
      SUPDATE_STAT:='Y';
   END IF;
   SELECT MAX(A.ID)INTO SAUTO_ID
   FROM RPT_EOC_DURATION A;
   IF SAUTO_ID IS NULL THEN SAUTO_ID:=1;
   ELSE SAUTO_ID:=SAUTO_ID+1;
   END IF;
   DG_PRINT('Auto ID: '
            || SAUTO_ID);
   SELECT A.AUTO_AVA, A.FROM_STAGE, A.TO_STAGE INTO SAUTO_PULL, SFROM_STAGE, STO_STAGE
   FROM RPT_EOC_STEPS A
   WHERE A.EOC_TYPE=SRPT_TYPE
      AND A.STEP_NO=P_STEP_NO
      AND A.RECORD_STAT='O';
   DG_PRINT('Auto Pull: '
            || SAUTO_PULL);
   DG_PRINT('From Stage: '
            || SFROM_STAGE);
   DG_PRINT('To Stage: '
            || STO_STAGE);
   IF SUPDATE_STAT='N' THEN IF SAUTO_PULL<>'Y' THEN SSTART_TIME:=P_START_TIME;
         SEND_TIME:=P_END_TIME;
         DG_PRINT('Start time: '
                  || SSTART_TIME);
         DG_PRINT('End time: '
                  || SEND_TIME);
         DG_PRINT('Format datatime to 24 hour');
         PR_ALTER_DT_24;
 --Get estimated time
         SELECT TO_NUMBER(DU.ESTIMATED_TIME_MIN)INTO SESTIMATE_TIME
         FROM RPT_EOC_ESTIMATED_STEP_DURATION DU
         WHERE DU.EOC_TYPE=SRPT_TYPE
            AND DU.STEP_NO=P_STEP_NO;
         TMP_DURATION:=FN_GET_DURATION_BT_2_DATE(SSTART_TIME, SEND_TIME);
 --Check duration with estimated time
         CASE
            WHEN TMP_DURATION>0 AND TMP_DURATION<=SESTIMATE_TIME THEN BOOL_COMPARE_ESTIMATE:=TRUE;
            WHEN TMP_DURATION>0 AND TMP_DURATION>SESTIMATE_TIME AND P_REMARK IS NOT NULL THEN BOOL_COMPARE_ESTIMATE:=TRUE;
            ELSE OP_STATUS:='-1';
               OP_MESSAGE:='Report duration is out of range estimated time, Pls input remark for this step!';
               ROLLBACK;
               RETURN;
         END CASE;
         IF(BOOL_COMPARE_ESTIMATE=TRUE)THEN INSERT INTO RPT_EOC_DURATION(
               EOC_TYPE, STEP_NO, START_TIME, END_TIME, COMPLETED, REGISTERED_BY, RPT_DATE, ID, REMARK
            )VALUES(
               SRPT_TYPE, P_STEP_NO, SSTART_TIME, SEND_TIME, SCOMP_STAT, P_REGISTER, SRPT_DATE, SAUTO_ID, P_REMARK
            );
         END IF;
         DG_PRINT('Data inserted: '
                  || SQL%ROWCOUNT);
         DG_PRINT('Format datatime to default');
         PR_ALTER_DT_DEF;
      ELSE
 -- WHEN AUTO
         IF SFROM_STAGE NOT IN('UPDATE_DORMANCY', 'RESTORE_POINT', 'BI_BAK_RES', 'FULL_TB')THEN
            SELECT COUNT(1)INTO SCHECK
            FROM(
                  SELECT A.BRANCH_CODE
                  FROM AETB_EOC_BRANCHES A
                  WHERE A.TARGET_STAGE=STO_STAGE
                     AND A.RUNNING_STAGE=STO_STAGE
                     AND A.EOC_STATUS='C'
                     AND A.EOD_DATE=SRPT_DATE
 --WHEN BRANCH ABORTED AND EOD DATE CHANGE >=
                  UNION
                  ALL
                  SELECT B.BRANCH_CODE
                  FROM AETB_EOC_BRANCHES_HISTORY B
                  WHERE B.TARGET_STAGE=STO_STAGE
                     AND B.RUNNING_STAGE=STO_STAGE
                     AND B.EOC_STATUS='C'
                     AND B.EOD_DATE=SRPT_DATE
               ) ;
 --WHEN BRANCH ABORTED AND EOD DATE CHANGE >=
 ---UPDATE FOR EOD STEP IF EOC ABORTED AT STAGE > 9TH
            DG_PRINT('Total finished stage '
                     || STO_STAGE
                     || ' : '
                     || SCHECK);
            SELECT COUNT(1)INTO STOTAL_BRANCHES
            FROM STTM_BRANCH A
            WHERE A.RECORD_STAT='O';
            DG_PRINT('Total branches :'
                     || STOTAL_BRANCHES);
            IF SCHECK<STOTAL_BRANCHES THEN OP_STATUS:='-1';
               OP_MESSAGE:='All Branches are not yet finished stage '
                           || STO_STAGE;
               DG_PRINT(OP_MESSAGE);
               RETURN;
            ELSE IF STO_STAGE='POSTEOFI_3' THEN FOR I IN(
                     SELECT A.BRANCH_CODE
                     FROM STTM_BRANCH A
                     WHERE A.RECORD_STAT='O'
                     ORDER BY A.BRANCH_CODE
                  )LOOP
 --- PULL GL BALANCE
                     INTUSER.PR_HTB_PULL_GL_DAILY_BAL(I.BRANCH_CODE, OP_MESSAGE);
                     COMMIT;
                     IF TO_CHAR(OP_MESSAGE)='Branch successully pulled GL Balance' THEN SINDEX:=SINDEX+1;
                     END IF;
                     DG_PRINT('GL branch '
                              || I.BRANCH_CODE
                              || ': '
                              || OP_MESSAGE);
                  END LOOP;
 /*SELECT COUNT(1)
               INTO SCHECK
               FROM HTB_PULL_GL_DAILY_BAL_MASTER A
              WHERE A.BRANCH_DATE = SRPT_DATE
                AND A.PULL_STAT = 'Y';*/
                  DG_PRINT('Total branches pulled :'
                                                                                                                                                                                                                     || SINDEX);
                  DG_PRINT('Total branches :'
                           || STOTAL_BRANCHES);
                  IF SCHECK=SINDEX THEN SCOMP_STAT:='Y';
                     DG_PRINT('Completed stat: '
                              || SCOMP_STAT);
                  ELSE SCOMP_STAT:='N';
                     DG_PRINT('Completed stat: '
                              || SCOMP_STAT);
                  END IF;
               END IF;
               IF STO_STAGE='POSTEOPD_3' THEN
 -- PULL EODM TIME
                  INSERT INTO RPT_BRANCHES_EODM
                     SELECT A.BRANCHCODE AS BRANCH_CODE, MAX(B.SYSTEM_START_TIME)  AS OPEN_SCREEN, A.WFINITDATE AS START_RUN, MIN(B.SYSTEM_END_TIME)  AS CLOSE_SCREEN, C.TODAY AS BRANCH_DATE, C.NEXT_WORKING_DAY, A.MAKERID, SRPT_DATE
                     FROM FBTB_TXNLOG_MASTER A
                        INNER JOIN SMTB_SMS_LOG B
                        ON A.FUNCTIONID=B.FUNCTION_ID
                        AND A.BRANCHCODE=B.BRANCH_CODE
                        INNER JOIN STTM_DATES C
                        ON A.BRANCHCODE=C.BRANCH_CODE
                        INNER JOIN STTB_BRN_EODM D
                        ON A.BRANCHCODE=D.BRANCH_CODE
                     WHERE A.POSTINGDATE=C.TODAY
                        AND A.FUNCTIONID='EODM'
                        AND A.TXNSTATUS='COM'
                        AND A.STAGESTATUS='COM'
                        AND B.EXIT_FLAG=1
                        AND D.RUN_DATE=C.PREV_WORKING_DAY
                        AND D.EOD_RUN='Y'
                        AND A.WFINITDATE<=B.SYSTEM_END_TIME
                        AND B.SYSTEM_START_TIME<=A.WFINITDATE
                     GROUP BY A.BRANCHCODE, B.SYSTEM_START_TIME, A.WFINITDATE, A.MAKERID, C.TODAY, C.NEXT_WORKING_DAY
                     ORDER BY A.BRANCHCODE;
 -- PULL TILLS
                  INSERT INTO RPT_FBTB_TILL_TOTALS
                     SELECT A.*, SRPT_DATE
                     FROM FBTB_TILL_TOTALS A
                        INNER JOIN FBTM_BRANCH_INFO B
                        ON A.BRANCHCODE=B.BRANCH_CODE
                     WHERE A.POSTINGDATE=B.CURRENTPOSTINGDATE
                     ORDER BY A.BRANCHCODE;
               END IF;
            END IF;
            SELECT SYSDATE INTO SPULLED_DATE
            FROM DUAL;
            INSERT INTO RPT_EOC_BRANCH_RUN_DURATION
               SELECT T2.*, SFROM_STAGE AS START_STAGE, STO_STAGE AS END_STAGE, ROUND((END_TIME-START_TIME)*1440, 2), SRPT_DATE, SPULLED_DATE
               FROM(
                     SELECT BRANCH_CODE, MIN(START_TIME)AS START_TIME, MAX(END_TIME)AS END_TIME
                     FROM(
                           SELECT A.BRANCH_CODE, (
                                 SELECT MIN(B.START_TIME)
                                 FROM AETB_EOC_RUNCHART_HISTORY B
                                 WHERE B.BRANCH_CODE=A.BRANCH_CODE
                                    AND B.EOD_DATE=SRPT_DATE
                                    AND B.EOC_STAGE=SFROM_STAGE
                              )AS START_TIME, (
                                 SELECT MAX(C.END_TIME)
                                 FROM AETB_EOC_RUNCHART_HISTORY C
                                 WHERE C.BRANCH_CODE=A.BRANCH_CODE
                                    AND C.EOD_DATE=SRPT_DATE
                                    AND C.EOC_STAGE=STO_STAGE
                                    AND C.EOC_STAGE_STATUS='C'
                              )AS END_TIME
                           FROM STTM_BRANCH A
                           UNION
                           ALL
                           SELECT A.BRANCH_CODE, (
                                 SELECT MIN(B.START_TIME)
                                 FROM AETB_EOC_RUNCHART B
                                 WHERE B.BRANCH_CODE=A.BRANCH_CODE
                                    AND B.EOD_DATE=SRPT_DATE
 -- WHEN BRANCH ABORTED AND EOD DATE CHANGE >=
                                    AND B.EOC_STAGE=SFROM_STAGE
                              )AS START_TIME, (
                                 SELECT MAX(C.END_TIME)
                                 FROM AETB_EOC_RUNCHART C
                                 WHERE C.BRANCH_CODE=A.BRANCH_CODE
                                    AND C.EOD_DATE=SRPT_DATE
 -- WHEN BRANCH ABORTED AND EOD DATE CHANGE >=
                                    AND C.EOC_STAGE=STO_STAGE
                                    AND C.EOC_STAGE_STATUS='C'
                              )AS END_TIME
                           FROM STTM_BRANCH A
                        )  T
                     WHERE(START_TIME IS NOT NULL
                        OR END_TIME IS NOT NULL)
                     GROUP BY BRANCH_CODE
                  )T2;
            SELECT TO_CHAR(MIN(A.START_TIME), 'DD-MON-YYYY HH24:MI'), TO_CHAR(MAX(A.END_TIME), 'DD-MON-YYYY HH24:MI')INTO SSTART_TIME, SEND_TIME
            FROM RPT_EOC_BRANCH_RUN_DURATION A
            WHERE A.RPT_DATE=SRPT_DATE
               AND A.FROM_STAGE=SFROM_STAGE
               AND A.TO_STAGE=STO_STAGE;
         END IF;
 --20230824 TEST UPDATE DOMANCY ACCOUNTS
         IF SFROM_STAGE='UPDATE_DORMANCY' THEN SSTART_TIME:=TO_CHAR(SYSDATE, 'DD-MON-YYYY HH24:MI');
            INTUSER.PR_ISA_PR_INSERT_DOCH_LOG;
            INTUSER.PR_ISA_PR_UD_DOCH_WAIVE_JOB;
            SEND_TIME:=TO_CHAR(SYSDATE+INTERVAL '1' MINUTE, 'DD-MON-YYYY HH24:MI');
 --ADD MINUTE
         END IF;
         IF SFROM_STAGE='RESTORE_POINT' THEN
 -- CREATE RESTORE POINT
            SELECT TO_CHAR(FN_RPT_DATE, 'YYYYMMDD')
                   || '_'
                   || A.RP_NAME INTO SRP_NAME
            FROM RESTORE_POINT_CHART A
            WHERE A.EOC_TYPE=SRPT_TYPE
               AND A.RP_SEQ=P_STEP_NO;
            SELECT A.SCRIPT INTO SSSH_SCRIPT
            FROM RESTORE_POINT_SQL A
            WHERE A.TYPE='SSH';
            SELECT A.SCRIPT INTO SSQL_SCRIPT
            FROM RESTORE_POINT_SQL A
            WHERE A.TYPE='SQL';
            SSQL_SCRIPT:=REPLACE(SSQL_SCRIPT, 'REPLACE_RR_NAME', SRP_NAME);
            SSTART_TIME:=TO_CHAR(SYSDATE, 'DD-MON-YYYY HH24:MI');
 /*IF INTUSER.FN_CREATE_CBS_RESTOREPOINT(SSSH_SCRIPT,
                                                SSQL_SCRIPT,
                                                OP_MESSAGE) THEN
            DG_PRINT('Create Restore Point: ' || OP_MESSAGE);
            --RESTORE POINT EMAIL NOTIFICATION
            SELECT A.USERNAME
              INTO SUSERNAME
              FROM VW_API_USERS A
             WHERE A.USER_ID = P_REGISTER;
            --PREPARE EMAIL BODY
            SHTML := '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><p>Dear ISA team,</p>
<p>Core Banking Database has been created restore point <span style="color:#ff0000"><em><strong>' ||
                     SRP_NAME ||
                     '</strong></em></span> by <em><strong><span style="color:#ff0000">' ||
                     SUSERNAME ||
                     '</span></strong></em></p>
<p><em>Note: Restore point should be create before and after finish EoC</em></p>';
            SEND_EMAIL(P_TO        => 'rith.norn@hatthabank.com',
                       P_FROM      => 'itosystem@hatthabank.com',
                       P_CC        => '',
                       P_SUBJECT   => '[Attention] Restore point creation uat3',
                       P_HTML_MSG  => SHTML,
                       P_SMTP_HOST => 'mail.hatthabank.com');
          ELSE
            DG_PRINT('Create Restore Point: ' || OP_MESSAGE);
          END IF;*/
            SEND_TIME:=TO_CHAR(SYSDATE, 'DD-MON-YYYY HH24:MI');
 --SET DEFAULT 1 MINUTE IF SSTART_TIME = SEND_TIME
            IF SSTART_TIME=SEND_TIME THEN SEND_TIME:=TO_CHAR(SYSDATE+INTERVAL '15' MINUTE, 'DD-MON-YYYY HH24:MI');
 --ADD MINUTE
            END IF;
         END IF;
         IF SFROM_STAGE='BI_BAK_RES' THEN
 -- BI BACKUP AND RESTORATION
            SELECT COUNT(1)INTO STOTAL_BI_BAK_COUNT
            FROM RPT_BI_BACKUP_DETAIL A
            WHERE A.COMPLETED='Y'
               AND A.RECORD_STAT='O'
               AND A.RPT_DATE=SRPT_DATE;
            IF STOTAL_BI_BAK_COUNT=0 THEN OP_STATUS:='-1';
               OP_MESSAGE:='BI Catalogs have been not archived yet';
               DG_PRINT(OP_MESSAGE);
               RETURN;
            END IF;
            SELECT COUNT(1)INTO STOTAL_BI_RES_COUNT
            FROM RPT_BI_RESTORE_DETAIL A
            WHERE A.COMPLETED='Y'
               AND A.RECORD_STAT='O'
               AND A.RPT_DATE=SRPT_DATE;
            IF STOTAL_BI_RES_COUNT=0 THEN OP_STATUS:='-1';
               OP_MESSAGE:='BI Catalogs have been not unarchived yet';
               DG_PRINT(OP_MESSAGE);
               RETURN;
            END IF;
            IF STOTAL_BI_BAK_COUNT<>STOTAL_BI_RES_COUNT THEN OP_STATUS:='-1';
               OP_MESSAGE:='BI Catalogs archived and unarchived are no equally';
               DG_PRINT(OP_MESSAGE);
               RETURN;
            ELSE
               SELECT TO_CHAR(MIN(A.BACKUP_DATE), 'DD-MON-YYYY HH24:MI')INTO SSTART_TIME
               FROM RPT_BI_BACKUP_DETAIL A
               WHERE A.COMPLETED='Y'
                  AND A.RECORD_STAT='O'
                  AND A.RPT_DATE=SRPT_DATE;
               SELECT TO_CHAR(MAX(A.RESTORE_DATE), 'DD-MON-YYYY HH24:MI')INTO SEND_TIME
               FROM RPT_BI_RESTORE_DETAIL A
               WHERE A.COMPLETED='Y'
                  AND A.RECORD_STAT='O'
                  AND A.RPT_DATE=SRPT_DATE;
               SCOMP_STAT:='Y';
            END IF;
         END IF;
         IF SFROM_STAGE='FULL_TB' THEN
 --20220901 TO PREVENT NULL REPORT DATE
            IF SRPT_DATE IS NULL THEN
               SELECT A.RPT_DATE INTO SRPT_DATE
               FROM RPT_EOC_REPORT_MASTER A
               WHERE A.RECORD_STAT='O'
                  AND A.COMPLETED='N';
 --SRPT_DATE := FN_RPT_DATE;
            END IF;
            SSTART_TIME:=TO_CHAR(SYSDATE, 'DD-MON-YYYY HH24:MI');
 --> PROCEDURE SEND FULL TB HERE
 --DBMS_OUTPUT.PUT_LINE ('1st call proc FTB alert (XLSX) =>' || TO_CHAR(SYSDATE,'DD-MON-YYYY HH:MI:SS AM'));
            DG_PRINT('1st call proc FTB alert (XLSX) SRPT_DATE =>'
                     || SRPT_DATE);
            PROC_BI_REQUEST_FTB(SRPT_DATE, 'XLSX');
 --DBMS_OUTPUT.PUT_LINE ('2st call proc FTB alert (RTF) =>' || TO_CHAR(SYSDATE,'DD-MON-YYYY HH:MI:SS AM'));
            DG_PRINT('2st call proc FTB alert (RTF) =>'
                     || SRPT_DATE);
            PROC_BI_REQUEST_FTB(SRPT_DATE, 'RTF');
            SEND_TIME:=TO_CHAR(SYSDATE, 'DD-MON-YYYY HH24:MI');
            IF SSTART_TIME=SEND_TIME THEN SEND_TIME:=TO_CHAR(SYSDATE+INTERVAL '1' MINUTE, 'DD-MON-YYYY HH24:MI');
 --ADD MINUTE
            END IF;
            SCOMP_STAT:='Y';
         END IF;
 --SSTART_TIME := P_START_TIME;
 --SEND_TIME   := P_END_TIME;
         DG_PRINT('Start time: '
                  || SSTART_TIME);
         DG_PRINT('End time: '
                  || SEND_TIME);
         DG_PRINT('Format datatime to 24 hour');
         PR_ALTER_DT_24;
 --Get estimated time
         SELECT TO_NUMBER(DU.ESTIMATED_TIME_MIN)INTO SESTIMATE_TIME
         FROM RPT_EOC_ESTIMATED_STEP_DURATION DU
         WHERE DU.EOC_TYPE=SRPT_TYPE
            AND DU.STEP_NO=P_STEP_NO;
         TMP_DURATION:=FN_GET_DURATION_BT_2_DATE(SSTART_TIME, SEND_TIME);
 --Check duration with estimated time
         CASE
            WHEN TMP_DURATION>0 AND TMP_DURATION<=SESTIMATE_TIME THEN BOOL_COMPARE_ESTIMATE:=TRUE;
               OP_STATUS:='1';
               OP_MESSAGE:='Restore_point created';
            WHEN TMP_DURATION>0 AND TMP_DURATION>SESTIMATE_TIME AND P_REMARK IS NOT NULL THEN BOOL_COMPARE_ESTIMATE:=TRUE;
               OP_STATUS:='1';
               OP_MESSAGE:='Restore_point created';
            ELSE OP_STATUS:='-1';
               OP_MESSAGE:='Report duration is out of range estimated time, Pls input remark for this step!';
               ROLLBACK;
               RETURN;
         END CASE;
         IF(BOOL_COMPARE_ESTIMATE=TRUE)THEN INSERT INTO RPT_EOC_DURATION(
               EOC_TYPE, STEP_NO, START_TIME, END_TIME, COMPLETED, REGISTERED_BY, RPT_DATE, ID, REMARK
            )VALUES(
               SRPT_TYPE, P_STEP_NO, SSTART_TIME, SEND_TIME, SCOMP_STAT, P_REGISTER, SRPT_DATE, SAUTO_ID, P_REMARK
            );
         END IF;
 /*INSERT INTO RPT_EOC_DURATION
          (EOC_TYPE,
           STEP_NO,
           START_TIME,
           END_TIME,
           COMPLETED,
           REGISTERED_BY,
           RPT_DATE,
           ID,REMARK)
        VALUES
          (SRPT_TYPE,
           P_STEP_NO,
           SSTART_TIME,
           SEND_TIME,
           SCOMP_STAT,
           P_REGISTER,
           SRPT_DATE,
           SAUTO_ID,P_REMARK);*/
         DG_PRINT('Data inserted: '
                                                                                                                                                                                                                                                                                                                                                                                                                                                               || SQL%ROWCOUNT);
         DG_PRINT('Format datatime to default');
         PR_ALTER_DT_DEF;
      END IF;
      PR_UPDATE_REPORT_STATUS(SRPT_TYPE, SRPT_DATE, P_REGISTER);
      OP_STATUS:='1';
      IF NVL(SFROM_STAGE, '*')<>'RESTORE_POINT' THEN OP_MESSAGE:='Report step number '
                                                                 || P_STEP_NO
                                                                 || ' successfully inserted';
      END IF;
   ELSE PR_UPDATE_EOC_DURATION(SID, P_START_TIME, P_END_TIME, 'Y', P_REGISTER, P_DEBUG, OP_STATUS, OP_MESSAGE);
   END IF;
 ---ALERT SMS TELEGRAM
   BEGIN
      PR_EOC_STEP_ALERT_TELEGRAM;
   END;
 -- CREATE REPORT POINT
   DG_PRINT(OP_MESSAGE);
   COMMIT;
 --TRACKING ALERT
   SELECT COUNT(*)INTO SCOUNT_HISTORY_REC
   FROM RPT_EOC_STEPS_HIST A
   WHERE A.RPT_DATE=SRPT_DATE;
 --DG_PRINT('Insert EoC Duration to history at:' || SYSDATE || ', Total Records: '|| SCOUNT_HISTORY_REC);
   IF V_COM_STAT='Y' THEN DG_PRINT('Draft EoC Report Alert');
      SYS.DBMS_SCHEDULER.CREATE_JOB(
         JOB_NAME=>'ITOAPP.JOB_SEND_DRAFT_EOC_SUMMARY', JOB_TYPE=>'STORED_PROCEDURE', JOB_ACTION=>'PROC_BI_REQUEST_EOC_SUMMARY', NUMBER_OF_ARGUMENTS=>1, START_DATE=>SYSDATE+INTERVAL '5' SECOND, REPEAT_INTERVAL=>'', END_DATE=>TO_DATE(NULL), JOB_CLASS=>'DEFAULT_JOB_CLASS', ENABLED=>FALSE, AUTO_DROP=>TRUE, COMMENTS=>''
      );
      SYS.DBMS_SCHEDULER.SET_JOB_ARGUMENT_VALUE(
         JOB_NAME=>'ITOAPP.JOB_SEND_DRAFT_EOC_SUMMARY', ARGUMENT_POSITION=>1, ARGUMENT_VALUE=>SRPT_DATE
      );
      SYS.DBMS_SCHEDULER.ENABLE(
         NAME=>'ITOAPP.JOB_SEND_DRAFT_EOC_SUMMARY'
      );
   END IF;
EXCEPTION
   WHEN OTHERS THEN ROLLBACK;
      OP_STATUS:='-1';
      OP_MESSAGE:='Error: '
                  || SQLERRM
                  || ' -> '
                  || DBMS_UTILITY.FORMAT_ERROR_BACKTRACE;
      DG_PRINT('Error: '
               || SQLERRM
               || ' -> '
               || DBMS_UTILITY.FORMAT_ERROR_BACKTRACE);
END PR_INSERT_EOC_DURATION;