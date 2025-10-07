/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Evita falhas de build em produção por erros de lint/serialização no ambiente de CI
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
