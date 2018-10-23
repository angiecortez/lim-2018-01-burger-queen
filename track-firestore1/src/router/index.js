import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Cart from '@/components/Cart'
import AdminHome from '@/components/administration/AdminHome'
import AdminUsers from '@/components/administration/AdminUsers'
import AdminProducts from '@/components/administration/AdminProducts'
import Products from '@/components/shop/Products'
import Orders from '@/components/orders/Orders'
import OrderDetail from '@/components/orders/OrderDetail'
import store from '@/store'

Vue.use(Router)
const beforeEnter = (to, from, next) => {
  if (store.state.authModule.logged) {
    next ({path: '/'})
  } else {
    next()
  }
}
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        Auth: false,
        title: 'Inicio'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        Auth: false,
        title: 'Registro'
      },
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        Auth: false,
        title: 'Inicio de Sesión'
      },
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHome,
      meta: {
        Auth: true,
        title: 'Administración',
        role: 'admin'
      },
      children: [
        {
          path: 'users',
          component: AdminUsers,
          meta: {
            title: 'Administrar Usuarios'
          }
        },
        {
          path: 'products',
          component: AdminProducts,
          meta: {
            title: 'Administrar Productos'
          }
        }
      ]
    },
    {
      path: '/shop',
      name: 'Tienda',
      component: Products,
      meta: {
        Auth: true,
        title: 'Tienda'
      }
    },
    {
      path: '/cart',
      name: 'Carrito',
      component: Cart,
      meta: {
        Auth: true,
        title: 'Carrito'
      }
    },
    {
      path: '/orders',
      name: 'Pedidos',
      component: Orders,
      meta: {
        Auth: true,
        title: 'Pedidos'
      }
    },
    {
      path: '/orders/:id',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        Auth: true,
        title: 'Detalles de pedido'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if(to.meta.Auth && !store.state.authModule.logged && store.state.loaded){
    next({path: '/login'})
  } else {
    if(to.meta.role) {
      if(store.state.loaded && (to.meta.role !== store.state.authModule.role)) {
        next({path: '/'})
        return
      }
    }
    next()
  }
})
export default router
