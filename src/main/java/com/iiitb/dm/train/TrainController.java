package com.iiitb.dm.train;

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
public class TrainController {
	@Autowired
	private TrainService trainService;
	
	@RequestMapping("/trains")
	public List<Train> getAllTrains() {
		return trainService.getAllTrains();
	}
	
	@RequestMapping("/trains/{id}")
	public Train getTrain(@PathVariable String id) {
		return trainService.getTrain(id);
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/trains")
	public void addTrain(@RequestBody Train train) {
		trainService.addTrain(train);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/trains/{id}")
	public void updateTrain(@RequestBody Train train, @PathVariable String id) {
		trainService.updateTrain(train, id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/trains/{trainId}")
	public void deleteTrains(@PathVariable String trainId) {
		trainService.deleteTrain(trainId);
	}
}
