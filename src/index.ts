class Task {
  id: number;
  title: string;
  description: string;
  assignedTo?: number;

  constructor(id: number, title: string, description: string, assignedTo?: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo;
  }

  updateTask(title: string, description: string): void {
    this.title = title;
    this.description = description;
  }

  assignTask(userId: number): void {
    this.assignedTo = userId;
  }

  unassignTask(): void {
    this.assignedTo = undefined;
  }

  getTaskInfo(): string {
    return `Task [${this.id}]: ${this.title} - ${this.description} ${
      this.assignedTo ? `Assigned to User [${this.assignedTo}]` : "Unassigned"
    }`;
  }
}

class User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;

  constructor(id: number, name: string, email: string, isActive: boolean = true) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }

  updateUser(name: string, email: string): void {
    this.name = name;
    this.email = email;
  }

  deactivate(): void {
    this.isActive = false;
  }

  activate(): void {
    this.isActive = true;
  }

  getUserInfo(): string {
    return `User [${this.id}]: ${this.name} <${this.email}> - ${
      this.isActive ? "Active" : "Inactive"
    }`;
  }
}

class TaskUserManager {
  private users: User[] = [];
  private tasks: Task[] = [];


  createUser(name: string, email: string): User {
    const newUser = new User(Date.now(), name, email);
    this.users.push(newUser);
    return newUser;
  }

  getUserById(userId: number): User | undefined {
    return this.users.find(u => u.id === userId);
  }

  getAllUsers(): User[] {
    return this.users;
    console.log(this.users)
    
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(u => u.id !== userId);
    this.tasks.forEach(t => {
      if (t.assignedTo === userId) t.unassignTask();
    });
  }

  
  createTask(title: string, description: string): Task {
    const newTask = new Task(Date.now(), title, description);
    this.tasks.push(newTask);
    return newTask;
  }

  getTaskById(taskId: number): Task | undefined {
    return this.tasks.find(t => t.id === taskId);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }

  
  assignTaskToUser(taskId: number, userId: number): boolean {
    const user = this.getUserById(userId);
    const task = this.getTaskById(taskId);

    if (!user || !user.isActive) {
      console.error(`Cannot assign: User [${userId}] does not exist or is inactive.`);
      return false;
    }

    if (!task) {
      console.error(`Cannot assign: Task [${taskId}] not found.`);
      return false;
    }

    task.assignTask(userId);
    return true;
  }

  unassignTask(taskId: number): void {
    const task = this.getTaskById(taskId);
    task?.unassignTask();
  }

  getTasksForUser(userId: number): Task[] {
    return this.tasks.filter(task => task.assignedTo === userId);
  }
}


const manager = new TaskUserManager();

// Create a user
const user1 = manager.createUser("Clyde", "clyde@example.com");

console.log(manager.getAllUsers());

// user1.deactivate();

// console.log(user1.getUserInfo());

// // Create a task
// const task1 = manager.createTask("Frontend", "Build the frontend");

// // Try to assign (will fail - user is inactive)
//  manager.assignTaskToUser(task1.id, user1.id);

// // Activate and assign again
// user1.activate();
// manager.assignTaskToUser(task1.id, user1.id);

//  console.log(task1.getTaskInfo());

// // Get tasks for user
// const userTasks = manager.getTasksForUser(user1.id);
// console.log("Tasks for Clyde:", userTasks.map(t => t.getTaskInfo()));
