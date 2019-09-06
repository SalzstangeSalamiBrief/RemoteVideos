# RemoteVideos

> Remote App for Videoplayer

This app is a remote control for HTML5 players. You can start/stop a video, enter/leave full screen and can skip to next video in a playlist.

## Usage

Let the server run in your WLAN on the same machine you want to watch Videos. Connect yourself with a mobile device like a smartphone to the server and use this device as remote control.

## Requirements

- Python 2.7
- MongoDB
- NodeJS

## Setup

1. Create .env File (as reference take .example.env)
2. RSA Key generation
   ..1. generate one public and one private RSA key
   ..2. Name your public Key 'public.key' and your private Key 'private.key'
   ..3. Copy both keys into './server/private/rsa/jwt/
3. Install NodeJS, MongoDB and Python
4. Install dependencies

## Command

```bash
# install dependencies
$ npm i

# serve for development
$ npm run dev
# build the project for production
$ npm run build
# launch the server
$ npm start

# generate static project
$ npm run generate
```

## Licenses

- [ExpressJS license](https://github.com/expressjs/express/blob/master/LICENSE)
- [NuxtJS license](https://github.com/nuxt/nuxt.js/blob/master/LICENSE.md)
- [VueJS license](https://github.com/vuejs/vue/blob/master/LICENSE)
