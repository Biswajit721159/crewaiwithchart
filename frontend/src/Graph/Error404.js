import React from "react";
import Table from "../component/Table";
const Error404 = (data) => {
    return (
        <div className="text-center">
            <h6 style={{color:'red'}}>Graph is not possible with those data or input text</h6>
            <Table {...data[1]} />
        </div>
    )
}

export default Error404