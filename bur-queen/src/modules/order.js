import db from '@/main'
import * as faker from 'faker'
import * as moment from 'moment'

export default {
  actions: {
    processOrder ({commit, rootState}, data) {
      const orderId = faker.random.alphaNumeric(16)
      db.collection('orders').doc(orderId).set({
        products: data.products,
        totalCost: data.totalCost,
        customer_id: rootState.authModule.user.uid,
        createAt: moment(new Date()).format('DD/MM/YYYY')
      }).then(() => {
        db.collection('carts').doc(rootState.authModule.user.uid).set({
          products: [],
          totalProducts: 0
        }).then(() => {
          commit('resetCart')
          return Promise.resolve(true)
        })
      })
    }
  }
}
