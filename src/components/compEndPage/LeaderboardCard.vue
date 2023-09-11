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
		<div class="rounded-xl border-solid border-blue-100 border-2 shadow-lg shadow-gray-500 overflow-hidden">
			<!-- Image container -->
			<div class="aspect-square relative bg-gradient-to-b from-slate-400 to-slate-400 via-slate-100 overflow-hidden">
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
			<div class="bg-slate-100 p-4 overflow-hidden">
				<!-- Caption -->
				<div class="flex items-start justify-center">
					<span class="text-xl font-semibold">Caption: </span>
					<span class="pt-0.5 mb-2 ml-1 line-clamp-2">
						{{ submissionData.caption }}
					</span>
				</div>

				<!-- Likes -->
				<div class="flex justify-between items-center text-lg">
					<!-- Likes -->
					<div class="flex items-center">
						<i class="fa-solid fa-heart text-2xl" />
						<span class="font-semibold ml-2">{{ voteCount }}</span>
					</div>

					<div
						v-if="position == 1"
						class="flex items-center"
					>
						<p class="font-quantify-bold text-sm pr-2 pt-2">
							1st Place
						</p>
						<div class="border-beam-dark-blue border-2 rounded-xl bg-beam-dark-blue">
							<i
								class="fa-solid fa-medal fa-flip fa-xl m-2 my-5"
								style="color: #fee103;"
							/>
						</div>
					</div>

					<div
						v-else-if="position == 2"
						class="flex items-center"
					>
						<p class="font-quantify-bold text-sm pr-2 pt-2">
							2nd Place
						</p>
						<div class="border-beam-dark-blue border-2 rounded-xl bg-beam-dark-blue">
							<i
								class="fa-solid fa-medal fa-flip fa-xl m-2 my-5"
								style="color: #c4c4c4;"
							/>
						</div>
					</div>
					<div
						v-else-if="position == 3"
						class="flex items-center"
					>
						<p class="font-quantify-bold text-sm pr-2 pt-2">
							3rd Place
						</p>
						<div class="border-beam-dark-blue border-2 rounded-xl bg-beam-dark-blue">
							<i
								class="fa-solid fa-medal fa-flip fa-xl m-2 my-5"
								style="color: #b76b01;"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LightBox from '../Card/LightBox.vue'

export default {
	name: 'LeaderboardCard',
	components: {
		LightBox
	},
	props: {
		position: {
			type: Number,
			required: true
		},
		submissionData: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			lightboxImage: null,
			voteCount: this.submissionData.votes.length
		}
	},
	methods: {
		openLightbox (image) {
			this.lightboxImage = image
		},
		closeLightbox () {
			this.lightboxImage = null
		}
	}
}
</script>
