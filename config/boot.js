require('./application');
const debug = require('debug')('http');

koa.use((ctx, next) => {  
  
  ctx.body = 'Hello World';
  
});


koa.listen(3000, () => {debug('listening');});