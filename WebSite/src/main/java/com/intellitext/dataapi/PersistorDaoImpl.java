package com.intellitext.dataapi;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.intellitext.model.FileEntity;
import com.intellitext.model.User;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Repository
@Component
public class PersistorDaoImpl implements PersistorDao {

	@Autowired
	MongoTemplate mongo;

	@Autowired
	RetrieverDao retriever;
	
	@Override
	public void insertGeneric(Object object, String collection) {
		mongo.insert(object, collection);
	}

	@Override
	public void insertNewUser(User user, String collection) {
		mongo.insert(new UserFileStorageEntity(user.getFirstName() + " " + user.getLastName(), user.getEmail(), new ArrayList<FileEntity>()), "Files");
		
		mongo.insert(user, collection);
	}
	@Override
	public void insertNewFile(FileEntity file,Principal user) {
		
		/*ArrayList<UserFileStorageEntity> temp = (ArrayList<UserFileStorageEntity>) mongo.findAll(UserFileStorageEntity.class, "Files");
		UserFileStorageEntity storage = null; 
		UserFileStorageEntity original = null; 
		boolean test = false; 
		for(UserFileStorageEntity i : temp)
		{
			System.out.println(i + "stuff1");
				if(i.getEmail().equals(user.getName())) {
				System.out.println(i + "stuff2");
				storage = i; 
				original = i; 
				test = true; 
				break; 
			}
		}
		if(test) {
			System.out.println(storage + "this is storage");
			System.out.println(file + " this is the file");
		storage.addFile(file);	
		 
		}
		else 
			System.out.println("Error");*/
		updateDB(file, user); 

	}
	
	@Override
	public void updateFile(FileEntity file, User user) {
		
	}
	
	public void updateDB(FileEntity file ,Principal prince)
	{
		Update update = new Update();
		update.push("files", file);
		mongo.updateFirst(new Query(Criteria.where("email").is(prince.getName())), update, UserFileStorageEntity.class);
	}
	
	@Override
	public void deleteFile(FileEntity file, User user) {
		//move file for 30 days
	}

	@Override
	public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
		User user = retriever.getUserByEmail(arg0);
		CodeUserDetails principal = CodeUserDetails.getBuilder()
                .firstName(user.getFirstName()).lastName(user.getLastName())
                .password(user.getPassword()).role(user.getRole()).username(user.getEmail())
                .build();

        return principal;
	}
	
}