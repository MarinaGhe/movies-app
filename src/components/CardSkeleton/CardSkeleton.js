import Skeleton from '../Skeleton/Skeleton'
import './CardSkeleton.scss'

const CardSkeleton = () => {
  return (
    <Skeleton className='card__skeleton'>
      <Skeleton className='card__skeleton--media' />

      <div className='card__skeleton--details'>
        <Skeleton className='card__skeleton--inner' />
        <Skeleton className='card__skeleton--inner' />
        <Skeleton className='card__skeleton--inner' />
      </div>

    </Skeleton>
  )
}

export default CardSkeleton