package com.zyan.backend.track.entities;

import com.zyan.backend.track.dto.CommentDTO;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "track_id", nullable = false)
    private Track track;

    @ManyToOne
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    private String context;
    private LocalDateTime addedAt;

    public CommentDTO mapCommentToCommentDTO() {
        int profileId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getProfile().getId();

        return CommentDTO.builder()
                .id(getId())
                .addedAt(getAddedAt())
                .context(getContext())
                .user(getProfile().getUser().mapUserToUserSummaryDTO())
                .build();
    }
}
