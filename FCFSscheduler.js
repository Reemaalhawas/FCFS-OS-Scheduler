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
