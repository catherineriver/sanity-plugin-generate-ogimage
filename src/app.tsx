import {Box, Portal, ThemeProvider, studioTheme, useGlobalKeyDown} from '@sanity/ui'
import {SanityDocument, EditorLayout, DialogLabels} from './types'
import Editor from './Editor'
import React, {useState, useCallback} from 'react'
import isHotkey from 'is-hotkey'
import defaultLayout from "./defaultLayout";

interface SelectedAsset {
  [key: string]: any
}

type Props = {
  // User-provided. See README for how they set it up
  layouts: EditorLayout[]
  dialog?: DialogLabels
  // The props below are provided by Sanity
  /**
   * Exclusive to asset source dialogs.
   */
  onClose?: () => void
  /**
   * Exclusive to asset source dialogs.
   */
  onSelect?: () => void
  /**
   * Exclusive to studio tools.
   */
  tool?: string
  document?: SanityDocument
  selectedAssets?: SelectedAsset[]
  selectionType: 'single'
}
const MediaEditor: React.FC<Props> = (props) => {
  const {tool, onClose, dialog} = props

  const handleGlobalKeyDown = useCallback((event: KeyboardEvent) => {
    if (isHotkey('esc', event) && onClose) {
      onClose()
    }
  }, [])
  useGlobalKeyDown(handleGlobalKeyDown)

  let layouts = props.layouts?.filter(layout => layout.prepare && layout.component)

  if (!layouts?.length) {
    layouts = [defaultLayout]
  }
  if (!layouts?.length) {
    if (onClose) {
      onClose()
    }
    return null
  }

  const document: SanityDocument = props.document || {_id: 'unknown'}

  const editorProps = {
    document,
    layouts,
    onSelect: props.onSelect,
    onClose: props.onClose,
    dialog: dialog,
  }
  return (
    <ThemeProvider theme={studioTheme}>
      {tool ? (
        <Box
          style={{
            height: '100%',
            position: 'relative',
          }}
        >
          <Editor {...editorProps} />
        </Box>
      ) : (
        <Portal>
          <Box
            style={{
              bottom: 0,
              height: 'auto',
              left: 0,
              position: 'fixed',
              top: 0,
              width: '100%',
              zIndex: 10000,
            }}
          >
            <Editor {...editorProps} />
          </Box>
        </Portal>
      )}
    </ThemeProvider>
  )
}

export default MediaEditor
