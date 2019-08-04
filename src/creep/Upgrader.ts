import { BaseCreepBehavior } from "./BaseCreepBehavior";
import { CreepMem } from "./CreepMem";

export class Upgrader extends BaseCreepBehavior {

    public getSpawnDesire(currentEnergy: number): number {
        return 0.8 - 0.8 * (this.Creeps.length / 2); // up to 2, less important the more we have
    }
    public spawn(spawn: StructureSpawn, name: string): boolean {
        const opts: SpawnOptions = { memory: new CreepMem("upgrader") };
        return OK === spawn.spawnCreep([WORK, CARRY, MOVE], name + " the Upgrader", opts);
    }

    public run(creep: Creep) {
        if (creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.room.controller !== undefined) {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    this.move(creep, creep.room.controller);
                }
            }
        }
        else {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                this.move(creep, sources[0]);
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}
