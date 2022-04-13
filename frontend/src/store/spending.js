import Axios from '@/services/Axios'

const spending={
	isRegistered:false,
	namespaced:true,
	state(){
		return {
			categories:{
				'fuel':{
					color:'red',
					icon:'fuel'
				},
				'food':{
					color:'purple',
					icon:'fruit-grapes'
				},
				'home':{
					color:'orange',
					icon:'home'
				},
				'shopping':{
					color:'blue',
					icon:'shopping-outline',

				},
				'other':{
					color:'black',
					icon:'dots-horizontal'
				}
			},
			totalSpending:0,
			totalSpendingError:false,

			'month':3,
			'year': 2022,
			'granularity': 'Weekly',

			'catLoaded':true,
			'catTotal':{
				'fuel': 200,
				'food':300,
				'home':400,
				'shopping':301,
				'other': 500,
			},

			'completeLoaded': false,
			'totalLoaded':false,
			'completeTotal':{
				'week1': 510,
				'week2':212,
				'week3': 400,
				'week5': 201,
			}



		}
	},
	getters:{
		timeMetaData(state){
			const {monthName:month,granularity,year} = state
			return {month,granularity,year}
		},
		categoryList(state){
			return Object.keys(state.categories)
		},
		
		spendingList(state,getters){
			//guarrenttes order
			return getters.categoryList.map(el=>state.catTotal[el])
		},
		spendingDataTable(state,getters){
			let arr = []
			for(let i=0; i<getters.categoryList.length; i++)
				{	const category = getters.categoryList[i]
					const amt = getters.spendingList[i]
					arr.push({category,amt})
				}
			return arr
		},
		totalTimeline(state){
			return Object.keys(state.completeTotal)
		},
		totalList(state,getters){
			return	getters.totalTimeline.map(el=>state.completeTotal[el])
		},
		totalDataTable(state,getters){
			let arr = []
			for(let i=0; i<getters.totalTimeline.length; i++)
				{	const label = getters.totalTimeline[i]
					const amt = getters.totalList[i]
					arr.push({label,amt})
				}
				return arr
		}		

	},
	actions:{ 
		async totalSpending(ctx){
			ctx.state.totalSpendingError = false
			Axios.get('/totalspending')
			.then(({data})=>{
				ctx.state.totalSpending = data.total
			})
			.catch(()=>{
				ctx.state.totalSpendingError = true
				ctx.state.totalSpending = '???'
			})
		},
		async getCatTransactions(ctx){
			ctx.state.catLoaded = false
			Axios.get('/getCatTransactions',{params:{
				month:ctx.state.month,
				year:ctx.state.year
			}})
			.then(({data})=>{
				ctx.state.catTotal = data.catTotal

			})
			.finally(()=>{
				ctx.state.catLoaded = true
			})
		},
		async getTotalTransactions(ctx){
			ctx.state.totalLoaded = false
			Axios.get('/getTotalTransactions',{params:{
				month:ctx.state.month,
				year:ctx.state.year,
			}})
			.then(({data})=>{
				ctx.state.completeTotal = data.totalSpending

			})
			.finally(()=>{
				ctx.state.totalLoaded = true
			})
		},

	}

}
export default spending