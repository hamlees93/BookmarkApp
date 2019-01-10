//// Use info comes through with request, so we are able to acces all their bookmarks through the call below ////
async function index(req,res) {
    try {
        const response = await res.json(req.user.bookmarks);
        return response;
    } catch(err) {
        next(err);
    }
};

async function create(req, res) {
    req.user.bookmarks.push(req.body);
    try {
        await req.user.save();
        res.json(req.user.bookmarks);
    } catch( err ) {
        next(err);
    }
};

//// Get the bookmark ID from the params, then use that ID to get the correct bookmark from mongo, and return it ////
function edit(req, res) {
    let { id } = req.params;
    let bookmark = req.user.bookmarks.id(id);

    try {
        return res.json(bookmark);
    } catch( err ) {
        next(err);
    }
};

//// Get the title and url from the request, the pull up the correct bookmark and alter its data and await the save ////
async function update(req,res) {
    let { id } = req.params;
    let { title, url } = req.body;
    let bookmark = req.user.bookmarks.id(id);

    try {
        bookmark.title = title;
        bookmark.url = url;
        await req.user.save();
        return res.json(req.user.bookmarks);
    } catch (error) {
        next(error);
    }
};

//// Once again, get the ID and bookmark, then delete it and await successful response ////
async function destroy(req,res) {
    let { id } = req.params;
    let bookmark = req.user.bookmarks.id(id);

    try {
        bookmark.remove();
        await req.user.save();
        return res.json(req.user.bookmarks);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    index,
    create,
    edit,
    update,
    destroy
};