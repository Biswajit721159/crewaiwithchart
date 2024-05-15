import React from 'react';
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph, checkData } from '../ValidateGraph'
import { solveData } from '../Manipulation'
import Error404 from '../Error404';
const Grouped = (data) => {

    let seriesdata = solveData(data)
    // console.log("data is ", data)
    // console.log("seriesdata is ", seriesdata)
    const options = {
        series: seriesdata,
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: false,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: data[4],
        },
        legend: {
            show: true,
            showForSingleSeries: true,
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
export default Grouped