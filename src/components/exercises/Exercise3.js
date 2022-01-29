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
// const str = 'abacddbec';

function findFirstNotRepeatedChar(str) {
    // write your code here
}

// sample use - do not modify
// console.log(findFirstNotRepeatedChar(str);`;

const Exercise2 = () => {
    const [response, setResponse] = useState();
    const [code, setCode] = useState(codeExample);
    const [t1, setT1] = useState(null);
    const [t2, setT2] = useState(null);

    useEffect(() => {
        if (t1 == true) {
            updateDoc(doc(db, "exercises", auth.currentUser.uid), {
                "e3": "true"
            });
        }
    }, [t1]);

    const codeClean = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').replace(/(\r\n|\n|\r)/gm, ''); // remove js comments, newlines
    const codePre = "const str = 'abacddbec';"
    const codeAfter = "console.log(findFirstNotRepeatedChar(str));";

    const test1 = () => {
        const codeT1 = "console.log(findFirstNotRepeatedChar('aabbccddeeffgg9j'));"
        const getFetch = async () => {
            try {
                const res = await fetch(`https://invertible-tree-333516.com/api/${codePre}${codeClean}${codeT1}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                });
                const data = await res.json();

                if (data == '9') {
                    setT1(true);
                    console.log(data);
                } else {
                    setT1(false);
                    console.log(data);
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

                if (data == 'e') {
                    setT2(true);
                    console.log(data);
                } else {
                    setT2(false);
                    console.log(data);
                }

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
                <h2>Write a function called <b>findFirstNotRepeatedChar</b> that takes a string as a parameter and returns the first non-repeating element (letter or number) as the result of the function.</h2>
                <h1 className="text-center mt-16">Tests</h1>
                <h2 className="flex items-center">1: function findFirstNotRepeatedChar(str) works for numbers {t1 == null ? null : <>{t1 ? <FiCheck/> : <FiX/>}</>}</h2>
                <h2 className="flex items-center">2: function findFirstNotRepeatedChar(str) works for given string {t2 == null ? null : <>{t2 ? <FiCheck/> : <FiX/>}</>}</h2>
                <h1 className="text-center mt-16">Response</h1>
                <h2>{response ? response : "Empty"}</h2>
                <button className="mt-16" type="submit" onClick={onSubmit}>Submit</button>
                {!t1 ? null : <NavLink to="../3"><button type="submit">Next exercise!</button></NavLink>}
            </div>
        </div>
    )
}

export default Exercise2;