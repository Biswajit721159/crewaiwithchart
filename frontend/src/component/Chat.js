import tigersheet_logo from '../assets/tigersheet_logo.jpg'
import user_logo from '../assets/user_logo.jpg'
import Table from './Table';
import GenerateGraph from './GenerateGraph';
import { useSelector } from 'react-redux'
const Chat = () => {
    let message = useSelector((state) => state.message.message);
    let color=useSelector((state)=>state.bodyColor.color);
    return (
        <>
            {
                message.map((data, ind) => (
                    data.role === "assistant" ?
                        <div className="direct-chat-msg" style={{ backgroundColor: color }} key={ind}>
                            <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-left">TigerSheet</span>
                                <span className="direct-chat-timestamp float-right">{data.time}</span>
                            </div>
                            <img className="direct-chat-img" src={tigersheet_logo} alt="message" />
                            {/* <h6 className="text-center" style={{ color: 'red' }}>{data?.content?.Graph != undefined} && (Query is -{data?.content?.Graph[0]['Your query']}) </h6> */}
                            {
                                data?.content?.Graph !== undefined ?
                                    <GenerateGraph {...data?.content?.Graph} /> :
                                    <Table {...data?.content} />
                            }
                        </div> :
                        <div className="direct-chat-msg right" style={{ backgroundColor: color }} key={ind}>
                            <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-right">You</span>
                                <span className="direct-chat-timestamp float-left">{data.time}</span>
                            </div>
                            <img className="direct-chat-img" src={user_logo} alt="message" />
                            <div className="direct-chat-text" style={{ backgroundColor: color }}>
                                <pre className='pretext' style={{whiteSpace: 'wrap'}}>
                                    {data?.content}
                                </pre>
                            </div>
                        </div>
                ))
            }
        </>
    )
}
export default Chat