import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { onSnapshot, query, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

const Exercises = () => {
    const [data, setData] = useState('');
    const [exercises, setExercises] = useState('');

    useEffect(async () => {
        setExercises('');

        const q = query(collection(db, "exercises"));
        const querySnapshot2 = await getDocs(q);
        querySnapshot2.forEach((doc) => {
            setExercises((exercises) => ([...exercises, doc.data()]));
        });
    }, []);

    useEffect(() => {
        const q = query(collection(db, "users", auth.currentUser.uid, "exercises"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setData((data) => [...data, doc.id]);
            });
        });
        console.log(data)
    }, []);

    const isMatch = (e) => {
        let isTrue = false;
        if (data) {
            data.forEach((d) => {
                if (e.uid == d.toString()) {
                    isTrue = true;
                }
            })
        }
        return isTrue;
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="container">
                <h1>Exercises</h1>
                {exercises ? <>
                    {exercises.map((e, i) => (
                        <NavLink className="w-full flex" to={e.uid} key={i}>
                            <div className="w-full flex items-center border-t-2 m-2 p-4">
                                <div className="flex-shrink-0">
                                    <h3 className="text-lg">{e.name}</h3>
                                    <h4>{e.description}</h4>
                                </div>
                                <div className="ml-auto font-mono">
                                    {isMatch(e) == true ? <p>1/1</p> : <p>0/1</p>}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </> : null}
                <NavLink className="w-full flex" to="create">           
                    <div className="w-full flex items-center border-t-2 ml-2 mr-2 pt-4 justify-center">
                        <h3 className="text-lg">Create new..</h3>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Exercises;