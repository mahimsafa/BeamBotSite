<template>
	<div
		class="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50"
	>
		<div class="bg-white rounded-xl overflow-hidden shadow-xl max-w-fit max-h-fit p-4 flex">
			<img
				:src="lightboxImage"
				class="w-full h-full max-w-full max-h-full"
			>
		</div>
		<!-- You can add details here -->
		<div class="flex items-start justify-center text-white text-2xl mt-4">
			<span class="font-semibold">Caption: </span>
			<span class="pt-0.5 mb-2 ml-1">
				{{ caption }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LightBox',
	props: {
		lightboxImage: {
			type: String,
			required: true
		},
		caption: {
			type: String,
			required: true
		}
	}
}
</script>
