import React, { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { auth, db } from "../../firebase/firebase.js";
import { updateDoc, doc, getDoc } from "firebase/firestore"; 
import { useLocation } from 'react-router-dom';
import Comments from './comments/Comments.js';
import Placeholder from './Placeholder.js';


const codeExample = 
`// sample use - do not modify
// const a = 5;
// const b = 10;

function sum(a, b) {
    // write your code here
}

// sample use - do not modify
// console.log(sum(a, b));`;

const Exercise = () => {
    const [data, setData] = useState('');
    const [response, setResponse] = useState();
    const [code, setCode] = useState('1');
    const [t1, setT1] = useState(null);
    const location = useLocation();

    useEffect(async () => {
        const docRef = doc(db, "exercises", getCurrentPath());
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
    }, []);

    const getCurrentPath = () => {
        const pathTarget = location.pathname;
        const pathLength = pathTarget.lastIndexOf('/');
        const pathFinal = pathTarget.substring(pathLength + 1);
        return pathFinal;
    };

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
                const res = await fetch(`https://invertibletree333516.com/api/${codePre}${codeClean}${codeT1}`, {
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
                const res = await fetch(`https://invertibletree333516.com/api/${codePre}${codeClean}${codeAfter}`, {
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

    const onChange = (code) => {
        setCode(code);
    };

    return (
        <div className="h-full">
            {data ? <>
                <div className="grid grid-cols-2 h-1/2">
                    <div>
                        <Placeholder codeExample={data.placeholder} onChange={onChange}/>
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
            </> : <h1 className="justify-center">Loading..</h1>}
        </div>
    )
}

export default Exercise;