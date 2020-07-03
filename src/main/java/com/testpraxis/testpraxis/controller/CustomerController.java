package com.testpraxis.testpraxis.controller;

import com.testpraxis.testpraxis.dao.CustomerReporisotory;
import com.testpraxis.testpraxis.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CustomerController {

  @Autowired
  CustomerReporisotory customerReporisotory;

  @GetMapping("/Customer")
  public Iterable<Customer> getAllClient() {

    return customerReporisotory.findAll();
  }

  @GetMapping("/customerPagined")
  public ResponseEntity<Map<String, Object>> getAllCustomerPagined(
    @RequestParam(required = false) String nom,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "3") int size
  ) {

    try {
      List<Customer> customers = new ArrayList<Customer>();
      Pageable paging = PageRequest.of(page, size);

      Page<Customer> pageCust;
      if (nom == null)
        pageCust = customerReporisotory.findAll(paging);
      else
        pageCust = customerReporisotory.findByNomContaining(nom, paging);

      customers = pageCust.getContent();

      if (customers.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      Map<String, Object> response = new HashMap<>();
      response.put("customers", customers);
      response.put("currentPage", pageCust.getNumber());
      response.put("totalItems", pageCust.getTotalElements());
      response.put("totalPages", pageCust.getTotalPages());

      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
