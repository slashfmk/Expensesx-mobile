import React from "react";

import {LineChart} from "react-native-chart-kit";
import {Dimensions, View} from "react-native";
import * as constants from "../constants/appConstants";
import ILineGraph from "../interfaces/ILineGraph";


const LineGraphChart = (props: ILineGraph) => {

    return (
        <LineChart
            data={{
                labels: props.labels,
                datasets: [
                    {
                        // Green (Income)
                        data: props.dataSetA,
                        color: (opacity = 1) => `rgba(22, 209, 116, ${opacity})`,
                        strokeWidth: 3,
                    },
                    {
                        // Red (Expensive)
                        data: props.dataSetB ? props.dataSetB : [],
                        color: (opacity = 1) => `rgba(255, 91, 91, ${opacity})`,
                        strokeWidth: 3,
                    }
                ],
            }}
            width={Dimensions.get('window').width - 1}
            height={props.height}
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
            style={{
                marginVertical: 8,
                padding: 10,
                backgroundColor: constants.COLORS.greenDark
            }}
        />

    );
}

export default LineGraphChart;
