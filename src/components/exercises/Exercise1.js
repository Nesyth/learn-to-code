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
import Comments from './comments/Comments.js';

const codeExample = 
`// sample use - do not modify
// const a = 5;
// const b = 10;

function sum(a, b) {
    // write your code here
}

// sample use - do not modify
// console.log(sum(a, b));`;

const Exercise1 = () => {
    const [response, setResponse] = useState();
    const [code, setCode] = useState(codeExample);
    const [t1, setT1] = useState(null);

    useEffect(() => {
        if (t1 == true) {
            updateDoc(doc(db, "users", auth.currentUser.uid), {
                "e1": "true"
            });
        }
    }, [t1]);

    const codeClean = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').replace(/(\r\n|\n|\r)/gm, ''); // remove js comments, newlines
    const codePre = "const a = 5; const b = 10;"
    const codeAfter = "console.log(sum(a, b));";

    const test1 = () => {
        const codeT1 = "console.log(sum(4, -10));"
        const getFetch = async () => {
            try {
                const res = await fetch(`https://34.134.107.102/api/${codePre}${codeClean}${codeT1}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                });
                const data = await res.json();

                if (data == -6) {
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
                const res = await fetch(`https://34.134.107.102/api/${codePre}${codeClean}${codeAfter}`, {
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
        <div className="h-full">
            <div className="grid grid-cols-2 h-1/2">
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
                    <h2>Complete the <b>function sum(a, b)</b> such that it returns the sum of <b>a</b> and <b>b</b>.</h2>
                    <h1 className="text-center mt-16">Tests</h1>
                    <h2 className="flex items-center">1: function sum(a, b) works for negative numbers {t1 == null ? null : <>{t1 ? <FiCheck/> : <FiX/>}</>}</h2>
                    <h2 className="flex items-center">2: function sum(a, b) adds two variables {t1 == null ? null : <>{t1 ? <FiCheck/> : <FiX/>}</>}</h2>
                    <h1 className="text-center mt-16">Response</h1>
                    <h2>{response ? response : "Empty"}</h2>
                    <button className="mt-16" type="submit" onClick={onSubmit}>Submit</button>
                    {!t1 ? null : <NavLink to="../2"><button type="submit">Next exercise!</button></NavLink>}
                </div>
            </div>
            <div>
                <Comments/>
            </div>
        </div>

    )
}

export default Exercise1;