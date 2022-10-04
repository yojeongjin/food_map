const db = require('../../../config/db');
const conn =  db.init();

exports.list = (req,res) => {
	conn.query("select * from mydb_food.Board",(err,row) => {
		if(err) throw err;
		res.send({success:true,data:row})
	})
}

exports.view = (req,res) => {
	boardIdx = req.params.items;

	sql = "select * from mydb_food.Board where boardIdx = ? ";
	conn.query(sql,[boardIdx],(err,row) => {
		if(err) throw err;
		
		res.send({success:true, data:row});
	})
}

exports.add = (req,res) => {
	url = req.file.location
	console.log(req.form)
	body = req.body;
	sql = " insert into Board (boardUrl, boardTitle, boardWriter, boardLocation, boardContent) values (?, ?, ?, ?, ?) ";

	conn.query(sql,
		[url, body.boardTitle, body.boardWriter, body.boardLocation, body.boardContent],(err,result)=>{
		if(err) throw err;

		res.send({success:true});
	})
}
