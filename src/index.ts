import {definePlugin} from 'sanity'
import MediaEditor from './app'

interface GenerateOGImageConfig {
  /* nothing here yet */
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
 */
export const generateOGImage = definePlugin<GenerateOGImageConfig>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-generate-ogimage')
  return {
    name: 'sanity-plugin-generate-ogimage',
    tools: (prev, context) => {
      return [
        ...prev, // remember to include previous values
        {
          name: 'asset-source-ogimage',
          title: 'Generate image',
          component: MediaEditor,
        },
      ]
    },
  }
})

export {MediaEditor}
