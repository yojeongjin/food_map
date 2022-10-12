const mysql = require('mysql2')

const dbInfo = {
  host: '3.36.188.55',
  user: 'root',
  password: 'wjdwls2',
  database: 'mydb_food'
}

let dbcon = {
	init:function() {
		return mysql.createConnection(dbInfo);
	},
	conn:function(con) {
		con.connect(function(err){
			if(err) {
				console.log("mysql connection error :"+err);
				setTimeout(init, 2000);

			} else {
				console.log("mysql connection sucessfully");
			}
		})
	}
}

module.exports = dbcon; //모듈 등록