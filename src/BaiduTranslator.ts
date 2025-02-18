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
    timeout:options.interval??10000,
    proxy: options.proxy
  })
  const res=resp.data
  let result=''
  const messages=res.replaceAll("event: message\n",'').split("data: ")
  const separator=options.separator||SEPARATOR
  messages.forEach((message:any)=>{
    message=message.trim()
    if(message){
      let msg=JSON.parse(message)
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
      fetchMethod: async (text, fromKey, toKey) => {
        let data = await translate(text, fromKey,toKey,option)
        return data|| ''
      }
    })
  }
}
export {SEPARATOR}