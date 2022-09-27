const db = require('../../../config/db'); //db설정 호출
const conn =  db.init(); //db 연결

exports.list = (req,res) => { //리스트 모듈 router 에서 호출
	conn.query("select * from mydb_food.Restraunts",(err,row) => { //쿼리 실행
		if(err) throw err;
		res.send({success:true,data:row})
	})
}

exports.add = (req,res) => {
	body = req.body; //전송된 데이터를 받는다.
	sql = "INSERT INTO Restraunts (resName, resAdd, resUrl) values (?, ?, ?)";
	conn.query(sql,[body.resName, body.resAdd, body.resUrl ],(err,result)=>{
		if(err) throw err;

		res.send({success:true});
	})
}