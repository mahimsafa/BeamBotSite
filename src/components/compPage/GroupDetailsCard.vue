<template>
	<div class="rounded-xl">
		<div class="flex flex-col items-center p-10 mobile-width:p-4">
			<!-- Group Image -->
			<div class="bg-gradient-to-b from-slate-400 to-slate-400 via-slate-100 rounded-xl overflow-hidden mb-4 border-solid border-black border-4 mobile-width:mb-2 mobile-width:">
				<img
					v-if="groupData && groupData.fsGroupImageURL"
					id="groupImage"
					:src="groupData.fsGroupImageURL"
					alt="Your image"
					class="aspect-square"
					style=""
				>
				<img
					v-else
					id="Loading"
					src="https://fakeimg.pl/350x350?text=Loading&font=bebas"
					alt="Loading"
					class="aspect-square animate-pulse"
					style="min-width: 350px; max-height: 350px;"
				>
			</div>

			<!-- Group Name -->
			<div class="mb-2 px-10">
				<p class="text-2xl ">
					<b>
						{{ groupData.groupName }}
					</b>
				</p>
			</div>

			<!-- Token Address & Chain -->
			<div class="flex flex-col items-center">
				<button
					class="bg-gradient-to-l from-slate-400 to-slate-100 rounded-full border-solid border-black border-2 pl-3 pr-2 py-1 hover:text-black hover:from-slate-400 hover:to-slate-200 duration-300 focus:from-slate-400 focus:to-slate-400"
					@click="copyToClipboard"
				>
					<p class="text-xl mobile-width:text-base">
						<i class="fa-brands fa-ethereum" />
						<span class="ml-1"><u>{{ shortCA }}</u></span>
						<i class="ml-2 fa-solid fa-copy" />
					</p>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GroupDetailsCard',
	props: {
		groupData: {
			type: Object,
			required: true
		}
	},
	data () {
		return {

		}
	},
	computed: {
		// ...
		shortCA () {
			if (this.groupData && this.groupData.contractAddress) {
				return this.groupData.contractAddress.slice(0, 5) + '...' + this.groupData.contractAddress.slice(-5)
			} else {
				return 'Loading...'
			}
		}
	},
	methods: {
		copyToClipboard () {
			const dummy = document.createElement('input')
			const contractAddress = this.groupData.contractAddress

			// Set the value of the dummy input element
			dummy.value = contractAddress
			document.body.appendChild(dummy)
			dummy.select()
			document.execCommand('copy')
			document.body.removeChild(dummy)

			// Optionally, show a notification to the user that the address has been copied
		}
	}
}
</script>

<style>
.min-w-image {
  min-width: 425px;
}

.max-h-image {
  max-height: 425px;
}

@screen mobile-width {
	.min-w-image {
		min-width: 350px;
	}

	.max-h-image {
		max-height: 350px;
	}
}

</style>
