# grunt-vendor-mutator

> A Node Based Task to split a given CSS file into Vendor Specific versions to reduce prefix bloating.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vendor-mutator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vendor-mutator');
```

## The "vendor_mutator" task

The task works slighty different than others, as the destination includes a placeholder:

```js
grunt.initConfig({
  vendorize: {
    dist: {
      src: 'css/style.css',
      dest: 'css/style.{vendor}.css'
    }
  }
});
```

```{vendor}``` gets replaced with either webkit, gecko or trident. Running your grunt task will now produce the following destination files:

- css/style.webkit.css
- css/style.gecko.css
- css/style.trident.css

That's it, really!
