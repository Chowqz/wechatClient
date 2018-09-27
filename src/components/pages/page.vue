<template>
	<div class="section">
		<el-button @click="scanQRCode" size="small">扫码</el-button>
	</div>
</template>

<script>
	import axios from 'axios'
	import sha1 from 'js-sha1'
	import wx from 'weixin-js-sdk'

	let apiDomain = process.env.NODE_ENV=='development' ? '/api.chowqz' : '';

	export default {
		data() {
			return {
				jsapi_ticket: ''
			}
		},
		created() {
			this.getJsapiTicket();
		},
		mounted() {
			// alert(navigator.userAgent)
		},
		methods: {
			getJsapiTicket() {
				axios.get(apiDomain + '/getJsapiTicket').then(res => {
					this.jsapi_ticket = res.data.jsapi_ticket;
					this.wxConfig()
				}).catch(err => {
					console.log(err)
				})
			},
			wxConfig() {
				let options = {
					appId: 'wx9b78887372d395ff',
					timestamp: parseInt(Date.now()/1000),
					nonceStr: Math.random().toString(16).substr(2, 15)
				}
				wx.config({
					...options,
				    debug: true, 
				    signature: this.getSignature(options),
				    jsApiList: ['chooseImage', 'scanQRCode']
				});
			},
			getSignature(options) {
				let params = {
					jsapi_ticket: this.jsapi_ticket,
					noncestr: options.nonceStr,
					timestamp: options.timestamp,
					url: location.href.split('#')[0]
				}
				console.log(this.formatParamsToQuery(params))
				return sha1(this.formatParamsToQuery(params));
			},
			formatParamsToQuery(params) {
				let queryArr = [];
				for(let [k, v] of Object.entries(params)) {
					queryArr.push(`${k}=${v}`); 
				}
				return queryArr.join('&');
			},
			scanQRCode() {
				wx.ready(() => {
					wx.scanQRCode({
						needResult: 0,
						scanType: ["qrCode","barCode"],
						success: (res) => {
							var result = res.resultStr; 
							console.log(result);
						}
					});
				})
			}
		}
	}
</script>

<style scoped>
.btn {

}
</style>