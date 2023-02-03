module.exports = (days) => {
    const requiredDate = new Date();
    requiredDate.setDate(requiredDate.getDate() + days);
    return requiredDate.toLocaleDateString();
}