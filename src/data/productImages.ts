/**
 * Product images - main image = local product photo, rest = from internet (Unsplash)
 */
import productCatFoodChicken from '@/assets/product-cat-food.png'
import productCatFoodTuna from '@/assets/product-cat-food-tuna.png'

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export const productImagesChicken: string[] = [
  productCatFoodChicken,
  U('1696507398228-78f0368ddbc1'), // canned food product
  U('1596854236500-a0b80b17154e'),  // bowl with spoon
  U('1589924691995-400dc9ecc119'),  // food in bowl
]

export const productImagesTuna: string[] = [
  productCatFoodTuna,
  U('1591324535489-9c78376631dc'),  // cat beside bowl
  U('1596854331442-3cf47265cefb'),  // cat eating from bowl
  U('1645773619957-ec1d128d0aa2'),  // cat eating food
]
