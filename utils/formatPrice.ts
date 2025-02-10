export default function formatPrice(
  price: number,
  locale: string = "ru-RU",
  currency: string = "RUB",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
}
