import React from 'react'
import { Accordion as MaterialAccordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { DropdownArrowIcon } from './icons/arrow-down'

type AccordionProps = {
  content: React.ReactNode
  summaryContent: React.ReactNode
  style?: React.CSSProperties
  summaryStyle?: React.CSSProperties
  iconStyle?: React.CSSProperties
}

export function Accordion(props: AccordionProps) {
  const { content, summaryContent, style, summaryStyle, iconStyle } = props

  return (
    <MaterialAccordion
      style={{
        backgroundColor: 'var(--Background-Middle)',
        color: 'var(--white)',
        boxShadow: 'none',
        width: '100%',
        ...style,
      }}
      sx={{
        '&:before': {
          display: 'none',
        },
      }}
      elevation={0}
      disableGutters={true}
      defaultExpanded={true}
    >
      <AccordionSummary
        sx={{ padding: '0', ...summaryStyle }}
        expandIcon={<DropdownArrowIcon style={{ color: 'var(--Grey-800)', ...iconStyle }} />}
      >
        {summaryContent}
      </AccordionSummary>
      <AccordionDetails style={{ padding: '0' }}>{content}</AccordionDetails>
    </MaterialAccordion>
  )
}
