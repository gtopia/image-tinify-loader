const loaderUtils = require('loader-utils');
const tinify = require("tinify");
const colors = require('colors');
var keyIndex = 0;

function compress(keys, srcData, callback) {
    tinify.fromBuffer(srcData).toBuffer(function(err, result) {
        if (err) {
            switch(err.constructor) {
                case tinify.AccountError:
                    if (keys.length <= keyIndex) {
                        console.log('\n<Image Tinify Loader Error> Please verify your API key and account limit.'.red);
                        callback(err);
                    } else {
                        tinify.key = keys[keyIndex++];
                        compress(keys, srcData, callback);
                    }
                    break;
                case tinify.ClientError:
                    throw new Error('\n<Image Tinify Loader Error> Please check your source image and request options.');
                    callback(err);
                    break;
                case tinify.ServerError:
                    // Temporary issue with the Tinify API.
                    setTimeout(compress.bind(this, keys, srcData, callback), 100);
                    break;
                case tinify.ConnectionError:
                    // A network connection error occurred.
                    compress(keys, srcData, callback);
                    break;
                default:
                    // Something else went wrong, unrelated to the Tinify API.
                    callback(err);
                    break;
            }
        }

        callback(null, result);
    });
}

module.exports = function(source) {
    this.cacheable && this.cacheable();

    var opt = loaderUtils.getOptions(this) || {},
        keys = opt.keys,
        quiet = opt.quiet,
        callback = this.async();

    if (!keys || !keys.length) {
        callback(new Error('\n<Image Tinify Loader Error> Please enter an API key in the option.'));
    } else {
        if (quiet === false) {
            console.log(('\nCompressing ' + this.resource + ' ...').green);            
        }
        tinify.key = keys[keyIndex];
        compress(keys, source, callback);
    }

    return;
};

module.exports.raw = true;
