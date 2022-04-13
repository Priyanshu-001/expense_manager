import Axios from '@/services/Axios'
const transactions={
	isRegistered: false,
	namespaced:true,
	state(){
			return {
				loading:false,
				errorLoading:false,
				transactions:[
				{		
					id:12131,
					item:'Hello',
					price:2000,
					category:'food'

				},
				{		
					id:2000,
					item:'bye',
					price:2000,
					category:'fuel'

				},
				{		
					id:3131,
					item:'bye',
					price:2000,
					category:'fuel'

				},
				{		
					id:3232,
					item:'bye',
					price:2000,
					category:'fuel'

				},

				]
			}
	},
	getters:{
		list(state){
			return state.transactions
		},
		single:(state,getters)=>id=>getters.list.filter(el=>el._id===id)[0],
		
	},
	mutations:{
		addTransactions(state,{transactions}){
			state.transactions = transactions
		}
	},
	actions:{
		async getTransactions(ctx,{limit}){
			ctx.state.loading= true
			try{
				const {data} = await Axios.get('/transactions',{params:{limit:limit}})
				ctx.commit('addTransactions',{transactions:data.transactions})

			}
			catch(err){
				ctx.state.errorLoading = true
			}
			finally{
				ctx.state.loading = false
			}
		}
	}
}

export default transactions