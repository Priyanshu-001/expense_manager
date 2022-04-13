<template>
			<v-text-field
			label="Username"
			v-model="username"
			:rules="[min3char,serverError]"
			@keyup.enter="next"
			:readonly="value"
			:filled="value"
			autocomplete="username"
			/>
			
</template>

<script>
import Axios from '@/services/Axios'
export default{
	name:'UsernameBox',
	data(){
	return {
		min3char:(val)=> val.length>=3 || 'Username must have atleast 3 characters',
		serverError: true,
		username:'',
		usernameExists: false,
	}
	},
	props:['value'],
	methods:{
		async next(){
			this.$emit('input',true)
			this.usernameExists = false
			let err = false
			if(this.username.length <3)
			err =true
			try{
				if(err)
					throw err
				const res = await Axios.get('/usernameexists',{params:{
					username: this.username
				}})
				console.log(res.data)
				this.usernameExists = res.data.userExists
				this.$store.dispatch('auth/tempUsername',{username:this.username})
			}
			catch(error){
				err= true
				console.log(error)
				console.log('ok')
			}
			finally{
				this.$emit('procced',{err,usernameExists:this.usernameExists})
			}
		}
	}
}
</script>