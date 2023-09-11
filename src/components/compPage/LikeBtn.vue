<template>
	<button
		class="duration-200 bg-neutral-50 rounded-xl mt-4 border-4 w-full shadow-lg shadow-gray-500 overflow-hidden"
		:class=" isLiked ? 'border-red-500 text-red-500' : 'border-neutral-200 text-blue-300'"
		@click="toggleLike"
	>
		<div
			class="text-3xl py-1"
			:class="isLiked ? 'bg-red-50' : ''"
		>
			<i
				:class="[
					heartIconClass,
					isLiked ? 'animate__animated animate__rubberBand animate__faster' : ''
				]"
			/>
		</div>
	</button>
</template>

<script>
import 'animate.css'
import axios from 'axios'

export default {
	name: 'LikeBtn', // Declare the emitted event
	props: {
		submissionId: {
			type: String,
			required: true
		},
		userTgid: {
			type: String,
			required: true
		},
		voteCount: {
			type: Number,
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
	emits: ['updateVoteCount'],
	data () {
		return {
			isLiked: this.isVotedByUser
		}
	},
	computed: {
		heartIconClass () {
			return this.isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
		}
		// isLiked () {
		// 	return this.isVotedByUser
		// }
	},
	methods: {
		async toggleLike () {
			const data = {
				userTgid: this.userTgid,
				compId: this.competitionId
			}

			if (this.isLiked) {
				// Unlike submission
				// console.log('Unliking submission...')

				await axios.post(`http://100.26.160.253:3000/submission/${this.submissionId}/unvote`, data)
					.then((res) => {
						// console.log(res)
						this.$emit('updateVoteCount', -1) // Emit an event to decrease voteCount in parent
					})
					.catch(() => {
						// console.log(err)
					})
			} else {
				// Like submission
				// console.log('Liking submission...')

				await axios.post(`http://100.26.160.253:3000/submission/${this.submissionId}/vote`, data)
					.then((res) => {
						// console.log(res)
						this.$emit('updateVoteCount', 1) // Emit an event to decrease voteCount in parent
					})
					.catch(() => {
						// console.log(err)
					})
			}

			this.isLiked = !this.isLiked
		}
	}
}
</script>

<style>

</style>
