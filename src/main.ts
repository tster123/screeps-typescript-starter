import { CreepManager } from "creep/CreepManager";
import { Construction } from "spawn/Construction";
import { ErrorMapper } from "utils/ErrorMapper";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
let lastUsedCpu = 0;
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}.  CPU: Bucket=${Game.cpu.bucket}, Limit=${Game.cpu.limit}, Lastused=${lastUsedCpu}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  new CreepManager().run();
  new Construction().run();
  lastUsedCpu = Game.cpu.getUsed();
});
