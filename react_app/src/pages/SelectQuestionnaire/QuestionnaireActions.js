import axios from "axios";

export const GetQuestionnaireById = async (setQInfo, qId) => {
    const data = {
        'id': Number(qId)
    }
    let q = {
        id: 0,
        name: '',
        comment: '',
        fields: {}
    }
    await axios
        .post("/api/constructor/getQuestionnaire/", data)
        .then(response => {
            let dataR = response.data

            q.id = dataR.id
            q.name = dataR.name
            q.comment = dataR.comment
            q.fields = dataR.fields

            setQInfo(q)
            console.log('got questionnaire', q)
        })
    return q;
}

export const QuestionnaireTemplate = {
    id: 0,
    name: "",
    comment: "",
    fields: "{}"
}