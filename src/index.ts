//  build a User and Task Management System using TypeScript. The core objective is to manage two entities, Users and Tasks, allowing for the creation, retrieval,
// updating, and deletion (CRUD) of both. Additionally, you must implement functionality to assign tasks to users, unassign them, and retrieve tasks assigned to specific
// users, ensuring proper management of user-task relationships. The system should be designed with scalability and maintainability in mind, allowing for future enhancements and integrations.


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

  deleteTask(): void {
    this.id = 0;
    this.title = "";
    this.description = "";
    this.assignedTo = undefined;
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

  deleteUser(): void {
    this.id = 0;
    this.name = "";
    this.email = "";
    this.isActive = false;
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




const user1 = new User(1, "John Doe", "c@gmail.com");
user1.deactivate();
console.log(user1.getUserInfo());

const task1 = new Task(101, "Fix Bug", "Fix the login bug");
task1.assignTask(user1.id);
console.log(task1.getTaskInfo());
