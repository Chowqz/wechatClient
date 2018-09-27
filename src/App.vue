<template>
    <div id="app">
    	<router-view/>
    </div>
</template>

<script>
	import {mapMutations} from 'vuex'

	export default {
		name: 'App',
		created() {
			this.startLoad();
			this.getPageTitleList();
		},
		methods: {
			...mapMutations({
				startLoad: 'START_LOAD',
				updatePageTitleList: 'UPDATE_PAGE_TITLE_LIST'
			}),
			getPageTitleList() {
				let routes = this.$router.options.routes[0].children;
				let titleList = {};
				routes.map(item => {
					if(item.children) {
						item.children.map(routeItem => {
							titleList['/'+item.path+'/'+routeItem.path] = item.label + ' / ' + routeItem.label;
						})
					}
					else {
						titleList['/'+item.path] = item.label;
					}
				})
				this.updatePageTitleList(titleList);
			}
		}
	}
</script>

<style>

</style>
