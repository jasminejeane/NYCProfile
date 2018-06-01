package com.example.usersapi;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
public class User {
    @Id @GeneratedValue
    private Long id;
    private @NonNull String name;
}