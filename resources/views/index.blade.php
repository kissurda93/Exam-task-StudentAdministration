<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="/img/grad-cap.png">
  <script src="https://kit.fontawesome.com/47792f5d88.js" crossorigin="anonymous" ></script>
</link>
  <title>SAF</title>
</head>
<body>
  <!-- React root DOM -->
  <div id="root"></div>

  <!-- React JS -->
  @viteReactRefresh
  @vite('resources/js/app.jsx')
</body>
</html>