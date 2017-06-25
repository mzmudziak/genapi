package <%= package %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class <%= appName %> {

	public static void main(String[] args) {
		SpringApplication.run(<%= appName %>.class, args);
	}
}
