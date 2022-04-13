<template>
	<wrapper :mode="mode"
		:title="timeData.granularity +  ' Spending Data'"
		:subtitle="subtitle"
		:loaded="totalLoaded"

		>
		<v-sparkline
          :value="totalList"
          height="100"
          auto-draw
           :gradient="['#f72047', '#ffd200', '#1feaea']"
          :labels="totalTimeline"
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
				totalTimeline: 'spending/totalTimeline',
				totalList: 'spending/totalList',
			}),
			...mapState(
				'spending', ['totalLoaded']
			),
			subtitle(){
				const {month, year,granularity} = this.timeData
				return `${granularity} data ${month}/${year}`
			}
		},
		props:['mode'],
		components:{
			Wrapper,
		}

	}
</script>