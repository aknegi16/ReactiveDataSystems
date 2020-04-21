package com.iiitb.dm.train;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Train {
	@Id
	private String trainId;
	private String trainName;
	private String numberOfBogies;
	private String remainingSeats;
	private String onTime;
	
	public Train() {}
	public Train(String trainId, String trainName, String numberOfBogies, String remainingSeats, String onTime) {
		super();
		this.trainId = trainId;
		this.trainName = trainName;
		this.numberOfBogies = numberOfBogies;
		this.remainingSeats = remainingSeats;
		this.onTime = onTime;
	}
	
	public String getTrainId() {
		return trainId;
	}
	public void setTrainId(String trainId) {
		this.trainId = trainId;
	}
	public String getTrainName() {
		return trainName;
	}
	public void setTrainName(String trainName) {
		this.trainName = trainName;
	}
	public String getNumberOfBogies() {
		return numberOfBogies;
	}
	public void setNumberOfBogies(String numberOfBogies) {
		this.numberOfBogies = numberOfBogies;
	}
	public String getRemainingSeats() {
		return remainingSeats;
	}
	public void setRemainingSeats(String remainingSeats) {
		this.remainingSeats = remainingSeats;
	}
	public String getOnTime() {
		return onTime;
	}
	public void setOnTime(String onTime) {
		this.onTime = onTime;
	}
	
}
