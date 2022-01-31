import react, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Test = ({ description, pre, after, expected, code, onSubmit, testsPassed }) => {
    const [passed, setPassed] = useState(false);

    useEffect(() => {
        if (onSubmit == true) {
            testMe();
        }
    }, [onSubmit]); 

    const testMe = () => {
        const getFetch = async () => {
            try {
                const codeClean = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').replace(/(\r\n|\n|\r)/gm, ''); // remove js comments, newlines
                const res = await fetch(`https://invertibletree333516.com/api/${pre}${codeClean}${after}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                });
                const data = await res.json();

                if (data == expected) {
                    setPassed(true);
                    testsPassed();
                }
            } catch(e) {
                console.error(e);
            }
        }
        getFetch();
    };

    return (
        <div>
            <p>Description: {description}</p>
            <p>Pre: {pre}</p>
            <p>After: {after}</p>
            <p>Expected: {expected}</p>
            <br></br>
            <p>Passed: {!passed ? "No" : "Yes!"}</p>
        </div>
    );
};

export default Test;