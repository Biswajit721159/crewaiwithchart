import React from 'react';
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph } from '../ValidateGraph'
import { solveData } from '../Manipulation'
import Error404 from '../Error404';
const Basic = (data) => {

    let seriesdata = solveData(data)

    // console.log("seriesdata", seriesdata)

    const options = {
        series: seriesdata,
        chart: {
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
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
                </div> : <Error404 {...data} />
            }
        </>
    );
}
export default Basic