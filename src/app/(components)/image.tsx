import React, { useState } from 'react';

type ImageProps = {
  src: string;
};

export function CustomizeImage(props: ImageProps) {
  const { src } = props;

  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex bg-white relative w-24 h-24"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="w-24 h-24 absolute bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div
        className={`w-24 h-12 rounded-lg mt-7 ${hover ? 'bg-gray-300' : 'bg-white'}`}
      ></div>
    </div>
  );
}