module.exports.getdate = func => {
    const date = new Date();
    return date.toLocaleDateString();
}

module.exports.getDeadline = func => {
    const newdate = new Date();
    newdate.setDate(newdate.getDate() + 7);
    return newdate.toLocaleDateString();
}

module.exports.getSemEnd = func => {
    const semdate = new Date();
    semdate.setDate(semdate.getDate() + 124);
    return semdate.toLocaleDateString();
}