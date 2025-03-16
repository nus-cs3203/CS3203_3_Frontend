//TODO: Remove once polls API is set up later

export const pollTemplatesHardCodedData = [
    {
        id: 1,
        question: "Is the current level of government intervention in the NTUC Income-Allianz deal sufficient to protect the interests of Singaporean policyholders?",
        category: "Economy",
        reasoning: "The discussions highlight concerns about the potential negative impact of the Allianz acquisition on NTUC Income's social mission and the adequacy of regulatory oversight.",
        question_type: "Open-ended",
        options: [],
        date_created: '2024-01-05'
    },
    {
        id: 2,
        question: "Should Singapore preschools implement mandatory CCTV monitoring in classrooms to increase transparency and accountability?",
        category: "Education",
        reasoning: "Addresses parental concerns about preschool safety and explores potential solutions in light of reported abuse cases.",
        question_type: "MCQ",
        options: ["Yes for enhanced safety", "No it infringes on privacy", "Maybe with strict regulations" ],
        date_created: '2024-01-05'
    }, 
]


export const unpublishedPolls = [
    {
        id: 3,
        question: "How satisfied are you with the current state of Singapore's recycling efforts?",
        category: "Environment",
        question_type: "MCQ",
        options: ["Very satisfied", "Satisfied"],
        date_created: "2024-01-05",
        date_published: "",
        date_closed: "",
        status: "Unpublished"
    },
    {
        id: 4,
        question: "What is your opinion on Japan's release of treated water into the ocean?",
        category: "Environment",
        question_type: "MCQ",
        options: ["Very satisfied", "Satisfied"],
        date_created: "2024-01-05",
        date_published: "",
        date_closed: "",
        status: "Unpublished"
    },
]

export const closedPolls = [
    {
        id: 5,
        question: "How concerned are you about teacher workload and well-being in Singapore's education system?",
        category: "Education",
        question_type: "Open-ended",
        options: [],
        date_created: "2024-01-05",
        date_published: "2024-01-06",
        date_closed: "2024-01-07",
        status: "Closed"
    },
    {
        id: 6,
        question: "What are your biggest concerns regarding scams in Singapore right now?",
        category: "Public Safety",
        question_type: "Open-ended",
        options: [],
        date_created: "2024-01-05",
        date_published: "2024-01-06",
        date_closed: "2024-01-07",
        status: "Closed"
    },
]

export const ongoingPolls = [
    {
        id: 7,
        question: "How concerned are you about data breaches and cyber security vulnerabilities in Singapore's digital services?",
        category: "Technology",
        question_type: "Open-ended",
        options: [],
        date_created: "2024-01-05",
        date_published: "2024-01-06",
        date_closed: "",
        status: "Published"
    },
    {
        id: 8,
        question: "Are social media platforms doing enough to prevent the creation of fake accounts impersonating public figures?",
        category: "Technology",
        question_type: "MCQ",
        options: ["Yes", "No", "Unsure"],
        date_created: "2024-01-05",
        date_published: "2024-01-06",
        date_closed: "",
        status: "Published"
    },
]



















// export const ongoingPolls = [
//     {
//         id: 1,
//         question: "How satisfied are you with SMRT's response to recent MRT delays?",
//         description: "Share your thoughts on how well SMRT handled the recent train disruptions. We want to know how well overall is SMRT really doing so we can help improve the transportation.",
//         reasoning: "",
//         type: "mcq",
//         options: ["Very unsatisfied", "Unsatisfied", "Satisfied", "Very satisfied"],
//         dateCreated: "24-01-2024",
//         datePublished: "25-01-2024",
//         dateClosed: "26-01-2024",
//         isAiGenerated: false,
//         status: "published"
//     },
//     {
//         id: 2,
//         question: "What improvements would you suggest for the cleanliness and state of hawker centres?",
//         description: "We'd love to hear your ideas on how we can keep our hawker centers clean and well-maintained.",
//         reasoning: "",
//         type: "open-ended",
//         options: [],
//         dateCreated: "24-01-2024",
//         datePublished: "25-01-2024",
//         dateClosed: "26-01-2024",
//         isAiGenerated: true,
//         status: "published"
//     },
// ]


export const pastCitizenPolls = [
    {
        id: 3,
        question: "What changes would you like to see in Singapore's public transportation system?",
        description: "Share your thoughts on how we can improve the convenience and efficiency of our public transport network.",
        reasoning: "",
        type: "open-ended",
        options: [],
        dateCreated: "24-01-2024",
        datePublished: "25-01-2024",
        dateClosed: "26-01-2024",
        isAiGenerated: false,
        status: "closed"
    },
]


export const allPolls = [
    {
        id: 1,
        question: "How satisfied are you with SMRT's response to recent MRT delays?",
        description: "Share your thoughts on how well SMRT handled the recent train disruptions. We want to know how well overall is SMRT really doing so we can help improve the transportation.",
        reasoning: "",
        type: "mcq",
        options: ["Very unsatisfied", "Unsatisfied", "Satisfied", "Very satisfied"],
        dateCreated: "24-01-2024",
        datePublished: "25-01-2024",
        dateClosed: "",
        isAiGenerated: false,
        status: "published"
    },
    {
        id: 2,
        question: "What improvements would you suggest for the cleanliness and state of hawker centres?",
        description: "We'd love to hear your ideas on how we can keep our hawker centers clean and well-maintained.",
        reasoning: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        type: "open-ended",
        options: [],
        dateCreated: "24-01-2024",
        datePublished: "25-01-2024",
        dateClosed: "",
        isAiGenerated: true,
        status: "published"
    },
    {
        id: 3,
        question: "What changes would you like to see in Singapore's public transportation system?",
        description: "Share your thoughts on how we can improve the convenience and efficiency of our public transport network.",
        reasoning: "",
        type: "open-ended",
        options: [],
        dateCreated: "24-01-2024",
        datePublished: "25-01-2024",
        dateClosed: "26-01-2024",
        isAiGenerated: false,
        status: "closed"
    },
    {
        id: 4,
        question: "How satisfied are you with the current state of Singapore's recycling efforts?",
        description: "Singapore has made significant strides in promoting recycling and sustainability, but we want to hear your thoughts. How effective do you think the current recycling programs are in your community? Are there areas you feel could be improved to make recycling more accessible or impactful?",
        reasoning: "",
        type: "mcq",
        options: ["Very satisfied", "Satisfied"],
        dateCreated: "24-01-2024",
        datePublished: "",
        dateClosed: "",
        isAiGenerated: false,
        status: "unpublished"
    },
    {
        id: 5,
        question: "How satisfied are you with the current state of Singapore's recycling efforts?",
        description: "Singapore has made significant strides in promoting recycling and sustainability, but we want to hear your thoughts. How effective do you think the current recycling programs are in your community? Are there areas you feel could be improved to make recycling more accessible or impactful?",
        reasoning: "",
        type: "mcq",
        options: ["Very satisfied", "Satisfied"],
        dateCreated: "24-01-2024",
        datePublished: "",
        dateClosed: "",
        isAiGenerated: false,
        status: "unpublished"
    },
    {
        id: 6,
        question: "How do you feel about the availability of green spaces?",
        description: "Green spaces like parks and gardens are vital for maintaining a healthy and livable environment. We want to know how well you think these spaces are being maintained in your neighborhood. Do you feel there are enough accessible areas to enjoy nature, or are there improvements that could be made?",
        reasoning: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        type: "open-ended",
        options: [],
        dateCreated: "24-01-2024",
        datePublished: "",
        dateClosed: "",
        isAiGenerated: true,
        status: "unpublished"
    },
    {
        id: 7,
        question: "How satisfied are you with the current state of Singapore's recycling efforts?",
        description: "Singapore has made significant strides in promoting recycling and sustainability, but we want to hear your thoughts. How effective do you think the current recycling programs are in your community? Are there areas you feel could be improved to make recycling more accessible or impactful?",
        reasoning: "",
        type: "mcq",
        options: ["Very satisfied", "Satisfied"],
        dateCreated: "24-01-2024",
        datePublished: "",
        dateClosed: "",
        isAiGenerated: false,
        status: "unpublished"
    },
]