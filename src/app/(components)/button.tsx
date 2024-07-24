import styled from "@mui/material/styles/styled";

type ButtonProps = {
  content: string
  className?: string
  initColor?: string,
  endColor?: string,
}

const GradientButtonWrapper = styled('div')<{endColor: string}>(({ endColor }) => ({
  display: 'flex',
  background: 'transparent',
  height: '100%',
  padding: '0 30px',
  position: 'relative',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1, 
  borderRadius: '20px',

  '&:hover': {
    // color: '#FFFFFF',
    cursor: 'pointer',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%', 
    height: '100%',
    background: `linear-gradient(90deg, ${endColor} 50%, ${endColor} 50%)`,
    transform: 'translateX(-100%)', 
    transition: 'transform 0.3s ease-in-out',
    zIndex: -1,
    borderRadius: '20px', 
  },
  '&:hover::before': {
    transform: 'translateX(-50%)',
  },
}));

export function GradientButton(props: ButtonProps) {
  const {content, className, initColor = '#202020', endColor = '#404040 '} = props

  return (
  <div style={{ background: initColor, borderRadius: '30px' }} className={className} >
    <GradientButtonWrapper endColor={endColor}>{content}</GradientButtonWrapper>
  </div>
  );
}