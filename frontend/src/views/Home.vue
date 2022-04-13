<template>
  <div class="home">
   <sign-up/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp'

export default {
  name: 'Home',
  components: {
    SignUp
  }
}
</script>
