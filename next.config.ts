import type { Configuration } from 'webpack'
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['*'],
  },
  experimental: { esmExternals: true },
  webpack: (config: Configuration) => {
    config.module?.rules?.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })
    return config
  },
})
