package com.pbl.flightapp.Service;

import com.pbl.flightapp.DTO.FlightDTO;
import com.pbl.flightapp.Enum.SeatStatus;
import com.pbl.flightapp.Enum.SeatType;
import com.pbl.flightapp.Enum.Status;
import com.pbl.flightapp.Enum.TicketType;
import com.pbl.flightapp.Model.*;
import com.pbl.flightapp.Repository.FlightRepo;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.pbl.flightapp.Repository.PlaneRepo;
import com.pbl.flightapp.Repository.ReturnTicketRepo;
import com.pbl.flightapp.Repository.SeatRepo;
import com.pbl.flightapp.Repository.TicketRepo;
import com.pbl.flightapp.appExc.NotFoundException;
import jakarta.transaction.Transactional;
import jdk.jfr.Label;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class FlightService {
    @Autowired
    private FlightRepo flightRepo;
    @Autowired
    private SeatRepo seatRepo;
    @Autowired
    private PlaneRepo planeRepo;
    @Autowired
    private TicketRepo ticketRepo;
    @Autowired
    private ReturnTicketRepo returnTicketRepo;
    @Autowired
    @Lazy
    private DynamicSchedulerService dynamicSchedulerService;

    public FlightService(FlightRepo flightRepo) {
        this.flightRepo = flightRepo;
    }

    public FlightService() {
    }

    public List<Flight> getAllFlight() {
        return flightRepo.findAll();
    }

    public Flight getFlightById(int idFlight) {
        return flightRepo.findByIdFlight(idFlight);
    }

    // create , update , replace , delete
    public void deleteFlight(int idFlight) {
        flightRepo.deleteById(idFlight);
    }

    public Optional<Flight> FlightscheduleConflict(Flight checkFlight, Integer updateId) {
        List<Flight> flightsOfPlane = flightRepo.findByPlaneIdPlane(checkFlight.getPlane().getIdPlane());
        return flightsOfPlane.stream()
                .filter(flight ->( (flight.getDepartureLocalDateTime().isBefore(checkFlight.getDepartureLocalDateTime())
                        && flight.getLandingTime().isAfter(checkFlight.getDepartureLocalDateTime()))
                        || (flight.getDepartureLocalDateTime().isBefore(checkFlight.getLandingTime())
                        && flight.getLandingTime().isAfter(checkFlight.getLandingTime()))) && (updateId== null || updateId!=flight.getIdFlight())
                ).findFirst();
    }

    void checkValidFlight(Flight flight,Integer oldFlightId){
        if(flight.getToLocation().equals(flight.getFromLocation())){
            throw new RuntimeException("Chuyến bay không thể có điểm đi và điểm đến trùng nhau");
        }
        if(oldFlightId!= null){
            Flight oldFlight = getFlightById(oldFlightId);
            if (oldFlight == null) {
                throw new RuntimeException("Không thể tìm thấy Chuyến bay để cập nhật thông tin");
            }
            if (oldFlight.getDepartureLocalDateTime().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Không thể cập nhật thông tin đối với chuyến bay đã bay");
            }
        }
        if(flight.getDepartureLocalDateTime().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Không thể cài đặt thời gian bé hơn thời gian hiện tại. vui lòng chỉnh thời gian lơn hơn " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
        }
        Plane usePlane = planeRepo.findByIdPlane(flight.getPlane().getIdPlane());
        if(usePlane != null){
            if(usePlane.getStatus() != Status.ACTIVE){
                throw new RuntimeException("Máy bay chưa sẵn sàn phục vụ, vui lòng chọn máy bay khác");
            }
        }
        else{
            throw new NotFoundException("Máy bay phục vụ không tồn tại","PLANE_IS_NO_EXIST");
        }
        Optional<Flight> scheduleConflictFlight = FlightscheduleConflict(flight,oldFlightId);
        if (scheduleConflictFlight.isPresent()) {
            throw new RuntimeException("Máy bay bận ở chuyến VN"+scheduleConflictFlight.get().getIdFlight()+" không thể sử dụng trong thời gian " +scheduleConflictFlight.get().getDepartureLocalDateTime() +" -> "+ scheduleConflictFlight.get().getLandingTime());
        }
    }

    @Transactional()
    public void addFlight(Flight flight) {
        // Lấy tất cả ghế từ máy bay đã tồn tại
        List<Seat> seats = seatRepo.findByPlane(flight.getPlane().getIdPlane());
        // ?? ở đây thì seats ở trạng thái gì
        // check

      checkValidFlight(flight,null);

        // Tạo danh sách các Flights_Seat và liên kết với chuyến bay
        List<Flights_Seat> flightSeats = new ArrayList<>();
        for (Seat seat : seats) {
            flightSeats.add(new Flights_Seat(flight, seat, SeatStatus.NOT_BOOKED));
        }
        // Cập nhật danh sách Flights_Seat vào chuyến bay
        flight.setFlightsSeatList(flightSeats);
        // Lưu chuyến bay và các Flights_Seat (các đối tượng Seat đã tồn tại trong DB)
        flightRepo.save(flight);

        List<Flight> flights = new ArrayList<>();
        flights.add(flight);
        dynamicSchedulerService.scheduleFlight(flights);
    }

    // nhận vào flight , tìm trong db, nếu có thì gán thông tin rồi save , không thì
    // update
    public void updateFlight(Flight flight) {
        Flight existFlight = flightRepo.findByIdFlight(flight.getIdFlight());
        if (existFlight!= null) {
            flight.setPlane(existFlight.getPlane());// cap nhat không cho thay đổi plane;
            checkValidFlight(flight,flight.getIdFlight());
            existFlight.Copy(flight);
            flightRepo.save(existFlight);
            List<Flight> flights = new ArrayList<>();
            flights.add(existFlight);
            dynamicSchedulerService.cancelFlightCompletionCheckTask(existFlight.getIdFlight());
            dynamicSchedulerService.scheduleFlight(flights);
        } else {
            checkValidFlight(flight,flight.getIdFlight());
            addFlight(flight);
        }
    }

    public FlightDTO getFlightDTO(int idFlight) {
        Flight flight = flightRepo.findByIdFlight(idFlight);
        if (flight == null)
            return null;
        FlightDTO flightDTO = new FlightDTO();
        flightDTO.copyFrom(flight);
        return flightDTO;
    }

    // public List<Flight> getFlightByFromAndTo(String fromLocation, String
    // toLocation) {
    // return flightRepo.findByFromLocationAndToLocation(fromLocation, toLocation);
    // }

    public List<Flight> getFlightByFromAndToAndDepartureDate(Location fromLocation, Location toLocation,
            Date departureDate) {
        return flightRepo.findByFromLocationAndToLocationAndDepartureDate(fromLocation, toLocation, departureDate);
    }

    @Transactional
    public List<Flights_Seat> getFlightSeats(int idFlight, SeatType seatType, SeatStatus seatStatus) {
        Flight flight = flightRepo.findByIdFlight(idFlight);
        List<Flights_Seat> flightSeats = flight.getFlightsSeatList();
        return flightSeats.stream()
                .filter(fs -> (fs.getSeatStatus() == seatStatus || seatStatus == null)
                        && (fs.getSeat().getSeatType() == seatType || seatType == null))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Ticket> getBookedTickets(Integer flightId, TicketType ticketType) {

        List<Ticket> tickets = ticketRepo.findByFlight_IdFlight(flightId);
        List<ReturnTicket> returnTickets = returnTicketRepo.findByFlight_IdFlight(flightId);
        for (ReturnTicket returnTicket : returnTickets) {
            tickets.add(returnTicket.getTicket());
        }
        if (ticketType != null) {
            tickets = tickets.stream()
                    .filter(ticket -> {
                        if (ticket.getReturnTicket() != null
                                && ticket.getReturnTicket().getFlight().getIdFlight() == flightId)
                            return ticket.getReturnTicket().getTicketType() == ticketType;
                        return ticket.getTicketType() == ticketType;
                    })
                    .collect(Collectors.toList());
        }
        return tickets;
    }

    // biết bao nhiêu vé có thể đặt theo loại vé, tại sao không kiểm tra thông qua
    // ghế thì ghế có thể đặt trước hoặc không. nên phải kiểm tra qua vé. ta chỉ
    // biết số vé tối đa của từng loại theo ghế
    public int getAvailableSlots(int flightId, TicketType ticketType) {
        List<Flights_Seat> allFSOfSeatType = getFlightSeats(flightId, SeatType.getByTicketType(ticketType), null);
        List<Ticket> bookedTickets = getBookedTickets(flightId, ticketType);
        // Trả về số lượng ghế trống
        return allFSOfSeatType.size() - bookedTickets.size();
    }

}
