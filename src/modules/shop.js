import db from '@/main'
import * as faker from 'faker'

const initialState = () => ({
  products: [],
  last: 10000,
  limit: 4,
  finish: false //si ya no tenemos mas productos
})
export default {
  state: initialState(),
  actions: {
    fetchAllProductsPaginate ({commit, state}) {
      if (! state.finish) {
        db.collection('products').limit(state.limit)
        .where('createdAt', '>', state.last).orderBy('createdAt', 'asc')
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
            createdAt: product.createdAt,
            selectOption: product.selectOption
          }
          if (!state.products.filter(e => e.id === newProduct.id).length>0) {
            state.products.push(newProduct)
          }
        })
        state.finish = false
        state.last = state.products.slice(-1)[0].createdAt ///cogemos el ultimo producto
      } else {
        state.finish = true
      }
    },
    resetProductsPagination (state) {
      const initial = initialState()
      Object.keys(initial).forEach(key => {state[key] = initial[key]})
    },
    updateLimitProductsPaginate (state, limit) {
      state.limit = limit
    }
  }
}
