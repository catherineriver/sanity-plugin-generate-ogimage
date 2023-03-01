import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const imageBuilder = imageUrlBuilder(createClient({}))

export default imageBuilder
