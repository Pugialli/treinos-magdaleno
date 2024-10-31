import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
}

export default nextConfig
