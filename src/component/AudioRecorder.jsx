"use client";
import { useRef, useState } from "react";

export default function AudioRecorder() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [audioURL, setAudioURL] = useState(null);
  const [X, setX] = useState(null);
  const [Y, setY] = useState(null);
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      console.log(e.data);
      chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
      chunksRef.current = [];
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  return (
    <>
      <div
        className="border border-black p-1 w-[300px] h-[250px]"
        onMouseEnter={(e) => {
          setX(e.clientX);
          setY(e.clientY);
        }}
        onMouseLeave={() => {
          setX(null);
          setY(null);
        }}
      >
        Hover
      </div>
      {X && Y && (
        <div className={`fixed top-${Y} left-${X}`}>This is the tooltip</div>
      )}
    </>
  );
}
