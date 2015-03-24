package com.asia.bomc.workflow.web.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.DataBinder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.asia.bomc.workflow.form.LoginForm;
import com.asia.bomc.workflow.form.LoginFormValidator;

@Controller()
@RequestMapping("/user")
public class LoginController {
	/*private static final Logger logger = LoggerFactory
			.getLogger(LoginController.class);*/

	@InitBinder
	public void InitBinder(DataBinder binder) {
		binder.setValidator(new LoginFormValidator());
	}

	@RequestMapping(value = "/login.do", method = { RequestMethod.GET })
	public String login(LoginForm value) {
		System.out.println(LoginController.class.getClassLoader().getResource("/"));
		System.out.println("4444");
		if (SecurityUtils.getSubject().isAuthenticated()) {
			return "redirect:/index";
		}
		return "/pages/login";
	}

	@RequestMapping(value = "/login.do", method = { RequestMethod.POST })
	public ModelAndView login(@Validated LoginForm loginForm,
			BindingResult validResult) {
		ModelAndView view;
		Map<String, Object> map = new HashMap<String, Object>();
		if (validResult.hasErrors()) {
			view = new ModelAndView("redirect:/user/login.do");
		}
		UsernamePasswordToken token = new UsernamePasswordToken(
				loginForm.getUserName(), loginForm.getPassword());
		try {
			SecurityUtils.getSubject().login(token);
		} catch (AuthenticationException e) {
			e.printStackTrace();
			return new ModelAndView("/pages/login", "errorMessage", "用户名或密码错误！");
		}

		view = new ModelAndView("redirect:/index", map);
		return view;
	}
	public void ass(){
		System.out.println("aaa");
	}
	public void ass1(){
		System.out.println("aaa");
	}	
}
