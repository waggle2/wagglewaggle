import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import withPlugins from 'next-compose-plugins'
import withBundleAnalyzer from '@next/bundle-analyzer'
import CompressionPlugin from 'compression-webpack-plugin'

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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    config.plugins.push(new CompressionPlugin())
    return config
  },
}
// export default nextConfig
export default withPlugins(
  [
    [withBundleAnalyzer, { enabled: true, openAnalyzer: true }],
    // 다른 플러그인을 여기에 추가할 수 있습니다.
  ],
  nextConfig,
)
