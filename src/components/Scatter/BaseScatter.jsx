import React from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { request } from "../../api/request";
const BaseScatter = () => {
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
        console.log(data, "??");
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
                top: 10,
                // right: 20,
                textStyle: {
                    color: "#000",
                },
            },
            xAxis: {
                data: titles,
            },
            yAxis: {},
            series: {
                type: "scatter",
                data: value,
                label: {
                    show: true,
                    fontSize: 10,
                    position: "top",
                    distance: 15,
                },
            },
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
    width: 50%;
    background: #eee 50%;
    height: 350px;
    border: 1px solid #000;
    & > .chart {
        width: 100%;
        height: 100%;
    }
`;
export default BaseScatter;
