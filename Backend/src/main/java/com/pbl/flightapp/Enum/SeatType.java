package com.pbl.flightapp.Enum;

public enum SeatType {
    ECONOMY,
    BUSINESS;
    public static SeatType getByTicketType(TicketType ticketType){
        if(ticketType.equals(TicketType.BUSINESS))
            return BUSINESS;
        return ECONOMY;
    }
}
