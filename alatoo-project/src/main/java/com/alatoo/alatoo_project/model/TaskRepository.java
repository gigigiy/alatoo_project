package com.alatoo.alatoo_project.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    List<TaskEntity> findByDescriptionContainingIgnoreCaseOrderByCreationDateDesc(String description);
    List<TaskEntity> findAllByCreationDateBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
}
