"use strict"

const b_elem = document.querySelectorAll("*.b1");
const trait_elem = document.querySelectorAll("*.trait");
const buff_elem = document.querySelectorAll("*.buff");
const debuff_elem = document.querySelectorAll("*.debuff");
const stat_elem = document.querySelectorAll("*.stat");
const stack_elem = document.querySelectorAll("*.stack");
const base_elem = document.querySelectorAll("*.element");
const fam_elem = document.querySelectorAll("*.familiar");
const res_elem = document.querySelectorAll("*.research");
const rank_elem = document.querySelectorAll("*.rank");


const menu_1 = document.querySelector("#menu_1");
menu_1.addEventListener("mouseenter", show);
menu_1.addEventListener("mouseleave", hide);

const menu_2 = document.querySelector("#menu_2");
menu_2.addEventListener("mouseenter", show);
menu_2.addEventListener("mouseleave", hide);

const menu_3 = document.querySelector("#menu_3");
menu_3.addEventListener("mouseenter", show);
menu_3.addEventListener("mouseleave", hide);

for (let s of b_elem){
	let words = s.innerHTML.split(":", 2);
	s.innerHTML = "";
	let html = "<b>" + words[0] + "</b>" + ": " + words[1];
	s.insertAdjacentHTML("beforeEnd", html);
};

for (let s of trait_elem){
	let htm = createTraitHTML(s.textContent);
	
	if (htm != -1){
		s.addEventListener("mouseenter", show);
		s.addEventListener("mouseleave", hide);
	};
};

for (let s of buff_elem){
	if (s.textContent in buffs){
		s.addEventListener("mouseenter", show);
		s.addEventListener("mouseleave", hide);
	};
};

for (let s of debuff_elem){
	if (s.textContent in debuffs){
		s.addEventListener("mouseenter", show);
		s.addEventListener("mouseleave", hide);
	};
};

for (let s of stat_elem){
	let words = s.textContent.split(" ");
	let stat = "";
	if (words.length == 2){
		stat = words[1];
	}else{
		stat = words[0];
	};
	if (stat in basic_stats){
		s.addEventListener("mouseenter", show);
		s.addEventListener("mouseleave", hide);
	};
};

for (let s of stack_elem){
	if (s.textContent in stacks){
		s.addEventListener("mouseenter", show);
		s.addEventListener("mouseleave", hide);
	};
};

for (let s of base_elem){
	let words = s.textContent.split(" (");
	if (basic_elements.includes(words[0])){
		s.insertAdjacentHTML("beforeEnd", "");
	}else{
		s.insertAdjacentHTML("beforeEnd", "");
	};
	if (words.length == 2){
		s.insertAdjacentHTML("beforeEnd", "");
		words = words[1].split(")")[0]
		let more_words = words.split(", ");
		for (let w in more_words){
			s.insertAdjacentHTML("beforeEnd", "");
			if (w == more_words.length-1){
				s.insertAdjacentHTML("beforeEnd", "");
			}else{
				s.insertAdjacentHTML("beforeEnd", "")
			};
		};
	};
};

for (let s of fam_elem){
	s.addEventListener("mouseenter", show);
	s.addEventListener("mouseleave", hide);
};

for (let s of rank_elem){
	if (s.textContent in ranks){
		s.addEventListener("mouseenter", show);
		s.addEventListener("mouseleave", hide);
	};
};

function createTraitHTML(name){
	let html = '';
	let obj = {
		"Definition": "",
	}
	let defin = "";
	if (name.slice(0, 9) == "Specialty"){
		defin = "All positive roll results that fall under the listed specialty are multiplied by 2";
		html += defin.replace("the listed specialty", name.slice(11, -1) + " specialty");
		return html;
	}
	if (name.slice(-13) == "Vulnerability"){
		defin = "The creature takes more damage from attacks and effects of the given type or subtype";
		if (basic_elements.indexOf(name.slice(0, -14)) != -1){
			html += defin.replace("given type or subtype", "<span class='element'>" + name.slice(0, -14) + "</span>");
		}else{
			html += defin.replace("given type or subtype", name.slice(0, -14));
		}
		return html;
	}
	if (name.slice(-10) == "Reflection"){
		defin = "Attacks and harmful effects of the given type or subtype are reflected back onto the creature that initiated them";
		if (basic_elements.indexOf(name.slice(0, -11)) != -1){
			html += defin.replace("given type or subtype", "<span class='element'>" + name.slice(0, -11) + "</span>");
		}else{
			html += defin.replace("given type or subtype", name.slice(0, -11));
		}
		return html;
	}
	if (name.slice(-10) == "Absorption"){
		defin = "Attacks and harmful effects of the given type or subtype heal this creature instead of their normal effect";
		if (basic_elements.indexOf(name.slice(0, -11)) != -1){
			html += defin.replace("given type or subtype", "<span class='element'>" + name.slice(0, -11) + "</span>");
		}else{
			html += defin.replace("given type or subtype", name.slice(0, -11));
		}
		return html;
	}
	if (name.slice(-8) == "Immunity"){
		defin = "The creature is unaffected by attacks and harmful effects of the given type or subtype";
		if (basic_elements.indexOf(name.slice(0, -9)) != -1){
			html += defin.replace("given type or subtype", "<span class='element'>" + name.slice(0, -9) + "</span>");
		}else{
			html += defin.replace("given type or subtype", name.slice(0, -9));
		}
		return html;
	}
	if (name.slice(-10) == "Resistance"){
		defin = "The creature takes less damage from attacks and harmful effects of the given type or subtype";
		if (basic_elements.indexOf(name.slice(0, -11)) != -1){
			html += defin.replace("given type or subtype", "<span class='element'>" + name.slice(0, -11) + "</span>");
		}else{
			html += defin.replace("given type or subtype", name.slice(0, -11));
		}
		return html;
	}
	if (name.slice(-8) == "Affinity"){
		defin = "Spells that this character casts that have the same subtype as their affinity are more powerful. The character can also learn spells that fall under their affinity 75% faster";
		if (name.slice(0, -9) in basic_elements){
			html += defin.replace("the same subtype as their affinity", "<span class='element'>" + name.slice(0, -9) + "</span> subtype");
		}else{
			html += defin.replace("the same subtype as their affinity", name.slice(0, -9) + "subtype");
		}
		return html;
	}
	if (name.slice(0, 8) == "Critical"){
		defin = "Spells and attacks that have the same subtype reach crit easier";
		if (name.slice(9) in basic_elements){
			html += defin.replace("the same subtype", "<span class='element'>" + name.slice(9) + "</span> subtype");
		}else{
			html += defin.replace("the same subtype", name.slice(9) + "subtype");
		}
		return html;
	}
	if (name.slice(0, 12) == "Fast Healing"){	
		defin = "This creature heals by the amount listed at the start of each of its turns";
		html += defin.replace("the amount listed", name.slice(14, -1));
		return html;
	}
	if (name.slice(0, 17) == "Shield Generation"){
		defin = "This creature Shields by the amount listed at the start of each of its turns";
		html += defin.replace("the amount listed", name.slice(19, -1));
		return html;
	}
	if (name.slice(0, 17) == "Mana Regeneration"){
		defin = "This creature regains X Pool at the start of each of its turns";
		html += defin.replace("X Pool", name.slice(18) + " Pool");
		return html;
	}
	if (name.slice(0, 11) == "Preparation"){
		defin = "The creature begins combat with the listed buffs";
		html += defin.replace(" the listed buffs", ": " + name.slice(13, -1));
		return html;
	}
	if (name.slice(0, 11) == "Malediction"){
		defin = "The creature begins combat with the listed debuffs";
		html += defin.replace(" the listed debuffs", ": " + name.slice(13, -1));
		return html;
	}
	if (name.slice(0, 17) == "Charge Generation"){
		defin = "This creature gains X Charge stacks at the start of each round";
		html += defin.replace("X Charge", name.slice(18) + " <span class='stack'>Charge</span>");
		return html;
	}
	if (name.slice(0, 15) == "Aura Generation"){
		defin = "This creature gains X Aura stacks at the start of each round";
		html += defin.replace("X Aura", name.slice(16) + " <span class='stack'>Aura</span>");
		return html;
	}
	if (name.slice(0, 18) == "Courage Generation"){
		defin = "This creature gains X Courage stacks at the start of each round";
		html += defin.replace("X Courage", name.slice(19) + " <span class='stack'>Courage</span>");
		return html;
	}
	if (name.slice(-7) == "Magnet"){
		defin = "This character's very existence attracts the listed creature type";
		html += defin.replace("the listed creature", name.slice(0, -8));
		return html;
	}
	if (name.slice(0, 12) == "Internalized"){
		defin = "This creature can use Move Cards of the specified element and has Resistance to environmental effects of the specified element";
		html += defin.replace("specified Element", name.slice(14));
		return html;
	}
	if (name.slice(0, 13) == "Total Defense"){
		defin = "The first X times this creature would take damage during a scene, it instead does not";
		html += defin.replace("X times", name.slice(15) + " times");
		return html;
	}
	if (name.slice(0, 12) == "Death Throes"){
		defin = "When this creature dies, it performs the listed attack immediately at no cost";
		html += defin.replace("the listed attack", name.slice(14, -1));
		return html;
	}
	if (name.slice(0, 7) == "Evasion"){
		defin = "Attacks against this creature have a chance to miss equal to 10%";
		html += defin.replace("10%", name.slice(9) + "0%");
		return html;
	}
	if (name in traits){
		html += traits[name];
	}else{
		return -1;
	};
	return html;
}



function createFamiliarHTML(name){
	let html = '';
	for (var cr of creatures) {
		if (cr.name == name) {
			html += '<tr><th>Type</th><td>' + cr.type + '</td></tr>';
			if (Object.keys(cr).includes("hp")){
				html += '<tr><th class="stat">Health</th><td>' + translate_hp(cr.hp, 2) + '</td></tr>';
//				if (cr.hp.slice(0, 2) == "1 "){
//					html += '<tr><th class="stat">Health</th><td>' + cr.hp + ' wound</td></tr>';
//				}else{
//					html += '<tr><th class="stat">Health</th><td>' + cr.hp + ' wounds</td></tr>';
//				}
			}
			if (Object.keys(cr).includes("mp")){
				html += '<tr><th class="stat">MP</th><td>' + cr.mp + '</td></tr>';
			}
			if (Object.keys(cr).includes("mw")){
				html += '<tr><th class="stat">MW</th><td>' + cr.mw + '</td></tr>';
			}
			if (Object.keys(cr).includes("mrt")){
				html += '<tr><th class="stat">MRT</th><td>' + cr.mrt + '</td></tr>';
			}
			if (Object.keys(cr).includes("dpl")){
				html += '<tr><th class="stat">DPL</th><td>' + cr.dpl + '</td></tr>';
			}
			if (Object.keys(cr).includes("stw")){
				html += '<tr><th class="stat">STW</th><td>' + cr.stw + '</td></tr>';
			}
			if (Object.keys(cr).includes("ing")){
				html += '<tr><th class="stat">ING</th><td>' + cr.ing + '</td></tr>';
			}
			if (Object.keys(cr).includes("lrn")){
				html += '<tr><th class="stat">LRN</th><td>' + cr.lrn + '</td></tr>';
			}
			if (Object.keys(cr).includes("srt")){
				html += '<tr><th class="stat">SRT</th><td>' + cr.srt + '</td></tr>';
			}
			if (Object.keys(cr).includes("cbt")){
				html += '<tr><th class="stat">CBT</th><td>' + cr.cbt + '</td></tr>';
			}else{
				html += '<tr><th class="stat">OCBT</th><td>' + cr.ocbt + '</td></tr>';
				html += '<tr><th class="stat">DCBT</th><td>' + cr.dcbt + '</td></tr>';
			}
			
		}
	}

	return html;
}

function createResearchHTML(name){
	let html = '';

	let obj = researches[name];
    
    for (var key in obj) {
		
        if (obj[key] === ""){
        }else{
            html += '<tr><td>'+ key +'</td><td>' + obj[key] + '</td></tr>';
        }
    }
	return html;
}



function hide(event){
	let el = event.target.lastChild;
	if (el.className == "trigger") {
		el.remove();
	}
	if (el.className == "menu_trigger") {
		el.remove();
	}
};

function show(event){
	let el = event.target;
	let html = ""
	if (el.className == "trait"){
		html = "<table class='trigger'><tr><td>" + createTraitHTML(el.textContent) + "</td></tr></table>";
	}
	if (el.className == "buff"){
		html = '<table class="trigger"><tr><td>' + buffs[el.textContent] + '</td></tr></table>';
	}
	if (el.className == "debuff"){
		html = '<table class="trigger"><tr><td>' + debuffs[el.textContent] + '</td></tr></table>';
	}
	if (el.className == "stack"){
		html = '<table class="trigger"><tr><td>' + stacks[el.textContent] + '</td></tr></table>';
	}
	if (el.className == "familiar"){
		html = "<table class='trigger'>" + createFamiliarHTML(el.innerText) + '</table>';
	}
	if (el.className == "stat"){
		let words = el.textContent.split(" ");
		let stat = "";
		if (words.length == 2){
			stat = words[1];
		}else{
			stat = words[0];
		};
		html = '<table class="trigger"><tr><td>' + basic_stats[stat] + "</td></tr></table>";
	}
	if (el.className == "research"){
		html = "<table class='trigger'>" + createResearchHTML(el.textContent) + '</table>';
	}
	if (el.className == "rank"){
		html = '<table class="trigger"><tr><td>' + ranks[el.textContent] + '</td></tr></table>';
	}
	if (el.id == "menu_1"){
		html = '<table class="menu_trigger" style="width: 20%;">';
		html += '<tr><td><a href="Definitions.html">Definitions</a></td></tr>';
		html += '</table>';
	}
	if (el.id == "menu_2"){
		html = '<table class="menu_trigger" style="width: 45%;">'
		html += '<tr><td><a href="Biomes.html">Biomes and Rooms</a></td></tr>';
		html += '<tr><td><a href="Families.html">Creature Families</a></td></tr>';
		html += '</table>';
	}
	if (el.id == "menu_3"){
		html = '<table class="menu_trigger" style="width: 35%;">';
		html += '<tr><td><a href="Characters.html">Characters</a></td></tr>';
		html += '<tr><td><a href="Spellbook.html">Spellbook</a></td></tr>';
		html += '<tr><td><a href="Chronology.html">Chronology</a></td></tr>';
		html += '</table>';
	}
	el.insertAdjacentHTML("beforeEnd", html);
};


