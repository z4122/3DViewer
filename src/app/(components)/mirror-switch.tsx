import { Switch, styled } from '@mui/material';
import { useState, CSSProperties, ChangeEvent } from 'react';

const Wrapper = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(13px)',
      backgroundColor: '#242424 !important',
      '& + .MuiSwitch-track': {
        backgroundColor: '#B6F34F',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#242424',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
    backgroundColor: '#8a8a8a',
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#5c5c5c',
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export type SwitchProps = {
  checked: boolean;
  onChange: (checkd: boolean) => void;
  style?: CSSProperties;
};

export function MirrorSwitch(props: SwitchProps) {
  const { checked, onChange, style } = props;

  const [checkedState, setCheckedState] = useState(checked);

  const onSwichChanged = (event: ChangeEvent) => {
    const newState = (event.target as HTMLInputElement).checked;
    setCheckedState(newState);
    onChange(newState);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 12,
        ...style,
      }}
    >
      <Wrapper checked={checkedState} onChange={onSwichChanged} />
    </div>
  );
}