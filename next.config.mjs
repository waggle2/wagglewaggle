import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import withPlugins from 'next-compose-plugins'
import withBundleAnalyzer from '@next/bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

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
    //     analyzerMode: 'static',
    //     reportFileName: 'bundle-report.html',
    //   }),
    // )

    // TerserPlugin 추가
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.terserMinify,
          terserOptions: {
            format: {
              comments: false, //주석제거
            },
            compress: {
              drop_console: true, //콘솔제거
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        //코드 스플리팅 옵션
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    }

    return config
  },
}

export default withPlugins(
  [
    [
      withBundleAnalyzer,
      {
        enabled: process.env.ANALYZE === 'true', // ANALYZE=true일 때만 활성화
      },
    ],

    // 다른 플러그인을 여기에 추가할 수 있습니다.
  ],
  nextConfig,
)
