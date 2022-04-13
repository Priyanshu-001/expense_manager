const router = require('express').Router()
const {getUser,getAccessToken,createUser,validatePass,verifyJWT} = require('./middlewares/auth.js')
const {checkAllFields, addTransaction,getTransactions,checkFilters,gatherTransactions,editTransaction} = require('./middlewares/transactions')
const {totalSpending,validateMonthYear,getMonthTransactions,getCatTransactions,bucketWeekly,validateFreq} = require('./middlewares/spending.js')
router.get('/usernameexists',getUser,(req,res)=>res.json({userExists:req.userExists}))

router.post('/register',getUser,createUser,getAccessToken,(req,res)=>{
		return res.json({JWT:req.accessToken,_id:req.user._id})
})
router.post('/login',getUser,validatePass,getAccessToken,(req,res)=>{
		return res.json({JWT:req.accessToken,_id:req.user._id})
})

//transactions
router.post('/addtransaction',verifyJWT,getUser,checkAllFields,addTransaction,(req,res)=>{
	console.log(req.user)
	return res.sendStatus(200)

})

router.get('/transactions',verifyJWT,getUser,checkFilters,gatherTransactions,(req,res)=>{
	return res.json({transactions: req.transactions})
})

router.patch('/edittransaction',verifyJWT,getUser,checkAllFields,editTransaction)
//spendings
router.get('/totalspending',verifyJWT,getUser,totalSpending)
router.get('/getCatTransactions',verifyJWT,getUser,getTransactions,validateMonthYear,getMonthTransactions,getCatTransactions)
router.get('/getTotalTransactions',verifyJWT,getUser,validateMonthYear,validateFreq,getTransactions,
	getMonthTransactions,bucketWeekly,(req,res)=>{
		return res.json({totalSpending:req.totalSpending})
	})
module.exports = router