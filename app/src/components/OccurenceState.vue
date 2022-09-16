<template>
    <div v-html="icon"></div>
</template>
  
<script>
export default {
    name: 'OccurenceState',
    props: {
        state: String
    },
    computed: {
      icon() {
          switch(this.state) {
            default:
                return
              case 'limited':
                  return '&#9888;'
              case 'soldout':
                  return '&#10006;'
              case 'normal':
                  return '&check;'
              case 'new':
                  return '&starf;'
          }
      },
      label() {
          switch(this.state) {
              default:
                return
              case 'limited':
                  return 'Limited Stock'
              case 'soldout':
                  return 'Sold Out'
              case 'normal':
                  return 'In Stock'
              case 'new':
                  return 'New'
          }
      }
    },
  }
  </script>
  