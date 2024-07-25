import { GlobalAssets } from '../constants';
import { classNames } from '../utils/common';
import { CustomizeImage } from './rolling-image';

type RollingImagesProps = {
  onOpenViewer: (url: string) => void;
  inverse?: boolean;
};

function ImageRow({ assets, inverse, onOpenViewer }: { assets: { image: string, glb: string }[], inverse: boolean, onOpenViewer: (url: string) => void }) {
  return (
    <div className={classNames('flex space-x-16 group-hover:paused', inverse ? 'animate-loop-scroll-inverse' : 'animate-loop-scroll')}>
      {assets.map((asset) => (
        <CustomizeImage image={asset.image} glb={asset.glb} key={asset.image} onOpenViewer={onOpenViewer} />
      ))}
    </div>
  );
}

export function RollingImages(props: RollingImagesProps) {
  const { onOpenViewer, inverse = false } = props;

  return (
    <div className="relative flex flex-col flex-grow justify-center overflow-hidden bg-black overflow-hidden">
      <div className="flex overflow-hidden space-x-8 group">
        <ImageRow assets={GlobalAssets} inverse={inverse} onOpenViewer={onOpenViewer} />
        <ImageRow assets={GlobalAssets} inverse={inverse} onOpenViewer={onOpenViewer} aria-hidden="true" />
      </div>
    </div>
  );
}