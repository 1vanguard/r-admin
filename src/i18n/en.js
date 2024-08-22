import englishMessages from 'ra-language-english';

const en = {
    ...englishMessages,
    active: 'Active',
    admin: 'Administrator',
    client: 'Client',
    deleted: 'Deleted',
    inactive: 'Inactive',
    manager: 'Manager',
    pause: 'Pause',
    notification: {
        registrationSuccess: "Registration is done. User successfully created. You can sign in with your credentials."
    },
    registration: {
        registrationSuccess: "Registration is done. User successfully created. You can sign in with your credentials."
    },
    warnings: {
        create_bot_warning_01: 'Only admins and managers can create bots',
        create_exchange_warning_01: 'Only admins can create exchanges',
        create_exchange_warning_02: 'Offices are not created. Please, create offices first',
        create_exchange_warning_03: 'Exchanges are not created. Please, create exchanges first',
        create_office_warning_01: 'Only admins can create offices',
        create_pair_warning_01: 'Only admins and managers can create pairs',
        create_user_warning_01: 'Only admins and managers can create users',
        create_whitelist_warning_01: 'Only admins and managers can create whitelists',
        not_enough_permissions: 'Not enough permissions'
    },
    errors: {
        dataError: "Data error",
        error: "Error",
        loadDataError: "Loading data error",
        loadPermissionsError: 'Error loading permissions',
        loadTimeFramesError: 'Error loading timeframes'
    },
    common: {
        actual: 'Actual',
        auto_buy_limit_label: 'Use a limit order when buying',
        auto_limit_pair_label: 'Limit for a pair',
        auto_long_tf_label: 'RSI timeframe (long)',
        auto_offset_label: 'Indent in %',
        auto_on_label: 'Enable autotrading',
        auto_order_count_label: 'Number of orders in a pair',
        auto_pair_count_label: 'Pairs quantity',
        auto_pair_tf_label: 'The RSI timeframe for choosing a pair',
        auto_pd_down_label: 'Max drop per day, %',
        auto_pd_pause_label: 'Pause for a pair, hours',
        auto_pd_up_label: 'Max growth per day, %',
        auto_profit_label: 'Profit, in %',
        auto_rsi_diff_label: 'Difference from the previous RSI value for purchase, %',
        auto_rsi_max_1h_label: 'RSI max. (long)',
        auto_rsi_max_big_label: 'Max. RSI to enter the pair',
        auto_rsi_max_label: 'RSI max.',
        auto_rsi_max_sell_label: 'Max. RSI for sale',
        auto_rsi_min_1h_label: 'RSI min. (long)',
        auto_rsi_min_big_label: 'Min. RSI to enter the pair',
        auto_rsi_min_label: 'RSI min.',
        auto_rsi_min_sell_label: 'Min. RSI for sale',
        auto_rsi_period_1h_label: 'RSI period (long)',
        auto_rsi_period_label: 'The RSI period for entry',
        auto_sell_limit_label: 'Use a limit order when selling',
        auto_sell_period_label: 'The RSI period for sale',
        auto_sell_tf_label: 'The RSI timeframe for sale',
        auto_short_tf_label: 'RSI timeframe for entry',
        auto_squiz_label: 'Slippage, in %',
        auto_start_sum_label: 'Initial order amount',
        auto_step_label: 'Order step, in %',
        bot_create_heading: 'Create new bot',
        bot_edit_tab_01_main_heading: 'Bot main settings',
        bot_edit_tab_01: 'Main settings',
        bot_edit_tab_02_main_heading: 'Bot automation settings',
        bot_edit_tab_02: 'Auto',
        bot_edit_tab_03_main_heading: 'RSI settings',
        bot_edit_tab_03: 'RSI',
        bot_edit_tab_04_main_heading: 'The history of bot pauses',
        bot_edit_tab_04: 'Pauses',
        bot_edit_tab_05: 'Pairs',
        bot_has_no_inactive_pairs: "Bot has no inactive pairs",
        bot_indicators_group_01_heading: 'Indicators group 1',
        bot_indicators_group_01_tooltip_title: 'Some text for indicators group 1. Lorerm ipsum dolar sit amet.',
        bot_indicators_group_02_heading: 'Indicators group 2',
        bot_indicators_group_02_tooltip_title: 'Some text for indicators group 2. Lorerm ipsum dolar sit amet.',
        bot_indicators_group_03_heading: 'Indicators group 3',
        bot_indicators_group_03_tooltip_title: 'Some text for indicators group 3. Lorerm ipsum dolar sit amet.',
        bot_indicators_group_04_heading: 'Indicators group 4',
        bot_indicators_group_04_tooltip_title: 'Some text for indicators group 4. Lorerm ipsum dolar sit amet.',
        bot_indicators_group_05_heading: 'Indicators group 5',
        bot_indicators_group_05_tooltip_title: 'Some text for indicators group 5. Lorerm ipsum dolar sit amet.',
        bot_indicators_group_06_heading: 'Indicators group 6',
        bot_indicators_group_06_tooltip_title: 'Some text for indicators group 6. Lorerm ipsum dolar sit amet.',
        bot: 'Bot',
        botlimit_label: 'Trading limit',
        bought: 'Bought',
        client: 'Client',
        created_at: 'Created at',
        do_not_use: 'Do not use',
        exchange_create_heading: 'Create new exchange',
        exchange_main_heading: 'Exchange main settings',
        exchange: 'Exchange',
        id: "ID",
        in_orders: 'In orders',
        in_trades: 'In trades',
        is_strategy: 'Is strategy',
        inactive_pairs: "Inactive pairs",
        limit: 'Limit',
        logs: 'Logs',
        long_dump_label: 'Percentage price drop for blocking for a month',
        long_pump_label: 'Percentage price increase for blocking for a month',
        next_buy_timeout_label: 'Timeout until the next purchase (seconds)',
        no_orders: 'No orders',
        no_pairs: "No pairs",
        number_of_pairs: 'Number of pairs',
        office_create_heading: 'Create new office',
        office_edit_tab_01_main_heading: 'Office main settings',
        office_edit_tab_01: 'Main settings',
        office_edit_tab_02_main_heading: 'Office statistics',
        office_edit_tab_02: 'Statistics',
        office_edit_tab_03_main_heading: 'Office users',
        office_edit_tab_03: 'Users',
        office: 'Office',
        opened_orders: 'Opened orders',
        orders: 'Orders',
        pair_create_heading: 'Create newpair',
        pair_edit_tab_01_main_heading: 'Pair main settings',
        pair_edit_tab_01: 'Main settings',
        pair_edit_tab_02_main_heading: 'Pair indicators settings',
        pair_edit_tab_02: 'Indicators',
        pair_edit_tab_03_main_heading: 'The history of pair pauses',
        pair_edit_tab_03: 'Pauses',
        pair_edit_tab_04_main_heading: 'Pair orders',
        pair_edit_tab_04: 'Orders',
        pair_has_no_inactive_orders: "Pair has no inactive orders",
        pair_indicators_group_01_heading: 'Indicators group 1',
        pair_indicators_group_01_tooltip_title: 'Some text for indicators group 1. Lorerm ipsum dolar sit amet.',
        pair_indicators_group_02_heading: 'Indicators group 2',
        pair_indicators_group_02_tooltip_title: 'Some text for indicators group 2. Lorerm ipsum dolar sit amet.',
        pair_indicators_group_03_heading: 'Indicators group 3',
        pair_indicators_group_03_tooltip_title: 'Some text for indicators group 3. Lorerm ipsum dolar sit amet.',
        pair_indicators_group_04_heading: 'Indicators group 4',
        pair_indicators_group_04_tooltip_title: 'Some text for indicators group 4. Lorerm ipsum dolar sit amet.',
        pair_indicators_group_05_heading: 'Indicators group 5',
        pair_indicators_group_05_tooltip_title: 'Some text for indicators group 5. Lorerm ipsum dolar sit amet.',
        pair_indicators_group_06_heading: 'Indicators group 6',
        pair_indicators_group_06_tooltip_title: 'Some text for indicators group 6. Lorerm ipsum dolar sit amet.',
        pair_orders_tab_01_label: 'Opened orders',
        pair_orders_tab_02_label: 'Last orders',
        pair: 'Pair',
        pairs: 'Pairs',
        pause_end_not_set: 'End of pause not set',
        pause_until: 'Pause until',
        pd_down_label: 'Max BTC drop per hour, %',
        pd_pause_label: 'Pause for a bot, hours',
        pd_up_label: 'Max BTC growth per hour, %',
        period: 'Period',
        price: 'Price',
        profit: 'Profit',
        purchases: 'Purchases',
        qty: 'Qty',
        rsi_heading_01: 'Short RSI',
        rsi_heading_02: 'RSI for sale',
        rsi_l: 'RSI_L',
        rsi_long_tf_label: 'RSI timeframe (long)',
        rsi_period_1h_label: 'RSI period (long)',
        rsi_period_label: 'RSI Period',
        rsi_s: 'RSI_S',
        rsi_sell_diff_label: 'Difference from the previous RSI value for sale, %',
        rsi_sell: 'RSI_SELL',
        rsi_short_tf_label: 'The RSI timeframe for entry (short)',
        rsi_timeframe_label: 'RSI Timeframe',
        sales: 'Sales',
        sell_by_market: 'Sell by market',
        sell_done_orders: 'Sell done orders',
        sell_order: 'Sell order',
        sell_price: 'Sell price',
        sell_qty: 'Sell qty',
        settings: 'Settings',
        show_inactive_bots_pairs: "Show inactive pairs of bot",
        sold: 'Sold',
        start_order: 'Start order',
        start_sum: 'Initial amount',
        state: 'State',
        step: 'Step',
        strategy: 'Strategy',
        time: 'Time',
        timeframe: 'Timeframe',
        timeout_label: 'Timeout for entering the pair, (seconds)',
        total_amount_in_trades_of_all_pairs: 'Total amount in trades of all pairs',
        total_customer_balance: 'Total customer balance',
        usdt: 'USDT',
        use_strategy: 'Use strategy',
        use_strategy_desc: 'All selected bot settings will be overwritten from selected strategy while bot saving',
        useBNB_label: 'Use BNB token for paying commission',
        user_create_heading: 'Create new user',
        user_edit_tab_01_main_heading: 'User main settings',
        user_edit_tab_01: 'Main settings',
        user_edit_tab_02_main_heading: 'User bots',
        user_edit_tab_02: 'Bots',
        user: 'User',
        username: 'Username',
        whitelist_create_heading: 'Whitelist item create',
        whitelist_label: 'Whitelist',
        whitelist_main_heading: 'Whitelist settings',
        whitelist: 'Whitelist',
    },
    resources: {
        bots: {
            name: 'Bot |||| Bots',
            fields: {
                apikey: 'API key',
                apipassword: 'API password',
                apisecret: 'API secret',
                auto_limit_pair: 'Pair limit',
                auto_offset: 'Indent in %',
                auto_order_count: 'Number of orders in a pair',
                auto_pair_count: 'Pairs quantity',
                auto_pd_pause: 'Pause for a pair, hours',
                auto_profit: 'Profit',
                auto_rsi_diff: 'Difference from the previous RSI value for purchase, %',
                auto_rsi_max_1h: 'RSI max. (long)',
                auto_rsi_period: 'The RSI period for entry',
                auto_rsi_period_1h: 'RSI period (long)',
                auto_start_sum: 'Initial order amount',
                auto_step: 'Order step, in %',
                auto_squiz: 'Slippage, in %',
                auto_use_ltf: 'Use a long timeframe when buying',
                baseAsset: 'Replenishment currency',
                botlimit: 'Limit',
                created: 'Date of creation',
                exchange_id: 'Exchange',
                exchanges: 'Exchanges',
                id: 'ID',
                in_trades: 'In trades',
                is_strategy: 'Is a strategy',
                long_dump: 'A percentage drop in the price for blocking for a month',
                long_pump: 'A percentage increase in the price for blocking for a month',
                next_buy_timeout: 'Timeout until the next purchase (seconds)',
                pairs: 'Pairs',
                pause_until: 'Pause until',
                pd_down: 'Max BTC drop per hour, %',
                pd_pause: 'Pause for a bot, hours',
                pd_up: 'Max BTC growth per hour, %',
                profit: 'Profit',
                rsi_sell_diff: 'Difference from the previous RSI value for sale, %',
                state: 'State',
                strategy: 'Strategy',
                timeout: 'Timeout for entering the pair, (seconds)',
                title: 'Title',
                use_strategy: 'Use strategy',
                whitelist: 'Whitelist',
            }
        },
        bot_pause: {
            name: 'Pause |||| Pauses',
            fields: {
                bot_id: 'Bot ID',
                pause_end: 'End of pause',
                pause_start: 'Start of pause',
            },
        },
        exchanges: {
            name: 'Exchange |||| Exchanges',
            fields: {
                comission_buy: 'Buy commission',
                comission_sell: 'Sell commission',
                currencies: 'Currencies',
                id: 'ID',
                market_type: 'Market type',
                min_order_usdt: 'Minimum order amount in USDT',
                state: 'State',
                title: 'Title',
            },
        },
        fbots: {
            name: 'FBot |||| FBots',
            fields: {
                apikey: 'API key',
                apipassword: 'API password',
                apisecret: 'API secret',
                auto_limit_pair: 'Pair limit',
                auto_offset: 'Indent in %',
                auto_order_count: 'Number of orders in a pair',
                auto_pair_count: 'Pairs quantity',
                auto_pd_pause: 'Pause for a pair, hours',
                auto_profit: 'Profit',
                auto_rsi_diff: 'Difference from the previous RSI value for purchase, %',
                auto_rsi_max_1h: 'RSI max. (long)',
                auto_rsi_period: 'The RSI period for entry',
                auto_rsi_period_1h: 'RSI period (long)',
                auto_start_sum: 'Initial order amount',
                auto_step: 'Order step, in %',
                auto_squiz: 'Slippage, in %',
                auto_use_ltf: 'Use a long timeframe when buying',
                baseAsset: 'Replenishment currency',
                botlimit: 'Limit',
                created: 'Date of creation',
                exchange_id: 'Exchange',
                exchanges: 'Exchanges',
                id: 'ID',
                in_trades: 'In trades',
                is_strategy: 'Is a strategy',
                long_dump: 'A percentage drop in the price for blocking for a month',
                long_pump: 'A percentage increase in the price for blocking for a month',
                next_buy_timeout: 'Timeout until the next purchase (seconds)',
                pairs: 'Pairs',
                pause_until: 'Pause until',
                pd_down: 'Max BTC drop per hour, %',
                pd_pause: 'Pause for a bot, hours',
                pd_up: 'Max BTC growth per hour, %',
                profit: 'Profit',
                rsi_sell_diff: 'Difference from the previous RSI value for sale, %',
                state: 'State',
                strategy: 'Strategy',
                timeout: 'Timeout for entering the pair, (seconds)',
                title: 'Title',
                use_strategy: 'Use strategy',
                whitelist: 'Whitelist',
            }
        },
        fpairs: {
            name: 'FPair |||| FPairs',
            fields: {
                alt_cur: 'Alternative currency',
                auto_rsi_max_big: 'Max RSI to enter the pair',
                auto_rsi_max_sell: 'Max RSI for sale',
                auto_rsi_min_big: 'Min RSI to enter the pair',
                auto_rsi_min_sell: 'Min RSI for sale',
                auto_rsi_period: 'The RSI period for entry',
                base_cur: 'Base currency',
                bot_id: 'Bot',
                exchange_id: 'Exchange',
                growth: 'Percentage of market growth',
                id: 'ID',
                last_buy: 'Last buy date',
                long_dump: 'A percentage drop in the price for blocking for a month',
                long_pump: 'A percentage increase in the price for blocking for a month',
                next_buy_timeout: 'Timeout after purchase (seconds)',
                pair_limit: 'Pair limit',
                pause_until: 'Пауза до',
                pd_down: 'Min growth per day, %',
                pd_up: 'Max growth per day, %',
                price: 'Price',
                profit: 'Profit in %',
                rsi_diff: 'Difference from the previous RSI, %',
                rsi_max_1h: 'RSI max. (long)',
                rsi_max: 'RSI max.',
                rsi_min_1h: 'RSI min. (long)',
                rsi_min: 'RSI min.',
                rsi_sell_diff: 'Difference from the previous RSI for sale, %',
                rsi_sell: 'Sell on the RSI signal',
                squiz: 'Squiz',
                start_orders: 'Start orders',
                start_sum: 'The initial amount of the order in base currency',
                start_timeout: 'Timeout (seconds)',
                state: 'State',
                step: 'Step',
                symbol: 'Symbol',
                use_ltf: 'Use a long timeframe when buying',
            }
        },
        offices: {
            name: 'Office |||| Offices',
            fields: {
                id: 'ID',
                title: 'Title',
                state: 'State',
                address: 'Адрес',
                phone: 'Phone',
                url: 'url',
            },
        },
        pairs: {
            name: 'Pair |||| Pairs',
            fields: {
                alt_cur: 'Alternative currency',
                auto_rsi_max_big: 'Max RSI to enter the pair',
                auto_rsi_max_sell: 'Max RSI for sale',
                auto_rsi_min_big: 'Min RSI to enter the pair',
                auto_rsi_min_sell: 'Min RSI for sale',
                auto_rsi_period: 'The RSI period for entry',
                base_cur: 'Base currency',
                bot_id: 'Bot',
                exchange_id: 'Exchange',
                growth: 'Percentage of market growth',
                id: 'ID',
                last_buy: 'Last buy date',
                long_dump: 'A percentage drop in the price for blocking for a month',
                long_pump: 'A percentage increase in the price for blocking for a month',
                next_buy_timeout: 'Timeout after purchase (seconds)',
                pair_limit: 'Pair limit',
                pause_until: 'Пауза до',
                pd_down: 'Min growth per day, %',
                pd_up: 'Max growth per day, %',
                price: 'Price',
                profit: 'Profit in %',
                rsi_diff: 'Difference from the previous RSI, %',
                rsi_max_1h: 'RSI max. (long)',
                rsi_max: 'RSI max.',
                rsi_min_1h: 'RSI min. (long)',
                rsi_min: 'RSI min.',
                rsi_sell_diff: 'Difference from the previous RSI for sale, %',
                rsi_sell: 'Sell on the RSI signal',
                squiz: 'Squiz',
                start_orders: 'Start orders',
                start_sum: 'The initial amount of the order in base currency',
                start_timeout: 'Timeout (seconds)',
                state: 'State',
                step: 'Step',
                symbol: 'Symbol',
                use_ltf: 'Use a long timeframe when buying',
            }
        },
        roles: {
            name: 'Role |||| Roles',
            fields: {
                id: 'ID',
                name: 'Name',
                parent_role: 'Parent role',
                state: 'State',
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
                id: 'ID',
                lastName: 'Last Name',
                lastVisit: 'Last Activity',
                lastvisitDate: 'Last visit date',
                name: 'Name',
                office_id: 'Office',
                officeId: 'Office',
                password: 'Password',
                phone: 'Phone',
                registerDate: 'Registration date',
                registrationDate: 'Registration date',
                role: 'Role',
                state: 'State',
                telegram: 'Telegram',
                username: 'Username',
                website: 'Website',
            }
        },
        whitelist: {
            name: 'Whitelist |||| Whitelist',
            fields: {
                id: 'ID',
                state: 'State',
                symbol: 'Symbol',
            }
        },
    },
    state: {
        spec_states: {
            api_not_ready: 'API not ready',
            api_ready: 'API ready',
            no_pairs: 'No pairs',
            exchange_not_set: 'Exchange not set',
            no_api_data: 'No API data',
        },
    },
    timeFrames: {
        minShort: 'min.',
        minShortPlural: 'mins.',
        hourShort: 'h.',
        hourShortPlural: 'hs.',
        dayShort: 'd.',
        dayShortPlural: 'ds.',
        weekShort: 'w.',
        weekShortPlural: 'ws.',
        monthShort: 'mth.',
        monthShortPlural: 'mths.'
    }
}

export default en