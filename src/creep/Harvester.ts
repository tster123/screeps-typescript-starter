import { BaseCreepBehavior } from "./BaseCreepBehavior";
import { CreepMem } from "./CreepMem";

export class Harvester extends BaseCreepBehavior {

  public getSpawnDesire(currentEnergy: number): number {
    return 1 - (this.Creeps.length / 4); // up to 4 harvesters, less important the more we have
  }
  public spawn(spawn: StructureSpawn, name: string): boolean {
    const opts: SpawnOptions = { memory: new CreepMem("harvester") };
    return OK === spawn.spawnCreep([WORK, CARRY, MOVE], name + " the Harvester", opts);
  }

  public run(creep: Creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        this.move(creep, sources[0]);
      }
    }
    else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.move(creep, targets[0]);
        }
      }
      else {
        const spawns = creep.room.find(FIND_MY_SPAWNS);
        this.move(creep, spawns[0]);
      }
    }
  }
}
