import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import registration from '@/components/Registration'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/registration/:step',
      name: 'registration',
      component: registration
    }

  ]
})
