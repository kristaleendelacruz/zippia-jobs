import { Spin } from 'antd';
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect } from 'react';
import CustomHead from '../components/CustomHead';
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    // Since there is only one page, redirect users to /test/jobs when home page is accessed
    router.push('/test/jobs');
  }, [router]);

  return (<div className={styles.container}>
    <CustomHead title="Zippia" description="Project for exam"/>

    <main className={styles.main}>
      <Spin spinning></Spin>
    </main>
  </div>

  )
}
