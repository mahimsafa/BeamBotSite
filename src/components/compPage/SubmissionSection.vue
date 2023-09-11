<template>
	<div class="flex">
		<div class="text-5xl py-4 pl-2 font-quantify-bold mobile-width:text-3xl">
			<b>
				SUBMISSIONS
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
					Entries Submitted
				</span>
			</div>
			<!-- Sort By -->
			<!-- <div class="flex">
				<p class="pr-1">
					Sort by
				</p>
				<div class="border-black border-2 rounded-md">
					<select class="rounded-md text-black text-xl appearance-none">
						<option>
							Highest Likes
						</option>
						<option>
							Your Likes
						</option>
						<option>
							Recently Added⭣
						</option>
						<option>
							Recently Added⭡
						</option>
					</select>
				</div>
			</div> -->
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

		<SubmissionCard
			v-for="submission in compData.submissions"
			v-else
			:key="submission.id"
			:submission-data="submission"
			:user-tgid="id"
			:is-voted-by-user="isVotedByUser(submission.votersIdList)"
			:competition-id="compData.id"
		/>
	</div>
</template>

<script>
import SubmissionCard from './SubmissionCard.vue'
import LoadingSubmission from './LoadingSubmission.vue'
import NoSubmission from './NoSubmission.vue'

export default {
	name: 'SubmissionSection',
	components: {
		SubmissionCard,
		LoadingSubmission,
		NoSubmission
	},
	props: {
		compData: {
			type: Object,
			required: true
		},
		id: {
			type: String,
			required: true
		}
	},
	methods: {
		isVotedByUser (votersIdList) {
			const votersIdArray = [...votersIdList]

			const isVoted = votersIdArray.includes(this.id)

			return isVoted
		}
	}
}
</script>
