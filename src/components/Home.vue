<template>
	<el-container class="home" :style="{height: clientHeight}">
		<el-header class="header clearfix" style="height: 36px;">
			<div class="header-l system-name">System name</div>
			<div class="header-r">
				<div class="current-title">当前页面：{{currentTitle}}</div>
				<span class="loading-icon" v-show="isLoading"><i class="el-icon-loading"></i></span>
				<div class="user-info-wrapper">
					<div class="user-info">
						<div class="user-name">
							<i class="iconfont icon-user"></i><span>{{userName || '未登录'}}</span>
						</div>
						<div class="quit-btn" @click="logout">
							<i class="iconfont icon-quit"></i><span>退出</span>
						</div>
					</div>
				</div>
			</div>
		</el-header>
		<el-container>
			<el-aside class="aside" style="width: 210px;">
				<div class="logo">
					<!-- <img src="@/common/images/logo.png"> -->
					<img src="">
				</div>
				<el-menu class="menu-wrapper" style="border-right: 0;" :default-active="$route.path" router :unique-opened="true">
					<template v-for="(item, index) in $router.options.routes[0].children" v-if="!item.hide">
						<el-submenu v-if="item.children" :index="index + ''" :key="index" >
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{item.label}}</span>
							</template>
							<el-menu-item v-for="(child, idx) in item.children" v-if="!child.hide" :index="'/'+item.path+'/'+child.path" :key="idx">
							{{child.label}}
							</el-menu-item>
			            </el-submenu>
			            <el-menu-item v-else :index="'/'+item.path" :key="index">
				            <i class="el-icon-setting"></i>
				            <span>{{item.label}}</span>
			            </el-menu-item>
		            </template>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<div class="greet" v-if="$route.path=='/'">
					<p>Hello，{{userName}}</p>
					<p>欢迎使用本系统！</p>
				</div>
				<keep-alive>
				    <router-view v-if="$route.meta.keepAlive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'

	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters([
				'userName',
				'pageTitleList',
				'isLoading'
			]),
			clientHeight: function() {
				return (document.documentElement.clientHeight || document.body.clientHeight) + 'px';
			},
			currentTitle() {
				return this.pageTitleList[this.$route.path];
			}
		},
		created() {
			
		},
		mounted() {

		},
		methods: {
			...mapMutations({
				startLoad: 'START_LOAD',
				finishLoad: 'FINISH_LOAD'
			}),
			logout() {
				
			},
			handleCommand(command) {
		        
		    }
		}
	}
</script>

<style scoped>
.header{
	display: flex;
	color: #fff;
	background-color: #2b4049;
	line-height: 36px;
	padding-left: 0;
}
.system-name {
	width: 210px;
	color: #fff;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	letter-spacing: 5px;
}
.header-r{
	display: flex;
	justify-content: space-between;
	flex: 1;
}
.current-title{
	color: #fff;
	font-size: 14px;
	padding-left: 20px;
}
.loading-icon{
	width: 50px;
	height: 36px;
	font-size: 20px;
	text-align: center;
}
.user-info-wrapper{
	display: flex;
}
.user-info{
	font-size: 13px;
}
.user-name{
	display: inline-block;
	height: 36px;
	margin-right: 15px;
}
.user-name .iconfont{
	font-size: 16px;
	vertical-align: middle;
	margin-right: 4px;
}
.user-name span{
	vertical-align: middle;
}
.quit-btn{
	display: inline-block;
	height: 36px;
	color: #20a0ff;
	font-size: 14px;
	cursor: pointer;
}
.quit-btn span{
	vertical-align: middle;
}
.quit-btn .iconfont{
	font-weight: bold;
	vertical-align: middle;
	margin-right: 3px;
}
.dropdown-title{
	font-size: 14px;
}
.dropdown-menu{
	margin-right: 30px;
}
.dropdown-menu .el-dropdown-link {
	color: #409eff;
	cursor: pointer;
}
.main{
	background-color: #f7f8f9;
}
.aside{
	display: flex;
	flex-direction: column;
}
.logo{
	padding: 15px 0;
}
.logo img{
	display: block;
	margin: 0 auto;
}
.menu-wrapper{
	flex: 1;
	overflow: auto;
}
.greet{
	background-color: #fff;
	padding: 10px 20px;
}
.greet p{
	color: #333;
	font-size: 14px;
	line-height: 30px;
}
</style>