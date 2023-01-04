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
	console.log(body)
	sql = "select resAdd, resName,resUrl,userIdx from Restraunts where resAdd = ? and resName = ? and resUrl = ? and userIdx = ? " ;
	conn.query(sql,[body.resName, body.resAdd, body.resUrl, body.userIdx],(err,rows)=>{
		if(err) throw err;
		try {
			sql = "insert into Restraunts (resName, resAdd, resUrl, userIdx) values (?, ?, ?)";
			conn.query(sql,[body.resName, body.resAdd, body.resUrl, body.userIdx ],(err,rows)=>{
				if(err) throw err;
				res.send({success:true});
			})
		}catch {
			res.send({
				success: false,
				code: 400,
				msg:'이미 저장한 맛집입니다.'
			})
		}
	})

}

exports.delete = (req,res) => {
	body = req.query;

	sql = "DELETE FROM Restraunts WHERE resIdx = ? ";
	conn.query(sql,[body.resIdx],(err,result) => {
		if(err) throw err;

		res.send({success:true,result:result});
	})
}