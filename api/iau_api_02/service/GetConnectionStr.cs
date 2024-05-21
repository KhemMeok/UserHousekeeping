// public class GetConnectionStr {
//     public string getConnection(){
//         return "User Id=KHEM;Password=Khem2002;Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.17.0.1)(PORT=59430))(CONNECT_DATA=(SID=ORCLCDB)));";
//     }
// }
public class GetConnectionStr {
    public string getConnection(){
        return "Data Source=localhost:1521/ORCLCDB;Persist Security Info=True;User ID=khem;Password=Khem2002;";
    }
}
