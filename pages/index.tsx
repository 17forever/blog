import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  console.log('in')
  const router = useRouter();
  useEffect(() => {
    router.replace('/timeline');
  }, []);
  return null;
};

export default Index;
