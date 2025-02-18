import {translate,BaiduTranslator,SEPARATOR} from '../src/index'
describe("translate function", () => {
  translate('test','en','zh').then(res=>{
    console.log('res---',res)
  }).catch(e=>{
    console.log('error---',e)
  })
});

describe("translate arr function", () => {
  translate(['test','product'].join(SEPARATOR),'en','zh').then(res=>{
    console.log('res---',res.split(SEPARATOR))
  }).catch(e=>{
    console.log('error---',e)
  })
});

describe("translate class", () => {
  let baidu=new BaiduTranslator({})
  baidu.translate('test case!','en','zh').then(res=>{
    console.log('res---',res)
  }).catch(e=>{
    console.log('error---',e)
  })
});


