/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

if (typeof performance === 'undefined') {
  global.performance = require('perf_hooks').performance
}

const nextConfig = {
  i18n,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  }
}

module.exports = nextConfig
