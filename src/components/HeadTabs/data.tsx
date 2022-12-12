import { history } from 'umi';
import { ReactNode, useEffect, useState } from "react"
import { Update } from 'history';

export interface TypeTabItems {
  label: string,
  key: string,
  children: ReactNode,
  routePath: string,
  closable: boolean
}
export interface TypeRouterItem {
  [key: string]: any,
  path?: string,
  name?: string,
  component?: string,
  keepAlive?: boolean,
  routes?: TypeRouterItem[]
}
/**获取路由路径，将根路由路径转化为对应页面的路由路径 */
export function getPathName(list: TypeRouterItem[]) {
  const { location } = history;
  if (location?.pathname === "/") {
    const _item = list.find(v => v.path === location?.pathname)
    return _item?.redirect
  }
  return location?.pathname
}
/**提取需要缓存的页面路由信息 */
export function getKeepAliveRouterList(list: TypeRouterItem[]) {
  let _list: TypeRouterItem[] = []
  /**过滤需要设置tab列表的路由数据 */
  list.map((v) => {
    if (v.keepAlive === true) {
      _list.push(v)
    }
    if (v.routes instanceof Array) {
      const _childList = getKeepAliveRouterList(v.routes)
      _list = [..._list, ..._childList]
    }
  })
  return _list
}
/**处理tabs列表数据 */
export function useTabsInfo(routeList: TypeRouterItem[]) {
  const [routeInfo, setRouteInfo] = useState<Update>()

  /**过滤需要设置tab列表的路由数据 */
  const _routeList = getKeepAliveRouterList(routeList)
  /**tabs列表数据 */
  const [tabItems, setTabItems] = useState<TypeTabItems[]>([])
  /**当前选中项 */
  const [activeKey, setActiveKey] = useState<string>()
  /**监听当前页面路由变更 */
  useEffect(() => {
    /**获取当前页面的准确路由地址 */
    const _pathname = getPathName(routeList)
    /**深拷贝tabItems数据 */
    const _tabItems = tabItems.map(v => v)
    /**找到定义的路由中的原始数据 */
    const _route = _routeList.find(v => v.path === _pathname)
    if (!_route) return
    /**如果当前tabs中数据没有当前项，则push进去 */
    const _tabItemIdx = tabItems.findIndex(v => v.routePath === _pathname)
    if (_tabItemIdx < 0) {
      /**动态引入页面组件 */
      const RouteChildren = require(`@/pages${_route?.component?.replace("./", "/")}`)
      _tabItems.push({
        label: _route.name || "",
        key: _route.component || "",
        routePath: _route.path || "",
        closable: _tabItems.length === 0 ? false : true,
        children: <RouteChildren.default></RouteChildren.default>,
      })
    }
    setActiveKey(_route.component)
    setTabItems(_tabItems)
  }, [routeInfo])


  /**监听activeKey的修改并且跳转到指定路由 */
  useEffect(() => {
    const _route = _routeList.find(v => v.component === activeKey)
    if (!_route) return
    history.push(_route.path as string)
  }, [activeKey])

  /**监听路由修改，设置当前路由状态，如果跳转到根路由，则重新跳转到对应页面路由 */
  useEffect(() => {
    history.listen((ev) => {
      if (ev.location.pathname === "/") {
        const _pathname = getPathName(routeList)
        _pathname && history.push(_pathname)
      }
      setRouteInfo(ev)
    })
  }, [])

  return {
    tabItems,
    activeKey,
    setTabItems,
    setActiveKey,
  }
}