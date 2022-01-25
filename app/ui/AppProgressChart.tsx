import React from 'react';
import {StyleSheet} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import * as constants from "../constants/appConstants";

const AppProgressChart = () => {

    const data = [
        {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#55dc96",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Beijing",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "New York",
            population: 8538000,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];


    return (
        <PieChart
            data={data}
            width={200}
            height={300}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 50]}
            absolute
            chartConfig={{
                backgroundColor: '#cccccc',
                backgroundGradientFrom: constants.COLORS.greenDark,
                backgroundGradientTo: constants.COLORS.greenDark,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 0,
                },
            }}
        />
    );
}

export default AppProgressChart;

const style = StyleSheet.create({

});