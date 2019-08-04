import { CreepSpawner } from "spawn/CreepSpawner";
import { BaseCreepBehavior } from "./BaseCreepBehavior";
import { Builder } from "./Builder";
import { Harvester } from "./Harvester";
import { Upgrader } from "./Upgrader";


export class CreepManager {
    private handlers = new Map<string, BaseCreepBehavior>();
    constructor() {
        this.handlers.set("builder", new Builder());
        this.handlers.set("harvester", new Harvester());
        this.handlers.set("upgrader", new Upgrader());
    }

    public run() {
        this.addCreeps();
        this.commandCreeps();
        new CreepSpawner(this.handlers).spawn();
    }

    private addCreeps() {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            const behavior = this.handlers.get(creep.memory.role);
            if (behavior !== undefined) {
                behavior.AddCreep(creep);
            }
        }
    }

    private commandCreeps() {
        for (const handler of this.handlers.values()) {
            handler.runAll();
        }
    }
}
