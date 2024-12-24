package com.alatoo.alatoo_project.dto;

import com.alatoo.alatoo_project.enums.TaskCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TaskDto {
    private String description;
    private TaskCategory category;
}
