import * as React from 'react'

import { Question } from "../Models/Models";
import DivWithCoords from "./DivWithCoords"
import ViewerButton from "./ViewerButton"

const X_DIV: number = 100;

// class Point {
//     x: number = 0;
//     y: number = 0;

//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
// }

export default function RegisterViewer(qFields: string): JSX.Element {
   
    if (qFields === '{}' || qFields === undefined) {
        return (
            <div>
            </div>
        )
    }
    console.log('regViewer',qFields)
    let fields: Array<Question> = JSON.parse(qFields)
    let returnPage: Array<JSX.Element> = [];

    fields.forEach(rootQuestion => {
        //console.log(rootQuestion)
        returnPage.push(RenderQuestion(rootQuestion))
    });

    return (
        <>{
            returnPage.map((item: JSX.Element, index: number) =>
                <div key={index}>{item}</div>
            )}
        </>
    )
}

function RenderQuestion(question: Question): JSX.Element {

    return (
        <div style={{ position: "relative"}}>
            <ViewerButton parentRegister = {JSON.stringify(question)} type="content">
                {question.id.string}
            </ViewerButton>
            {question.isQuestion ? 
            <div style={{ position: "relative", left: X_DIV + "px" }}>
                {
                    question.answersList.map((item: Question, index: number) => (
                        !item.isQuestion? 
                        <ViewerButton key={index} parentRegister = {JSON.stringify(item) } type="content">
                            {item.id.string}
                        </ViewerButton>
                        :
                        RenderQuestion(item)
                    ))
                }
                <ViewerButton type="add" parentRegister={JSON.stringify(question)}>+</ViewerButton>
            </div> : <></>}


        </div>
    )
} 