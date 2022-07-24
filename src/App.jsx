import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
import styled from "styled-components";
//components
import BaseChart from "@/components/BaseBarChart/BaseChart";
import MultiLineChart from "@/components/LineChart/MultiLineChart";
import BaseScatter from "@/components/Scatter/BaseScatter";
import BaseRadarChart from "@/components/RaderChart/BaseRadarChart";
import BaseGauge from "@/components/Gauge/BaseGauge";
import BaseMap from "@/components/Map/BaseMap";
import BaseMultiLineChart from "@/components/LineChart/BaseMultiLineChart";
function App() {
    const [count, setCount] = React.useState(0);

    return (
        <Container className="App">
            <BaseChart />
            <MultiLineChart />
            <BaseScatter />
            <BaseRadarChart />
            <BaseGauge />
            <BaseMap />
            <BaseMultiLineChart />
        </Container>
    );
}
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`;
export default App;
