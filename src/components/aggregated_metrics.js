import React, { Component } from "react";

import { Table, Divider, Tag } from 'antd';

const columns = [{
  title: 'Account',
  dataIndex: 'account',
  key: 'account',
  sortOrder: 'ascend',
  sorter: true,
  render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Account Type',
    key: 'type',
    dataIndex: 'type',
    render: tags => (
      <span>
        {
            tags.map(tag => tag === "parent" ? <Tag color="red" key={tag}>{tag}</Tag> : <Tag color="blue" key={tag}>{tag}</Tag>)
        }
      
        
      </span>
    ),
}, {
    title: 'Total Time (Seconds)',
    dataIndex: 'totalTime',
    key: 'totalTime',
  }, {
  title: 'Total Number',
  dataIndex: 'totalNum',
  key: 'totalNum',
}, {
  title: 'Total Area',
  dataIndex: 'totalArea',
  key: 'totalArea',
}, {
  title: 'Productivity (/hour)',
  key: 'productivity',
  dataIndex: 'productivity',
}];




export default class AggregatedMetrics extends Component {

    putData = (data, stats, account) => {
        var productivity = stats.totalArea*60*60 / stats.totalTime;
        productivity = productivity.toFixed(2);
        const child = {
            account: account.title,
            type: ["child"],
            totalNum: stats.totalNum,
            totalArea: stats.totalArea,
            totalTime: stats.totalTime,
            productivity: productivity,
            key: account.id
        };

        data.push(child);
    }
    
    makeDataset = (data, account) => {
        this.putData(data, account.statistics, account);
    
        account.children.map(account => {
            this.putData(data, account.statistics, account); 
            account.children.map(child => {
                this.makeDataset(data, child, account);
            });
        });
    }

    render() {
        const account = this.props.account;
        const stats = this.props.stats;
        var productivity = stats.totalArea*60*60 / stats.totalTime;
        productivity = productivity.toFixed(2);
        const data_parent = {
            account: account.title,
            type: ["parent"],
            totalNum: stats.totalNum,
            totalArea: stats.totalArea,
            totalTime: stats.totalTime,
            productivity: productivity,
            key: account.id

        };

        var data = [];

        this.makeDataset(data, account);
        data[0] = data_parent;

        data = data.sort((data1, data2) => {
            if(data1.type[0] === "parent") {
                return -1;
            }

            if(data2.type[0] === "parent") {
                return 1;
            }

            return data1.account > data2.account ? 1 : -1;
        });

        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}