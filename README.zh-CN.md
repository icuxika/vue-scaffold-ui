<h1 align="center">Vue Scaffold UI</h1>
<p align="center">一个 Vue 3 组件库</p>

## 项目结构

```
vue-scaffold-ui
│
└───lib[库目录]
│   │   index.ts
│   
└───src[库演示目录]
│   │   main.ts
```

## 文档

[http://blog.icuxika.com/vue-scaffold-ui/](http://blog.icuxika.com/vue-scaffold-ui/)

## 如何使用

### 安装

```shell
yarn add @icuxika/vue-scaffold-ui
```

或

```shell
npm install @icuxika/vue-scaffold-ui
```

### 引入 `@icuxika/vue-scaffold-ui`

```javascript
import { VBanner, VButton } from "@icuxika/vue-scaffold-ui";
import "@icuxika/vue-scaffold-ui/style.css";
```

### template

```vue

<VBanner />
<VButton loading>naive-ui</VButton>
```

## 如何构建

### 本项目预览

```shell
yarn dev
```

### 构建库

```shell
yarn build
```

### 发布

```shell
npm publish
```

## 其他

### 格式化

```shell
yarn lint
```

### pre-commit

```shell
yarn cm
```

## 强烈感谢

[How To Create A Vue.js 3 Plugin Component With Others In Minutes And Publish NPM!](https://www.youtube.com/watch?v=ui717bVHS4I)
> 尝试了诸多方式使一个使用TypeScript编写的库发布到npm后还能被其他TypeScript项目通过`import { xxx } from "yyy"`的方式正确使用，最终找到这个视频，并按照他的步骤实现了。
> （补充：最新已移除使用的rollup-plugin-typescript2插件，使用vue-tsc本身的功能完成响应.d.ts文件的生成，rollup-plugin-typescript2插件目前与较新的plugin-vue版本一起使用时不会为vue文件生成.d.ts文件。）
