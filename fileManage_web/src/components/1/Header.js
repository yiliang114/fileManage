import './header.less';

import React from 'react';
import {
  Layout,
  Icon,
  Menu,
  Dropdown,
  message,
  Popconfirm
} from 'antd';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import {commonService} from '../services/index';

const {Header} = Layout;
const {SubMenu} = Menu;

@inject('commonStore')
@observer
class Head extends React.Component {
  render() {
    let {collapsed, isLogin} = this.props.commonStore;
    return (
      <Header className="header">
        <Icon
          className="trigger"
          type={collapsed
          ? 'menu-unfold'
          : 'menu-fold'}
          onClick={this.onTriggerClick}/>
        <div className="header-menu">
          {!<Dropdown
            overlay={< Menu onClick = {
            this.onMenuClick
          } > <Menu.Item key="collaborator">协作者管理</Menu.Item> < Menu.Item key = "authorization" > 营销授权 < /Menu.Item> <Menu.Item key="account">账户信息</Menu.Item > <Menu.Item key="logout">退出登录</Menu.Item> < /Menu>}
            placement="bottomCenter">
            <span className="header-name">腾讯云<Icon type="down"/></span>
          </Dropdown>
}
          {isLogin
            ? <Popconfirm
                placement="bottom"
                title="确定退出吗"
                onConfirm={this.handleLogout}
                okText="确定"
                cancelText="取消">
                <a className="header-name">退出登录</a>
              </Popconfirm>
            : null
}
        </div>
      </Header>
    );
  }

  onMenuClick = ({key}) => {
    switch (key) {
      case 'collaborator':
      case 'authorization':
      case 'account':
        this.handleSkip();
        break;
      case 'logout':
        this.handleLogout();
        break;
    }
  }

  handleSkip = () => {
    console.log('call handleSkip');
  }

  handleLogout = async() => {
    let resp = await commonService.logout();
    if (resp && resp.code === 0) {
      const {commonStore} = this.props;
      message.success('退出登录成功')
      commonStore.setLogin(false)
    }
  }

  onTriggerClick = () => {
    const {commonStore} = this.props;
    let collapsed = !commonStore.collapsed;
    commonStore.setCollapse(collapsed);
  }
}

export default Head;