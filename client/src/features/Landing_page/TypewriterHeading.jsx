import React, { useEffect, useState } from 'react';
import { Heading, Text } from '@chakra-ui/react';

const sentences = [
  "Transform Your Grades, Shape Your Future.",
  "Master Your GPA with Precision.",
  "Where Elite Students Thrive.",
];

const TypewriterHeading = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentSentence = sentences[currentSentenceIndex];
      const currentLength = displayedText.length;
      
      if (isDeleting) {
        if (currentLength > 0) {
          setDisplayedText(currentSentence.substring(0, currentLength - 1));
        } else {
          setIsDeleting(false);
          setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }
      } else {
        if (currentLength < currentSentence.length) {
          setDisplayedText(currentSentence.substring(0, currentLength + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const typingTimer = setTimeout(type, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [displayedText, isDeleting, currentSentenceIndex]);

  const getLastWordStyledText = (text) => {
    const words = text.split(' ');
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(' ')}{' '}
          <Text as="span" color="accentVar">
            {lastWord}
          </Text>
        </>
      );
    }
    return text;
  };

  return (
    <Heading as="h1" fontSize="clamp(2.2rem, 4vw, 4rem)">
      {getLastWordStyledText(displayedText)}
      <span className="cursor">|</span>
    </Heading>
  );
};

export default TypewriterHeading;
