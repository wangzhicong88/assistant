import Vue from 'vue'
import Router from 'vue-router'
import evaluateList from '@/components/evaluateList'
import evaluateShow from '@/components/evaluateShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'evaluateList',
      component: evaluateList
    },
    {
      path: '/evaluateShow',
      name:'evaluateShow',
      component: evaluateShow
    }
  ]
})
