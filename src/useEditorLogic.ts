import {EditorLayout, LayoutData} from './types'
import download from 'downloadjs'
import {toPng} from 'html-to-image'
import React, {useState, useRef, useCallback} from 'react'

import defaultLayout from './defaultLayout'
import {EditorProps} from './Editor'

function useEditorLogic({document, layouts, onSelect}: EditorProps) {
  const captureRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'error' | 'loading' | 'success'>('idle')
  const disabled = status === 'loading'
  const layoutsExist = layouts && layouts[0]?.component

  const [activeLayout, setActiveLayout] = useState<EditorLayout>(
    layoutsExist ? layouts[0] : defaultLayout,
  )

  const prepare = activeLayout.prepare ? activeLayout.prepare(document) : undefined
  const [data, setData] = useState<LayoutData>(onSelect && prepare ? prepare : {})

  const generateImage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!captureRef?.current) {
        console.error('Capture reference is missing.')
        return
      }
      try {
        setStatus('loading')
        const imgBase64 = await toPng(captureRef.current, {
          quality: 1,
          pixelRatio: 1,
        })
        setStatus('success')
        if (onSelect) {
          onSelect([
            {
              kind: 'base64',
              value: imgBase64,
              assetDocumentProps: {
                originalFilename: `OG Image - ${new Date(Date.now()).toISOString()}`,
                source: {
                  name: 'asset-source-ogimage',
                  id: 'asset-source-ogimage',
                },
              },
            },
          ])
        }
      } catch (error) {
        setStatus('error')
        console.error('Error generating image:', error)
      }
    },
    [onSelect],
  )

  const downloadImage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captureRef?.current) {
      console.error('Capture reference is missing.')
      return
    }
    try {
      setStatus('loading')
      const imgBase64 = await toPng(captureRef.current, {
        quality: 1,
        pixelRatio: 1,
      })
      setStatus('success')
      download(imgBase64, `OG Image - ${new Date(Date.now()).toISOString()}.png`)
    } catch (error) {
      setStatus('error')
      console.error('Error downloading image:', error)
    }
  }, [])

  return {
    activeLayout,
    setActiveLayout,
    disabled,
    generateImage,
    downloadImage,
    captureRef,
    data,
    setData,
  }
}

export default useEditorLogic
