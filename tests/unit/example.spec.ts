import { shallowMount } from '@vue/test-utils'
import VEndlessScroll from '@/components/Component.vue'

describe('VEndlessScroll.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(VEndlessScroll, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
