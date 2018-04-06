### how to use

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
    script.src = `http://www.yguo.club:3003/collect.js`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  })();
</script>
```

### TODO

* model 格式确定。以能存储到 db
* 信息收集脚本中，想要收集的信息
  
  * 事件： click,mousedown,keydown and ?
  * 具体信息： userId, 时刻，点击位置，点击元素，and ?
  * 某种协议的 API 在哪儿设计？



