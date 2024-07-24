import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';;
import Product from '../product/Product';
import Category from '../categories/Category';
import PrivateRoute from '../privateRoute/PrivateRoute';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  { label: <Link to="/categories" className="navigates">Categories</Link>, key: '1', icon: <UserOutlined /> },
  { label: <Link to="/products" className="navigates">Products</Link>, key: '2', icon: <UserOutlined /> },
];

const GeneralLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ paddingTop: 10 }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/categories" element={<PrivateRoute element={<Category />} />} />
              <Route path="/products" element={<PrivateRoute element={<Product />} />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Dashboard Created by Toyirov Mirvohid
        </Footer>
      </Layout>
    </Layout>
  );
};

export default GeneralLayout;
