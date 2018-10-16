<template>
  <div>
    <AdminProductsDialog/>
    <v-data-table :headers="headers" :items="products"
    :loading="loading" class="elevation-1" :no-data-text="$t('admin.productsTable.empty')">

    <template slot="items" slot-scope="props">

      <td class="text-xs-right">{{props.item.id}}</td>
      <td class="text-xs-right">{{props.item.name}}</td>
      <td class="text-xs-right">{{props.item.price}}</td>

      <td class="justify-center layout px-0">
        <v-btn icon class="mx-0" @click="editProduct(props.item)">
          <v-icon color="teal">edit</v-icon>
        </v-btn>
        <v-btn icon class="mx-0" @click="removeProduct(props.item)">
          <v-icon color="pink">delete</v-icon>
        </v-btn>
      </td>
    </template>
    </v-data-table>
  </div>
</template>
<script>
import AdminProductsDialog from '@/components/administration/AdminProductsDialog'
import db from '@/main'
export default {
  name: 'AdminProducts',
  data () {
    return {
      headers: [
        {text: this.$t('admin.productsTable.id'), value: 'id', align: 'center'},
        {text: this.$t('admin.productsTable.name'), value: 'name', align: 'center'},
        {text: this.$t('admin.productsTable.price'), value: 'price', align: 'center'},
        {text: this.$t('common.actions'), value: 'name', sortable: false}
      ],
      products: [],
      loading: true
    }
  },
  mounted () {
    this.loading = true
    db.collection('products').orderBy('createdAt').onSnapshot(snapshot => {
      this.products = []
      snapshot.forEach(snapProduct => {
        const product = snapProduct.data()
        this.products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          url: product.url || '',
          file_id: product.file_id || '',
        })
      })
      this.loading = false
    })
  },
  components: {
    AdminProductsDialog
  },
  methods: {
    editProduct (product) {
      this.$store.commit('toggleProductsDialog', {editMode: true, product})
    },
    removeProduct (product) {
      db.collection('products').doc(product.id).delete().then(() => {
        if (product.url) {
          this.$store.dispatch('removeFile', product)
        }
        this.$store.commit('setAlertMessage', {
          show: true,
          type: 'success',
          message: this.$t('messages.deleted', {item: this.$t('common.user')}),
          timeout: 5000
        })

      })
    }
  }
}
</script>
