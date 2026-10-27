import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchGoods } from '@/api/hsprice'

export const fetchBrands = createAsyncThunk(
  'search/fetchBrands',
  async (number) => {
    const goods = await fetchGoods({ number })
    const byBrand = new Map()
    for (const item of goods) {
      if (!item.brand || !item.count) continue
      const existing = byBrand.get(item.brand)
      if (!existing || item.count > existing.count) {
        byBrand.set(item.brand, item)
      }
    }
    const brands = [...byBrand.values()]
      .sort((a, b) => a.brand.localeCompare(b.brand))
      .map((item) => ({
        brand: item.brand,
        number: item.number,
        name: item.name,
        count: item.count,
      }))
    return { number, brands }
  },
)

export const fetchOffers = createAsyncThunk(
  'search/fetchOffers',
  async ({ number, brand }) => {
    const goods = await fetchGoods({ number, brand, analogues: true })
    const offers = []
    const pushOffer = (item, isOriginal) => {
      if (!item.brand || !item.number) return
      const stocked = (item.warehouses || []).filter((w) => w.stock > 0)
      if (stocked.length === 0) return
      const minPrice = Math.min(...stocked.map((w) => w.price))
      offers.push({
        goodsID: item.goodsID,
        number: item.number,
        brand: item.brand,
        name: item.name,
        price: minPrice,
        count: item.count,
        isOriginal,
        notRefund: Boolean(item.notRefund),
      })
    }
    for (const item of goods) {
      pushOffer(item, true)
      for (const analogue of item.analogues || []) {
        pushOffer(analogue, false)
      }
    }
    offers.sort((a, b) => (a.isOriginal === b.isOriginal ? a.price - b.price : a.isOriginal ? -1 : 1))
    return { number, brand, offers }
  },
)

const initialState = {
  number: '',
  brands: [],
  brandsStatus: 'idle',
  brandsError: null,
  selectedBrand: null,
  offers: [],
  offersStatus: 'idle',
  offersError: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    selectBrand(state, action) {
      state.selectedBrand = action.payload
      state.offers = []
      state.offersStatus = 'idle'
      state.offersError = null
    },
    resetSearch() {
      return { ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = 'loading'
        state.brandsError = null
        state.brands = []
        state.selectedBrand = null
        state.offers = []
        state.offersStatus = 'idle'
        state.offersError = null
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = 'succeeded'
        state.number = action.payload.number
        state.brands = action.payload.brands
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsStatus = 'failed'
        state.brandsError = action.payload || action.error.message
      })
      .addCase(fetchOffers.pending, (state) => {
        state.offersStatus = 'loading'
        state.offersError = null
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersStatus = 'succeeded'
        state.offers = action.payload.offers
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.offersStatus = 'failed'
        state.offersError = action.payload || action.error.message
      })
  },
})

export const { selectBrand, resetSearch } = searchSlice.actions

export default searchSlice.reducer
