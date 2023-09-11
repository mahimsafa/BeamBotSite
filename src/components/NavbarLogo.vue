<template>
	<div class="flex justify-start">
		<router-link to="/">
			<div class="svg-icon" />
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'NavbarLogo'
}
</script>

<style>
.svg-icon {
	display: block;
  background-image: url('@/assets/logo/NavbarLogo.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 200%;
	width: 250px;
	height: 70px;
}
</style>
