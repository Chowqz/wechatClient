const state = {
	userName: localStorage.userInfo ? JSON.parse(localStorage.userInfo)['username'] : '',
	pageTitleList: {
		'/': '首页'
	},
	isLoading: false
}

export default state;