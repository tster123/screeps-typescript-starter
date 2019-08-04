import { BaseCreepBehavior } from "./BaseCreepBehavior";
import { CreepMem } from "./CreepMem";

export class Builder extends BaseCreepBehavior {

  public getSpawnDesire(currentEnergy: number): number {
    return 0.3 - 0.3 * (this.Creeps.length / 2); // up to 2, less important the more we have
  }
  public spawn(spawn: StructureSpawn, name: string): boolean {
    const opts: SpawnOptions = { memory: new CreepMem("builder") };
    return OK === spawn.spawnCreep([WORK, CARRY, MOVE], name + " the Builder", opts);
  }

  public run(creep: Creep) {

    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      const targets: Array<ConstructionSite<BuildableStructureConstant>> = creep.room.find(FIND_CONSTRUCTION_SITES);
      let spawns: StructureSpawn[] = [];
      if (targets == null || targets.length === 0) {
        spawns = creep.room.find(FIND_MY_SPAWNS);
      }
      if (targets.length) {
        const ret = creep.build(targets[0])
        if (ret !== OK) {
          this.move(creep, targets[0]);
        }
      }
      else if (spawns.length > 0) {
        this.move(creep, spawns[0]);
      }
      else {
        creep.say("no where to move :(");
      }
    }
    else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        this.move(creep, sources[0]);
      }
    }
  }
}
