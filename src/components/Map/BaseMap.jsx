import React from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { request } from "../../api/request";
import * as d3 from "d3";
import eChartTheme from "@/configs/eChartTheme.js";
import geoJson from "@/assets/map/中华人民共和国.json";
const BaseMap = () => {
    const chartRef = React.useRef();
    // const fakeData = React.useCallback(async () => {
    //     const geoJson = await fetch("../../assets/map/中华人民共和国.json");
    //     console.log(geoJson, "geoJson");
    //     return geoJson;
    // }, []);

    React.useEffect(() => {
        // echarts.registerTheme("westeros", eChartTheme);
        echarts.registerMap("china", geoJson);
        const myChart = echarts.init(chartRef.current, "westeros");
        // const data = fakeData();
        // const titles = data.map((d) => d.name);
        // const value = data.map((d) => d.val);
        console.log(geoJson, "??");
        const projection = d3.geoConicEqualArea();
        const locations = [
            {
                adcode: 120000,
                name: "天津市",
                center: [117.190182, 39.125596],
                centroid: [117.347043, 39.288036],
                childrenNum: 16,
                level: "province",
                parent: {
                    adcode: 100000,
                },
                subFeatureIndex: 1,
                acroutes: [100000],
            },
        ];
        myChart.setOption({
            title: {
                text: "地圖",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: function (params) {
                    return params.name + " : " + params.value[2];
                },
            },
            geo: {
                type: "map",
                map: "china",
                roam: true,

                symbolSize: function (params) {
                    return (params[2] / 100) * 15 + 5;
                },

                label: {
                    emphasis: {
                        show: false,
                    },
                },
                itemStyle: {
                    normal: {
                        areaColor: "#323c48",
                        borderColor: "#111",
                    },
                    emphasis: {
                        areaColor: "#2a333d",
                    },
                },
            },
            series: [
                {
                    type: "scatter",
                    coordinateSystem: "geo",

                    data: locations.map(function (itemOpt) {
                        console.log(itemOpt, "??");
                        return {
                            name: itemOpt.name,
                            value: [itemOpt.center[0], itemOpt.center[1], itemOpt.childrenNum],
                            label: {
                                emphasis: {
                                    position: "right",
                                    show: false,
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: itemOpt.color,
                                },
                            },
                        };
                    }),
                },
            ],
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
export default BaseMap;
