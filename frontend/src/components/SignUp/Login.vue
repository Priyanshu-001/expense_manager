<template>
<form>
<v-text-field :value="$store.state.auth.username" autocomplete="username" readonly  filled oultined label="Username" />

<v-text-field label="Password" 
v-model="pwd"
:rules="[val=>!!val || 'Password can not be empty']"
:filled="value" 
:readonly="value"  
autocomplete="current-password" 
@keyup.enter="next"
:type="show? 'password':''">
	<template v-slot:append>
			<v-btn text @click="show=!show">
				<v-icon>
					mdi-{{pass_icon}}
				</v-icon>
			</v-btn>
		</template>
	</v-text-field>
</form>
</template>

<script>
import Axios from '@/services/Axios'
import {mapState,mapActions} from 'vuex'
export default{
	name:'Login',
	data(){
		return {
			show:true,
			pwd:''
		}
	},
	props:['value'],
	methods:{
		...mapActions({login:'auth/login'}),
		async next(){
			this.$emit('input',true)
			if(!this.pwd)
				return this.$emit('error')
			try{	
					const {data} = await Axios.post('/login',{username:this.username,password:this.pwd})
					const {JWT,_id} = data
					await this.login({JWT,_id})
					this.$router.push({name:'Dashboard'})
				}
			catch(err){
				this.$emit('error')
			}
		}
	},
	computed:{
		pass_icon(){
			if(this.show)
				return 'eye'
			return 'eye-off'
			},
			...mapState('auth', ['username']),

	}
}
</script>