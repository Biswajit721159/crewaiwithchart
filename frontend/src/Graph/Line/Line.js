import React from 'react';
import Basic from './Basic';
import DataLabels from './DataLabels'
import Zoomable from './Zoomable'
import Stepline from './Stepline';
import Error404 from '../Error404';
const Line = (data) => {
    let subchartName = data[2]?.subchartName
    return (
        <>
            {
                subchartName === "Basic" ?
                    <Basic {...data} /> :
                    subchartName === "Line with Data Labels" ?
                        <DataLabels {...data} /> :
                        subchartName === "Zoomable Timeseries" ?
                            <Zoomable {...data} /> :
                            subchartName === "Stepline" ?
                                <Stepline {...data} /> :
                                <Error404 {...data} />
            }
        </>
    );
};

export default Line;
