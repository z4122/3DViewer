import { GlobalImages } from "../constants";
import Image from 'next/image';
import { classNames } from "../utils/common";

type RollingImagesProps = {
  inverse?: boolean;
};

function ImageRow({ images, inverse }: { images: string[]; inverse: boolean }) {
  return (
    <div className={classNames("flex space-x-16 group-hover:paused", inverse ? 'animate-loop-scroll-inverse' : 'animate-loop-scroll')}>
      {images.map((image, index) => (
        <img loading="lazy" src={image} className="max-w-none h-36" alt={"Image" + index} />
      ))}
    </div>
  );
}

export function RollingImages(props: RollingImagesProps) {
  const { inverse = false } = props;

  return (
    <div className="relative flex flex-col flex-grow justify-center overflow-hidden bg-black py-6 sm:py-12 overflow-hidden">
      <div className="flex overflow-hidden space-x-8 group">
        <ImageRow images={GlobalImages} inverse={inverse} />
        <ImageRow images={GlobalImages} inverse={inverse} aria-hidden="true" />
      </div>  
    </div>
  );
}