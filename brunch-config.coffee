exports.config =
  files:
    javascripts:
      joinTo: "app.js"
    stylesheets:
      joinTo: "app.css"
    templates:
      joinTo: "app.js"
  server:
    path: "server.js"
    port: 3000
  watcher:
    usePolling: true
  npm:
    enabled: true
