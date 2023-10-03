// 配置文件

import { defineUserConfig,defaultTheme } from 'vuepress'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    nprogressPlugin(),
    // docsearchPlugin({}),
  ],
  theme:defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'https://github.com/wuZhongtian/wuZhongtian.github.io',
    editLink:false,
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '学习笔记',
        link: '/notes/front_end/Vue.md',
      },
    ],
    sidebar:{
      '/':[
        {
          text: '学习笔记',
          link: '/notes/front_end/Vue.md'
        }
      ],
      '/notes/':     [
      {
        text: '大前端',
        collapsible: true,  // 可折叠的侧边栏
        children: [
          {
            text: 'Vue',
            link: '/notes/front_end/Vue.md',
          },
          {
            text: 'React',
            link: '/notes/front_end/React.md',
          },
          {
            text: 'Node',
            link: '/notes/front_end/NodeJS.md',
          },
          {
            text: '小程序',
            collapsible: true, 
            children:[
              {
                text: '微信小程序',
                link: '/notes/front_end/小程序/微信小程序.md',
              },
              {
                text: 'uniapp',
                link: '/notes/front_end/小程序/uniapp.md',
              }
            ]
          },
          {
            text: '前后端通讯',
            link: '/notes/front_end/前后端通讯.md',
          },
          {
            text: 'TypeScript',
            link: '/notes/front_end/TypeScript.md',
          },
          {
            text: '构建工具',
            link: '/notes/front_end/构建工具.md',
          },
          {
            text: 'ECMAScript部分',
            link: '/notes/front_end/ECMAScript.md',
          },
          {
            text: 'H5C3补充',
            link: '/notes/front_end/H5C3补充.md',
          },
          {
            text: '其他概念',
            link: '/notes/front_end/其他概念.md',
          },
      
        ],
      },
      {
        text: '嵌入式',
        collapsible: true, 
        children: [
          {
            text: 'C语言基础',
            link: '/notes/embedded/C语言.md',
          },
          {
            text: 'stm32',
            link: '/notes/embedded/stm32.md',
          },
          {
            text: '计算机网络',
            link: '/notes/embedded/计算机网络.md',
          },
          
        ],
      },
      {
        text: '数据库',
        collapsible: true, 
        children: [
          {
            text:"MySQl",
            link: '/notes/database/MySQl.md',
          },
          {
            text:"MongoDB",
            link: '/notes/database/MongoDB.md',
          },
        ]
      },{
        text:"Docker",
        link : '/notes/Docker.md',
      } , {
        text: 'Git',
        link: '/notes/Git.md',
      },
      {
        text: 'Linux',
        link: '/notes/Linux.md',
      },{
        text: '网络安全',
        link: '/notes/网络安全.md',
      },
      {
        text: '其他概念',
        link: '/notes/其他概念.md',
      },
    ]}

  })
}