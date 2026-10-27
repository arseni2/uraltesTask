import TooltipIcon from '@/components/TooltipIcon'

const formatPrice = (value) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 2 }).format(value)

const NOT_REFUND_HINT = 'Невозвратная позиция — предложение нельзя вернуть по причине «Отказ»'

function OfferCard({ offer }) {
  return (
    <article className="offer-card d-lg-none">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <span className="offer-name">{offer.name}</span>
        {offer.isOriginal && <span className="badge text-bg-primary flex-shrink-0">исходная</span>}
      </div>
      <div className="d-flex gap-2 mt-1 mb-2 small text-secondary">
        <span className="badge text-bg-secondary">{offer.brand}</span>
        <span className="align-self-center">{offer.number}</span>
        {offer.notRefund && <TooltipIcon icon="bi-exclamation-triangle text-warning" title={NOT_REFUND_HINT} />}
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <span className="offer-price">{formatPrice(offer.price)}</span>
        <span className="text-secondary small">
          <i className="bi bi-box-seam me-1" aria-hidden="true" />
          {offer.count} шт.
        </span>
      </div>
    </article>
  )
}

function OffersTable({ offers, number, brand }) {
  const minPrice = Math.min(...offers.map((o) => o.price))

  return (
    <section aria-label="Аналоги и предложения">
      <h5 className="mb-2">
        Аналоги и предложения
        <span className="badge text-bg-secondary ms-2">{offers.length}</span>
      </h5>
      <p className="text-secondary small mb-0">
        Артикул <strong>{number}</strong> · бренд <strong>{brand}</strong>
      </p>

      <div className="offers-summary mt-2">
        <span>
          от <strong>{formatPrice(minPrice)}</strong>
        </span>
        <span>
          всего <strong>{offers.length}</strong> предлож.
        </span>
      </div>

      {/* mobile: cards */}
      <div>
        {offers.map((offer) => (
          <OfferCard key={offer.goodsID} offer={offer} />
        ))}
      </div>

      {/* desktop: table */}
      <div className="table-responsive d-none d-lg-block">
        <table className="table table-hover align-middle offers-table">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Производитель</th>
              <th>Артикул</th>
              <th className="text-end">Цена</th>
              <th className="text-end">Остаток</th>
              <th className="text-center">
                <TooltipIcon
                  icon="bi-arrow-counterclockwise text-secondary"
                  title={NOT_REFUND_HINT}
                  placement="bottom"
                  ariaLabel="Невозвратная позиция"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.goodsID}>
                <td>
                  {offer.name}
                  {offer.isOriginal && <span className="badge text-bg-primary ms-2">исходная</span>}
                </td>
                <td>{offer.brand}</td>
                <td className="text-secondary">{offer.number}</td>
                <td className="text-end cell-price">{formatPrice(offer.price)}</td>
                <td className="text-end text-nowrap">{offer.count} шт.</td>
                <td className="text-center">
                  {offer.notRefund ? <TooltipIcon icon="bi-exclamation-triangle text-warning" title={NOT_REFUND_HINT} /> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default OffersTable
