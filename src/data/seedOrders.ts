import type { Order } from '@/lib/types'

/**
 * Sample orders for demo / development.
 * Used when orders store is empty.
 */
function makeOrder(
  id: string,
  orderNumber: string,
  customer: { firstName: string; lastName: string; email: string; phone: string },
  address: { address: string; city: string; emirate: string },
  items: Order['items'],
  status: Order['status'],
  paymentMethod: Order['paymentMethod'],
  createdAt: string,
  shipping = 15
): Order {
  const subtotal = items.reduce((s, i) => s + i.subtotal, 0)
  const total = subtotal + shipping
  return {
    id,
    orderNumber,
    customerInfo: customer,
    deliveryAddress: address,
    items,
    subtotal,
    shipping,
    total,
    status,
    paymentMethod,
    createdAt,
    updatedAt: createdAt,
  }
}

export function getSeedOrders(): Order[] {
  const now = new Date()
  const fmt = (d: Date) => d.toISOString()

  return [
    makeOrder(
      'seed-1',
      'ORD-1706442320',
      {
        firstName: 'Ahmed',
        lastName: 'Al Mansouri',
        email: 'ahmed@example.com',
        phone: '+971501234567',
      },
      { address: 'Villa 12, Al Barsha 1', city: 'Dubai', emirate: 'Dubai' },
      [
        { productId: 'chicken-premium', productName: 'Premium Halal Chicken Cat Food', size: '1kg', sku: 'HRP-CHK-1K', quantity: 2, price: 55, subtotal: 110 },
        { productId: 'tuna-premium', productName: 'Premium Halal Tuna Cat Food', size: '400g', sku: 'HRP-TUN-400', quantity: 1, price: 28, subtotal: 28 },
      ],
      'delivered',
      'cash-on-delivery',
      fmt(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000))
    ),
    makeOrder(
      'seed-2',
      'ORD-1706442321',
      {
        firstName: 'Fatima',
        lastName: 'Hassan',
        email: 'fatima@example.com',
        phone: '+971507654321',
      },
      { address: 'Building 5, Khalifa City', city: 'Abu Dhabi', emirate: 'Abu Dhabi' },
      [
        { productId: 'combo-chicken-tuna', productName: 'Premium Halal Chicken & Tuna Combo', size: '2kg', sku: 'HRP-CMB-2K', quantity: 1, price: 100, subtotal: 100 },
      ],
      'processing',
      'cash-on-delivery',
      fmt(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000))
    ),
    makeOrder(
      'seed-3',
      'ORD-1706442322',
      {
        firstName: 'Mohammed',
        lastName: 'Abdullah',
        email: 'mohammed@example.com',
        phone: '+971509876543',
      },
      { address: 'Al Nahda St, Al Qasimia', city: 'Sharjah', emirate: 'Sharjah' },
      [
        { productId: 'chicken-premium', productName: 'Premium Halal Chicken Cat Food', size: '400g', sku: 'HRP-CHK-400', quantity: 3, price: 25, subtotal: 75 },
        { productId: 'tuna-premium', productName: 'Premium Halal Tuna Cat Food', size: '1kg', sku: 'HRP-TUN-1K', quantity: 1, price: 60, subtotal: 60 },
      ],
      'shipped',
      'cash-on-delivery',
      fmt(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000))
    ),
    makeOrder(
      'seed-4',
      'ORD-1706442323',
      {
        firstName: 'Aisha',
        lastName: 'Salem',
        email: 'aisha@example.com',
        phone: '+971501112233',
      },
      { address: 'Al Nuaimiya', city: 'Ajman', emirate: 'Ajman' },
      [
        { productId: 'tuna-premium', productName: 'Premium Halal Tuna Cat Food', size: '400g', sku: 'HRP-TUN-400', quantity: 2, price: 28, subtotal: 56 },
        { productId: 'chicken-premium', productName: 'Premium Halal Chicken Cat Food', size: '400g', sku: 'HRP-CHK-400', quantity: 1, price: 25, subtotal: 25 },
      ],
      'pending',
      'cash-on-delivery',
      fmt(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000))
    ),
    makeOrder(
      'seed-5',
      'ORD-1706442324',
      {
        firstName: 'Khalid',
        lastName: 'Al Zaabi',
        email: 'khalid@example.com',
        phone: '+971504445566',
      },
      { address: 'Al Nakheel, Ras Al Khaimah', city: 'Ras Al Khaimah', emirate: 'Ras Al Khaimah' },
      [
        { productId: 'chicken-premium', productName: 'Premium Halal Chicken Cat Food', size: '5kg', sku: 'HRP-CHK-5K', quantity: 1, price: 220, subtotal: 220 },
        { productId: 'combo-chicken-tuna', productName: 'Premium Halal Chicken & Tuna Combo', size: '400g', sku: 'HRP-CMB-400', quantity: 1, price: 26, subtotal: 26 },
      ],
      'delivered',
      'cash-on-delivery',
      fmt(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000))
    ),
    makeOrder(
      'seed-6',
      'ORD-1706442325',
      {
        firstName: 'Mariam',
        lastName: 'Ibrahim',
        email: 'mariam@example.com',
        phone: '+971507778899',
      },
      { address: 'Jumeirah 1, Villa 8', city: 'Dubai', emirate: 'Dubai' },
      [
        { productId: 'combo-chicken-tuna', productName: 'Premium Halal Chicken & Tuna Combo', size: '1kg', sku: 'HRP-CMB-1K', quantity: 2, price: 58, subtotal: 116 },
      ],
      'cancelled',
      'cash-on-delivery',
      fmt(new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000))
    ),
    makeOrder(
      'seed-7',
      'ORD-1706442326',
      {
        firstName: 'Omar',
        lastName: 'Al Rashid',
        email: 'omar@example.com',
        phone: '+971522334455',
      },
      { address: 'Al Majaz 2', city: 'Sharjah', emirate: 'Sharjah' },
      [
        { productId: 'tuna-premium', productName: 'Premium Halal Tuna Cat Food', size: '2kg', sku: 'HRP-TUN-2K', quantity: 1, price: 105, subtotal: 105 },
        { productId: 'chicken-premium', productName: 'Premium Halal Chicken Cat Food', size: '1kg', sku: 'HRP-CHK-1K', quantity: 1, price: 55, subtotal: 55 },
      ],
      'delivered',
      'cash-on-delivery',
      fmt(new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000))
    ),
  ]
}
