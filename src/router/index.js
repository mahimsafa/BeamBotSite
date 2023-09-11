import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/HomeView.vue')
	},
	{
		// Path to group competition page /:groupId/competition/:competitionId
		path: '/group/:groupId/competition/:competitionId',
		name: 'competition',
		component: () => import('../views/CompetitionView.vue')
	},
	{
		path: '/support',
		name: 'support',
		component: () => import('../views/SupportView.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		redirect: '/'
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
