import OracleDB from "oracledb";

class Database {
  constructor(user, password, connectString) {
    this.user = user;
    this.password = password;
    this.connectString = connectString;
    this.numRows = 200; // Number of rows to fetch at once
  };

  log(data){
    console.log(data);
  };

  /**
   * [fetchFromResultSet description]
   * @param  {[type]} connection [description]
   * @param  {[type]} resultSet  [description]
   * @param  {[type]} numRows    [description]
   * @return {[type]}            [description]
   */
  fetchFromResultSet(connection, resultSet, numRows){
    resultSet.getRows(numRows)
      .then( rows => {
        if(rows.length > 0){
          console.log(rows);
          return this.fetchFromResultSet(connection, resultSet, numRows);
        } else {
          return connection.close();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * [fetch description]
   * @param  {[type]} luno [description]
   * @return {[type]}      [description]
   */
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
          {
            resultSet: true, // return a result set.  Default is false
            prefetchRows: this.numRows // the prefetch size can be set for each query
          }
        )
          .then( result => {
            //this.log(result.resultSet);
            return this.fetchFromResultSet(connection, result.resultSet, this.numRows);
          })
          .catch( err => {
            console.error(err.message);
            return connection.close();
          });
      })
      .catch( err => {
        console.error(err.message);
      });
  }
}

const db = new Database('IDBI', 'IDBI1', 'svfe');
db.fetch(107);
