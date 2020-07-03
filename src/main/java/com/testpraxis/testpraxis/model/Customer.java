package com.testpraxis.testpraxis.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Customer {
  @Id
  @GeneratedValue
  private int id;
  private String nom;

  public Customer(int id, String nom) {
    this.id = id;
    this.nom = nom;
  }

  public Customer() {
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  @Override
  public String toString() {
    return "Customer{" +
      "id=" + id +
      ", nom='" + nom + '\'' +
      '}';
  }
}
