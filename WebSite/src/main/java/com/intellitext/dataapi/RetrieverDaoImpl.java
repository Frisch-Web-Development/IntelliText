package com.intellitext.dataapi;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.intellitext.model.FileEntity;
import com.intellitext.model.Role;
import com.intellitext.model.User;

@Repository
@Component
public class RetrieverDaoImpl implements RetrieverDao {

	@Autowired
	MongoTemplate mongo;

	@Override
	public User getUserByName(String name) {
		return (User) mongo.findOne(new Query(Criteria.where("userName").is(name)), User.class);
	}
	
	@Override
	public User getUserByEmail(String email) {
		ArrayList<User> temp = (ArrayList<User>) mongo.findAll(User.class, "Users");
		for(User user : temp) {
			if(user.getEmail().equals(email)) {
				return user;
			}
		}
		return null;
	}
	
	@Override
	public boolean userExists(String name) {
		return (User) mongo.findOne(new Query(Criteria.where("userName").is(name)), User.class) == null;
	}
	@Override
	public List<FileEntity> getAllFiles(Principal user) {
		ArrayList<UserFileStorageEntity> temp = (ArrayList<UserFileStorageEntity>) mongo.findAll(UserFileStorageEntity.class, "Files");
		UserFileStorageEntity tempStorage = new UserFileStorageEntity(null, null, null);
		// TODO add precautions here
		for(UserFileStorageEntity userFileStorageEntity : temp) {
			System.out.println(user.getName());
			if(userFileStorageEntity.getEmail().equals(user.getName())) {
				tempStorage = userFileStorageEntity;
			}
		}
		return tempStorage.getFiles();
	}
	@Override
	public FileEntity getFile(FileEntity file, Principal user) {
		
		UserFileStorageEntity storage = mongo.findOne(
				new Query(Criteria.where("email").is(user.getName())
						.orOperator(Criteria.where("name").is(user.getName()))),
				UserFileStorageEntity.class, "Files");
		return storage.getFile(file.getStoragePath());
	}

	@Override
	public List<User> getAllUsers() {
		
		return mongo.findAll(User.class, "Users");
	}

	@Override
	public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
		User user = getUserByEmail(arg0);
		CodeUserDetails principal = CodeUserDetails.getBuilder()
                .firstName(user.getFirstName()).lastName(user.getLastName())
                .password(user.getPassword()).role(Role.ROLE_USER).username(user.getEmail())
                .build();

        return principal;
	}

}
