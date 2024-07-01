import englishMessages from 'ra-language-english';

const en = {
    ...englishMessages,
    notification: {
        registrationSuccess: "Registration is done. User successfully created. You can sign in with your credentials."
    },
    registration: {
        registrationSuccess: "Registration is done. User successfully created. You can sign in with your credentials."
    },
    warnings: {
        create_bot_warning_01: 'Only admins and managers can create bots'
    },
    errors: {
        error: "Error",
        loadDataError: "Loading data error",
    },
    common: {
        actual: 'Actual',
        auto_buy_limit_label: 'Use a limit order when buying',
        auto_limit_pair_label: 'Limit for a pair',
        auto_long_tf_label: 'RSI timeframe for entry',
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
        auto_rsi_max_1h_label: 'Max. RSI for entry',
        auto_rsi_max_big_label: 'Max. RSI to enter the pair',
        auto_rsi_max_label: 'Max. RSI for entry',
        auto_rsi_max_sell_label: 'Max. RSI for sale',
        auto_rsi_min_1h_label: 'Min. RSI for entry',
        auto_rsi_min_big_label: 'Min. RSI to enter the pair',
        auto_rsi_min_label: 'Min. RSI for entry',
        auto_rsi_min_sell_label: 'Min. RSI for sale',
        auto_rsi_period_1h_label: 'The RSI period for entry',
        auto_rsi_period_label: 'The RSI period for entry',
        auto_sell_limit_label: 'Use a limit order when selling',
        auto_sell_period_label: 'The RSI period for sale',
        auto_sell_tf_label: 'The RSI timeframe for sale',
        auto_short_tf_label: 'RSI timeframe for entry',
        auto_squiz_label: 'Slippage, in %',
        auto_start_sum_label: 'Initial order amount',
        auto_step_label: 'Order step, in %',
        auto_use_ltf_label: 'Use a long timeframe when buyings',
        bot: 'Bot',
        bot_create_heading: 'Create new bot',
        bot_edit_tab_01_main_heading: 'Main Bot Settings',
        bot_edit_tab_01: 'Main settings',
        bot_edit_tab_02_main_heading: 'Bot Automation Settings',
        bot_edit_tab_02: 'Auto',
        bot_edit_tab_03_main_heading: 'RSI settings',
        bot_edit_tab_03: 'RSI',
        bot_edit_tab_04_main_heading: 'The history of bot pauses',
        bot_edit_tab_04: 'Pauses',
        bot_edit_tab_05: 'Pairs',
        botlimit_label: 'Trading limit',
        client: 'Client',
        created_at: 'Created at',
        do_not_use: 'Do not use',
        in_trades: 'In trades',
        limit: 'Limit',
        logs: 'Logs',
        long_dump_label: 'Percentage price drop for blocking for a month',
        long_pump_label: 'Percentage price increase for blocking for a month',
        next_buy_timeout_label: 'Timeout until the next purchase (seconds)',
        number_of_pairs: 'Number of pairs',
        opened_orders: 'Opened orders',
        pair: 'Pair',
        pairs: 'Pairs',
        pause_end_not_set: 'End of pause not set',
        pause_until: 'Pause until',
        pd_down_label: 'Max BTC drop per hour, %',
        pd_pause_label: 'Pause for a bot, hours',
        pd_up_label: 'Max BTC growth per hour, %',
        period: 'Period',
        profit: 'Profit',
        rsi_heading_01: 'Short RSI',
        rsi_heading_02: 'RSI for sale',
        rsi_sell_diff_label: 'Difference from the previous RSI value for sale, %',
        settings: 'Settings',
        start_sum: 'Initial amount',
        step: 'Step',
        timeframe: 'Timeframe',
        timeout_label: 'Timeout for entering the pair, (seconds)',
        total_amount_in_trades_of_all_pairs: 'Total amount in trades of all pairs',
        total_customer_balance: 'Total customer balance',
        usdt: 'USDT',
        useBNB_label: 'Use BNB token for paying commission',
        whitelist_label: 'Whitelist',
    },
    resources: {
        bots: {
            name: 'Bot |||| Bots',
            fields: {
                auto_profit: 'Profit',
                auto_start_sum: 'Orders',
                baseAsset: 'Replenishment currency',
                botlimit: 'Limit',
                exchange_id: 'Exchange',
                exchanges: 'Exchanges',
                id: 'ID',
                in_trades: 'In trades',
                pairs: 'Pairs',
                profit: 'Profit',
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