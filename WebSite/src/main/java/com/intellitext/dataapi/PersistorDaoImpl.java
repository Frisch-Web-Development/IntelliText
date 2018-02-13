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
import com.intellitext.model.FolderEntity;
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
		List<FolderEntity> folders = new ArrayList<FolderEntity>();
		FolderEntity folder = new FolderEntity();
		folder.setColor("#ffffff");
		folder.setName("All");
		folder.setOwner(user.getEmail());
		folder.setPath("/All");
		folders.add(folder);
		mongo.insert(new UserFileStorageEntity(user.getFirstName() + " " + user.getLastName(), user.getEmail(), new ArrayList<FileEntity>(), folders), "Files");
		mongo.insert(user, collection);
	}
	@Override
	public void insertNewFile(FileEntity file, Principal user) {
		Update update = new Update();
		System.out.println(update.push("files", file));
		mongo.updateFirst(new Query(Criteria.where("email").is(user.getName())), update, "Files");
	}
	
	@Override
	public void updateFile(String file, String filePath, Principal user) {
		List<FileEntity> files = retriever.getAllFiles(user); 
		System.out.println(files.size() + " file size");
		for(FileEntity item: files)
		{
			if (item.getPath().equals(filePath))
			{
				item.setContents(file);
				break; 
			}
				
		}
		Update update = new Update();
		System.out.println(update.set("files", files));
		System.out.println(user.getName());
		System.out.println(mongo.updateFirst(new Query(Criteria.where("email").is(user.getName())), update, "Files"));
		
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

	@Override
	public void insertNewFolder(FolderEntity folder, Principal prince) {
		Update update = new Update();
		System.out.println(update.push("folders", folder));
		mongo.updateFirst(new Query(Criteria.where("email").is(prince.getName())), update, "Files");
	}
	
}