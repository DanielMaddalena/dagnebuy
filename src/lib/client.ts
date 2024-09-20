import swell from 'swell-js'

const options = {
  useCamelCase: false,
}

if (!process.env.NEXT_PUBLIC_SWELL_STORE_ID || !process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY) {
  throw new Error('Swell store ID and public key are required')
}

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY,
  options
)

export default swell