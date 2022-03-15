export const dateParser = (num) => {
    let options = {year: "numeric", month: "short", day: "numeric"}
    //hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long",

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

    return date.toString();
}