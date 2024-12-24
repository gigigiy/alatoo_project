package com.alatoo.alatoo_project.dto;

import com.alatoo.alatoo_project.model.TaskEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class StudentResponse {
    private String fullName;
    private Integer grade;
    private List<TaskDto> tasks;
}
