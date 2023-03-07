# Sanity Asset Source Plugin for OG image generation

> This is a **Sanity Studio v3** plugin for generating OG images.

Based on [sanity-plugin-asset-source-ogimage](https://www.npmjs.com/package/sanity-plugin-asset-source-ogimage) for Sanity Studio v2

## Installation
🚨 You need ```@sanity 3.5.0``` or greater and ```react 18.0.0``` or greater

```sh
npm install sanity-plugin-generate-ogimage
```

## Usage
### As a studio tool

Use it in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {generateOGImage} from 'sanity-plugin-generate-ogimage'

export default defineConfig({
  //...
  plugins: [generateOGImage()],
})
```

### As custom source in image field
Use it as [source on a single type](https://www.sanity.io/docs/custom-asset-sources#e2077d7f8ae2)
```jsx
{
    name: 'ogImage',
    title: 'OG image',
    type: 'image',
    options: {
      sources: [
        {
          name: 'sharing-image',
          title: 'Generate Image',
          component: (props) => (
            <MediaEditor {...props} darkMode={true} layouts={[OgImageEditorLayout]} />
          ),
        },
      ],
  }
}
```

## Docs
  WIP
 



## License

[MIT](LICENSE) © Katerina Baliasnikova

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
