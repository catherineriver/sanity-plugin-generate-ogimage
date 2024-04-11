import imageUrlBuilder from '@sanity/image-url'
import {useClient} from 'sanity'

const imageBuilder = imageUrlBuilder(useClient({apiVersion: '2021-06-07'}))

export default imageBuilder
