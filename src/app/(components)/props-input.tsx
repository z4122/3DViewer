import { styled } from '@mui/material'
import { ChangeEvent, useState, useRef, useEffect, useCallback } from 'react'

type Props = {
  name?: string
  value: string
  minValue?: number
  maxValue?: number
  icon?: React.ReactNode
  unit?: string
  onChange?: (value: number) => void
  style?: React.CSSProperties
  onInputEnter?: () => void
}

const InputWrapper = styled('input')<{
  hasIcon: boolean
  unitLength: number
}>(({ hasIcon, unitLength }) => ({
  verticalAlign: 'middle',
  width: '100%',
  height: '32px',
  lineHeight: '32px',
  color: '#e0e0e0',
  borderRadius: '8px',
  border: '1px solid #474747',
  background: '#333',
  paddingTop: '1px',
  paddingLeft: hasIcon ? '26px' : '10px',
  paddingRight: unitLength >= 2 ? '35px' : '19px',
  boxSizing: 'border-box',
  fontWeight: '400',
  fontSize: '14px',
  fontStyle: 'normal',

  '&:focus': {
    border: '1px solid #707070',
  },

  '&:focus-visible': {
    border: '1px solid #707070',
    outline: 'none',
  },
}))

export function PropAndInput(props: Props) {
  const {
    name,
    value,
    unit,
    icon,
    onChange,
    minValue = 0,
    maxValue,
    style,
    onInputEnter,
  } = props

  const [currentValue, setCurrentValue] = useState(value)
  const [lastNonEmptyValue, setLastNonEmptyValue] = useState(value)

  const unmountedRef = useRef(false)

  const inputElement = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setCurrentValue(value)

    if (value !== '') {
      setLastNonEmptyValue(value)
    }
  }, [value])

  const updateValue = useCallback(() => {
    let finalValue = currentValue

    if (currentValue === '') {
      finalValue = lastNonEmptyValue
    }

    if (finalValue !== value) {
      const finalFloatValue = parseFloat(finalValue)
      if (finalFloatValue < minValue) {
        onChange?.(minValue)
        setCurrentValue(minValue.toFixed(2))
        setLastNonEmptyValue(minValue.toFixed(2))
      } else if (maxValue !== undefined && finalFloatValue > maxValue) {
        onChange?.(maxValue)
        setCurrentValue(maxValue.toFixed(2))
        setLastNonEmptyValue(maxValue.toFixed(2))
      } else {
        onChange?.(finalFloatValue)
        setCurrentValue(finalFloatValue.toFixed(2))
      }
    } else {
      setCurrentValue(finalValue)
    }
  }, [value, currentValue, lastNonEmptyValue])


  const onFocus = () => { }

  useEffect(() => {
    return () => {
      unmountedRef.current = true
    }
  }, [])

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 使用正则表达式判断输入是否只包含数字和小数点，并且不是空字符串或只包含一个小数点的字符串
    // 支持 .2 2. 2.2三种情况
    if (/^-?\d*(\.\d*)?$/.test(event.currentTarget.value) || event.currentTarget.value === '') {
      setCurrentValue(event.currentTarget.value)

      if (event.currentTarget.value) {
        setLastNonEmptyValue(event.currentTarget.value)
      }
    }
  }

  // 防止退格按键把canvas上的元素给删除掉
  const onInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // 如果Ctrl被按下, 阻止事件冒泡
      if (event.ctrlKey) {
        event.stopPropagation()
      }

      // 如果按下的删除键，阻止事件冒泡，仅仅能够删除当前文字
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.stopPropagation()
      }

      // 如果按下的是z键，直接返回，目前没做输入框的stack
      if (event.key === 'z') {
        return
      }

      if (event.key === 'Enter') {
        updateValue()
        onInputEnter?.()
      }
    },
    [updateValue]
  )

  return (
    <div
      style={{
        position: 'relative', // 设置为相对定位
        width: '128px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '22px',
        overflow: 'hidden',
        ...style,
      }}
    >
      {name && (
        <div
          style={{
            color: '#ccc',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '16px',
            marginBottom: '4px',
          }}
        >
          {name}
        </div>
      )}

      <div style={{ display: 'flex', position: 'relative', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            userSelect: 'none',
            width: '20px',
            height: '20px',
          }}
        >
          {icon}
        </div>

        <InputWrapper
          key={name}
          hasIcon={icon !== undefined}
          unitLength={unit?.length ?? 0}
          ref={inputElement}
          value={currentValue}
          onFocus={onFocus}
          onChange={onInputValueChange}
          onKeyDown={onInputKeyDown}
          onClick={(e) => {
            e.stopPropagation()
          }}
        ></InputWrapper>
        <span
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8a8a8a',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '22px',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {unit}
        </span>
      </div>

    </div>
  )
}
