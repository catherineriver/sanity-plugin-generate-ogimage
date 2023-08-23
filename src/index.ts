import { definePlugin } from 'sanity'
import MediaEditor from './app'
import { EditorLayout } from './types'

interface GenerateOGImageConfig {
  layouts?: EditorLayout[]
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {generateOGImage} from 'sanity-plugin-generate-ogimage'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [generateOGImage()],
 * })
 * ```
 *
 * Or to use custom layouts:
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {generateOGImage} from 'sanity-plugin-generate-ogimage'
 * import CustomLayout from './CustomLayout'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [generateOGImage({layouts: [CustomLayout]})],
 * })
 * ```
 */
export const generateOGImage = definePlugin<GenerateOGImageConfig>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello there from sanity-plugin-generate-ogimage', config.layouts)


  return {
    name: 'sanity-plugin-generate-ogimage',
    tools: (prev, context) => {
      return [
        ...prev, // remember to include previous values
        {
          name: 'asset-source-ogimage',
          title: 'Generate image',
          component: MediaEditor,
          props: {
            layouts: config.layouts,
          }
        },
      ]
    },
  }
})

export { MediaEditor }
