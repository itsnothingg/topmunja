import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './components/SignIn.vue'
import Console from './components/Console.vue'
import Contact from './components/Contact.vue'
import User from './components/User.vue'
import Flyer from './components/Flyer.vue'
import Notice from './components/Notice.vue'
import Message from './components/Message.vue'
import Messages from './components/Messages.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) 
          next({
            path: '/console/contact'
          })
        else 
          next()
      }
    },
    {
      path: '/logout',
      component: {
        render () { 
          localStorage.removeItem('token')
          this.$router.replace(`/`)
        }
      },
    },
    {
      path: '/console',
      component: Console,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) 
          next({
            path: '/'
          })
        else 
          next()
      },
      children: [
        {
          path: 'contact',
          component: Contact
        },
        {
          path: 'user',
          component: User
        },
        {
          path: 'flyer/:type',
          component: Flyer
        },
        {
          path: 'notice',
          component: Notice
        },
        {
          path: 'message',
          component: Message
        },
        {
          path: 'messages',
          component: Messages
        }
      ]
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
