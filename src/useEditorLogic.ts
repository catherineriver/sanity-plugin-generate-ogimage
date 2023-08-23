import { EditorLayout, LayoutData } from './types'
import download from 'downloadjs'
import { toPng } from 'html-to-image'
import React, { useEffect, useState, useRef } from 'react'

import defaultLayout from './defaultLayout'
import { EditorProps } from './Editor'

function useEditorLogic({ document, layouts, onSelect }: EditorProps): {
  activeLayout: EditorLayout
  setActiveLayout: (newLayout: EditorLayout) => void
  disabled: boolean
  generateImage: (e: React.FormEvent) => void
  downloadImage: (e: React.FormEvent) => void
  captureRef?: React.RefObject<HTMLDivElement>;
  data: LayoutData
  setData: (newData: LayoutData) => void
} {
  const captureRef = useRef<HTMLDivElement>(null)

  const [status, setStatus] = useState<'idle' | 'error' | 'loading' | 'success'>('idle')
  const disabled = status === 'loading'
  const layoutsExist = layouts && layouts[0]?.component;

  const [activeLayout, setActiveLayout] = useState<EditorLayout>(
    layoutsExist ? layouts[0] : defaultLayout
  );
  // @ts-ignore
  const prepare = activeLayout.prepare(document);

  const [data, setData] = useState<LayoutData>(
    // Only asset sources (which include onSelect) should use the prepare function
    onSelect
      // @ts-ignore
      ? activeLayout.prepare(document)
      : // Studio tools should start with empty data
      {}
  )

  useEffect(() => {
    setData(prepare);
  }, [activeLayout])

  async function generateImage(e: React.FormEvent) {
    e.preventDefault()
    if (!captureRef?.current) {
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
      console.error(error)
    }
  }

  async function downloadImage(e: React.FormEvent) {
    e.preventDefault()
    if (!captureRef?.current) {
      return
    }
    try {
      setStatus('loading')
      const imgBase64 = await toPng(captureRef.current, {
        quality: 1,
        pixelRatio: 1,
      })
      setStatus('success')
      download(imgBase64, 'generated.png')

    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }

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
