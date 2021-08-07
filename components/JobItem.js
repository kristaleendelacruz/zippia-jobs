import styles from '../styles/Home.module.css';

const JobItem = ({jobTitle, companyName, shortDesc}) => {
  return  <div className={styles.card} style={{boxShadow:'5px 5px 5px rgb(173 199 228)'}}>
    <h3>{jobTitle}</h3>
    <p>{companyName}</p>
    <address>{shortDesc}</address>
  </div>;
}

export default JobItem;