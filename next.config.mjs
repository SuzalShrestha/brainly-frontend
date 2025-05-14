import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    //image url
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    output: 'standalone',
};
export default withBundleAnalyzer(nextConfig)
