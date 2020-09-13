import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from '../components/Loading'

const Index = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/timeline')
  }, [])
  return (
    <div className="center full">
      <Loading />
    </div>
  )
}

export default Index
