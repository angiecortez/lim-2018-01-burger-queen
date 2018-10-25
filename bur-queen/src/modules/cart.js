/* eslint no-return-assign: "error" */
import db from '@/main'
const initialState = () => ({
  cartId: null,
  cart: [],
  totalProducts: 0,
  selectedProduct: null
})

export default {
  state: initialState(),
  actions: {
    createCartIfNotExists ({commit, state}, user) {
      db.collection('carts').doc(user.uid).onSnapshot(cartSnap => {
        let cart
        if (!cartSnap.exists) {
          cart = {
            products: [], totalProducts: 0
          }
          db.collection('carts').doc(user.uid).set(cart)
        } else {
          cart = cartSnap.data()
        }
        commit('setCart', {cart, cartId: user.uid})
      })
    },
    updateCart ({commit, state}, data) {
      let cart = db.collection('carts').doc(state.cartId)
      const product = data.product
      cart.get().then(doc => {
        let cartData = doc.data()
        let productsInCart = cartData.products
        const oldProductInCart = findProductByKey(productsInCart, 'id', product.id)
        if (!oldProductInCart) {
          if (data.type === 'increment') {
            productsInCart.push({
              id: product.id,
              name: product.name,
              qty: 1,
              price: product.price
            })
            cartData.totalProducts += 1
          }
        } else {
          if (data.type === 'increment') {
            oldProductInCart.qty += 1
            cart.totalProducts += 1
          } else {
            if (oldProductInCart.qty === 1) {
              const index = productsInCart.findIndex(obj => obj.id === product.id)
              cartData.products = [
                ...productsInCart.slice(0, index),
                ...productsInCart.slice(index + 1)
              ]
              cartData.totalProducts -= 1
            } else {
              oldProductInCart.qty -= 1
              cartData.totalProducts -= 1
            }
          }
        }
        cart.update(cartData).then(() => {
          commit('updateCart', cartData)
        })
      })
    }
  },
  mutations: {
    setCart (state, data) {
      state.cart = data.cart.products
      state.totalProducts = data.cart.totalProducts
      state.cartId = data.cartId
    },
    updateCart (state, data) {
      state.cart = data.products
      state.totalProducts = data.totalProducts
    },
    setActiveProductInCart (state, product) {
      state.selectedProduct = product
    },
    resetCart (state) {
      const initial = initialState()
      Object.keys(initial).forEach(key => {
        if (key !== 'cardId') {
          state[key] = initial[key]
        }
      })
    }
  },
  getters: {
    qtyProductInCart: (state) => {
      if (!state.selectedProduct) return 0
      const selectedProduct = state.cart.filter(obj => obj.id === state.selectedProduct.id)[0]
      if (selectedProduct) {
        return selectedProduct.qty
      } return 0
    },
    totalCostCart: (state) => {
      let totalCost = 0
      if (state.cart.length) {
        state.cart.map(product => totalCost += parseFloat(product.price) * parseInt(product.qty))
      } return totalCost
    }
  }
}

const findProductByKey = (array, id, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][id] === value) {
      return array[i]
    }
  }
  return null
}
