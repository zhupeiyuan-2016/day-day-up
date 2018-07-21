<template>
  <div>
    <div
      is=LoginBackground
    >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginBackground from '@/components/login/loginBackground.vue'

export default {
  name: 'Home',
  components: {
    LoginBackground
  }
}
</script>
