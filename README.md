### how to use

简洁版命令：`yarn deploy`。即可实现安装以及运行生产模式（pm2 管理）。如果想要dev 模式，需要`pm2 kill`关掉prd的进程。然后`yarn start`

* first: `yarn install`
* second: `yarn run build-dll`
* third: 
	
	* `development` mode: `yarn start` just starts your site
	* `production` mode: `yarn run build-assets` to build the assets, and then run `npm run serve` to run your site

**note** : the `yarn run build-dll` must be executed once before `yarn run start` or `yarn run build-assets` 



### tracking user interactions

思路： 向待监测页面插入监测脚本，进行事件监听、用户基本信息统计。由于跨域，使用 img.src 进行数据上报。

#### the js tracking snippet

The code should be added near the top of the `<head>` tag and before any other script or CSS tags,

```
<script>
  (function(){
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `http://127.0.0.1:3003/collect.js`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  })();
</script>
```

**NOTE:**

  上段脚本中的script.src 地址需要和 `utils/report.js`中第8行url一致。目前都是在本地机器上运行。

#### 细节

在utils/文件夹中的report.js 和 collect.js。

* report.js 以`img.src`实现数据上报
* collect 通过事件代理实现数据收集。

### TODO

* model 格式确定。以能存储到 db
* 信息收集脚本中，想要收集的信息
  
  * 事件： click,mousedown,keydown and ?
  * 具体信息： userId, 时刻，点击位置，点击元素，and ?
  * 某种协议的 API 在哪儿设计？



