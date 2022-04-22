<h1 align="center">Vue Scaffold UI</h1>
<p align="center">A Vue 3 Component Library</p>
<p align="center">English | <a href="README.zh-CN.md">中文</a></p>

## Project structure

```
vue-scaffold-ui
│
└───lib[Library Directory]
│   │   index.ts
│   
└───src[Library demo directory]
│   │   main.ts
```

## Documentation

[http://blog.icuxika.com/vue-scaffold-ui/](http://blog.icuxika.com/vue-scaffold-ui/)

## Usage

### installation

```shell
yarn add @icuxika/vue-scaffold-ui
```

or

```shell
npm install @icuxika/vue-scaffold-ui
```

### Direct

#### import `@icuxika/vue-scaffold-ui`

```javascript
import { VBanner, VButton } from "@icuxika/vue-scaffold-ui";
import "@icuxika/vue-scaffold-ui/style.css";
```

#### template

```vue

<VBanner />
<VButton loading>naive-ui</VButton>
```

#### Plugin

#### import

```typescript
import {
	create as createVUI,
	VBanner,
	VButton,
} from "@icuxika/vue-scaffold-ui";
import "@icuxika/vue-scaffold-ui/style.css";

const vueScaffoldUI = createVUI({
	components: [VBanner, VButton],
});

const app = createApp(App);
app.use(vueScaffoldUI);
```

#### template

```vue

<v-banner></v-banner>
<v-button loading>Vue Scaffold UI</v-button>
```

## Build

### preview

```shell
yarn dev
```

### build lib

```shell
yarn build
```

### publish

```shell
npm publish
```

## Other

### format

```shell
yarn lint
```

### pre-commit

```shell
yarn cm
```

## Thanks

[How To Create A Vue.js 3 Plugin Component With Others In Minutes And Publish NPM!](https://www.youtube.com/watch?v=ui717bVHS4I)
