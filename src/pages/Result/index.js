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

            console.log(dataFinal);
        }

        fetchApi();
    }, []);

    return (
        <>
            <h2>Trang Result</h2>
        </>
    )
}

export default Result;