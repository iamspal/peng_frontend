<template>
  <div class="image-clicker">
    <!-- Left section: Display a list of GIFs titles -->
    <div class="image-clicker__left">
      <item-list :items="gifs" @item-clicked="handleGifTitleClick"></item-list>
    </div>

    <!-- Right section: Display details for the selected GIF -->
    <div class="image-clicker__right" :class="{'show-as-modal': activeDetail?.title?.length}">
      <button @click="removeActiveDetail">X</button>
      <div class="image-clicker__right__item-detail">
        <item-detail :item="activeDetail" @image-clicked="handleGifClick" v-if="activeDetail?.title"></item-detail>
        <h1 v-else>Please select a Gif item</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getGifs, upVoteGif } from '../services/gifs'
import ItemList from '../components/ItemList.vue'
import ItemDetail from '../components/ItemDetail.vue'

const gifs = ref(null)
const activeDetail = ref({})

// Fetch GIF list when the component is mounted
onMounted(async () => {
  gifs.value = await getGifs()
})

// Handle the click event on the title
function handleGifTitleClick(gifItemClicked) {
  activeDetail.value = gifs.value.find((gifItem) => {
    return gifItem.id === gifItemClicked.id
  })
}

// Handle the click event on the GIF image
async function handleGifClick(gifImageId) {
  const voteResult = await upVoteGif(gifImageId)
  if (voteResult) {
    gifs.value.forEach((gif) => {
      if (gif.id === gifImageId) {
        gif.votes += 1
      }
    })
  }
}

function removeActiveDetail(){
  activeDetail.value = null;
}
</script>

<style lang="scss" scoped>
.image-clicker {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  @media (max-width: 991px) {
    flex-direction: column-reverse;
    flex-wrap: wrap;
  }

  &__left,
  &__right {
    width: 50%;
    padding: 15px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 991px) {
      width: 100%;
    }
  }

  &__left {
    background-color: #ecf0f1;
  }

  &__right {
    background-color: #34495e;

    button {
      display: none;
    }
    
    @media(max-width: 991px) {
      height: 100%;
      position: fixed;
      top: 0;
      display: none;

      &.show-as-modal {
        display: flex;

        button {
          display: inline-block;
          position: absolute;
          top: 30px;
          right: 20px;
          border: none;
          border-radius: 100%;
          width: 50px;
          height: 50px;
          background-color: white;
          color: black;
          outline: none;
          font-size: 25px;
          cursor: pointer;
        }
      }
    }

    &__item-detail {
      width: 50%;
      text-align: center;
      color: white;

      @media(max-width: 991px) {
        width: 100%;
      }
    }
  }
}
</style>
