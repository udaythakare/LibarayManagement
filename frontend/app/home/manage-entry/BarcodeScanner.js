'use client'
import { sendSS } from '@/actions/studentAction';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const BarcodeScanner = () => {
  const webcamRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);

  const startWebcam = () => {
    setIsWebcamOn(true);
  };

  const takeScreenshot = async() => {
    // Take screenshot after 3 seconds
    const screenshot = webcamRef.current.getScreenshot();
    console.log(screenshot, 'this is screenshot')
    // Send the screenshot data to the backend
    if (screenshot) {
      // fetch(process.env.NEXT_PUBLIC_SERVER_NAME + 'addEntry', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ screenshotData: 'hi' }),
      // });
      const isSent = await sendSS(screenshot)
      console.log(isSent)
      alert(isSent)
    }
    // Close the webcam after taking the screenshot
    setIsWebcamOn(false);
  };

  return (
    <div>
      {!isWebcamOn && (
        <button onClick={startWebcam}>Start Webcam</button>
      )}
      {isWebcamOn && (
        <div>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button onClick={takeScreenshot}>Take Screenshot</button>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
