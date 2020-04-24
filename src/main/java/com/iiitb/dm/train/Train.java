package com.iiitb.dm.train;



import javax.persistence.Entity;
import javax.persistence.Id;



@Entity
public class Train {
	@Id
	private String trainId;
	private String trainName;
	private String numberOfCompartment;
	private String BookedSeats;
	private String src;
	private String date;
	private String dest;
	
	

	
	public Train() {}
	
	
	public Train(String trainId, String trainName, String numberOfCompartment, String bookedSeats, String src,
			String dest, String date) {
		super();
		this.trainId = trainId;
		this.trainName = trainName;
		this.numberOfCompartment = numberOfCompartment;
		this.BookedSeats = bookedSeats;
		this.src = src;
		this.dest = dest;
		this.date=date;
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


	public String getNumberOfCompartment() {
		return numberOfCompartment;
	}


	public void setNumberOfCompartment(String numberOfCompartment) {
		this.numberOfCompartment = numberOfCompartment;
	}


	public String getBookedSeats() {
		return BookedSeats;
	}


	public void setBookedSeats(String bookedSeats) {
		BookedSeats = bookedSeats;
	}


	public String getSrc() {
		return src;
	}


	public void setSrc(String src) {
		this.src = src;
	}


	public String getDest() {
		return dest;
	}


	public void setDest(String dest) {
		this.dest = dest;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}
	
	
}
