import { Author } from "../models/index.js";
import { assert } from "../utils.js";
export function renderAddAuthorForm(req, res) {
    return res.render('catalog/author/add.njk', {
        title: 'Add Author',
    });
}

export async function addAuthor(req, res) {
    const { title, firstName, lastName } = req.body ?? {}
    console.log(req.body, { title, firstName, lastName })
    assert([title, firstName, lastName], 'title, firstName, lastName are required properties');
    const author = new Author({
        title,
        firstName,
        lastName
    });
    await author.save();
    return res.redirect('/catalog/book/add');
}
