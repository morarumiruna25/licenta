/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    MONGODB_URL:
      'mongodb+srv://morarumiruna:morarumiruna@cluster0.qswmaay.mongodb.net/TurismOltenia?retryWrites=true&w=majority',
    BASE_URL: 'http://localhost:3000',
    ACCESS_TOKEN_SECRET: 'Wfiwfhwefrw@#$#@$@#R!1r3i12r23jr23',
    REFRESH_TOKEN_SECRET:
      '23432@F32f@#F@1!21e112FR!R231r2re23r23r2423r23f2@#f@#f2323rr23',
    CLOUD_UPDATE_PRESET: 'licienta',
    CLOUD_NAME: 'duzpownbv',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/duzpownbv/image/upload',
    CLOUD_API_2: 'FFEzMkVBJMdAFLtM1JJq27D3AT8'
  }
};
