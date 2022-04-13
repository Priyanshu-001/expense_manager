<template>
  <v-app>
    
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        
        <h1>
        <v-icon color="yellow"  :size="45"> mdi-bitcoin </v-icon> 
        Expense Manager
      </h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
   <status-update/>
    <v-main>
     <!--  <v-container>
        <v-row>
          <v-col>
            <v-spacer/> -->
            <router-view/>
            <!-- <v-spacer/>
          </v-col>
        </v-row>
      </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
import StatusUpdate from '@/components/StatusUpdate'
export default {
  name: 'App',

  data: () => ({
    //
    status:'connecting'
  }),
  methods:{
    heartbeat: async function(){
      return await setTimeout(()=>'connected',200)
    }
  },
  components:{
    StatusUpdate,
  },
  created(){
   this.status =  this.heartbeat
  }
};
</script>

<style>
  .price {
    color:green;
  }
  .price:before{
    content:'Rs'
  }

</style>