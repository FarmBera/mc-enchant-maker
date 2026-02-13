const Variable = {
  nickname: "@p",
  //1.20.x
  structure_1x20:
    '/give @p netherite_sword{Enchantments:[{id:"sharpness",lvl:5},{id:"fire_aspect",lvl:2},{id:"looting",lvl:3},{id:"mending",lvl:1}]}',
  // 1.20.x
  structure_multi_1x20:
    '/give nickname netherite_axe 1 {Enchantments:[{id:"unbreaking",lvl:3},{id:"efficiency",lvl:5},{id:"fortune",lvl:3},{id:"sharpness",lvl:1000},{id:"fire_aspect",lvl:1000},{id:"knockback",lvl:1000},{id:"looting",lvl:1000}]}',
  struct_1x21: [
    '/give @p netherite_pickaxe[enchantments={levels:{"minecraft:efficiency":5,"minecraft:unbreaking":255}}]', //custom success
    'give @s netherite_pickaxe[enchantments={levels:{"minecraft:knockback":1}}]', //sample
    'give @p netherite_pickaxe[enchantments={levels:{"minecraft:efficiency":5}}]',
    'give @p netherite_pickaxe[enchantments={levels:{"efficiency":1000}}]',
    'give @p netherite_pickaxe[enchantments={levels:{id:"efficiency",lvl:1000}}]',
  ],
  struct_1x21_tmp: [
    '/give @p netherite_pickaxe[enchantments={levels:"minecraft:efficiency":255,"minecraft:efficiency":255}]',
    '{levels:"minecraft:efficiency":1000,"minecraft:efficiency":1000}]',
    '{"minecraft:efficiency":5},{"minecraft:fortune":3}}]',
    '{"minecraft:efficiency":5,"minecraft:unbreaking":255}}]', //custom success
    '{"minecraft:knockback":1}}]', //sample
    '{"minecraft:efficiency":5}}]',
    '{"efficiency":1000}}]',
    '{id:"efficiency",lvl:1000}}]',
  ],

  ErrorMsg: "ERROR",

  // 1.20
  str_front: "/give @p ",
  tool: "ERROR",
  // str_second: "{Enchantments:[",
  enchantment: "ERROR",
  // str_end: "]}",

  // 1.21
  str_second: "[enchantments={levels:{",
  str_end: "}}]",

  sep: "_", // separator
};

export default Variable;
