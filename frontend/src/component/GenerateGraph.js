import React from "react";
import Line from '../Graph/Line/Line'
import Area from '../Graph/Area/Area'
import Pie from '../Graph/Pie/Pie'
import Bar from '../Graph/Bar/Bar'
import Column from "../Graph/Column/Column";
import Error404 from "../Graph/Error404";
const GenerateGraph = (data) => {

    let graphType = data[2]?.graphType

    return (
        <>
            {
                graphType === 'Line' ?
                    <Line {...data} />
                    : graphType === 'Pie' ?
                        <Pie {...data} />
                        : graphType === 'Bar' ?
                            <Bar {...data} />
                            : graphType === 'Area' ?
                                <Area {...data} />
                                : graphType === "Column" ?
                                    <Column {...data} /> :
                                    graphType === "Stacked Bar" ?
                                        <Bar{...data} />
                                        : <Error404 {...data} />
            }
        </>
    )
}
export default GenerateGraph