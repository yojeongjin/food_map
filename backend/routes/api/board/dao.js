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
	body = req.body;

	sql = " insert into Board (boardUrl, boardTitle, boardWriter, boardLocation, boardContent) values (?, ?, ?, ?, ?) ";
	conn.query(sql,
		[url, body.boardTitle, body.boardWriter, body.boardLocation, body.boardContent],(err,result)=>{
		if(err) throw err;

		res.send({success:true});
	})
}

exports.delete = (req,res) => {
	body = req.query;

	sql = "DELETE FROM Board WHERE boardIdx = ? ";
	conn.query(sql,[body.boardIdx],(err,result) => {
		if(err) throw err;

		res.send({
			success: true,
			code: 200,
			msg:'삭제되었습니다!'
		})
	})
}

exports.update = (req,res) => {
	body = req.body;

	sql = 
	"update mydb_food.Board set boardTitle = ?, boardLocation = ?, boardContent = ? where boardIdx = ? ";

	conn.query(sql,[body.boardTitle, body.boardLocation, body.boardContent, body.boardIdx],(err,result) => {
		if(err) throw err;

		res.send({
			success: true,
			code: 200,
			msg:'수정되었습니다!'
		})
	})
}
