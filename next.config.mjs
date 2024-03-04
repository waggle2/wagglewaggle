import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import withPlugins from 'next-compose-plugins'
import withBundleAnalyzer from '@next/bundle-analyzer'
<<<<<<< HEAD
import TerserPlugin from 'terser-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
=======
import CompressionPlugin from 'compression-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
>>>>>>> e98b07a (Chore: add webpack optimization option)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sassOptions = {
  includePaths: [path.join(__dirname, 'styles')],
}

const nextConfig = {
  reactStrictMode: true,
  sassOptions,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config, { isServer }) => {
<<<<<<< HEAD
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // config.plugins.push(
    //   new BundleAnalyzerPlugin({
    //     generateStatsFile: true,
    //   }),
    // )
    // if (!isServer) {
    //   config.mode = 'production' // 웹팩 모드 설정 추가
    // }
    // TerserPlugin 추가
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // TerserPlugin 옵션 설정 가능
          },
        }),
      ],
    }
=======
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    config.plugins.push(new CompressionPlugin())
    if (!isServer) {
      config.mode = 'production' // 웹팩 모드 설정 추가
    }
    // TerserPlugin 추가
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // TerserPlugin 옵션 설정 가능
          },
        }),
      ],
    }
>>>>>>> e98b07a (Chore: add webpack optimization option)

    return config
  },
}

export default withPlugins(
  [
<<<<<<< HEAD
    [
      withBundleAnalyzer,
      {
        enabled: process.env.ANALYZE === 'true', // ANALYZE=true일 때만 활성화
      },
    ],
=======
    [withBundleAnalyzer, { enabled: true, openAnalyzer: true }],
>>>>>>> e98b07a (Chore: add webpack optimization option)

    // 다른 플러그인을 여기에 추가할 수 있습니다.
  ],
  nextConfig,
)
