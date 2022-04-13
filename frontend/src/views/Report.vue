<template>
<div>
		<v-container>
			<v-row>
				<h1> Reports </h1>
				<v-spacer/>
				<v-btn text color="primary" :to="{name:'Dashboard'}">
					<v-icon> mdi-arrow-left </v-icon>
					Back to Dashboard
				</v-btn>
			</v-row>
			<v-row> 
				<v-col>
					<filter-timeline/>
				</v-col>
			</v-row>
			<v-row class="mt-5">
			<v-col cols="12" md="8">
				<pattern-graph mode="full"/>
			</v-col>
			<v-col cols="12"  md="4">
				<v-data-table :items-per-page="5"
				:headers="patternHeaders"
				:items="spendingDataTable"
				>
				</v-data-table>

			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="8">
				<total-graph mode="full"/>
			</v-col>
			<v-col cols="12"  md="4">
				<v-data-table :items-per-page="5"
				:headers="totalHeaders"
				:items="totalDataTable"
				>
				</v-data-table>

			</v-col>
		</v-row>
		</v-container>
</div>
</template>
<script>
import PatternGraph from '../components/charts/PatternGraph'
import FilterTimeline from '../components/FilterTimeline'
import TotalGraph from '../components/charts/TotalGraph'

import {mapGetters,mapActions} from 'vuex'

export default{
	name:'Report',
	data(){
		return {
			patternHeaders:[
			{
				text:'Category',
				value:'category',
			},
			{
				text:'Amount (Rs)',
				value:'amt',
			}
			],
			totalHeaders:[
					{	text:`Time Period`,
						value:'label',
					},
					{
						text: 'Amount (Rs)',
						value: 'amt'
					}
			]
		}
	},
	methods:{
		...mapActions({
			'getCatTransactions':'spending/getCatTransactions',
			'getTotalTransactions':'spending/getTotalTransactions',
		}),
		loadData(){
			this.getCatTransactions()
			this.getTotalTransactions()
		},
	},
	computed:{
		...mapGetters({
			spendingDataTable: 'spending/spendingDataTable',
			totalDataTable: 'spending/totalDataTable',
			timeMetaDate: 'spending/timeMetaData',
		}),

	},
	components:{
	TotalGraph,
	FilterTimeline,
	PatternGraph,
	},
	mounted(){
		this.loadData()
	}
}
</script>