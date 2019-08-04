import { BaseCreepBehavior } from "creep/BaseCreepBehavior";

export class CreepSpawner {

    private handlers = new Map<string, BaseCreepBehavior>();
    private names = ['Fred', 'Tom', 'Sally', 'Bob', 'Alicia', 'John', 'Katy', 'Jim', 'Gary', 'Angela', 'Stephanie', 'Danielle', 'Tyler', 'Joe', 'Frank', 'Herb', 'April', 'Dustin', 'Brad', 'Paula', 'Ben', 'Nicole'];
    private nameIndex = Math.floor((Math.random() * this.names.length));

    constructor(handlers: Map<string, BaseCreepBehavior>) {
        this.handlers = handlers;
    }

    public spawn() {
        for (const name in Game.rooms) {
            this.spawnRoom(Game.rooms[name]);
        }
        // TODO: need to tell the handlers about spawning creeps
    }

    private spawnRoom(room: Room) {
        // let tier = this.countExtensions(room);
        for (const spawn of room.find(FIND_MY_SPAWNS)) {
            this.spawnSpawn(spawn);
        }
    }

    private spawnSpawn(spawn: StructureSpawn) {
        let maxWant = -1000;
        let maxWantHandler: BaseCreepBehavior | null = null;
        for (const handler of this.handlers.values()) {
            const thisWant = handler.getSpawnDesire(spawn.energy);
            if (thisWant > maxWant) {
                maxWant = thisWant;
                maxWantHandler = handler;
            }
        }
        if (maxWantHandler !== null) {
            const name = this.names[this.nameIndex];
            this.nameIndex++;
            maxWantHandler.spawn(spawn, name);
        }
    }
}
