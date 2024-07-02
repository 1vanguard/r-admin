import russianMessages from 'ra-language-russian';

const ru = {
    ...russianMessages,
    active: 'Активно',
    admin: 'Администратор',
    client: 'Клиент',
    deleted: 'Удалено',
    inactive: 'Неактивно',
    manager: 'Менеджер',
    pause: 'Пауза',
    notification: {
        registrationSuccess: "Регистрация завершена. Пользователь успешно создан. Вы можете войти в систему, используя свои учетные данные."
    },
    registration: {
        registrationSuccess: "Регистрация завершена. Пользователь успешно создан. Вы можете войти в систему, используя свои учетные данные."
    },
    warnings: {
        create_bot_warning_01: 'Только администраторы и менеджеры могут создавать ботов',
        create_exchange_warning_01: 'Только администраторы могут создавать биржи',
        create_office_warning_01: 'Только администраторы могут создавать офисы',
        create_pair_warning_01: 'Только администраторы и менеджеры могут создавать пары',
        create_whitelist_warning_01: 'Только администраторы и менеджеры могут создавать белые списки',
        not_enough_permissions: 'Недостаточно прав'
    },
    errors: {
        dataError: "Ошибка данных",
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
        auto_rsi_min_sell_label: 'Минимальное значение RSI для продажи',
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
        bot_has_no_inactive_pairs: "У бота нет неактивных пар",
        bot: 'Бот',
        botlimit_label: 'Торговый лимит',
        client: 'Клиент',
        created_at: 'Создано',
        do_not_use: 'Не используется',
        exchange_create_heading: 'Создание новой биржи',
        exchange_main_heading: 'Основные настройки биржи',
        exchange: 'Биржа',
        id: "ID",
        in_orders: 'В ордерах',
        in_trades: 'В торгах',
        inactive_pairs: "Неактивные пары",
        limit: 'Лимит',
        logs: 'Логи',
        long_dump_label: 'Процентное снижение цены за блокировку на месяц',
        long_pump_label: 'Процентное повышение цены за блокировку на месяц',
        next_buy_timeout_label: 'Тайм-аут до следующей покупки (секунды)',
        no_orders: 'Нет ордеров',
        no_pairs: "Нет пар",
        number_of_pairs: 'Количество пар',
        office_create_heading: 'Создание нового офиса',
        office_edit_tab_01_main_heading: 'Основные настройки офиса',
        office_edit_tab_01: 'Основные настройки',
        office_edit_tab_02_main_heading: 'Статистика офиса',
        office_edit_tab_02: 'Статистика',
        office_edit_tab_03_main_heading: 'Пользователи офиса',
        office_edit_tab_03: 'Пользователи',
        office: 'Офис',
        opened_orders: 'Открытые ордера',
        pair_create_heading: 'Создание новой пары',
        pair_edit_tab_01_main_heading: 'Основные настройки пары',
        pair_edit_tab_01: 'Основные настройки',
        pair_edit_tab_02_main_heading: 'Индикаторы пары',
        pair_edit_tab_02: 'Индикаторы',
        pair_edit_tab_03_main_heading: 'История пауз пары',
        pair_edit_tab_03: 'Паузы',
        pair_indicators_group_01_heading: 'Группа индикаторов 1',
        pair_indicators_group_01_tooltip_title: 'Какой-то текстт для группа индикаторов 1.',
        pair_indicators_group_02_heading: 'Группа индикаторов 2',
        pair_indicators_group_02_tooltip_title: 'Какой-то текстт для группа индикаторов 2.',
        pair_indicators_group_03_heading: 'Группа индикаторов 3',
        pair_indicators_group_03_tooltip_title: 'Какой-то текстт для группа индикаторов 3.',
        pair_indicators_group_04_heading: 'Группа индикаторов 4',
        pair_indicators_group_04_tooltip_title: 'Какой-то текстт для группа индикаторов 4.',
        pair_indicators_group_05_heading: 'Группа индикаторов 5',
        pair_indicators_group_05_tooltip_title: 'Какой-то текстт для группа индикаторов 5.',
        pair_indicators_group_06_heading: 'Группа индикаторов 6',
        pair_indicators_group_06_tooltip_title: 'Какой-то текстт для группа индикаторов 6.',
        pair_orders_tab_01_label: 'Открытые ордера',
        pair_orders_tab_02_label: 'Последние ордера',
        pair: 'Пара',
        pairs: 'Пары',
        pause_end_not_set: 'Конец паузы не установлен',
        pause_until: 'Пауза до',
        pd_down_label: 'Максимальное падение BTC в час, %',
        pd_pause_label: 'Пауза для бота, часы',
        pd_up_label: 'Максимальный прирост BTC за час, %',
        period: 'Период',
        price: 'Цена',
        profit: 'Прибыль',
        purchases: 'Покупки',
        qty: 'Кол-во',
        rsi_heading_01: 'Короткий RSI',
        rsi_heading_02: 'RSI для продажи',
        rsi_l: 'RSI_L',
        rsi_long_tf_label: 'Таймфрейм RSI для входа (длинный)',
        rsi_period_1h_label: 'RSI период (длинный)',
        rsi_period_label: 'RSI Период',
        rsi_s: 'RSI_S',
        rsi_sell_diff_label: 'Разница с предыдущим значением RSI для продажи, %',
        rsi_sell: 'RSI_SELL',
        rsi_short_tf_label: 'Таймфрейм RSI для входа (короткий)',
        rsi_timeframe_label: 'RSI Таймфрейм',
        sales: 'Продажи',
        sell_done_orders: 'Выполненные ордера на продажу',
        sell_order: 'Ордер на продажу',
        sell_price: 'Цена продажи',
        sell_qty: 'Кол-во продажи',
        settings: 'Настройки',
        show_inactive_bots_pairs: "Показать неактивные пары бота",
        start_order: 'Начальный ордер',
        start_sum: 'Начальная сумма',
        step: 'Шаг',
        timeframe: 'Таймфрейм',
        timeout_label: 'Тайм-аут для входа в пару, (секунды)',
        total_amount_in_trades_of_all_pairs: 'Общая сумма в торгах всех пар',
        total_customer_balance: 'Общий баланс покупок',
        usdt: 'USDT',
        useBNB_label: 'Использовать BNB токен для оплаты комиссий',
        user_edit_tab_01_main_heading: 'Основные настройки пользователя',
        user_edit_tab_01: 'Основные настройки',
        user_edit_tab_02_main_heading: 'Боты пользователя',
        user_edit_tab_02: 'Боты',
        user: 'Пользователь',
        username: 'Имя пользователя',
        whitelist: 'Белый список',
        whitelist_create_heading: 'Создание элемента белого списка',
        whitelist_label: 'Белый список',
        whitelist_main_heading: 'Основные настройки белого списка',
    },
    resources: {
        bots: {
            name: 'Бот |||| Боты',
            fields: {
                apikey: 'API ключ',
                apipassword: 'API пароль',
                apisecret: 'API секрет',
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
        exchanges: {
            name: 'Биржа |||| Биржи',
            fields: {
                currencies: 'Валюты',
                id: 'ID',
                state: 'Состояние',
                title: 'Название',
            },
        },
        offices: {
            name: 'Офис |||| Офисы',
            fields: {
                id: 'ID',
                title: 'Название',
                state: 'Состояние',
                address: 'Адрес',
                phone: 'Телефон',
                url: 'Ссылка',
            },
        },
        pairs: {
            name: 'Пара |||| Пары',
            fields: {
                alt_cur: 'Альтернативная валюта',
                auto_rsi_max_big: 'Максимальное значение RSI для входа в пару',
                auto_rsi_max_sell: 'Максимальное значение RSI для продажи',
                auto_rsi_min_big: 'Минимальное значение RSI для входа в пару',
                auto_rsi_min_sell: 'Минимальное значение RSI для продажи',
                base_cur: 'Базовая валюта',
                bot_id: 'Бот',
                exchange_id: 'Биржа',
                growth: 'Процент роста рынка',
                id: 'ID',
                long_dump: 'Процентное снижение цены за блокировку на месяц',
                long_pump: 'Процентное увеличение цены за блокировку на месяц',
                next_buy_timeout: 'Тайм-аут после покупки (секунды)',
                pair_limit: 'Лимит пары',
                pause_until: 'Пауза до',
                pd_down: 'Минимальный рост за день, %',
                pd_up: 'Максимальный рост за день, %',
                profit: 'Прибыль в %',
                rsi_diff: 'Отличие от предыдущего RSI, %',
                rsi_max_1h: 'RSI максимальный (длинный)',
                rsi_max: 'RSI макс.',
                rsi_min_1h: 'RSI минимальный (длинный)',
                rsi_min: 'RSI мин.',
                rsi_sell_diff: 'Отличие от предыдущего RSI для продажи, %',
                rsi_sell: 'Продать по сигналу RSI',
                squiz: 'Процент проскальзывания',
                start_orders: 'Начальные ордера',
                start_sum: 'Начальная сумма ордера в базовой валюте',
                start_timeout: 'Тайм-аут (секунды)',
                state: 'Состояние',
                step: 'Шаг',
                symbol: 'Символ',
                use_ltf: 'Использовать длинный таймфрейм для покупки',
            }
        },
        roles: {
            name: 'Роль |||| Роли',
            fields: {
                id: 'ID',
                name: 'Название',
                parent_role: 'Родительская роль',
                state: 'Состояние',
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
                    zipcode: 'Почтовый индекс',
                },
                company: {
                    name: 'Компания'
                },
                email: 'E-mail',
                firstName: 'Имя',
                id: 'ID',
                lastName: 'Фамилия',
                lastVisit: 'Последняя активность',
                name: 'Имя',
                office_id: 'Офис',
                officeId: 'Офис',
                password: 'Пароль',
                phone: 'Телефон',
                registrationDate: 'Дата регистрации',
                role: 'Роль',
                state: 'Состояние',
                telegram: 'Telegram',
                username: 'Имя пользователя',
                website: 'Сайт',
            }
        },
        whitelist: {
            name: 'Белый список |||| Белые списки',
            fields: {
                id: 'ID',
                state: 'Состояние',
                symbol: 'Название',
            }
        },
    },
    state: {
        spec_states: {
            api_not_ready: 'API не исправно',
            api_ready: 'API исправно',
            no_pairs: 'Пары отсутствуют',
            exchange_not_set: 'Биржа не установлена',
            no_api_data: 'Нет данных API',
        },
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