<template>
  <div class="text-xs-center">
    <v-bottom-sheet persistent v-model="sheet">
      <v-list>
        <v-subheader>{{$t('admin.productsTable.name')}} : {{product.price}}</v-subheader>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-avatar
              size="60"
              tile
            >
              <img :src="product.url" alt="product.name">
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{product.name}}</v-list-tile-title>
          <v-spacer/>

          <v-list-tile-action>
            <v-btn icon @click="updateCart({type:'decrement', product})">
              <v-icon>remove</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            {{qtyProductInCart}}
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn icon @click="updateCart({type:'increment', product})">
              <v-icon>add</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action @click="$emit('closeSheet')">
            <v-btn color="error">{{$t('common.close')}}</v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'ProductSheet',
  props: {
    product: {
      type: Object,
      required: true
    },
    sheet: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.setActive(this.product)
  },
  methods: {
    ...mapActions(['updateCart']),
    ...mapMutations({
      setActive: 'setActiveProductInCart'
    })
  },
  computed: {
    ...mapGetters(['qtyProductInCart'])
  }
}
</script>
