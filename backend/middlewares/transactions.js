const {categories,months,freq} = require('../constants.js')
const getTransactions = (req,res,next)=>{
	req.transactions = req.user.transactions
	console.log(req.transactions)
	next()
}
const checkAllFields= (req,res,next)=>{
	const transaction = req.body.transaction
	console.log(transaction.category in categories)
	if(!transaction){
		return res.sendStatus(400)
	}
	else if(!transaction.item || !transaction.price || !transaction.picker)
		return res.sendStatus(400)
	else if(!!transaction.category && categories.includes(transaction.category))
		{	const picker = transaction.picker
			const timestamp = new Date(picker)
			const month = months[timestamp.getMonth()]
			const year = timestamp.getFullYear()
			req.transaction = {
				...transaction,
				month,
				year,
				timestamp,
				userId:req.user._id
			}
			next()	

		}	
	else{
		return res.sendStatus(400)
	}
}

const addTransaction = async (req,res,next)=>{
	const {user,transaction} = req
	try{
		user.transactions.push(transaction)
		await user.save()
		req.user = user
		next()
	}
	catch(err){
		console.log(err)
	}

}
const checkFilters = (req,res,next)=>{
	let {limit,order=-1} = req.query //-1=>DESC 1=>ASC
	req.filter = {limit,order}
	next()
}
const gatherTransactions = (req,res,next)=>{
	const transactions = req.user.transactions
	console.log(req.filter)
	transactions.sort((a,b)=>(a.timestamp - b.timestamp)*(req.filter.order))
	req.transactions = transactions.slice(0,req.filter.limit)
	next()
}
const editTransaction = async (req,res)=>{
	console.log(req.transaction)
	if(!req.transaction._id)
		return res.sendStatus(400)
	req.user.transactions= req.user.transactions.map(transaction=>{
		if(transaction._id==req.transaction._id)
			return {
				...transaction,
				...req.transaction
			}
		else
			return transaction
	})
	try{
		await req.user.save()
		return res.sendStatus(200)
	}
	catch(err){
		console.log(err)
		return res.sendStatus(500)
	}

}



module.exports  = {checkAllFields,addTransaction,checkFilters,gatherTransactions,editTransaction,getTransactions}