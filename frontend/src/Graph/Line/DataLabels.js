import React from 'react';
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph, checkData } from '../ValidateGraph'
import { solveData } from '../Manipulation'
import Error404 from '../Error404'
const DataLabels = (data) => {

    let arr = solveData(data)
    const options = {
        series: arr,
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: `${data[3]} & ${data[5]}`,
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: data[4],
            title: {
                text: `${data[3]}`
            },
        },
        yaxis: {
            title: {
                text: `${data[5]}`
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            position: 'top',
            horizontalAlign: 'right',
        }
    };
    return (
        <>
            {ValidateGraph(data) ?
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <h6 className="text-center" style={{ color: 'green' }}>Query is - {data[0]['Your query']}</h6>
                    <div className="bg-white rounded shadow p-3">
                        <Chart options={options} series={options.series} type="line" height={350} />
                    </div>
                    <Table {...data[1]} />
                </div> : <Error404 {...data} />
            }
        </>
    );
};


export default DataLabels
