import {Card, Container, Stack, usePrefersDark} from '@sanity/ui'
import {EditorLayout, LayoutData, PrepareFunction} from './types'
import * as React from 'react'

export const DefaultLayoutComponent: React.FC<LayoutData> = ({title, subtitle, logo}) => {
  const prefersDark = usePrefersDark()
  const scheme = prefersDark ? 'dark' : 'light'
  return (
    <Card
      scheme={scheme}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        textAlign: 'center',
        position: 'relative',
      }}
      padding={3}
    >
      <Container>
        <Stack space={3}>
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
          {logo && <img src={logo} alt="Logo" />}
        </Stack>
      </Container>
    </Card>
  )
}

// Ideally, users will provide their own prepare function, this is an unlikely fallback
export const defaultPrepare: PrepareFunction<LayoutData> = (document) => {
  return {
    // Possible common values for title & image
    title: document.title || document.seoTitle || document.seo?.title || document.hero?.title,
    logo: document.ogImage || document.image || document.hero?.image || document.logo,
    includeBorder: false,
  }
}

const defaultLayout: EditorLayout = {
  name: 'default',
  title: 'Default layout',
  component: DefaultLayoutComponent,
  prepare: defaultPrepare,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'text',
    },
    {
      title: 'Logo / image',
      name: 'logo',
      type: 'image',
    },
  ],
}

export default defaultLayout
