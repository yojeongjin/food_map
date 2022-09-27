const router = require('express').Router();
const find = require('./find');

router.all('*',(req, res, next)=>{
	console.log("path="+req.path);
	next();
})

router.use("/find",find); //board router 적용

router.all('*',(req, res)=>{
	res.status(404).send({success:false, msg:`api unknown uri ${req.path}`});
})

module.exports = router;
