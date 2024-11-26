import React, { useState, useEffect } from 'react';
import { poseInstructions } from '../../utils/data';
import { poseImages } from '../../utils/pose_images';
import './Instructions.css';

export default function Instructions({ currentPose }) {
    const [instructions, setInsntructions] = useState(poseInstructions);
    const [isPlaying, setIsPlaying] = useState(false); // To track if the speech is playing

    // Function to read instructions aloud
    const speakInstructions = (instructions) => {
        const speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US'; // Set language to English
        speech.text = instructions.join('. '); // Combine all instructions into one sentence
        speech.rate = 1; // Adjust speed of speech (1 is normal)
        speech.pitch = 1; // Adjust pitch (1 is normal)

        // Start speaking
        window.speechSynthesis.speak(speech);
    };

    // Function to stop the speech
    const stopSpeech = () => {
        window.speechSynthesis.cancel(); // Stops any ongoing speech
        setIsPlaying(false); // Update the state to indicate the speech is not playing
    };

    // Function to play the instructions
    const playSpeech = () => {
        if (instructions[currentPose]) {
            speakInstructions(instructions[currentPose]);
            setIsPlaying(true); // Update the state to indicate the speech is playing
        }
    };

    useEffect(() => {
        // When the currentPose changes, speak the instructions for that pose
        if (instructions[currentPose] && !isPlaying) {
            playSpeech();
        }
    }, [currentPose]);

    return (
        <div className="instructions-container">
            <ul className="instructions-list">
                {instructions[currentPose].map((instruction, index) => {
                    return (
                        <li key={index} className="instruction">
                            {instruction}
                        </li>
                    );
                })}
            </ul>
            <img 
                className="pose-demo-img"
                src={poseImages[currentPose]} 
                alt={currentPose} // Add alt text for accessibility
            />
            {/* Play Button */}
            {!isPlaying && (
                <button onClick={playSpeech} className="play-button">Play</button>
            )}
            {/* Stop Button */}
            {isPlaying && (
                <button onClick={stopSpeech} className="stop-button">Stop</button>
            )}
        </div>
    );
}
