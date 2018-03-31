const router = require('koa-router')();  
import dbFn from './model/dbFn.js'

router.get('/',async (ctx,next)=>{
	ctx.render('index.html',{})
	await next()
})

router.get('/_ga.png', async (ctx,next)=>{
	const params = ctx.query;
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