const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtMiddleware = (req,res,next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if(!token) {
    res.send({
      success: false,
      code: 400,
      msg: '로그인이 되어 있지 않습니다.'
    })
  }

  try {
    const secretKey = process.env.SECRET_KEY

    const verifiedToken = jwt.verify(token, secretKey)
    req.verifiedToken = verifiedToken
    next();
  } catch {
    res.send({
      success: false,
      code: 400,
      msg: '검증실패'
    })
  }
}

module.exports = jwtMiddleware