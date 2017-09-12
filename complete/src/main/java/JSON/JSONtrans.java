package JSON;

public class JSONtrans {
	
	public static String getArrayValue(int index, String input)
	{
		String result = ""; 
		String input2 = "" + input;
		for(int i = 0; i<index+1; i++)
		{ 
			if(input2.indexOf(",") == -1) 
				input2 += ", "; 
			result = input2.substring(0,input2.indexOf(","));
			input2 = input2.substring(input2.indexOf(",")+1);  
		}
		return result; 
	}
	
	public static String cleanup(String input)
	{	
		if(input.charAt(0) == '[')
			input = input.substring(1); 
		if(input.charAt(input.length()-1) == ']')
			input = input.substring(0,input.length()-1); 
		if(input.charAt(0) == '"')
			input = input.substring(1); 
		if(input.charAt(input.length()-1) == '"')
			input = input.substring(0,input.length()-1); 
		
		return input; 
	}
}
