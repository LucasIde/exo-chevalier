// ==============================
// 🌱 Sélection des éléments
// ==============================



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
			return (`${this.name}: this divine nectar get me to ${this.life}hp`)
		}
	}
	isDead() {
		return ((this.life == 0) ? true : false);
	}
}

// ==============================
// 🎊 Fonctionnalités
// ==============================



// ==============================
// 🧲 Événements
// ==============================


const chevalier1 = new Chevalier("arthur", 20, 20);
const chevalier2 = new Chevalier("theo", 20, 20);
const chevalier3 = new Chevalier("killer", 100, 100);

console.log(chevalier1.shout());
// logiquement peut pas utiliser de potion
console.log(chevalier2.usePotion());
console.log(chevalier2.attack(chevalier1));
console.log(chevalier2.attack(chevalier1));
console.log(chevalier2.magicAttack(chevalier1));
console.log(chevalier2.magicAttack(chevalier1));
// logiquement plus de mana
console.log(chevalier2.magicAttack(chevalier1));
console.log(chevalier1.usePotion());
console.log(chevalier1.usePotion());
// plus de potion
console.log(chevalier1.usePotion());
console.log(chevalier3.attack(chevalier2));
// already dead
console.log(chevalier2.usePotion());
console.log(chevalier2.attack());
console.log(chevalier2.magicAttack());
console.log(chevalier3.attack(chevalier2));




