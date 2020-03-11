import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import foodMenu from '../components/foodMenu.vue'
import drinkMenu from '../components/drinkMenu.vue'
import Welcome from '../components/Welcome.vue'
import Login from '../components/Login.vue'
import Pay from '../components/Pay.vue'
import Thank from '../components/Thank.vue'
import User from '../components/User.vue'
import modifyPsw from '../components/modifyPsw'
import manageMenu from '../components/manageMenu'
import orderMenu from '../components/orderMenu'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      redirect: '/Home/foodMenu',
      component: Home,
      children: [
        {
          path: 'foodMenu',
          name: 'foodMenu',
          component: foodMenu
        },
        {
          path:'Login',
          name:'Login',
          component:Login
        },
        {
          path:'drinkMenu',
          name:'drinkMenu',
          component:drinkMenu
        },
        {
          path:'Pay',
          name:'Pay',
          component:Pay
        },
        {
          path:'Thank',
          name:'Thank',
          component:Thank
        }
      ]
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path:'/User',
      name:'User',
      component:User,
      children:[
        {
          path:'modifyPsw',
          name:'modifyPsw',
          component:modifyPsw
        },
        {
          path:'manageMenu',
          name:'manageMenu',
          component:manageMenu
        },
        {
          path:'orderMenu',
          name:'orderMenu',
          component:orderMenu
        }
      ]
    }
  ]
})
