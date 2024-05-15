import React from 'react';
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph, checkData } from '../ValidateGraph'
import { solveData } from '../Manipulation'
import Error404 from '../Error404'
const Stepline = (data) => {

    let arr = solveData(data)
    const options = {
        series: arr,
        chart: {
            type: 'line',
            height: 350
        },
        stroke: {
            curve: 'stepline',
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Stepline Chart',
            align: 'left'
        },
        markers: {
            hover: {
                sizeOffset: 4
            }
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


export default Stepline
