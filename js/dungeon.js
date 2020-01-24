// creature
    // AC, HP, conditions, initiative, numActive, name
// player character extends creature
    // adds party membership token => points to ID of party
// create a party
    // party has: Player Characters, id, name
    // create x Player Characters

class Creature {
    conditions = [];
    initiative = null;
    constructor(name, ac, totalHp, speed, conditions) {
        this.name = name;
        this.ac = ac;
        this.totalHp = totalHp;
        this.speed = speed;
        this.conditions = conditions;
        this.currentHp = totalHp;
    }

    changeHp(val) {
        this.currentHp = this.currentHp + val;
        console.log(this.currentHp)
    }
}

class Combat {
    enemies = [];
    party = [];
    constructor(enemies,party) {

    }

    get turnOrder() {}
}

function genTblRow(obj, skipKeys){
    let row = document.createElement("tr");
    $.each(obj, function(i,v){
        if(i === "_id" || i === "url" || i === "index")return;
        if(!skipKeys){
          var keyCell = document.createElement("td");
          keyCell.appendChild(document.createTextNode(i));
          row.appendChild(keyCell);
        }


        var valCell = document.createElement("td");
        valCell.className = i;
        valCell.appendChild(document.createTextNode(v));
        row.appendChild(valCell);

    })
    return row
}

function displayMonsterOptions(monsters){
    // var monsterIndex = $(window.monsters.results).map(function(i,elem){
    //     return elem.index;
    // });
    $(monsters).each(function(i,monster){
        // console.log(value);
        var opt = document.createElement("option");
        opt.value = monster.url;
        var textnode = document.createTextNode(monster.name);
        opt.appendChild(textnode);
        $("#monsterPicker").append(opt);
    });
}

function displayMonster(monster){
    // console.log(monster.index);
    $("#activeMonster table").html('');

    $.each(monster, function(key,val){
        // console.log(val);
        if(key==="_id" || key==="url")return;

        let row = new Object;
        row[key] = val;
        $("#activeMonster table")
        .append(genTblRow(row))
    });
}

// An example of how I should be using the genTblRow() function
function displayMonsterProficiencies(){
  Object.keys(dragon.proficiencies).map(function(v) {

	var obj = dragon.proficiencies[v];

	// console.log(v);

	if(typeof obj === "object"){
		// console.log( obj );
		$("#activeMonster table")
		.append(genTblRow( obj, true ));
        //.append(genTblRow( {[v]: {obj} } ));
	}
} )
}

// function getSrd(url){
//
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: 'http://www.dnd5eapi.co'+url,
//             dataType: 'json',
//             context: document.body,
//             success: function(data) {
//                 //called when successful
//                 console.log(data);
//                 // return data;
//                 return resolve(data);
//             },
//             error: function(e) {
//                 //called when there is an error
//                 console.log(e.message);
//                 // return e;
//                 return reject(e.message);
//             }
//         });
//     })
//
// }

window.dragon = {
  "_id": "5e1a94a70b1bb138c5c14104",
  "index": "adult-gold-dragon",
  "name": "Adult Gold Dragon",
  "size": "Huge",
  "type": "dragon",
  "subtype": null,
  "alignment": "lawful good",
  "armor_class": 19,
  "hit_points": 256,
  "hit_dice": "19d12",
  "speed": {
    "walk": "40 ft.",
    "fly": "80 ft.",
    "swim": "40 ft."
  },
  "strength": 27,
  "dexterity": 14,
  "constitution": 25,
  "intelligence": 16,
  "wisdom": 15,
  "charisma": 24,
  "proficiencies": [
    {
      "name": "Saving Throw: DEX",
      "url": "/api/proficiencies/saving-throw-dex",
      "value": 8
    },
    {
      "name": "Saving Throw: CON",
      "url": "/api/proficiencies/saving-throw-con",
      "value": 13
    },
    {
      "name": "Saving Throw: WIS",
      "url": "/api/proficiencies/saving-throw-wis",
      "value": 8
    },
    {
      "name": "Saving Throw: CHA",
      "url": "/api/proficiencies/saving-throw-cha",
      "value": 13
    },
    {
      "name": "Skill: Insight",
      "url": "/api/proficiencies/skill-insight",
      "value": 8
    },
    {
      "name": "Skill: Perception",
      "url": "/api/proficiencies/skill-perception",
      "value": 14
    },
    {
      "name": "Skill: Persuasion",
      "url": "/api/proficiencies/skill-persuasion",
      "value": 13
    },
    {
      "name": "Skill: Stealth",
      "url": "/api/proficiencies/skill-stealth",
      "value": 8
    }
  ],
  "damage_vulnerabilities": [],
  "damage_resistances": [],
  "damage_immunities": [
    "fire"
  ],
  "condition_immunities": [],
  "senses": {
    "blindsight": "60 ft.",
    "darkvision": "120 ft.",
    "passive_perception": 24
  },
  "languages": "Common, Draconic",
  "challenge_rating": 17,
  "special_abilities": [
    {
      "name": "Amphibious",
      "desc": "The dragon can breathe air and water."
    },
    {
      "name": "Legendary Resistance",
      "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
      "usage": {
        "type": "per day",
        "times": 3
      }
    }
  ],
  "actions": [
    {
      "name": "Multiattack",
      "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
    },
    {
      "name": "Bite",
      "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
      "attack_bonus": 14,
      "damage": [
        {
          "damage_type": {
            "name": "Piercing",
            "url": "/api/damage-types/piercing"
          },
          "damage_dice": "2d10",
          "damage_bonus": 8
        }
      ]
    },
    {
      "name": "Claw",
      "desc": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
      "attack_bonus": 14,
      "damage": [
        {
          "damage_type": {
            "name": "Slashing",
            "url": "/api/damage-types/slashing"
          },
          "damage_dice": "2d6",
          "damage_bonus": 8
        }
      ]
    },
    {
      "name": "Tail",
      "desc": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
      "attack_bonus": 14,
      "damage": [
        {
          "damage_type": {
            "name": "Bludgeoning",
            "url": "/api/damage-types/bludgeoning"
          },
          "damage_dice": "2d8",
          "damage_bonus": 8
        }
      ]
    },
    {
      "name": "Frightful Presence",
      "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
      "dc": {
        "dc_type": {
          "name": "WIS",
          "url": "/api/ability-scores/wis"
        },
        "dc_value": 21,
        "success_type": "none"
      }
    },
    {
      "name": "Breath Weapons",
      "desc": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 66 (12d10) fire damage on a failed save, or half as much damage on a successful one.\nWeakening Breath. The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 21 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
      "usage": {
        "type": "recharge on roll",
        "dice": "1d6",
        "min_value": 5
      },
      "attacks": [
        {
          "name": "Fire Breath",
          "dc": {
            "dc_type": {
              "name": "DEX",
              "url": "/api/ability-scores/dex"
            },
            "dc_value": 21,
            "success_type": "half"
          },
          "damage": [
            {
              "damage_type": {
                "name": "Fire",
                "url": "/api/damage-types/fire"
              },
              "damage_dice": "12d10",
              "damage_bonus": 0
            }
          ]
        },
        {
          "name": "Weakening Breath",
          "dc": {
            "dc_type": {
              "name": "STR",
              "url": "/api/ability-scores/str"
            },
            "dc_value": 21,
            "success_type": "none"
          }
        }
      ]
    }
  ],
  "legendary_actions": [
    {
      "name": "Detect",
      "desc": "The dragon makes a Wisdom (Perception) check."
    },
    {
      "name": "Tail Attack",
      "desc": "The dragon makes a tail attack."
    },
    {
      "name": "Wing Attack (Costs 2 Actions)",
      "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
      "dc": {
        "dc_type": {
          "name": "DEX",
          "url": "/api/ability-scores/dex"
        },
        "dc_value": 22,
        "success_type": "none"
      },
      "damage": [
        {
          "damage_type": {
            "name": "Bludgeoning",
            "url": "/api/damage-types/bludgeoning"
          },
          "damage_dice": "2d6",
          "damage_bonus": 8
        }
      ]
    }
  ],
  "url": "/api/monsters/adult-gold-dragon"
};
window.monsters = {results:[{
  index: "adult-gold-dragon",
  name: "Adult Gold Dragon",
  url: "/api/monsters/adult-gold-dragon"
}]};

function getSrd(url){

    return new Promise((resolve, reject) => {
        if(url==="/api/monsters/adult-gold-dragon"){
          var data = window.dragon;
          return resolve(data);
        }else if(url==="/api/monsters"){
          var data = window.monsters;
          return resolve(data);
        }else{return reject();}
    })

}



$( document ).ready(function() {
    // create combat object
    // window.combat = {
    //     creatures: {},
    //     turnOrder: {}
    // };
    window.combat = new Combat();

    //populate monster dropdown values
    getSrd("/api/monsters").then(function(result){
        displayMonsterOptions(result.results)
    }, function(err) {
       console.log(err);
    });

    //get data for chosen monster on value change
    $("#monsterPicker").on("change",function(e){
        getSrd(e.target.value).then(function(result){
            displayMonster(result);
            combat.enemies.push(
              new Creature(result.name,result.armor_class,result.hit_points,result.speed)
            );
            // log out all enemies
            $(combat.enemies).each( function(v){
            	console.log(combat.enemies[v]);
            } )
        }, function(err) {
           console.log(err);
        });
    });

    // make enemies
    // window.combat.creatures.goblin = new Creature("goblin",12,13,20);
    // add to turn order
    // $("#turnOrder").html(window.combat.creatures.goblin.name)

    // log all the creatures
    // console.log(combat.creatures);
});
