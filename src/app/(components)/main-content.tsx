'use client';

import React, { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { GradientButton } from './button';
import { RollingImages } from './rolling-images';
import { ThreeViewer } from './3d-viewer';
import { FooterArea } from './footer-area';

export function MainContent() {
  const { t } = useTranslation('common');

  const [open3DViewer, setOpen3DViewer] = useState(false);
  const [glbUrl, setGLBUrl] = useState('');

  const handleOpen3DViewer = useCallback((url: string) => {
    setOpen3DViewer(true);
    setGLBUrl(url);
  }, []);


  return (
    <div className={'w-full flex flex-grow justify-evenly overflow-hidden bg-black'}>
      <div className="w-full flex flex-1 flex-col relative">
        <div className={'flex justify-start gap-3 ml-5'}>
          <GradientButton className={'h-8 text-black'} content={t('create')} initColor={'#FFFFFF'} endColor={'#FFFFFF'} />

          <GradientButton className={'h-8'} content={t('my_models')} />

          <GradientButton className={'h-8'} content={t('favorite')} />
        </div>

        <div className={'flex flex-col flex-grow'}>
          <RollingImages onOpenViewer={handleOpen3DViewer} />

          <RollingImages inverse={true} onOpenViewer={handleOpen3DViewer} />

          <RollingImages onOpenViewer={handleOpen3DViewer} />
        </div>

        <FooterArea />

        {open3DViewer && <ThreeViewer style={{ width: '100%', height: '100%' }} handleClose={() => { setOpen3DViewer(false); }} glbFileUrl={glbUrl} />}
      </div>
    </div>
  );
}
