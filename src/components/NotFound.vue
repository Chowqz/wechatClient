<template>
	<div class="not-found">
		<p>404：Page Not Found</p>
		<p>您访问的页面不存在</p>
		<div class="btn-wrapper">
			<el-button type="primary" size="mini" @click="goHome">返回首页</el-button>
			<el-button type="primary" size="mini" @click="goBack">返回上页</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			goHome() {
				this.$router.push('/');
			},
			goBack() {
				this.$router.back();
			}
		}
	}
</script>

<style scoped>
.not-found{
	text-align: center;
	padding-top: 200px;
}
.not-found p{
	color: #333;
	font-size: 16px;
	line-height: 40px;
}
.btn-wrapper{
	margin-top: 60px;
}
.btn-wrapper button{
	margin: 0 30px;
}
</style>