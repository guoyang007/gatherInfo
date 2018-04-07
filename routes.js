const router = require('koa-router')();
const util = require('util')
const fs = require('fs');
import dbFn from './model/dbFn.js'

router.get('/',async (ctx,next)=>{
	ctx.render('index.html',{})
	await next()
})

router.get('/_ga.png', async (ctx,next)=>{
	console.log('query',ctx.query)
	console.log('verb',util.inspect(ctx.query.verb, {showHidden: false, depth: null}))
	let verb= JSON.parse(ctx.query.verb);
	console.log('decode verb',util.inspect(verb, {showHidden: false, depth: null}))
	let object = JSON.parse(ctx.query.object)
	let params={verb:verb,object:object}
	console.log("params",util.inspect(params, {showHidden: false, depth: null}))
	dbFn.add(params);	
  ctx.set('Cache-Control', 'no-cache');
  ctx.type = 'image/png';
  ctx.body = ''
  await next()
}) 

// router.get('/api/articles/:id',async(ctx,next)=>{
// 	const {id}=ctx.params;
// 	let response={}
// 	await dbFn.get(id)
// 	.then(data=>{
// 		response.indexData=data
// 	}).catch(err=>{
// 		response.msg=err
// 	})
// 	ctx.body=response
// 	await next()
// })

// router.post('/api/records',async(ctx,next)=>{
// 	const body = ctx.request.body;
// 	console.log('body',body);
// 	// save record to db
// 	// dbFn.add(body)
// })


module.exports = router;  