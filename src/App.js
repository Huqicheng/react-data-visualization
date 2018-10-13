import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as dataService from './services/dataService';
import {getTreeStructure} from './services/accountService';

import AccountTree from './components/account_tree';
import StatisticsViewer from './components/statistics_viewer';

import { Layout, Menu, Breadcrumb, Icon , Divider} from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {

  state = {
    accounts: [],
  };

  onSelect = (id) => {
    // if selecting the currently selected key, antd will set the id as ""
    if(id === null || id === undefined || id == "") {
      return;
    }
    console.log("App.js [onSelect], selected key is " + id);
    const selected = parseInt(id);
    if(!Number.isInteger(selected)) {
      return;
    }
    this.setState({selected});
  }

  search = (id) => {
    console.log("App.js [search], to search key " + id);
    const {accounts} = this.state;

    for(let i=0; i<accounts.length; i++) {
      const account = accounts[i];
      if(account.id === id) {
        return account;
      } else {
        let res = this.dfs(account, id);
        if(res !== null && res !== undefined) {
          return res;
        }
      }
    }

    return null;
  }

  dfs = (curNode, id) => {
    const accounts = curNode.children;

    for(let i=0; i<accounts.length; i++) {
      const account = accounts[i];
      if(account.id === id) {
        return account;
      } else {
        let res = this.dfs(account, id);
        if(res !== null && res !== undefined) {
          return res;
        }
      }
    }

    return null;
  }

  renderStatistics = () => {
    const {selected} = this.state;
    if(selected !== null && selected !== undefined) {
      let account = this.search(selected);
      console.log("App.js [renderStatistics], selected account is " + account);
      return <StatisticsViewer account={account}/>;
    }
  }


  render() {
    const height = window.height;
    console.log("height: " + height);
    return (
        <Layout>
            <Header className="header" >
              <div className="logo"/>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1" >Cleaning</Menu.Item>
              </Menu>              
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                  <AccountTree accounts={this.state.accounts} onSelect={this.onSelect} />
                </Sider>

                <Content style={{ padding: '0 24px', minHeight: 500,}}>
                  {this.renderStatistics()}
                </Content>

              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              AvidBots ©2018 by Jonathan Hu
            </Footer>
          </Layout>
    );
  }

  componentDidMount() {
    let cleanings = dataService.getCleanings();
    let accounts = getTreeStructure(dataService.getAccounts(), cleanings);
    // select the first account
    if(accounts.length > 0) {
      this.onSelect(accounts[0].id.toString());
    }
    
    this.setState({accounts});
    console.log(accounts);
    
  }
}

export default App;
