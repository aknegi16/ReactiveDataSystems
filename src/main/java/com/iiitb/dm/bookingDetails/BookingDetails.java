package com.iiitb.dm.bookingDetails;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class BookingDetails {
	@Id
	private String bookingId;
	private String trainId;
	private String trainName;
	private String userId;
	private String userName;
	private String src;
	private String dest;
	private String seatsReserved;
	@GeneratedValue(strategy=GenerationType.AUTO)  
	private String pnr;
	private String date;
	private String status;	

	
	public BookingDetails() {}
	
	
	public BookingDetails(String bookingId, String trainId, String trainName, String userId, String userName, String src, String dest,
			String seatsReserved, String pnr, String date, String status) {
		super();
		this.bookingId = bookingId;
		this.trainId= trainId;
		this.trainName= trainName;
		this.userId= userId;
		this.userName= userName;
		this.src= src;
		this.dest= dest;
		this.seatsReserved= seatsReserved;
		this.pnr= pnr;
		this.date= date;
		this.status= status;
	}


	
	public String getBookingId() {
		return bookingId;
	}


	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
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


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
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


	public String getSeatsReserved() {
		return seatsReserved;
	}


	public void setSeatsReserved(String seatsReserved) {
		this.seatsReserved = seatsReserved;
	}


	public String getPnr() {
		return pnr;
	}


	public void setPnr(String pnr) {
		this.pnr = pnr;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	
}
