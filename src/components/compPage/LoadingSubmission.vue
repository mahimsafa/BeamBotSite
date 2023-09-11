<template>
	<!-- Submission Card Loading -->
	<div
		v-for="i in quantity"
		:key="i"
	>
		<div class="rounded-xl border-solid border-blue-200 border-2 shadow-lg shadow-gray-500 overflow-hidden">
			<!-- Image container -->
			<div
				class="animate-pulse bg-cover bg-center relative"
			>
				<div class="aspect-content bg-gradient-to-b from-beam-dark-blue to-beam-dark-blue via-beam-light-blue" />
			</div>

			<!-- Submission Details -->
			<div class="bg-slate-100 p-4 rounded-b-2xl">
				<!-- Caption -->
				<div class="mb-4">
					<div class="mb-2 flex flex-row">
						<span class="text-xl font-semibold">Caption: </span>
						<span class="w-full pl-2">
							<div class="space-y-3 w-full animate-pulse">
								<div class="grid grid-cols-3 gap-4">
									<div class="mt-2 h-3 bg-beam-light-blue rounded-2xl col-span-2" />
									<div class="mt-2 h-3 bg-beam-light-blue rounded-2xl col-span-1" />
								</div>
							</div>
						</span>
					</div>
					<div class="mb-2 animate-pulse">
						<div class="h-3 bg-beam-light-blue rounded-2xl" />
					</div>
				</div>

				<!-- Likes & Time Ago Added -->
				<div class="flex justify-between items-center text-lg">
					<!-- Likes -->
					<div class="flex items-center">
						<i class="fa-solid fa-heart text-2xl" />
						<div class="w-16 pl-2 animate-pulse">
							<div class="h-5 bg-beam-dark-blue rounded-2xl" />
						</div>
					</div>

					<!-- Time Added -->
					<div class="flex items-center">
						<div class="w-16 pr-2 animate-pulse">
							<div class="h-5 bg-beam-dark-blue rounded-2xl" />
						</div>
						<i class="far fa-clock text-2xl" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoadingSubmission',
	props: {
		quantity: {
			type: Number,
			required: true
		}
	}
}
</script>
