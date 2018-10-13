import React, { Component } from "react";
import {Tabs} from 'antd';
import PieChart from "./pie_chart";
import AggregatedMetrics from './aggregated_metrics';
import * as statisticsService from '../services/statistics';
const TabPane = Tabs.TabPane;

export default class StatisticsViewer extends Component {


    putData = (data, stats, account) => {
        data.itemArea.push({
            item: account.title,
            count: Math.floor(stats.totalArea)
        });
        data.itemTime.push({
            item: account.title,
            count: Math.floor(stats.totalTime)
        });
        data.itemNum.push({
            item: account.title,
            count: Math.floor(stats.totalNum)
        });
    }

    // adapt the data to Pie Chart
    makeDataset = (data, account) => {
        this.putData(data, account.statistics, account);

        account.children.map(account => {
            this.putData(data, account.statistics, account); 
            account.children.map(child => {
                this.makeDataset(data, child);
            });
        });
    }

    render() {
        const account = this.props.account;
        const stats = statisticsService.sumNode(account);
        var dataset = {
            itemNum: [],
            itemTime: [],
            itemArea: []
        };
        this.makeDataset(dataset, account);
    
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab={"Aggregated Metrics"} key="1">
                    <AggregatedMetrics stats={stats} account={account}/>
                </TabPane>

                <TabPane tab={"Total Area (" + stats.totalArea + ")"} key="2">
                    <PieChart name={account.title} data={dataset.itemArea}/>
                </TabPane>

                <TabPane tab={"Total Time (" + stats.totalTime + ")"} key="3">
                    <PieChart name={account.title} data={dataset.itemTime}/>
                </TabPane>

                <TabPane tab={"Total Number (" + stats.totalNum + ")"} key="4">
                    <PieChart name={account.title} data={dataset.itemNum}/>
                </TabPane>

            </Tabs>
        );
    }
}