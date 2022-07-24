import React from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { request } from "../../api/request";
const BaseRaderChart = () => {
    const chartRef = React.useRef();
    const fakeData = React.useCallback((len = 50) => {
        let data = [];
        for (let i = 0; i < len; i++) {
            let name = 1911 + i;
            let val = Math.round(Math.random() * 100);
            data.push({ name, val });
        }
        return data;
    }, []);
    React.useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        const data = fakeData();
        const titles = data.map((d) => d.name);
        const value = data.map((d) => d.val);
        var option = {
            title: {
                text: "英雄實力對比",
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {},
            radar: {
                indicator: [
                    { name: "生命", min: 0, max: 100, color: "green" },
                    { name: "敏捷", min: 0, max: 100, color: "yellow" },
                    { name: "防禦", min: 0, max: 100, color: "blue" },
                    { name: "攻擊", min: 0, max: 100, color: "red" },
                    { name: "攻速", min: 0, max: 100, color: "#000" },
                ],
                shape: "polygon",
                // shape: "circle",
                splitArea: {
                    areaStyle: {
                        color: [
                            "rgba(0, 0, 0, 0.1)",
                            "rgba(0, 0, 0, 0.2)",
                            "rgba(0, 0, 0, 0.3)",
                            "rgba(0, 0, 0, 0.4)",
                            "rgba(0, 0, 0, 0.5)",
                        ],
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        shadowBlur: 10,
                        opacity: 0.5,
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            "rgba(255,255,255,0.5)",
                            "rgba(255,255,255,0.6)",
                            "rgba(255,255,255,0.7)",
                            "rgba(255,255,255,0.8)",
                            "rgba(255,255,255,0.9)",
                        ],
                        width: 5,
                    },
                },
                radius: "50%",
                z: 100,
            },
            series: {
                type: "radar",
                data: [
                    {
                        name: "魯班",
                        value: [20, 40, 50, 10, 20],
                    },
                    {
                        name: "關羽",
                        value: [100, 30, 20, 40, 50],
                    },
                ],
            },
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
    width: 50%;
    /* background: #eee 50%; */
    height: 350px;
    border: 1px solid #000;
    & > .chart {
        width: 100%;
        height: 100%;
    }
`;
export default BaseRaderChart;
