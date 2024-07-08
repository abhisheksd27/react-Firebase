// FileUpload.js

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

const FileUpload = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileURL, setFileURL] = useState('');

  const submitImg = async () => {
    if (!fileUpload) {
      return;
    }
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      const downloadURL = await getDownloadURL(filesFolderRef);
      setFileURL(downloadURL);
    //   console.log('File available at', downloadURL);
    } catch (error) {
      console.error(error);
    }
  };

  const isImageFile = (fileName) => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(fileName);
  };

  return (
    <div>
      <input type='file' onChange={(e) => setFileUpload(e.target.files[0])} />
      <button onClick={submitImg}>Upload</button>
      {fileURL && (
        <div>
          <p>Uploaded File:</p>
          {isImageFile(fileUpload.name) ? (
            <img src={fileURL} alt='Uploaded file' style={{ maxWidth: '100%', maxHeight: '300px' }} />
          ) : (
            <a href={fileURL} target='_blank' rel='noopener noreferrer'>
              {fileUpload.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
