<template>
	<v-card class="mt-4">
		<v-card-title>
		<v-icon> </v-icon> Quick Navigation
		</v-card-title>
		<v-card-text>
			<div style="display:grid">
				<v-btn text color="primary"
				v-for="item in routes"
				:key="item.name"
				:to="{name:item.name}">
					{{item.displayName}}
					<v-icon> mdi-arrow-right </v-icon>
				</v-btn>
				<v-btn text color="primary"
				@click="ChangeAccount"
				>
				Switch Account
				<v-icon>
					mdi-arrow-right
				</v-icon>
				</v-btn>
			</div> 
		</v-card-text>
	</v-card>
</template>

<script>
import {mapActions} from 'vuex'
	export default{
		name:'QuickNavigation',
		data(){
			return{
				routes:[
				{
					name:"All",
					displayName:'AllTransactions',

				},
				{
					name:"Report",
					displayName:'Reports'

				},
				]
			}
		},
		methods:{
			...mapActions({
				logout:'auth/logout',
			}),
			ChangeAccount(){
				this.logout()
				this.$router.push({name:'Login'})
			}
		}
	}
</script>
