import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { auth } from "../firebase/firebase.js";

const Exercises = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
            setData(doc.data());
        });     
    }, []);

    return (
        <div className="flex justify-center mt-10">
            <div className="container">
                <h1>Exercises</h1>
                <NavLink className="w-full flex" to="1">           
                    <div className="w-full flex items-center border-t-2 m-2 p-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-lg">Exercise 1</h3>
                            <h4>Easy</h4>
                        </div>
                        <div className="ml-auto font-mono">
                            {data.e1 == "true" ? <p>1/1</p> : <p>0/1</p>}
                        </div>
                    </div>
                </NavLink>
                <NavLink className="w-full flex" to="2">           
                    <div className="w-full flex items-center border-t-2 m-2 p-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-lg">Exercise 2</h3>
                            <h4>Medium</h4>
                        </div>
                        <div className="ml-auto font-mono">
                            {data.e2 == "true" ? <p>1/1</p> : <p>0/1</p>}
                        </div>
                    </div>
                </NavLink>
                <NavLink className="w-full flex" to="3">           
                    <div className="w-full flex items-center border-t-2 m-2 p-4">
                        <div className="flex-shrink-0">
                            <h3 className="text-lg">Exercise 3</h3>
                            <h4>Hard</h4>
                        </div>
                        <div className="ml-auto font-mono">
                            {data.e3 == "true" ? <p>1/1</p> : <p>0/1</p>}
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Exercises;