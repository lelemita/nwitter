import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NweetFactory = ({ userObj }) => {
  const [hsl, setHSL] = useState("");
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const resp = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(resp.ref);
    }
    const nweetObj = {
      attachmentUrl,
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      background: hsl,
      displayName: userObj.displayName
    };
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet("");
    setAttachment("");
    document.querySelector("#attach-file").value = "";
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    if(theFile.size > 1024 * 1024) {
      alert("Attach file size maximumm is 1MB.");
      document.querySelector("#attach-file").value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = (event) => {
    setAttachment("");
    document.querySelector("#attach-file").value = "";
  };
  const getHSLfromIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    const num = Number(res.data.IPv4.split(".").join(""));
    setHSL(`hsl(${num % 361}, ${num % 81 + 20}%, ${num % 21 + 70}%)`);
  }

  useEffect(() => {
    getHSLfromIP();
    return () => {
      setHSL("");
    };
  }, []);

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>

      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="attachment"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
