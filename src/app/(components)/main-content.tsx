'use client';

import React, { SetStateAction, useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { GradientButton } from './button';
import { RollingImages } from './rolling-images';
import { classNames } from '../utils/common';

export function MainContent() {
  const { t } = useTranslation('common');

  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
    const onTextChanged = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setText(event.target.value);
    },
    []
  );

  return (
    <div className={'w-full flex flex-grow justify-evenly overflow-hidden bg-black'}>
      <div className="w-full flex flex-1 flex-col">
        <div className={'flex justify-start gap-3 ml-5'}>
          <GradientButton className={'h-8 text-black'} content={"Create"} initColor={'#FFFFFF'} endColor={'#FFFFFF'}/>

          <GradientButton className={'h-8'} content={"My Models"}/>

          <GradientButton className={'h-8'} content={"Favorite"}/>  
        </div>

        <div className={'flex flex-col flex-grow'}>
          <RollingImages />

          <RollingImages inverse={true}/>

          <RollingImages />
        </div>

        <div className={'flex flex-row w-full justify-center items-center  mb-14'}>
          <textarea
            className={classNames(
              'overflow-hidden w-96 resize-none rounded-xl bg-gray-600 py-3 px-4 text-white focus:outline-none',
              text === '' ? 'text-gray-400' : ''
            )}
            wrap='off'
            rows={1}
            value={text === '' && !focused ? t('prompt_tips') : text}
            onChange={onTextChanged}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setText('');
              }
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          ></textarea>

          <div className={'flex flex-row justify-center items-center ml-4 p relative'} >
            <GradientButton className={'w-36 h-12 p z-10 text-black'} content={"Create"} initColor={'#F8CF00'} endColor={'#FFE872'}/>
            <GradientButton className={'w-40 h-12 p absolute left-24 z-2 ml-2'} content={"Popcorn"} initColor={'#BC4DDE'} endColor={'#D970FA'}/>
          </div>
        </div>
      </div>
    </div>
  );
}
