const router = require('express').Router();
const dao = require('./dao'); //데이터 모듈 호출
const jwtMiddleware = require('../../../config/jwtMiddleware');

router.get('/', jwtMiddleware, dao.list)
router.post('/', dao.add);


router.all('*',(req, res)=> {
	res.status(404).send({success:false, msg:'signin unknown uri ${req.path}'});
})

module.exports = router;

