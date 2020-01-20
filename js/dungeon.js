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
    constructor(name, ac, totalHp, conditions) {
        this.name = name;
        this.ac = ac;
        this.totalHp = totalHp;
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

function genTblRow(obj){
    let row = document.createElement("tr");
    $.each(obj, function(i,v){
        if(i === "_id" || i === "url" || i === "index")return;
        if(typeof v === "object"){
          row.appendChild(genTblRow(v));
          return;
        }
        if(i !== "name"){
          var keyCell = document.createElement("td");
          keyCell.appendChild(document.createTextNode(i));
          row.appendChild(keyCell);
        }

        var valCell = document.createElement("td");
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

        // let row = document.createElement("tr");

        // if(typeof val === "object"){
        //     $.each(val,function(i,x){
        //         let subrow = document.createElement("tr");
        //         var subkeyCell = document.createElement("td");
        //         var subvalCell = document.createElement("td");
        //         subkeyCell.appendChild(document.createTextNode(i));
        //         subvalCell.appendChild(document.createTextNode(x));
        //         row.appendChild(subrow);
        //     })

        // }

        // var keyCell = document.createElement("td");
        // var valCell = document.createElement("td");
        // keyCell.appendChild(document.createTextNode(key));
        // valCell.appendChild(document.createTextNode(val));
        // row.appendChild(keyCell);
        // row.appendChild(valCell);

        let row = new Object;
        row[key] = val;
        $("#activeMonster table")
        .append(document.body.appendChild(genTblRow(row)))
    });
}

function getSrd(url){

    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://www.dnd5eapi.co'+url,
            dataType: 'json',
            context: document.body,
            success: function(data) {
                //called when successful
                console.log(data);
                // return data;
                return resolve(data);
            },
            error: function(e) {
                //called when there is an error
                console.log(e.message);
                // return e;
                return reject(e.message);
            }
        });
    })

}


$( document ).ready(function() {
    // create combat object
    // window.combat = {
    //     creatures: {},
    //     turnOrder: {}
    // };

    //populate monster dropdown values
    getSrd("/api/monsters").then(function(result){
        displayMonsterOptions(result.results)
    }, function(err) {
       console.log(err);
    });

    //get data for chosen monster on value change
    $("#monsterPicker").on("change",function(e){
        getSrd(e.target.value).then(function(result){
            displayMonster(result)
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
