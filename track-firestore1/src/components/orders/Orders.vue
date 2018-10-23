<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orders"
      class="elevation-1"
      :loading="loading"
      :no-data-text="$t('orders.empty')"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.totalProducts }}</td>
        <td class="text-xs-right">{{ props.item.totalCost }}</td>
        <td class="text-xs-right">{{ props.item.createAt }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-2" @click="orderDetail(props.item)">
            <v-icon color="pink">call_made</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import db from '@/main'
export default {
  name: 'Orders',
  data () {
    return {
      headers: [
        {text: 'ID', value: 'id', align: 'center'},
        {text: this.$t('orders.products_qty'), value: 'totalProducts', align: 'center'},
        {text: this.$t('orders.cost'), value: 'totalCost', align: 'center'},
        {text: this.$t('orders.date'), value: 'createAt', align: 'center'},
        {text: '', value: 'name', sortable: false},
      ],
      loading: true,
      orders: []
    }
  },
  mounted () {
    this.loading = true
    setTimeout(() => {
      db.collection('orders').where('customer_id', '==', this.$store.state.authModule.user.uid)
      .onSnapshot(orderSnapshop => {
        if (!orderSnapshop.empty) {
          this.orders = []
          orderSnapshop.forEach(order => {
            const orderDoc = order.data()
            this.orders.push({
              id: order.id,
              products: orderDoc.products,
              totalProducts: orderDoc.products.length,
              totalCost: orderDoc.totalCost,
              createAt: orderDoc.createAt
            })
          })
        }
        this.loading = false
      })
    }, 1000);
  },
  methods: {
    orderDetail (order) {
      this.$router.push({name: 'OrderDetail', params: {id: order.id}})
    }
  }
}
</script>
