<template>
<v-container >
	<v-row>
		<v-col cols="12">
			<v-data-table
			dense
			:headers="headers"
			:items="transactions"
			:elevation="2"
			class="elevation-1"
			>
			<template v-slot:item.category="{ item }">
				<category-chip :name="item.category" />
			</template>
			<template v-slot:item.action="{ item }">
				<edit-transaction-dialog :id="item.id"/>
			</template>
			</v-data-table> 
		</v-col>
	</v-row>
</v-container>
</template>
<script >
import {mapGetters} from 'vuex'
import CategoryChip from '../components/CategoryChip'
import EditTransactionDialog from '../components/EditTransactionDialog'

	export default{
		name:'Alltransactions',
		data(){
				return {
						headers:[
						{	text:'item'	,
							value:'item',
						},
						{	text:'price',	
							value:'price',
						},
						{
							text:'Date',
							value:'date',
						},
						{
							text:'Category',	
							value:'category',
						},
						{
							text:'Short Description',
							value:'description'
						},
						
						{
							text:'Action',
							value:'action'
						},
						]
				}
		},
		computed:{
				...mapGetters({
					'transactions': 'transactions/list'
				})
		},
		components:{
			EditTransactionDialog,
			CategoryChip,

		},
		mounted(){
			console.log(this.transactions)
		}
	}
</script>