export class Tache {
    titre: string;
    description: string;
    dateHeureDebut: Date;
    dateHeureFin: Date;

    constructor(titre: string, description: string, dateHeureDebut: Date, dateHeureFin: Date) {
        this.titre = titre;
        this.description = description;
        this.dateHeureDebut = dateHeureDebut;
        this.dateHeureFin = dateHeureFin;
    }
}