import { GlobalImages } from "../constants";
import Image from 'next/image';
import { classNames } from "../utils/common";
import { CustomizeImage } from "./image";

type RollingImagesProps = {
  inverse?: boolean;
};

function ImageRow({ images, inverse }: { images: string[]; inverse: boolean }) {
  return (
    <div className={classNames("flex space-x-16 group-hover:paused", inverse ? 'animate-loop-scroll-inverse' : 'animate-loop-scroll')}>
      {images.map((image, index) => (
        <CustomizeImage src={image} key={image}/>
      ))}
    </div>
  );
}

export function RollingImages(props: RollingImagesProps) {
  const { inverse = false } = props;

  return (
    <div className="relative flex flex-col flex-grow justify-center overflow-hidden bg-black overflow-hidden">
      <div className="flex overflow-hidden space-x-8 group">
        <ImageRow images={GlobalImages} inverse={inverse} />
        <ImageRow images={GlobalImages} inverse={inverse} aria-hidden="true" />
      </div>  
    </div>
  );
}