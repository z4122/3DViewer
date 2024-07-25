import React, { useEffect, useState } from 'react'
import { Accordion } from './accordion'
import { ThreeViewerIcon } from './icons/viewer'
import { ClosableDialog } from './closable-dialog'
import { t } from 'i18next'

type Props = {
  content: React.ReactNode
  open: boolean
  style?: React.CSSProperties
}

export function PopOverAccordion(props: Props) {
  const { content, open, style } = props

  const handleClose = () => { }

  return (
    <ClosableDialog
      style={{
        position: 'absolute',
        top: '30%',
        right: '16px',
        width: '300px',
        margin: 0,
        backgroundColor: '#111111',
        borderRadius: '8px',
        ...style
      }}
      open={open}
      handleClose={handleClose}
    >
      <Accordion
        content={content}
        summaryContent={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              justifyContent: 'center',
              overflow: 'hidden',
              gap: '8px',
              margin: '4px 0',
            }}
          >
            {<ThreeViewerIcon />}
            {t('attribute_panel:attribute')}
          </div>
        }
        summaryStyle={{
          padding: '0 24px',
          borderBottom: '1px solid var(--Grey-200)',
        }}
      ></Accordion>
    </ClosableDialog>
  )
}
