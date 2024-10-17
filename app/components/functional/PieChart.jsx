import PieChart from 'react-native-pie-chart'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { React, useState } from 'react'
import styles from '../../styles'
import Feather from "react-native-vector-icons/Feather";

const CustomPieChart = ({
    series,
    hasTitle,
    editable
}) => {

    const { width } = Dimensions.get('window');
    const widthAndHeight = (width * 0.30)

    // colors for pie chart
    const sliceColor = ['#80FF72', '#7EE8FA', '#FFF07C']

    // calculates percentage of macros based on given ratio
    let percentageCalc = (index) => {
        return Number(Math.round((series[index] / (series[0] + series[1] + series[2]) * 100) + 'e1') + 'e-1');
    }
    const PieChartLegend = ({ macro, index, color }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyle.legendStyle, { backgroundColor: color }]} />

                {series == null ? (
                    <Text style={styles.defaultWhiteText}>
                        — %
                    </Text>
                ) : (
                    <Text style={styles.defaultWhiteText}>
                        {macro} {percentageCalc(index)}{"%"}
                    </Text>
                )}
            </View>
        )
    }
    return (
        <View style={[localStyle.container, { paddingVertical: 10 }]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {hasTitle && (
                <Text style={[styles.defaultWhiteText, { textDecorationLine: 'underline', paddingHorizontal: 10 }]}>
                    Macro-Nutrients
                </Text>
            )}
            {editable && (
                <Feather name={'edit'} size={20} color='#CB9CF2' style={{bottom: 2, paddingRight: 10}} />
            )}
            </View>

            <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View style={localStyle.legendContainer}>
                    <PieChartLegend macro={"Carb"} index={0} color='#80FF72' />
                    <PieChartLegend macro={"Protein"} index={1} color='#7EE8FA' />
                    <PieChartLegend macro={"Fat"} index={2} color='#FFF07C' />
                </View>
                {/* Macro Pi Chart*/}
                <View style={{ paddingVertical: 20, paddingRight: 20 }}>
                    <PieChart widthAndHeight={widthAndHeight} series={series == null ? ['30', '30', '30'] : series} sliceColor={sliceColor}
                        style={{ strokeWidth: '4', stroke: '#141920' }}
                    />
                </View>
            </View>
        </View>
    )
}
export default CustomPieChart

const localStyle = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: 'rgba(27,33,43,0.5)'
    },
    legendStyle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginRight: 8
    },
    legendContainer: {
        justifyContent: 'center',
        padding: 20,
        justifyContent: 'space-evenly'
    }
})