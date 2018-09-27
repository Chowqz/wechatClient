function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n
}

function formatDate(date) {
	date = new Date(date);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	return [year, month, day].map(formatNumber).join('-');
};

function isPcJudge() {
	let agents = ["android", "windows phone", "iphone", "ipad", "ipod", "symbianos"];
    for(let i=0; i<agents.length; i++) {
        if(new RegExp(agents[i],"i").test(window.navigator.userAgent)) {
            return false;
        }
    }
    return true;
}

// 全局定时器
window.timer = null;

window.isPc = isPcJudge();

const util = {
	getDateRange(startOffset = 0, endOffset = 0) {
		if (startOffset >= endOffset) {
			return [new Date(), new Date()];
		} else {
			let dailyMilliseconds = 24 * 60 * 60 * 1000;
			return [+new Date() + startOffset * dailyMilliseconds, +new Date() + endOffset * dailyMilliseconds];
		}
	},
	parseStartTime(date) {
		date = date || [];
		return date[0] ? formatDate(date[0]) + ' 00:00:00' : null;
	},
	parseEndTime(date) {
		date = date || [];
		return date[1] ? formatDate(date[1]) + ' 23:59:59' : null;
	},
	showErrorMsg(that, error) {
		that.$message.error({
			showClose: false,
			message: (typeof error === 'string') ? error : ((error || {}).message || '未解析错误')
		});
	},
	showWarningMsg(that, message) {
		that.$message.warning({
			showClose: false,
			message
		});
	},
	showSuccessMsg(that, message) {
		that.$message.success({
			showClose: false,
			message,
			duration: 1500
		});
	},
	parseExportTitle(columns) {
    	return columns.map(v => `${v.label}:${v.field}`).join('|');
	},
	getCurrentPageData(data, currentPage, pageSize) {
		return (data || []).slice((currentPage - 1) * pageSize, currentPage * pageSize);
	},
	deepCloneByJson(data) {
		return (typeof data === 'object') ? JSON.parse(JSON.stringify(data)) : data;
	},
	debounce(fn, delay = 400) {
		if(isPc) {
			fn();
		}
		else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn();
				timer = null;
			}, delay);
		}
	},
	defer(fn, delay = 400) {
		setTimeout(() => {
			fn();
		}, delay);
	},
	getRegions() {
		let params = {
			areaId: null
		};
		return new Promise((resolve, reject) => {
			hsbRequest('getRegions', params).then(res => {
				resolve(res.areaList);
			}).catch(err => {
				reject(err);
			})
		})
	}
}

export default util
