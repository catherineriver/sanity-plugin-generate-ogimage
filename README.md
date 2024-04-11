# Sanity Plugin: Generate OG Image

> This is a **Sanity Studio v3** plugin for generating OG images.

Based on [sanity-plugin-asset-source-ogimage](https://www.npmjs.com/package/sanity-plugin-asset-source-ogimage) for Sanity Studio v2

This Sanity plugin provides a tool to generate Open Graph (OG) images for your Sanity documents. It's designed to be flexible, allowing you to define custom layouts for the generated images.

## Features

- **Custom Layouts**: Craft your own layouts for the images.
- **Live Preview**: Witness changes in real-time as you tweak the layout and content.
- **Download & Generate**: Create the image and either download it instantly or integrate it within your Sanity documents.

## Installation

🚨 You need `@sanity 3.5.0` or greater and `react 18.0.0` or greater

```sh
npm install @catherineriver/sanity-plugin-generate-ogimage
```

## Basic Usage

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

## Advanced Usage with Custom Layouts

You can define custom layouts for your generated images. A layout is essentially a React component that receives certain props and renders the desired output.

Here's a basic structure of a layout:

```jsx
import React from "react";
import { LayoutData } from "sanity-plugin-generate-ogimage/types";

const MyCustomLayout: React.FC<LayoutData> = ({ title, subtitle, logo }) => {
  // Your rendering logic here
};

export default MyCustomLayout;
```

To use your custom layouts, modify your sanity.config.ts (or .js) as follows:

```jsx
import {defineConfig} from 'sanity'
import {generateOGImage} from 'sanity-plugin-generate-ogimage'
import MyCustomLayout from './path-to-your-layout'

export default defineConfig({
  // ... other config
  plugins: [generateOGImage({layouts: [MyCustomLayout]})],
})
```

## Components

Here's a brief overview of the main components in the repository:

- `Editor`: The main editor component where users can select a layout, modify content, and generate the image.
- `Image`: A utility component to display Sanity images.
- `LayoutsPicker`: Allows users to pick from multiple available layouts.
- `EditorField`: Represents individual fields in the editor, like text inputs, switches, etc.
- `useEditorLogic`: A custom hook that encapsulates the logic for generating and downloading the image.
- `imageBuilder`: A utility to build image URLs using Sanity's image URL builder.

## License

[MIT](LICENSE) © Katerina Baliasnikova

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

<a href="https://www.buymeacoffee.com/catherineriver" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
