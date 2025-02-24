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
