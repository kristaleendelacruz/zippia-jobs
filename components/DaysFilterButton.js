import { Button } from "antd";
import moment from 'moment';

const DaysFilterButton = ({list, setList, fieldToFilter, daysFilter}) => {
  const getLatestDaysJobs = () => {
    // fieldToFilter for dynamic date type field to be extracted
    const filtered = list.filter(({[fieldToFilter]:dateField}) => {
      // daysFilter is the number of days ago
      const daysAgo = moment().subtract(daysFilter, 'd').startOf('day').format('X');
      // include item in filtered list if it is equal or greater than the set daysAgo
      return moment(dateField).format('X') >= daysAgo;
    });
    setList(filtered);
  }
  return <Button type="primary" onClick={getLatestDaysJobs}>{`Posted Latest ${daysFilter} Days`}</Button>
}

export default DaysFilterButton;