import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import withPlugins from 'next-compose-plugins'
import withBundleAnalyzer from '@next/bundle-analyzer'
import CompressionPlugin from 'compression-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

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

    return config
  },
}

export default withPlugins(
  [
    [withBundleAnalyzer, { enabled: true, openAnalyzer: true }],

    // 다른 플러그인을 여기에 추가할 수 있습니다.
  ],
  nextConfig,
)
