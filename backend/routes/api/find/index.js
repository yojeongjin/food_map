const router = require('express').Router();
const dao = require('./dao')

router.get("/",dao.list);
router.post("/",dao.add);
router.delete("/",dao.delete);

router.all('*',(req, res)=> {
	res.status(404).send({success:false, msg:'find unknown uri ${req.path}'});
})

module.exports = router;