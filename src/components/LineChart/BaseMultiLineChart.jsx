import React from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { request } from "../../api/request";
const BaseChart = () => {
    const chartRef = React.useRef();

    React.useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        const dataSource = [
            {
                supplierName: "A",
                datas: [
                    {
                        date: "2013",
                        count: ~~(Math.random() * 30),
                        values: 5,
                    },
                    {
                        date: "2014",
                        count: ~~(Math.random() * 30),
                        values: 15,
                    },
                    {
                        date: "2015",
                        count: ~~(Math.random() * 30),
                        values: 55,
                    },
                    {
                        date: "2016",
                        count: ~~(Math.random() * 30),
                        values: 35,
                    },
                    {
                        date: "2017",
                        count: ~~(Math.random() * 30),
                        values: 25,
                    },
                ],
            },
            {
                supplierName: "B",
                datas: [
                    {
                        date: "2013",
                        count: ~~(Math.random() * 30),
                        values: 23,
                    },
                    {
                        date: "2014",
                        count: ~~(Math.random() * 30),
                        values: 33,
                    },
                    {
                        date: "2015",
                        count: ~~(Math.random() * 30),
                        values: 43,
                    },
                    {
                        date: "2016",
                        count: ~~(Math.random() * 30),
                        values: 53,
                    },
                    {
                        date: "2017",
                        count: ~~(Math.random() * 30),
                        values: 22,
                    },
                ],
            },
        ];
        var option = {
            title: {
                text: "ECharts 入门示例",
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {
                icon: "rect",
                backgroundColor: "#ccc",
                data: dataSource.map((d) => d.supplierName),
                top: 10,
                // right: 20,
                textStyle: {
                    color: "#000",
                },
                selected: {
                    ["A"]: true,
                },
            },
            xAxis: {
                type: "category",
                data: dataSource[0].datas.map((d) => d.date),
                boundaryGap: 0,
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value}%",
                },
            },
            grid: {
                left: 50,
                right: 10,
            },
            dataset: dataSource.map((d) => {
                return {
                    source: d.datas,
                };
            }),
            series: dataSource.map((d, i) => {
                return {
                    name: d.supplierName,
                    type: "line",
                    symbol: "none",
                    smooth: true,
                    datasetIndex: i,
                    encode: {
                        y: "values",
                        // x: "date",
                    },
                };
            }),

            // [
            //     { type: "line", symbol: "none", smooth: true,datasetIndex: },
            //     {
            //         type: "line",
            //         symbol: "none",
            //         smooth: true,
            //     },
            // ]
            dataZoom: [
                {
                    type: "slider",
                    xAxisIndex: 0,
                    filterMode: "none",
                },

                {
                    type: "inside",
                    yAxisIndex: 0,
                    filterMode: "none",
                },
            ],
        };
        myChart.setOption(option);
        myChart.on("legendselectchanged", (params) => {
            // 获取点击图例的选中状态
            var isSelected = params.selected[params.name];
            // 在控制台中打印
            console.log((isSelected ? "选中了" : "取消选中了") + "图例" + params.name);
            // 打印所有图例的状态
            console.log(params.selected);
        });
    }, []);

    return (
        <Container>
            <div className="chart" ref={chartRef}></div>
        </Container>
    );
};
const Container = styled.div`
    display: inline-block;
    flex: 1;
    background: #eee 50%;
    border: 1px solid #000;
    height: 350px;
    & > .chart {
        width: 100%;
        height: 100%;
    }
`;
export default BaseChart;
