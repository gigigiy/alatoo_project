package com.alatoo.alatoo_project.api;

import com.alatoo.alatoo_project.dto.BaseResponse;
import com.alatoo.alatoo_project.dto.Task;
import com.alatoo.alatoo_project.dto.TaskDto;
import com.alatoo.alatoo_project.dto.TaskRequest;
import com.alatoo.alatoo_project.model.StudentEntity;
import com.alatoo.alatoo_project.model.StudentRepository;
import com.alatoo.alatoo_project.model.TaskEntity;
import com.alatoo.alatoo_project.model.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/task")
@Validated
@RequiredArgsConstructor
public class TaskController {
    private final TaskRepository taskRepository;
    private final StudentRepository studentRepository;

    @PostMapping
    public ResponseEntity<BaseResponse<TaskRequest>> createTask(
            @RequestBody @Valid TaskRequest request) {
        StudentEntity student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        TaskEntity taskEntity = TaskEntity.builder()
                .description(request.getDescription())
                .category(request.getCategory())
                .student(student)
                .build();
        taskRepository.save(taskEntity);
        return ResponseEntity.accepted().body(BaseResponse.<TaskRequest>builder()
                .message("Task has been created")
                .data(request)
                .build());
    }

    @GetMapping
    public ResponseEntity<TaskDto> getTask(
            @RequestParam @NotNull Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        return ResponseEntity.ok(TaskDto.builder()
                .description(task.getDescription())
                .category(task.getCategory())
                .build());
    }

    @PutMapping
    public ResponseEntity<BaseResponse> editTask(@RequestBody @Valid Task request) {
        TaskEntity task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        task.setDescription(request.getDescription());
        task.setCategory(request.getCategory());
        taskRepository.save(task);
        return ResponseEntity.accepted().body(BaseResponse.builder()
                .message("Task has been edited")
                .data(request)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTask(@RequestParam @NotNull Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        taskRepository.delete(task);
        return ResponseEntity.accepted().body("Task has been deleted");
    }

    @GetMapping("/list")
    public ResponseEntity<List<TaskDto>> findTaskByNameContaining(
            @RequestParam @NotNull String name) {
        List<TaskEntity> tasks = taskRepository.findByDescriptionContainingIgnoreCaseOrderByCreationDateDesc(name);
        List<TaskDto> taskDtos = tasks.stream().map(task -> TaskDto.builder()
                        .description(task.getDescription())
                        .category(task.getCategory())
                        .build())
                .toList();
        return ResponseEntity.ok(taskDtos);
    }

    @GetMapping("/by-date")
    public ResponseEntity<BaseResponse> findTasksByDate(
            @NotNull
            @RequestParam LocalDate startDate,
            @NotNull
            @RequestParam LocalDate endDate) {
        List<TaskEntity> tasks = taskRepository
                .findAllByCreationDateBetween(startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
        if (tasks.isEmpty()) {
            return ResponseEntity.ok(BaseResponse.builder()
                    .message("No tasks for these dates")
                    .build());
        }
        List<TaskDto> taskDtos = tasks.stream().map(task -> TaskDto.builder()
                        .description(task.getDescription())
                        .category(task.getCategory())
                        .build())
                .toList();
        return ResponseEntity.ok(BaseResponse.builder()
                        .data(taskDtos)
                .build());
    }
}
