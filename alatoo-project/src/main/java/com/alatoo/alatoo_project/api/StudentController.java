package com.alatoo.alatoo_project.api;

import com.alatoo.alatoo_project.dto.*;
import com.alatoo.alatoo_project.model.StudentEntity;
import com.alatoo.alatoo_project.model.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/student")
@Validated
public class StudentController {
    private final StudentRepository repository;

    @PostMapping
    public ResponseEntity<BaseResponse<StudentDto>> createStudent(
            @RequestBody @Valid StudentDto request) {
        StudentEntity entity = StudentEntity.builder()
                .fullName(request.getFullName())
                .grade(request.getGrade())
                .build();
        repository.save(entity);
        return ResponseEntity.accepted().body(BaseResponse.<StudentDto>builder()
                .message("Student successfully created.")
                .data(request)
                .build());
    }

    @GetMapping
    public ResponseEntity<StudentResponse> findStudent(@RequestParam @NotNull Long id) {
        StudentEntity student = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        List<TaskDto> taskDtos = student.getTasks().stream()
                .map(task -> TaskDto.builder()
                        .description(task.getDescription())
                        .category(task.getCategory())
                        .build())
                .toList();
        return ResponseEntity.ok(StudentResponse.builder()
                .fullName(student.getFullName())
                .grade(student.getGrade())
                .tasks(taskDtos)
                .build());
    }
    @PutMapping
    public ResponseEntity<BaseResponse<StudentRequest>> editStudent(@RequestBody @Valid StudentRequest request) {
        StudentEntity student = repository.findById(request.getId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        student.setFullName(request.getFullName());
        student.setGrade(request.getGrade());
        repository.save(student);
        return ResponseEntity.accepted().body(BaseResponse.<StudentRequest>builder()
                .message("Student has been updated")
                .data(request)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse<String>> deleteById(@RequestParam @NotNull Long id) {
        StudentEntity student = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        repository.delete(student);
        return ResponseEntity.accepted().body(BaseResponse.<String>builder()
                .message("Student has been deleted")
                .build());
    }
}
