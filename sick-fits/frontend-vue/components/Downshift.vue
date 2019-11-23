<script>
/**
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them sets
 * `event.preventDownshiftDefault = true`.
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */
function callAllEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      if (fn) {
        fn(event, ...args)
      }
      return false
    })
}

let idCounter = 0
function generateId() {
  return String(idCounter++)
}

let items = []

/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @returns {number} The new index after the move.
 */
function getNextWrappingIndex(moveAmount, baseIndex, itemCount) {
  const itemsLastIndex = itemCount - 1

  if (
    typeof baseIndex !== 'number' ||
    baseIndex < 0 ||
    baseIndex >= itemCount
  ) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1
  }
  let newIndex = baseIndex + moveAmount
  if (newIndex < 0) {
    newIndex = itemsLastIndex
  } else if (newIndex > itemsLastIndex) {
    newIndex = 0
  }
  return newIndex
}

export default {
  props: {
    onChange: {
      type: Function,
      default: e => {},
    },
    itemToString: {
      type: Function,
      default: item => item,
    },
    defaultHighlightedIndex: {
      type: Number,
      default: 0,
    },
    defaultIsOpen: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Function,
      default: generateId,
    },
    getItemId: {
      type: Function,
      default: () => undefined,
    },
  },
  data() {
    return {
      isOpen: false,
      highlightedIndex: undefined,
      inputValue: undefined,
    }
  },
  methods: {
    getInputProps(props) {
      return {
        autoComplete: 'off',
        value: this.inputValue,
        id: this.inputId,
        ...props,
      }
    },
    getInputListeners(listeners) {
      return {
        keydown: callAllEventHandlers(this.onKeyDown, listeners.keydown),
        input: callAllEventHandlers(this.onInput, listeners.input),
        blur: callAllEventHandlers(this.onBlur, listeners.blur),
      }
    },
    getItemProps({ index, item, ...rest }) {
      if (index === undefined) {
        items.push(item)
        index = items.indexOf(item)
      } else {
        items[index] = item
      }
      return {
        id: this.getItemIdAtIndex(index),
        role: 'option',
        'aria-selected': this.highlightedIndex === index,
        index,
        item,
        ...rest,
      }
    },
    getItemCount() {
      return items.length
    },

    getItemIdAtIndex(index) {
      return this.getItemId(index) || `${this.id()}-item-${index}`
    },

    moveHighlightedIndex(amount) {
      const itemCount = this.getItemCount()
      if (itemCount > 0) {
        const nextHighlightedIndex = getNextWrappingIndex(
          amount,
          this.highlightedIndex,
          itemCount
        )
        this.highlightedIndex = nextHighlightedIndex
      }
    },

    // event handlers
    onKeyDown(e) {
      if (e.key === 'ArrowUp') return this.onArrowUp(e)
      if (e.key === 'ArrowDown') return this.onArrowDown(e)
      if (e.key === 'Escape') return this.onEscape(e)
      if (e.key === 'Enter') return this.onEnter(e)
    },
    onInput(e) {
      this.isOpen = true
      this.inputValue = e.target.value
      this.highlightedIndex = this.defaultHighlightedIndex
    },
    onBlur(e) {
      this.$nextTick(() => {
        this.isOpen = false
        this.highlightedIndex = this.defaultHighlightedIndex
      })
    },
    onArrowUp(e) {
      e.preventDefault()
      if (this.isOpen) {
        const amount = e.shiftKey ? -5 : -1
        this.moveHighlightedIndex(amount)
      } else {
        this.isOpen = true
        this.highlightedIndex = getNextWrappingIndex(
          -1,
          this.highlightedIndex,
          this.getItemCount()
        )
      }
    },
    onArrowDown(e) {
      e.preventDefault()
      if (this.isOpen) {
        const amount = e.shiftKey ? 5 : 1
        this.moveHighlightedIndex(amount)
      } else {
        this.isOpen = true
        this.highlightedIndex = getNextWrappingIndex(
          1,
          this.highlightedIndex,
          this.getItemCount()
        )
      }
    },
    onEscape(e) {
      e.preventDefault()
      this.isOpen = false
      this.inputValue = ''
      this.selectedItem = false
    },
    onEnter(e) {
      if (this.isOpen && this.highlightedIndex !== null) {
        e.preventDefault()
        const item = items[this.highlightedIndex]
        this.selectedItem = item
        this.inputValue = this.itemToString(item)
        this.highlightedIndex = this.defaultHighlightedIndex
        this.isOpen = this.defaultIsOpen
      }
      this.$emit('input', this.selectedItem)
    },
  },
  render() {
    items = []
    return this.$scopedSlots.default({
      isOpen: this.isOpen,
      getInputProps: this.getInputProps,
      getInputListeners: this.getInputListeners,
      getItemProps: this.getItemProps,
      highlightedIndex: this.highlightedIndex,
      inputValue: this.inputValue,
      items,
    })
  },
}
</script>
