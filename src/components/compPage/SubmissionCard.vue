<template>
	<div>
		<!-- Lightbox, only shown if lightboxImage is not null -->
		<LightBox
			v-if="lightboxImage"
			:caption="submissionData.caption"
			:lightbox-image="lightboxImage"
			@click.self="closeLightbox"
		/>

		<!-- Card -->
		<div class="rounded-xl border-solid border-blue-200 border-2 shadow-lg shadow-gray-500 overflow-hidden">
			<!-- Image container -->
			<div class="aspect-square relative bg-gradient-to-b from-slate-400 to-slate-400 via-slate-100 rounded-t-lg overflow-hidden">
				<img
					id="groupImage"
					:src="submissionData.imageURL"
					alt="Your image"
					class="h-full w-full object-cover"
				>

				<!-- Fullscreen Btn Container -->
				<div class="absolute right-0 m-4">
					<button
						class="text-white rounded-xl text-2xl p-1"
						@click="openLightbox(submissionData.imageURL)"
					>
						<i class="fa-solid fa-expand fa-lg" />
					</button>
				</div>
			</div>

			<!-- Submission Details -->
			<div class="bg-slate-100 p-4">
				<!-- Caption -->
				<div class="flex items-start justify-center">
					<span class="text-xl font-semibold">Caption: </span>
					<span class="pt-0.5 mb-2 ml-1 line-clamp-2">
						{{ submissionData.caption }}
					</span>
				</div>

				<!-- Likes & Date Added -->
				<div class="flex justify-between items-center text-lg">
					<!-- Likes -->
					<div class="flex items-center">
						<i class="fa-solid fa-heart text-2xl mobile-width:text-xl" />
						<span class="font-semibold ml-2 mobile-width:text-lg">{{ voteCount }}</span>
					</div>

					<!-- Time Added -->
					<div class="flex items-center">
						<p class="font-semibold pr-2 mobile-width:text-base">
							{{ submissionTimePassed }}
						</p>
						<i class="far fa-clock text-2xl mobile-width:text-lg" />
					</div>
				</div>
			</div>
		</div>

		<LikeBtn
			:submission-id="submissionData.id"
			:user-tgid="userTgid"
			:vote-count="submissionData.votes.length"
			:is-voted-by-user="isVotedByUser"
			:competition-id="competitionId"
			@updateVoteCount="updateVoteCount"
		/>
	</div>
</template>

<script>
import LikeBtn from './LikeBtn.vue'
import LightBox from '../Card/LightBox.vue'

export default {
	name: 'SubmissionCard',
	components: {
		LikeBtn,
		LightBox
	},
	props: {
		submissionData: {
			type: Object,
			required: true
		},
		userTgid: {
			type: String,
			required: true
		},
		isVotedByUser: {
			type: Boolean,
			required: true
		},
		competitionId: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			lightboxImage: null,
			voteCount: this.submissionData.votes.length
		}
	},
	computed: {
		submissionTimePassed () {
			return this.submissionData.submissionDate === undefined ? 0 : this.submissionData.timePassed
		}
	},
	methods: {
		openLightbox (image) {
			this.lightboxImage = image
		},
		closeLightbox () {
			this.lightboxImage = null
		},
		updateVoteCount (changeAmount) {
			this.voteCount += changeAmount
		}
	}
}
</script>
