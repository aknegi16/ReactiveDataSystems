package com.iiitb.dm.trainHistory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class TrainHistoryController {
	@Autowired
	private TrainHistoryService trainService;
	
	@RequestMapping("/trainhistory")
	public List<TrainHistory> getAllTrains() {
		return trainService.getAllTrains();
	}
	
	@RequestMapping("/trainhistory/{id}")
	public TrainHistory getTrain(@PathVariable int id) {
		return trainService.getTrain(id);
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/trainhistory")
	public void addTrain(@RequestBody TrainHistory train) {
		trainService.addTrain(train);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/trainhistory/{id}")
	public void updateTrain(@RequestBody TrainHistory train, @PathVariable int id) {
		trainService.updateTrain(train, id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/trainhistory/{trainId}")
	public void deleteTrains(@PathVariable int trainId) {
		trainService.deleteTrain(trainId);
	}
}
