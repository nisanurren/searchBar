import moment from 'moment'
export const epochToHumanRead = (epoch) => {
    let t = new Date(epoch);
    return moment(t).format("DD.MM.YYYY hh:MM:ss");
  };
