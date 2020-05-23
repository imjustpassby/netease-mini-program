const localURL = 'http://localhost:3000'
const onlineURL = 'https://ipassby.cloud/api'

export function request(data){
  return new Promise(function(resolve, reject){
    uni.request({
			url: onlineURL + data.url,
      data: data.params || {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(data.url+" request success")
        resolve(res.data);
      },
      fail: function (error) {
        console.log("request failed")
				reject(error);
      }
    })
  })
}