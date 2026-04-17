package com.snist.task_manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping
    public List<Task> getTasks() {
        return service.getAllTasks();
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return service.createTask(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTask(id);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task task) {
        return service.updateTask(id, task);
    }
}