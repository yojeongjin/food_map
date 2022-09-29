const db = require('../../../config/db'); //db설정 호출
const conn =  db.init(); //db 연결

exports.list = (req,res) => { //리스트 모듈 router 에서 호출
	conn.query("select * from mydb_food.Newly",(err,row) => { //쿼리 실행
		if(err) throw err;
		res.send({success:true,data:row})
	})
}


exports.view = (req,res) => {
	newlyIdx = req.params.idx.idx;

	sql = "select * from mydb_food.Newly where newlyIdx = ? ";
	conn.query(sql,[newlyIdx],(err,row) => {
		if(err) throw err;
		
		res.send({success:true, data:row});
	})
}