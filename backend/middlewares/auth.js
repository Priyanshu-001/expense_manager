const {User} = require('../db.js')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')


const getUser = async (req,res,next)=>{

	const name = req.body.username || req.query.username || (req.authorized && req.name)

	if(!name)
		return res.sendStatus(400)
	User.findOne({name},(err,doc)=>{
		if(err)
			return res.sendStatus(500)
		else if(!doc)
			{
				req.userExists = false

			}
		else {
			req.userExists = true
			req.user = doc
		}
		return next()
	})
}

const createUser = async (req,res,next)=>{
	const {password,username:name} = req.body
		if(req.userExists || !password )
			return res.sendStatus(400)
		try{
			const salt = crypto.randomBytes(16).toString('hex')
			const hashed = crypto.pbkdf2Sync(password,salt,20,32,'sha256')
			const passwordHash = hashed.toString('hex')
			const newUser = new User({name,passwordHash,salt})
			await newUser.save()
			req.user = newUser
			next()
		}
		catch(err){
			console.log(err)
			return res.sendStatus(500)
		}
}
const getAccessToken = async (req,res,next)=>{
		const {name,_id} = req.user.toObject()
		req.accessToken = jwt.sign({name,_id},process.env.JWT_SECRET)
		next()
}
const validatePass = (req,res,next)=>{
	const {password} = req.body
	try{
			const salt = crypto.randomBytes(16).toString('hex')
			const hashed = crypto.pbkdf2Sync(password,req.user.salt,20,32,'sha256')
			const userPass = Buffer.from(req.user.passwordHash,'hex')
			

			if (!crypto.timingSafeEqual(hashed,userPass))
				return res.sendStatus(401)

			return next()
		}
	catch(err){
		console.log(err)
		return res.sendStatus(500)

	}
}
const verifyJWT = (req,res,next)=>{
	 jwt.verify(req.headers['authorization'],process.env.JWT_SECRET,
	 	(err,user)=>{
	 		  console.log(user)
			  if(err) return res.sendStatus(401)
			  else if(!user) return res.sendStatus(401)
			  req.id = user._id
			  req.name = user.name
			  req.authorized = true
				next()
			  })

}
module.exports = {getUser,getAccessToken,createUser,validatePass,verifyJWT}
