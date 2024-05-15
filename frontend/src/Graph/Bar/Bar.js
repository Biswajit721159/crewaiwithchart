import React from 'react';
import Basic from './Basic';
import Grouped from './Grouped'
import StackedBar from './StackedBar'
import StackedBars100 from './StackedBars100';
import Error404 from '../Error404';
const Bar = (data) => {

    let subchartName = data[2]?.subchartName
    // console.log("subchartName ", subchartName)
    return (
        <>
            {
                subchartName === "Basic" ?
                    <Basic {...data} /> :
                    subchartName === "Grouped" ?
                        <Grouped {...data} /> :
                        subchartName === "Stacked Bar" ?
                            <StackedBar {...data} /> :
                            subchartName === "Stacked Bars 100" ?
                                <StackedBars100 {...data} /> :
                                <Error404 {...data} />
            }
        </>
    );
}
export default Bar