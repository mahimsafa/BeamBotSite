<template>
	<!-- Navbar -->
	<div class="bg-slate-50 border-b-2 border-gray-300 border-solid navbar z-20">
		<nav class="flex flex-row py-3 x-sides-margin mobile-width:py-2 mobile-width:justify-between">
			<NavbarLogo class="basis-1/2 mobile-width:hidden" />
			<div class="basis-1/2 flex justify-around items-center text-xl pt-3 font-quantify-bold mobile-width:hidden">
				<router-link to="/">
					HOME
				</router-link>
				<!-- <router-link to="/">
					GROUPS
				</router-link> -->
				<router-link to="/support">
					SUPPORT
				</router-link>
			</div>
			<div
				class="hidden mobile-width:block"
				@click="toggleMenu"
			>
				<div class="mt-1.5 ml-2">
					<i class="fa-solid fa-bars text-4xl" />
				</div>
			</div>
			<div class="hidden mobile-width:block">
				<div class="flex justify-center ">
					<img
						:src="logoSrc"
						class="w-9"
						alt="BeamBotLabs Logo"
					>
				</div>
			</div>
			<div
				v-if="username"
				class="bg-gradient-to-r from-beam-dark-blue to-beam-light-blue rounded-full font-quantify-bold text-xl mt-3 w-max mobile-width:mt-1"
			>
				<div class="bg-gradient-to-r from-beam-red to-beam-yellow via-beam-orange rounded-full text-2xl font-medium px-3 pr-4 py-1.5 m-1 mobile-width:p-0">
					<div class="flex">
						<img
							class="w-10 h-10 rounded-full border-2 border-white"
							:src="photoURL"
						>
						<div class="mr-6 flex mobile-width:hidden">
							<span class="text-base pl-2 pt-1.5 text-center self-center">
								{{ username }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div
				v-show="showMenu"
				class="mobile-width:block absolute top-0 left-0 w-full bg-slate-50 border-b-2 border-gray-300 border-solid z-30 transition-transform transform-gpu"
				:style="{ 'transform': showMenu ? 'translateY(0%)' : 'translateY(-100%)' }"
			>
				<div class="flex flex-col items-start p-4">
					<div class="flex justify-between w-full items-center mb-2">
						<router-link
							to="/"
							class="text-xl font-quantify-bold"
							@click="toggleMenu"
						>
							HOME
						</router-link>
						<i
							class="fa-solid fa-xmark text-4xl"
							@click="toggleMenu"
						/>
					</div>
					<div class="flex justify-between w-full items-center">
						<router-link
							to="/support"
							class="text-xl font-quantify-bold"
							@click="toggleMenu"
						>
							SUPPORT
						</router-link>
					</div>
				</div>
			</div>
		</nav>
	</div>

	<!-- Body Maine Viewer -->
	<div class="bg-gray-100">
		<!-- if view is competition then pass the id to the competition view -->
		<router-view />
	</div>

	<!-- Footer -->
	<footer class="bg-gray-600 text-white">
		<div class="x-sides-margin py-16 mobile-width:py-8">
			<div class="flex flex-col items-center">
				<span class="text-2xl w-1/2 pb-4 mobile-width:w-full mobile-width:px-8">
					Got questions? Drop your query in our support group!
				</span>
				<div class="bg-gradient-to-t from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 button-form mobile-width:w-3/5 font-semibold">
					<a href="tg://join?invite=QMN36IN4BKhhZDNk">
						<i class="fa-brands fa-telegram" />
						<span>
							BeamBot Support
						</span>
					</a>
				</div>
			</div>
		</div>
		<!-- Copyright -->
		<div class="bg-gray-800">
			<div class="x-sides-margin">
				<div class="text-center py-1">
					© All rights reserved. BeamBotLabs.
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import NavbarLogo from './components/NavbarLogo.vue'
import placeholder from './assets/imagePlaceholders/botttsNeutral.svg'
import logo from '@/assets/logo/BeamBotLabs - Logo.svg'

export default {
	name: 'App',
	components: {
		NavbarLogo
	},
	data () {
		return {
			showMenu: false,
			logoSrc: logo
		}
	},
	computed: {
		username () {
			const storeUsername = this.$store.state.username

			if (storeUsername === '') {
				const _tgUser = localStorage.getItem('tg_user')

				if (_tgUser) {
					try {
					// deal with localStorage.getItem('tg_user') as an object
						const lsUsername = _tgUser.split('"username":"')[1].split('"')[0]
						this.$store.commit('setUsername', lsUsername)

						return lsUsername
					} catch (error) {
						return ''
					}
				} else {
					return ''
				}
			} else {
				return storeUsername
			}
		},
		photoURL () {
			const storePhotoURL = this.$store.state.photoURL

			if (storePhotoURL === '') {
				const _tgUser = localStorage.getItem('tg_user')

				if (_tgUser) {
					try {
					// deal with localStorage.getItem('tg_user') as an object
						const lsPhotoURL = _tgUser.split('"photo_url":"')[1].split('"')[0]
						this.$store.commit('setPhotoURL', lsPhotoURL)

						return lsPhotoURL
					} catch (error) {
						return placeholder
					}
				} else {
					return placeholder
				}
			} else {
				return storePhotoURL
			}
		}
	},
	methods: {
		toggleMenu () {
			// console.log('toggleMenu')
			this.showMenu = !this.showMenu
		}
	}
}
</script>

<style>
#app {
  font-family: Goldplay-Medium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.x-sides-margin {
	margin-left: 8rem;
	margin-right: 8rem;
}

.navbar {
	background-color: #333;
	position: sticky;
	position: -webkit-sticky; /* For Safari */
	top: 0;
	width: 100%;
	/* add transition for smooth slide down */
	transition: top 0.3s;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #3aae68;
}

nav a:hover {
	transition: all;
	transition-duration: 300ms;
	color: rgb(40, 184, 50);
	/* translate: 2px 3px; */
}

nav a:active{
	color: #3aae68
}

/* Define the fade-in animation */
@keyframes fadeInBottom {
    from {
        opacity: 0;
        transform: translateY(-10px); /* Adjust the distance from which it fades in */
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Apply the animation to the element */
.fade-in-bottom {
    animation: fadeInBottom 1.5s ease;
}

.button-form {
	border-radius: 9999px;
	font-size: 1.5rem;
	line-height: 2rem;
	padding-left: 1rem;
	padding-right: 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
}

@screen mobile-width {
  .x-sides-margin {
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }

	.button-form {
		font-size: 1.25rem;
		line-height: 1.75rem;
		margin-left: 0rem;
		margin-right: 0rem;
		margin-top: 0.5rem;
		padding-right: 0.5rem;
		padding-left: 0.5rem;
	}
}
</style>
