import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProgrammaView from "@/views/ProgrammaView.vue";
import RanglijstView from "@/views/RanglijstView.vue";
import PouleView from "@/views/PouleView.vue";
import UitslagenView from "@/views/UitslagenView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ranglijst',
      name: 'ranglijst',
      component: RanglijstView
    },
    {
      path: '/programma',
      name: 'programma',
      component: ProgrammaView
    },
    {
      path: '/poules',
      name: 'poules',
      component: PouleView
    },
    {
      path: '/uitslagen',
      name: 'uitslagen',
      component: UitslagenView
    },
    { path: "/:pathMatch(.*)*", redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
