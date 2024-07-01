import russianMessages from 'ra-language-russian';

const ru = {
    ...russianMessages,
    notification: {
        registrationSuccess: "Регистрация завершена. Пользователь успешно создан. Вы можете войти в систему, используя свои учетные данные."
    },
    registration: {
        registrationSuccess: "Регистрация завершена. Пользователь успешно создан. Вы можете войти в систему, используя свои учетные данные."
    },
    warnings: {
        create_bot_warning_01: 'Только администраторы и менеджеры могут создавать ботов'
    },
    errors: {
        error: "Ошибка",
        loadDataError: "Ошибка загрузки данных",
        loadPermissionsError: 'Ошибка загрузки прав',
        loadTimeFramesError: 'Ошибка загрузки таймфреймов'
    },
    common: {
        actual: 'Реально',
        auto_buy_limit_label: 'Использовать лимитный ордер при покупке',
        auto_limit_pair_label: 'Лимит для пары',
        auto_long_tf_label: 'Таймфрейм RSI для входа',
        auto_offset_label: 'Отступ в %',
        auto_on_label: 'Использовать автотрейдинг',
        auto_order_count_label: 'Количество ордеров в паре',
        auto_pair_count_label: 'Количество пар',
        auto_pair_tf_label: 'Таймфрейм RSI для выбора пары',
        auto_pd_down_label: 'Максимальное падение в день, %',
        auto_pd_pause_label: 'Пауза для пары, часы',
        auto_pd_up_label: 'Максимальный рост в день, %',
        auto_profit_label: 'Прибыль, в %',
        auto_rsi_diff_label: 'Разница с предыдущим значением RSI для покупки, %',
        auto_rsi_max_1h_label: 'Максимальный RSI для входа',
        auto_rsi_max_big_label: 'Максимальное значение RSI для входа в пару',
        auto_rsi_max_label: 'Максимальный RSI для входа',
        auto_rsi_max_sell_label: 'Максимальный RSI для продажи',
        auto_rsi_min_1h_label: 'Минимальный RSI для входа',
        auto_rsi_min_big_label: 'Минимальное значение RSI для входа в пару',
        auto_rsi_min_label: 'Минимальный RSI для входа',
        auto_rsi_min_sell_label: 'Минимальный индекс RSI для продажи',
        auto_rsi_period_1h_label: 'Период RSI для входа',
        auto_rsi_period_label: 'Период RSI для входа',
        auto_sell_limit_label: 'Использовать лимитный ордер при продаже',
        auto_sell_period_label: 'Период RSI для продажи',
        auto_sell_tf_label: 'Таймфрейм RSI для продажи',
        auto_short_tf_label: 'Таймфрейм RSI для входа',
        auto_squiz_label: 'Проскальзывание, в %',
        auto_start_sum_label: 'Начальная сумма ордера',
        auto_step_label: 'Шаг ордера, в %',
        auto_use_ltf_label: 'Использовать длинный таймфрейм при покупке',
        bot_create_heading: 'Создание бота',
        bot_edit_tab_01_main_heading: 'Основные настройки бота',
        bot_edit_tab_01: 'Основные настройки',
        bot_edit_tab_02_main_heading: 'Настройки автоматики бота',
        bot_edit_tab_02: 'Авто',
        bot_edit_tab_03_main_heading: 'Настройки RSI',
        bot_edit_tab_03: 'RSI',
        bot_edit_tab_04_main_heading: 'История пауз бота',
        bot_edit_tab_04: 'Паузы',
        bot_edit_tab_05: 'Пары',
        bot: 'Бот',
        botlimit_label: 'Торговый лимит',
        client: 'Клиент',
        created_at: 'Создано',
        do_not_use: 'Не используется',
        in_trades: 'В торгах',
        limit: 'Лимит',
        logs: 'Логи',
        long_dump_label: 'Процентное снижение цены за блокировку на месяц',
        long_pump_label: 'Процентное повышение цены за блокировку на месяц',
        next_buy_timeout_label: 'Тайм-аут до следующей покупки (секунды)',
        number_of_pairs: 'Количество пар',
        opened_orders: 'Открытые ордера',
        pair: 'Пара',
        pairs: 'Пары',
        pause_end_not_set: 'Конец паузы не установлен',
        pause_until: 'Пауза до',
        pd_down_label: 'Максимальное падение BTC в час, %',
        pd_pause_label: 'Пауза для бота, часы',
        pd_up_label: 'Максимальный прирост BTC за час, %',
        period: 'Период',
        profit: 'Прибыль',
        rsi_heading_01: 'Короткий RSI',
        rsi_heading_02: 'RSI для продажи',
        rsi_sell_diff_label: 'Разница с предыдущим значением RSI для продажи, %',
        settings: 'Настройки',
        start_sum: 'Начальная сумма',
        step: 'Шаг',
        timeframe: 'Таймфрейм',
        timeout_label: 'Тайм-аут для входа в пару, (секунды)',
        total_amount_in_trades_of_all_pairs: 'Общая сумма в торгах всех пар',
        total_customer_balance: 'Общий баланс покупок',
        usdt: 'USDT',
        useBNB_label: 'Использовать BNB токен для оплаты комиссий',
        whitelist_label: 'Белый список',
    },
    resources: {
        bots: {
            name: 'Бот |||| Боты',
            fields: {
                apikey: 'API ключ',
                apisecret: 'API секрет',
                apipassword: 'API пароль',
                auto_profit: 'Прибыль',
                auto_start_sum: 'Ордера',
                baseAsset: 'Базовая валюта',
                botlimit: 'Лимит',
                exchange_id: 'Биржа',
                exchanges: 'Биржи',
                id: 'ID',
                in_trades: 'В торгах',
                pairs: 'Пары',
                profit: 'Прибыль',
                state: 'Состояние',
                title: 'Название',
            },
        },
        bot_pause: {
            name: 'Пауза |||| Паузы',
            fields: {
                bot_id: 'ID Бота',
                pause_end: 'Конец паузы',
                pause_start: 'Начало паузы',
            },
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
    timeFrames: {
        minShort: 'мин.',
        minShortPlural: 'мин.',
        hourShort: 'ч.',
        hourShortPlural: 'ч.',
        dayShort: 'д.',
        dayShortPlural: 'дн.',
        weekShort: 'нед.',
        weekShortPlural: 'нед.',
        monthShort: 'мес.',
        monthShortPlural: 'мес.'
    }
}

export default ru