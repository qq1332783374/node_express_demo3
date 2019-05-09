/**
 * 用户登录和注册
 */

const express = require('express');
const router = express.Router();

// 数据模型
const User = require('../model/User');

// 登录
router.get('/login', (req, res) => {
    res.send('this is login');
});

router.post('/login', (req, res) => {
    var loginInfo = req.body;

    User.findOne({email: loginInfo.email}).then((user) => {

        if (!user) {
            return res.status(200).json({
                status: false,
                message: '用户不存在,请前往注册'
            });
        } else if (loginInfo.password != user.password) {
            return res.status(200).json({
                status: false,
                message: '密码错误'
            });
        } else {
            return res.status(200).json({
                status: true,
                message: '登录成功',
                data: {
                    userInfo: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                    },
                    stuList: user.stuList,
                    historyList: user.historyList
                }
            });
        };

    }).catch((err) => {
        console.log(err);
    })
});

// 注册
router.get('/register', (req, res) => {
    res.send('this is register page');
});

router.post('/register', (req, res) => {

    var registerInfo = req.body;

    User.findOne({email: registerInfo.email}).then((user) => {

        if (user) {
            return res.status(200).json({
                status: false,
                message: '用户邮箱已经被注册'
            });
        } else {
            new User(registerInfo).save().then((user) => {
                return res.status(200).json({
                    status: true,
                    message: '注册成功'
                });
            });
        }

    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router