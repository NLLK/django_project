import { Question, Questionnaire } from "../Models/Models";

export function ModifyQuestionnaire(origin: string, element: string): Questionnaire{

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(origin))

    let elementQ: Question = new Question()
    Object.assign(elementQ, JSON.parse(element))

    originQ.modifyQuestionnaire(elementQ)
    
    return originQ;

}