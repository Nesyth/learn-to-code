import react, { useEffect, useState } from "react";
import { getDocs, collection, setDoc, doc, query, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { auth } from "../../../firebase/firebase";
import { useLocation } from 'react-router-dom';
import moment from "moment";
import Comment from "./Comment";

const Comments = () => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingComment, setLoadingComment] = useState(false);
    const location = useLocation();

    const getCurrentDate = () => {
        return moment().toString();
    };

    useEffect(async () => {
        let unsubscribed = false;
      
        const q = query(collection(db, "exercises", getCurrentPath(), "comments"), orderBy("timestamp", "desc"));

        const querySnapshot = await getDocs(q)
            .then((querySnapshot) => {
                if (unsubscribed) return;
                
                const commentsHistory = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
        
                setComments(commentsHistory);
                setLoading(false);
                setLoadingComment(false);
            }).catch((err) => {
                if (unsubscribed) return;
    
                console.error("Failed to retrieve data", err);
            });
      
        return () => unsubscribed  = true;
    }, [loadingComment]);

    const createComment = async () => {
        const docRef = doc(collection(db, "exercises", getCurrentPath(), "comments"));
        await setDoc(doc(db, "exercises", getCurrentPath(), "comments", docRef.id), {
            "uid": docRef.id,
            "author_uid": auth.currentUser.uid,
            "author": auth.currentUser.displayName,
            "avatar": auth.currentUser.photoURL,
            "comment": newComment,
            "likes": 0,
            "timestamp": getCurrentDate()
        }).then(setLoadingComment(true));
    };

    const sendComment = async () => {
        if (newComment !== "") {
            await createComment();
            setNewComment("");
        }
    };

    const getCurrentPath = () => {
        const pathTarget = location.pathname;
        const pathLength = pathTarget.lastIndexOf('/');
        const pathFinal = pathTarget.substring(pathLength + 1);
        return pathFinal;
    };

    const addCommentClicked = (e) => {
        e.preventDefault();
        sendComment();
    };

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    const onDelete = async (uid) => {
        await deleteDoc(doc(db, "exercises", getCurrentPath(), "comments", uid))
            .then(setLoadingComment(true));
    };

    return (
        <div className="flex justify-center bg-white">
            <div className="flex-col text-center w-4/6">
                <h1 className="m-5">Comments section</h1>
                <div className="flex flex-col justify-content mb-10">
                    <form onSubmit={addCommentClicked}>
                        <textarea placeholder="Type in your comment.." className="w-full" onChange={handleChange} value={newComment}/>
                        <button type="submit">Submit</button>
                    </form>
                    {loading ? <h1>Loading..</h1> : 
                        <>
                            { comments.map((userData) => {
                                return (
                                    <ol key={userData.uid}>
                                        <Comment
                                            uid={userData.uid}
                                            author={userData.author}
                                            avatar={userData.avatar}
                                            comment={userData.comment}
                                            likes={userData.likes}
                                            timestamp={userData.timestamp}
                                            onDelete={onDelete}
                                        />
                                    </ol>
                                ); 
                            })}
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Comments;