const db = require('../../../config/db');
const conn =  db.init();

exports.photo = (req,res) => {
	conn.query("select * from mydb_food.Photo",(err,row) => {
		if(err) throw err;
		res.send({success:true,data:row})
	})
}


exports.upload = (req,res) => {
	const url = req.file.location
  sql = " insert into mydb_food.Photo (urlPhoto) values (?) ";
	conn.query(sql,[url],(err,result)=>{
		if(err) throw err;

		res.send({success:true});
	})
}
