'use client';

import Image from 'next/image';
import { Language } from './language';
import Settings from './settings';
import { useState } from 'react';
import Link from 'next/link';

export function Title() {
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
          Product
        </Link>
        <Link className="cursor-pointer" href="/pricing">
          Pricing
        </Link>
        <Link className="cursor-pointer" href="/blog">
          Blog
        </Link>
        <Link className="cursor-pointer" href="/community">
          Community
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
