<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      hide-actions
      class="elevation-1"
      :total-items="totalProducts"
      :loading="loading"
      :no-data-text="$t('admin.productsTable.empty')"
    >
    <!-- <h1></h1> -->
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.qty }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-2" @click="updateProduct('decrement', props.item)">
            <v-icon color="pink">remove</v-icon>
          </v-btn>
          <v-btn icon class="mx-2" @click="updateProduct('increment', props.item)">
            <v-icon color="teal">add</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="footer" v-if="!loading">
        <td colspan="100%" class="text-xs-right">
          <strong>{{$t('shop.total_cost')}}</strong> 
          S/{{this.$store.getters.totalCostCart}}
          <v-btn :disabled="!products.length" color="primary" @click="processCart">{{$t('shop.process_order')}}</v-btn>
        </td>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      headers: [
        {text: this.$t('admin.productsTable.id'), value: 'id', align: 'center', display: false},
        {text: this.$t('admin.productsTable.name'), value: 'name', align: 'center'},
        {text: this.$t('admin.productsTable.price'), value: 'price', align: 'center'},
        {text: this.$t('admin.productsTable.qty'), value: 'qty', align: 'center'},
        {text: '', value: 'name', sortable: false}
      ],
      totalProducts: 0,
      products: [],
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.products = this.$store.state.cartModule.cart
      this.loading = false
    }, 2000)
  },
  methods: {
    ...mapActions(['updateCart', 'processOrder']),
    updateProduct (type, product) {
      this.loading = true
      this.updateCart({type, product})
      setTimeout(() => {
        this.products = this.$store.state.cartModule.cart
        this.loading = false
      }, 1000)
    },
    processCart () {
      this.loading = true
      this.processOrder({
        products: this.products,
        cartId: this.cartId,
        totalCost: this.$store.getters.totalCostCart
      }).then(() => {
        this.$store.commit('setAlertMessage', {
          show: true,
          type: 'success',
          message: this.$t('messages.order_processed'),
          timeout: 1000
        })
        this.$router.push('/orders')
      })
    }
  },
  computed: {
    cartId () {
      return this.$store.state.cartModule.cartId
    }
  }
}
</script>
