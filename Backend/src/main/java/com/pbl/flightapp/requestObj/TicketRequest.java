package com.pbl.flightapp.requestObj;

import com.pbl.flightapp.Model.User;

public class TicketRequest {
  private User user;
  private String seatId;
  private ReturnTicket returnTicket;

  public class ReturnTicket {
    private String seatId;

    public String getSeatId() {
      return seatId;
    }

    public void setSeatId(String seatId) {
      this.seatId = seatId;
    }
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }


  public String getSeatId() {
    return seatId;
  }

  public ReturnTicket getReturnTicket() {
    return returnTicket;
  }

  public void setReturnTicket(ReturnTicket returnTicketDTO) {
    this.returnTicket = returnTicketDTO;
  }

  public void setSeatId(String departureSeatId) {
    this.seatId = departureSeatId;
  }

}
