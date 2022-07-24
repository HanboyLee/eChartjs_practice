import React from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { request } from "../../api/request";

import eChartTheme from "@/configs/eChartTheme.js";
const BaseGauge = () => {
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
        echarts.registerTheme("westeros", eChartTheme);
        const myChart = echarts.init(chartRef.current, "westeros");
        const data = fakeData();
        const titles = data.map((d) => d.name);
        const value = data.map((d) => d.val);
        console.log(data, "??");

        myChart.setOption({
            title: {
                text: "ECharts 入门示例",
            },
            // tooltip: {
            //     trigger: "axis",
            // },
            // legend: {
            //     icon: "rect",
            //     backgroundColor: "#ccc",
            //     top: 10,
            //     // right: 20,
            //     textStyle: {
            //         color: "#000",
            //     },
            // },

            series: {
                type: "gauge",
                detail: {
                    formatter: `{value}%`,
                },
                data: [
                    {
                        name: "速度",
                        value: 30,
                    },
                ],

                itemStyle: {
                    color: "auto",
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                },
                progress: {
                    show: true,
                    roundCap: true,
                    width: 18,
                    // itemStyle: {
                    //     color: ["rgb(255,255,255,0.1)", "rgba(255,255,255,1)"],
                    // },
                },
            },
        });
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
    background: #eee 50%;
    height: 350px;
    border: 1px solid #000;
    & > .chart {
        width: 100%;
        height: 100%;
    }
`;
export default BaseGauge;
