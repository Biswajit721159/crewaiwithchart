import React from 'react';
import Basic from './Basic';
import ColumnwithDataLabels from './ColumnwithDataLabels';
import StackedColumns from './StackedColumns';
import StackedColumns100 from './StackedColumns100';
import Error404 from '../Error404';

const Column = (data) => {

    let subchartName = data[2]?.subchartName
    return (
        <>
            {
                subchartName === "Basic" ?
                    <Basic {...data} /> :
                    subchartName === "Column with Data Labels" ?
                        <ColumnwithDataLabels {...data} /> :
                        subchartName === "Stacked Columns" ?
                            <StackedColumns {...data} /> :
                            subchartName === "Stacked Columns 100" ?
                                <StackedColumns100 {...data} /> :
                                <Error404 {...data} />
            }
        </>
    );
}
export default Column