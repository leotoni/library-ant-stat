import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { EnvironmentOutlined } from '@ant-design/icons';
import mainRoutes from '../../routes';

const { Header, Content, Footer, Sider } = Layout;

@inject('library')
@observer
class Main extends React.Component {
  state = {
    regionId: '',
  };

  setRegion = ({ key }) => {
    this.setState({ regionId: key });
  }

  getRoutes = (routes) => routes.map((prop) => {
    const { library } = this.props;
    const { regionId } = this.state;
    if (prop.layout === '/main') {
      const { component: Component } = prop;
      return (
        <Route
          path={prop.layout + prop.path}
          render={(props) => <Component regionId={regionId} library={library} {...props} />}
          key={prop.path}
        />
      );
    }
    return null;
  });

  render() {
    const { regionId } = this.state;
    const { library } = this.props;
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          width={300}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            {library.regions.map(({ id, territory }) => (
              <Menu.Item onClick={this.setRegion} key={id} icon={<EnvironmentOutlined />}>
                {territory}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 300 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <Switch>
                {this.getRoutes(mainRoutes)}
                <Redirect to="/main/home" />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED {regionId}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
