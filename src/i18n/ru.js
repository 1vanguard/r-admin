import russianMessages from 'ra-language-russian';

const ru = {
    ...russianMessages,
    notification: {
        registrationSuccess: "Регистрация завершена. Пользователь успешно создан. Вы можете войти в систему, используя свои учетные данные."
    },
    errors: {

    },
    common: {
        created_at: 'Создано',
        logs: 'Логи',
        pairs: 'Пары',
        pause_until: 'Пауза до',
    },
    state: {
        states: {
            active: 'Активно',
            innactive: 'Неактивно',
            pause: 'Пауза',
            deleted: 'Удалено',
        },
        spec_states: {
            api_not_ready: 'API не исправно',
            api_ready: 'API исправно',
            no_pairs: 'Пары отсутствуют',
            exchange_not_set: 'Биржа не установлена',
            no_api_data: 'Нет данных API',
        },
        name: 'Состояние |||| Состояния',
    },
    resources: {
        bots: {
            name: 'Бот |||| Боты',
            fields: {
                id: 'ID',
                state: 'Состояние',
                title: 'Название',
                exchanges: 'Биржи',
                exchange_id: 'Биржа',
                pairs: 'Пары',
                auto_start_sum: 'Ордера',
                auto_profit: 'Прибыль, %',
                botlimit: 'Лимит',
                in_trades: 'В торгах',
                profit: 'Прибыль',
            }
        },
        pairs: {
            name: 'Пара |||| Пары',
            fields: {
                bot_id: 'ID Бота',
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