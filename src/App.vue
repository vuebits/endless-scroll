<template>
  <VEndlessScroll
    :state="state"
    :identifier="identifier"
    class="example"
    @feed-me="feedIt"
  >
    <span v-for="(line,index) in lines"
      :key="index"
    >
      {{line}}<br>
    </span>
  </VEndlessScroll>
  <button @click="reset">Reset</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VEndlessScroll from './components/Component.vue'
import { InifiniteScrollState } from './components/models'

export default defineComponent({
  name: 'App',
  components: {
    VEndlessScroll
  },
  data () {
    return {
      state: InifiniteScrollState.LOADED,
      lines: [
        'pierwsza linia',
        'druga linia',
        'trzecia linia'
      ],
      identifier: 1
    }
  },
  methods: {
    feedIt (): void {
      if (this.lines.length < 100) {
        console.log('FEEED MEEEE')
        this.lines.push('linia nowa')
        this.lines.push('linia nowa')
        this.lines.push('linia nowa')
        this.lines.push('linia nowa')
      } else {
        this.state = InifiniteScrollState.COMPLETE
      }
    },
    reset (): void {
      this.lines = [
        'pierwsza linia',
        'druga linia',
        'trzecia linia',
        'pierwsza linia',
        'druga linia',
        'trzecia linia',
        'pierwsza linia',
        'druga linia',
        'trzecia linia'
      ]
      this.state = InifiniteScrollState.LOADED
      this.identifier++
    }
  }
})
</script>

<style>
.example {
  max-height: 100px;
  max-width: 200px;
  margin: 10px auto;
  background-color: beige;
}
</style>
