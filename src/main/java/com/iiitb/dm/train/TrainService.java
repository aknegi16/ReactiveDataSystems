package com.iiitb.dm.train;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrainService {
	@Autowired
	private TrainRepository trainRepository;
	
	public List<Train> getAllTrains() {
		List<Train> trains = new ArrayList<>();
		trainRepository.findAll().forEach(trains::add);
		return trains;
	}
	
	public Train getTrain(String id) {
		return trainRepository.findById(id).get();
	}
	
	public void addTrain(Train train) {
		train.setRemainingSeats(Integer.toString(Integer.parseInt(train.getNumberOfCompartment())*10-Integer.parseInt(train.getBookedSeats())));
		trainRepository.save(train);
	}
	
	public void updateTrain(Train train, String id){
		train.setRemainingSeats(Integer.toString(Integer.parseInt(train.getNumberOfCompartment())*10-Integer.parseInt(train.getBookedSeats())));
		trainRepository.save(train);
	}
	
	public void deleteTrain(String id) {
		trainRepository.deleteById(id);
	}

	public List<Train> getTrainBySrc(String src) {
		// TODO Auto-generated method stub
		return trainRepository.getTrainBySrc(src);
	}

	public List<String> getAllsrc() {
		// TODO Auto-generated method stub
		return trainRepository.findDistinctsrc();
	}

	
}
