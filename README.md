# image-tinify-loader

Image loader module for `webpack`.

> Compress images with [tinify-nodejs](https://github.com/tinify/tinify-nodejs)

## Install

```sh
$ npm i image-tinify-loader -D
```

## Usage

### Apply API key
Apply at least one API key at [tinypng.com](https://tinypng.com/developers)

### Config loader
[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/)

In your `webpack.config.js`, add the image-loader, chained after the [file-loader](https://github.com/webpack/file-loader):

```js
rules: [{
  test: /\.(gif|png|jpe?g)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-tinify-loader',
      options: {
        quiet: false,
        keys: ['your_API_key1', 'your_API_key2']
      },
    },
  ],
}]
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`quiet`**|`{Boolean}`|`true`|Prevent output information|
|**`keys`**|`{Array}`|`undefined`|API keys|

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
