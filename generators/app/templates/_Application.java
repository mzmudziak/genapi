package <%= package %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class <%= appName %>Application {

	public static void main(String[] args) {
		SpringApplication.run(<%= appName %>Application.class, args);
	}
}
