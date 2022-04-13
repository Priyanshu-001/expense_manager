const {categories,months,freq} = require('../constants.js')
const {daysInMonth,numberOfWeeks,weekNumber} = require('./dateHelpers.js')
const totalSpending = (req,res,next)=>{
	let total = 0
	req.user.transactions.map(transaction=>{
		total += Number(transaction.price)
	})
	res.json({total})
}

const validateMonthYear = (req,res,next)=>{
	req.month = req.query.month
	req.year = req.query.year
	if(!req.month || !req.year || !(req.month>=0 && req.month<12))
		return res.sendStatus(400)
	else 
		next()
}

const validateFreq = (req,res,next)=>{
	const {curr_freq=freq[0]} = req.query 
	if(freq.includes(curr_freq))
		{
			req.freq = curr_freq
			next()
		}
	else
		{
			return res.sendStatus(400)
			console.log('Invalid freq')
		}
}
const getMonthTransactions = (req,res,next)=>{
	//call getTransactions first
	req.transactions = req.transactions.filter(({month,year,...transaction})=>month == months[req.month] && year == req.year)
	next()
}
const getCatTransactions = (req,res)=>{
	//after  getTtransactions only
	const catSpending = {}
	categories.forEach(category=>{
		catSpending[category] = 0
	})
	req.transactions.forEach(({category,price,...transaction})=>{
		catSpending[category] += Number(price)
		console.log(price)
	})
	req.catSpending = catSpending
	return res.json({catTotal: catSpending}) 
}




const bucketWeekly = (req,res,next)=>{
	if(req.freq != freq[0])
		return next()
	const totalSpending = {}

	for(let i=1; i<=numberOfWeeks(req.month,req.year); i++){
		totalSpending[`week-${i}`] = 0
	}
	req.transactions.forEach(({price,timestamp,...etc})=>{
		const week = weekNumber(timestamp)
		totalSpending[`week-${week}`] += Number(price)
	})
	req.totalSpending = totalSpending
	next()
}

module.exports = {totalSpending,validateMonthYear,validateFreq,getCatTransactions,getMonthTransactions,bucketWeekly}