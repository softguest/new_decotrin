'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '9'

  return (
    <div className='flex gap-2'>
      <Button
        className='bg-blue-500 text-white px-2'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
            <FaArrowLeft className='mr-2'/>
            prev page
      </Button>

      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <Button 
       className='text-white px-2'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
            next page
            <FaArrowRight className='ml-2'/>
      </Button>
    </div>
  )
}

export default PaginationControls