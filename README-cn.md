# Baidu_translate_web_api
#### 介绍 [中文](./README-cn.md) | [En](./README.md)
百度网页版翻译转换为简单的接口，提供给多语言国际化工具使用
`BaiduTranslator` 这个类支持[vite-plugin-auto-i18n](https://github.com/wenps/i18n_translation_vite)进行使用
#### 安装
```shell
npm install @ng1005/baidu_translate_web_api

pnpm install @ng1005/baidu_translate_web_api

yarn add @ng1005/baidu_translate_web_api
```

#### 使用
```javascript
import {translate,BaiduTranslator,SEPARATOR,language} from '@ng1005/baidu_translate_web_api'
//所有支持语言
console.log(language)

//翻译
translate('test product','en','zh').then((res)=>{
  console.log('res----',res)
}).catch(e=>{
  console.log(e)
})

//翻译数组
translate(['test','product'].join(SEPARATOR),'en','zh').then(res=>{
  console.log('res---',res.split(SEPARATOR))
}).catch(e=>{
  console.log('error---',e)
})

//vite-plugin-auto-i18n中使用
let baidu=new BaiduTranslator({})
baidu.translate('test case!','en','zh').then(res=>{
  console.log('res---',res)
}).catch(e=>{
  console.log('error---',e)
})
// vite-plugin-auto-i18n在vite.config.ts中的配置
import {BaiduTranslator} from '@ng1005/baidu_translate_web_api'
const i18nPlugin = vitePluginsAutoI18n({
    option: {
        globalPath: './lang',
        namespace: 'lang',
        distPath: './dist/assets',
        distKey: 'index',
        targetLangList: ['en', 'ko', 'ja'],
        originLang: 'zh-cn',
        translator: new BaiduTranslator({
            // proxy: {
            //     host: '127.0.0.1',
            //     port: 8899,
            //     protocol: 'http'
            // }
        })
    }
})

```

#### 测试
开发时使用`jest`进行测试

#### 开发与构建
```
pnpm install 
pnpm run build
```

#### 支持语言
```
af: 'Afrikaans',
sq: 'Albanian',
am: 'Amharic',
ar: 'Arabic',
hy: 'Armenian',
az: 'Azerbaijani',
eu: 'Basque',
be: 'Belarusian',
bn: 'Bengali',
bs: 'Bosnian',
bg: 'Bulgarian',
ca: 'Catalan',
ceb: 'Cebuano',
ny: 'Chichewa',
zh: 'Chinese Simplified',
'zh-cn': 'Chinese Simplified',
'zh-tw': 'Chinese Traditional',
co: 'Corsican',
hr: 'Croatian',
cs: 'Czech',
da: 'Danish',
nl: 'Dutch',
en: 'English',
eo: 'Esperanto',
et: 'Estonian',
tl: 'Filipino',
fi: 'Finnish',
fr: 'French',
fy: 'Frisian',
gl: 'Galician',
ka: 'Georgian',
de: 'German',
el: 'Greek',
gu: 'Gujarati',
ht: 'Haitian Creole',
ha: 'Hausa',
haw: 'Hawaiian',
iw: 'Hebrew',
hi: 'Hindi',
hmn: 'Hmong',
hu: 'Hungarian',
is: 'Icelandic',
ig: 'Igbo',
id: 'Indonesian',
ga: 'Irish',
it: 'Italian',
ja: 'Japanese',
jw: 'Javanese',
kn: 'Kannada',
kk: 'Kazakh',
km: 'Khmer',
ko: 'Korean',
ku: 'Kurdish (Kurmanji)',
ky: 'Kyrgyz',
lo: 'Lao',
la: 'Latin',
lv: 'Latvian',
lt: 'Lithuanian',
lb: 'Luxembourgish',
mk: 'Macedonian',
mg: 'Malagasy',
ms: 'Malay',
ml: 'Malayalam',
mt: 'Maltese',
mi: 'Maori',
mr: 'Marathi',
mn: 'Mongolian',
my: 'Myanmar (Burmese)',
ne: 'Nepali',
no: 'Norwegian',
ps: 'Pashto',
fa: 'Persian',
pl: 'Polish',
pt: 'Portuguese',
ma: 'Punjabi',
ro: 'Romanian',
ru: 'Russian',
sm: 'Samoan',
gd: 'Scots Gaelic',
sr: 'Serbian',
st: 'Sesotho',
sn: 'Shona',
sd: 'Sindhi',
si: 'Sinhala',
sk: 'Slovak',
sl: 'Slovenian',
so: 'Somali',
es: 'Spanish',
su: 'Sundanese',
sw: 'Swahili',
sv: 'Swedish',
tg: 'Tajik',
ta: 'Tamil',
te: 'Telugu',
th: 'Thai',
tr: 'Turkish',
uk: 'Ukrainian',
ur: 'Urdu',
uz: 'Uzbek',
vi: 'Vietnamese',
cy: 'Welsh',
xh: 'Xhosa',
yi: 'Yiddish',
yo: 'Yoruba',
zu: 'Zulu'
```
