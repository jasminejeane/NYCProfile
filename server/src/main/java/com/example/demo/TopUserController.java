package com.example.demo;

//package com.okta.developer.demo;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
class TopUserController {
    private UserRepository repository;

    public TopUserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/top-users")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<User> topUsers() {
        return repository.findAll().stream()
                .filter(this::isTop)
                .collect(Collectors.toList());
    }

    private boolean isTop(User user) {
        return !user.getName().equals("AMC Gremlin") &&
                !user.getName().equals("Triumph Stag") &&
                !user.getName().equals("Ford Pinto") &&
                !user.getName().equals("Yugo GV");
    }
}