{
    user: {
        id: "1",
        role: "guest|editor|admin"
    },
    filter: "",
    jobs: {
        isFetching: true|false,
        lastUpdated: 1234567890,
        items: [
            {
                id: "1",
                slug: "1-jobt-itle",
                title: "Job title",
                company: "company",
                address: "address",
                type: "full-time",
                created: 12344567890,
                logo: "logo.png"
            }
        ]
    },
    job: {
        id: "1",
        slug: "1-jobt-itle",
        title: "Job title",
        content: "Lorem ...",
        company: "company",
        address: "address",
        type: "full-time",
        created: 12344567890,
        logo: "logo.png",
        isEditable: true|false
        isFetching: true|false
    }
}