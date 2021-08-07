import { Button, Dropdown, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './CompanyFilterButton.module.css'

const CompanyFilterButton = ({list, setList}) => {
  const [isCompanyFilterVisible, setIsCompanyFilterVisible]=useState(false);
  const [companies, setCompanies]= useState([]);
  const [selectedCompany, setSelectedCompany]= useState();

  useEffect(()=>{
    // this lists the options for filtering by company name
    const names = list.map(({companyName})=>companyName);
    const uniqueNames = [...new Set(names)];
    setCompanies(uniqueNames);
  },[list]);

  const filterByCompany = () => {
    // check first selecteCompany is not null before filtering
    if(selectedCompany) {
      const filtered = list.filter(({companyName}) => companyName===selectedCompany);
      setList(filtered);
    }
  }
  const resetFilter = () => {
    setSelectedCompany(null)
    setList(list);
  }

  const filterForm = () => (
    <form className={styles['form-control']}>
      <label>Company Name
        <Select 
          style={{width:'100%'}} 
          suffixIcon={<SearchOutlined style={{color:'gray'}}/>} 
          placeholder="Select a company"
          value={selectedCompany}
          onChange={(val)=>setSelectedCompany(val)}
        >
          {companies.map(company => (
            <Select.Option key={company} value={company}> {company} </Select.Option>
          ))}
        </Select>
      </label>
      <div className={styles['button-group']}>
        <Button onClick={resetFilter}>Clear</Button>
        <Button type="primary" onClick={filterByCompany}>Apply</Button>
      </div>
    </form>
  )
  return  <Dropdown 
    overlay={filterForm} 
    onVisibleChange={flag=>setIsCompanyFilterVisible(flag)} 
    visible={isCompanyFilterVisible}
    >
      <Button type="primary">Company <DownOutlined/></Button>
  </Dropdown>
}
export default CompanyFilterButton;