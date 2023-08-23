import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {
  text: string[];
};

const Jumbotron: React.FC<Props> = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;
