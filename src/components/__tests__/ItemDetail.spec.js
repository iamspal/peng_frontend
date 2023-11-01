import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ItemListDetail from '@/components/ItemDetail.vue'

describe('ItemListDetail', () => {
  it('renders item details and emits image-clicked event on image click', async () => {
    // Create a mock item
    const item = {
      id: 1,
      title: 'Test Item',
      url: 'test-url.jpg',
      votes: 5
    }

    // Mount the component with the mock item
    const wrapper = mount(ItemListDetail, {
      props: {
        item: item
      }
    })

    // Find elements within the component
    const titleElement = wrapper.find('h2')
    const imgElement = wrapper.find('img')
    const votesElement = wrapper.find('p')

    // Expect item details to be rendered
    expect(titleElement.text()).toBe(item.title)
    expect(imgElement.attributes('src')).toBe(item.url)
    expect(votesElement.text()).toContain(`Votes: ${item.votes}`)

    // Click the image
    await imgElement.trigger('click')
    // Expect the emitted event with the item's id
    expect(wrapper.emitted('image-clicked')).toBeTruthy()
    expect(wrapper.emitted('image-clicked')[0]).toEqual([item.id])
  })

  it('does not render anything if item.title is undefined', () => {
    // Mount the component with item.title undefined
    const wrapper = mount(ItemListDetail, {
      props: {
        item: { id: 1 }
      }
    })

    // Expect the component to not render anything
    expect(wrapper.html()).toBe('<!--v-if-->')
  })
})
