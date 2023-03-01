import {Box, Button, Inline, Text} from '@sanity/ui'
import {EditorLayout} from './types'
import * as React from 'react'

interface LayoutsPickerProps {
  layouts?: EditorLayout[]
  activeLayout?: EditorLayout
  disabled: boolean
  setActiveLayout?: (layout: EditorLayout) => void
}

const LayoutsPicker: React.FC<LayoutsPickerProps> = (props) => {
  const {layouts, activeLayout, disabled, setActiveLayout} = props
  if (
    !props.layouts?.length ||
    props.layouts.length < 2 ||
    !props.activeLayout ||
    !props.setActiveLayout
  ) {
    return null
  }
  return (
    <>
      <Box>
        <Text>Choose layout</Text>
      </Box>
      <Inline space={3}>
        {layouts?.map((layout, i) => (
          <Button
            key={layout.name || layout.title || `${i}-layout`}
            mode={activeLayout?.name === layout.name ? 'default' : 'ghost'}
            tone={activeLayout?.name === layout.name ? 'positive' : 'default'}
            text={layout.title || layout.name}
            onClick={() => (setActiveLayout ? setActiveLayout(layout) : null)}
            disabled={disabled}
          />
        ))}
      </Inline>
    </>
  )
}

export default LayoutsPicker
