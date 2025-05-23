var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// User Class
var User = /** @class */ (function () {
    function User(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    User.prototype.updateUser = function (name, email) {
        this.name = name;
        this.email = email;
    };
    User.prototype.getUserInfo = function () {
        return "User [".concat(this.id, "]: ").concat(this.name, " (").concat(this.email, ")");
    };
    return User;
}());
// Task Class
var Task = /** @class */ (function () {
    function Task(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignedUserId = null;
    }
    Task.prototype.updateTask = function (title, description) {
        this.title = title;
        this.description = description;
    };
    Task.prototype.assignUser = function (userId) {
        this.assignedUserId = userId;
    };
    Task.prototype.unassignUser = function () {
        this.assignedUserId = null;
    };
    Task.prototype.getTaskInfo = function () {
        var assignment = this.assignedUserId
            ? "Assigned to User [".concat(this.assignedUserId, "]")
            : 'Unassigned';
        return "Task [".concat(this.id, "]: ").concat(this.title, " - ").concat(this.description, " | ").concat(assignment);
    };
    return Task;
}());
// TaskUserManager Class
var TaskUserManager = /** @class */ (function () {
    function TaskUserManager() {
        this.users = [];
        this.tasks = [];
        this.nextUserId = 1;
        this.nextTaskId = 1;
    }
    TaskUserManager.prototype.createUser = function (name, email) {
        var user = new User(this.nextUserId++, name, email);
        this.users.push(user);
        return user;
    };
    TaskUserManager.prototype.createTask = function (title, description) {
        var task = new Task(this.nextTaskId++, title, description);
        this.tasks.push(task);
        return task;
    };
    TaskUserManager.prototype.deleteUser = function (userId) {
        this.users = this.users.filter(function (user) { return user.id !== userId; });
        this.tasks.forEach(function (task) {
            if (task.assignedUserId === userId) {
                task.unassignUser();
            }
        });
    };
    TaskUserManager.prototype.deleteTask = function (taskId) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== taskId; });
    };
    TaskUserManager.prototype.getUserById = function (userId) {
        return this.users.find(function (user) { return user.id === userId; });
    };
    TaskUserManager.prototype.getTaskById = function (taskId) {
        return this.tasks.find(function (task) { return task.id === taskId; });
    };
    TaskUserManager.prototype.assignTaskToUser = function (taskId, userId) {
        var task = this.getTaskById(taskId);
        var user = this.getUserById(userId);
        if (task && user) {
            task.assignUser(userId);
            return true;
        }
        return false;
    };
    TaskUserManager.prototype.getAllUsers = function () {
        return __spreadArray([], this.users, true);
    };
    TaskUserManager.prototype.getAllTasks = function () {
        return __spreadArray([], this.tasks, true);
    };
    return TaskUserManager;
}());
var manager = new TaskUserManager();
// DOM Elements
var userList = document.querySelector(".users-list");
var taskList = document.querySelector(".tasks-list");
var userForm = document.getElementById("userForm");
var taskForm = document.getElementById("taskForm");
function createButton(text, className, onClick) {
    var btn = document.createElement("button");
    btn.textContent = text;
    btn.className = className;
    btn.onclick = onClick;
    return btn;
}
function renderUsers() {
    userList.innerHTML = '';
    manager.getAllUsers().forEach(function (user) {
        var li = document.createElement("li");
        var userInfo = document.createElement("span");
        userInfo.textContent = user.getUserInfo();
        li.appendChild(userInfo);
        li.append(createButton("Update", "btn-update", function () {
            var newName = prompt("New name:", user.name);
            var newEmail = prompt("New email:", user.email);
            if (newName && newEmail) {
                user.updateUser(newName, newEmail);
                renderUsers();
                renderTasks();
            }
        }), createButton("Delete", "btn-delete", function () {
            if (confirm("Delete user ".concat(user.name, "?"))) {
                manager.deleteUser(user.id);
                renderUsers();
                renderTasks();
            }
        }), createButton("Assign Task", "btn-assign", function () {
            var taskIdStr = prompt("Enter Task ID to assign:");
            var taskId = Number(taskIdStr);
            if (!isNaN(taskId) && manager.assignTaskToUser(taskId, user.id)) {
                renderTasks();
                alert("Task assigned successfully!");
            }
            else {
                alert("Invalid Task ID or assignment failed.");
            }
        }));
        userList.appendChild(li);
    });
}
function renderTasks() {
    taskList.innerHTML = '';
    manager.getAllTasks().forEach(function (task) {
        var li = document.createElement("li");
        var taskInfo = document.createElement("span");
        taskInfo.textContent = task.getTaskInfo();
        taskInfo.className = task.assignedUserId ? "task-assigned" : "task-unassigned";
        li.appendChild(taskInfo);
        li.append(createButton("Update", "btn-update", function () {
            var newTitle = prompt("New title:", task.title);
            var newDesc = prompt("New description:", task.description);
            if (newTitle && newDesc) {
                task.updateTask(newTitle, newDesc);
                renderTasks();
            }
        }), createButton("Delete", "btn-delete", function () {
            if (confirm("Delete task \"".concat(task.title, "\"?"))) {
                manager.deleteTask(task.id);
                renderTasks();
            }
        }), createButton("Assign User", "btn-assign", function () {
            var userIdStr = prompt("Enter User ID to assign:");
            var userId = Number(userIdStr);
            if (!isNaN(userId) && manager.assignTaskToUser(task.id, userId)) {
                renderTasks();
                alert("User assigned successfully!");
            }
            else {
                alert("Invalid User ID or assignment failed.");
            }
        }));
        taskList.appendChild(li);
    });
}
// Event Listeners
userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("userName").value.trim();
    var email = document.getElementById("userEmail").value.trim();
    if (name && email) {
        manager.createUser(name, email);
        renderUsers();
        userForm.reset();
    }
});
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = document.getElementById("taskTitle").value.trim();
    var desc = document.getElementById("taskDesc").value.trim();
    if (title && desc) {
        manager.createTask(title, desc);
        renderTasks();
        taskForm.reset();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    renderUsers();
    renderTasks();
});
