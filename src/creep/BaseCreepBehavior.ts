export abstract class BaseCreepBehavior {

    protected Creeps: Creep[] = [];

    public AddCreep(creep: Creep) {
        this.Creeps.push(creep);
    }

    public move(creep: Creep, target: RoomPosition | { pos: RoomPosition }) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
    }

    public runAll(): void {
        for (const creep of this.Creeps) {
            this.run(creep);
        }
    }

    protected abstract run(creep: Creep): void;

    public abstract getSpawnDesire(currentEnergy: number): number;

    public abstract spawn(spawn: StructureSpawn, name: string): boolean;
}
