import react from "react";
import { useState } from "react/cjs/react.development";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc, collection } from "firebase/firestore";

const Create = () => {
    const [name, setName] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [testsDescription, setTestsDescription] = useState('');
    const [testsPre, setTestsPre] = useState('');
    const [testsAfter, setTestsAfter] = useState('');
    const [testsExpected, setTestsExpected] = useState('');

    const createExercise = async () => {
        const docRef = doc(collection(db, "exercises"));
        await setDoc(doc(db, "exercises", docRef.id), {
            "uid": docRef.id,
            "name": name,
            "description": description,
            "author_uid": auth.currentUser.uid,
            "author": auth.currentUser.displayName,
            "placeholder": placeholder,
            "instructions": instructions,
            "testsDescription": testsDescription,
            "testsPre": testsPre,
            "testsAfter": testsAfter,
            "testsExpected": testsExpected
        });
    };

    const onSubmit = (e) => {
        e.preventDefault(e);
        createExercise();
        return (
            <h1>Exercise created!</h1>
        );
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const onPlaceholderChange = (e) => {
        setPlaceholder(e.target.value);
    };

    const onInstructionsChange = (e) => {
        setInstructions(e.target.value);
    };

    const onTestsDescriptionChange = (e) => {
        setTestsDescription(e.target.value);
    };

    const onTestsPreChange = (e) => {
        setTestsPre(e.target.value);
    };

    const onTestsAfterChange = (e) => {
        setTestsAfter(e.target.value);
    };
    
    const onTestsExpectedChange = (e) => {
        setTestsExpected(e.target.value);
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="containerBig">
                <h1>Create new exercise</h1>
                <div className="flex justify-center">
                    <form onSubmit={onSubmit} className="width-300">
                        <p>Name:</p>
                        <input value={name} onChange={onNameChange} required/>
                        <p>Description:</p>
                        <input value={description} onChange={onDescriptionChange} required/>
                        <p>Placeholder:</p>
                        <textarea value={placeholder} onChange={onPlaceholderChange} required/>
                        <p>Instructions:</p>
                        <input value={instructions} onChange={onInstructionsChange} required/>
                        <p>Tests description:</p>
                        <input value={testsDescription} onChange={onTestsDescriptionChange} required/>
                        <p>Tests pre:</p>
                        <input value={testsPre} onChange={onTestsPreChange} required/>
                        <p>Tests after:</p>
                        <input value={testsAfter} onChange={onTestsAfterChange} required/>
                        <p>Tests expected output:</p>
                        <input value={testsExpected} onChange={onTestsExpectedChange} required/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
