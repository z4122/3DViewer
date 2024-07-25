import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  PaperProps,
  styled,
} from '@mui/material';
import React from 'react';
import Draggable from 'react-draggable';
import { CloseIcon } from './icons/close';

type Props = {
  open: boolean
  title?: string
  handleClose: () => void
  style?: React.CSSProperties
  positionOffset?: { x: number | string; y: number | string }
  children?: React.ReactNode
  disableAutofocus?: boolean
}

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: 0,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps & any) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            fontSize: '24px',
            flex: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function PaperComponent(
  props: PaperProps & { offset: { x: number | string; y: number | string } }
) {
  // https://github.com/react-grid-layout/react-draggable/blob/v4.4.2/lib/DraggableCore.js#L159-L171
  const nodeRef = React.useRef(null);

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      positionOffset={props.offset}
      nodeRef={nodeRef}
    >
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
}

export function ClosableDialog(props: Props) {
  const { disableAutofocus, open, title, handleClose, style, positionOffset, children } = props;

  return (
    <DialogWrapper
      open={open}
      disableEnforceFocus
      disableAutoFocus={disableAutofocus}
      hideBackdrop
      sx={{ pointerEvents: 'none', padding: 0, margin: 0, maxWidth: '100%' }}
      // Dialog 接口没有提供扩展，无法传递额外参数
      // @ts-ignore
      PaperProps={{
        style: { pointerEvents: 'auto', ...style, padding: 0 },
        // @ts-ignore
        offset: positionOffset,
      }}
      // @ts-ignore
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      {title && (
        <BootstrapDialogTitle
          id="draggable-dialog-title"
          onClose={handleClose}
          style={{ cursor: 'move' }}
        >
          {title}
        </BootstrapDialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
    </DialogWrapper>
  );
}
