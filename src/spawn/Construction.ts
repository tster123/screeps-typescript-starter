export class Construction {
    public run() {
        for (const name in Game.rooms) {
            const room = Game.rooms[name];
            for (const spawn of room.find(FIND_MY_SPAWNS)) {
                // we want some extensions
                spawn.room.createConstructionSite(
                    spawn.pos.x + Math.random() * 10 - 5,
                    spawn.pos.y + Math.random() * 10 - 5,
                    STRUCTURE_EXTENSION);
            }
        }
    }
}
