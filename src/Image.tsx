import {SanityImage} from './types'
import * as React from 'react'
import imageBuilder from './imageBuilder'

interface Props {
  image?: SanityImage
  width?: number
}

const Image: React.FC<Props> = (props) => {
  const {image, width} = props
  if (!image?.asset?._ref) {
    return null
  }
  const src = imageBuilder
    .image(image)
    .width(width || 500)
    .url()

  if (!src) {
    return null
  }

  return <img src={src} alt="" />
}

export default Image
