import React from 'react';
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph, checkData } from '../ValidateGraph'
import { solveData } from '../Manipulation'
import Error404 from '../Error404';
const StackedBars100 = (data) => {

    let seriesdata = solveData(data)

    // console.log("seriesdata ", seriesdata)
    const options = {
        series: seriesdata,
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: '100% Stacked Bar'
        },
        xaxis: {
            categories: data[4],
        },
        tooltip: {
            y: {
                // formatter: function (val) {
                //     return val + "K"
                // }
            }
        },
        fill: {
            opacity: 1

        },
        legend: {
            show: true,
            showForSingleSeries: true,
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };

    return (
        <>
            {ValidateGraph(data) ?
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <h6 className="text-center" style={{ color: 'green' }}>Query is - {data[0]['Your query']}</h6>
                    <div className="bg-white rounded shadow p-3">
                        <Chart options={options} series={options.series} height={'450px'} type="bar" />
                    </div>
                    <Table {...data[1]} />
                </div> : <Error404 {...data} />}
        </>
    );
}
export default StackedBars100