package com.dataapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.dataapi.dao.PersistorDao;
import com.dataapi.dao.PersistorDaoImpl;
import com.dataapi.dao.UserEntity;

@SpringBootApplication
public class DataApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(DataApiApplication.class, args);
	}
}
