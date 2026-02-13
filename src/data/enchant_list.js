const enchant_list = [// # mending
    {
        name: "mending", id: "mending", lvl: 1, origin: '"minecraft:mending":1',
    }, {
        name: "mendingX", id: "mending", lvl: 255, origin: '"minecraft:mending":255',
    }, // # unbreaking
    {
        name: "unbreaking", id: "unbreaking", lvl: 3, origin: '"minecraft:unbreaking":3',
    }, {
        name: "unbreakingX", id: "unbreaking", lvl: 255, origin: '"minecraft:unbreaking":255',
    }, // # efficiency
    {
        name: "efficiency", id: "efficiency", lvl: 5, origin: '"minecraft:efficiency":5',
    }, {
        name: "efficiency10", id: "efficiency", lvl: 10, origin: '"minecraft:efficiency":10',
    }, {
        name: "efficiencyX", id: "efficiency", lvl: 255, origin: '"minecraft:efficiency":255',
    }, // # fortune
    {
        name: "fortune", id: "fortune", lvl: 3, origin: '"minecraft:fortune":3',
    }, {
        name: "fortune5", id: "fortune", lvl: 5, origin: '"minecraft:fortune":5',
    }, {
        name: "fortune10", id: "fortune", lvl: 10, origin: '"minecraft:fortune":10',
    }, {
        name: "fortuneX", id: "fortune", lvl: 255, origin: '"minecraft:fortune":255',
    }, // # silk_touch
    {
        name: "silk_touch", id: "silk_touch", lvl: 1, origin: '"minecraft:silk_touch":1',
    }, {
        name: "silk_touchX", id: "silk_touch", lvl: 255, origin: '"minecraft:silk_touch":255',
    }, // # sharnpess
    {
        name: "sharpness", id: "sharpness", lvl: 5, origin: '"minecraft:sharpness":5',
    }, {
        name: "sharpnessX", id: "sharpness", lvl: 255, origin: '"minecraft:sharpness":255',
    }, // # {"minecraft:fire_aspect":2}
    {
        name: "fire_aspect", id: "fire_aspect", lvl: 2, origin: '"minecraft:fire_aspect":2',
    }, {
        name: "fire_aspect10", id: "fire_aspect", lvl: 10, origin: '"minecraft:fire_aspect":10',
    }, {
        name: "fire_aspectX", id: "fire_aspect", lvl: 255, origin: '"minecraft:fire_aspect":255',
    }, // # knockback
    {
        name: "knockback", id: "knockback", lvl: 2, origin: '"minecraft:knockback":2',
    }, {
        name: "knockback5", id: "knockback", lvl: 5, origin: '"minecraft:knockback":5',
    }, {
        name: "knockback10", id: "knockback", lvl: 10, origin: '"minecraft:knockback":10',
    }, {
        name: "knockback20", id: "knockback", lvl: 20, origin: '"minecraft:knockback":20',
    }, {
        name: "knockback30", id: "knockback", lvl: 30, origin: '"minecraft:knockback":30',
    }, {
        name: "knockback50", id: "knockback", lvl: 50, origin: '"minecraft:knockback":50',
    }, {
        name: "knockback100", id: "knockback", lvl: 100, origin: '"minecraft:knockback":100',
    }, {
        name: "knockbackX", id: "knockback", lvl: 255, origin: '"minecraft:knockback":255',
    }, // # looting
    {
        name: "looting", id: "looting", lvl: 3, origin: '"minecraft:looting":3',
    }, {
        name: "looting5", id: "looting", lvl: 5, origin: '"minecraft:looting":5',
    }, {
        name: "looting10", id: "looting", lvl: 10, origin: '"minecraft:looting":10',
    }, {
        name: "looting30", id: "looting", lvl: 30, origin: '"minecraft:looting":30',
    }, {
        name: "looting50", id: "looting", lvl: 50, origin: '"minecraft:looting":50',
    }, {
        name: "looting100", id: "looting", lvl: 100, origin: '"minecraft:looting":100',
    }, {
        name: "lootingX", id: "looting", lvl: 255, origin: '"minecraft:looting":255',
    }, // # ____________
    // # ___ Bow ____
    // # ____________
    {
        name: "power", id: "power", lvl: 5, origin: '"minecraft:power":5',
    }, {
        name: "powerX", id: "power", lvl: 255, origin: '"minecraft:power":255',
    }, {
        name: "punch", id: "punch", lvl: 2, origin: '"minecraft:punch":2',
    }, {
        name: "punchX", id: "punch", lvl: 255, origin: '"minecraft:punch":255',
    }, {
        name: "flame", id: "flame", lvl: 1, origin: '"minecraft:flame":1',
    }, {
        name: "flameX", id: "flame", lvl: 255, origin: '"minecraft:flame":255',
    }, {
        name: "infinity", id: "infinity", lvl: 1, origin: '"minecraft:infinity":1',
    }, {
        name: "infinityX", id: "infinity", lvl: 255, origin: '"minecraft:infinity":255',
    }, // # ____________
    // # __ Armors __
    // # ____________
    // # protection: 1234
    {
        name: "protection", id: "protection", lvl: 4, origin: '"minecraft:protection":4',
    }, {
        name: "protection5", id: "protection", lvl: 5, origin: '"minecraft:protection":5',
    }, {
        name: "protectio10", id: "protection", lvl: 10, origin: '"minecraft:protection":10',
    }, {
        name: "protectioX", id: "protection", lvl: 255, origin: '"minecraft:protection":255',
    }, // # thorns: 1234
    {
        name: "thorns", id: "thorns", lvl: 3, origin: '"minecraft:thorns":3',
    }, {
        name: "thorns5", id: "thorns", lvl: 5, origin: '"minecraft:thorns":5',
    }, {
        name: "thorns10", id: "thorns", lvl: 10, origin: '"minecraft:thorns":10',
    }, {
        name: "thornsX", id: "thorns", lvl: 255, origin: '"minecraft:thorns":255',
    }, // # respiration: 1
    {
        name: "respiration", id: "respiration", lvl: 4, origin: '"minecraft:respiration":4',
    }, {
        name: "respirationX", id: "respiration", lvl: 255, origin: '"minecraft:respiration":255',
    }, // # aqua_affinity: 1
    {
        name: "aqua_affinity", id: "aqua_affinity", lvl: 1, origin: '"minecraft:aqua_affinity":1',
    }, {
        name: "aqua_affinityX", id: "aqua_affinity", lvl: 255, origin: '"minecraft:aqua_affinity":255',
    }, // # feather_falling: 4
    {
        name: "feather_falling", id: "feather_falling", lvl: 4, origin: '"minecraft:feather_falling":4',
    }, {
        name: "feather_fallingX", id: "feather_falling", lvl: 255, origin: '"minecraft:feather_falling":255',
    }, // # frost_walker: 4
    {
        name: "frost_walker1", id: "frost_walker", lvl: 1, origin: '"minecraft:frost_walker":1',
    }, {
        name: "frost_walker2", id: "frost_walker", lvl: 2, origin: '"minecraft:frost_walker":2',
    }, {
        name: "frost_walker5", id: "frost_walker", lvl: 5, origin: '"minecraft:frost_walker":5',
    }, // # soul_speed: 4
    {
        name: "soul_speed", id: "soul_speed", lvl: 3, origin: '"minecraft:soul_speed":3',
    }, {
        name: "soul_speed5", id: "soul_speed", lvl: 5, origin: '"minecraft:soul_speed":5',
    }, {
        name: "soul_speed10", id: "soul_speed", lvl: 10, origin: '"minecraft:soul_speed":10',
    },];

export default enchant_list;
