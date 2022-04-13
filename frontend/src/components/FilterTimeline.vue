<template>
		<v-card  elevation="0">
		<v-card-title>
				<v-icon> mdi-filter </v-icon>
				Filter Transactions
		</v-card-title>
		<v-card-text>

		<v-row>
			<v-col cols="6" >
			<v-text-field readonly
			prefix="Choose Month:"
			solo
			:show-label="false"
			label="Choose Month"
			@click="chooseDate=true" 
			v-model="date" 
			append-icon="mdi-calendar">
			</v-text-field>
			<v-dialog 
			width="500"
			:value="chooseDate"
			@click:outside="chooseDate=false"
			>
				<v-date-picker
				v-model="date"
				type="month"
				class="mt-4"
				min="2017-06"
				max="2030-10"
				/>
			</v-dialog>
		</v-col>
			<v-col cols="6">
				<v-select :items="possFreq"
				v-model="freq"
				solo
				>
				</v-select>
			</v-col>
			</v-row>
		</v-card-text>
		</v-card>
</template>
<script>
import {mapActions} from 'vuex'
export default{
	name:'FilterTimeline',
	data(){
		return{
			date:'2022-04',
			chooseDate:false,
			possFreq: ['Weekly'],
			freq:'Weekly'
		}
	},
	methods:{
		...mapActions({
			'addDate': 'spending/addDate'
		}),
		...mapActions({
			'getCatTransactions':'spending/getCatTransactions',
			'getTotalTransactions':'spending/getTotalTransactions',
		}),
		refresh(){
			this.getCatTransactions()
			this.getTotalTransactions()
		}
	},
	watch:{
		date(){
			this.chooseDate = false
			const [year,month] = this.date.split('-')
			this.addDate({year,month})
			this.refresh()

		},

	},
}

</script>
<style scoped>
		form{
			display: flex;
		}
</style>