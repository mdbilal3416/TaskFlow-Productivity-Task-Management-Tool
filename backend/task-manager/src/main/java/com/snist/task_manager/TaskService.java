package com.snist.task_manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task createTask(Task task) {
        return repo.save(task);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }

    public Task updateTask(Long id, Task task) {
        Task existing = repo.findById(id).orElseThrow();
        existing.setTitle(task.getTitle());
        existing.setStatus(task.getStatus());
        existing.setPriority(task.getPriority());
        existing.setDeadline(task.getDeadline());
        return repo.save(existing);
    }
}