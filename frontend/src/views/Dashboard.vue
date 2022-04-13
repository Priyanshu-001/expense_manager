<template>
<div>
	<v-container>
		<v-row>
			<v-col cols="12" md="7">
				
					<v-card> 
						<v-card-title>
						<h1 style="font-size:2.5rem">
							Hi,	{{username}}
						</h1>
							<v-spacer/>
						<div>
							<span style="font-size: 1rem; color:gray;">
								Total Spending
							</span> 
							<br>
							<span style="font-size: 1.8rem;" class="price"> {{totalSpending}}</span>
						</div>
						</v-card-title>
					</v-card>
					<v-row v-if="false" class="pt-5">
						<v-col cols="12">
							<add-expense/>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<h2 class="text-heading-2"> 
								<v-icon color="black"> mdi-history </v-icon>
							Showing 5 most recent transactions 
						</h2>

						<recent-transactions ref="recent" @done="refreshData"/>
						</v-col>
					</v-row>
			</v-col>
			<v-col cols="0" md="5" >
				<v-btn  @click="expenseDialog = true" 
				class="mb-3"
				color="primary" 
				block rounded>
					<v-icon> mdi-plus-box-multiple-outline </v-icon>
					Add Expense
					<v-dialog v-model="expenseDialog" width="600">
						<add-expense @done="refreshData" />
					</v-dialog>
				</v-btn>
				<total-graph mode="mini"/>
				<quick-navigation/>
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script >
	import {mapState,mapActions} from 'vuex'
	import AddExpense from '../components/AddExpense'
	import QuickNavigation from '../components/QuickNavigation'
	import RecentTransactions from '../components/RecentTransactions'
	import TotalGraph from '../components/charts/TotalGraph'


	export default {
		name:'Dashboard',
		data(){
			return {
				expenseDialog: false
			}
		},
		computed:{
			...mapState('auth',['username']),
			...mapState('spending',['totalSpending']),
			
		},
		methods:{
			refreshData(){
				this.expenseDialog = false
				this.loadSpending()
				this.$refs.recent.load()
			},
			...mapActions({
				'loadSpending': 'spending/totalSpending'
			})
		},
		components:{
			QuickNavigation,
			AddExpense,
			TotalGraph,
			RecentTransactions,

		},
		mounted(){
			this.loadSpending()
		}
	}
	
</script>