import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { FiX, FiCheck } from 'react-icons/fi';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { NavLink } from 'react-router-dom';
import { auth } from "../../firebase/firebase.js";
import { updateDoc, doc } from "firebase/firestore"; 
import { db } from "../../firebase/firebase.js";

const codeExample = 
`// sample use - do not modify
// const a = 10.5;
// const b = 5;

function multiply(a, b) {
    // write your code here
}

// sample use - do not modify
// console.log(mutiply(a, b));`;

const Exercise2 = () => {
    const [response, setResponse] = useState();
    const [code, setCode] = useState(codeExample);
    const [t1, setT1] = useState(null);

    useEffect(() => {
        if (t1 == true) {
            updateDoc(doc(db, "exercises", auth.currentUser.uid), {
                "e2": "true"
            });
        }
    }, [t1]);

    const codeClean = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').replace(/(\r\n|\n|\r)/gm, ''); // remove js comments, newlines
    const codePre = "const a = 10.5; const b = 5;"
    const codeAfter = "console.log(multiply(a, b));";

    const test1 = () => {
        const codeT1 = "console.log(multiply(4, -10));"
        const getFetch = async () => {
            try {
                const res = await fetch(`https://invertible-tree-333516.com/api/${codePre}${codeClean}${codeT1}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                });
                const data = await res.json();

                if (data == -40) {
                    setT1(true);
                } else {
                    setT1(false);
                }
            } catch(e) {
                console.error(e);
            }
        }
        getFetch();
    };

    const onSubmit = (e) => {
        e.preventDefault();

        test1();

        const getFetch = async () => {
            try {
                const res = await fetch(`https://invertible-tree-333516.com/api/${codePre}${codeClean}${codeAfter}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                });
                const data = await res.json();
                setResponse(data);
            } catch(e) {
                console.error(e);
                setResponse('Something went wrong :(');
            }
        }
        getFetch();
    }

    return (
        <div className="grid grid-cols-2">
            <div>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 18,
                        minHeight: '100vh',
                    }}
                />
            </div>
            <div className="m-4">
                <h1 className="text-center">Instructions</h1>
                <h2>This time complete <b>function multiply(a, b)</b> so it returns multiplication of <b>a</b> and <b>b</b>.</h2>
                <h1 className="text-center mt-16">Tests</h1>
                <h2 className="flex items-center">1: function multiply(a, b) works for negative numbers {t1 == null ? null : <>{t1 ? <FiCheck/> : <FiX/>}</>}</h2>
                <h2 className="flex items-center">2: function multiply(a, b) adds two variables {t1 == null ? null : <>{t1 ? <FiCheck/> : <FiX/>}</>}</h2>
                <h1 className="text-center mt-16">Response</h1>
                <h2>{response ? response : "Empty"}</h2>
                <button className="mt-16" type="submit" onClick={onSubmit}>Submit</button>
                {!t1 ? null : <NavLink to="../3"><button type="submit">Next exercise!</button></NavLink>}
            </div>
        </div>
    )
}

export default Exercise2;