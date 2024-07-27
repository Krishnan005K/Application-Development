package com.app.service;

import com.app.models.Admin;

public interface IAdmin {
	Admin authenticateUser(String email, String pass);
	int updatePassword(String id,String password);
}
