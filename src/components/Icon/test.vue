<template>
  <div>
    <!-- <Icon type="t"></Icon> -->
    <Icon v-for="(t,i) in types" :key="i" :type="t">{{ t }}</Icon>
  </div>
</template>

<script>
import Icon,{ types }from "./";
export default {
  components: {
    Icon
  },
  data() {
    return {
      types
    }
  }
};
</script>

<style></style>
