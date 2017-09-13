package com.intellitext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/*import com.dataapi.dao.PersistorDao;
import com.dataapi.dao.RetrieverDao;
import com.dataapi.dao.RetrieverDaoImpl;
import com.dataapi.dao.UserEntity;*/
import com.intellitext.json.JsonTrans;

@Controller
public class MainController {

//	@Autowired
	//RetrieverDao retriever;
	//@Autowired
	//PersistorDao persistor;

	@GetMapping("/")
	public String redirect(Model model) {
		return "redirect:/home";
	}

	@GetMapping("/login")
	public String getLogin(Model model) {
		return "login";
	}

	@GetMapping("/home")
	public String getHome(Model model) {
		return "home";
	}

	@RequestMapping(value = "/login/finish", method = RequestMethod.POST)
	public ResponseEntity<String> loginHandeler(@RequestBody String data) {
		System.out.println(data);
		String name = JsonTrans.cleanup(JsonTrans.getArrayValue(0, data));
		String email = JsonTrans.cleanup(JsonTrans.getArrayValue(1, data));
		System.out.println(email);
		System.out.println(name);
		/*if (!retriever.userExists(name)) {
			System.out.println("User Exists");

		} else {
			persistor.insertNewUser(new UserEntity(name, email), "Users");
		}*/
		return new ResponseEntity<String>("All good", HttpStatus.OK);
	}

}