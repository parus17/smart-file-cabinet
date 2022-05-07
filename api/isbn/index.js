// https://www.npmjs.com/package/node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async function (context, req) {
    let isbn = req.params.isbn;

    let response = await fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn);
    let body = await response.json();

    let auteur = '';
    let titel = '';
    if (body.totalItems > 0) {
        let volumeInfo = body.items[0].volumeInfo;
        auteur = volumeInfo.authors.join(', ');
        titel = volumeInfo.title;
    }

    const boek = {
        auteur: auteur,
        titel: titel,
        isbn: isbn
    };

    context.res = {
        body: boek
    };
}
