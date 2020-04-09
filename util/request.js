export function request(data){
  return new Promise(function(resolve, reject){
    uni.request({
      url: 'http://localhost:3000' + data.url,
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