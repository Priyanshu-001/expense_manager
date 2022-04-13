<template>
	<v-dialog v-model="dialog" width="800">
			<template v-slot:activator="{ on, attrs }">
        <v-btn
        text
        v-bind="attrs"
        v-on="on"
        color="primary"
		>
		Edit Transaction 
			<v-icon>
			mdi-arrow-right
		</v-icon>
        </v-btn>
      </template>
      <add-expense mode="edit" :id="id" @done="$emit('done')"/>
	</v-dialog>
</template>

<script>
import AddExpense from './AddExpense'
export default{
	name: 'EditTransactionDialog',
	data(){
		return {
			dialog: false,
		}
	},
	props: ['id'],
	components:{
		AddExpense,
	}
}
</script>