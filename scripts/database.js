import OracleDB from "oracledb";

class Database {
  constructor(user, password, connectString) {
    this.user = user;
    this.password = password;
    this.connectString = connectString;

   this.log('Constructed');
  };

  log(data){
    console.log(data);
  };

  fetch(luno){
    OracleDB.getConnection(
      {
        user          : this.user,
        password      : this.password,
        connectString : this.connectString
      })
      .then(function(connection) {
        console.log('Connected');
        return connection.execute(
          "SELECT st_no, st_type, st_e1, st_e2, st_e3, st_e4, st_e5, st_e6, st_e7, st_e8, sset " +
          "FROM st_tab " +
          "WHERE luno = :luno",
          [luno],
        )
          .then(function(result) {
            // console.log(result.metaData);
            console.log(result.rows);

            return connection.close();
          })
          .catch(function(err) {
            console.log(err.message);

            return connection.close();
          });
      })
      .catch(function(err) {
        console.error(err.message);
      });
  }
}

const db = new Database('IDBI', 'IDBI1', 'svfe');
db.fetch(107);
