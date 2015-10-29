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
            content: "Lorem ...",
            company: "company",
            address: "address",
            type: "full-time",
            created: 12344567890,
            logo: "logo.png",
            isComplete: false|true,
            isEditable: true|false,
            isFetching: true|false
        }
    },
}
