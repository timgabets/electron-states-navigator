import OracleDB from "oracledb";

class Database {
   constructor(user, password, connectString) {
      this.user = user;
      this.password = password;
      this.connectString = connectString;

      this.log('Constructed');
   }

   log(data){
      console.log(data);
   }

   connect(){
      this.log('Connecting');

       OracleDB.getConnection(
       {
         user          : "IDBI",
         password      : "IDBI1",
         connectString : "svfe"
       },
       function(err, connection)
       {
         if (err) { 
           //log.error(err.message);
           console.log(err.message);
           return;
         }else {
           //log.info('Connection established');
           console.log('Connection established');
         }

         connection.execute(
             "SELECT st_no, st_type, st_e1, st_e2, st_e3, st_e4, st_e5, st_e6, st_e7, st_e8, sset " +
             "FROM st_tab " +
             "WHERE luno = :luno",
           [107],
           {
             resultSet: true, // return a result set.  Default is false
             prefetchRows: 250 // the prefetch size can be set for each query
           },
           function(err, result)
           {
             if (err) {
               log.error(err.message);
               doRelease(connection);
               return;
             }
             // console.log(result);
             fetchRowsFromRS(connection, result.resultSet, numRows);

             log.info(states.get('000'));
           });
       });
      };

   fetch(){

   };

  static fetchRowsFromRS(connection, resultSet, numRows)
  {
    resultSet.getRows(
      numRows,  // get this many rows
      function (err, rows)
      {
        if (err) {
          log.error(err);
          doClose(connection, resultSet); // always close the result set
        } else if (rows.length > 0) {
          log.info("fetchRowsFromRS(): Got " + rows.length + " rows");
          rows.forEach(row => {
            states.addState(row)
          });
          if (rows.length === numRows) // might be more rows
            fetchRowsFromRS(connection, resultSet, numRows);          
          else
            doClose(connection, resultSet); // always close the result set
        } else { // no rows
          doClose(connection, resultSet); // always close the result set
        }
      });
  }
      
   static doRelease(connection)
   {
     connection.close(
       function(err)
       {
         if (err) { log.error(err.message); }
       });
   }

   static doClose(connection, resultSet)
   {
     resultSet.close(
       function(err)
       {
         if (err) { log.error(err.message); }
         doRelease(connection);
         //ipc.send('db-states-data-fetched');
       });
   }

}

const db = new Database('IDBI', 'IDBI1', 'svfe');
db.connect();
