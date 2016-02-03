exports.config =
  modules:
    definition: false
    wrapper: false
  files:
    javascripts:
      joinTo:
        'vendor.js': /^(bower_components|vendor)/
        'app.js': /^app/
    stylesheets:
      joinTo:
        'vendor.css': /^(bower_components|vendor)/
        'app.css': /^app/
    templates:
      joinTo: "app.js"
  server:
    path: "server.js"
    port: 3000
  watcher:
    usePolling: true
  plugins:
    postcss:
      processors: [
        require('postcss-import'),
        require('postcss-cssnext')
      ]
