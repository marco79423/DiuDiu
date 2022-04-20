/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const {i18n} = require('./next-i18next.config')

const nextConfig = {
  // reactStrictMode: true,

  publicRuntimeConfig: require('./runtimeConfig'),

  i18n,
}

module.exports = nextConfig
