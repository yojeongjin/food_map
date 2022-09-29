const db = require('../../../config/db');
const conn =  db.init();

exports.list = (req,res) => {
	conn.query("select * from mydb_food.Board",(err,row) => {
		if(err) throw err;
		res.send({success:true,data:row})
	})
}

exports.add = (req,res) => {
	body = req.body;
	sql = " insert into Board (boardPhoto, boardTitle, boardWriter, boardLocation, boardContent) values (?, ?, ?, ?, ?) ";

	conn.query(sql,
		[body.boardPhoto, body.boardTitle, body.boardWriter, body.boardLocation, body.boardContent],(err,result)=>{
		if(err) throw err;

		res.send({success:true});
	})
}