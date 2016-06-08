## tasklist-react

Panli运维平台 任务列表  React 重构


React Redux Boilerplate with sGrid, Webpack and Hot Module Replacement configuration.



## Router 路由系统

1. 以仓库为基准的路由系统
```
/warehouse/组织名或用户名/仓库名/分页数
/warehouse/SoftwareTest/Panli/2
```

This is a simple React boilerplate with:

- [Redux](http://redux.js.org/)
- [Webpack](https://www.npmjs.com/package/webpack)
- [React Router](https://www.npmjs.com/package/react-router)
- [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html)
- [PostCSS](https://github.com/postcss/postcss)
- [Sass](http://sass-lang.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React CSS Modules](https://github.com/gajus/react-css-modules)
- [Stylus](https://www.npmjs.com/package/stylus)
- [sGrid - my own Flexbox grid for Stylus](http://stylusgrid.com)
- Testing with:
  - [Mocha](https://mochajs.org/)
  - [Enzyme](http://airbnb.io/enzyme/),
  - [Chai](http://chaijs.com/),
  - [Sinon](http://sinonjs.org/),
  - [JSDOM](https://github.com/tmpvar/jsdom) [when you want to use 'mount' from Enzyme],
  - You can even test CSS Modules

## api

```
http://devops.panli.com/api/getissues?gitusername=SoftwareTest&gitreponame=Panli&pageid=1
```

## Usage

```
$ npm install
$ npm start
```
...and go to: http://localhost:3000

More info and documentation soon. There will be also a tutorial in a blog post. Stay tuned.

## Prepare for production

If you are ready to prepare your production files. You can run `npm run build`. Webpack will bundle and save all needed files (.js, .css, img, .html) in the `public` folder.

## Tests and ESLint

It uses Mocha runner config. You can use Enzyme, Chai, Sinon and JSDOM too.
Configuration allows you to test components which uses CSS Modules.
If you want to run tests put your test files in the `__tests__` folder and run `npm test`. (it will run eslint too) or `npm run testonly`.
You'll find example tests in the `__tests__` folder.


Works in Node which supports Promises.

### License

MIT

