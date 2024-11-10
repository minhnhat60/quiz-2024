import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/answerService";

const Quiz = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [dataTopic, setDataTopic] = useState();
    const [dataQuestion, setDataQuestion] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const resultTopic = await getTopic(params.id);
            setDataTopic(resultTopic);

            const resultQuestions = await getListQuestion(params.id);
            setDataQuestion(resultQuestions);
        }

        fetchApi();
    }, [params.id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = getCookie("id");

        const data =   {
            userId: parseInt(userId),
            topicId: parseInt(params.id),
            answers: []
        }

        for(let i = 0; i < event.target.elements.length; i++) {

            if(event.target.elements[i].checked === true) {
                const name = event.target.elements[i].name;
                const value = event.target.elements[i].value;

                data.answers.push(
                    {
                        questionId: parseInt(name),
                        answers: parseInt(value)
                    }
                );

            }
        }
        const result = await createAnswer(data);

        navigate(`/result/${result.id}`)
    };

    return (
        <>
            {dataTopic && (
                <h2>Chủ đề quiz: {dataTopic.name}</h2>
            )}

            {dataQuestion && (
                <div className="form-quiz">
                    <form onSubmit={handleSubmit}>
                        {dataQuestion.map((item, indexItem) => (
                            <div className="forn-quiz__item" key={indexItem}>
                                <p>Câu {indexItem + 1}: {item.question}</p>

                                {item.answers.map((answer, indexAnswer) => (
                                    <div key={indexAnswer}>
                                        <input name={item.id} type="radio" value={indexAnswer}
                                        id={`quiz-${item.id}-${indexAnswer}`} />
                                        <label htmlFor={`quiz-${item.id}-${indexAnswer}`}>{answer}</label>
                                    </div>                                    
                                ))}
                            </div>
                        ))}
                        <button className="button">Nộp bài</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Quiz;