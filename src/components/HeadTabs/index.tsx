import { Tabs } from 'antd';
import { useTabsInfo, TypeRouterItem } from "./data"
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
const Footer: React.FC<{ routeList: TypeRouterItem[] }> = (props) => {
  const { tabItems, activeKey, setTabItems, setActiveKey } = useTabsInfo(props.routeList)
  /**tabs根据用户的操作删除的时候操作tabItems和activeKey数据 */
  function onEdit(ev: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) {
    const _idx = tabItems.findIndex(v => v.key === ev)
    if (_idx < 0) return
    const _tabItems = tabItems.map(v => v)
    _tabItems.splice(_idx, 1)
    setTabItems(_tabItems)
    if (_tabItems.find(v => v.key === activeKey)) return
    const _data = _tabItems[_idx - 1]
    setActiveKey(_data?.key)
  }
  return <Tabs activeKey={activeKey} animated hideAdd type="editable-card" size="small" onChange={setActiveKey} onEdit={onEdit} items={tabItems} />
};
export default Footer;
