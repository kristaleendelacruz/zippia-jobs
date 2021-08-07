import Image from 'next/image'
import { useState } from 'react'
import CustomHead from '../../components/CustomHead'
import JobItem from '../../components/JobItem'
import ZippiaHeader from '../../components/ZippiaHeader'
import styles from '../../styles/Home.module.css'
import DaysFilterButton from '../../components/DaysFilterButton'
import CompanyFilterButton from '../../components/CompanyFilterButton'
import { Button } from 'antd'

const JobsPage = ({jobs, totalJobs}) => {
  // display only 10 jobs from jobs received from API
  const [jobList, setJobList] = useState(jobs.slice(0, 10));

  const filterJobs = (newJobList) => {
    // always limit new list to 10
    const newList = newJobList.slice(0, 10);
    setJobList(newList);
  }
  return (
    <div className={styles.container}>

      <CustomHead title="Zippia Jobs" description="Project for exam"/>

      <main className={styles.main}>
        <ZippiaHeader/>

        <div className={styles['filter-buttons']}>
          <CompanyFilterButton list={jobs} setList={filterJobs}/>
          <DaysFilterButton list={jobs} setList={filterJobs} fieldToFilter="OBJpostingDate" daysFilter={7}/>
          <Button onClick={()=>filterJobs(jobs)}>Reset</Button>
        </div>
        
        <address className={styles.code}>{`Showing ${jobList.length} out of ${totalJobs} jobs for "Business Analyst"`} </address>

        <div className={styles.grid}>
          {jobList.map(job=>(
            <JobItem key={job.jobId} {...job}/>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = async () => {
  const requestPayload = {
    "companySkills": true,
    "dismissedListingHashes": [],
    "fetchJobDesc": true,
    "jobTitle": "Business Analyst",
    "locations": [],
    "numJobs": 20,
    "previousListingHashes": []
  };

  const response = await fetch('https://www.zippia.com/api/jobs/', {
    method:'POST',
    body: JSON.stringify(requestPayload),
    headers: {
      'Content-Type':'application/json'
    }
  });

  const jobsData = await response.json();
  return {
    props: {
      ...jobsData,
    }
  }
}

export default JobsPage;