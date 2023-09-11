<template>
	<div class="grid grid-rows-2 p-10 rounded-xl mobile-width:p-4">
		<div class="flex flex-col items-start">
			<div class="text-4xl font-quantify-bold pt-2 mobile-width:text-2xl mobile-width:mt-2">
				DETAILS
			</div>

			<div class="border-2 border-black rounded-xl w-full mb-2" />

			<div class="w-full pt-4 flex flex-col items-start space-y-8 text-2xl mobile-width:text-lg mobile-width:space-y-4 mobile-width:pt-2">
				<div>
					<i class="fa-solid fa-gear pr-2" />
					<span>
						<b>{{ compData.mode }} Mode</b>
					</span>
				</div>

				<div>
					<i class="fa-regular fa-calendar" />
					<span class="pl-2">
						<b>Started</b> {{ startDate }}
					</span>
				</div>

				<div v-if="compData.isRunning">
					<i class="fa-regular fa-hourglass fa-fade" />
					<span class="pl-2 pr-1">
						<b>Time Left:</b>
					</span>
					<span>{{ formattedTimeLeft }}</span>
				</div>

				<div
					v-else
				>
					<div>
						<i class="fa-regular fa-hourglass" />
						<span class="pl-2"><b>Duration:</b> {{ compData.durationHrs }} hrs</span>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="flex justify-center items-center">
			<div class="bg-sky-500 rounded-3xl text-2xl font-medium px-4 py-2">
				<a :href="telegramPortal">
					<i class="fa-brands fa-telegram" />
					<span>
						BeamBot Support
					</span>
				</a>
			</div>
		</div> -->

		<div class="flex flex-col items-center justify-end mobile-width:">
			<div class="">
				<p class="text-3xl font-quantify-bold mobile-width:text-xl">
					<b>
						PRIZES
					</b>
				</p>
			</div>

			<div class="border-2 border-black rounded-xl w-5/6 mb-2 mobile-width:border-0 mobile-width:border-b-2" />

			<div class="my-2 px-4 flex flex-row mobile-width:flex-col justify-evenly text-2xl font-semibold rounded-xl bg-neutral-50 py-6 border-2 border-black w-5/6 mobile-width:py-4">
				<div class="flex flex-row place-items-center mobile-width:ml-3">
					<i
						class="fa-solid fa-medal fa-2xl mobile-width:text-4xl"
						style="color: #fee103;"
					/>
					<div class="mobile-width:pl-2 fade-in-bottom mobile-width:text-xl">
						<i class="fa-brands fa-ethereum fa-flip" />
						<span class="pl-2">{{ compData.prize1 }} ETH</span>
					</div>
				</div>
				<div class="flex flex-row place-items-center mobile-width:ml-3 mobile-width:mt-2">
					<i
						class="fa-solid fa-medal fa-2xl mobile-width:text-4xl"
						style="color: #c4c4c4;"
					/>
					<div class="mobile-width:pl-2 fade-in-bottom mobile-width:text-xl">
						<i class="fa-brands fa-ethereum fa-flip" />
						<span class="pl-2">{{ compData.prize2 }} ETH</span>
					</div>
				</div>
				<div class="flex flex-row place-items-center mobile-width:ml-3 mobile-width:mt-2">
					<i
						class="fa-solid fa-medal fa-2xl mobile-width:text-4xl"
						style="color: #b76b01;"
					/>
					<div class="mobile-width:pl-2 fade-in-bottom mobile-width:text-xl">
						<i class="fa-brands fa-ethereum fa-flip" />
						<span class="pl-2">{{ compData.prize3 }} ETH</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CompDetailsCard',
	components: {

	},
	props: {
		compData: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			countdownInterval: null,
			timeLeftScs: 0
		}
	},
	computed: {
		telegramPortal () {
			return this.compData.group === undefined ? '' : this.compData.group.tgPortal
		},
		formattedTimeLeft () {
			const timeLeft = this.timeLeftScs

			if (timeLeft <= 0) {
				return '0h 0m 0s'
			}

			const hours = Math.floor(timeLeft / 3600)
			const minutes = Math.floor((timeLeft % 3600) / 60)
			const seconds = timeLeft % 60

			return `${hours}h ${minutes}m ${seconds}s`
		},
		startDate () {
			return this.compData.startTime === undefined ? '' : new Date(this.compData.startTime).toDateString()
		}
	},
	watch: {
		compData: {
			immediate: true,
			deep: true,
			handler (newCompData) {
				// Ensure that compData and compData.timeLeft are available
				if (newCompData && newCompData.timeLeft > 0) {
					this.timeLeftScs = newCompData.timeLeft

					this.countdownInterval = setInterval(() => {
						this.timeLeftScs--
						if (this.timeLeftScs <= 0) {
							clearInterval(this.countdownInterval)
						}
					}, 1000)
				}
			}
		}
	},
	beforeUnmount () {
		clearInterval(this.countdownInterval)
	},
	methods: {
	}
}
</script>
