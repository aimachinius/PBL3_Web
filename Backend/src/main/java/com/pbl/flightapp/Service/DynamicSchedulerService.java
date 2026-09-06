package com.pbl.flightapp.Service;
import com.pbl.flightapp.Enum.Status;
import com.pbl.flightapp.Model.Flight;
import com.pbl.flightapp.Model.Plane;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ScheduledFuture;

@Service
public class DynamicSchedulerService {

    @Autowired
    private TaskScheduler taskScheduler;
    @Autowired
    private  FlightService flightService;
    @Autowired
    private PlaneService planeService;

    static private Map< Integer,Map<String,ScheduledFuture<?>>> scheduledTasks = new HashMap<>();

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        SetupStartApp();
    }

   public void SetupStartApp(){
      List<Flight> setFlights =  flightService.getAllFlight().stream().filter(flight -> flight.getDepartureLocalDateTime().isAfter(LocalDateTime.now())).toList();
      scheduleFlight(setFlights);
   }

    public void scheduleFlight(List<Flight> flights){
        flights.forEach(flight ->
        {

            ScheduledFuture<?> startTask = taskScheduler.schedule(() -> {
                planeService.updateStatus(flight.getPlane().getIdPlane(), Status.FLYING);
                scheduledTasks.get(flight.getIdFlight()).get("startTask").cancel(true);
            }, Date.from(flight.getDepartureLocalDateTime()
                    .atZone(ZoneId.systemDefault())
                    .toInstant()));

            ScheduledFuture<?> closeTask = taskScheduler.schedule(() -> {
                Plane plane = planeService.getPlaneById(flight.getPlane().getIdPlane());
                            plane.setStatus(Status.ACTIVE);
                            plane.setFlightHours(plane.getFlightHours() + flight.getDurationMinutes().intValue()/60);
                            planeService.updatePlane(flight.getPlane().getIdPlane(),plane);
                            scheduledTasks.get(flight.getIdFlight()).get("closeTask").cancel(true);
                            scheduledTasks.remove(flight.getIdFlight());
            }, Date.from(flight.getLandingTime()
                    .atZone(ZoneId.systemDefault())
                    .toInstant()));

            Map<String,ScheduledFuture<?>> scheduledTask = new HashMap<>();
            scheduledTask.put("startTask",startTask);
            scheduledTask.put("closeTask",closeTask);
            scheduledTasks.put(flight.getIdFlight(),scheduledTask);

        });
    }

    public void cancelFlightCompletionCheckTask(Integer flightId) {
        Map<String,ScheduledFuture<?>> task = scheduledTasks.get(flightId);
        if (task != null) {
            task.get("startTask").cancel(true);
            task.get("closeTask").cancel(true);
            scheduledTasks.remove(flightId);
            System.out.println("Completion check task for flight " + flightId + " manually cancelled.");
        } else {
            System.out.println("No completion check task found for flight " + flightId + " or already finished.");
        }
    }

    public static Map<Integer, Map<String, ScheduledFuture<?>>> getScheduledTasks() {
        return scheduledTasks;
    }


}