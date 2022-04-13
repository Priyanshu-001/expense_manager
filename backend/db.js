const mongoose = require('mongoose')
const {categories,months} = require('./constants.js')
const { Schema } = mongoose
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true,autoIndex: false })
.then(()=>{
	console.log('DB connected')
})
.catch(e=>{
  console.log(e)
})

const userSchema = new Schema({
	name:{
		type:String,
		unique:true,
		indexed:true,
	},
	passwordHash:String,
	salt:String,
	transactions:[{
		item:String,
		price:String,
		userId: {
			type:Schema.Types.ObjectId,
			ref:'User'
		},
		currency:{
			type:String,
			default:'Rs'
		},
		category:{
			type:String,
			enum:categories,
		},
		picker:String,
		timestamp:Number,
		month:{
			type:String,
			enum:months
		},
		year: Number,
		description:String,

	}],


})
const  User = mongoose.model('User',userSchema)
module.exports.User = User
