import React from 'react';
import Basic from './Basic';
import Spline from './Spline';
import DatetimeX from './DatetimeX-Axis';
import Error404 from '../Error404';

const Area = (data) => {

    let subchartName = data[2]?.subchartName


    return (
        <>
            {
                subchartName === "Basic" ?
                    <Basic {...data} /> :
                    subchartName === "Spline" ?
                        <Spline {...data} /> :
                        // subchartName === "Stacked" ?
                        //     <Stacked {...data} /> :
                        subchartName === "Datetime X-Axis" ?
                            <DatetimeX {...data} /> :
                            <Error404 {...data} />
            }
        </>)
}
export default Area