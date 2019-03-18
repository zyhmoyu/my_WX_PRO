//app.js
// const DOMAIN = 'http://10.10.113.22:8080';
const DOMAIN = 'https://dt.kfsdzsw.cn';
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
		testtimer:[],
    domain: DOMAIN,
    proxy:false
  }
})