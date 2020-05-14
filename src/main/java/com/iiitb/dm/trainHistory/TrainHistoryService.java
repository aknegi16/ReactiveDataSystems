package com.iiitb.dm.trainHistory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrainHistoryService {
	@Autowired
	private TrainHistoryRepository trainRepository;
	
	public List<TrainHistory> getAllTrains() {
		List<TrainHistory> trains = new ArrayList<>();
		trainRepository.findAll().forEach(trains::add);
		return trains;
	}
	
	public TrainHistory getTrain(int id) {
		return trainRepository.findById(id).get();
	}
	
	public void addTrain(TrainHistory train) {
		trainRepository.save(train);
	}
	
	public void updateTrain(TrainHistory train, int id){
		trainRepository.save(train);
	}
	
	public void deleteTrain(int id) {
		trainRepository.deleteById(id);
	}

}
