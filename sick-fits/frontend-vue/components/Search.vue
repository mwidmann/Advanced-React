<template>
  <SearchStyles>
    <Downshift :item-to-string="item => item.title" @input="onSelection">
      <div
        slot-scope="{
          getInputProps,
          getInputListeners,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }"
      >
        <input
          v-bind="
            getInputProps({
              placeholder: 'Search for an item',
              class: loading ? 'loading' : '',
              type: 'search',
              id: 'search',
            })
          "
          v-on="getInputListeners({ input: onChange })"
        />
        <DropDown v-if="isOpen">
          <DropDownItem
            v-for="(item, index) in items"
            :key="item.id"
            v-bind="getItemProps({ item })"
            :class="{ highlighted: index === highlightedIndex }"
          >
            <img width="50" :src="item.image" :alt="item.title" />
            {{ item.title }}
          </DropDownItem>
        </DropDown>
      </div>
    </Downshift>
  </SearchStyles>
</template>

<script>
import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'
import Downshift from './Downshift'

export default {
  components: {
    DropDown,
    DropDownItem,
    SearchStyles,
    Downshift,
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
    onSelection(item) {
      this.$router.push(`/item/${item.id}`)
    },
  },
}
</script>
