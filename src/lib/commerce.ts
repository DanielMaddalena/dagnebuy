import CommerceSDK from "@chec/commerce.js"

if (!process.env.NEXT_PUBLIC_API_KEY) {
  throw new Error('API Key not found')
}

const commerce = new CommerceSDK(process.env.NEXT_PUBLIC_API_KEY as string)

export default commerce