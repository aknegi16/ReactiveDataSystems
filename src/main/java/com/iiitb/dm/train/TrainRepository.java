package com.iiitb.dm.train;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TrainRepository extends CrudRepository<Train, String>{

	List<Train> getTrainBySrc(String src);
	
	 @Query("SELECT DISTINCT src FROM Train ")
	  List<String> findDistinctsrc();
	

}
