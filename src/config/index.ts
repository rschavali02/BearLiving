export const PRODUCT_CATERGORIES = [
    {
        label: "Apartments",
        value: "apartments" as const, 
        featured: [
            {
                name: 'Newest Additions',
                href: "#",
                imageSRC: "/apartments/aptone.jpg",

            },
            {
                name: 'Balling on a Budget',
                href: "#",
                imageSRC: "/apartments/apttwo.jpg",

            },
            {
                name: "Most Luxurious",
                href: "#",
                imageSRC: '/apartments/aptthree.jpg',

            },
        ],
    },
    {
        label: "Houses",
        value: "houses" as const, 
        featured: [
            {
                name: 'Newest Additions',
                href: "#",
                imageSRC: "/houses/houseone.png",

            },
            {
                name: 'Balling on a Budget',
                href: "#",
                imageSRC: "/houses/housetwo.png",

            },
            {
                name: "Most Luxurious",
                href: "#",
                imageSRC: '/houses/housethree.png',

            },
        ],
    },
]