 import {processExportJob} from "./exports.worker"// export wokere 

// create queue 
const queue: string[] = [];
let draining = false;

// add job to queue
export function enqueueExport(exportId: string) {
    queue.push(exportId);
    void drain();
}

async function drain() {
    if(draining) return; 
    draining = true;

      try {
    while (queue.length > 0) {
      const exportId = queue.shift()!;
      await processExportJob(exportId);
    }
  } finally {
    draining = false;
  }
}