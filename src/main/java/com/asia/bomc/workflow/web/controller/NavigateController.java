package com.asia.bomc.workflow.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asia.bomc.workflow.entity.ConfigItem;
import com.asia.bomc.workflow.utils.Constants;
import com.asia.bomc.workflow.utils.DateTimeUtil;

@Controller
@RequestMapping("/navigate")
public class NavigateController {
	@RequestMapping(value = "/getNavigeTree.do", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody	
	public List<Map<String, Object>> getNavigeTree(){
		List<Map<String,Object>> lst = new ArrayList<Map<String,Object>>();
			
		
		Map<String,Object> workflowOp = new HashMap<String,Object>();
		workflowOp = new HashMap<String,Object>();
		workflowOp.put("id", "1");
		workflowOp.put("iconCls", "workflow-icon");
		workflowOp.put("text", "流程操作");
		workflowOp.put("leaf", false);
		List<Map<String,Object>> workflowOpChildren = new ArrayList<Map<String,Object>>();
		workflowOp.put("children", workflowOpChildren);
		lst.add(workflowOp);
		
		Map<String,Object> myflow = new HashMap<String,Object>();
		myflow.put("id", "1-9");
		myflow.put("iconCls", "waitdo-icon");
		myflow.put("text", "我的待处理");
		myflow.put("leaf", true);
		workflowOpChildren.add(myflow);		
		
		Map<String,Object> monitorflow = new HashMap<String,Object>();
		monitorflow.put("id", "1-0");
		monitorflow.put("iconCls", "monitor-icon");
		monitorflow.put("text", "监控告警类流程");
		monitorflow.put("leaf", false);
		List<Map<String,Object>> monitorflowChildren = new ArrayList<Map<String,Object>>();
		monitorflow.put("children", monitorflowChildren);		
		workflowOpChildren.add(monitorflow);
		
		Map<String,Object> maintainflow = new HashMap<String,Object>();
		maintainflow.put("id", "1-1");
		maintainflow.put("iconCls", "maintain-icon");
		maintainflow.put("text", "维护管理类流程");
		maintainflow.put("leaf", false);
		List<Map<String,Object>> mainflowChildren = new ArrayList<Map<String,Object>>();
		maintainflow.put("children", mainflowChildren);		
		workflowOpChildren.add(maintainflow);
		
		Map<String,Object> otherflow = new HashMap<String,Object>();
		otherflow.put("id", "1-2");
		otherflow.put("iconCls", "other-icon");
		otherflow.put("text", "其他流程");
		otherflow.put("leaf", false);
		List<Map<String,Object>> otherflowChildren = new ArrayList<Map<String,Object>>();
		otherflow.put("children", otherflowChildren);		
		workflowOpChildren.add(otherflow);	
		
		
		Map<String,Object> configOp = new HashMap<String,Object>();
		configOp = new HashMap<String,Object>();
		configOp.put("id", "2");
		configOp.put("iconCls", "option-icon");
		configOp.put("text", "配置管理");
		configOp.put("leaf", false);
		List<Map<String,Object>> configOpChildren = new ArrayList<Map<String,Object>>();
		configOp.put("children", configOpChildren);				
		lst.add(configOp);
		
		Map<String,Object> basedata = new HashMap<String,Object>();
		basedata.put("id", "2-0");
		basedata.put("iconCls", "base-icon");
		basedata.put("text", "基础数据配置");
		basedata.put("leaf", true);
		configOpChildren.add(basedata);		

		Map<String,Object> workgroup = new HashMap<String,Object>();
		workgroup.put("id", "2-1");
		workgroup.put("iconCls", "group-icon");
		workgroup.put("text", "工作组配置");
		workgroup.put("leaf", true);
		configOpChildren.add(workgroup);			
			
		Map<String,Object> flowop = new HashMap<String,Object>();
		flowop.put("id", "2-2");
		flowop.put("iconCls", "flowop-icon");
		flowop.put("text", "流程配置");
		flowop.put("leaf", true);
		configOpChildren.add(flowop);
		
		Map<String,Object> flowmgop = new HashMap<String,Object>();
		flowmgop.put("id", "2-2");
		flowmgop.put("iconCls", "flowmg-icon");
		flowmgop.put("text", "流程实例管理");
		flowmgop.put("leaf", true);
		configOpChildren.add(flowmgop);
		
	
		Map<String,Object> buisflow = new HashMap<String,Object>();
		buisflow.put("id", "1-0-0");
		buisflow.put("iconCls", "flow-icon");
		buisflow.put("text", "业务运营监控处理流程");
		buisflow.put("leaf", false);
		List<Map<String,Object>> buisflowChildren = new ArrayList<Map<String,Object>>();
		buisflow.put("children", buisflowChildren);
		monitorflowChildren.add(buisflow);
	
		Map<String,Object> buisflowsearch = new HashMap<String,Object>();
		buisflowsearch.put("id", "1-0-0-0");
		buisflowsearch.put("iconCls", "search-icon");
		buisflowsearch.put("text", "查询");
		buisflowsearch.put("leaf", true);
		buisflowChildren.add(buisflowsearch);
		
		Map<String,Object> buisflowwaitdo = new HashMap<String,Object>();
		buisflowwaitdo.put("id", "1-0-0-1");
		buisflowwaitdo.put("iconCls", "waitdo-icon");
		buisflowwaitdo.put("text", "待办");
		buisflowwaitdo.put("leaf", true);
		buisflowChildren.add(buisflowwaitdo);

		Map<String,Object> buisflownew = new HashMap<String,Object>();
		buisflownew.put("id", "1-0-0-2");
		buisflownew.put("iconCls", "add-icon");
		buisflownew.put("text", "新建");
		buisflownew.put("leaf", true);
		buisflowChildren.add(buisflownew);	
		

		Map<String,Object> appflow = new HashMap<String,Object>();
		appflow.put("id", "1-0-1");
		appflow.put("iconCls", "flow-icon");
		appflow.put("text", "应用监控告警处理流程");
		appflow.put("leaf", false);
		List<Map<String,Object>> appflowChildren = new ArrayList<Map<String,Object>>();
		appflow.put("children", appflowChildren);
		monitorflowChildren.add(appflow);
	
		Map<String,Object> appsearch = new HashMap<String,Object>();
		appsearch.put("id", "1-0-1-0");
		appsearch.put("iconCls", "search-icon");
		appsearch.put("text", "查询");
		appsearch.put("leaf", true);
		appflowChildren.add(appsearch);
		
		Map<String,Object> appflowwaitdo = new HashMap<String,Object>();
		appflowwaitdo.put("id", "1-0-1-1");
		appflowwaitdo.put("iconCls", "waitdo-icon");
		appflowwaitdo.put("text", "待办");
		appflowwaitdo.put("leaf", true);
		appflowChildren.add(appflowwaitdo);

		Map<String,Object> appflownew = new HashMap<String,Object>();
		appflownew.put("id", "1-0-1-2");
		appflownew.put("iconCls", "add-icon");
		appflownew.put("text", "新建");
		appflownew.put("leaf", true);
		appflowChildren.add(appflownew);
		

		Map<String,Object> resourceflow = new HashMap<String,Object>();
		resourceflow.put("id", "1-0-2");
		resourceflow.put("iconCls", "flow-icon");
		resourceflow.put("text", "资源设备监控告警处理流程");
		resourceflow.put("leaf", false);
		List<Map<String,Object>> resourceflowChildren = new ArrayList<Map<String,Object>>();
		resourceflow.put("children", resourceflowChildren);
		monitorflowChildren.add(resourceflow);
	
		Map<String,Object> resourcesearch = new HashMap<String,Object>();
		resourcesearch.put("id", "1-0-2-0");
		resourcesearch.put("iconCls", "search-icon");
		resourcesearch.put("text", "查询");
		resourcesearch.put("leaf", true);
		resourceflowChildren.add(resourcesearch);
		
		Map<String,Object> resourcewaitdo = new HashMap<String,Object>();
		resourcewaitdo.put("id", "1-0-2-1");
		resourcewaitdo.put("iconCls", "waitdo-icon");
		resourcewaitdo.put("text", "待办");
		resourcewaitdo.put("leaf", true);
		resourceflowChildren.add(resourcewaitdo);

		Map<String,Object> resourcflownew = new HashMap<String,Object>();
		resourcflownew.put("id", "1-0-2-2");
		resourcflownew.put("iconCls", "add-icon");
		resourcflownew.put("text", "新建");
		resourcflownew.put("leaf", true);
		resourceflowChildren.add(appflownew);
		
//
		Map<String,Object> dataflow = new HashMap<String,Object>();
		dataflow.put("id", "1-1-0");
		dataflow.put("iconCls", "flow-icon");
		dataflow.put("text", "数据库及主机操作流程");
		dataflow.put("leaf", false);
		List<Map<String,Object>> dataflowChildren = new ArrayList<Map<String,Object>>();
		dataflow.put("children", dataflowChildren);
		mainflowChildren.add(dataflow);
	
		Map<String,Object> dataflowsearch = new HashMap<String,Object>();
		dataflowsearch.put("id", "1-1-0-0");
		dataflowsearch.put("iconCls", "search-icon");
		dataflowsearch.put("text", "查询");
		dataflowsearch.put("leaf", true);
		dataflowChildren.add(dataflowsearch);
		
		Map<String,Object> dataflowwaitdo = new HashMap<String,Object>();
		dataflowwaitdo.put("id", "1-1-0-1");
		dataflowwaitdo.put("iconCls", "waitdo-icon");
		dataflowwaitdo.put("text", "待办");
		dataflowwaitdo.put("leaf", true);
		dataflowChildren.add(resourcewaitdo);

		Map<String,Object> dataflownew = new HashMap<String,Object>();
		dataflownew.put("id", "1-1-0-2");
		dataflownew.put("iconCls", "add-icon");
		dataflownew.put("text", "新建");
		dataflownew.put("leaf", true);
		dataflowChildren.add(dataflownew);	
		
//
		Map<String,Object> workbillflow = new HashMap<String,Object>();
		workbillflow.put("id", "1-1-1");
		workbillflow.put("iconCls", "flow-icon");
		workbillflow.put("text", "工单管理流程");
		workbillflow.put("leaf", false);
		List<Map<String,Object>> workbillflowChildren = new ArrayList<Map<String,Object>>();
		workbillflow.put("children", workbillflowChildren);
		mainflowChildren.add(workbillflow);
	
		Map<String,Object> workbillflowsearch = new HashMap<String,Object>();
		workbillflowsearch.put("id", "1-1-1-0");
		workbillflowsearch.put("iconCls", "search-icon");
		workbillflowsearch.put("text", "查询");
		workbillflowsearch.put("leaf", true);
		workbillflowChildren.add(workbillflowsearch);
		
		Map<String,Object> workbillflowwaitdo = new HashMap<String,Object>();
		workbillflowwaitdo.put("id", "1-1-1-1");
		workbillflowwaitdo.put("iconCls", "waitdo-icon");
		workbillflowwaitdo.put("text", "待办");
		workbillflowwaitdo.put("leaf", true);
		workbillflowChildren.add(workbillflowwaitdo);

		Map<String,Object> workbillflownew = new HashMap<String,Object>();
		workbillflownew.put("id", "1-1-1-2");
		workbillflownew.put("iconCls", "add-icon");
		workbillflownew.put("text", "新建");
		workbillflownew.put("leaf", true);
		workbillflowChildren.add(workbillflownew);			
//	
		Map<String,Object> deployflow = new HashMap<String,Object>();
		deployflow.put("id", "1-1-2");
		deployflow.put("iconCls", "flow-icon");
		deployflow.put("text", "发布管理流程");
		deployflow.put("leaf", false);
		List<Map<String,Object>> deployflowChildren = new ArrayList<Map<String,Object>>();
		deployflow.put("children", deployflowChildren);
		mainflowChildren.add(deployflow);
	
		Map<String,Object> deployflowsearch = new HashMap<String,Object>();
		deployflowsearch.put("id", "1-1-2-0");
		deployflowsearch.put("iconCls", "search-icon");
		deployflowsearch.put("text", "查询");
		deployflowsearch.put("leaf", true);
		deployflowChildren.add(deployflowsearch);
		
		Map<String,Object> deployflowwaitdo = new HashMap<String,Object>();
		deployflowwaitdo.put("id", "1-1-2-1");
		deployflowwaitdo.put("iconCls", "waitdo-icon");
		deployflowwaitdo.put("text", "待办");
		deployflowwaitdo.put("leaf", true);
		deployflowChildren.add(deployflowwaitdo);

		Map<String,Object> deployflownew = new HashMap<String,Object>();
		deployflownew.put("id", "1-1-2-2");
		deployflownew.put("iconCls", "add-icon");
		deployflownew.put("text", "新建");
		deployflownew.put("leaf", true);
		deployflowChildren.add(deployflownew);	
		
//		
		Map<String,Object> rcflow = new HashMap<String,Object>();
		rcflow.put("id", "1-2-0");
		rcflow.put("iconCls", "flow-icon");
		rcflow.put("text", "日常任务流程");
		rcflow.put("leaf", false);
		List<Map<String,Object>> rcflowChildren = new ArrayList<Map<String,Object>>();
		rcflow.put("children", rcflowChildren);
		otherflowChildren.add(rcflow);
	
		Map<String,Object> rcflowsearch = new HashMap<String,Object>();
		rcflowsearch.put("id", "1-2-0-0");
		rcflowsearch.put("iconCls", "search-icon");
		rcflowsearch.put("text", "查询");
		rcflowsearch.put("leaf", true);
		rcflowChildren.add(rcflowsearch);
		
		Map<String,Object> rcflowwaitdo = new HashMap<String,Object>();
		rcflowwaitdo.put("id", "1-2-0-1");
		rcflowwaitdo.put("iconCls", "waitdo-icon");
		rcflowwaitdo.put("text", "待办");
		rcflowwaitdo.put("leaf", true);
		rcflowChildren.add(rcflowwaitdo);

		Map<String,Object> rcflownew = new HashMap<String,Object>();
		rcflownew.put("id", "1-2-0-2");
		rcflownew.put("iconCls", "add-icon");
		rcflownew.put("text", "新建");
		rcflownew.put("leaf", true);
		rcflowChildren.add(rcflownew);	
		
//
		Map<String,Object> rpflow = new HashMap<String,Object>();
		rpflow.put("id", "1-2-1");
		rpflow.put("iconCls", "flow-icon");
		rpflow.put("text", "重批重累流程");
		rpflow.put("leaf", false);
		List<Map<String,Object>> rpflowChildren = new ArrayList<Map<String,Object>>();
		rpflow.put("children", rpflowChildren);
		otherflowChildren.add(rpflow);
	
		Map<String,Object> rpflowsearch = new HashMap<String,Object>();
		rpflowsearch.put("id", "1-2-1-0");
		rpflowsearch.put("iconCls", "search-icon");
		rpflowsearch.put("text", "查询");
		rpflowsearch.put("leaf", true);
		rpflowChildren.add(rpflowsearch);
		
		Map<String,Object> rpflowwaitdo = new HashMap<String,Object>();
		rpflowwaitdo.put("id", "1-2-1-1");
		rpflowwaitdo.put("iconCls", "waitdo-icon");
		rpflowwaitdo.put("text", "待办");
		rpflowwaitdo.put("leaf", true);
		rpflowChildren.add(rpflowwaitdo);

		Map<String,Object> rpflownew = new HashMap<String,Object>();
		rpflownew.put("id", "1-2-1-2");
		rpflownew.put("iconCls", "add-icon");
		rpflownew.put("text", "新建");
		rpflownew.put("leaf", true);
		rpflowChildren.add(rpflownew);			
		return lst;
	}
	@RequestMapping(value="/getNavigeList.do")
	@ResponseBody
	public Map<String, Object> getNavigeList(
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit
			){
		String[][] items = new String[][]
				{
					{"data_handle_0060705","数据库及主机操作流程","11-20客服星级改造上线后测试号码修改星级","待审批","2014-11-19 18:00:00","2014-11-19 19:00:00","项文俊","2014-11-19 17:27:31"},
					{"data_handle_0060709","数据库及主机操作流程","2号转资金验证","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","孙一凯","2014-11-19 15:31:10"},
					{"data_handle_0060710","数据库及主机操作流程","营业日报稽核","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","葛文端","2014-11-19 15:31:10"},
					{"data_handle_0060713","数据库及主机操作流程","新逸文件传输","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","葛文端","2014-11-19 15:31:10"},
					{"data_handle_0060715","数据库及主机操作流程","C0酬金出帐","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","任怡健","2014-11-19 15:31:10"},
					{"data_handle_0060716","数据库及主机操作流程","南方营业厅修改库存","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","孙一凯","2014-11-19 15:31:10"},
					{"data_handle_0060717","数据库及主机操作流程","营业稽核","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","李德禄","2014-11-19 15:31:10"},
					{"data_handle_0060718","数据库及主机操作流程","数据处理2010[00203]","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","彭刚锐","2014-11-19 15:31:10"},
					{"data_handle_0060719","数据库及主机操作流程","事件单143470","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","王少亚","2014-11-19 15:31:10"},
					{"data_handle_0060720","数据库及主机操作流程","新逸文件稽核","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","严俊","2014-11-19 15:31:10"},
					{"data_handle_0060721","数据库及主机操作流程","取消免催标识","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","任申骏","2014-11-19 15:31:10"},
					{"data_handle_0060722","数据库及主机操作流程","问题单2045","待审批","2014-11-19 19:00:00","2014-11-19 20:00:00","孙一凯","2014-11-19 15:31:10"}
				};
		
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String,Object>> records = new ArrayList<Map<String,Object>>();
		long count = items.length;
		for(String[] item:items){
			Map<String,Object> row = new HashMap<String,Object>();
			row.put("srId", item[0]);
			row.put("srType", item[1]);
			row.put("title", item[2]);
			row.put("status", item[3]);
			row.put("expStart", item[4]);
			row.put("expComplete", item[5]);
			row.put("apply", item[6]);
			row.put("applytime", item[7]);
			records.add(row);
		}
		result.put(Constants.TOTAL_COUNT, count);
		result.put(Constants.RECORDS, records);
		return result;
	}
	
	@RequestMapping(value="/getHandleInfoList.do")
	@ResponseBody
	public Map<String, Object> getHandleInfoList(
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit
			){
		String[][] items = new String[][]
				{
					{"90267","丁垒","执行人执行","","2014-11-25 15:54:04","",""},
					{"90266","值班组数据处理人","值班室数据处理","处理完毕","2014-11-25 14:43:20","2014-11-25 15:54:04","1小时10分"},
					{"90264","赵宇","审核经理审批","审批通过","2014-11-25 14:31:26","2014-11-25 14:43:20","11分"},
					{"90262","殷杰","数据处理审批","审批通过","2014-11-25 14:28:06","2014-11-25 14:31:26","3分"},
					{"90261","董晓彤","提交申请","提交请求","2014-11-25 14:28:04","2014-11-25 14:28:06","0分"}
				};
		
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String,Object>> records = new ArrayList<Map<String,Object>>();
		long count = items.length;
		for(String[] item:items){
			Map<String,Object> row = new HashMap<String,Object>();
			row.put("workEffortId", item[0]);
			row.put("userName", item[1]);
			row.put("action", item[2]);
			row.put("content", item[3]);
			row.put("beginTime", item[4]);
			row.put("endTime", item[5]);
			row.put("period", item[6]);

			records.add(row);
		}
		result.put(Constants.TOTAL_COUNT, count);
		result.put(Constants.RECORDS, records);
		return result;
	}	
}
