import react from "react";
import { useState } from "react/cjs/react.development";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Create = () => {
    const [name, setName] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [testsDescription, setTestsDescription] = useState('');
    const [testsInput, setTestsInput] = useState('');
    const [testsOutput, setTestsOutput] = useState('');

    const createExercise = async () => {
        const docRef = doc(db, "exercises", name);
        await setDoc(doc(db, "exercises", name), {
            "uid": docRef.id,
            "name": name,
            "description": description,
            "author_uid": auth.currentUser.uid,
            "author": auth.currentUser.displayName,
            "placeholder": placeholder,
            "instructions": instructions,
            "testsDescription": testsDescription,
            "testsInput": testsInput,
            "testsOutput": testsOutput
        });
    };

    const onSubmit = (e) => {
        e.preventDefault(e);
        createExercise();
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

    const onTestsInputChange = (e) => {
        setTestsInput(e.target.value);
    };

    const onTestsOutputChange = (e) => {
        setTestsOutput(e.target.value);
    };
    
    return (
        <div className="flex justify-center mt-10">
            <div className="containerBig">
                <h1>Create new exercise</h1>
                <div className="flex justify-center">
                    <form onSubmit={onSubmit} className="width-300">
                        <p>ID:</p>
                        <input value={name} onChange={onNameChange} required/>
                        <p>Description:</p>
                        <input value={description} onChange={onDescriptionChange} required/>
                        <p>Placeholder:</p>
                        <textarea value={placeholder} onChange={onPlaceholderChange} required/>
                        <p>Instructions:</p>
                        <input value={instructions} onChange={onInstructionsChange} required/>
                        <p>Tests description:</p>
                        <input value={testsDescription} onChange={onTestsDescriptionChange} required/>
                        <p>Tests input:</p>
                        <input value={testsInput} onChange={onTestsInputChange} required/>
                        <p>Tests expected output:</p>
                        <input value={testsOutput} onChange={onTestsOutputChange} required/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
