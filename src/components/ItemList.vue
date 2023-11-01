<template>
  <ul>
    <li v-for="item in items" :key="item.id" @click="onItemClick(item)">
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array,
    required: true
  },
  emits: ['item-clicked'],
  setup(props, ctx) {
    // Handle item click and emit the 'item-clicked' event
    const onItemClick = (item) => {
      ctx.emit('item-clicked', item)
    }

    return {
      onItemClick
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
  user-select: none;
  font-size: 19px;
  padding-bottom: 15px;
}
</style>
