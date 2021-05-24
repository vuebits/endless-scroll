<template>
  <div
    :id="`v-infinite-scroll-${identifier}`"
    ref="container"
    class="v-infinite-scroll-container"
  >
    <slot />

    <template v-if="isLoading">
      <slot name="loading">
        <div
          class="v-infinite-scroll-status"
        >
          {{ loadingText }}
        </div>
      </slot>
    </template>
    <template v-if="isComplete">
      <slot name="complete">
        <div
          class="v-infinite-scroll-status"
        >

          {{ completeText }}
        </div>
      </slot>
    </template>
    <template v-if="isError">
      <div
        class="v-infinite-scroll-status"
      >
        <slot name="error">
          {{ errorText }}
        </slot>
      </div>
    </template>
    <div ref="end" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onBeforeUnmount, ref, toRefs, watch } from 'vue'
import { InifiniteScrollState } from './models'

export default defineComponent({
  name: 'VEndlessScroll',
  props: {
    identifier: {
      type: Number as PropType<number>,
      default: 1
    },
    state: {
      type: String as PropType<InifiniteScrollState>,
      required: true
    },
    loadingText: {
      type: String as PropType<string>,
      default: 'Loading ...'
    },
    errorText: {
      type: String as PropType<string>,
      default: 'Sorry, some error has occured during loading'
    },
    completeText: {
      type: String as PropType<string>,
      default: 'Nothing left to load'
    }
  },
  setup (props, { emit }) {
    let observer = null as any
    const container = ref(null)
    const end = ref(null)
    const { state, identifier } = toRefs(props)

    const setObserver = (): void => {
      const options = {
        root: container.value,
        rootMargin: '0px',
        threshold: 1.0
      }

      observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          handleScroll()
        }
      }, options)

      observer.observe(end.value!)
    }

    const handleScroll = (): void => {
      if (state.value === InifiniteScrollState.LOADED) {
        emit('feed-me')
      }
      if (state.value === InifiniteScrollState.COMPLETE) {
        observer.disconnect()
      }
    }

    const reset = (): void => {
      (container.value! as HTMLElement).scrollTop = 0
      setObserver()
    }

    watch(identifier, reset)

    onMounted(() => {
      setObserver()
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    return {
      container,
      end
    }
  },
  emits: ['feed-me'],
  computed: {
    isLoading (): boolean {
      return this.state === InifiniteScrollState.LOADING
    },
    isComplete (): boolean {
      return this.state === InifiniteScrollState.COMPLETE
    },
    isError (): boolean {
      return this.state === InifiniteScrollState.ERROR
    }
  }
})
</script>

<style scoped>
.v-infinite-scroll-container {
  overflow-y: scroll;
}
</style>
