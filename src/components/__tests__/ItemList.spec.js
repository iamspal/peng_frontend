import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ItemList from '@/components/ItemList.vue';

describe('ItemList', () => {
    it('renders items and emits item-clicked event on click', async () => {
        // Create a mock item
        const item = { id: 1, title: 'Test Item' };

        // Mount the component with the mock item
        const wrapper = mount(ItemList, {
            props: {
                items: [item],
            },
        });

        // Find the list item element and click it
        const listItem = wrapper.find('li');
        listItem.trigger('click');

        // Wait for the next tick of the event loop to ensure the event is emitted
        await wrapper.vm.$nextTick();

        // Expect the emitted event
        expect(wrapper.emitted('item-clicked')).toBeTruthy();
        expect(wrapper.emitted('item-clicked')[0]).toEqual([item]);

        // Expect the item to be rendered
        expect(listItem.text()).toBe(item.title);
    });
});