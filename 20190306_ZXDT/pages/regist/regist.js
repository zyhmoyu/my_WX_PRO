// pages/login.js
var APP = getApp();
var OPENID;

Page({
	data: {
		name: '',
		phone: '',
		departmentId: 0,
		array: ['中国', '美国', '巴西', '日本'],
		domain:APP.globalData.domain,
		ishow: false,
		index: 0,
		jsCode: '',
		encryptedData:'',
		iv:''
	},
	InputName: function(e) {
		let name = e.detail.value
		this.setData({
			name
		})
	},
	InputPhone: function(e) {
		let phone = e.detail.value
		this.setData({
			phone
		})
	},

	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		let array = this.data.array
		let departmentId = array[e.detail.value].id
		console.log(departmentId)
		this.setData({
			index: e.detail.value,
			departmentId
		})
	},
	onLoad: function() {
		var that = this;

		wx.login({
			success: function(res) {
				console.log(res)
				that.setData({
					jsCode: res.code
				})
				that.myAuthorize(res.code);
			}
		});
    wx.request({
      url: APP.globalData.domain + "/front/index/getDeptList",
      
      success: function (res) {
        console.log(res)
        that.setData({ array:res.data})
        let e = {}
        e.detail = {}
        e.detail.value = 0
        that.bindPickerChange(e)
      }
    })
	},
  regist:function(){
    let _this = this
    if (_this.data.name==''){
      wx.showModal({
        title: '提示',
        content: '用户名为空',
      })
      return
    }
    if(_this.data.phone==''){
      wx.showModal({
        title: '提示',
        content: '电话为空',
      })
      return
    }
    console.log(_this.data.name, _this.data.phone, _this.data.departmentId)
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        APP.globalData.userInfo = res.userInfo;
        var encryptedData = res.encryptedData;
        var iv = res.iv;

        _this.setData({
          userInfo: res.userInfo
        });

        wx.request({
          url: APP.globalData.domain + "/front/index/login",
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            jsCode: _this.data.jsCode,
            encryptedData: encryptedData,
            iv: iv,
            departmentId: _this.data.departmentId,
            name:_this.data.name,
            phone:_this.data.phone
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == 200) {
              APP.globalData.userInfo = res.data.user;
              wx.switchTab({
                url: '/pages/home/home',
              });
            }
          }
        });
      }
    });
  },
  myAuthorize: function (js_code) {
    var that = this;
    wx.request({
      url: APP.globalData.domain + "/front/index/exist",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        jsCode: js_code,
      },
      success: function (res) {
        console.log(res)
        // res.data.isExist
        let ishow = true
        if (res.data.isExist) {
          ishow = false
          APP.globalData.userInfo = res.data.user;
          wx.switchTab({
            url: '/pages/home/home',
          });
        }
        that.setData({ ishow })
      }
    });
  },

  getUserInfo: function (event) {
    var that = this;
    if (event.detail.userInfo != null) {
      APP.globalData.userInfo = event.detail.userInfo;
      that.setData({
        userInfo: event.detail.userInfo
      });
    }

    wx.login({
      success: function (res) {
        that.myAuthorize(res.code);
      }
    });
  },

  onShareAppMessage: function () {
    return APP.globalData.shareInfo;
  }
})