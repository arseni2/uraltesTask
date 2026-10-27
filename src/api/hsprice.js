const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

if (!BASE_URL || !API_KEY) {
  throw new Error('VITE_API_BASE_URL и VITE_API_KEY должны быть заданы в .env')
}

export class ApiError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function fetchGoods({ number, brand, analogues } = {}) {
  const params = new URLSearchParams()
  params.set('key', API_KEY)
  if (number) params.set('number', number)
  if (brand) params.set('brand', brand)
  if (analogues) params.set('analogues', 'on')
  params.set('info', 'on')

  let response
  try {
    response = await fetch(`${BASE_URL}?${params}`)
  } catch {
    throw new ApiError('Ошибка сети. Не удалось связаться с сервисом «Проценка».')
  }

  if (!response.ok) {
    throw new ApiError(`Ошибка сети. Сервис «Проценка» ответил кодом ${response.status}.`)
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new ApiError('Сервис «Проценка» вернул некорректный ответ.')
  }

  if (data.error) {
    throw new ApiError(`Ошибка API: ${[].concat(data.error).join('; ')}`)
  }

  const goods = data.goods
  if (!Array.isArray(goods)) {
    throw new ApiError('Сервис «Проценка» вернул некорректный ответ.')
  }

  const isEmptyItem = (item) =>
    item && item.goodsID === undefined && item.brand === undefined && item.number === undefined && item.name === undefined

  if (goods.length === 0 || (goods.length === 1 && isEmptyItem(goods[0]))) {
    return []
  }

  return goods
}
