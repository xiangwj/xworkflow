package com.asia.bomc.workflow.exception;

public class BomcServiceException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 121232704198884837L;
	public BomcServiceException() {
		super();
	}

	public BomcServiceException(String message) {
		super(message);
	}

	public BomcServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public BomcServiceException(Throwable cause) {
		super(cause);
	}
}
