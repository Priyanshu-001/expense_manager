<template>
<v-card rounded :loading="loading">
	<v-card-title>
		{{title}}
	</v-card-title>
	<v-card-subtitle v-if="mode==='edit'">
			Transaction Id #{{id}}
			
	</v-card-subtitle>
	<v-card-text>
		<v-alert
			color="red"
			type="error"
			border="left"
			colored-border
			elevation="3"
			v-if="code"
			>
			Error Occcured code: {{code}}
		</v-alert>
	<form>
		<v-row>
			<v-col cols="8">
				<v-text-field
				v-model="transaction.item"
				solo
				prepend-inner-icon="mdi-bag-personal"
				label="Item"
				/>
			</v-col>
			<v-col cols="4">
				<v-text-field 
				solo
				v-model.number="transaction.price"
				prefix="₹"
				type="number"
				label="price"/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols='6' >
				<v-select label="Choose Category" chips solo
				prepend-inner-icon="mdi-label"
				v-model="transaction.category"
				:items="categoryList">
					<template v-slot:selection="{ item }">
						<category-chip :name="item"/>
					</template>
				</v-select>
			</v-col>
			<v-col cols='6' >
				<v-text-field label="Select Date" 
				:value="transaction.picker"
				solo 
				readonly 
				@click="chooseDate=true">
				</v-text-field>
				<v-dialog v-model="chooseDate" width="400">
					<v-date-picker
					v-model="transaction.picker"
					></v-date-picker>
				</v-dialog>
			</v-col>
			</v-row>
		<v-row>
			<v-col cols="12">
				<v-textarea label="Description" solo counter rows=4 v-model="transaction.description">
				</v-textarea>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-btn color="primary" block v-if="mode=='add'" @click="addNew">
					Add Expense
				</v-btn>
				<v-btn color="primary" block v-else @click="edit">
					Edit Transaction
				</v-btn>
			</v-col>
		</v-row>

	</form>
	</v-card-text>
</v-card>
</template>

<script >
import {mapGetters} from 'vuex'
import CategoryChip from './CategoryChip'
import Axios from '@/services/Axios'
	export default{
		name:'AddExpense',
		data(){
			return {
				loading:false,
				chooseDate: false,
				code: '',
				transaction:{
					item:'',
					price:'',
					description:'',
					picker:'2022-04-14',
					category:'fuel'
				}
			}
		},
		methods:{
			async addNew(){
				this.loading = true
				this.code=""
				Axios.post('/addtransaction',{transaction:this.transaction})
				.then(()=>{
					this.transaction = {}
					this.$emit('done')

				})
				.catch(err=>{
					this.code = err.response.status
					console.log(err.response.status)
				})
				.finally(()=>{
					this.loading = false
				})
			},
			async edit(){
				this.loading = true
				this.code = ''
				Axios.patch('/edittransaction',{transaction:this.transaction})
				.then(()=>{
					this.$emit('done')
					console.log('Updated')
				})
				.catch(err=>{
					this.code = err.response.status
					console.log(err.response.status)
				})
				.finally(()=>this.loading=false)
			}
		},
		computed:{
					
			...mapGetters({
				categoryList: 'spending/categoryList'
			}),
			title(){
				return this.mode==='add'? 'Add Expense': 'Edit Transaction'
			}
		},
		props:{
			mode:{
				type:String,
				default: 'add',
			},
			id:{
				type:String,
			}
		},
		mounted(){
			if(this.mode==='edit'){
				this.transaction = this.$store.getters['transactions/single'](this.id)
			}
		},
		components:{
			CategoryChip,
		}
	}
</script>