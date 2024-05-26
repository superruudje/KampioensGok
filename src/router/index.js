import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProgrammaView from "@/views/ProgrammaView.vue";
import RanglijstView from "@/views/RanglijstView.vue";
import PouleView from "@/views/PouleView.vue";

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
    { path: "/:pathMatch(.*)*", redirect: '/' }
  ]
})

export default router
