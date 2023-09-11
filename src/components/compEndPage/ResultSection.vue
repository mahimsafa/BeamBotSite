<template>
	<div class="flex">
		<div class="text-5xl py-4 pl-2 font-quantify-bold mobile-width:text-3xl">
			<b>
				RESULTS
			</b>
		</div>
	</div>

	<!-- Submissions Grid -->
	<div class="grid grid-cols-3 gap-6 mobile-width:flex mobile-width:flex-col bg-gradient-to-t from-gray-200 to-gray-100 border-black border-4 border-solid rounded-xl p-10 mobile-width:p-4 mobile-width:pb-8">
		<!-- Top Bar -->
		<div class="col-span-3 flex justify-between text-2xl mobile-width:text-xl font-semibold mobile-width:mt-2">
			<!-- Submissions # -->
			<div class="flex items-center">
				<!-- If compdata not loaded yet -->
				<span v-if="compData.loading == true">
					<svg
						class="animate-spin mr-3 h-8 w-8 text-beam-dark-blue"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				</span>
				<span
					v-else
					class="fade-in-bottom pr-1"
				>
					{{ compData.submissions.length }}
				</span>
				<span>
					Total Entries Submitted
				</span>
			</div>
		</div>

		<!-- Submission Cards -->
		<LoadingSubmission
			v-if="compData.loading == true"
			:quantity="3"
		/>

		<NoSubmission
			v-else-if="compData.submissions.length == 0"
			class="col-span-3"
		/>

		<LeaderboardCard
			v-for="(submission, index) in compData.submissions.slice(0, 3)"
			v-else
			:key="submission.id"
			:submission-data="submission"
			:position="index + 1"
		/>
	</div>
</template>

<script>
import axios from 'axios'
import LoadingSubmission from '@/components/compPage/LoadingSubmission.vue'
import NoSubmission from '@/components/compPage/NoSubmission.vue'
import LeaderboardCard from '@/components/compEndPage/LeaderboardCard.vue'

export default {
	name: 'ResultPage',
	components: {
		LoadingSubmission,
		NoSubmission,
		LeaderboardCard
	},
	props: {
		compData: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			competitionId: this.compData.id,
			submissions: []
		}
	},
	async mounted () {
		// Make a bunch of promises
		await Promise.all([
			await axios.get(`${process.env.VUE_APP_API_HOST}/competition/${this.competitionId}/submissions`)
				.then((res) => {
					this.submissions = res.data
				})
				.catch(() => {
					// console.log(err)
				})
		])
	},
	methods: {
		isVotedByUser (votersIdList) {
			const votersIdArray = [...votersIdList]

			const isVoted = votersIdArray.includes(parseInt(this.id))

			return isVoted
		}
	}
}

</script>
