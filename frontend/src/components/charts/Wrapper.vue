<template>
	<v-card :loading="!loaded"  
	>
	<v-card-title>
	{{title}}
	</v-card-title>
	<v-card-subtitle>
		{{subtitle}}
	</v-card-subtitle>
	
	<v-card-text>
		<slot>
		</slot>
	</v-card-text>
	<v-card-actions v-if="mode==='mini'">
		<v-spacer/>
		<v-btn color="primary" text :to="{name:'Report'}">
				View Detailed Report 
				<v-icon>
					mdi-arrow-right
				</v-icon>
		</v-btn>
	</v-card-actions>
	</v-card>
</template>
<script>
	export default{
		name:'Wrapper',
		props:{
			mode:{
				type:String,
				default:'mini'
			},
			loaded:{
				type:Boolean,
				default:false,
			},
			title:{
				type:String,
				default:'Report'
			},
			subtitle:{
				type:String,
				default:'A good report'
			}
		},

	}
</script>