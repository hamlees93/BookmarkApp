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

async function edit(req,res) {
    let { id } = req.params;
    let bookmark = req.user.bookmarks.id(id);
    let title = "new title";
    let url = "http://www.google.com";

    try {
        bookmark.title = title;
        bookmark.url = url;
        await req.user.save();
        return res.json(req.user.bookmarks);
    } catch (error) {
        console.log(error);
    }
};

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
    destroy
};