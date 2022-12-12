# Ant Tabs实现
组件目录 /src/components/HeadTabs
/**使用方法，在需要缓存的路由中配置keepAlive: true,注意不能配置到跟路由上
 * export default [
 *   {
 *     path: '/welcome',
 *     name: 'welcome',
 *     icon: 'smile',
 *     component: './Welcome',
 *     keepAlive: true
 *   }
 * ]
 * 在App.tsx中引入
 * import routeList from "../config/routes"
 * 在App.tsx中将原有的children注释，替换为该组件
 * {children}
 * <HeadTabs routeList={routeList}></HeadTabs>
*/