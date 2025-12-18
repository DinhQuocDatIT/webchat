package datdq0317.edu.ut.vn.dinhquocdat.backend.repository;

import java.util.Optional;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}