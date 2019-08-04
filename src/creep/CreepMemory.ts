interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    building: boolean;
    upgrading: boolean;
}

class CreepMem implements CreepMemory {
    public role: string;
    public room: string = "";
    public working: boolean = false;
    public building: boolean = false;
    public upgrading: boolean = false;

    constructor(role: string) {
        this.role = role;
    }
}
