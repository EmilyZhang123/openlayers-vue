import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter);

export default new VueRouter({
  routes:[
    { path: '/', redirect: { name: 'home' } },
    { path: '/home',name: 'home',component: ()=>import('./components/Home') },
    { path: '/overlay',name: 'overlayLearn',component: ()=>import('./components/OverlayLearn') },
    { path: '/control',name: 'controlMap',component: ()=>import('./components/ControlMap') },
    { path: '/graticule',name: 'graticule',component: ()=>import('./components/Graticule') },
    { path: '/advancedPositioning',name: 'advancedPositioning',component: ()=>import('./components/AdvancedPositioning') },
    { path: '/viewAnimate',name: 'viewAnimate',component: ()=>import('./components/ViewAnimate') },
    { path: '/heatMap',name: 'heatMap',component: ()=>import('./components/HeatMap') },
  ]
})
