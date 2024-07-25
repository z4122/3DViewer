'use client';

import Image from 'next/image';
import { Language } from './language';
import Settings from './settings';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function Title() {
  const { t } = useTranslation('common');
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex justify-between pb-4 pe-4 ps-4 pt-4 bg-black">
      <Image
        alt={'logo'}
        src={'/logo.svg'}
        className="h-10 w-32"
        width={128}
        height={40}
      />
      <div className="flex items-center gap-4 align-middle text-base text-neutral-500">
        <Link className="cursor-pointer" href="/">
          {t('product')}
        </Link>
        <Link className="cursor-pointer" href="/pricing">
          {t('pricing')}
        </Link>
        <Link className="cursor-pointer" href="/blog">
          {t('blog')}
        </Link>
        <Link className="cursor-pointer" href="/community">
          {t('community')}
        </Link>
        <Language />
        <a
          className="cursor-pointer"
          href="https://github.com/z4122/3DViewer"
        >
          <Image
            alt={'github'}
            src={'/github.svg'}
            className="h-5 w-5 bg-white"
            width={20}
            height={20}
          ></Image>
        </a>
        <Settings isOpen={settingsOpen} />
      </div>
    </div>
  );
}
