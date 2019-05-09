// 导入模块
const express = require('express');
const creatError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// 实例化
var app = express();

// 导入路由模块
var indexRouter = require('./router/index');
var userRouter = require('./router/user');

// cookie配置
app.use(cookieParser());

// log 日志
app.use(logger('dev'));

// 中间键处理
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 静态资源开放配置
app.use(express.static(path.join(__dirname, 'public')));

// 路由配置
app.use('/', indexRouter);
app.use('/user', userRouter);


// 处理 404
app.use((req, res, next) => {
    next(creatError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// 监听端口
app.listen(3000, () => {
    console.log('server in running at http://localhost:3000');
})