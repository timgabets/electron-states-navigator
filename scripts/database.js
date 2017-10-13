import OracleDB from "oracledb";

class Database {
  constructor(user, password, connectString) {
    this.user = user;
    this.password = password;
    this.connectString = connectString;
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
      .then( connection => {
        this.log('Connected');
        return connection.execute(
          "SELECT st_no, st_type, st_e1, st_e2, st_e3, st_e4, st_e5, st_e6, st_e7, st_e8 " +
          "FROM st_tab " +
          "WHERE luno = :luno",
          [luno],
          /*
          {
            resultSet: true, // return a result set.  Default is false
            prefetchRows: 25 // the prefetch size can be set for each query
          }
          */
        )
          .then( result => {
            // this.log(result.metaData);
            this.log(result.rows);
            //this.log(result.resultSet);

            return connection.close();
          })
          .catch( err => {
            this.log(err.message);

            return connection.close();
          });
      })
      .catch( err => {
        this.error(err.message);
      });
  }
}

const db = new Database('IDBI', 'IDBI1', 'svfe');
db.fetch(107);
