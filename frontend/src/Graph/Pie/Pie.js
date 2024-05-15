import React from "react";
import Chart from 'react-apexcharts';
import Table from '../../component/Table';
import { ValidateGraph, checkData } from '../ValidateGraph'
import Error404 from '../Error404'
const Pie = (data) => {

    const keys = Object.keys(data);
    const lastKey = keys[keys.length - 1];
    const lastValue = data[lastKey];
    const entries = Object.entries(lastValue);
    const firstEntry = entries[0];
    const [firstKey, firstValue] = firstEntry;

    let arr = []
    for (let x in firstValue) {
        let num = checkData(x)
        arr.push(num)
    }


    const chartData = {
        options: {
            series: arr,
            chart: {
                width: 380,
                type: 'pie',
            },
            dataLabels: {
                enabled: true
            },
            labels: data[4],
            title: {
                text: `${data[3]} & ${data[5]}`,
            }
        }
    };


    return (
        <>
            {ValidateGraph(data) ?
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <h6 className="text-center" style={{ color: 'green' }}>Query is - {data[0]['Your query']}</h6>
                    <div className="bg-white rounded shadow p-3">
                        {/* <h2 className="font-bold text-lg mb-4">{data[3]} & {data[5]}</h2> */}
                        <Chart options={chartData.options} series={chartData.options.series} type="pie" height={350} />
                    </div>
                    <Table {...data[1]} />
                </div >
                : <Error404 {...data} />}
        </>
    );
}
export default Pie