import Axios from '@/services/Axios'
const transactions={
	isRegistered: false,
	namespaced:true,
	state(){
			return {
				loading:false,
				errorLoading:false,
				transactions:[]
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
		},
		clearAll(state){
			state.loading = false
			state.errorLoading = false
			state.transactions = []
		}

	},
	actions:{
		clearAll(ctx){
			ctx.commit('clearAll')
		},
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