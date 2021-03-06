import { useState } from "react";

export const useArguments = () => {
    const [argCount, setArgCount] = useState(1); // 함수 인자의 개수
    const [argTypes, setArgTypes] = useState([{name:"", type:"string", description: ""}]); // 최소 1개의 인자

    const handleAddArg = () => {
        setArgCount(prev => prev + 1);
        setArgTypes(prev => [...prev, {name:"", type:"string", description: ""}]);
    }

    const handleRemoveArg = () => {
        if(argCount > 1) {
            setArgCount(prev => prev - 1);
            setArgTypes(prev => prev.slice(0, prev.length - 1));
        }
    }

    const handleArgTypes = (idx, obj) => {
        const newArr = [...argTypes];
        newArr[idx] = Object.assign(newArr[idx], obj);
        setArgTypes(newArr);
    }

    const checkArgs = () => {
        const check = argTypes.filter(el => el.name === "" || el.description === "");
        return check.length === 0;
    }

    return [argCount, argTypes, handleAddArg, handleRemoveArg, handleArgTypes, checkArgs];
}