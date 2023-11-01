<template>
  <div v-if="item?.title">
    <h2>{{ item.title }}</h2>
    <img :src="item.url" :alt="item.title" @click="onImageClick" />
    <p>Votes: {{ item.votes }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  emits: ['image-clicked'],
  setup(props, ctx) {
    // Handle image click and emit the 'image-clicked' event with the item's id
    const onImageClick = () => {
      ctx.emit('image-clicked', props.item.id)
    }

    return {
      onImageClick
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
  cursor: pointer;
}
</style>
