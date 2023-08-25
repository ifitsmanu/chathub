import { ofetch } from 'ofetch'

export async function decodePoeFormkey(headHtml: string): Promise<string> {
  const resp = await ofetch('https://chathub.gg/api/poe/decode-formkey', {
    method: 'POST',
    body: { headHtml },
  })
  return resp.formkey
}

type ActivateResponse =
  | {
      activated: true
      instance: { id: string }
      meta: { product_id: number }
    }
  | { activated: false; error: string }

export async function activateLicense(key: string, instanceName: string) {
  return ofetch<ActivateResponse>('https://chathub.gg/api/premium/activate', {
    method: 'POST',
    body: {
      license_key: key,
      instance_name: instanceName,
    },
  })
}

interface Product {
  price: number
}

export async function fetchPremiumProduct() {
  return ofetch<Product>('https://chathub.gg/api/premium/product')
}

export async function createDiscount() {
  return ofetch<{ code: string; startTime: number }>('https://chathub.gg/api/premium/discount/create', {
    method: 'POST',
  })
}

interface PurchaseInfo {
  price: number
  discount?: {
    code: string
    startTime: number
    price: number
    percent: number
  }
}

export async function fetchPurchaseInfo() {
  return ofetch<PurchaseInfo>('https://chathub.gg/api/premium/info')
}

export async function checkDiscount(params: { appOpenTimes: number; premiumModalOpenTimes: number }) {
  return ofetch<{ show: boolean }>('https://chathub.gg/api/premium/discount/check', { params })
}
