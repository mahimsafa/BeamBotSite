<!--
// get data from url
// :groupId and :competitionId
// @TODO:
// [x] Find good spot for view full screen and vote buttons
// [x] Fix URL to accept group and competition id respectively
// [x] Console log the id params
// [x] Reset Backend and migrate dev
// [x] Call backend endpoint URL
// [x] console log response
// [x] Add loading animation
// [x] set all data to its right place
// [x] Submission Time ago
// [x] Check image resizing for group image and submissions
// [x] User Login through telegram (Maybe need to host?) [if not then display different page]
// [x] Check data passed through telegram login
// [x] Vote functionality (fetch user votes as well when getting comp data)
// [x] Like button state

// [x] Fix whe comp id is undefined (error page)
// [x] Results instead of submissions
// [x] Hash verification in the backend
// [x] CA copy button
// [x] await check if comp is runnnig before voting or unvoting
// [x] Heart Initial state
// [x] Send medaigroup of 3 photos to tg, First caption is displayed, gpt chat available
// [x] Dont accept votes if comp is over
// [x] Change default mode name (by vote, not admin review)
// [x] Home Page
// [x] Support Page
// [x] Disable BNB button when registering
// [x] Structure for mobile
// [] Check Links
// [] firestore security
// [] Explain how to participate in comp in comp start message
// [] Hosting

// [] Turn to components (clean up)

// [] Sort functionality
// [] lightbox improvement
// [] Polish Footer
// [] Rethink Borders
// [] Report button
// [] Share button
// [] End comp page
// [] Add pagination (Later)
// [] Add error handling
// [] Add error page (e.g. if no competition found)
// [] Add 404 & 500 page
-->

<template>
	<!-- Waiting Data Load -->
	<div v-if="authenticated=='waiting'">
		<div class="mx-64 flex justify-center items-center font-quantify-bold text-4xl py-96 leading-relaxed mobile-width:mx-4 mobile-width:text-2xl mobile-width:py-48 mobile-width:leading-normal">
			Authenticating...
		</div>
	</div>

	<!-- Data Loaded Successfully -->
	<div v-else-if="authenticated == 'authenticated'">
		<!-- Top Row -->
		<div
			v-if="dataLoadState == 'done'"
			class="bg-gradient-to-br from-beam-red via-beam-yellow to-beam-red"
		>
			<div class="flex justify-center py-12 x-sides-margin mobile-width:py-2">
				<!-- <div class="text-xl">
				{{ compData }}
			</div> -->
				<div
					v-if="compData.isRunning"
					class="flex justify-center items-center font-quantify-bold text-4xl pt-2 mobile-width:mx-4 mobile-width:text-xl mobile-width:py-2 mobile-width:pt-6 mobile-width:leading-normal"
				>
					COMPETITION RUNNING!
				</div>
				<div
					v-else
					class="flex justify-center items-center font-quantify-bold text-4xl pt-2 mobile-width:mx-4 mobile-width:text-xl mobile-width:py-2 mobile-width:pt-6 mobile-width:leading-normal"
				>
					COMPETITION OVER!
				</div>
			</div>
		</div>

		<!-- Competition -->
		<div v-if="dataLoadState == 'waiting'">
			<div class="mx-64 flex justify-center items-center font-quantify-bold text-4xl py-96 leading-relaxed">
				Loading Competition Details...
			</div>
		</div>

		<div
			v-else-if="dataLoadState == 'done'"
			class="bg-gradient-to-b from-beam-sky-100 to-sky-100 border-solid border-black border-t-2"
		>
			<div class="x-sides-margin">
				<!-- Group Details -->
				<div class="grid grid-cols-2 gap-10 py-12 rounded-xl h-min mobile-width:flex mobile-width:flex-col mobile-width:py-4 mobile-width:gap-4">
					<GroupDetailsCard
						class="bg-gradient-to-br from-beam-dark-blue from-10% to-beam-light-blue to-40%"
						:group-data="groupData"
					/>

					<CompDetailsCard
						class="bg-gradient-to-tl from-beam-dark-blue from-10% to-beam-light-blue to-40%"
						:comp-data="compData"
					/>
				</div>
			</div>

			<!-- Display Section -->
			<div>
				<div class="x-sides-margin py-8 pb-16 mobile-width:pb-8">
					<!-- Submission Section -->
					<SubmissionSection
						v-if="compData.isRunning == true"
						:id="userId()"
						:comp-data="compData"
					/>

					<ResultSection
						v-else
						:comp-data="compData"
					/>
				</div>
			</div>
		</div>

		<!-- Error loading data -->
		<div v-else-if="dataLoadState== 'error'">
			<div class="mx-64 flex justify-center items-center font-quantify-bold text-4xl py-96 leading-relaxed mobile-width:mx-4 mobile-width:text-2xl mobile-width:py-48 mobile-width:leading-normal">
				There was an error loading the contest details. Please make sure you have the correct URL by using the link from the Telegram group.
			</div>
		</div>
	</div>

	<div v-else-if="authenticated == 'unauthenticated'">
		<div class="mx-64 flex justify-center items-center font-quantify-bold text-4xl py-96 leading-relaxed mobile-width:mx-4 mobile-width:text-2xl mobile-width:py-48 mobile-width:leading-normal">
			Please login via the portal from the Telegram group to view this page
		</div>
	</div>

	<div v-else-if="authenticated == 'missing-data'">
		<div class="mx-64 flex justify-center items-center font-quantify-bold text-4xl py-96 leading-relaxe mobile-width:mx-4 mobile-width:text-2xl mobile-width:py-48 mobile-width:leading-normal">
			<p>
				Please make sure you set your Telegram <u>username</u> and <u>first name</u> to see this page and reopen the link from the Telegram group
			</p>
		</div>
	</div>

	<div v-else-if="authenticated == 'networkErr'">
		<div class="mx-64 flex justify-center items-center font-quantify-bold text-4xl py-96 leading-relaxed mobile-width:mx-4 mobile-width:text-2xl mobile-width:py-48 mobile-width:leading-normal">
			<p>
				Beam is having trouble connecting to its servers. Please try again later.
			</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import CompDetailsCard from '@/components/compPage/CompDetailsCard.vue'
import GroupDetailsCard from '@/components/compPage/GroupDetailsCard.vue'
import SubmissionSection from '@/components/compPage/SubmissionSection.vue'
import ResultSection from '@/components/compEndPage/ResultSection.vue'

export default {
	name: 'CompetitionView',
	components: {
		CompDetailsCard,
		GroupDetailsCard,
		SubmissionSection,
		ResultSection
	},
	data () {
		return {
			authenticated: 'waiting',
			groupId: this.$route.params.groupId,
			competitionId: this.$route.params.competitionId,
			compData: {
				loading: true,
				submissions: []
			},
			groupData: {},
			dataLoadState: 'waiting'
		}
	},
	computed: {
		...mapState(['username', 'photoURL'])
	},
	async mounted () {
		// Comp Details
		await axios.get(`${process.env.VUE_APP_API_HOST}/competition/${this.competitionId}/group/${this.groupId}`)
			.then((res) => {
				this.compData = res.data
				this.groupData = res.data.group
			})
			.catch((err) => {
				this.compData = err
			})
	},
	async created () {
		try {
			const lsUserId = this.userId()
			const urlParams = new URLSearchParams(window.location.search)

			const _tgUser = localStorage.getItem('tg_user')

			const authData = {}
			for (const [key, value] of urlParams.entries()) {
				authData[key] = value
			}

			// Remove the auth data from the url, dont remove the path just the query params
			window.history.replaceState({}, document.title, window.location.pathname)

			// Refresh
			if (Object.keys(authData).length === 0) {
				if (_tgUser === 'networkErr') {
					this.authenticated = 'networkErr'
				} else if (_tgUser === 'undefined' || _tgUser === null) {
					this.authenticated = 'unauthenticated'
				} else if (!_tgUser.includes('username') || !_tgUser.includes('first_name') || !_tgUser.includes('id')) {
					// User missing data
					this.authenticated = 'missing-data'
				} else {
					this.authenticated = 'authenticated'

					this.updateUserData() // Update user data
					await this.loadData() // Load your competition data
				}
				return
			}

			// if authData in localstorage and not undefined then skip
			if (_tgUser === 'undefined' || _tgUser === null) {
				if (authData.id === undefined || authData.first_name === undefined || authData.username === undefined) {
					// When authdata is missing
					this.saveTelegramUserData(authData)
					this.authenticated = 'missing-data'
				} else {
					await this.checkTelegramAuthorization(authData) // Check if the user is authorized
				}
			} else {
				if (authData.id === undefined || authData.first_name === undefined || authData.username === undefined) {
				// When authdata is missing
					this.saveTelegramUserData(authData)
					this.$store.commit('setUsername', this.lsUsername())
					this.authenticated = 'missing-data'
				} else if (lsUserId !== authData.id) {
					// When user logs in with a different account
					await this.checkTelegramAuthorization(authData) // Check if the user is authorized
				} else if (lsUserId === authData.id) {
					// console.log('User already logged in')
					this.authenticated = 'authenticated'
				}
			}

			// Continue with loading data or other initialization
			if (this.authenticated === 'authenticated') {
				this.updateUserData() // Update user data
				await this.loadData() // Load your competition data
			}
		} catch (error) {
			// console.error(error.message)
		}
	},
	methods: {
		userId () {
			// tg_user is a string, get id from it. split by "id":" and split at the next "
			const _tgUser = localStorage.getItem('tg_user')

			try {
				const id = _tgUser.split('"id":"')[1].split('"')[0]
				return id
			} catch (error) {
				return undefined
			}
		},
		async checkTelegramAuthorization (authData) {
			await axios.post(`${process.env.VUE_APP_API_HOST}/verify-tg/verify-user`, authData)
				.then((res) => {
					// Save user data
					this.saveTelegramUserData(res.data)

					// console.log('User Authenticated')
					this.authenticated = 'authenticated'
					return res.data
				})
				.catch((err) => {
					if (err.message === 'Network Error') {
						this.authenticated = 'networkErr'
						localStorage.setItem('tg_user', 'networkErr')
					} else {
						this.authenticated = 'unauthenticated'
					}
					// console.error(err)
				})
		},

		async loadData () {
			// Load your competition and group data here
			try {
				const response = await axios.get(
					`${process.env.VUE_APP_API_HOST}/competition/${this.competitionId}/group/${this.groupId}`
				)
				this.compData = response.data
				this.groupData = response.data.group
				this.dataLoadState = 'done'
			} catch (error) {
				// console.error(error)
				this.dataLoadState = 'error'
			}
		},

		saveTelegramUserData (authData) {
			const authDataJson = JSON.stringify(authData)
			localStorage.setItem('tg_user', authDataJson)
		},

		updateUserData () {
			// Update user data
			this.$store.commit('setUsername', this.lsUsername())
			this.$store.commit('setPhotoURL', this.lsPhotoURL())
		},

		lsUsername () {
			const _tgUser = localStorage.getItem('tg_user')

			if (_tgUser) {
				try {
					// deal with localStorage.getItem('tg_user') as an object
					const username = _tgUser.split('"username":"')[1].split('"')[0]
					return username
				} catch (error) {
					return ''
				}
			} else {
				return ''
			}
		},

		lsPhotoURL () {
			const _tgUser = localStorage.getItem('tg_user')

			if (_tgUser) {
				try {
					// deal with localStorage.getItem('tg_user') as an object
					const photoURL = _tgUser.split('"photo_url":"')[1].split('"')[0]
					return photoURL
				} catch (error) {
					return ''
				}
			} else {
				return ''
			}
		}

	}
}

</script>

<style>
.aspect-square {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.aspect-content {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
}
</style>
