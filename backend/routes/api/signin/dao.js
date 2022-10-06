const db = require('../../../config/db');
const conn =  db.init();
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.list = (req,res) => { 
  const { userIdx, nickname } = req.verifiedToken

  return res.send({
    result: { userIdx: userIdx, nickname: nickname },
    success: true,
    code: 200,
    msg:'유효한 토큰입니다.'
  })
}

exports.add = (req,res) => {
  const { userId, password } = req.body

	sql = "select * from Users where userId = ? and password = ?";
	conn.query(sql,[ userId, password ],(err,rows)=>{
		if(err) throw err;

    if(rows.length === 0) {
      return res.send({
				success: false,
				code: 400,
				msg:'회원정보가 존재하지 않습니다.'
			})
    } else {
      const { userIdx,nickname } = rows[0];
      const secretKey = process.env.SECRET_KEY
  
      const token = jwt.sign(
        { userIdx: userIdx, nickname: nickname },
        secretKey
      )
      return res.send({
        result: { jwt: token },
        success: true,
        code: 200,
        msg:'로그인 성공'
      })
    }
	})
}
