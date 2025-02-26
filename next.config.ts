import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['www.themealdb.com'],
  },
}

export default nextConfig
