<template>
	<v-chip  :color="category.color" text-color="white">
		<v-icon>
			mdi-{{category.icon}}
		</v-icon>
			{{name}}
	</v-chip>
</template>

<script>
export default {
	name:'CategoryChip',
	props: ['name'],
	computed:{
		category(){
		const cat = this.$store.state.spending.categories[this.name]
		if(cat)
			return cat
		return {icon:'cross'}
		}
	}
}
</script>


