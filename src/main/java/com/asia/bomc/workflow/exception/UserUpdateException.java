package com.asia.bomc.workflow.exception;

public class UserUpdateException extends RuntimeException{
	public UserUpdateException(){
		super();
	}
	public UserUpdateException(String message) {
		super(message);
	}

	public UserUpdateException(String message, Throwable cause) {
		super(message, cause);
	}

	public UserUpdateException(Throwable cause) {
		super(cause);
	}	
}
