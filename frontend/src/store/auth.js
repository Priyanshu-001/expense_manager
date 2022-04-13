
		const auth = {
		isRegistered: false,
		namespaced: true,
		state: ()=>{
		return {
		username: localStorage.getItem('username') || null,
		JWT: localStorage.getItem('JWT') || null,
		_id:localStorage.getItem('_id') || null ,
		loggedIn: (!!localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') === 'true'),
		}
		},
		mutations:{
		setUsername(state,{username}){
		state.username=username
		},
		login(state,{JWT,_id}){
			state.JWT = JWT
			state._id= _id
			state.loggedIn = true
		},
		logout(state){
			state.JWT =null
			state._id=null
			state.loggedIn =false
		}
		},
		actions:{
		tempUsername(ctx,{username}){
		ctx.commit('setUsername',{username})
		},
		login(ctx,{JWT,_id}){

			ctx.commit('login',{JWT,_id})
			localStorage.setItem('loggedIn',true)
			localStorage.setItem('_id',_id)
			localStorage.setItem('JWT',JWT)
			localStorage.setItem('username',ctx.state.username)
			
		},
		logout(ctx){
			ctx.commit('logout')
			localStorage.removeItem('loggedIn')
			localStorage.removeItem('_id')
			localStorage.removeItem('JWT')
			localStorage.removeItem('username')
		}
		}
		}
		export default auth;