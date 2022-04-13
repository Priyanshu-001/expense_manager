<template>
	<form>
	<v-text-field :value="username" autocomplete="username" readonly  filled oultined label="Username" />
	<v-text-field v-model="pwd" 
	label="Create Password" 
	:rules="[musttype]"
	autocomplete="new-password" 
	:type="show?'password':''">
		<template v-slot:append>
			<v-btn text @click="show=!show">
				<v-icon>
					mdi-{{pass_icon}}
				</v-icon>
			</v-btn>
		</template>
	
	</v-text-field>
	<v-text-field v-model="pwd2" 
	label="Retype Password" 
	:rules="[musttype,samepass]"
	autocomplete="new-password"
	@keyup.enter="next"
	:type="show?'password':''">
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
import {mapState} from 'vuex'
	export default{
		name:'Register',
		data(){
			return {
				pwd2:'',
				show:true,
				pwd:'',
				musttype:val=>val.length > 0 || 'password cant be empty',
			}
		},
		methods:{
			async registerUser(){
				try{
					const res = await Axios.post('/register',{
						username:this.username,
						password: this.pwd
					})
					const {JWT,_id} = res.data
					this.$store.dispatch('auth/login',{JWT,_id})
					console.log(res)
					this.$router.push({name:'Dashboard'})

				}
				catch(err){
					console.log(err)
					this.$emit('error')
				}

			},
			next(){
				if(!this.pwd || this.pwd2 != this.pwd){
					this.$emit('error')
					this.$emit('input',false)
				}
				else{
					this.registerUser()
				}
			}
		},
		computed:{
			pass_icon(){
			if(this.show)
				return 'eye'
			return 'eye-off'
			},
			samepass(){
				return this.pwd === this.pwd2 || 'Passwords must be same'
			},
			...mapState('auth', ['username']),
		}
	}
</script>