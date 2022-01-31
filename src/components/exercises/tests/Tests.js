import react, { useState } from "react";
import { FiCodesandbox } from "react-icons/fi";
import Test from "./Test";

const Tests = ({ data, code, onSubmit, testsPassed }) => {
    return (
        <>
            <Test 
                description={data.description} 
                pre={data.pre} 
                after={data.after} 
                expected={data.expected} 
                code={code}
                onSubmit={onSubmit}
                testsPassed={() => testsPassed()}
            />
        </>
    );
};

export default Tests;