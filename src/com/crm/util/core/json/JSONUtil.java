package com.crm.util.core.json;

import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;


public class JSONUtil {

	/**
	 * json格式的字符串转javabean对象
	 * @param jsonStr
	 * @param objClass javabean对象的class
	 * @return
	 * @throws Exception
	 */
	public static Object jsonToBean(String jsonStr,Class<?> objClass) throws Exception{
		JSONObject obj = JSONObject.fromObject(jsonStr);
		Object o = JSONObject.toBean(obj,objClass);
		return o;
	}
	
	/**
	 * json格式的字符串转javabean对象
	 * @param jsonStr
	 * @param objClass javabean对象的class
	 * @param classMap javabean对象的属性含有其他javabean类型属性时，使用此参数。   key：javabean对象中的属性名；value：属性对应class
	 * @return
	 * @throws Exception
	 */
	public static Object jsonToBean(String jsonStr,Class<?> objClass,Map<?,?> classMap) throws Exception{
		JSONObject obj = JSONObject.fromObject(jsonStr);
		String[] dateFormats = new String[] {"yyyy/MM/dd hh:mm:ss","yyyy-MM-dd","yyyy-MM-dd hh:mm:ss","yyyy/MM/dd","yyyy年MM月dd日","yyyy年MM月"};  
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));  
		Object o = JSONObject.toBean(obj,objClass,classMap);
		return o;
	}
	
	/**
	 * JSON串转Collection类型
	 * @param jsonStr
	 * @param objClass
	 * @return
	 * @throws Exception
	 */
	public static Object jsonToCollectionBean(String jsonStr,Class<?> objClass) throws Exception{
		JSONArray objArray = JSONArray.fromObject(jsonStr);
		Object o = JSONArray.toCollection(objArray,objClass);
		return o;
	}
	
	/**
	 * java对象转json串
	 * @param object
	 * @return
	 */
	public static String beanToJsonStr(Object object){
		return object == null ? "" : JSONObject.fromObject(object).toString();
	}
	
	/**
	 * 集合转json串
	 * @param object
	 * @return
	 */
	public static String collectionToJsonStr(Object object){
		return object == null ? "" : JSONArray.fromObject(object).toString();
	}
}
