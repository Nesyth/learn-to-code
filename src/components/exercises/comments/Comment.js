import react, { useState, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useLocation } from 'react-router-dom';
import Moment from "react-moment";

const Comment = ({ uid, author, avatar, comment, likes, timestamp, onDelete }) => {
    const [likesUpdater, setLikesUpdater] = useState(likes);
    const [clicked, setClicked] = useState(false);
    const location = useLocation();

    const getCurrentPath = () => {
        const pathTarget = location.pathname;
        const pathLength = pathTarget.lastIndexOf('/');
        const pathFinal = pathTarget.substring(pathLength + 1);
        return pathFinal;
    };

    useEffect(() => {
        updateDoc(doc(db, "exercises", getCurrentPath(), "comments", uid), {
            likes: likesUpdater
        });
    }, [likesUpdater]);

    const likeUpdate = async (value) => {
        if (!clicked) {
            setLikesUpdater(likesUpdater => likesUpdater + parseInt(value));
            setClicked(true);
        }
    };

    return (
        <div className="flex flex-col w-full shadow-lg p-2 mt-2">
            <div>
                <div className="flex">
                    <div className="mr-2">
                        <div className="flex">
                            <img src={avatar} className="rounded-full border border-gray-100 shadow-sm w-12 h-12 object-cover"/>
                            <div className="ml-2">
                                <div>{author}</div>
                                <div className="text-sm font-light">
                                    <Moment fromNow="true">{timestamp}</Moment>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex m-auto justify-items-start align-baseline self-start">
                            <div className="text-lg">{comment}</div>
                        </div>
                    </div>
                    <div className="ml-auto mt-auto">
                        <p className="cursor-pointer" onClick={() => likeUpdate('1')}>+</p>
                        <div className="ml-auto font-mono">{likesUpdater}</div>
                        <p className="cursor-pointer" onClick={() => likeUpdate('-1')}>-</p>
                    </div>
                </div>
            </div>
            <hr className="m-2"/>
            <div className="mr-auto">
                <p className="cursor-pointer" onClick={() => onDelete(uid)}>*delete me*</p>
            </div>
        </div>
    );
}

export default Comment;