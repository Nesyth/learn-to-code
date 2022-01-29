import React, { useState } from "react";
import { useUserContext } from "../context/UserContext.js";
import { storage } from "../firebase/firebase.js";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Dashboard = () => {
  const { user } = useUserContext();
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  const [image, setImage] = useState();

  const changeHandler = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (isSelected) {
      const storageRef = ref(storage, 'profile/' + user.uid + '/' + Date.now() + '_' + selectedFile.name)
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on('state_changed',
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(user, {
              photoURL: downloadURL,
            })
            setImage(downloadURL);
            window.location.reload();
          })
      })
    };
  };

  return (
    <div className="flex mt-10 justify-center">
      <div className="container">
        <h1>Dashboard</h1>
        <img 
          className="inline object-cover w-64 h-64 mt-4 mb-2 rounded-full" 
          src={ image ? image : user.photoURL || "https://us.123rf.com/450wm/kritchanut/kritchanut1308/kritchanut130800064/21738699-zdj%C4%99cie-profilowe-cz%C5%82owiek-avatar-wektor.jpg?ver=6"}
          alt="Profile image"/>
        <h2>{user.displayName}</h2>
        <h2>{user.email}</h2>
        <form className="mt-10">
          <label>Choose a profile picture:</label>
          <input type="file"
          id="avatar" name="avatar"
          accept="image/png, image/jpeg" onChange={changeHandler}></input>
          <button type="submit" onClick={handleSubmission}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;