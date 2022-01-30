import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { doc, onSnapshot, query, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

const Exercises = () => {
    const [data, setData] = useState('');
    const [exercises, setExercises] = useState('');

    useEffect(async () => {
        setExercises('');
        const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
            setData(doc.data());
        });

        const q = query(collection(db, "exercises"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setExercises((exercises) => ([...exercises, doc.data()]));
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
                {exercises ? <>
                    {exercises.map((e, i) => (
                        <NavLink className="w-full flex" to={e.uid} key={i}>  
                            <div className="w-full flex items-center border-t-2 m-2 p-4">
                                <div className="flex-shrink-0">
                                    <h3 className="text-lg">{e.name}</h3>
                                    <h4>{e.description}</h4>
                                </div>
                                <div className="ml-auto font-mono">
                                    {data.uid == "true" ? <p>1/1</p> : <p>0/1</p>}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </> : <h1>Loading..</h1>}
                <NavLink className="w-full flex" to="create">           
                    <div className="w-full flex items-center border-t-2 ml-2 mr-2 p-2">
                        <h3 className="text-lg">Create new..</h3>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Exercises;