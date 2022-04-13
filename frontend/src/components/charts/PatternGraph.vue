<template>
	<wrapper :mode="mode"
		title="Spending Pattern"
		:subtitle="subtitle"
		:loaded="catLoaded"
		>
		<v-sparkline
          :value="spendingList"
          type="bar"
          height="100"
          auto-line-width
          auto-draw
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :labels="categoryList"
          :show-labels="true"
        >
    </v-sparkline>
	</wrapper>
</template>
<script>
import Wrapper from '../charts/Wrapper'
import {mapGetters,mapState} from 'vuex'
	export default{
		name:'PatternGraph',
		computed:{
			...mapGetters({
				timeData:'spending/timeMetaData',
				categoryList: 'spending/categoryList',
				spendingList: 'spending/spendingList',
			}),
			...mapState(
				'spending', ['catLoaded'],
			),
			subtitle(){
				const {month, year} = this.timeData
				return `${month}/${year}`
			}
		},
		props:['mode'],
		components:{
			Wrapper,
		}

	}
</script>