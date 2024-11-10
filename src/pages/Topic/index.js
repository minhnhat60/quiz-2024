import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import "./Topic.scss";

const Topic = () => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getListTopic();

            setData(result);
        }

        fetchApi();
    }, []);

    return (
        <>
            {data.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên chủ đề</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={"/quiz/" + item.id}>
                                    <button className="button">Làm bài</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </>
    )
}

export default Topic;