import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListAnswerById } from "../../services/answerService";
import { getListQuestion } from "../../services/questionService";

const Result = () => {
    const params = useParams();
    const [ dataResult, setDataResult ] = useState();

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
                    answer: objectAnswer.answers
                });
            }

            setDataResult(dataFinal);
        }

        fetchApi();
    }, [params.id]);

    return (
        <>
            <h2>Trang Result</h2>

            {dataResult && (
                <div className="result">
                    {dataResult.map((item, indexItem) => (
                        <div className="result__item" key={indexItem}>
                            <p>
                                Câu {indexItem + 1} : {item.question}
                            </p>

                            {item.answers.map((answer, indexAnswer) => {
                                let className = "";
                                let checked = false;

                                if(indexAnswer === item.answer) {
                                    checked = true;
                                    className = "result__item--selected";
                                }

                                if(indexAnswer === item.correctAnswer) {
                                    className = "result__item--selected";
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
        </>
    )
}

export default Result;