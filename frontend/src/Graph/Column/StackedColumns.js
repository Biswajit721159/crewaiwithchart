import React from 'react';
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph, checkData } from '../ValidateGraph'
import { solveData } from '../Manipulation'
import Error404 from '../Error404'

const StackedColumns = (data) => {

    let arr = solveData(data)


    var options = {
        series: arr,
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    total: {
                        // enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        xaxis: {
            // type: 'datetime',
            categories: data[4],
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    }


    return (
        <>
            {ValidateGraph(data) ?
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <h6 className="text-center" style={{ color: 'green' }}>Query is - {data[0]['Your query']}</h6>
                    <div className="bg-white rounded shadow p-3">
                        <Chart options={options} series={options.series} type="bar" height={450} />
                    </div>
                    <Table {...data[1]} />
                </div> : <Error404 {...data} />
            }
        </>
    );
}
export default StackedColumns