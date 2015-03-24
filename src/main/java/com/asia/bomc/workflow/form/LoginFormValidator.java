package com.asia.bomc.workflow.form;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class LoginFormValidator implements Validator{


	public boolean supports(Class<?> clazz) {
		return LoginForm.class.equals(clazz);
	}


	public void validate(Object Object, Errors errors) {
		ValidationUtils.rejectIfEmpty(errors, "userName", "loginform.username.isempty");
		ValidationUtils.rejectIfEmpty(errors, "password", "loginform.password.isempty");
		ValidationUtils.rejectIfEmpty(errors, "verifyCode", "loginform.verifyCode.isempty");
	}

}
