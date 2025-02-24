const readline = require('readline');
class Process {
  constructor(pid, arrivalTime, burstTime) {
    this.pid = pid;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.waitingTime = 0;
    this.completionTime = 0;
    this.turnaroundTime = 0;
  }
}
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  dequeue() {
    if (!this.head) return null;
    const removed = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return removed.value;
  }
  isEmpty() {
    return this.length === 0;
  }
}
class ProcessManager {
  constructor(processes) {
    this.processes = processes;
    this.readyQueue = new Queue();
    this.arrivalMap = new Map();
    for (let proc of processes) {
      if (!this.arrivalMap.has(proc.arrivalTime)) {
        this.arrivalMap.set(proc.arrivalTime, []);
      }
      this.arrivalMap.get(proc.arrivalTime).push(proc);
    }
    this.sortedArrivalTimes = Array.from(this.arrivalMap.keys()).sort((a, b) => a - b);
  }
  simulate() {
    let currentTime = 0;
    let scheduledProcesses = [];
    while (scheduledProcesses.length < this.processes.length) {
      if (this.arrivalMap.has(currentTime)) {
        let arriving = this.arrivalMap.get(currentTime);
        for (let proc of arriving) {
          this.readyQueue.enqueue(proc);
        }
      }
      if (this.readyQueue.isEmpty()) {
        let nextArrival = this.sortedArrivalTimes.find(time => time > currentTime);
        if (nextArrival !== undefined) {
          currentTime = nextArrival;
          let arriving = this.arrivalMap.get(currentTime);
          for (let proc of arriving) {
            this.readyQueue.enqueue(proc);
          }
        }
      }
      let proc = this.readyQueue.dequeue();
      if (proc) {
        proc.waitingTime = currentTime - proc.arrivalTime;
        currentTime += proc.burstTime;
        proc.completionTime = currentTime;
        proc.turnaroundTime = proc.completionTime - proc.arrivalTime;
        scheduledProcesses.push(proc);
      }
    }
    return scheduledProcesses;
  }
}
function askQuestion(query, rl) {
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}



(async function() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const numProcesses = parseInt(await askQuestion("Enter the number of processes: ", rl), 10);
  let processes = [];
  for (let i = 0; i < numProcesses; i++) {
    const arrival = parseInt(await askQuestion(`Enter arrival time for process ${i + 1}: `, rl), 10);
    const burst = parseInt(await askQuestion(`Enter burst time for process ${i + 1}: `, rl), 10);
    processes.push(new Process(i + 1, arrival, burst));
  }
  const manager = new ProcessManager(processes);
  const scheduled = manager.simulate();
  console.log("\nScheduling Results:");
  console.log("PID\tArrival\tBurst\tWaiting\tTurnaround\tCompletion");
  scheduled.forEach(proc => {
    console.log(`${proc.pid}\t${proc.arrivalTime}\t${proc.burstTime}\t${proc.waitingTime}\t${proc.turnaroundTime}\t\t${proc.completionTime}`);
  });
  rl.close();
})();
