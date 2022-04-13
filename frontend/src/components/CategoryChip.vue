<template>
	<v-chip  :color="category.color" text-color="white">
		<v-icon>
			mdi-{{category.icon}}
		</v-icon>
			{{name}}
	</v-chip>
</template>

<script>
import {mapState} from 'vuex'

export default {

	name:'CategoryChip',
	props: ['name'],
	computed:{
		
		...mapState('spending',['categories']),
		category(){
		const cat = this.categories[this.name]
		return cat
		},
	}
}
</script>


