const mongoose = require('mongoose');

// 数据库地址
const _url = 'mongodb://localhost:27017/node_express_demo';

// 创建连接
mongoose.connect(_url, {useNewUrlParser: true}).then(() => {
    console.log('server is connect to MongoDB');
}).catch((err) => {
    console.log('server is connect fail');
    console.log(err)
})

module.exports = mongoose;