# gulp-wechat-miniprogram
基于gulp构建的微信小程序开发模板

## 特性
1. 支持Typescript
2. 支持Scss, Sass
3. 支持样式补全
4. 支持Eslint
5. 支持Stylelint
6. 支持图片压缩
7. 支持命令行创建page和component目录和(包括wxml, ts, wxss, json文件)
8. 支持热更新
9. 支持ES6语法, async, await等等

## 开始使用
1. 确保已全局安装gulp
  ```
  $ npm install -g gulp gulp-cli
  ```
2. git clone 代码
  ```
  $ git clone git@github.com:CaicoLeung/gulp-wechat-miniprogram.git
  ```
3. 进入目录, 并安装依赖

  ```
  $ cd gulp-wechat-miniprogram && npm install
  ```
4. 创建page, 会自动添加app.json的"pages"条目
  ```
  $ gulp create --page [name]
  ```
5. 创建component, 自动添加在components/{name}目录下
  ```
  $ gulp create --component [name]
  ```
6. 编译代码, 生成dist目录, 用微信开发者工具打开dist目录
  ```
  $ npm run build
  $ npm run watch
  ```
