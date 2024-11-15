import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListAnswerByUserId } from "../../services/answerService";
import { getTopic } from "../../services/topicService";
import { Link } from "react-router-dom";

const Answers = () => {
    const [dataAnswers, setDataAnswers] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const userId = getCookie("id");

            const answersByUserId = await getListAnswerByUserId(userId);

            const dataFinal = [];

            for (const item of answersByUserId) {
                const topic = await getTopic(item.topicId);
                
                dataFinal.push({
                    answerId: item.id,
                    topicName: topic.name
                })
            }

            setDataAnswers(dataFinal);
        }

        fetchApi();
    }, []);

    return (
        <>
            <h2>Trang danh sách bài làm đã luyện</h2>

            {dataAnswers && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên chủ đề</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataAnswers.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.topicName}</td>
                                <td>
                                    <Link to={"/result/" + item.answerId}>
                                    <button className="button">Xem lại kết quả</button>
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

export default Answers;