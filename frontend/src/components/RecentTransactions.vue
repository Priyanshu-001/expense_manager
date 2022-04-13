<template>
<div>
		<template v-if="loading">
				<v-progress-circular indeterminate color="primary" size="150"/>
		</template>

		<template v-else-if="errorLoading">
			<v-icon color="Yello" size="x-large">
				mdi-alert-octagram
			</v-icon>
			<v-btn text color="primary" @click="load">
				<v-icon> mdi-reload </v-icon>
				Retry
			</v-btn>	
		</template>

		<template v-else>
						<ol>
							<li v-for="transaction in transactions" :key="transaction.id">
								<transaction-item :transaction="transaction" @done="$emit('done')"/>

							</li>
						</ol>
		</template>
</div>
</template>
<script>
import TransactionItem from '../components/TransactionItem'
import {mapState,mapActions} from 'vuex'
	export default{
		name:'RecentTransactions',
		computed:{
			...mapState('transactions',['loading','errorLoading','transactions'])
		},
		components:{
			TransactionItem,
		},
		methods:{
			...mapActions({
				'getTransactions': 'transactions/getTransactions'
			}),
			load(){
				return this.getTransactions({limit:5})
			}
		},
		mounted(){
			this.load()
		}
	}
</script>

<style scoped>
		ol{
	width: 100%;
    list-style-type: none;
		}
		
	div {
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top:1rem;
	}
</style>