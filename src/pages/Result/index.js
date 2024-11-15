import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getListAnswerById } from "../../services/answerService";
import { getListQuestion } from "../../services/questionService";
import "./Result.scss";
import { getTopic } from "../../services/topicService";

const Result = () => {
    const params = useParams();
    const [ dataResult, setDataResult ] = useState();
    const [ dataInfo, setDataInfo ] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswers = await getListAnswerById(params.id);
            const dataQuestions = await getListQuestion(dataAnswers.topicId);

            const dataFinal = [];

            for(let i = 0; i < dataQuestions.length; i++) {
                const questionId = dataQuestions[i].id;
                const objectAnswer = dataAnswers.answers.find(item => item.questionId === questionId);

                dataFinal.push({
                    ...dataQuestions[i],
                    answer: objectAnswer.answer
                });

            }

            setDataResult(dataFinal);

            // Thông tin chung
            const infoTopic = await getTopic(dataAnswers.topicId);

            let counterTrue = 0;
            for (const item of dataFinal) {
                if(item.answer === item.correctAnswer) {
                    counterTrue++
                }
            }
            
            const infoFinal = {
                ...infoTopic,
                counterAnswerTrue: counterTrue,
                counterAnswerFalse: dataFinal.length - counterTrue,
                counterAll: dataFinal.length,
                percentTrue: (counterTrue/dataFinal.length * 100).toFixed(0)
            };
            
            setDataInfo(infoFinal);
        }

        fetchApi();
    }, [params.id]);

    return (
        <>
            {dataInfo && (
                <>
                    <h2>Kết quả chủ đề: {dataInfo.name}</h2>

                    <div>
                        Đúng: <strong>{dataInfo.counterAnswerTrue}</strong>
                    </div>
                    <div>
                        Sai: <strong>{dataInfo.counterAnswerFalse}</strong>
                    </div>
                    <div>
                        Tổng số câu: <strong>{dataInfo.counterAll}</strong>
                    </div>
                    <div>
                        Phần trăm đúng <strong>{dataInfo.percentTrue}%</strong>
                    </div>
                </>
            )}

            <h2>Trang Result</h2>

            {dataResult && (
                <div className="result">
                    {dataResult.map((item, indexItem) => (
                        <div className="result__item" key={indexItem}>
                            <p>
                                Câu {indexItem + 1} : {item.question}

                                {item.correctAnswer === item.answer ? (<><span className="result__tag result__tag--true">Đúng</span></>) : 
                                    (<><span className="result__tag result__tag--false">Sai</span></>)}
                            </p>

                            {item.answers.map((answer, indexAnswer) => {
                                let className = "";
                                let checked = false;

                                if(indexAnswer === item.answer) {
                                    checked = true;
                                    className = "result__item--selected";
                                }

                                if(indexAnswer === item.correctAnswer) {
                                    className = "result__item--result";
                                }

                                return (
                                    <div key={indexAnswer}>
                                        <input type="radio" disabled checked={checked} />
                                        <label className={className}>
                                            {answer}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            )}

            {dataInfo && (
                <Link to={`/quiz/${dataInfo.id}`}>
                    <button>Làm lại</button>
                </Link>

            )}
        </>
    )
}

export default Result;