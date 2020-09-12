import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/timeline')
  }, [])
  return <div className="center full">努力跳转中...</div>
}

export default Index
