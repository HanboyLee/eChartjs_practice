import React from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import { request } from "../../api/request";

const MultiLineChart = () => {
    const chartRef = React.useRef();
    const fetchLiftExpectancyTableDatas = React.useCallback(async () => {
        const sufUrl = "/data/asset/data/life-expectancy-table.json";
        const { data } = await request(sufUrl);
        return data;
    }, []);
    const extractCountries = (data) => {
        return Array.from(new Set(data.map((d) => d[3])));
    };

    React.useEffect(() => {
        console.dir(chartRef.current);
        const myChart = echarts.init(
            chartRef.current,
            {
                innerWidth: chartRef.current.clientWidth,
                innerHeight: chartRef.current.clientWidth,
            }
            // "dark"
        );
        let option;

        fetchLiftExpectancyTableDatas().then((data) => {
            const countries = extractCountries(data.slice(1));
            const datasetWithFilters = [];
            const seriesList = [];
            echarts.util.each(countries, function (country) {
                var datasetId = "dataset_" + country;
                datasetWithFilters.push({
                    id: datasetId,
                    fromDatasetId: "dataset_raw",
                    transform: [
                        {
                            type: "filter",
                            config: {
                                and: [
                                    { dimension: "Year", gte: 1950 },
                                    { dimension: "Country", "=": country },
                                ],
                            },
                        },
                        {
                            type: "sort",
                            config: { dimension: "Year", order: "asc" },
                        },
                    ],
                });
                seriesList.push({
                    type: "line",
                    datasetId: datasetId,
                    showSymbol: false,
                    name: country,
                    endLabel: {
                        show: true,
                        formatter: function (params) {
                            return params.value[3] + ": " + params.value[0];
                        },
                    },
                    labelLayout: {
                        moveOverlap: "shiftY",
                    },
                    emphasis: {
                        focus: "series",
                    },
                    encode: {
                        x: "Year",
                        y: "Income",
                        label: ["Country", "Income"],
                        itemName: "Year",
                        tooltip: ["Income"],
                    },
                });
            });

            myChart.setOption({
                animationDuration: 1000,
                dataset: [
                    {
                        id: "dataset_raw",
                        source: data,
                    },
                    ...datasetWithFilters,
                ],
                title: {
                    text: "Income of Germany and France since 1950",
                },
                tooltip: {
                    order: "valueDesc",
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",
                    nameLocation: "middle",
                    nameTextStyle: {
                        color: "#000",
                        fontSize: 20,
                    },
                },
                yAxis: {},

                grid: {
                    right: 140,
                },
                series: seriesList,
            });
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
    background: rgba(18, 41, 83, 0.5);
    height: 350px;
    box-shadow: inset 0px 0px 18px 0px rgba(43, 179, 245, 0.64);
    border-radius: 11px;
    & > .chart {
        width: 100%;
        height: 100%;
    }
`;
export default MultiLineChart;
