import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/popular',
    name: 'Popular',
    component: () => import('@/views/PopularFilms.vue')
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('@/views/Movie.vue'),
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const origPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (to) {
  const match = this.matcher.match(to);
  if (match.fullPath !== this.currentRoute.fullPath) {
    origPush.call(this, to);
  }
}

export default router
