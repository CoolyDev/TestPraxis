package com.testpraxis.testpraxis.dao;

import com.testpraxis.testpraxis.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface CustomerReporisotory extends JpaRepository<Customer,Integer> {
  Customer findAllById(int id);
  Page<Customer> findByNomContaining(String nom, Pageable pageable);
}
