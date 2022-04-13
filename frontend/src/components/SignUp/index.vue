<template>
<v-card
    class="mx-auto"
    max-width="500"
    :loading="loading"
  >
		<v-card-title>
			{{title}}
		</v-card-title>
		<v-card-text>
			<v-window v-model="step">
		<v-window-item :value="1">
			<username-box ref="username_box" @procced="decideRoute" v-model="loading" />	
		</v-window-item>
			<v-window-item :value="2">
				<register ref="register" @error="errorEmitted" v-model="loading"/>
			</v-window-item>
			<v-window-item :value="3">
				<login ref="login" @error="errorEmitted" v-model="loading"/>
			</v-window-item>
			</v-window>
			</v-card-text>
		<v-card-actions>
			<v-btn v-if="step>1 && !loading" text @click="step=1">
				back
			</v-btn>
			<v-spacer/>
			<v-btn text color="primary" @click="next" :disabled="loading">
				<template v-if="!loading">
						{{current_action}} <v-icon> mdi-arrow-right </v-icon>
				</template>
				<template v-else>
					<v-icon> mdi-spin mdi-loading </v-icon> Please wait
				</template>
			</v-btn>
		</v-card-actions>
		
		<v-snackbar v-model="snackbar"> {{msg}} </v-snackbar>
	</v-card>
</template>

<script >
	import UsernameBox from './UsernameBox'
	import Login from './Login'
	import Register from './Register'

	export default {
		data(){
			return {
					snackbar:false,
					username:'',
					msg:'An error occured',
					step:1,
					loading:false,
			}
		},

		methods:{
			errorEmitted(){
				this.snackbar = true
				this.loading=false
			},
			decideRoute({err,usernameExists}){
				console.log(usernameExists)
				this.loading=false
				if(err)
					this.snackbar= true
				else if(usernameExists)
					this.step=3
				else
					this.step=2
			},
			next(){

				switch(this.step){
					case 1: 
					{ 
						this.$refs.username_box.next()
						return
					}
					case 2:
					{	this.$refs.register.next()
						return
					}
					case 3:
					{
						this.$refs.login.next()
					}
				}

			}
		},
		computed:{
				current_action(){
					switch(this.step){
						case 1:return 'next'
						case 2: return 'SignUp'
						case 3: return 'Login'
						default: return 'this shouldnt happen'
					}
				},
				title(){
					switch(this.step){
						case 1:return 'Login or Create Account'
						case 2: return 'Create Account'
						case 3: return 'Login'
						default: return 'Unreachable pos'
					}
		},
	},
		components:{
			UsernameBox,
			Register,
			Login,
		},
		name:'SignUp',
	}
</script>
<style scoped>
	.full-width {
		width:100%;
		height:3ch;
	}
</style>