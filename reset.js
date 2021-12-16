//function for handling resets of any kind
//prestige, reboot, save wiping, etc
function reset() {
    document.getElementById("boost").style.display = "none"
    document.getElementById("boost_button").style.display = "none"
    document.getElementById("boost_auto").style.display = "none"
    document.getElementById("auto").style.display = "none"
    document.getElementById("auto_button").style.display = "none"
    document.getElementById("auto_auto").style.display = "none"
    document.getElementById("fluct").style.display = "none"
    document.getElementById("fluct_button").style.display = "none"
    document.getElementById("fluct_auto").style.display = "none"
    document.getElementById("fact").style.display = "none"
    document.getElementById("fact_button").style.display = "none"
    document.getElementById("fact_auto").style.display = "none"
    document.getElementById("flux").style.display = "none"
    document.getElementById("flux_button").style.display = "none"
    document.getElementById("flux_auto").style.display = "none"
    document.getElementById("battery").style.display = "none"
    document.getElementById("battery_button").style.display = "none"
    document.getElementById("battery_mode").style.display = "none"
    document.getElementById("battery_auto").style.display = "none"

    game.total_exp = 0
    game.exp_add = 1
    game.exp_fluct = 0
    game.exp_fact = 1
    game.exp_flux = 1
    game.exp_battery = 1
    game.level = 1
    game.exp = 0
    game.goal = 32

    game.clicks = 0

    game.cps = 0
    game.click_time = 0

    game.boost_tier = 0
    game.boost_level = 2
    game.auto_tier = 0
    game.auto_level = 3
    game.fluct_tier = 0
    game.fluct_level = 6
    game.fact_tier = 0
    game.fact_level = 15
    game.flux_tier = 0
    game.flux_level = 75
    game.battery_tier = 0
    game.battery_level = 90

    game.time = 0
    game.afk_time = 0

    color_update()

    document.getElementById("lvlnum").innerText = game.level
    document.getElementById("exp").innerText =
        format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    document.getElementById("total_exp").innerText =
        format_num(game.total_exp) + " Total EXP"

    document.getElementById("progress").style.width = 0 + "%"
}

//prestiging code
function prestige() {
    if (game.level >= game.pr_min) {
        if (game.perks[4])
            game.prestige +=
                Math.ceil(game.level / 200) * Math.round(game.patience)
        else game.prestige += 1
        game.amp += Math.floor(
            get_amp(game.level) * game.patience * game.watt_boost
        )
        if (game.prestige <= 21) {
            game.pp += 1
            game.total_pp += 1
        }
        if (game.level > game.highest_level) {
            game.pp += get_pp(game.level) - get_pp(game.highest_level)
            game.total_pp += get_pp(game.level) - get_pp(game.highest_level)
            game.highest_level = game.level
        }
        document.getElementById("amp").innerText = format_num(game.amp) + " AMP"
        document.getElementById("pp").innerText = format_num(game.pp) + " PP"

        if (!game.achievements[13] && game.prestige >= 1) get_achievement(13)
        if (!game.achievements[14] && game.prestige >= 10) get_achievement(14)
        if (!game.achievements[15] && game.prestige >= 100) get_achievement(15)
        if (!game.achievements[16] && game.prestige >= 1000) get_achievement(16)
        if (!game.achievements[17] && game.prestige >= 10000)
            get_achievement(17)
        if (!game.achievements[18] && game.prestige >= 100000)
            get_achievement(18)

        if (!game.achievements[36] && game.amp >= 100) get_achievement(36)
        if (!game.achievements[37] && game.amp >= 10000) get_achievement(37)
        if (!game.achievements[38] && game.amp >= 10 ** 6) get_achievement(38)
        if (!game.achievements[39] && game.amp >= 10 ** 8) get_achievement(39)
        if (!game.achievements[40] && game.amp >= 10 ** 10) get_achievement(40)
        if (!game.achievements[41] && game.amp >= 10 ** 12) get_achievement(41)
        if (!game.achievements[42] && game.amp >= 10 ** 14) get_achievement(42)
        if (!game.achievements[71] && game.amp >= 10 ** 16) get_achievement(71)

        if (game.time < game.fastest_prestige) game.fastest_prestige = game.time

        reset()
        ampbutton_update()
        pp_update()

        game.exp_add =
            game.amp +
            game.starter_kit * game.amp +
            game.generator_kit * game.amp
        if (!game.pp_bought[15])
            game.exp_fluct = (game.starter_kit + game.generator_kit) * game.amp
        else
            game.exp_fluct =
                (game.starter_kit + game.generator_kit) * game.amp * 2
        game.exp_fact = 1 + game.starter_kit + game.generator_kit
        if (game.pp_bought[25]) {
            if (!game.pp_bought[31])
                game.exp_battery = 1 + game.starter_kit + game.generator_kit
            else if (!game.pp_bought[36])
                game.exp_battery =
                    (1 + game.starter_kit + game.generator_kit) * 3
            else
                game.exp_battery =
                    (1 + game.starter_kit + game.generator_kit) * 9
        }
        game.cps = (game.starter_kit + game.generator_kit) * 2

        if (game.pp_bought[27]) {
            game.prestige_power = 1 + (game.prestige / 1000) ** (1 / 2)
        }

        if (game.pp_bought[30]) {
            game.depth_power = 1 + game.highest_level / 400
        }

        if (game.perks[6]) {
            game.boost_level = Math.round(2 * 0.75)
            game.auto_level = Math.round(5 * 0.75)
            game.fluct_level = Math.round(6 * 0.75)
            game.fact_level = Math.round(15 * 0.75)
            game.flux_level = Math.round(75 * 0.75)
            game.battery_level = Math.round(90 * 0.75)
        }

        if (
            game.autopr_mode === 0 ||
            game.autopr_mode === 1 ||
            !game.autopr_toggle
        ) {
            game.smartds_oc = false
        }
        if (game.autopr_mode === 2) {
            game.smartds_oc = false
        }

        if (game.smartpr_mode === 1 && game.amp < game.smartpr_amp) {
            game.smartpr_mode = 0
            game.smartpr_time = 0
            autopr_switch(4)
        }

        switch (game.jumpstart) {
            case 1:
                game.total_exp = 4855
                game.all_time_exp += 4855
                break
            case 2:
                game.total_exp = 35308
                game.all_time_exp += 35308
                break
            case 3:
                game.total_exp = 269015
                game.all_time_exp += 269015
                break
            case 4:
                game.total_exp = 92611251
                game.all_time_exp += 92611251
                break
        }
        increment(0)
    }
}

//respeccing prestige upgrades
function respec() {
    if (game.level >= game.pr_min) {
        let all_pp_upgrades = true
        for (const upgrade3 of pp_upgrade.upgrades) {
            if (upgrade3.id < 39 && !game.pp_bought[upgrade3.id])
                all_pp_upgrades = false
        }
        if (!game.achievements[75] && all_pp_upgrades) get_achievement(75)
        for (let i = 0; i < 39; i++) {
            game.pp_bought[i] = false
        }

        game.ml_boost = 1
        document.getElementById("amp_auto").style.display = "none"
        document.getElementById("auto_config").style.display = "none"
        game.jumpstart = 0
        game.pr_min = 60
        game.starter_kit = 0
        document.getElementById("auto_mode").style.display = "none"
        game.exp_oc = 1
        game.oc_state = 0
        game.oc_time = 0
        document.getElementById("overclock").style.display = "none"
        document.getElementById("oc_auto").style.display = "none"
        document.getElementById("oc_button").style.display = "none"
        document.getElementById("oc_state").innerText = "Recharging"
        document.getElementById("oc_timer").style.display = "block"
        document.getElementById("oc_progress").style.background = "#ff2f00"
        set_capacitance(0)
        game.prev_mode = 0
        game.stored_exp = 0
        game.cap_boost = 1
        document.getElementById("capacitor").style.display = "none"
        document.getElementById("cap_50").style.display = "none"
        document.getElementById("cap_75").style.display = "none"
        document.getElementById("cap_100").style.display = "none"
        document.getElementById("cap_disc").style.display = "none"
        document.getElementById("dis_auto").style.display = "none"
        document.getElementById("dis_text").style.display = "none"
        document.getElementById("dis_input").style.display = "none"

        prestige()
        game.pp = game.total_pp
        ampbutton_update()
    }
}

//rebooting code
function reboot() {
    let all_pp_upgrades = true
    let confirmed = false
    for (const upgrade2 of pp_upgrade.upgrades) {
        if (upgrade2.id < 39 && !game.pp_bought[upgrade2.id])
            all_pp_upgrades = false
    }

    let reboot_requirement = 0
    if (game.reboot >= 1) reboot_requirement = 5000 * game.reboot + 80000
    if (game.reboot >= 24) reboot_requirement = 200000

    if (!game.confirmation) confirmed = true
    else {
        if (game.reboot < 1) {
            if (
                confirm(
                    "Are you sure you want to activate the Generator?\nThis will reset ALL progress up to this point!\nHowever, you will gain 1 watt"
                )
            ) {
                confirmed = true
            }
        } else {
            if (!game.perks[13]) {
                if (
                    confirm(
                        "Are you sure you want to Reboot?\nYou will gain 1 watt"
                    )
                ) {
                    confirmed = true
                }
            } else {
                if (get_watts(game.pp) === 1 && game.notation !== 8) {
                    if (
                        confirm(
                            "Are you sure you want to Reboot?\nYou will gain " +
                                format_num(get_watts(game.pp)) +
                                " watt"
                        )
                    ) {
                        confirmed = true
                    }
                } else {
                    if (
                        confirm(
                            "Are you sure you want to Reboot?\nYou will gain " +
                                format_num(get_watts(game.pp)) +
                                " watts"
                        )
                    ) {
                        confirmed = true
                    }
                }
            }
        }
    }

    if (all_pp_upgrades && game.pp >= reboot_requirement) {
        if (confirmed) {
            reset()

            game.reboot += 1
            if (!game.perks[13]) game.watts += 1
            else game.watts += get_watts(game.pp)
            game.watt_boost =
                ((game.watts + 1) * (game.watts + 2) * (game.watts + 3)) / 6

            watts_update()

            if (game.highest_level > game.all_time_highest_level) {
                game.all_time_highest_level = game.highest_level
            }

            if (!game.achievements[56] && game.reboot >= 1) get_achievement(56)
            if (!game.achievements[57] && game.reboot >= 3) get_achievement(57)
            if (!game.achievements[58] && game.reboot >= 5) get_achievement(58)
            if (!game.achievements[59] && game.reboot >= 10) get_achievement(59)
            if (!game.achievements[72] && game.reboot >= 25) get_achievement(72)
            if (!game.achievements[73] && game.reboot >= 50) get_achievement(73)

            if (!game.achievements[62] && game.no_automation)
                get_achievement(62)
            game.no_automation = true

            if (!game.achievements[68] && game.blind) get_achievement(68)
            game.blind = true

            if (game.notation === 7) game.cancer_reboots++
            if (!game.achievements[76] && game.cancer_reboots >= 10)
                get_achievement(76)

            game.amp = game.watt_boost
            game.pp = 0
            game.total_pp = 0
            game.pr_min = 60
            for (let i = 0; i < 39; i++) {
                game.pp_bought[i] = false
            }

            if (game.prestige_time < game.fastest_reboot)
                game.fastest_reboot = game.prestige_time
            if (
                !game.achievements[60] &&
                game.fastest_reboot < 3600 * game.tickspeed
            )
                get_achievement(60)
            if (
                !game.achievements[74] &&
                game.fastest_reboot < 600 * game.tickspeed
            )
                get_achievement(74)

            game.prestige = 0
            game.prestige_exp = 0
            game.highest_level = 1
            game.prestige_clicks = 0
            game.prestige_time = 0
            game.exp_add = game.amp
            if (!game.perks[10]) {
                game.autopr_mode = 0
                autopr_switch(game.autopr_mode)
            }

            game.ml_boost = 1
            game.jumpstart = 0
            game.starter_kit = 0
            game.pp_power = 1

            game.exp_oc = 1
            game.exp_battery = 1
            game.pp_power = 1
            game.prestige_power = 1
            game.depth_power = 1
            game.patience = 1
            game.oc_state = 0
            game.oc_time = 0
            set_capacitance(0)
            game.prev_mode = 0
            game.cap_boost = 1
            game.stored_exp = 0
            game.flux_boost = 1
            game.flux_increase = 1
            if (game.perks[3]) game.flux_boost = 5

            if (game.perks[1]) {
                game.generator_kit = 12
                game.exp_add = game.generator_kit * game.watt_boost
                game.cps = game.generator_kit
            } else game.generator_kit = 0

            if (game.perks[7])
                document.getElementById("autopp_config").style.display = "block"

            if (game.perks[11])
                document.getElementById("cap_auto").style.display = "inline"

            if (game.perks[12]) game.generator_kit = 24

            if (game.perks[14]) {
                document.getElementById("smart_config").style.display = "block"
                game.smartpr_mode = game.smartpr_start
                game.smartpr_time = 0
                if (game.smartpr_mode === 0) autopr_switch(4)
                else if (game.smartpr_mode === 1) autopr_switch(2)
            }

            if (game.perks[15]) {
                document.getElementById("autorb_block").style.display = "block"
            }

            ampbutton_update()
            document.getElementById("click").innerText =
                "+" + format_num(game.amp) + " EXP"

            document.getElementById("boost_auto").style.display = "none"
            document.getElementById("auto_auto").style.display = "none"
            document.getElementById("fluct_auto").style.display = "none"
            document.getElementById("fact_auto").style.display = "none"
            document.getElementById("flux_auto").style.display = "none"
            document.getElementById("battery_auto").style.display = "none"

            document.getElementById("amp_auto").style.display = "none"
            document.getElementById("auto_config").style.display = "none"
            document.getElementById("auto_mode").style.display = "none"

            document.getElementById("overclock").style.display = "none"
            document.getElementById("oc_auto").style.display = "none"
            document.getElementById("oc_button").style.display = "none"
            document.getElementById("oc_state").innerText = "Recharging"
            document.getElementById("oc_timer").style.display = "block"
            document.getElementById("oc_progress").style.background = "#ff2f00"

            document.getElementById("capacitor").style.display = "none"
            document.getElementById("cap_50").style.display = "none"
            document.getElementById("cap_75").style.display = "none"
            document.getElementById("cap_100").style.display = "none"
            document.getElementById("cap_disc").style.display = "none"
            document.getElementById("dis_auto").style.display = "none"
            document.getElementById("dis_text").style.display = "none"
            document.getElementById("dis_input").style.display = "none"

            if (game.perks[10]) {
                for (let i = 0; i < 15; i++) {
                    game.pp_bought[i] = true
                    pp_upgrade.upgrades[i].on_purchase()
                }
            } else if (game.perks[2]) {
                for (let i = 0; i < 7; i++) {
                    game.pp_bought[i] = true
                    pp_upgrade.upgrades[i].on_purchase()
                }
            }
            pp_update()
        }
    }
}
