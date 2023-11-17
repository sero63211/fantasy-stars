interface Footballer {
    name: string;
    klub: string;
    nationalitaet: string;
    alter: number;
    position: string;
    bild?: string; // Optional, da nicht alle Spieler ein Bild haben müsse
    marktwert: number;
}

export default Footballer;
