package com.dataapi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.dataapi.dao.PersistorDao;
import com.dataapi.dao.RetrieverDao;
import com.dataapi.dao.RtfParserDao;
import com.dataapi.dao.RtfParserDaoImpl;
import com.dataapi.dao.UserEntity;


@RunWith(SpringRunner.class)
@SpringBootTest
public class DataApiApplicationTests {

	@Autowired
	PersistorDao persistor;
	@Autowired
	RetrieverDao retriever;
	
	@Test
	public void contextLoads() {
		persistor.insertGeneric(new UserEntity("Name", "Email"), "test");
	}

	@Test
	public void contextLoads2() {
		System.out.println(retriever.userExists("Name"));
	}

	@Test
	public void rtfTesting() {
		RtfParserDao rtf = new RtfParserDaoImpl();
		
	}
}