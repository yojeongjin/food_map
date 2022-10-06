const db = require('../../../config/db'); //db설정 호출
const conn =  db.init(); //db 연결
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.list = (req,res) => {
  const { userId } = req.query;
  console.log(req.query)

  sql = "select * from Users where userId = ? ";
	conn.query(sql, [userId],(err,rows) => { //쿼리 실행
    if(err) throw err;
    
    if(rows.length === 0) {
      res.send({
        data: rows,
				success: true,
				code: 200,
				msg:'사용 가능한 아이디입니다.'
			})
    } else {
      res.send({
        data: rows,
				success: false,
				code: 400,
				msg:'이미 사용 중인 아이디입니다.'
			})
    }
	})
}

exports.add = (req,res) => {

	const { nickname, userId, password, repassword } = req.body

  const userIdRegExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  const nicknameRegExp = /^[가-힣|a-z|A-Z|0-9]{2,10}$/;

  if(!userIdRegExp.test(userId)) {
    return res.send({
      success: false,
      code: 400,
      message: '아이디를 확인해주세요'
    })
  }

  if(!passwordRegExp.test(password)) {
    return res.send({
      success: false,
      code: 400,
      message: '비밀번호를 확인해주세요'
    })
  }


  if(!nicknameRegExp.test(nickname)) {
    return res.send({
      success: false,
      code: 400,
      message: '닉네임을 확인해주세요'
    })
  }

  if (password === repassword) {
    sql = "insert into Users (nickname, userId, password, repassword) values (?, ?, ?, ?)";
    conn.query(sql,[nickname, userId, password, repassword],(err,rows)=>{
      if(err) throw err;
      const userIdx = rows.insertId;
      const secretKey = process.env.SECRET_KEY

      const token = jwt.sign(
        { userIdx: userIdx, nickname: nickname },
        secretKey
      )

      res.send({
        result: { jwt: token },
        success: true,
        code: 200,
        msg:'회원가입 성공.'
      })
    })
  } else {
    res.send('비밀번호가 일치하지 않습니다.')
  }
}