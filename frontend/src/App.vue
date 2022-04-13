<template>
  <v-app>
    
    <v-app-bar
      app
      
      light
      dense
    >
      <div class="d-flex align-center">
        <v-icon> mdi-chart </v-icon> payment splitter
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
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