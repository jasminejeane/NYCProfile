
package com.example.demo;

//package com.okta.developer.demo;

		import lombok.*;

		import javax.persistence.Id;
		import javax.persistence.GeneratedValue;
		import javax.persistence.Entity;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
public class User {
	@Id @GeneratedValue
	private Long id;
	private @NonNull String name;
	private @NonNull String occupation;
	private @NonNull String hobby;
}
