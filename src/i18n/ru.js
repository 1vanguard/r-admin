import russianMessages from 'ra-language-russian';

 const ru = {
    ...russianMessages,
    notification: {
        registrationSuccess: "Регистрация завершена. Пользователь успешно создан. Вы можете войти в систему, используя свои учетные данные."
    },
    resources: {
        bots: {
            name: 'Бот |||| Боты'
        },
        posts: {
            name: 'Пост |||| Посты',
            fields: {
                body: 'Текст',
                title: 'Заголовок',
                userId: 'Пользователь'
            }
        },
        users: {
            name: 'Пользователь |||| Пользователи',
            fields: {
                address: {
                    city: 'Город',
                    geo: {
                        lat: 'Широта',
                        lng: 'Долгота'
                    },
                    street: 'Улица',
                    suite: 'Квартира',
                    zipcode: 'Почтовый индекс'
                },
                company: {
                    name: 'Компания'
                },
                email: 'E-mail',
                firstName: 'Имя',
                lastName: 'Фамилия',
                lastVisit: 'Последняя активность',
                id: 'ID',
                name: 'Имя',
                registrationDate: 'Дата регистрации',
                role: 'Роль',
                phone: 'Телефон',
                username: 'Имя пользователя',
                website: 'Сайт',
            }
        }
    }
}

export default ru