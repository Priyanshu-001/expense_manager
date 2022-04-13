<template>
<v-card rounded max-width="800" style="display: block; padding: 1ch;">
	<v-card-title class="text-h5">
		{{transaction.item}}
		<v-spacer/>
		<span class="price">
		{{transaction.price}}
		</span>
	</v-card-title>
	<v-card-subtitle>
		<category-chip :name="transaction.category" />
	</v-card-subtitle>
	<v-card-actions>
		<span class="text-subtitle">
		<v-icon size="sm"> mdi-clock-time-nine-outline </v-icon> {{(new Date(transaction.timestamp)).toLocaleString()}}
		</span>
		<v-spacer/>
		<edit-transaction-dialog :id="transaction._id" @done="$emit('done')"/>
	</v-card-actions>
</v-card>
</template>
<script>
import CategoryChip from './CategoryChip'
import EditTransactionDialog from './EditTransactionDialog'

	export default{
		name:'TransactionItem',
		data(){
			return {
				dialog:false,
			}
		},
		props:['transaction'],
		components:{
			CategoryChip,
			EditTransactionDialog,
		}
	}
</script>
<style scoped>

 
/style>