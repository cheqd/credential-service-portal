<script lang="ts">
</script>

<div class="container">
	<div class="one"></div>
	<div class="two"></div>
	<div class="three"></div>
	<div class="four"></div>
</div>

<style>
	:root {
		--one: #fe854d;
		--two: #fe854d;
		--three: #fe854d;
		--four: #fe854d;
	}

	div.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	div > div {
		width: 16px;
		height: 16px;
		border-radius: 100%;
		margin: 1.5vw;
		animation: bounce 1.5s 0.5s linear infinite;
	}
	.one {
		background-color: #fe854d;
	}

	.two {
		background-color: #fe854d;
		animation-delay: 0.1s;
	}

	.three {
		background-color: #fe854d;
		animation-delay: 0.2s;
	}

	.four {
		background-color: #fe854d;
		animation-delay: 0.3s;
	}

	@keyframes bounce {
		0%,
		50%,
		100% {
			transform: scale(1);
			filter: blur(0px);
		}
		25% {
			transform: scale(0.6);
			filter: blur(3px);
		}
		75% {
			filter: blur(3px);
			transform: scale(1.4);
		}
	}
</style>
