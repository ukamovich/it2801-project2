import React from 'react';
import { Label } from "./../styles/Form";

type InputProps = {
    label: string;
    type: string;
    defaultValue: string;
    callBack: (arg0: string, arg1: any) => void;
    keyName: string;
}

function UserInput(props: InputProps) {

    let onChange = (event: any) => {
        props.callBack(props.keyName, event.target.value)
    }

    return (
        <form>
            <Label htmlFor={props.label}>{props.label}</Label><br />
            <input type={props.type} name={props.label} defaultValue={props.defaultValue} onChange={onChange} />
        </form>
    )
}

export default UserInput;