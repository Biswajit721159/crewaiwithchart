import React from 'react';
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph } from '../ValidateGraph'
import { solveData } from '../Manipulation';
import Error404 from '../Error404'
const Basic = (data) => {

    let arr = solveData(data)
    var options = {
        series: arr,
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: `${data[3]} & ${data[5]}`,
        },
        stroke: {
            // curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                opacity: 0.5
            },
        },
        // markers: {
        //     size: 1
        // },
        xaxis: {
            title: {
                text: `${data[3]}`
            },
            categories: data[4]
        },
        yaxis: {
            title: {
                text: `${data[5]}`
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true
        }
    };

    return (
        <>
            {ValidateGraph(data)
                ?
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <h6 className="text-center" style={{ color: 'green' }}>Query is - {data[0]['Your query']}</h6>
                    <div className="bg-white rounded shadow p-3">
                        <Chart options={options} series={options.series} type="area" height={350} />
                    </div>
                    <Table {...data[1]} />
                </div> :
                <Error404 {...data} />
            }
        </>)
}
export default Basic