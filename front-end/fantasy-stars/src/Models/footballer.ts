interface Footballer {
    id?: string;
    name?: string;
    description?: string;
    klub?: string;
    nationalitaet?: string;
    alter?: number;
    position?: string;
    bild?: string | File;
    marktwert?: number;
    likes?: number;
}

export default Footballer;