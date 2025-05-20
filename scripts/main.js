// ==============================
// 🌱 Sélection des éléments
// ==============================

const nameInput = document.querySelector(".name");
const strengthInput = document.querySelector(".strength");
const magicInput = document.querySelector(".magic");
const printerror = document.querySelector(".error");
const printPerso = document.querySelector(".perso");
const btnCreate = document.querySelector(".create");
const btnAll = document.querySelector(".menu");
const figther = document.getElementById("figther");
const defender = document.getElementById("defender");
const dialogue = document.querySelector(".dialogue")

// ==============================
// 🌍 Variables globales
// ==============================

class Chevalier {
	constructor(name, strength, magic) {
		this.name = name;
		this.strength = strength;
		this.magic = magic;
		this.life = 100;
		this.mana = 50;
		this.potions = 2;
		this.manaBar = 0;
		this.lifeBar = 0;
	}
	shout() {
		if (this.isDead()) {
			return (`${this.name}: it's too late for this`);
		}
		else {
			return (`${this.name}: *my name is ${this.name}*`);
		}
	}
	attack(cible) {
		if (this.isDead()) {
			return (`${this.name}: it's too late for this`);
		}
		if (cible.isDead()) {
			return (`${this.name}: why should i attack a dead body ?`)
		}
		else {
			let hpLeft = cible.getDamages(this.strength);
			return (`${this.name}: my all-migthy strength get you to ${hpLeft}hp`);
		}
	}
	magicAttack(cible) {
		if (this.isDead()) {
			return (`${this.name}: it's too late for this`);
		}
		else if (cible.isDead()) {
			return (`${this.name}: why should i attack a dead body ?`)
		}
		else {
			if (this.mana >= 20) {
				let hpLeft = cible.getDamages(this.magic);
				this.mana -= 20;
				this.manaBar = 100 - (this.mana * 2);
				return (`${this.name}: my esoteric magic get you to ${hpLeft}hp`);
			}
			else {
				return (`${this.name}: I'm out of mana`);
			}
		}
	}
	getDamages(damagePoint) {
		this.life -= damagePoint;
		if (this.life < 0) {
			this.life = 0;
		}
		this.lifeBar = 100 - this.life;
		return (this.life);
	}
	usePotion() {
		if (this.isDead()) {
			return (`${this.name}: it's too late for this`);
		}
		else if (this.potions == 0){
			return (`${this.name}: i'm out of potions`);
		}
		else if (this.life == 100) {
			return (`${this.name}: i'm already full life`);
		}
		else {
			this.life += 30;
			this.potions--;
			if (this.life >= 100) {
				this.life = 100;
			}
			this.lifeBar = 100 - this.life;
			return (`${this.name}: this divine nectar get me to ${this.life}hp`)
		}
	}
	isDead() {
		return ((this.life == 0) ? true : false);
	}
}

const tabKnight = [];

let timeout;
let timeoutError;

// ==============================
// 🎊 Fonctionnalités
// ==============================

function checkname() {
	const len = tabKnight.length;
	if (len != 0) {
		for (let i = 0; i < len; i++) {

			if (tabKnight[i].name == nameInput.value){
				return (false);
			}
		}
	}
	return (true);
}

function displayError(str) {
    clearTimeout(timeoutError);
	printerror.innerHTML = str;
    timeoutError = setTimeout(`printerror.innerHTML = ""`, 3000);
}

function displaytxt(str) {
    clearTimeout(timeout);
	dialogue.innerHTML = str;
    timeout = setTimeout(`dialogue.innerHTML = ""`, 5000);
}

function createKnight() {
	console.log(checkname());
	if (checkname() != false) {
		const knight = new Chevalier(nameInput.value, strengthInput.value, magicInput.value);
		tabKnight.push(knight);
		createOption(tabKnight.length-1);
		createKnightHTML(knight, tabKnight.length-1);
	}
	else {
		displayError("only one knight can have this name !");
	}
}

function createOption(index) {
	const option = document.createElement("option");
	option.id = option.value = index;

	option.innerHTML = nameInput.value;
	figther.append(option.cloneNode(true));
	defender.append(option);
}

function createKnightHTML(knight, index) {
	const card = document.createElement('div');
	const img = document.createElement('div');
	const stat = document.createElement('div');
	const rand =  Math.floor(Math.random() * 5) + 1;
	const perso = "perso" + rand;

	card.className = `card`;
	card.setAttribute("data-index", index);
	img.className = `img ${perso}`;
	stat.className = `stat`;
	createStat(knight, stat);
	card.append(img, stat);
	printPerso.append(card);
}

function createStat(knight, stat) {
	stat.innerHTML = `
	<div class="persoinfo">name: ${knight.name}</div>
	<div class="persoinfo">strenght: ${knight.strength}</div>
	<div class="persoinfo">magic: ${knight.magic}</div>
	<div class="persoinfo">life: ${knight.life}</div>
    <div class="lifeBar"><div class="lifeLeft" style="width: ${knight.lifeBar}%;"></div></div>
	<div class="persoinfo">mana: ${knight.mana}</div>
	<div class="manaBar"><div class="manaLeft" style="width: ${knight.manaBar}%;"></div></div>
	<div class="persoinfo">potions: ${knight.potions}</div>`;
}

function resetvalue() {
	nameInput.value = '';
	strengthInput.value = '';
	magicInput.value = '';
	nameInput.select();
}

function deadPlayer() {
	if (tabKnight[defender.value].isDead()) {
		const addDead = document.querySelector(`.card[data-index="${defender.value}"] .img`);
		addDead.innerHTML = `<div class="isDead">`;
	}
}

// ==============================
// 🧲 Événements
// ==============================


btnCreate.addEventListener("click", (e) => {
	e.preventDefault();
	if (nameInput.value && strengthInput.value && magicInput.value) {
		createKnight();
	}
	else {
		displayError("missing value to create a knight");
	}
	resetvalue();
})

btnAll.addEventListener("click", (e) => {
	if (figther.value) {
		switch(e.target.className) {
			case ("shout"): {
				displaytxt(tabKnight[figther.value].shout());
				break;
			}
			case ("attack"): {
				console.log("yo");
				if (defender.value != '' && defender.value != figther.value) {
					displaytxt(tabKnight[figther.value].attack(tabKnight[defender.value]))
					const newStat = document.querySelector(`.card[data-index="${defender.value}"] .stat`);
					createStat(tabKnight[defender.value], newStat);
					deadPlayer();
				}
				else {
					displayError("a other defender must be choose");
				}
				break;
			}
			case ("attackMagic"): {
				if (defender.value != '' && defender.value != figther.value) {
					// stat modif
					displaytxt(tabKnight[figther.value].magicAttack(tabKnight[defender.value]))
					// change stat html defenser
					const newStatDef = document.querySelector(`.card[data-index="${defender.value}"] .stat`);
					createStat(tabKnight[defender.value], newStatDef);
					// change stat html figther needed for mana
					const newStatAtt = document.querySelector(`.card[data-index="${figther.value}"] .stat`);
					createStat(tabKnight[figther.value], newStatAtt);
					// add death background
					deadPlayer();

				}
				else {
					displayError("a other defender must be choose");

				}
				break;
			}
			case ("potions"): {
				displaytxt(tabKnight[figther.value].usePotion());
				const newStat = document.querySelector(`.card[data-index="${figther.value}"] .stat`);
				createStat(tabKnight[figther.value], newStat);
				break;
			}
		}
	}
	else {
		displayError("a figther must be selected");
	}
})

// const chevalier1 = new Chevalier("arthur", 20, 20);
// const chevalier2 = new Chevalier("theo", 20, 20);
// const chevalier3 = new Chevalier("killer", 100, 100);

// console.log(chevalier1.shout());
// // logiquement peut pas utiliser de potion
// console.log(chevalier2.usePotion());
// console.log(chevalier2.attack(chevalier1));
// console.log(chevalier2.attack(chevalier1));
// console.log(chevalier2.magicAttack(chevalier1));
// console.log(chevalier2.magicAttack(chevalier1));
// // logiquement plus de mana
// console.log(chevalier2.magicAttack(chevalier1));
// console.log(chevalier1.usePotion());
// console.log(chevalier1.usePotion());
// // plus de potion
// console.log(chevalier1.usePotion());
// console.log(chevalier3.attack(chevalier2));
// // already dead
// console.log(chevalier2.usePotion());
// console.log(chevalier2.attack());
// console.log(chevalier2.magicAttack());
// console.log(chevalier3.attack(chevalier2));




