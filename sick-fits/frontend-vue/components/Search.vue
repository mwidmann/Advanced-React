<template>
  <SearchStyles>
    <div>
      <input @input="onChange" />
    </div>
    <DropDown>
      <DropDownItem v-for="item in items" :key="item.id">
        <img width="50" :src="item.image" :alt="item.title" />
        {{ item.title }}
      </DropDownItem>
    </DropDown>
  </SearchStyles>
</template>

<script>
import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'

export default {
  components: {
    DropDown,
    DropDownItem,
    SearchStyles,
  },
  data() {
    return {
      items: [],
      loading: false,
    }
  },
  methods: {
    onChange: debounce(async function(e) {
      this.loading = true
      const res = await this.$apollo.query({
        query: require('~/graphql/queries/SearchItems.gql'),
        variables: {
          searchTerm: e.target.value,
        },
      })

      this.loading = false
      this.items = res.data.items
    }, 350),
  },
}
</script>
