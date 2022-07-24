import React from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { request } from "../../api/request";
const BaseChart = () => {
    const chartRef = React.useRef();

    React.useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        var option = {
            title: {
                text: "ECharts 入门示例",
            },
            tooltip: {},
            legend: {
                icon: "rect",
                backgroundColor: "#ccc",
                data: ["销量", "销量1"],
                top: 10,
                // right: 20,
                textStyle: {
                    color: "#000",
                },
                selected: {
                    销量: true,
                },
            },
            xAxis: {
                data: ["2011", "2012", "2013", "2014", "2015", "2016"],
            },
            yAxis: {
                axisTick: {
                    length: 6,
                    lineStyle: {
                        type: "dashed",
                        // ...
                    },
                },
            },
            series: [
                { name: "销量", type: "bar", data: [5, 20, 36, 10, 10, 20] },
                {
                    name: "销量1",
                    type: "bar",
                    data: [5, 25, 36, 10, 10, 20],
                },
            ],
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
