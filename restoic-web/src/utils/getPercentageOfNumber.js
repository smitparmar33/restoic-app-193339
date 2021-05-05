const getPercentageOfNumber = (number, sum) => {
    if (number > 0 && sum > 0) {
        const percenage = (number / sum) * 100;
        return parseFloat(percenage).toFixed(1);
    }
    return 0;
}

export {getPercentageOfNumber};