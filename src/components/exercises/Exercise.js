import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContext.js';
import { FiX, FiCheck } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { auth, db } from "../../firebase/firebase.js";
import { updateDoc, doc, getDoc } from "firebase/firestore"; 
import { useLocation } from 'react-router-dom';
import Comments from './comments/Comments.js';
import Placeholder from './Placeholder.js';
import Tests from './tests/Tests.js';
import Instructions from './Instructions.js';

const Exercise = () => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState('');
    const [response, setResponse] = useState();
    const [code, setCode] = useState(``);
    
    const [t1, setT1] = useState(null);
    const location = useLocation();

    useEffect(async () => {
        const docRef = doc(db, "exercises", getCurrentPath());
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
    }, []);

    useEffect(() => {
        if (data) {
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

    const onValueChange = (newValue) => {
        console.log("yooo " + newValue);
        setCode(newValue);
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="h-full">
            {!loading ? <>
                {data ? <>
                    <div className="grid grid-cols-2 h-1/2">
                        <div>
                            <Placeholder codeParent={code} onValueChange={onValueChange}/>
                        </div>
                        <div className="m-4">
                            <h1 className="text-center">Instructions</h1>
                                <Instructions textParent={data.instructions}/>
                            <h1 className="text-center mt-16">Tests</h1>
                                <Tests/>
                            <h1 className="text-center mt-16">Response</h1>
                            <h2>{response ? response : "Empty"}</h2>
                            <button className="mt-16" type="submit" onClick={onSubmit}>Submit</button>
                            {!t1 ? null : <NavLink to="../2"><button type="submit">Next exercise!</button></NavLink>}
                        </div>
                    </div>
                    <div>
                        <Comments/>
                    </div>
                </> : <h2>Loading..</h2>}
            </> : <h2>Loading..</h2>}
        </div>
    )
}

export default Exercise;