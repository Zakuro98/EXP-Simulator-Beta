//function to increment exp and handle showing the results
function increment(num) {
    if (game.level < game.pr_min || game.pp_bought[6]) {
        game.total_exp += num
        game.prestige_exp += num
        game.all_time_exp += num
        if (game.total_exp <= 10) {
            game.level = 1
        } else {
            game.level = get_level(game.total_exp)
            if (!game.achievements[0] && game.level >= 2) get_achievement(0)
            if (!game.achievements[1] && game.level >= 10) get_achievement(1)
            if (!game.achievements[2] && game.level >= 30) get_achievement(2)
            if (!game.achievements[3] && game.level >= 60) get_achievement(3)
            if (!game.achievements[4] && game.level >= 100) get_achievement(4)
            if (!game.achievements[5] && game.level >= 200) get_achievement(5)
            if (!game.achievements[6] && game.level >= 300) get_achievement(6)
            if (!game.achievements[7] && game.level >= 500) get_achievement(7)
            if (!game.achievements[8] && game.level >= 1000) get_achievement(8)
            if (!game.achievements[9] && game.level >= 2000) get_achievement(9)
            if (!game.achievements[10] && game.level >= 3000)
                get_achievement(10)
            if (!game.achievements[11] && game.level >= 6000)
                get_achievement(11)
            if (!game.achievements[12] && game.level >= 12000)
                get_achievement(12)

            if (game.level >= 5 && !game.hold_notify) {
                new notify("Protip: you can hold the EXP button", "#ffc400")
                game.hold_notify = true
            }
            if (game.level >= 30 && !game.halfway_notify) {
                new notify(
                    "Hang in there! Something happens at LVL 60...",
                    "#ffc400"
                )
                game.halfway_notify = true
            }
        }

        if (!game.achievements[19] && game.all_time_exp >= 10 ** 6)
            get_achievement(19)
        if (!game.achievements[20] && game.all_time_exp >= 10 ** 9)
            get_achievement(20)
        if (!game.achievements[21] && game.all_time_exp >= 10 ** 12)
            get_achievement(21)
        if (!game.achievements[22] && game.all_time_exp >= 10 ** 15)
            get_achievement(22)
        if (!game.achievements[23] && game.all_time_exp >= 10 ** 18)
            get_achievement(23)
        if (!game.achievements[24] && game.all_time_exp >= 10 ** 21)
            get_achievement(24)
        if (!game.achievements[25] && game.all_time_exp >= 10 ** 24)
            get_achievement(25)
        if (!game.achievements[26] && game.all_time_exp >= 10 ** 27)
            get_achievement(26)
        if (!game.achievements[27] && game.all_time_exp >= 10 ** 30)
            get_achievement(27)
        if (!game.achievements[28] && game.all_time_exp >= 10 ** 33)
            get_achievement(28)
        if (!game.achievements[29] && game.all_time_exp >= 10 ** 36)
            get_achievement(29)
        if (!game.achievements[30] && game.all_time_exp >= 10 ** 39)
            get_achievement(30)
        if (!game.achievements[70] && game.all_time_exp >= 10 ** 42)
            get_achievement(70)

        game.exp = game.total_exp - Math.ceil(get_exp(game.level - 1))
        game.goal = Math.ceil(get_exp(game.level) - get_exp(game.level - 1))

        if (game.epilepsy) {
            document.getElementById("progress").style.width =
                (100 * game.exp) / game.goal + "%"
        } else {
            let eps =
                (game.exp_add + game.exp_fluct / 2) *
                game.global_multiplier *
                game.cap_boost *
                game.cps
            if (
                (game.autods_toggle === 1 && game.autods_goal === 0) ||
                (game.autods_toggle === 2 &&
                    game.cap_mode === 4 &&
                    !game.smartds_oc)
            )
                eps =
                    (game.exp_add + game.exp_fluct / 2) *
                    game.global_multiplier *
                    (game.cap_boost +
                        (1 - game.cap_boost) * game.cap_mode * 2) *
                    game.cps
            if (game.battery_mode === 1 || game.perks[8])
                eps *= game.exp_battery
            if (eps / game.goal >= 2) {
                document.getElementById("progress").style.width = 100 + "%"
            } else {
                document.getElementById("progress").style.width =
                    (100 * game.exp) / game.goal + "%"
            }
        }
    } else {
        document.getElementById("progress").style.width = 100 + "%"
        if (!game.pp_bought[6] && game.level >= game.pr_min) {
            game.all_time_exp -=
                game.total_exp - Math.ceil(get_exp(game.pr_min - 1))
            game.prestige_exp -=
                game.total_exp - Math.ceil(get_exp(game.pr_min - 1))
            game.total_exp = Math.ceil(get_exp(game.pr_min - 1))
            game.level = game.pr_min

            game.exp = game.total_exp - Math.ceil(get_exp(game.level - 1))
            game.goal = Math.ceil(get_exp(game.level) - get_exp(game.level - 1))
        }
    }

    if (game.pp_progress && game.prestige >= 1) {
        let goal2 = 0
        if (game.pp_bought[6]) {
            if (game.prestige < 21) {
                if (game.level < 60) {
                    document.getElementById("pp_progress").style.width =
                        (100 * game.total_exp) / get_exp(59) + "%"
                    goal2 = get_exp(59)
                } else {
                    if (game.level < game.highest_level + 1) {
                        let goal =
                            get_exp(
                                Math.ceil(
                                    20 *
                                        (get_pp(game.highest_level) + 2) **
                                            (1 / 2) +
                                        40
                                ) - 1
                            ) - get_exp(59)
                        let prog = game.total_exp - get_exp(59)
                        document.getElementById("pp_progress").style.width =
                            (100 * prog) / goal + "%"
                        goal2 = goal
                    } else {
                        let goal =
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 2) ** (1 / 2) +
                                        40
                                ) - 1
                            ) -
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 1) ** (1 / 2) +
                                        40
                                ) - 1
                            )
                        let prog =
                            game.total_exp -
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 1) ** (1 / 2) +
                                        40
                                ) - 1
                            )
                        document.getElementById("pp_progress").style.width =
                            (100 * prog) / goal + "%"
                        goal2 = goal
                    }
                }
            } else {
                if (game.level < game.highest_level + 1) {
                    let goal = get_exp(
                        Math.ceil(
                            20 * (get_pp(game.highest_level) + 2) ** (1 / 2) +
                                40
                        ) - 1
                    )
                    let prog = game.total_exp
                    document.getElementById("pp_progress").style.width =
                        (100 * prog) / goal + "%"
                    goal2 = goal
                } else {
                    let goal =
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 2) ** (1 / 2) + 40
                            ) - 1
                        ) -
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 1) ** (1 / 2) + 40
                            ) - 1
                        )
                    let prog =
                        game.total_exp -
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 1) ** (1 / 2) + 40
                            ) - 1
                        )
                    document.getElementById("pp_progress").style.width =
                        (100 * prog) / goal + "%"
                    goal2 = goal
                }
            }
        } else {
            document.getElementById("pp_progress").style.width =
                (100 * game.total_exp) / get_exp(59) + "%"
            goal2 = get_exp(59)
        }
        if (!game.epilepsy) {
            let eps =
                (game.exp_add + game.exp_fluct / 2) *
                game.global_multiplier *
                game.cap_boost *
                game.cps
            if (
                (game.autods_toggle === 1 && game.autods_goal === 0) ||
                (game.autods_toggle === 2 &&
                    game.cap_mode === 4 &&
                    !game.smartds_oc)
            )
                eps =
                    (game.exp_add + game.exp_fluct / 2) *
                    game.global_multiplier *
                    (game.cap_boost +
                        (1 - game.cap_boost) * game.cap_mode * 2) *
                    game.cps
            if (game.battery_mode === 1 || game.perks[8])
                eps *= game.exp_battery
            if (eps / goal2 >= 2) {
                document.getElementById("pp_progress").style.width = "100%"
            }
        }
    }

    if (game.notation === 8) {
        document.getElementById("progress").style.width = "100%"
        document.getElementById("pp_progress").style.width = "100%"
    }

    if (num > 0) game.afk_time = 0

    color_update()
    if (game.tab === 1) upgrade_update()
    ampbutton_update()

    document.getElementById("lvlnum").innerText = format_num(game.level)
    if (game.level < 60 || game.pp_bought[6])
        document.getElementById("exp").innerText =
            format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    else document.getElementById("exp").innerText = "Maxed!"
    document.getElementById("total_exp").innerText =
        format_num(game.total_exp) + " Total EXP"
}

//generate random extra exp for fluctuation
function fluct_increment(max) {
    if (max === 0) {
        return 0
    } else {
        return Math.floor(Math.random() * (max + 1))
    }
}

//special function for manual player clicks
function player_increment() {
    let legit = true
    if (click_time !== undefined) {
        if (Date.now() - click_time >= 50) legit = true
        else legit = false
    }
    if (legit) {
        if (game.battery_mode === 0 || game.perks[8])
            increment(
                Math.round(
                    (game.exp_add + fluct_increment(game.exp_fluct)) *
                        game.ml_boost *
                        game.global_multiplier *
                        game.exp_battery
                )
            )
        else
            increment(
                Math.round(
                    (game.exp_add + fluct_increment(game.exp_fluct)) *
                        game.ml_boost *
                        game.global_multiplier
                )
            )
        game.clicks += 1
        game.prestige_clicks += 1
        game.total_clicks += 1
        click_time = Date.now()
    }
}

//give achievement
function get_achievement(id) {
    game.achievements[id] = true
    let true_id = 0
    for (let i = 0; i < achievement.achievements.length; i++) {
        if (achievement.achievements[i].id === id) true_id = i
    }
    if (document.visibilityState === "visible")
        new notify(achievement.achievements[true_id].name, "#00ff00")
    achievement.achievements[true_id].new = true
    document.getElementById("achievements").style.color = "#00ff00"
}

//purchasing upgrades
//and updating the text to match
function upgrade(id, max) {
    if (!max) {
        //single purchase
        switch (id) {
            case 0:
                //exp boost
                if (game.boost_level < game.pr_min || game.pp_bought[6]) {
                    if (game.level >= game.boost_level) {
                        game.boost_tier += 1
                        game.boost_level = game.boost_tier * 2 + 2
                        if (game.perks[6])
                            game.boost_level = Math.round(
                                game.boost_level * 0.75
                            )
                        game.exp_add =
                            (game.boost_tier +
                                game.starter_kit +
                                game.generator_kit +
                                1) *
                            game.amp
                        if (game.battery_mode === 1 || game.perks[8]) {
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            game.cap_boost
                                    )
                                ) +
                                " EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("boost").innerText =
                                    "EXP Boost\nTier " +
                                    format_num(
                                        game.boost_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_add *
                                                game.global_multiplier *
                                                game.exp_battery *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " EXP/click"
                        } else {
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.cap_boost
                                    )
                                ) +
                                " EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("boost").innerText =
                                    "EXP Boost\nTier " +
                                    format_num(
                                        game.boost_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_add *
                                                game.global_multiplier *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " EXP/click"
                        }
                        click_update()
                    }
                    if (game.level < game.boost_level) {
                        document.getElementById("boost_button").innerText =
                            "LVL " + format_num(game.boost_level)
                        if (game.boost_level < 60) {
                            document.getElementById(
                                "boost_button"
                            ).style.color = get_color(
                                Math.floor(game.boost_level / 10)
                            )
                        } else {
                            document.getElementById(
                                "boost_button"
                            ).style.color = get_color(
                                (Math.floor(game.boost_level / 60) + 5) % 12
                            )
                        }
                    }
                }
                break
            case 1:
                //autoclicker
                if (game.auto_level < game.pr_min || game.pp_bought[6]) {
                    if (game.level >= game.auto_level) {
                        game.auto_tier += 1
                        if (game.auto_tier === 0) game.auto_tier = 3
                        else game.auto_level = game.auto_tier * 5
                        if (game.perks[6])
                            game.auto_level = Math.round(game.auto_level * 0.75)
                        game.cps =
                            2 *
                            (game.auto_tier +
                                game.starter_kit +
                                game.generator_kit)
                        if (!game.achievements[53] && game.cps >= 30)
                            get_achievement(53)
                        if (!game.achievements[54] && game.cps >= 150)
                            get_achievement(54)
                        if (!game.achievements[55] && game.cps >= 1000)
                            get_achievement(55)
                        document.getElementById("auto").innerText =
                            "Autoclicker\nTier " +
                            format_num(
                                game.auto_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": " +
                            format_num(game.cps) +
                            " clicks/s"
                        pp_upgrade.upgrades[24].desc =
                            "Unautomated clicks are boosted a further +32% for every Autoclicker tier\n(Currently: " +
                            format_eff(16 + game.cps * 0.16) +
                            "x)"
                        pp_map
                            .get(pp_upgrade.upgrades[24])
                            .querySelector(".pp_desc").innerText =
                            pp_upgrade.upgrades[24].desc
                        if (game.pp_bought[24]) {
                            game.ml_boost = 16 + game.cps * 0.16
                            click_update()
                        }
                    }
                    if (game.level < game.auto_level) {
                        document.getElementById("auto_button").innerText =
                            "LVL " + format_num(game.auto_level)
                        if (game.auto_level < 60) {
                            document.getElementById("auto_button").style.color =
                                get_color(Math.floor(game.auto_level / 10))
                        } else {
                            document.getElementById("auto_button").style.color =
                                get_color(
                                    (Math.floor(game.auto_level / 60) + 5) % 12
                                )
                        }
                    }
                }
                break
            case 2:
                //exp fluctuation
                if (
                    (game.fluct_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[0]
                ) {
                    if (game.level >= game.fluct_level) {
                        game.fluct_tier += 1
                        game.fluct_level = game.fluct_tier * 3 + 6
                        if (game.perks[6])
                            game.fluct_level = Math.round(
                                game.fluct_level * 0.75
                            )
                        if (!game.pp_bought[15])
                            game.exp_fluct =
                                (game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit) *
                                game.amp
                        else
                            game.exp_fluct =
                                (game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit) *
                                game.amp *
                                2
                        if (game.battery_mode === 1 || game.perks[8]) {
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            game.cap_boost
                                    )
                                ) +
                                " max extra EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("fluct").innerText =
                                    "EXP Fluctuation\nTier " +
                                    format_num(
                                        game.fluct_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_fluct *
                                                game.global_multiplier *
                                                game.exp_battery *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " max extra EXP/click"
                        } else {
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.cap_boost
                                    )
                                ) +
                                " max extra EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("fluct").innerText =
                                    "EXP Fluctuation\nTier " +
                                    format_num(
                                        game.fluct_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_fluct *
                                                game.global_multiplier *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " max extra EXP/click"
                        }
                        click_update()
                    }
                    if (game.level < game.fluct_level) {
                        document.getElementById("fluct_button").innerText =
                            "LVL " + format_num(game.fluct_level)
                        if (game.fluct_level < 60) {
                            document.getElementById(
                                "fluct_button"
                            ).style.color = get_color(
                                Math.floor(game.fluct_level / 10)
                            )
                        } else {
                            document.getElementById(
                                "fluct_button"
                            ).style.color = get_color(
                                (Math.floor(game.fluct_level / 60) + 5) % 12
                            )
                        }
                    }
                }
                break
            case 3:
                //exp factor
                if (
                    (game.fact_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[5]
                ) {
                    if (game.level >= game.fact_level) {
                        game.fact_tier += 1
                        if (game.fact_tier === 0) game.fact_level = 15
                        else if (game.fact_tier <= 4)
                            game.fact_level = game.fact_tier * 30
                        else game.fact_level = game.fact_tier * 60 - 120
                        if (game.perks[6])
                            game.fact_level = Math.round(game.fact_level * 0.75)
                        game.exp_fact =
                            game.fact_tier +
                            game.starter_kit +
                            game.generator_kit +
                            1
                        document.getElementById("fact").innerText =
                            "EXP Factor\nTier " +
                            format_num(
                                game.fact_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": " +
                            format_num(game.exp_fact) +
                            "x EXP/click"
                        if (game.battery_mode === 1 || game.perks[8]) {
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            game.cap_boost
                                    )
                                ) +
                                " EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("boost").innerText =
                                    "EXP Boost\nTier " +
                                    format_num(
                                        game.boost_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_add *
                                                game.global_multiplier *
                                                game.exp_battery *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " EXP/click"
                        } else {
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.cap_boost
                                    )
                                ) +
                                " EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("boost").innerText =
                                    "EXP Boost\nTier " +
                                    format_num(
                                        game.boost_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_add *
                                                game.global_multiplier *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " EXP/click"
                        }
                        if (game.battery_mode === 1 || game.perks[8]) {
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            game.cap_boost
                                    )
                                ) +
                                " max extra EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("fluct").innerText =
                                    "EXP Fluctuation\nTier " +
                                    format_num(
                                        game.fluct_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_fluct *
                                                game.global_multiplier *
                                                game.exp_battery *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " max extra EXP/click"
                        } else {
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.cap_boost
                                    )
                                ) +
                                " max extra EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("fluct").innerText =
                                    "EXP Fluctuation\nTier " +
                                    format_num(
                                        game.fluct_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_fluct *
                                                game.global_multiplier *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " max extra EXP/click"
                        }
                        click_update()
                    }
                    if (game.level < game.fact_level) {
                        document.getElementById("fact_button").innerText =
                            "LVL " + format_num(game.fact_level)
                        if (game.fact_level < 60) {
                            document.getElementById("fact_button").style.color =
                                get_color(Math.floor(game.fact_level / 10))
                        } else {
                            document.getElementById("fact_button").style.color =
                                get_color(
                                    (Math.floor(game.fact_level / 60) + 5) % 12
                                )
                        }
                    }
                }
                break
            case 4:
                //exp flux
                if (
                    (game.flux_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[20]
                ) {
                    if (game.level >= game.flux_level) {
                        game.flux_tier += 1
                        game.flux_level = game.flux_tier * 75 + 75
                        if (game.perks[6])
                            game.flux_level = Math.round(game.flux_level * 0.75)
                        document.getElementById("flux").innerText =
                            "EXP Flux\nTier " +
                            format_num(
                                game.flux_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": " +
                            format_eff(game.exp_flux) +
                            "x EXP/click (+" +
                            format_eff(
                                (game.flux_tier +
                                    game.starter_kit +
                                    game.generator_kit) *
                                    0.15 *
                                    game.flux_boost *
                                    game.flux_increase
                            ) +
                            "/min)"
                    }
                    if (game.level < game.flux_level) {
                        document.getElementById("flux_button").innerText =
                            "LVL " + format_num(game.flux_level)
                        if (game.flux_level < 60) {
                            document.getElementById("flux_button").style.color =
                                get_color(Math.floor(game.flux_level / 10))
                        } else {
                            document.getElementById("flux_button").style.color =
                                get_color(
                                    (Math.floor(game.flux_level / 60) + 5) % 12
                                )
                        }
                    }
                }
                break
            case 5:
                //exp battery
                if (
                    (game.battery_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[25]
                ) {
                    if (game.level >= game.battery_level) {
                        game.battery_tier += 1
                        game.battery_level = game.battery_tier * 90 + 90
                        if (game.perks[6])
                            game.battery_level = Math.round(
                                game.battery_level * 0.75
                            )
                        if (!game.pp_bought[31])
                            game.exp_battery =
                                game.battery_tier +
                                game.starter_kit +
                                game.generator_kit +
                                1
                        else if (!game.pp_bought[36])
                            game.exp_battery =
                                (game.battery_tier +
                                    game.starter_kit +
                                    game.generator_kit +
                                    1) *
                                3
                        else
                            game.exp_battery =
                                (game.battery_tier +
                                    game.starter_kit +
                                    game.generator_kit +
                                    1) *
                                9
                        if (game.battery_mode === 0) {
                            document.getElementById("battery").innerText =
                                "EXP Battery\nTier " +
                                format_num(
                                    game.battery_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": " +
                                format_num(game.exp_battery) +
                                "x manual EXP production"
                            click_update()
                        } else if (game.battery_mode === 1) {
                            document.getElementById("battery").innerText =
                                "EXP Battery\nTier " +
                                format_num(
                                    game.battery_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": " +
                                format_num(game.exp_battery) +
                                "x automated EXP production"
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            game.cap_boost
                                    )
                                ) +
                                " EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("boost").innerText =
                                    "EXP Boost\nTier " +
                                    format_num(
                                        game.boost_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_add *
                                                game.global_multiplier *
                                                game.exp_battery *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " EXP/click"
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            game.cap_boost
                                    )
                                ) +
                                " max extra EXP/click"
                            if (
                                game.autods_toggle >= 1 &&
                                game.autods_goal === 0
                            )
                                document.getElementById("fluct").innerText =
                                    "EXP Fluctuation\nTier " +
                                    format_num(
                                        game.fluct_tier +
                                            game.starter_kit +
                                            game.generator_kit
                                    ) +
                                    ": +" +
                                    format_num(
                                        Math.round(
                                            game.exp_fluct *
                                                game.global_multiplier *
                                                game.exp_battery *
                                                (game.cap_boost +
                                                    (1 - game.cap_boost) *
                                                        game.cap_mode *
                                                        2)
                                        )
                                    ) +
                                    " max extra EXP/click"
                        }
                        if (game.perks[8]) {
                            document.getElementById("battery").innerText =
                                "EXP Battery\nTier " +
                                format_num(
                                    game.battery_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": " +
                                format_num(game.exp_battery) +
                                "x EXP production"
                        }
                    }
                    if (game.level < game.battery_level) {
                        document.getElementById("battery_button").innerText =
                            "LVL " + format_num(game.battery_level)
                        if (game.battery_level < 60) {
                            document.getElementById(
                                "battery_button"
                            ).style.color = get_color(
                                Math.floor(game.battery_level / 10)
                            )
                        } else {
                            document.getElementById(
                                "battery_button"
                            ).style.color = get_color(
                                (Math.floor(game.battery_level / 60) + 5) % 12
                            )
                        }
                    }
                }
                break
        }
    } else {
        //bulk purchase
        switch (id) {
            case 0:
                //exp boost
                if (game.boost_level < game.pr_min || game.pp_bought[6]) {
                    while (game.level >= game.boost_level) {
                        game.boost_tier += 1
                        game.boost_level = game.boost_tier * 2 + 2
                        if (game.perks[6])
                            game.boost_level = Math.round(
                                game.boost_level * 0.75
                            )
                    }
                    game.exp_add =
                        (game.boost_tier +
                            game.starter_kit +
                            game.generator_kit +
                            1) *
                        game.amp
                    if (game.battery_mode === 1 || game.perks[8]) {
                        document.getElementById("boost").innerText =
                            "EXP Boost\nTier " +
                            format_num(
                                game.boost_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_add *
                                        game.global_multiplier *
                                        game.exp_battery *
                                        game.cap_boost
                                )
                            ) +
                            " EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " EXP/click"
                    } else {
                        document.getElementById("boost").innerText =
                            "EXP Boost\nTier " +
                            format_num(
                                game.boost_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_add *
                                        game.global_multiplier *
                                        game.cap_boost
                                )
                            ) +
                            " EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " EXP/click"
                    }
                    click_update()
                    if (game.level < game.boost_level) {
                        document.getElementById("boost_button").innerText =
                            "LVL " + format_num(game.boost_level)
                        if (game.boost_level < 60) {
                            document.getElementById(
                                "boost_button"
                            ).style.color = get_color(
                                Math.floor(game.boost_level / 10)
                            )
                        } else {
                            document.getElementById(
                                "boost_button"
                            ).style.color = get_color(
                                (Math.floor(game.boost_level / 60) + 5) % 12
                            )
                        }
                    }
                }
                break
            case 1:
                //autoclicker
                if (game.auto_level < game.pr_min || game.pp_bought[6]) {
                    while (game.level >= game.auto_level) {
                        game.auto_tier += 1
                        if (game.auto_tier === 0) game.auto_tier = 3
                        else game.auto_level = game.auto_tier * 5
                        if (game.perks[6])
                            game.auto_level = Math.round(game.auto_level * 0.75)
                    }
                    game.cps =
                        2 *
                        (game.auto_tier + game.starter_kit + game.generator_kit)
                    if (!game.achievements[53] && game.cps >= 30)
                        get_achievement(53)
                    if (!game.achievements[54] && game.cps >= 150)
                        get_achievement(54)
                    if (!game.achievements[55] && game.cps >= 1000)
                        get_achievement(55)
                    document.getElementById("auto").innerText =
                        "Autoclicker\nTier " +
                        format_num(
                            game.auto_tier +
                                game.starter_kit +
                                game.generator_kit
                        ) +
                        ": " +
                        format_num(game.cps) +
                        " clicks/s"
                    pp_upgrade.upgrades[24].desc =
                        "Unautomated clicks are boosted a further +32% for every Autoclicker tier\n(Currently: " +
                        format_eff(16 + game.cps * 0.16) +
                        "x)"
                    pp_map
                        .get(pp_upgrade.upgrades[24])
                        .querySelector(".pp_desc").innerText =
                        pp_upgrade.upgrades[24].desc
                    if (game.pp_bought[24]) {
                        game.ml_boost = 16 + game.cps * 0.16
                        click_update()
                    }
                    if (game.level < game.auto_level) {
                        document.getElementById("auto_button").innerText =
                            "LVL " + format_num(game.auto_level)
                        if (game.auto_level < 60) {
                            document.getElementById("auto_button").style.color =
                                get_color(Math.floor(game.auto_level / 10))
                        } else {
                            document.getElementById("auto_button").style.color =
                                get_color(
                                    (Math.floor(game.auto_level / 60) + 5) % 12
                                )
                        }
                    }
                }
                break
            case 2:
                //exp fluctuation
                if (
                    (game.fluct_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[0]
                ) {
                    while (game.level >= game.fluct_level) {
                        game.fluct_tier += 1
                        game.fluct_level = game.fluct_tier * 3 + 6
                        if (game.perks[6])
                            game.fluct_level = Math.round(
                                game.fluct_level * 0.75
                            )
                    }
                    if (!game.pp_bought[15])
                        game.exp_fluct =
                            (game.fluct_tier +
                                game.starter_kit +
                                game.generator_kit) *
                            game.amp
                    else
                        game.exp_fluct =
                            (game.fluct_tier +
                                game.starter_kit +
                                game.generator_kit) *
                            game.amp *
                            2
                    if (game.battery_mode === 1 || game.perks[8]) {
                        document.getElementById("fluct").innerText =
                            "EXP Fluctuation\nTier " +
                            format_num(
                                game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_fluct *
                                        game.global_multiplier *
                                        game.exp_battery *
                                        game.cap_boost
                                )
                            ) +
                            " max extra EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " max extra EXP/click"
                    } else {
                        document.getElementById("fluct").innerText =
                            "EXP Fluctuation\nTier " +
                            format_num(
                                game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_fluct *
                                        game.global_multiplier *
                                        game.cap_boost
                                )
                            ) +
                            " max extra EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " max extra EXP/click"
                    }
                    click_update()
                    if (game.level < game.fluct_level) {
                        document.getElementById("fluct_button").innerText =
                            "LVL " + format_num(game.fluct_level)
                        if (game.fluct_level < 60) {
                            document.getElementById(
                                "fluct_button"
                            ).style.color = get_color(
                                Math.floor(game.fluct_level / 10)
                            )
                        } else {
                            document.getElementById(
                                "fluct_button"
                            ).style.color = get_color(
                                (Math.floor(game.fluct_level / 60) + 5) % 12
                            )
                        }
                    }
                }
                break
            case 3:
                //exp factor
                if (
                    (game.fact_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[5]
                ) {
                    while (game.level >= game.fact_level) {
                        game.fact_tier += 1
                        if (game.fact_tier === 0) game.fact_level = 15
                        else if (game.fact_tier <= 4)
                            game.fact_level = game.fact_tier * 30
                        else game.fact_level = game.fact_tier * 60 - 120
                        if (game.perks[6])
                            game.fact_level = Math.round(game.fact_level * 0.75)
                    }
                    game.exp_fact =
                        game.fact_tier +
                        game.starter_kit +
                        game.generator_kit +
                        1
                    document.getElementById("fact").innerText =
                        "EXP Factor\nTier " +
                        format_num(
                            game.fact_tier +
                                game.starter_kit +
                                game.generator_kit
                        ) +
                        ": " +
                        format_num(game.exp_fact) +
                        "x EXP/click"
                    if (game.battery_mode === 1 || game.perks[8]) {
                        document.getElementById("boost").innerText =
                            "EXP Boost\nTier " +
                            format_num(
                                game.boost_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_add *
                                        game.global_multiplier *
                                        game.exp_battery *
                                        game.cap_boost
                                )
                            ) +
                            " EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " EXP/click"
                    } else {
                        document.getElementById("boost").innerText =
                            "EXP Boost\nTier " +
                            format_num(
                                game.boost_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_add *
                                        game.global_multiplier *
                                        game.cap_boost
                                )
                            ) +
                            " EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " EXP/click"
                    }
                    if (game.battery_mode === 1 || game.perks[8]) {
                        document.getElementById("fluct").innerText =
                            "EXP Fluctuation\nTier " +
                            format_num(
                                game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_fluct *
                                        game.global_multiplier *
                                        game.exp_battery *
                                        game.cap_boost
                                )
                            ) +
                            " max extra EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " max extra EXP/click"
                    } else {
                        document.getElementById("fluct").innerText =
                            "EXP Fluctuation\nTier " +
                            format_num(
                                game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_fluct *
                                        game.global_multiplier *
                                        game.cap_boost
                                )
                            ) +
                            " max extra EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " max extra EXP/click"
                    }
                    click_update()
                    if (game.level < game.fact_level) {
                        document.getElementById("fact_button").innerText =
                            "LVL " + format_num(game.fact_level)
                        if (game.fact_level < 60) {
                            document.getElementById("fact_button").style.color =
                                get_color(Math.floor(game.fact_level / 10))
                        } else {
                            document.getElementById("fact_button").style.color =
                                get_color(
                                    (Math.floor(game.fact_level / 60) + 5) % 12
                                )
                        }
                    }
                }
                break
            case 4:
                //exp flux
                if (
                    (game.flux_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[20]
                ) {
                    while (game.level >= game.flux_level) {
                        game.flux_tier += 1
                        game.flux_level = game.flux_tier * 75 + 75
                        if (game.perks[6])
                            game.flux_level = Math.round(game.flux_level * 0.75)
                    }
                    document.getElementById("flux").innerText =
                        "EXP Flux\nTier " +
                        format_num(
                            game.flux_tier +
                                game.starter_kit +
                                game.generator_kit
                        ) +
                        ": " +
                        format_eff(game.exp_flux) +
                        "x EXP/click (+" +
                        format_eff(
                            (game.flux_tier +
                                game.starter_kit +
                                game.generator_kit) *
                                0.15 *
                                game.flux_boost *
                                game.flux_increase
                        ) +
                        "/min)"
                    if (game.level < game.flux_level) {
                        document.getElementById("flux_button").innerText =
                            "LVL " + format_num(game.flux_level)
                        if (game.flux_level < 60) {
                            document.getElementById("flux_button").style.color =
                                get_color(Math.floor(game.flux_level / 10))
                        } else {
                            document.getElementById("flux_button").style.color =
                                get_color(
                                    (Math.floor(game.flux_level / 60) + 5) % 12
                                )
                        }
                    }
                }
                break
            case 5:
                //exp battery
                if (
                    (game.battery_level < game.pr_min || game.pp_bought[6]) &&
                    game.pp_bought[25]
                ) {
                    while (game.level >= game.battery_level) {
                        game.battery_tier += 1
                        game.battery_level = game.battery_tier * 90 + 90
                        if (game.perks[6])
                            game.battery_level = Math.round(
                                game.battery_level * 0.75
                            )
                    }
                    if (!game.pp_bought[31])
                        game.exp_battery =
                            game.battery_tier +
                            game.starter_kit +
                            game.generator_kit +
                            1
                    else if (!game.pp_bought[36])
                        game.exp_battery =
                            (game.battery_tier +
                                game.starter_kit +
                                game.generator_kit +
                                1) *
                            3
                    else
                        game.exp_battery =
                            (game.battery_tier +
                                game.starter_kit +
                                game.generator_kit +
                                1) *
                            9
                    if (game.battery_mode === 0) {
                        document.getElementById("battery").innerText =
                            "EXP Battery\nTier " +
                            format_num(
                                game.battery_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": " +
                            format_num(game.exp_battery) +
                            "x manual EXP production"
                        click_update()
                    } else if (game.battery_mode === 1) {
                        document.getElementById("battery").innerText =
                            "EXP Battery\nTier " +
                            format_num(
                                game.battery_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": " +
                            format_num(game.exp_battery) +
                            "x automated EXP production"
                        document.getElementById("boost").innerText =
                            "EXP Boost\nTier " +
                            format_num(
                                game.boost_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_add *
                                        game.global_multiplier *
                                        game.exp_battery *
                                        game.cap_boost
                                )
                            ) +
                            " EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " EXP/click"
                        document.getElementById("fluct").innerText =
                            "EXP Fluctuation\nTier " +
                            format_num(
                                game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_fluct *
                                        game.global_multiplier *
                                        game.exp_battery *
                                        game.cap_boost
                                )
                            ) +
                            " max extra EXP/click"
                        if (
                            (game.autods_toggle === 1 &&
                                game.autods_goal === 0) ||
                            (game.autods_toggle === 2 &&
                                game.cap_mode === 4 &&
                                !game.smartds_oc)
                        )
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " max extra EXP/click"
                    }
                    if (game.perks[8]) {
                        document.getElementById("battery").innerText =
                            "EXP Battery\nTier " +
                            format_num(
                                game.battery_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": " +
                            format_num(game.exp_battery) +
                            "x EXP production"
                    }
                    if (game.level < game.battery_level) {
                        document.getElementById("battery_button").innerText =
                            "LVL " + format_num(game.battery_level)
                        if (game.battery_level < 60) {
                            document.getElementById(
                                "battery_button"
                            ).style.color = get_color(
                                Math.floor(game.battery_level / 10)
                            )
                        } else {
                            document.getElementById(
                                "battery_button"
                            ).style.color = get_color(
                                (Math.floor(game.battery_level / 60) + 5) % 12
                            )
                        }
                    }
                }
                break
        }
    }
}

//overclocker activation
function oc_activate() {
    game.oc_state = 2
    game.exp_oc = 3
    if (game.pp_bought[19]) game.exp_oc = 4
    if (game.pp_bought[23]) game.exp_oc = 5
    if (game.battery_mode === 1 || game.perks[8]) {
        document.getElementById("boost").innerText =
            "EXP Boost\nTier " +
            format_num(
                game.boost_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_add *
                        game.global_multiplier *
                        game.exp_battery *
                        game.cap_boost
                )
            ) +
            " EXP/click"
        if (
            (game.autods_toggle === 1 && game.autods_goal === 0) ||
            (game.autods_toggle === 2 &&
                game.cap_mode === 4 &&
                !game.smartds_oc)
        )
            document.getElementById("boost").innerText =
                "EXP Boost\nTier " +
                format_num(
                    game.boost_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_add *
                            game.global_multiplier *
                            game.exp_battery *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " EXP/click"
    } else {
        document.getElementById("boost").innerText =
            "EXP Boost\nTier " +
            format_num(
                game.boost_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_add * game.global_multiplier * game.cap_boost
                )
            ) +
            " EXP/click"
        if (
            (game.autods_toggle === 1 && game.autods_goal === 0) ||
            (game.autods_toggle === 2 &&
                game.cap_mode === 4 &&
                !game.smartds_oc)
        )
            document.getElementById("boost").innerText =
                "EXP Boost\nTier " +
                format_num(
                    game.boost_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_add *
                            game.global_multiplier *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " EXP/click"
    }
    if (game.battery_mode === 1 || game.perks[8]) {
        document.getElementById("fluct").innerText =
            "EXP Fluctuation\nTier " +
            format_num(
                game.fluct_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_fluct *
                        game.global_multiplier *
                        game.exp_battery *
                        game.cap_boost
                )
            ) +
            " max extra EXP/click"
        if (
            (game.autods_toggle === 1 && game.autods_goal === 0) ||
            (game.autods_toggle === 2 &&
                game.cap_mode === 4 &&
                !game.smartds_oc)
        )
            document.getElementById("fluct").innerText =
                "EXP Fluctuation\nTier " +
                format_num(
                    game.fluct_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_fluct *
                            game.global_multiplier *
                            game.exp_battery *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " max extra EXP/click"
    } else {
        document.getElementById("fluct").innerText =
            "EXP Fluctuation\nTier " +
            format_num(
                game.fluct_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_fluct * game.global_multiplier * game.cap_boost
                )
            ) +
            " max extra EXP/click"
        if (
            (game.autods_toggle === 1 && game.autods_goal === 0) ||
            (game.autods_toggle === 2 &&
                game.cap_mode === 4 &&
                !game.smartds_oc)
        )
            document.getElementById("fluct").innerText =
                "EXP Fluctuation\nTier " +
                format_num(
                    game.fluct_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_fluct *
                            game.global_multiplier *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " max extra EXP/click"
    }
    click_update()
    document.getElementById("oc_state").innerText =
        "Boosting " + format_num(game.exp_oc) + "x"
    document.getElementById("oc_button").style.display = "none"
    document.getElementById("oc_timer").style.display = "block"
    document.getElementById("oc_progress").style.background = "#ff7f00"
    game.afk_time = 0
}

//capacitance switching
function set_capacitance(mode) {
    if (game.cap_mode !== 0) game.prev_mode = game.cap_mode
    if (mode > game.prev_mode) {
        game.cap_mode = game.prev_mode
        discharge()
    }

    game.cap_mode = mode

    document.getElementById("cap_off").className = "button"
    document.getElementById("cap_25").className = "button"
    document.getElementById("cap_50").className = "button"
    document.getElementById("cap_75").className = "button"
    document.getElementById("cap_100").className = "button"

    game.cap_boost = 1 - 0.25 * mode

    switch (mode) {
        case 0:
            document.getElementById("cap_off").className = "button mode_active"
            break
        case 1:
            document.getElementById("cap_25").className = "button mode_active"
            break
        case 2:
            document.getElementById("cap_50").className = "button mode_active"
            break
        case 3:
            document.getElementById("cap_75").className = "button mode_active"
            break
        case 4:
            document.getElementById("cap_100").className = "button mode_active"
            break
    }
}

//discharging the capacitor
function discharge() {
    if (
        game.cap_mode >= 1 &&
        (game.stored_exp >= game.tickspeed || game.pp_bought[38])
    ) {
        let eps =
            (game.exp_add + game.exp_fluct / 2) *
            game.global_multiplier *
            game.cps
        if (game.battery_mode === 1 || game.perks[8]) eps *= game.exp_battery
        if (!game.perks[9])
            increment(
                (game.stored_exp / game.tickspeed) * eps * game.cap_mode * 2
            )
        else
            increment(
                (game.stored_exp / game.tickspeed) * eps * game.cap_mode * 4
            )
        game.stored_exp = 0

        if (!game.achievements[61] && game.oc_state === 2) get_achievement(61)

        game.afk_time = 0
    }
}
