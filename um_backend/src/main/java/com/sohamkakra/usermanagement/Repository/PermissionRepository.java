package com.sohamkakra.usermanagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sohamkakra.usermanagement.Model.Permissions;

@Repository
public interface PermissionRepository extends JpaRepository<Permissions, Long>{

}
