import englishMessages from 'ra-language-english';

const en = {
    ...englishMessages,
    notification: {
        registrationSuccess: "Registration is done. User successfully created. You can sign in with your credentials."
    },
    registration: {
        registrationSuccess: "Registration is done. User successfully created. You can sign in with your credentials."
    },
    resources: {
        bots: {
            name: 'Bot |||| Bots',
            fields: {
                id: 'ID',
                state: 'State',
                title: 'Title',
            }
        },
        users: {
            name: 'User |||| Users',
            fields: {
                address: {
                    city: 'City',
                    geo: {
                        lat: 'Latitude',
                        lng: 'Longitude'
                    },
                    street: 'Street',
                    suite: 'Suite',
                    zipcode: 'Zip code'
                },
                company: {
                    name: 'Company name'
                },
                email: 'E-mail',
                firstName: 'First Name',
                lastName: 'Last Name',
                lastVisit: 'Last Activity',
                id: 'ID',
                name: 'Name',
                registrationDate: 'Registration date',
                role: 'Role',
                phone: 'Phone',
                username: 'Username',
                website: 'Website'
            }
        }
    }
}

export default en