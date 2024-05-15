import React from "react";
import { useSelector } from 'react-redux'
const Table = (props) => {
    let color=useSelector((state)=>state.bodyColor.color)
    let data = props;
    let ans = [];

    if (data && data.Normal && Array.isArray(data.Normal) && data.Normal.length > 0) {
        ans = data.Normal[0]['Your query'] ? data.Normal.slice(1) : data.Normal;
    }
    return (
        <div className="direct-chat-text">
            {
                typeof (data?.Normal) === "object" ?
                    <pre className='pretext' style={{ backgroundColor: color }}>
                        <div>
                            <h6 className="text-center mt-2" style={{ color: 'green' ,fontSize:'13px' }}>{data?.Normal[0]['Your query'] ? <>Your Query - {data?.Normal[0]['Your query']}</> : ""}</h6>
                            <table className="table table-bordered mt-4" style={{ backgroundColor: color }}>
                                <thead>
                                    <tr>
                                        {Object.keys(data?.Normal[data?.Normal?.length - 1]).map(key => (
                                            <th className="text-center" key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ans.map((item, index) => (
                                        <tr key={index}>
                                            {Object.keys(item).map(key => (
                                                <td className="text-center" key={key}>{item[key] !== null && item[key] !== undefined && item[key].length !== 0 ? item[key] : "-"}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </pre>
                    :
                    <pre className='pretext' style={{ backgroundColor: color }}>{data?.Normal}</pre>
            }
        </div>
    )
}

export default Table;
