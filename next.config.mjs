/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const sassOptions = {
  includePaths: [path.join(__dirname, 'styles')],
}
const nextConfig = {
  sassOptions,
}

export default nextConfig
