/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
    keepAlive: true
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    name: 'list',
    icon: 'table',
    path: '/list',
    component: './TableList',
    keepAlive: true
  },
  {
    name: 'list2',
    icon: 'table',
    path: '/list2',
    component: './TableList2',
    keepAlive: true
  },
  {
    name: 'list3',
    icon: 'table',
    path: '/list3',
    component: './TableList3/TableList3-1',
    routes: [
      {
        path: '/list3/TableList3-1',
        name: 'TableList3-1',
        component: './TableList3/TableList3-1',
        keepAlive: true
      },
      {
        path: '/list3/TableList3-2',
        name: 'TableList3-2',
        component: './TableList3/TableList3-2',
        keepAlive: true
      },
      {
        path: '/list3/TableList3-3',
        name: 'TableList3-3',
        component: './TableList3/TableList3-3',
        keepAlive: true
      },
    ],
  },
  {
    name: 'list4',
    icon: 'table',
    path: '/list4',
    component: './TableList4/TableList4-1',
    routes: [
      {
        path: '/list4/TableList4-1',
        name: 'TableList4-1',
        component: './TableList4/TableList4-1',
        keepAlive: true
      },
      {
        path: '/list4/TableList4-2',
        name: 'TableList4-2',
        component: './TableList4/TableList4-2',
        keepAlive: true
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
