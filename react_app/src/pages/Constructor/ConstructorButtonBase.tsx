import * as React from 'react'
import { useDispatch } from 'react-redux';

import { Button, Menu, MenuItem, MenuItemClasses, MenuItemProps, MenuProps, SxProps, Typography } from "@mui/material";

import { Question } from './Models/Models'
import { CONSTRUCTOR_ADD_BLANK_QUESTION, CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION } from './Reducer/ConstructorReducerTypes'
import { REGISTER_EDITOR_SET_REGISTER_ID } from "./Reducer/RegisterEditorTypes"
import { HtmlTooltipViewerButton } from '../Common/HtmlTooltip'

export enum ButtonTypes { add = "add", content = "content", addParent = "addParent" }

interface iStyling {
    width: string;
    height: string;
}

interface Props {
    //parentRegister?: Question;
    parentRegister?: string;
    type?: string;
    children?: string;
    styling?: iStyling;
    sxProps?: SxProps;
}

interface OnClickProps {
    type: ButtonTypes
}

export default function ConstructorButtonBase({ parentRegister, type, children, styling, sxProps }: Props) {

    const dispatch = useDispatch()

    const [useToolTip, setUseToolTip] = React.useState(true);
    const [parentRegView, setParentRegView] = React.useState(new Question())

    let parentReg: Question;

    React.useEffect(() => {
        let parentReg: Question;
        // if (type === ButtonTypes.addParent || type === ButtonTypes.add) {
        //     setUseToolTip(false);
        // }
        if (parentRegister !== undefined) {
            parentReg = Object.assign(new Question(), JSON.parse(parentRegister));
            setParentRegView(parentReg)
        }
    }, [])

    const onClick = () => {
        let parentReg: Question;
        switch (type) {
            case ButtonTypes.add: {
                parentReg = Object.assign(new Question(), JSON.parse(parentRegister));
                dispatch({ type: CONSTRUCTOR_ADD_BLANK_QUESTION, payload: parentReg.id.string })
                break;
            }
            case ButtonTypes.content: {
                parentReg = Object.assign(new Question(), JSON.parse(parentRegister));
                dispatch({ type: REGISTER_EDITOR_SET_REGISTER_ID, payload: parentReg.id.string })
                break;
            }
            case ButtonTypes.addParent: {
                dispatch({ type: CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION })
                break;
            }
            default: break;
        }
    }

    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : null,
        );
        event.stopPropagation();
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <div style={{ margin: 5 + "px", width: "fit-content" }} onContextMenu={handleContextMenu}>
            {useToolTip ?
                (
                    <HtmlTooltipViewerButton title={
                        (type == ButtonTypes.add || type == ButtonTypes.addParent) ? (
                            <>
                                <Typography variant="body2">
                                    *Добавить*
                                </Typography>
                            </>
                        ) : (
                        <>
                            <Typography variant="body2">
                                {parentRegView.text}
                            </Typography>
                            <Typography variant="body2">
                                {parentRegView.subText}
                            </Typography>
                        </>)

                    }>

                        <Button variant="contained" style={styling} sx={sxProps} onClick={onClick}>
                            {children}
                        </Button>
                    </HtmlTooltipViewerButton>
                )
                :
                <Button variant="contained" style={styling} sx={sxProps} onClick={onClick}>
                    {children}
                </Button>
            }
            <Menu
                transitionDuration={100}
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleClose}>ViewBoba</MenuItem>
            </Menu>
        </div>

    );
}