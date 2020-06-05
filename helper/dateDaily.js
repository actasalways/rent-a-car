const date = new Date();

const DATE_DAILY = new Date(
    date.getFullYear(), 
    date.getMonth(), 
    date.getDate() + 1
);

module.exports = DATE_DAILY;