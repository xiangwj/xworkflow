package com.asia.bomc.workflow.web.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.asia.bomc.workflow.form.LoginForm;

@Controller()
@RequestMapping("/test")
public class testController {
	@RequestMapping(value = "/login.do", method = { RequestMethod.GET })
	public String login(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "/pages/test/main";
	}
	@RequestMapping(value = "/logout.do", method = { RequestMethod.GET })
	public String login(HttpServletRequest req) {
		try {
			Thread.sleep(50);
			req.getSession().invalidate();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/logon";
	}
	
	@RequestMapping(value = "/list.do", method = { RequestMethod.GET })
	public String list(HttpServletRequest req) {
		try {
			Thread.sleep(150);
			req.getSession().invalidate();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/list";
	}	
	@RequestMapping(value = "/open.do", method = { RequestMethod.GET })
	public String open(HttpServletRequest req) {
		try {
			Thread.sleep(150);
			req.getSession().invalidate();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/open";
	}	
	@RequestMapping(value = "/commit.do", method = { RequestMethod.GET })
	public String commit(HttpServletRequest req) {
		try {
			Thread.sleep(200);
			req.getSession().invalidate();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/main";
	}		
	

	
	@RequestMapping(value = "/roleedit.do", method = { RequestMethod.GET })
	public String roleedit(LoginForm value) {
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

				
		return "/pages/test/go";
	
	}
	@RequestMapping(value = "/permissionedit.do", method = { RequestMethod.GET })
	public String permissionedit(LoginForm value) {
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/rolepermission.do", method = { RequestMethod.GET })
	public String rolepermission(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/userrole.do", method = { RequestMethod.GET })
	public String userrole(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/flow1_submit.do", method = { RequestMethod.GET })
	public String flow1_submit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/flow1_audit.do", method = { RequestMethod.GET })
	public String flow1_audit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}

	@RequestMapping(value = "/flow2_submit.do", method = { RequestMethod.GET })
	public String flow2_submit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/flow2_audit.do", method = { RequestMethod.GET })
	public String flow2_audit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	
	@RequestMapping(value = "/flow3_submit.do", method = { RequestMethod.GET })
	public String flow3_submit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/flow3_audit.do", method = { RequestMethod.GET })
	public String flow3_audit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	
	@RequestMapping(value = "/flow4_submit.do", method = { RequestMethod.GET })
	public String flow4_submit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/flow4_audit.do", method = { RequestMethod.GET })
	public String flow4_audit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	
	@RequestMapping(value = "/flow5_submit.do", method = { RequestMethod.GET })
	public String flow5_submit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/flow5_audit.do", method = { RequestMethod.GET })
	public String flow5_audit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	
	@RequestMapping(value = "/flow6_submit.do", method = { RequestMethod.GET })
	public String flow6_submit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/flow6_audit.do", method = { RequestMethod.GET })
	public String flow6_audit(LoginForm value) {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/go";
	}
	@RequestMapping(value = "/backmain.do", method = { RequestMethod.GET })
	public String backmain(LoginForm value) {
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/pages/test/main";
	}	
}
