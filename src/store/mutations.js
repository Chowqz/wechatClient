const mutations = {
	UPDATE_USER_NAME(state, userName) {
		state.userName = userName;
	},
	UPDATE_PAGE_TITLE_LIST(state, pageTitleList) {
		state.pageTitleList = Object.assign({}, state.pageTitleList, pageTitleList);
	},
	START_LOAD(state) {
		state.isLoading = true;
	},
	FINISH_LOAD(state) {
		state.isLoading = false;
	}
}

export default mutations
