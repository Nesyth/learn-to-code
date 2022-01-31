import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebase/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useLocation } from 'react-router-dom';
import Comments from './comments/Comments.js';
import Placeholder from './Placeholder.js';
import Tests from './tests/Tests.js';
import Instructions from './Instructions.js';

const Exercise = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');
    const [code, setCode] = useState(``);
    const [tests, setTests] = useState('');
    const [clicked, setClicked] = useState(false);

    const location = useLocation();

    useEffect(async () => {
        const docRef = doc(db, "exercises", getCurrentPath());
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setClicked(false);   
        }, 1000);
    }, [clicked]);

    useEffect(() => {
        if (data) {
            const dataTests = {
                description: data.testsDescription,
                pre: data.testsPre,
                after: data.testsAfter,
                expected: data.testsExpected
            }
            setTests(dataTests);
            setCode(data.placeholder);
            setLoading(false);
        }
    }, [data]);

    const getCurrentPath = () => {
        const pathTarget = location.pathname;
        const pathLength = pathTarget.lastIndexOf('/');
        const pathFinal = pathTarget.substring(pathLength + 1);
        return pathFinal;
    };

    const testsPassed = () => {
        const path = getCurrentPath();
        setDoc(doc(db, "users", auth.currentUser.uid, "exercises", getCurrentPath()), {
            done: true
        });
    };

    const onValueChange = (newValue) => {
        setCode(newValue);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setClicked(true);
    };

    return (
        <div className="h-full">
            {!loading ? <>
                {data ? <>
                    <div className="grid grid-cols-2 h-1/2">
                        <div>
                            <Placeholder codeParent={code} onValueChange={onValueChange}/>
                        </div>
                        <div className="m-4">
                            <form type="submit">
                                <h1 className="text-center">Instructions</h1>
                                    <Instructions textParent={data.instructions}/>
                                <h1 className="text-center mt-16">Response</h1>
                                    <Tests data={tests} code={code} onSubmit={clicked} testsPassed={testsPassed}/>
                                <button className="mt-16" onClick={onSubmit}>Submit</button> 
                            </form>
                       </div>
                        </div>
                        <div>
                            <Comments/>
                        </div>
                </> : null}
            </> : null}
        </div>
    )
}

export default Exercise;