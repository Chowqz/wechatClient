import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SubView from '@/components/subView'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		component: Home,
		children: [{
			path: 'subroute',
			component: SubView,
			label: 'first level menu',
			children: [{
				path: 'route01',
				component: resolve => require(['@/components/pages/page'], resolve),
				label: 'menu 01'
			}, {
				path: 'route02',
				component: resolve => require(['@/components/pages/page'], resolve),
				label: 'menu 02'
			}, {
				path: 'route03',
				component: resolve => require(['@/components/pages/page'], resolve),
				label: 'menu 03'
			}]
		}]
	},{
		path: '*',
		component: NotFound,
		label: '404 NotFound'
	}]
})
