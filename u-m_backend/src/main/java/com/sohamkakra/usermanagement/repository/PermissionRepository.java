package com.sohamkakra.usermanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sohamkakra.usermanagement.model.EPermissions;
import com.sohamkakra.usermanagement.model.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
	Optional<Permission> findByName(EPermissions name);

}
