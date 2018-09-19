import { shallowMount } from '@vue/test-utils'
import LetterFilter from '@/components/LetterFilter.vue'

describe('LetterFilter.vue', () => {
  let letterArr
  let filterLetter

  beforeEach(() => {
    letterArr = [ 'A', 'B', 'C' ]
    filterLetter = 'A'
  })

  it('should have selectedLetter class ', () => {
    const wrapper = shallowMount(LetterFilter, {
      propsData: {
        letterArr: letterArr,
        filterLetter: filterLetter
      }
    })
    expect(wrapper.contains('.selectedLetter')).toBe(true)
  })

  it('should not have selectedLetter class', () => {
    const wrapper = shallowMount(LetterFilter, {
      propsData: {
        letterArr: letterArr,
        filterLetter: null
      }
    })
    expect(wrapper.contains('.selectedLetter')).toBe(false)
  })

  it('should not have element with #filter-off', () => {
    const wrapper = shallowMount(LetterFilter, {
      propsData: {
        letterArr: letterArr,
        filterLetter: null
      }
    })
    expect(wrapper.contains('#filter-off')).toBe(false)
  })

  it('should have element with #filter-off', () => {
    const wrapper = shallowMount(LetterFilter, {
      propsData: {
        letterArr: letterArr,
        filterLetter: filterLetter
      }
    })
    expect(wrapper.contains('#filter-off')).toBe(true)
  })
})
