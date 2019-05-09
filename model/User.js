/**
 * 用户表
 */

const mongoose = require('./db');
const Schema = mongoose.Schema;

// 创建用户数模型
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    stuList: {
        type: Array
    },
    historyList: {
        type: Array
    }
});

module.exports = User = mongoose.model('user', UserSchema);