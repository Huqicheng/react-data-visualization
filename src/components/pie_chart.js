import React, { Component } from "react";
import DataSet from "@antv/data-set";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    Guide,
  } from "bizcharts";

export default class PieChart extends Component {

    render() {
    
        const data = this.props.data;
        const accountName = this.props.name;

        if(data.length == 0) {
            return (
                <div>
                    <h2><span>{accountName + " has no sub accounts."}</span></h2>
                </div>
            );
        }

        const { DataView } = DataSet;
        const { Html } = Guide;
        const dv = new DataView();
        dv.source(data).transform({
        type: "percent",
        field: "count",
        dimension: "item",
        as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                val = val * 100 + "%";
                return val;
                }
            },
        };
        return (
            <div>
                <Chart
                    height={window.innerHeight}
                    data={dv}
                    scale={cols}
                    padding={[0, 80, 80, 40]}
                    forceFit
                >
                    <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                    <Axis name="percent" />
                    <Legend
                        position="right"
                        offsetY={-window.innerHeight / 2 + 120}
                        offsetX={-100}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                            "item*percent",
                            (item, percent) => {
                                percent = percent * 100;
                                percent = percent.toFixed(2);
                                percent = percent + "%";
                                return {
                                name: item,
                                value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="count"
                            formatter={(val, item) => {
                                return item.point.item + ": " + val;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
      }
}