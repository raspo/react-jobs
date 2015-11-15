{
    user: {
        id: "1",
        role: "guest|editor|admin"
    },
    filter: "",
    isFetchingJobs: true|false,
    lastUpdatedJobs: 1234567890,
    jobs: [1,2,3],
    jobsById: {
        "1": {
            id: "1",
            slug: "1-jobt-itle",
            title: "Job title",
            url: "",
            description: "Lorem ...",
            companyName: "company",
            companyWebsite: "http://",
            companyEmail: "some@email.com",
            companyLogo: "logo.png",
            address: "address",
            type: "full-time",
            createdAt: 12344567890,
            updateddAt: 12344567890,
            publishedAt: 12344567890,
            isComplete: false|true,
            isEditable: true|false,
            isFetching: true|false
        }
    },
    job: {
        id: "1",
        slug: "1-jobt-itle",
        title: "Job title",
        url: "",
        description: "Lorem ...",
        companyName: "company",
        companyWebsite: "http://",
        companyEmail: "some@email.com",
        companyLogo: "logo.png",
        address: "address",
        type: "full-time",
        createdAt: 12344567890,
        isEditable: true|false,
        isProcessing: true|false,
        isFetching: true|false
        isPreview: false|true
    }
}
