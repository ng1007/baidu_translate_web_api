import axios, { AxiosProxyConfig } from "axios";
import { Translator } from "./translator";
import {langs} from './langs'
export interface BaiduTranslatorOption {
  proxy?: AxiosProxyConfig
  /** 翻译api执行间隔，默认为10000 */
  interval?: number,
  /**分隔符 */
  separator?:string,
}
export interface TranslatingItem{
  id: string,
  paraIdx: number,
  src: string,
  dst: string,
  metadata?: any,
  matches?: any
}
const SEPARATOR = '\n┇┇┇\n'

/**
 * 翻译方法
 * @param str 
 * @param from 
 * @param to 
 * @param options 
 * @returns 
 */
export async function translate(str:string,from='zh',to='en',options:BaiduTranslatorOption={}){
  const url='https://fanyi.baidu.com/ait/text/translate';
  const timestamp = new Date().getTime();
  to=langs[to]?langs[to]:to;
  from=langs[from]?langs[from]:from;
  if(from==to){
    return str
  }
  const data={
    "query": str,
    "from": from,
    "to": to,
    "milliTimestamp": timestamp
  }
  const resp=await axios.post(url,data,{
    timeout:10000,
    proxy: options.proxy
  })
  const res=resp.data
  let result=''
  const messages=res.split("event: message\ndata: ")
  const separator=options.separator||SEPARATOR
  messages.forEach((message:any)=>{
    message=message.trim()
    if(message){
        let msg:{[key:string]:any}={}
        try {
          msg=JSON.parse(message)
        } catch (error) {
          console.error(`翻译错误：${message}\n${res}`)
        }
        if(msg.errno==0&&msg.data.event=='Translating'){
          let list:string[]=[]
          let sep=separator.replaceAll('\n','')
          msg.data.list.forEach((i:TranslatingItem)=>{
            if(i.src!=sep){
              list.push(i.dst)
            }
          })
          result=list.join(separator)
        }
      
    }
  })
  return result
}
/**
 * for vite-plugin-auto-i18n
 */
export class BaiduTranslator extends Translator{
  constructor(option: BaiduTranslatorOption) {
    super({
      name: 'Baidu翻译',
      interval:option.interval,
      fetchMethod: async (text, fromKey, toKey) => {
        let textList=[];
        textList=text.split(SEPARATOR)
        let arr=textList.splice(0,10)
        let result=[]
        let arrList=[]
        arrList.push(JSON.parse(JSON.stringify(arr)));
        let dataList=[]
        while (arr.length>0) {
          try {
            let data = await translate(arr.join(SEPARATOR), fromKey,toKey,option)
            dataList.push(data.split(SEPARATOR))
            result.push(data)
          } catch (error) {
            console.error(`🙅翻译请求错误:${JSON.stringify(arr)}`)
          }
          arr=textList.splice(0,10)
          arrList.push(JSON.parse(JSON.stringify(arr)));
        }
        let resultLength=result.join(SEPARATOR).split(SEPARATOR).length
        let textLength=text.split(SEPARATOR).length;
        if(textLength!=resultLength){
          console.error(`🙅翻译请求错误长度不一致:${textLength}-${resultLength}\n${text}\n${result.join(SEPARATOR)}`)
        }
        return result.join(SEPARATOR)|| ''
      }
    })
  }
}
export {SEPARATOR}