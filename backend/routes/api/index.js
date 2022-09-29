const router = require('express').Router();
const find = require('./find');
const newly = require('./newly'); 
const board = require('./board')

router.all('*',(req, res, next)=>{
	console.log("path="+req.path);
	next();
})

router.use("/find",find); 
router.use("/newly",newly); 
router.use("/board",board);

router.all('*',(req, res)=>{
	res.status(404).send({success:false, msg:`api unknown uri ${req.path}`});
})

module.exports = router;
