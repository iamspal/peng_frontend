import { describe, expect, it, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import ImageClickerView from '@/views/ImageClickerView.vue'

// Mock window.alert
window.alert = vi.fn().mockImplementation((msg) => {
  return msg
})

// Mock api calls
vi.mock('../../services/gifs', () => ({
  getGifs: () => {
    return Promise.resolve([
      { id: 1, title: 'GIF 1', votes: 5, url: 'gif1.jpg' },
      { id: 2, title: 'GIF 2', votes: 3, url: 'gif2.jpg' }
    ])
  },
  upVoteGif: () => {
    return Promise.resolve(true)
  }
}))

describe('ImageClickerView', () => {
  let wrapper
  beforeEach(async () => {
    wrapper = mount(ImageClickerView)
    await nextTick()
    await flushPromises()
  })

  it('renders the component with initial data', async () => {
    // Assert that the component renders the list of GIF titles and a message
    const gifTitleElements = wrapper.findAll('.image-clicker__left li')
    const gifDetailElement = wrapper.find('.image-clicker__right')

    expect(gifTitleElements.length).toBe(2)
    expect(gifDetailElement.text()).toContain('Please select a Gif item')
  })

  it('emits "item-clicked" event when a GIF title is clicked', async () => {
    // Find the first GIF title and click it
    const firstGifTitle = wrapper.find('.image-clicker__left li')
    await firstGifTitle.trigger('click')

    // Expect that the "item-clicked" event was emitted with the correct data
    const itemListComponent = wrapper.findComponent({ name: 'ItemList' })
    expect(itemListComponent.emitted('item-clicked')).toBeTruthy()
    expect(itemListComponent.emitted('item-clicked')[0][0].id).toEqual(1)
  })

  it('displays GIF details when a GIF title is clicked', async () => {
    // Find the first GIF title and click it
    const firstGifTitle = wrapper.find('.image-clicker__left li')
    await firstGifTitle.trigger('click')
    await nextTick()

    // Find the GIF detail element and assert that it displays the details
    const gifDetailElement = wrapper.find('.image-clicker__right')
    expect(gifDetailElement.text()).toContain('GIF 1')
  })

  it('emits "image-clicked" event when the GIF image is clicked', async () => {
    // Find the first GIF title and click it
    const firstGifTitle = wrapper.find('.image-clicker__left li')
    await firstGifTitle.trigger('click')
    await nextTick()
    // Click the GIF image
    const gifImage = wrapper.find('.image-clicker__right img')
    await gifImage.trigger('click')

    // Expect that the "image-clicked" event was emitted with the correct data
    const itemDetailComponent = wrapper.findComponent({ name: 'ItemDetail' })
    expect(itemDetailComponent.emitted('image-clicked')).toBeTruthy()
    expect(itemDetailComponent.emitted('image-clicked')[0]).toEqual([1])
  })

  it('Increments the vote when clicked on gif image', async () => {
    // Find the first GIF title and click it
    const firstGifTitle = wrapper.find('.image-clicker__left li')
    await firstGifTitle.trigger('click')
    await nextTick()
    // Click the GIF image
    const gifImage = wrapper.find('.image-clicker__right img')
    await gifImage.trigger('click')

    // Expect that the "image-clicked" event was emitted with the correct data
    const itemDetailComponent = wrapper.findComponent({ name: 'ItemDetail' })
    expect(itemDetailComponent.find('p').text()).toEqual('Votes: 6')
  })
})
