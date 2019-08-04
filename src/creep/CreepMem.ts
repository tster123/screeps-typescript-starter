export class CreepMem implements CreepMemory {
    public role: string;
    public room: string = "";
    public working: boolean = false;
    public building: boolean = false;
    public upgrading: boolean = false;

    constructor(role: string) {
        this.role = role;
    }
}
