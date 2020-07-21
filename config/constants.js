const __db = {
    ONXCY_RESUME: "onxcy_resume",
};

const __collections = {
    ONXCY_RESUME: {
        subcribers_email: "subcribers_email",
        resumes: "resumes",
    },
};
const __bucket = "onxcy/resumes";

module.exports = {
    __collections: __collections,
    __db: __db,
    __bucket,
};
