import React, { useCallback, useState } from 'react';

type ImageProps = {
  onOpenViewer: (url: string) => void
  image: string;
  glb: string
};

export function CustomizeImage(props: ImageProps) {
  const { image, glb, onOpenViewer } = props;

  const [hover, setHover] = useState(false);

  const onClick = useCallback(() => {
    setHover(false)
    onOpenViewer(glb)
  },[])

  return (
    <div
      className={`flex bg-white relative w-48 h-48 ${hover ? 'cursor-pointer' : ''}`} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
    >
      <div
        className="w-48 h-48 absolute bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          transition: 'transform 0.1s ease-in-out', // 添加平滑过渡效果
          transform: hover ? 'scale(1.1)' : 'scale(1)' // 根据hover状态放大或保持原样
        }}
      />
      <div
        className={`w-48 h-24 rounded-lg mt-7 ${hover ? 'bg-gray-300' : 'bg-white'}`}
      ></div>
    </div>
  );
}