
exports.emailExtractor = (array) => {
    const emails = []
    array.forEach(object => {
        emails.push(object.user.email)
    });
    return emails.join(", ")
}