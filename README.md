# FCFS-OS-Scheduler

FCFS-OS-Scheduler is an implementation of the First-Come, First-Serve (FCFS) operating system scheduling algorithm built using Node.js. The project demonstrates how to mange processes scheduling using data structures, including a Process class, a linked list–based Queue (with ListNode), a Map to group processes by arrival time, and a sorted array for efficient time management.

## Overview

The FCFS scheduling algorithm is one of the simplest CPU scheduling algorithms where processes are dispatched according to their arrival order. In this project, the scheduler:
- Accepts process details (arrival time and burst time) via an interactive command-line interface.
- Enqueues processes into a ready queue.
- Processes the tasks in the order they arrive.
- Calculates key metrics for each process:
  - **Waiting Time**
  - **Turnaround Time**
  - **Completion Time**

This project serves as a practical demonstration of core operating system concepts and efficient data structure usage in JavaScript.

## Features

- **FCFS Scheduling Algorithm**: Executes processes strictly in the order of their arrival.
- **Custom Data Structures**:
  - **Process Class**: Encapsulates process attributes like PID, arrival time, burst time, waiting time, turnaround time, and completion time.
  - **Linked List & Queue**: Uses a custom Queue implemented with a linked list (via the ListNode class) for managing the ready queue.
  - **Map and Sorted Array**: Groups processes by arrival time and maintains a sorted array for quick lookup.
- **Interactive CLI**: Built with Node.js’s built-in `readline` module, allowing users to input process information and view scheduling results directly in the terminal.

## Installation

### Requirements
- [Node.js](https://nodejs.org/) (v10 or later )

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Reemaalhawas/FCFS-OS-Scheduler.git
   cd FCFS-OS-Scheduler
