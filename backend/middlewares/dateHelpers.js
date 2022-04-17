const daysInMonth = (month, year) =>{
    return new Date(year, month, 0).getDate();
}
const numberOfWeeks = (month,year)=>{
    const days = daysInMonth(month,year)
    return Math.ceil(days / 7)
}
const weekNumber = (date)=>{
    const dated = new Date(date);
    return (0 | dated.getDate() / 7)+1;    
}
module.exports = {daysInMonth,numberOfWeeks,weekNumber}