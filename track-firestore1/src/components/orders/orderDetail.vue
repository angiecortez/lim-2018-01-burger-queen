<template>
  <v-jumbotron color="blue-grey darken-4" dark height="450px">
    <v-container>
      <v-layout align-center>
        <v-flex>
          <!-- <pre>{{$data}}</pre> -->
          <h1 class="display-2">{{$t('orders.id')}} {{order.id}}</h1>
          <h3 class="display-1">{{$t('orders.cost')}} S/{{order.totalCost}}</h3>
          <span class="subheading">{{$t('orders.date')}} {{order.createAt}}</span>
          <v-divider class="my-3"/>

          <h4 class="display-2">{{$t('admin.products')}}</h4>
          <v-divider class="my-3"/>

          <div class="title mb-3" v-for="product in order.products" :key="product">
            {{product.name}} {{product.qty}}
          </div>

          <v-btn color="primary" large class="mx-0" @click="$router.push('/orders')">
            {{$t('orders.return_orders_list')}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import db from '@/main'
export default {
  name: 'OrderDetail',
  data () {
    return {
      order: {}
    }
  },
  mounted () {
    const orderId = this.$route.params.id
    db.doc(`orders/${orderId}`).get().then(snapshot => {
      const orderDoc = snapshot.data()
      this.order = {
        id: snapshot.id,
        products: orderDoc.products,
        totalProducts: orderDoc.products.length,
        totalCost: orderDoc.totalCost,
        createAt: orderDoc.createAt
      }
    })
  }
}
</script>
