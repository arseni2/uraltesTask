import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands, fetchOffers, selectBrand as selectBrandAction, resetSearch } from './store/searchSlice'
import SearchForm from '@/components/SearchForm'
import BrandsList from '@/components/BrandsList'
import OffersTable from '@/components/OffersTable'
import SkeletonBrands from '@/components/SkeletonBrands'
import SkeletonOffers from '@/components/SkeletonOffers'
import EmptyState from '@/components/EmptyState'
import ErrorAlert from '@/components/ErrorAlert'

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const THEME_COLORS = { light: '#f2f5f9', dark: '#14161a' }

function App() {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]:not([media])')
    if (meta) meta.setAttribute('content', THEME_COLORS[theme])
    localStorage.setItem('theme', theme)
  }, [theme])

  const {
    number,
    brands,
    brandsStatus,
    brandsError,
    selectedBrand,
    offers,
    offersStatus,
    offersError,
  } = useSelector((state) => state.search)

  const [searchedNumber, setSearchedNumber] = useState('')

  const handleSearch = (value) => {
    setSearchedNumber(value)
    dispatch(fetchBrands(value))
  }

  const handleSelectBrand = (brand) => {
    dispatch(selectBrandAction(brand))
    dispatch(fetchOffers({ number: searchedNumber, brand }))
  }

  const handleReset = () => {
    dispatch(resetSearch())
    setSearchedNumber('')
  }

  const brandsLoading = brandsStatus === 'loading'
  const offersLoading = offersStatus === 'loading'
  const stage = brandsStatus === 'succeeded' && brands.length > 0 ? (selectedBrand ? 2 : 1) : 0

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="d-flex align-items-center gap-3">
          <span className="app-logo">
            <i className="bi bi-gear-wide-connected" aria-hidden="true" />
          </span>
          <div>
            <h1 className="app-title">Поиск автозапчастей</h1>
            <p className="app-subtitle">Веб-сервис «Проценка» · Favorit-parts</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        >
          <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`} aria-hidden="true" />
        </button>
      </header>

      {stage > 0 && (
        <nav className="app-stepper" aria-label="Этапы поиска">
          <span className={`app-stepper-item ${stage >= 1 ? 'done' : ''}`}>
            <span className="step-num">{stage > 1 ? <i className="bi bi-check" /> : 1}</span>
            Производители
          </span>
          <i className="bi bi-arrow-right app-stepper-arrow" aria-hidden="true" />
          <span className={`app-stepper-item ${stage >= 2 ? 'current' : ''}`}>
            <span className="step-num">2</span>
            Аналоги {selectedBrand ? `· ${selectedBrand}` : ''}
          </span>
        </nav>
      )}

      <section className="app-card">
        <SearchForm
          onSubmit={handleSearch}
          isLoading={brandsLoading || offersLoading}
          onReset={handleReset}
          showReset={stage > 0 && !brandsLoading}
        />
      </section>

      <div className="mt-4">
        {brandsLoading && (
          <section className="app-card" aria-busy="true">
            <h5 className="mb-3">Загружаем производителей...</h5>
            <SkeletonBrands rows={6} />
          </section>
        )}

        {!brandsLoading && brandsError && <ErrorAlert message={brandsError} />}

        {!brandsLoading && !brandsError && brandsStatus === 'succeeded' && (
          <>
            {brands.length > 0 ? (
              <div className="row g-3 g-md-4">
                <div className="col-lg-5 col-xl-4">
                  <BrandsList
                    brands={brands}
                    number={number}
                    selectedBrand={selectedBrand}
                    onSelect={handleSelectBrand}
                  />
                </div>
                <div className="col-lg-7 col-xl-8">
                  {offersLoading && (
                    <section className="app-card" aria-busy="true">
                      <h5 className="mb-3">Загружаем аналоги для {selectedBrand}...</h5>
                      <SkeletonOffers rows={7} />
                    </section>
                  )}
                  {!offersLoading && offersError && <ErrorAlert message={offersError} />}
                  {!offersLoading && !offersError && selectedBrand && offersStatus === 'succeeded' && (
                    <>
                      {offers.length > 0 ? (
                        <OffersTable offers={offers} number={number} brand={selectedBrand} />
                      ) : (
                        <EmptyState
                          icon="bi-box"
                          title="Предложения не найдены"
                          text={`По артикулу ${number} бренда ${selectedBrand} предложений с остатком нет.`}
                        />
                      )}
                    </>
                  )}
                  {selectedBrand && offersStatus !== 'succeeded' && !offersLoading && !offersError && (
                    <section className="app-card">
                      <EmptyState
                        icon="bi-hand-index"
                        title="Выберите производителя"
                          text="Выше список производителей по артикулу. Выберите бренд, чтобы увидеть аналоги и предложения."
                      />
                    </section>
                  )}
                </div>
              </div>
            ) : (
              <EmptyState
                icon="bi-search"
                title="Ничего не найдено"
                text={`По артикулу ${number} деталей с ненулевым остатком не найдено. Проверьте номер и попробуйте снова.`}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
