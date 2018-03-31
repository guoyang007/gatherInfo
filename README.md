### how to use

* first: `yarn install`
* second: `yarn run build-dll`
* third: 
	
	* `development` mode: `yarn start` just starts your site
	* `production` mode: `yarn run build-assets` to build the assets, and then run `npm run serve` to run your site

**note** : the `yarn run build-dll` must be executed once before `yarn run start` or `yarn run build-assets` 


### tracking user interactions

#### the js tracking snippet

The code should be added near the top of the `<head>` tag and before any other script or CSS tags,

```
<script>
  (function(){
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `{the url this project will be deployed}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  })();
  ga('create','UA-XXXX-Y',auto);
  ga('send','pageview')
</script>
```

### TODO

* model 格式确定。以能存储到 db
* 信息收集脚本中，想要收集的信息{click事件，以及？}



