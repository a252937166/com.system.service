package com.crm.util.core.genertor;

import com.crm.util.core.constant.Constant;

import java.util.UUID;



public class IDGenerator {
	public final static String generator(){
		return UUID.randomUUID().toString().replaceAll(Constant.STRING_45, Constant.EMPTY);
	}
}
