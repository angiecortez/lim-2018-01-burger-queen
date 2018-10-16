import db from '@/main'
import * as faker from 'faker'

const initialState = () => ({
  products: [],
  last: 10000,
  limit: 2,
  finish: false //si ya no tenemos mas productos
})
export default {
  state: initialState(),
  actions: {
    fetchAllProductsPaginate ({commit, state}) {
      if (! state.finish) {
        db.collection('products').limit(state.limit)
        .where('createdAt', '>', state.last).orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          commit('setProducts', snapshot)
        })
      }
    }
  },
  mutations: {
    setProducts: (state, productsSnap) => {
      if (!productsSnap.empty) {
        productsSnap.forEach(productData => {
          const product = productData.data()
          const newProduct = {
            id: product.id,
            name: product.name,
            url: product.url,
            price: product.price,
            flex: 6,
            createdAt: product.createdAt
          }
        })
      } else {
        state.finish = true
      }
    },
    resetProductsPagination (state) {

    },
    updateLimitProductsPaginate (state, limit) {

    }
  },
  getters: {

  }
}
