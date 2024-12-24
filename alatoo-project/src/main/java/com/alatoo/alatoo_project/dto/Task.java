package com.alatoo.alatoo_project.dto;

import com.alatoo.alatoo_project.enums.TaskCategory;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Task {
    @NotNull
    private Long id;
    @NotNull
    private String description;
    @NotNull
    private TaskCategory category;
}
