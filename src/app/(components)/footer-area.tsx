import React, { SetStateAction, useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { GradientButton } from './button';
import { classNames, useIsMobile } from '../utils/common';

export function FooterArea() {
  const { t } = useTranslation('common');

  const isMobile = useIsMobile();
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const onTextChanged = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setText(event.target.value);
    }, []);

  return (
    <>
      {isMobile ?
        <div className='flex flex-col'>
          <textarea
            className={classNames(
              'overflow-hidden w-full resize-none rounded-xl bg-gray-600 py-3 px-4 text-white focus:outline-none',
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


          <div className={'flex flex-row justify-between items-center p relative w-full'} >
            <GradientButton className={'flex-1 h-12 p z-10 text-black'} content={t('create')} initColor={'#F8CF00'} endColor={'#FFE872'} />
            <GradientButton className={'flex-1 h-12 p z-2'} content={t('popcorn')} initColor={'#BC4DDE'} endColor={'#D970FA'} />
          </div>

        </div> : <div className={'flex flex-row w-full justify-center items-center  mb-14'}>
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
            <GradientButton className={'w-36 h-12 p z-10 text-black'} content={t('create')} initColor={'#F8CF00'} endColor={'#FFE872'} />
            <GradientButton className={'w-40 h-12 p absolute left-24 z-2 ml-2'} content={t('popcorn')} initColor={'#BC4DDE'} endColor={'#D970FA'} />
          </div>
        </div>}
    </>

  );
}