import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import foodMenu from '../components/foodMenu.vue'
import Welcome from '../components/Welcome.vue'
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
        }
      ]
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }
  ]
})
