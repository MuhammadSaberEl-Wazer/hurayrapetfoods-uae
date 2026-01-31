import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DEFAULT_PLACEHOLDER = 'https://placehold.co/800x800/008080/FFFFFF?text=Hurayra+Pet+Foods'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export const ProductGallery = ({ images: rawImages, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set())

  const images = rawImages?.length
    ? rawImages
    : [DEFAULT_PLACEHOLDER]
  const displayImages = images.map((url) =>
    failedUrls.has(url) ? DEFAULT_PLACEHOLDER : url
  )

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const src = e.currentTarget.src
    setFailedUrls((prev) => new Set(prev).add(src))
    e.currentTarget.src = DEFAULT_PLACEHOLDER
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <img
          src={displayImages[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        
        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </div>

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`
                aspect-square rounded-lg overflow-hidden border-2 transition-all
                ${selectedImage === idx 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-gray-200 hover:border-primary/50'
                }
              `}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
